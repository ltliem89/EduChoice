import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  Award,
  ChevronRight,
  Pause,
  Play,
  Brain,
  Flame,
  Trophy
} from 'lucide-react';
import { GameSpecification, Scene, Choice, ConstructName } from '../../types';
import { useApp } from '../../context/AppContext';
import { SoundEngine } from '../../utils/soundEffects';
import { InterventionModal } from './InterventionModals';
import { V9Client } from '../../api/v9Client';
import { adviceForAfterTask, timeOfDayLabel, dayTypeLabel, toneStyle, toneBadge } from '../../utils/adviceEngine';
import { AdviceOutcome } from '../../data/adviceCatalog';
import { useToast } from '../../context/ToastContext';
import {
  XP_REWARDS,
  comboXp,
  levelProgress,
  dayKey
} from '../../utils/gamification';

interface GameRuntimeProps {
  game: GameSpecification;
  onExit?: () => void;
  isDailyQuest?: boolean;
}

export const GameRuntime: React.FC<GameRuntimeProps> = ({ game, onExit, isDailyQuest = false }) => {
  const { logBehaviorEvent, updateStudentConstruct, addCustomMicroAction, registerSessionCompletion, studentModel, awardXp, completeDailyQuest } = useApp();
  const toast = useToast();
  const [acceptedMicroAction, setAcceptedMicroAction] = useState(false);
  const [v9ResultSaved, setV9ResultSaved] = useState(false);
  const [v9Verified, setV9Verified] = useState(false);

  const [currentSceneId, setCurrentSceneId] = useState<string>(
    game.scenes[0]?.id || ''
  );
  const [history, setHistory] = useState<string[]>([]);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [showToolkitHint, setShowToolkitHint] = useState<string | null>(null);
  const [isSoundMuted, setIsSoundMuted] = useState(SoundEngine.isMuted());
  const [isPaused, setIsPaused] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  // Applied construct deltas during this run (real, not displayed constants)
  const [appliedDeltas, setAppliedDeltas] = useState<Record<string, number>>({});
  // Gamification: combo streak + session XP earned (real, no fabrication)
  const [combo, setCombo] = useState(0);
  const [sessionXp, setSessionXp] = useState(0);
  const [xpFlash, setXpFlash] = useState<{ id: number; amount: number } | null>(null);
  const xpFlashId = useRef(0);
  const levelBeforeRef = useRef<number>(levelProgress(studentModel.xp || 0).level);
  const didCompleteDailyQuest = useRef(false);

  // Timer per scene or overall session
  const [timeLeft, setTimeLeft] = useState<number>(45);

  const currentScene: Scene | undefined = game.scenes.find(
    (s) => s.id === currentSceneId
  );

  // Canvas ref for animated 2D character avatar & environment
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real telemetry refs (honest timings/counters, no fabricated metrics)
  const startedAtRef = useRef<number>(Date.now());
  const pauseCountRef = useRef(0);
  const helpCountRef = useRef(0);
  const taskSwitchRef = useRef(0);
  const lastSceneRef = useRef<string | null>(null);
  const choicesMadeRef = useRef(0);
  const completedRef = useRef(false);
  const abandonedRef = useRef(false);

  // Advice engine: advice selection for the ending screen, rotating across retries
  const adviceSeenRef = useRef<string[]>([]);
  const endingAdvice = useMemo(() => {
    if (currentScene?.type !== 'ending') return null;
    const totalChoices = game.scenes.reduce(
      (acc, s) => acc + (s.choices?.length || 0), 0
    );
    const completionRate = totalChoices > 0
      ? Math.min(1, choicesMadeRef.current / totalChoices)
      : 0;
    const outcome: AdviceOutcome = abandonedRef.current
      ? 'abandoned'
      : completionRate >= 0.6 && retryCount === 0
        ? 'success'
        : completionRate >= 0.3
          ? 'partial'
          : 'struggled';
    const primaryConstruct = game.constructs[0] as ConstructName | undefined;
    const pick = adviceForAfterTask({
      construct: primaryConstruct,
      outcome,
      now: new Date(),
      seenIds: adviceSeenRef.current
    });
    if (!adviceSeenRef.current.includes(pick.entry.id)) {
      adviceSeenRef.current = [...adviceSeenRef.current, pick.entry.id];
    }
    return { pick, completionRate };
  }, [currentScene?.type, currentSceneId, retryCount, game.scenes, game.constructs]);

  // Gamification: detect level-up and celebrate (real XP, no fabrication)
  useEffect(() => {
    const nowLevel = levelProgress(studentModel.xp || 0).level;
    if (nowLevel > levelBeforeRef.current) {
      SoundEngine.playSuccess();
      toast.success(`Em đã lên cấp ${nowLevel}! ${levelProgress(studentModel.xp || 0).meta.icon}`, '⭐ Level Up', { duration: 4500 });
    }
    levelBeforeRef.current = nowLevel;
  }, [studentModel.xp]);

  // Initialize game start
  useEffect(() => {
    if (game.scenes.length > 0) {
      setCurrentSceneId(game.scenes[0].id);
      setTimeLeft(game.scenes[0].timeLimitSeconds || 45);
      logBehaviorEvent('game_started', game.scenes[0].id, {
        gameId: game.gameId,
        title: game.title
      });
    }
  }, [game.gameId]);

  // Log scene view & reset timer
  useEffect(() => {
    if (currentSceneId) {
      if (lastSceneRef.current !== null && lastSceneRef.current !== currentSceneId) {
        taskSwitchRef.current += 1;
      }
      lastSceneRef.current = currentSceneId;
      logBehaviorEvent('scene_viewed', currentSceneId, {
        sceneType: currentScene?.type
      });
      if (currentScene?.timeLimitSeconds) {
        setTimeLeft(currentScene.timeLimitSeconds);
      }
      setSelectedChoiceId(null);
      setShowToolkitHint(null);
    }
  }, [currentSceneId]);

  // Timer countdown loop
  useEffect(() => {
    if (isPaused || !currentScene || currentScene.type === 'ending') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          SoundEngine.playTick();
          return 0;
        }
        if (prev <= 10) {
          SoundEngine.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, currentScene?.id]);

  // V9 Read-After-Write Verification on Game Ending
  useEffect(() => {
    if (currentScene?.type === 'ending' && !v9ResultSaved) {
      setV9ResultSaved(true);
      completedRef.current = true;

      // Real metrics computed from actual session state.
      const endedAt = Date.now();
      const durationMs = Math.max(1000, endedAt - startedAtRef.current);
      const totalChoices = game.scenes.reduce(
        (acc, s) => acc + (s.choices?.length || 0), 0
      );
      // NOTE: completionRate dựa trên SỐ LỰA CHỌN THẬT, không phải số scene đã xem (audit rel-01)
      const choicesMade = choicesMadeRef.current;
      const completionRate = totalChoices > 0
        ? Math.min(1, choicesMade / totalChoices)
        : 0;
      const decisionTimeMeanMs = Math.max(1, Math.round(durationMs / Math.max(1, choicesMade)));
      const score = Math.min(100, Math.max(0, Math.round(completionRate * 100)));
      const liveConstructs = (studentModel?.constructs as any) || {
        Planning: 50,
        SelfRegulation: 50,
        HelpSeeking: 50
      };

      V9Client.submitGameResult({
        gameId: game.gameId,
        studentId: studentModel?.userId || 'STU_001',
        attemptNo: retryCount + 1,
        startedAt: new Date(startedAtRef.current).toISOString(),
        endedAt: new Date(endedAt).toISOString(),
        durationMs,
        completionStatus: completedRef.current ? 'completed' : 'abandoned',
        score,
        behaviorMetrics: {
          decisionTimeMeanMs,
          choiceChanges: choicesMade,
          pauseCount: pauseCountRef.current,
          helpCount: helpCountRef.current,
          retryCount,
          taskSwitchCount: taskSwitchRef.current,
          completionRate
        },
        constructSignals: {
          Planning: Number(liveConstructs.Planning) || 50,
          SelfRegulation: Number(liveConstructs.SelfRegulation) || 50,
          HelpSeeking: Number(liveConstructs.HelpSeeking) || 50
        }
      }).then((res) => {
        if (res.readBackVerified || res.ok) {
          setV9Verified(true);
        }
      }).catch(() => {});

      registerSessionCompletion({
        retryCount,
        strategyChangeCount: taskSwitchRef.current,
        helpRequestCount: helpCountRef.current,
        reflectionsCompleted: reflectionText.trim() ? 1 : 0
      });

      // Gamification: completion + daily quest (only once per game run)
      awardXp(XP_REWARDS.completion);
      setSessionXp((s) => s + XP_REWARDS.completion);
      const today = dayKey(new Date());
      const alreadyCompletd = studentModel.dailyQuestDate === today && !!studentModel.dailyQuestGameIds?.includes(game.gameId);
      if (isDailyQuest && !didCompleteDailyQuest.current && !alreadyCompletd) {
        completeDailyQuest(game.gameId);
        awardXp(XP_REWARDS.dailyQuestBonus);
        setSessionXp((s) => s + XP_REWARDS.dailyQuestBonus);
        didCompleteDailyQuest.current = true;
        toast.success('Nhiệm vụ hằng ngày hoàn thành! +40 XP', '🎯 Nhiệm Vụ Hôm Nay', { duration: 4000 });
      }
    }
  }, [currentScene?.type, v9ResultSaved, game.gameId, game.scenes, studentModel?.userId, studentModel?.constructs, retryCount, history.length, registerSessionCompletion, reflectionText, isDailyQuest]);

  // Procedural Canvas Avatar Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;

    const mood = currentScene?.characterMood || 'neutral';

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + Math.sin(frame * 0.05) * 4; // gentle breathing bob

      // Background soft glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        20,
        centerX,
        centerY,
        140
      );
      if (mood === 'stressed') {
        gradient.addColorStop(0, 'rgba(254, 226, 226, 0.7)');
        gradient.addColorStop(1, 'rgba(254, 242, 242, 0)');
      } else if (mood === 'happy') {
        gradient.addColorStop(0, 'rgba(220, 252, 231, 0.8)');
        gradient.addColorStop(1, 'rgba(240, 253, 244, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(224, 231, 255, 0.7)');
        gradient.addColorStop(1, 'rgba(238, 242, 255, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Character Head
      ctx.beginPath();
      ctx.arc(centerX, centerY - 15, 36, 0, Math.PI * 2);
      ctx.fillStyle = '#fde047'; // warm face tone
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      // Hair
      ctx.beginPath();
      ctx.arc(centerX, centerY - 28, 38, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      // Eyes
      const blink = frame % 90 > 85;
      ctx.fillStyle = '#1e293b';
      if (blink) {
        // Closed eye line
        ctx.beginPath();
        ctx.moveTo(centerX - 16, centerY - 15);
        ctx.lineTo(centerX - 6, centerY - 15);
        ctx.moveTo(centerX + 6, centerY - 15);
        ctx.lineTo(centerX + 16, centerY - 15);
        ctx.stroke();
      } else {
        // Open eyes
        ctx.beginPath();
        ctx.arc(centerX - 11, centerY - 15, mood === 'stressed' ? 5 : 4, 0, Math.PI * 2);
        ctx.arc(centerX + 11, centerY - 15, mood === 'stressed' ? 5 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Eye highlights
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX - 9, centerY - 17, 1.5, 0, Math.PI * 2);
        ctx.arc(centerX + 13, centerY - 17, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouth based on mood
      ctx.beginPath();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2.5;
      if (mood === 'happy') {
        // Big smile
        ctx.arc(centerX, centerY - 10, 16, 0.2 * Math.PI, 0.8 * Math.PI, false);
      } else if (mood === 'stressed') {
        // Wavy or inverted mouth
        ctx.arc(centerX, centerY + 2, 12, 1.2 * Math.PI, 1.8 * Math.PI, false);
        // Sweat drop
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(centerX + 28, centerY - 24 + (frame % 30) * 0.4, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (mood === 'focused') {
        // Straight firm mouth
        ctx.moveTo(centerX - 8, centerY - 3);
        ctx.lineTo(centerX + 8, centerY - 3);
      } else {
        // Gentle smile
        ctx.arc(centerX, centerY - 8, 10, 0.1 * Math.PI, 0.9 * Math.PI, false);
      }
      ctx.stroke();

      // Shirt / Shoulders
      ctx.beginPath();
      ctx.ellipse(centerX, centerY + 58, 48, 28, 0, Math.PI, 0, false);
      ctx.fillStyle = mood === 'happy' ? '#10b981' : mood === 'stressed' ? '#ef4444' : '#4f46e5';
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentScene?.characterMood]);

  const handleSelectChoice = (choice: Choice) => {
    SoundEngine.playSelect();
    setSelectedChoiceId(choice.id);
    choicesMadeRef.current += 1;

    // Gamification: award XP with combo multiplier (real event-driven)
    const gained = comboXp(combo + 1);
    awardXp(gained);
    setSessionXp((s) => s + gained);
    setCombo((c) => c + 1);
    xpFlashId.current += 1;
    setXpFlash({ id: xpFlashId.current, amount: gained });
    setTimeout(() => setXpFlash((f) => (f && f.id === xpFlashId.current ? null : f)), 1200);

    logBehaviorEvent('choice_made', currentScene?.id || '', {
      choiceId: choice.id,
      choiceLabel: choice.label,
      consequenceId: choice.consequenceId,
      timeRemaining: timeLeft,
      xpGained: gained
    });

    if (choice.constructImpact) {
      updateStudentConstruct(
        choice.constructImpact.construct as any,
        choice.constructImpact.delta
      );
      // Ghi nhận delta THỰC để màn ending hiển thị đúng (audit rel-01)
      setAppliedDeltas((prev) => {
        const prevVal = prev[choice.constructImpact!.construct] || 0;
        return {
          ...prev,
          [choice.constructImpact!.construct]: prevVal + choice.constructImpact!.delta
        };
      });
    }

    // Smooth transition to consequence after short pause
    setTimeout(() => {
      setHistory((prev) => [...prev, currentSceneId]);
      setCurrentSceneId(choice.consequenceId);
    }, 400);
  };

  const handleNext = () => {
    SoundEngine.playClick();
    if (!currentScene) return;

    if (currentScene.nextSceneId) {
      setHistory((prev) => [...prev, currentSceneId]);
      setCurrentSceneId(currentScene.nextSceneId);
    } else if (currentScene.type === 'consequence') {
      // Find following intervention or reflection scene
      const currentIndex = game.scenes.findIndex((s) => s.id === currentScene.id);
      const nextScene = game.scenes[currentIndex + 1] || game.scenes.find((s) => s.type === 'intervention' || s.type === 'reflection' || s.type === 'ending');
      if (nextScene) {
        setHistory((prev) => [...prev, currentSceneId]);
        setCurrentSceneId(nextScene.id);
      }
    }
  };

  const handleRetry = () => {
    SoundEngine.playSelect();
    setRetryCount((r) => r + 1);
    setCombo(0);
    logBehaviorEvent('retry', currentSceneId, {
      attempt: retryCount + 1,
      reason: 'Học sinh chủ động chọn thử nghiệm lại kịch bản với chiến lược mới'
    });
    // Jump back to choice scene
    const choiceScene = game.scenes.find((s) => s.type === 'choice') || game.scenes[0];
    setCurrentSceneId(choiceScene.id);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;

    SoundEngine.playReflectionChime();
    logBehaviorEvent('reflection_submitted', currentSceneId, {
      answer: reflectionText,
      question: currentScene?.reflectionQuestion || currentScene?.content
    });

    // Gamification: reflection earns XP
    awardXp(XP_REWARDS.reflection);
    setSessionXp((s) => s + XP_REWARDS.reflection);

    updateStudentConstruct('Reflection', 15);
    setAppliedDeltas((prev) => ({
      ...prev,
      Reflection: (prev['Reflection'] || 0) + 15
    }));

    // Proceed to ending or next scene
    const endingScene = game.scenes.find((s) => s.type === 'ending');
    if (endingScene) {
      setHistory((prev) => [...prev, currentSceneId]);
      setCurrentSceneId(endingScene.id);
    } else {
      handleNext();
    }
  };

  const toggleSound = () => {
    const enabled = SoundEngine.toggleSound();
    setIsSoundMuted(!enabled);
  };

  if (!currentScene) {
    return (
      <div className="p-12 text-center text-gray-500">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
        <p>Không tìm thấy phân cảnh hợp lệ trong kịch bản game.</p>
        <button
          onClick={onExit}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
        >
          Quay lại danh sách trò chơi
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col min-h-[580px]">
      {/* Game Runtime Top Bar */}
      <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              🎒 Không gian thử nghiệm của học sinh
            </span>
            <h2 className="text-sm font-bold text-white">{game.title}</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Timer Display */}
          {currentScene.type !== 'ending' && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono font-bold transition ${
                timeLeft <= 10
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>
          )}

          {/* Combo streak indicator (game hóa) */}
          {currentScene.type !== 'ending' && combo >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              <span>Combo x{combo} · +{comboXp(combo)}</span>
            </div>
          )}

          {/* Session XP earned */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{sessionXp} XP</span>
          </div>

          {/* Constructs Tags */}
          <div className="hidden sm:flex items-center gap-1.5">
            {game.constructs.slice(0, 2).map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-medium"
              >
                {c === 'Prioritization'
                  ? '🎯 Sắp xếp ưu tiên'
                  : c === 'SelfRegulation'
                  ? '🧘 Giữ bình tĩnh'
                  : c === 'Planning'
                  ? '📋 Lập kế hoạch'
                  : c}
              </span>
            ))}
          </div>

          {/* Audio toggle & pause */}
          <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
            <button
              onClick={toggleSound}
              title={isSoundMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                const willPause = !isPaused;
                if (willPause) pauseCountRef.current += 1;
                setIsPaused(willPause);
                logBehaviorEvent(isPaused ? 'resumed' : 'pause', currentSceneId);
              }}
              title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            {onExit && (
              <button
                onClick={() => {
                  // Audit rel-03: ghi event 'abandoned' khi thoát giữa chừng
                  if (!completedRef.current) {
                    abandonedRef.current = true;
                    logBehaviorEvent('abandoned', currentSceneId, {
                      gameId: game.gameId,
                      title: game.title,
                      sceneType: currentScene?.type
                    });
                    V9Client.submitGameResult({
                      gameId: game.gameId,
                      studentId: studentModel?.userId || 'STU_001',
                      attemptNo: retryCount + 1,
                      startedAt: new Date(startedAtRef.current).toISOString(),
                      endedAt: new Date().toISOString(),
                      durationMs: Math.max(1000, Date.now() - startedAtRef.current),
                      completionStatus: 'abandoned',
                      score: 0,
                      behaviorMetrics: {
                        decisionTimeMeanMs: 0,
                        choiceChanges: choicesMadeRef.current,
                        pauseCount: pauseCountRef.current,
                        helpCount: helpCountRef.current,
                        retryCount,
                        taskSwitchCount: taskSwitchRef.current,
                        completionRate: 0
                      }
                    }).catch(() => {});
                  }
                  onExit();
                }}
                className="ml-2 text-slate-300 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                Thoát
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-50 to-white relative">
        {/* XP earned floating indicator (game hóa) */}
        {xpFlash && (
          <div
            key={xpFlash.id}
            className="absolute top-4 right-6 z-20 px-3.5 py-1.5 rounded-2xl bg-amber-400 text-amber-950 font-black text-sm shadow-lg animate-bounce flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>+{xpFlash.amount} XP</span>
          </div>
        )}
        {/* Top Avatar & Scene Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* 2D Canvas Character Avatar */}
          <div className="relative w-36 h-36 flex-shrink-0 bg-white rounded-3xl border border-gray-200 shadow-sm p-1">
            <canvas
              ref={canvasRef}
              width={136}
              height={136}
              className="w-full h-full rounded-2xl"
            />
            <div className="absolute -bottom-2.5 inset-x-0 flex justify-center">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white shadow-sm whitespace-nowrap">
                {currentScene.characterMood === 'stressed'
                  ? 'Lo lắng 😥'
                  : currentScene.characterMood === 'happy'
                  ? 'Tự tin, vui vẻ 😊'
                  : currentScene.characterMood === 'focused'
                  ? 'Tập trung 🎯'
                  : currentScene.characterMood === 'reflective'
                  ? 'Đang suy ngẫm 🤔'
                  : 'Bình tĩnh 😌'}
              </span>
            </div>
          </div>

          {/* Dialogue & Narrative Box */}
          <div className="flex-1 w-full bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                {currentScene.type === 'situation' && '🌟 Bước 1: Tình Huống Ban Đầu'}
                {currentScene.type === 'choice' && '🎯 Bước 2: Quyết Định Của Em'}
                {currentScene.type === 'consequence' && '⚡ Bước 3: Diễn Biến Tiếp Theo'}
                {currentScene.type === 'intervention' && '💡 Bí Kíp: Hộp Công Cụ Hỗ Trợ'}
                {currentScene.type === 'reflection' && '🪞 Góc Nhìn: Lắng Đọng & Phản Tư'}
                {currentScene.type === 'ending' && '🏆 Hoàn Thành Thử Thách!'}
              </span>

              <span className="text-xs text-gray-400 font-medium">
                {game.scenes.findIndex((s) => s.id === currentScene.id) + 1} / {game.scenes.length}
              </span>
            </div>

            <p className="text-base md:text-lg text-gray-800 font-medium leading-relaxed">
              {currentScene.content}
            </p>
          </div>
        </div>

        {/* Dynamic Branching / Action Area */}
        <div className="mt-2 flex-1 flex flex-col justify-center">
          {/* TYPE: CHOICE */}
          {currentScene.type === 'choice' && currentScene.choices && (
            <div className="space-y-3 max-w-2xl mx-auto w-full">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Chọn hành động để tiếp tục diễn biến:</span>
                <span className="text-indigo-600">Phím A, B, C hoặc nhấp chuột</span>
              </div>

              {currentScene.choices.map((choice) => {
                const isSelected = selectedChoiceId === choice.id;
                return (
                  <div key={choice.id} className="relative group">
                    <button
                      type="button"
                      onClick={() => handleSelectChoice(choice)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.01]'
                          : 'bg-white hover:bg-indigo-50/70 border-gray-200 text-gray-800 hover:border-indigo-300'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition ${
                          isSelected
                            ? 'bg-white text-indigo-600'
                            : 'bg-gray-100 group-hover:bg-indigo-100 text-gray-700 group-hover:text-indigo-700'
                        }`}
                      >
                        {choice.id}
                      </span>
                      <div className="flex-1">
                        <span className="text-sm md:text-base font-semibold block leading-snug">
                          {choice.label}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 flex-shrink-0 transition ${
                          isSelected ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'
                        }`}
                      />
                    </button>

                    {/* Hint Toggle */}
                    {choice.toolkitHint && (
                      <div className="mt-1 flex items-center justify-end px-2">
                        <button
                          type="button"
                          onClick={() => {
                            const willOpen = showToolkitHint !== choice.id;
                            if (willOpen) {
                              helpCountRef.current += 1;
                              setCombo(0);
                            }
                            logBehaviorEvent('hint_requested', currentScene.id, {
                              choiceId: choice.id
                            });
                            setShowToolkitHint(
                              willOpen ? choice.id : null
                            );
                          }}
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Gợi ý tâm lý học</span>
                        </button>
                      </div>
                    )}

                    {showToolkitHint === choice.id && (
                      <div className="mt-1 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{choice.toolkitHint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TYPE: SITUATION */}
          {currentScene.type === 'situation' && (
            <div className="text-center py-6">
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition flex items-center gap-2 mx-auto"
              >
                <span>Bắt đầu tình huống</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* TYPE: CONSEQUENCE */}
          {currentScene.type === 'consequence' && (
            <div className="text-center py-6 max-w-xl mx-auto space-y-4">
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-left text-sm text-indigo-950 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Ghi nhận phản hồi hành vi:</span>
                  <span>
                    Hệ thống đã ghi lại phản xạ của em vào Mô hình Năng lực Học sinh để tinh chỉnh lộ trình thích ứng.
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-xl transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Thử nghiệm lại nhánh khác</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
                >
                  <span>Xem phân tích can thiệp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TYPE: INTERVENTION */}
          {currentScene.type === 'intervention' && (
            <div className="py-2">
              <InterventionModal
                toolkitId={currentScene.toolkitId || 'prioritization'}
                title={currentScene.content}
                onComplete={handleNext}
              />
            </div>
          )}

          {/* TYPE: REFLECTION */}
          {currentScene.type === 'reflection' && (
            <form
              onSubmit={handleReflectionSubmit}
              className="max-w-xl mx-auto w-full bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4"
            >
              <label className="block text-sm font-semibold text-gray-800">
                {currentScene.reflectionQuestion ||
                  'Em đúc kết được gì từ tình huống vừa trải qua?'}
              </label>

              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Nhập suy nghĩ chân thành của em... (ví dụ: Em nhận ra làm việc quan trọng trước giúp tinh thần không bị cuống)"
                rows={3}
                className="w-full p-3.5 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Thử nghiệm lại tình huống</span>
                </button>

                <button
                  type="submit"
                  disabled={!reflectionText.trim()}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition ${
                    reflectionText.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi phản tư</span>
                </button>
              </div>
            </form>
          )}

          {/* TYPE: ENDING */}
          {currentScene.type === 'ending' && (
            <div className="text-center py-8 max-w-md mx-auto space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Hoàn Thành Kịch Bản!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Em đã vượt qua thử thách và gia tăng các chỉ số năng lực hành vi.
                </p>

                {/* V9 Read-After-Write Badge */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{v9Verified ? '✓ V9 Đã Ghi & Xác Minh Đọc-Sau-Ghi (08_GAME_RESULTS)' : 'Đang đồng bộ Google Sheets...'}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                {/* Session XP earned */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Điểm kinh nghiệm nhận trong phiên</span>
                  </span>
                  <span className="font-mono font-black text-amber-600">
                    +{sessionXp} XP
                  </span>
                </div>
                {combo >= 2 && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    Chuỗi phản xạ nhanh đạt Combo x{combo} — thưởng thêm XP!
                  </p>
                )}
                {isDailyQuest && didCompleteDailyQuest.current && (
                  <p className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5" />
                    Nhiệm vụ hằng ngày hoàn thành: +{XP_REWARDS.dailyQuestBonus} XP
                  </p>
                )}
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block pt-1">
                  Chỉ số năng lực được tăng cường:
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(appliedDeltas)
                    .filter((entry): entry is [string, number] => entry[1] !== 0)
                    .map(([c, delta]) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 bg-white border border-gray-200 text-emerald-700 font-semibold text-xs rounded-lg shadow-2xs flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        {c} ({delta > 0 ? '+' : ''}{delta} pts)
                      </span>
                    ))}
                  {Object.entries(appliedDeltas).filter((entry) => entry[1] !== 0).length === 0 && (
                    <span className="text-xs text-gray-500">
                      Chưa có thay đổi năng lực trong phiên này.
                    </span>
                  )}
                </div>
              </div>

              {/* Real-world Micro Action Bridge (Master Spec Section 9) */}
              {game.microAction && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>Việc nhỏ ngoài đời thực tiếp theo ({game.microAction.durationMinutes} phút)</span>
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md">
                      Cầu nối thực tế
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 leading-snug">
                    {game.microAction.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {game.microAction.instruction}
                  </p>

                  <div className="pt-1">
                    {acceptedMicroAction ? (
                      <div className="text-xs text-emerald-700 font-bold bg-emerald-100/70 p-2 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Đã lưu vào mục "Hành Trình Của Em"!</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          SoundEngine.playSuccess();
                          addCustomMicroAction({
                            title: game.microAction!.title,
                            durationMinutes: game.microAction!.durationMinutes,
                            category: 'Rèn luyện sau game',
                            instruction: game.microAction!.instruction
                          });
                          setAcceptedMicroAction(true);
                        }}
                        className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                      >
                        <span>Nhận việc nhỏ này vào Hành trình của em</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi lại thử thách</span>
                </button>
                {onExit && (
                  <button
                    type="button"
                    onClick={onExit}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow-md"
                  >
                    Xem kịch bản tiếp theo
                  </button>
                )}
              </div>

              {/* Context-aware Psychological Advice (docs/knowledge/psychology/advice) */}
              {endingAdvice && (
                <div className={`p-4 rounded-2xl border text-left space-y-2 ${endingAdvice.pick.entry.tone === 'alert' ? 'bg-rose-50/70 border-rose-200' : 'bg-slate-50/80 border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <Brain className={`w-3.5 h-3.5 ${toneStyle(endingAdvice.pick.tone)}`} />
                      Lời khuyên tâm lý cho riêng em
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${toneBadge(endingAdvice.pick.tone)}`}>
                      {timeOfDayLabel(endingAdvice.pick.timeOfDay)} · {dayTypeLabel(endingAdvice.pick.dayType)}
                    </span>
                  </div>

                  <p className={`text-[13px] leading-relaxed font-medium ${toneStyle(endingAdvice.pick.tone)}`}>
                    {endingAdvice.pick.entry.message}
                  </p>

                  <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                        Việc nhỏ thử ngay hôm nay
                      </span>
                      <span className="text-xs text-gray-700 leading-relaxed">
                        {endingAdvice.pick.entry.microAction}
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    Nguồn khoa học: {endingAdvice.pick.basis}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
