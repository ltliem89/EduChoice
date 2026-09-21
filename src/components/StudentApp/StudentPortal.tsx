import React, { useState } from 'react';
import {
  Gamepad2,
  Sparkles,
  Clock,
  TrendingUp,
  Brain,
  ShieldCheck,
  Play,
  Award,
  BookOpen,
  Filter,
  Flame,
  User,
  CheckCircle2,
  Smile,
  Zap,
  Target,
  Compass,
  ArrowRight,
  RotateCcw,
  Edit3,
  Check,
  X,
  UserCog,
  Users,
  Plus,
  Trash2,
  Database,
  Layers,
  Bot,
  Trophy,
  Crown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GameSpecification, ConstructName } from '../../types';
import { GameRuntime } from './GameRuntime';
import { SoundEngine } from '../../utils/soundEffects';
import { InterventionModal } from './InterventionModals';
import { StudentJourney } from './StudentJourney';
import { MultiTaskMissionView } from './MultiTaskMissionView';
import { FutureAssistant } from './FutureAssistant';
import { StudentAccountModal } from './StudentAccountModal';
import { V10Client } from '../../api/v10Client';
import { levelProgress, selectDailyQuest, dayKey, XP_REWARDS } from '../../utils/gamification';

export const StudentPortal: React.FC = () => {
  const {
    games,
    studentModel,
    updateStudentProfile,
    savedAccounts,
    switchStudentAccount,
    createStudentAccount,
    deleteStudentAccount,
    requestAdaptiveRecommendation,
    adaptiveDecision,
    isReasoningLoading
  } = useApp();

  const [activePlayingGame, setActivePlayingGame] = useState<GameSpecification | null>(null);
  const [activeTab, setActiveTab] = useState<'challenges' | 'journey' | 'insights' | 'missions' | 'toolkits' | 'profile'>('challenges');
  const [selectedConstructFilter, setSelectedConstructFilter] = useState<string>('all');
  const [selectedPracticeToolkit, setSelectedPracticeToolkit] = useState<string | null>(null);

  // Account & Name management states
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEditingBannerName, setIsEditingBannerName] = useState(false);
  const [bannerTempName, setBannerTempName] = useState(studentModel.name || '');

  // In-tab Profile Account Editor states
  const [profileNameInput, setProfileNameInput] = useState(studentModel.name || '');
  const [profileGradeInput, setProfileGradeInput] = useState(studentModel.gradeLevel || 'Lớp 8');
  const [profileCohortInput, setProfileCohortInput] = useState(studentModel.cohort || 'Lớp 8A1 (Nhóm Thực Nghiệm)');
  const [profileAvatarInput, setProfileAvatarInput] = useState(studentModel.avatar || '🚀');
  const [profileBadgeInput, setProfileBadgeInput] = useState(studentModel.badge || 'Nhà Chiến Lược Thời Gian');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [isAddingInlineAccount, setIsAddingInlineAccount] = useState(false);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountGrade, setNewAccountGrade] = useState('Lớp 8');

  // Keep local profile form synced with current student
  React.useEffect(() => {
    setProfileNameInput(studentModel.name || '');
    setProfileGradeInput(studentModel.gradeLevel || 'Lớp 8');
    setProfileCohortInput(studentModel.cohort || 'Lớp 8A1 (Nhóm Thực Nghiệm)');
    setProfileAvatarInput(studentModel.avatar || '🚀');
    setProfileBadgeInput(studentModel.badge || 'Nhà Chiến Lược Thời Gian');
    setBannerTempName(studentModel.name || '');
  }, [studentModel]);

  const handleSaveBannerName = () => {
    if (bannerTempName.trim()) {
      SoundEngine.playSelect();
      updateStudentProfile({ name: bannerTempName.trim() });
      V10Client.writeFields(
        studentModel.userId || 'STU_001_MINHDUC',
        { 'student.fullName': bannerTempName.trim() },
        'STUDENT',
        'Cập nhật tên học sinh từ thanh tiêu đề'
      ).catch(() => {});
    }
    setIsEditingBannerName(false);
  };

  const handleSaveProfileForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileNameInput.trim()) return;
    SoundEngine.playSelect();
    updateStudentProfile({
      name: profileNameInput.trim(),
      gradeLevel: profileGradeInput,
      cohort: profileCohortInput.trim(),
      avatar: profileAvatarInput,
      badge: profileBadgeInput
    });
    V10Client.writeFields(
      studentModel.userId || 'STU_001_MINHDUC',
      {
        'student.fullName': profileNameInput.trim(),
        'student.grade': profileGradeInput,
        'student.school': profileCohortInput.trim()
      },
      'STUDENT',
      'Cập nhật hồ sơ học sinh'
    ).catch(() => {});
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleCreateNewInlineAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName.trim()) return;
    SoundEngine.playSelect();
    createStudentAccount({
      name: newAccountName.trim(),
      gradeLevel: newAccountGrade,
      avatar: '🌟',
      badge: 'Tân Binh Quyết Đoán',
      cohort: 'Lớp Thực Nghiệm'
    });
    setNewAccountName('');
    setIsAddingInlineAccount(false);
  };

  // Filter only published games for student view (strict safety gate)
  const publishedGames = games.filter((g) => g.status === 'published');

  const filteredGames = publishedGames.filter((g) => {
    if (selectedConstructFilter === 'all') return true;
    if (selectedConstructFilter === 'Prioritization') {
      return g.constructs.some((c) => ['Prioritization', 'ConsequencePrediction'].includes(c));
    }
    if (selectedConstructFilter === 'SelfRegulation') {
      return g.constructs.some((c) => ['SelfRegulation'].includes(c));
    }
    if (selectedConstructFilter === 'Planning') {
      return g.constructs.some((c) => ['Planning', 'AttentionControl'].includes(c));
    }
    if (selectedConstructFilter === 'ProblemSolving') {
      return g.constructs.some((c) => ['ProblemSolving', 'Adaptability'].includes(c));
    }
    if (selectedConstructFilter === 'Communication') {
      return g.constructs.some((c) => ['Communication', 'HelpSeeking'].includes(c));
    }
    if (selectedConstructFilter === 'GoalSetting') {
      return g.constructs.some((c) => ['GoalSetting', 'Reflection'].includes(c));
    }
    return g.constructs.includes(selectedConstructFilter);
  });

  const handleStartGame = (game: GameSpecification) => {
    SoundEngine.playSelect();
    setActivePlayingGame(game);
  };

  const studentPersonas = [
    { name: 'Minh Đức', avatar: '🚀', grade: 'Lớp 8', badge: 'Nhà Chiến Lược Thời Gian' },
    { name: 'Bảo An', avatar: '🎨', grade: 'Lớp 7', badge: 'Bậc Thầy Điềm Tĩnh' },
    { name: 'Hà Linh', avatar: '💡', grade: 'Lớp 9', badge: 'Chiến Binh Quyết Đoán' },
    { name: 'Tuấn Nam', avatar: '⚡', grade: 'Lớp 8', badge: 'Chuyên Gia Kế Hoạch' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-6">
      {/* If playing game, show the GameRuntime */}
      {activePlayingGame ? (
        <div className="space-y-4">
          <button
            onClick={() => setActivePlayingGame(null)}
            className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1.5 transition bg-white px-3.5 py-2 rounded-xl border border-gray-200 shadow-2xs cursor-pointer"
          >
            ← Quay lại danh sách thử thách
          </button>
          <GameRuntime
            game={activePlayingGame}
            onExit={() => setActivePlayingGame(null)}
            isDailyQuest={selectDailyQuest(publishedGames, new Date())?.gameId === activePlayingGame.gameId}
          />
        </div>
      ) : (
        <>
          {/* Friendly Student Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                    <span>{studentModel.avatar || '🚀'}</span>
                    <span>Học viên {studentModel.gradeLevel}</span>
                  </span>
                  <span className="text-xs text-indigo-100 font-medium bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                    {studentModel.badge || 'Học sinh năng động'}
                  </span>
                  {studentModel.cohort && (
                    <span className="text-xs text-indigo-200 font-medium hidden sm:inline">
                      • {studentModel.cohort}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      SoundEngine.playClick();
                      setIsAccountModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-900 text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-sm hover:scale-105"
                    title="Mở Quản lý tài khoản & danh sách học sinh"
                  >
                    <UserCog className="w-3.5 h-3.5" />
                    <span>Quản lý tài khoản</span>
                  </button>
                </div>

                {/* Banner Student Name with Inline Input */}
                <div className="flex items-center gap-2 flex-wrap">
                  {isEditingBannerName ? (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-1.5 rounded-2xl border border-white/30">
                      <input
                        autoFocus
                        type="text"
                        value={bannerTempName}
                        onChange={(e) => setBannerTempName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveBannerName();
                          if (e.key === 'Escape') setIsEditingBannerName(false);
                        }}
                        placeholder="Nhập tên học sinh..."
                        className="px-3 py-1 bg-white text-gray-900 font-bold rounded-xl text-base sm:text-lg outline-none shadow-inner w-44 sm:w-56"
                      />
                      <button
                        onClick={handleSaveBannerName}
                        className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Lưu tên học sinh"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Lưu</span>
                      </button>
                      <button
                        onClick={() => setIsEditingBannerName(false)}
                        className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                        title="Hủy"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                        Chào <span className="underline decoration-amber-300 decoration-wavy underline-offset-4">{studentModel.name || 'bạn'}</span>!
                      </h1>
                      <button
                        onClick={() => {
                          setBannerTempName(studentModel.name || '');
                          setIsEditingBannerName(true);
                        }}
                        className="p-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white/90 hover:text-white transition cursor-pointer border border-white/20 flex items-center gap-1 text-xs font-semibold"
                        title="Bấm để chỉnh sửa tên học sinh trực tiếp tại đây"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="text-[11px] hidden sm:inline">Đổi tên</span>
                      </button>
                    </div>
                  )}
                  <span className="text-lg sm:text-2xl font-bold tracking-tight text-white/90">
                    Hôm nay bạn muốn thử sức tình huống nào?
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
                  "Thử sai an toàn hôm nay để tự tin đưa ra quyết định sáng suốt ngày mai." Mỗi tình huống chỉ mất 3 phút!
                </p>
              </div>

              {/* Student Quick Stats Card */}
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-md self-start md:self-auto">
                <div className="text-center px-3 border-r border-white/15">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="text-2xl font-black text-amber-300">
                      {studentModel.streakDays || 4}
                    </span>
                  </div>
                  <span className="text-[11px] text-indigo-100 font-semibold">
                    Ngày liên tục
                  </span>
                </div>

                <div className="text-center px-3 border-r border-white/15">
                  <div className="flex items-center justify-center gap-1">
                    <Award className="w-5 h-5 text-emerald-300" />
                    <span className="text-2xl font-black text-emerald-300">
                      {studentModel.sessionsCompleted}
                    </span>
                  </div>
                  <span className="text-[11px] text-indigo-100 font-semibold">
                    Thử thách
                  </span>
                </div>

                <div className="text-center px-3">
                  <span className="block text-2xl font-black text-white">
                    {studentModel.constructs.Prioritization}%
                  </span>
                  <span className="text-[11px] text-indigo-100 font-semibold">
                    Điểm Ưu Tiên
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Navigation Tabs for Student */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('challenges');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'challenges'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Thử Thách Tình Huống ({publishedGames.length})</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('journey');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'journey'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Target className="w-4 h-4 text-amber-300" />
              <span>Hành Trình Của Em (Mục tiêu & Việc nhỏ)</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('insights');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'insights'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Bot className="w-4 h-4 text-fuchsia-400" />
              <span>Trợ Lý Tương Lai 2050</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('missions');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'missions'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Đa Tác Vụ & Nhiệm Vụ (V6)</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('toolkits');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'toolkits'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Hộp Bí Kíp Kỹ Năng</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playClick();
                setActiveTab('profile');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Hồ Sơ & Tiến Bộ Của Em</span>
            </button>
          </div>

          {/* TAB: STUDENT JOURNEY (Master Spec Section 54) */}
          {activeTab === 'journey' && <StudentJourney />}

          {/* TAB: FUTURE ASSISTANT ASTRA-2050 (Học & Sống) */}
          {activeTab === 'insights' && (
            <FutureAssistant onNavigate={(tab) => setActiveTab(tab as any)} />
          )}

          {/* TAB: V6 MULTI-TASK & MISSION PLANNER (Master Spec V6.3, V6.5, V6.9) */}
          {activeTab === 'missions' && (
            <MultiTaskMissionView
              onPlayGame={(gameId) => {
                const target = games.find((g) => g.id === gameId);
                if (target) handleStartGame(target);
              }}
            />
          )}

          {/* TAB 1: CHALLENGES */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              {/* QUEST HUB: Daily Quest + Player Level (Game hóa) */}
              {(() => {
                const lv = levelProgress(studentModel.xp || 0);
                const quest = selectDailyQuest(publishedGames, new Date());
                const today = dayKey(new Date());
                const questDone = !!quest && studentModel.dailyQuestDate === today && !!studentModel.dailyQuestGameIds?.includes(quest.gameId);
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Daily Quest Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 rounded-3xl p-5 sm:p-6 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-600" />
                          <span>Nhiệm Vụ Hằng Ngày</span>
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          +{XP_REWARDS.dailyQuestBonus} XP
                        </span>
                      </div>

                      {quest ? (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h3 className="text-base font-black text-gray-900">{quest.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                              {quest.description || quest.scenes[0]?.content}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {quest.constructs.slice(0, 3).map((c) => (
                                <span key={c} className="text-[10px] px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-lg font-semibold">
                                  {c}
                                </span>
                              ))}
                              <span className="text-[10px] px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-lg font-semibold">
                                {quest.durationMinutes} phút
                              </span>
                            </div>
                          </div>

                          {questDone ? (
                            <div className="px-5 py-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl font-bold text-sm flex items-center gap-2 self-start sm:self-center whitespace-nowrap">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Đã hoàn thành hôm nay!</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartGame(quest)}
                              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 self-start sm:self-center whitespace-nowrap cursor-pointer active:scale-95"
                            >
                              <Play className="w-4 h-4 fill-current" />
                              <span>Chơi nhiệm vụ +{XP_REWARDS.dailyQuestBonus} XP</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">Chưa có thử thách xuất bản hôm nay. Hãy quay lại sau nhé!</p>
                      )}
                    </div>

                    {/* Player Level Card */}
                    <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-5 shadow-md flex flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-xl">
                          {studentModel.avatar || '🚀'}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-black truncate">{studentModel.name || 'Học viên'}</span>
                            <Crown className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          </div>
                          <span className="text-[11px] text-indigo-200 font-semibold block">
                            Cấp {lv.level} · {lv.meta.icon} {lv.meta.name}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-indigo-200">Chuỗi {studentModel.streakDays || 0} ngày 🔥</span>
                          <span className="font-mono">{lv.xpIntoLevel}/{lv.xpForNext} XP</span>
                        </div>
                        <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-700"
                            style={{ width: `${Math.max(6, lv.pct * 100)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-indigo-200 leading-snug">
                          Hoàn thành nhiệm vụ và phản tư để nhận XP, mở cấp mới.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Friendly AI Companion Recommendation */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-indigo-100 rounded-3xl p-5 sm:p-6 shadow-2xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-sm flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                        Bạn AI Đồng Hành Gợi Ý Cho Bạn
                      </span>
                      <p className="text-sm text-gray-800 font-medium mt-0.5">
                        {adaptiveDecision?.evidence.reasoning ||
                          `Chào ${studentModel.name}! Dựa trên quá trình học tập, AI khuyên bạn nên thử thách kỹ năng sắp xếp thời gian để tự tin hơn khi gặp bài vở gấp nhé.`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto flex-shrink-0">
                    <button
                      onClick={() => requestAdaptiveRecommendation()}
                      disabled={isReasoningLoading}
                      className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-indigo-200 text-indigo-700 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${isReasoningLoading ? 'animate-spin' : ''}`} />
                      <span>{isReasoningLoading ? 'Đang suy nghĩ...' : 'Tư vấn lại'}</span>
                    </button>

                    <button
                      onClick={() => {
                        const targetGame = games.find((g) => g.gameId === adaptiveDecision?.decision.nextGameId) || games[0];
                        handleStartGame(targetGame);
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Chơi thử thách này ngay</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Kho tình huống thực tế</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                    {filteredGames.length} bài
                  </span>
                </h2>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'Prioritization', label: '⏱️ Sắp xếp ưu tiên' },
                    { id: 'SelfRegulation', label: '🧘 Tự chủ & Bình tĩnh' },
                    { id: 'Planning', label: '📋 Lập kế hoạch' },
                    { id: 'ProblemSolving', label: '💡 Giải quyết vấn đề' },
                    { id: 'Communication', label: '💬 Giao tiếp & Trợ giúp' },
                    { id: 'GoalSetting', label: '🎯 Mục tiêu & Phản tư' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedConstructFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition whitespace-nowrap cursor-pointer ${
                        selectedConstructFilter === filter.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Cards Grid (Simple, Friendly, Clear) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map((game) => (
                  <div
                    key={game.gameId}
                    className="bg-white rounded-3xl border border-gray-200 hover:border-indigo-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{game.durationMinutes} phút</span>
                        </span>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Độ tuổi {game.ageRange.min}-{game.ageRange.max}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                          {game.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                          {game.description || game.scenes[0]?.content}
                        </p>
                      </div>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {game.constructs.map((c) => (
                          <span
                            key={c}
                            className="text-[11px] px-2.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-medium"
                          >
                            {c === 'Prioritization'
                              ? '🎯 Ưu tiên'
                              : c === 'SelfRegulation'
                              ? '🧘 Tự chủ'
                              : c === 'Planning'
                              ? '📋 Kế hoạch'
                              : c === 'Communication'
                              ? '💬 Giao tiếp'
                              : c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        {game.scenes.length} bước thử nghiệm
                      </span>

                      <button
                        onClick={() => handleStartGame(game)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Vào thử thách</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE TOOLKITS */}
          {activeTab === 'toolkits' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
                <h2 className="text-lg font-bold text-gray-900">
                  Phòng Thực Hành Bí Kíp Kỹ Năng (Interactive Toolkits)
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Em không cần đợi gặp khó khăn mới dùng. Hãy thử bấm vào các công cụ dưới đây để luyện tập phản xạ tâm lý bất cứ lúc nào!
                </p>
              </div>

              {/* Practice Modal Viewer if selected */}
              {selectedPracticeToolkit && (
                <div className="bg-indigo-50/60 p-6 rounded-3xl border border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                      Đang luyện tập kỹ năng
                    </span>
                    <button
                      onClick={() => setSelectedPracticeToolkit(null)}
                      className="text-xs font-bold text-gray-500 hover:text-gray-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 cursor-pointer"
                    >
                      Đóng phòng tập
                    </button>
                  </div>
                  <InterventionModal
                    toolkitId={selectedPracticeToolkit}
                    onComplete={() => setSelectedPracticeToolkit(null)}
                  />
                </div>
              )}

              {/* Interactive Toolkit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: 'self_regulation',
                    icon: '🧘',
                    title: 'Nhịp Thở 4-4-4',
                    subtitle: 'Hạ hỏa & Lấy lại bình tĩnh',
                    desc: '4 giây hít - 4 giây giữ - 4 giây thở - 4 giây nghỉ giúp nhịp tim chậm lại và giảm căng thẳng tức thì.'
                  },
                  {
                    id: 'prioritization',
                    icon: '📊',
                    title: 'Ma Trận Việc Gấp',
                    subtitle: 'Bí kíp cứu nguy khi hết giờ',
                    desc: 'Phân biệt việc quan trọng sống còn với việc xao nhãng để tập trung làm điều tạo ra kết quả lớn nhất.'
                  },
                  {
                    id: 'assertive_communication',
                    icon: '💬',
                    title: 'Thông Điệp "Tôi"',
                    subtitle: 'Từ chối khéo léo, giữ bạn tốt',
                    desc: 'Nói rõ cảm xúc và mong muốn của mình mà không làm tổn thương hay công kích người khác.'
                  },
                  {
                    id: 'cognitive_reframing',
                    icon: '💡',
                    title: 'Lật Ngược Góc Nhìn',
                    subtitle: 'Biến lo âu thành hành động',
                    desc: 'Phát hiện suy nghĩ tiêu cực tự động và thay bằng suy nghĩ xây dựng có kế hoạch giải pháp.'
                  }
                ].map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-indigo-300 shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl font-bold">
                        {tool.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{tool.title}</h3>
                      <span className="text-[11px] font-bold text-indigo-600 block">
                        {tool.subtitle}
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        SoundEngine.playSelect();
                        setSelectedPracticeToolkit(tool.id);
                      }}
                      className="mt-4 w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Thực hành ngay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT PROFILE & PROGRESS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Comprehensive Student Account Management Section */}
              <div className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-black shadow-inner">
                      {studentModel.avatar || '🚀'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-gray-900">
                          Quản Lý Tài Khoản Học Sinh
                        </h2>
                        <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>V9 Canonical</span>
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Chỉnh sửa tên học sinh, phân nhóm nghiên cứu và chuyển đổi giữa các tài khoản trên thiết bị
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        SoundEngine.playClick();
                        setIsAccountModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <UserCog className="w-4 h-4" />
                      <span>Mở hộp thoại quản lý</span>
                    </button>
                  </div>
                </div>

                {/* Quick Account Switcher Ribbon */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Danh sách tài khoản học sinh ({savedAccounts.length}):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingInlineAccount(!isAddingInlineAccount)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAddingInlineAccount ? 'Đóng tạo mới' : 'Thêm học sinh mới'}</span>
                    </button>
                  </div>

                  {/* Inline Add Account Form */}
                  {isAddingInlineAccount && (
                    <form
                      onSubmit={handleCreateNewInlineAccount}
                      className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-2xl flex flex-wrap items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Nhập họ và tên học sinh..."
                        value={newAccountName}
                        onChange={(e) => setNewAccountName(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-800 outline-none flex-1 min-w-[180px]"
                      />
                      <select
                        value={newAccountGrade}
                        onChange={(e) => setNewAccountGrade(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-800 outline-none"
                      >
                        {['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tạo ngay</span>
                      </button>
                    </form>
                  )}

                  {/* Accounts Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {savedAccounts.map((acc) => {
                      const isActive = acc.userId === studentModel.userId;
                      return (
                        <div
                          key={acc.userId}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs transition select-none ${
                            isActive
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 cursor-pointer font-medium'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              SoundEngine.playSelect();
                              switchStudentAccount(acc.userId);
                            }}
                            className="flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{acc.avatar || '🚀'}</span>
                            <span>{acc.name}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                              isActive ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                              {acc.gradeLevel}
                            </span>
                          </button>
                          {savedAccounts.length > 1 && !isActive && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Bạn chắc chắn muốn xóa tài khoản "${acc.name}" khỏi danh sách?`)) {
                                  deleteStudentAccount(acc.userId);
                                }
                              }}
                              className="p-0.5 text-gray-400 hover:text-red-600 rounded transition ml-1"
                              title="Xóa tài khoản này"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Form to Edit Current Student Profile */}
                <form onSubmit={handleSaveProfileForm} className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Ô Nhập Tên Học Sinh */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>Họ và tên học sinh *</span>
                        <span className="text-[10px] text-indigo-600 font-normal">Hiển thị trong game</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={profileNameInput}
                        onChange={(e) => setProfileNameInput(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Minh Đức..."
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-gray-900 outline-none transition"
                      />
                    </div>

                    {/* Ô Chọn Khối Lớp */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">
                        Khối lớp
                      </label>
                      <select
                        value={profileGradeInput}
                        onChange={(e) => setProfileGradeInput(e.target.value)}
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-semibold text-gray-900 outline-none transition"
                      >
                        {['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'].map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>

                    {/* Ô Nhập Nhóm Lớp / Cohort */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>Nhóm nghiên cứu / Lớp</span>
                        <span className="text-[10px] text-gray-400 font-normal">Cohort</span>
                      </label>
                      <input
                        type="text"
                        value={profileCohortInput}
                        onChange={(e) => setProfileCohortInput(e.target.value)}
                        placeholder="Ví dụ: Lớp 8A1 (Thực nghiệm)..."
                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white rounded-xl text-sm font-medium text-gray-900 outline-none transition"
                      />
                    </div>

                    {/* Mã Định Danh & V9 Status */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                        <span>Mã định danh (No-PII)</span>
                        <span className="text-[10px] text-emerald-600 font-bold">01_USERS</span>
                      </label>
                      <div className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-700 flex items-center justify-between">
                        <span>{studentModel.userId}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Đã kết nối V9 Sheets" />
                      </div>
                    </div>
                  </div>

                  {/* Avatar & Persona Quick Chooser */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">
                      Chọn biểu tượng đại diện (Avatar):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['🚀', '🎨', '💡', '⚡', '🌟', '🦊', '🦁', '🐬', '🦉', '🎯', '🍀', '🧭', '🔬', '🔭', '🏆', '🌈'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            SoundEngine.playSelect();
                            setProfileAvatarInput(emoji);
                          }}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition cursor-pointer ${
                            profileAvatarInput === emoji
                              ? 'bg-indigo-600 text-white shadow-md scale-110'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Danh hiệu phong cách */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">
                      Danh hiệu học sinh:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Nhà Chiến Lược Thời Gian',
                        'Bậc Thầy Điềm Tĩnh',
                        'Chiến Binh Quyết Đoán',
                        'Chuyên Gia Kế Hoạch',
                        'Tân Binh Tự Chủ',
                        'Người Tìm Kiếm Giải Pháp'
                      ].map((badgeText) => (
                        <button
                          key={badgeText}
                          type="button"
                          onClick={() => {
                            SoundEngine.playSelect();
                            setProfileBadgeInput(badgeText);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                            profileBadgeInput === badgeText
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {badgeText}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons & Feedback */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {saveSuccessMsg && (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-bounce">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Đã lưu & đồng bộ vào sổ cái V9 thành công!</span>
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-100"
                    >
                      <Check className="w-4 h-4" />
                      <span>Lưu thông tin học sinh</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Competency Construct Bars */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Bản đồ Năng lực Hành vi của em
                  </h3>
                  <p className="text-xs text-gray-500">
                    Điểm số tự động cập nhật qua các quyết định và bài phản tư sau mỗi kịch bản
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'Prioritization', label: '🎯 Sắp xếp mức độ ưu tiên', score: studentModel.constructs.Prioritization },
                    { key: 'SelfRegulation', label: '🧘 Tự điều hòa cảm xúc', score: studentModel.constructs.SelfRegulation },
                    { key: 'Planning', label: '📋 Kế hoạch hành động', score: studentModel.constructs.Planning },
                    { key: 'ProblemSolving', label: '💡 Giải quyết vấn đề', score: studentModel.constructs.ProblemSolving },
                    { key: 'Communication', label: '💬 Giao tiếp quyết đoán', score: studentModel.constructs.Communication },
                    { key: 'Reflection', label: '🪞 Tự soi chiếu & Phản tư', score: studentModel.constructs.Reflection }
                  ].map((item) => (
                    <div key={item.key} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-800">{item.label}</span>
                        <span className="font-mono font-bold text-indigo-600">{item.score}/100</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Earned */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-gray-900">
                  Huy hiệu thành tựu
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-1">
                    <span className="text-2xl block">🛡️</span>
                    <span className="font-bold text-xs text-amber-900 block">Chiến Sĩ Bình Tĩnh</span>
                    <span className="text-[10px] text-amber-700">Đã vượt qua tình huống gấp</span>
                  </div>

                  <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1">
                    <span className="text-2xl block">⏱️</span>
                    <span className="font-bold text-xs text-emerald-900 block">Bậc Thầy Ưu Tiên</span>
                    <span className="text-[10px] text-emerald-700">Chọn việc cốt lõi trước</span>
                  </div>

                  <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-1">
                    <span className="text-2xl block">🤝</span>
                    <span className="font-bold text-xs text-purple-900 block">Khéo Léo Giao Tiếp</span>
                    <span className="text-[10px] text-purple-700">Biết nói lời từ chối đẹp</span>
                  </div>

                  <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-1">
                    <span className="text-2xl block">🌟</span>
                    <span className="font-bold text-xs text-blue-900 block">Tự Phản Tư Tích Cực</span>
                    <span className="text-[10px] text-blue-700">Rút ra bài học cho mình</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Account Management Modal */}
      <StudentAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </div>
  );
};
