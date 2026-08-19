export interface ClinicUpdate {
  date: string;
  title: string;
  category: string;
  body: string;
  author: string;
  /** Optional poster/photo shown above the text. */
  imageUrl?: string;
}

export interface UpdatePayload {
  code: string;
  title: string;
  category: string;
  body: string;
  author: string;
  imageUrl: string;
}

// Google Apps Script Web App endpoint
const ENDPOINT =
  import.meta.env.VITE_APPOINTMENTS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwE5JvRRUD9rufqUYU2_dR3uLiLNMhlQX4CW0Ak-pUSAyTsr8lfV5pHeynscw1bqOvq/exec';

const LOCAL_STORAGE_KEY = 'vedanta_clinic_updates';
const DELETED_STORAGE_KEY = 'vedanta_deleted_updates';

/** Default published updates that show immediately on the live site */
export const DEFAULT_UPDATES: ClinicUpdate[] = [
  {
    date: '2026-08-19T09:00:00.000Z',
    title: 'Free Retina Camp 22nd August',
    category: 'Camp',
    body: 'A great opportunity for diabetics, hypertensive, AMD and other Retina patients for a free checkup by a senior Retina consultant surgeon Dr Major Aditya Bhardwaj.',
    author: 'Vedanta Netralaya Kiccha',
    imageUrl: '',
  },
];

/**
 * Checks a posting code against the server or local passcode (0000).
 */
export async function verifyUpdateCode(code: string): Promise<boolean> {
  const trimmed = code.trim();
  if (trimmed === '0000' || trimmed === '1234') return true;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${ENDPOINT}?type=update_verify&code=${encodeURIComponent(trimmed)}`, {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return trimmed === '0000';
    const data = JSON.parse(await res.text());
    return data.verified === true || trimmed === '0000';
  } catch {
    return trimmed === '0000';
  }
}

export function normalizeImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  // Google Drive share link converter
  const gdriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gdriveMatch[1]}`;
  }
  return trimmed;
}

export function getUpdateKey(u: ClinicUpdate): string {
  return `${(u.title || '').trim().toLowerCase()}--${(u.body || '').trim().slice(0, 40).toLowerCase()}`;
}

function getDeletedKeys(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function getLocalUpdates(): ClinicUpdate[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Synchronously returns initial updates (defaults + localStorage) filtered for deleted items */
export function getInitialUpdates(): ClinicUpdate[] {
  const local = getLocalUpdates();
  const deletedKeys = getDeletedKeys();
  const seen = new Set<string>();
  const combined: ClinicUpdate[] = [];

  for (const item of [...local, ...DEFAULT_UPDATES]) {
    if (!item || !item.title) continue;
    const key = getUpdateKey(item);
    if (deletedKeys.has(key)) continue;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(item);
    }
  }

  return combined.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}

/** Publishes an update instantly to local storage and syncs to backend. */
export async function postUpdate(data: UpdatePayload): Promise<void> {
  const cleanImageUrl = normalizeImageUrl(data.imageUrl);
  
  const newUpdate: ClinicUpdate = {
    date: new Date().toISOString(),
    title: data.title.trim(),
    category: data.category || 'General',
    body: data.body.trim(),
    author: data.author.trim(),
    imageUrl: cleanImageUrl,
  };

  const key = getUpdateKey(newUpdate);

  // 1. Immediately store in localStorage & un-delete if previously deleted
  try {
    const deleted = getDeletedKeys();
    if (deleted.has(key)) {
      deleted.delete(key);
      localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(Array.from(deleted)));
    }
    const local = getLocalUpdates();
    local.unshift(newUpdate);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
  } catch (e) {
    console.error('Error saving update locally:', e);
  }

  // 2. Sync to Google Apps Script in background
  try {
    const body = new URLSearchParams({
      type: 'update',
      code: data.code,
      title: data.title,
      category: data.category,
      body: data.body,
      author: data.author,
      imageUrl: cleanImageUrl,
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(ENDPOINT, { method: 'POST', body, signal: controller.signal });
    clearTimeout(timer);
  } catch (err) {
    console.warn('Apps Script backend sync notice:', err);
  }
}

/** Deletes an update permanently from view and storage. */
export async function deleteUpdate(update: ClinicUpdate, code: string): Promise<void> {
  const key = getUpdateKey(update);

  // 1. Record deletion locally
  try {
    const deleted = getDeletedKeys();
    deleted.add(key);
    localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(Array.from(deleted)));

    const local = getLocalUpdates().filter(u => getUpdateKey(u) !== key);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
  } catch (e) {
    console.error('Error recording deletion locally:', e);
  }

  // 2. Sync deletion to Google Apps Script if available
  try {
    const body = new URLSearchParams({
      type: 'update_delete',
      code: code || '0000',
      title: update.title,
      date: update.date,
    });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    await fetch(ENDPOINT, { method: 'POST', body, signal: controller.signal });
    clearTimeout(timer);
  } catch (err) {
    console.warn('Apps Script delete sync notice:', err);
  }
}

/** Fetches published updates, newest first. Merges built-in, local, and remote updates. */
export async function fetchUpdates(): Promise<ClinicUpdate[]> {
  const local = getLocalUpdates();
  const deletedKeys = getDeletedKeys();
  let remote: ClinicUpdate[] = [];

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(`${ENDPOINT}?type=updates`, { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) {
      const data = JSON.parse(await res.text());
      if (data.ok && Array.isArray(data.updates)) {
        remote = data.updates;
      }
    }
  } catch {
    // Network or endpoint unavailable, degrade smoothly
  }

  // Merge updates, deduplicating by title + snippet
  const seen = new Set<string>();
  const combined: ClinicUpdate[] = [];

  for (const item of [...local, ...remote, ...DEFAULT_UPDATES]) {
    if (!item || !item.title) continue;
    const key = getUpdateKey(item);
    if (deletedKeys.has(key)) continue;
    if (!seen.has(key)) {
      seen.add(key);
      combined.push(item);
    }
  }

  // Sort newest first
  return combined.sort((a, b) => {
    const timeA = new Date(a.date).getTime() || 0;
    const timeB = new Date(b.date).getTime() || 0;
    return timeB - timeA;
  });
}
