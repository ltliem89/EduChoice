import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Smile,
  Heart,
  Coffee,
  BookOpen,
  Volume2,
  Zap,
  Sliders,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SoundEngine } from '../../utils/soundEffects';

interface FutureCalmHomeProps {
  onPlayGame: (gameId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const FutureCalmHome: React.FC<FutureCalmHomeProps> = ({ onPlayGame, onNavigateTab }) => {
  const { studentModel, games } = useApp();

  const [zeroOverwhelmMode, setZeroOverwhelmMode] = useState<boolean>(false);
  const [selectedAgencyOption, setSelectedAgencyOption] = useState<'recommended' | 'option_a' | 'option_b' | 'option_c'>('recommended');
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(600); // 10 minutes
  const [isCompletedStep, setIsCompletedStep] = useState<boolean>(false);

  const startTimer = () => {
    SoundEngine.playSelect();
    setIsTimerRunning(true);
  };

  const handleCompleteMicroStep = () => {
    SoundEngine.playSuccess();
    setIsCompletedStep(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* V7 Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Smile className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-gray-900">
                Giao Diện Học Sinh Tương Lai V7 (Future Calm UI)
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                Master Spec V7.31 - V7.33
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Thiết kế tập trung vào hành động nhỏ tiếp theo (MEI), bảo tồn năng lượng nhận thức và quyền tự chủ.
            </p>
          </div>
        </div>

        {/* Zero-Overwhelm Toggle (Master Spec V7.64) */}
        <button
          onClick={() => {
            SoundEngine.playClick();
            setZeroOverwhelmMode(!zeroOverwhelmMode);
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
            zeroOverwhelmMode
              ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-600" />
          <span>{zeroOverwhelmMode ? 'Đang bật: Giảm Tải Nhận Thức' : 'Bật Giảm Tải Nhận Thức (Zero-Overwhelm)'}</span>
        </button>
      </div>

      {/* CORE STUDENT FUTURE CARD (Master Spec V7.32 Layout) */}
      <div className="bg-gradient-to-b from-white to-indigo-50/30 p-6 sm:p-8 rounded-3xl border border-indigo-100/80 shadow-sm space-y-6">
        {/* Friendly greeting */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">Chào em 👋</span>
            <span className="font-semibold text-gray-700 text-sm">{studentModel.name || 'bạn nhỏ'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Hôm nay em muốn tiến một bước nhỏ?
          </h1>
          <p className="text-xs text-gray-500">
            Không cần vội vã. Một hành động 10 phút kiên trì mỗi ngày tạo nên thói quen bền bỉ.
          </p>
        </div>

        {/* 🎯 Mục tiêu hiện tại */}
        <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Mục Tiêu Trọng Tâm Hôm Nay</span>
            </span>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              Ưu tiên số 1
            </span>
          </div>
          <div className="text-base sm:text-lg font-black text-gray-900">
            Hoàn thành bài tập Khoa học Tự nhiên & Soạn sách vở ngày mai
          </div>
        </div>

        {/* 🧭 Bước nhỏ tiếp theo (Minimum Effective Intervention - MEI) */}
        <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Bước Nhỏ Tiếp Theo (MEI 10 Phút)</span>
            </span>
            <span className="text-xs text-indigo-100">
              Can thiệp liều lượng nhỏ nhất
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ngồi vào bàn & làm bài 10 phút đầu tiên
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-xl">
              Chỉ cần tập trung trọn vẹn trong 10 phút. Nếu sau 10 phút em cảm thấy đã vào guồng, em có thể làm tiếp; nếu mệt, em hoàn toàn có thể đứng dậy nghỉ ngơi!
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {!isCompletedStep ? (
              <button
                onClick={handleCompleteMicroStep}
                className="px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-50 rounded-2xl font-black text-sm shadow-md transition flex items-center gap-2 cursor-pointer transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hoàn thành bước nhỏ này</span>
              </button>
            ) : (
              <div className="px-5 py-2.5 bg-emerald-500/30 border border-emerald-300 text-white rounded-2xl font-bold text-sm flex items-center gap-2 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Tuyệt vời! Em đã hoàn thành bước 10 phút hôm nay!</span>
              </div>
            )}

            <button
              onClick={() => {
                const game = games[0];
                if (game) onPlayGame(game.id);
              }}
              className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-300" />
              <span>Chơi thử thách 3 phút để khởi động</span>
            </button>
          </div>
        </div>

        {/* If NOT zero-overwhelm mode, show details: Growth Areas & Student Agency */}
        {!zeroOverwhelmMode && (
          <>
            {/* 🌱 Năng lực đang phát triển */}
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                🌱 Năng Lực Đang Phát Triển Tích Cực:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Tập trung chú ý', score: 82, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
                  { name: 'Lập kế hoạch', score: 78, color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { name: 'Kiên trì vượt khó', score: 85, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { name: 'Phản tư tự chủ', score: 75, color: 'bg-amber-50 text-amber-800 border-amber-200' }
                ].map((cap, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 ${cap.color}`}
                  >
                    <span>{cap.name}</span>
                    <span className="font-mono font-bold opacity-80">{cap.score}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ✨ Gợi ý thích ứng nhẹ nhàng kèm Tự Chủ Học Sinh (Student Agency V7.85) */}
            <div className="p-5 bg-purple-50/70 border border-purple-100 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Gợi ý linh hoạt (Không bắt buộc - Quyền tự chủ của em):</span>
              </div>
              <p className="text-xs text-purple-900 leading-relaxed">
                "Thử chia nhiệm vụ làm bài tập thành 2 phần nhỏ: Làm 1 bài Toán trước, sau đó nghỉ giải lao 2 phút uống nước rồi mới làm bài tiếp theo."
              </p>

              {/* 3 Autonomy Options */}
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-purple-900 uppercase">
                  Em thích cách tiếp cận nào hôm nay?
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'option_a', label: 'A. Chia nhỏ nhiệm vụ' },
                    { id: 'option_b', label: 'B. Làm game 2 phút' },
                    { id: 'option_c', label: 'C. Tự chọn cách khác' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        SoundEngine.playClick();
                        setSelectedAgencyOption(opt.id as any);
                      }}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition cursor-pointer ${
                        selectedAgencyOption === opt.id
                          ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                          : 'bg-white text-purple-950 border-purple-200 hover:bg-purple-100/70'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* When in Zero Overwhelm Mode: Friendly calm message */}
        {zeroOverwhelmMode && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1 text-center">
            <Heart className="w-4 h-4 text-amber-600 mx-auto" />
            <p className="font-bold">Chế độ tối giản nhận thức đang hoạt động</p>
            <p className="text-amber-800 text-[11px]">
              Tất cả bảng biểu phân tích và thông số phức tạp đã được tạm ẩn. Hãy hít một hơi sâu và hoàn thành duy nhất 1 việc nhỏ phía trên nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
