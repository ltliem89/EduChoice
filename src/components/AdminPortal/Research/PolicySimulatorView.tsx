import React, { useState } from 'react';
import {
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Cpu,
  Sparkles,
  Layers
} from 'lucide-react';
import {
  DEFAULT_POLICY_RULES,
  DEFAULT_SIMULATION_SCENARIOS
} from '../../../data/researchV5Data';
import { PolicyRule, PolicySimulationScenario } from '../../../types';

export const PolicySimulatorView: React.FC = () => {
  const [rules, setRules] = useState<PolicyRule[]>(DEFAULT_POLICY_RULES);
  const [safeModeActive, setSafeModeActive] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<PolicySimulationScenario>(
    DEFAULT_SIMULATION_SCENARIOS[0]
  );
  const [customTimeBudget, setCustomTimeBudget] = useState<number>(5);
  const [customAbandonRate, setCustomAbandonRate] = useState<number>(0.2);
  const [customStrategyRate, setCustomStrategyRate] = useState<number>(0.5);
  const [simulatedResult, setSimulatedResult] = useState<string | null>(null);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  const handleRunSimulation = () => {
    if (safeModeActive) {
      setSimulatedResult(
        'KÍCH HOẠT CHẾ ĐỘ AN TOÀN (SAFE MODE): Đưa ra trải nghiệm tải thấp, deterministic, không thử nghiệm rủi ro cao, gợi ý nghỉ ngơi hoặc hỗ trợ người lớn.'
      );
      return;
    }

    // Evaluate rules by priority
    const activeRulesSorted = [...rules]
      .filter((r) => r.active)
      .sort((a, b) => b.priority - a.priority);

    for (const r of activeRulesSorted) {
      if (r.id === 'rule_safe_workload' && customAbandonRate > 0.4) {
        setSimulatedResult(
          `Áp dụng [${r.name}]: Tỉ lệ bỏ dở (${Math.round(
            customAbandonRate * 100
          )}%) vượt ngưỡng 40% -> Giảm độ tải nhận thức, đề xuất nghỉ ngơi hoặc game 1 bước.`
        );
        return;
      }
      if (r.id === 'rule_quick_time' && customTimeBudget <= 3) {
        setSimulatedResult(
          `Áp dụng [${r.name}]: Quỹ thời gian (${customTimeBudget} phút) hạn hẹp -> Chuyển trực tiếp sang Hành Động Nhỏ thực tế 2-3 phút, không đưa kịch bản phân nhánh dài.`
        );
        return;
      }
      if (r.id === 'rule_strategy_reinforce' && customStrategyRate > 0.6) {
        setSimulatedResult(
          `Áp dụng [${r.name}]: Tỉ lệ đổi chiến lược (${Math.round(
            customStrategyRate * 100
          )}%) tốt -> Nâng cấp lên tình huống thử thách có nhiều lựa chọn mơ hồ (Exploration).`
        );
        return;
      }
    }

    setSimulatedResult(
      'Áp dụng Chính Sách Tiêu Chuẩn: Đề xuất kịch bản cân bằng "game_48_minutes" với Hộp công cụ Eisenhower Matrix.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">
              Bộ Mô Phỏng Chính Sách Thích Ứng (Adaptive Policy Simulator & DSL)
            </h2>
          </div>

          {/* Safe Mode Switch (Master Spec Section 46) */}
          <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
            <span className="text-xs font-bold text-rose-900">Safe Mode (An Toàn Tuyệt Đối):</span>
            <button
              onClick={() => setSafeModeActive(!safeModeActive)}
              className="cursor-pointer"
            >
              {safeModeActive ? (
                <ToggleRight className="w-6 h-6 text-rose-600" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 max-w-4xl leading-relaxed">
          Cho phép nhà sư phạm và quản trị viên kiểm thử trước tác động của các quy tắc thích ứng (Policy DSL) trên các kịch bản học sinh giả lập trước khi triển khai vào môi trường thực tế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Policy DSL Rules */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Quy Tắc Chính Sách Giáo Dục (Educational Policy DSL)
              </h3>
              <p className="text-[11px] text-gray-500">Bật/tắt hoặc điều chỉnh mức độ ưu tiên quy tắc</p>
            </div>
            <span className="text-xs font-mono text-gray-400">DSL v1.0.0</span>
          </div>

          <div className="space-y-3">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-3.5 rounded-xl border transition space-y-2 ${
                  rule.active
                    ? 'border-gray-200 bg-white'
                    : 'border-gray-100 bg-gray-50/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        rule.category === 'safety'
                          ? 'bg-rose-100 text-rose-800'
                          : rule.category === 'workload'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {rule.category}
                    </span>
                    <span className="text-xs font-bold text-gray-900">{rule.name}</span>
                  </div>

                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="text-xs font-semibold cursor-pointer"
                  >
                    {rule.active ? (
                      <ToggleRight className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="p-2 bg-slate-900 text-slate-200 rounded-lg font-mono text-[10px] space-y-0.5">
                  <div>
                    <span className="text-amber-400 font-bold">IF:</span> {rule.condition}
                  </div>
                  <div>
                    <span className="text-emerald-400 font-bold">ACTION:</span> {rule.action}
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Simulator Sandbox */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Thử Nghiệm Tình Huống Giả Lập (Interactive Sandbox)
              </h3>
              <p className="text-[11px] text-gray-500">Mô phỏng hành vi học sinh để xem quyết định thích ứng</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 font-bold">Simulator Engine</span>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-700">Chọn tình huống mẫu:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEFAULT_SIMULATION_SCENARIOS.map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => {
                    setSelectedScenario(scen);
                    setCustomTimeBudget(scen.timeBudgetMinutes);
                    setCustomAbandonRate(scen.abandonRate7d);
                    setCustomStrategyRate(scen.strategyChangeRate14d);
                  }}
                  className={`p-2 rounded-xl text-left border text-xs transition cursor-pointer ${
                    selectedScenario.id === scen.id
                      ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-900'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <p className="line-clamp-1">{scen.scenarioName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Quỹ thời gian của học sinh:</span>
                <span className="font-mono font-bold text-indigo-700">{customTimeBudget} phút</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={customTimeBudget}
                onChange={(e) => setCustomTimeBudget(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Tỉ lệ bỏ dở 7 ngày qua:</span>
                <span className="font-mono font-bold text-amber-700">
                  {Math.round(customAbandonRate * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={customAbandonRate}
                onChange={(e) => setCustomAbandonRate(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Tỉ lệ đổi chiến lược linh hoạt:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {Math.round(customStrategyRate * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={customStrategyRate}
                onChange={(e) => setCustomStrategyRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <button
              onClick={handleRunSimulation}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
            >
              <Play className="w-4 h-4" />
              <span>Chạy Mô Phỏng Quyết Định Thích Ứng</span>
            </button>
          </div>

          {/* Simulation Output */}
          {simulatedResult && (
            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-2 border border-slate-700 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-800 pb-1">
                <span>SIMULATION_ENGINE_OUTPUT</span>
                <span className="text-emerald-400 font-bold">STATUS: PREDICTED</span>
              </div>
              <p className="text-indigo-300 leading-relaxed">{simulatedResult}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
