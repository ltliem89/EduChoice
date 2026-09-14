import React, { useState } from 'react';
import {
  Gamepad2,
  Play,
  CheckCircle2,
  AlertTriangle,
  Archive,
  Eye,
  X,
  FileCode,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GameSpecification } from '../../types';
import { GameRuntime } from '../StudentApp/GameRuntime';
import { SoundEngine } from '../../utils/soundEffects';

export const GameManager: React.FC = () => {
  const { games, updateGameStatus, setAdminTab } = useApp();

  const [testplayGame, setTestplayGame] = useState<GameSpecification | null>(null);
  const [inspectSpecGame, setInspectSpecGame] = useState<GameSpecification | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredGames = games.filter((g) => {
    if (filterStatus === 'all') return true;
    return g.status === filterStatus;
  });

  const handleTogglePublish = (game: GameSpecification) => {
    SoundEngine.playSelect();
    const newStatus = game.status === 'published' ? 'approved' : 'published';
    updateGameStatus(game.gameId, newStatus);
  };

  const handleArchive = (game: GameSpecification) => {
    SoundEngine.playClick();
    updateGameStatus(game.gameId, 'archived');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Quản Lý Trò Chơi (Game Manager)
          </h2>
          <p className="text-xs text-gray-500">
            Giám sát phiên bản, kiểm tra runtime và phân phối trò chơi ra môi trường học sinh
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          {['all', 'published', 'approved', 'review', 'draft', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'Tất cả'
                : status === 'published'
                ? 'Đã xuất bản'
                : status === 'approved'
                ? 'Đã duyệt'
                : status === 'review'
                ? 'Chờ duyệt'
                : status === 'draft'
                ? 'Bản nháp'
                : 'Lưu trữ'}
            </button>
          ))}
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3.5 px-4">Tên Trò Chơi / ID</th>
                <th className="py-3.5 px-4">Constructs</th>
                <th className="py-3.5 px-4">Thời Lượng & Tuổi</th>
                <th className="py-3.5 px-4">Phân Cảnh</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4">An Toàn</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGames.map((game) => (
                <tr key={game.gameId} className="hover:bg-gray-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 text-sm">{game.title}</div>
                    <span className="font-mono text-[11px] text-gray-400">{game.gameId} (v{game.version})</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {game.constructs.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-600">
                    <div>{game.durationMinutes} phút</div>
                    <span className="text-[11px] text-gray-400">{game.ageRange.min}-{game.ageRange.max} tuổi</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-600">
                    {game.scenes.length} scenes
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        game.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : game.status === 'approved'
                          ? 'bg-amber-100 text-amber-800'
                          : game.status === 'review'
                          ? 'bg-purple-100 text-purple-800'
                          : game.status === 'archived'
                          ? 'bg-gray-100 text-gray-600'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {game.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        game.safety?.status === 'approved'
                          ? 'text-emerald-700'
                          : 'text-amber-700'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{game.safety?.status || 'needs_review'}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Live Playtest */}
                      <button
                        onClick={() => setTestplayGame(game)}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition"
                        title="Chơi thử ngay trong Sandbox"
                      >
                        <Play className="w-4 h-4 fill-current" />
                      </button>

                      {/* View DSL JSON */}
                      <button
                        onClick={() => setInspectSpecGame(game)}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
                        title="Xem JSON Specification"
                      >
                        <FileCode className="w-4 h-4" />
                      </button>

                      {/* Publish / Unpublish */}
                      <button
                        onClick={() => handleTogglePublish(game)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                          game.status === 'published'
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                        }`}
                      >
                        {game.status === 'published' ? 'Gỡ xuất bản' : 'Xuất bản'}
                      </button>

                      {/* Archive */}
                      {game.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(game)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                          title="Lưu trữ kịch bản"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Playtest Modal inside Admin */}
      {testplayGame && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-sm font-bold text-gray-900">
                  Phòng Thử Nghiệm Game Runtime: {testplayGame.title}
                </h3>
              </div>

              <button
                onClick={() => setTestplayGame(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <GameRuntime
              game={testplayGame}
              onExit={() => setTestplayGame(null)}
            />
          </div>
        </div>
      )}

      {/* Inspect DSL JSON Modal */}
      {inspectSpecGame && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl relative border border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-emerald-400 font-mono">
                  {inspectSpecGame.gameId}.json
                </h3>
                <span className="text-[11px] text-slate-400">
                  Game Specification chuẩn DSL (Draft 2020-12)
                </span>
              </div>

              <button
                onClick={() => setInspectSpecGame(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <pre className="p-4 bg-black/50 rounded-2xl text-xs font-mono text-emerald-300 overflow-x-auto max-h-96 leading-relaxed">
              {JSON.stringify(inspectSpecGame, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
