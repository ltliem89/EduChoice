import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  GitCommit,
  AlertTriangle,
  Clock,
  Compass,
  Zap,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { DEFAULT_SUPER_ANALYTICS } from '../../../data/v6IntelligenceData';
import { SuperAnalyticsMetrics } from '../../../types';

export const SuperAnalyticsView: React.FC = () => {
  const [metrics] = useState<SuperAnalyticsMetrics>(DEFAULT_SUPER_ANALYTICS);
  const [activeLevel, setActiveLevel] = useState<number>(1);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-3xl shadow-lg border border-indigo-900/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 text-blue-200 text-[10px] font-bold uppercase tracking-wider border border-blue-400/30">
              Master Spec V6 • Section V6.14 - V6.19
            </span>
            <span className="text-xs text-blue-300 font-mono">7-Level Analytics Pipeline & Trajectory G(t)</span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-white">
            Động Cơ Siêu Phân Tích Dữ Liệu Hành Vi (Super Analytics Engine)
          </h2>
          <p className="text-xs text-blue-200/80 max-w-3xl leading-relaxed">
            Hệ thống phân tích 7 cấp độ chuyển tiếp từ mô tả cơ bản (Descriptive) qua chuỗi hành vi Markov (Sequential), ước lượng nhân quả (Causal), dự báo rủi ro bỏ cuộc (Predictive) đến khuyến nghị chính sách thích ứng có ràng buộc (Prescriptive).
          </p>
        </div>

        {/* 7 Levels Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 text-xs">
          {[
            { lvl: 1, title: 'L1: Mô Tả' },
            { lvl: 2, title: 'L2: Hành Vi' },
            { lvl: 3, title: 'L3: Thời Gian' },
            { lvl: 4, title: 'L4: Chuỗi Markov' },
            { lvl: 5, title: 'L5: Nhân Quả' },
            { lvl: 6, title: 'L6: Dự Báo' },
            { lvl: 7, title: 'L7: Đề Xuất' }
          ].map((item) => (
            <button
              key={item.lvl}
              onClick={() => setActiveLevel(item.lvl)}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeLevel === item.lvl
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white/10 text-blue-200 hover:text-white'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* LEVEL 1: DESCRIPTIVE */}
      {activeLevel === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 block">Tổng số phiên</span>
              <span className="text-2xl font-black text-gray-900">{metrics.level1Descriptive.totalSessions}</span>
              <span className="text-[10px] text-emerald-600 block">↑ 12% so với tuần trước</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 block">Tỉ lệ hoàn thành</span>
              <span className="text-2xl font-black text-emerald-600">{metrics.level1Descriptive.completionRate}%</span>
              <span className="text-[10px] text-gray-400 block">Duy trì mức tối ưu</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 block">Thời lượng TB/phiên</span>
              <span className="text-2xl font-black text-indigo-600">{metrics.level1Descriptive.meanSessionDurationSeconds}s</span>
              <span className="text-[10px] text-gray-400 block">~ 3.3 phút chuẩn micro</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 block">Số quyết định/phiên</span>
              <span className="text-2xl font-black text-purple-600">{metrics.level1Descriptive.medianDecisionsPerSession}</span>
              <span className="text-[10px] text-gray-400 block">Median vững chắc</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs">
              <span className="text-[11px] text-gray-500 block">Lựa chọn đã ghi nhận</span>
              <span className="text-2xl font-black text-amber-600">{metrics.level1Descriptive.totalChoicesLogged}</span>
              <span className="text-[10px] text-gray-400 block">100% hợp lệ telemetry</span>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: BEHAVIORAL */}
      {activeLevel === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Đặc Trưng Hành Vi Ra Quyết Định (Behavioral Signatures)
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Số lần thử lại tự nguyện trung bình:</span>
                <span className="font-mono font-bold text-indigo-600 text-sm">
                  {metrics.level2Behavioral.meanRetryAttempts} lượt/phiên
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Ngưỡng suy nghĩ trước khi bỏ cuộc (Abandonment threshold):</span>
                <span className="font-mono font-bold text-rose-600 text-sm">
                  {metrics.level2Behavioral.abandonmentThresholdSeconds} giây
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Tỉ lệ lựa chọn bốc đồng (Impulsive choices &lt; 3s):</span>
                <span className="font-mono font-bold text-amber-600 text-sm">
                  {Math.round(metrics.level2Behavioral.impulsiveChoiceRatio * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Tỉ lệ trả lời phản tư sau kết quả:</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">
                  {metrics.level2Behavioral.reflectionCompletionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Động Lực Tự Thân & Chơi Lại (Voluntary Replay)
            </h3>
            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 text-xs space-y-2">
              <span className="text-indigo-950 font-bold block">
                Chỉ số Replay tự nguyện đạt {Math.round(metrics.level2Behavioral.voluntaryReplayRatio * 100)}%
              </span>
              <p className="text-gray-600 leading-relaxed">
                Học sinh chủ động chọn chơi lại để thử các phương án khác nhau mà không hề bị hệ thống bắt buộc, chứng minh tính hấp dẫn của tình huống và tâm lý cầu tiến học hỏi từ sai sót.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 3: TEMPORAL */}
      {activeLevel === 3 && (
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Phân Bố Thời Gian & Cửa Sổ Cuộn (Rolling Windows: 24h, 7d, 14d, 30d)
              </h3>
              <p className="text-xs text-gray-500">Khung giờ hoạt động đạt đỉnh: {metrics.level3Temporal.peakHours}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <span className="text-gray-500 block">Học sinh tích cực (24h)</span>
              <span className="text-xl font-black text-indigo-600 mt-1 block">
                {metrics.level3Temporal.rolling24hActiveStudents} bạn
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <span className="text-gray-500 block">Duy trì thói quen (7d)</span>
              <span className="text-xl font-black text-emerald-600 mt-1 block">
                {metrics.level3Temporal.rolling7dRetentionRate}%
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <span className="text-gray-500 block">Tốc độ học hỏi (14d)</span>
              <span className="text-xl font-black text-purple-600 mt-1 block">
                +{metrics.level3Temporal.rolling14dLearningVelocity} pt/tuần
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
              <span className="text-gray-500 block">Độ bền kỹ năng (30d)</span>
              <span className="text-xl font-black text-amber-600 mt-1 block">
                {Math.round(metrics.level3Temporal.rolling30dSkillSustainability * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 4: SEQUENTIAL MARKOV */}
      {activeLevel === 4 && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Ma Trận Chuyển Trạng Thái Markov (Markov Transition Probabilities)
                </h3>
                <p className="text-xs text-gray-500">Độ hỗn loạn chuỗi hành vi (Markov Entropy): {metrics.level4Sequential.markovEntropy}</p>
              </div>
            </div>

            <div className="space-y-2">
              {metrics.level4Sequential.stateTransitionMatrix.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gray-800">{item.fromState}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-mono font-bold text-indigo-700">{item.toState}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-28 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.probability * 100}%` }} />
                    </div>
                    <span className="font-mono font-bold text-gray-900 text-xs w-12 text-right">
                      {Math.round(item.probability * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2">
              <span className="font-bold text-emerald-950 block uppercase">
                Chuỗi Thành Công Thống Trị (Dominant Success Pathway):
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-emerald-900">
                {metrics.level4Sequential.dominantSuccessPathway.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-2xl space-y-2">
              <span className="font-bold text-rose-950 block uppercase">
                Chuỗi Rủi Ro Bỏ Cuộc (Dominant Dropout Pathway):
              </span>
              <ol className="list-decimal pl-4 space-y-1 text-rose-900">
                {metrics.level4Sequential.dominantDropoutPathway.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 5: CAUSAL */}
      {activeLevel === 5 && (
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Ước Lượng Tác Động Nhân Quả & Transfer Gap (Causal Inference)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <span className="text-gray-500 block">Kích thước hiệu ứng ATE (Cohen d)</span>
              <span className="text-2xl font-black text-indigo-700 mt-1 block">
                {metrics.level5Causal.averageTreatmentEffect}
              </span>
              <span className="text-[10px] text-gray-500 block font-mono">
                95% CI: [{metrics.level5Causal.confidenceInterval[0]}, {metrics.level5Causal.confidenceInterval[1]}]
              </span>
            </div>

            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <span className="text-gray-500 block">Độ lệch chuyển hóa (Transfer Gap)</span>
              <span className="text-2xl font-black text-amber-600 mt-1 block">
                {Math.round(metrics.level5Causal.transferGapToHomework * 100)}%
              </span>
              <span className="text-[10px] text-gray-500 block">Khoảng cách từ game sang bài tập</span>
            </div>

            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <span className="text-gray-500 block">Mức độ tuân thủ can thiệp (Compliance)</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {Math.round(metrics.level5Causal.complianceScore * 100)}%
              </span>
              <span className="text-[10px] text-gray-500 block">Học sinh hoàn thành trọn vẹn</span>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 6: PREDICTIVE */}
      {activeLevel === 6 && (
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Mô Hình Dự Báo Rủi Ro & Vector Quỹ Đạo Năng Lực G(t)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-500 block">Nguy cơ bỏ cuộc phiên tiếp theo (Hazard rate)</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                {Math.round(metrics.level6Predictive.hazardRateNextAbandonment * 100)}%
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">Nguy cơ rất thấp</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-500 block">Hành động khả dĩ tiếp theo</span>
              <span className="text-sm font-bold text-gray-900 mt-2 block">
                {metrics.level6Predictive.nextLikelyAction}
              </span>
              <span className="text-[10px] text-indigo-600 block">Xác suất 82%</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="text-gray-500 block">Độ dốc tăng trưởng quỹ đạo G(t)</span>
              <span className="text-2xl font-black text-purple-600 mt-1 block">
                +{metrics.level6Predictive.trajectoryGrowthRate}
              </span>
              <span className="text-[10px] text-gray-400 block">Xu hướng đi lên vững chắc</span>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 7: PRESCRIPTIVE */}
      {activeLevel === 7 && (
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Khuyến Nghị Can Thiệp Có Ràng Buộc (Constrained Prescriptive Policy)
          </h3>
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs space-y-2">
            <span className="font-bold text-blue-950 block">Chính Sách Tối Ưu Được Đề Xuất:</span>
            <p className="text-blue-900 font-semibold">{metrics.level7Prescriptive.optimalPolicyUnderBudget}</p>
            <p className="text-gray-600">{metrics.level7Prescriptive.tradeoffNotes}</p>
          </div>
        </div>
      )}

      {/* CHANGE POINT DETECTION & ANOMALIES (V6.17, V6.25) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Change Points */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Điểm Chuyển Đổi Hành Vi (Change-Point Detection)
            </h4>
            <span className="text-[10px] font-mono text-gray-400">Bayesian & CUSUM</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {metrics.changePoints.map((cp) => (
              <div key={cp.id} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-indigo-900">{cp.construct}</span>
                  <span className="font-mono font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    {cp.magnitudeDelta > 0 ? `+${cp.magnitudeDelta}` : cp.magnitudeDelta} pt
                  </span>
                </div>
                <p className="text-gray-600 text-[11px]">{cp.notes}</p>
                <span className="text-[10px] text-gray-400 font-mono block">Phương pháp: {cp.method}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Anomalies */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Giám Sát Dị Thường (Anomaly Intelligence)
            </h4>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">Hệ thống an toàn</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {metrics.anomalies.map((anom) => (
              <div key={anom.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">{anom.type}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase bg-amber-200 text-amber-900">
                    Mức {anom.severity}
                  </span>
                </div>
                <p className="text-gray-700 text-[11px]">{anom.details}</p>
                <span className="text-[10px] text-emerald-700 font-semibold block">
                  Xử lý: {anom.actionTaken}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
