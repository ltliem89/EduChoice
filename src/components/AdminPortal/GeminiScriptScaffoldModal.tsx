import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Target,
  Clock,
  Layers,
  RotateCcw,
  Zap,
  Check
} from 'lucide-react';
import { SoundEngine } from '../../utils/soundEffects';

interface ScriptScaffold {
  title: string;
  objectives: string;
  constructs: string[];
  durationMinutes: number;
  summary: string;
  rawScript: string;
  suggestedTags?: string[];
}

interface GeminiScriptScaffoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScaffold: (scaffold: ScriptScaffold) => void;
  currentMinAge: number;
  currentMaxAge: number;
}

const QUICK_TOPICS = [
  { label: '⚡ Trì hoãn & Nước đến chân mới nhảy', keywords: 'trì hoãn ôn thi, nước đến chân mới nhảy, phân vân ưu tiên' },
  { label: '📱 Lướt mạng xã hội trước giờ ngủ', keywords: 'cám dỗ mạng xã hội, lướt điện thoại ban đêm, mất ngủ' },
  { label: '🎯 Áp lực điểm số & Kỳ vọng gia đình', keywords: 'áp lực thành tích thi cử, sợ thất bại, lo âu điểm số' },
  { label: '👥 Xung đột & Đùn đẩy bài tập nhóm', keywords: 'xung đột làm việc nhóm, đùn đẩy trách nhiệm, bất đồng ý kiến' },
  { label: '🎮 Nghiện game online & Lỡ hẹn', keywords: 'ham chơi game quên giờ giấc, thất hứa với cha mẹ, quản lý thời gian' },
  { label: '🧘 Bốc đồng cảm xúc & Khó bình tĩnh', keywords: 'nổi nóng khi bị chê, kiềm chế cảm xúc, hít thở cân bằng' },
  { label: '🤝 Giấu dốt & Ngại tìm sự trợ giúp', keywords: 'sợ bị đánh giá khi hỏi bài, tự ti học tập, tìm kiếm sự hỗ trợ' }
];

export const GeminiScriptScaffoldModal: React.FC<GeminiScriptScaffoldModalProps> = ({
  isOpen,
  onClose,
  onApplyScaffold,
  currentMinAge,
  currentMaxAge
}) => {
  const [topicKeywords, setTopicKeywords] = useState('');
  const [selectedConstructs, setSelectedConstructs] = useState<string[]>([
    'Prioritization',
    'SelfRegulation',
    'Planning'
  ]);
  const [durationMinutes, setDurationMinutes] = useState(3);
  const [themeStyle, setThemeStyle] = useState('Tình huống thực tế học đường & sinh hoạt hàng ngày');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScaffold, setGeneratedScaffold] = useState<ScriptScaffold | null>(null);
  const [generationSource, setGenerationSource] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConstructToggle = (c: string) => {
    if (selectedConstructs.includes(c)) {
      if (selectedConstructs.length > 1) {
        setSelectedConstructs(selectedConstructs.filter((item) => item !== c));
      }
    } else {
      setSelectedConstructs([...selectedConstructs, c]);
    }
  };

  const handleGenerateScaffold = async () => {
    if (!topicKeywords.trim()) {
      setErrorMessage('Vui lòng nhập từ khóa chủ đề trước khi tạo khung kịch bản.');
      return;
    }

    setErrorMessage(null);
    setIsGenerating(true);
    SoundEngine.playSelect();

    try {
      const response = await fetch('/api/ai/generate-script-scaffold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicKeywords: topicKeywords.trim(),
          ageRange: { min: currentMinAge, max: currentMaxAge },
          durationMinutes,
          selectedConstructs,
          themeStyle
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Lỗi từ máy chủ khi tạo kịch bản.');
      }

      if (data.scaffold) {
        setGeneratedScaffold(data.scaffold);
        setGenerationSource(data.source || 'gemini-3.8-flash');
        SoundEngine.playSuccess();
      }
    } catch (err: any) {
      console.error('Error generating script scaffold:', err);
      setErrorMessage(err.message || 'Không thể tạo khung kịch bản.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedScaffold) {
      SoundEngine.playSuccess();
      onApplyScaffold(generatedScaffold);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Tạo Khung Kịch Bản Bằng Google Gemini
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-[10px] font-mono text-indigo-200">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Nhập từ khóa chủ đề học đường để AI tự động xây dựng bối cảnh, mâu thuẫn nhận thức và phân cảnh can thiệp.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-800 text-xs">
          {/* Section 1: Topic Keywords Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gray-800 text-xs flex items-center gap-1.5">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Từ khóa chủ đề kịch bản (Topic Keywords):</span>
              </label>
              <span className="text-[11px] text-gray-400">
                Nhập tự do bằng tiếng Việt
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={topicKeywords}
                onChange={(e) => setTopicKeywords(e.target.value)}
                placeholder="Ví dụ: 'trì hoãn ôn thi', 'áp lực điểm số', 'mê chơi game khuya', 'xung đột ý kiến nhóm'..."
                className="w-full text-xs font-semibold p-3.5 pl-4 pr-10 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isGenerating) {
                    handleGenerateScaffold();
                  }
                }}
              />
              {topicKeywords && (
                <button
                  onClick={() => setTopicKeywords('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Gợi ý chủ đề thường gặp (bấm để chọn nhanh):</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      SoundEngine.playClick();
                      setTopicKeywords(topic.keywords);
                    }}
                    className={`text-[11px] px-2.5 py-1.5 rounded-xl border transition cursor-pointer ${
                      topicKeywords === topic.keywords
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Parameters & Target Constructs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/70 rounded-2xl border border-slate-200">
            <div>
              <label className="font-semibold text-gray-700 text-xs block mb-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Phong cách bối cảnh:</span>
              </label>
              <select
                value={themeStyle}
                onChange={(e) => setThemeStyle(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl outline-none"
              >
                <option value="Tình huống thực tế học đường & sinh hoạt hàng ngày">Học đường & Sinh hoạt hàng ngày</option>
                <option value="Xung đột bạn bè & Hoạt động nhóm ngoại khóa">Xung đột bạn bè & Hoạt động nhóm</option>
                <option value="Áp lực gia đình & Quản lý thiết bị điện tử">Gia đình & Quản lý thiết bị điện tử</option>
                <option value="Kỳ thi chuyển cấp căng thẳng & Vượt qua thất bại">Kỳ thi căng thẳng & Vượt qua thất bại</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-700 text-xs block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Thời lượng micro-game dự kiến:</span>
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl outline-none"
              >
                <option value={2}>2 phút (Khởi động siêu ngắn)</option>
                <option value={3}>3 phút (Tiêu chuẩn đề xuất)</option>
                <option value={4}>4 phút (Tình huống nhiều ngã rẽ)</option>
                <option value={5}>5 phút (Thử thách tình huống sâu)</option>
              </select>
            </div>

            {/* Constructs selection */}
            <div className="sm:col-span-2 pt-2 border-t border-slate-200/60">
              <label className="font-semibold text-gray-700 text-xs block mb-1.5">
                Năng lực tâm lý mục tiêu (Chọn 2-3 năng lực):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Prioritization',
                  'Planning',
                  'SelfRegulation',
                  'ProblemSolving',
                  'ConsequencePrediction',
                  'TimeManagement',
                  'DistractionRecovery',
                  'Reflection',
                  'HelpSeeking',
                  'Communication'
                ].map((c) => {
                  const isSel = selectedConstructs.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleConstructToggle(c)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                        isSel
                          ? 'bg-indigo-600 text-white shadow-2xs'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleGenerateScaffold}
              disabled={isGenerating || !topicKeywords.trim()}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>
                {isGenerating
                  ? 'Google Gemini 3.8 Flash đang sáng tạo kịch bản...'
                  : 'Sáng Tạo Khung Kịch Bản Bằng Google Gemini'}
              </span>
            </button>
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 3: Generated Scaffold Preview */}
          {generatedScaffold && (
            <div className="p-5 bg-gradient-to-b from-indigo-50/50 to-white rounded-2xl border border-indigo-200 shadow-xs space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-gray-900 text-sm">
                    Khung Kịch Bản Đã Hoàn Thành
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Nguồn: {generationSource}
                </span>
              </div>

              {/* Title & Objectives */}
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Tiêu đề kịch bản:
                  </span>
                  <div className="text-sm font-black text-gray-900">
                    {generatedScaffold.title}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    Mục tiêu can thiệp:
                  </span>
                  <p className="text-xs text-gray-700">
                    {generatedScaffold.objectives}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {generatedScaffold.constructs.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold"
                    >
                      {c}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-bold">
                    ⏱️ {generatedScaffold.durationMinutes} phút
                  </span>
                </div>
              </div>

              {/* Raw Script Textarea Preview */}
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Nội dung kịch bản chi tiết (Bối cảnh, Lựa chọn A/B/C, Hậu quả, Toolkit, Phản tư):
                </span>
                <textarea
                  readOnly
                  value={generatedScaffold.rawScript}
                  rows={8}
                  className="w-full text-[11px] font-mono p-3 bg-white rounded-xl border border-indigo-200 text-gray-800 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Apply Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleApply}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Áp Dụng Vào Trình Soạn Thảo Script</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>EduChoice-AI • Module Google Gemini Scenario Studio</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
