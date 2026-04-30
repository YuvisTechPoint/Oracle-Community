// Google Apps Script for Oracle Kolkata Community
// Deploy as Web App (Execute as: Me, Who has access: Anyone)
// Uses GET with query params — the only reliable no-CORS approach from browsers

const SPREADSHEET_ID = '11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k';
const SHEET_NAME = 'Sheet1';

function doGet(e) {
  try {
    const params = e.parameter;

    // If no data params, just return a health check
    if (!params.name && !params.email) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'OK', message: 'Oracle Kolkata Community API is running' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Save to spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      params.name    || '',
      params.email   || '',
      params.phone   || '',
      params.type    || 'contact',
      params.subject || '',
      params.message || ''
    ];

    sheet.appendRow(rowData);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Keep doPost as fallback for server-side calls
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);

    const timestamp = new Date().toISOString();
    sheet.appendRow([
      timestamp,
      data.name    || '',
      data.email   || '',
      data.phone   || '',
      data.type    || 'contact',
      data.subject || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
