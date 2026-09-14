import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Brain,
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ShieldAlert,
  Zap,
  Target,
  FileSpreadsheet,
  RefreshCw,
  Eye,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from 'recharts';
import {
  getConstructTimeSeriesData,
  fitLinearRegression,
  fitPolynomialRegression,
  fitHoltWinters,
  MLModelType,
  ForecastPoint,
  ModelMetrics
} from '../../../utils/mlForecasting';
import { useApp } from '../../../context/AppContext';
import { SoundEngine } from '../../../utils/soundEffects';

interface ConstructOption {
  key: string;
  label: string;
  category: string;
  description: string;
}

const CONSTRUCT_OPTIONS: ConstructOption[] = [
  {
    key: 'overall',
    label: 'Chỉ Số Kết Quả Học Tập Tổng Hợp (Overall Outcome)',
    category: 'Tổng Hợp',
    description: 'Hợp nhất từ 20 năng lực nhận thức và kết quả thực tế qua các phiên học.'
  },
  {
    key: 'Planning',
    label: 'Kỹ Năng Lập Kế Hoạch (Planning & Organization)',
    category: 'Điều Hành',
    description: 'Khả năng phân bổ thời gian, dự liệu các bước và sắp xếp ưu tiên.'
  },
  {
    key: 'Prioritization',
    label: 'Kỹ Năng Đặt Ưu Tiên (Task Prioritization)',
    category: 'Điều Hành',
    description: 'Khả năng phân biệt việc quan trọng/khẩn cấp theo ma trận Eisenhower.'
  },
  {
    key: 'Persistence',
    label: 'Tính Kiên Trì & Thử Lại (Persistence & Grit)',
    category: 'Ý Chí',
    description: 'Độ bền bỉ khi đối mặt với thử thách khó và khả năng không bỏ cuộc.'
  },
  {
    key: 'SelfRegulation',
    label: 'Tự Điều Hòa Nhận Thức (Self-Regulation)',
    category: 'Cảm Xúc',
    description: 'Kiểm soát bốc đồng và duy trì kỷ luật tự giác trong giờ học.'
  },
  {
    key: 'DistractionRecovery',
    label: 'Tốc Độ Phục Hồi Xao Nhãng (Distraction Recovery)',
    category: 'Chú Ý',
    description: 'Khả năng nhanh chóng quay lại nhiệm vụ chính sau khi bị phân tâm.'
  },
  {
    key: 'TaskCompletion',
    label: 'Tỷ Lệ Hoàn Thành Nhiệm Vụ (Task Completion Rate %)',
    category: 'Hành Vi',
    description: 'Tỷ lệ hoàn thành các bài tập và vi hành động được giao.'
  }
];

export const MLForecastingView: React.FC = () => {
  const { studentModel } = useApp();

  const [selectedConstruct, setSelectedConstruct] = useState<string>('overall');
  const [selectedModel, setSelectedModel] = useState<MLModelType>('linear');
  const [forecastHorizon, setForecastHorizon] = useState<number>(7);
  const [showConfidenceInterval, setShowConfidenceInterval] = useState<boolean>(true);
  const [showScenarios, setShowScenarios] = useState<boolean>(true);

  // Raw time series data
  const rawData = useMemo(() => {
    return getConstructTimeSeriesData(selectedConstruct);
  }, [selectedConstruct]);

  // Compute forecast and metrics based on selected model
  const { forecast, metrics, modelComparison } = useMemo(() => {
    let result;
    if (selectedModel === 'linear') {
      result = fitLinearRegression(rawData, forecastHorizon);
    } else if (selectedModel === 'polynomial') {
      result = fitPolynomialRegression(rawData, forecastHorizon);
    } else {
      result = fitHoltWinters(rawData, forecastHorizon);
    }

    // Comparison against other models
    const linearRes = fitLinearRegression(rawData, forecastHorizon);
    const polyRes = fitPolynomialRegression(rawData, forecastHorizon);
    const holtRes = fitHoltWinters(rawData, forecastHorizon);

    const comparison = [linearRes.metrics, polyRes.metrics, holtRes.metrics];

    return {
      forecast: result.forecast,
      metrics: result.metrics,
      modelComparison: comparison
    };
  }, [rawData, selectedModel, forecastHorizon]);

  // Find partition point (where forecast starts)
  const partitionIndex = rawData.length;
  const currentActual = rawData[rawData.length - 1].actual;
  const lastForecast = forecast[forecast.length - 1];
  const predictedEnd = lastForecast?.predicted ?? currentActual;
  const expectedDelta = Math.round((predictedEnd - currentActual) * 10) / 10;

  const handleSelectModel = (model: MLModelType) => {
    SoundEngine.playSelect();
    setSelectedModel(model);
  };

  const handleSelectConstruct = (constructKey: string) => {
    SoundEngine.playClick();
    setSelectedConstruct(constructKey);
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-black uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span>Machine Learning Analytics • Section V8.45</span>
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                Dự Báo Xu Hướng Học Tập Có Khoảng Tin Cậy 95%
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Mô Hình Học Máy Dự Báo Xu Hướng Kết Quả Học Tập</span>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </h2>
            <p className="text-xs text-indigo-200/80 max-w-3xl leading-relaxed">
              Sử dụng các thuật toán máy học suy luận chuỗi thời gian (Hồi quy Tuyến tính OLS, Đa thức Bậc 2, Làm mịn Mũ Holt) trên dữ liệu hành vi thực nghiệm của học sinh #{studentModel.userId} để dự báo quỹ đạo tiến bộ, phát hiện sớm nguy cơ chững lại và tự động đề xuất can thiệp kịp thời.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 p-2 rounded-2xl border border-white/15">
            <div className="text-right pr-2 border-r border-white/10">
              <div className="text-[10px] text-gray-300 font-bold uppercase">Hiện Tại</div>
              <div className="text-lg font-black text-white">{currentActual}đ</div>
            </div>
            <div className="text-left pl-2">
              <div className="text-[10px] text-emerald-300 font-bold uppercase">Dự Báo T+{forecastHorizon}</div>
              <div className="text-lg font-black text-emerald-400 flex items-center gap-0.5">
                <span>{predictedEnd}đ</span>
                <span className="text-xs font-mono font-normal">
                  ({expectedDelta >= 0 ? `+${expectedDelta}` : expectedDelta})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar: Metric & Horizon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-5 mt-4 border-t border-white/10 text-xs">
          {/* Construct selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-indigo-200 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Chỉ số theo dõi & dự báo:</span>
            </label>
            <select
              value={selectedConstruct}
              onChange={(e) => handleSelectConstruct(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-2 font-medium focus:bg-slate-900 focus:outline-none"
            >
              {CONSTRUCT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key} className="bg-slate-900 text-white">
                  [{opt.category}] {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Model selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-indigo-200 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mô hình học máy áp dụng:</span>
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'linear', label: 'Tuyến Tính' },
                { id: 'polynomial', label: 'Đa Thức' },
                { id: 'holt_winters', label: 'Làm Mịn Mũ' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModel(m.id as MLModelType)}
                  className={`py-2 px-1.5 rounded-xl font-bold text-center transition cursor-pointer text-[11px] ${
                    selectedModel === m.id
                      ? 'bg-white text-indigo-950 shadow-md font-black'
                      : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Forecast Horizon & Toggles */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-indigo-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Khung thời gian dự báo:</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[
                { steps: 3, label: '3 phiên' },
                { steps: 7, label: '7 phiên' },
                { steps: 14, label: '14 phiên' }
              ].map((h) => (
                <button
                  key={h.steps}
                  onClick={() => {
                    SoundEngine.playClick();
                    setForecastHorizon(h.steps);
                  }}
                  className={`flex-1 py-2 rounded-xl font-bold text-center text-[11px] transition cursor-pointer ${
                    forecastHorizon === h.steps
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Forecasting Chart Card */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-gray-900">
                Biểu Đồ Dự Báo Quỹ Đạo Học Tập & Dải Tin Cậy 95%
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-mono font-bold border border-indigo-200">
                {metrics.modelName}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Nét liền hiển thị số liệu quan sát lịch sử ({rawData.length} phiên); nét đứt biểu thị xu hướng dự phóng tương lai ({forecastHorizon} phiên tiếp theo).
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showConfidenceInterval}
                onChange={(e) => setShowConfidenceInterval(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Khoảng Tin Cậy 95%</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showScenarios}
                onChange={(e) => setShowScenarios(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700 font-medium">Kịch Bản Phản Thực Tế</span>
            </label>
          </div>
        </div>

        {/* Recharts Component */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecast} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
              <defs>
                {/* Confidence Interval Gradient */}
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
              />

              <YAxis
                domain={[30, 100]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                unit="đ"
              />

              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as ForecastPoint;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl border border-slate-700 text-xs space-y-1.5">
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-1 font-bold">
                          <span>{data.label}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{data.date}</span>
                        </div>

                        {data.actual !== undefined ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-indigo-300 font-medium">Điểm thực tế:</span>
                            <span className="font-black text-white text-sm">{data.actual}đ</span>
                          </div>
                        ) : null}

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-emerald-300 font-medium">
                            {data.isForecast ? 'Dự báo ML:' : 'Ước lượng mô hình:'}
                          </span>
                          <span className="font-black text-emerald-400 text-sm">{data.predicted}đ</span>
                        </div>

                        {showConfidenceInterval && (
                          <div className="flex items-center justify-between gap-4 text-[11px] text-gray-300">
                            <span>Khoảng 95% CI:</span>
                            <span className="font-mono">
                              [{data.lowerBound}đ - {data.upperBound}đ]
                            </span>
                          </div>
                        )}

                        {showScenarios && data.isForecast && (
                          <div className="pt-1 border-t border-white/10 text-[10px] space-y-0.5">
                            <div className="flex justify-between text-blue-300">
                              <span>+ Can thiệp tích cực:</span>
                              <span className="font-bold">{data.scenarioOptimistic}đ</span>
                            </div>
                            <div className="flex justify-between text-amber-300">
                              <span>- Không can thiệp / Ngợp:</span>
                              <span className="font-bold">{data.scenarioPessimistic}đ</span>
                            </div>
                          </div>
                        )}
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

              {/* Today Vertical Partition Line */}
              <ReferenceLine
                x={`Phiên ${partitionIndex}`}
                stroke="#64748b"
                strokeDasharray="4 4"
                label={{
                  value: 'HÔM NAY (HIỆN TẠI)',
                  position: 'top',
                  fill: '#475569',
                  fontSize: 10,
                  fontWeight: 700
                }}
              />

              {/* Confidence Interval Band */}
              {showConfidenceInterval && (
                <Area
                  type="monotone"
                  dataKey="upperBound"
                  stroke="none"
                  fill="url(#confidenceBand)"
                  name="Dải Tin Cậy 95%"
                />
              )}

              {/* Historical Actual Observed */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
                name="Thực Tế Quan Sát"
                connectNulls={false}
              />

              {/* Predicted Forecast Line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10b981"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#10b981' }}
                name="Quỹ Đạo Dự Báo ML"
              />

              {/* Scenarios */}
              {showScenarios && (
                <Line
                  type="monotone"
                  dataKey="scenarioOptimistic"
                  stroke="#38bdf8"
                  strokeWidth={1.5}
                  strokeDasharray="2 2"
                  dot={false}
                  name="Kịch Bản Tích Cực (+2 Vi Hành Động)"
                />
              )}

              {showScenarios && (
                <Line
                  type="monotone"
                  dataKey="scenarioPessimistic"
                  stroke="#f59e0b"
                  strokeWidth={1.5}
                  strokeDasharray="2 2"
                  dot={false}
                  name="Kịch Bản Thận Trọng (Xao Nhãng Tăng)"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Diagnostics & Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* R-Squared */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Độ Phù Hợp R²</span>
            <span className="text-[10px] font-mono text-gray-400">R-Squared</span>
          </div>
          <div className="text-xl font-black text-indigo-700">
            {(metrics.rSquared * 100).toFixed(1)}%
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.rSquared * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Mô hình giải thích được {(metrics.rSquared * 100).toFixed(0)}% sự biến thiên của dữ liệu.
          </p>
        </div>

        {/* RMSE */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Sai Số Toàn Phương</span>
            <span className="text-[10px] font-mono text-gray-400">RMSE</span>
          </div>
          <div className="text-xl font-black text-emerald-700">
            {metrics.rmse.toFixed(2)}đ
          </div>
          <div className="text-[10px] text-emerald-600 font-medium">
            Sai số trung bình nhỏ hơn ±{metrics.mae.toFixed(2)}đ (MAE)
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Đo lường độ lệch chuẩn giữa dự đoán và thực nghiệm.
          </p>
        </div>

        {/* Slope / Velocity */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Vận Tốc Tăng Trưởng</span>
            <span className="text-[10px] font-mono text-gray-400">Slope / Trend</span>
          </div>
          <div className="text-xl font-black text-purple-700 flex items-center gap-1">
            <span>{metrics.slope > 0 ? `+${metrics.slope}` : metrics.slope}</span>
            <span className="text-xs font-normal text-gray-500">đ/phiên</span>
          </div>
          <div className="text-[10px] text-purple-600 font-semibold">
            {metrics.direction === 'UP'
              ? 'Tăng trưởng tiến bộ'
              : metrics.direction === 'DOWN'
              ? 'Có dấu hiệu thoái lui'
              : 'Duy trì ổn định'}
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Tốc độ cải thiện năng lực qua mỗi phiên tương tác.
          </p>
        </div>

        {/* Forecast Target */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Kỳ Vọng Phiên T+{forecastHorizon}</span>
            <span className="text-[10px] font-mono text-gray-400">Target Level</span>
          </div>
          <div className="text-xl font-black text-blue-700 flex items-center gap-1">
            <span>{predictedEnd}đ</span>
            <span className="text-xs font-medium text-emerald-600">
              ({expectedDelta >= 0 ? `+${expectedDelta}` : expectedDelta}đ)
            </span>
          </div>
          <div className="text-[10px] text-blue-600 font-semibold">
            Khoảng 95%: [{lastForecast?.lowerBound}đ - {lastForecast?.upperBound}đ]
          </div>
          <p className="text-[10px] text-gray-400 pt-0.5">
            Dự báo điểm đạt được sau {forecastHorizon} phiên tiếp theo.
          </p>
        </div>
      </div>

      {/* Pedagogical Prescriptive Recommendations & Model Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pedagogical Actionable Insights */}
        <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 rounded-3xl border border-indigo-200 space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div>
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Khuyến Nghị Sư Phạm Thích Ứng Dựa Trên Dự Báo (Prescriptive Insights)</span>
              </h4>
              <p className="text-xs text-gray-500">
                AI tự động chuyển hóa kết quả dự báo học máy thành chiến lược sư phạm cụ thể cho giáo viên và cố vấn.
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
              Confidence: {(metrics.rSquared * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-black text-xs">
                🎯
              </div>
              <div className="space-y-1">
                <span className="font-bold text-gray-900 block">
                  Đánh Giá Động Lực Phát Triển Hiện Tại:
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {metrics.summary} Với tốc độ tăng trưởng hiện nay (+{metrics.slope}đ/phiên), học sinh sẽ vượt ngưỡng 75 điểm (Mức Độc Lập Hoàn Toàn) trong vòng {Math.max(1, Math.ceil((75 - currentActual) / Math.max(0.1, metrics.slope)))} phiên học tới nếu duy trì cam kết đều đặn.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-indigo-100 shadow-2xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 font-black text-xs">
                💡
              </div>
              <div className="space-y-1">
                <span className="font-bold text-gray-900 block">
                  Hành Động Can Thiệp Đề Xuất (Next Pedagogical Action):
                </span>
                <p className="text-gray-700 leading-relaxed">
                  Kích hoạt kịch bản thử thách cấp độ 3 (Level 3 Challenge) trong game Quản Lý 48 Phút; kết hợp bổ sung 2 vi hành động tự giác trước 21h để duy trì quỹ đạo tích cực và thu hẹp khoảng cách chuyển hóa (Transfer Gap).
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-amber-200 shadow-2xs flex items-start gap-3 bg-amber-50/40">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-black text-xs">
                🛡️
              </div>
              <div className="space-y-1">
                <span className="font-bold text-amber-900 block">
                  Cảnh Báo Vùng Nguy Cơ Dưới 95% Confidence Interval:
                </span>
                <p className="text-amber-950 leading-relaxed">
                  Cận dưới của khoảng tin cậy ({lastForecast?.lowerBound}đ) cho thấy nguy cơ chững lại nếu gặp kỳ thi dồn dập hoặc mệt mỏi nhận thức. Cần đảm bảo chế độ Zero-Overwhelm khi tải nhận thức vượt ngưỡng 0.65.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Model Benchmark Comparison Table */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 block">
                Model Evaluation & Benchmarking
              </span>
              <h4 className="text-sm font-black text-gray-900 mt-0.5">
                So Sánh 3 Mô Hình Học Máy
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Đánh giá mức độ khớp và sai số trên tập dữ liệu chuỗi thời gian thực tế.
              </p>
            </div>

            <div className="space-y-2.5 pt-3">
              {modelComparison.map((m, idx) => {
                const isSelected =
                  (selectedModel === 'linear' && idx === 0) ||
                  (selectedModel === 'polynomial' && idx === 1) ||
                  (selectedModel === 'holt_winters' && idx === 2);

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      const type: MLModelType = idx === 0 ? 'linear' : idx === 1 ? 'polynomial' : 'holt_winters';
                      handleSelectModel(type);
                    }}
                    className={`p-3 rounded-2xl border transition cursor-pointer text-xs space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-gray-50/70 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-[11px]">{m.modelName.split('(')[0]}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[9px] font-bold">
                          Đang Chọn
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1 text-[10px] text-gray-600 pt-0.5 font-mono">
                      <div>
                        <span className="text-gray-400 block">R²:</span>
                        <span className="font-bold text-indigo-700">{(m.rSquared * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">RMSE:</span>
                        <span className="font-bold text-emerald-700">{m.rmse.toFixed(2)}đ</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">MAE:</span>
                        <span className="font-bold text-purple-700">{m.mae.toFixed(2)}đ</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 italic text-center">
            Mô hình được huấn luyện và suy luận cục bộ (Client-Side Deterministic ML), đảm bảo quyền riêng tư tuyệt đối (Zero PII leak).
          </div>
        </div>
      </div>
    </div>
  );
};
