import React, { useMemo } from 'react';
import {
  Activity,
  Download,
  TrendingUp,
  HeartPulse,
  Scale,
  Sparkles,
  Target,
  RefreshCw,
  HelpCircle,
  BookOpen,
  Info,
  ListChecks,
  Clock,
  Flame,
  Trophy
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useApp } from '../../context/AppContext';
import {
  analyzeLearningPattern,
  analyzeResilience,
  analyzeLifeBalance,
  computeWellness,
  buildGrowthProfile,
  generateInsights,
  buildStudentCSV,
  downloadCSV,
  InsightItem
} from '../../utils/studentAnalytics';
import { SoundEngine } from '../../utils/soundEffects';

const WELLNESS_COLORS = {
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444'
} as const;

const INSIGHT_ICONS: Record<InsightItem['category'], typeof BookOpen> = {
  learning: BookOpen,
  life: Scale,
  resilience: RefreshCw,
  wellness: HeartPulse
};

export const InsightsHub: React.FC = () => {
  const { studentModel, behaviorEvents, lifeBalance, goals } = useApp();

  const analysis = useMemo(() => {
    const learning = analyzeLearningPattern(behaviorEvents);
    const resilience = analyzeResilience(behaviorEvents);
    const lifeBalanceProfile = analyzeLifeBalance(lifeBalance);
    const wellness = computeWellness(behaviorEvents, 48);
    const growth = buildGrowthProfile(studentModel, 8);
    const insights = generateInsights({ learning, resilience, lifeBalance: lifeBalanceProfile, wellness, goals, growth });
    return { learning, resilience, lifeBalanceProfile, wellness, growth, insights };
  }, [behaviorEvents, lifeBalance, studentModel, goals]);

  const { learning, resilience, lifeBalanceProfile, wellness, growth, insights } = analysis;

  const hourData = learning.hourHistogram.length > 0 ? learning.hourHistogram : [];
  const balanceRadarData = lifeBalance.map((d) => ({
    subject: d.name,
    current: d.actualHours,
    target: d.targetHours
  }));
  const balanceRadarMax = Math.max(8, ...lifeBalance.map((d) => Math.ceil(d.targetHours) + 1));
  const growthRadarData = growth.map((g) => ({ subject: g.nameVi, start: Math.max(0, g.before), now: g.now }));

  const handleExport = () => {
    SoundEngine.playClick();
    const safeId = (studentModel.userId || 'student').replace(/[^a-zA-Z0-9_-]/g, '_');
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCSV(`educhoice_${safeId}_${stamp}.csv`, buildStudentCSV(studentModel, behaviorEvents, lifeBalance, goals));
  };

  const completionRate = Math.round(resilience.completionRate * 100);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-emerald-50 border border-indigo-100 rounded-3xl p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-800">Góc nhìn Học & Sống của Em</h2>
              <p className="text-sm text-gray-500 mt-1">
                Nhìn thấy nhịp học, sự kiên trì và sự cân bằng trong cuộc sống — được tính từ chính hành động thật của em.
              </p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Tải dữ liệu của em (CSV)
          </button>
        </div>
      </div>

      <div
        className={`rounded-3xl border p-5 shadow-2xs ${
          wellness.level === 'green'
            ? 'bg-emerald-50 border-emerald-200'
            : wellness.level === 'yellow'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-red-50 border-red-200'
        }`}
        style={{ borderLeftWidth: 6, borderLeftColor: WELLNESS_COLORS[wellness.level] }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: WELLNESS_COLORS[wellness.level] }}
          />
          <h3 className="font-extrabold text-gray-800">Trạng thái tinh thần: {wellness.label}</h3>
        </div>
        <p className="text-sm text-gray-700">{wellness.message}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {wellness.reasons.map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-white/70 border border-gray-200 text-gray-600"
            >
              <Info className="w-3 h-3" />
              {r}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Trophy} label="Phiên hoàn thành" value={String(studentModel.sessionsCompleted ?? 0)} tone="text-indigo-600 bg-indigo-50" />
        <StatCard icon={HeartPulse} label="Tỷ lệ hoàn thành" value={`${completionRate}%`} tone="text-emerald-600 bg-emerald-50" />
        <StatCard icon={Flame} label="Streak" value={`${studentModel.streakDays ?? 0} ngày`} tone="text-amber-600 bg-amber-50" />
        <StatCard icon={RefreshCw} label="Lần thử lại" value={String(resilience.retryCount)} tone="text-rose-600 bg-rose-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h3 className="font-extrabold text-gray-800 text-sm">Nhịp học của em theo giờ</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            {learning.sessionCount > 0
              ? `Em thường hoạt động nhiều nhất vào ${learning.busyPeriodLabel} (${learning.peakHourLabel}).`
              : 'Chưa có dữ liệu — hãy chơi một thử thách để nhìn thấy nhịp học của mình.'}
          </p>
          {hourData.length > 0 ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={0} angle={-28} textAnchor="end" height={40} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#6366f1">
                    {hourData.map((b, i) => (
                      <Cell key={i} fill={i === hourData.findIndex((x) => x.count === learning.peakHourCount) ? '#f59e0b' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyChart />
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-gray-800 text-sm">Cân bằng 24h mỗi ngày</h3>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Chỉ số cân bằng: <b>{lifeBalanceProfile.index}/100</b> ({lifeBalanceProfile.status === 'balanced' ? 'hài hòa' : lifeBalanceProfile.status === 'watch' ? 'cần coi chừng' : 'mất nhịp'}) — đường xanh là mục tiêu, đường tím là thực tế.
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={balanceRadarData} outerRadius="70%">
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, balanceRadarMax]} tick={false} axisLine={false} />
                <Radar name="Mục tiêu (giờ)" dataKey="target" stroke="#34d399" fill="#34d399" fillOpacity={0.25} />
                <Radar name="Thực tế (giờ)" dataKey="current" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-2xs">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <h3 className="font-extrabold text-gray-800 text-sm">Kỹ năng mạnh nhất gần đây</h3>
        </div>
        <p className="text-xs text-gray-500 mb-3">So sánh lần ghi nhận đầu tiên với giá trị hiện tại (điểm 0–100).</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={growthRadarData} outerRadius="72%">
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 100]} tickCount={5} tick={{ fontSize: 9 }} />
              <Radar name="Bắt đầu" dataKey="start" stroke="#cbd5e1" fill="#94a3b8" fillOpacity={0.25} />
              <Radar name="Hiện tại" dataKey="now" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = INSIGHT_ICONS[insight.category];
          return (
            <div key={insight.id} className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{insight.title}</h4>
                <p className="text-sm text-gray-600 mt-0.5">{insight.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 text-[11px] text-gray-400 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
        <ListChecks className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          Góc nhìn này chỉ mang tính gợi ý để em hiểu hơn về cách học và sinh hoạt của mình, không phải kết quả đánh giá học tập.
          Dữ liệu được lưu trên máy em và máy chủ trường học (Google Sheets). Bố mẹ / thầy cô có thể xem khi em cần trợ giúp.
        </p>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: typeof Trophy; label: string; value: string; tone: string }> = ({ icon: Icon, label, value, tone }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs">
    <div className={`inline-flex p-2 rounded-xl ${tone} mb-2`}>
      <Icon className="w-4 h-4" />
    </div>
    <div className="text-lg font-extrabold text-gray-800 leading-tight">{value}</div>
    <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
  </div>
);

const EmptyChart: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-56 text-center text-gray-400">
    <Sparkles className="w-8 h-8 mb-2" />
    <p className="text-sm">Cần thêm dữ liệu về thời gian học của em.</p>
  </div>
);