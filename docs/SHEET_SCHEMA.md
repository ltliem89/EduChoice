# EDUCHOICE-AI V10 — GOOGLE SHEETS SCHEMA SPECIFICATION

## 1. Core Operating Sheets
- **00_CONFIG**: `recordId, configKey, configValue, description, updatedAt, schemaVersion`
- **01_USERS**: `recordId, studentId, role, schoolId, status, createdAt, updatedAt, schemaVersion`
- **02_CONSENTS**: `recordId, studentId, consentVersion, status, timestamp, requestId`
- **03_STUDENT_PROFILES**: `recordId, studentId, fullName, age, gradeLevel, cohort, avatar, badge, baselineCluster, createdAt, updatedAt`
- **04_GOALS**: `recordId, studentId, goalId, category, goalTitle, target, current, unit, status, createdAt, updatedAt`
- **07_BEHAVIOR_EVENTS**: `eventId, requestId, studentId, sessionId, timestamp, feature, action, gameId, sceneId, choiceId, durationMs, valueJson, schemaVersion`
- **08_GAME_RESULTS**: `recordId, studentId, sessionId, gameId, attemptNo, startedAt, endedAt, durationMs, completionStatus, score, behaviorMetricsJson, constructSignalsJson`
- **28_TEACHER_LABELS**: `recordId, teacherId, studentId, construct, rating, notes, timestamp`
- **31_AUDIT_LOG**: `recordId, requestId, actorId, role, action, table, resourceId, beforeHash, afterHash, timestamp, reason`
- **34_DATA_DICTIONARY**: `tableName, fieldName, type, required, writable, readable, role, description`
- **35_FORM_SCHEMAS**: `formId, version, schemaJson, updatedAt`
- **36_SYSTEM_CONFIG**: `configKey, configValue, category, isPublic, updatedAt, updatedBy`
- **36_SYNC_LOG**: `queueId, requestId, route, status, clientCreatedAt, serverReceivedAt, retryCount, errorCode`
