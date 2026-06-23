/**
 * WEDDING SITE — Google Apps Script
 * Handles RSVP submissions and Well Wishes, writing them to separate tabs
 * in a single Google Sheet.
 *
 * ── DEPLOYMENT STEPS ─────────────────────────────────────────────────────────
 * 1. Open your Google Sheet (or create a new one).
 *    - Add a tab named "RSVPs"       (columns: Timestamp | Name | Phone | Guests)
 *    - Add a tab named "Well Wishes" (columns: Timestamp | Name | Message)
 *
 * 2. In the Sheet menu: Extensions → Apps Script.
 *    Paste this entire file into the editor (replace the default code).
 *
 * 3. Update SHEET_ID below with your Google Sheet ID
 *    (found in the sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit).
 *
 * 4. Click Deploy → New deployment.
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy, authorize the permissions when prompted.
 *
 * 5. Copy the Web App URL.
 *    Add it to your project's .env.local:
 *      NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *
 * 6. IMPORTANT: Every time you edit this script, create a NEW deployment
 *    (not "manage existing deployment") to get an updated URL.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── CONFIG ───────────────────────────────────────────────────────────────────
var SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // <-- replace this
var RSVP_TAB = "RSVPs";
var WISHES_TAB = "Well Wishes";
// ─────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(raw);

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var timestamp = new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" });

    if (data.type === "wish") {
      var wishSheet = ss.getSheetByName(WISHES_TAB);
      if (!wishSheet) wishSheet = ss.insertSheet(WISHES_TAB);
      // Add header row if sheet is empty
      if (wishSheet.getLastRow() === 0) {
        wishSheet.appendRow(["Timestamp", "Name", "Message"]);
      }
      wishSheet.appendRow([timestamp, data.name || "", data.message || ""]);
    } else {
      // Default: treat as RSVP
      var rsvpSheet = ss.getSheetByName(RSVP_TAB);
      if (!rsvpSheet) rsvpSheet = ss.insertSheet(RSVP_TAB);
      if (rsvpSheet.getLastRow() === 0) {
        rsvpSheet.appendRow(["Timestamp", "Full Name", "Phone", "Guests"]);
      }
      rsvpSheet.appendRow([
        timestamp,
        data.fullName || "",
        data.phone || "",
        data.guests || "",
      ]);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: doGet for testing the endpoint is live
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "Wedding Apps Script is live!" })
  ).setMimeType(ContentService.MimeType.JSON);
}
