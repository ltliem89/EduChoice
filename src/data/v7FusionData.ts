import {
  WeakSignal,
  ContradictionRecord,
  EvidenceGraphItem,
  MultiHypothesisItem,
  MinimumEffectiveIntervention,
  SelfCritiqueRecord,
  TransferGapMetric,
  FailureMemoryItem
} from '../types';
import { V6_CANONICAL_TABLES } from './v6IntelligenceData';

// V7.4 & V7.5: Weak Signal Detection Engine (EWMA, CUSUM, baseline deviations)
export const DEFAULT_WEAK_SIGNALS: WeakSignal[] = [
  {
    signalId: 'sig_01_decision_latency',
    metricName: 'Độ trễ phản hồi tại nút quyết định khó (Decision Latency)',
    type: 'TIME_DEVIATION',
    severity: 'medium',
    classification: 'EMERGING_PATTERN',
    novelty: 0.78,
    persistence: 0.84,
    evidenceCount: 14,
    confidence: 0.82,
    deviationDelta: '+3.4s so với baseline 7 ngày',
    contexts: ['Kịch bản áp lực thời gian', 'Lựa chọn phương án học tập vs giải trí'],
    firstObservedAt: '2026-09-11T14:20:00Z',
    lastObservedAt: '2026-09-14T07:10:00Z',
    descriptionVi: 'Thời gian dừng cân nhắc trước các phương án ưu tiên tăng nhẹ liên tục qua 4 phiên gần nhất, phản ánh dấu hiệu ban đầu của sự mệt mỏi nhận thức hoặc do dự chiến lược.'
  },
  {
    signalId: 'sig_02_voluntary_retry',
    metricName: 'Tỷ lệ thử lại tự nguyện sau thất bại (Voluntary Retry)',
    type: 'BEHAVIOR_DEVIATION',
    severity: 'low',
    classification: 'SIGNIFICANT_CHANGE',
    novelty: 0.45,
    persistence: 0.92,
    evidenceCount: 22,
    confidence: 0.89,
    deviationDelta: '+28% vượt ngưỡng trung bình',
    contexts: ['Game 48 phút cuối', 'Ma trận Eisenhower'],
    firstObservedAt: '2026-09-08T09:00:00Z',
    lastObservedAt: '2026-09-14T08:15:00Z',
    descriptionVi: 'Học sinh chủ động chọn thử lại kịch bản để tìm phương án tối ưu hơn mà không cần hệ thống gợi ý, tín hiệu rất tích cực về tính tự chủ (Agency) và sự bền bỉ (Grit).'
  },
  {
    signalId: 'sig_03_task_switch_micro',
    metricName: 'Tần suất chuyển đổi tác vụ vi mô (Task Switch Frequency)',
    type: 'SEQUENCE_DEVIATION',
    severity: 'high',
    classification: 'WEAK_SIGNAL',
    novelty: 0.85,
    persistence: 0.65,
    evidenceCount: 9,
    confidence: 0.74,
    deviationDelta: '+1.8 lần/giờ học',
    contexts: ['Phiên tự học tối', 'Nhiệm vụ làm bài tập Toán'],
    firstObservedAt: '2026-09-13T19:30:00Z',
    lastObservedAt: '2026-09-14T01:45:00Z',
    descriptionVi: 'Tín hiệu phân mảnh chú ý xuất hiện khi chuyển qua lại giữa bài tập phân số và điện thoại; cần can thiệp bậc thấp (MEI L1/L2) để tránh trôi dạt chú ý trước khi biến thành thói quen trì hoãn.'
  },
  {
    signalId: 'sig_04_help_seeking_delay',
    metricName: 'Khoảng cách trễ trước khi gọi trợ giúp (Help-Seeking Latency)',
    type: 'INTERACTION_DEVIATION',
    severity: 'medium',
    classification: 'STABLE_PATTERN',
    novelty: 0.30,
    persistence: 0.88,
    evidenceCount: 18,
    confidence: 0.85,
    deviationDelta: '+45s sau khi bế tắc',
    contexts: ['Bài toán logic khó', 'Tình huống bất ngờ'],
    firstObservedAt: '2026-09-06T11:00:00Z',
    lastObservedAt: '2026-09-13T20:00:00Z',
    descriptionVi: 'Học sinh kiên trì tự mày mò trước khi yêu cầu gợi ý; đây là dấu hiệu tốt của tính độc lập nhưng cần đảm bảo không dẫn đến kiệt sức nhận thức (Frustration).'
  }
];

// V7.8: Contradiction Engine (Detecting conflicting evidence)
export const DEFAULT_CONTRADICTIONS: ContradictionRecord[] = [
  {
    contradictionId: 'contra_01_game_vs_real_world',
    title: 'Mâu thuẫn giữa kỹ năng trong Game và Thực thi Đời thực (Transfer Gap)',
    discrepancyType: 'GAME_VS_REAL_WORLD',
    severity: 'HIGH',
    sourceA: {
      name: 'Game 48 phút cuối (DSL Simulation)',
      claim: 'Năng lực Lập Kế Hoạch & Ưu Tiên trong game đạt mức Xuất sắc',
      value: 'Điểm số: 88/100',
      reliability: 0.92
    },
    sourceB: {
      name: 'Việc nhỏ 5 phút ngoài đời (Micro-Action Verification)',
      claim: 'Tỷ lệ hoàn thành việc soạn sách vở tối trước chỉ đạt mức thấp',
      value: 'Hoàn thành: 35%',
      reliability: 0.87
    },
    synthesisNotes: 'Học sinh hiểu rất rõ chiến lược lý thuyết trên màn hình nhưng gặp rào cản chuyển hóa khi bắt tay vào đồ dùng thực tế. Nguyên nhân không phải do thiếu hiểu biết mà do thiếu điểm tựa gợi nhớ môi trường (Environmental Cue).',
    suggestedAction: 'Triển khai can thiệp vi mô MEI L3: Đặt bảng nhắc việc dán cạnh góc bàn học thay vì giao thêm game lý thuyết.',
    status: 'INVESTIGATING'
  },
  {
    contradictionId: 'contra_02_self_report_vs_behavior',
    title: 'Mâu thuẫn giữa Tự Đánh Giá Tự Tin và Hành Vi Kiên Trì',
    discrepancyType: 'SELF_REPORT_VS_BEHAVIOR',
    severity: 'MEDIUM',
    sourceA: {
      name: 'Khảo sát phản tư (Self-Report Survey)',
      claim: 'Học sinh tự đánh giá khả năng kiềm chế xao nhãng rất cao',
      value: 'Tự tin: 85%',
      reliability: 0.65
    },
    sourceB: {
      name: 'Nhật ký sự kiện Telemetry (Behavior Event Stream)',
      claim: 'Tỷ lệ chuyển đổi ứng dụng trong 15 phút đầu phiên làm bài tập cao',
      value: 'Chuyển tab: 6 lần / 15p',
      reliability: 0.95
    },
    synthesisNotes: 'Không phán xét học sinh không trung thực; đây là hiện tượng phổ biến (Optimism Bias) khi ý chí dự định khác với phản ứng vô thức trước cám dỗ số. Tuyệt đối không gắn nhãn nói dối.',
    suggestedAction: 'Đưa ra câu hỏi phản tư không phán xét: "Em cảm thấy mình đã tập trung tốt, nhưng dữ liệu cho thấy điện thoại có 6 lần thông báo làm gián đoạn. Lần sau em muốn thử tắt chuông 15 phút không?"',
    status: 'OPEN'
  },
  {
    contradictionId: 'contra_03_agent_disagreement',
    title: 'Bất đồng đề xuất giữa Agent Hành Vi và Agent Tải Nhận Thức',
    discrepancyType: 'MULTI_AGENT_CONFLICT',
    severity: 'MEDIUM',
    sourceA: {
      name: 'Behavior Agent (Đặc phái viên Hành vi)',
      claim: 'Đề xuất tăng độ khó: Thử thách kịch bản đa nhánh 10 phút',
      value: 'Khuyến nghị: Tăng tải thách thức',
      reliability: 0.82
    },
    sourceB: {
      name: 'Safety & Cognitive Load Agent (Đặc phái viên An toàn & Tải)',
      claim: 'Cảnh báo: Tải ngoại cảnh đang cao sau 3 bài tập Toán liên tiếp',
      value: 'Tải nhận thức: 0.76 (Nguy cơ quá tải)',
      reliability: 0.90
    },
    synthesisNotes: 'Nguyên tắc an toàn v7: Safety & Cognitive Load luôn có quyền phủ quyết (Veto). Khi tải nhận thức cận ngưỡng, không được tăng thách thức phức tạp.',
    suggestedAction: 'Áp dụng quy tắc phủ quyết an toàn: Trì hoãn thử thách khó, chuyển sang bài tập thở 3 phút hoặc việc nhỏ hạ nhiệt.',
    status: 'RESOLVED'
  }
];

// V7.9: Evidence Reliability Model & Evidence Graph
export const DEFAULT_EVIDENCE_ITEMS: EvidenceGraphItem[] = [
  {
    evidenceId: 'evi_01_direct_retry',
    sourceType: 'DIRECT_BEHAVIOR',
    description: 'Quan sát 6 lần thử lại tự nguyện sau kết cục tiêu cực trong kịch bản 48 phút cuối',
    reliability: 0.95,
    recency: 0.90,
    specificity: 0.92,
    independence: 0.88,
    contextMatch: 0.94,
    confidence: 0.92,
    supportsHypothesisCodes: ['H1', 'H3'],
    contradictsHypothesisCodes: ['H4'],
    recordedAt: '2026-09-14T07:15:00Z'
  },
  {
    evidenceId: 'evi_02_task_delay',
    sourceType: 'REPEATED_PATTERN',
    description: 'Khoảng cách giữa hoàn thành bài tập và nộp bài bị chậm 15 phút do kiểm tra mạng xã hội',
    reliability: 0.88,
    recency: 0.85,
    specificity: 0.86,
    independence: 0.80,
    contextMatch: 0.90,
    confidence: 0.86,
    supportsHypothesisCodes: ['H2'],
    contradictsHypothesisCodes: ['H1'],
    recordedAt: '2026-09-13T20:30:00Z'
  },
  {
    evidenceId: 'evi_03_teacher_note',
    sourceType: 'TEACHER_OBSERVATION',
    description: 'Giáo viên bộ môn nhận xét: Em tiếp thu nhanh nhưng hay quên đồ dùng học tập khi đến lớp',
    reliability: 0.85,
    recency: 0.75,
    specificity: 0.80,
    independence: 0.95,
    contextMatch: 0.85,
    confidence: 0.84,
    supportsHypothesisCodes: ['H2', 'H5'],
    contradictsHypothesisCodes: [],
    recordedAt: '2026-09-12T10:00:00Z'
  },
  {
    evidenceId: 'evi_04_reflection_text',
    sourceType: 'SELF_REPORT',
    description: 'Phản tư học sinh: "Em muốn làm xong sớm để chơi, nhưng khi ngồi vào bàn thấy nhiều bài quá nên lúng túng không biết bắt đầu từ đâu"',
    reliability: 0.80,
    recency: 0.95,
    specificity: 0.90,
    independence: 0.75,
    contextMatch: 0.95,
    confidence: 0.82,
    supportsHypothesisCodes: ['H1', 'H2'],
    contradictsHypothesisCodes: ['H4'],
    recordedAt: '2026-09-14T06:45:00Z'
  }
];

// V7.6: Multi-Hypothesis Engine (H1..H6 with Disconfirming checks)
export const DEFAULT_MULTI_HYPOTHESES: MultiHypothesisItem[] = [
  {
    hypothesisId: 'hyp_01_cognitive_overload',
    code: 'H1',
    title: 'Quá tải phân rã tác vụ (Task Decomposition Overload)',
    mechanism: 'Học sinh nhìn bài tập dưới dạng một khối lượng lớn nguyên khối thay vì chia nhỏ thành các bước 10 phút, dẫn đến sự né tránh hành vi ban đầu.',
    priorProbability: 0.35,
    posteriorProbability: 0.62,
    evidenceForCount: 8,
    evidenceAgainstCount: 1,
    isDisconfirmingChecked: true,
    status: 'LEADING',
    clinicalDisclaimer: 'Thuần túy là rào cản phương pháp học tập học đường, không phản ánh năng lực trí tuệ hay bệnh lý.'
  },
  {
    hypothesisId: 'hyp_02_environmental_cue_missing',
    code: 'H2',
    title: 'Thiếu điểm tựa môi trường kích hoạt hành vi (Cue Absence)',
    mechanism: 'Ý định rèn luyện có sẵn nhưng môi trường học tập tại nhà thiếu các gợi ý vật lý cụ thể (như checklist dán trên bàn, đồng hồ thị giác).',
    priorProbability: 0.25,
    posteriorProbability: 0.55,
    evidenceForCount: 6,
    evidenceAgainstCount: 2,
    isDisconfirmingChecked: true,
    status: 'COMPETING',
    clinicalDisclaimer: 'Khái niệm tâm lý học thói quen (Habit Loop), không can thiệp điều trị y tế.'
  },
  {
    hypothesisId: 'hyp_03_high_motivation_low_strategy',
    code: 'H3',
    title: 'Động lực cao nhưng thiếu chiến lược phân bổ thời gian',
    mechanism: 'Học sinh rất muốn đạt điểm tốt (tính bền bỉ cao) nhưng chưa thành thạo kỹ thuật xếp việc Khẩn cấp vs Quan trọng trong thực tế.',
    priorProbability: 0.20,
    posteriorProbability: 0.48,
    evidenceForCount: 5,
    evidenceAgainstCount: 2,
    isDisconfirmingChecked: true,
    status: 'COMPETING',
    clinicalDisclaimer: 'Kỹ năng mềm quản lý thời gian thanh thiếu niên.'
  },
  {
    hypothesisId: 'hyp_04_lack_of_engagement',
    code: 'H4',
    title: 'Giảm sút động lực hoặc chán nản kịch bản (Fatigue/Disengagement)',
    mechanism: 'Giả thuyết rằng học sinh không còn hứng thú với việc học hay kịch bản mô phỏng.',
    priorProbability: 0.10,
    posteriorProbability: 0.08,
    evidenceForCount: 1,
    evidenceAgainstCount: 7,
    isDisconfirmingChecked: true,
    status: 'DISPROVED',
    clinicalDisclaimer: 'Bằng chứng về số lần thử lại tự nguyện cao (evi_01) đã bác bỏ giả thuyết này.'
  },
  {
    hypothesisId: 'hyp_05_time_budget_constraint',
    code: 'H5',
    title: 'Xung đột lịch sinh hoạt ngoại khóa gia đình',
    mechanism: 'Lịch học thêm và việc nhà dồn vào cùng khung giờ tối khiến khoảng thời gian học thực tế bị co ngắn đột ngột.',
    priorProbability: 0.10,
    posteriorProbability: 0.22,
    evidenceForCount: 3,
    evidenceAgainstCount: 2,
    isDisconfirmingChecked: false,
    status: 'UNDER_REVIEW',
    clinicalDisclaimer: 'Yếu tố bối cảnh gia đình học sinh.'
  },
  {
    hypothesisId: 'hyp_06_data_collection_artifact',
    code: 'H6',
    title: 'Sai số đo lường hoặc nhiễu thu thập dữ liệu (Measurement Artifact)',
    mechanism: 'Độ trễ do kết nối mạng yếu hoặc học sinh để mở tab mà không tương tác.',
    priorProbability: 0.05,
    posteriorProbability: 0.04,
    evidenceForCount: 0,
    evidenceAgainstCount: 5,
    isDisconfirmingChecked: true,
    status: 'DISPROVED',
    clinicalDisclaimer: 'Quy tắc V7 bắt buộc luôn kiểm chứng giả thuyết sai số kỹ thuật trước khi đưa ra nhận định.'
  }
];

// V7.16 & V7.17: Minimum Effective Intervention (MEI) Ladder
export const DEFAULT_MEI_LADDER: MinimumEffectiveIntervention[] = [
  {
    level: 0,
    levelCode: 'L0_OBSERVE',
    title: 'L0: Quan Sát Im Lặng (Silent Observation)',
    intensityLabel: '0% Can Thiệp',
    durationMinutes: 0,
    description: 'Chỉ ghi nhận telemetry và cập nhật trạng thái ước lượng. Tuyệt đối không làm gián đoạn dòng suy nghĩ của học sinh.',
    escalationCondition: 'Xuất hiện tín hiệu yếu lặp lại > 3 lần hoặc độ trễ bế tắc > 90 giây.',
    deescalationCondition: 'Học sinh đang trong trạng thái tập trung sâu (Flow State).',
    reversibility: 'HIGH',
    isActive: false
  },
  {
    level: 1,
    levelCode: 'L1_NUDGE',
    title: 'L1: Cú Hích Nhẹ (10s Micro-Nudge)',
    intensityLabel: 'Cường độ 15%',
    durationMinutes: 0.2,
    description: 'Hiển thị huy hiệu gợi mở nhẹ nhàng góc màn hình: "Gợi ý: Thử hít một hơi sâu và nhìn việc quan trọng nhất trước".',
    escalationCondition: 'Học sinh bỏ qua cú hích và tiếp tục hành vi chuyển tab xao nhãng.',
    deescalationCondition: 'Học sinh quay trở lại tác vụ chính trong vòng 30 giây.',
    reversibility: 'HIGH',
    isActive: true
  },
  {
    level: 2,
    levelCode: 'L2_REFLECT',
    title: 'L2: Câu Hỏi Phản Tư Ngắn (60s Prompt)',
    intensityLabel: 'Cường độ 30%',
    durationMinutes: 1,
    description: 'Đặt câu hỏi phản tư 1 chạm không phán xét: "Em muốn làm bài 10 phút trước hay muốn chia nhỏ bài này thành 2 phần?"',
    escalationCondition: 'Học sinh báo cáo cảm thấy bế tắc hoàn toàn hoặc chọn trợ giúp.',
    deescalationCondition: 'Học sinh chọn phương án và bắt đầu làm bài.',
    reversibility: 'HIGH',
    isActive: false
  },
  {
    level: 3,
    levelCode: 'L3_MICRO_ACTION',
    title: 'L3: Hành Động Nhỏ Ngoài Đời Thực (Micro-Action 5 phút)',
    intensityLabel: 'Cường độ 50%',
    durationMinutes: 5,
    description: 'Giao một việc nhỏ cụ thể có thể hoàn thành ngay: "Dọn sách vở môn Toán ra bàn, cất điện thoại vào ngăn kéo".',
    escalationCondition: 'Không hoàn thành hành động nhỏ sau 2 ngày liên tiếp.',
    deescalationCondition: 'Học sinh tích dấu hoàn thành và cảm nhận sự tiến bộ.',
    reversibility: 'HIGH',
    isActive: false
  },
  {
    level: 4,
    levelCode: 'L4_GUIDED_GAME',
    title: 'L4: Trò Chơi Mô Phỏng Có Hướng Dẫn (3 phút Game DSL)',
    intensityLabel: 'Cường độ 70%',
    durationMinutes: 3,
    description: 'Mời trải nghiệm kịch bản thử sai an toàn (Ví dụ: Game 48 phút cuối với Ma trận Eisenhower).',
    escalationCondition: 'Kỹ năng trong game không chuyển hóa được sang đời thực (Transfer Gap > 0.4).',
    deescalationCondition: 'Học sinh nắm vững cơ chế và tự nguyện thử lại.',
    reversibility: 'MEDIUM',
    isActive: false
  },
  {
    level: 5,
    levelCode: 'L5_PRACTICE',
    title: 'L5: Chuỗi Thực Hành Có Cấu Trúc (15 phút Mission)',
    intensityLabel: 'Cường độ 85%',
    durationMinutes: 15,
    description: 'Kế hoạch nhiệm vụ liên hoàn: Lập mục tiêu -> Chơi game -> Việc nhỏ -> Phản tư tuần.',
    escalationCondition: 'Xuất hiện dấu hiệu quá tải nhận thức kéo dài > 1 tuần.',
    deescalationCondition: 'Các chỉ số năng lực điều hành ổn định ở mức tự chủ.',
    reversibility: 'MEDIUM',
    isActive: false
  },
  {
    level: 6,
    levelCode: 'L6_HUMAN_SUPPORT',
    title: 'L6: Đề Xuất Hỗ Trợ Từ Thầy Cô / Cha Mẹ (Human-in-the-Loop)',
    intensityLabel: 'Cường độ 100%',
    durationMinutes: 20,
    description: 'Hệ thống gửi gợi ý nhẹ nhàng cho giáo viên hoặc phụ huynh: "Em Minh Đức có thể cần thầy cô hướng dẫn thêm phương pháp chia nhỏ bài tập tuần này".',
    escalationCondition: 'Chỉ kích hoạt khi có sự đồng thuận từ phía nhà trường/người giám hộ.',
    deescalationCondition: 'Thầy cô đã có buổi trao đổi động viên học sinh.',
    reversibility: 'LOW',
    isActive: false
  }
];

// V7.28 & V7.29: Self-Critique & Decision Robustness Record
export const DEFAULT_SELF_CRITIQUES: SelfCritiqueRecord[] = [
  {
    critiqueId: 'crit_01_mei_recommendation',
    proposedAction: 'Đề xuất can thiệp MEI L1 (Micro-Nudge chia nhỏ nhiệm vụ 10 phút) cho buổi học tối nay',
    assumptions: [
      'Giả định học sinh vẫn còn năng lượng làm việc sau giờ học chính khóa',
      'Giả định kết nối mạng ổn định để nhận thông điệp',
      'Giả định bài tập phân số Toán lớp 8 là nhiệm vụ quan trọng nhất hôm nay'
    ],
    counterEvidence: [
      'Thời gian đăng nhập muộn hơn thường lệ 35 phút (có thể do mệt mỏi thể chất)',
      'Học sinh chưa hoàn thành bữa tối theo thói quen sinh hoạt'
    ],
    unknowns: [
      'Chưa rõ khối lượng bài tập các môn khác (Văn, Anh) được giao trên lớp hôm nay',
      'Chưa có phản hồi từ phụ huynh về tình trạng sức khỏe'
    ],
    sensitivityFactors: [
      'Nếu thời gian tự học thực tế < 20 phút: Đề xuất sẽ trở nên quá tải',
      'Nếu học sinh đang đói: Khả năng tập trung sẽ suy giảm mạnh'
    ],
    robustnessScore: 0.88,
    robustnessStatus: 'ROBUST',
    riskIfWrong: 'Rủi ro thấp: Chỉ là cú hích nhẹ 10 giây, học sinh có toàn quyền bấm bỏ qua mà không bị phạt hay trừ điểm.',
    saferReversibleAlternative: 'Nếu học sinh bỏ qua cú hích, tự động lùi về L0 (Quan sát im lặng) và đề xuất nghỉ ngơi sớm.',
    evaluatedDate: '2026-09-14T07:30:00Z'
  }
];

// V7.20: Transfer Intelligence & Transfer Gap Metrics
export const DEFAULT_TRANSFER_METRICS: TransferGapMetric[] = [
  {
    metricId: 'trans_01_planning_prioritization',
    domain: 'Quản lý thời gian & Ưu tiên',
    construct: 'Prioritization',
    gameSuccessRate: 0.88,
    realWorldTransferRate: 0.52,
    transferGap: 0.36,
    transferStatus: 'MODERATE_TRANSFER',
    ecologicalValidityScore: 0.82,
    recommendation: 'Khoảng cách chuyển hóa ở mức trung bình (0.36). Cần bổ sung thêm các điểm tựa môi trường ngoài đời thực (Checklist thị giác 5 phút).'
  },
  {
    metricId: 'trans_02_persistence_grit',
    domain: 'Tính kiên trì & Vượt khó',
    construct: 'Persistence',
    gameSuccessRate: 0.82,
    realWorldTransferRate: 0.74,
    transferGap: 0.08,
    transferStatus: 'HIGH_TRANSFER',
    ecologicalValidityScore: 0.90,
    recommendation: 'Khoảng cách chuyển hóa rất hẹp (0.08). Tinh thần thử sai trong game đã lan tỏa thành công vào thái độ làm bài tập thực tế.'
  },
  {
    metricId: 'trans_03_self_regulation_phone',
    domain: 'Kiềm chế cám dỗ kỹ thuật số',
    construct: 'SelfRegulation',
    gameSuccessRate: 0.75,
    realWorldTransferRate: 0.38,
    transferGap: 0.37,
    transferStatus: 'TRANSFER_BARRIER',
    ecologicalValidityScore: 0.76,
    recommendation: 'Xuất hiện rào cản chuyển hóa: Trong game học sinh chọn từ chối tin nhắn rất dễ dàng, nhưng ngoài đời thực ma lực của thông báo điện thoại lớn hơn nhiều. Cần can thiệp cấu trúc môi trường (để điện thoại phòng khác).'
  }
];

// V7.47: Failure Memory & Meta-Adaptation Registry
export const DEFAULT_FAILURE_MEMORIES: FailureMemoryItem[] = [
  {
    memoryId: 'fail_01_long_reflection_after_fatigue',
    contextSummary: 'Học sinh vừa trải qua 45 phút làm bài tập áp lực cao và có 3 lần chuyển tab xao nhãng.',
    interventionAttempted: 'Hệ thống gửi câu hỏi phản tư chuyên sâu 5 câu hỏi dạng tự luận mở.',
    failureReason: 'Học sinh bấm thoát ngay lập tức (Bỏ cuộc phản tư) vì tải nhận thức lúc này đã quá cạn kiệt để viết chữ.',
    lessonLearned: 'Khi học sinh đang kiệt sức nhận thức, không bao giờ gửi phản tư dài. Chỉ dùng câu hỏi 1 chạm có/không hoặc đề xuất đứng dậy uống nước.',
    preventativeConstraint: 'Chặn vĩnh viễn việc kích hoạt form phản tư > 1 phút nếu chỉ số tải nhận thức > 0.70.',
    timestamp: '2026-09-10T21:15:00Z'
  },
  {
    memoryId: 'fail_02_forced_game_recommendation',
    contextSummary: 'Học sinh chuẩn bị đến giờ học thêm ngoại khóa (chỉ còn 15 phút rảnh).',
    interventionAttempted: 'Gợi ý chơi game mô phỏng 10 phút.',
    failureReason: 'Học sinh từ chối vì áp lực thời gian gấp rút tạo cảm giác lo lắng.',
    lessonLearned: 'Tôn trọng ngân sách thời gian thực tế. Khi thời gian rảnh < 15 phút, chỉ gợi ý việc nhỏ 2 phút hoặc nghỉ ngơi.',
    preventativeConstraint: 'Ràng buộc DSL: Thời lượng can thiệp tối đa = 1/3 quỹ thời gian rảnh được khai báo.',
    timestamp: '2026-09-08T17:40:00Z'
  }
];

// Master Spec V7.53: Toàn bộ 62 Bảng Dữ Liệu Chuẩn Hóa V7 (44 bảng V6 + 18 bảng V7 mới)
export const V7_CANONICAL_TABLES = [
  ...V6_CANONICAL_TABLES,
  // 18 Bảng dữ liệu chuẩn mới theo Master Spec V7.53
  { id: '45', name: '45_EVIDENCE', description: 'Đồ thị bằng chứng thực chứng đa nguồn và hệ số tin cậy' },
  { id: '46', name: '46_HYPOTHESES', description: 'Kho cạnh tranh đa giả thuyết H1..H6 và xác suất hậu nghiệm' },
  { id: '47', name: '47_HYPOTHESIS_EVIDENCE', description: 'Ma trận liên kết bằng chứng ủng hộ và phản biện giả thuyết' },
  { id: '48', name: '48_PROBLEMS', description: 'Phân loại rào cản học tập 2.0 (Problem Taxonomy V7)' },
  { id: '49', name: '49_PROBLEM_EVIDENCE', description: 'Bằng chứng thực tế xác lập vấn đề trước khi can thiệp' },
  { id: '50', name: '50_SIGNAL_DETECTIONS', description: 'Nhật ký phát hiện tín hiệu yếu (Weak Signals CUSUM/EWMA)' },
  { id: '51', name: '51_CONTRADICTIONS', description: 'Radar mâu thuẫn dữ liệu đa nguồn (Game vs Đời thực, Tự đánh giá vs Hành vi)' },
  { id: '52', name: '52_DECISION_EXPLANATIONS', description: 'Giải trình suy luận tại sao (WHY Engine L0..L4)' },
  { id: '53', name: '53_DECISION_ROBUSTNESS', description: 'Đánh giá độ bền vững quyết định và phân tích độ nhạy' },
  { id: '54', name: '54_TRANSFER_ANALYSIS', description: 'Đo lường độ hẹp chuyển hóa kỹ năng game sang đời thực' },
  { id: '55', name: '55_CONTEXT_SNAPSHOTS', description: 'Ảnh chụp bối cảnh học tập đa chiều không nhạy cảm' },
  { id: '56', name: '56_AI_CORRECTIONS', description: 'Nhật ký hiệu chỉnh của thầy cô và chuyên gia với AI' },
  { id: '57', name: '57_FAILURE_MEMORY', description: 'Bộ nhớ thất bại và bài học kinh nghiệm ngăn ngừa lặp lỗi' },
  { id: '58', name: '58_INTERVENTION_MATURITY', description: 'Cấp độ trưởng thành bằng chứng can thiệp (L0..L5)' },
  { id: '59', name: '59_GAME_MATURITY', description: 'Chỉ số hoàn thiện kịch bản giáo dục và tính giá trị sinh thái' },
  { id: '60', name: '60_OOD_ALERTS', description: 'Cảnh báo tình huống ngoài phân phối chuẩn (Out-of-Distribution)' },
  { id: '61', name: '61_RESEARCH_FINDINGS', description: 'Vòng đời phát hiện nghiên cứu khoa học được kiểm chứng' },
  { id: '62', name: '62_RESEARCH_HYPOTHESES', description: 'Kho giả thuyết nghiên cứu dài hạn phục vụ công bố' }
];
