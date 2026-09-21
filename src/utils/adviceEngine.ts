import { ConstructName } from '../types';
import {
  ADVICE_ENTRIES,
  ADVICE_BASIS_LINKS,
  AdviceDayType,
  AdviceEntry,
  AdviceOutcome,
  AdviceTimeOfDay,
  CatalogTone,
  GENERAL_FALLBACK
} from '../data/adviceCatalog';

export interface AdviceSelections {
  entry: AdviceEntry;
  outcome: AdviceOutcome;
  timeOfDay: AdviceTimeOfDay;
  dayType: AdviceDayType;
  basis: string;
  tone: CatalogTone;
}

export interface AdviceEngineInputs {
  construct?: ConstructName;
  outcome: AdviceOutcome;
  now?: Date;
  seenIds?: string[];
}

/**
 * Chia khung giờ theo nhịp sinh học học sinh (thêm giờ buổi sáng sớm 5-11h,
 * chiều 11-17h, tối 17-22h, khuya 22-5h) dựa trên nghiên cứu circadian teen.
 */
export function classifyTimeOfDay(hour: number): AdviceTimeOfDay {
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'lateNight';
}

/**
 * Phân loại ngày hiện tại theo loại ngày trong tuần; khi đang trong kỳ thi,
 * caller truyền examWeek = true để ưu tiên lời khuyên phù hợp thi cử.
 */
export function classifyDayType(now: Date, examWeek = false): AdviceDayType {
  if (examWeek) return 'examWeek';
  const d = now.getDay();
  return d === 0 || d === 6 ? 'weekend' : 'weekday';
}

const TIME_LABEL: Record<AdviceTimeOfDay, string> = {
  morning: 'buổi sáng',
  afternoon: 'buổi chiều',
  evening: 'buổi tối',
  lateNight: 'lúc đêm khuya'
};

const DAY_LABEL: Record<AdviceDayType, string> = {
  weekday: 'ngày trong tuần',
  weekend: 'cuối tuần',
  examWeek: 'trong tuần thi'
};

export const timeOfDayLabel = (t: AdviceTimeOfDay): string => TIME_LABEL[t];
export const dayTypeLabel = (t: AdviceDayType): string => DAY_LABEL[t];

const TONE_TO_STYLE: Record<CatalogTone, string> = {
  positive: 'text-emerald-700',
  growth: 'text-indigo-700',
  warm: 'text-amber-800',
  warning: 'text-orange-800',
  alert: 'text-rose-800'
};

export const toneStyle = (tone: CatalogTone): string => TONE_TO_STYLE[tone];

const TONE_BADGE: Record<CatalogTone, string> = {
  positive: 'bg-emerald-100 text-emerald-800',
  growth: 'bg-indigo-100 text-indigo-800',
  warm: 'bg-amber-100 text-amber-800',
  warning: 'bg-orange-100 text-orange-800',
  alert: 'bg-rose-100 text-rose-800'
};

export const toneBadge = (tone: CatalogTone): string => TONE_BADGE[tone];

export function basisOf(entry: AdviceEntry): string {
  return ADVICE_BASIS_LINKS[entry.basis] || `Nguồn: ${entry.basis}`;
}

/**
 * Tính seed deterministic theo ngày + outcome + attempt để xoay vòng lời khuyên
 * (cùng học sinh, cùng outcome, nhưng mỗi ngày sẽ thấy lời khuyên khác nhau).
 */
function daySeed(now: Date, key: string): number {
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  let h = 0;
  const s = `${y}-${m}-${d}-${key}`;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function scoreEntry(e: AdviceEntry, wanted: {
  outcome: AdviceOutcome;
  construct?: ConstructName;
  timeOfDay: AdviceTimeOfDay;
  dayType: AdviceDayType;
}): number {
  let score = 0;
  if (e.outcome === wanted.outcome) score += 100;
  const constructMatch = e.construct !== undefined && e.construct === wanted.construct;
  const timeMatch = e.timeOfDay !== undefined && e.timeOfDay === wanted.timeOfDay;
  const dayMatch = e.dayType !== undefined && e.dayType === wanted.dayType;
  if (constructMatch) score += 40;
  if (timeMatch) score += (e.dayType ? 10 : 25);
  if (dayMatch) score += (e.timeOfDay ? 10 : 25);
  if (constructMatch && timeMatch) score += 15;
  if (constructMatch && dayMatch) score += 15;
  return score;
}

/**
 * Chọn lời khuyên phù hợp tình huống sau một thử thách.
 * Quy tắc: ưu tiên entry khớp CA DIỆN TÍCH (outcome + construct + thời điểm + ngày),
 * nếu không có thì hạ dần xuống khớp từng phần, cuối cùng mới tới entry chung.
 * Sự đa dạng đạt được bằng xoay vòng deterministic theo (ngày, outcome, construct).
 */
export function adviceForAfterTask(inputs: AdviceEngineInputs): AdviceSelections {
  const now = inputs.now || new Date();
  const timeOfDay = classifyTimeOfDay(now.getHours());
  const dayType = classifyDayType(now, false);
  const seen = new Set(inputs.seenIds || []);

  const candidates = ADVICE_ENTRIES.filter((en) => en.outcome === inputs.outcome);

  const scored = candidates.map((en) => ({
    entry: en,
    score: scoreEntry(en, { outcome: inputs.outcome, construct: inputs.construct, timeOfDay, dayType })
  }));

  const byScore = [...scored].sort((a, b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id));
  const topScore = byScore.length > 0 ? byScore[0].score : 0;
  const pool = byScore.filter((s) => s.score >= topScore - 1);

  const seedBase = `${inputs.outcome}-${inputs.construct || 'general'}-${timeOfDay}-${dayType}`;
  const seed = daySeed(now, seedBase);
  const sorted = [...pool].sort((a, b) => {
    const da = (a.entry.id.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0) * seed) >>> 0;
    const db = (b.entry.id.split('').reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0) * seed) >>> 0;
    return da - db;
  });

  let pick = sorted.find((s) => !seen.has(s.entry.id));
  if (!pick && sorted.length > 0) pick = sorted[0];
  if (!pick) {
    pick = { entry: GENERAL_FALLBACK, score: 0 };
  }

  return {
    entry: pick.entry,
    outcome: pick.entry.outcome,
    timeOfDay,
    dayType,
    basis: basisOf(pick.entry),
    tone: pick.entry.tone
  };
}