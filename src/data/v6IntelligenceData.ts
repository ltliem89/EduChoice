import {
  TaskState,
  CognitiveLoadState,
  MissionPlan,
  SpecialistAgentDecision,
  DecisionFusionResult,
  CounterfactualSimulationRecord,
  StudentAgencyMetric,
  SuperAnalyticsMetrics,
  ResearchHypothesis,
  AutomatedResearchBrief,
  DataLineageNode,
  CalibrationAndDriftState
} from '../types';

export const DEFAULT_TASKS: TaskState[] = [
  {
    taskId: 'task_01',
    studentId: 'student_01',
    title: 'Giải 5 bài tập phân số nâng cao Toán 8',
    type: 'ASSIGNMENT',
    priority: 5,
    urgency: 0.85,
    importance: 0.90,
    estimatedEffortMinutes: 25,
    cognitiveLoad: 0.72,
    switchingCost: 0.35,
    deadline: '2026-09-14T20:00:00Z',
    progress: 60,
    difficulty: 4,
    dependencyIds: [],
    completionProbability: 0.82,
    status: 'ACTIVE',
    updatedAt: '2026-09-14T07:10:00Z'
  },
  {
    taskId: 'task_02',
    studentId: 'student_01',
    title: 'Hít thở 4-4-4 và thư giãn mắt sau 30 phút ngồi bàn',
    type: 'MICRO_ACTION',
    priority: 4,
    urgency: 0.60,
    importance: 0.80,
    estimatedEffortMinutes: 3,
    cognitiveLoad: 0.15,
    switchingCost: 0.10,
    progress: 100,
    difficulty: 1,
    dependencyIds: [],
    completionProbability: 0.95,
    status: 'COMPLETED',
    updatedAt: '2026-09-14T07:15:00Z'
  },
  {
    taskId: 'task_03',
    studentId: 'student_01',
    title: 'Đọc trước bài 3 môn Khoa Học Tự Nhiên (Hóa học)',
    type: 'LEARNING',
    priority: 3,
    urgency: 0.40,
    importance: 0.75,
    estimatedEffortMinutes: 15,
    cognitiveLoad: 0.50,
    switchingCost: 0.25,
    deadline: '2026-09-15T12:00:00Z',
    progress: 0,
    difficulty: 3,
    dependencyIds: ['task_01'],
    completionProbability: 0.70,
    status: 'PENDING',
    updatedAt: '2026-09-13T18:00:00Z'
  },
  {
    taskId: 'task_04',
    studentId: 'student_01',
    title: 'Dọn sạch bàn học và xếp balô sách vở ngày mai',
    type: 'HABIT',
    priority: 4,
    urgency: 0.50,
    importance: 0.85,
    estimatedEffortMinutes: 5,
    cognitiveLoad: 0.20,
    switchingCost: 0.15,
    deadline: '2026-09-14T21:30:00Z',
    progress: 40,
    difficulty: 2,
    dependencyIds: [],
    completionProbability: 0.88,
    status: 'ACTIVE',
    updatedAt: '2026-09-14T06:45:00Z'
  },
  {
    taskId: 'task_05',
    studentId: 'student_01',
    title: 'Vẽ sơ đồ tư duy phân loại đồ ăn vặt & chi tiêu tuần',
    type: 'PROJECT',
    priority: 2,
    urgency: 0.20,
    importance: 0.50,
    estimatedEffortMinutes: 20,
    cognitiveLoad: 0.40,
    switchingCost: 0.40,
    progress: 10,
    difficulty: 2,
    dependencyIds: [],
    completionProbability: 0.65,
    status: 'DEFERRED',
    updatedAt: '2026-09-12T14:00:00Z'
  }
];

export const DEFAULT_COGNITIVE_LOAD: CognitiveLoadState = {
  overallLoad: 0.46,
  intrinsicLoad: 0.38,
  extraneousLoad: 0.12,
  constructiveLoad: 0.62,
  switchingCost: 0.22,
  attentionFragmentation: 0.28,
  distractionRecoveryIndex: 0.76, // DRI = 76% hồi phục tốt
  confidence: 0.85,
  evidenceCount: 34,
  timeWindow: '7d_rolling',
  loadStatus: 'optimal'
};

export const DEFAULT_MISSION_PLANS: MissionPlan[] = [
  {
    missionId: 'mis_prep_khtn',
    title: 'Nhiệm Vụ Chiến Lược: Chuẩn Bị Bài Kiểm Tra Khoa Học Tự Nhiên',
    description: 'Chuỗi hành động đồng bộ kết hợp tư duy ưu tiên, mô phỏng tình huống áp lực, kỹ thuật điều hòa cảm xúc và hành động thực tế.',
    targetGoalTitle: 'Hoàn thành bài tập về nhà trước 21h00',
    constructTarget: 'Prioritization',
    status: 'in_progress',
    currentStepIndex: 2,
    startedAt: '2026-09-14T06:30:00Z',
    steps: [
      {
        stepId: 'step_1',
        order: 1,
        title: 'Bước 1: Xác định mục tiêu & lọc 1 việc khó nhất',
        type: 'goal_check',
        durationMinutes: 2,
        completed: true,
        promptNotes: 'Đã khoanh vùng 5 bài toán khó cần giải quyết trước.'
      },
      {
        stepId: 'step_2',
        order: 2,
        title: 'Bước 2: Rèn luyện quyết định trong kịch bản "48 phút cuối"',
        type: 'simulation',
        durationMinutes: 3,
        completed: true,
        gameId: 'game_48_minutes',
        promptNotes: 'Đã trải nghiệm phân chia thời gian theo ma trận Eisenhower.'
      },
      {
        stepId: 'step_3',
        order: 3,
        title: 'Bước 3: Thực hành việc nhỏ 5 phút (Ghi 1 việc quan trọng ra giấy)',
        type: 'micro_action',
        durationMinutes: 5,
        completed: false,
        microActionId: 'action_01',
        promptNotes: 'Đặt đồng hồ đếm ngược 5 phút chuẩn bị giấy nháp & bàn học.'
      },
      {
        stepId: 'step_4',
        order: 4,
        title: 'Bước 4: Phản tư bài học & đo lường độ tập trung',
        type: 'reflection',
        durationMinutes: 2,
        completed: false,
        promptNotes: 'Tự đánh giá xem mình có bị xao nhãng bởi điện thoại hay không.'
      }
    ]
  },
  {
    missionId: 'mis_emotional_calm',
    title: 'Nhiệm Vụ: Giữ Vững Bình Tĩnh & Thiết Lập Ranh Giới Lịch Sự',
    description: 'Rèn luyện phản xạ dừng 60 giây khi gặp bình luận khiêu khích và tập nói câu từ chối tích cực ngoài đời.',
    targetGoalTitle: 'Thực hành kỹ thuật dừng 60 giây khi gặp chuyện bức xúc',
    constructTarget: 'SelfRegulation',
    status: 'draft',
    currentStepIndex: 0,
    steps: [
      {
        stepId: 'step_em_1',
        order: 1,
        title: 'Trải nghiệm kịch bản "Bình Luận Gây Nóng Mặt"',
        type: 'simulation',
        durationMinutes: 3,
        completed: false,
        gameId: 'game_angry_comment'
      },
      {
        stepId: 'step_em_2',
        order: 2,
        title: 'Việc nhỏ thực tế: 3 chu kỳ thở 4-4-4',
        type: 'micro_action',
        durationMinutes: 3,
        completed: false
      },
      {
        stepId: 'step_em_3',
        order: 3,
        title: 'Luyện câu từ chối tích cực trước gương 2 phút',
        type: 'practice',
        durationMinutes: 2,
        completed: false
      }
    ]
  }
];

export const DEFAULT_AGENT_DECISIONS: SpecialistAgentDecision[] = [
  {
    agentId: 'behavior_agent',
    agentNameVi: 'Agent Phân Tích Hành Vi',
    recommendation: 'Học sinh vừa có 2 lượt thử lại liên tiếp kiên trì nhưng tốc độ ra quyết định chậm lại (+18s). Cần can thiệp giảm độ tải lựa chọn.',
    primaryAction: 'deliver_eisenhower_matrix',
    evidence: ['retry_count: 2', 'decision_latency: 38s', 'abandonment_risk: low'],
    confidence: 0.88,
    uncertainty: 0.12,
    riskAssessment: 'none',
    timestamp: '2026-09-14T07:12:00Z'
  },
  {
    agentId: 'goal_agent',
    agentNameVi: 'Agent Mục Tiêu Tuần',
    recommendation: 'Mục tiêu hoàn thành bài tập trước 21h đang đạt tiến độ 5/7 ngày; việc kết nối với bài tập thực tế sẽ tạo đòn bẩy duy trì chuỗi tiến bộ.',
    primaryAction: 'link_to_homework_micro_action',
    evidence: ['goal_progress: 71%', 'current_streak: 4 days', 'active_goal: goal_01'],
    confidence: 0.84,
    uncertainty: 0.16,
    riskAssessment: 'none',
    timestamp: '2026-09-14T07:12:01Z'
  },
  {
    agentId: 'safety_agent',
    agentNameVi: 'Agent Giám Sát An Toàn (Veto Authority)',
    recommendation: 'Kiểm tra nội dung hoàn toàn an toàn (Content Rating G). Quỹ thời gian chơi phiên này = 7 phút, dưới giới hạn an toàn 20 phút.',
    primaryAction: 'approve_safe_continuation',
    evidence: ['screen_time: 7m', 'sentiment_proxy: positive', 'crisis_flag: false'],
    confidence: 0.99,
    uncertainty: 0.01,
    riskAssessment: 'none',
    vetoTriggered: false,
    timestamp: '2026-09-14T07:12:02Z'
  },
  {
    agentId: 'intervention_agent',
    agentNameVi: 'Agent Thiết Kế Can Thiệp',
    recommendation: 'Đề xuất gắn Hộp công cụ Ma trận Eisenhower kèm Việc nhỏ 5 phút dọn bàn học vì can thiệp này có mức bằng chứng L2 (d=0.42).',
    primaryAction: 'assign_eisenhower_and_micro_action',
    evidence: ['evidence_level: L2', 'sample_size: 146', 'effect_size: 0.42'],
    confidence: 0.86,
    uncertainty: 0.14,
    riskAssessment: 'none',
    timestamp: '2026-09-14T07:12:03Z'
  },
  {
    agentId: 'policy_agent',
    agentNameVi: 'Agent Điều Phối Chính Sách DSL',
    recommendation: 'Kích hoạt quy tắc "rule_safe_workload": Giữ độ khó ở mức 1 (nhẹ nhàng), thời lượng 3 phút, ưu tiên hành động thực tế ngoài đời.',
    primaryAction: 'enforce_policy_rule_workload',
    evidence: ['policy_rule: rule_safe_workload', 'candidate_game: game_48_minutes'],
    confidence: 0.92,
    uncertainty: 0.08,
    riskAssessment: 'none',
    timestamp: '2026-09-14T07:12:04Z'
  }
];

export const DEFAULT_FUSION_RESULT: DecisionFusionResult = {
  fusionId: 'fus_20260914_001',
  consensusScore: 0.91,
  conflictScore: 0.09,
  safetyVetoApplied: false,
  winningPolicyAction: 'Chỉ định Kịch Bản "48 Phút Cuối" + Hộp Công Cụ Eisenhower + Việc Nhỏ 5 Phút',
  selectedExperienceId: 'game_48_minutes',
  selectedToolkitId: 'prioritization',
  whyExplanation: {
    why: 'Học sinh đang có thế mạnh Kiên trì cao (78/100) nhưng chỉ số Sắp xếp ưu tiên (Prioritization 55/100) cần được bồi đắp trong bối cảnh chuẩn bị bài học buổi tối.',
    evidence: [
      'Chỉ số Prioritization (55/100) thấp nhất nhóm điều hành nhận thức',
      'Độ tải nhận thức hiện tại ở mức Tối ưu (Overall Load 0.46)',
      'Thời gian phiên chơi ngắn (7m) chưa vượt trần an toàn'
    ],
    confidence: 0.89,
    alternativeRejected: 'Kịch bản phân nhánh phức tạp "Chi Tiêu Tiền Tiêu Vặt"',
    reasonRejected: 'Học sinh đang trong khung giờ học tối, chủ đề quản lý thời gian và bài vở có tính chuyển hóa thực tế cao hơn (Ecological Validity).',
    constraintsEnforced: [
      'Thời lượng tối đa <= 5 phút',
      'Không gán nhãn hay phê phán học sinh',
      'Safety Agent kiểm duyệt 100% đạt chuẩn'
    ],
    expectedOutcome: 'Tăng khả năng nhận diện việc quan trọng trước việc khẩn cấp, kích hoạt hành động dọn bàn học 5 phút thực tế.'
  },
  agentDecisions: DEFAULT_AGENT_DECISIONS,
  timestamp: '2026-09-14T07:12:05Z'
};

export const DEFAULT_COUNTERFACTUALS: CounterfactualSimulationRecord[] = [
  {
    simulationId: 'cf_sim_01',
    observedTrigger: 'Học sinh gặp tình huống bối rối lúc 18:30 trước giờ học thêm',
    policiesCompared: [
      {
        policyName: 'Chính sách A: Can thiệp Lập kế hoạch 60 giây + Việc nhỏ 5 phút (Hiện tại)',
        description: 'Hướng dẫn dừng lại sắp xếp 1 việc quan trọng nhất trước khi bắt đầu',
        predictedOutcome: 'Hoàn thành bài đúng giờ với độ tập trung cao',
        expectedSuccessRate: 84,
        cognitiveLoadCost: 0.35,
        confidence: 0.88
      },
      {
        policyName: 'Chính sách B: Giảm độ khó kịch bản xuống mức dễ nhất',
        description: 'Bỏ bớt tình huống phân nhánh, chỉ còn 1 phương án đúng rõ ràng',
        predictedOutcome: 'Giải quyết nhanh nhưng giảm cảm giác tự chủ và thử thách',
        expectedSuccessRate: 92,
        cognitiveLoadCost: 0.15,
        confidence: 0.75
      },
      {
        policyName: 'Chính sách C: Chỉ đưa câu hỏi phản tư đóng sau khi chơi',
        description: 'Hỏi học sinh cảm nghĩ mà không giao hành động ngoài đời',
        predictedOutcome: 'Học sinh trả lời cho xong, ít chuyển hóa ra hành vi thực tế',
        expectedSuccessRate: 58,
        cognitiveLoadCost: 0.25,
        confidence: 0.82
      },
      {
        policyName: 'Chính sách D: Không can thiệp (Quan sát thuần túy)',
        description: 'Để học sinh tự do xử lý không gợi ý hỗ trợ',
        predictedOutcome: 'Nguy cơ trì hoãn và lướt điện thoại kéo dài đến 19h15',
        expectedSuccessRate: 41,
        cognitiveLoadCost: 0.55,
        confidence: 0.80
      }
    ],
    recommendedPolicy: 'Chính sách A',
    notes: 'Mô phỏng cho thấy việc kết hợp gợi ý chiến lược nhẹ nhàng kèm hành động đời thực đạt điểm đa mục tiêu (Multi-objective) tối ưu nhất.'
  }
];

export const DEFAULT_STUDENT_AGENCY: StudentAgencyMetric = {
  choiceDiversityScore: 78,
  voluntaryRetryRate: 85,
  goalOwnershipScore: 82,
  suggestionRefusalOrAdaptRate: 24, // 24% học sinh chủ động điều chỉnh gợi ý phù hợp với mình
  selfInitiatedActionsCount: 6,
  agencyLevel: 'high_autonomy'
};

// Master Spec V6.14 - V6.19: Super Analytics Engine Data
export const DEFAULT_SUPER_ANALYTICS: SuperAnalyticsMetrics = {
  level1Descriptive: {
    totalSessions: 142,
    completionRate: 94.2,
    meanSessionDurationSeconds: 198,
    medianDecisionsPerSession: 3,
    totalChoicesLogged: 426
  },
  level2Behavioral: {
    meanRetryAttempts: 1.84,
    abandonmentThresholdSeconds: 52,
    impulsiveChoiceRatio: 0.18,
    reflectionCompletionRate: 88.5,
    voluntaryReplayRatio: 0.38
  },
  level3Temporal: {
    peakHours: '19:00 - 21:30',
    rolling24hActiveStudents: 38,
    rolling7dRetentionRate: 87.2,
    rolling14dLearningVelocity: 1.45,
    rolling30dSkillSustainability: 0.79
  },
  level4Sequential: {
    stateTransitionMatrix: [
      { fromState: 'SITUATION_ENTRY', toState: 'CHOICE_EVALUATION', probability: 0.98 },
      { fromState: 'CHOICE_EVALUATION', toState: 'INTERVENTION_VIEW', probability: 0.85 },
      { fromState: 'INTERVENTION_VIEW', toState: 'VOLUNTARY_RETRY', probability: 0.62 },
      { fromState: 'INTERVENTION_VIEW', toState: 'REFLECTION', probability: 0.38 },
      { fromState: 'REFLECTION', toState: 'MICRO_ACTION_TRIGGER', probability: 0.74 }
    ],
    markovEntropy: 1.42,
    dominantSuccessPathway: [
      'Tình huống áp lực',
      'Lựa chọn thử thách',
      'Xem hộp công cụ',
      'Thử lại tự nguyện',
      'Phản tư & Việc nhỏ 5 phút'
    ],
    dominantDropoutPathway: [
      'Tình huống quá tải (>45s)',
      'Không đọc gợi ý',
      'Bỏ dở phiên'
    ]
  },
  level5Causal: {
    averageTreatmentEffect: 0.48, // Cohen's d = 0.48 (Medium effect size)
    confidenceInterval: [0.32, 0.64],
    transferGapToHomework: 0.14, // Gap 14% giữa game và đời thực
    complianceScore: 0.84
  },
  level6Predictive: {
    hazardRateNextAbandonment: 0.08,
    nextLikelyAction: 'Hoàn thành việc nhỏ 5 phút',
    fatigueRiskIndex: 0.22,
    trajectoryGrowthRate: 0.18 // G(t) tăng trưởng năng lực
  },
  level7Prescriptive: {
    optimalPolicyUnderBudget: 'Tung kịch bản "48 phút cuối" kèm Hộp công cụ Eisenhower khi tải nhận thức <= 0.5',
    recommendedBreakDurationMinutes: 3,
    cognitiveLoadConstraintSatisfied: true,
    tradeoffNotes: 'Chính sách bảo toàn tự chủ học sinh đạt điểm Pareto tối ưu giữa thử thách và an toàn cảm xúc.'
  },
  changePoints: [
    {
      id: 'cp_01',
      detectedAt: '2026-09-11T14:30:00Z',
      construct: 'Prioritization',
      magnitudeDelta: +18.5,
      method: 'Bayesian',
      notes: 'Học sinh có bước nhảy vọt về điểm Ưu tiên sau khi hoàn thành chuỗi 3 kịch bản Eisenhower.'
    },
    {
      id: 'cp_02',
      detectedAt: '2026-09-08T09:15:00Z',
      construct: 'SelfRegulation',
      magnitudeDelta: +12.0,
      method: 'CUSUM',
      notes: 'Tỉ lệ kiềm chế cảm xúc khi đọc bình luận tăng rõ rệt sau bài tập thở 4-4-4.'
    }
  ],
  anomalies: [
    {
      id: 'anom_01',
      type: 'LATENCY_OUTLIER',
      severity: 'LOW',
      timestamp: '2026-09-13T20:14:22Z',
      details: 'Thời gian chọn phương án kéo dài 124 giây (trung bình 35s).',
      actionTaken: 'Hệ thống tự động kích hoạt gợi ý công cụ phân rã vấn đề.'
    },
    {
      id: 'anom_02',
      type: 'CLOCK_DRIFT',
      severity: 'LOW',
      timestamp: '2026-09-12T08:00:10Z',
      details: 'Độ lệch đồng hồ client-server 1.2s được chuẩn hóa về UTC timestamp.',
      actionTaken: 'Đã tự động đồng bộ offset time.'
    }
  ]
};

// Master Spec V6.23 - V6.31: Research Discovery Data
export const DEFAULT_RESEARCH_HYPOTHESES: ResearchHypothesis[] = [
  {
    hypothesisId: 'hyp_01',
    statementVi: 'H1: Can thiệp Hộp công cụ Eisenhower làm giảm thời gian xao nhãng và thu hẹp Transfer Gap giữa game và bài tập về nhà ít nhất 30%.',
    constructTarget: 'Prioritization',
    observedPattern: 'Học sinh tiếp cận gợi ý Eisenhower có tỉ lệ hoàn thành bài tập trước 21h tăng từ 52% lên 78%.',
    evidenceStrength: 'STRONG',
    sampleSize: 184,
    pValueProxy: 0.003,
    effectSizeEstimate: 0.52,
    status: 'ACCEPTED',
    formulatedDate: '2026-09-01'
  },
  {
    hypothesisId: 'hyp_02',
    statementVi: 'H2: Kỹ thuật Dừng 60 giây (Thở 4-4-4) làm giảm đáng kể phản ứng nóng giận xung đột trong các tình huống mạng xã hội.',
    constructTarget: 'SelfRegulation',
    observedPattern: '94% học sinh chọn phương án đối thoại bình tĩnh sau khi làm theo nhịp thở 4-4-4.',
    evidenceStrength: 'STRONG',
    sampleSize: 165,
    pValueProxy: 0.001,
    effectSizeEstimate: 0.61,
    status: 'ACCEPTED',
    formulatedDate: '2026-09-03'
  },
  {
    hypothesisId: 'hyp_03',
    statementVi: 'H3: Chuỗi Nhiệm Vụ Chiến Lược (Mission Planner 4 bước) nâng cao tính tự chủ (Student Agency) so với việc giao bài tập đơn lẻ.',
    constructTarget: 'GoalSetting',
    observedPattern: 'Tỉ lệ tự nguyện quay lại thử thách (Voluntary Retry) đạt 85% so với 45% ở mô hình truyền thống.',
    evidenceStrength: 'MODERATE',
    sampleSize: 92,
    pValueProxy: 0.018,
    effectSizeEstimate: 0.44,
    status: 'TESTING',
    formulatedDate: '2026-09-10'
  }
];

export const DEFAULT_RESEARCH_BRIEF: AutomatedResearchBrief = {
  briefId: 'brief_2026_cohort_q3',
  title: 'Báo Cáo Nghiên Cứu Thích Ứng Q3/2026 — Chuyển Hóa Năng Lực Nhận Thức Ra Đời Thực',
  cohortName: 'Khối Học Sinh THCS (11-15 tuổi)',
  generatedDate: '2026-09-14',
  sampleCount: 248,
  executiveSummary: 'Dữ liệu thực nghiệm qua 1,240 phiên chơi micro-game chứng minh can thiệp thích ứng đa agent kết hợp việc nhỏ 5 phút ngoài đời thực tạo ra hiệu ứng kích hoạt hành vi bền vững (Cohen d = 0.48), thu hẹp Transfer Gap đáng kể so với phương pháp lý thuyết thuần túy.',
  constructProgressions: [
    {
      construct: 'Prioritization',
      baselineMean: 52.4,
      postInterventionMean: 68.2,
      gainDelta: +15.8,
      effectSizeD: 0.52
    },
    {
      construct: 'SelfRegulation',
      baselineMean: 56.1,
      postInterventionMean: 71.0,
      gainDelta: +14.9,
      effectSizeD: 0.58
    },
    {
      construct: 'Planning',
      baselineMean: 61.2,
      postInterventionMean: 72.8,
      gainDelta: +11.6,
      effectSizeD: 0.41
    },
    {
      construct: 'AttentionControl',
      baselineMean: 53.0,
      postInterventionMean: 66.5,
      gainDelta: +13.5,
      effectSizeD: 0.46
    }
  ],
  mechanismSynthesis: 'Cơ chế kích hoạt hành vi gồm 3 chặng: (1) Mô phỏng tình huống áp lực vừa phải để kích hoạt nhận thức về hậu quả, (2) Cung cấp công cụ tâm lý học dạng vi mô (Micro-toolkit) ngay tại điểm bối rối, và (3) Chuyển hóa tức thì thành việc nhỏ 5 phút đời thực kèm đồng hồ đếm ngược.',
  threatsToValidity: [
    'Hiệu ứng Hawthorne (học sinh chú ý hơn do biết đang tham gia thử nghiệm)',
    'Tự báo cáo về thời gian ngủ/nghỉ có thể tồn tại sai số chủ quan',
    'Yếu tố mùa vụ (áp lực tăng vào các tuần thi học kỳ)'
  ],
  trialRecommendations: {
    recommendedDesign: 'Thử nghiệm đối chứng ngẫu nhiên theo cụm lớp học (Cluster-RCT)',
    sampleSizeNeeded: 320,
    targetConstruct: 'Prioritization',
    durationWeeks: 6
  },
  publicationAbstractVi: 'Nghiên cứu đánh giá tính hiệu quả của nền tảng EduChoice-AI V6 trong việc bồi đắp kỹ năng ra quyết định và tự điều chỉnh cho học sinh THCS. Kết quả từ 248 người tham gia cho thấy mức tăng trưởng có ý nghĩa thống kê trên tất cả các biến số năng lực hành vi (p < 0.01), với kích thước hiệu ứng trung bình d = 0.48. Đặc biệt, chỉ số Distraction Recovery Index (DRI) tăng 28%, minh chứng cho sự hình thành thói quen tự nhận thức xao nhãng.'
};

export const DEFAULT_DATA_LINEAGE: DataLineageNode[] = [
  {
    nodeId: 'lin_01',
    stage: 'RAW_INGESTION',
    name: 'Sự Kiện Hành Vi Thô (04_BEHAVIOR_EVENTS)',
    inputs: ['Client Telemetry Event Bus', 'Local Timestamp Offset'],
    transformation: 'Khử nhiễu, kiểm tra định dạng JSON, gán UUID chuẩn UTC',
    dataQualityScore: 99.4,
    lastUpdated: '2026-09-14T07:12:00Z'
  },
  {
    nodeId: 'lin_02',
    stage: 'FEATURE_EXTRACTION',
    name: 'Trích Xuất Đặc Trưng (Decision Latency & Retry Delta)',
    inputs: ['lin_01'],
    transformation: 'Tính delta thời gian suy nghĩ, số lần lặp lại, chỉ số xao nhãng',
    dataQualityScore: 98.2,
    lastUpdated: '2026-09-14T07:12:01Z'
  },
  {
    nodeId: 'lin_03',
    stage: 'STUDENT_MODEL',
    name: 'Cập Nhật Mô Hình Năng Lực Học Sinh (Bayesian Knowledge Tracing)',
    inputs: ['lin_02', 'Prior Construct Estimates'],
    transformation: 'Áp dụng mô hình cập nhật xác suất Bayesian & ước lượng độ bất định',
    dataQualityScore: 96.8,
    lastUpdated: '2026-09-14T07:12:02Z'
  },
  {
    nodeId: 'lin_04',
    stage: 'AGENT_FUSION',
    name: 'Đa Agent & Hợp Nhất Quyết Định (WHY Engine)',
    inputs: ['lin_03', 'Safety Constraints', 'Policy DSL Rules'],
    transformation: '5 Specialist Agents bỏ phiếu, kiểm duyệt Safety Veto, tối ưu đa mục tiêu',
    dataQualityScore: 99.1,
    lastUpdated: '2026-09-14T07:12:03Z'
  },
  {
    nodeId: 'lin_05',
    stage: 'OUTCOME_TRACKING',
    name: 'Đo Lường Hiệu Quả & Transfer Gap',
    inputs: ['lin_04', 'Micro Action Logs', 'Weekly Goal Progress'],
    transformation: 'So sánh kết quả thực tế với dự báo đối thực nghiệm (Counterfactual)',
    dataQualityScore: 97.5,
    lastUpdated: '2026-09-14T07:12:05Z'
  }
];

export const DEFAULT_CALIBRATION_AND_DRIFT: CalibrationAndDriftState = {
  calibration: {
    brierScore: 0.084, // Điểm Brier thấp = mô hình dự báo rất chuẩn
    expectedCalibrationError: 0.038, // ECE = 3.8% (Dưới ngưỡng chuẩn 5%)
    sharpness: 0.86,
    reliabilityBins: [
      { confidenceBin: '0.0 - 0.2', accuracy: 0.12, count: 28 },
      { confidenceBin: '0.2 - 0.4', accuracy: 0.31, count: 42 },
      { confidenceBin: '0.4 - 0.6', accuracy: 0.52, count: 85 },
      { confidenceBin: '0.6 - 0.8', accuracy: 0.73, count: 120 },
      { confidenceBin: '0.8 - 1.0', accuracy: 0.91, count: 151 }
    ]
  },
  drift: {
    dataDriftPsi: 0.042, // PSI < 0.1 = Rất ổn định (No data drift)
    conceptDriftPValue: 0.48, // p > 0.05 = Không có concept drift
    policyDriftRatio: 0.03, // 3% điều chỉnh chính sách nhỏ
    alertStatus: 'STABLE',
    notes: 'Toàn bộ dữ liệu hành vi và phân phối đầu vào của học sinh duy trì tính ổn định cao, không phát hiện hiện tượng trôi dạt mô hình.'
  }
};

// Master Spec V6.36: Danh mục 44 Bảng Dữ Liệu Chuẩn Hóa
export const V6_CANONICAL_TABLES = [
  // Nhóm V1 - V4: Nền tảng
  { id: '01', name: '01_USERS', description: 'Tài khoản, phân quyền và vai trò người dùng' },
  { id: '02', name: '02_CONSTRUCTS', description: 'Từ điển 11 năng lực điều hành nhận thức & hành vi' },
  { id: '03', name: '03_GAMES', description: 'Đặc tả kịch bản trò chơi Game DSL' },
  { id: '04', name: '04_BEHAVIOR_EVENTS', description: 'Chuỗi sự kiện hành vi và telemetry học sinh' },
  { id: '05', name: '05_STUDENT_MODELS', description: 'Hồ sơ năng lực học sinh và điểm bất định' },
  { id: '06', name: '06_TOOLKITS', description: 'Hộp công cụ tâm lý học đường thực chứng' },
  { id: '07', name: '07_INTERVENTIONS', description: 'Lịch sử can thiệp thích ứng được phân phối' },
  { id: '08', name: '08_GOALS', description: 'Mục tiêu tuần và tiến độ rèn luyện' },
  { id: '09', name: '09_MICRO_ACTIONS', description: 'Việc nhỏ 5 phút ngoài đời thực' },
  { id: '10', name: '10_LIFE_BALANCE', description: 'Cân bằng thời gian sinh hoạt và thói quen lành mạnh' },
  { id: '11', name: '11_SCRIPTS', description: 'Kịch bản thô và bản dịch sang Game DSL' },
  { id: '12', name: '12_SAFETY_REVIEWS', description: 'Nhật ký kiểm duyệt an toàn nội dung' },
  { id: '13', name: '13_AUDIT_LOGS', description: 'Nhật ký kiểm toán truy vết phiên bản' },
  { id: '14', name: '14_RESEARCH_ANALYSES', description: 'Bản ghi phân tích nghiên cứu giáo dục' },
  { id: '15', name: '15_KNOWLEDGE_GRAPH', description: 'Đồ thị tri thức liên kết năng lực và can thiệp' },
  { id: '16', name: '16_FEEDBACK_MESSAGES', description: 'Thông điệp phản hồi tích cực cho học sinh' },

  // Nhóm V5: Nghiên cứu thực nghiệm
  { id: '17', name: '17_CORE_QUESTIONS', description: '5 câu hỏi nghiên cứu cốt lõi' },
  { id: '18', name: '18_EXPERIMENT_REGISTRY', description: 'Sổ đăng ký thử nghiệm A/B' },
  { id: '19', name: '19_CAUSAL_ESTIMATES', description: 'Ước lượng nhân quả (ATE, CATE)' },
  { id: '20', name: '20_TRANSFER_GAP_METRICS', description: 'Đo lường độ lệch chuyển hóa game - đời thực' },
  { id: '21', name: '21_POLICY_RULES', description: 'Quy tắc chính sách giáo dục Educational Policy DSL' },
  { id: '22', name: '22_POLICY_EVALUATIONS', description: 'Đánh giá độ an toàn và hiệu quả chính sách' },

  // Nhóm V6: Trí tuệ Đa tác vụ, Đa Agent & Siêu phân tích (V6.36)
  { id: '23', name: '23_TASKS', description: 'Danh mục tác vụ đồng thời (Task Portfolio học sinh)' },
  { id: '24', name: '24_TASK_DEPENDENCIES', description: 'Ma trận phụ thuộc và thứ tự ưu tiên tác vụ' },
  { id: '25', name: '25_TASK_SWITCH_EVENTS', description: 'Sự kiện chuyển đổi ngữ cảnh và chi phí nhận thức' },
  { id: '26', name: '26_COGNITIVE_LOAD_ESTIMATES', description: 'Ước lượng tải nhận thức (Bản thể, Tạo nghĩa, Ngoại cảnh, DRI)' },
  { id: '27', name: '27_MULTI_TASK_STATES', description: 'Trạng thái đa tác vụ tổng hợp theo thời gian' },
  { id: '28', name: '28_MISSION_PLANS', description: 'Chuỗi nhiệm vụ chiến lược đồng bộ đa bước' },
  { id: '29', name: '29_AGENT_DECISIONS', description: 'Đề xuất độc lập của 5 Specialist Agents' },
  { id: '30', name: '30_DECISION_FUSION', description: 'Hợp nhất quyết định đa agent và giải trình WHY Engine' },
  { id: '31', name: '31_COUNTERFACTUAL_SIMULATIONS', description: 'Mô phỏng đối thực nghiệm đa chính sách (What-If)' },
  { id: '32', name: '32_POLICY_SIMULATIONS', description: 'Mô phỏng luồng chính sách theo ràng buộc ngân sách nhận thức' },
  { id: '33', name: '33_CHANGE_POINTS', description: 'Điểm chuyển đổi hành vi đột phá (CUSUM, Bayesian)' },
  { id: '34', name: '34_ANALYTIC_RUNS', description: 'Nhật ký các đợt chạy Super Analytics 7 cấp độ' },
  { id: '35', name: '35_DATA_LINEAGE', description: 'Đồ thị truy vết nguồn gốc dữ liệu từ sự kiện đến quyết định' },
  { id: '36', name: '36_MODEL_VERSIONS', description: 'Lịch sử và siêu tham số mô hình AI/Agent' },
  { id: '37', name: '37_PROMPT_VERSIONS', description: 'Phiên bản prompt mẫu thiết kế game và thích ứng' },
  { id: '38', name: '38_POLICY_VERSIONS', description: 'Lịch sử phiên bản Educational Policy DSL' },
  { id: '39', name: '39_ANOMALIES', description: 'Cảnh báo dị thường hành vi, trễ mạng hoặc giả mạo' },
  { id: '40', name: '40_CALIBRATION_METRICS', description: 'Độ chuẩn xác dự báo xác suất (Brier Score, ECE)' },
  { id: '41', name: '41_DRIFT_METRICS', description: 'Đo lường trôi dạt dữ liệu, khái niệm và chính sách' },
  { id: '42', name: '42_EQUITY_METRICS', description: 'Đo lường công bằng giới tính, độ tuổi và xuất phát điểm' },
  { id: '43', name: '43_RESEARCH_HYPOTHESES', description: 'Kho giả thuyết khoa học được tự động đề xuất' },
  { id: '44', name: '44_EXPERIMENT_RUNS', description: 'Lịch sử thực thi các đợt thử nghiệm thực địa' }
];
