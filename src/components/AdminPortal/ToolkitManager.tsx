import React, { useState } from 'react';
import {
  Brain,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  MessageSquare,
  Sparkles,
  Info,
  Search,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PsychologyToolkit } from '../../types';

export const ToolkitManager: React.FC = () => {
  const { toolkits } = useApp();
  const [selectedToolkit, setSelectedToolkit] = useState<PsychologyToolkit | null>(
    toolkits[0] || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredToolkits = toolkits.filter((t) =>
    t.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.purpose.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              Hộp Công Cụ Tâm Lý Học Đường (Psychology Toolkit)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              13/13 Đã Phê Duyệt
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Các chiến lược can thiệp hành vi giáo dục thực chứng được phép nhúng vào Game Specification
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ..."
            className="pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none w-56"
          />
        </div>
      </div>

      {/* Grid of Toolkits and Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Toolkits List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredToolkits.map((toolkit) => {
            const isSelected = selectedToolkit?.id === toolkit.id;
            return (
              <button
                key={toolkit.id}
                onClick={() => setSelectedToolkit(toolkit)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-300 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-indigo-700">
                    {toolkit.nameVi}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {toolkit.ageRange.min}-{toolkit.ageRange.max} tuổi
                  </span>
                </div>
                <div className="text-xs text-gray-600 font-medium mb-2">
                  {toolkit.name}
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                  {toolkit.purpose}
                </p>
              </button>
            );
          })}
        </div>

        {/* Toolkit Detail Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {selectedToolkit ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs space-y-6 sticky top-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedToolkit.nameVi}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Approved v{selectedToolkit.version}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    ID: {selectedToolkit.id} • Mã chuẩn quốc tế
                  </span>
                </div>
              </div>

              {/* Purpose & Mechanics */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-gray-900 uppercase tracking-wider block mb-1">
                    Mục tiêu giáo dục & tâm lý:
                  </span>
                  <p className="text-gray-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedToolkit.purpose}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-gray-900 uppercase tracking-wider block mb-1">
                    Cơ chế vận hành trong Game (Mechanics):
                  </span>
                  <p className="text-gray-700 leading-relaxed bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    {selectedToolkit.mechanics}
                  </p>
                </div>
              </div>

              {/* Micro Interventions */}
              <div>
                <span className="font-bold text-gray-900 uppercase tracking-wider text-xs block mb-2">
                  Vi can thiệp tức thời (Micro-Interventions):
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {selectedToolkit.microInterventions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Phrases vs Avoid Phrases (Crucial Safety Guideline) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Khẩu ngữ an toàn (Safe Phrases):
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-emerald-800">
                    {selectedToolkit.safePhrases.map((phrase, i) => (
                      <li key={i}>{phrase}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1.5">
                  <span className="font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 text-rose-600" />
                    Tuyệt đối tránh (Avoid Phrases):
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] text-rose-800">
                    {selectedToolkit.avoidPhrases.map((phrase, i) => (
                      <li key={i}>{phrase}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contraindications */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <span className="font-bold block mb-1">Chống chỉ định (Contraindications):</span>
                <span>{selectedToolkit.contraindications.join(', ')}</span>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-200">
              Chọn một công cụ tâm lý từ danh sách bên trái để xem chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
