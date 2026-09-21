/**
 * Gamification Engine — XP / Level / Daily Quest for EduChoice-AI
 * Layered strictly on top of real behavior events; never fabricates metrics.
 * Aligned with UNIVERSAL_EDUCATIONAL_GAME_OS_SPEC_V1.md (§12 Progression, §13 Reward).
 */

import { GameSpecification, StudentModel } from '../types';

export const XP_PER_LEVEL = 100;

export const XP_REWARDS = {
  choice: 10,
  comboBonus: 2,
  reflection: 20,
  completion: 25,
  dailyQuestBonus: 40,
} as const;

// §13 Reward Engine — currency layer (coins) independent from XP
export const COIN_REWARDS = {
  choice: 3,
  comboBonus: 1,
  reflection: 6,
  completion: 10,
  dailyQuestBonus: 15,
} as const;

// §12/§13 Title tiers — data-driven title progression
export const RANK_TITLES: { level: number; title: string; icon: string }[] = [
  { level: 1, title: 'Tân Binh', icon: '🌱' },
  { level: 2, title: 'Học Viên', icon: '🪴' },
  { level: 3, title: 'Khám Phá', icon: '🔭' },
  { level: 4, title: 'Kỹ Sư Chiến Lược', icon: '🛠️' },
  { level: 5, title: 'Chuyên Gia Phản Xạ', icon: '🧠' },
  { level: 6, title: 'Nhà Chiến Lược', icon: '🎯' },
  { level: 7, title: 'Bậc Thầy Kiên Trì', icon: '🏆' },
  { level: 8, title: 'Huyền Thoại', icon: '🌟' }
];

export function titleForLevel(level: number): { title: string; icon: string } {
  let selected = RANK_TITLES[0];
  for (const t of RANK_TITLES) {
    if (level >= t.level) selected = t;
  }
  return { title: selected.title, icon: selected.icon };
}

export function coinFromCombo(combo: number): number {
  return Math.round(COIN_REWARDS.choice + Math.max(0, combo - 1) * COIN_REWARDS.comboBonus);
}

export function levelFromXp(xp: number): number {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;
}

// Level badge names (kept for backward compatibility)
export const LEVEL_META: { name: string; icon: string }[] = [
  { name: 'Tân Binh', icon: '🌱' },
  { name: 'Nhà Khám Phá', icon: '🔭' },
  { name: 'Chiến Binh Tự Chủ', icon: '🛡️' },
  { name: 'Bậc Thầy Ưu Tiên', icon: '🎯' },
  { name: 'Chuyên Gia Quyết Đoán', icon: '⚔️' },
  { name: 'Kiến Tạo Chiến Lược', icon: '🏗️' },
  { name: 'Cao Thủ Bình Tĩnh', icon: '🧘' },
  { name: 'Huyền Thoại Kiên Trì', icon: '🏆' }
];

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpForNext: number;
  pct: number;
  meta: { name: string; icon: string };
}

export function levelProgress(xp: number): LevelProgress {
  const level = levelFromXp(xp);
  const xpIntoLevel = Math.floor(xp % XP_PER_LEVEL);
  const meta = LEVEL_META[Math.min(level - 1, LEVEL_META.length - 1)];
  return { level, xpIntoLevel, xpForNext: XP_PER_LEVEL, pct: xpIntoLevel / XP_PER_LEVEL, meta };
}

// §12 Streak — derived from real daily-quest / session history (never invented)
export function currentStreak(student: StudentModel): number {
  return student.streakDays || 0;
}

export function comboMultiplier(combo: number): number {
  return 1 + Math.max(0, combo - 1) * 0.25;
}

export function comboXp(combo: number): number {
  return Math.round(XP_REWARDS.choice * comboMultiplier(combo));
}

export function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function selectDailyQuest(games: GameSpecification[], date: Date): GameSpecification | null {
  const published = games.filter((g) => g.status === 'published');
  if (published.length === 0) return null;
  const key = dayKey(date);
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return published[h % published.length];
}