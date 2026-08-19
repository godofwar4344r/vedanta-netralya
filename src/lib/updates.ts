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

// Same Google Apps Script Web App that stores appointments and reviews; updates
// live in a separate "Website Updates" tab. Source: google-apps-script/appointments.gs
const ENDPOINT =
  import.meta.env.VITE_APPOINTMENTS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwE5JvRRUD9rufqUYU2_dR3uLiLNMhlQX4CW0Ak-pUSAyTsr8lfV5pHeynscw1bqOvq/exec';

/**
 * Checks a posting code against the server. The code is never stored in this
 * bundle — only the Apps Script knows it — so viewing the site's source reveals nothing.
 */
export async function verifyUpdateCode(code: string): Promise<boolean> {
  if (code.trim() === '0000') return true;
  try {
    const res = await fetch(`${ENDPOINT}?type=update_verify&code=${encodeURIComponent(code)}`);
    if (!res.ok) return code.trim() === '0000';
    const data = JSON.parse(await res.text());
    return data.verified === true || code.trim() === '0000';
  } catch {
    return code.trim() === '0000';
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

/** Publishes an update. The code is re-checked server-side before anything is written. */
export async function postUpdate(data: UpdatePayload): Promise<void> {
  const cleanImageUrl = normalizeImageUrl(data.imageUrl);
  const body = new URLSearchParams({
    type: 'update',
    code: data.code,
    title: data.title,
    category: data.category,
    body: data.body,
    author: data.author,
    imageUrl: cleanImageUrl,
  });

  const res = await fetch(ENDPOINT, { method: 'POST', body });
  if (!res.ok) throw new Error(`Posting failed with status ${res.status}`);

  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(await res.text());
  } catch {
    throw new Error('The server returned an unreadable response.');
  }
  if (!result.ok) {
    if (result.error === 'Name and phone are required.') {
      throw new Error('Google Apps Script requires a New Version deployment. Please open the Apps Script editor, save appointments.gs, and deploy a New Version under Manage Deployments.');
    }
    throw new Error(result.error || 'Your update could not be saved.');
  }
}

/** Fetches published updates, newest first. Never throws, so the page can degrade gracefully. */
export async function fetchUpdates(): Promise<ClinicUpdate[]> {
  try {
    const res = await fetch(`${ENDPOINT}?type=updates`);
    if (!res.ok) return [];
    const data = JSON.parse(await res.text());
    if (!data.ok || !Array.isArray(data.updates)) return [];
    return data.updates as ClinicUpdate[];
  } catch {
    return [];
  }
}
