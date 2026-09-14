/**
 * EDUCHOICE-AI V10 — ERROR LOGGING (ErrorLog.gs)
 * Section 61: Observability & Incident Logging
 */

function logError_(error, e) {
  try {
    const errorRepo = new SheetRepository("33_ERROR_LOG");
    const route = (e && e.parameter && e.parameter.route) || "UNKNOWN";
    const method = e && e.postData ? "POST" : "GET";
    
    errorRepo.append({
      errorId: "ERR_" + Utilities.getUuid(),
      route: route,
      method: method,
      errorMessage: String(error.message || error),
      stackTrace: error.stack || "",
      clientIp: "GATEWAY",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    Logger.log("Critical: Failed to write to 33_ERROR_LOG: " + err);
  }
}
