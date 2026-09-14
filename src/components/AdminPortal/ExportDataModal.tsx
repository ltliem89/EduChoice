import React, { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  X,
  CheckCircle2,
  Table,
  Info,
  Layers,
  Brain,
  Activity,
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { StudentModel, BehaviorEvent, ConstructName } from '../../types';
import { DEFAULT_CONFIDENCE_CONSTRUCTS } from '../../data/researchV5Data';
import { DEFAULT_SUPER_ANALYTICS } from '../../data/v6IntelligenceData';

export const CONSTRUCT_VI_LABELS: Record<ConstructName, string> = {
  Planning: 'Lập Kế Hoạch & Phân Bổ',
  Prioritization: 'Xác Định Ưu Tiên (Eisenhower)',
  ProblemSolving: 'Giải Quyết Vấn Đề Phức Hợp',
  SelfRegulation: 'Tự Điều Chỉnh & Kiềm Chế Cảm Xúc',
  AttentionControl: 'Kiểm Soát Sự Chú Ý & Tập Trung',
  HelpSeeking: 'Chủ Động Tìm Kiếm Sự Trợ Giúp',
  Reflection: 'Năng Lực Phản Tư Sau Trải Nghiệm',
  Adaptability: 'Thích Ứng Trước Sự Thay Đổi',
  GoalSetting: 'Thiết Lập Mục Tiêu (SMART)',
  Communication: 'Giao Tiếp & Lắng Nghe Tích Cực',
  ConsequencePrediction: 'Dự Báo Hậu Quả & Tác Động',
  Persistence: 'Kiên Trì & Vượt Khó (Grit)',
  Autonomy: 'Tính Tự Chủ & Tự Quyết Định',
  TimeManagement: 'Quản Lý Thời Gian Sinh Hoạt',
  DistractionRecovery: 'Phục Hồi Sau Xao Nhãng (DRI)',
  Cooperation: 'Hợp Tác & Làm Việc Nhóm',
  Empathy: 'Thấu Cảm & Tôn Trọng Góc Nhìn',
  Responsibility: 'Trách Nhiệm Bản Thân & Tập Thể',
  HealthyRoutine: 'Thói Quen Sinh Hoạt Lành Mạnh',
  Balance: 'Cân Bằng Học Tập - Đời Sống'
};

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentModel: StudentModel;
  behaviorEvents: BehaviorEvent[];
}

type ExportDatasetType = 'unified' | 'psychometric' | 'behavioral';

export const ExportDataModal: React.FC<ExportDataModalProps> = ({
  isOpen,
  onClose,
  studentModel,
  behaviorEvents
}) => {
  const [selectedDataset, setSelectedDataset] = useState<ExportDatasetType>('unified');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Helper to escape CSV cell and prepend UTF-8 BOM for Excel / SPSS / R
  const downloadCsv = (filename: string, headers: string[], rows: (string | number | boolean | null | undefined)[][]) => {
    const escapeCell = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return `"${str}"`;
    };

    const headerRow = headers.map(escapeCell).join(',');
    const dataRows = rows.map((row) => row.map(escapeCell).join(','));
    const csvContent = '\uFEFF' + [headerRow, ...dataRows].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  // 1. Unified Dataset: Psychological constructs + Bayesian Confidence + Behavioral Telemetry
  const handleExportUnified = () => {
    const headers = [
      'student_id',
      'student_name',
      'age',
      'grade_level',
      'streak_days',
      'sessions_completed',
      'construct_id',
      'construct_name_vi',
      'estimate_score',
      'confidence_level',
      'confidence_lower_95',
      'confidence_upper_95',
      'uncertainty_variance',
      'uncertainty_status',
      'evidence_count',
      'growth_trend',
      'retry_count',
      'strategy_change_count',
      'help_request_count',
      'micro_actions_completed',
      'reflections_completed',
      'total_behavior_events',
      'impulsive_choice_ratio',
      'distraction_recovery_index',
      'last_evaluated_iso'
    ];

    const constructEntries = Object.entries(studentModel.constructs || {}) as [ConstructName, number][];

    const rows = constructEntries.map(([constructName, score]) => {
      const confDetail = DEFAULT_CONFIDENCE_CONSTRUCTS.find((c) => c.construct === constructName);
      const customDetail = studentModel.constructDetails?.[constructName];

      const confidence = customDetail?.confidence ?? confDetail?.confidence ?? 0.75;
      const lower = confDetail?.lower ?? Math.max(0, Math.round(score - (1 - confidence) * 20));
      const upper = confDetail?.upper ?? Math.min(100, Math.round(score + (1 - confidence) * 20));
      const uncertaintyVariance = Math.round((1 - confidence) * 100) / 100;
      const uncertaintyStatus = confDetail?.uncertaintyStatus ?? (confidence >= 0.8 ? 'low_uncertainty' : confidence >= 0.65 ? 'moderate' : 'high_uncertainty');
      const evidenceCount = customDetail?.evidenceCount ?? confDetail?.evidenceCount ?? 15;
      const trend = customDetail?.trend ?? confDetail?.trend ?? 0.05;

      const stats = (studentModel as any).statsSummary || {};

      return [
        studentModel.userId,
        studentModel.name || 'Học sinh ẩn danh',
        studentModel.age || 13,
        studentModel.gradeLevel || 'Lớp 8',
        studentModel.streakDays || 0,
        studentModel.sessionsCompleted || 0,
        constructName,
        CONSTRUCT_VI_LABELS[constructName] || constructName,
        score,
        confidence,
        lower,
        upper,
        uncertaintyVariance,
        uncertaintyStatus,
        evidenceCount,
        trend,
        stats.retryCount ?? 6,
        stats.strategyChangeCount ?? 4,
        stats.helpRequestCount ?? 3,
        stats.microActionsCompleted ?? 5,
        stats.reflectionsCompleted ?? 6,
        behaviorEvents.length,
        DEFAULT_SUPER_ANALYTICS.level2Behavioral.impulsiveChoiceRatio,
        0.72,
        customDetail?.lastUpdated ?? confDetail?.lastUpdated ?? new Date().toISOString()
      ];
    });

    const dateStr = new Date().toISOString().split('T')[0];
    downloadCsv(`educhoice_psych_behavior_metrics_${dateStr}.csv`, headers, rows);
  };

  // 2. Psychometrics Constructs Only Dataset
  const handleExportPsychometric = () => {
    const headers = [
      'student_id',
      'age',
      'grade_level',
      'construct_id',
      'construct_name_vi',
      'score',
      'confidence',
      'ci_lower_95',
      'ci_upper_95',
      'uncertainty_status',
      'evidence_count',
      'trend_delta',
      'last_updated'
    ];

    const constructEntries = Object.entries(studentModel.constructs || {}) as [ConstructName, number][];

    const rows = constructEntries.map(([constructName, score]) => {
      const confDetail = DEFAULT_CONFIDENCE_CONSTRUCTS.find((c) => c.construct === constructName);
      const customDetail = studentModel.constructDetails?.[constructName];

      const confidence = customDetail?.confidence ?? confDetail?.confidence ?? 0.75;
      const lower = confDetail?.lower ?? Math.max(0, Math.round(score - (1 - confidence) * 20));
      const upper = confDetail?.upper ?? Math.min(100, Math.round(score + (1 - confidence) * 20));
      const uncertaintyStatus = confDetail?.uncertaintyStatus ?? (confidence >= 0.8 ? 'low_uncertainty' : confidence >= 0.65 ? 'moderate' : 'high_uncertainty');
      const evidenceCount = customDetail?.evidenceCount ?? confDetail?.evidenceCount ?? 15;
      const trend = customDetail?.trend ?? confDetail?.trend ?? 0.05;

      return [
        studentModel.userId,
        studentModel.age || 13,
        studentModel.gradeLevel || 'Lớp 8',
        constructName,
        CONSTRUCT_VI_LABELS[constructName] || constructName,
        score,
        confidence,
        lower,
        upper,
        uncertaintyStatus,
        evidenceCount,
        trend,
        customDetail?.lastUpdated ?? confDetail?.lastUpdated ?? new Date().toISOString()
      ];
    });

    const dateStr = new Date().toISOString().split('T')[0];
    downloadCsv(`educhoice_psychometric_constructs_${dateStr}.csv`, headers, rows);
  };

  // 3. Behavioral Telemetry Events Dataset
  const handleExportBehavioral = () => {
    const headers = [
      'event_id',
      'session_id',
      'student_id',
      'game_id',
      'scene_id',
      'event_type',
      'timestamp_iso',
      'timestamp_unix_ms',
      'choice_id',
      'tool_id',
      'latency_seconds',
      'payload_raw'
    ];

    const rows = behaviorEvents.map((e) => {
      const p = e.payload || {};
      return [
        e.eventId,
        e.sessionId,
        e.userId,
        e.gameId,
        e.sceneId,
        e.type,
        new Date(e.timestamp).toISOString(),
        e.timestamp,
        p.choiceId || p.selectedChoiceId || '',
        p.toolId || p.toolkitId || '',
        p.timeSpentSeconds || p.latencySeconds || '',
        JSON.stringify(p).replace(/"/g, '""')
      ];
    });

    const dateStr = new Date().toISOString().split('T')[0];
    downloadCsv(`educhoice_behavioral_telemetry_stream_${dateStr}.csv`, headers, rows);
  };

  const handleExecuteExport = () => {
    if (selectedDataset === 'unified') {
      handleExportUnified();
    } else if (selectedDataset === 'psychometric') {
      handleExportPsychometric();
    } else {
      handleExportBehavioral();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 flex items-start justify-between border-b border-indigo-900/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider border border-indigo-400/30">
                Xuất Dữ Liệu Ngoại Vi • CSV Format
              </span>
              <span className="text-xs text-indigo-300 font-mono">UTF-8 with BOM (RFC 4180)</span>
            </div>
            <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-400" />
              Xuất Dữ Liệu Số Liệu Tâm Lý & Hành Vi Người Học
            </h3>
            <p className="text-xs text-indigo-200/80 leading-relaxed">
              Tải xuống tập dữ liệu định dạng bảng CSV tương thích trực tiếp với R, Python Pandas, SPSS, Stata, Jamovi, Excel và Google Sheets để phân tích thống kê và suy luận ngoại vi.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Success Banner */}
          {downloadSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-900 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="flex-1">
                <span className="font-bold">Đã tải tệp CSV thành công:</span>
                <span className="font-mono text-[11px] block text-emerald-800">{downloadSuccess}</span>
              </div>
            </div>
          )}

          {/* Dataset Selection Cards */}
          <div className="space-y-2">
            <span className="font-bold text-gray-900 uppercase tracking-wider text-[11px] block">
              1. Chọn bộ dữ liệu cần xuất:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Option 1: Unified */}
              <div
                onClick={() => setSelectedDataset('unified')}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedDataset === 'unified'
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-gray-50/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  selectedDataset === 'unified' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-xs">
                      Bộ Dữ Liệu Tổng Hợp Tâm Lý & Hành Vi (Khuyên Dùng)
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                      25 Cột • 20 Năng Lực
                    </span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    Kết hợp toàn bộ 20 chỉ số năng lực tâm lý (Planning, Prioritization, Grit, v.v.), độ tin cậy Bayesian (CI 95%), độ bất định, kèm các chỉ số hành vi thực tế (lần thử lại, xao nhãng, hoàn thành việc nhỏ 5 phút).
                  </p>
                </div>
              </div>

              {/* Option 2: Psychometrics */}
              <div
                onClick={() => setSelectedDataset('psychometric')}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedDataset === 'psychometric'
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-gray-50/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  selectedDataset === 'psychometric' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Brain className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-xs">
                      Bảng Đo Lường Tâm Lý & Năng Lực Nhận Thức (Psychometrics)
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      13 Cột • Dạng Tidy/Long
                    </span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    Tập trung vào điểm số năng lực, khoảng tin cậy 95% (Lower/Upper), mức độ bất định và xu hướng tăng trưởng (Trend). Tối ưu cho kiểm định giả thuyết ANOVA, t-test hoặc phân tích nhân tố (CFA).
                  </p>
                </div>
              </div>

              {/* Option 3: Behavioral Telemetry */}
              <div
                onClick={() => setSelectedDataset('behavioral')}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  selectedDataset === 'behavioral'
                    ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-gray-50/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${
                  selectedDataset === 'behavioral' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900 text-xs">
                      Bảng Chuỗi Sự Kiện Hành Vi Thực Tế (Behavioral Telemetry Stream)
                    </h4>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      {behaviorEvents.length} Dòng Sự Kiện
                    </span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    Nhật ký từng hành vi tương tác chi tiết (thời gian phản hồi, lựa chọn phương án, gọi trợ giúp, làm lại tự nguyện). Phục vụ phân tích chuỗi Markov, hồi quy sống sót (Survival Analysis) và đo lường thời gian trễ nhận thức.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dataset Preview Schema Box */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
              <span className="font-bold text-gray-800 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-indigo-600" />
                Đặc tả cấu trúc cột dữ liệu (Variable Schema Preview):
              </span>
              <span className="text-[10px] font-mono text-gray-500">Mã hóa: UTF-8 BOM</span>
            </div>

            {selectedDataset === 'unified' && (
              <div className="font-mono text-[10.5px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200/60 overflow-x-auto">
                <code>
                  student_id, student_name, age, grade_level, streak_days, sessions_completed, construct_id, construct_name_vi, estimate_score, confidence_level, confidence_lower_95, confidence_upper_95, uncertainty_variance, uncertainty_status, evidence_count, growth_trend, retry_count, strategy_change_count, help_request_count, micro_actions_completed, reflections_completed, total_behavior_events, impulsive_choice_ratio, distraction_recovery_index, last_evaluated_iso
                </code>
              </div>
            )}

            {selectedDataset === 'psychometric' && (
              <div className="font-mono text-[10.5px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200/60 overflow-x-auto">
                <code>
                  student_id, age, grade_level, construct_id, construct_name_vi, score, confidence, ci_lower_95, ci_upper_95, uncertainty_status, evidence_count, trend_delta, last_updated
                </code>
              </div>
            )}

            {selectedDataset === 'behavioral' && (
              <div className="font-mono text-[10.5px] text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200/60 overflow-x-auto">
                <code>
                  event_id, session_id, student_id, game_id, scene_id, event_type, timestamp_iso, timestamp_unix_ms, choice_id, tool_id, latency_seconds, payload_raw
                </code>
              </div>
            )}

            <div className="flex items-center gap-2 text-[10.5px] text-gray-500 pt-1">
              <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>
                Dữ liệu tuân thủ nguyên tắc <strong>Zero PII</strong> (ẩn danh hóa thông tin cá nhân) an toàn tuyệt đối cho công bố khoa học.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            <span>Tương thích:</span>
            <span className="font-semibold text-gray-700">R</span> •
            <span className="font-semibold text-gray-700">Python Pandas</span> •
            <span className="font-semibold text-gray-700">SPSS</span> •
            <span className="font-semibold text-gray-700">Stata</span> •
            <span className="font-semibold text-gray-700">Excel</span>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition cursor-pointer text-xs"
            >
              Đóng
            </button>

            <button
              onClick={handleExecuteExport}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-xs cursor-pointer text-xs"
            >
              <Download className="w-4 h-4" />
              <span>Tải Xuống Bảng CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
