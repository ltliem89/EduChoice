import React, { useState, useEffect } from 'react';
import {
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame,
  Plus,
  ArrowRight,
  Play,
  RotateCcw,
  HeartHandshake,
  Brain,
  Smile,
  ShieldCheck,
  Award,
  Zap,
  Check,
  Sliders,
  Compass,
  MessageSquareHeart,
  ChevronRight,
  Send,
  Timer as TimerIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GoalCategory, GoalItem, StudentMicroAction } from '../../types';
import { SoundEngine } from '../../utils/soundEffects';

export const StudentJourney: React.FC = () => {
  const {
    studentModel,
    goals,
    addGoal,
    updateGoalProgress,
    toggleGoalStatus,
    microActions,
    acceptMicroAction,
    startMicroAction,
    completeMicroAction,
    addCustomMicroAction,
    lifeBalance,
    updateLifeBalance,
    strengths,
    growthAreas,
    feedbackMessages
  } = useApp();

  // Active micro-action timer state
  const [activeTimerActionId, setActiveTimerActionId] = useState<string | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [reflectingActionId, setReflectingActionId] = useState<string | null>(null);
  const [reflectionInput, setReflectionInput] = useState('');

  // Modals / forms
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState<GoalCategory>('academic');
  const [newGoalTarget, setNewGoalTarget] = useState(5);
  const [newGoalUnit, setNewGoalUnit] = useState('buổi');

  const [showAddActionModal, setShowAddActionModal] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionMinutes, setNewActionMinutes] = useState(5);
  const [newActionInstruction, setNewActionInstruction] = useState('');

  // Category mapping
  const categoryLabels: Record<GoalCategory, { label: string; color: string; icon: string }> = {
    academic: { label: 'Học tập', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '📚' },
    personal: { label: 'Cá nhân', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: '🌱' },
    lifestyle: { label: 'Lối sống & Thể thao', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '🏃' },
    relationship: { label: 'Giao tiếp & Bạn bè', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '🤝' },
    responsibility: { label: 'Trách nhiệm & Gia đình', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: '🏡' },
    creativity: { label: 'Sáng tạo & Sở thích', color: 'bg-pink-50 text-pink-700 border-pink-200', icon: '🎨' },
    community: { label: 'Cộng đồng & Việc tốt', color: 'bg-teal-50 text-teal-700 border-teal-200', icon: '❤️' }
  };

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            SoundEngine.playSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const handleStartTimer = (action: StudentMicroAction) => {
    SoundEngine.playSelect();
    startMicroAction(action.id);
    setActiveTimerActionId(action.id);
    setTimerSecondsLeft(action.durationMinutes * 60);
    setIsTimerRunning(true);
  };

  const handleFinishActionClick = (actionId: string) => {
    SoundEngine.playSuccess();
    setIsTimerRunning(false);
    setActiveTimerActionId(null);
    setReflectingActionId(actionId);
  };

  const submitReflection = (actionId: string) => {
    SoundEngine.playClick();
    completeMicroAction(actionId, reflectionInput || 'Em đã thực hiện xong hành động nhỏ này và cảm thấy hào hứng hơn.');
    setReflectingActionId(null);
    setReflectionInput('');
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    SoundEngine.playSuccess();
    addGoal({
      title: newGoalTitle.trim(),
      category: newGoalCategory,
      target: Number(newGoalTarget) || 5,
      current: 0,
      unit: newGoalUnit || 'lần',
      period: 'weekly',
      status: 'active'
    });
    setNewGoalTitle('');
    setShowAddGoalModal(false);
  };

  const handleCreateCustomAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;
    SoundEngine.playSuccess();
    addCustomMicroAction({
      title: newActionTitle.trim(),
      durationMinutes: Number(newActionMinutes) || 5,
      category: 'Tự chọn ngoài đời',
      instruction: newActionInstruction.trim() || 'Thực hiện việc nhỏ này trong không gian yên tĩnh.'
    });
    setNewActionTitle('');
    setNewActionInstruction('');
    setShowAddActionModal(false);
  };

  const totalLifeHours = lifeBalance.reduce((acc, cur) => acc + cur.actualHours, 0);

  return (
    <div className="space-y-8">
      {/* SECTION 1: STRENGTH-BASED RECOGNITION BANNER (Section 7, 54, 57) */}
      <div className="bg-white rounded-3xl p-6 border border-indigo-100 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-700 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-600" />
              </span>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Hành Trình Rèn Luyện & Tiến Bộ Của Em
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              "Kỹ năng sống không hình thành qua lý thuyết suông, mà lớn lên qua từng lựa chọn nhỏ mỗi ngày."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Chuỗi {studentModel.streakDays || 4} ngày liên tục</span>
            </span>
          </div>
        </div>

        {/* 4 Stats Cards (Section 6 & 73) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Dũng cảm thử lại</span>
              <RotateCcw className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">
                {studentModel.statsSummary?.retryCount || 6}
              </span>
              <span className="text-[11px] font-medium text-emerald-600">lần sau thử thách</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Thử sai an toàn để đổi cách làm</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Đổi chiến lược (SAI)</span>
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">
                {studentModel.statsSummary?.strategyChangeCount || 4}
              </span>
              <span className="text-[11px] font-medium text-amber-600">lần thích ứng tốt</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Không lặp lại sai lầm cũ</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Tìm trợ giúp thông minh</span>
              <HeartHandshake className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-gray-900">
                {studentModel.statsSummary?.helpRequestCount || 3}
              </span>
              <span className="text-[11px] font-medium text-purple-600">lần chủ động</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Mạnh dạn hỏi đúng lúc</p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Việc nhỏ ngoài đời</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-700">
                {studentModel.statsSummary?.microActionsCompleted || 5}
              </span>
              <span className="text-[11px] font-medium text-emerald-600">việc hoàn thành</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Cầu nối từ game ra đời thật</p>
          </div>
        </div>

        {/* Strength & Growth Cards (Section 7 & 57) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Top Strengths */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Điểm mạnh nổi bật của em (Strengths)</span>
            </div>

            <div className="space-y-2.5">
              {strengths.map((item, idx) => (
                <div key={idx} className="bg-white/90 p-3 rounded-xl border border-emerald-100 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {item.labelVi} ({item.construct})
                    </span>
                    <span className="text-xs font-black text-emerald-600">
                      {item.estimate}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                    {item.strengthPraise}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Constructive Growth Guidance (Section 7 - Never say "Em yếu X") */}
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Cơ hội rèn luyện thêm (Growth Opportunities)</span>
            </div>

            <div className="space-y-2.5">
              {growthAreas.map((item, idx) => (
                <div key={idx} className="bg-white/90 p-3 rounded-xl border border-indigo-100 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                      {item.labelVi} ({item.construct})
                    </span>
                    <span className="text-xs font-black text-indigo-600">
                      {item.estimate}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-700 mt-1 leading-relaxed">
                    👉 {item.constructiveGuidance}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white/80 p-2.5 rounded-xl border border-indigo-100 flex items-center gap-2 text-[11px] text-indigo-700">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-indigo-600" />
              <span>
                Nguyên tắc giáo dục tích cực: Không dán nhãn yếu kém, tập trung khích lệ năng lực tự thân.
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Messages Carousel/List (Section 57) */}
        <div className="pt-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquareHeart className="w-3.5 h-3.5 text-pink-500" />
            <span>Lời nhắn động viên từ hệ sinh thái EduChoice</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {feedbackMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1 hover:bg-white hover:border-indigo-200 hover:shadow-2xs transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{msg.title}</span>
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-snug">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: GOAL SYSTEM (Section 8 & 54) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-gray-900">
                🎯 Mục Tiêu Tuần Này Của Em
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Chuyển mục tiêu lớn thành các bước hành động cụ thể, khả thi và có thể đo lường
            </p>
          </div>

          <button
            onClick={() => {
              SoundEngine.playClick();
              setShowAddGoalModal(true);
            }}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm mục tiêu mới</span>
          </button>
        </div>

        {/* Goal Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((g) => {
            const cat = categoryLabels[g.category] || categoryLabels.academic;
            const progressPercent = Math.min(Math.round((g.current / g.target) * 100), 100);
            const isCompleted = g.status === 'completed';

            return (
              <div
                key={g.goalId}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-2xs'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cat.color} flex items-center gap-1`}>
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400">
                      {g.period === 'weekly' ? 'Hàng tuần' : 'Mỗi ngày'}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold leading-snug ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {g.title}
                  </h4>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-600">Tiến độ</span>
                    <span className="font-bold text-gray-900">
                      {g.current} / {g.target} {g.unit} ({progressPercent}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        SoundEngine.playSelect();
                        updateGoalProgress(g.goalId, g.current + 1);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-[11px] font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-indigo-600" />
                      <span>+1 {g.unit}</span>
                    </button>

                    <button
                      onClick={() => {
                        SoundEngine.playClick();
                        toggleGoalStatus(g.goalId);
                      }}
                      className={`text-[11px] font-semibold transition cursor-pointer ${
                        isCompleted ? 'text-emerald-700 hover:text-gray-500' : 'text-gray-400 hover:text-emerald-700'
                      }`}
                    >
                      {isCompleted ? '✓ Đã hoàn thành' : 'Đánh dấu xong'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: MICRO ACTION ENGINE (Section 9 & 54) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-700 rounded-xl">
                <Clock className="w-5 h-5 text-amber-600" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  👉 Việc Nhỏ Hôm Nay (Micro Action Engine)
                </h3>
                <span className="text-xs text-gray-500">
                  Cầu nối quan trọng nhất: Chuyển trải nghiệm số thành hành động thật ngoài đời (≤ 10 phút)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              SoundEngine.playClick();
              setShowAddActionModal(true);
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tự tạo việc nhỏ</span>
          </button>
        </div>

        {/* Micro Actions List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {microActions.map((action) => {
            const isCompleted = action.status === 'completed';
            const isStarted = action.status === 'started' || activeTimerActionId === action.id;
            const isAccepted = action.status === 'accepted';
            const isOffered = action.status === 'offered';

            return (
              <div
                key={action.id}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isStarted
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-600" />
                      <span>{action.durationMinutes} phút</span>
                      <span>•</span>
                      <span>{action.category}</span>
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isStarted
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : isAccepted
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isCompleted
                        ? '✓ Đã xong'
                        : isStarted
                        ? 'Đang thực hiện'
                        : isAccepted
                        ? 'Đã nhận việc'
                        : 'Gợi ý mới'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    {action.title}
                  </h4>

                  <p className="text-[11px] text-gray-600 leading-relaxed bg-gray-50/80 p-2 rounded-xl border border-gray-100">
                    {action.instruction}
                  </p>

                  {action.reflectionText && (
                    <div className="text-[11px] bg-emerald-100/50 p-2 rounded-xl text-emerald-900 italic border border-emerald-200/60">
                      💭 Phản tư của em: "{action.reflectionText}"
                    </div>
                  )}
                </div>

                {/* Funnel Controls */}
                <div className="pt-4 border-t border-gray-100 mt-3 flex items-center justify-between">
                  {isOffered && (
                    <button
                      onClick={() => {
                        SoundEngine.playSelect();
                        acceptMicroAction(action.id);
                      }}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Nhận việc nhỏ này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isAccepted && (
                    <button
                      onClick={() => handleStartTimer(action)}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Bắt đầu đếm giờ ({action.durationMinutes} phút)</span>
                    </button>
                  )}

                  {isStarted && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl">
                        <TimerIcon className="w-4 h-4 text-amber-600 animate-spin" />
                        <span>
                          {Math.floor(timerSecondsLeft / 60)}:
                          {(timerSecondsLeft % 60).toString().padStart(2, '0')}
                        </span>
                      </div>

                      <button
                        onClick={() => handleFinishActionClick(action.id)}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã làm xong!</span>
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="w-full flex items-center justify-between text-xs text-gray-400">
                      <span>Đã lưu vào nhật ký tiến bộ</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: LIFE BALANCE SIMULATOR (Section 11) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-purple-100 text-purple-700 rounded-xl">
                <Sliders className="w-5 h-5 text-purple-600" />
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                ⚖️ Chiếc Đồng Hồ Cân Bằng 24 Giờ (Life Balance)
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Hệ thống không hướng tới việc "học càng nhiều càng tốt" mà hướng tới cuộc sống học sinh hài hòa, tích cực
            </p>
          </div>

          <div className="text-right">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                Math.abs(totalLifeHours - 24) < 0.5
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              Tổng quỹ thời gian: {totalLifeHours.toFixed(1)} / 24.0 giờ
            </span>
          </div>
        </div>

        {/* 9 Dimensions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {lifeBalance.map((item) => (
            <div
              key={item.name}
              className={`p-3.5 rounded-2xl border transition ${
                item.status === 'over'
                  ? 'bg-rose-50/50 border-rose-200'
                  : 'bg-slate-50 border-gray-200/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                <span className="text-xs font-bold font-mono text-gray-700">
                  {item.actualHours}h / {item.targetHours}h
                </span>
              </div>

              <div className="mt-2.5">
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={item.actualHours}
                  onChange={(e) => updateLifeBalance(item.name, parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {item.name === 'Điện thoại' && item.actualHours > 2.5 && (
                <p className="text-[10px] text-rose-600 font-semibold mt-1">
                  ⚠️ Điện thoại hơn 2.5h có thể ảnh hưởng giấc ngủ & khả năng tập trung.
                </p>
              )}

              {item.name === 'Ngủ' && item.actualHours < 7.0 && (
                <p className="text-[10px] text-amber-600 font-semibold mt-1">
                  ⚠️ Học sinh THCS cần ngủ từ 7-8 giờ để não bộ phục hồi tốt nhất.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD GOAL */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900">Thêm mục tiêu tuần mới</h3>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nội dung mục tiêu</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ôn từ vựng tiếng Anh 15 phút"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Nhóm lĩnh vực</label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value as GoalCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="academic">📚 Học tập</option>
                  <option value="lifestyle">🏃 Lối sống & Thể thao</option>
                  <option value="responsibility">🏡 Trách nhiệm & Gia đình</option>
                  <option value="relationship">🤝 Giao tiếp & Bạn bè</option>
                  <option value="creativity">🎨 Sáng tạo & Sở thích</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Mục tiêu (số lần/tuần)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-700">Đơn vị đo</label>
                  <input
                    type="text"
                    placeholder="lần, buổi, trang..."
                    value={newGoalUnit}
                    onChange={(e) => setNewGoalUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Tạo mục tiêu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CUSTOM MICRO ACTION */}
      {showAddActionModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base text-gray-900">Tạo việc nhỏ hôm nay (≤ 10 phút)</h3>
              <button
                onClick={() => setShowAddActionModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomAction} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Tên việc nhỏ</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Rửa cốc nước & đứng lên vươn vai"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Thời gian dự kiến (phút)</label>
                <select
                  value={newActionMinutes}
                  onChange={(e) => setNewActionMinutes(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value={3}>3 phút (siêu nhanh)</option>
                  <option value={5}>5 phút (tiêu chuẩn)</option>
                  <option value={10}>10 phút (vừa sức)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Hướng dẫn thực hiện</label>
                <textarea
                  rows={2}
                  placeholder="Cách làm cụ thể, an toàn..."
                  value={newActionInstruction}
                  onChange={(e) => setNewActionInstruction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddActionModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Thêm vào danh sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: QUICK REFLECTION AFTER MICRO ACTION */}
      {reflectingActionId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Tuyệt vời! Em vừa hoàn thành 1 việc nhỏ</span>
            </div>

            <p className="text-xs text-gray-600">
              Ghi lại 1 câu phản tư ngắn: Sau khi làm xong, em cảm thấy như thế nào hoặc điều này giúp gì cho em?
            </p>

            <div className="space-y-3">
              <textarea
                rows={3}
                placeholder="Ví dụ: Em cảm thấy bàn học gọn gàng giúp đầu óc thư thái hơn hẳn..."
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                className="w-full p-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => submitReflection(reflectingActionId)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Lưu phản tư & Ghi nhận tiến bộ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
