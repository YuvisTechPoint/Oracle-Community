# 🚀 Google Apps Script Deployment Guide

This guide will help you deploy the Google Apps Script to capture form submissions in real-time to your Google Spreadsheet.

---

## 📋 Prerequisites

- A Google Account
- Access to the target Google Spreadsheet: https://docs.google.com/spreadsheets/d/11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k

---

## 🔧 Step 1: Deploy Google Apps Script

### 1.1 Open the Spreadsheet
Go to: https://docs.google.com/spreadsheets/d/11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k

### 1.2 Open Apps Script Editor
- Click **Extensions** (top menu)
- Select **Apps Script**
- A new tab will open with the Apps Script editor

### 1.3 Copy & Paste the Code
1. Delete any existing code in the editor
2. Open the file [`google-apps-script.gs`](./google-apps-script.gs) from this project
3. Copy ALL the code
4. Paste it into the Apps Script editor
5. Click **Save** (💾 icon) in the toolbar

### 1.4 Deploy as Web App
1. Click **Deploy** (top-right dropdown)
2. Select **New Deployment**
3. Select **Web App** from the "Select type" dropdown
4. Configure the deployment:
   - **Execute as**: Select your Google Account email
   - **Who has access**: Select **Anyone**
5. Click **Deploy**

### 1.5 Authorize the Script
- You'll be prompted to authorize access
- Click **Authorize**
- Select your Google Account
- Click **Allow** on the permission screen

### 1.6 Copy the Web App URL
1. After successful deployment, a **Deployment ID** dialog will appear
2. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/d/ABC123XYZ/usercontent/exec`)
3. **Keep this URL safe** - you'll need it for the next step

---

## 🎯 Step 2: Configure Your Application

### 2.1 Create `.env.local` File
In the root directory of this project, create a file named `.env.local`:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent/exec
```

Replace `YOUR_DEPLOYMENT_ID` with the deployment ID from Step 1.6

### 2.2 Example
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7/usercontent/exec
```

---

## ✅ Step 3: Test the Integration

### 3.1 Start the Development Server
```bash
npm run dev
```

### 3.2 Test the Login Modal
1. Go to http://localhost:5173
2. Click the "Join Our Community" button (or login button if available)
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
4. Click Submit

### 3.3 Verify in Google Sheets
1. Open the spreadsheet: https://docs.google.com/spreadsheets/d/11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k
2. Check **Sheet1** for your submitted data
3. Data should appear in real-time with timestamp, name, email, and phone

### 3.4 Test the Contact Form
1. Scroll to the "Contact Us" section
2. Fill in all fields (Name, Email, Subject, Message)
3. Click "Send Message"
4. Verify the data appears in the spreadsheet

---

## 🔄 Real-Time Updates

Once deployed, all form submissions will:
- ✅ Be saved to the Google Spreadsheet instantly
- ✅ Include a timestamp
- ✅ Work with both Login Modal and Contact Form
- ✅ Update in real-time (no page refresh needed)

---

## 🆘 Troubleshooting

### Issue: "Failed to connect to server"
**Solution**: Check that:
1. The `VITE_GOOGLE_SCRIPT_URL` is correctly set in `.env.local`
2. The URL is the full Web App URL (not the script ID)
3. The Google Apps Script deployment has "Who has access" set to "Anyone"

### Issue: No data appears in the spreadsheet
**Solution**: Check:
1. You're looking at the correct spreadsheet
2. The form submission shows a success message
3. Open browser DevTools (F12) → Console to check for errors
4. Check the Apps Script Execution Logs (Apps Script Editor → Execution Logs)

### Issue: "Configuration error: Google Apps Script URL not set"
**Solution**: 
1. Make sure you created `.env.local` file (not `.env` or `.env.example`)
2. Restart your development server after creating `.env.local`
3. Verify the exact URL is in the file

### Issue: CORS or Permission Errors
**Solution**: In the Apps Script editor:
1. Check that "Who has access" is set to "Anyone"
2. Re-deploy with a new version if needed
3. Clear browser cache and try again

---

## 📝 Data Structure

The spreadsheet will have the following columns:

| Column | Data |
|--------|------|
| A | Timestamp (ISO format) |
| B | Name |
| C | Email |
| D | Phone |
| E | Type (login/contact) |
| F | Subject (contact form only) |
| G | Message (contact form only) |

---

## 🔐 Security Notes

- ✅ The Google Apps Script handles CORS properly
- ✅ Data goes directly to Google Sheets (no intermediate server required)
- ✅ Spreadsheet access is controlled by Google's permissions
- ✅ Credentials are NOT stored; only the submitted data is saved

---

## 📞 Need Help?

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review the Google Apps Script Execution Logs for detailed error messages
3. Ensure all steps in this guide were completed correctly

---

**Deployment complete! Your form is now collecting data in real-time to the Google Spreadsheet.** 🎉
