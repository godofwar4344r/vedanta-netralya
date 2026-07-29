/**
 * Vedanta Netralya - appointment intake endpoint.
 *
 * This is a mirror of the deployed Apps Script project:
 *   https://script.google.com/home/projects/1ZtcSVssggVUQnrit8nBklnzSWmGWDTiWcUllh-roO46ON5jg_6GzQIFa/edit
 *
 * Deployed as a Web App (Execute as: Me, Who has access: Anyone).
 * The /exec URL is hardcoded in src/lib/appointments.ts.
 *
 * After editing the script: Deploy > Manage deployments > edit > New version,
 * otherwise the live site keeps hitting the previously deployed version.
 */

var SPREADSHEET_ID = '1kibirmpATHUHCfL2ykmsbZXeFZViUDUEe76uWOpCiB0';
var SHEET_NAME = 'Patient Data on Website';
var REVIEWS_SHEET = 'Website Reviews';
var REVIEW_HEADERS = ['Timestamp', 'Name', 'Location', 'Treatment', 'Rating', 'Review', 'Status', 'Source'];

var UPDATES_SHEET = 'Website Updates';
var UPDATE_HEADERS = ['Timestamp', 'Title', 'Category', 'Content', 'Posted By', 'Status', 'Image URL'];

// Posting code for the /updates page. Change this string to rotate the code —
// no website redeploy needed, just a new Apps Script version.
var UPDATE_CODE = '####';

// Columns A-D pre-existed in the clinic's sheet; E onwards were added by setupSheet().
var HEADERS = [
  'Sr. No.',
  'Name of Patient',
  'Mobile No.',
  'Payment Details',
  'Email',
  'Specialty',
  'Doctor',
  'Preferred Date',
  'Time Slot',
  'Notes',
  'Booked At',
  'Status'
];

function getSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/** Run once from the editor to write/refresh the header row. */
function setupSheet() {
  var sheet = getSheet_();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(10, 260);
  sheet.setColumnWidth(11, 160);
  return 'Headers written to ' + SHEET_NAME;
}

function getReviewsSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(REVIEWS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(REVIEWS_SHEET);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(REVIEW_HEADERS);
    sheet.getRange(1, 1, 1, REVIEW_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(6, 320); // Review
  }
  return sheet;
}

function getUpdatesSheet_() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(UPDATES_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(UPDATES_SHEET);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(UPDATE_HEADERS);
    sheet.getRange(1, 1, 1, UPDATE_HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(4, 480); // Content
  }
  return sheet;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var p = (e && e.parameter) || {};

    // Fall back to a JSON body if the request wasn't form-encoded.
    if (!p.name && e && e.postData && e.postData.contents) {
      try {
        p = JSON.parse(e.postData.contents);
      } catch (err) {
      }
    }

    // Clinic updates. Gated by UPDATE_CODE — this server-side check is the real gate;
    // the website's code prompt is only a convenience.
    if (p.type === 'update') {
      if (String(p.code || '') !== UPDATE_CODE) {
        return json_({ ok: false, error: 'That posting code is not valid.' });
      }
      if (!p.title || !p.body) {
        return json_({ ok: false, error: 'Title and content are required.' });
      }
      getUpdatesSheet_().appendRow([
        new Date(),
        p.title || '',
        p.category || 'General',
        p.body || '',
        p.author || '',
        'Published',
        p.imageUrl || ''
      ]);
      return json_({ ok: true });
    }

    // Patient reviews go to a separate tab and start as "Pending".
    if (p.type === 'review') {
      if (!p.name || !p.review) {
        return json_({ ok: false, error: 'Name and review are required.' });
      }
      getReviewsSheet_().appendRow([
        new Date(),
        p.name || '',
        p.location || '',
        p.treatment || '',
        p.rating || '',
        p.review || '',
        'Pending',
        p.source || ''
      ]);
      return json_({ ok: true });
    }

    if (!p.name || !p.phone) {
      return json_({ ok: false, error: 'Name and phone are required.' });
    }

    var sheet = getSheet_();
    var nextRow = sheet.getLastRow() + 1;
    var srNo = nextRow - 1; // row 1 is the header

    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
      srNo,
      p.name || '',
      "'" + String(p.phone || ''), // keep leading + / 0 intact
      '',                          // Payment Details - filled in by staff
      p.email || '',
      p.specialty || '',
      p.doctor || '',
      p.date || '',
      p.timeSlot || '',
      p.notes || '',
      new Date(),
      'New'
    ]]);

    return json_({ ok: true, row: nextRow });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var params = (e && e.parameter) || {};

  // Confirm a posting code without writing anything, so the website can unlock its form.
  // `verified` is a dedicated field: the generic fallback response below also carries
  // ok:true, so the website must not treat that as a successful code check.
  if (params.type === 'update_verify') {
    return json_({ ok: true, verified: String(params.code || '') === UPDATE_CODE });
  }

  // Published clinic updates, newest first.
  if (params.type === 'updates') {
    var usheet = getUpdatesSheet_();
    var ulast = usheet.getLastRow();
    var updates = [];
    if (ulast > 1) {
      var urows = usheet.getRange(2, 1, ulast - 1, UPDATE_HEADERS.length).getValues();
      for (var u = urows.length - 1; u >= 0; u--) {
        var row = urows[u];
        if (String(row[5]).toLowerCase() === 'published') {
          updates.push({
            date: row[0] ? new Date(row[0]).toISOString() : '',
            title: row[1],
            category: row[2] || 'General',
            body: row[3],
            author: row[4] || '',
            imageUrl: row[6] || ''
          });
        }
      }
    }
    return json_({ ok: true, updates: updates });
  }

  // Return approved reviews for the website's Reviews page.
  if (params.type === 'reviews') {
    var sheet = getReviewsSheet_();
    var last = sheet.getLastRow();
    var reviews = [];
    if (last > 1) {
      var rows = sheet.getRange(2, 1, last - 1, REVIEW_HEADERS.length).getValues();
      for (var i = rows.length - 1; i >= 0; i--) { // newest first
        var r = rows[i];
        if (String(r[6]).toLowerCase() === 'approved') {
          reviews.push({
            name: r[1],
            location: r[2],
            treatment: r[3],
            rating: Number(r[4]) || 5,
            review: r[5]
          });
        }
      }
    }
    return json_({ ok: true, reviews: reviews });
  }

  return json_({ ok: true, service: 'vedanta-appointments' });
}

/** Maintenance helper: wipes every data row, keeping the header. Run manually only. */
function clearTestRows() {
  var sheet = getSheet_();
  var last = sheet.getLastRow();
  if (last > 1) {
    sheet.deleteRows(2, last - 1);
  }
  return 'Cleared ' + (last - 1) + ' data rows.';
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
