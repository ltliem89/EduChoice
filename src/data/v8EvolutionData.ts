import {
  NovelPattern,
  MultiWorldModel,
  WhatWouldChangeMyMind,
  PersonalStrategyProfile,
  MultiAgentDebateRound,
  DecisionRobustnessPerturbation,
  AICapabilityRoute,
  IntelligenceHealthMetrics,
  PolicyCandidateVNext
} from '../types';
import { V7_CANONICAL_TABLES } from './v7FusionData';

/**
 * ============================================================
 * EDUCHOICE-AI V8 — COGNITIVE EVOLUTION ENGINE DATA
 * Master Spec V8.3 - V8.40
 * ============================================================
 */

// V8.3 & V8.4: Novel Pattern Discovery & Unknown-Unknown Detector
export const DEFAULT_NOVEL_PATTERNS: NovelPattern[] = [
  {
    patternId: 'np_01_silent_micro_abandonment',
    name: 'Vòng Lặp Trì Hoãn Trầm Lặng (Silent Micro-Abandonment Loop)',
    description: 'Học sinh không ấn nút thoát nhưng chuyển qua tab khác đúng 45-60 giây sau khi gặp câu hỏi đòi hỏi tính toán phức tạp, sau đó quay lại và chọn đáp án dễ dãi nhất.',
    novelty: 0.91,
    prevalence: 0.34,
    persistence: 0.82,
    contextCoverage: 0.78,
    confidence: 0.88,
    evidenceCount: 19,
    status: 'validated',
    contexts: ['Bài tập định lượng', 'Phiên học sau 21h', 'Áp lực điểm số cao'],
    discoveredAt: '2026-09-12T10:15:00Z',
    actionOpportunity: 'Tự động kích hoạt giàn giáo tư duy (Scaffold) chia câu hỏi phức tạp thành 2 bước nhỏ trước khi học sinh kịp rời tab.'
  },
  {
    patternId: 'np_02_pre_exam_window_surfing',
    name: 'Hội Chứng Lướt Cửa Sổ Bù Trừ Trước Kỳ Kiểm Tra (Pre-Exam Window Surfing)',
    description: 'Mở liên tục 7-10 tài liệu tham khảo khác nhau mà không đọc quá 30 giây ở bất kỳ tài liệu nào. Đây là phản xạ phòng vệ tâm lý tạo cảm giác giả về sự chuẩn bị.',
    novelty: 0.86,
    prevalence: 0.28,
    persistence: 0.74,
    contextCoverage: 0.65,
    confidence: 0.81,
    evidenceCount: 12,
    status: 'reviewed',
    contexts: ['Đêm trước ngày thi', 'Đề cương ôn tập lớn'],
    discoveredAt: '2026-09-13T16:40:00Z',
    actionOpportunity: 'Đề xuất chế độ Zero-Overwhelm: Ẩn bớt 6 tab, chỉ để lại 1 mục tiêu duy nhất trong 15 phút đầu.'
  },
  {
    patternId: 'np_03_autonomous_night_compensation',
    name: 'Chiến Thuật Tự Bù Đắp Ban Đêm Tích Cực (Autonomous Night Compensation)',
    description: 'Khi bị phân tâm vào buổi chiều, học sinh tự giác bù lại bằng 1 phiên tập trung sâu 20 phút lúc 20h mà không cần thông báo nhắc nhở.',
    novelty: 0.79,
    prevalence: 0.19,
    persistence: 0.88,
    contextCoverage: 0.82,
    confidence: 0.92,
    evidenceCount: 15,
    status: 'validated',
    contexts: ['Học sinh nhóm Tự chủ cao', 'Sau khi hoàn thành micro-game quản lý thời gian'],
    discoveredAt: '2026-09-10T22:00:00Z',
    actionOpportunity: 'Ghi nhận và củng cố niềm tin tự chủ (Agency) bằng lời khen trung thực không phóng đại.'
  },
  {
    patternId: 'np_04_hesitant_toolkit_peeking',
    name: 'Mẫu Hình Nhìn Lén Hộp Công Cụ Nhưng Không Dùng (Hesitant Toolkit Peeking)',
    description: 'Học sinh mở menu công cụ hỗ trợ (như Hơi thở 4-4-4 hoặc Ma trận Eisenhower) nhưng đóng lại sau 2 giây và tiếp tục vật lộn một mình.',
    novelty: 0.74,
    prevalence: 0.22,
    persistence: 0.68,
    contextCoverage: 0.60,
    confidence: 0.77,
    evidenceCount: 8,
    status: 'candidate',
    contexts: ['Gặp tình huống bế tắc', 'Nghi ngại về sự hỗ trợ'],
    discoveredAt: '2026-09-14T02:10:00Z',
    actionOpportunity: 'Đơn giản hóa công cụ thành 1 câu chỉ dẫn trực tiếp hiển thị tự nhiên trong bối cảnh thay vì bắt mở menu riêng.'
  }
];

// V8.5: Multi-World Reasoning (Competing World Models)
export const DEFAULT_WORLD_MODELS: MultiWorldModel[] = [
  {
    modelId: 'wm_01_cognitive_load_surge',
    name: 'Mô Hình Thế Giới A: Đột Biến Tải Nhận Thức (Cognitive Overload Model)',
    premise: 'Học sinh bỏ cuộc hoặc chọn sai là do lượng thông tin đồng thời vượt quá dung lượng bộ nhớ làm việc (Working Memory > 4 chunks).',
    assumptions: [
      'Nhiệm vụ có quá nhiều chi tiết gây nhiễu',
      'Thời gian quyết định bị giới hạn quá chặt',
      'Cảm xúc tiêu cực làm co hẹp chú ý'
    ],
    fitScore: 0.84,
    uncertainty: 0.18,
    disconfirmingEvidenceCount: 2,
    status: 'DOMINANT'
  },
  {
    modelId: 'wm_02_fear_of_failure_avoidance',
    name: 'Mô Hình Thế Giới B: Tâm Lý Tránh Né Thất Bại (Loss Aversion & Ego Defense)',
    premise: 'Học sinh né tránh làm bài không phải vì lười, mà để bảo vệ lòng tự trọng khỏi nguy cơ nhận điểm kém hoặc cảm giác bất tài.',
    assumptions: [
      'Kỳ vọng từ gia đình hoặc lớp học tạo áp lực xã hội',
      'Tư duy đóng (Fixed Mindset) coi lỗi sai là bằng chứng về sự kém cỏi',
      'Hành vi trì hoãn hoạt động như một cái cớ tự vệ'
    ],
    fitScore: 0.76,
    uncertainty: 0.25,
    disconfirmingEvidenceCount: 3,
    status: 'PLAUSIBLE'
  },
  {
    modelId: 'wm_03_dopamine_micro_stimulation',
    name: 'Mô Hình Thế Giới C: Tìm Kiếm Kích Thích Tức Thời (Immediate Gratification Bias)',
    premise: 'Não bộ vị thành niên ưu tiên phần thưởng dopamine tức thì từ thông báo mạng xã hội hơn là phần thưởng trừu tượng dài hạn của điểm thi.',
    assumptions: [
      'Thiết bị điện tử ở trong tầm mắt tạo lực kéo kích thích liên tục',
      'Kế hoạch học tập thiếu các mốc phản hồi tức thì',
      'Học sinh chưa có công cụ kiềm chế bốc đồng'
    ],
    fitScore: 0.79,
    uncertainty: 0.21,
    disconfirmingEvidenceCount: 2,
    status: 'PLAUSIBLE'
  },
  {
    modelId: 'wm_04_measurement_noise_artifact',
    name: 'Mô Hình Thế Giới D: Sai Số Đo Lường & Trễ Đồng Hồ Mạng (Measurement Artifact)',
    premise: 'Sự giảm sút hành vi chỉ là hiện tượng nhiễu do mất kết nối mạng, trễ telemetry thiết bị hoặc học sinh mở tab khác để tra từ điển học tập.',
    assumptions: [
      'Học sinh tra cứu tài liệu bài tập trên tab khác',
      'Trễ mạng WiFi làm sai lệch phép đo timestamp',
      'Thiết bị chuyển sang chế độ tiết kiệm pin'
    ],
    fitScore: 0.24,
    uncertainty: 0.65,
    disconfirmingEvidenceCount: 8,
    status: 'LOW_FIT'
  }
];

// V8.6 & V8.7: "What Would Change My Mind?" Engine (Falsifiability Criteria)
export const DEFAULT_FALSIFIABILITY_CONDITIONS: WhatWouldChangeMyMind[] = [
  {
    hypothesisId: 'hyp_01_switching_fatigue',
    hypothesisTitle: 'Chuyển tab vi mô liên tục gây suy giảm tỷ lệ hoàn thành nhiệm vụ',
    currentConfidence: 0.85,
    wouldDecreaseConfidence: [
      'Học sinh tiếp tục chuyển tab > 5 lần/giờ nhưng tỷ lệ hoàn thành bài tập vẫn đạt > 90%',
      'Thời gian phục hồi (DRI) giảm dần tự nhiên mà không cần bất kỳ can thiệp nào',
      'Dữ liệu camera/nhật ký cho thấy tab phụ là từ điển học thuật hoặc tài liệu tham khảo chính thống'
    ],
    wouldIncreaseConfidence: [
      'Khi giảm tần suất chuyển tab (thông qua bộ đếm Pomodoro), tỷ lệ hoàn thành tăng ngay lập tức > 25%',
      'Sự chuyển tab lặp lại kèm theo nhịp tim tăng hoặc độ trễ phản hồi kéo dài'
    ],
    falsifiabilityScore: 0.94
  },
  {
    hypothesisId: 'hyp_02_game_skill_transfer',
    hypothesisTitle: 'Kỹ năng ưu tiên trong game chuyển hóa thành thói quen soạn cặp và lập thời gian biểu ngoài đời',
    currentConfidence: 0.72,
    wouldDecreaseConfidence: [
      'Điểm game lập kế hoạch đạt tối đa 100/100 nhưng tỷ lệ soạn cặp thực tế 14 ngày vẫn giữ nguyên ở mức 20%',
      'Học sinh chia sẻ rằng các lựa chọn trong game chỉ là "chọn đáp án đúng để qua bài", không áp dụng ngoài đời',
      'Phụ huynh xác nhận bài tập về nhà tiếp tục bị bỏ quên vào buổi sáng'
    ],
    wouldIncreaseConfidence: [
      'Học sinh tự báo cáo và giáo viên ghi nhận bài tập được nộp đúng hạn tăng 3 buổi liên tiếp sau khi chơi game',
      'Học sinh tự động áp dụng ma trận Eisenhower khi được giao bài tập nhóm'
    ],
    falsifiabilityScore: 0.91
  }
];

// V8.13: Personal Strategy Discovery (What works for this specific student?)
export const DEFAULT_PERSONAL_STRATEGIES: PersonalStrategyProfile[] = [
  {
    strategyId: 'strat_01_checklist',
    strategyName: 'Bảng kiểm chi tiết 3 việc nhỏ (Checklist)',
    studentId: 'HS-2026-09A',
    context: 'Khi bắt đầu buổi tự học tối (20h)',
    observedEffect: 0.28, // +28% hoàn thành
    confidence: 0.92,
    transferRate: 0.85,
    burdenScore: 0.15, // Rất nhẹ nhàng
    preferenceRank: 1,
    studentAgencyNotes: 'Học sinh rất thích cảm giác tích dấu check từng ô nhỏ; cảm thấy tự chủ và rõ ràng.'
  },
  {
    strategyId: 'strat_02_5s_rule',
    strategyName: 'Quy tắc Đếm ngược 5 Giây (5-Second Rule)',
    studentId: 'HS-2026-09A',
    context: 'Khi đứng dậy khỏi giường hoặc bàn giải trí',
    observedEffect: 0.22, // +22% kích hoạt hành động
    confidence: 0.86,
    transferRate: 0.78,
    burdenScore: 0.10,
    preferenceRank: 2,
    studentAgencyNotes: 'Đếm 5-4-3-2-1 giúp cắt đứt suy nghĩ đắn đo ngay lập tức; không tốn công sức chuẩn bị.'
  },
  {
    strategyId: 'strat_03_micro_game',
    strategyName: 'Thử thách mô phỏng 2 phút (Game DSL)',
    studentId: 'HS-2026-09A',
    context: 'Khi cảm thấy chán nản hoặc thiếu hứng thú học',
    observedEffect: 0.14, // +14% tái kích hoạt
    confidence: 0.81,
    transferRate: 0.65,
    burdenScore: 0.35,
    preferenceRank: 3,
    studentAgencyNotes: 'Hữu ích khi mất động lực, nhưng nếu đang vội thì học sinh muốn làm thẳng việc chính.'
  },
  {
    strategyId: 'strat_04_breath_444',
    strategyName: 'Hơi thở vuông cân bằng cảm xúc 4-4-4',
    studentId: 'HS-2026-09A',
    context: 'Khi đối diện với bài kiểm tra thử bị điểm thấp',
    observedEffect: 0.09, // +9% bình tĩnh
    confidence: 0.74,
    transferRate: 0.58,
    burdenScore: 0.20,
    preferenceRank: 4,
    studentAgencyNotes: 'Giúp nhịp tim đập chậm lại nhưng cần người hướng dẫn ban đầu.'
  }
];

// V8.20 & V8.21: Multi-Agent Debate & Self-Critique Engine
export const DEFAULT_AGENT_DEBATES: MultiAgentDebateRound[] = [
  {
    debateId: 'deb_01_intervention_intensity',
    topic: 'Xác định mức độ can thiệp cho học sinh sau 2 lần xao nhãng liên tiếp',
    proposingAgent: 'Intervention Agent (Agent Can Thiệp)',
    proposedAction: 'Gợi ý một Game mô phỏng tình huống 5 phút về kiểm soát xung động.',
    critiquingAgent: 'Safety & Cognitive Load Agent (Agent An Toàn & Tải Nhận Thức)',
    counterarguments: [
      'Tải nhận thức hiện tại của học sinh đã ở mức 0.68; đưa thêm 1 game 5 phút sẽ làm trầm trọng thêm sự mệt mỏi.',
      'Thời gian tự học còn lại chỉ có 25 phút; can thiệp 5 phút chiếm 20% tổng quỹ thời gian là gánh nặng quá mức (Burden Index vượt ngưỡng).'
    ],
    evidenceCheckSummary: 'Dữ liệu lịch sử xác nhận phiên ngày 10/9 học sinh đã bỏ cuộc khi bị đề xuất kịch bản dài lúc mệt.',
    revisedAction: 'Hạ bậc theo thang MEI: Chỉ đưa một Micro-nudge 15 giây "Uống một ngụm nước và hít thở sâu 3 nhịp".',
    fusedVerdict: 'Phê duyệt can thiệp tối thiểu (MEI L1). Tránh làm quá tải người học.',
    consensusScore: 0.96
  },
  {
    debateId: 'deb_02_difficulty_escalation',
    topic: 'Có nên nâng độ khó kịch bản Lập kế hoạch lên Cấp độ 3 (Level 3: Áp lực thời gian ngặt nghèo)?',
    proposingAgent: 'Behavior Agent (Agent Hành Vi)',
    proposedAction: 'Nâng độ khó kịch bản lên Level 3 vì học sinh đã đạt điểm tuyệt đối ở Level 2.',
    critiquingAgent: 'Goal & Research Agent (Agent Mục Tiêu & Nghiên Cứu)',
    counterarguments: [
      'Điểm Level 2 cao nhưng khoảng cách chuyển hóa (Transfer Gap) ngoài đời vẫn còn lớn (0.37).',
      'Nâng độ khó ngay có thể gây ức chế (Frustration) và tạo phản xạ học vẹt đáp án game thay vì thấu hiểu bản chất.'
    ],
    evidenceCheckSummary: 'Mô hình CATE cho thấy việc củng cố thực hành ngoài đời (Micro-Action L3) lúc này mang lại hiệu quả bền vững hơn 2.4 lần so với việc tăng độ khó game.',
    revisedAction: 'Giữ nguyên độ khó game Level 2; chuyển trọng tâm sang gợi ý thực hiện 1 hành động thật ngoài đời trong 5 phút.',
    fusedVerdict: 'Thống nhất ưu tiên chuyển hóa thực tế thay vì leo thang độ khó cơ học.',
    consensusScore: 0.91
  }
];

// V8.22: Decision Robustness Perturbations
export const DEFAULT_ROBUSTNESS_PERTURBATIONS: DecisionRobustnessPerturbation[] = [
  {
    testId: 'rob_01_evidence_jitter',
    perturbationType: 'Nhiễu dữ liệu bằng chứng (Evidence Jitter ±15%)',
    variation: 'Giảm 15% trọng số của sự kiện chuyển tab vi mô',
    shiftPercent: -15,
    decisionOutcome: 'STABLE',
    robustnessRating: 'ROBUST'
  },
  {
    testId: 'rob_02_remove_latest_event',
    perturbationType: 'Loại bỏ sự kiện mới nhất (Drop Latest Event)',
    variation: 'Xóa bỏ lần thử lại thất bại gần nhất trong phiên',
    shiftPercent: -5,
    decisionOutcome: 'STABLE',
    robustnessRating: 'ROBUST'
  },
  {
    testId: 'rob_03_time_budget_shrink',
    perturbationType: 'Thu hẹp ngân sách thời gian (Time Budget Compression)',
    variation: 'Giả lập quỹ thời gian rảnh giảm từ 30 phút xuống 10 phút',
    shiftPercent: -66,
    decisionOutcome: 'MODIFIED',
    robustnessRating: 'MODERATELY_SENSITIVE'
  }
];

// V8.24 - V8.26: AI Capability Router & Intelligence Budget ("Know When Not to Act")
export const DEFAULT_CAPABILITY_ROUTES: AICapabilityRoute[] = [
  {
    requestId: 'req_01_routine_scoring',
    taskType: 'Tính toán điểm năng lực & cập nhật Bayesian cơ bản',
    riskLevel: 'LOW',
    selectedRoute: 'RULE_ENGINE',
    actionType: 'DO',
    budgetCostToken: 0,
    justification: 'Công thức toán học tất định (Deterministic) chuẩn; không cần gọi LLM để tiết kiệm chi phí và độ trễ < 5ms.'
  },
  {
    requestId: 'req_02_creative_scenario_scaffold',
    taskType: 'Sáng tạo khung kịch bản tâm lý theo từ khóa của Quản trị viên',
    riskLevel: 'LOW',
    selectedRoute: 'GEMINI',
    actionType: 'DO',
    budgetCostToken: 850,
    justification: 'Đòi hỏi sự giàu có về ngôn ngữ học đường và trí tưởng tượng bối cảnh sư phạm của Gemini 3.8 Flash.'
  },
  {
    requestId: 'req_03_high_uncertainty_intervention',
    taskType: 'Đề xuất can thiệp khi dữ liệu hành vi và tự đánh giá xung đột sâu sắc',
    riskLevel: 'MEDIUM',
    selectedRoute: 'MULTI_AGENT',
    actionType: 'ASK',
    budgetCostToken: 420,
    justification: 'Xung đột nhận thức cần sự tranh biện giữa Agent Hành vi và Agent An toàn, sau đó hỏi ý kiến người học (Học sinh chọn cách tiếp cận).'
  },
  {
    requestId: 'req_04_possible_crisis_language',
    taskType: 'Phát hiện từ khóa tiêu cực vượt ngoài phạm vi giáo dục trong câu trả lời phản tư',
    riskLevel: 'CRITICAL',
    selectedRoute: 'HUMAN_REVIEW',
    actionType: 'ESCALATE',
    budgetCostToken: 0,
    justification: 'Tuyệt đối không để AI tự xử lý hoặc chuẩn đoán lâm sàng. Chuyển sang thông điệp an toàn chuẩn và đề xuất hỗ trợ từ giáo viên/phụ huynh.'
  },
  {
    requestId: 'req_05_insufficient_evidence_action',
    taskType: 'Yêu cầu phân loại học sinh khi mới chỉ có 2 sự kiện tương tác',
    riskLevel: 'LOW',
    selectedRoute: 'RULE_ENGINE',
    actionType: 'WAIT',
    budgetCostToken: 0,
    justification: 'Biết khi nào KHÔNG hành động (Know when not to act): Chưa đủ dữ liệu tin cậy; giữ nguyên chế độ quan sát im lặng L0.'
  }
];

// V8.29 & V8.30: Intelligence Health Metrics & Safe Self-Healing
export const DEFAULT_INTELLIGENCE_HEALTH: IntelligenceHealthMetrics = {
  dataHealthScore: 0.97,
  modelCalibrationScore: 0.91,
  agentAgreementScore: 0.89,
  policySafetyScore: 0.99,
  uiOverwhelmIndex: 0.16, // Thấp nghĩa là giao diện rất thoáng, không gây ngợp
  overallHealthRating: 'OPTIMAL',
  selfHealingActions: [
    'Tự động làm sạch và đồng bộ lại hàng đợi sự kiện ngoại tuyến (Offline Event Queue)',
    'Tái chuẩn hóa độ lệch đồng hồ máy trạm khi phát hiện trễ gói tin > 3s',
    'Tự động vô hiệu hóa cache quyết định khi phát hiện phiên bản chính sách cập nhật',
    'Tái cân bằng trọng số tự phê phán khi tỷ lệ giáo viên ghi đè (Teacher Override) vượt 15%'
  ]
};

// V8.16: Policy Evolution Engine (Policy vNext Candidates)
export const DEFAULT_POLICY_CANDIDATES: PolicyCandidateVNext[] = [
  {
    candidateId: 'pol_cand_01_fatigue_soft_cap',
    policyVersion: 'adaptive_policy@1.5.0-rc1',
    triggerObservation: 'Phát hiện 34% học sinh có biểu hiện mỏi mệt nhận thức nếu phiên tương tác vượt quá 22 phút liên tục.',
    proposedChange: 'Bổ sung trần an toàn cứng: Sau phút thứ 20, tự động tắt mọi đề xuất game mới và chỉ hiển thị tùy chọn "Nghỉ ngơi 5 phút" hoặc "Xem thành quả đã đạt".',
    offlineSimulationScore: 0.93,
    safetyPassed: true,
    fairnessScore: 0.96,
    humanReviewStatus: 'PENDING_REVIEW',
    rollbackPlan: 'Khôi phục ngay lập tức về adaptive_policy@1.4.0 nếu tỷ lệ học sinh phàn nàn bị cắt ngang tăng > 5%.'
  },
  {
    candidateId: 'pol_cand_02_agency_first_choice',
    policyVersion: 'adaptive_policy@1.5.0-rc2',
    triggerObservation: 'Khi cho học sinh chọn 1 trong 3 cách thức (Chia nhỏ / Game 2p / Tự chọn), mức độ duy trì cam kết tăng +41% so với việc chỉ định 1 can thiệp duy nhất.',
    proposedChange: 'Mặc định hóa nguyên tắc Tự chủ (Student Agency): Mọi can thiệp từ cấp độ L2 trở lên luôn phải kèm theo 2 phương án thay thế để học sinh tự quyết định.',
    offlineSimulationScore: 0.95,
    safetyPassed: true,
    fairnessScore: 0.98,
    humanReviewStatus: 'APPROVED',
    rollbackPlan: 'Chuyển về đề xuất đơn phương thức nếu giao diện 3 lựa chọn làm tăng thời gian do dự > 15 giây.'
  }
];

// Master Spec V8.39: Toàn bộ 100 Bảng Dữ Liệu Chuẩn Hóa V8 (62 bảng V7 + 38 bảng V8 mới)
export const V8_100_CANONICAL_TABLES = [
  ...V7_CANONICAL_TABLES,
  // 38 Bảng dữ liệu chuẩn mới theo Master Spec V8.39 (bổ sung từ bảng 63 đến 100)
  { id: '63', name: '63_CAUSAL_DAGS', description: 'Đồ thị nhân quả có hướng và biến gây nhiễu được kiểm soát' },
  { id: '64', name: '64_POTENTIAL_OUTCOMES', description: 'Ước lượng kết quả tiềm năng Y(1) và Y(0)' },
  { id: '65', name: '65_CATE_ESTIMATES', description: 'Hiệu ứng can thiệp điều kiện theo phân nhóm ngữ cảnh' },
  { id: '66', name: '66_N_OF_1_TRIALS', description: 'Chuỗi thử nghiệm can thiệp nội tại từng cá nhân A-B-A-B' },
  { id: '67', name: '67_MICRO_RANDOMIZED_RUNS', description: 'Nhật ký phân bổ ngẫu nhiên vi mô tại thời điểm đủ điều kiện' },
  { id: '68', name: '68_SMART_SEQUENCES', description: 'Chuỗi can thiệp thích ứng đa giai đoạn theo phản hồi' },
  { id: '69', name: '69_RESPONSE_CLASSIFICATIONS', description: 'Phân loại phản hồi: Đầy đủ, Một phần, Không phản hồi' },
  { id: '70', name: '70_ECOLOGICAL_VALIDITY', description: 'Đánh giá tính chân thực đời sống của kịch bản học đường' },
  { id: '71', name: '71_INTER_RATER_RELIABILITY', description: 'Hệ số đồng thuận giữa các chuyên gia giáo dục (Kappa/Alpha)' },
  { id: '72', name: '72_CONTENT_PANEL_REVIEWS', description: 'Biên bản thẩm định hội đồng chuyên gia sư phạm và tâm lý' },
  { id: '73', name: '73_BENCHMARK_CASES', description: 'Tập dữ liệu chuẩn 100-500 ca kiểm thử hồi quy AI' },
  { id: '74', name: '74_MODEL_CHANGE_GATES', description: 'Cổng kiểm soát an toàn khi nâng cấp phiên bản mô hình AI' },
  { id: '75', name: '75_OFFLINE_EVENT_QUEUES', description: 'Hàng đợi sự kiện ngoại tuyến với mã khóa Idempotency' },
  { id: '76', name: '76_EVENT_SOURCED_GROWTH', description: 'Mô hình phục hồi lịch sử phát triển từ luồng sự kiện thô' },
  { id: '77', name: '77_ANALYSIS_AS_CODE', description: 'Kế hoạch phân tích thực nghiệm khai báo dạng mã nguồn (YAML)' },
  { id: '78', name: '78_RESEARCH_REPORTS_V2', description: 'Báo cáo khoa học tự động kèm khoảng tin cậy và hạn chế' },
  { id: '79', name: '79_STATISTICAL_GUARDRAILS', description: 'Kiểm soát đa giả thuyết, chống P-hacking và kết luận vội' },
  { id: '80', name: '80_TRIANGULATION_CHECKS', description: 'Kiểm tra hội tụ tam giác: Hành vi + Tự báo cáo + Kết quả' },
  // Bảng 81 đến 100 theo bảng liệt kê V8.39
  { id: '81', name: '81_NOVEL_PATTERNS', description: 'Các mẫu hình hành vi mới được Discovery Engine phát hiện tự động' },
  { id: '82', name: '82_UNKNOWN_PATTERNS', description: 'Mẫu hình cụm chưa xác định nằm ngoài phân loại 20 construct' },
  { id: '83', name: '83_PATTERN_FEATURES', description: 'Đặc trưng toán học và tọa độ không gian biểu diễn mẫu hình' },
  { id: '84', name: '84_REASONING_MODELS', description: 'Các mô hình giải thích thế giới cạnh tranh (Multi-World Models A/B/C/D)' },
  { id: '85', name: '85_MODEL_COMPARISONS', description: 'Bảng so sánh độ khớp, độ bất định và bằng chứng phản biện giữa các mô hình' },
  { id: '86', name: '86_COUNTERARGUMENTS', description: 'Luận điểm phản biện và tự phê phán trước khi ra quyết định can thiệp' },
  { id: '87', name: '87_REASONING_SESSIONS', description: 'Nhật ký phiên suy luận đa bước kèm dấu vết truy nguyên đầy đủ' },
  { id: '88', name: '88_DECISION_SENSITIVITY', description: 'Kết quả kiểm tra độ nhạy quyết định khi biến thiên dữ liệu ±10%' },
  { id: '89', name: '89_POLICY_CANDIDATES', description: 'Dự thảo chính sách thích ứng cải tiến được đề xuất cho Policy vNext' },
  { id: '90', name: '90_POLICY_REVIEWS', description: 'Biên bản thẩm định chính sách của hội đồng chuyên gia (Human Governance)' },
  { id: '91', name: '91_KNOWLEDGE_EVOLUTION', description: 'Lịch sử tiến hóa và cập nhật vòng đời của tri thức can thiệp (L0..L5)' },
  { id: '92', name: '92_RESEARCH_DISCOVERIES', description: 'Kho khám phá khoa học mới được sinh ra từ quá trình tự học của hệ thống' },
  { id: '93', name: '93_SCENARIO_RESULTS', description: 'Kết quả mô phỏng các kịch bản tương lai và phân tích phản thực tế' },
  { id: '94', name: '94_ADAPTIVE_EXPERIMENTS', description: 'Sổ quản trị các thử nghiệm thích ứng có kiểm soát đạo đức và an toàn' },
  { id: '95', name: '95_AGENT_DEBATES', description: 'Biên bản tranh biện chuyên sâu giữa các agent chuyên trách trước khi hợp nhất' },
  { id: '96', name: '96_AI_CALIBRATION_RUNS', description: 'Đợt kiểm định độ chuẩn xác giữa xác suất tự tin và tần suất thực tế (Brier)' },
  { id: '97', name: '97_INTELLIGENCE_HEALTH', description: 'Bảng theo dõi sức khỏe tổng thể của hệ thống trí tuệ và tự phục hồi' },
  { id: '98', name: '98_FAILURE_MEMORY_V2', description: 'Bộ nhớ thất bại nâng cao và ràng buộc vĩnh viễn ngăn ngừa lặp lại sai lầm' },
  { id: '99', name: '99_HUMAN_CORRECTIONS_V2', description: 'Kho ví dụ hiệu chỉnh của con người phục vụ đánh giá mô hình' },
  { id: '100', name: '100_OOD_DETECTIONS', description: 'Nhật ký phát hiện tình huống nằm ngoài phân phối chuẩn (Out-of-Distribution)' }
];
