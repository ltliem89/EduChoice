import React, { useState } from 'react';
import {
  Brain,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  GitMerge,
  Scale,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Flame,
  Layers,
  FileSearch
} from 'lucide-react';
import {
  DEFAULT_AGENT_DECISIONS,
  DEFAULT_FUSION_RESULT,
  DEFAULT_COUNTERFACTUALS
} from '../../../data/v6IntelligenceData';
import { SpecialistAgentDecision, DecisionFusionResult, CounterfactualSimulationRecord } from '../../../types';

export const MultiAgentFusionView: React.FC = () => {
  const [fusionResult] = useState<DecisionFusionResult>(DEFAULT_FUSION_RESULT);
  const [activeSubTab, setActiveSubTab] = useState<'fusion' | 'counterfactual'>('fusion');
  const [counterfactuals] = useState<CounterfactualSimulationRecord[]>(DEFAULT_COUNTERFACTUALS);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 rounded-3xl shadow-lg border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
                Master Spec V6 • Section V6.10 - V6.13, V6.20
              </span>
              <span className="text-xs text-indigo-300 font-mono">Specialist Agents & WHY Engine</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Hệ Thống Đa Agent Chuyên Biệt, Hợp Nhất Quyết Định & WHY Engine
            </h2>
            <p className="text-xs text-indigo-200/80 max-w-3xl leading-relaxed">
              Mỗi agent đại diện cho một góc nhìn chuyên môn (Hành vi, Mục tiêu, An toàn, Can thiệp, Chính sách). Safety Agent có quyền phủ quyết tối cao (Veto Authority). Mọi quyết định thích ứng đều được giải trình minh bạch qua WHY Engine.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/15 self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab('fusion')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeSubTab === 'fusion'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              Hợp Nhất & WHY Engine
            </button>
            <button
              onClick={() => setActiveSubTab('counterfactual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeSubTab === 'counterfactual'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              Mô Phỏng Đối Thực Nghiệm
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'fusion' ? (
        <div className="space-y-6">
          {/* FUSION OVERVIEW STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
              <span className="text-[11px] text-gray-500 font-semibold block">Độ Đồng Thuận (Consensus)</span>
              <span className="text-xl font-black text-emerald-600">
                {Math.round(fusionResult.consensusScore * 100)}%
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">Đồng thuận cao giữa các agent</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
              <span className="text-[11px] text-gray-500 font-semibold block">Xung Đột Tiềm Ẩn (Conflict)</span>
              <span className="text-xl font-black text-indigo-600">
                {Math.round(fusionResult.conflictScore * 100)}%
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">Dưới ngưỡng rủi ro 25%</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
              <span className="text-[11px] text-gray-500 font-semibold block">Quyền Phủ Quyết An Toàn</span>
              <span className="text-sm font-black text-emerald-600 flex items-center gap-1 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>PASS (Không Veto)</span>
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">Safety Agent phê chuẩn</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-1">
              <span className="text-[11px] text-gray-500 font-semibold block">Độ Tự Tin Hợp Nhất</span>
              <span className="text-xl font-black text-purple-600">
                {Math.round(fusionResult.whyExplanation.confidence * 100)}%
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">Mô hình toán học Bayesian</span>
            </div>
          </div>

          {/* WHY ENGINE PANEL (V6.13) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  WHY ENGINE — GIẢI TRÌNH QUYẾT ĐỊNH THÍCH ỨNG MINH BẠCH
                </h3>
              </div>
              <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200 font-bold">
                Quyết định #{fusionResult.fusionId}
              </span>
            </div>

            {/* Winning Policy Banner */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Quyết Định Can Thiệp Được Chọn (Winning Policy Action):
              </span>
              <p className="text-sm font-black text-emerald-950">
                {fusionResult.winningPolicyAction}
              </p>
            </div>

            {/* WHY & EVIDENCE BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] block">
                  1. LÝ DO VÌ SAO CHỌN (WHY):
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {fusionResult.whyExplanation.why}
                </p>

                <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] block pt-2">
                  2. BẰNG CHỨNG HÀNH VI CỤ THỂ (EVIDENCE):
                </span>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc">
                  {fusionResult.whyExplanation.evidence.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="font-bold text-rose-950 uppercase tracking-wider text-[11px] block">
                  3. PHƯƠNG ÁN BỊ TỪ CHỐI & NGUYÊN NHÂN (ALTERNATIVE REJECTED):
                </span>
                <p className="text-gray-700 font-semibold">
                  {fusionResult.whyExplanation.alternativeRejected}
                </p>
                <p className="text-gray-600 italic">
                  Lý do từ chối: {fusionResult.whyExplanation.reasonRejected}
                </p>

                <span className="font-bold text-indigo-950 uppercase tracking-wider text-[11px] block pt-2">
                  4. RÀNG BUỘC ĐÃ THI HÀNH (CONSTRAINTS ENFORCED):
                </span>
                <ul className="space-y-1 text-gray-600 pl-4 list-disc">
                  {fusionResult.whyExplanation.constraintsEnforced.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                <p className="text-emerald-800 font-semibold pt-1">
                  <strong>Kỳ vọng kết quả:</strong> {fusionResult.whyExplanation.expectedOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* SPECIALIST AGENTS LIST (V6.10) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                GÓC NHÌN CHUYÊN MÔN CỦA 5 SPECIALIST AGENTS
              </h3>
              <span className="text-xs font-mono text-gray-400">Governance Veto Ready</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fusionResult.agentDecisions.map((ag) => (
                <div
                  key={ag.agentId}
                  className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-indigo-300 transition space-y-2.5 text-xs shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                      <h4 className="font-bold text-gray-900">{ag.agentNameVi}</h4>
                    </div>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        ag.agentId === 'safety_agent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {ag.agentId === 'safety_agent' ? 'VETO AUTHORITY' : ag.agentId}
                    </span>
                  </div>

                  <p className="text-gray-700 leading-relaxed">{ag.recommendation}</p>

                  <div className="p-2 bg-gray-50 rounded-xl font-mono text-[10px] space-y-0.5 text-gray-600 border border-gray-100">
                    {ag.evidence.map((ev, i) => (
                      <div key={i}>&bull; {ev}</div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-1 border-t border-gray-100">
                    <span>Độ tin cậy: {Math.round(ag.confidence * 100)}%</span>
                    <span className="text-emerald-700 font-bold">Rủi ro: {ag.riskAssessment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* COUNTERFACTUAL SIMULATOR (V6.20) */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  MÔ PHỎNG ĐỐI THỰC NGHIỆM (COUNTERFACTUAL SIMULATOR)
                </h3>
                <p className="text-xs text-gray-500">
                  Trước một sự kiện đã quan sát, hệ thống giả lập kết quả nếu áp dụng các chính sách can thiệp khác nhau (What-If Analysis).
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                Non-Causal Prediction Simulator
              </span>
            </div>

            {counterfactuals.map((cf) => (
              <div key={cf.simulationId} className="space-y-4">
                <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 text-xs">
                  <span className="font-bold text-indigo-950 uppercase tracking-wide block">
                    Bối cảnh quan sát thực tế (Observed Trigger):
                  </span>
                  <p className="text-indigo-900 font-medium mt-0.5">{cf.observedTrigger}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cf.policiesCompared.map((pol, idx) => {
                    const isRecommended = pol.policyName.includes('Chính sách A');
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition space-y-2.5 text-xs ${
                          isRecommended
                            ? 'bg-emerald-50/50 border-emerald-300 shadow-xs ring-2 ring-emerald-100'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-gray-900">{pol.policyName}</h4>
                          {isRecommended && (
                            <span className="text-[9px] font-bold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                              Tối ưu đa mục tiêu
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-[11px]">{pol.description}</p>

                        <div className="p-2.5 bg-gray-50 rounded-xl space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Dự báo kết quả:</span>
                            <span className="font-bold text-gray-800">{pol.predictedOutcome}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tỉ lệ thành công dự kiến:</span>
                            <span className="font-bold text-emerald-700">{pol.expectedSuccessRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tải nhận thức (Cost):</span>
                            <span className="font-bold text-amber-700">{pol.cognitiveLoadCost}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-gray-600 italic bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <strong>Ghi chú chuyên môn:</strong> {cf.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
