import React, { useState } from 'react';
import {
  Sparkles,
  GitPullRequest,
  ShieldCheck,
  Brain,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Cpu,
  Eye,
  Sliders,
  Award,
  Check,
  X,
  Target,
  Clock,
  Zap,
  Activity,
  UserCheck,
  Search,
  BookOpen,
  Filter
} from 'lucide-react';
import {
  DEFAULT_NOVEL_PATTERNS,
  DEFAULT_WORLD_MODELS,
  DEFAULT_FALSIFIABILITY_CONDITIONS,
  DEFAULT_PERSONAL_STRATEGIES,
  DEFAULT_AGENT_DEBATES,
  DEFAULT_ROBUSTNESS_PERTURBATIONS,
  DEFAULT_CAPABILITY_ROUTES,
  DEFAULT_INTELLIGENCE_HEALTH,
  DEFAULT_POLICY_CANDIDATES
} from '../../../data/v8EvolutionData';
import {
  NovelPattern,
  MultiWorldModel,
  WhatWouldChangeMyMind,
  PersonalStrategyProfile,
  MultiAgentDebateRound,
  DecisionRobustnessPerturbation,
  AICapabilityRoute,
  IntelligenceHealthMetrics,
  PolicyCandidateVNext
} from '../../../types';
import { SoundEngine } from '../../../utils/soundEffects';

export const CognitiveEvolutionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'discovery' | 'multi_world' | 'agent_debate' | 'personal_strategies' | 'router_health'
  >('discovery');

  const [patterns, setPatterns] = useState<NovelPattern[]>(DEFAULT_NOVEL_PATTERNS);
  const [worldModels] = useState<MultiWorldModel[]>(DEFAULT_WORLD_MODELS);
  const [falsifiabilities] = useState<WhatWouldChangeMyMind[]>(DEFAULT_FALSIFIABILITY_CONDITIONS);
  const [strategies] = useState<PersonalStrategyProfile[]>(DEFAULT_PERSONAL_STRATEGIES);
  const [debates] = useState<MultiAgentDebateRound[]>(DEFAULT_AGENT_DEBATES);
  const [perturbations] = useState<DecisionRobustnessPerturbation[]>(DEFAULT_ROBUSTNESS_PERTURBATIONS);
  const [routes] = useState<AICapabilityRoute[]>(DEFAULT_CAPABILITY_ROUTES);
  const [health] = useState<IntelligenceHealthMetrics>(DEFAULT_INTELLIGENCE_HEALTH);
  const [policyCandidates, setPolicyCandidates] = useState<PolicyCandidateVNext[]>(DEFAULT_POLICY_CANDIDATES);

  const [selectedPattern, setSelectedPattern] = useState<NovelPattern | null>(patterns[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [governanceNotice, setGovernanceNotice] = useState<string | null>(null);

  const handleApprovePolicy = (id: string) => {
    SoundEngine.playSuccess();
    setPolicyCandidates((prev) =>
      prev.map((c) => (c.candidateId === id ? { ...c, humanReviewStatus: 'APPROVED' } : c))
    );
    setGovernanceNotice(`✅ Đã phê duyệt chính sách ${id} cho chu kỳ triển khai Policy vNext!`);
    setTimeout(() => setGovernanceNotice(null), 4000);
  };

  const handleValidatePattern = (id: string) => {
    SoundEngine.playSelect();
    setPatterns((prev) =>
      prev.map((p) => (p.patternId === id ? { ...p, status: 'validated' } : p))
    );
  };

  const filteredPatterns = patterns.filter((p) => {
    if (statusFilter === 'all') return true;
    return p.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* V8 Master Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                Master Spec V8 • Cognitive Evolution Engine
              </span>
              <span className="text-xs text-indigo-300 font-mono">
                Discovery • Multi-World • Self-Critique • Human Governance
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span>Hệ Thống Tiến Hóa Nhận Thức & Tự Học Có Kiểm Soát (V8)</span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </h2>
            <p className="text-xs text-indigo-200/90 max-w-3xl leading-relaxed">
              V8 bổ sung tầng trí tuệ tự phát hiện mẫu hình chưa biết (Unknown-Unknowns), mô hình hóa đa thế giới cạnh tranh, bắt buộc điều kiện phản chứng ("What Would Change My Mind?"), tranh biện đa Agent, và tiến hóa chính sách thích ứng dưới sự giám sát tối thượng của con người (Human Governance).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 p-1.5 rounded-2xl border border-white/15 text-xs">
            <div className="px-3 py-1 bg-emerald-500/30 text-emerald-300 rounded-xl font-mono text-[11px] font-bold border border-emerald-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Sức Khỏe Hệ Thống: {health.overallHealthRating}</span>
            </div>
          </div>
        </div>

        {/* Sub-tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-4 border-t border-white/10 text-xs">
          {[
            { id: 'discovery', label: '1. Phát Hiện Mẫu Hình Mới (Discovery Engine)', icon: Search },
            { id: 'multi_world', label: '2. Đa Thế Giới & Điều Kiện Phản Chứng', icon: Compass },
            { id: 'agent_debate', label: '3. Tranh Biện Đa Agent & Tự Phê Phán', icon: GitPullRequest },
            { id: 'personal_strategies', label: '4. Chiến Lược Cá Nhân & Chính Sách vNext', icon: Target },
            { id: 'router_health', label: '5. Điều Tuyến Năng Lực & Tự Chữa Lành', icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  SoundEngine.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-950 shadow-md scale-102'
                    : 'bg-white/10 hover:bg-white/20 text-indigo-100 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: NOVEL PATTERN DISCOVERY & UNKNOWN-UNKNOWN DETECTOR (V8.3 - V8.4) */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                <span>Kho Mẫu Hình Mới Được Phát Hiện (Unsupervised Discovery Space)</span>
              </h3>
              <p className="text-xs text-gray-500">
                Các cụm hành vi độc đáo nằm ngoài 20 construct truyền thống, được phát hiện qua thuật toán quét mật độ và độ lệch không gian đặc trưng.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Lọc trạng thái:</span>
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs p-1.5 bg-gray-50 border border-gray-300 rounded-xl outline-none"
              >
                <option value="all">Tất cả ({patterns.length})</option>
                <option value="validated">Đã kiểm chứng (Validated)</option>
                <option value="reviewed">Đã xem xét (Reviewed)</option>
                <option value="candidate">Ứng viên mới (Candidate)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patterns List */}
            <div className="lg:col-span-2 space-y-3">
              {filteredPatterns.map((p) => {
                const isSelected = selectedPattern?.patternId === p.patternId;
                return (
                  <div
                    key={p.patternId}
                    onClick={() => {
                      SoundEngine.playSelect();
                      setSelectedPattern(p);
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-300 shadow-sm ring-2 ring-indigo-500/20'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-gray-900">{p.name}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              p.status === 'validated'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : p.status === 'reviewed'
                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-gray-400">
                          ID: {p.patternId} • Phát hiện: {new Date(p.discoveredAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="text-xs font-black text-indigo-700">
                          Độ mới: {(p.novelty * 100).toFixed(0)}%
                        </span>
                        <div className="text-[10px] text-gray-400 font-mono">
                          {p.evidenceCount} bằng chứng
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100 text-[11px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {p.contexts.map((ctx, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium"
                          >
                            {ctx}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 font-semibold text-gray-500">
                        <span>Phổ biến: {(p.prevalence * 100).toFixed(0)}%</span>
                        <span>Bền bỉ: {(p.persistence * 100).toFixed(0)}%</span>
                        <span>Độ tin cậy: {(p.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pattern Detail Panel */}
            <div className="lg:col-span-1">
              {selectedPattern ? (
                <div className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-sm space-y-4 sticky top-6">
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block">
                      Chi tiết mẫu hình mới
                    </span>
                    <h4 className="text-sm font-black text-gray-900 mt-0.5">
                      {selectedPattern.name}
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-gray-500 block">Cơ hội can thiệp hành vi:</span>
                      <p className="text-gray-800 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs mt-1 leading-relaxed">
                        💡 {selectedPattern.actionOpportunity}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-2 bg-gray-50 rounded-xl text-center">
                        <span className="text-[10px] text-gray-400 block">Độ mới lạ (Novelty)</span>
                        <span className="text-sm font-black text-indigo-700">
                          {(selectedPattern.novelty * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-xl text-center">
                        <span className="text-[10px] text-gray-400 block">Độ bao phủ ngữ cảnh</span>
                        <span className="text-sm font-black text-indigo-700">
                          {(selectedPattern.contextCoverage * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 space-y-2">
                      <button
                        onClick={() => handleValidatePattern(selectedPattern.patternId)}
                        disabled={selectedPattern.status === 'validated'}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer disabled:text-gray-500"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {selectedPattern.status === 'validated'
                            ? 'Đã Thẩm Định Kiểm Chứng'
                            : 'Thẩm Định Mẫu Hình (Validate)'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  Chọn một mẫu hình để xem chi tiết
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-WORLD REASONING & "WHAT WOULD CHANGE MY MIND" (V8.5 - V8.7) */}
      {activeTab === 'multi_world' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Mô Hình Hóa Đa Thế Giới Cạnh Tranh (Multi-World Models A/B/C/D)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Hệ thống từ chối áp đặt một góc nhìn đơn nhất. Thay vào đó, 4 mô hình thế giới cạnh tranh cùng giải thích lý do vì sao học sinh gặp trở ngại, kèm chỉ số độ khớp (Fit Score) và số lượng bằng chứng phản chứng.
            </p>
          </div>

          {/* Competing World Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {worldModels.map((wm) => (
              <div
                key={wm.modelId}
                className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-xs font-bold text-gray-900">{wm.name}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        wm.status === 'DOMINANT'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : wm.status === 'PLAUSIBLE'
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {wm.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                    "{wm.premise}"
                  </p>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-gray-500 block">
                      Các giả định ngầm của mô hình:
                    </span>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-0.5">
                      {wm.assumptions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="text-indigo-700 font-bold">
                      Độ khớp: {(wm.fitScore * 100).toFixed(0)}%
                    </span>
                    <span className="text-gray-400">
                      Bất định: {(wm.uncertainty * 100).toFixed(0)}%
                    </span>
                  </div>
                  <span className="text-rose-600 text-[11px]">
                    {wm.disconfirmingEvidenceCount} bằng chứng bác bỏ
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Section: "What Would Change My Mind" Falsifiability Engine */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 p-6 rounded-3xl border border-indigo-200 space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Bộ Phản Chứng Khoa Học ("What Would Change My Mind?" Engine)</span>
                </h4>
                <p className="text-xs text-gray-500">
                  Tuân thủ nguyên tắc Popper về tính khả bác (Falsifiability): Mỗi nhận định khoa học của AI đều phải nêu rõ điều kiện thực nghiệm nào sẽ khiến hệ thống giảm lòng tin hoặc thừa nhận sai sót.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-mono">
                Chuẩn Khả Bác: 0.93 / 1.00
              </span>
            </div>

            <div className="space-y-4">
              {falsifiabilities.map((f) => (
                <div
                  key={f.hypothesisId}
                  className="bg-white p-4 rounded-2xl border border-indigo-100 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-gray-900">
                      📌 Giả thuyết: <span className="text-indigo-900">{f.hypothesisTitle}</span>
                    </div>
                    <span className="text-xs font-black text-indigo-600">
                      Độ tin cậy hiện tại: {(f.currentConfidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Decrease confidence */}
                    <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200 space-y-1.5">
                      <span className="font-bold text-rose-800 text-[11px] flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Điều kiện sẽ làm GIẢM độ tin cậy (Bác bỏ giả thuyết):</span>
                      </span>
                      <ul className="list-disc pl-4 text-rose-900 text-xs space-y-1">
                        {f.wouldDecreaseConfidence.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Increase confidence */}
                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                      <span className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Điều kiện sẽ làm TĂNG độ tin cậy (Củng cố giả thuyết):</span>
                      </span>
                      <ul className="list-disc pl-4 text-emerald-900 text-xs space-y-1">
                        {f.wouldIncreaseConfidence.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI-AGENT DEBATE & SELF-CRITIQUE (V8.20 - V8.22) */}
      {activeTab === 'agent_debate' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-indigo-600" />
              <span>Biên Bản Tranh Biện Đa Agent (Multi-Agent Debate Protocol)</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Quy trình tranh biện khắt khe: Đề xuất (Propose) &rarr; Phản biện (Critique) &rarr; Đối kháng luận điểm (Counterargue) &rarr; Kiểm tra bằng chứng &rarr; Hiệu chỉnh &rarr; Hợp nhất phán quyết (Synthesis).
            </p>
          </div>

          <div className="space-y-4">
            {debates.map((deb) => (
              <div
                key={deb.debateId}
                className="bg-white p-5 rounded-2xl border border-indigo-200 shadow-2xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">
                      Phiên Tranh Biện: {deb.debateId}
                    </span>
                    <h4 className="text-xs font-bold text-gray-900">{deb.topic}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                    Đồng thuận: {(deb.consensusScore * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Propose Side */}
                  <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-1.5">
                    <span className="font-bold text-blue-900 block text-[11px]">
                      🗣️ {deb.proposingAgent}:
                    </span>
                    <p className="text-blue-950 font-medium leading-relaxed">
                      "{deb.proposedAction}"
                    </p>
                  </div>

                  {/* Critique Side */}
                  <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1.5">
                    <span className="font-bold text-amber-900 block text-[11px]">
                      🛡️ {deb.critiquingAgent} (Phản biện):
                    </span>
                    <ul className="list-disc pl-4 text-amber-950 text-xs space-y-1">
                      {deb.counterarguments.map((ca, i) => (
                        <li key={i}>{ca}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Evidence & Final Verdict */}
                <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-[11px]">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Bằng chứng đối chiếu: {deb.evidenceCheckSummary}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Hành động sau hiệu chỉnh:
                      </span>
                      <span className="font-bold text-emerald-300">{deb.revisedAction}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">
                        Phán quyết hợp nhất:
                      </span>
                      <span className="font-bold text-white">{deb.fusedVerdict}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Robustness Perturbation Testing */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Kiểm Thử Độ Bền Vững Quyết Định (Decision Robustness Perturbations)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {perturbations.map((p) => (
                <div
                  key={p.testId}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800 text-[11px]">{p.perturbationType}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.robustnessRating === 'ROBUST'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.robustnessRating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-[11px]">{p.variation}</p>
                  <div className="font-mono text-[10px] text-indigo-600 font-bold">
                    Kết quả quyết định: {p.decisionOutcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PERSONAL STRATEGIES & POLICY EVOLUTION (V8.13, V8.16) */}
      {activeTab === 'personal_strategies' && (
        <div className="space-y-6">
          {/* Personal Strategy Discovery */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600" />
                  <span>Khám Phá Chiến Lược Học Tập Cá Nhân (Personal Strategy Discovery)</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Dữ liệu thực nghiệm cho thấy mỗi học sinh phản hồi tốt nhất với những công cụ khác nhau trong từng bối cảnh cụ thể.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl border border-indigo-200">
                Học sinh: HS-2026-09A
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {strategies.map((s) => (
                <div
                  key={s.strategyId}
                  className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        #{s.preferenceRank}
                      </span>
                      <span>{s.strategyName}</span>
                    </h4>
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 text-xs">
                      +{(s.observedEffect * 100).toFixed(0)}% Tác Động
                    </span>
                  </div>

                  <div className="text-gray-600 text-[11px]">
                    <span className="font-semibold text-gray-500">Ngữ cảnh phát huy:</span> {s.context}
                  </div>

                  <p className="text-gray-700 text-xs italic bg-white p-2 rounded-xl border border-gray-200">
                    "{s.studentAgencyNotes}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-gray-500">
                    <span>Độ tin cậy: {(s.confidence * 100).toFixed(0)}%</span>
                    <span>Chuyển hóa: {(s.transferRate * 100).toFixed(0)}%</span>
                    <span className="text-indigo-600">Gánh nặng: {(s.burdenScore * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Evolution Engine (Policy vNext Candidates) */}
          <div className="bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/50 p-6 rounded-3xl border border-purple-200 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Động Cơ Tiến Hóa Chính Sách Thích Ứng (Policy Evolution vNext)</span>
                </h4>
                <p className="text-xs text-gray-500">
                  Dựa trên dữ liệu thực nghiệm, hệ thống tự động soạn thảo dự thảo chính sách mới nhưng TUYỆT ĐỐI KHÔNG tự áp dụng. Mọi thay đổi đều phải qua quy trình Phê chuẩn của Con người (Human Governance).
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full border border-purple-200">
                Human-in-the-Loop Governance
              </span>
            </div>

            {governanceNotice && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-2xl flex items-center gap-2 font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{governanceNotice}</span>
              </div>
            )}

            <div className="space-y-4">
              {policyCandidates.map((c) => (
                <div
                  key={c.candidateId}
                  className="bg-white p-5 rounded-2xl border border-purple-100 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-purple-100 text-purple-800 font-mono text-[11px] font-bold">
                          {c.policyVersion}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            c.humanReviewStatus === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {c.humanReviewStatus === 'APPROVED' ? 'Đã Phê Duyệt' : 'Chờ Chuyên Gia Duyệt'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="font-semibold text-gray-500">Kích hoạt bởi quan sát:</span>{' '}
                        {c.triggerObservation}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-purple-700">
                        Mô phỏng offline: {(c.offlineSimulationScore * 100).toFixed(0)}%
                      </span>
                      <div className="text-[10px] text-gray-400 font-mono">
                        Công bằng: {(c.fairnessScore * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-purple-950 font-medium">
                    📝 <span className="font-bold">Đề xuất cải tiến:</span> {c.proposedChange}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-gray-100">
                    <div className="text-[11px] text-gray-500">
                      <span className="font-semibold">Kế hoạch hoàn nguyên (Rollback):</span> {c.rollbackPlan}
                    </div>

                    {c.humanReviewStatus !== 'APPROVED' && (
                      <button
                        onClick={() => handleApprovePolicy(c.candidateId)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-end sm:self-auto"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Phê Duyệt Chính Sách (Human Approval)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI CAPABILITY ROUTER & SYSTEM SELF-HEALING (V8.24 - V8.30) */}
      {activeTab === 'router_health' && (
        <div className="space-y-6">
          {/* AI Capability Router ("Know When Not to Act") */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Bộ Điều Tuyến Năng Lực AI & Ngân Sách Suy Luận (Cost-Aware Capability Router)</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Nguyên tắc "Biết khi nào KHÔNG hành động" (Know when not to act): Phân tầng quyết định qua 6 cấp độ (Rule Engine &rarr; Thống kê &rarr; AI Cấu trúc &rarr; Gemini &rarr; Đa Agent &rarr; Con người thẩm định).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Loại Tác Vụ</th>
                    <th className="p-3">Mức Rủi Ro</th>
                    <th className="p-3">Kênh Điều Tuyến</th>
                    <th className="p-3">Hành Động</th>
                    <th className="p-3">Chi Phí Token</th>
                    <th className="p-3">Lý Do Chọn Lọc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {routes.map((r) => (
                    <tr key={r.requestId} className="hover:bg-gray-50/50">
                      <td className="p-3 font-semibold text-gray-900">{r.taskType}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.riskLevel === 'LOW'
                              ? 'bg-emerald-100 text-emerald-800'
                              : r.riskLevel === 'MEDIUM'
                              ? 'bg-blue-100 text-blue-800'
                              : r.riskLevel === 'HIGH'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {r.riskLevel}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-indigo-700">{r.selectedRoute}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] font-mono ${
                            r.actionType === 'DO'
                              ? 'bg-emerald-100 text-emerald-900'
                              : r.actionType === 'DONT'
                              ? 'bg-rose-100 text-rose-900'
                              : r.actionType === 'WAIT'
                              ? 'bg-gray-100 text-gray-700'
                              : r.actionType === 'ASK'
                              ? 'bg-indigo-100 text-indigo-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {r.actionType}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-gray-500">{r.budgetCostToken} tok</td>
                      <td className="p-3 text-gray-600 max-w-md">{r.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Self-Diagnosing & Safe Self-Healing */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-lg border border-slate-800">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Sức Khỏe Hệ Thống Tự Thấu Hiểu & Tự Phục Hồi An Toàn (Self-Healing Engine)</span>
                </h4>
                <p className="text-xs text-indigo-200">
                  Hệ thống liên tục tự giám sát chất lượng dữ liệu, độ chuẩn xác mô hình và kích hoạt các tác vụ bảo trì phi xâm lấn.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                Trạng thái: Tối Ưu (Optimal)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-gray-400 block">Dữ Liệu Thô</span>
                <span className="text-base font-black text-emerald-400">
                  {(health.dataHealthScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-gray-400 block">Độ Chuẩn Brier</span>
                <span className="text-base font-black text-indigo-300">
                  {(health.modelCalibrationScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-gray-400 block">Đồng Thuận Agent</span>
                <span className="text-base font-black text-purple-300">
                  {(health.agentAgreementScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-gray-400 block">An Toàn Chính Sách</span>
                <span className="text-base font-black text-emerald-400">
                  {(health.policySafetyScore * 100).toFixed(0)}%
                </span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                <span className="text-[10px] text-gray-400 block">Chỉ Số Gây Ngợp UI</span>
                <span className="text-base font-black text-teal-300">
                  {(health.uiOverwhelmIndex * 100).toFixed(0)}% (Rất Thoáng)
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-indigo-200 block">
                Cơ chế tự phục hồi an toàn đã sẵn sàng (Safe Self-Healing Actions):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {health.selfHealingActions.map((act, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-indigo-100 flex items-center gap-2 text-[11px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
