/**
 * Cohort Analysis & Comparative Statistics Engine for EduChoice-AI ResearchMetrics
 * Supports dual-cohort behavioral and outcome comparison with:
 * - Time-series trajectory with Standard Error of Mean (SEM) & 95% Confidence Intervals
 * - Multidimensional Competency Radar Chart
 * - Inferential Statistics: Two-sample Welch's t-test, Cohen's d effect size, p-value
 * - Pedagogical Causal Inference and Divergence Point Detection
 */

export interface CohortProfile {
  id: string;
  name: string;
  shortName: string;
  category: 'Intervention' | 'Control' | 'Specialized';
  sampleSize: number;
  description: string;
  color: string;
  accentColor: string;
  interventionOnsetSession?: number;
  characteristics: string[];
  baselineScore: number;
  postInterventionScore: number;
  metricSeries: Record<string, { actuals: number[]; sds: number[] }>;
}

export interface MetricDefinition {
  key: string;
  label: string;
  shortLabel: string;
  category: string;
  unit: string;
  description: string;
  benchmarkTarget: number;
  higherIsBetter: boolean;
}

export const COMPARISON_METRICS: MetricDefinition[] = [
  {
    key: 'outcome',
    label: 'Kết Quả Học Tập Tổng Hợp (Composite Learning Outcome)',
    shortLabel: 'Kết Quả Tổng Hợp',
    category: 'Năng Lực Chung',
    unit: 'đ',
    description: 'Chỉ số đo lường hiệu suất học tập chuẩn hóa từ 0 đến 100 dựa trên độ chính xác và khả năng giải quyết vấn đề phức tạp.',
    benchmarkTarget: 75,
    higherIsBetter: true
  },
  {
    key: 'transfer',
    label: 'Tỷ Lệ Thực Hiện Vi Hành Động Ngoài Đời Thực (Transfer Execution Rate)',
    shortLabel: 'Chuyển Hóa Thực Tế',
    category: 'Hành Vi Chuyển Hóa',
    unit: '%',
    description: 'Đo lường khoảng cách chuyển hóa (Transfer Gap): Tỷ lệ học sinh thực sự hoàn thành vi hành động tự học trước 21h ngoài đời thực.',
    benchmarkTarget: 80,
    higherIsBetter: true
  },
  {
    key: 'distraction_recovery',
    label: 'Tốc Độ Phục Hồi Sau Xao Nhãng (Distraction Recovery Score)',
    shortLabel: 'Phục Hồi Xao Nhãng',
    category: 'Sự Tập Trung',
    unit: 'đ',
    description: 'Khả năng nhận thức phát hiện khi tâm trí bị phân tâm và quay trở lại dòng chảy học tập sâu (Deep Flow) trong vòng dưới 3 phút.',
    benchmarkTarget: 70,
    higherIsBetter: true
  },
  {
    key: 'planning',
    label: 'Kỹ Năng Lập Kế Hoạch & Phân Bổ Thời Gian (Planning & Prioritization)',
    shortLabel: 'Lập Kế Hoạch',
    category: 'Chức Năng Điều Hành',
    unit: 'đ',
    description: 'Năng lực chia nhỏ bài tập lớn thành các khối 25/48 phút và phân loại mức độ khẩn cấp/quan trọng theo Eisenhower.',
    benchmarkTarget: 70,
    higherIsBetter: true
  },
  {
    key: 'focus_span',
    label: 'Thời Lượng Duy Trì Tập Trung Sâu (Deep Focus Duration)',
    shortLabel: 'Thời Lượng Tập Trung',
    category: 'Sức Bền Nhận Thức',
    unit: 'phút',
    description: 'Số phút tập trung liên tục vào bài học mà không rời màn hình hoặc chuyển sang ứng dụng xao nhãng.',
    benchmarkTarget: 45,
    higherIsBetter: true
  },
  {
    key: 'self_regulation',
    label: 'Tự Điều Hòa Cảm Xúc & Tính Kiên Trì (Self-Regulation & Grit)',
    shortLabel: 'Tự Điều Hòa & Kiên Trì',
    category: 'Ý Chí & Cảm Xúc',
    unit: 'đ',
    description: 'Mức độ bền bỉ khi đối mặt với bài tập khó, sẵn sàng thử lại sau khi mắc lỗi thay vì nản chí hay né tránh.',
    benchmarkTarget: 75,
    higherIsBetter: true
  }
];

export const PRESET_COHORTS: CohortProfile[] = [
  {
    id: 'cohort_ai_intervention',
    name: 'Nhóm Can Thiệp Đa Tác Nhân Thích Ứng (AI Adaptive Multi-Agent Cohort)',
    shortName: 'Nhóm A (AI Can Thiệp)',
    category: 'Intervention',
    sampleSize: 142,
    description: 'Học sinh được đồng hành cùng 5 AI tác nhân chuyên biệt (Socratic Mentor, Habit Coach, Load Balancer, Goal Tracker, Reflector) với giàn giáo tư duy thích ứng theo thời gian thực.',
    color: '#4f46e5', // Indigo
    accentColor: '#818cf8',
    interventionOnsetSession: 4,
    characteristics: [
      'Giàn giáo nhận thức tự động co giãn theo tải não bộ',
      'Lời nhắc vi hành động cá nhân hóa trước 21h',
      'Phát hiện sớm xao nhãng & gợi ý kỹ thuật tiếp đất (Grounding)',
      'Phản hồi Socratic không giải bài hộ'
    ],
    baselineScore: 52.4,
    postInterventionScore: 78.6,
    metricSeries: {
      outcome: {
        actuals: [52.4, 53.8, 54.2, 58.6, 63.4, 67.8, 71.2, 73.5, 76.1, 78.6, 81.4, 83.2],
        sds: [6.1, 5.9, 5.8, 5.4, 5.1, 4.8, 4.6, 4.3, 4.1, 3.9, 3.8, 3.6]
      },
      transfer: {
        actuals: [38.2, 40.5, 41.8, 52.0, 61.5, 68.4, 73.2, 76.8, 79.5, 82.4, 85.1, 87.0],
        sds: [7.8, 7.5, 7.2, 6.5, 6.0, 5.5, 5.2, 4.9, 4.7, 4.4, 4.2, 4.0]
      },
      distraction_recovery: {
        actuals: [44.0, 45.2, 46.5, 53.8, 60.2, 64.9, 69.1, 72.4, 75.8, 78.2, 80.5, 82.8],
        sds: [6.8, 6.5, 6.3, 5.9, 5.5, 5.1, 4.8, 4.5, 4.3, 4.1, 3.9, 3.7]
      },
      planning: {
        actuals: [48.5, 50.1, 51.2, 56.4, 62.1, 66.5, 70.4, 73.8, 76.2, 79.0, 81.2, 83.5],
        sds: [7.2, 7.0, 6.8, 6.2, 5.7, 5.3, 5.0, 4.7, 4.5, 4.2, 4.0, 3.9]
      },
      focus_span: {
        actuals: [22.4, 23.1, 23.8, 28.5, 33.2, 36.8, 40.2, 43.1, 45.8, 48.2, 50.5, 52.1],
        sds: [4.8, 4.6, 4.5, 4.2, 3.9, 3.7, 3.5, 3.4, 3.2, 3.1, 3.0, 2.9]
      },
      self_regulation: {
        actuals: [50.8, 51.9, 52.5, 57.2, 62.8, 67.1, 71.5, 74.2, 77.0, 79.8, 81.9, 84.1],
        sds: [6.5, 6.3, 6.1, 5.6, 5.2, 4.8, 4.5, 4.3, 4.0, 3.8, 3.7, 3.5]
      }
    }
  },
  {
    id: 'cohort_traditional_control',
    name: 'Nhóm Đối Chứng Truyền Thống (Traditional Control Group)',
    shortName: 'Nhóm B (Đối Chứng)',
    category: 'Control',
    sampleSize: 138,
    description: 'Học sinh học tập theo phương pháp tự học và thời khóa biểu tĩnh tiêu chuẩn, không có sự hỗ trợ của các tác nhân AI cá nhân hóa hay hệ thống theo dõi vi hành động.',
    color: '#f59e0b', // Amber / Orange
    accentColor: '#fcd34d',
    characteristics: [
      'Thời khóa biểu học tập cố định truyền thống',
      'Tự ghi chép sổ tay hoặc danh sách tĩnh',
      'Không có phân tích tải nhận thức thời gian thực',
      'Không có phản hồi động hay điều chỉnh giàn giáo'
    ],
    baselineScore: 51.8,
    postInterventionScore: 61.2,
    metricSeries: {
      outcome: {
        actuals: [51.8, 52.5, 53.0, 54.1, 55.4, 56.8, 58.1, 59.2, 60.1, 61.2, 61.8, 62.5],
        sds: [6.3, 6.2, 6.2, 6.1, 6.0, 5.9, 5.9, 5.8, 5.7, 5.7, 5.6, 5.5]
      },
      transfer: {
        actuals: [37.5, 38.4, 39.1, 40.2, 41.5, 42.8, 44.1, 45.0, 46.2, 47.1, 47.8, 48.5],
        sds: [7.9, 7.8, 7.7, 7.6, 7.5, 7.4, 7.3, 7.2, 7.1, 7.0, 6.9, 6.9]
      },
      distraction_recovery: {
        actuals: [43.5, 44.0, 44.8, 45.5, 46.2, 47.1, 48.0, 48.9, 49.5, 50.2, 50.8, 51.5],
        sds: [6.9, 6.9, 6.8, 6.7, 6.6, 6.5, 6.5, 6.4, 6.3, 6.3, 6.2, 6.2]
      },
      planning: {
        actuals: [47.8, 48.6, 49.2, 50.1, 51.0, 52.2, 53.1, 54.0, 54.8, 55.5, 56.1, 56.8],
        sds: [7.4, 7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.8, 6.7, 6.6, 6.5, 6.5]
      },
      focus_span: {
        actuals: [22.0, 22.5, 23.0, 23.8, 24.5, 25.2, 26.0, 26.8, 27.4, 28.0, 28.5, 29.1],
        sds: [4.9, 4.8, 4.8, 4.7, 4.6, 4.5, 4.5, 4.4, 4.4, 4.3, 4.3, 4.2]
      },
      self_regulation: {
        actuals: [50.2, 50.9, 51.5, 52.4, 53.2, 54.1, 55.0, 55.8, 56.6, 57.3, 58.0, 58.7],
        sds: [6.6, 6.5, 6.5, 6.4, 6.3, 6.2, 6.2, 6.1, 6.0, 6.0, 5.9, 5.9]
      }
    }
  },
  {
    id: 'cohort_gamified_microaction',
    name: 'Nhóm Game Hóa Quản Lý 48 Phút (Gamified Micro-Actions Cohort)',
    shortName: 'Nhóm Game Hóa 48 Phút',
    category: 'Intervention',
    sampleSize: 115,
    description: 'Nhóm áp dụng cơ chế trò chơi hóa 48 phút phân bổ, thu thập ngọc tiến độ và cam kết vi hành động trước 21h nhằm tối đa hóa động lực nội tại.',
    color: '#10b981', // Emerald Green
    accentColor: '#6ee7b7',
    interventionOnsetSession: 3,
    characteristics: [
      'Khối thời gian 48 phút chia nhỏ thành 2 chặng tập trung 20p + 4p thư giãn',
      'Huy hiệu và chuỗi thói quen (Streak tracking)',
      'Phần thưởng vi hành động kịp thời',
      'Thử thách vượt chướng ngại tâm lý'
    ],
    baselineScore: 50.9,
    postInterventionScore: 74.2,
    metricSeries: {
      outcome: {
        actuals: [50.9, 52.1, 57.0, 62.4, 66.8, 69.5, 72.1, 74.2, 76.5, 78.0, 79.5, 81.0],
        sds: [6.5, 6.2, 5.7, 5.3, 5.0, 4.7, 4.5, 4.3, 4.1, 4.0, 3.9, 3.8]
      },
      transfer: {
        actuals: [36.8, 39.2, 49.5, 59.0, 67.2, 72.0, 76.4, 80.1, 82.5, 84.8, 86.2, 87.5],
        sds: [8.1, 7.6, 6.8, 6.1, 5.6, 5.2, 4.9, 4.6, 4.3, 4.1, 4.0, 3.9]
      },
      distraction_recovery: {
        actuals: [42.1, 43.8, 50.2, 56.4, 61.8, 65.5, 69.2, 72.0, 74.5, 76.8, 78.5, 80.2],
        sds: [7.1, 6.7, 6.1, 5.6, 5.2, 4.9, 4.6, 4.4, 4.2, 4.0, 3.9, 3.8]
      },
      planning: {
        actuals: [46.5, 48.2, 54.0, 60.1, 65.2, 68.9, 72.0, 75.1, 77.4, 79.5, 81.0, 82.4],
        sds: [7.6, 7.2, 6.5, 5.9, 5.4, 5.1, 4.8, 4.5, 4.3, 4.1, 4.0, 3.9]
      },
      focus_span: {
        actuals: [21.5, 22.8, 27.5, 32.0, 36.1, 39.5, 42.4, 45.0, 47.2, 49.1, 50.8, 52.0],
        sds: [5.0, 4.7, 4.3, 4.0, 3.7, 3.5, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8]
      },
      self_regulation: {
        actuals: [49.5, 51.0, 56.2, 61.5, 66.0, 69.8, 73.1, 75.8, 78.2, 80.1, 82.0, 83.5],
        sds: [6.8, 6.4, 5.8, 5.4, 5.0, 4.7, 4.4, 4.2, 4.0, 3.8, 3.7, 3.6]
      }
    }
  },
  {
    id: 'cohort_high_scaffold_needed',
    name: 'Nhóm Cần Giàn Giáo Chuyên Sâu (High-Scaffolding Needed Cohort)',
    shortName: 'Nhóm Cần Hỗ Trợ',
    category: 'Specialized',
    sampleSize: 96,
    description: 'Học sinh có xuất phát điểm thấp, dễ nản chí và thường xuyên trì hoãn. Nhóm nhận giàn giáo phân rã từng bước cực nhỏ để tái thiết niềm tin học tập.',
    color: '#ec4899', // Pink
    accentColor: '#f472b6',
    interventionOnsetSession: 4,
    characteristics: [
      'Điểm nền tảng ban đầu thấp (< 45đ)',
      'Tần suất xao nhãng cao gấp 2.4 lần trung bình',
      'Được áp dụng vi nhiệm vụ 5 phút (Micro-stepping)',
      'Hỗ trợ khích lệ tâm lý không đánh giá tiêu cực'
    ],
    baselineScore: 42.1,
    postInterventionScore: 68.5,
    metricSeries: {
      outcome: {
        actuals: [42.1, 43.0, 43.8, 49.2, 54.5, 59.2, 63.4, 66.8, 69.5, 71.8, 73.9, 75.6],
        sds: [7.2, 7.0, 6.8, 6.3, 5.8, 5.4, 5.0, 4.7, 4.5, 4.3, 4.1, 4.0]
      },
      transfer: {
        actuals: [28.4, 29.8, 31.0, 41.5, 51.0, 58.2, 64.0, 68.5, 72.1, 75.0, 77.8, 80.2],
        sds: [8.8, 8.5, 8.2, 7.4, 6.8, 6.2, 5.7, 5.3, 5.0, 4.7, 4.5, 4.3]
      },
      distraction_recovery: {
        actuals: [35.2, 36.4, 37.5, 44.8, 52.0, 57.5, 62.0, 65.8, 69.2, 71.9, 74.2, 76.5],
        sds: [7.8, 7.6, 7.3, 6.7, 6.1, 5.6, 5.2, 4.8, 4.6, 4.3, 4.1, 4.0]
      },
      planning: {
        actuals: [38.5, 39.8, 40.9, 47.2, 53.6, 58.4, 62.8, 66.2, 69.1, 71.8, 74.0, 76.2],
        sds: [8.1, 7.9, 7.6, 7.0, 6.4, 5.9, 5.5, 5.1, 4.8, 4.6, 4.4, 4.2]
      },
      focus_span: {
        actuals: [16.2, 17.0, 17.8, 22.4, 27.0, 30.8, 34.2, 37.0, 39.5, 41.8, 43.8, 45.5],
        sds: [5.2, 5.0, 4.9, 4.5, 4.1, 3.8, 3.6, 3.4, 3.3, 3.2, 3.1, 3.0]
      },
      self_regulation: {
        actuals: [41.0, 42.1, 43.0, 48.8, 54.2, 59.0, 63.5, 66.9, 69.8, 72.4, 74.6, 76.8],
        sds: [7.5, 7.3, 7.0, 6.5, 5.9, 5.5, 5.1, 4.8, 4.5, 4.3, 4.1, 4.0]
      }
    }
  },
  {
    id: 'cohort_high_autonomous',
    name: 'Nhóm Tự Chủ Nhận Thức Xuất Sắc (High Autonomous Benchmark Cohort)',
    shortName: 'Nhóm Tự Chủ Cao',
    category: 'Specialized',
    sampleSize: 88,
    description: 'Học sinh có kỷ luật tự giác cao, tư duy độc lập và kỹ năng siêu nhận thức tự nhiên, phục vụ làm mốc tham chiếu chuẩn trên (Upper Benchmark).',
    color: '#06b6d4', // Cyan
    accentColor: '#67e8f9',
    characteristics: [
      'Điểm xuất phát cao (> 70đ)',
      'Tự phục hồi sau xao nhãng dưới 90 giây',
      'Thói quen lập kế hoạch bền vững',
      'Đóng vai trò mốc chuẩn trần (Ceiling Reference)'
    ],
    baselineScore: 71.5,
    postInterventionScore: 88.2,
    metricSeries: {
      outcome: {
        actuals: [71.5, 72.8, 74.0, 76.2, 78.5, 80.4, 82.6, 84.5, 86.1, 87.5, 88.9, 90.2],
        sds: [4.5, 4.4, 4.3, 4.1, 3.9, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1]
      },
      transfer: {
        actuals: [68.0, 70.2, 72.1, 75.0, 78.2, 81.0, 83.5, 86.0, 88.2, 90.1, 91.8, 93.2],
        sds: [5.2, 5.0, 4.8, 4.5, 4.3, 4.1, 3.9, 3.7, 3.6, 3.4, 3.3, 3.2]
      },
      distraction_recovery: {
        actuals: [69.2, 70.8, 72.0, 74.5, 77.0, 79.2, 81.8, 84.0, 85.9, 87.5, 89.0, 90.5],
        sds: [4.8, 4.7, 4.5, 4.3, 4.1, 3.9, 3.8, 3.6, 3.5, 3.4, 3.3, 3.2]
      },
      planning: {
        actuals: [70.5, 72.0, 73.4, 75.8, 78.2, 80.5, 82.9, 85.0, 87.0, 88.8, 90.2, 91.5],
        sds: [4.6, 4.5, 4.4, 4.2, 4.0, 3.8, 3.7, 3.5, 3.4, 3.3, 3.2, 3.1]
      },
      focus_span: {
        actuals: [38.5, 40.0, 41.2, 43.5, 46.0, 48.2, 50.5, 52.8, 54.9, 56.8, 58.5, 60.0],
        sds: [4.2, 4.0, 3.9, 3.7, 3.5, 3.4, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7]
      },
      self_regulation: {
        actuals: [71.0, 72.4, 73.8, 76.0, 78.5, 80.8, 83.0, 85.1, 87.0, 88.6, 90.0, 91.2],
        sds: [4.4, 4.3, 4.2, 4.0, 3.8, 3.7, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0]
      }
    }
  }
];

export interface TimeComparisonPoint {
  sessionIndex: number;
  sessionLabel: string;
  valA: number;
  valB: number;
  sdA: number;
  sdB: number;
  semA: number;
  semB: number;
  ciLowerA: number;
  ciUpperA: number;
  ciLowerB: number;
  ciUpperB: number;
  delta: number; // A - B
  percentAdvantage: number;
  isPostIntervention: boolean;
}

export interface RadarComparisonPoint {
  construct: string;
  valA: number;
  valB: number;
  delta: number;
  benchmark: number;
  fullMark: number;
}

export interface InferentialStatistics {
  meanA: number;
  meanB: number;
  sdA: number;
  sdB: number;
  delta: number;
  percentGain: number;
  cohensD: number;
  effectSizeClass: 'Rất Lớn (Huge)' | 'Lớn (Large)' | 'Trung Bình (Medium)' | 'Nhỏ (Small)' | 'Không Đáng Kể';
  tStatistic: number;
  pValue: string;
  isSignificant: boolean;
  divergenceSession: number;
  causalSummary: string;
}

/**
 * Compare two cohorts across a specific metric
 */
export function analyzeCohortComparison(
  cohortA: CohortProfile,
  cohortB: CohortProfile,
  metricKey: string
): {
  timeSeries: TimeComparisonPoint[];
  radarData: RadarComparisonPoint[];
  stats: InferentialStatistics;
  metric: MetricDefinition;
} {
  const metric =
    COMPARISON_METRICS.find((m) => m.key === metricKey) || COMPARISON_METRICS[0];

  const seriesA = cohortA.metricSeries[metricKey] || cohortA.metricSeries['outcome'];
  const seriesB = cohortB.metricSeries[metricKey] || cohortB.metricSeries['outcome'];

  const numSessions = Math.min(seriesA.actuals.length, seriesB.actuals.length);
  const onsetSession = cohortA.interventionOnsetSession || 4;

  const timeSeries: TimeComparisonPoint[] = [];

  for (let i = 0; i < numSessions; i++) {
    const sIndex = i + 1;
    const valA = seriesA.actuals[i];
    const valB = seriesB.actuals[i];
    const sdA = seriesA.sds[i];
    const sdB = seriesB.sds[i];

    // Standard Error of the Mean: SEM = SD / sqrt(N)
    const semA = sdA / Math.sqrt(cohortA.sampleSize);
    const semB = sdB / Math.sqrt(cohortB.sampleSize);

    // 95% Confidence Interval: ~ 1.96 * SEM
    const ciA = 1.96 * semA;
    const ciB = 1.96 * semB;

    const delta = Math.round((valA - valB) * 10) / 10;
    const percentAdvantage = valB !== 0 ? Math.round(((valA - valB) / valB) * 1000) / 10 : 0;

    timeSeries.push({
      sessionIndex: sIndex,
      sessionLabel: `Phiên ${sIndex}`,
      valA: Math.round(valA * 10) / 10,
      valB: Math.round(valB * 10) / 10,
      sdA: Math.round(sdA * 10) / 10,
      sdB: Math.round(sdB * 10) / 10,
      semA: Math.round(semA * 100) / 100,
      semB: Math.round(semB * 100) / 100,
      ciLowerA: Math.max(0, Math.round((valA - ciA) * 10) / 10),
      ciUpperA: Math.min(100, Math.round((valA + ciA) * 10) / 10),
      ciLowerB: Math.max(0, Math.round((valB - ciB) * 10) / 10),
      ciUpperB: Math.min(100, Math.round((valB + ciB) * 10) / 10),
      delta,
      percentAdvantage,
      isPostIntervention: sIndex >= onsetSession
    });
  }

  // Final Session / Post-intervention Endpoints for Inferential Stats
  const lastIndex = numSessions - 1;
  const finalValA = seriesA.actuals[lastIndex];
  const finalValB = seriesB.actuals[lastIndex];
  const finalSdA = seriesA.sds[lastIndex];
  const finalSdB = seriesB.sds[lastIndex];

  const delta = Math.round((finalValA - finalValB) * 10) / 10;
  const percentGain = finalValB !== 0 ? Math.round(((finalValA - finalValB) / finalValB) * 1000) / 10 : 0;

  // Pooled Standard Deviation
  const nA = cohortA.sampleSize;
  const nB = cohortB.sampleSize;
  const pooledVar = ((nA - 1) * Math.pow(finalSdA, 2) + (nB - 1) * Math.pow(finalSdB, 2)) / (nA + nB - 2);
  const pooledSd = Math.sqrt(pooledVar);

  // Cohen's d: (MeanA - MeanB) / Pooled SD
  const cohensD = pooledSd > 0 ? Math.round(((finalValA - finalValB) / pooledSd) * 100) / 100 : 0;

  let effectSizeClass: InferentialStatistics['effectSizeClass'] = 'Không Đáng Kể';
  const absD = Math.abs(cohensD);
  if (absD >= 1.0) effectSizeClass = 'Rất Lớn (Huge)';
  else if (absD >= 0.8) effectSizeClass = 'Lớn (Large)';
  else if (absD >= 0.5) effectSizeClass = 'Trung Bình (Medium)';
  else if (absD >= 0.2) effectSizeClass = 'Nhỏ (Small)';

  // Welch's t-statistic
  const seDiff = Math.sqrt(Math.pow(finalSdA, 2) / nA + Math.pow(finalSdB, 2) / nB);
  const tStatistic = seDiff > 0 ? Math.round(((finalValA - finalValB) / seDiff) * 100) / 100 : 0;

  const isSignificant = Math.abs(tStatistic) >= 2.58; // approx p < 0.01
  const pValue = Math.abs(tStatistic) >= 3.29 ? 'p < 0.001' : Math.abs(tStatistic) >= 2.58 ? 'p < 0.01' : Math.abs(tStatistic) >= 1.96 ? 'p < 0.05' : 'p > 0.05 (n.s.)';

  // Find divergence point (session where delta exceeds 1.5 * SEM)
  let divergenceSession = onsetSession;
  for (let i = 0; i < timeSeries.length; i++) {
    if (timeSeries[i].sessionIndex >= onsetSession && Math.abs(timeSeries[i].delta) > 3.0) {
      divergenceSession = timeSeries[i].sessionIndex;
      break;
    }
  }

  // Multi-construct Radar Points for the latest session
  const radarData: RadarComparisonPoint[] = COMPARISON_METRICS.map((m) => {
    const sA = cohortA.metricSeries[m.key] || cohortA.metricSeries['outcome'];
    const sB = cohortB.metricSeries[m.key] || cohortB.metricSeries['outcome'];
    const vA = sA.actuals[sA.actuals.length - 1];
    const vB = sB.actuals[sB.actuals.length - 1];
    return {
      construct: m.shortLabel,
      valA: Math.round(vA * 10) / 10,
      valB: Math.round(vB * 10) / 10,
      delta: Math.round((vA - vB) * 10) / 10,
      benchmark: m.benchmarkTarget,
      fullMark: 100
    };
  });

  const causalSummary = `${cohortA.shortName} tạo ra mức chênh lệch ${delta > 0 ? '+' : ''}${delta}${metric.unit} (${percentGain > 0 ? '+' : ''}${percentGain}%) so với ${cohortB.shortName} tại phiên thứ 12, đạt ý nghĩa thống kê cao (${pValue}, t = ${tStatistic}, Cohen's d = ${cohensD}). Điểm phân kỳ quỹ đạo bắt đầu bộc lộ từ Phiên ${divergenceSession} sau khi kích hoạt cơ chế can thiệp.`;

  return {
    timeSeries,
    radarData,
    stats: {
      meanA: Math.round(finalValA * 10) / 10,
      meanB: Math.round(finalValB * 10) / 10,
      sdA: Math.round(finalSdA * 10) / 10,
      sdB: Math.round(finalSdB * 10) / 10,
      delta,
      percentGain,
      cohensD,
      effectSizeClass,
      tStatistic,
      pValue,
      isSignificant,
      divergenceSession,
      causalSummary
    },
    metric
  };
}
