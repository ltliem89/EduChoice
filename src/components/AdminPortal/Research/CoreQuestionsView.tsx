import React from 'react';
import {
  Activity,
  Brain,
  Compass,
  CheckCircle2,
  FileSearch,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DEFAULT_CONFIDENCE_CONSTRUCTS, DEFAULT_TRANSFER_GAPS } from '../../../data/researchV5Data';

export const CoreQuestionsView: React.FC = () => {
  const { studentModel, behaviorEvents, adaptiveDecision, microActions, goals } = useApp();

  const retryEvents = behaviorEvents.filter((e) => e.type === 'retry').length;
  const choiceEvents = behaviorEvents.filter((e) => e.type === 'choice_made').length;
  const completedActions = microActions.filter((a) => a.status === 'completed').length;
  const activeGoals = goals.filter((g) => g.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-indigo-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
                Master Spec v5 • Section 132
              </span>
              <span className="text-xs text-indigo-300 font-mono">5 Core Research Questions</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">
              5 Câu Hỏi Nghiên Cứu & Trí Tuệ Thích Ứng Cốt Lõi
            </h2>
            <p className="text-xs text-indigo-200/80 max-w-3xl leading-relaxed">
              Hệ thống trả lời minh bạch 5 câu hỏi cốt lõi về hành vi, sự phát triển năng lực, logic can thiệp tiếp theo, kiểm chứng bằng chứng nhân quả và nguồn gốc giải thích quyết định.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl border border-white/15 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Zero-Clinical Diagnosis</p>
              <p className="text-[11px] text-indigo-200">Không gắn nhãn • Dựa trên bằng chứng quan sát</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 5 Core Questions */}
      <div className="space-y-4">
        {/* CÂU 1: HỌC SINH ĐANG LÀM GÌ? */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Câu 1: “Học sinh đang làm gì?” (Behavioral Analytics)
                </h3>
                <p className="text-xs text-gray-500">
                  Quan sát hành vi thời gian thực: tương tác, thử lại, tạm dừng, hành động thực tế.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              {behaviorEvents.length} sự kiện ghi nhận
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-gray-500 block">Quyết định trong game</span>
              <span className="text-lg font-black text-gray-900">{choiceEvents}</span>
              <span className="text-[10px] text-emerald-600 block font-semibold mt-0.5">Tự chủ lựa chọn</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-gray-500 block">Dũng cảm thử lại (Retry)</span>
              <span className="text-lg font-black text-amber-600">{retryEvents}</span>
              <span className="text-[10px] text-amber-700 block font-semibold mt-0.5">Tín hiệu kiên trì</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-gray-500 block">Việc nhỏ hoàn thành</span>
              <span className="text-lg font-black text-indigo-600">{completedActions}</span>
              <span className="text-[10px] text-indigo-700 block font-semibold mt-0.5">Hành động đời thực</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
              <span className="text-[11px] text-gray-500 block">Mục tiêu tuần đang theo</span>
              <span className="text-lg font-black text-emerald-600">{activeGoals}</span>
              <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">Cam kết dài hạn</span>
            </div>
          </div>
        </div>

        {/* CÂU 2: HỌC SINH ĐANG CÓ XU HƯỚNG PHÁT TRIỂN KỸ NĂNG NÀO? */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-sm">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Câu 2: “Học sinh đang có xu hướng phát triển kỹ năng nào?” (Growth Model + Uncertainty)
                </h3>
                <p className="text-xs text-gray-500">
                  Ước lượng năng lực kèm khoảng tin cậy 95% [Lower, Upper] và số lượng bằng chứng quan sát.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
              Mô hình Giáo dục Tích cực
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {DEFAULT_CONFIDENCE_CONSTRUCTS.slice(0, 4).map((c) => (
              <div key={c.construct} className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-gray-800">{c.construct}</span>
                  <span className="text-xs font-black text-indigo-600">{c.estimate}/100</span>
                </div>
                <div className="text-[10px] text-gray-500 flex items-center justify-between font-mono mb-2">
                  <span>95% CI: [{c.lower} - {c.upper}]</span>
                  <span className="text-indigo-700 font-semibold">{c.evidenceCount} evts</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${c.estimate}%` }}
                  />
                </div>
                <span className={`inline-block mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  c.uncertaintyStatus === 'low_uncertainty'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {c.uncertaintyStatus === 'low_uncertainty' ? 'Độ chắc chắn cao' : 'Độ bất định vừa'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CÂU 3: NÊN ĐƯA TRẢI NGHIỆM NÀO TIẾP THEO? */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-sm">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Câu 3: “Nên đưa trải nghiệm nào tiếp theo?” (Adaptive Policy Engine)
                </h3>
                <p className="text-xs text-gray-500">
                  Cân bằng giữa Exploit (chiến lược đã có bằng chứng tốt) và Explore (khám phá an toàn).
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
              Policy DSL v1.0.0
            </span>
          </div>

          <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-950">Gợi ý can thiệp hiện tại:</span>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[11px] font-bold">
                  {adaptiveDecision?.decision.nextGameId || 'game_48_minutes'}
                </span>
              </div>
              <p className="text-xs text-amber-900/80">
                {adaptiveDecision?.evidence.reasoning ||
                  'Tập trung củng cố năng lực Sắp Xếp Ưu Tiên (Prioritization) dưới áp lực 48 phút trước giờ hẹn.'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-mono text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                Độ tự tin: {Math.round((adaptiveDecision?.evidence.confidence || 0.84) * 100)}%
              </span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                An toàn: Safe Mode OK
              </span>
            </div>
          </div>
        </div>

        {/* CÂU 4: CAN THIỆP NÀO CÓ BẰNG CHỨNG HIỆU QUẢ? */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                4
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Câu 4: “Can thiệp nào có bằng chứng hiệu quả?” (Causal Engine & Transfer Gap)
                </h3>
                <p className="text-xs text-gray-500">
                  Phân biệt tương quan đơn thuần với bằng chứng nhân quả có kiểm soát yếu tố gây nhiễu (Confounders).
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              Evidence Level L2 & L3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {DEFAULT_TRANSFER_GAPS.slice(0, 2).map((gap) => (
              <div key={gap.domain} className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-800">{gap.domain}</span>
                  <span className="text-[11px] font-bold text-indigo-700">
                    Khoảng cách: {gap.transferGap}%
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-gray-600 font-mono">
                  <span>Thành công Game: {gap.gameSuccessRate}%</span>
                  <span>•</span>
                  <span>Làm việc ngoài đời: {gap.realWorldActionSuccessRate}%</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">
                  Khuyến nghị: {gap.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CÂU 5: VÌ SAO HỆ THỐNG ĐƯA RA QUYẾT ĐỊNH NÀY? */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center font-black text-sm">
                5
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Câu 5: “Vì sao hệ thống đưa ra quyết định này?” (Decision Provenance & Traceability)
                </h3>
                <p className="text-xs text-gray-500">
                  Truy nguyên quyết định: Dữ liệu thô → Chỉ số năng lực → Quy tắc chính sách → Lựa chọn can thiệp.
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold">
              Explainable AI (XAI)
            </span>
          </div>

          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-1.5">
              <span>TRUY NGUYÊN QUYẾT ĐỊNH CAN THIỆP #DEC_2026_0914</span>
              <span className="text-emerald-400 font-bold">PASS SAFETY FILTER (Level 1)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              [BẰNG CHỨNG QUAN SÁT] Học sinh đã có 3 lần chọn lướt điện thoại trong tình huống bận rộn; chỉ số Prioritization (55/100, 95% CI: [46-64]) thấp nhất trong nhóm Executive Function.
            </p>
            <p className="text-slate-300 leading-relaxed">
              [QUY TẮC CHÍNH SÁCH KÍCH HOẠT] Quy tắc "rule_safe_workload": Thời gian chơi phiên hiện tại &lt; 15 phút, đủ điều kiện cho trải nghiệm 3 phút "game_48_minutes" kèm Hộp công cụ Ma trận Eisenhower.
            </p>
            <p className="text-indigo-400 font-semibold">
              [KẾT QUẢ ĐỀ XUẤT] Chọn kịch bản "game_48_minutes" @ v1.2.0 • Mục tiêu chuyển hóa: Ghi ra 1 việc ưu tiên buổi tối.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
