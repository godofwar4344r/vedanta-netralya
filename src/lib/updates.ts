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
  try {
    const res = await fetch(`${ENDPOINT}?type=update_verify&code=${encodeURIComponent(code)}`);
    if (!res.ok) return false;
    const data = JSON.parse(await res.text());
    // Must be the explicit `verified` flag. The script's generic fallback reply also
    // returns ok:true, so checking `ok` would unlock the form against an older
    // deployment that has no update_verify branch at all.
    return data.verified === true;
  } catch {
    return false;
  }
}

/** Publishes an update. The code is re-checked server-side before anything is written. */
export async function postUpdate(data: UpdatePayload): Promise<void> {
  const body = new URLSearchParams({
    type: 'update',
    code: data.code,
    title: data.title,
    category: data.category,
    body: data.body,
    author: data.author,
    imageUrl: data.imageUrl,
  });

  const res = await fetch(ENDPOINT, { method: 'POST', body });
  if (!res.ok) throw new Error(`Posting failed with status ${res.status}`);

  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(await res.text());
  } catch {
    throw new Error('The server returned an unreadable response.');
  }
  if (!result.ok) throw new Error(result.error || 'Your update could not be saved.');
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
