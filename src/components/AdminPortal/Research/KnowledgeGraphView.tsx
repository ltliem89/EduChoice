import React, { useState } from 'react';
import {
  GitBranch,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Info,
  CheckCircle,
  ExternalLink,
  Filter
} from 'lucide-react';
import {
  DEFAULT_KG_NODES,
  DEFAULT_KG_EDGES,
  DEFAULT_INTERVENTIONS
} from '../../../data/researchV5Data';
import { KnowledgeGraphNode, InterventionDefinition } from '../../../types';

export const KnowledgeGraphView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode>(DEFAULT_KG_NODES[0]);
  const [activeTab, setActiveTab] = useState<'graph' | 'interventions'>('graph');

  const filteredNodes = DEFAULT_KG_NODES.filter((n) => {
    if (selectedType === 'all') return true;
    return n.type === selectedType;
  });

  const connectedEdges = DEFAULT_KG_EDGES.filter(
    (e) => e.from === selectedNode.id || e.to === selectedNode.id
  );

  const getNodeColor = (type: KnowledgeGraphNode['type']) => {
    switch (type) {
      case 'construct':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'behavior':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'game':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'intervention':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'micro_action':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'outcome':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getEvidenceBadge = (level: InterventionDefinition['evidenceLevel']) => {
    switch (level) {
      case 'L3_REPLICATED_EVIDENCE':
        return { text: 'Level L3: Thực Chứng Lặp Lại', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'L2_CONTROLLED_STUDY':
        return { text: 'Level L2: Thử Nghiệm Có Đối Chứng', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'L1_PILOT_EVIDENCE':
        return { text: 'Level L1: Thử Nghiệm Pilot', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'L0_EXPERT_DESIGN':
      default:
        return { text: 'Level L0: Thiết Kế Chuyên Gia', color: 'bg-gray-100 text-gray-800 border-gray-300' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs: Visual Graph vs Intervention Registry */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'graph'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Đồ Thị Tri Thức Giáo Dục (Knowledge Graph)</span>
          </button>

          <button
            onClick={() => setActiveTab('interventions')}
            className={`px-4 py-2 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'interventions'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Danh Mục Can Thiệp & Mức Bằng Chứng (L0 - L3)</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-gray-500 hidden sm:inline px-3">
          Master Spec v5 • Section 19-21
        </span>
      </div>

      {activeTab === 'graph' ? (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-gray-700">Lọc loại nút:</span>
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'construct', label: 'Năng lực (Construct)' },
                { id: 'behavior', label: 'Hành vi (Behavior)' },
                { id: 'game', label: 'Trò chơi (Game)' },
                { id: 'intervention', label: 'Can thiệp (Intervention)' },
                { id: 'micro_action', label: 'Việc nhỏ (Micro-Action)' },
                { id: 'outcome', label: 'Kết quả (Outcome)' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedType(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                    selectedType === f.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-500 font-mono">
              {filteredNodes.length} nút • {DEFAULT_KG_EDGES.length} cạnh quan hệ
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visual Node Grid */}
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Mạng Lưới Thực Thể Kiến Trúc (Click để xem mối quan hệ)
                </h3>
                <span className="text-[11px] text-gray-400">Quan hệ chuẩn hóa 6 lớp</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border ${getNodeColor(
                            node.type
                          )}`}
                        >
                          {node.type}
                        </span>
                        {node.category && (
                          <span className="text-[10px] text-gray-400 font-medium">
                            {node.category}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 leading-snug">{node.label}</h4>
                      {node.details && (
                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{node.details}</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Node Inspector Panel */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Chi Tiết Thực Thể Đang Chọn
                </h3>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 space-y-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border ${getNodeColor(
                    selectedNode.type
                  )}`}
                >
                  {selectedNode.type}
                </span>
                <h4 className="text-sm font-bold text-gray-900">{selectedNode.label}</h4>
                <p className="text-xs text-gray-600">{selectedNode.details || 'Không có mô tả chi tiết'}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700">Các Mối Quan Hệ Liên Kết ({connectedEdges.length})</h4>
                {connectedEdges.length > 0 ? (
                  <div className="space-y-2">
                    {connectedEdges.map((edge) => {
                      const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
                      const otherNode = DEFAULT_KG_NODES.find((n) => n.id === otherId);
                      const isOutgoing = edge.from === selectedNode.id;

                      return (
                        <div
                          key={edge.id}
                          className="p-2.5 bg-gray-50/80 rounded-lg border border-gray-200/70 text-xs flex items-center justify-between gap-2"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-indigo-700 uppercase">
                              {isOutgoing ? `-> [${edge.relation}]` : `<- [${edge.relation}]`}
                            </span>
                            <p className="font-semibold text-gray-800 text-[11px]">
                              {otherNode?.label || otherId}
                            </p>
                          </div>
                          {edge.weight && (
                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-600">
                              Trọng số: {edge.weight}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">Chưa có liên kết trực tiếp</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INTERVENTION REGISTRY (Section 20-21) */
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Hồ Sơ Can Thiệp Giáo Dục (Intervention Registry)
                </h3>
                <p className="text-xs text-gray-500">
                  Mỗi can thiệp phải có cơ chế tâm lý rõ ràng, liên kết kịch bản, hành động thực tế và cấp độ bằng chứng thực nghiệm (L0 đến L3).
                </p>
              </div>

              <span className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                {DEFAULT_INTERVENTIONS.length} can thiệp chuẩn hóa
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_INTERVENTIONS.map((item) => {
                const badge = getEvidenceBadge(item.evidenceLevel);
                return (
                  <div
                    key={item.interventionId}
                    className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-300 transition shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-gray-400 block">
                          ID: {item.interventionId} • v{item.version}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${badge.color}`}
                      >
                        {badge.text}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1.5 border border-gray-100">
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Cơ chế:</strong> {item.mechanism}
                      </p>
                      <p className="text-gray-600">
                        <strong className="text-gray-900">Bối cảnh:</strong> {item.scenario}
                      </p>
                      <p className="text-indigo-700">
                        <strong className="text-indigo-900">Việc nhỏ ngoài đời:</strong> {item.microActionTitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-1">
                      <span>Cỡ mẫu: N={item.sampleSize}</span>
                      {item.effectSizeEstimate && (
                        <span className="text-emerald-700 font-bold">
                          Effect size: d = {item.effectSizeEstimate}
                        </span>
                      )}
                      <span className="text-gray-400">Đánh giá: {item.lastEvaluated}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
