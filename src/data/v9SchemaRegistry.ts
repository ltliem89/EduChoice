/**
 * EDUCHOICE-AI V9 CANONICAL SCHEMA REGISTRY
 * Defines headers, field types, and descriptions for all 39 Google Sheets
 */

import { V9SheetName } from '../types/v9DataContract';

export interface SheetSchemaDefinition {
  name: V9SheetName;
  descriptionVi: string;
  category: 'Foundation' | 'Student' | 'Game' | 'Intervention' | 'Growth' | 'AI' | 'Research' | 'System';
  headers: string[];
  primaryKey: string;
  requiredFields: string[];
}

export const V9_CANONICAL_SCHEMAS: Record<V9SheetName, SheetSchemaDefinition> = {
  '00_CONFIG': {
    name: '00_CONFIG',
    descriptionVi: 'Cấu hình toàn hệ thống, cờ tính năng và tham số thực nghiệm',
    category: 'Foundation',
    headers: ['recordId', 'configKey', 'configValue', 'description', 'updatedAt', 'schemaVersion'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'configKey', 'configValue']
  },
  '01_USERS': {
    name: '01_USERS',
    descriptionVi: 'Hồ sơ người dùng ẩn danh (Pseudonymous User ID)',
    category: 'Foundation',
    headers: ['recordId', 'studentId', 'role', 'status', 'createdAt', 'updatedAt', 'schemaVersion'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'role']
  },
  '02_CONSENTS': {
    name: '02_CONSENTS',
    descriptionVi: 'Đồng thuận nghiên cứu đạo đức & điều khoản tham gia',
    category: 'Foundation',
    headers: ['recordId', 'studentId', 'consentVersion', 'status', 'timestamp', 'requestId'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'consentVersion', 'status']
  },
  '03_STUDENT_PROFILES': {
    name: '03_STUDENT_PROFILES',
    descriptionVi: 'Hồ sơ học viên chuẩn hóa (độ tuổi, lớp, trường ẩn danh)',
    category: 'Student',
    headers: ['recordId', 'studentId', 'age', 'gradeLevel', 'baselineCluster', 'createdAt', 'updatedAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId']
  },
  '04_GOALS': {
    name: '04_GOALS',
    descriptionVi: 'Mục tiêu học tập và thói quen do học sinh thiết lập',
    category: 'Student',
    headers: ['recordId', 'studentId', 'goalId', 'category', 'title', 'target', 'current', 'unit', 'status', 'createdAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'goalId', 'title']
  },
  '05_GOAL_ACTIONS': {
    name: '05_GOAL_ACTIONS',
    descriptionVi: 'Hành động cụ thể thực hiện cho từng mục tiêu',
    category: 'Student',
    headers: ['recordId', 'studentId', 'goalId', 'actionId', 'status', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'goalId', 'actionId']
  },
  '06_SESSIONS': {
    name: '06_SESSIONS',
    descriptionVi: 'Phiên đăng nhập và chuỗi học tập',
    category: 'Student',
    headers: ['recordId', 'sessionId', 'studentId', 'startedAt', 'endedAt', 'status', 'appVersion'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'sessionId', 'studentId', 'startedAt']
  },
  '07_BEHAVIOR_EVENTS': {
    name: '07_BEHAVIOR_EVENTS',
    descriptionVi: 'Nhật ký sự kiện vi mô thời gian thực (Telemetry Events)',
    category: 'Student',
    headers: ['eventId', 'requestId', 'studentId', 'sessionId', 'timestamp', 'feature', 'action', 'gameId', 'sceneId', 'choiceId', 'durationMs', 'valueJson', 'schemaVersion', 'appVersion', 'status'],
    primaryKey: 'eventId',
    requiredFields: ['eventId', 'requestId', 'studentId', 'action', 'timestamp']
  },
  '08_GAME_RESULTS': {
    name: '08_GAME_RESULTS',
    descriptionVi: 'Kết quả hoàn thành trò chơi nhận thức & vi hành vi',
    category: 'Game',
    headers: ['recordId', 'studentId', 'sessionId', 'gameId', 'attemptNo', 'startedAt', 'endedAt', 'durationMs', 'completionStatus', 'score', 'behaviorMetricsJson', 'constructSignalsJson', 'schemaVersion'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'gameId', 'completionStatus']
  },
  '09_GAME_ATTEMPTS': {
    name: '09_GAME_ATTEMPTS',
    descriptionVi: 'Chi tiết từng lần thử lại (Retry) và thay đổi chiến lược',
    category: 'Game',
    headers: ['recordId', 'studentId', 'sessionId', 'gameId', 'attemptNo', 'retryStrategy', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'gameId', 'attemptNo']
  },
  '10_INTERVENTIONS': {
    name: '10_INTERVENTIONS',
    descriptionVi: 'Lịch sử kích hoạt can thiệp sư phạm và giảm tải nhận thức',
    category: 'Intervention',
    headers: ['recordId', 'studentId', 'sessionId', 'interventionId', 'problemRecordId', 'type', 'trigger', 'presentedAt', 'accepted', 'completed', 'version'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'interventionId', 'presentedAt']
  },
  '11_INTERVENTION_RESULTS': {
    name: '11_INTERVENTION_RESULTS',
    descriptionVi: 'Đo lường trước/sau can thiệp & phân loại phản hồi (Responder Class)',
    category: 'Intervention',
    headers: ['recordId', 'studentId', 'interventionId', 'preJson', 'postJson', 'responseClass', 'confidence', 'createdAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'interventionId', 'responseClass']
  },
  '12_REFLECTIONS': {
    name: '12_REFLECTIONS',
    descriptionVi: 'Phản tư định hình thói quen sau phiên học',
    category: 'Student',
    headers: ['recordId', 'studentId', 'sessionId', 'reflectionId', 'promptId', 'choice', 'confidence', 'optionalText', 'createdAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'reflectionId', 'choice']
  },
  '13_MICRO_ACTIONS': {
    name: '13_MICRO_ACTIONS',
    descriptionVi: 'Danh mục các vi hành động ngoài đời thực được đề xuất',
    category: 'Student',
    headers: ['recordId', 'actionId', 'goalId', 'title', 'instruction', 'durationMinutes', 'createdAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'actionId', 'title']
  },
  '14_MICRO_ACTION_RESULTS': {
    name: '14_MICRO_ACTION_RESULTS',
    descriptionVi: 'Kết quả thực hiện vi hành động ngoài đời thực trước 21h',
    category: 'Student',
    headers: ['recordId', 'studentId', 'actionId', 'status', 'reflectionText', 'completedAt', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'actionId', 'status']
  },
  '15_STUDENT_GROWTH': {
    name: '15_STUDENT_GROWTH',
    descriptionVi: 'Mô hình ước tính tăng trưởng năng lực theo thời gian',
    category: 'Growth',
    headers: ['recordId', 'studentId', 'construct', 'estimate', 'confidence', 'evidenceCount', 'lastUpdated', 'modelVersion'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'construct', 'estimate']
  },
  '16_STUDENT_STRENGTHS': {
    name: '16_STUDENT_STRENGTHS',
    descriptionVi: 'Điểm mạnh nổi trội dựa trên bằng chứng (Strength-based approach)',
    category: 'Growth',
    headers: ['recordId', 'studentId', 'topStrengthsJson', 'growthAreasJson', 'updatedAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId']
  },
  '17_STUDENT_PROGRESS': {
    name: '17_STUDENT_PROGRESS',
    descriptionVi: 'Tổng kết tiến độ theo tuần và tỷ lệ hoàn thành',
    category: 'Growth',
    headers: ['recordId', 'studentId', 'weekNo', 'gamesCompleted', 'microActionsCompleted', 'streakDays', 'updatedAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'weekNo']
  },
  '18_AI_DECISIONS': {
    name: '18_AI_DECISIONS',
    descriptionVi: 'Nhật ký truy vết mọi quyết định của AI thích ứng',
    category: 'AI',
    headers: ['decisionId', 'studentId', 'sessionId', 'inputSnapshotHash', 'modelProvider', 'modelName', 'promptVersion', 'policyVersion', 'decisionJson', 'confidence', 'fallbackUsed', 'validationStatus', 'createdAt'],
    primaryKey: 'decisionId',
    requiredFields: ['decisionId', 'studentId', 'modelName', 'decisionJson']
  },
  '19_AI_RESPONSES': {
    name: '19_AI_RESPONSES',
    descriptionVi: 'Nội dung phản hồi sinh ra bởi AI và kết quả kiểm duyệt an toàn',
    category: 'AI',
    headers: ['responseId', 'decisionId', 'studentId', 'contentType', 'response', 'safetyStatus', 'validationStatus', 'createdAt'],
    primaryKey: 'responseId',
    requiredFields: ['responseId', 'decisionId', 'safetyStatus']
  },
  '20_RESEARCH_MEASUREMENTS': {
    name: '20_RESEARCH_MEASUREMENTS',
    descriptionVi: 'Đo lường chuẩn hóa các chỉ số tâm lý học đường',
    category: 'Research',
    headers: ['recordId', 'studentId', 'measurementKey', 'rawScore', 'zScore', 'percentile', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'measurementKey']
  },
  '21_RESEARCH_ANALYSES': {
    name: '21_RESEARCH_ANALYSES',
    descriptionVi: 'Kết quả phân tích thống kê suy luận (ANOVA, Regressions, Effect Size)',
    category: 'Research',
    headers: ['recordId', 'analysisId', 'title', 'formula', 'outputJson', 'cohensD', 'pValue', 'runAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'analysisId', 'outputJson']
  },
  '22_GAME_METRICS': {
    name: '22_GAME_METRICS',
    descriptionVi: 'Chỉ số đo lường hiệu năng của từng kịch bản game',
    category: 'Game',
    headers: ['recordId', 'gameId', 'playCount', 'completionRate', 'avgDurationSeconds', 'updatedAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'gameId']
  },
  '23_SYSTEM_METRICS': {
    name: '23_SYSTEM_METRICS',
    descriptionVi: 'Chỉ số chất lượng dữ liệu hệ thống (Ingestion, Dupes, Latency)',
    category: 'System',
    headers: ['recordId', 'metricDate', 'totalEvents', 'successRate', 'duplicateRate', 'orphanCount', 'freshnessSeconds'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'metricDate', 'successRate']
  },
  '24_EXPERIMENTS': {
    name: '24_EXPERIMENTS',
    descriptionVi: 'Sổ đăng ký các thử nghiệm A/B và can thiệp đối chứng',
    category: 'Research',
    headers: ['experimentId', 'name', 'hypothesis', 'version', 'startDate', 'endDate', 'controlCondition', 'treatmentCondition', 'primaryOutcome', 'status'],
    primaryKey: 'experimentId',
    requiredFields: ['experimentId', 'name', 'hypothesis']
  },
  '25_EXPERIMENT_ASSIGNMENTS': {
    name: '25_EXPERIMENT_ASSIGNMENTS',
    descriptionVi: 'Phân bổ học sinh vào các nhánh thử nghiệm ngẫu nhiên',
    category: 'Research',
    headers: ['recordId', 'experimentId', 'studentId', 'condition', 'assignedAt', 'assignmentMethod'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'experimentId', 'studentId', 'condition']
  },
  '26_EXPERIMENT_OUTCOMES': {
    name: '26_EXPERIMENT_OUTCOMES',
    descriptionVi: 'Kết quả đầu ra của từng nhóm thử nghiệm',
    category: 'Research',
    headers: ['recordId', 'experimentId', 'studentId', 'timepoint', 'outcome', 'value', 'measurementSource'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'experimentId', 'studentId', 'value']
  },
  '27_TRANSFER_MEASURES': {
    name: '27_TRANSFER_MEASURES',
    descriptionVi: 'Khoảng cách chuyển hóa (Transfer Gap = Game Gain - Real Gain)',
    category: 'Research',
    headers: ['recordId', 'studentId', 'skillId', 'gameMeasure', 'nearTransferMeasure', 'realWorldMeasure', 'baseline', 'followUp', 'transferIndex', 'transferGap', 'confidence', 'measurementMethod', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'skillId', 'transferGap']
  },
  '28_TEACHER_LABELS': {
    name: '28_TEACHER_LABELS',
    descriptionVi: 'Đánh giá tham chiếu của giáo viên quan sát hành vi thực tế',
    category: 'Research',
    headers: ['recordId', 'teacherId', 'studentId', 'construct', 'rating', 'notes', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'teacherId', 'studentId', 'construct', 'rating']
  },
  '29_PROBLEM_RECOGNITION': {
    name: '29_PROBLEM_RECOGNITION',
    descriptionVi: 'Mô hình nhận diện mẫu hình khó khăn hành vi (Friction Patterns)',
    category: 'Research',
    headers: ['recordId', 'studentId', 'sessionId', 'problemType', 'construct', 'evidenceJson', 'confidence', 'severity', 'action', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'problemType', 'confidence']
  },
  '30_RESPONSE_CLASSIFICATION': {
    name: '30_RESPONSE_CLASSIFICATION',
    descriptionVi: 'Phân loại mức độ hưởng ứng can thiệp (Responder / Non-responder)',
    category: 'Research',
    headers: ['recordId', 'studentId', 'interventionId', 'preValue', 'postValue', 'delta', 'confidence', 'classification', 'timestamp'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'studentId', 'classification', 'delta']
  },
  '31_AUDIT_LOG': {
    name: '31_AUDIT_LOG',
    descriptionVi: 'Nhật ký kiểm toán mọi hành động và chống ghi trùng (Idempotency)',
    category: 'System',
    headers: ['recordId', 'requestId', 'actorId', 'role', 'action', 'resourceType', 'resourceId', 'beforeHash', 'afterHash', 'timestamp', 'reason'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'requestId', 'action', 'timestamp']
  },
  '32_SYSTEM_LOGS': {
    name: '32_SYSTEM_LOGS',
    descriptionVi: 'Nhật ký vận hành kỹ thuật và đồng bộ dữ liệu',
    category: 'System',
    headers: ['recordId', 'type', 'payloadJson', 'createdAt'],
    primaryKey: 'recordId',
    requiredFields: ['recordId', 'type', 'createdAt']
  },
  '33_ERROR_LOG': {
    name: '33_ERROR_LOG',
    descriptionVi: 'Nhật ký lỗi API, sai schema hoặc mất kết nối',
    category: 'System',
    headers: ['errorId', 'route', 'method', 'errorMessage', 'stackTrace', 'clientIp', 'timestamp'],
    primaryKey: 'errorId',
    requiredFields: ['errorId', 'route', 'errorMessage', 'timestamp']
  },
  '34_DATA_DICTIONARY': {
    name: '34_DATA_DICTIONARY',
    descriptionVi: 'Từ điển dữ liệu sống (Data Dictionary) mô tả từng trường thông tin',
    category: 'Foundation',
    headers: ['tableName', 'fieldName', 'type', 'required', 'description', 'enum', 'privacyClass', 'source', 'usedBy', 'version'],
    primaryKey: 'tableName',
    requiredFields: ['tableName', 'fieldName', 'type']
  },
  '35_SCHEMA_VERSIONS': {
    name: '35_SCHEMA_VERSIONS',
    descriptionVi: 'Lịch sử thay đổi và phiên bản schema',
    category: 'Foundation',
    headers: ['version', 'releaseDate', 'migrationNotes', 'appliedAt'],
    primaryKey: 'version',
    requiredFields: ['version', 'releaseDate']
  },
  '36_SYNC_QUEUE': {
    name: '36_SYNC_QUEUE',
    descriptionVi: 'Hàng đợi đồng bộ ngoại tuyến (Offline Sync Queue)',
    category: 'System',
    headers: ['queueId', 'requestId', 'payloadJson', 'retryCount', 'status', 'createdAt', 'lastAttemptAt'],
    primaryKey: 'queueId',
    requiredFields: ['queueId', 'requestId', 'status']
  },
  '37_DAILY_AGGREGATES': {
    name: '37_DAILY_AGGREGATES',
    descriptionVi: 'Tổng hợp phân tích thống kê cấp ngày',
    category: 'Research',
    headers: ['date', 'activeStudents', 'totalSessions', 'totalEvents', 'avgCompletionRate', 'transferGapMean', 'calculatedAt'],
    primaryKey: 'date',
    requiredFields: ['date', 'activeStudents']
  },
  '38_WEEKLY_AGGREGATES': {
    name: '38_WEEKLY_AGGREGATES',
    descriptionVi: 'Tổng hợp phân tích thống kê cấp tuần phục vụ báo cáo khoa học',
    category: 'Research',
    headers: ['weekId', 'activeStudents', 'avgGrowthPlanning', 'avgGrowthSelfRegulation', 'transferRatePercent', 'calculatedAt'],
    primaryKey: 'weekId',
    requiredFields: ['weekId', 'activeStudents']
  }
};
