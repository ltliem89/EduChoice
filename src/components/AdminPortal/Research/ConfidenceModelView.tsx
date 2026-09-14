import React from 'react';
import {
  Brain,
  ShieldCheck,
  TrendingUp,
  BarChart2,
  Info,
  Layers,
  HelpCircle,
  Database
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DEFAULT_CONFIDENCE_CONSTRUCTS } from '../../../data/researchV5Data';

export const ConfidenceModelView: React.FC = () => {
  const { studentModel } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-gray-900">
              Hồ Sơ Năng Lực Nhận Thức Độ Bất Định (Confidence-Aware Student Model)
            </h2>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-200">
            Master Spec v5 • Section 3-5, 29
          </span>
        </div>
        <p className="text-xs text-gray-500 max-w-4xl leading-relaxed">
          Thay vì chỉ lưu điểm số tuyệt đối, mô hình v5 ước lượng điểm kèm khoảng tin cậy 95% (Lower - Upper), mức độ chắc chắn (Confidence) và số lượng bằng chứng hành vi đã quan sát. 
          <strong className="text-gray-700 ml-1">Nguyên tắc: "Không chắc chắn &rarr; Khám phá nhẹ &rarr; Tuyệt đối không gắn nhãn".</strong>
        </p>
      </div>

      {/* Construct Cards with Uncertainty Intervals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEFAULT_CONFIDENCE_CONSTRUCTS.map((c) => {
          const rangeWidth = c.upper - c.lower;
          return (
            <div
              key={c.construct}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{c.construct}</h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {c.evidenceCount} sự kiện thực tế
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-indigo-600">{c.estimate}</span>
                  <span className="text-[11px] text-gray-400">/100</span>
                </div>
              </div>

              {/* Confidence Interval Visual representation */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Lower: {c.lower}</span>
                  <span className="text-indigo-700 font-bold">Điểm ước lượng</span>
                  <span>Upper: {c.upper}</span>
                </div>

                {/* Range bar */}
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden relative">
                  {/* CI shaded area */}
                  <div
                    className="absolute top-0 bottom-0 bg-indigo-100 rounded-full"
                    style={{
                      left: `${c.lower}%`,
                      width: `${rangeWidth}%`
                    }}
                  />
                  {/* Point estimate marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-indigo-600 rounded-full shadow-xs"
                    style={{ left: `calc(${c.estimate}% - 3px)` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px]">
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    c.uncertaintyStatus === 'low_uncertainty'
                      ? 'bg-emerald-100 text-emerald-800'
                      : c.uncertaintyStatus === 'moderate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {c.uncertaintyStatus === 'low_uncertainty'
                    ? 'Độ tin cậy cao'
                    : c.uncertaintyStatus === 'moderate'
                    ? 'Độ tin cậy vừa'
                    : 'Độ bất định cao'}
                </span>
                <span className="text-gray-500 font-mono">
                  Độ tự tin: {Math.round(c.confidence * 100)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Store & Rolling Windows (Section 29) */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Kho Đặc Trưng Thời Gian (Feature Store & Temporal Rolling Windows)
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">Strict Temporal Consistency (No Leakage)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 block">retry_rate_7d</span>
            <span className="text-base font-black text-gray-900">0.34</span>
            <p className="text-[10px] text-gray-500">Tỉ lệ thử lại trong cửa sổ 7 ngày gần nhất</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 block">strategy_change_14d</span>
            <span className="text-base font-black text-emerald-700">0.68</span>
            <p className="text-[10px] text-gray-500">Tỉ lệ đổi phương án mới khi thử lại trong 14 ngày</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 block">goal_completion_7d</span>
            <span className="text-base font-black text-indigo-700">0.71</span>
            <p className="text-[10px] text-gray-500">Tỉ lệ hoàn tất các mục tiêu tuần đăng ký</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
            <span className="text-[11px] font-mono text-gray-500 block">distraction_recovery_14d</span>
            <span className="text-base font-black text-amber-700">0.59</span>
            <p className="text-[10px] text-gray-500">Khả năng quay lại bài học sau khi tạm dừng</p>
          </div>
        </div>
      </div>
    </div>
  );
};
