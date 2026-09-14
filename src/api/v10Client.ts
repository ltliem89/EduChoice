/**
 * EDUCHOICE-AI V10 — MASTER CLIENT API & GATEWAY CLIENT
 * Section 70, 71, 72, 73: Standardized API client with Apps Script & Local Bridge fallback
 */

import { ApiResponse, V10Role, V10SystemConfig, V10HealthStatus } from '../types/v10DataContract';
import { V10OfflineQueue } from '../services/v10OfflineQueue';

const APPS_SCRIPT_URL_KEY = 'educhoice_v10_apps_script_url';
const GATEWAY_MODE_KEY = 'educhoice_v10_gateway_mode'; // 'bridge' | 'direct_apps_script'

export class V10Client {
  public static getAppsScriptUrl(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(APPS_SCRIPT_URL_KEY);
      if (stored) return stored;
    }
    return (import.meta as any).env?.VITE_API_BASE_URL || '';
  }

  public static setAppsScriptUrl(url: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(APPS_SCRIPT_URL_KEY, url.trim());
    }
  }

  public static getGatewayMode(): 'bridge' | 'direct_apps_script' {
    if (typeof window !== 'undefined') {
      const mode = localStorage.getItem(GATEWAY_MODE_KEY);
      if (mode === 'direct_apps_script') return 'direct_apps_script';
    }
    return 'bridge';
  }

  public static setGatewayMode(mode: 'bridge' | 'direct_apps_script'): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GATEWAY_MODE_KEY, mode);
    }
  }

  /**
   * Section 70: Unified API Client
   */
  public static async request<T = any>(
    route: string,
    options?: {
      method?: 'GET' | 'POST';
      body?: any;
      role?: V10Role;
      userId?: string;
      params?: Record<string, string>;
    }
  ): Promise<ApiResponse<T>> {
    const method = options?.method || (options?.body ? 'POST' : 'GET');
    const requestId = `REQ_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    const role = options?.role || 'STUDENT';
    const userId = options?.userId || 'STU_CURRENT';
    const cleanRoute = route.replace(/^\/+/, '');

    const gatewayMode = this.getGatewayMode();
    const directUrl = this.getAppsScriptUrl();

    // 1. Direct Apps Script execution if configured and selected
    if (gatewayMode === 'direct_apps_script' && directUrl) {
      try {
        const queryParams = new URLSearchParams({
          route: cleanRoute,
          requestId,
          role,
          userId,
          ...(options?.params || {})
        });

        const fetchUrl = `${directUrl}?${queryParams.toString()}`;
        const fetchOptions: RequestInit = {
          method: method,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' } // Apps Script CORS friendly
        };

        if (method === 'POST' && options?.body) {
          fetchOptions.body = JSON.stringify({
            requestId,
            role,
            userId,
            ...options.body
          });
        }

        const res = await fetch(fetchUrl, fetchOptions);
        const data = await res.json();
        return {
          ...data,
          meta: {
            ...data.meta,
            gateway: 'APPS_SCRIPT'
          }
        };
      } catch (err: any) {
        console.warn('[V10Client] Direct Apps Script request failed, falling back to Local Bridge:', err);
      }
    }

    // 2. Serverless Node Bridge / API Gateway (Default)
    try {
      const queryParams = new URLSearchParams(options?.params || {});
      const url = `/api/v10/${cleanRoute}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      const payload = method === 'POST' ? {
        requestId,
        role,
        userId,
        ...options?.body
      } : undefined;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      return {
        ...data,
        meta: {
          ...data.meta,
          gateway: 'LOCAL_BRIDGE'
        }
      };
    } catch (err: any) {
      // Offline fallback: Queue mutation if offline and POST
      if (method === 'POST' && !navigator.onLine) {
        V10OfflineQueue.enqueue(cleanRoute, options?.body || {});
        return {
          ok: true,
          requestId,
          recordId: `QUEUED_${requestId}`,
          data: options?.body as any,
          meta: {
            version: '10.0.0',
            timestamp: new Date().toISOString(),
            gateway: 'LOCAL_BRIDGE'
          }
        };
      }

      return {
        ok: false,
        requestId,
        error: {
          code: 'CLIENT_NETWORK_ERROR',
          message: err.message || 'Không thể kết nối đến Gateway'
        }
      };
    }
  }

  /**
   * Section 19: Generic Field Write (FIELD_MAP)
   */
  public static async writeFields(
    recordId: string,
    fields: Record<string, any>,
    role: V10Role = 'TEACHER',
    reason?: string
  ): Promise<ApiResponse> {
    return this.request('field/write', {
      method: 'POST',
      role,
      body: { recordId, fields, reason }
    });
  }

  /**
   * Section 20: Generic Field Read
   */
  public static async readFields(
    recordId: string,
    fieldIds: string[],
    role: V10Role = 'TEACHER'
  ): Promise<ApiResponse> {
    return this.request('field/read', {
      method: 'GET',
      role,
      params: { recordId, fields: fieldIds.join(',') }
    });
  }

  /**
   * Section 71 & 73: Goal creation & vertical slice demo
   */
  public static async saveGoal(goalData: {
    studentId: string;
    goalTitle: string;
    category?: string;
    target?: number;
    role?: V10Role;
  }): Promise<ApiResponse> {
    return this.request('goal/create', {
      method: 'POST',
      role: goalData.role || 'TEACHER',
      body: {
        studentId: goalData.studentId,
        goalTitle: goalData.goalTitle,
        category: goalData.category || 'Tự chủ',
        target: goalData.target || 5,
        fields: {
          'goal.title': goalData.goalTitle
        }
      }
    });
  }

  /**
   * Section 72: Read goals for a student
   */
  public static async loadGoals(studentId: string): Promise<ApiResponse> {
    return this.request('student/goals', {
      method: 'GET',
      params: { studentId }
    });
  }

  /**
   * Section 39: System Health
   */
  public static async getHealth(): Promise<ApiResponse<V10HealthStatus>> {
    return this.request<V10HealthStatus>('health', { method: 'GET' });
  }

  /**
   * Section 22: Remote System Config (36_SYSTEM_CONFIG)
   */
  public static async getSystemConfig(): Promise<ApiResponse<V10SystemConfig>> {
    return this.request<V10SystemConfig>('config/public', { method: 'GET' });
  }

  public static async updateSystemConfig(config: Partial<V10SystemConfig>): Promise<ApiResponse> {
    return this.request('config/system', {
      method: 'POST',
      role: 'SUPER_ADMIN',
      body: { config }
    });
  }

  /**
   * Section 33: Read-After-Write Verification helper
   */
  public static async verifyReadAfterWrite<T>(
    writeFn: () => Promise<ApiResponse<T>>,
    readFn: (recordId: string) => Promise<ApiResponse<T>>,
    validator: (written: ApiResponse<T>, readBack: ApiResponse<T>) => boolean
  ): Promise<{ success: boolean; written: ApiResponse<T>; readBack?: ApiResponse<T>; error?: string }> {
    const written = await writeFn();
    if (!written.ok || !written.recordId) {
      return { success: false, written, error: 'Write operation did not succeed.' };
    }

    // Small delay to simulate remote sheet synchronization
    await new Promise((resolve) => setTimeout(resolve, 300));

    const readBack = await readFn(written.recordId);
    const isValid = validator(written, readBack);

    return {
      success: isValid,
      written,
      readBack,
      error: isValid ? undefined : 'DATA_SYNC_ERROR: Read-after-write value mismatch'
    };
  }
}
