import React, { useState } from 'react';
import {
  FileCode,
  ShieldCheck,
  CheckCircle,
  Clock,
  FlaskConical,
  Users,
  Target,
  BarChart2,
  Lock,
  FileSpreadsheet,
  HelpCircle
} from 'lucide-react';
import { DEFAULT_EXPERIMENTS } from '../../../data/researchV5Data';
import { ExperimentRecord } from '../../../types';

export const ExperimentRegistryView: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentRecord>(
    DEFAULT_EXPERIMENTS[0]
  );
  const [showAnalysisCode, setShowAnalysisCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">
              Sổ Đăng Ký Thử Nghiệm & Tiền Đăng Ký (Experiment Registry & Pre-Registration)
            </h2>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
            Master Spec v5 • Section 23-26, 94
          </span>
        </div>
        <p className="text-xs text-gray-500 max-w-4xl leading-relaxed">
          Ngăn chặn gian lận thống kê (Anti p-hacking): Mọi thử nghiệm đều được khóa trước (Pre-registered) về giả thuyết, biến kết quả chính (Primary Outcome) và Kế hoạch phân tích dưới dạng mã code (Analysis Plan as Code) trước khi bắt đầu thu thập và tính toán dữ liệu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left list of Experiments */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Danh Sách Nghiên Cứu ({DEFAULT_EXPERIMENTS.length})
            </h3>
            <span className="text-[11px] text-gray-400 font-mono">Status Locked</span>
          </div>

          {DEFAULT_EXPERIMENTS.map((exp) => {
            const isSelected = selectedExperiment.experimentId === exp.experimentId;
            return (
              <button
                key={exp.experimentId}
                onClick={() => setSelectedExperiment(exp)}
                className={`w-full p-4 rounded-2xl border text-left transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-700">
                    {exp.experimentId}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      exp.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Lock className="w-2.5 h-2.5" />
                    <span>{exp.status}</span>
                  </span>
                </div>

                <h4 className="text-xs font-bold text-gray-900 leading-snug">{exp.title}</h4>

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono pt-1">
                  <span>Mẫu: {exp.currentEnrollment}/{exp.sampleSizeTarget}</span>
                  <span>{exp.randomizationType}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right detail view */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {selectedExperiment.experimentId}
                  </span>
                  <span className="text-xs text-gray-400">
                    Bắt đầu: {selectedExperiment.startDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  {selectedExperiment.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAnalysisCode(!showAnalysisCode)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{showAnalysisCode ? 'Ẩn Analysis Plan' : 'Xem Analysis Plan (YAML)'}</span>
                </button>
              </div>
            </div>

            {/* Analysis Plan as Code Viewer */}
            {showAnalysisCode && (
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-2 border border-slate-700">
                <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-1.5">
                  <span>research/analyses/{selectedExperiment.experimentId}.yaml</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle className="w-3 h-3" />
                    <span>PRE-REGISTRATION HASH: SHA256_VERIFIED</span>
                  </span>
                </div>
                <pre className="overflow-x-auto text-[11px] text-emerald-300 leading-relaxed">
                  {selectedExperiment.analysisPlanYaml}
                </pre>
              </div>
            )}

            {/* Hypotheses & Variables */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 space-y-1">
                <span className="font-bold text-indigo-950 uppercase tracking-wide text-[10px]">
                  Giả Thuyết Khoa Học Tiền Đăng Ký (Pre-registered Hypothesis):
                </span>
                <p className="text-indigo-900 leading-relaxed">
                  {selectedExperiment.hypothesis}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                  <span className="font-bold text-gray-700 uppercase tracking-wide text-[10px] block">
                    Biến Kết Quả Chính (Primary Outcome - Khóa):
                  </span>
                  <p className="font-bold text-gray-900">
                    {selectedExperiment.primaryOutcome}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                  <span className="font-bold text-gray-700 uppercase tracking-wide text-[10px] block">
                    Đối Tượng & Tiêu Chí Đủ Điều Kiện:
                  </span>
                  <p className="text-gray-800">
                    {selectedExperiment.population}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 uppercase tracking-wide text-[10px] block">
                    Nhóm Can Thiệp (Intervention Group):
                  </span>
                  <p className="text-emerald-950">
                    {selectedExperiment.interventionGroup}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wide text-[10px] block">
                    Nhóm Đối Chứng (Control Group):
                  </span>
                  <p className="text-slate-900">
                    {selectedExperiment.controlGroup}
                  </p>
                </div>
              </div>
            </div>

            {/* Results Summary if active */}
            {selectedExperiment.resultsSummary && (
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 uppercase tracking-wide text-[10px]">
                    Kết Quả Ước Lượng Tác Động Trung Bình (Average Treatment Effect - ATE)
                  </span>
                  <span className="font-mono font-bold text-emerald-800">
                    p = {selectedExperiment.resultsSummary.pValue} (Significant)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-1">
                  <div className="p-2 bg-white rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-gray-500 block">ATE</span>
                    <span className="text-sm font-bold text-emerald-700 font-mono">
                      +{Math.round(selectedExperiment.resultsSummary.ate * 100)}%
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-gray-500 block">95% CI</span>
                    <span className="text-xs font-bold text-gray-800 font-mono">
                      [{selectedExperiment.resultsSummary.ci95[0]} - {selectedExperiment.resultsSummary.ci95[1]}]
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-gray-500 block">Transfer Gap</span>
                    <span className="text-sm font-bold text-indigo-700 font-mono">
                      {Math.round(selectedExperiment.resultsSummary.transferGap * 100)}%
                    </span>
                  </div>
                </div>

                <p className="text-emerald-950 italic text-[11px]">
                  <strong>Diễn giải:</strong> {selectedExperiment.resultsSummary.interpretation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
