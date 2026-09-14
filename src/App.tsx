/**
 * EDUCHOICE-AI v3 — Main Application Root
 * Google AI Studio Game Design • OpenCode Game Runtime • Admin Portal • Google Sheets Gateway
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { StudentPortal } from './components/StudentApp/StudentPortal';
import { AdminDashboard } from './components/AdminPortal/AdminDashboard';
import { ScriptEditor } from './components/AdminPortal/ScriptEditor';
import { GameManager } from './components/AdminPortal/GameManager';
import { ToolkitManager } from './components/AdminPortal/ToolkitManager';
import { ResearchMetrics } from './components/AdminPortal/ResearchMetrics';
import { AuditLogViewer } from './components/AdminPortal/AuditLogViewer';
import { V10CloudManagement } from './components/AdminPortal/V10CloudManagement';

function AppContent() {
  const { mode, adminTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {mode === 'student' ? (
          <StudentPortal />
        ) : (
          <div className="space-y-6">
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'v10cloud' && <V10CloudManagement />}
            {adminTab === 'scripts' && <ScriptEditor />}
            {adminTab === 'games' && <GameManager />}
            {adminTab === 'toolkits' && <ToolkitManager />}
            {adminTab === 'research' && <ResearchMetrics />}
            {adminTab === 'audit' && <AuditLogViewer />}
          </div>
        )}
      </main>

      {/* Standardized Educational Architecture Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-xs text-gray-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-gray-700">
              EduChoice-AI v3 • Nền tảng Giáo dục Hành vi Thích ứng
            </p>
            <p className="text-[11px] text-gray-400">
              Kiến trúc: Google AI Studio (Design) • OpenCode (Game Runtime) • Admin Portal (Review & Publish) • Google Sheets (Data Layer)
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span>Bảo mật: Không PII</span>
            <span>•</span>
            <span>13 Hộp Công Cụ Tâm Lý</span>
            <span>•</span>
            <span>DSL Version 1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}
