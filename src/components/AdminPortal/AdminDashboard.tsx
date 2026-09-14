import React from 'react';
import {
  FileText,
  Gamepad2,
  Brain,
  Activity,
  CheckCircle2,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  Database,
  ShieldCheck,
  RotateCw,
  Cloud
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const {
    games,
    scripts,
    toolkits,
    behaviorEvents,
    setAdminTab,
    syncGoogleSheets,
    isSyncingSheets,
    sheetsLastSynced,
    auditLogs
  } = useApp();

  const publishedCount = games.filter((g) => g.status === 'published').length;
  const reviewCount = games.filter((g) => g.status === 'review' || g.safety.status === 'needs_review').length;
  const draftCount = games.filter((g) => g.status === 'draft').length;

  const handleSync = async () => {
    const res = await syncGoogleSheets();
    alert(res.message);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Hệ Quản Trị & Xuất Bản Kịch Bản v3
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            Trung Tâm Điều Hành EduChoice-AI
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Google AI Studio Game Design • Kiểm duyệt an toàn • Gateway Dữ liệu Google Sheets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminTab('v10cloud')}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Cloud className="w-4 h-4" />
            <span>☁️ Đám Mây V10 Remote</span>
          </button>

          <button
            onClick={() => setAdminTab('scripts')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Soạn kịch bản & AI Studio</span>
          </button>

          <button
            onClick={handleSync}
            disabled={isSyncingSheets}
            className="px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
            <span>Đồng bộ Sheets ({behaviorEvents.length})</span>
          </button>
        </div>
      </div>

      {/* V10 Cloud Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-800/50 rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Kiến Trúc Quản Trị Từ Xa V10 Sẵn Sàng</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Active v10.0.0
              </span>
            </div>
            <p className="text-xs text-indigo-200/80 mt-0.5">
              Vercel Frontend ↔ Apps Script Serverless Gateway ↔ Google Sheets Database • Ràng buộc ô (Field-First) • Chống ghi trùng • Đọc-sau-ghi.
            </p>
          </div>
        </div>

        <button
          onClick={() => setAdminTab('v10cloud')}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Khám Phá V10 Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Trò chơi đã xuất bản</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{publishedCount}</span>
            <span className="text-xs text-emerald-600 font-semibold">/ {games.length} tổng số</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            {reviewCount} kịch bản đang chờ duyệt • {draftCount} bản nháp
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Kịch bản thô (Scripts)</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{scripts.length}</span>
            <span className="text-xs text-indigo-600 font-semibold">Kịch bản</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Sẵn sàng để Gemini phân tích tạo DSL JSON
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Hộp công cụ tâm lý</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{toolkits.length}</span>
            <span className="text-xs text-purple-600 font-semibold">Đã phê duyệt</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Tuân thủ danh mục tâm lý học đường thực chứng
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Sự kiện hành vi (Telemetry)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">{behaviorEvents.length}</span>
            <span className="text-xs text-amber-600 font-semibold">Events</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Ghi nhận choice_made, retry, reflection
          </p>
        </div>
      </div>

      {/* Main Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pipeline Architecture & Fast Action */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visual Architecture Flow */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Quy trình sản xuất & Kiểm duyệt nội dung (Creation Pipeline)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Bước 1</span>
                <p className="text-xs font-bold text-slate-800 mt-1">Admin Script</p>
                <span className="text-[10px] text-slate-500 block mt-0.5">Nhập kịch bản & mục tiêu</span>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                <span className="text-[11px] font-bold text-indigo-500 uppercase">Bước 2</span>
                <p className="text-xs font-bold text-indigo-900 mt-1">AI Studio Design</p>
                <span className="text-[10px] text-indigo-600 block mt-0.5">Tạo Game Spec DSL</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-500 uppercase">Bước 3</span>
                <p className="text-xs font-bold text-amber-900 mt-1">Validator & Review</p>
                <span className="text-[10px] text-amber-700 block mt-0.5">Kiểm tra Schema & Safety</span>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-500 uppercase">Bước 4</span>
                <p className="text-xs font-bold text-emerald-900 mt-1">Publish Runtime</p>
                <span className="text-[10px] text-emerald-700 block mt-0.5">Phục vụ học sinh</span>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Quy tắc sắt EduChoice-AI v3:</span> AI không bao giờ trực tiếp xuất bản nội dung cho học sinh. Mọi Game Specification do AI tạo đều phải vượt qua bộ lọc JSON Schema, danh mục Toolkit đã duyệt và nút Phê duyệt của Admin.
              </div>
            </div>
          </div>

          {/* Quick Script Actions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Kịch bản trong hệ thống
              </h3>
              <button
                onClick={() => setAdminTab('scripts')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Xem tất cả ({scripts.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {scripts.slice(0, 3).map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-800">{s.title}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          s.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : s.status === 'review'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      Thời lượng: {s.durationMinutes} phút • Độ tuổi: {s.ageRange.min}-{s.ageRange.max} • Constructs: {s.constructs.join(', ')}
                    </span>
                  </div>

                  <button
                    onClick={() => setAdminTab('scripts')}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition flex-shrink-0"
                  >
                    Mở Trình Soạn Thảo
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Google Sheets Sync & Recent Audit Logs */}
        <div className="space-y-6">
          {/* Sheets Sync Gateway */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Google Sheets Gateway</h4>
                <span className="text-[11px] text-gray-500">Bảng: 04_BEHAVIOR_EVENTS</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Số sự kiện chờ đồng bộ:</span>
                <span className="font-bold text-gray-900">{behaviorEvents.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Trạng thái kết nối:</span>
                <span className="font-semibold text-emerald-600">Sẵn sàng (Apps Script)</span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-200">
                <span>Lần đồng bộ gần nhất:</span>
                <span>{sheetsLastSynced ? new Date(sheetsLastSynced).toLocaleTimeString() : 'Chưa đồng bộ'}</span>
              </div>
            </div>

            <button
              onClick={handleSync}
              disabled={isSyncingSheets}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
              <span>{isSyncingSheets ? 'Đang truyền dữ liệu...' : 'Đẩy sự kiện lên Sheets ngay'}</span>
            </button>
          </div>

          {/* Recent Audit Logs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Nhật ký kiểm toán gần nhất
              </h4>
              <button
                onClick={() => setAdminTab('audit')}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Chi tiết
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {auditLogs.slice(0, 3).map((log) => (
                <div key={log.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/70">
                  <div className="flex items-center justify-between text-gray-500 mb-1">
                    <span className="font-semibold text-gray-800">{log.actor}</span>
                    <span className="text-[10px]">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{log.diffNotes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
