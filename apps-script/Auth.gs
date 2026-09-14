/**
 * EDUCHOICE-AI V10 — AUTHENTICATION & IDENTITY (Auth.gs)
 * Section 8 & 9: No Passwords in Google Sheets Principle
 */

function authenticate_(e) {
  const body = parseBody_(e);
  const authHeader = (e && e.parameter && e.parameter.auth) || (body && body.authContext);
  const roleFromClient = (body && body.role) || (e && e.parameter && e.parameter.role) || "STUDENT";
  const userId = (body && body.userId) || (e && e.parameter && e.parameter.studentId) || (body && body.studentId) || "STU_ANONYMOUS";
  const schoolId = (body && body.schoolId) || (e && e.parameter && e.parameter.schoolId) || "SCH_DEFAULT";

  // Verify Identity against 01_USERS sheet
  let verifiedRole = roleFromClient;
  try {
    const userRepo = new SheetRepository("01_USERS");
    const matched = userRepo.findBy("studentId", userId);
    if (matched && matched.length > 0) {
      verifiedRole = matched[0].role || roleFromClient;
    }
  } catch (err) {
    // Fallback for bootstrap
  }

  return {
    userId: userId,
    sessionId: (body && body.sessionId) || "SES_" + Utilities.getUuid(),
    role: verifiedRole,
    schoolId: schoolId,
    timestamp: new Date().toISOString()
  };
}

function getRequestId_(e) {
  const body = parseBody_(e);
  return (body && body.requestId) || (e && e.parameter && e.parameter.requestId) || "REQ_" + Utilities.getUuid();
}
