export interface ReviewPayload {
  name: string;
  location: string;
  treatment: string;
  rating: number;
  review: string;
}

export interface ApprovedReview {
  name: string;
  location: string;
  treatment: string;
  rating: number;
  review: string;
}

// Same Google Apps Script Web App that stores appointments; reviews go to a
// separate "Website Reviews" tab. Source: google-apps-script/appointments.gs
const ENDPOINT =
  import.meta.env.VITE_APPOINTMENTS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwE5JvRRUD9rufqUYU2_dR3uLiLNMhlQX4CW0Ak-pUSAyTsr8lfV5pHeynscw1bqOvq/exec';

/**
 * Submits a patient review. It is stored with status "Pending" and only appears
 * on the site after the clinic marks it "Approved" in the sheet (spam guard).
 */
export async function submitReview(data: ReviewPayload): Promise<void> {
  const body = new URLSearchParams({
    type: 'review',
    name: data.name,
    location: data.location,
    treatment: data.treatment,
    rating: String(data.rating),
    review: data.review,
    source: typeof window !== 'undefined' ? window.location.href : '',
  });

  const res = await fetch(ENDPOINT, { method: 'POST', body });
  if (!res.ok) {
    throw new Error(`Review submission failed with status ${res.status}`);
  }

  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(await res.text());
  } catch {
    throw new Error('The server returned an unreadable response.');
  }
  if (!result.ok) {
    throw new Error(result.error || 'Your review could not be saved.');
  }
}

/**
 * Fetches the reviews the clinic has approved for public display.
 * Returns an empty array (never throws) so the page can fall back gracefully.
 */
export async function fetchApprovedReviews(): Promise<ApprovedReview[]> {
  try {
    const res = await fetch(`${ENDPOINT}?type=reviews`);
    if (!res.ok) return [];
    const data = JSON.parse(await res.text());
    if (!data.ok || !Array.isArray(data.reviews)) return [];
    return data.reviews as ApprovedReview[];
  } catch {
    return [];
  }
}
