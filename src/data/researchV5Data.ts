import {
  ConfidenceConstructDetail,
  InterventionDefinition,
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  ExperimentRecord,
  TransferGapAnalysis,
  CausalClaimRecord,
  PolicyRule,
  PolicySimulationScenario
} from '../types';

export const DEFAULT_CONFIDENCE_CONSTRUCTS: ConfidenceConstructDetail[] = [
  {
    construct: 'Planning',
    estimate: 68,
    lower: 61,
    upper: 75,
    confidence: 0.82,
    evidenceCount: 28,
    trend: 0.07,
    lastUpdated: '2026-09-14T06:30:00Z',
    uncertaintyStatus: 'low_uncertainty'
  },
  {
    construct: 'Prioritization',
    estimate: 55,
    lower: 46,
    upper: 64,
    confidence: 0.69,
    evidenceCount: 16,
    trend: 0.04,
    lastUpdated: '2026-09-13T19:40:00Z',
    uncertaintyStatus: 'moderate'
  },
  {
    construct: 'Persistence',
    estimate: 78,
    lower: 72,
    upper: 84,
    confidence: 0.91,
    evidenceCount: 38,
    trend: 0.12,
    lastUpdated: '2026-09-14T07:15:00Z',
    uncertaintyStatus: 'low_uncertainty'
  },
  {
    construct: 'SelfRegulation',
    estimate: 62,
    lower: 53,
    upper: 71,
    confidence: 0.74,
    evidenceCount: 22,
    trend: 0.05,
    lastUpdated: '2026-09-13T20:10:00Z',
    uncertaintyStatus: 'moderate'
  },
  {
    construct: 'ProblemSolving',
    estimate: 72,
    lower: 65,
    upper: 79,
    confidence: 0.86,
    evidenceCount: 31,
    trend: 0.09,
    lastUpdated: '2026-09-14T07:10:00Z',
    uncertaintyStatus: 'low_uncertainty'
  },
  {
    construct: 'HelpSeeking',
    estimate: 50,
    lower: 38,
    upper: 62,
    confidence: 0.58,
    evidenceCount: 9,
    trend: -0.02,
    lastUpdated: '2026-09-12T15:20:00Z',
    uncertaintyStatus: 'high_uncertainty'
  },
  {
    construct: 'Reflection',
    estimate: 70,
    lower: 62,
    upper: 78,
    confidence: 0.81,
    evidenceCount: 24,
    trend: 0.08,
    lastUpdated: '2026-09-13T21:00:00Z',
    uncertaintyStatus: 'low_uncertainty'
  },
  {
    construct: 'Adaptability',
    estimate: 65,
    lower: 56,
    upper: 74,
    confidence: 0.72,
    evidenceCount: 19,
    trend: 0.06,
    lastUpdated: '2026-09-13T18:00:00Z',
    uncertaintyStatus: 'moderate'
  }
];

export const DEFAULT_INTERVENTIONS: InterventionDefinition[] = [
  {
    interventionId: 'int_eisenhower_matrix',
    title: 'Ma trận Eisenhower 2x2',
    construct: 'Prioritization',
    mechanism: 'Phân tách giữa việc Khẩn cấp vs Quan trọng giúp giảm tải áp lực nhận thức và ngăn thói quen né tránh việc khó.',
    scenario: 'Áp lực 48 phút cuối trước giờ học thêm',
    targetBehavior: 'Học sinh chọn làm bài tập khó trước thay vì lướt mạng xã hội',
    microActionTitle: 'Ghi ra 1 việc quan trọng nhất cho sáng mai',
    contraindications: 'Không dùng khi học sinh đang trong trạng thái quá tải cảm xúc cấp tính.',
    evidenceLevel: 'L2_CONTROLLED_STUDY',
    version: '1.2.0',
    approvalStatus: 'APPROVED',
    effectSizeEstimate: 0.42,
    sampleSize: 146,
    lastEvaluated: '2026-08-20'
  },
  {
    interventionId: 'int_box_breathing',
    title: 'Hơi thở hộp 4-4-4',
    construct: 'SelfRegulation',
    mechanism: 'Kích hoạt hệ thần kinh đối giao cảm làm dịu nhịp tim và ổn định phản ứng kích động trước bình luận mạng.',
    scenario: 'Bình luận gây bực mình trên mạng xã hội',
    targetBehavior: 'Dừng lại 60 giây trước khi bấm phím phản hồi',
    microActionTitle: 'Thực hành 3 chu kỳ thở 4-4-4 khi thấy bối rối',
    evidenceLevel: 'L3_REPLICATED_EVIDENCE',
    version: '2.0.1',
    approvalStatus: 'PRODUCTION',
    effectSizeEstimate: 0.58,
    sampleSize: 310,
    lastEvaluated: '2026-09-02'
  },
  {
    interventionId: 'int_pomodoro_20m',
    title: 'Hiệp tập trung Pomodoro 20 phút',
    construct: 'Planning',
    mechanism: 'Tạo ranh giới thời gian rõ ràng, giảm lo âu trì hoãn bài vở bằng cách tập trung vào khối thời gian hữu hạn.',
    scenario: 'Ôn tập trước kỳ thi học kỳ',
    targetBehavior: 'Tập trung trọn vẹn 20 phút không chuyển đổi tab',
    microActionTitle: 'Cài đồng hồ 20 phút giải 3 bài tập',
    evidenceLevel: 'L2_CONTROLLED_STUDY',
    version: '1.1.0',
    approvalStatus: 'APPROVED',
    effectSizeEstimate: 0.38,
    sampleSize: 220,
    lastEvaluated: '2026-08-15'
  },
  {
    interventionId: 'int_boundary_script',
    title: 'Kịch bản thiết lập ranh giới lịch sự',
    construct: 'Communication',
    mechanism: 'Cung cấp cấu trúc câu nói chuẩn bị trước để học sinh tự tin từ chối áp lực đồng trang lứa mà không sợ mất bạn.',
    scenario: 'Bị bạn cùng lớp ép cho chép bài kiểm tra',
    targetBehavior: 'Từ chối dứt khoát nhưng nhã nhặn, đề xuất giải pháp kèm bạn sau giờ học',
    microActionTitle: 'Luyện tập câu từ chối tích cực trước gương',
    evidenceLevel: 'L1_PILOT_EVIDENCE',
    version: '1.0.0',
    approvalStatus: 'PILOT',
    effectSizeEstimate: 0.29,
    sampleSize: 64,
    lastEvaluated: '2026-09-05'
  },
  {
    interventionId: 'int_three_jars_budget',
    title: 'Quy tắc 3 chiếc lọ tài chính',
    construct: 'Responsibility',
    mechanism: 'Mô hình hóa trực quan dòng tiền giúp chuyển hóa tư duy tiêu dùng tức thì sang tích lũy dài hạn.',
    scenario: 'Chi tiêu tiền tiêu vặt đầu tháng',
    targetBehavior: 'Trích ngay 20% vào quỹ tiết kiệm trước khi mua sắm',
    microActionTitle: 'Phân chia 3 phong bì: Tiêu vặt, Tiết kiệm, Chia sẻ',
    evidenceLevel: 'L1_PILOT_EVIDENCE',
    version: '1.0.0',
    approvalStatus: 'PILOT',
    effectSizeEstimate: 0.35,
    sampleSize: 85,
    lastEvaluated: '2026-08-28'
  }
];

export const DEFAULT_KG_NODES: KnowledgeGraphNode[] = [
  { id: 'c_planning', label: 'Năng lực Lập Kế Hoạch (Planning)', type: 'construct', category: 'Executive Function' },
  { id: 'c_prioritization', label: 'Sắp Xếp Ưu Tiên (Prioritization)', type: 'construct', category: 'Executive Function' },
  { id: 'c_self_regulation', label: 'Tự Điều Hòa (SelfRegulation)', type: 'construct', category: 'Socio-Emotional' },
  
  { id: 'b_retry_strategy', label: 'Đổi Chiến Lược Khi Thử Lại', type: 'behavior', details: 'Quan sát telemetry: không lặp lại lựa chọn sai' },
  { id: 'b_pause_time', label: 'Tạm Dừng Cân Nhắc >15s', type: 'behavior', details: 'Tránh phản ứng hấp tấp dưới áp lực thời gian' },
  
  { id: 'g_48_min', label: 'Game: 48 Phút Cuối (game_48_minutes)', type: 'game', details: 'Tình huống phân bổ bài vở lúc 18:30' },
  { id: 'g_online_flame', label: 'Game: Bình Luận Nóng (game_angry_comment)', type: 'game', details: 'Tình huống mạng xã hội' },

  { id: 'i_eisenhower', label: 'Hộp Công Cụ: Eisenhower Matrix', type: 'intervention', details: 'Level L2 • Phân loại việc 4 ô' },
  { id: 'i_breathing', label: 'Hộp Công Cụ: Hơi Thở 4-4-4', type: 'intervention', details: 'Level L3 • Ổn định nhịp tim' },

  { id: 'm_clean_desk', label: 'Việc Nhỏ: Dọn Bàn & Ghi Việc Ưu Tiên (5m)', type: 'micro_action', details: 'Thực tế ngoài đời thực' },
  { id: 'm_box_breath', label: 'Việc Nhỏ: 3 Chu Kỳ Thở Khi Căng Thẳng (3m)', type: 'micro_action', details: 'Thực tế ngoài đời thực' },

  { id: 'o_goal_progress', label: 'Tiến Bộ Mục Tiêu Tuần (+30%)', type: 'outcome', details: 'Proximal & Distal Outcome' },
  { id: 'o_reduced_frustration', label: 'Giảm Tỉ Lệ Bỏ Cuộc Giữa Chừng (-45%)', type: 'outcome', details: 'Behavioral Persistence' }
];

export const DEFAULT_KG_EDGES: KnowledgeGraphEdge[] = [
  { id: 'e1', from: 'c_prioritization', to: 'g_48_min', relation: 'measured_by', weight: 0.85 },
  { id: 'e2', from: 'c_prioritization', to: 'i_eisenhower', relation: 'supported_by', weight: 0.90 },
  { id: 'e3', from: 'g_48_min', to: 'b_retry_strategy', relation: 'measured_by', weight: 0.75 },
  { id: 'e4', from: 'i_eisenhower', to: 'm_clean_desk', relation: 'triggers_action', weight: 0.80 },
  { id: 'e5', from: 'm_clean_desk', to: 'o_goal_progress', relation: 'leads_to_outcome', weight: 0.70 },
  
  { id: 'e6', from: 'c_self_regulation', to: 'g_online_flame', relation: 'measured_by', weight: 0.80 },
  { id: 'e7', from: 'c_self_regulation', to: 'i_breathing', relation: 'supported_by', weight: 0.95 },
  { id: 'e8', from: 'g_online_flame', to: 'b_pause_time', relation: 'measured_by', weight: 0.85 },
  { id: 'e9', from: 'i_breathing', to: 'm_box_breath', relation: 'triggers_action', weight: 0.90 },
  { id: 'e10', from: 'm_box_breath', to: 'o_reduced_frustration', relation: 'leads_to_outcome', weight: 0.75 }
];

export const DEFAULT_EXPERIMENTS: ExperimentRecord[] = [
  {
    experimentId: 'EXP-001',
    title: 'Cầu Nối Việc Nhỏ Ngoài Đời Thực vs. Phản Tư Đơn Thuần',
    hypothesis: 'Học sinh nhận gợi ý Hành Động Nhỏ (Micro-Action <= 5 phút) sau game sẽ có tỉ lệ hoàn thành mục tiêu tuần cao hơn 25% so với chỉ phản tư câu hỏi đơn thuần.',
    primaryOutcome: 'Tỉ lệ hoàn thành mục tiêu tuần (weekly_goal_completion_rate)',
    secondaryOutcomes: ['Tỉ lệ quay lại rèn luyện (7-day retention)', 'Điểm số tự đánh giá năng lực'],
    population: 'Học sinh THCS Khối 7 & Khối 8 (N=180)',
    eligibility: 'Đã hoàn thành ít nhất 2 kịch bản tình huống và có tối thiểu 1 mục tiêu tuần đang hoạt động',
    interventionGroup: 'Nhóm A: Game + Hộp Công Cụ + Gợi ý Việc nhỏ 5 phút có đồng hồ đếm ngược',
    controlGroup: 'Nhóm B: Game + Hộp Công Cụ + Câu hỏi phản tư đóng',
    randomizationType: 'between_subjects',
    analysisPlanYaml: `experiment: EXP-001
primary_outcome: weekly_goal_completion_rate
model: logistic_regression_mixed
formula: completed ~ group + baseline_score + (1|class_id)
effect_measure: odds_ratio
ci: 0.95
minimum_detectable_effect: 0.22
stopping_rule: sample_size_reached_or_safety_flag`,
    status: 'ACTIVE',
    sampleSizeTarget: 180,
    currentEnrollment: 134,
    startDate: '2026-09-01',
    resultsSummary: {
      ate: 0.28,
      ci95: [0.14, 0.42],
      pValue: 0.003,
      interpretation: 'Kết quả sơ bộ ủng hộ giả thuyết: Nhóm nhận Việc nhỏ ngoài đời thực có tỉ lệ hoàn thành mục tiêu cao hơn 28% (p < 0.01).',
      transferGap: 0.18
    }
  },
  {
    experimentId: 'EXP-002',
    title: 'Can Thiệp Hỗ Trợ Động (Scaffolding Dynamics) Khi Học Sinh Gặp Khó Khăn',
    hypothesis: 'Khi học sinh có >= 2 lần thử lại thất bại, can thiệp giảm độ tải nhận thức (Cognitive Load Reduction) sẽ giúp giảm tỉ lệ bỏ cuộc giữa chừng so với việc tăng gợi ý trực tiếp.',
    primaryOutcome: 'Tỉ lệ kiên trì hoàn thành phiên chơi (session_completion_rate)',
    secondaryOutcomes: ['Tần suất đổi chiến lược (strategy_adaptation_frequency)', 'Thời gian phản tư'],
    population: 'Học sinh có chỉ số Persistence ban đầu dưới mức trung bình (N=120)',
    eligibility: 'Học sinh có abandonment_rate_7d > 0.35',
    interventionGroup: 'Chiến lược tải nhẹ: Rút gọn 2 lựa chọn + gợi ý bước 1 cụ thể',
    controlGroup: 'Chiến lược tiêu chuẩn: Giữ nguyên 3-4 lựa chọn + tooltip gợi ý',
    randomizationType: 'micro_randomized',
    analysisPlanYaml: `experiment: EXP-002
primary_outcome: session_completion
model: generalized_estimating_equations
formula: completion ~ intervention + time_pressure + (1|student_id)
cluster_variable: student_id
significance_level: 0.05`,
    status: 'PRE_REGISTERED',
    sampleSizeTarget: 120,
    currentEnrollment: 48,
    startDate: '2026-09-10'
  }
];

export const DEFAULT_TRANSFER_GAPS: TransferGapAnalysis[] = [
  {
    domain: 'Sắp Xếp Ưu Tiên (Prioritization)',
    gameSuccessRate: 84,
    realWorldActionSuccessRate: 62,
    transferGap: 22,
    transferStatus: 'moderate_gap',
    recommendation: 'Bổ sung thông báo nhắc nhở nhẹ nhàng vào khung giờ 19:00 - 20:00 lúc học sinh thực sự ngồi vào bàn học.'
  },
  {
    domain: 'Điều Hòa Cảm Xúc (Self-Regulation)',
    gameSuccessRate: 88,
    realWorldActionSuccessRate: 74,
    transferGap: 14,
    transferStatus: 'healthy_transfer',
    recommendation: 'Chuyển hóa tốt. Học sinh áp dụng kỹ thuật thở 4-4-4 hiệu quả ngay trong ngày.'
  },
  {
    domain: 'Lập Kế Hoạch & Quản Lý Thời Gian',
    gameSuccessRate: 79,
    realWorldActionSuccessRate: 51,
    transferGap: 28,
    transferStatus: 'high_transfer_gap',
    recommendation: 'Cần hạ nhỏ quy mô hành động ngoài đời từ 10 phút xuống 3 phút để giảm rào cản trì hoãn.'
  },
  {
    domain: 'Tài Chính & Chi Tiêu Có Kế Hoạch',
    gameSuccessRate: 91,
    realWorldActionSuccessRate: 68,
    transferGap: 23,
    transferStatus: 'moderate_gap',
    recommendation: 'Khuyến khích học sinh dùng phong bì vật lý hoặc bảng ghi chép để tạo mỏ neo xúc giác.'
  }
];

export const DEFAULT_CAUSAL_CLAIMS: CausalClaimRecord[] = [
  {
    claimId: 'causal_01',
    relationship: 'Hành Động Nhỏ Ngoài Đời Thực -> Tiến Bộ Mục Tiêu Tuần',
    associationMetric: 'Tương quan: r = 0.54, p < 0.001',
    causalEvidenceLevel: 'quasi_experimental',
    confoundersControlled: ['Tuổi/Khối lớp', 'Điểm năng lực ban đầu (Baseline)', 'Tần suất đăng nhập', 'Lớp học'],
    dagPath: 'Intervention -> MicroAction_Completed -> (Mediator: StrategyChange) -> Goal_Progress',
    guidanceNote: 'Đã hiệu chỉnh yếu tố nhiễu bằng mô hình hồi quy đa cấp. Tín hiệu nhân quả ở mức Khả Quan (Moderate Causal Signal).'
  },
  {
    claimId: 'causal_02',
    relationship: 'Sử Dụng Trợ Giúp Thông Minh -> Tỉ Lệ Thử Lại Thành Công',
    associationMetric: 'Tương quan: r = 0.31, p = 0.04',
    causalEvidenceLevel: 'preliminary_adjusted',
    confoundersControlled: ['Độ khó tình huống', 'Thời gian đọc đề'],
    dagPath: 'Hint_Requested -> Scaffold_Delivered -> Success_Retry',
    guidanceNote: 'Cảnh báo: Cần cẩn trọng phân biệt giữa "trợ giúp tạo thành công" và "học sinh vốn kiên trì hơn thì hay bấm trợ giúp".'
  },
  {
    claimId: 'causal_03',
    relationship: 'Số Phút Chơi Game Kéo Dài -> Năng Lực Giải Quyết Vấn Đề',
    associationMetric: 'Tương quan: r = 0.08, p = 0.42 (Không có ý nghĩa)',
    causalEvidenceLevel: 'insufficient',
    confoundersControlled: ['Số phiên chơi'],
    dagPath: 'Session_Duration -/-> Problem_Solving_Growth',
    guidanceNote: 'Hệ thống khẳng định: Thời lượng chơi game dài KHÔNG tương quan hay gây ra sự tiến bộ năng lực. Chất lượng phản tư và việc nhỏ mới là đòn bẩy.'
  }
];

export const DEFAULT_POLICY_RULES: PolicyRule[] = [
  {
    id: 'rule_safe_workload',
    name: 'Giới Hạn Quá Tải Nhận Thức (Cognitive Load Guard)',
    condition: 'abandonRate7d > 0.40 OR sessionTimeMinutes > 20',
    action: 'reduce_load_and_suggest_pause',
    priority: 100,
    active: true,
    category: 'safety',
    description: 'Nếu học sinh có tỉ lệ bỏ dở cao (>40%) hoặc đã tham gia quá 20 phút, hệ thống tự động ưu tiên bài dễ hơn và đề xuất nghỉ ngơi giải lao.'
  },
  {
    id: 'rule_quick_time',
    name: 'Bộ Lọc Thời Gian Hạn Hẹp (Quick Experience Filter)',
    condition: 'timeBudgetMinutes <= 3',
    action: 'deliver_single_scene_micro_action',
    priority: 80,
    active: true,
    category: 'workload',
    description: 'Nếu học sinh chỉ có quỹ thời gian <= 3 phút, hệ thống chỉ kích hoạt việc nhỏ thực tế 2-3 phút, không đưa game phân nhánh phức tạp.'
  },
  {
    id: 'rule_strategy_reinforce',
    name: 'Khuyến Khích Tăng Cường Thử Thách Khi Tiến Bộ',
    condition: 'strategyChangeRate14d > 0.60 AND persistenceScore >= 75',
    action: 'advance_to_multi_branch_challenge',
    priority: 60,
    active: true,
    category: 'adaptation',
    description: 'Học sinh có thói quen đổi chiến lược linh hoạt và kiên trì cao sẽ được gợi ý các tình huống có tính mơ hồ và phân nhánh sâu hơn.'
  },
  {
    id: 'rule_high_uncertainty',
    name: 'Khám Phá Nhẹ Khi Độ Bất Định Cao (Uncertainty-Aware Exploration)',
    condition: 'evidenceCount < 10 OR uncertaintyStatus === "high_uncertainty"',
    action: 'exploratory_low_stakes_scaffold',
    priority: 90,
    active: true,
    category: 'safety',
    description: 'Tuyệt đối không cá nhân hóa mạnh tay hoặc gán nhãn khi dữ liệu quan sát còn ít; thay vào đó đưa ra trải nghiệm khám phá trung tính.'
  }
];

export const DEFAULT_SIMULATION_SCENARIOS: PolicySimulationScenario[] = [
  {
    id: 'sim_01',
    scenarioName: 'Học sinh bận rộn trước giờ ăn tối',
    studentProfileSummary: 'Học sinh lớp 8, quỹ thời gian chỉ còn 3 phút, năng lực Prioritization đang rèn luyện.',
    timeBudgetMinutes: 3,
    abandonRate7d: 0.10,
    strategyChangeRate14d: 0.50,
    currentStressProxy: 'low',
    triggeredRuleId: 'rule_quick_time',
    predictedAction: 'Chuyển sang Hành Động Nhỏ 2 phút (Ghi việc quan trọng)',
    riskAssessment: 'none'
  },
  {
    id: 'sim_02',
    scenarioName: 'Học sinh có dấu hiệu quá tải & nản lòng',
    studentProfileSummary: 'Tỉ lệ bỏ dở 7 ngày qua cao (52%), vừa thử lại thất bại 2 lần trong bài kiểm tra.',
    timeBudgetMinutes: 10,
    abandonRate7d: 0.52,
    strategyChangeRate14d: 0.15,
    currentStressProxy: 'elevated',
    triggeredRuleId: 'rule_safe_workload',
    predictedAction: 'Kích hoạt Safe Mode: Giảm độ khó + Hơi thở 4-4-4 + Đề xuất giải lao',
    riskAssessment: 'low'
  },
  {
    id: 'sim_03',
    scenarioName: 'Học sinh mới đăng ký (Dữ liệu ban đầu)',
    studentProfileSummary: 'Chỉ mới hoàn thành 1 game đầu tiên, bằng chứng quan sát chỉ có 4 events.',
    timeBudgetMinutes: 5,
    abandonRate7d: 0.0,
    strategyChangeRate14d: 0.0,
    currentStressProxy: 'low',
    triggeredRuleId: 'rule_high_uncertainty',
    predictedAction: 'Khám phá nhẹ nhàng (Exploration): Không cá nhân hóa quá mức',
    riskAssessment: 'none'
  }
];
