/**
 * Achievement Engine — rule-based, data-driven (Universal Educational Game OS Spec §14).
 *
 * Every achievement is a CONFIG entry with a pure `meter` function. It only reads
 * REAL student telemetry (StudentModel + session snapshot); it never fabricates
 * metrics. UI decides when to call `evaluateAchievements` (session end, level-up...).
 */

import { StudentModel, GameEventType } from '../types';
import { levelFromXp } from './gamification';

export interface AchievementMeter {
  current: number;
  target: number;
}

export interface SessionSnapshot {
  maxCombo: number;
  retryCount: number;
  hintCount: number;
  completionRate: number; // 0..1
  score: number; // 0..100
  dailyQuestCompleted: boolean;
}

export interface AchievementContext {
  student: StudentModel;
  session?: SessionSnapshot;
}

export interface AchievementDefinition {
  id: string;
  title: string;
  desc: string;
  icon: string;
  coins: number; // reward coins on unlock
  event: GameEventType;
  meter: (ctx: AchievementContext) => AchievementMeter;
}

export interface UnlockedAchievement {
  id: string;
  unlockedAt: string;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-completion',
    title: 'Chạm Trạm Đầu Tiên',
    desc: 'Hoàn thành nhiệm vụ đầu tiên trong hành trình.',
    icon: '🚀',
    coins: 20,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: ctx.student.sessionsCompleted || 0,
      target: 1
    })
  },
  {
    id: 'daily-quest',
    title: 'Nghị Lực Mỗi Ngày',
    desc: 'Hoàn thành nhiệm vụ hằng ngày hôm nay.',
    icon: '📅',
    coins: 25,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => {
      const today = ctx.student.dailyQuestDate;
      const doneToday = !!today && (ctx.student.dailyQuestGameIds?.length || 0) > 0;
      const doneThisRun = !!ctx.session?.dailyQuestCompleted;
      return { current: doneToday || doneThisRun ? 1 : 0, target: 1 };
    }
  },
  {
    id: 'combo-3',
    title: 'Phản Xạ Nhạy Bén',
    desc: 'Đạt chuỗi 3 lựa chọn thông suốt liên tiếp trong một nhiệm vụ.',
    icon: '⚡',
    coins: 15,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: ctx.session?.maxCombo || 0,
      target: 3
    })
  },
  {
    id: 'perfect-run',
    title: 'Cú Chạy Hoàn Hảo',
    desc: 'Hoàn thành nhiệm vụ trọn vẹn, không thử lại và không cần gợi ý.',
    icon: '💎',
    coins: 30,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => {
      const s = ctx.session;
      if (!s) return { current: 0, target: 1 };
      const perfect = s.completionRate >= 0.6 && s.retryCount === 0 && s.hintCount === 0;
      return { current: perfect ? 1 : 0, target: 1 };
    }
  },
  {
    id: 'reflection-5',
    title: 'Người Soi Gương',
    desc: 'Hoàn thành 5 bài phản tư — nhìn lại chính mình.',
    icon: '🧘',
    coins: 25,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: ctx.student.statsSummary?.reflectionsCompleted || 0,
      target: 5
    })
  },
  {
    id: 'micro-5',
    title: 'Kiến Tạo Vi Hành Động',
    desc: 'Hoàn thành 5 vi hành động được giao.',
    icon: '🔧',
    coins: 25,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: ctx.student.statsSummary?.microActionsCompleted || 0,
      target: 5
    })
  },
  {
    id: 'streak-3',
    title: 'Mạch Kiên Trì',
    desc: 'Quay lại luyện tập 3 ngày liên tiếp.',
    icon: '🔥',
    coins: 40,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: Math.min(ctx.student.streakDays || 0, 3),
      target: 3
    })
  },
  {
    id: 'level-3',
    title: 'Vươn Tới Cấp 3',
    desc: 'Đạt cấp độ 3 thông qua con đường rèn luyện thật sự.',
    icon: '⭐',
    coins: 50,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: Math.min(levelFromXp(ctx.student.xp || 0), 3),
      target: 3
    })
  },
  {
    id: 'xp-200',
    title: 'Cú Hích Đầu Tiên',
    desc: 'Tích lũy 200 XP kinh nghiệm học tập.',
    icon: '🪙',
    coins: 35,
    event: 'ACHIEVEMENT_UNLOCK',
    meter: (ctx) => ({
      current: Math.min(ctx.student.xp || 0, 200),
      target: 200
    })
  }
];

const byId = new Map(ACHIEVEMENTS.map((a) => [a.id, a]));
export const achievementById = (id: string): AchievementDefinition | undefined => byId.get(id);
export const achievementCount = ACHIEVEMENTS.length;

/** @returns achievements newly met but not yet saved on the student profile. */
export function evaluateAchievements(ctx: AchievementContext, unlockedIds: string[]): AchievementDefinition[] {
  const already = new Set(unlockedIds);
  return ACHIEVEMENTS.filter((a) => !already.has(a.id) && a.meter(ctx).current >= a.meter(ctx).target);
}

export function achievementProgress(ctx: AchievementContext, def: AchievementDefinition): number {
  const m = def.meter(ctx);
  return Math.min(100, m.target === 0 ? 100 : Math.round((m.current / m.target) * 100));
}