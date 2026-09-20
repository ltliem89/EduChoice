import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  Brain,
  ArrowRight,
  Activity,
  Gauge,
  HeartPulse,
  Timer,
  CalendarDays,
  Cpu
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InsightsHub } from './InsightsHub';
import {
  ASSISTANT_NAME,
  assistantReply,
  composeBundle,
  personalSummary,
  AssistantTopic,
  AssistantTone,
  AssistantReply,
  AssistGoTab
} from '../../utils/assistant2050';
import { SoundEngine } from '../../utils/soundEffects';

interface Msg {
  id: number;
  from: 'assistant' | 'student';
  topic: AssistantTopic | 'summary';
  text: string;
  tone: AssistantTone;
  goTab?: AssistGoTab;
}

const QUICK_REPLIES: { label: string; topic: AssistantTopic }[] = [
  { label: 'Tóm tắt ngày hôm nay', topic: 'brief' },
  { label: 'Nhịp học của mình', topic: 'rhythm' },
  { label: 'Cân bằng 24h', topic: 'balance' },
  { label: 'Tinh thần của mình', topic: 'wellness' },
  { label: 'Nên làm gì tiếp?', topic: 'next' }
];

const TONE_STYLES: Record<AssistantTone, string> = {
  positive: 'border-emerald-300/30',
  neutral: 'border-white/10',
  warning: 'border-amber-300/40',
  alert: 'border-red-400/50'
};

const TONE_DOT: Record<AssistantTone, string> = {
  positive: 'bg-emerald-400',
  neutral: 'bg-indigo-300',
  warning: 'bg-amber-400',
  alert: 'bg-red-500'
};

const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const id = setTimeout(() => setN((v) => v + 1), 12);
    return () => clearTimeout(id);
  }, [n, text]);
  return (
    <p className="text-sm leading-relaxed text-indigo-50">
      {text.slice(0, n)}
      {n < text.length && <span className="text-fuchsia-300 animate-pulse">▋</span>}
    </p>
  );
};

export const FutureAssistant: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const { studentModel, behaviorEvents, lifeBalance, goals, microActions } = useApp();

  const bundle = useMemo(
    () => composeBundle({ studentModel, events: behaviorEvents, lifeBalance, goals, microActions }),
    [studentModel, behaviorEvents, lifeBalance, goals, microActions]
  );

  const [clock, setClock] = useState(() => new Date());
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: 1,
      from: 'assistant',
      topic: 'brief',
      text: bundle.nextAction.text,
      tone: 'positive'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(2);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const goTo = (tab?: AssistGoTab) => {
    if (tab && onNavigate) onNavigate(tab);
  };

  const quickReply = (topic: AssistantTopic, label: string) => {
    SoundEngine.playClick();
    if (isTyping) return;
    const studentMsg: Msg = { id: idRef.current++, from: 'student', topic, text: label, tone: 'neutral' };
    setMessages((prev) => [...prev, studentMsg]);
    setIsTyping(true);
    const reply = assistantReply(
      topic,
      { studentModel, events: behaviorEvents, lifeBalance, goals, microActions },
      bundle
    );
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: idRef.current++, from: 'assistant', topic, text: reply.text, tone: reply.tone, goTab: reply.goTab }]);
      setIsTyping(false);
    }, 650);
  };

  const summaryReply = () => {
    const reply: AssistantReply = {
      text: personalSummary(studentModel),
      tone: 'neutral'
    };
    setMessages((prev) => [...prev, { id: idRef.current++, from: 'assistant', topic: 'summary', text: reply.text, tone: reply.tone }]);
  };

  const { forecast, wellness } = bundle;
  const dayProgress = Math.min(100, Math.round(((clock.getHours() * 3600 + clock.getMinutes() * 60 + clock.getSeconds()) / 86400) * 100));
  const startedToday = behaviorEvents.some(
    (e) => e.type === 'game_started' && new Date(e.timestamp).toDateString() === new Date().toDateString()
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-400/20 shadow-2xl"
      style={{ background: 'radial-gradient(1200px 600px at 10% -10%, #312e81 0%, transparent 60%), radial-gradient(1000px 600px at 110% 110%, #581c87 0%, transparent 55%), linear-gradient(160deg, #0f172a 0%, #1e1b4b 55%, #1e1145 100%)' }}
    >
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-fuchsia-500/15 blur-3xl pointer-events-none" />

      <div className="relative p-5 sm:p-7 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.5)]">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0f172a] animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-indigo-300/80 font-bold">Trợ lý tâm lý giáo dục</div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">{ASSISTANT_NAME}</h2>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-indigo-200 font-mono">
              {new Intl.DateTimeFormat('vi-VN', {
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
              }).format(clock)}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-indigo-300/70 mt-1">
              ngày trôi qua {dayProgress}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-indigo-300 mb-2">
              <Timer className="w-3.5 h-3.5" /> Khung giờ vàng
            </div>
            <div className="text-lg font-black text-white">{forecast.bestWindowLabel}</div>
            <div className="text-[11px] text-indigo-300/80 mt-1 line-clamp-2">Nhịp tập trung tốt nhất của em hôm nay.</div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-indigo-300 mb-2">
              <Gauge className="w-3.5 h-3.5" /> Năng lượng dự báo
            </div>
            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `conic-gradient(#c084fc ${forecast.focusScore * 3.6}deg, rgba(255,255,255,0.1) 0deg)` }}
              >
                <div className="w-9 h-9 rounded-full bg-[#0f172a] flex items-center justify-center">
                  <span className="text-sm font-black text-white">{forecast.focusScore}</span>
                </div>
              </div>
              <div className="text-[11px] text-indigo-200/90 leading-snug">{forecast.energyCaption}</div>
            </div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-indigo-300 mb-2">
              <HeartPulse className="w-3.5 h-3.5"
                style={{ color: wellness.level === 'green' ? '#34d399' : wellness.level === 'yellow' ? '#fbbf24' : '#f87171' }}
              /> Tinh thần
            </div>
            <div className="text-lg font-black text-white">{wellness.label}</div>
            <div className="text-[11px] text-indigo-300/80 mt-1 line-clamp-2">{wellness.reasons.slice(0, 1)[0]}</div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-indigo-300 mb-2">
              <Activity className="w-3.5 h-3.5" /> Hôm nay
            </div>
            <div className="text-lg font-black text-white">{studentModel.sessionsCompleted ?? 0} phiên</div>
            <div className="text-[11px] text-indigo-300/80 mt-1 line-clamp-2">
              {startedToday ? 'Em đã hoạt động — giữ nhịp nhé.' : 'Chưa có hoạt động — khởi động nhẹ nào.'}
            </div>
          </div>
        </div>

        <div className="bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span className="text-[10px] uppercase tracking-widest text-indigo-200/80">
              Trợ lý 2050 · hội thoại an toàn · dựa trên dữ liệu thật của em
            </span>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, idx) =>
              m.from === 'assistant' ? (
                <div key={m.id} className={`flex items-end gap-2 max-w-3xl`}>
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className={`bg-white/[0.08] backdrop-blur-sm border rounded-2xl rounded-bl-md px-3.5 py-2.5 ${TONE_STYLES[m.tone]}`}>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${TONE_DOT[m.tone]}`} />
                      <span className="text-[9px] uppercase tracking-widest text-indigo-300/70">{ASSISTANT_NAME}</span>
                    </div>
                    {isTyping && idx === messages.length - 1 ? (
                      <TypingText text={m.text} />
                    ) : (
                      <p className="text-sm leading-relaxed text-indigo-50">{m.text}</p>
                    )}
                    {m.goTab && !isTyping && (
                      <button
                        onClick={() => goTo(m.goTab)}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:brightness-110 transition cursor-pointer"
                      >
                        Đi ngay <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm px-3.5 py-2 rounded-2xl rounded-br-md max-w-xl">
                    {m.text}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2 flex-wrap">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.topic}
                onClick={() => quickReply(q.topic, q.label)}
                disabled={isTyping}
                className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-indigo-100 hover:bg-indigo-500/30 hover:border-indigo-300/40 transition disabled:opacity-50 cursor-pointer"
              >
                {q.label}
              </button>
            ))}
            <button
              onClick={() => { SoundEngine.playClick(); }}
              disabled={isTyping}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:brightness-110 transition disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3 h-3 inline-block mr-1" />
              {studentModel.name || 'Em'}
            </button>
          </div>
        </div>

        {isTyping && (
          <div className="flex items-center gap-2 text-[11px] text-indigo-300/80">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            ASTRA đang tổng hợp câu trả lời từ dữ liệu của em...
          </div>
        )}

        <div className={`rounded-2xl border px-4 py-3 flex items-start gap-3 ${forecast.fatigueGuard ? 'bg-amber-400/10 border-amber-300/30' : 'bg-emerald-400/10 border-emerald-300/30'}`}>
          <div className={`p-2 rounded-xl shrink-0 ${forecast.fatigueGuard ? 'bg-amber-400/20 text-amber-200' : 'bg-emerald-400/20 text-emerald-200'}`}>
            <Brain className="w-4 h-4" />
          </div>
          <div className="text-sm text-white/90 leading-relaxed">
            <b className="font-bold">{forecast.fatigueGuard ? 'Bộ giáp chống quá tải' : 'Không có dấu hiệu quá tải'}:</b>{' '}
            {forecast.fatigueGuard || 'Em đang trong vùng học tập an toàn. Cứ tiến theo kế hoạch của em.'}
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-indigo-300/70 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3">
          <Cpu className="w-4 h-4 shrink-0 mt-0.5" />
          <p>
            ASTRA chỉ đưa gợi ý, em luôn là người quyết định. Khi em buồn hoặc căng thẳng kéo dài, hãy chia sẻ với bố mẹ, thầy cô hoặc gọi tổng đài 111. Góc "Hồ Sơ & Tiến Bộ" chứa chi tiết dữ liệu của em.
          </p>
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-fuchsia-300" />
            <h3 className="text-sm font-extrabold text-white uppercase tracking-widest">Phân tích chi tiết — dữ liệu thật</h3>
          </div>
          <InsightsHub />
        </div>
      </div>
    </div>
  );
};