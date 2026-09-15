/**
 * EDUCHOICE-AI V10 MANAGEMENT CLOUD ENGINE
 * Server-side support for Field Bindings, Dynamic Config, RBAC & Vertical Slice
 */

import { V10_FIELD_BINDINGS, V10_DEFAULT_SYSTEM_CONFIG, V10_DATA_DICTIONARY } from '../src/data/v10DataDictionary';
import { V10Role, V10SystemConfig, V10AuditEntry, V10SyncLogItem, V10HealthStatus } from '../src/types/v10DataContract';

// In-Memory store for V10 specific resources
let currentSystemConfig: V10SystemConfig = { ...V10_DEFAULT_SYSTEM_CONFIG };
const v10GoalsStore: any[] = [
  {
    recordId: 'GOAL_001',
    goalId: 'GOAL_001',
    studentId: 'STU_001',
    category: 'Tự chủ',
    goalTitle: 'Hoàn thành bài tập trước 21h00',
    target: 5,
    current: 3,
    unit: 'buổi',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    recordId: 'GOAL_002',
    goalId: 'GOAL_002',
    studentId: 'STU_001',
    category: 'Tập trung',
    goalTitle: 'Áp dụng Pomodoro 25 phút không dùng mạng xã hội',
    target: 7,
    current: 5,
    unit: 'phiên',
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const v10AuditLogs: V10AuditEntry[] = [];
const v10SyncLogs: V10SyncLogItem[] = [];

export class V10DataEngine {
  public static getSystemConfig(): V10SystemConfig {
    return currentSystemConfig;
  }

  public static updateSystemConfig(updates: Partial<V10SystemConfig>, user: string = 'SYSTEM'): V10SystemConfig {
    currentSystemConfig = {
      ...currentSystemConfig,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: user
    };
    this.logAudit({
      auditId: `AUD_${Date.now()}`,
      requestId: `REQ_${Date.now()}`,
      actorId: user,
      role: 'SUPER_ADMIN',
      action: 'UPDATE_SYSTEM_CONFIG',
      table: '36_SYSTEM_CONFIG',
      recordId: 'SYSTEM_RUNTIME_CONFIG',
      after: updates,
      timestamp: new Date().toISOString(),
      reason: 'Remote System Config Update'
    });
    return currentSystemConfig;
  }

  public static writeField(
    recordId: string,
    fields: Record<string, any>,
    actorRole: V10Role = 'TEACHER',
    actorId: string = 'TEACHER_CURRENT',
    reason?: string
  ) {
    const results: Record<string, any> = {};

    Object.keys(fields).forEach((fieldId) => {
      const binding = V10_FIELD_BINDINGS[fieldId];
      if (!binding) {
        throw new Error(`UNKNOWN_FIELD: ${fieldId}`);
      }

      // RBAC check
      if (actorRole !== 'SUPER_ADMIN' && !binding.writableRoles.includes(actorRole)) {
        throw new Error(`FORBIDDEN_WRITE: Role ${actorRole} cannot write field ${fieldId}`);
      }

      results[fieldId] = fields[fieldId];

      this.logAudit({
        auditId: `AUD_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        requestId: `REQ_${Date.now()}`,
        actorId,
        role: actorRole,
        action: 'UPDATE_FIELD',
        table: binding.table,
        recordId,
        after: { [binding.column]: fields[fieldId] },
        timestamp: new Date().toISOString(),
        reason: reason || 'Field-level mutation'
      });
    });

    return {
      recordId,
      updatedFields: results,
      serverTimestamp: new Date().toISOString()
    };
  }

  public static readFields(
    recordId: string,
    fieldIds: string[],
    actorRole: V10Role = 'TEACHER'
  ): Record<string, any> {
    const result: Record<string, any> = {};

    fieldIds.forEach((fieldId) => {
      const binding = V10_FIELD_BINDINGS[fieldId];
      if (!binding) {
        throw new Error(`UNKNOWN_FIELD: ${fieldId}`);
      }

      if (actorRole !== 'SUPER_ADMIN' && !binding.readableRoles.includes(actorRole)) {
        throw new Error(`FORBIDDEN_READ: Role ${actorRole} cannot read field ${fieldId}`);
      }

      // Check if it exists in goal or mock data
      const goal = v10GoalsStore.find((g) => g.recordId === recordId || g.studentId === recordId);
      if (goal && binding.column in goal) {
        result[fieldId] = goal[binding.column];
      } else {
        result[fieldId] = null;
      }
    });

    return result;
  }

  public static createGoal(goal: any, actorRole: V10Role = 'TEACHER', actorId: string = 'TEACHER') {
    const recordId = goal.recordId || `GOAL_${Date.now().toString(36)}`;
    const newGoal = {
      recordId,
      goalId: recordId,
      studentId: goal.studentId || 'STU_001',
      category: goal.category || 'Tự chủ',
      goalTitle: goal.goalTitle || (goal.fields && goal.fields['goal.title']) || 'Mục tiêu rèn luyện',
      target: Number(goal.target) || 5,
      current: Number(goal.current) || 0,
      unit: goal.unit || 'phiên',
      status: goal.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    v10GoalsStore.unshift(newGoal);

    this.logAudit({
      auditId: `AUD_${Date.now()}`,
      requestId: goal.requestId || `REQ_${Date.now()}`,
      actorId,
      role: actorRole,
      action: 'CREATE_GOAL',
      table: '04_GOALS',
      recordId,
      after: newGoal,
      timestamp: new Date().toISOString(),
      reason: goal.reason || 'Goal created via V10 API'
    });

    return newGoal;
  }

  public static getGoalsByStudent(studentId: string) {
    return v10GoalsStore.filter((g) => g.studentId === studentId);
  }

  public static getGoalById(recordId: string) {
    return v10GoalsStore.find((g) => g.recordId === recordId);
  }

  public static logAudit(entry: V10AuditEntry) {
    v10AuditLogs.unshift(entry);
    if (v10AuditLogs.length > 500) v10AuditLogs.pop();
  }

  public static getAuditLogs(limit: number = 50): V10AuditEntry[] {
    return v10AuditLogs.slice(0, limit);
  }

  public static recordSync(item: V10SyncLogItem) {
    v10SyncLogs.unshift({
      ...item,
      serverReceivedAt: new Date().toISOString()
    });
    if (v10SyncLogs.length > 200) v10SyncLogs.pop();
  }

  public static getSyncLogs(limit: number = 50): V10SyncLogItem[] {
    return v10SyncLogs.slice(0, limit);
  }

  public static getHealthStatus(gatewayMode: string = 'LOCAL_BRIDGE'): V10HealthStatus {
    const appsScriptConfigured = Boolean(
      process.env.APPS_SCRIPT_URL && process.env.SPREADSHEET_ID
    );
    return {
      ok: true,
      // Honest health: Apps Script / Spreadsheet are NOT connected in this deployment.
      appsScript: appsScriptConfigured ? 'degraded' : 'offline',
      spreadsheet: appsScriptConfigured ? 'degraded' : 'offline',
      schemaVersion: '10.0.0',
      lastWrite: v10AuditLogs[0]?.timestamp || '',
      lastRead: new Date().toISOString(),
      errorRate: 0,
      gatewayType: gatewayMode as any,
      tablesCount: 39,
      recordsCount: v10GoalsStore.length + v10AuditLogs.length + v10SyncLogs.length,
      demoMode: true,
      dataLayer: 'IN_MEMORY_MOCK'
    };
  }

  public static getDataDictionary() {
    return V10_DATA_DICTIONARY;
  }
}
