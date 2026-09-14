import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Shield,
  Brain,
  LayoutDashboard,
  FileText,
  Boxes,
  Activity,
  History,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  Award,
  Edit3,
  Check,
  X,
  UserCog,
  Users,
  Cloud
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SoundEngine } from '../utils/soundEffects';
import { StudentAccountModal } from './StudentApp/StudentAccountModal';

export const Navbar: React.FC = () => {
  const { mode, setMode, adminTab, setAdminTab, studentModel, updateStudentProfile, savedAccounts } = useApp();
  const [isMuted, setIsMuted] = useState(SoundEngine.isMuted());
  const [apiStatus, setApiStatus] = useState<'checking' | 'active' | 'offline'>('checking');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentModel.name || '');

  useEffect(() => {
    setTempName(studentModel.name || '');
  }, [studentModel.name]);

  const handleSaveName = () => {
    if (tempName.trim()) {
      SoundEngine.playSelect();
      updateStudentProfile({ name: tempName.trim() });
    }
    setIsEditingName(false);
  };

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setApiStatus(data.geminiConfigured ? 'active' : 'offline');
        }
      })
      .catch(() => setApiStatus('offline'));
  }, []);

  const handleSoundToggle = () => {
    const enabled = SoundEngine.toggleSound();
    setIsMuted(!enabled);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Student Welcome */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (mode === 'student') {
                  SoundEngine.playClick();
                  setIsAccountModalOpen(true);
                }
              }}
              className={`w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md shadow-indigo-100 font-black text-xl select-none transition ${
                mode === 'student' ? 'hover:scale-105 hover:ring-2 hover:ring-indigo-300 cursor-pointer' : ''
              }`}
              title={mode === 'student' ? 'Bấm để quản lý tài khoản & đổi avatar' : 'EduChoice'}
            >
              {studentModel.avatar || '🚀'}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-gray-900">
                  EduChoice
                </span>
                <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {mode === 'student' ? 'Góc Học Sinh' : 'Ban Quản Trị'}
                </span>
              </div>

              {/* Student Name with Inline Input & Account Management Button */}
              {mode === 'student' ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  {isEditingName ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                          if (e.key === 'Escape') setIsEditingName(false);
                        }}
                        placeholder="Tên học sinh..."
                        className="px-2 py-0.5 text-xs font-bold border border-indigo-400 rounded-md outline-none bg-white text-gray-900 shadow-2xs w-28 sm:w-36"
                      />
                      <button
                        onClick={handleSaveName}
                        className="p-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-[10px] cursor-pointer"
                        title="Lưu tên"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md text-[10px] cursor-pointer"
                        title="Hủy"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                        Xin chào
                      </span>
                      <button
                        onClick={() => {
                          setTempName(studentModel.name || '');
                          setIsEditingName(true);
                        }}
                        className="group flex items-center gap-1 px-1.5 py-0.5 rounded-lg hover:bg-indigo-50 transition cursor-pointer text-[11px] font-extrabold text-indigo-900 border border-transparent hover:border-indigo-200"
                        title="Bấm để chỉnh sửa tên học sinh trực tiếp"
                      >
                        <span>{studentModel.name || 'Học viên'}</span>
                        <Edit3 className="w-3 h-3 text-indigo-400 group-hover:text-indigo-600 opacity-70 group-hover:opacity-100" />
                      </button>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {studentModel.gradeLevel}
                      </span>
                      <button
                        onClick={() => {
                          SoundEngine.playClick();
                          setIsAccountModalOpen(true);
                        }}
                        className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Quản lý tài khoản và danh sách học sinh"
                      >
                        <UserCog className="w-3 h-3 text-indigo-600" />
                        <span className="hidden md:inline">Quản lý tài khoản</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-gray-500 hidden sm:block">
                  Không gian Thiết kế Kịch bản & Quản lý Hệ thống
                </p>
              )}
            </div>
          </div>

          {/* Center Role Switcher (Simple & Friendly) */}
          <div className="flex items-center bg-gray-100/90 p-1 rounded-2xl border border-gray-200">
            <button
              onClick={() => {
                SoundEngine.playSelect();
                setMode('student');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'student'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Góc Học Sinh</span>
            </button>

            <button
              onClick={() => {
                SoundEngine.playSelect();
                setMode('admin');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                mode === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Giáo Viên / Quản Trị</span>
            </button>
          </div>

          {/* Right: Student Streaks / Audio / Companion Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            {mode === 'student' && (
              <div className="hidden sm:flex items-center gap-2">
                <div
                  className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-bold"
                  title="Chuỗi ngày rèn luyện liên tục của bạn"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{studentModel.streakDays || 4} ngày</span>
                </div>

                <div
                  className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold"
                  title="Số thử thách bạn đã hoàn thành"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{studentModel.sessionsCompleted} bài</span>
                </div>
              </div>
            )}

            {/* Audio Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition cursor-pointer"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>

        {/* Sub-navigation bar when in Admin Portal Mode */}
        {mode === 'admin' && (
          <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-gray-100 text-xs font-semibold text-gray-600">
            {[
              { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
              { id: 'v10cloud', label: '☁️ V10 Remote Cloud', icon: Cloud },
              { id: 'scripts', label: 'Soạn kịch bản & AI Studio', icon: FileText },
              { id: 'games', label: 'Quản lý trò chơi', icon: Boxes },
              { id: 'toolkits', label: 'Hộp công cụ tâm lý (13)', icon: Brain },
              { id: 'research', label: 'Nghiên cứu & Sheets', icon: Activity },
              { id: 'audit', label: 'Nhật ký kiểm toán', icon: History }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    SoundEngine.playClick();
                    setAdminTab(tab.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-bold'
                      : 'hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Student Account Management Modal */}
      <StudentAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </header>
  );
};
