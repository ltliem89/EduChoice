/**
 * EDUCHOICE-AI V10 — OFFLINE-FIRST SYNC QUEUE SERVICE
 * Section 29 & 30: Local event queuing, auto-retry on reconnection, and 36_SYNC_LOG
 */

import { V10SyncLogItem } from '../types/v10DataContract';

const STORAGE_KEY = 'educhoice_v10_offline_queue';
const SYNC_LOG_KEY = 'educhoice_v10_sync_logs';
const MAX_RETRIES = 3;

class V10OfflineQueueService {
  private queue: V10SyncLogItem[] = [];
  private isFlushing = false;

  constructor() {
    this.loadQueue();
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        console.log('[V10 OfflineQueue] Network online. Flushing queue...');
        this.flush();
      });
    }
  }

  private loadQueue(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.queue = JSON.parse(saved);
      }
    } catch {
      this.queue = [];
    }
  }

  private saveQueue(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.queue));
    } catch {}
  }

  public enqueue(route: string, payload: any): V10SyncLogItem {
    const item: V10SyncLogItem = {
      queueId: `QUE_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      requestId: payload.requestId || `REQ_${Date.now().toString(36)}`,
      route,
      status: 'queued',
      clientCreatedAt: new Date().toISOString(),
      retryCount: 0,
      payload
    };

    this.queue.push(item);
    this.saveQueue();
    this.appendSyncLog(item);

    // Attempt immediate flush if online
    if (navigator.onLine) {
      setTimeout(() => this.flush(), 100);
    }

    return item;
  }

  public async flush(): Promise<{ processed: number; succeeded: number; failed: number }> {
    if (this.isFlushing || this.queue.length === 0) {
      return { processed: 0, succeeded: 0, failed: 0 };
    }

    this.isFlushing = true;
    let succeeded = 0;
    let failed = 0;

    const pending = [...this.queue];
    const remaining: V10SyncLogItem[] = [];

    for (const item of pending) {
      if (item.status === 'dead-letter') {
        remaining.push(item);
        continue;
      }

      item.status = 'sending';
      this.saveQueue();

      try {
        const response = await fetch(`/api/v10/${item.route}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.payload)
        });

        if (response.ok) {
          item.status = 'accepted';
          item.serverReceivedAt = new Date().toISOString();
          succeeded++;
          this.appendSyncLog(item);
        } else {
          item.retryCount += 1;
          if (item.retryCount >= MAX_RETRIES) {
            item.status = 'dead-letter';
            item.errorCode = `HTTP_${response.status}`;
            failed++;
          } else {
            item.status = 'retry';
            remaining.push(item);
          }
          this.appendSyncLog(item);
        }
      } catch (err: any) {
        item.retryCount += 1;
        if (item.retryCount >= MAX_RETRIES) {
          item.status = 'dead-letter';
          item.errorCode = err.message || 'NETWORK_ERROR';
          failed++;
        } else {
          item.status = 'retry';
          remaining.push(item);
        }
        this.appendSyncLog(item);
      }
    }

    this.queue = remaining;
    this.saveQueue();
    this.isFlushing = false;

    return { processed: pending.length, succeeded, failed };
  }

  public getQueue(): V10SyncLogItem[] {
    return [...this.queue];
  }

  public getSyncLogs(): V10SyncLogItem[] {
    try {
      const saved = localStorage.getItem(SYNC_LOG_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  private appendSyncLog(item: V10SyncLogItem): void {
    try {
      const current = this.getSyncLogs();
      const updated = [item, ...current.slice(0, 99)];
      localStorage.setItem(SYNC_LOG_KEY, JSON.stringify(updated));
    } catch {}
  }

  public clearQueue(): void {
    this.queue = [];
    this.saveQueue();
  }
}

export const V10OfflineQueue = new V10OfflineQueueService();
