/**
 * EDUCHOICE-AI V10 — APPS SCRIPT MAIN ENTRY POINT
 * Google Sheets + Apps Script Serverless Remote Management Gateway
 */

function doGet(e) {
  return routeRequest_("GET", e);
}

function doPost(e) {
  return routeRequest_("POST", e);
}

// Handle CORS preflight (OPTIONS). Apps Script content responses carry
// Access-Control-Allow-Origin for web-app deployments.
function doOptions(e) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, method: "OPTIONS" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAppProperties_() {
  const props = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: props.getProperty("SPREADSHEET_ID") || SpreadsheetApp.getActiveSpreadsheet().getId(),
    appEnv: props.getProperty("APP_ENV") || "production",
    apiVersion: props.getProperty("API_VERSION") || "10.0.0",
    allowedOrigins: props.getProperty("ALLOWED_ORIGINS") || "*"
  };
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🚀 EduChoice-AI V10")
    .addItem("Khởi tạo Toàn bộ 39 Bảng Tính", "initializeEduChoiceSheets")
    .addItem("Chạy Kiểm thử Tự động (Self-Test)", "runV10SelfTests")
    .addItem("Xem Trạng thái Hệ thống", "showSystemStatusDialog")
    .addToUi();
}

function showSystemStatusDialog() {
  const ui = SpreadsheetApp.getUi();
  const repo = new SheetRepository("00_CONFIG");
  const configCount = repo.count();
  ui.alert("EduChoice-AI V10 Status", `Gateway: Sẵn sàng\nPhiên bản: 10.0.0\nSố bản ghi Config: ${configCount}`, ui.ButtonSet.OK);
}
