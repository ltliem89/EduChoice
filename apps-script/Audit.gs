/**
 * EDUCHOICE-AI V10 — AUDIT ENGINE (Audit.gs)
 * Section 55: "Ô nhập nào cũng có dấu vết"
 */

function logAudit_(context, auditData) {
  try {
    const auditRepo = new SheetRepository("31_AUDIT_LOG");
    const record = {
      recordId: "AUD_" + Utilities.getUuid(),
      requestId: context.requestId || ("REQ_" + Utilities.getUuid()),
      actorId: context.userId || "SYSTEM",
      role: context.role || "UNKNOWN",
      action: auditData.action || "MUTATION",
      resourceType: auditData.table || "SYSTEM",
      resourceId: auditData.recordId || "",
      beforeHash: auditData.before ? JSON.stringify(auditData.before) : "",
      afterHash: auditData.after ? JSON.stringify(auditData.after) : "",
      timestamp: new Date().toISOString(),
      reason: auditData.reason || "Operational Change"
    };
    auditRepo.append(record);
  } catch (err) {
    Logger.log("Audit logging failed: " + err);
  }
}
