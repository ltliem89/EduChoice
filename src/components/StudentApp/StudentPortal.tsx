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
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GameSpecification, ConstructName } from '../../types';
import { GameRuntime } from './GameRuntime';
import { SoundEngine } from '../../utils/soundEffects';
import { InterventionModal } from './InterventionModals';
import { StudentJourney } from './StudentJourney';
import { MultiTaskMissionView } from './MultiTaskMissionView';
import { FutureCalmHome } from './FutureCalmHome';

export const StudentPortal: React.FC = () => {
  const {
    games,
    studentModel,
    updateStudentProfile,
    requestAdaptiveRecommendation,
    adaptiveDecision,
    isReasoningLoading
  } = useApp();

  const [activePlayingGame, setActivePlayingGame] = useState<GameSpecification | null>(null);
  const [activeTab, setActiveTab] = useState<'challenges' | 'future_home' | 'journey' | 'missions' | 'toolkits' | 'profile'>('challenges');
  const [selectedConstructFilter, setSelectedConstructFilter] = useState<string>('all');
  const [selectedPracticeToolkit, setSelectedPracticeToolkit] = useState<string | null>(null);

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
          />
        </div>
      ) : (
        <>
          {/* Friendly Student Banner */}
          <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                    <span>{studentModel.avatar || '🚀'}</span>
                    <span>Học viên {studentModel.gradeLevel}</span>
                  </span>
                  <span className="text-xs text-indigo-100 font-medium">
                    {studentModel.badge || 'Học sinh năng động'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Chào {studentModel.name || 'bạn'}! Hôm nay bạn muốn thử sức tình huống nào?
                </h1>

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
                setActiveTab('future_home');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'future_home'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Không Gian Tương Lai (V7 Future UI)</span>
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

          {/* TAB: V7 FUTURE CALM HOME (Master Spec V7.31 - V7.33) */}
          {activeTab === 'future_home' && (
            <FutureCalmHome
              onPlayGame={(gameId) => {
                const target = games.find((g) => g.id === gameId);
                if (target) handleStartGame(target);
              }}
              onNavigateTab={(tab) => setActiveTab(tab as any)}
            />
          )}

          {/* TAB: STUDENT JOURNEY (Master Spec Section 54) */}
          {activeTab === 'journey' && <StudentJourney />}

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
              {/* Persona Chooser */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Nhân vật của em
                    </h2>
                    <p className="text-xs text-gray-500">
                      Chọn hình đại diện và phong cách học viên phù hợp nhất với em
                    </p>
                  </div>
                  <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full">
                    Mã học viên: #{studentModel.userId}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {studentPersonas.map((persona) => {
                    const isSelected = studentModel.name === persona.name;
                    return (
                      <button
                        key={persona.name}
                        onClick={() => {
                          SoundEngine.playSelect();
                          updateStudentProfile({
                            name: persona.name,
                            avatar: persona.avatar,
                            gradeLevel: persona.grade,
                            badge: persona.badge
                          });
                        }}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col gap-2 ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-500 shadow-sm ring-2 ring-indigo-200'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-3xl">{persona.avatar}</span>
                        <div>
                          <span className="font-bold text-sm text-gray-900 block">
                            {persona.name}
                          </span>
                          <span className="text-[11px] text-gray-500 block">
                            {persona.grade}
                          </span>
                        </div>
                        <span className="text-[10px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100 self-start">
                          {persona.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
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
    </div>
  );
};
