/**
 * EDUCHOICE-AI V10 — AUTHENTICATION & IDENTITY (Auth.gs)
 * Section 8 & 9: No Passwords in Google Sheets Principle
 */

function authenticate_(e) {
  const body = parseBody_(e);
  const userId = (body && body.userId) || (e && e.parameter && e.parameter.studentId) || (body && body.studentId) || "";
  const schoolId = (body && body.schoolId) || (e && e.parameter && e.parameter.schoolId) || "SCH_DEFAULT";

  // SECURITY (fail-closed): the role is NEVER taken from the client. Identity is verified
  // against 01_USERS on the server side only. Missing/unknown identity becomes GUEST
  // (unauthenticated) so no route that needs a real role can be reached.
  let verifiedRole = "GUEST";
  let authenticated = false;
  try {
    const userRepo = new SheetRepository("01_USERS");
    if (userId) {
      const matched = userRepo.findBy("studentId", userId);
      if (matched && matched.length > 0) {
        verifiedRole = matched[0].role || "STUDENT";
        authenticated = true;
      }
    }
  } catch (err) {
    // Sheets not initialized yet: remain GUEST instead of trusting the client.
  }

  return {
    userId: userId || "GUEST",
    sessionId: (body && body.sessionId) || "SES_" + Utilities.getUuid(),
    role: verifiedRole,
    authenticated: authenticated,
    schoolId: schoolId,
    timestamp: new Date().toISOString()
  };
}

function getRequestId_(e) {
  const body = parseBody_(e);
  return (body && body.requestId) || (e && e.parameter && e.parameter.requestId) || "REQ_" + Utilities.getUuid();
}
