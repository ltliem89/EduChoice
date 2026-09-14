import React, { useState } from 'react';
import {
  ShieldAlert,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Archive,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import {
  DEFAULT_MEI_LADDER,
  DEFAULT_SELF_CRITIQUES,
  DEFAULT_TRANSFER_METRICS,
  DEFAULT_FAILURE_MEMORIES
} from '../../../data/v7FusionData';
import { MinimumEffectiveIntervention, SelfCritiqueRecord, TransferGapMetric } from '../../../types';

export const DecisionRobustnessView: React.FC = () => {
  const [selectedLadderLevel, setSelectedLadderLevel] = useState<number>(1);
  const [selectedCritique] = useState<SelfCritiqueRecord>(DEFAULT_SELF_CRITIQUES[0]);

  const activeLadderItem = DEFAULT_MEI_LADDER.find((l) => l.level === selectedLadderLevel) || DEFAULT_MEI_LADDER[1];

  return (
    <div className="space-y-6">
      {/* Top Banner: Decision Robustness & Minimum Effective Intervention */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-indigo-900/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-400/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                V7 Robust Decision & MEI
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Master Spec V7 • Section 7.16 - 7.30
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Thang Can Thiệp Tối Thiểu (MEI) & Tự Phê Phán Quyết Định
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Nguyên tắc vàng V7: <strong>"Can thiệp nhỏ nhất mang lại hiệu quả cao nhất" (Minimum Effective Intervention)</strong>. Hệ thống tự chất vấn các giả định ngầm, đo lường độ bền vững trước rủi ro và theo dõi khoảng cách chuyển hóa kỹ năng ra đời thực (Transfer Gap).
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs flex items-center gap-4 text-center shrink-0">
            <div>
              <span className="text-2xl font-black text-emerald-400 block">7 Bậc</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Thang MEI L0-L6</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-black text-indigo-400 block">0.88</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Độ bền vững</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-black text-purple-400 block">3 Lĩnh vực</span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Transfer Gap</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: MINIMUM EFFECTIVE INTERVENTION (MEI) LADDER */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                Thang Bậc Can Thiệp Tối Thiểu (MEI Ladder L0 &rarr; L6)
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Minimum Effective Intervention
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Ưu tiên can thiệp liều lượng nhỏ nhất trước; chỉ leo thang khi có bằng chứng và tự động hạ nhiệt sau khi học sinh ổn định.
              </p>
            </div>
          </div>

          <span className="text-xs text-gray-400 font-mono">
            Đang chọn: <strong>Bậc L{selectedLadderLevel}</strong>
          </span>
        </div>

        {/* Step Ladder Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {DEFAULT_MEI_LADDER.map((item) => {
            const isSelected = item.level === selectedLadderLevel;
            return (
              <div
                key={item.level}
                onClick={() => setSelectedLadderLevel(item.level)}
                className={`p-3 rounded-2xl border text-center transition cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform -translate-y-0.5'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase">
                  BẬC L{item.level}
                </div>
                <div className="text-xs font-bold truncate">
                  {item.title.split(':')[1]?.trim() || item.title}
                </div>
                <div className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                  {item.durationMinutes === 0 ? '0 phút' : `${item.durationMinutes} phút`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Ladder Detail Panel */}
        <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-xs font-mono">
                  {activeLadderItem.levelCode}
                </span>
                <h4 className="text-base font-bold text-gray-900">
                  {activeLadderItem.title}
                </h4>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {activeLadderItem.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 shadow-2xs">
                {activeLadderItem.intensityLabel}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 shadow-2xs">
                Độ khả hồi: {activeLadderItem.reversibility === 'HIGH' ? 'Rất cao (An toàn)' : 'Trung bình'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-amber-800 text-[11px] flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                Điều kiện leo thang can thiệp (Escalation Trigger):
              </span>
              <p className="text-gray-600 leading-relaxed">
                {activeLadderItem.escalationCondition}
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-emerald-800 text-[11px] flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                Điều kiện hạ nhiệt / lùi bước (De-escalation Trigger):
              </span>
              <p className="text-gray-600 leading-relaxed">
                {activeLadderItem.deescalationCondition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: SELF-CRITIQUE ENGINE & DECISION ROBUSTNESS */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              Bộ Tự Phê Phán & Kiểm Thử Độ Nhạy Quyết Định (Self-Critique & Robustness)
              <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Master Spec V7.28
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              Trước khi phân phối can thiệp, hệ thống bắt buộc tự chất vấn: "Tôi đang giả định điều gì? Có bằng chứng nào phản biện? Rủi ro gì nếu tôi sai?"
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/80 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                Quyết định đang xem xét
              </span>
              <h4 className="text-sm font-bold text-gray-900 mt-1">
                {selectedCritique.proposedAction}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">
                Điểm Bền Vững: {Math.round(selectedCritique.robustnessScore * 100)}/100 (ROBUST)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assumptions */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-gray-800 text-[11px] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                Giả định ngầm đang dựa vào (Assumptions):
              </span>
              <ul className="space-y-1 text-gray-600 pl-4 list-disc text-[11.5px]">
                {selectedCritique.assumptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Counter-Evidence */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-rose-800 text-[11px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                Bằng chứng đi ngược lại (Counter-Evidence):
              </span>
              <ul className="space-y-1 text-gray-600 pl-4 list-disc text-[11.5px]">
                {selectedCritique.counterEvidence.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Unknowns */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-amber-800 text-[11px] flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Dữ liệu còn thiếu / chưa biết (Unknowns):
              </span>
              <ul className="space-y-1 text-gray-600 pl-4 list-disc text-[11.5px]">
                {selectedCritique.unknowns.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Sensitivity Factors */}
            <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-purple-800 text-[11px] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-purple-600" />
                Yếu tố nhạy cảm làm đảo chiều quyết định (Sensitivity):
              </span>
              <ul className="space-y-1 text-gray-600 pl-4 list-disc text-[11.5px]">
                {selectedCritique.sensitivityFactors.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Safety & Fallback Box */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Phương án thay thế an toàn và khả hồi (Safer Reversible Option):</span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-emerald-900">
              {selectedCritique.saferReversibleAlternative}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: TRANSFER GAP INTELLIGENCE & FAILURE MEMORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Gap Tracker */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Activity className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-gray-900">
              Khoảng Cách Chuyển Hóa Ra Đời Thực (Transfer Gap Tracker)
            </h3>
          </div>

          <p className="text-xs text-gray-500">
            Đo lường mức độ chuyển giao: Thành công trong game mô phỏng có thực sự trở thành thói quen ngoài đời thực hay chỉ dừng lại ở màn hình?
          </p>

          <div className="space-y-3">
            {DEFAULT_TRANSFER_METRICS.map((item) => {
              const isHigh = item.transferStatus === 'HIGH_TRANSFER';
              const isBarrier = item.transferStatus === 'TRANSFER_BARRIER';
              return (
                <div
                  key={item.metricId}
                  className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{item.domain}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isHigh
                        ? 'bg-emerald-100 text-emerald-800'
                        : isBarrier
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isHigh ? 'Chuyển hóa cao' : isBarrier ? 'Rào cản chuyển hóa' : 'Chuyển hóa vừa'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-white p-2 rounded-lg border border-gray-200 text-center">
                      <span className="text-gray-400 block text-[10px]">Thành công trong Game</span>
                      <span className="font-bold text-indigo-600 text-sm">
                        {Math.round(item.gameSuccessRate * 100)}%
                      </span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-200 text-center">
                      <span className="text-gray-400 block text-[10px]">Chuyển hóa Đời thực</span>
                      <span className="font-bold text-emerald-600 text-sm">
                        {Math.round(item.realWorldTransferRate * 100)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-600 italic">
                    {item.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Failure Memory & Meta-Adaptation Registry */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Archive className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-gray-900">
              Bộ Nhớ Thất Bại & Bài Học Ngăn Ngừa Lặp Lỗi (Failure Memory)
            </h3>
          </div>

          <p className="text-xs text-gray-500">
            Hệ thống ghi nhớ các can thiệp từng thất bại để không bao giờ lặp lại cùng một sai lầm đối với học sinh.
          </p>

          <div className="space-y-3">
            {DEFAULT_FAILURE_MEMORIES.map((fail) => (
              <div
                key={fail.memoryId}
                className="p-3.5 rounded-2xl border border-rose-100 bg-rose-50/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950 text-xs">
                    Can thiệp: {fail.interventionAttempted}
                  </span>
                  <span className="text-[10px] font-mono text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    Thất bại đã ghi nhận
                  </span>
                </div>

                <div className="text-[11.5px] text-gray-700 space-y-1">
                  <p>
                    <strong>Nguyên nhân thất bại:</strong> {fail.failureReason}
                  </p>
                  <p className="text-emerald-900 bg-white p-2 rounded-lg border border-emerald-200">
                    <strong>Bài học rút ra:</strong> {fail.lessonLearned}
                  </p>
                </div>

                <div className="text-[10.5px] font-mono text-gray-500 pt-1">
                  Ràng buộc vĩnh viễn: {fail.preventativeConstraint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
