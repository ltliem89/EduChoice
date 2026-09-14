import React, { useState, useEffect } from 'react';
import {
  Wind,
  CheckCircle2,
  Brain,
  ArrowRight,
  MessageSquare,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SoundEngine } from '../../utils/soundEffects';

interface InterventionModalProps {
  toolkitId?: string;
  title?: string;
  onComplete: () => void;
}

export const InterventionModal: React.FC<InterventionModalProps> = ({
  toolkitId = 'prioritization',
  title,
  onComplete
}) => {
  // 1. Prioritization Matrix (Eisenhower 2x2 interactive game)
  const [eisenhowerItems] = useState([
    { id: '1', text: 'Nộp bài thi 40% điểm (còn 15 phút)', category: 'urgent_important' },
    { id: '2', text: 'Lướt xem video mạng xã hội 5 phút', category: 'not_urgent_not_important' },
    { id: '3', text: 'Dọn dẹp lại bàn học trước giờ mẹ về', category: 'urgent_not_important' }
  ]);
  const [userSorted, setUserSorted] = useState<Record<string, string>>({});

  // 2. Box Breathing (4-4-4-4)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [breathCount, setBreathCount] = useState(4);
  const [breathCycle, setBreathCycle] = useState(1);

  // 3. Assertive Communication (I-Message Formula)
  const [iMessageStep, setIMessageStep] = useState<{
    feeling: string;
    event: string;
    request: string;
  }>({
    feeling: '',
    event: '',
    request: ''
  });

  // 4. Cognitive Reframing (Flip Negative to Constructive)
  const [reframedSelected, setReframedSelected] = useState<number | null>(null);

  useEffect(() => {
    if (toolkitId === 'self_regulation') {
      const timer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              if (currentPhase === 'inhale') return 'hold1';
              if (currentPhase === 'hold1') return 'exhale';
              if (currentPhase === 'exhale') return 'hold2';
              setBreathCycle((c) => c + 1);
              return 'inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [toolkitId]);

  const handleSortItem = (itemId: string, category: string) => {
    SoundEngine.playSelect();
    setUserSorted((prev) => ({ ...prev, [itemId]: category }));
  };

  const isPrioritizationComplete = Object.keys(userSorted).length >= eisenhowerItems.length;

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-xl p-6 max-w-xl mx-auto my-4 text-left transition-all">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Hộp công cụ can thiệp tâm lý thực chứng
          </span>
          <h3 className="text-lg font-bold text-gray-900">
            {toolkitId === 'self_regulation'
              ? 'Tự điều hòa cảm xúc: Nhịp thở 4-4-4'
              : toolkitId === 'assertive_communication'
              ? 'Giao tiếp quyết đoán: Kỹ thuật Thông điệp "Tôi"'
              : toolkitId === 'cognitive_reframing'
              ? 'Tái cấu trúc nhận thức: Lật ngược góc nhìn'
              : 'Xác định mức độ ưu tiên: Ma trận Eisenhower'}
          </h3>
        </div>
      </div>

      {/* 1. Self Regulation: Breathing Tool */}
      {toolkitId === 'self_regulation' && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-600 mb-6">
            Khi cảm thấy căng thẳng hoặc tim đập nhanh, hãy điều hòa hệ thần kinh bằng cách hít thở theo nhịp:
          </p>

          <div className="relative w-40 h-40 mx-auto flex flex-col items-center justify-center mb-6">
            <div
              className={`absolute inset-0 rounded-full border-4 border-indigo-400 bg-indigo-50 transition-all duration-1000 flex items-center justify-center ${
                breathPhase === 'inhale'
                  ? 'scale-110 shadow-lg shadow-indigo-100'
                  : breathPhase === 'exhale'
                  ? 'scale-90 opacity-80'
                  : 'scale-100'
              }`}
            />
            <div className="relative z-10">
              <span className="text-3xl font-extrabold text-indigo-700">{breathCount}s</span>
              <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider mt-1">
                {breathPhase === 'inhale' && 'Hít vào chậm'}
                {breathPhase === 'hold1' && 'Giữ hơi thở'}
                {breathPhase === 'exhale' && 'Thở ra từ từ'}
                {breathPhase === 'hold2' && 'Nghỉ tĩnh lặng'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
            <Wind className="w-4 h-4 text-indigo-500" />
            <span>Đã hoàn thành vòng {breathCycle}/2</span>
          </div>

          <button
            onClick={() => {
              SoundEngine.playSuccess();
              onComplete();
            }}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Tâm trí đã lắng dịu, tiếp tục bài học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Assertive Communication: I-Message */}
      {toolkitId === 'assertive_communication' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Kỹ thuật "Thông điệp Tôi" giúp em bày tỏ cảm xúc và giới hạn của mình một cách tôn trọng mà không công kích bạn bè:
          </p>

          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-gray-700 block mb-1">1. Tôi cảm thấy (Cảm xúc của em):</span>
              <div className="flex flex-wrap gap-2">
                {['Khó xử và áp lực', 'Bị quá tải bài vở', 'Lo lắng về điểm số'].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      SoundEngine.playSelect();
                      setIMessageStep({ ...iMessageStep, feeling: f });
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                      iMessageStep.feeling === f
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 block mb-1">2. Khi (Sự việc khách quan):</span>
              <div className="flex flex-wrap gap-2">
                {['Bạn rủ chơi game ngay sát giờ nộp bài', 'Cả nhóm giục trả lời tin nhắn liên tục'].map((ev) => (
                  <button
                    key={ev}
                    onClick={() => {
                      SoundEngine.playSelect();
                      setIMessageStep({ ...iMessageStep, event: ev });
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                      iMessageStep.event === ev
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {ev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-gray-700 block mb-1">3. Vì vậy, tôi đề xuất (Yêu cầu rõ ràng):</span>
              <div className="flex flex-wrap gap-2">
                {['Mình hoàn thành bài nộp trước rồi tối nay chơi cùng sau nhé', 'Hãy để mình tập trung 15 phút tới rồi nói chuyện'].map((rq) => (
                  <button
                    key={rq}
                    onClick={() => {
                      SoundEngine.playSelect();
                      setIMessageStep({ ...iMessageStep, request: rq });
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition ${
                      iMessageStep.request === rq
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {rq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {iMessageStep.feeling && iMessageStep.event && iMessageStep.request && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
              <span className="font-bold block text-emerald-900 mb-1">Câu giao tiếp quyết đoán hoàn chỉnh của em:</span>
              "Mình cảm thấy {iMessageStep.feeling.toLowerCase()} khi {iMessageStep.event.toLowerCase()}. Vì vậy, {iMessageStep.request.toLowerCase()}."
            </div>
          )}

          <button
            onClick={() => {
              SoundEngine.playSuccess();
              onComplete();
            }}
            disabled={!iMessageStep.feeling || !iMessageStep.event || !iMessageStep.request}
            className={`w-full py-3 px-6 font-medium rounded-xl transition flex items-center justify-center gap-2 ${
              iMessageStep.feeling && iMessageStep.event && iMessageStep.request
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Áp dụng câu nói này & Tiếp tục</span>
          </button>
        </div>
      )}

      {/* 3. Cognitive Reframing */}
      {toolkitId === 'cognitive_reframing' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Khi tâm trí xuất hiện suy nghĩ tiêu cực tự động, hãy chọn cách tái cấu trúc mang tính xây dựng:
          </p>

          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
            <span className="font-bold block mb-0.5">Suy nghĩ tự động tiêu cực:</span>
            "Chỉ còn 15 phút thôi thì làm sao kịp nữa, mình sẽ hỏng hết mọi chuyện!"
          </div>

          <span className="text-xs font-bold text-gray-700 block">Chọn cách lật ngược góc nhìn tốt nhất:</span>

          <div className="space-y-2">
            {[
              {
                id: 1,
                text: '15 phút không đủ làm bài hoàn hảo 100%, nhưng đủ để mình cứu ít nhất 70% số điểm nếu làm ngay phần cốt lõi!',
                isBest: true
              },
              {
                id: 2,
                text: 'Thôi bỏ đi, lần sau mình sẽ rút kinh nghiệm sớm hơn.',
                isBest: false
              },
              {
                id: 3,
                text: 'Ai cũng sẽ chê cười nếu mình nộp bài muộn.',
                isBest: false
              }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  SoundEngine.playSelect();
                  setReframedSelected(option.id);
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  reframedSelected === option.id
                    ? option.isBest
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              SoundEngine.playSuccess();
              onComplete();
            }}
            disabled={reframedSelected !== 1}
            className={`w-full py-3 px-6 font-medium rounded-xl transition flex items-center justify-center gap-2 ${
              reframedSelected === 1
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Nạp lại động lực & Tiếp tục</span>
          </button>
        </div>
      )}

      {/* 4. Prioritization Matrix (Default) */}
      {(toolkitId === 'prioritization' || (toolkitId !== 'self_regulation' && toolkitId !== 'assertive_communication' && toolkitId !== 'cognitive_reframing')) && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Phân loại các nhiệm vụ dưới đây vào ô thích hợp để tối ưu năng lượng và thời gian:
          </p>

          <div className="space-y-3 mb-6">
            {eisenhowerItems.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-sm font-medium text-gray-800 mb-2">{item.text}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSortItem(item.id, 'urgent_important')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      userSorted[item.id] === 'urgent_important'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    🔴 Quan trọng & Khẩn cấp (Làm ngay)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSortItem(item.id, 'urgent_not_important')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      userSorted[item.id] === 'urgent_not_important'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-amber-50'
                    }`}
                  >
                    🟡 Không quan trọng nhưng giục giã (Ủy quyền/làm sau)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSortItem(item.id, 'not_urgent_not_important')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      userSorted[item.id] === 'not_urgent_not_important'
                        ? 'bg-gray-700 text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    ⚪ Xao nhãng (Loại bỏ)
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              SoundEngine.playSuccess();
              onComplete();
            }}
            disabled={!isPrioritizationComplete}
            className={`w-full py-3 px-6 font-medium rounded-xl transition flex items-center justify-center gap-2 ${
              isPrioritizationComplete
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Áp dụng chiến lược & Tiếp tục</span>
          </button>
        </div>
      )}
    </div>
  );
};
