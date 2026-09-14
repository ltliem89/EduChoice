import React from 'react';
import {
  GitPullRequest,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Percent,
  Compass
} from 'lucide-react';
import { DEFAULT_TRANSFER_GAPS, DEFAULT_CAUSAL_CLAIMS } from '../../../data/researchV5Data';

export const CausalInferenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">
              Lớp Suy Luận Nhân Quả & Đo Lường Khoảng Cách Chuyển Hóa (Causal Inference & Transfer Gap)
            </h2>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
            Master Spec v5 • Section 9-12, 74-75, 111
          </span>
        </div>
        <p className="text-xs text-gray-500 max-w-4xl leading-relaxed">
          Nguyên tắc bất khả xâm phạm: Hệ thống chủ động phân biệt giữa <strong>Tương quan đơn thuần (Correlation)</strong> và <strong>Bằng chứng nhân quả (Causal Evidence)</strong>; đo lường khoảng cách từ kịch bản số ra hành động ngoài đời thực (Transfer Gap). Tuyệt đối ngăn chặn phát biểu phóng đại.
        </p>
      </div>

      {/* 1. CAUSAL DAG GRAPH (Đồ Thị Hướng Có Hướng Acyclical) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Mô Hình Nhân Quả Cấu Trúc (Structural Causal DAG)
            </h3>
            <p className="text-xs text-gray-500">
              Định tuyến các biến gây nhiễu (Confounders), Can thiệp (Intervention), Trung gian (Mediator) và Kết quả (Outcome).
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Backdoor Criterion Checked
          </span>
        </div>

        {/* Visual Causal Flow Box */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl space-y-4 font-mono text-xs">
          <div className="text-[11px] text-slate-400">
            Sơ đồ chuỗi nhân quả của Can Thiệp Hành Vi EduChoice-AI:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            {/* Box 1: Confounders */}
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Biến Gây Nhiễu (Z)
              </span>
              <p className="text-xs font-bold text-slate-100">Độ tuổi, Điểm cơ bản, Thời gian rảnh</p>
              <span className="text-[9px] text-slate-400 block">Được kiểm soát trong mô hình</span>
            </div>

            {/* Box 2: Intervention */}
            <div className="p-3 bg-indigo-900/60 rounded-xl border border-indigo-600 space-y-1">
              <span className="text-[10px] uppercase font-bold text-indigo-300 block">
                Can Thiệp (X)
              </span>
              <p className="text-xs font-bold text-white">Hộp Công Cụ + Việc Nhỏ 5 Phút</p>
              <span className="text-[9px] text-indigo-300 block">Trải nghiệm chỉ định</span>
            </div>

            {/* Box 3: Mediator */}
            <div className="p-3 bg-purple-900/60 rounded-xl border border-purple-600 space-y-1">
              <span className="text-[10px] uppercase font-bold text-purple-300 block">
                Trung Gian (M)
              </span>
              <p className="text-xs font-bold text-white">Thay Đổi Chiến Lược (Adaptation)</p>
              <span className="text-[9px] text-purple-300 block">Tự chủ thay đổi hành vi</span>
            </div>

            {/* Box 4: Outcome */}
            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-600 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                Kết Quả Thực (Y)
              </span>
              <p className="text-xs font-bold text-white">Tiến Bộ Mục Tiêu Đời Thực</p>
              <span className="text-[9px] text-emerald-300 block">Outcome dài hạn (Distal)</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center pt-2">
            Đường dẫn nhân quả: X (Can thiệp) &rarr; M (Chiến lược đổi mới) &rarr; Y (Kết quả thực tế), sau khi triệt tiêu ảnh hưởng của Z (Nhiễu).
          </div>
        </div>
      </div>

      {/* 2. TRANSFER GAP MEASUREMENT (Master Spec Section 74-75) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Đo Lường Khoảng Cách Chuyển Hóa (Transfer Gap = GameSuccess - RealWorldActionSuccess)
            </h3>
            <p className="text-xs text-gray-500">
              Đánh giá xem việc học sinh thành công trong tình huống mô phỏng có thực sự chuyển hóa thành hành động ngoài đời hay không.
            </p>
          </div>
          <span className="text-xs font-mono text-gray-500">
            Ngưỡng an toàn: Gap &le; 20%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEFAULT_TRANSFER_GAPS.map((gap) => (
            <div
              key={gap.domain}
              className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-gray-900">{gap.domain}</h4>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    gap.transferStatus === 'healthy_transfer'
                      ? 'bg-emerald-100 text-emerald-800'
                      : gap.transferStatus === 'moderate_gap'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {gap.transferStatus === 'healthy_transfer'
                    ? 'Chuyển hóa tốt'
                    : gap.transferStatus === 'moderate_gap'
                    ? 'Khoảng cách vừa'
                    : 'Khoảng cách lớn'}
                </span>
              </div>

              {/* Compare Bar */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-gray-600 text-[11px]">
                  <span>Trong game (Simulation):</span>
                  <span className="font-bold text-indigo-700">{gap.gameSuccessRate}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${gap.gameSuccessRate}%` }}
                  />
                </div>

                <div className="flex justify-between text-gray-600 text-[11px] pt-1">
                  <span>Hành động đời thực (Real-world action):</span>
                  <span className="font-bold text-emerald-700">{gap.realWorldActionSuccessRate}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${gap.realWorldActionSuccessRate}%` }}
                  />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-gray-200/70 text-[11px] text-gray-600 space-y-1">
                <p className="font-bold text-gray-800">
                  Khoảng cách rò rỉ chuyển hóa: {gap.transferGap}%
                </p>
                <p className="text-gray-500 italic">{gap.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CAUSAL CLAIMS GOVERNANCE (Section 111 & 114) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Kiểm Soát Tuyên Bố Nhân Quả (Claim Governance & Anti-Overclaim)
            </h3>
            <p className="text-xs text-gray-500">
              Mọi khẳng định phải gắn liền với chỉ số tương quan, mức độ bằng chứng và các biến số đã kiểm soát.
            </p>
          </div>
          <span className="text-xs font-mono text-indigo-600">Strict Research Standards</span>
        </div>

        <div className="space-y-3">
          {DEFAULT_CAUSAL_CLAIMS.map((c) => (
            <div
              key={c.claimId}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition space-y-2 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="font-bold text-gray-900 text-sm">{c.relationship}</h4>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    c.causalEvidenceLevel === 'quasi_experimental'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.causalEvidenceLevel === 'preliminary_adjusted'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Bằng chứng: {c.causalEvidenceLevel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-600 font-mono bg-gray-50 p-2.5 rounded-lg">
                <div>{c.associationMetric}</div>
                <div>Đã kiểm soát: {c.confoundersControlled.join(', ')}</div>
              </div>

              <p className="text-gray-600 leading-relaxed text-[11px]">
                <strong>Nhận định chuyên môn:</strong> {c.guidanceNote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
