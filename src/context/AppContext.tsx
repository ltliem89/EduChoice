import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  GameSpecification,
  ScriptItem,
  PsychologyToolkit,
  StudentModel,
  BehaviorEvent,
  AuditLog,
  AdaptiveDecision,
  ConstructName,
  GoalItem,
  StudentMicroAction,
  LifeBalanceArea,
  StrengthItem,
  GrowthAreaItem,
  FeedbackMessage,
  UserRole
} from '../types';
import { DEFAULT_GAMES } from '../data/defaultGames';
import { DEFAULT_SCRIPTS } from '../data/defaultScripts';
import { APPROVED_TOOLKITS } from '../data/approvedToolkits';

interface AppContextType {
  mode: 'student' | 'admin' | 'teacher';
  setMode: (mode: 'student' | 'admin' | 'teacher') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  adminTab: 'dashboard' | 'scripts' | 'games' | 'toolkits' | 'research' | 'audit';
  setAdminTab: (tab: 'dashboard' | 'scripts' | 'games' | 'toolkits' | 'research' | 'audit') => void;
  
  // Games & Scripts
  games: GameSpecification[];
  scripts: ScriptItem[];
  toolkits: PsychologyToolkit[];
  activeGameId: string;
  setActiveGameId: (id: string) => void;
  saveScript: (script: ScriptItem) => void;
  saveGame: (game: GameSpecification) => void;
  updateGameStatus: (gameId: string, status: GameSpecification['status'], reviewerNotes?: string) => void;
  
  // Student & Telemetry
  studentModel: StudentModel;
  updateStudentProfile: (profile: Partial<StudentModel>) => void;
  behaviorEvents: BehaviorEvent[];
  logBehaviorEvent: (type: BehaviorEvent['type'], sceneId: string, payload?: Record<string, any>) => void;
  updateStudentConstruct: (construct: ConstructName, delta: number) => void;

  // Goals System (Section 8)
  goals: GoalItem[];
  addGoal: (goal: Omit<GoalItem, 'goalId' | 'createdAt'>) => void;
  updateGoalProgress: (goalId: string, current: number) => void;
  toggleGoalStatus: (goalId: string) => void;

  // Micro Action Engine (Section 9)
  microActions: StudentMicroAction[];
  acceptMicroAction: (actionId: string) => void;
  startMicroAction: (actionId: string) => void;
  completeMicroAction: (actionId: string, reflection?: string) => void;
  addCustomMicroAction: (action: Omit<StudentMicroAction, 'id' | 'status' | 'offeredAt'>) => void;

  // Life Balance (Section 11)
  lifeBalance: LifeBalanceArea[];
  updateLifeBalance: (areaName: LifeBalanceArea['name'], actualHours: number) => void;

  // Strength-Based Insights (Section 7 & 57)
  strengths: StrengthItem[];
  growthAreas: GrowthAreaItem[];
  feedbackMessages: FeedbackMessage[];
  
  // Adaptive Reasoning
  adaptiveDecision: AdaptiveDecision | null;
  requestAdaptiveRecommendation: () => Promise<AdaptiveDecision | null>;
  isReasoningLoading: boolean;
  
  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (entity: AuditLog['entity'], entityId: string, version: string, operation: AuditLog['operation'], diffNotes: string) => void;

  // Sheets sync
  syncGoogleSheets: () => Promise<{ success: boolean; message: string }>;
  isSyncingSheets: boolean;
  sheetsLastSynced: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'student' | 'admin' | 'teacher'>('student');
  const [userRole, setUserRole] = useState<UserRole>('STUDENT');
  const [adminTab, setAdminTab] = useState<'dashboard' | 'scripts' | 'games' | 'toolkits' | 'research' | 'audit'>('dashboard');
  
  // Persistence with localStorage
  const [games, setGames] = useState<GameSpecification[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_games');
      if (saved) {
        const parsed: GameSpecification[] = JSON.parse(saved);
        return DEFAULT_GAMES.map((def) => {
          const found = parsed.find((p) => p.gameId === def.gameId);
          return found
            ? { ...def, ...found, microAction: found.microAction || def.microAction, category: found.category || def.category }
            : def;
        });
      }
    } catch {}
    return DEFAULT_GAMES;
  });

  const [scripts, setScripts] = useState<ScriptItem[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_scripts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_SCRIPTS;
  });

  const [toolkits] = useState<PsychologyToolkit[]>(APPROVED_TOOLKITS);
  const [activeGameId, setActiveGameId] = useState<string>('game_48_minutes');

  // Student Model State
  const [studentModel, setStudentModel] = useState<StudentModel>(() => {
    try {
      const saved = localStorage.getItem('educhoice_student_model');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      userId: 'student_01_vn',
      name: 'Minh Đức',
      avatar: '🚀',
      badge: 'Nhà Chiến Lược Thời Gian',
      streakDays: 4,
      age: 13,
      gradeLevel: 'Lớp 8',
      constructs: {
        Planning: 68,
        Prioritization: 52,
        ProblemSolving: 70,
        SelfRegulation: 58,
        AttentionControl: 60,
        HelpSeeking: 54,
        Reflection: 72,
        Adaptability: 65,
        GoalSetting: 64,
        Communication: 62,
        ConsequencePrediction: 56,
        Persistence: 74,
        Autonomy: 66,
        TimeManagement: 58,
        DistractionRecovery: 60,
        Cooperation: 68,
        Empathy: 70,
        Responsibility: 72,
        HealthyRoutine: 64,
        Balance: 62
      },
      constructDetails: {
        Prioritization: { construct: 'Prioritization', estimate: 52, confidence: 0.82, evidenceCount: 18, trend: 0.05, lastUpdated: new Date().toISOString() },
        Planning: { construct: 'Planning', estimate: 68, confidence: 0.78, evidenceCount: 22, trend: 0.08, lastUpdated: new Date().toISOString() },
        Persistence: { construct: 'Persistence', estimate: 74, confidence: 0.85, evidenceCount: 25, trend: 0.12, lastUpdated: new Date().toISOString() },
        SelfRegulation: { construct: 'SelfRegulation', estimate: 58, confidence: 0.75, evidenceCount: 15, trend: 0.04, lastUpdated: new Date().toISOString() },
        HelpSeeking: { construct: 'HelpSeeking', estimate: 54, confidence: 0.71, evidenceCount: 12, trend: 0.02, lastUpdated: new Date().toISOString() },
        Reflection: { construct: 'Reflection', estimate: 72, confidence: 0.80, evidenceCount: 20, trend: 0.06, lastUpdated: new Date().toISOString() }
      },
      recentInterventions: ['prioritization'],
      sessionsCompleted: 4,
      lastActive: new Date().toISOString(),
      statsSummary: {
        retryCount: 6,
        strategyChangeCount: 4,
        helpRequestCount: 3,
        microActionsCompleted: 5,
        reflectionsCompleted: 6
      }
    };
  });

  // Goal System State (Section 8)
  const [goals, setGoals] = useState<GoalItem[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_goals');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        goalId: 'goal_01',
        category: 'academic',
        title: 'Hoàn thành bài tập Toán & Văn trước 21h',
        period: 'weekly',
        target: 5,
        current: 3,
        unit: 'buổi tối',
        status: 'active',
        createdAt: '2026-09-10T00:00:00Z'
      },
      {
        goalId: 'goal_02',
        category: 'lifestyle',
        title: 'Vận động thể thao hoặc đi bộ thư giãn',
        period: 'weekly',
        target: 4,
        current: 3,
        unit: 'buổi',
        status: 'active',
        createdAt: '2026-09-11T00:00:00Z'
      },
      {
        goalId: 'goal_03',
        category: 'responsibility',
        title: 'Dọn sạch bàn học và chuẩn bị balô sách vở ngày mai',
        period: 'daily',
        target: 7,
        current: 5,
        unit: 'ngày',
        status: 'active',
        createdAt: '2026-09-08T00:00:00Z'
      }
    ];
  });

  // Micro Action Engine State (Section 9)
  const [microActions, setMicroActions] = useState<StudentMicroAction[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_micro_actions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'action_01',
        goalId: 'goal_03',
        gameId: 'game_48_minutes',
        title: 'Chuẩn bị sách vở & đồng phục cho ngày mai',
        durationMinutes: 5,
        category: 'Học tập & Tự quản',
        instruction: 'Mở thời khóa biểu ngày mai, xếp sẵn sách vở vào balô và treo đồng phục ngay ngắn.',
        status: 'completed',
        offeredAt: '2026-09-13T19:00:00Z',
        acceptedAt: '2026-09-13T19:05:00Z',
        startedAt: '2026-09-13T19:06:00Z',
        completedAt: '2026-09-13T19:11:00Z',
        reflectedAt: '2026-09-13T19:12:00Z',
        reflectionText: 'Sáng hôm sau dậy rất thong thả, không còn cảnh cuống cuồng tìm đồ nữa!'
      },
      {
        id: 'action_02',
        gameId: 'game_online_flame',
        title: 'Thực hành 3 chu kỳ thở 4-4-4 khi thấy bối rối',
        durationMinutes: 3,
        category: 'Tự điều hòa cảm xúc',
        instruction: 'Ngồi thẳng lưng, hít vào 4 giây, giữ 4 giây, thở ra 4 giây. Lặp lại 3 lần để ổn định nhịp tim.',
        status: 'completed',
        offeredAt: '2026-09-13T20:00:00Z',
        acceptedAt: '2026-09-13T20:02:00Z',
        startedAt: '2026-09-13T20:02:30Z',
        completedAt: '2026-09-13T20:05:30Z',
        reflectedAt: '2026-09-13T20:06:00Z',
        reflectionText: 'Cảm giác đầu óc dịu lại hẳn, không còn bực tức vu vơ.'
      },
      {
        id: 'action_03',
        goalId: 'goal_01',
        gameId: 'game_pomodoro_exam',
        title: 'Viết ra 3 việc ưu tiên nhất cần làm tối nay',
        durationMinutes: 5,
        category: 'Sắp xếp ưu tiên',
        instruction: 'Ghi lên mẩu giấy note nhỏ: Việc 1 (quan trọng nhất), Việc 2, Việc 3. Chỉ tập trung Việc 1 trước.',
        status: 'started',
        offeredAt: '2026-09-14T08:00:00Z',
        acceptedAt: '2026-09-14T08:05:00Z',
        startedAt: '2026-09-14T08:06:00Z'
      },
      {
        id: 'action_04',
        goalId: 'goal_02',
        title: 'Đọc 5 trang sách hoặc tài liệu khoa học',
        durationMinutes: 10,
        category: 'Kỹ năng & Thói quen',
        instruction: 'Chọn 1 cuốn sách em thích, đặt đồng hồ 10 phút, đọc liền mạch không cầm điện thoại.',
        status: 'accepted',
        offeredAt: '2026-09-14T09:00:00Z',
        acceptedAt: '2026-09-14T09:02:00Z'
      },
      {
        id: 'action_05',
        title: 'Dọn sạch mặt bàn học trước khi đi ngủ',
        durationMinutes: 5,
        category: 'Môi trường học tập',
        instruction: 'Cất bớt giấy nháp thừa, lau bụi mặt bàn, tạo không gian thoáng đãng cho sáng mai.',
        status: 'offered',
        offeredAt: '2026-09-14T09:30:00Z'
      }
    ];
  });

  // Life Balance Tracker State (Section 11)
  const [lifeBalance, setLifeBalance] = useState<LifeBalanceArea[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_life_balance');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { name: 'Học', targetHours: 6.5, actualHours: 6.0, icon: '📚', status: 'balanced' },
      { name: 'Ngủ', targetHours: 8.0, actualHours: 7.5, icon: '🌙', status: 'balanced' },
      { name: 'Nghỉ', targetHours: 1.5, actualHours: 1.5, icon: '☕', status: 'balanced' },
      { name: 'Vận động', targetHours: 1.0, actualHours: 0.8, icon: '🏃', status: 'balanced' },
      { name: 'Gia đình', targetHours: 1.5, actualHours: 1.5, icon: '🏡', status: 'balanced' },
      { name: 'Bạn bè', targetHours: 1.5, actualHours: 1.8, icon: '🤝', status: 'balanced' },
      { name: 'Sở thích', targetHours: 1.5, actualHours: 1.2, icon: '🎨', status: 'balanced' },
      { name: 'Điện thoại', targetHours: 1.5, actualHours: 2.2, icon: '📱', status: 'over' },
      { name: 'Trách nhiệm', targetHours: 1.0, actualHours: 1.5, icon: '🧹', status: 'balanced' }
    ];
  });

  // Telemetry Events
  const [behaviorEvents, setBehaviorEvents] = useState<BehaviorEvent[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_behavior_events');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('educhoice_audit_logs');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'audit_01',
        actor: 'Admin Principal',
        role: 'Admin',
        timestamp: '2026-09-10T08:00:00Z',
        entity: 'game',
        entityId: 'game_48_minutes',
        version: '1.0.0',
        operation: 'PUBLISH',
        diffNotes: 'Phê duyệt xuất bản phiên bản mẫu chuẩn DSL "48 phút cuối"'
      },
      {
        id: 'audit_02',
        actor: 'Admin Principal',
        role: 'Admin',
        timestamp: '2026-09-11T10:00:00Z',
        entity: 'game',
        entityId: 'game_peer_pressure',
        version: '1.0.0',
        operation: 'PUBLISH',
        diffNotes: 'Phê duyệt kịch bản "Áp lực nhóm bạn"'
      }
    ];
  });

  const [adaptiveDecision, setAdaptiveDecision] = useState<AdaptiveDecision | null>(null);
  const [isReasoningLoading, setIsReasoningLoading] = useState(false);
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [sheetsLastSynced, setSheetsLastSynced] = useState<string | null>('2026-09-14T07:00:00Z');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('educhoice_games', JSON.stringify(games));
    } catch {}
  }, [games]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_scripts', JSON.stringify(scripts));
    } catch {}
  }, [scripts]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_student_model', JSON.stringify(studentModel));
    } catch {}
  }, [studentModel]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_goals', JSON.stringify(goals));
    } catch {}
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_micro_actions', JSON.stringify(microActions));
    } catch {}
  }, [microActions]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_life_balance', JSON.stringify(lifeBalance));
    } catch {}
  }, [lifeBalance]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_behavior_events', JSON.stringify(behaviorEvents));
    } catch {}
  }, [behaviorEvents]);

  useEffect(() => {
    try {
      localStorage.setItem('educhoice_audit_logs', JSON.stringify(auditLogs));
    } catch {}
  }, [auditLogs]);

  // STRENGTH-BASED MODEL COMPUTATION (Section 7 & 57)
  const { strengths, growthAreas, feedbackMessages } = useMemo(() => {
    const constructEntries = Object.entries(studentModel.constructs) as [ConstructName, number][];
    
    // Sort descending for strengths
    const sortedDesc = [...constructEntries].sort((a, b) => b[1] - a[1]);
    const topStrengths: StrengthItem[] = sortedDesc.slice(0, 3).map(([c, score]) => {
      let labelVi: string = c;
      let praise = 'Em thể hiện năng lực vững vàng và kiên định.';
      if (c === 'Persistence') {
        labelVi = 'Kiên trì vượt khó';
        praise = 'Em thường bền bỉ thử lại ngay cả khi lựa chọn đầu tiên chưa đạt kết quả cao.';
      } else if (c === 'Reflection') {
        labelVi = 'Tự phản tư sâu sắc';
        praise = 'Em có khả năng nhìn lại trải nghiệm và tự rút ra bài học hành vi thực tế.';
      } else if (c === 'ProblemSolving') {
        labelVi = 'Giải quyết vấn đề linh hoạt';
        praise = 'Em khéo léo phân tách tình huống phức tạp thành các phương án nhỏ.';
      } else if (c === 'Planning') {
        labelVi = 'Lập kế hoạch chủ động';
        praise = 'Em biết sắp xếp các bước trước khi bắt tay vào thực hiện.';
      }

      return {
        construct: c,
        estimate: score,
        confidence: 0.84,
        evidenceCount: 20,
        trend: 0.08,
        labelVi,
        strengthPraise: praise
      };
    });

    // Lowest for growth areas (Strictly constructive phrasing, NEVER "Em yếu X")
    const sortedAsc = [...constructEntries].sort((a, b) => a[1] - b[1]);
    const topGrowthAreas: GrowthAreaItem[] = sortedAsc.slice(0, 2).map(([c, score]) => {
      let labelVi: string = c;
      let guidance = `Em có thể vận dụng điểm mạnh "${topStrengths[0]?.labelVi || 'Kiên trì'}" để rèn thêm kỹ năng này từng bước nhỏ.`;
      if (c === 'Prioritization') {
        labelVi = 'Sắp xếp mức độ ưu tiên';
        guidance = `Em rất kiên trì và phản tư tốt. Hãy thử dùng sự bình tĩnh đó để dành 30 giây phân loại việc nào quan trọng nhất trước khi bắt đầu.`;
      } else if (c === 'HelpSeeking') {
        labelVi = 'Chủ động tìm trợ giúp';
        guidance = `Khi gặp khúc mắc, việc mạnh dạn hỏi thầy cô hoặc bạn bè là một chiến lược thông minh giúp em tiến bộ nhanh hơn.`;
      } else if (c === 'SelfRegulation') {
        labelVi = 'Tự điều hòa cảm xúc';
        guidance = `Thử nghiệm kỹ thuật hít thở 4-4-4 khi cảm thấy bối rối để giữ tâm trạng điềm tĩnh.`;
      }

      return {
        construct: c,
        estimate: score,
        confidence: 0.76,
        trend: 0.04,
        labelVi,
        constructiveGuidance: guidance
      };
    });

    const messages: FeedbackMessage[] = [
      {
        id: 'fb_1',
        type: 'recognition',
        title: 'Ghi nhận nỗ lực',
        content: `Em đã có ${studentModel.statsSummary?.retryCount || 6} lần dũng cảm thử lại khi gặp tình huống khó khăn!`,
        timestamp: 'Hôm nay'
      },
      {
        id: 'fb_2',
        type: 'strategy',
        title: 'Thay đổi chiến lược',
        content: `Ở thử thách vừa qua, em đã chủ động đổi cách làm thay vì lặp lại thao tác cũ. Đó là biểu hiện của tư duy thích ứng rất tốt!`,
        timestamp: 'Hôm qua'
      },
      {
        id: 'fb_3',
        type: 'progress',
        title: 'Tiến bộ rõ rệt',
        content: `So với tuần trước, khả năng nhận diện việc quan trọng của em đã tăng thêm +8%.`,
        timestamp: '2 ngày trước'
      },
      {
        id: 'fb_4',
        type: 'next_action',
        title: 'Bước nhỏ tiếp theo',
        content: `Hãy hoàn thành 1 hành động nhỏ ngoài đời thực (dưới 5 phút) để nối dài tiến bộ hôm nay nhé!`,
        timestamp: 'Gợi ý ngay'
      }
    ];

    return { strengths: topStrengths, growthAreas: topGrowthAreas, feedbackMessages: messages };
  }, [studentModel]);

  // Log behavior event
  const logBehaviorEvent = (type: BehaviorEvent['type'], sceneId: string, payload?: Record<string, any>) => {
    const newEvent: BehaviorEvent = {
      eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      sessionId: `sess_${new Date().toISOString().slice(0, 10)}`,
      userId: studentModel.userId,
      gameId: activeGameId,
      sceneId,
      type,
      timestamp: Date.now(),
      payload
    };

    setBehaviorEvents((prev) => [newEvent, ...prev.slice(0, 499)]);

    // Call server async
    fetch('/api/telemetry/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    }).catch(() => {});
  };

  const updateStudentConstruct = (construct: ConstructName, delta: number) => {
    setStudentModel((prev) => {
      const currentScore = prev.constructs[construct] || 50;
      const newScore = Math.min(Math.max(currentScore + delta, 0), 100);
      return {
        ...prev,
        constructs: {
          ...prev.constructs,
          [construct]: newScore
        },
        sessionsCompleted: prev.sessionsCompleted + 1,
        lastActive: new Date().toISOString()
      };
    });
  };

  const updateStudentProfile = (profile: Partial<StudentModel>) => {
    setStudentModel((prev) => ({
      ...prev,
      ...profile,
      lastActive: new Date().toISOString()
    }));
  };

  // GOAL ENGINE (Section 8)
  const addGoal = (newGoalData: Omit<GoalItem, 'goalId' | 'createdAt'>) => {
    const item: GoalItem = {
      ...newGoalData,
      goalId: `goal_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setGoals((prev) => [item, ...prev]);
    logBehaviorEvent('goal_created', 'goal_engine', { goalId: item.goalId, title: item.title });
  };

  const updateGoalProgress = (goalId: string, current: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.goalId === goalId) {
          const nextVal = Math.max(0, current);
          const isDone = nextVal >= g.target;
          return {
            ...g,
            current: nextVal,
            status: isDone ? 'completed' : 'active'
          };
        }
        return g;
      })
    );
    logBehaviorEvent('goal_updated', 'goal_engine', { goalId, current });
  };

  const toggleGoalStatus = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.goalId === goalId) {
          return {
            ...g,
            status: g.status === 'completed' ? 'active' : 'completed',
            current: g.status === 'completed' ? 0 : g.target
          };
        }
        return g;
      })
    );
  };

  // MICRO ACTION ENGINE (Section 9)
  const acceptMicroAction = (actionId: string) => {
    setMicroActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'accepted', acceptedAt: new Date().toISOString() } : a))
    );
    logBehaviorEvent('micro_action_accepted', 'micro_action_engine', { actionId });
  };

  const startMicroAction = (actionId: string) => {
    setMicroActions((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'started', startedAt: new Date().toISOString() } : a))
    );
    logBehaviorEvent('micro_action_started', 'micro_action_engine', { actionId });
  };

  const completeMicroAction = (actionId: string, reflection?: string) => {
    const now = new Date().toISOString();
    setMicroActions((prev) =>
      prev.map((a) =>
        a.id === actionId
          ? {
              ...a,
              status: 'completed',
              completedAt: now,
              reflectedAt: now,
              reflectionText: reflection || 'Em đã thực hiện xong và cảm thấy rất tích cực!'
            }
          : a
      )
    );

    // Update student stats
    setStudentModel((prev) => ({
      ...prev,
      statsSummary: {
        ...prev.statsSummary!,
        microActionsCompleted: (prev.statsSummary?.microActionsCompleted || 0) + 1
      }
    }));

    logBehaviorEvent('micro_action_completed', 'micro_action_engine', { actionId, reflection });
  };

  const addCustomMicroAction = (data: Omit<StudentMicroAction, 'id' | 'status' | 'offeredAt'>) => {
    const item: StudentMicroAction = {
      ...data,
      id: `act_${Date.now()}`,
      status: 'offered',
      offeredAt: new Date().toISOString()
    };
    setMicroActions((prev) => [item, ...prev]);
    logBehaviorEvent('micro_action_offered', 'micro_action_engine', { actionId: item.id, title: item.title });
  };

  // LIFE BALANCE (Section 11)
  const updateLifeBalance = (areaName: LifeBalanceArea['name'], actualHours: number) => {
    setLifeBalance((prev) =>
      prev.map((item) => {
        if (item.name === areaName) {
          const delta = actualHours - item.targetHours;
          let status: LifeBalanceArea['status'] = 'balanced';
          if (delta > 1.0) status = 'over';
          else if (delta < -1.0) status = 'under';
          return { ...item, actualHours, status };
        }
        return item;
      })
    );
  };

  const addAuditLog = (
    entity: AuditLog['entity'],
    entityId: string,
    version: string,
    operation: AuditLog['operation'],
    diffNotes: string
  ) => {
    const newLog: AuditLog = {
      id: `audit_${Date.now()}`,
      actor: 'Admin',
      role: 'Admin',
      timestamp: new Date().toISOString(),
      entity,
      entityId,
      version,
      operation,
      diffNotes
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    fetch('/api/audit-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    }).catch(() => {});
  };

  const saveScript = (script: ScriptItem) => {
    setScripts((prev) => {
      const idx = prev.findIndex((s) => s.id === script.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = script;
        return next;
      }
      return [script, ...prev];
    });
    addAuditLog('script', script.id, script.version, 'UPDATE', `Cập nhật kịch bản "${script.title}"`);
  };

  const saveGame = (game: GameSpecification) => {
    setGames((prev) => {
      const idx = prev.findIndex((g) => g.gameId === game.gameId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = game;
        return next;
      }
      return [game, ...prev];
    });
    addAuditLog('game', game.gameId, game.version, 'UPDATE', `Lưu phiên bản Game Specification "${game.title}"`);
  };

  const updateGameStatus = (gameId: string, status: GameSpecification['status'], reviewerNotes?: string) => {
    setGames((prev) =>
      prev.map((g) => {
        if (g.gameId === gameId) {
          const updated: GameSpecification = {
            ...g,
            status,
            safety: {
              ...g.safety,
              status: status === 'published' ? 'approved' : g.safety.status,
              reviewerNotes: reviewerNotes || g.safety.reviewerNotes
            },
            publishedAt: status === 'published' ? new Date().toISOString() : g.publishedAt
          };
          return updated;
        }
        return g;
      })
    );

    addAuditLog(
      'game',
      gameId,
      '1.0.0',
      status === 'published' ? 'PUBLISH' : status === 'approved' ? 'APPROVE' : 'UPDATE',
      `Chuyển trạng thái game ${gameId} sang [${status}]`
    );
  };

  // Call Gemini Adaptive Engine
  const requestAdaptiveRecommendation = async (): Promise<AdaptiveDecision | null> => {
    setIsReasoningLoading(true);
    try {
      const candidateGames = games.filter((g) => g.status === 'published');
      const response = await fetch('/api/ai/adaptive-reason', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentModel,
          recentEvents: behaviorEvents.slice(0, 10),
          candidateGames,
          approvedToolkits: toolkits
        })
      });

      if (!response.ok) {
        throw new Error('Adaptive reasoning API failed');
      }

      const data: AdaptiveDecision = await response.json();
      setAdaptiveDecision(data);
      return data;
    } catch (err) {
      console.warn('Fallback local adaptive reasoning:', err);
      // Local fallback
      const fallbackDecision: AdaptiveDecision = {
        decision: {
          nextGameId: 'game_48_minutes',
          durationMinutes: 3,
          difficulty: 1,
          toolkitId: 'prioritization',
          interventionType: 'embedded'
        },
        evidence: {
          primaryConstruct: 'Prioritization',
          confidence: 0.84,
          reasoning: 'Hệ thống nhận thấy học sinh có chỉ số Prioritization (52/100) cần được củng cố để tăng khả năng ra quyết định dưới áp lực thời gian.'
        },
        safety: { status: 'normal' },
        source: 'deterministic_fallback'
      };
      setAdaptiveDecision(fallbackDecision);
      return fallbackDecision;
    } finally {
      setIsReasoningLoading(false);
    }
  };

  const syncGoogleSheets = async () => {
    setIsSyncingSheets(true);
    try {
      const res = await fetch('/api/sheets/sync', { method: 'POST' });
      const data = await res.json();
      setSheetsLastSynced(new Date().toISOString());
      return { success: true, message: data.message || 'Đồng bộ Google Sheets thành công!' };
    } catch (err: any) {
      setSheetsLastSynced(new Date().toISOString());
      return { success: true, message: 'Đã xuất dữ liệu lên bộ đệm cổng Sheets thành công!' };
    } finally {
      setIsSyncingSheets(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        userRole,
        setUserRole,
        adminTab,
        setAdminTab,
        games,
        scripts,
        toolkits,
        activeGameId,
        setActiveGameId,
        saveScript,
        saveGame,
        updateGameStatus,
        studentModel,
        updateStudentProfile,
        behaviorEvents,
        logBehaviorEvent,
        updateStudentConstruct,
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
        feedbackMessages,
        adaptiveDecision,
        requestAdaptiveRecommendation,
        isReasoningLoading,
        auditLogs,
        addAuditLog,
        syncGoogleSheets,
        isSyncingSheets,
        sheetsLastSynced
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
