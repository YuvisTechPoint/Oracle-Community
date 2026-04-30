import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Google Sheets Configuration
const SPREADSHEET_ID = '11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k';
const SHEET_NAME = 'Sheet1';

// Local backup file
const DATA_FILE = path.join(process.cwd(), 'contacts.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Sheets API (if credentials available)
let sheets = null;
let googleAuthEnabled = false;

if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    sheets = google.sheets({ version: 'v4', auth });
    googleAuthEnabled = true;
    console.log('Google Sheets API enabled');
  } catch (error) {
    console.error('Google Sheets API initialization failed:', error.message);
  }
} else {
  console.log('Google credentials not found - saving to local file only');
}

// Helper function to save to local JSON file
function saveToLocal(data) {
  try {
    let existingData = [];
    if (fs.existsSync(DATA_FILE)) {
      existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    existingData.push(data);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2));
    console.log('Data saved to local file:', DATA_FILE);
    return true;
  } catch (error) {
    console.error('Error saving to local file:', error);
    return false;
  }
}

// Helper function to save to Google Sheets
async function saveToGoogleSheets(rowData) {
  if (!googleAuthEnabled || !sheets) {
    return null;
  }
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData],
      },
    });
    return response.data;
  } catch (error) {
    console.error('Google Sheets API error:', error.message);
    return null;
  }
}

// API Endpoint to add user contact/login data
app.post('/api/add-contact', async (req, res) => {
  try {
    const { name, email, phone, type, message, subject } = req.body;
    
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name || '',
      email || '',
      phone || '',
      type || 'contact',
      subject || '',
      message || ''
    ];

    // Save to local file
    const localSaved = saveToLocal({
      timestamp,
      name: name || '',
      email: email || '',
      phone: phone || '',
      type: type || 'contact',
      subject: subject || '',
      message: message || ''
    });

    // Try to save to Google Sheets
    const googleResponse = await saveToGoogleSheets(rowData);

    if (googleResponse || localSaved) {
      res.status(200).json({
        success: true,
        message: googleAuthEnabled 
          ? 'Contact added successfully to Google Sheets'
          : 'Contact saved locally (Google Sheets not configured)',
        googleEnabled: googleAuthEnabled
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save contact'
      });
    }
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add contact',
      error: error.message,
    });
  }
});

// API Endpoint specifically for login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      name || '',
      email || '',
      phone || '',
      'login',
      '',
      ''
    ];

    const localSaved = saveToLocal({
      timestamp,
      name: name || '',
      email: email || '',
      phone: phone || '',
      type: 'login'
    });

    const googleResponse = await saveToGoogleSheets(rowData);

    if (googleResponse || localSaved) {
      res.status(200).json({
        success: true,
        message: googleAuthEnabled 
          ? 'Login recorded successfully to Google Sheets'
          : 'Login saved locally (Google Sheets not configured)',
        googleEnabled: googleAuthEnabled
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to record login'
      });
    }
  } catch (error) {
    console.error('Error recording login:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record login',
      error: error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    googleSheetsEnabled: googleAuthEnabled 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Google Sheets: ${googleAuthEnabled ? 'Enabled' : 'Not configured (saving locally)'}`);
  console.log(`Local data file: ${DATA_FILE}`);
});
