/**
 * EDUCHOICE-AI V9 UNIFIED DATA CLIENT
 * Implements Section 26 (Idempotency), Section 30 (API Client), Section 31 (Offline Queue),
 * and Section 32 (Read-Back Verification).
 */

import {
  V9EventPayload,
  V9GameResultRecord,
  V9InterventionResultRecord,
  V9ReflectionRecord,
  V9MicroActionRecord,
  V9TransferMeasureRecord,
  V9TeacherLabelRecord,
  V9SheetName,
  V9TestStepResult
} from '../types/v9DataContract';

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  requestId?: string;
  duplicate?: boolean;
  message?: string;
  source?: 'GOOGLE_SHEETS' | 'APPS_SCRIPT_PROXY' | 'LOCAL_OFFLINE_QUEUE' | 'SERVER_STORE';
  readBackVerified?: boolean;
}

export interface OfflineQueueItem {
  queueId: string;
  requestId: string;
  endpoint: string;
  body: any;
  retryCount: number;
  createdAt: string;
  lastAttemptAt?: string;
  status: 'pending' | 'failed' | 'synced';
}

const OFFLINE_QUEUE_KEY = 'educhoice_v9_offline_queue';

class V9ApiClient {
  private isOnline: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.flushOfflineQueue();
      });
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }

  private generateId(prefix: string): string {
    const randomHex = Math.random().toString(36).substring(2, 10);
    return `${prefix}_${Date.now().toString(36)}_${randomHex}`;
  }

  public getRequestId(): string {
    return this.generateId('REQ');
  }

  public getStudentId(): string {
    return this.generateId('STU');
  }

  public getSessionId(): string {
    return this.generateId('SES');
  }

  public getRecordId(): string {
    return this.generateId('REC');
  }

  public getEventId(): string {
    return this.generateId('EVT');
  }

  // Generic POST with Idempotency & Offline Queue Fallback
  public async post<T = any>(endpoint: string, body: Record<string, any>): Promise<ApiResponse<T>> {
    const requestId = body.requestId || this.getRequestId();
    const payload = {
      ...body,
      requestId,
      clientTimestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`/api/v9${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Id': requestId
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      console.warn(`[V9 Client] Request to ${endpoint} failed (${err.message}). Storing into offline queue.`);
      this.enqueueOffline(endpoint, payload);

      return {
        ok: true,
        source: 'LOCAL_OFFLINE_QUEUE',
        message: 'Đã lưu an toàn vào hàng đợi ngoại tuyến (Offline Queue), sẽ tự động đồng bộ khi có mạng.',
        requestId,
        data: payload as any
      };
    }
  }

  // Generic GET
  public async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';
      const response = await fetch(`/api/v9${endpoint}${query}`);
      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error(`[V9 Client] GET ${endpoint} error:`, err);
      return {
        ok: false,
        error: err.message || 'GET_REQUEST_FAILED'
      };
    }
  }

  // Offline Queue Management
  public getOfflineQueue(): OfflineQueueItem[] {
    try {
      const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveOfflineQueue(items: OfflineQueueItem[]) {
    try {
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(items));
    } catch {}
  }

  private enqueueOffline(endpoint: string, body: any) {
    const queue = this.getOfflineQueue();
    const newItem: OfflineQueueItem = {
      queueId: `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      requestId: body.requestId,
      endpoint,
      body,
      retryCount: 0,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    queue.push(newItem);
    this.saveOfflineQueue(queue);
  }

  public async flushOfflineQueue(): Promise<{ syncedCount: number; remainingCount: number }> {
    const queue = this.getOfflineQueue();
    if (queue.length === 0) return { syncedCount: 0, remainingCount: 0 };

    const remaining: OfflineQueueItem[] = [];
    let synced = 0;

    for (const item of queue) {
      try {
        const res = await fetch(`/api/v9${item.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Request-Id': item.requestId },
          body: JSON.stringify(item.body)
        });
        if (res.ok) {
          synced++;
        } else {
          item.retryCount++;
          item.lastAttemptAt = new Date().toISOString();
          remaining.push(item);
        }
      } catch {
        item.retryCount++;
        item.lastAttemptAt = new Date().toISOString();
        remaining.push(item);
      }
    }

    this.saveOfflineQueue(remaining);
    return { syncedCount: synced, remainingCount: remaining.length };
  }

  // =========================================================
  // HIGH-LEVEL CONVENIENCE DATA METHODS
  // =========================================================

  // 1. Log Telemetry Event (Sheet: 07_BEHAVIOR_EVENTS)
  public async logEvent(event: Omit<V9EventPayload, 'eventId' | 'requestId' | 'timestamp' | 'schemaVersion' | 'appVersion'>): Promise<ApiResponse> {
    const fullEvent: V9EventPayload = {
      eventId: this.getEventId(),
      requestId: this.getRequestId(),
      timestamp: new Date().toISOString(),
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      ...event
    };
    return this.post('/event', { event: fullEvent });
  }

  // 2. Submit Game Result with Read-Back Verification (Sheet: 08_GAME_RESULTS)
  public async submitGameResult(result: Partial<V9GameResultRecord>): Promise<ApiResponse<V9GameResultRecord>> {
    const payload = {
      recordId: result.recordId || this.getRecordId(),
      studentId: result.studentId || 'STU_DEFAULT',
      sessionId: result.sessionId || this.getSessionId(),
      timestamp: new Date().toISOString(),
      source: 'student',
      feature: 'GAME_RUNTIME',
      action: 'GAME_RESULT_SUBMITTED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'completed',
      ...result
    };

    // Write
    const writeRes = await this.post<V9GameResultRecord>('/game/result', { result: payload });

    // Read-After-Write Verification (Section 32)
    if (writeRes.ok) {
      try {
        const readRes = await this.get<{ history: any[] }>('/student/history', { studentId: payload.studentId });
        const exists = readRes.data?.history?.some((h: any) => h.recordId === payload.recordId || h.gameId === payload.gameId);
        writeRes.readBackVerified = Boolean(exists);
      } catch {
        writeRes.readBackVerified = false;
      }
    }

    return writeRes;
  }

  // 3. Submit Intervention Result (Sheet: 11_INTERVENTION_RESULTS)
  public async submitInterventionResult(result: Partial<V9InterventionResultRecord>): Promise<ApiResponse> {
    const payload = {
      recordId: result.recordId || this.getRecordId(),
      studentId: result.studentId || 'STU_DEFAULT',
      timestamp: new Date().toISOString(),
      source: 'student',
      feature: 'INTERVENTION',
      action: 'INTERVENTION_COMPLETED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'completed',
      ...result
    };
    return this.post('/intervention/result', { result: payload });
  }

  // 4. Submit Micro Action Result (Sheet: 14_MICRO_ACTION_RESULTS)
  public async submitMicroActionResult(action: Partial<V9MicroActionRecord>): Promise<ApiResponse> {
    const payload = {
      recordId: action.recordId || this.getRecordId(),
      studentId: action.studentId || 'STU_DEFAULT',
      timestamp: new Date().toISOString(),
      source: 'student',
      feature: 'MICRO_ACTION',
      action: 'MICRO_ACTION_COMPLETED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: action.status || 'completed',
      ...action
    };
    return this.post('/micro-action/result', { result: payload });
  }

  // 5. Submit Reflection (Sheet: 12_REFLECTIONS)
  public async submitReflection(reflection: Partial<V9ReflectionRecord>): Promise<ApiResponse> {
    const payload = {
      recordId: reflection.recordId || this.getRecordId(),
      studentId: reflection.studentId || 'STU_DEFAULT',
      sessionId: reflection.sessionId || this.getSessionId(),
      timestamp: new Date().toISOString(),
      source: 'student',
      feature: 'REFLECTION',
      action: 'REFLECTION_SUBMITTED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'completed',
      ...reflection
    };
    return this.post('/reflection', { reflection: payload });
  }

  // 6. Record Transfer Measure (Sheet: 27_TRANSFER_MEASURES)
  public async submitTransferMeasure(measure: Partial<V9TransferMeasureRecord>): Promise<ApiResponse> {
    const payload = {
      recordId: measure.recordId || this.getRecordId(),
      studentId: measure.studentId || 'STU_DEFAULT',
      timestamp: new Date().toISOString(),
      source: 'system',
      feature: 'TRANSFER_ENGINE',
      action: 'TRANSFER_INDEX_CALCULATED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'completed',
      ...measure
    };
    return this.post('/transfer/record', { transfer: payload });
  }

  // 7. Submit Teacher Reference Label (Sheet: 28_TEACHER_LABELS)
  public async submitTeacherLabel(label: Partial<V9TeacherLabelRecord>): Promise<ApiResponse> {
    const payload = {
      recordId: label.recordId || this.getRecordId(),
      timestamp: new Date().toISOString(),
      source: 'teacher',
      feature: 'TEACHER_OBSERVATION',
      action: 'LABEL_RECORDED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'completed',
      ...label
    };
    return this.post('/teacher/label', { label: payload });
  }

  // 8. Upsert Student Account (Sheet: 01_USERS & 16_STUDENT_PROFILES)
  public async upsertUser(user: { userId: string; name?: string; gradeLevel?: string; avatar?: string; badge?: string; cohort?: string }): Promise<ApiResponse> {
    const payload = {
      recordId: this.getRecordId(),
      studentId: user.userId,
      userId: user.userId,
      name: user.name,
      gradeLevel: user.gradeLevel,
      avatar: user.avatar,
      badge: user.badge,
      cohort: user.cohort || 'Default Cohort',
      timestamp: new Date().toISOString(),
      source: 'student',
      feature: 'ACCOUNT_MANAGEMENT',
      action: 'USER_PROFILE_UPSERTED',
      schemaVersion: '1.0.0',
      appVersion: '0.9.0',
      status: 'active'
    };
    return this.post('/user/upsert', { user: payload });
  }

  // 9. Run Full V9 E2E Test Suite (Section 43)
  public async runE2ETests(): Promise<{ tests: V9TestStepResult[]; allPassed: boolean; totalMs: number }> {
    const start = performance.now();
    try {
      const res = await this.post<{ tests: V9TestStepResult[]; allPassed: boolean }>('/tests/run-e2e', {});
      const elapsed = Math.round(performance.now() - start);
      if (res.data) {
        return {
          tests: res.data.tests,
          allPassed: res.data.allPassed,
          totalMs: elapsed
        };
      }
      throw new Error(res.error || 'Test run failed');
    } catch (err: any) {
      return {
        tests: [
          {
            code: 'T_ERR',
            name: 'Kết Nối Trình Kiểm Thử E2E',
            category: 'Integrity',
            status: 'FAIL',
            latencyMs: 1,
            detail: `Không thể gọi endpoint kiểm thử: ${err.message}`
          }
        ],
        allPassed: false,
        totalMs: Math.round(performance.now() - start)
      };
    }
  }
}

export const V9Client = new V9ApiClient();
