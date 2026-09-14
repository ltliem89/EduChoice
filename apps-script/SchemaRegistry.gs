/**
 * EDUCHOICE-AI V9 - APPS SCRIPT SCHEMA REGISTRY
 * Defines canonical headers for all 39 sheets
 */

function getSheetSchemas_() {
  return {
    "00_CONFIG": ["recordId", "configKey", "configValue", "description", "updatedAt", "schemaVersion"],
    "01_USERS": ["recordId", "studentId", "role", "status", "createdAt", "updatedAt", "schemaVersion"],
    "02_CONSENTS": ["recordId", "studentId", "consentVersion", "status", "timestamp", "requestId"],
    "03_STUDENT_PROFILES": ["recordId", "studentId", "age", "gradeLevel", "baselineCluster", "createdAt", "updatedAt"],
    "04_GOALS": ["recordId", "studentId", "goalId", "category", "title", "target", "current", "unit", "status", "createdAt"],
    "05_GOAL_ACTIONS": ["recordId", "studentId", "goalId", "actionId", "status", "timestamp"],
    "06_SESSIONS": ["recordId", "sessionId", "studentId", "startedAt", "endedAt", "status", "appVersion"],
    "07_BEHAVIOR_EVENTS": ["eventId", "requestId", "studentId", "sessionId", "timestamp", "feature", "action", "gameId", "sceneId", "choiceId", "durationMs", "valueJson", "schemaVersion", "appVersion", "status"],
    "08_GAME_RESULTS": ["recordId", "studentId", "sessionId", "gameId", "attemptNo", "startedAt", "endedAt", "durationMs", "completionStatus", "score", "behaviorMetricsJson", "constructSignalsJson", "schemaVersion"],
    "09_GAME_ATTEMPTS": ["recordId", "studentId", "sessionId", "gameId", "attemptNo", "retryStrategy", "timestamp"],
    "10_INTERVENTIONS": ["recordId", "studentId", "sessionId", "interventionId", "problemRecordId", "type", "trigger", "presentedAt", "accepted", "completed", "version"],
    "11_INTERVENTION_RESULTS": ["recordId", "studentId", "interventionId", "preJson", "postJson", "responseClass", "confidence", "createdAt"],
    "12_REFLECTIONS": ["recordId", "studentId", "sessionId", "reflectionId", "promptId", "choice", "confidence", "optionalText", "createdAt"],
    "13_MICRO_ACTIONS": ["recordId", "actionId", "goalId", "title", "instruction", "durationMinutes", "createdAt"],
    "14_MICRO_ACTION_RESULTS": ["recordId", "studentId", "actionId", "status", "reflectionText", "completedAt", "timestamp"],
    "15_STUDENT_GROWTH": ["recordId", "studentId", "construct", "estimate", "confidence", "evidenceCount", "lastUpdated", "modelVersion"],
    "16_STUDENT_STRENGTHS": ["recordId", "studentId", "topStrengthsJson", "growthAreasJson", "updatedAt"],
    "17_STUDENT_PROGRESS": ["recordId", "studentId", "weekNo", "gamesCompleted", "microActionsCompleted", "streakDays", "updatedAt"],
    "18_AI_DECISIONS": ["decisionId", "studentId", "sessionId", "inputSnapshotHash", "modelProvider", "modelName", "promptVersion", "policyVersion", "decisionJson", "confidence", "fallbackUsed", "validationStatus", "createdAt"],
    "19_AI_RESPONSES": ["responseId", "decisionId", "studentId", "contentType", "response", "safetyStatus", "validationStatus", "createdAt"],
    "20_RESEARCH_MEASUREMENTS": ["recordId", "studentId", "measurementKey", "rawScore", "zScore", "percentile", "timestamp"],
    "21_RESEARCH_ANALYSES": ["recordId", "analysisId", "title", "formula", "outputJson", "cohensD", "pValue", "runAt"],
    "22_GAME_METRICS": ["recordId", "gameId", "playCount", "completionRate", "avgDurationSeconds", "updatedAt"],
    "23_SYSTEM_METRICS": ["recordId", "metricDate", "totalEvents", "successRate", "duplicateRate", "orphanCount", "freshnessSeconds"],
    "24_EXPERIMENTS": ["experimentId", "name", "hypothesis", "version", "startDate", "endDate", "controlCondition", "treatmentCondition", "primaryOutcome", "status"],
    "25_EXPERIMENT_ASSIGNMENTS": ["recordId", "experimentId", "studentId", "condition", "assignedAt", "assignmentMethod"],
    "26_EXPERIMENT_OUTCOMES": ["recordId", "experimentId", "studentId", "timepoint", "outcome", "value", "measurementSource"],
    "27_TRANSFER_MEASURES": ["recordId", "studentId", "skillId", "gameMeasure", "nearTransferMeasure", "realWorldMeasure", "baseline", "followUp", "transferIndex", "transferGap", "confidence", "measurementMethod", "timestamp"],
    "28_TEACHER_LABELS": ["recordId", "teacherId", "studentId", "construct", "rating", "notes", "timestamp"],
    "29_PROBLEM_RECOGNITION": ["recordId", "studentId", "sessionId", "problemType", "construct", "evidenceJson", "confidence", "severity", "action", "timestamp"],
    "30_RESPONSE_CLASSIFICATION": ["recordId", "studentId", "interventionId", "preValue", "postValue", "delta", "confidence", "classification", "timestamp"],
    "31_AUDIT_LOG": ["recordId", "requestId", "actorId", "role", "action", "resourceType", "resourceId", "beforeHash", "afterHash", "timestamp", "reason"],
    "32_SYSTEM_LOGS": ["recordId", "type", "payloadJson", "createdAt"],
    "33_ERROR_LOG": ["errorId", "route", "method", "errorMessage", "stackTrace", "clientIp", "timestamp"],
    "34_DATA_DICTIONARY": ["tableName", "fieldName", "type", "required", "description", "enum", "privacyClass", "source", "usedBy", "version"],
    "35_SCHEMA_VERSIONS": ["version", "releaseDate", "migrationNotes", "appliedAt"],
    "36_SYNC_QUEUE": ["queueId", "requestId", "payloadJson", "retryCount", "status", "createdAt", "lastAttemptAt"],
    "37_DAILY_AGGREGATES": ["date", "activeStudents", "totalSessions", "totalEvents", "avgCompletionRate", "transferGapMean", "calculatedAt"],
    "38_WEEKLY_AGGREGATES": ["weekId", "activeStudents", "avgGrowthPlanning", "avgGrowthSelfRegulation", "transferRatePercent", "calculatedAt"]
  };
}
