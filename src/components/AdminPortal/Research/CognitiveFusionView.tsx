import React, { useState } from 'react';
import {
  Radio,
  AlertTriangle,
  GitBranch,
  Layers,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  Sparkles,
  Info,
  Scale,
  Brain,
  Search,
  Activity,
  ArrowRight
} from 'lucide-react';
import {
  DEFAULT_WEAK_SIGNALS,
  DEFAULT_CONTRADICTIONS,
  DEFAULT_EVIDENCE_ITEMS,
  DEFAULT_MULTI_HYPOTHESES
} from '../../../data/v7FusionData';
import { WeakSignal, ContradictionRecord, MultiHypothesisItem } from '../../../types';

export const CognitiveFusionView: React.FC = () => {
  const [selectedSignalTab, setSelectedSignalTab] = useState<string>('all');
  const [selectedHypothesis, setSelectedHypothesis] = useState<MultiHypothesisItem>(DEFAULT_MULTI_HYPOTHESES[0]);
  const [activeContraFilter, setActiveContraFilter] = useState<string>('all');

  const filteredSignals = DEFAULT_WEAK_SIGNALS.filter((sig) => {
    if (selectedSignalTab === 'all') return true;
    return sig.classification === selectedSignalTab;
  });

  const filteredContradictions = DEFAULT_CONTRADICTIONS.filter((c) => {
    if (activeContraFilter === 'all') return true;
    return c.discrepancyType === activeContraFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Cognitive Fusion Master Spec V7 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl border border-indigo-900/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                V7 Cognitive Fusion Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Master Spec V7 • Section 7.2 - 7.10
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Tầng Trí Tuệ Hợp Nhất Nhận Thức & Tín Hiệu Yếu V7
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              V7 bổ sung năng lực quan sát các tín hiệu yếu (Weak Signals) mà con người thường bỏ sót, radar phát hiện mâu thuẫn dữ liệu đa nguồn (Contradiction Radar), và ma trận suy luận đa giả thuyết kèm kiểm chứng phản biện (Multi-Hypothesis Matrix H1..H6).
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs flex items-center gap-4 text-center shrink-0">
            <div>
              <span className="text-2xl font-black text-indigo-400 block">
                {DEFAULT_WEAK_SIGNALS.length}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Tín hiệu yếu</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-black text-amber-400 block">
                {DEFAULT_CONTRADICTIONS.length}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mâu thuẫn</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="text-2xl font-black text-emerald-400 block">
                {DEFAULT_MULTI_HYPOTHESES.length}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Giả thuyết H1-H6</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: WEAK SIGNALS DETECTOR & NOISE FILTER */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                Bộ Dò Tín Hiệu Yếu & Lọc Nhiễu Thống Kê (Weak Signal & Noise Engine)
                <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  EWMA & CUSUM Shift
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Phát hiện sớm các độ lệch hành vi vi mô trước khi biến thành sự cố học tập hoặc xao nhãng kéo dài.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'EMERGING_PATTERN', label: 'Đang nổi lên' },
              { id: 'SIGNIFICANT_CHANGE', label: 'Thay đổi rõ rệt' },
              { id: 'WEAK_SIGNAL', label: 'Tín hiệu manh nha' },
              { id: 'STABLE_PATTERN', label: 'Khuôn mẫu ổn định' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedSignalTab(f.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap ${
                  selectedSignalTab === f.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSignals.map((sig) => {
            const isHighSeverity = sig.severity === 'high';
            const isMediumSeverity = sig.severity === 'medium';
            return (
              <div
                key={sig.signalId}
                className={`p-4 rounded-2xl border transition space-y-3 ${
                  isHighSeverity
                    ? 'bg-amber-50/50 border-amber-200 ring-1 ring-amber-400/20'
                    : isMediumSeverity
                    ? 'bg-indigo-50/40 border-indigo-200'
                    : 'bg-gray-50/70 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      sig.classification === 'EMERGING_PATTERN'
                        ? 'bg-purple-100 text-purple-700'
                        : sig.classification === 'SIGNIFICANT_CHANGE'
                        ? 'bg-emerald-100 text-emerald-700'
                        : sig.classification === 'WEAK_SIGNAL'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {sig.classification}
                    </span>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      {sig.metricName}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-white px-2 py-1 rounded-lg border border-indigo-100 shadow-2xs block">
                      {sig.deviationDelta}
                    </span>
                    <span className="text-[10px] text-gray-400">Độ tin cậy: {Math.round(sig.confidence * 100)}%</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {sig.descriptionVi}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200/60 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-700">Ngữ cảnh:</span>
                    {sig.contexts.map((ctx, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded border border-gray-200 text-[10px]">
                        {ctx}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-gray-400">
                    {sig.evidenceCount} quan sát thực chứng
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: CONTRADICTION ENGINE (RADAR MÂU THUẪN) */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                Radar Phát Hiện & Hòa Giải Mâu Thuẫn Dữ Liệu (Contradiction Radar)
                <span className="text-[10px] font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  V7 Master Spec 7.8
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Tự động rà soát xung đột giữa Game vs Đời thực, Tự đánh giá vs Hành vi thực tế, và Bất đồng giữa các AI Agents.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {[
              { id: 'all', label: 'Tất cả mâu thuẫn' },
              { id: 'GAME_VS_REAL_WORLD', label: 'Game vs Đời thực' },
              { id: 'SELF_REPORT_VS_BEHAVIOR', label: 'Tự đánh giá vs Hành vi' },
              { id: 'MULTI_AGENT_CONFLICT', label: 'Bất đồng Agents' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveContraFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeContraFilter === tab.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredContradictions.map((contra) => (
            <div
              key={contra.contradictionId}
              className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    contra.severity === 'HIGH'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {contra.severity === 'HIGH' ? 'Mâu thuẫn cao' : 'Mâu thuẫn trung bình'}
                  </span>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                    {contra.title}
                  </h4>
                </div>

                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                  contra.status === 'RESOLVED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Trạng thái: {contra.status === 'RESOLVED' ? 'Đã hòa giải' : 'Đang điều tra'}
                </span>
              </div>

              {/* Two conflicting sources side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Source A */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    Nguồn Dữ Liệu A
                  </span>
                  <div className="font-bold text-gray-800 text-xs">{contra.sourceA.name}</div>
                  <p className="text-gray-600 text-xs">{contra.sourceA.claim}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="font-bold text-indigo-700">{contra.sourceA.value}</span>
                    <span className="text-gray-400">Độ tin cậy: {Math.round(contra.sourceA.reliability * 100)}%</span>
                  </div>
                </div>

                {/* Source B */}
                <div className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-1.5 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    Nguồn Dữ Liệu B (Đối Nghịch)
                  </span>
                  <div className="font-bold text-gray-800 text-xs">{contra.sourceB.name}</div>
                  <p className="text-gray-600 text-xs">{contra.sourceB.claim}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="font-bold text-rose-700">{contra.sourceB.value}</span>
                    <span className="text-gray-400">Độ tin cậy: {Math.round(contra.sourceB.reliability * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Synthesis and Non-judgmental Action */}
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                  <Brain className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Tổng hợp lý giải phi định kiến (V7 Non-Judgmental Synthesis):</span>
                </div>
                <p className="text-indigo-900 leading-relaxed text-[11.5px]">
                  {contra.synthesisNotes}
                </p>
                <div className="pt-1 text-[11px] font-semibold text-indigo-800 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" />
                  <span>Hành động đề xuất: {contra.suggestedAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: MULTI-HYPOTHESIS MATRIX (H1..H6) & EVIDENCE GRAPH */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              Ma Trận Cạnh Tranh Đa Giả Thuyết & Cập Nhật Bayesian (Multi-Hypothesis Engine H1..H6)
              <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                P(H | E) Bayesian Updating
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              Không vội vàng đưa ra một kết luận duy nhất. Hệ thống duy trì các giả thuyết cạnh tranh và bắt buộc kiểm chứng giả thuyết sai số kỹ thuật (H6).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Hypotheses List */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
              Danh Sách Giả Thuyết Cạnh Tranh:
            </span>
            {DEFAULT_MULTI_HYPOTHESES.map((hyp) => {
              const isSelected = selectedHypothesis.hypothesisId === hyp.hypothesisId;
              return (
                <div
                  key={hyp.hypothesisId}
                  onClick={() => setSelectedHypothesis(hyp)}
                  className={`p-3 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {hyp.code}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 truncate max-w-[200px]">
                        {hyp.title}
                      </h4>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      hyp.status === 'LEADING'
                        ? 'bg-emerald-100 text-emerald-800'
                        : hyp.status === 'DISPROVED'
                        ? 'bg-rose-100 text-rose-800 line-through'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {hyp.status === 'LEADING' ? 'Hàng đầu' : hyp.status === 'DISPROVED' ? 'Bác bỏ' : 'Cạnh tranh'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>Xác suất tiên nghiệm: {Math.round(hyp.priorProbability * 100)}%</span>
                    <span className="font-bold text-purple-700 font-mono">
                      Hậu nghiệm: {Math.round(hyp.posteriorProbability * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Hypothesis Detail & Evidence Graph */}
          <div className="lg:col-span-7 bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-4">
            <div className="space-y-1 border-b border-gray-200/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-xs font-mono">
                  {selectedHypothesis.code}
                </span>
                <h4 className="text-sm font-bold text-gray-900">
                  {selectedHypothesis.title}
                </h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pt-1">
                <strong>Cơ chế tâm lý / học tập:</strong> {selectedHypothesis.mechanism}
              </p>
            </div>

            {/* Probability Shift Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-500">Cập nhật xác suất sau khi nạp bằng chứng:</span>
                <span className="text-purple-700 font-mono font-bold">
                  {Math.round(selectedHypothesis.priorProbability * 100)}% &rarr; {Math.round(selectedHypothesis.posteriorProbability * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden flex">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${selectedHypothesis.posteriorProbability * 100}%` }}
                />
              </div>
            </div>

            {/* Evidence items linked to this hypothesis */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                Bằng chứng thực chứng liên kết (Evidence Graph):
              </span>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {DEFAULT_EVIDENCE_ITEMS.map((evi) => {
                  const supports = evi.supportsHypothesisCodes.includes(selectedHypothesis.code);
                  const contradicts = evi.contradictsHypothesisCodes.includes(selectedHypothesis.code);
                  if (!supports && !contradicts) return null;

                  return (
                    <div
                      key={evi.evidenceId}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        supports
                          ? 'bg-emerald-50/70 border-emerald-200'
                          : 'bg-rose-50/70 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-[10px] uppercase flex items-center gap-1 ${
                          supports ? 'text-emerald-800' : 'text-rose-800'
                        }`}>
                          {supports ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Ủng hộ giả thuyết</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" />
                              <span>Phản biện / Bác bỏ</span>
                            </>
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">
                          Độ tin cậy nguồn: {Math.round(evi.reliability * 100)}%
                        </span>
                      </div>
                      <p className="text-gray-700 leading-snug">{evi.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clinical Guardrail Note */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Ranh giới chuyên môn (Master Spec V7.3):</span>{' '}
                {selectedHypothesis.clinicalDisclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
