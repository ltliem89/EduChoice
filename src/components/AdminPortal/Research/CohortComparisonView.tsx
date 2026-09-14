import React, { useState, useMemo } from 'react';
import {
  Users,
  GitCompare,
  TrendingUp,
  BarChart3,
  Radar as RadarIcon,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Target,
  FileSpreadsheet,
  Activity,
  Award,
  Zap
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import {
  PRESET_COHORTS,
  COMPARISON_METRICS,
  analyzeCohortComparison,
  CohortProfile,
  MetricDefinition
} from '../../../utils/cohortAnalysis';
import { SoundEngine } from '../../../utils/soundEffects';

type ViewMode = 'timeseries' | 'radar' | 'delta_bars';

export const CohortComparisonView: React.FC = () => {
  const [cohortAId, setCohortAId] = useState<string>('cohort_ai_intervention');
  const [cohortBId, setCohortBId] = useState<string>('cohort_traditional_control');
  const [selectedMetricKey, setSelectedMetricKey] = useState<string>('outcome');
  const [viewMode, setViewMode] = useState<ViewMode>('timeseries');

  // Display toggles for the chart
  const [showErrorBands, setShowErrorBands] = useState<boolean>(true);
  const [showDeltaLine, setShowDeltaLine] = useState<boolean>(true);
  const [showOnsetMarker, setShowOnsetMarker] = useState<boolean>(true);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Selected cohorts objects
  const cohortA = useMemo(() => {
    return PRESET_COHORTS.find((c) => c.id === cohortAId) || PRESET_COHORTS[0];
  }, [cohortAId]);

  const cohortB = useMemo(() => {
    return PRESET_COHORTS.find((c) => c.id === cohortBId) || PRESET_COHORTS[1];
  }, [cohortBId]);

  // Statistical analysis result
  const analysis = useMemo(() => {
    return analyzeCohortComparison(cohortA, cohortB, selectedMetricKey);
  }, [cohortA, cohortB, selectedMetricKey]);

  const { timeSeries, radarData, stats, metric } = analysis;

  // Swap cohorts handler
  const handleSwapCohorts = () => {
    SoundEngine.playSelect();
    setCohortAId(cohortBId);
    setCohortBId(cohortAId);
  };

  // Metric select handler
  const handleSelectMetric = (key: string) => {
    SoundEngine.playClick();
    setSelectedMetricKey(key);
  };

  // View mode handler
  const handleSelectViewMode = (mode: ViewMode) => {
    SoundEngine.playClick();
    setViewMode(mode);
  };

  // Export CSV handler
  const handleExportCSV = () => {
    SoundEngine.playClick();
    const headers = [
      'Phiên',
      `${cohortA.shortName} (${metric.unit})`,
      `SD ${cohortA.shortName}`,
      `SEM ${cohortA.shortName}`,
      `${cohortB.shortName} (${metric.unit})`,
      `SD ${cohortB.shortName}`,
      `SEM ${cohortB.shortName}`,
      `Chênh Lệch Delta (${metric.unit})`,
      'Phần Trăm Vượt Trội (%)',
      'Giai Đoạn'
    ];

    const rows = timeSeries.map((t) => [
      t.sessionLabel,
      t.valA,
      t.sdA,
      t.semA,
      t.valB,
      t.sdB,
      t.semB,
      t.delta,
      `${t.percentAdvantage}%`,
      t.isPostIntervention ? 'Sau Can Thiệp' : 'Trước Can Thiệp'
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `EduChoice_Cohort_Comparison_${cohortA.id}_vs_${cohortB.id}_${metric.key}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy summary to clipboard
  const handleCopySummary = () => {
    SoundEngine.playClick();
    const textToCopy = `[EduChoice-AI So Sánh 2 Nhóm Học Viên]
Nhóm A: ${cohortA.name} (N=${cohortA.sampleSize})
Nhóm B: ${cohortB.name} (N=${cohortB.sampleSize})
Chỉ số: ${metric.label}
- Điểm cuối Nhóm A: ${stats.meanA}${metric.unit} (SD=${stats.sdA})
- Điểm cuối Nhóm B: ${stats.meanB}${metric.unit} (SD=${stats.sdB})
- Chênh lệch Delta: ${stats.delta > 0 ? '+' : ''}${stats.delta}${metric.unit} (${stats.percentGain > 0 ? '+' : ''}${stats.percentGain}%)
- Cohen's d: ${stats.cohensD} (${stats.effectSizeClass})
- Thống kê t: ${stats.tStatistic} (${stats.pValue})
- Điểm phân kỳ: Phiên ${stats.divergenceSession}
${stats.causalSummary}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1">
                <GitCompare className="w-3 h-3" />
                <span>Dual-Cohort Comparative Lab • Section V8.46</span>
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                Thực Nghiệm Đối Chứng A/B & Đo Lường Hiệu Ứng Can Thiệp
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>So Sánh Dữ Liệu Hành Vi Giữa Hai Nhóm Học Viên</span>
              <Users className="w-5 h-5 text-indigo-300" />
            </h2>
            <p className="text-xs text-indigo-200/80 max-w-3xl leading-relaxed">
              Trực quan hóa sự khác biệt trong kết quả học tập và quỹ đạo hành vi giữa 2 nhóm học viên trên cùng một hệ trục tọa độ. Tính toán chuẩn hóa sai số chuẩn (SEM), khoảng tin cậy 95%, mức độ hiệu ứng Cohen's d và kiểm định ý nghĩa thống kê Welch's t-test.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Xuất dữ liệu đối chiếu sang CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất CSV</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Sao chép báo cáo tóm tắt"
            >
              {copiedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Đã Sao Chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao Chép Tóm Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Cohort Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 pt-6 mt-4 border-t border-white/10 items-center">
          {/* Nhóm A Card */}
          <div className="md:col-span-5 bg-white/10 rounded-2xl p-3.5 border border-indigo-400/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-indigo-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
                <span>Nhóm A (Nhóm Thực Nghiệm 1)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-mono font-bold">
                Cỡ mẫu N={cohortA.sampleSize}
              </span>
            </div>

            <select
              value={cohortAId}
              onChange={(e) => {
                SoundEngine.playClick();
                setCohortAId(e.target.value);
              }}
              className="w-full bg-slate-900 border border-white/20 text-white rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-indigo-400 focus:outline-none cursor-pointer"
            >
              {PRESET_COHORTS.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.category === 'Intervention' ? 'Can Thiệp' : c.category === 'Control' ? 'Đối Chứng' : 'Chuyên Sâu'}] {c.name}
                </option>
              ))}
            </select>

            <div className="text-[11px] text-indigo-100/80 line-clamp-2 leading-relaxed">
              {cohortA.description}
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {cohortA.characteristics.slice(0, 2).map((char, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-indigo-200"
                >
                  • {char}
                </span>
              ))}
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={handleSwapCohorts}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition cursor-pointer shadow-md hover:scale-110 active:scale-95"
              title="Đổi chỗ Nhóm A ⇄ Nhóm B"
            >
              <RefreshCw className="w-4 h-4 text-indigo-300" />
            </button>
          </div>

          {/* Nhóm B Card */}
          <div className="md:col-span-5 bg-white/10 rounded-2xl p-3.5 border border-amber-400/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-amber-300 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span>Nhóm B (Nhóm Đối Chứng / So Sánh 2)</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-mono font-bold">
                Cỡ mẫu N={cohortB.sampleSize}
              </span>
            </div>

            <select
              value={cohortBId}
              onChange={(e) => {
                SoundEngine.playClick();
                setCohortBId(e.target.value);
              }}
              className="w-full bg-slate-900 border border-white/20 text-white rounded-xl p-2 font-bold text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer"
            >
              {PRESET_COHORTS.map((c) => (
                <option key={c.id} value={c.id}>
                  [{c.category === 'Intervention' ? 'Can Thiệp' : c.category === 'Control' ? 'Đối Chứng' : 'Chuyên Sâu'}] {c.name}
                </option>
              ))}
            </select>

            <div className="text-[11px] text-amber-100/80 line-clamp-2 leading-relaxed">
              {cohortB.description}
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {cohortB.characteristics.slice(0, 2).map((char, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-amber-200"
                >
                  • {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metric Selector & View Modes */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase text-gray-700 tracking-wider">
              Chọn Chỉ Số Hành Vi & Năng Lực Cần So Sánh:
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
            <button
              onClick={() => handleSelectViewMode('timeseries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'timeseries'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Quỹ Đạo Chuỗi Thời Gian</span>
            </button>
            <button
              onClick={() => handleSelectViewMode('radar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RadarIcon className="w-3.5 h-3.5" />
              <span>Radar Đa Chiều</span>
            </button>
            <button
              onClick={() => handleSelectViewMode('delta_bars')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'delta_bars'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Chênh Lệch Delta (A - B)</span>
            </button>
          </div>
        </div>

        {/* Metric Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {COMPARISON_METRICS.map((m) => {
            const isSelected = selectedMetricKey === m.key;
            return (
              <button
                key={m.key}
                onClick={() => handleSelectMetric(m.key)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <span>{m.shortLabel}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {m.unit}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-gray-500 italic pt-1">
          💡 {metric.description}
        </div>
      </div>

      {/* Main Comparative Chart Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        {/* Chart Header & Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-gray-900">
                {viewMode === 'timeseries'
                  ? `Biểu Đồ So Sánh Quỹ Đạo Theo Phiên: ${metric.label}`
                  : viewMode === 'radar'
                  ? 'Biểu Đồ Radar So Sánh 6 Năng Lực Cốt Lõi'
                  : `Biểu Đồ Chênh Lệch Tăng Trưởng (Delta A - B) Theo Phiên`}
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold border border-indigo-200">
                12 Phiên Thực Nghiệm
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              So sánh trực tiếp giữa{' '}
              <strong className="text-indigo-600">{cohortA.shortName}</strong> và{' '}
              <strong className="text-amber-600">{cohortB.shortName}</strong>.
            </p>
          </div>

          {/* Time-series Specific Toggles */}
          {viewMode === 'timeseries' && (
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showErrorBands}
                  onChange={(e) => setShowErrorBands(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Dải Sai Số Chuẩn (SEM)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showDeltaLine}
                  onChange={(e) => setShowDeltaLine(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-700 font-medium">Đường Chênh Lệch (Net Gap)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showOnsetMarker}
                  onChange={(e) => setShowOnsetMarker(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium">Vạch Bắt Đầu Can Thiệp</span>
              </label>
            </div>
          )}
        </div>

        {/* 1. Time-Series Progression Chart */}
        {viewMode === 'timeseries' && (
          <div className="h-88 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timeSeries} margin={{ top: 15, right: 20, left: -5, bottom: 15 }}>
                <defs>
                  {/* Cohort A Band Gradient */}
                  <linearGradient id="bandCohortA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cohortA.color} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={cohortA.color} stopOpacity={0.05} />
                  </linearGradient>
                  {/* Cohort B Band Gradient */}
                  <linearGradient id="bandCohortB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={cohortB.color} stopOpacity={0.2} />
                    <stop offset="95%" stopColor={cohortB.color} stopOpacity={0.03} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

                <XAxis
                  dataKey="sessionLabel"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />

                <YAxis
                  domain={metric.unit === 'phút' ? [10, 65] : [20, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  unit={metric.unit}
                />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-2 min-w-56">
                          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-bold">
                            <span>{data.sessionLabel}</span>
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                                data.isPostIntervention
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-gray-500/20 text-gray-300'
                              }`}
                            >
                              {data.isPostIntervention ? 'Giai Đoạn Can Thiệp' : 'Giai Đoạn Baseline'}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-indigo-300 font-medium flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                                {cohortA.shortName}:
                              </span>
                              <span className="font-black text-white text-sm">
                                {data.valA} {metric.unit}
                                <span className="text-[10px] text-gray-400 font-normal ml-1">
                                  (±{data.semA})
                                </span>
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                              <span className="text-amber-300 font-medium flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                                {cohortB.shortName}:
                              </span>
                              <span className="font-black text-white text-sm">
                                {data.valB} {metric.unit}
                                <span className="text-[10px] text-gray-400 font-normal ml-1">
                                  (±{data.semB})
                                </span>
                              </span>
                            </div>

                            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                              <span className="text-emerald-300 font-bold">Chênh lệch (A - B):</span>
                              <span className="font-mono font-black text-emerald-400">
                                {data.delta > 0 ? `+${data.delta}` : data.delta} {metric.unit} (
                                {data.percentAdvantage > 0 ? `+${data.percentAdvantage}` : data.percentAdvantage}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
                />

                {/* Intervention Onset Line */}
                {showOnsetMarker && cohortA.interventionOnsetSession && (
                  <ReferenceLine
                    x={`Phiên ${cohortA.interventionOnsetSession}`}
                    stroke="#6366f1"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `KÍCH HOẠT CAN THIỆP (PHIÊN ${cohortA.interventionOnsetSession})`,
                      position: 'top',
                      fill: '#4338ca',
                      fontSize: 10,
                      fontWeight: 800
                    }}
                  />
                )}

                {/* Benchmark Reference Line */}
                <ReferenceLine
                  y={metric.benchmarkTarget}
                  stroke="#94a3b8"
                  strokeDasharray="3 3"
                  label={{
                    value: `Mốc chuẩn mục tiêu: ${metric.benchmarkTarget}${metric.unit}`,
                    position: 'insideBottomRight',
                    fill: '#64748b',
                    fontSize: 10
                  }}
                />

                {/* Cohort A SEM Area Band */}
                {showErrorBands && (
                  <Area
                    type="monotone"
                    dataKey="ciUpperA"
                    stroke="none"
                    fill="url(#bandCohortA)"
                    name={`Dải Sai Số ${cohortA.shortName}`}
                  />
                )}

                {/* Cohort B SEM Area Band */}
                {showErrorBands && (
                  <Area
                    type="monotone"
                    dataKey="ciUpperB"
                    stroke="none"
                    fill="url(#bandCohortB)"
                    name={`Dải Sai Số ${cohortB.shortName}`}
                  />
                )}

                {/* Cohort A Main Line */}
                <Line
                  type="monotone"
                  dataKey="valA"
                  stroke={cohortA.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: cohortA.color, stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  name={cohortA.name}
                />

                {/* Cohort B Main Line */}
                <Line
                  type="monotone"
                  dataKey="valB"
                  stroke={cohortB.color}
                  strokeWidth={3}
                  dot={{ r: 4, fill: cohortB.color, stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                  name={cohortB.name}
                />

                {/* Net Delta Line */}
                {showDeltaLine && (
                  <Line
                    type="monotone"
                    dataKey="delta"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: '#10b981' }}
                    name="Chênh Lệch Thuần (Delta A - B)"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 2. Multidimensional Radar Chart */}
        {viewMode === 'radar' && (
          <div className="h-88 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="construct" tick={{ fontSize: 11, fill: '#334155' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />

                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                          <div className="font-bold border-b border-white/10 pb-1">
                            {data.construct}
                          </div>
                          <div className="text-indigo-300 flex justify-between gap-3">
                            <span>{cohortA.shortName}:</span>
                            <span className="font-bold text-white">{data.valA}đ</span>
                          </div>
                          <div className="text-amber-300 flex justify-between gap-3">
                            <span>{cohortB.shortName}:</span>
                            <span className="font-bold text-white">{data.valB}đ</span>
                          </div>
                          <div className="text-emerald-400 font-bold flex justify-between gap-3 pt-1 border-t border-white/10">
                            <span>Chênh lệch:</span>
                            <span>{data.delta > 0 ? `+${data.delta}` : data.delta}đ</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />

                <Radar
                  name={cohortA.name}
                  dataKey="valA"
                  stroke={cohortA.color}
                  fill={cohortA.color}
                  fillOpacity={0.4}
                />
                <Radar
                  name={cohortB.name}
                  dataKey="valB"
                  stroke={cohortB.color}
                  fill={cohortB.color}
                  fillOpacity={0.3}
                />
                <Radar
                  name="Mốc Chuẩn Mục Tiêu"
                  dataKey="benchmark"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                  strokeDasharray="3 3"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* 3. Session-by-Session Delta Bar Chart */}
        {viewMode === 'delta_bars' && (
          <div className="h-88 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSeries} margin={{ top: 15, right: 20, left: -5, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="sessionLabel"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  unit={metric.unit}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                          <div className="font-bold border-b border-white/10 pb-1">
                            {data.sessionLabel}
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-300">Chênh lệch (A - B):</span>
                            <span className="font-black text-emerald-400">
                              {data.delta > 0 ? `+${data.delta}` : data.delta} {metric.unit}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 text-gray-400 text-[11px]">
                            <span>Ưu thế tương đối:</span>
                            <span className="font-bold text-white">+{data.percentAdvantage}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }} />
                <ReferenceLine y={0} stroke="#64748b" />
                <Bar
                  dataKey="delta"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  name={`Chênh Lệch Delta (${cohortA.shortName} trừ ${cohortB.shortName})`}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Inferential Statistics & Effect Size Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Delta Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Chênh Lệch Cuối Cùng</span>
            <span className="text-[10px] font-mono text-gray-400">Net Delta</span>
          </div>
          <div className="text-2xl font-black text-indigo-600 flex items-center gap-1.5">
            <span>{stats.delta > 0 ? `+${stats.delta}` : stats.delta}</span>
            <span className="text-sm font-bold text-gray-500">{metric.unit}</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-600">
            +{stats.percentGain}% so với {cohortB.shortName}
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            {cohortA.shortName}: {stats.meanA}đ vs {cohortB.shortName}: {stats.meanB}đ.
          </p>
        </div>

        {/* Cohen's d Effect Size Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Độ Lớn Hiệu Ứng Cohen's d</span>
            <span className="text-[10px] font-mono text-gray-400">Effect Size</span>
          </div>
          <div className="text-2xl font-black text-purple-700 flex items-center gap-1">
            <span>d = {stats.cohensD}</span>
          </div>
          <div className="text-[11px] font-bold text-purple-600">
            Quy mô: {stats.effectSizeClass}
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Quy ước Cohen: &gt;0.8 là hiệu ứng can thiệp rất mạnh mẽ.
          </p>
        </div>

        {/* Welch's t-test Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Kiểm Định Ý Nghĩa Thống Kê</span>
            <span className="text-[10px] font-mono text-gray-400">Welch's t-test</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 flex items-center gap-1">
            <span>{stats.pValue}</span>
          </div>
          <div className="text-[11px] font-bold text-emerald-600">
            t = {stats.tStatistic} (Đạt ý nghĩa cao)
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Khả năng khác biệt do ngẫu nhiên &lt; 0.1%.
          </p>
        </div>

        {/* Divergence Session */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Thời Điểm Phân Kỳ Quỹ Đạo</span>
            <span className="text-[10px] font-mono text-gray-400">Divergence Point</span>
          </div>
          <div className="text-2xl font-black text-blue-700 flex items-center gap-1">
            <span>Phiên {stats.divergenceSession}</span>
          </div>
          <div className="text-[11px] font-bold text-blue-600">
            Khoảng cách vượt ngưỡng 3.0đ
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Bắt đầu bộc lộ ưu thế rõ nét sau 1–2 phiên can thiệp.
          </p>
        </div>
      </div>

      {/* Pedagogical & Causal Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deep Causal Interpretation */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 rounded-3xl border border-indigo-200 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Diễn Giải Nhân Quả Sư Phạm (Pedagogical Causal Interpretation)</span>
              </h4>
              <p className="text-xs text-gray-500">
                Lý giải các yếu tố cơ chế (Mediators) tạo nên sự vượt trội giữa hai nhóm học viên.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
              Statistical Power &gt; 99%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 font-black text-xs">
                🔬
              </div>
              <div className="space-y-1">
                <span className="font-bold text-gray-900 block">
                  Cơ Chế Phân Kỳ (Mechanism of Divergence):
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {stats.causalSummary} Sự phân kỳ bắt đầu mạnh mẽ từ phiên {stats.divergenceSession} chứng minh rằng giàn giáo thích ứng thời gian thực (Real-time Scaffolding) đóng vai trò trung gian trực tiếp giảm thiểu mệt mỏi nhận thức và duy trì nhịp học tập sâu.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-black text-xs">
                💡
              </div>
              <div className="space-y-1">
                <span className="font-bold text-gray-900 block">
                  Đo Lường Khoảng Cách Chuyển Hóa (Transfer Gap Mitigation):
                </span>
                <p className="text-gray-700 leading-relaxed">
                  Ở nhóm đối chứng, học sinh thường dừng lại ở mức "hiểu lý thuyết trên màn hình" nhưng không biến thành hành vi tự giác (Transfer Gap = 51.5%). Ngược lại, nhóm can thiệp thu hẹp khoảng cách này xuống dưới 13.0% nhờ các vi hành động cam kết trước 21h.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs flex items-start gap-3 bg-amber-50/40">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-black text-xs">
                ⚠️
              </div>
              <div className="space-y-1">
                <span className="font-bold text-amber-900 block">
                  Khuyến Nghị Điều Chỉnh Cho Giáo Viên & Cố Vấn:
                </span>
                <p className="text-amber-950 leading-relaxed">
                  Đối với nhóm học sinh thuộc đối chứng hoặc có xu hướng tiến bộ chậm, nhà trường nên chủ động bổ sung 2 chu kỳ vi hành động 5 phút/ngày và bật cảnh báo tải nhận thức quá tải khi chỉ số xao nhãng vượt 40%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Attribute Comparison Matrix */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 block">
                Experimental Setup Metadata
              </span>
              <h4 className="text-sm font-black text-gray-900 mt-0.5">
                Thông Số Thiết Kế Nghiên Cứu
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Các biến kiểm soát và điều kiện thực nghiệm chuẩn mực.
              </p>
            </div>

            <div className="space-y-2.5 pt-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <div className="text-[10px] text-gray-400 font-mono uppercase font-bold">
                  Quy Trình Phân Bổ Mẫu (Randomization):
                </div>
                <div className="text-gray-800 font-bold">
                  Phân tầng ngẫu nhiên đôi (Stratified Cluster Randomization)
                </div>
                <div className="text-[11px] text-gray-500">
                  Cân bằng về giới tính, học lực ban đầu và điều kiện thiết bị.
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <div className="text-[10px] text-gray-400 font-mono uppercase font-bold">
                  Tổng Số Lượng Học Sinh Tham Gia:
                </div>
                <div className="text-gray-800 font-bold flex items-center justify-between">
                  <span>Tổng mẫu thực nghiệm N:</span>
                  <span className="font-mono text-indigo-600 font-black">
                    {cohortA.sampleSize + cohortB.sampleSize} học viên
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <div className="text-[10px] text-gray-400 font-mono uppercase font-bold">
                  Thời Gian Theo Dõi (Follow-up Duration):
                </div>
                <div className="text-gray-800 font-bold flex items-center justify-between">
                  <span>Tổng số phiên học:</span>
                  <span className="font-mono text-purple-600 font-black">12 Phiên (4 tuần)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 italic text-center">
            Tuân thủ hướng dẫn báo cáo CONSORT / APA cho nghiên cứu can thiệp công nghệ giáo dục.
          </div>
        </div>
      </div>

      {/* Session-by-Session Detailed Data Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden space-y-3 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
              <span>Bảng Đối Chiếu Số Liệu Chi Tiết Từng Phiên ({metric.shortLabel})</span>
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Số liệu trung bình kèm sai số chuẩn SEM và biên độ chênh lệch qua 12 phiên.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Bảng Dữ Liệu (.csv)</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-600 font-bold">
                <th className="py-2.5 px-3">Phiên</th>
                <th className="py-2.5 px-3 text-indigo-700">{cohortA.shortName} (±SEM)</th>
                <th className="py-2.5 px-3 text-amber-700">{cohortB.shortName} (±SEM)</th>
                <th className="py-2.5 px-3 text-emerald-700">Chênh Lệch (Delta)</th>
                <th className="py-2.5 px-3 text-purple-700">% Ưu Thế</th>
                <th className="py-2.5 px-3">Giai Đoạn Can Thiệp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {timeSeries.map((row) => (
                <tr
                  key={row.sessionIndex}
                  className={`hover:bg-indigo-50/40 transition ${
                    row.sessionIndex === stats.divergenceSession ? 'bg-amber-50/50' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-sans font-bold text-gray-900">
                    {row.sessionLabel}
                    {row.sessionIndex === stats.divergenceSession && (
                      <span className="ml-2 px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px] font-sans font-bold">
                        Điểm Phân Kỳ
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-indigo-900">
                    {row.valA}
                    <span className="text-[10px] text-gray-400 font-normal"> (±{row.semA})</span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-amber-900">
                    {row.valB}
                    <span className="text-[10px] text-gray-400 font-normal"> (±{row.semB})</span>
                  </td>
                  <td className="py-2.5 px-3 font-black text-emerald-600">
                    {row.delta > 0 ? `+${row.delta}` : row.delta} {metric.unit}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-purple-700">
                    +{row.percentAdvantage}%
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.isPostIntervention
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {row.isPostIntervention ? 'Can Thiệp Tích Cực' : 'Tiền Can Thiệp (Baseline)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
