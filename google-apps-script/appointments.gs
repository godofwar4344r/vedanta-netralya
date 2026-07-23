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

function doGet() {
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
