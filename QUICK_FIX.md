# ⚡ Quick Fix for "Failed to connect to server" Error

## 🎯 The Problem
The form is showing "Failed to connect to server" error because the Google Apps Script deployment URL is not configured.

## ✅ The Solution (3 Steps)

### Step 1: Deploy Google Apps Script (5 minutes)

1. Open your Google Spreadsheet: 
   - https://docs.google.com/spreadsheets/d/11cz2MMiOWh52kU9MKo83ry2PIs8sYnMc00LnGDn2C_k

2. Click **Extensions → Apps Script**

3. Delete existing code and copy-paste from: [`google-apps-script.gs`](./google-apps-script.gs)

4. Click **Save** (💾 icon)

5. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Your email**
   - Who has access: **Anyone**

6. Click **Deploy** → **Authorize** → **Allow**

7. **Copy the Web App URL** from the success dialog
   ```
   https://script.google.com/macros/d/ABC123XYZ/usercontent/exec
   ```

### Step 2: Create `.env.local` File

In your project root, create a new file named `.env.local`:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/usercontent/exec
```

Replace `YOUR_DEPLOYMENT_ID` with your actual deployment ID from Step 1.

**Example:**
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/d/1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7/usercontent/exec
```

### Step 3: Restart Development Server

```bash
npm run dev
```

**Don't forget to restart!** Environment variables are loaded on server start.

## 🧪 Test It

1. Go to http://localhost:5173
2. Click the "Join Our Community" modal
3. Fill in Name, Email, Phone
4. Click Submit
5. Check your Google Spreadsheet - data should appear in real-time! ✅

---

## ✨ What's Fixed

✅ **Login Modal** - Credentials saved to Google Sheets in real-time
✅ **Contact Form** - Messages saved to Google Sheets instantly  
✅ **Error Messages** - Better feedback for users
✅ **Real-time Updates** - No more server connection errors

---

## 🆘 Still Getting Errors?

| Error | Solution |
|-------|----------|
| "Failed to connect to server" | Check `.env.local` file exists and is restarted dev server |
| "Configuration error" | URL not set - verify `.env.local` has correct format |
| Data not appearing in sheet | Check your spreadsheet is open at correct URL |
| CORS errors | Verify Apps Script deployment has "Anyone" access |

---

**That's it! Your form now submits directly to Google Sheets.** 🎉
