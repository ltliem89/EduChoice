import {
  BehaviorEvent,
  GoalItem,
  LifeBalanceArea,
  StudentMicroAction,
  StudentModel
} from '../types';
import {
  analyzeLearningPattern,
  analyzeResilience,
  analyzeLifeBalance,
  computeWellness,
  CONSTRUCT_LABELS,
  LearningPattern,
  LifeBalanceProfile,
  ResilienceProfile,
  WellnessProfile
} from './studentAnalytics';
import { adviceForAfterTask } from './adviceEngine';

export type AssistantTopic = 'brief' | 'rhythm' | 'balance' | 'wellness' | 'next';
export type AssistantTone = 'neutral' | 'positive' | 'warning' | 'alert';
export type AssistGoTab = 'challenges' | 'journey' | 'missions' | 'toolkits';

export interface AssistantReply {
  text: string;
  tone: AssistantTone;
  goTab?: AssistGoTab;
}

export interface FocusForecast {
  bestWindowLabel: string;
  focusScore: number;
  energyCaption: string;
  fatigueGuard: string | null;
}

export interface AssistantInputs {
  studentModel: StudentModel;
  events: BehaviorEvent[];
  lifeBalance: LifeBalanceArea[];
  goals: GoalItem[];
  microActions: StudentMicroAction[];
}

export interface AssistantBundle {
  learning: LearningPattern;
  resilience: ResilienceProfile;
  lifeBalance: LifeBalanceProfile;
  wellness: WellnessProfile;
  forecast: FocusForecast;
  nextAction: AssistantReply;
}

export const ASSISTANT_NAME = 'ASTRA · 2050';

const weekdays = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

const hourGreeting = (h: number) => (h < 11 ? 'Chào buổi sáng' : h < 14 ? 'Chào buổi trưa' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối');

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

export function composeBundle(i: AssistantInputs): AssistantBundle {
  const learning = analyzeLearningPattern(i.events);
  const resilience = analyzeResilience(i.events);
  const lifeBalance = analyzeLifeBalance(i.lifeBalance);
  const wellness = computeWellness(i.events, 48);
  const forecast = computeFocusForecast({ learning, resilience, lifeBalance, wellness });
  const nextAction = buildNextAction(i);
  return { learning, resilience, lifeBalance, wellness, forecast, nextAction };
}

export function computeFocusForecast(inputs: {
  learning: LearningPattern;
  resilience: ResilienceProfile;
  lifeBalance: LifeBalanceProfile;
  wellness: WellnessProfile;
}): FocusForecast {
  const { learning, resilience, lifeBalance, wellness } = inputs;
  let base = 62;
  if (lifeBalance.index >= 80) base += 12;
  else if (lifeBalance.index >= 60) base += 4;
  else base -= 12;
  if (wellness.level === 'green') base += 8;
  else if (wellness.level === 'yellow') base -= 6;
  else base -= 18;
  if (resilience.completionRate >= 0.6) base += 6;
  else if (resilience.completedCount + resilience.abandonedCount >= 4 && resilience.completionRate < 0.35) base -= 8;
  if (resilience.retryCount >= 5) base -= 5;

  let focusScore = clamp(Math.round(base), 15, 98);
  if (learning.sessionCount === 0) focusScore = clamp(focusScore - 8, 15, 98);

  const bestWindowLabel =
    learning.peakHourCount > 0
      ? learning.peakHourLabel
      : new Date().getHours() < 12
        ? '03-05h chiều'
        : new Date().getHours() < 18
          ? '08-10h tối'
          : '07-09h sáng mai';

  const energyCaption =
    focusScore >= 80 ? 'cao trội — dễ thu nạp kiến thức mới' : focusScore >= 60 ? 'khá ổn — vừa phải cho nhiệm vụ trung bình' : focusScore >= 40 ? 'vừa phải — chỉ nên làm việc nhẹ' : 'thấp — cần nghỉ ngơi trước khi học';

  let fatigueGuard: string | null = null;
  if (wellness.level === 'red') {
    fatigueGuard = 'Hôm nay nên giới hạn tối đa 1 phiên ngắn (dưới 5 phút) và nghỉ 10 phút giữa các phiên.';
  } else if (resilience.retryCount >= 5) {
    fatigueGuard = 'Em đã thử lại rất nhiều: đổi sang thử thách nhẹ nhàng hơn để tránh quá tải.';
  } else if (learning.avgSessionSeconds > 25 * 60) {
    fatigueGuard = 'Các phiên gần đây hơi dài: chia nhỏ thành 2 phiên ngắn giúp giữ tập trung tốt hơn.';
  }

  return { bestWindowLabel, focusScore, energyCaption, fatigueGuard };
}

export function buildNextAction(i: AssistantInputs): AssistantReply {
  const { goals, microActions, lifeBalance, events } = i;
  const wellness = computeWellness(events, 48);
  const lb = analyzeLifeBalance(lifeBalance);
  if (wellness.level === 'red') {
    return {
      text: 'Ưu tiên số 1 là nghỉ ngơi và được người lớn hỗ trợ. Em đừng cố gắng tiếp tục luyện tập bây giờ — nghỉ ngơi cũng là một kỹ năng.',
      tone: 'alert',
      goTab: 'journey'
    };
  }
  const goal = goals.find((g) => g.status === 'active');
  if (goal && goal.current < goal.target) {
    const pct = Math.min(100, Math.round((goal.current / Math.max(1, goal.target)) * 100));
    return {
      text: `Mục tiêu "${goal.title}" đang ở ${pct}% (${goal.current}/${goal.target} ${goal.unit}). Một việc nhỏ 3–5 phút hôm nay sẽ đưa em tiến thêm một bước rõ rệt.`,
      tone: 'positive',
      goTab: 'journey'
    };
  }
  const lastActiveMicro = microActions.find((a) => a.status === 'accepted' || a.status === 'started');
  if (lastActiveMicro) {
    return {
      text: `Em còn hoàn thành việc nhỏ "${lastActiveMicro.title}" (${lastActiveMicro.durationMinutes} phút). Làm ngay để biến cam kết thành hành động.`,
      tone: 'positive',
      goTab: 'journey'
    };
  }
  if (lb.underDomains[0] === 'Ngủ') {
    return {
      text: 'Nhịp ngủ đang ít hơn mục tiêu. Hãy thử một thử thách ngắn về thói quen lành mạnh trước khi xếp thời gian ngủ hợp lý.',
      tone: 'warning',
      goTab: 'challenges'
    };
  }
  return {
    text: 'Chưa có nhiệm vụ đang dang dở. Bắt đầu một thử thách tình huống 3 phút để khởi động lại nhịp học của em nhé.',
    tone: 'positive',
    goTab: 'challenges'
  };
}

export function greetingForNow(startedToday: boolean, streakDays: number, name?: string): string {
  const now = new Date();
  const greeting = hourGreeting(now.getHours());
  const day = weekdays[now.getDay()];
  const streak = streakDays > 1 ? `Hôm nay là ngày nối dài chuỗi ${streakDays} ngày của em.` : 'Một ngày mới, một cơ hội mới để tiến bộ.';
  const activity = startedToday ? 'Em đã có hoạt động hôm nay — tiếp tục giữ nhịp nhé.' : 'Hôm nay em chưa có hoạt động nào, cùng khởi động nhẹ nhàng nhé.';
  return `${greeting}${name ? `, ${name}` : ''}. ${day} · ${streak} ${activity}`;
}

export function assistantReply(topic: AssistantTopic, i: AssistantInputs, bundle: AssistantBundle): AssistantReply {
  const { learning, resilience, lifeBalance, wellness, forecast } = bundle;
  const s = i.studentModel;
  const top = Object.entries(s.constructs).sort((a, b) => b[1] - a[1])[0];

  switch (topic) {
    case 'brief': {
      const startedToday = i.events.some((e) => e.type === 'game_started' && new Date(e.timestamp).toDateString() === new Date().toDateString());
      const text = [
        greetingForNow(startedToday, s.streakDays || 0, s.name),
        `Khung giờ vàng của em hôm nay là ${forecast.bestWindowLabel}.`,
        forecast.fatigueGuard ? `Lưu ý: ${forecast.fatigueGuard}` : 'Trạng thái dự báo cho phép em học tập tập trung và hiệu quả.'
      ].join(' ');
      return { text, tone: 'positive' };
    }
    case 'rhythm': {
      if (learning.sessionCount === 0) {
        return { text: 'Em chưa có dữ liệu nhịp học. Chơi 2–3 thử thách là hệ thống sẽ lập bản đồ giờ học hiệu quả nhất của em.', tone: 'neutral' };
      }
      return {
        text: `Trong ${learning.sessionCount} phiên vừa qua, em tập trung tốt nhất lúc ${forecast.bestWindowLabel} (${learning.peakHourCount} lượt). Mỗi phiên trung bình ~${Math.max(1, Math.round(learning.avgSessionSeconds / 60))} phút. Hãy xếp nhiệm vụ khó nhất vào quãng này.`,
        tone: top && top[1] >= 60 ? 'positive' : 'neutral'
      };
    }
    case 'balance': {
      const parts: string[] = [`Chỉ số cân bằng 24h của em: ${lifeBalance.index}/100 (${lifeBalance.status === 'balanced' ? 'hài hòa' : lifeBalance.status === 'watch' ? 'hơi lệch rồi' : 'lệch nhiều'}).`];
      if (lifeBalance.overDomains.length > 0) parts.push(`Đang nhiều hơn mục tiêu: ${lifeBalance.overDomains.join(', ')}.`);
      if (lifeBalance.underDomains.length > 0) parts.push(`Đang ít hơn mục tiêu: ${lifeBalance.underDomains.join(', ')}.`);
      parts.push('Điều chỉnh 30 phút mỗi hạng mục một ngày cũng đủ tạo khác biệt lớn.');
      return { text: parts.join(' '), tone: lifeBalance.index >= 80 ? 'positive' : lifeBalance.index >= 60 ? 'warning' : 'alert' };
    }
    case 'wellness': {
      const micro = wellness.level === 'green' || wellness.level === 'yellow'
        ? adviceForAfterTask({
            construct: top ? (top[0] as any) : undefined,
            outcome: wellness.level === 'green' ? 'success' : 'partial',
            now: new Date()
          }).entry.microAction
        : null;
      return {
        text: `Trạng thái tinh thần: ${wellness.label}. ${wellness.message}${micro ? ` Việc nhỏ gợi ý: ${micro}` : ''}`,
        tone: wellness.level === 'green' ? 'positive' : wellness.level === 'yellow' ? 'warning' : 'alert'
      };
    }
    case 'next': {
      return bundle.nextAction;
    }
    default:
      return { text: 'Em muốn hỏi gì thêm nào?', tone: 'neutral' };
  }
}

export function personalSummary(s: StudentModel): string {
  const details = Object.values(s.constructDetails || {}).filter(Boolean);
  const grown = details.filter((d) => d.trend > 0.01);
  const res = [
    `Hồ sơ ${s.name || 'học sinh'} · ${s.gradeLevel} · ${s.sessionsCompleted} phiên hoàn thành.`,
    grown.length > 0 ? `Kỹ năng có xu hướng đi lên: ${grown.slice(0, 3).map((d) => CONSTRUCT_LABELS[d.construct] || d.construct).join(', ')}.` : 'Hệ thống vẫn đang tích lũy thêm dữ liệu để nhìn rõ hơn xu hướng kỹ năng của em.',
    `Tinh thần gần đây: ${s.streakDays ? `chuỗi ${s.streakDays} ngày liên tiếp` : 'đang hình thành'} · phiên gần nhất ${new Date(s.lastActive).toLocaleString('vi-VN')}.`
  ];
  return res.join(' ');
}