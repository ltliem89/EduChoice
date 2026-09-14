import React, { useState } from 'react';
import {
  FileText,
  Lightbulb,
  GitFork,
  Activity,
  Award,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Search,
  BookOpen,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  DEFAULT_RESEARCH_HYPOTHESES,
  DEFAULT_RESEARCH_BRIEF,
  DEFAULT_DATA_LINEAGE,
  DEFAULT_CALIBRATION_AND_DRIFT
} from '../../../data/v6IntelligenceData';
import {
  ResearchHypothesis,
  AutomatedResearchBrief,
  DataLineageNode,
  CalibrationAndDriftState
} from '../../../types';

export const ResearchDiscoveryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brief' | 'hypotheses' | 'lineage' | 'calibration'>('brief');
  const [brief] = useState<AutomatedResearchBrief>(DEFAULT_RESEARCH_BRIEF);
  const [hypotheses] = useState<ResearchHypothesis[]>(DEFAULT_RESEARCH_HYPOTHESES);
  const [lineage] = useState<DataLineageNode[]>(DEFAULT_DATA_LINEAGE);
  const [calibDrift] = useState<CalibrationAndDriftState>(DEFAULT_CALIBRATION_AND_DRIFT);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-purple-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-bold uppercase tracking-wider border border-purple-400/30">
                Master Spec V6 • Section V6.23 - V6.31
              </span>
              <span className="text-xs text-purple-300 font-mono">Automated Brief, Hypotheses & Lineage 2.0</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Trung Tâm Khám Phá Khoa Học & Báo Cáo Thực Nghiệm Tự Động
            </h2>
            <p className="text-xs text-purple-200/80 max-w-3xl leading-relaxed">
              Tự động tổng hợp báo cáo nghiên cứu sẵn sàng công bố, phát sinh giả thuyết từ mẫu hình dữ liệu, đồ thị truy vết nguồn gốc dữ liệu (Data Lineage 2.0) và kiểm định độ chuẩn xác dự báo xác suất (Calibration & Drift).
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white/10 p-1.5 rounded-2xl border border-white/15 self-start md:self-auto overflow-x-auto text-xs">
            <button
              onClick={() => setActiveTab('brief')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'brief'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Báo Cáo Tự Động
            </button>
            <button
              onClick={() => setActiveTab('hypotheses')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'hypotheses'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Kho Giả Thuyết (Hn)
            </button>
            <button
              onClick={() => setActiveTab('lineage')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'lineage'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Truy Vết Dữ Liệu
            </button>
            <button
              onClick={() => setActiveTab('calibration')}
              className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'calibration'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              Hiệu Chuẩn & Trôi Dạt
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: AUTOMATED RESEARCH BRIEF (V6.24) */}
      {activeTab === 'brief' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded border border-purple-200 font-bold">
                  Bản Ghi #{brief.briefId} • Mẫu N={brief.sampleCount}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">{brief.title}</h3>
                <p className="text-xs text-gray-500">Đối tượng: {brief.cohortName} • Ngày lập: {brief.generatedDate}</p>
              </div>

              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(brief, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `research_brief_${brief.briefId}.json`;
                  a.click();
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Báo Cáo JSON</span>
              </button>
            </div>

            {/* Executive Summary */}
            <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 text-xs space-y-1.5">
              <span className="font-bold text-purple-950 uppercase tracking-wider block">
                Tóm Tắt Quản Trị & Nghiên Cứu (Executive Summary):
              </span>
              <p className="text-gray-700 leading-relaxed">{brief.executiveSummary}</p>
            </div>

            {/* Construct Progressions & Effect Sizes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Mức Độ Tăng Trưởng & Kích Thước Hiệu Ứng (Effect Sizes d)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {brief.constructProgressions.map((prog, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{prog.construct}</span>
                      <span className="font-mono font-bold text-emerald-600">{prog.gainDelta} pt</span>
                    </div>

                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span>Trước: {prog.baselineMean}</span>
                      <span>Sau: {prog.postInterventionMean}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-200/70 flex justify-between items-center font-mono">
                      <span className="text-gray-500 text-[10px]">Cohen's d:</span>
                      <span className="text-sm font-black text-purple-700">{prog.effectSizeD}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mechanism & Validity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="font-bold text-gray-900 uppercase tracking-wide block">
                  Cơ Chế Kích Hoạt Hành Vi Thực Chứng (Mechanism Analysis):
                </span>
                <p className="text-gray-600 leading-relaxed">{brief.mechanismSynthesis}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                <span className="font-bold text-rose-950 uppercase tracking-wide block">
                  Nguy Cơ Đến Tính Hợp Lệ (Threats to Validity):
                </span>
                <ul className="list-disc pl-4 space-y-1 text-gray-600">
                  {brief.threatsToValidity.map((th, i) => (
                    <li key={i}>{th}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Publication Ready Abstract */}
            <div className="p-4 bg-slate-900 text-gray-200 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white uppercase tracking-wide">
                  Tóm Tắt Bài Báo Khoa Học (Publication-Ready Abstract):
                </span>
              </div>
              <p className="text-gray-300 italic leading-relaxed">{brief.publicationAbstractVi}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HYPOTHESES (V6.23) */}
      {activeTab === 'hypotheses' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  ĐỘNG CƠ PHÁT SINH GIẢ THUYẾT NGHIÊN CỨU (HYPOTHESIS GENERATOR)
                </h3>
                <p className="text-xs text-gray-500">
                  Tự động quét mẫu hình trong chuỗi hành vi học sinh để đề xuất các giả thuyết kiểm định thống kê.
                </p>
              </div>
              <span className="text-xs font-mono text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200 font-bold">
                {hypotheses.length} Giả thuyết hoạt động
              </span>
            </div>

            <div className="space-y-3">
              {hypotheses.map((hyp) => (
                <div
                  key={hyp.hypothesisId}
                  className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition shadow-2xs space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold font-mono text-[10px]">
                        {hyp.hypothesisId}
                      </span>
                      <span className="font-bold text-gray-900">{hyp.statementVi}</span>
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded self-start sm:self-auto ${
                        hyp.status === 'ACCEPTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {hyp.status === 'ACCEPTED' ? 'Đã nghiệm chứng' : 'Đang thử nghiệm'}
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
                    <strong>Mẫu hình quan sát được:</strong> {hyp.observedPattern}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] pt-1">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block text-[10px]">Độ mạnh bằng chứng:</span>
                      <span className="font-bold text-indigo-700">{hyp.evidenceStrength}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block text-[10px]">Cỡ mẫu N:</span>
                      <span className="font-bold text-gray-900">{hyp.sampleSize}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block text-[10px]">Giá trị p (p-value):</span>
                      <span className="font-bold text-emerald-600">{hyp.pValueProxy}</span>
                    </div>
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block text-[10px]">Kích thước hiệu ứng d:</span>
                      <span className="font-bold text-purple-700">{hyp.effectSizeEstimate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DATA LINEAGE 2.0 (V6.26) */}
      {activeTab === 'lineage' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                ĐỒ THỊ TRUY VẾT NGUỒN GỐC DỮ LIỆU (DATA LINEAGE 2.0 DAG)
              </h3>
              <p className="text-xs text-gray-500">
                Truy vết toàn bộ vòng đời từ sự kiện hành vi nguyên thủy đến quyết định can thiệp thích ứng và kết quả thực tế.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              100% Khả Năng Kiểm Toán
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {lineage.map((node, idx) => (
              <div
                key={node.nodeId}
                className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-purple-300 transition space-y-2 text-xs shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-[11px]">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-gray-900">{node.name}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 self-start sm:self-auto">
                    {node.stage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 pt-1">
                  <div>
                    <span className="font-semibold text-gray-700">Đầu vào (Inputs):</span>{' '}
                    <span className="font-mono text-[11px]">{node.inputs.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Xử lý (Transformation):</span>{' '}
                    <span>{node.transformation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-1 border-t border-gray-100">
                  <span>Cập nhật: {node.lastUpdated}</span>
                  <span className="text-emerald-700 font-bold">Chỉ số chất lượng: {node.dataQualityScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CALIBRATION & DRIFT (V6.30, V6.31) */}
      {activeTab === 'calibration' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Calibration */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  ĐỘ CHUẨN XÁC XÁC SUẤT (MODEL CALIBRATION)
                </h3>
                <p className="text-xs text-gray-500">
                  Đo lường sự trùng khớp giữa xác suất mô hình dự báo và tần suất quan sát thực tế.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-gray-500 block">Điểm Brier (Brier Score):</span>
                  <span className="text-xl font-black text-emerald-700">{calibDrift.calibration.brierScore}</span>
                  <span className="text-[10px] text-gray-400 block font-mono">Gần 0 = Rất xuất sắc</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-gray-500 block">Sai số chuẩn hóa (ECE):</span>
                  <span className="text-xl font-black text-emerald-700">
                    {Math.round(calibDrift.calibration.expectedCalibrationError * 1000) / 10}%
                  </span>
                  <span className="text-[10px] text-gray-400 block font-mono">Dưới ngưỡng chuẩn 5%</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-700 block">Biểu Đồ Độ Tin Cậy (Reliability Bins):</span>
                {calibDrift.calibration.reliabilityBins.map((bin, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-gray-50 rounded-xl">
                    <span className="font-mono text-gray-600">{bin.confidenceBin}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${bin.accuracy * 100}%` }} />
                      </div>
                      <span className="font-mono font-bold text-gray-900 text-[11px] w-10 text-right">
                        {Math.round(bin.accuracy * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drift Intelligence */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  GIÁM SÁT TRÔI DẠT DỮ LIỆU & CHÍNH SÁCH (DRIFT MONITOR)
                </h3>
                <p className="text-xs text-gray-500">
                  Phát hiện biến đổi trong hành vi học sinh (Data Drift) hoặc quy tắc can thiệp (Policy Drift).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block">Trôi dạt phân phối (PSI):</span>
                  <span className="text-xl font-black text-indigo-700">{calibDrift.drift.dataDriftPsi}</span>
                  <span className="text-[10px] text-emerald-600 block">Ổn định (PSI &lt; 0.1)</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="text-gray-500 block">Trôi dạt khái niệm (p-val):</span>
                  <span className="text-xl font-black text-indigo-700">{calibDrift.drift.conceptDriftPValue}</span>
                  <span className="text-[10px] text-emerald-600 block">Không trôi dạt (p &gt; 0.05)</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-950 uppercase">Trạng Thái Hệ Thống: ỔN ĐỊNH</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{calibDrift.drift.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
