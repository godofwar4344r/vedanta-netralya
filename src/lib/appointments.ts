export interface AppointmentPayload {
  specialty: string;
  doctor: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

// Google Apps Script Web App that appends to the "Patient Data on Website" tab
// of the clinic's registration sheet. Source: google-apps-script/appointments.gs
// Override with VITE_APPOINTMENTS_ENDPOINT if the script is ever redeployed to a new URL.
const ENDPOINT =
  import.meta.env.VITE_APPOINTMENTS_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbwE5JvRRUD9rufqUYU2_dR3uLiLNMhlQX4CW0Ak-pUSAyTsr8lfV5pHeynscw1bqOvq/exec';

export const isAppointmentEndpointConfigured = () =>
  ENDPOINT.startsWith('https://');

/**
 * Sends the booking to the Google Sheet.
 * Uses a simple (CORS-safe) form POST so Apps Script never needs a preflight.
 * Apps Script answers 200 even when it rejects the payload, so the JSON body —
 * not the HTTP status — is what decides success.
 */
export async function submitAppointment(data: AppointmentPayload): Promise<void> {
  if (!isAppointmentEndpointConfigured()) {
    throw new Error('Appointment endpoint is not configured.');
  }

  const body = new URLSearchParams({
    specialty: data.specialty,
    doctor: data.doctor,
    date: data.date,
    timeSlot: data.timeSlot,
    name: data.name,
    phone: data.phone,
    email: data.email,
    notes: data.notes,
    source: typeof window !== 'undefined' ? window.location.href : '',
  });

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    body,
  });

  if (!res.ok) {
    throw new Error(`Booking failed with status ${res.status}`);
  }

  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(await res.text());
  } catch {
    throw new Error('Booking endpoint returned an unreadable response.');
  }

  if (!result.ok) {
    throw new Error(result.error || 'Booking was rejected by the server.');
  }
}
