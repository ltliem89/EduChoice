/**
 * EDUCHOICE-AI v3 — Type Definitions
 * Game DSL, Admin Scripting, Psychology Toolkits, Telemetry, and Adaptive Reasoning
 */

export interface AgeRange {
  min: number;
  max: number;
}

export type SceneType =
  | 'situation'
  | 'choice'
  | 'consequence'
  | 'intervention'
  | 'reflection'
  | 'ending';

export interface Choice {
  id: string;
  label: string;
  consequenceId: string;
  toolkitHint?: string;
  constructImpact?: {
    construct: string;
    delta: number;
  };
}

export interface Scene {
  id: string;
  type: SceneType;
  content: string;
  characterMood?: 'neutral' | 'stressed' | 'focused' | 'happy' | 'reflective';
  timeLimitSeconds?: number;
  choices?: Choice[];
  toolkitId?: string;
  nextSceneId?: string;
  interventionPrompt?: string;
  reflectionQuestion?: string;
}

export interface SafetySpec {
  status: 'approved' | 'needs_review';
  reviewerNotes?: string;
  contentRating?: 'G' | 'PG' | 'safe_for_all';
}

export interface GameSpecification {
  gameId: string;
  title: string;
  ageRange: AgeRange;
  durationMinutes: number; // 1 to 5
  constructs: string[];
  scenes: Scene[];
  safety: SafetySpec;
  version: string;
  toolkitIds?: string[];
  description?: string;
  category?: string;
  scriptId?: string;
  status?: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  approvedBy?: string;
  publishedAt?: string;
  updatedAt?: string;
  microAction?: MicroActionDefinition;
}

export type ScriptStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived';

export interface ScriptItem {
  id: string;
  title: string;
  ageRange: AgeRange;
  durationMinutes: number;
  objectives: string;
  constructs: string[];
  rawScript: string;
  version: string;
  status: ScriptStatus;
  createdAt: string;
  updatedAt: string;
  approvedBy?: string;
  publishedAt?: string;
  generatedSpec?: GameSpecification;
}

export interface PsychologyToolkit {
  id: string;
  name: string;
  nameVi: string;
  ageRange: AgeRange;
  purpose: string;
  scenarios: string[];
  mechanics: string;
  microInterventions: string[];
  safePhrases: string[];
  avoidPhrases: string[];
  contraindications: string[];
  version: string;
  approved: boolean;
}

export type BehaviorEventType =
  | 'game_started'
  | 'scene_viewed'
  | 'choice_made'
  | 'choice_changed'
  | 'hint_requested'
  | 'help_requested'
  | 'pause'
  | 'resumed'
  | 'abandoned'
  | 'completed'
  | 'retry'
  | 'reflection_submitted'
  | 'micro_action_offered'
  | 'micro_action_accepted'
  | 'micro_action_started'
  | 'micro_action_completed'
  | 'goal_created'
  | 'goal_updated';

export interface BehaviorEvent {
  eventId: string;
  sessionId: string;
  userId: string;
  gameId: string;
  sceneId: string;
  type: BehaviorEventType;
  timestamp: number;
  payload?: Record<string, any>;
}

export type ConstructName =
  | 'Planning'
  | 'Prioritization'
  | 'ProblemSolving'
  | 'SelfRegulation'
  | 'AttentionControl'
  | 'HelpSeeking'
  | 'Reflection'
  | 'Adaptability'
  | 'GoalSetting'
  | 'Communication'
  | 'ConsequencePrediction'
  | 'Persistence'
  | 'Autonomy'
  | 'TimeManagement'
  | 'DistractionRecovery'
  | 'Cooperation'
  | 'Empathy'
  | 'Responsibility'
  | 'HealthyRoutine'
  | 'Balance';

export interface ConstructDetail {
  construct: ConstructName;
  estimate: number; // 0..100
  confidence: number; // 0..1
  evidenceCount: number;
  trend: number; // e.g. +0.06
  lastUpdated: string;
}

export interface MicroActionDefinition {
  id: string;
  title: string;
  durationMinutes: number; // 3, 5, 10
  category?: string;
  instruction: string;
  verificationQuestion?: string;
}

export type GoalCategory =
  | 'academic'
  | 'personal'
  | 'lifestyle'
  | 'relationship'
  | 'responsibility'
  | 'creativity'
  | 'community';

export interface GoalItem {
  goalId: string;
  category: GoalCategory;
  title: string;
  period: 'daily' | 'weekly';
  target: number;
  current: number;
  unit: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export type MicroActionStatus =
  | 'offered'
  | 'accepted'
  | 'started'
  | 'completed'
  | 'reflected';

export interface StudentMicroAction {
  id: string;
  goalId?: string;
  gameId?: string;
  title: string;
  durationMinutes: number;
  category: string;
  instruction: string;
  status: MicroActionStatus;
  offeredAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  reflectedAt?: string;
  reflectionText?: string;
}

export interface StrengthItem {
  construct: ConstructName;
  estimate: number;
  confidence: number;
  evidenceCount: number;
  trend: number;
  labelVi: string;
  strengthPraise: string;
}

export interface GrowthAreaItem {
  construct: ConstructName;
  estimate: number;
  confidence: number;
  trend: number;
  labelVi: string;
  constructiveGuidance: string;
}

export type FeedbackType = 'recognition' | 'strategy' | 'progress' | 'next_action';

export interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  title: string;
  content: string;
  timestamp: string;
}

export interface LifeBalanceArea {
  name: 'Học' | 'Ngủ' | 'Nghỉ' | 'Vận động' | 'Gia đình' | 'Bạn bè' | 'Sở thích' | 'Điện thoại' | 'Trách nhiệm';
  targetHours: number;
  actualHours: number;
  icon: string;
  status: 'balanced' | 'over' | 'under';
}

export type UserRole =
  | 'STUDENT'
  | 'TEACHER'
  | 'CONTENT_ADMIN'
  | 'RESEARCH_ADMIN';

export interface ResearchAnalysisRecord {
  analysisId: string;
  analysisType: string;
  datasetVersion: string;
  population: string;
  inclusionCriteria: string;
  variables: string[];
  method: string;
  modelFormula?: string;
  estimate: number | string;
  standardError?: number;
  confidenceInterval: [number, number] | string;
  effectSize?: string;
  pValue?: number | string;
  assumptionsChecked: string[];
  limitations: string;
  createdAt: string;
}

export interface StudentModel {
  userId: string;
  name?: string;
  avatar?: string;
  badge?: string;
  streakDays?: number;
  age: number;
  gradeLevel: string;
  constructs: Record<ConstructName, number>; // 0 to 100
  constructDetails?: Partial<Record<ConstructName, ConstructDetail>>;
  recentInterventions: string[];
  sessionsCompleted: number;
  lastActive: string;
  goals?: GoalItem[];
  microActions?: StudentMicroAction[];
  growthHistory?: {
    date: string;
    construct: ConstructName;
    score: number;
  }[];
  growthAreas?: GrowthAreaItem[];
  strengths?: StrengthItem[];
  lifeBalance?: LifeBalanceArea[];
  statsSummary?: {
    retryCount: number;
    strategyChangeCount: number;
    helpRequestCount: number;
    microActionsCompleted: number;
    reflectionsCompleted: number;
  };
}

export interface AdaptiveDecision {
  decision: {
    nextGameId: string;
    durationMinutes: number;
    difficulty: number;
    toolkitId: string;
    interventionType: 'embedded' | 'pre_game' | 'post_reflection' | 'just_in_time';
  };
  evidence: {
    primaryConstruct: string;
    confidence: number;
    reasoning: string;
  };
  safety: {
    status: 'normal' | 'intervention_required';
  };
  source: 'gemini' | 'deterministic_fallback';
}

export interface AuditLog {
  id: string;
  actor: string;
  role: 'Admin' | 'AI Designer' | 'System' | 'Validator';
  timestamp: string;
  entity: 'script' | 'game' | 'toolkit' | 'session';
  entityId: string;
  version: string;
  operation: 'CREATE' | 'UPDATE' | 'GENERATE_AI' | 'VALIDATE' | 'APPROVE' | 'PUBLISH' | 'ARCHIVE';
  diffNotes: string;
}

export interface ValidationResult {
  isValid: boolean;
  schemaValid: boolean;
  safetyValid: boolean;
  referencesValid: boolean;
  toolkitValid: boolean;
  errors: string[];
  warnings: string[];
}

// ==========================================
// MASTER SPECIFICATION v5 ADVANCED EXTENSIONS
// ==========================================

export type EvidenceLevel =
  | 'L0_EXPERT_DESIGN'
  | 'L1_PILOT_EVIDENCE'
  | 'L2_CONTROLLED_STUDY'
  | 'L3_REPLICATED_EVIDENCE';

export interface ConfidenceConstructDetail {
  construct: ConstructName;
  estimate: number; // 0..100
  lower: number;    // lower 95% CI bound
  upper: number;    // upper 95% CI bound
  confidence: number; // 0..1
  evidenceCount: number;
  trend: number;
  lastUpdated: string;
  uncertaintyStatus: 'low_uncertainty' | 'moderate' | 'high_uncertainty';
}

export interface InterventionDefinition {
  interventionId: string;
  title: string;
  construct: ConstructName;
  mechanism: string;
  scenario: string;
  targetBehavior: string;
  microActionTitle: string;
  contraindications?: string;
  evidenceLevel: EvidenceLevel;
  version: string;
  approvalStatus: 'DRAFT' | 'PILOT' | 'APPROVED' | 'EXPERIMENTAL' | 'PRODUCTION' | 'ARCHIVED';
  effectSizeEstimate?: number; // Cohen's d or standardized beta
  sampleSize?: number;
  lastEvaluated?: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'construct' | 'behavior' | 'game' | 'intervention' | 'micro_action' | 'outcome';
  category?: string;
  details?: string;
}

export interface KnowledgeGraphEdge {
  id: string;
  from: string;
  to: string;
  relation: 'measured_by' | 'supported_by' | 'triggers_action' | 'leads_to_outcome' | 'mediates';
  weight?: number;
}

export interface ExperimentRecord {
  experimentId: string;
  title: string;
  hypothesis: string;
  primaryOutcome: string;
  secondaryOutcomes: string[];
  population: string;
  eligibility: string;
  interventionGroup: string;
  controlGroup: string;
  randomizationType: 'between_subjects' | 'n_of_1' | 'micro_randomized';
  analysisPlanYaml: string;
  status: 'PRE_REGISTERED' | 'ACTIVE' | 'ANALYSIS_LOCKED' | 'COMPLETED';
  sampleSizeTarget: number;
  currentEnrollment: number;
  startDate: string;
  resultsSummary?: {
    ate: number; // Average Treatment Effect
    ci95: [number, number];
    pValue: number;
    interpretation: string;
    transferGap: number;
  };
}

export interface TransferGapAnalysis {
  domain: string;
  gameSuccessRate: number; // % in simulation
  realWorldActionSuccessRate: number; // % real-world action completion
  transferGap: number; // gap percentage
  transferStatus: 'healthy_transfer' | 'moderate_gap' | 'high_transfer_gap';
  recommendation: string;
}

export interface CausalClaimRecord {
  claimId: string;
  relationship: string;
  associationMetric: string;
  causalEvidenceLevel: 'insufficient' | 'preliminary_adjusted' | 'quasi_experimental' | 'causal_verified';
  confoundersControlled: string[];
  dagPath: string;
  guidanceNote: string;
}

export interface PolicyRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  priority: number;
  active: boolean;
  category: 'safety' | 'workload' | 'adaptation' | 'rest';
  description: string;
}

export interface PolicySimulationScenario {
  id: string;
  scenarioName: string;
  studentProfileSummary: string;
  timeBudgetMinutes: number;
  abandonRate7d: number;
  strategyChangeRate14d: number;
  currentStressProxy: 'low' | 'moderate' | 'elevated';
  triggeredRuleId: string;
  predictedAction: string;
  riskAssessment: 'none' | 'low' | 'medium';
}

// ==========================================
// MASTER SPECIFICATION V6 SUPER INTELLIGENCE EXTENSIONS
// ==========================================

export type TaskType =
  | 'LEARNING'
  | 'ASSIGNMENT'
  | 'GOAL'
  | 'HABIT'
  | 'MISSION'
  | 'MICRO_ACTION'
  | 'REFLECTION'
  | 'PROJECT'
  | 'PRACTICE'
  | 'OTHER';

export type TaskStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ABANDONED'
  | 'DEFERRED';

export interface TaskState {
  taskId: string;
  studentId: string;
  title: string;
  type: TaskType;
  priority: number; // 1..5
  urgency: number; // 0..1
  importance: number; // 0..1
  estimatedEffortMinutes: number;
  cognitiveLoad: number; // 0..1
  switchingCost: number; // 0..1
  deadline?: string;
  progress: number; // 0..100
  difficulty: number; // 1..5
  dependencyIds: string[];
  interestSignal?: number; // 0..1
  completionProbability?: number; // 0..1
  status: TaskStatus;
  updatedAt: string;
}

export interface CognitiveLoadState {
  overallLoad: number;       // 0..1
  intrinsicLoad: number;     // 0..1
  extraneousLoad: number;    // 0..1
  constructiveLoad: number;  // 0..1 (Germane)
  switchingCost: number;     // 0..1
  attentionFragmentation: number; // 0..1
  distractionRecoveryIndex: number; // 0..1 (DRI)
  confidence: number;
  evidenceCount: number;
  timeWindow: string;
  loadStatus: 'optimal' | 'light' | 'elevated' | 'overload_risk';
}

export interface MissionStep {
  stepId: string;
  order: number;
  title: string;
  type: 'goal_check' | 'simulation' | 'micro_action' | 'reflection' | 'practice';
  durationMinutes: number;
  completed: boolean;
  gameId?: string;
  microActionId?: string;
  promptNotes?: string;
}

export interface MissionPlan {
  missionId: string;
  title: string;
  description: string;
  targetGoalTitle: string;
  constructTarget: ConstructName;
  steps: MissionStep[];
  currentStepIndex: number;
  status: 'draft' | 'in_progress' | 'completed' | 'paused';
  startedAt?: string;
  completedAt?: string;
}

export type AgentId =
  | 'behavior_agent'
  | 'goal_agent'
  | 'safety_agent'
  | 'research_agent'
  | 'analytics_agent'
  | 'intervention_agent'
  | 'policy_agent'
  | 'student_agent';

export interface SpecialistAgentDecision {
  agentId: AgentId;
  agentNameVi: string;
  recommendation: string;
  primaryAction: string;
  evidence: string[];
  confidence: number;
  uncertainty: number;
  riskAssessment: 'none' | 'low' | 'moderate' | 'veto';
  vetoTriggered?: boolean;
  timestamp: string;
}

export interface DecisionFusionResult {
  fusionId: string;
  consensusScore: number; // 0..1
  conflictScore: number;  // 0..1
  safetyVetoApplied: boolean;
  winningPolicyAction: string;
  selectedExperienceId: string;
  selectedToolkitId: string;
  whyExplanation: {
    why: string;
    evidence: string[];
    confidence: number;
    alternativeRejected: string;
    reasonRejected: string;
    constraintsEnforced: string[];
    expectedOutcome: string;
  };
  agentDecisions: SpecialistAgentDecision[];
  timestamp: string;
}

export interface CounterfactualSimulationRecord {
  simulationId: string;
  observedTrigger: string;
  policiesCompared: {
    policyName: string;
    description: string;
    predictedOutcome: string;
    expectedSuccessRate: number; // %
    cognitiveLoadCost: number; // 0..1
    confidence: number;
  }[];
  recommendedPolicy: string;
  notes: string;
}

export interface StudentAgencyMetric {
  choiceDiversityScore: number; // 0..100
  voluntaryRetryRate: number;   // 0..100
  goalOwnershipScore: number;   // 0..100
  suggestionRefusalOrAdaptRate: number; // 0..100
  selfInitiatedActionsCount: number;
  agencyLevel: 'high_autonomy' | 'developing_agency' | 'guided_support';
}

// Master Spec V6.14 - V6.19: Super Analytics Engine
export interface SuperAnalyticsMetrics {
  level1Descriptive: {
    totalSessions: number;
    completionRate: number;
    meanSessionDurationSeconds: number;
    medianDecisionsPerSession: number;
    totalChoicesLogged: number;
  };
  level2Behavioral: {
    meanRetryAttempts: number;
    abandonmentThresholdSeconds: number;
    impulsiveChoiceRatio: number;
    reflectionCompletionRate: number;
    voluntaryReplayRatio: number;
  };
  level3Temporal: {
    peakHours: string;
    rolling24hActiveStudents: number;
    rolling7dRetentionRate: number;
    rolling14dLearningVelocity: number;
    rolling30dSkillSustainability: number;
  };
  level4Sequential: {
    stateTransitionMatrix: { fromState: string; toState: string; probability: number }[];
    markovEntropy: number;
    dominantSuccessPathway: string[];
    dominantDropoutPathway: string[];
  };
  level5Causal: {
    averageTreatmentEffect: number; // Cohen's d
    confidenceInterval: [number, number];
    transferGapToHomework: number;
    complianceScore: number;
  };
  level6Predictive: {
    hazardRateNextAbandonment: number;
    nextLikelyAction: string;
    fatigueRiskIndex: number;
    trajectoryGrowthRate: number; // G(t) slope
  };
  level7Prescriptive: {
    optimalPolicyUnderBudget: string;
    recommendedBreakDurationMinutes: number;
    cognitiveLoadConstraintSatisfied: boolean;
    tradeoffNotes: string;
  };
  changePoints: {
    id: string;
    detectedAt: string;
    construct: ConstructName;
    magnitudeDelta: number;
    method: 'CUSUM' | 'PELT' | 'Bayesian';
    notes: string;
  }[];
  anomalies: {
    id: string;
    type: 'EVENT_FLOOD' | 'BOT_REPETITION' | 'CLOCK_DRIFT' | 'LATENCY_OUTLIER';
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    timestamp: string;
    details: string;
    actionTaken: string;
  }[];
}

// Master Spec V6.23 - V6.31: Research Discovery & Brief Engine
export interface ResearchHypothesis {
  hypothesisId: string;
  statementVi: string;
  constructTarget: ConstructName;
  observedPattern: string;
  evidenceStrength: 'STRONG' | 'MODERATE' | 'PRELIMINARY';
  sampleSize: number;
  pValueProxy: number;
  effectSizeEstimate: number; // Cohen's d
  status: 'ACCEPTED' | 'TESTING' | 'REJECTED';
  formulatedDate: string;
}

export interface AutomatedResearchBrief {
  briefId: string;
  title: string;
  cohortName: string;
  generatedDate: string;
  sampleCount: number;
  executiveSummary: string;
  constructProgressions: {
    construct: ConstructName;
    baselineMean: number;
    postInterventionMean: number;
    gainDelta: number;
    effectSizeD: number;
  }[];
  mechanismSynthesis: string;
  threatsToValidity: string[];
  trialRecommendations: {
    recommendedDesign: string;
    sampleSizeNeeded: number;
    targetConstruct: ConstructName;
    durationWeeks: number;
  };
  publicationAbstractVi: string;
}

export interface DataLineageNode {
  nodeId: string;
  stage: 'RAW_INGESTION' | 'FEATURE_EXTRACTION' | 'STUDENT_MODEL' | 'AGENT_FUSION' | 'OUTCOME_TRACKING';
  name: string;
  inputs: string[];
  transformation: string;
  dataQualityScore: number;
  lastUpdated: string;
}

export interface CalibrationAndDriftState {
  calibration: {
    brierScore: number; // closer to 0 is better
    expectedCalibrationError: number; // ECE < 0.05 is good
    sharpness: number;
    reliabilityBins: { confidenceBin: string; accuracy: number; count: number }[];
  };
  drift: {
    dataDriftPsi: number; // Population Stability Index < 0.1 stable
    conceptDriftPValue: number;
    policyDriftRatio: number;
    alertStatus: 'STABLE' | 'WATCHLIST' | 'DRIFT_DETECTED';
    notes: string;
  };
}

// ==========================================
// EDUCHOICE-AI V7: COGNITIVE FUSION & FUTURE INTELLIGENCE
// ==========================================

export type WeakSignalClassification =
  | 'NOISE'
  | 'WEAK_SIGNAL'
  | 'EMERGING_PATTERN'
  | 'STABLE_PATTERN'
  | 'SIGNIFICANT_CHANGE';

export interface WeakSignal {
  signalId: string;
  metricName: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  classification: WeakSignalClassification;
  novelty: number; // 0..1
  persistence: number; // 0..1
  evidenceCount: number;
  confidence: number; // 0..1
  deviationDelta: string;
  contexts: string[];
  firstObservedAt: string;
  lastObservedAt: string;
  descriptionVi: string;
}

export interface ContradictionRecord {
  contradictionId: string;
  title: string;
  discrepancyType: 'GAME_VS_REAL_WORLD' | 'SELF_REPORT_VS_BEHAVIOR' | 'MULTI_AGENT_CONFLICT' | 'TEMPORAL_INVERSION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  sourceA: {
    name: string;
    claim: string;
    value: string | number;
    reliability: number;
  };
  sourceB: {
    name: string;
    claim: string;
    value: string | number;
    reliability: number;
  };
  synthesisNotes: string;
  suggestedAction: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
}

export interface EvidenceGraphItem {
  evidenceId: string;
  sourceType: 'DIRECT_BEHAVIOR' | 'REPEATED_PATTERN' | 'SELF_REPORT' | 'TEACHER_OBSERVATION' | 'AI_INFERENCE';
  description: string;
  reliability: number; // 0..1
  recency: number; // 0..1
  specificity: number; // 0..1
  independence: number; // 0..1
  contextMatch: number; // 0..1
  confidence: number; // 0..1
  supportsHypothesisCodes: string[];
  contradictsHypothesisCodes: string[];
  recordedAt: string;
}

export interface MultiHypothesisItem {
  hypothesisId: string;
  code: string; // e.g. H1, H2, H6
  title: string;
  mechanism: string;
  priorProbability: number; // 0..1
  posteriorProbability: number; // 0..1
  evidenceForCount: number;
  evidenceAgainstCount: number;
  isDisconfirmingChecked: boolean;
  status: 'LEADING' | 'COMPETING' | 'DISPROVED' | 'UNDER_REVIEW';
  clinicalDisclaimer: string;
}

export interface MinimumEffectiveIntervention {
  level: number; // 0..6
  levelCode: 'L0_OBSERVE' | 'L1_NUDGE' | 'L2_REFLECT' | 'L3_MICRO_ACTION' | 'L4_GUIDED_GAME' | 'L5_PRACTICE' | 'L6_HUMAN_SUPPORT';
  title: string;
  intensityLabel: string;
  durationMinutes: number;
  description: string;
  escalationCondition: string;
  deescalationCondition: string;
  reversibility: 'HIGH' | 'MEDIUM' | 'LOW';
  isActive: boolean;
}

export interface SelfCritiqueRecord {
  critiqueId: string;
  proposedAction: string;
  assumptions: string[];
  counterEvidence: string[];
  unknowns: string[];
  sensitivityFactors: string[];
  robustnessScore: number; // 0..1
  robustnessStatus: 'ROBUST' | 'MODERATE' | 'FRAGILE';
  riskIfWrong: string;
  saferReversibleAlternative: string;
  evaluatedDate: string;
}

export interface TransferGapMetric {
  metricId: string;
  domain: string;
  construct: ConstructName;
  gameSuccessRate: number; // 0..1
  realWorldTransferRate: number; // 0..1
  transferGap: number; // gameSuccess - realWorldTransfer
  transferStatus: 'HIGH_TRANSFER' | 'MODERATE_TRANSFER' | 'TRANSFER_BARRIER';
  ecologicalValidityScore: number; // 0..1
  recommendation: string;
}

export interface FailureMemoryItem {
  memoryId: string;
  contextSummary: string;
  interventionAttempted: string;
  failureReason: string;
  lessonLearned: string;
  preventativeConstraint: string;
  timestamp: string;
}

/**
 * ============================================================
 * EDUCHOICE-AI V8 — COGNITIVE EVOLUTION ENGINE TYPES
 * Master Spec V8.1 - V8.50
 * ============================================================
 */

export interface NovelPattern {
  patternId: string;
  name: string;
  description: string;
  novelty: number; // 0..1
  prevalence: number; // 0..1
  persistence: number; // 0..1
  contextCoverage: number; // 0..1
  confidence: number; // 0..1
  evidenceCount: number;
  status: 'candidate' | 'reviewed' | 'validated' | 'rejected';
  contexts: string[];
  discoveredAt: string;
  actionOpportunity: string;
}

export interface MultiWorldModel {
  modelId: string;
  name: string;
  premise: string;
  assumptions: string[];
  fitScore: number; // 0..1
  uncertainty: number; // 0..1
  disconfirmingEvidenceCount: number;
  status: 'DOMINANT' | 'PLAUSIBLE' | 'LOW_FIT' | 'REJECTED';
}

export interface WhatWouldChangeMyMind {
  hypothesisId: string;
  hypothesisTitle: string;
  currentConfidence: number; // 0..1
  wouldDecreaseConfidence: string[];
  wouldIncreaseConfidence: string[];
  falsifiabilityScore: number; // 0..1
}

export interface PersonalStrategyProfile {
  strategyId: string;
  strategyName: string;
  studentId: string;
  context: string;
  observedEffect: number; // e.g. +0.21 (+21%)
  confidence: number; // 0..1
  transferRate: number; // 0..1
  burdenScore: number; // 0..1
  preferenceRank: number;
  studentAgencyNotes: string;
}

export interface MultiAgentDebateRound {
  debateId: string;
  topic: string;
  proposingAgent: string;
  proposedAction: string;
  critiquingAgent: string;
  counterarguments: string[];
  evidenceCheckSummary: string;
  revisedAction: string;
  fusedVerdict: string;
  consensusScore: number; // 0..1
}

export interface DecisionRobustnessPerturbation {
  testId: string;
  perturbationType: string;
  variation: string;
  shiftPercent: number;
  decisionOutcome: 'STABLE' | 'MODIFIED' | 'REVERSED';
  robustnessRating: 'ROBUST' | 'MODERATELY_SENSITIVE' | 'FRAGILE';
}

export interface AICapabilityRoute {
  requestId: string;
  taskType: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  selectedRoute: 'RULE_ENGINE' | 'STATISTICAL_MODEL' | 'STRUCTURED_AI' | 'GEMINI' | 'MULTI_AGENT' | 'HUMAN_REVIEW';
  actionType: 'DO' | 'DONT' | 'WAIT' | 'ASK' | 'ESCALATE';
  budgetCostToken: number;
  justification: string;
}

export interface IntelligenceHealthMetrics {
  dataHealthScore: number; // 0..1
  modelCalibrationScore: number; // 0..1
  agentAgreementScore: number; // 0..1
  policySafetyScore: number; // 0..1
  uiOverwhelmIndex: number; // 0..1 (lower is better)
  overallHealthRating: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE_REQUIRED';
  selfHealingActions: string[];
}

export interface PolicyCandidateVNext {
  candidateId: string;
  policyVersion: string;
  triggerObservation: string;
  proposedChange: string;
  offlineSimulationScore: number; // 0..1
  safetyPassed: boolean;
  fairnessScore: number; // 0..1
  humanReviewStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  rollbackPlan: string;
}



