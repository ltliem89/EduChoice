import React, { useState } from 'react';
import {
  Activity,
  Database,
  Download,
  RotateCw,
  ShieldCheck,
  Brain,
  Filter,
  Layers,
  FileSpreadsheet,
  GitBranch,
  GitPullRequest,
  FlaskConical,
  Cpu,
  Sparkles,
  Compass,
  BarChart3,
  BookOpen,
  Search,
  Radio,
  Sliders,
  TrendingUp,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MLForecastingView } from './Research/MLForecastingView';
import { CohortComparisonView } from './Research/CohortComparisonView';
import { CognitiveFusionView } from './Research/CognitiveFusionView';
import { DecisionRobustnessView } from './Research/DecisionRobustnessView';
import { CoreQuestionsView } from './Research/CoreQuestionsView';
import { ConfidenceModelView } from './Research/ConfidenceModelView';
import { KnowledgeGraphView } from './Research/KnowledgeGraphView';
import { CausalInferenceView } from './Research/CausalInferenceView';
import { ExperimentRegistryView } from './Research/ExperimentRegistryView';
import { PolicySimulatorView } from './Research/PolicySimulatorView';
import { MultiAgentFusionView } from './Research/MultiAgentFusionView';
import { SuperAnalyticsView } from './Research/SuperAnalyticsView';
import { ResearchDiscoveryView } from './Research/ResearchDiscoveryView';
import { CognitiveEvolutionView } from './Research/CognitiveEvolutionView';
import { V8_100_CANONICAL_TABLES } from '../../data/v8EvolutionData';
import { ExportDataModal } from './ExportDataModal';

type ResearchSubTab =
  | 'cognitive_evolution'
  | 'ml_forecasting'
  | 'cohort_comparison'
  | 'cognitive_fusion'
  | 'decision_robustness'
  | 'core_questions'
  | 'confidence_model'
  | 'knowledge_graph'
  | 'causal_inference'
  | 'experiments'
  | 'policy_simulator'
  | 'agent_fusion'
  | 'super_analytics'
  | 'research_discovery'
  | 'telemetry_sheets';

export const ResearchMetrics: React.FC = () => {
  const {
    behaviorEvents,
    studentModel,
    syncGoogleSheets,
    isSyncingSheets,
    sheetsLastSynced
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<ResearchSubTab>('cognitive_evolution');
  const [filterEventType, setFilterEventType] = useState<string>('all');
  const [tableSearchQuery, setTableSearchQuery] = useState<string>('');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const filteredEvents = behaviorEvents.filter((e) => {
    if (filterEventType === 'all') return true;
    return e.type === filterEventType;
  });

  const filteredTables = V8_100_CANONICAL_TABLES.filter(
    (t) =>
      t.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(tableSearchQuery.toLowerCase()) ||
      t.id.includes(tableSearchQuery)
  );

  const handleExportJson = () => {
    const dataStr = JSON.stringify(behaviorEvents, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `educhoice_telemetry_events_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    if (behaviorEvents.length === 0) return;
    const headers = ['eventId', 'sessionId', 'userId', 'gameId', 'sceneId', 'type', 'timestamp', 'payload'];
    const rows = behaviorEvents.map((e) => [
      e.eventId,
      e.sessionId,
      e.userId,
      e.gameId,
      e.sceneId,
      e.type,
      new Date(e.timestamp).toISOString(),
      JSON.stringify(e.payload || {}).replace(/"/g, '""')
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.map((f) => `"${f}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `educhoice_04_behavior_events_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Main Navigation Bar for Research Lab v6 */}
      <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-2 px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              V8
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Trung Tâm Nghiên Cứu & Động Cơ Tiến Hóa Nhận Thức V8 (Research Lab & Cognitive Evolution V8)
              </h2>
              <p className="text-[11px] text-gray-500">
                Master Spec V8 • Khám phá mẫu hình chưa biết • Đa mô hình thế giới • Bộ phản chứng Popper • Tranh biện đa Agent • Tiến hóa chính sách vNext • 100 Bảng dữ liệu chuẩn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Xuất các số liệu tâm lý và hành vi người học dưới dạng bảng CSV để phân tích ngoại vi"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất dữ liệu</span>
            </button>

            <button
              onClick={() => syncGoogleSheets()}
              disabled={isSyncingSheets}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSyncingSheets ? 'animate-spin' : ''}`} />
              <span>{isSyncingSheets ? 'Đang đồng bộ...' : 'Đồng bộ Sheets'}</span>
            </button>
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 text-xs">
          {[
            { id: 'cognitive_evolution', label: 'V8 Tiến Hóa Nhận Thức', icon: Sparkles },
            { id: 'ml_forecasting', label: 'Dự Báo Học Máy (ML Forecast)', icon: TrendingUp },
            { id: 'cohort_comparison', label: 'So Sánh 2 Nhóm (Cohort A/B)', icon: Users },
            { id: 'cognitive_fusion', label: 'V7 Hợp Nhất & Tín Hiệu Yếu', icon: Radio },
            { id: 'decision_robustness', label: 'V7 Bền Vững & MEI Ladder', icon: Sliders },
            { id: 'core_questions', label: '5 Câu Hỏi Cốt Lõi', icon: Compass },
            { id: 'confidence_model', label: 'Mô Hình Năng Lực & Bất Định', icon: Brain },
            { id: 'knowledge_graph', label: 'Đồ Thị Tri Thức & Can Thiệp', icon: GitBranch },
            { id: 'causal_inference', label: 'Nhân Quả & Transfer Gap', icon: GitPullRequest },
            { id: 'experiments', label: 'Sổ Đăng Ký Thử Nghiệm', icon: FlaskConical },
            { id: 'policy_simulator', label: 'Mô Phỏng Chính Sách DSL', icon: Cpu },
            { id: 'agent_fusion', label: 'Đa Agent & Hợp Nhất V6', icon: Sparkles },
            { id: 'super_analytics', label: 'Siêu Phân Tích 7 Cấp', icon: BarChart3 },
            { id: 'research_discovery', label: 'Khám Phá & Báo Cáo', icon: BookOpen },
            { id: 'telemetry_sheets', label: '100 Bảng Sheets Chuẩn', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as ResearchSubTab)}
                className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Research Sub-module */}
      {activeSubTab === 'cognitive_evolution' && <CognitiveEvolutionView />}
      {activeSubTab === 'ml_forecasting' && <MLForecastingView />}
      {activeSubTab === 'cohort_comparison' && <CohortComparisonView />}
      {activeSubTab === 'cognitive_fusion' && <CognitiveFusionView />}
      {activeSubTab === 'decision_robustness' && <DecisionRobustnessView />}
      {activeSubTab === 'core_questions' && <CoreQuestionsView />}
      {activeSubTab === 'confidence_model' && <ConfidenceModelView />}
      {activeSubTab === 'knowledge_graph' && <KnowledgeGraphView />}
      {activeSubTab === 'causal_inference' && <CausalInferenceView />}
      {activeSubTab === 'experiments' && <ExperimentRegistryView />}
      {activeSubTab === 'policy_simulator' && <PolicySimulatorView />}
      {activeSubTab === 'agent_fusion' && <MultiAgentFusionView />}
      {activeSubTab === 'super_analytics' && <SuperAnalyticsView />}
      {activeSubTab === 'research_discovery' && <ResearchDiscoveryView />}

      {/* TELEMETRY & SHEETS SUB-TAB */}
      {activeSubTab === 'telemetry_sheets' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-gray-900">
                  Cổng Dữ Liệu Google Sheets & Danh Mục 100 Bảng Chuẩn Hóa V8
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200">
                  Zero PII
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200 font-mono">
                  Master Spec V8.39
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Dữ liệu hành vi thô định danh ẩn danh (UserId: #{studentModel.userId}) đồng bộ trực tiếp lên 100 bảng dữ liệu chuẩn hóa
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất dữ liệu</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Xuất CSV (04)</span>
              </button>

              <button
                onClick={handleExportJson}
                className="px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất JSON</span>
              </button>
            </div>
          </div>

          {/* V6.36 Canonical Tables Catalog */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Danh Mục 62 Bảng Dữ Liệu Chuẩn Hóa V7 (V7 Canonical Tables)
                </h3>
                <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {filteredTables.length} / 62 Bảng
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bảng dữ liệu..."
                    value={tableSearchQuery}
                    onChange={(e) => setTableSearchQuery(e.target.value)}
                    className="py-1.5 pl-8 pr-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 w-56"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {filteredTables.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-gray-50 hover:bg-indigo-50/40 rounded-xl border border-gray-200 hover:border-indigo-200 transition text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-900 bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px]">
                      {t.name}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        parseInt(t.id, 10) <= 16
                          ? 'bg-blue-100 text-blue-800'
                          : parseInt(t.id, 10) <= 22
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {parseInt(t.id, 10) <= 16 ? 'V1-V4' : parseInt(t.id, 10) <= 22 ? 'V5' : 'V6'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-2">{t.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Event Stream Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden space-y-3 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Luồng Sự Kiện Hành Vi (04_BEHAVIOR_EVENTS)
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  ({behaviorEvents.length} events)
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <select
                  value={filterEventType}
                  onChange={(e) => setFilterEventType(e.target.value)}
                  className="py-1 px-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                >
                  <option value="all">Tất cả loại sự kiện</option>
                  <option value="game_started">game_started</option>
                  <option value="scene_viewed">scene_viewed</option>
                  <option value="choice_made">choice_made</option>
                  <option value="hint_requested">hint_requested</option>
                  <option value="retry">retry</option>
                  <option value="reflection_submitted">reflection_submitted</option>
                  <option value="micro_action_completed">micro_action_completed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Loại Sự Kiện</th>
                    <th className="py-2.5 px-3">Scene / Game</th>
                    <th className="py-2.5 px-3">Chi Tiết Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.slice(0, 30).map((evt) => (
                      <tr key={evt.eventId} className="hover:bg-gray-50 transition">
                        <td className="py-2 px-3 text-gray-400 whitespace-nowrap">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="py-2 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              evt.type === 'choice_made'
                                ? 'bg-indigo-50 text-indigo-700'
                                : evt.type === 'retry'
                                ? 'bg-amber-50 text-amber-700'
                                : evt.type === 'micro_action_completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : evt.type === 'reflection_submitted'
                                ? 'bg-purple-50 text-purple-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {evt.type}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-gray-700">
                          {evt.sceneId || evt.gameId}
                        </td>
                        <td className="py-2 px-3 text-gray-500 max-w-md truncate">
                          {JSON.stringify(evt.payload || {})}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-400 font-sans">
                        Chưa có sự kiện nào được ghi nhận. Hãy tương tác trong Cổng Học Sinh để bắt đầu thu thập telemetry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal for External Research Analysis */}
      <ExportDataModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        studentModel={studentModel}
        behaviorEvents={behaviorEvents}
      />
    </div>
  );
};
