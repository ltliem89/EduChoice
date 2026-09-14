import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Flame,
  ArrowRight,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  Smile,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DEFAULT_TASKS,
  DEFAULT_COGNITIVE_LOAD,
  DEFAULT_MISSION_PLANS,
  DEFAULT_STUDENT_AGENCY
} from '../../data/v6IntelligenceData';
import { TaskState, MissionPlan } from '../../types';
import { SoundEngine } from '../../utils/soundEffects';

interface MultiTaskMissionViewProps {
  onPlayGame?: (gameId: string) => void;
}

export const MultiTaskMissionView: React.FC<MultiTaskMissionViewProps> = ({ onPlayGame }) => {
  const { games, recordBehaviorEvent, studentModel } = useApp();

  const [tasks, setTasks] = useState<TaskState[]>(DEFAULT_TASKS);
  const [missionPlans, setMissionPlans] = useState<MissionPlan[]>(DEFAULT_MISSION_PLANS);
  const [activeMission, setActiveMission] = useState<MissionPlan>(DEFAULT_MISSION_PLANS[0]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskType, setNewTaskType] = useState<TaskState['type']>('ASSIGNMENT');
  const [newTaskEffort, setNewTaskEffort] = useState(15);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleUpdateTaskProgress = (taskId: string, increment: number) => {
    SoundEngine.playClick();
    setTasks((prev) =>
      prev.map((t) => {
        if (t.taskId === taskId) {
          const newProgress = Math.min(100, Math.max(0, t.progress + increment));
          const newStatus = newProgress === 100 ? 'COMPLETED' : 'ACTIVE';
          if (newProgress === 100) {
            SoundEngine.playSuccess();
            recordBehaviorEvent('choice_made', {
              action: 'task_completed',
              taskId: t.taskId,
              type: t.type
            });
          }
          return {
            ...t,
            progress: newProgress,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    SoundEngine.playSuccess();
    const newTask: TaskState = {
      taskId: `task_${Date.now()}`,
      studentId: studentModel.userId,
      title: newTaskTitle.trim(),
      type: newTaskType,
      priority: 3,
      urgency: 0.5,
      importance: 0.7,
      estimatedEffortMinutes: newTaskEffort,
      cognitiveLoad: 0.35,
      switchingCost: 0.2,
      progress: 0,
      difficulty: 2,
      dependencyIds: [],
      completionProbability: 0.8,
      status: 'ACTIVE',
      updatedAt: new Date().toISOString()
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowAddTaskModal(false);

    recordBehaviorEvent('choice_made', {
      action: 'task_created',
      taskId: newTask.taskId,
      title: newTask.title
    });
  };

  const handleAdvanceMissionStep = (missionId: string, stepId: string) => {
    SoundEngine.playSuccess();
    setMissionPlans((prev) =>
      prev.map((m) => {
        if (m.missionId === missionId) {
          const updatedSteps = m.steps.map((s) =>
            s.stepId === stepId ? { ...s, completed: true } : s
          );
          const nextIndex = Math.min(m.steps.length - 1, m.currentStepIndex + 1);
          const allDone = updatedSteps.every((s) => s.completed);
          return {
            ...m,
            steps: updatedSteps,
            currentStepIndex: nextIndex,
            status: allDone ? 'completed' : 'in_progress',
            completedAt: allDone ? new Date().toISOString() : undefined
          };
        }
        return m;
      })
    );

    setActiveMission((prev) => {
      const updatedSteps = prev.steps.map((s) =>
        s.stepId === stepId ? { ...s, completed: true } : s
      );
      const nextIndex = Math.min(prev.steps.length - 1, prev.currentStepIndex + 1);
      const allDone = updatedSteps.every((s) => s.completed);
      return {
        ...prev,
        steps: updatedSteps,
        currentStepIndex: nextIndex,
        status: allDone ? 'completed' : 'in_progress'
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* V6 COGNITIVE LOAD & DISTRACTION RECOVERY BANNER */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                Chỉ Số Nhận Thức Tích Cực
              </span>
              <span className="text-xs text-gray-500 font-mono">Master Spec V6.5 & V6.7</span>
            </div>
            <h3 className="text-base font-bold text-gray-900">
              Điều Hòa Nhận Thức & Khả Năng Hồi Phục Tập Trung (DRI)
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
              Hệ thống theo dõi độ tải nhận thức nhằm bảo đảm bạn học tập trong trạng thái thoải mái nhất, không quá tải và không nản lòng.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-2xl shrink-0">
            <div className="text-center px-2">
              <span className="text-xs font-bold text-gray-600 block">Trạng thái</span>
              <span className="text-sm font-black text-emerald-600 uppercase">
                {DEFAULT_COGNITIVE_LOAD.loadStatus === 'optimal' ? 'Tối Ưu' : 'Cần Nghỉ Ngơi'}
              </span>
            </div>
            <div className="w-px h-8 bg-indigo-200/60" />
            <div className="text-center px-2">
              <span className="text-xs font-bold text-gray-600 block">Hồi phục tập trung (DRI)</span>
              <span className="text-base font-black text-indigo-700">
                {Math.round(DEFAULT_COGNITIVE_LOAD.distractionRecoveryIndex * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Cognitive Load Composition Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Tải Bản Thể (Độ khó bài học):</span>
              <span className="font-mono font-bold text-indigo-600">
                {Math.round(DEFAULT_COGNITIVE_LOAD.intrinsicLoad * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${DEFAULT_COGNITIVE_LOAD.intrinsicLoad * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 block">Mức độ thử thách phù hợp</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Tải Tạo Nghĩa (Học hiểu sâu):</span>
              <span className="font-mono font-bold text-emerald-600">
                {Math.round(DEFAULT_COGNITIVE_LOAD.constructiveLoad * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${DEFAULT_COGNITIVE_LOAD.constructiveLoad * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 block">Khả năng tiếp thu tích cực</span>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200/80 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-600 font-semibold">Tải Nhiễu Ngoại Cảnh:</span>
              <span className="font-mono font-bold text-amber-600">
                {Math.round(DEFAULT_COGNITIVE_LOAD.extraneousLoad * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${DEFAULT_COGNITIVE_LOAD.extraneousLoad * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 block">Xao nhãng ở mức rất thấp</span>
          </div>
        </div>
      </div>

      {/* STRATEGIC MISSION PLANNER (V6.9) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-gray-900">
                Chuỗi Nhiệm Vụ Chiến Lược Của Em (Mission Planner)
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Kết nối liền mạch: Xác định mục tiêu &rarr; Mô phỏng game &rarr; Việc nhỏ thực tế &rarr; Phản tư
            </p>
          </div>

          <div className="flex items-center gap-2">
            {missionPlans.map((m) => (
              <button
                key={m.missionId}
                onClick={() => setActiveMission(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeMission.missionId === m.missionId
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Mission Card */}
        <div className="p-5 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 rounded-2xl border border-indigo-100 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 py-0.5 rounded-md">
                Nhiệm Vụ Đang Thực Hiện
              </span>
              <span className="text-xs font-mono text-gray-500">
                Mục tiêu: {activeMission.targetGoalTitle}
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mt-1">{activeMission.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{activeMission.description}</p>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-3 pt-2">
            {activeMission.steps.map((step, idx) => {
              const isCurrent = activeMission.currentStepIndex === idx && !step.completed;
              return (
                <div
                  key={step.stepId}
                  className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    step.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-gray-700'
                      : isCurrent
                      ? 'bg-white border-indigo-400 shadow-xs ring-2 ring-indigo-100'
                      : 'bg-gray-50/70 border-gray-200 text-gray-500 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                        step.completed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-gray-900">{step.title}</h5>
                        <span className="text-[10px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                          {step.durationMinutes} phút
                        </span>
                      </div>
                      {step.promptNotes && (
                        <p className="text-[11px] text-gray-500 mt-0.5">{step.promptNotes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {step.completed ? (
                      <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã hoàn thành</span>
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {step.gameId && onPlayGame && (
                          <button
                            onClick={() => onPlayGame(step.gameId!)}
                            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Play className="w-3 h-3" />
                            <span>Vào Game</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleAdvanceMissionStep(activeMission.missionId, step.stepId)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <span>Xong bước này</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TASK PORTFOLIO (V6.3 Multi-Task Student Model) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-gray-900">
                Danh Mục Đa Tác Vụ Của Em (Task Portfolio)
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Quản lý đồng thời bài tập, việc nhỏ, thói quen và mục tiêu mà không bị quá tải
            </p>
          </div>

          <button
            onClick={() => setShowAddTaskModal(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Việc Cần Làm</span>
          </button>
        </div>

        {/* Add Task Modal */}
        {showAddTaskModal && (
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
              Thêm Tác Vụ Cá Nhân Mới
            </h4>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Nhập tên việc cần làm (ví dụ: Giải 3 bài toán hình, soạn sách vở...)"
                className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-semibold">Loại việc:</span>
                  <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value as TaskState['type'])}
                    className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs"
                  >
                    <option value="ASSIGNMENT">Bài tập về nhà (ASSIGNMENT)</option>
                    <option value="MICRO_ACTION">Việc nhỏ 5 phút (MICRO_ACTION)</option>
                    <option value="LEARNING">Học kiến thức mới (LEARNING)</option>
                    <option value="HABIT">Thói quen rèn luyện (HABIT)</option>
                    <option value="PROJECT">Dự án cá nhân (PROJECT)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-600 font-semibold">Dự kiến:</span>
                  <select
                    value={newTaskEffort}
                    onChange={(e) => setNewTaskEffort(Number(e.target.value))}
                    className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs"
                  >
                    <option value={5}>5 phút</option>
                    <option value={15}>15 phút</option>
                    <option value={25}>25 phút</option>
                    <option value={45}>45 phút</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Lưu Vào Danh Mục
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tasks.map((task) => (
            <div
              key={task.taskId}
              className={`p-4 rounded-2xl border transition space-y-3 ${
                task.status === 'COMPLETED'
                  ? 'bg-gray-50/80 border-gray-200 opacity-75'
                  : 'bg-white border-gray-200 hover:border-indigo-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        task.type === 'MICRO_ACTION'
                          ? 'bg-emerald-100 text-emerald-800'
                          : task.type === 'ASSIGNMENT'
                          ? 'bg-indigo-100 text-indigo-800'
                          : task.type === 'HABIT'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {task.type}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      ~{task.estimatedEffortMinutes} phút
                    </span>
                  </div>
                  <h4
                    className={`text-xs font-bold text-gray-900 ${
                      task.status === 'COMPLETED' ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </h4>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    task.status === 'COMPLETED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : task.priority >= 4
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {task.status === 'COMPLETED'
                    ? 'Đã xong'
                    : task.priority >= 4
                    ? 'Ưu tiên cao'
                    : 'Bình thường'}
                </span>
              </div>

              {/* Progress Bar & Quick Controls */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] text-gray-600 font-mono">
                  <span>Tiến độ</span>
                  <span className="font-bold text-indigo-700">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      task.progress === 100 ? 'bg-emerald-600' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <span className="text-[10px] text-gray-400 font-mono">
                  Độ khó: {task.difficulty}/5
                </span>

                <div className="flex items-center gap-1">
                  {task.status !== 'COMPLETED' && (
                    <>
                      <button
                        onClick={() => handleUpdateTaskProgress(task.taskId, 25)}
                        className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[11px] font-semibold transition cursor-pointer"
                      >
                        +25%
                      </button>
                      <button
                        onClick={() => handleUpdateTaskProgress(task.taskId, 100)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold transition cursor-pointer"
                      >
                        Hoàn thành
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STUDENT AGENCY ENGINE (V6.28) */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-purple-800/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/40 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-300" />
              <h3 className="text-base font-bold text-white">
                Chỉ Số Tự Chủ Học Sinh (Student Agency & Autonomy)
              </h3>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              "AI recommendation &ne; mandatory action" — Bạn luôn là người quyết định mục tiêu và tốc độ rèn luyện của mình.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full self-start sm:self-auto">
            Mức Độ Tự Chủ: Cao (High Autonomy)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200 block">Đa dạng lựa chọn</span>
            <span className="text-xl font-black text-amber-300">
              {DEFAULT_STUDENT_AGENCY.choiceDiversityScore}%
            </span>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200 block">Tự nguyện thử lại</span>
            <span className="text-xl font-black text-emerald-300">
              {DEFAULT_STUDENT_AGENCY.voluntaryRetryRate}%
            </span>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200 block">Làm chủ mục tiêu</span>
            <span className="text-xl font-black text-indigo-300">
              {DEFAULT_STUDENT_AGENCY.goalOwnershipScore}%
            </span>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
            <span className="text-[11px] text-purple-200 block">Việc tự khởi xướng</span>
            <span className="text-xl font-black text-rose-300">
              {DEFAULT_STUDENT_AGENCY.selfInitiatedActionsCount} việc
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
