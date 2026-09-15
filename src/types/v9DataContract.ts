/**
 * EDUCHOICE-AI — DATA-FIRST / SHEETS-FIRST MASTER IMPLEMENTATION SPEC V9
 * Complete Type System and Data Contracts
 */

export type V9SourceType = 'student' | 'admin' | 'system' | 'ai';
export type V9Status = 'accepted' | 'rejected' | 'error' | 'completed' | 'active' | 'offered' | 'partial' | 'not_completed';

export interface V9SystemFields {
  recordId: string;       // REC_xxxxxxxx
  studentId?: string;     // STU_xxxxxxxx
  sessionId?: string;     // SES_xxxxxxxx
  eventId?: string;       // EVT_xxxxxxxx
  timestamp: string;      // ISO 8601
  clientTimestamp?: string;
  source: V9SourceType;
  feature: string;
  action: string;
  schemaVersion: string;  // e.g. "1.0.0"
  appVersion: string;     // e.g. "0.9.0"
  requestId: string;      // REQ_xxxxxxxx (Chống ghi trùng)
  status: V9Status;
  metadataJson?: string;
}

// Canonical 39 Sheets Enumeration
export type V9SheetName =
  | '00_CONFIG'
  | '01_USERS'
  | '02_CONSENTS'
  | '03_STUDENT_PROFILES'
  | '04_GOALS'
  | '05_GOAL_ACTIONS'
  | '06_SESSIONS'
  | '07_BEHAVIOR_EVENTS'
  | '08_GAME_RESULTS'
  | '09_GAME_ATTEMPTS'
  | '10_INTERVENTIONS'
  | '11_INTERVENTION_RESULTS'
  | '12_REFLECTIONS'
  | '13_MICRO_ACTIONS'
  | '14_MICRO_ACTION_RESULTS'
  | '15_STUDENT_GROWTH'
  | '16_STUDENT_STRENGTHS'
  | '17_STUDENT_PROGRESS'
  | '18_AI_DECISIONS'
  | '19_AI_RESPONSES'
  | '20_RESEARCH_MEASUREMENTS'
  | '21_RESEARCH_ANALYSES'
  | '22_GAME_METRICS'
  | '23_SYSTEM_METRICS'
  | '24_EXPERIMENTS'
  | '25_EXPERIMENT_ASSIGNMENTS'
  | '26_EXPERIMENT_OUTCOMES'
  | '27_TRANSFER_MEASURES'
  | '28_TEACHER_LABELS'
  | '29_PROBLEM_RECOGNITION'
  | '30_RESPONSE_CLASSIFICATION'
  | '31_AUDIT_LOG'
  | '32_SYSTEM_LOGS'
  | '33_ERROR_LOG'
  | '34_DATA_DICTIONARY'
  | '35_SCHEMA_VERSIONS'
  | '36_SYNC_QUEUE'
  | '37_DAILY_AGGREGATES'
  | '38_WEEKLY_AGGREGATES';

// Section 7.1: Event Engine Contract
export interface V9EventPayload {
  eventId: string;
  requestId: string;
  studentId: string;
  sessionId: string;
  timestamp: string;
  feature: string;
  action: string;
  gameId?: string;
  sceneId?: string;
  choiceId?: string;
  durationMs?: number;
  value?: Record<string, any>;
  schemaVersion: string;
  appVersion: string;
}

// Section 8: Game Result Contract
export interface V9BehaviorMetrics {
  decisionTimeMeanMs: number;
  choiceChanges: number;
  pauseCount: number;
  helpCount: number;
  retryCount: number;
  taskSwitchCount: number;
  completionRate: number;
}

export interface V9ConstructSignals {
  Planning: number;
  SelfRegulation: number;
  HelpSeeking: number;
  Prioritization?: number;
  Persistence?: number;
  Reflection?: number;
  [key: string]: number | undefined;
}

export interface V9GameResultRecord extends V9SystemFields {
  gameId: string;
  attemptNo: number;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  completionStatus: 'completed' | 'abandoned' | 'timeout';
  score?: number | null;
  behaviorMetrics: V9BehaviorMetrics;
  constructSignals: V9ConstructSignals;
}

// Section 9: Problem Recognition Data Contract
export interface V9ProblemRecognitionRecord extends V9SystemFields {
  problemType: 'TASK_FRICTION' | 'COGNITIVE_OVERLOAD' | 'PROCRASTINATION_LOOP' | 'DISTRACTION_SPIRAL' | 'HELP_AVOIDANCE';
  construct: string;
  evidence: string[];
  confidence: number; // 0..1
  severity: 'low' | 'medium' | 'high';
  action: 'observe_more' | 'trigger_micro_intervention' | 'adjust_scaffold';
}

// Section 10 & 11: Intervention & Response Data Contract
export interface V9InterventionRecord extends V9SystemFields {
  interventionId: string;
  problemRecordId: string;
  trigger: string;
  type: 'embedded' | 'pre_game' | 'post_reflection' | 'just_in_time';
  durationSeconds: number;
  presentedAt: string;
  accepted: boolean;
  completed: boolean;
  version: string;
}

export interface V9InterventionResultRecord extends V9SystemFields {
  interventionId: string;
  pre: {
    taskSwitchRate: number;
    completionRate: number;
    focusScore?: number;
  };
  post: {
    taskSwitchRate: number;
    completionRate: number;
    focusScore?: number;
  };
  responseClass: 'responder' | 'partial_responder' | 'non_responder' | 'insufficient_evidence';
  confidence: number;
}

// Section 12: Transfer Engine (Scientific core)
export interface V9TransferMeasureRecord extends V9SystemFields {
  skillId: string;
  gameMeasure: number;            // Normalized 0..100
  nearTransferMeasure: number;    // Normalized 0..100
  realWorldMeasure: number;       // Normalized 0..100
  baseline: number;
  followUp: number;
  transferIndex: number;          // 0..1
  transferGap: number;            // Standardized Game Gain - Standardized Real-World Gain
  confidence: number;
  measurementMethod: string;
}

// Section 13 & 14: Goal & Micro Action Contract
export interface V9GoalRecord extends V9SystemFields {
  goalId: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
}

export interface V9MicroActionRecord extends V9SystemFields {
  actionId: string;
  goalId?: string;
  title: string;
  instruction: string;
  durationMinutes: number;
  status: 'offered' | 'accepted' | 'completed' | 'partial' | 'not_completed';
  reflectionText?: string;
}

// Section 15: Reflection Contract
export interface V9ReflectionRecord extends V9SystemFields {
  reflectionId: string;
  promptId: string;
  choice: string;
  confidence: number;
  optionalText?: string;
}

// Section 16: Student Growth Model Contract
export interface V9StudentGrowthRecord extends V9SystemFields {
  construct: string;
  estimate: number;
  confidence: number;
  evidenceCount: number;
  modelVersion: string;
}

// Section 17 & 18: AI Decision & Response Audit
export interface V9AIDecisionRecord extends V9SystemFields {
  decisionId: string;
  inputSnapshotHash: string;
  modelProvider: string;
  modelName: string;
  promptVersion: string;
  policyVersion: string;
  decisionJson: string;
  confidence: number;
  fallbackUsed: boolean;
  validationStatus: 'valid' | 'schema_violation' | 'safety_rejected';
}

// Section 19: Experiment Engine
export interface V9ExperimentRecord extends V9SystemFields {
  experimentId: string;
  name: string;
  hypothesis: string;
  controlCondition: string;
  treatmentCondition: string;
  primaryOutcome: string;
  secondaryOutcomes: string[];
  sampleSizeControl: number;
  sampleSizeTreatment: number;
  effectSizeCohensD?: number;
  pValue?: string;
}

// Section 20: Teacher Reference Labels
export interface V9TeacherLabelRecord extends V9SystemFields {
  teacherId: string;
  targetStudentId: string;
  construct: 'Planning' | 'Persistence' | 'HelpSeeking' | 'TaskManagement' | 'AttentionRecovery';
  rating: 1 | 2 | 3 | 4; // 1 = Ít biểu hiện, 2 = Thỉnh thoảng, 3 = Thường xuyên, 4 = Rõ rệt
  notes?: string;
}

// Section 39: Data Quality & Ingestion Dashboard
export interface V9DataQualityMetrics {
  totalRecords: number;
  eventIngestionRate: number;     // e.g. 99.8%
  writeSuccessRate: number;       // e.g. 100%
  duplicateRate: number;          // e.g. 0.0%
  orphanRecordCount: number;      // e.g. 0
  syncQueueSize: number;
  dataFreshnessSeconds: number;
  lastSyncTimestamp: string;
  dataSource: 'GOOGLE_SHEETS' | 'APPS_SCRIPT_PROXY' | 'LOCAL_OFFLINE_QUEUE' | 'IN_MEMORY_MOCK';
  demoMode?: boolean;
  message?: string;
}

// Section 43: V9 E2E Integrity Test Result
export interface V9TestStepResult {
  code: string;                  // T01, T02...
  name: string;
  category: 'Write' | 'Read' | 'Validation' | 'Integrity' | 'Research';
  status: 'PASS' | 'FAIL' | 'RUNNING' | 'PENDING';
  latencyMs: number;
  detail: string;
  traceSheet?: V9SheetName;
  recordId?: string;
}
