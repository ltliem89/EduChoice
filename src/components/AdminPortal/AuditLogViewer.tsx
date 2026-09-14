import React from 'react';
import { ShieldCheck, History, User, Clock, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              Nhật Ký Kiểm Toán (Audit & Traceability Log)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold">
              Bất biến (Immutable)
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Lưu vết mọi thay đổi trạng thái, phiên bản, phê duyệt kịch bản và quyết định xuất bản
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Thời Gian</th>
                <th className="py-3 px-4">Người Thực Hiện</th>
                <th className="py-3 px-4">Đối Tượng</th>
                <th className="py-3 px-4">ID & Phiên Bản</th>
                <th className="py-3 px-4">Thao Tác</th>
                <th className="py-3 px-4">Ghi Chú Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{log.actor}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">({log.role})</span>
                  </td>

                  <td className="py-3 px-4 font-semibold uppercase text-gray-700 text-[11px]">
                    {log.entity}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-gray-600">
                    <div>{log.entityId}</div>
                    <span className="text-[10px] text-gray-400">v{log.version}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.operation === 'PUBLISH'
                          ? 'bg-emerald-100 text-emerald-800'
                          : log.operation === 'APPROVE'
                          ? 'bg-amber-100 text-amber-800'
                          : log.operation === 'GENERATE_AI'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {log.operation}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-gray-700 font-medium">
                    {log.diffNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
