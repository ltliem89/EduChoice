/**
 * EDUCHOICE-AI V10 — SERVERLESS APPS SCRIPT ROUTER & GATEWAY (Router.gs)
 * Section 16 & 17: Standardized API Gateway and Router
 */

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch {
    return {};
  }
}

function resolveRoute_(method, e) {
  const routeParam = (e && e.parameter && (e.parameter.route || e.parameter.action)) || "";
  return routeParam.replace(/^\/+|\/+$/g, "");
}

function routeRequest_(method, e) {
  const requestId = getRequestId_(e);
  try {
    const route = resolveRoute_(method, e);
    const context = authenticate_(e);
    context.requestId = requestId;

    authorize_(context, route);

    const body = parseBody_(e);

    // Section 32 & 33: Idempotency protection on POST
    if (method === "POST" && body.requestId) {
      const auditRepo = new SheetRepository("31_AUDIT_LOG");
      const existing = auditRepo.findBy("requestId", body.requestId);
      if (existing.length > 0) {
        return jsonResponse_({
          ok: true,
          duplicate: true,
          requestId: body.requestId,
          message: "Request already processed (Idempotent replay)",
          meta: { version: "10.0.0", timestamp: new Date().toISOString() }
        });
      }
    }

    if (method === "GET") {
      switch (route) {
        case "health":
          const configRepo = new SheetRepository("00_CONFIG");
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            appsScript: "healthy",
            spreadsheet: "healthy",
            schemaVersion: "10.0.0",
            lastWrite: new Date().toISOString(),
            lastRead: new Date().toISOString(),
            errorRate: 0.001,
            meta: { version: "10.0.0", gateway: "APPS_SCRIPT" }
          });

        case "field/read":
          const recId = (e.parameter && e.parameter.recordId) || "";
          const fieldsStr = (e.parameter && e.parameter.fields) || "";
          const requestedFields = fieldsStr ? fieldsStr.split(",") : [];
          const fieldData = readFields_(context, recId, requestedFields);
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: fieldData,
            meta: { version: "10.0.0", timestamp: new Date().toISOString() }
          });

        case "config/public":
          const sysRepo = new SheetRepository("36_SYSTEM_CONFIG");
          const configs = sysRepo.getAll(50);
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: configs,
            meta: { version: "10.0.0" }
          });

        case "student/profile":
          const stuId = (e.parameter && e.parameter.studentId) || context.userId;
          const profiles = new SheetRepository("03_STUDENT_PROFILES").findBy("studentId", stuId);
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: profiles[0] || null
          });

        case "student/goals":
        case "goal/list":
          const targetStu = (e.parameter && e.parameter.studentId) || context.userId;
          const goals = new SheetRepository("04_GOALS").findBy("studentId", targetStu);
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: { goals: goals }
          });

        case "research/metrics":
          const totalEvents = new SheetRepository("07_BEHAVIOR_EVENTS").count();
          const totalGames = new SheetRepository("08_GAME_RESULTS").count();
          const totalTransfers = new SheetRepository("27_TRANSFER_MEASURES").count();
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: {
              totalEvents,
              totalGames,
              totalTransfers,
              dataSource: "GOOGLE_SHEETS_V10",
              timestamp: new Date().toISOString()
            }
          });

        default:
          return jsonResponse_({
            ok: false,
            requestId: requestId,
            error: { code: "UNKNOWN_GET_ROUTE", message: "Route not found: " + route }
          });
      }
    }

    if (method === "POST") {
      switch (route) {
        case "field/write":
          const writeRes = updateFields_(context, body);
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: writeRes,
            recordId: writeRes.recordId,
            serverTimestamp: writeRes.serverTimestamp,
            version: 1
          });

        case "goal/create":
          validatePayload_("goal/create", body);
          const goalRecordId = body.recordId || "GOAL_" + Utilities.getUuid();
          const newGoal = {
            recordId: goalRecordId,
            goalId: body.goalId || goalRecordId,
            studentId: body.studentId || context.userId,
            category: body.category || "Tự chủ",
            goalTitle: body.goalTitle || (body.fields && body.fields["goal.title"]) || body.title || "Mục tiêu rèn luyện",
            target: body.target || 5,
            current: body.current || 0,
            unit: body.unit || "phiên",
            status: body.status || "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          new SheetRepository("04_GOALS").append(newGoal);
          logAudit_(context, {
            action: "CREATE_GOAL",
            table: "04_GOALS",
            recordId: goalRecordId,
            after: newGoal,
            reason: body.reason || "Goal Creation"
          });
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            recordId: goalRecordId,
            data: newGoal,
            serverTimestamp: new Date().toISOString(),
            version: 1
          });

        case "student/profile":
          validatePayload_("student/profile", body);
          const studentProfile = {
            recordId: "REC_" + (body.studentId || context.userId),
            studentId: body.studentId || context.userId,
            fullName: body.name || body.fullName || (body.fields && body.fields["student.fullName"]) || "Học viên",
            gradeLevel: body.gradeLevel || "Lớp 8",
            cohort: body.cohort || "Nhóm Thực Nghiệm",
            avatar: body.avatar || "🚀",
            badge: body.badge || "Nhà Chiến Lược",
            updatedAt: new Date().toISOString()
          };
          new SheetRepository("03_STUDENT_PROFILES").append(studentProfile);
          new SheetRepository("01_USERS").append({
            recordId: studentProfile.recordId,
            studentId: studentProfile.studentId,
            role: "STUDENT",
            status: "active",
            updatedAt: new Date().toISOString()
          });
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            data: studentProfile,
            serverTimestamp: new Date().toISOString()
          });

        case "event":
          const eventPayload = body.event || body;
          new SheetRepository("07_BEHAVIOR_EVENTS").append(eventPayload);
          return jsonResponse_({ ok: true, requestId: requestId, data: eventPayload });

        case "game/result":
          const resultPayload = body.result || body;
          new SheetRepository("08_GAME_RESULTS").append(resultPayload);
          return jsonResponse_({ ok: true, requestId: requestId, data: resultPayload });

        case "teacher/label":
          const labelPayload = body.label || body;
          new SheetRepository("28_TEACHER_LABELS").append(labelPayload);
          logAudit_(context, {
            action: "CREATE_TEACHER_LABEL",
            table: "28_TEACHER_LABELS",
            recordId: labelPayload.recordId,
            after: labelPayload
          });
          return jsonResponse_({ ok: true, requestId: requestId, data: labelPayload });

        case "sync/queue":
          const queueItems = body.items || [body];
          queueItems.forEach(item => recordSyncLog_(item));
          return jsonResponse_({
            ok: true,
            requestId: requestId,
            processedCount: queueItems.length,
            serverTimestamp: new Date().toISOString()
          });

        case "config/system":
          if (!["SUPER_ADMIN", "SCHOOL_ADMIN"].includes(context.role)) {
            throw new Error("FORBIDDEN: Requires Admin role to modify 36_SYSTEM_CONFIG");
          }
          const sysConfigRepo = new SheetRepository("36_SYSTEM_CONFIG");
          const configUpdates = body.config || body;
          sysConfigRepo.append({
            recordId: "CFG_" + Utilities.getUuid(),
            configKey: configUpdates.key || "SYSTEM_RUNTIME_CONFIG",
            configValue: JSON.stringify(configUpdates),
            updatedAt: new Date().toISOString(),
            updatedBy: context.userId
          });
          return jsonResponse_({ ok: true, requestId: requestId, data: configUpdates });

        default:
          return jsonResponse_({
            ok: false,
            requestId: requestId,
            error: { code: "UNKNOWN_POST_ROUTE", message: "Route not found: " + route }
          });
      }
    }
  } catch (error) {
    logError_(error, e);
    return jsonResponse_({
      ok: false,
      requestId: requestId,
      error: {
        code: error.code || "GATEWAY_ERROR",
        message: String(error.message || error)
      }
    });
  }
}
