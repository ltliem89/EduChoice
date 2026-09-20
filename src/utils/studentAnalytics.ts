import {
  BehaviorEvent,
  BehaviorEventType,
  ConstructName,
  GoalItem,
  LifeBalanceArea,
  StudentModel
} from '../types';

export interface HourBin {
  hour: string;
  count: number;
}

export interface LearningPattern {
  sessionCount: number;
  activeDayCount: number;
  avgSessionSeconds: number;
  peakHourLabel: string;
  peakHourCount: number;
  hourHistogram: HourBin[];
  busyPeriodLabel: string;
}

export interface ResilienceProfile {
  retryCount: number;
  strategyChangeCount: number;
  helpRequestCount: number;
  hintRequestCount: number;
  completedCount: number;
  abandonedCount: number;
  reflectionCount: number;
  completionRate: number;
}

export interface LifeBalanceProfile {
  index: number;
  status: 'balanced' | 'watch' | 'imbalanced';
  overDomains: string[];
  underDomains: string[];
}

export type WellnessLevel = 'green' | 'yellow' | 'red';

export interface WellnessProfile {
  level: WellnessLevel;
  label: string;
  message: string;
  reasons: string[];
}

export interface ConstructTrendPoint {
  construct: ConstructName;
  nameVi: string;
  before: number;
  now: number;
  delta: number;
}

export interface InsightItem {
  id: string;
  category: 'learning' | 'life' | 'resilience' | 'wellness';
  title: string;
  detail: string;
}

export const CONSTRUCT_LABELS: Record<ConstructName, string> = {
  Planning: 'Lập kế hoạch',
  Prioritization: 'Sắp xếp ưu tiên',
  ProblemSolving: 'Giải quyết vấn đề',
  SelfRegulation: 'Điều hòa cảm xúc',
  AttentionControl: 'Kiểm soát tập trung',
  HelpSeeking: 'Tìm trợ giúp',
  Reflection: 'Phản tư',
  Adaptability: 'Thích ứng',
  GoalSetting: 'Đặt mục tiêu',
  Communication: 'Giao tiếp',
  ConsequencePrediction: 'Dự đoán hậu quả',
  Persistence: 'Kiên trì',
  Autonomy: 'Tự chủ',
  TimeManagement: 'Quản lý thời gian',
  DistractionRecovery: 'Phục hồi sau phân tâm',
  Cooperation: 'Hợp tác',
  Empathy: 'Thấu cảm',
  Responsibility: 'Trách nhiệm',
  HealthyRoutine: 'Thói quen lành mạnh',
  Balance: 'Cân bằng'
};

const EVENT_LABELS: Partial<Record<BehaviorEventType, string>> = {
  game_started: 'Bắt đầu',
  scene_viewed: 'Xem kịch bản',
  choice_made: 'Chọn phương án',
  choice_changed: 'Đổi chiến lược',
  hint_requested: 'Xin gợi ý',
  help_requested: 'Nhờ trợ giúp',
  pause: 'Tạm dừng',
  resumed: 'Tiếp tục',
  abandoned: 'Bỏ ngang',
  completed: 'Hoàn thành',
  retry: 'Thử lại',
  reflection_submitted: 'Viết phản tư',
  micro_action_offered: 'Đề xuất việc nhỏ',
  micro_action_accepted: 'Nhận việc nhỏ',
  micro_action_started: 'Bắt đầu việc nhỏ',
  micro_action_completed: 'Xong việc nhỏ',
  goal_created: 'Tạo mục tiêu',
  goal_updated: 'Cập nhật mục tiêu'
};

export const eventLabel = (type: BehaviorEventType): string => EVENT_LABELS[type] || type;

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

const DAY_MS = 24 * 3600 * 1000;

const toDay = (ts: number) => new Date(ts).toISOString().slice(0, 10);

const periodOf = (hour: number): string => {
  if (hour >= 5 && hour < 12) return 'buổi sáng';
  if (hour >= 12 && hour < 18) return 'buổi chiều';
  if (hour >= 18 && hour < 23) return 'buổi tối';
  return 'đêm khuya';
};

export function buildHourHistogram(events: BehaviorEvent[]): HourBin[] {
  const counts = new Array<number>(24).fill(0);
  for (const e of events) {
    if (e.type !== 'game_started' && e.type !== 'completed') continue;
    const h = new Date(e.timestamp).getHours();
    counts[h] += 1;
  }
  const bins: HourBin[] = [];
  for (let i = 0; i < 24; i++) {
    if (counts[i] > 0) {
      bins.push({ hour: `${String(i).padStart(2, '0')}-${String((i + 1) % 24).padStart(2, '0')}h`, count: counts[i] });
    }
  }
  return bins;
}

export function analyzeLearningPattern(events: BehaviorEvent[]): LearningPattern {
  const starts = events.filter((e) => e.type === 'game_started').sort((a, b) => a.timestamp - b.timestamp);
  const completions = events.filter((e) => e.type === 'completed');
  const sessionCount = starts.length;
  const activeDayCount = new Set(starts.map((e) => toDay(e.timestamp))).size;

  let totalSeconds = 0;
  let durationSamples = 0;
  for (const start of starts) {
    const end = completions.find((c) => c.sessionId === start.sessionId && c.timestamp >= start.timestamp);
    if (end) {
      totalSeconds += Math.max(1, (end.timestamp - start.timestamp) / 1000);
      durationSamples += 1;
    }
  }

  const histogram = buildHourHistogram(events);
  let peakHourLabel = 'chưa đủ dữ liệu';
  let peakHourCount = 0;
  let peakHour = 12;
  for (const bin of histogram) {
    const hour = parseInt(bin.hour.slice(0, 2), 10);
    if (bin.count > peakHourCount) {
      peakHourCount = bin.count;
      peakHourLabel = bin.hour;
      peakHour = hour;
    }
  }

  return {
    sessionCount,
    activeDayCount,
    avgSessionSeconds: durationSamples > 0 ? Math.round(totalSeconds / durationSamples) : 0,
    peakHourLabel,
    peakHourCount,
    hourHistogram: histogram,
    busyPeriodLabel: peakHourCount > 0 ? periodOf(peakHour) : 'chưa đủ dữ liệu'
  };
}

export function analyzeResilience(events: BehaviorEvent[]): ResilienceProfile {
  const count = (type: BehaviorEventType) => events.filter((e) => e.type === type).length;
  const completedCount = count('completed');
  const abandonedCount = count('abandoned');
  const done = completedCount + abandonedCount;
  return {
    retryCount: count('retry'),
    strategyChangeCount: count('choice_changed'),
    helpRequestCount: count('help_requested'),
    hintRequestCount: count('hint_requested'),
    completedCount,
    abandonedCount,
    reflectionCount: count('reflection_submitted'),
    completionRate: done > 0 ? completedCount / done : 0
  };
}

export function analyzeLifeBalance(lifeBalance: LifeBalanceArea[]): LifeBalanceProfile {
  if (!lifeBalance || lifeBalance.length === 0) {
    return { index: 100, status: 'balanced', overDomains: [], underDomains: [] };
  }
  let totalDeviation = 0;
  const overDomains: string[] = [];
  const underDomains: string[] = [];
  for (const d of lifeBalance) {
    const target = Math.max(0.5, d.targetHours);
    const deviation = Math.abs(d.actualHours - d.targetHours) / target;
    totalDeviation += deviation;
    if (d.actualHours > d.targetHours + 0.5) overDomains.push(d.name);
    else if (d.actualHours < d.targetHours - 0.5) underDomains.push(d.name);
  }
  const meanDeviation = totalDeviation / lifeBalance.length;
  const index = clamp(Math.round(100 - meanDeviation * 100), 0, 100);
  const status: LifeBalanceProfile['status'] = index >= 80 ? 'balanced' : index >= 60 ? 'watch' : 'imbalanced';
  return { index, status, overDomains, underDomains };
}

export function computeWellness(events: BehaviorEvent[], hoursBack = 48): WellnessProfile {
  const cutoff = Date.now() - hoursBack * 3600 * 1000;
  const recent = events.filter((e) => e.timestamp >= cutoff);
  const abandonedCount = recent.filter((e) => e.type === 'abandoned').length;
  const completedCount = recent.filter((e) => e.type === 'completed').length;
  const retryCount = recent.filter((e) => e.type === 'retry').length;
  const reflectionCount = recent.filter((e) => e.type === 'reflection_submitted').length;
  const anyActivityToday = recent.some((e) => e.type === 'game_started');

  const reasons: string[] = [];
  let level: WellnessLevel = 'green';

  if (abandonedCount >= 3 || (abandonedCount >= 2 && completedCount === 0)) {
    level = 'red';
    reasons.push(`${abandonedCount} lần bỏ ngang thử thách trong ${hoursBack}h gần đây`);
  } else if (abandonedCount >= 1 || retryCount >= 5) {
    level = 'yellow';
    if (abandonedCount >= 1) reasons.push(`${abandonedCount} lần bỏ ngang gần đây`);
    if (retryCount >= 5) reasons.push('thử lại nhiều lần — dấu hiệu em đang rất nỗ lực');
  }

  if (!anyActivityToday) {
    reasons.push('hôm nay em chưa có hoạt động nào');
  }
  if (reflectionCount === 0 && anyActivityToday) {
    reasons.push('em chưa viết phản tư trong thời gian gần đây');
  }

  if (level === 'red') {
    return {
      level,
      label: 'Cần được quan tâm',
      message: 'Vừa qua có khá nhiều dấu hiệu mệt mỏi. Em hãy dành chút thời gian nghỉ ngơi, nói chuyện với bố mẹ hoặc thầy cô, và nhớ rằng được nhờ giúp đỡ là một việc thông minh.',
      reasons
    };
  }
  if (level === 'yellow') {
    return {
      level,
      label: 'Nên nghỉ ngơi thêm',
      message: 'Em đang có những tín hiệu căng thẳng nhẹ. Thử hít thở 4-4-4 vài lần, hoặc chọn một thử thách nhẹ nhàng để thư giãn trước khi tiếp tục.',
      reasons
    };
  }
  return {
    level,
    label: 'Tinh thần ổn định',
    message: 'Trạng thái gần đây của em khá ổn định. Hãy giữ nhịp đều đặn và vui vẻ tiếp tục hành trình của mình.',
    reasons: ['không phát hiện dấu hiệu căng thẳng bất thường']
  };
}

export function buildGrowthProfile(studentModel: StudentModel, limit = 8): ConstructTrendPoint[] {
  const all: ConstructName[] = Object.keys(CONSTRUCT_LABELS) as ConstructName[];
  const history = Array.isArray(studentModel.growthHistory) ? studentModel.growthHistory : [];
  return all
    .map((construct) => {
      const points = history.filter((h) => h.construct === construct);
      const before = points.length > 0 ? points[0].score : studentModel.constructs[construct] || 50;
      const now = studentModel.constructs[construct] || 50;
      return {
        construct,
        nameVi: CONSTRUCT_LABELS[construct],
        before,
        now,
        delta: Number((now - before).toFixed(1))
      };
    })
    .sort((a, b) => b.now - a.now)
    .slice(0, limit);
}

export function generateInsights(inputs: {
  learning: LearningPattern;
  resilience: ResilienceProfile;
  lifeBalance: LifeBalanceProfile;
  wellness: WellnessProfile;
  goals: GoalItem[];
  growth: ConstructTrendPoint[];
}): InsightItem[] {
  const { learning, resilience, lifeBalance, wellness, goals, growth } = inputs;
  const insights: InsightItem[] = [];

  if (learning.sessionCount === 0) {
    insights.push({
      id: 'ins_no_data',
      category: 'learning',
      title: 'Cùng nhau bắt đầu nhé!',
      detail: 'Em chưa có dữ liệu luyện tập nào. Hãy vào tab "Thử Thách Tình Huống" chơi một thử thách ngắn — ngay sau đó em sẽ nhìn thấy nhịp học và những điểm mạnh của mình.'
    });
    return insights;
  }

  if (learning.peakHourCount > 0) {
    insights.push({
      id: 'ins_peak',
      category: 'learning',
      title: `Nhịp học đỉnh cao của em: ${learning.busyPeriodLabel}${learning.peakHourCount > 0 ? ` (${learning.peakHourLabel})` : ''}`,
      detail: `Em tập trung tốt nhất quanh khoảng ${learning.peakHourLabel} với ${learning.peakHourCount} lượt thử thách. Hãy ưu tiên xếp những việc khó nhất vào khung giờ này.`
    });
  }

  if (learning.avgSessionSeconds > 0) {
    const minutes = Math.max(1, Math.round(learning.avgSessionSeconds / 60));
    insights.push({
      id: 'ins_duration',
      category: 'learning',
      title: `Trung bình mỗi phiên ${minutes} phút`,
      detail:
        minutes < 3
          ? 'Các phiên của em hơi ngắn. Kéo dài thêm vài phút để kịp rèn hết kỹ năng của thử thách nhé.'
          : 'Độ dài phiên vừa phải — vừa đủ để luyện kỹ năng mà không bị mệt. Giữ vững nhé!'
    });
  }

  const sortedByDelta = [...growth].sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const growthMover = sortedByDelta[0];
  if (growthMover && growthMover.delta !== 0) {
    insights.push({
      id: 'ins_growth',
      category: 'learning',
      title: `${growthMover.nameVi} đang tiến bộ ${growthMover.delta > 0 ? '+' : ''}${growthMover.delta} điểm`,
      detail: `Kỹ năng ${growthMover.nameVi} của em có thay đổi đáng chú ý nhất. Hãy chọn thử thách có nhãn kỹ năng này để củng cố thêm.`
    });
  } else if (growthMover) {
    insights.push({
      id: 'ins_growth_steady',
      category: 'learning',
      title: 'Nền tảng kỹ năng ổn định',
      detail: 'Điểm kỹ năng của em hiện khá đều. Càng chơi nhiều thử thách, hệ thống càng nhìn rõ hơn sự tiến bộ của em.'
    });
  }

  if (resilience.retryCount + resilience.strategyChangeCount + resilience.helpRequestCount + resilience.hintRequestCount > 0) {
    insights.push({
      id: 'ins_resilience',
      category: 'resilience',
      title: 'Em biết cách đứng dậy sau khó khăn',
      detail:
        resilience.retryCount > 0 || resilience.strategyChangeCount > 0
          ? `Em đã thử lại ${resilience.retryCount} lần và chủ động đổi cách làm ${resilience.strategyChangeCount} lần — đây chính là tinh thần kiên trì và linh hoạt rất quý.`
          : 'Mỗi lần gặp tình huống khó, em đều tìm cách hỏi han hoặc xin gợi ý. Cách làm đó rất thông minh.'
    });
  }

  if (resilience.helpRequestCount + resilience.hintRequestCount === 0 && learning.sessionCount >= 2) {
    insights.push({
      id: 'ins_help',
      category: 'resilience',
      title: 'Thử mạnh dạn nhờ giúp đỡ',
      detail: 'Em chưa dùng nút trợ giúp lần nào. Khi thực sự bí, nhờ gợi ý không phải là điều xấu — nó giúp em học nhanh hơn nhiều.'
    });
  }

  if (lifeBalance.status !== 'balanced') {
    const tips: string[] = [];
    if (lifeBalance.overDomains.length > 0) tips.push(`${lifeBalance.overDomains[0]} nhiều hơn mục tiêu`);
    if (lifeBalance.underDomains.length > 0) tips.push(`${lifeBalance.underDomains[0]} ít hơn mục tiêu`);
    insights.push({
      id: 'ins_balance',
      category: 'life',
      title: `Thời gian biểu lệch nhịp (${lifeBalance.index}/100)`,
      detail: `Cân bằng cuộc sống đang cần điều chỉnh chút: ${tips.join('; ')}. Cân đối lại ${lifeBalance.underDomains[0] || 'thời gian nghỉ ngơi'} mỗi ngày sẽ giúp em học tốt hơn.`
    });
  } else {
    insights.push({
      id: 'ins_balance_ok',
      category: 'life',
      title: `Nhịp sống cân bằng tốt (${lifeBalance.index}/100)`,
      detail: 'Các quỹ thời gian Học – Ngủ – Chơi – Gia đình của em đang khá hài hòa. Hãy giữ vững lịch đều đặn này.'
    });
  }

  const activeGoals = goals.filter((g) => g.status === 'active');
  if (activeGoals.length > 0) {
    const first = activeGoals[0];
    const pct = Math.min(100, Math.round((first.current / Math.max(1, first.target)) * 100));
    insights.push({
      id: 'ins_goal',
      category: 'resilience',
      title: `Mục tiêu "${first.title}" đạt ${pct}%`,
      detail: `Em đang đi đúng hướng: ${first.current}/${first.target} ${first.unit}. Thực hiện thêm một việc nhỏ hôm nay là có thể chạm mục tiêu.`
    });
  }

  insights.push({
    id: 'ins_wellness',
    category: 'wellness',
    title: `Trạng thái: ${wellness.label}`,
    detail: wellness.message
  });

  return insights.slice(0, 7);
}

function toCSV(rows: (string | number)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const s = String(cell ?? '');
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(',')
    )
    .join('\r\n');
}

export function downloadCSV(fileName: string, csv: string): void {
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function buildStudentCSV(
  studentModel: StudentModel,
  events: BehaviorEvent[],
  lifeBalance: LifeBalanceArea[],
  goals: GoalItem[]
): string {
  const rows: (string | number)[][] = [];
  rows.push(['EDUCHOICE-AI V3 — DỮ LIỆU CỦA EM'], []);
  rows.push(['HỒ SƠ'], ['Mã học sinh', studentModel.userId], ['Tên', studentModel.name || ''], ['Lớp', studentModel.gradeLevel], ['Số phiên đã hoàn thành', studentModel.sessionsCompleted], ['Hoạt động gần nhất', studentModel.lastActive], []);
  rows.push(['KỸ NĂNG'], ['Kỹ năng', 'Điểm (0-100)', 'Độ tin cậy', 'Số lần ghi nhận', 'Xu hướng']);
  for (const [key, value] of Object.entries(studentModel.constructs)) {
    const details = studentModel.constructDetails?.[key as ConstructName];
    rows.push([
      CONSTRUCT_LABELS[key as ConstructName] || key,
      value,
      details?.confidence !== undefined ? Number(details.confidence.toFixed(2)) : '',
      details?.evidenceCount ?? '',
      Number((details?.trend ?? 0).toFixed(3))
    ]);
  }
  rows.push([]);
  rows.push(['CÂN BẰNG THỜI GIAN'], ['Lĩnh vực', 'Giờ hiện tại', 'Giờ mục tiêu', 'Trạng thái']);
  for (const d of lifeBalance || []) {
    rows.push([d.name, d.actualHours, d.targetHours, d.status]);
  }
  rows.push([]);
  rows.push(['MỤC TIÊU'], ['Tiêu đề', 'Loại', 'Tiến độ', 'Đích', 'Trạng thái']);
  for (const g of goals || []) {
    rows.push([g.title, g.category, g.current, `${g.target} ${g.unit}`, g.status]);
  }
  rows.push([]);
  rows.push(['BIẾN CỐ HÀNH VI'], ['Thời gian', 'Phiên', 'Sự kiện', 'Kịch bản', 'Chi tiết']);
  for (const e of [...events].reverse()) {
    rows.push([
      new Date(e.timestamp).toLocaleString('vi-VN'),
      e.sessionId,
      eventLabel(e.type),
      e.sceneId,
      e.payload ? JSON.stringify(e.payload) : ''
    ]);
  }
  return toCSV(rows);
}