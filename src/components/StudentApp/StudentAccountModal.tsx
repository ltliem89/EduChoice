import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Users,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle,
  Database,
  Award,
  Flame,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SoundEngine } from '../../utils/soundEffects';

interface StudentAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'profile' | 'accounts' | 'v9';
}

const AVATAR_OPTIONS = ['🚀', '🎨', '💡', '⚡', '🌟', '🦁', '🐬', '🦉', '🎯', '🔮', '🌈', '🦊', '🍀', '🏆', '🧩', '🌺'];

const BADGE_OPTIONS = [
  'Nhà Chiến Lược Thời Gian',
  'Bậc Thầy Điềm Tĩnh',
  'Chiến Binh Quyết Đoán',
  'Chuyên Gia Kế Hoạch',
  'Tân Binh Thích Ứng',
  'Nhà Thám Hiểm Tri Thức',
  'Học Sinh Kiên Trì',
  'Thủ Lĩnh Quyết Định'
];

const GRADE_OPTIONS = ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'];

export const StudentAccountModal: React.FC<StudentAccountModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'profile'
}) => {
  const {
    studentModel,
    updateStudentProfile,
    savedAccounts,
    switchStudentAccount,
    createStudentAccount,
    deleteStudentAccount
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'accounts' | 'v9'>(defaultTab);

  // Form state for current editing profile
  const [formName, setFormName] = useState(studentModel.name || '');
  const [formGrade, setFormGrade] = useState(studentModel.gradeLevel || 'Lớp 8');
  const [formAvatar, setFormAvatar] = useState(studentModel.avatar || '🚀');
  const [formBadge, setFormBadge] = useState(studentModel.badge || 'Nhà Chiến Lược Thời Gian');
  const [formCohort, setFormCohort] = useState(studentModel.cohort || 'Lớp 8A1 (Nhóm Thực Nghiệm)');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for creating new account
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('Lớp 8');
  const [newAvatar, setNewAvatar] = useState('🌟');
  const [newBadge, setNewBadge] = useState('Tân Binh Thích Ứng');
  const [newCohort, setNewCohort] = useState('Lớp 8A2 (Nhóm Mới)');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    SoundEngine.playSelect();
    updateStudentProfile({
      name: formName.trim(),
      gradeLevel: formGrade,
      avatar: formAvatar,
      badge: formBadge,
      cohort: formCohort
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCreateNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    SoundEngine.playSelect();
    createStudentAccount({
      name: newName.trim(),
      gradeLevel: newGrade,
      avatar: newAvatar,
      badge: newBadge,
      cohort: newCohort
    });

    // Reset create form
    setNewName('');
    setIsCreatingNew(false);
    // Switch to profile tab for newly created student
    setFormName(newName.trim());
    setFormGrade(newGrade);
    setFormAvatar(newAvatar);
    setFormBadge(newBadge);
    setFormCohort(newCohort);
    setActiveTab('profile');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 to-purple-50/70">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-sm">
              {studentModel.avatar || '🚀'}
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                <span>Quản Lý Tài Khoản Học Sinh</span>
                <span className="text-[11px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                  No-PII Safe
                </span>
              </h2>
              <p className="text-xs text-gray-500">
                Đổi tên, chỉnh sửa thông tin hoặc chuyển đổi tài khoản học viên rèn luyện
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-xl transition cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-gray-100 px-6 bg-white gap-4 text-xs font-bold text-gray-600">
          <button
            onClick={() => {
              SoundEngine.playClick();
              setActiveTab('profile');
            }}
            className={`py-3 border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Chỉnh Sửa Hồ Sơ Hiện Tại</span>
          </button>

          <button
            onClick={() => {
              SoundEngine.playClick();
              setActiveTab('accounts');
            }}
            className={`py-3 border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'accounts'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Chuyển Đổi & Thêm Tài Khoản ({savedAccounts?.length || 1})</span>
          </button>

          <button
            onClick={() => {
              SoundEngine.playClick();
              setActiveTab('v9');
            }}
            className={`py-3 border-b-2 flex items-center gap-2 cursor-pointer transition ${
              activeTab === 'v9'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Đồng Bộ Google Sheets V9</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: EDIT PROFILE & NAME */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              
              {saveSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Đã cập nhật thông tin tài khoản thành công và đồng bộ vào Google Sheets (01_USERS)!</span>
                </div>
              )}

              {/* Tên học sinh (INPUT FIELD) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Tên học sinh / Biệt danh học tập <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nhập tên học sinh (VD: Minh Đức, Bảo An...)"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-semibold text-gray-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Tên này sẽ hiển thị trên thanh điều hướng, các kịch bản tình huống và báo cáo tiến bộ.
                </p>
              </div>

              {/* Mã học sinh & Khối lớp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Mã Định Danh Học Viên (ID)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={studentModel.userId}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Mã tự sinh chuẩn hoá theo V9 Sheets.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Khối Lớp
                  </label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-indigo-500 outline-none"
                  >
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lớp / Nhóm nghiên cứu (Cohort) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Lớp / Nhóm Đối Chứng Nghiên Cứu (Cohort)
                </label>
                <input
                  type="text"
                  value={formCohort}
                  onChange={(e) => setFormCohort(e.target.value)}
                  placeholder="VD: Lớp 8A1 (Nhóm Thực Nghiệm)"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>

              {/* Biểu tượng đại diện (Avatar Picker) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Biểu Tượng Đại Diện (Avatar)
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        SoundEngine.playSelect();
                        setFormAvatar(emoji);
                      }}
                      className={`h-11 rounded-xl text-xl flex items-center justify-center transition cursor-pointer border ${
                        formAvatar === emoji
                          ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-300 shadow-sm scale-105'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Danh hiệu học viên (Badge) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Danh Hiệu Học Viên
                </label>
                <select
                  value={formBadge}
                  onChange={(e) => setFormBadge(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:bg-white focus:border-indigo-500 outline-none"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Lưu Thông Tin Tài Khoản</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MULTI-ACCOUNT SWITCHER & CREATE NEW */}
          {activeTab === 'accounts' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Danh Sách Tài Khoản Học Sinh Trên Thiết Bị
                  </h3>
                  <p className="text-xs text-gray-500">
                    Chuyển đổi tức thì giữa các hồ sơ học sinh để kiểm thử hoặc học theo nhóm
                  </p>
                </div>

                {!isCreatingNew && (
                  <button
                    onClick={() => {
                      SoundEngine.playClick();
                      setIsCreatingNew(true);
                    }}
                    className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-indigo-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Tài Khoản</span>
                  </button>
                )}
              </div>

              {/* Form to create new account if toggled */}
              {isCreatingNew && (
                <form
                  onSubmit={handleCreateNewAccount}
                  className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-4 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Tạo Hồ Sơ Học Sinh Mới</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(false)}
                      className="text-xs text-gray-500 hover:text-gray-800"
                    >
                      Hủy
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Tên học sinh mới
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="VD: Hoàng Yến, Nhật Minh..."
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Khối Lớp
                      </label>
                      <select
                        value={newGrade}
                        onChange={(e) => setNewGrade(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 outline-none"
                      >
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Avatar
                      </label>
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        {AVATAR_OPTIONS.slice(0, 8).map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setNewAvatar(emoji)}
                            className={`w-8 h-8 rounded-lg text-base flex items-center justify-center border cursor-pointer ${
                              newAvatar === emoji ? 'bg-indigo-200 border-indigo-600' : 'bg-white border-gray-200'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Lớp / Nhóm Cohort
                      </label>
                      <input
                        type="text"
                        value={newCohort}
                        onChange={(e) => setNewCohort(e.target.value)}
                        placeholder="VD: Lớp 8A3 (Nhóm B)"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingNew(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-100"
                    >
                      Bỏ qua
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-sm"
                    >
                      Tạo & Chuyển Sang Tài Khoản Này
                    </button>
                  </div>
                </form>
              )}

              {/* Accounts List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAccounts?.map((account) => {
                  const isActive = studentModel.userId === account.userId;
                  return (
                    <div
                      key={account.userId}
                      className={`p-4 rounded-2xl border transition relative flex flex-col justify-between ${
                        isActive
                          ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-2 ring-indigo-200'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{account.avatar || '🚀'}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-sm text-gray-900">
                                  {account.name || 'Học viên'}
                                </h4>
                                {isActive && (
                                  <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.2 rounded-full">
                                    Đang dùng
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-gray-500 font-mono block">
                                #{account.userId} • {account.gradeLevel}
                              </span>
                            </div>
                          </div>

                          {!isActive && (savedAccounts.length > 1) && (
                            <button
                              onClick={() => {
                                SoundEngine.playClick();
                                if (window.confirm(`Bạn có chắc muốn xóa tài khoản của ${account.name}?`)) {
                                  deleteStudentAccount(account.userId);
                                }
                              }}
                              className="text-gray-400 hover:text-rose-600 p-1 rounded-md transition cursor-pointer"
                              title="Xóa hồ sơ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            {account.streakDays || 1} ngày
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            {account.sessionsCompleted || 0} bài
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-100">
                          {account.badge || 'Học viên'}
                        </span>

                        {!isActive ? (
                          <button
                            onClick={() => {
                              SoundEngine.playSelect();
                              switchStudentAccount(account.userId);
                              // Sync local form state
                              setFormName(account.name || '');
                              setFormGrade(account.gradeLevel || 'Lớp 8');
                              setFormAvatar(account.avatar || '🚀');
                              setFormBadge(account.badge || 'Học viên');
                              setFormCohort(account.cohort || '');
                            }}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white px-3 py-1 rounded-lg border border-indigo-200 hover:border-indigo-400 shadow-2xs transition cursor-pointer"
                          >
                            Chọn Tài Khoản Này
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Hoạt động
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: V9 GOOGLE SHEETS SYNCHRONIZATION */}
          {activeTab === 'v9' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Database className="w-4 h-4 text-indigo-600" />
                  <span>Trạng Thái Đồng Bộ Bảng Dữ Liệu V9 Canonical</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Thông tin học sinh được mã hoá phi định danh (No-PII Safe) và tự động đồng bộ theo thời gian thực tới 2 trang tính nền tảng:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-[11px] font-mono font-bold text-indigo-600 block">
                      01_USERS
                    </span>
                    <span className="text-xs text-gray-800 font-semibold block mt-0.5">
                      Danh Mục Người Dùng & Tài Khoản
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">
                      Mã: #{studentModel.userId} • Tên: {studentModel.name}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-gray-200">
                    <span className="text-[11px] font-mono font-bold text-emerald-600 block">
                      16_STUDENT_PROFILES
                    </span>
                    <span className="text-xs text-gray-800 font-semibold block mt-0.5">
                      Hồ Sơ Năng Lực Học Sinh
                    </span>
                    <span className="text-[10px] text-gray-500 block mt-1">
                      Khối: {studentModel.gradeLevel} • Nhóm: {studentModel.cohort || 'Mặc định'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Chính Sách Bảo Vệ Quyền Riêng Tư & An Toàn Học Đường</span>
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-800">
                  EduChoice-AI không lưu trữ số điện thoại, địa chỉ nhà, email cá nhân hay họ tên thật có thể định danh. Mọi dữ liệu nghiên cứu chỉ phục vụ tối ưu hóa giàn giáo tâm lý giáo dục và thuật toán thích ứng.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>EduChoice-AI Account Core V9</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
