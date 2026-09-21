/**
 * Gamification Engine — XP / Level / Daily Quest for EduChoice-AI
 * Layered strictly on top of real behavior events; never fabricates metrics.
 */

import { GameSpecification } from '../types';

export const XP_PER_LEVEL = 100;

export const XP_REWARDS = {
  choice: 10,
  comboBonus: 2,
  reflection: 20,
  completion: 25,
  dailyQuestBonus: 40,
} as const;

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

export function levelFromXp(xp: number): number {
  return Math.floor(Math.max(0, xp) / XP_PER_LEVEL) + 1;
}

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