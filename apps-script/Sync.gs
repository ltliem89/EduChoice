/**
 * EDUCHOICE-AI V10 — SYNC QUEUE & LOGGING (Sync.gs)
 * Section 30: 36_SYNC_LOG for Offline-First Data Synchronization
 */

function recordSyncLog_(syncItem) {
  try {
    const syncRepo = new SheetRepository("36_SYNC_LOG");
    syncRepo.append({
      queueId: syncItem.queueId || ("SYNC_" + Utilities.getUuid()),
      requestId: syncItem.requestId || ("REQ_" + Utilities.getUuid()),
      route: syncItem.route || "UNKNOWN",
      status: syncItem.status || "accepted",
      clientCreatedAt: syncItem.clientCreatedAt || new Date().toISOString(),
      serverReceivedAt: new Date().toISOString(),
      retryCount: syncItem.retryCount || 0,
      errorCode: syncItem.errorCode || ""
    });
  } catch (err) {
    Logger.log("Sync log recording failed: " + err);
  }
}
