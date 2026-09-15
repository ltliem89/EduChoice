/**
 * EDUCHOICE-AI — SMART EDU MANAGEMENT CLOUD SPEC V10
 * Type Definitions & Contracts for Google Sheets + Apps Script + Vercel / GitHub
 */

export type V10Role =
  | 'STUDENT'
  | 'TEACHER'
  | 'CLASS_TEACHER'
  | 'CONTENT_ADMIN'
  | 'RESEARCHER'
  | 'RESEARCH_ADMIN'
  | 'SCHOOL_ADMIN'
  | 'SUPER_ADMIN';

export type FieldType = 'text' | 'number' | 'boolean' | 'date' | 'json';

export interface FieldBinding {
  fieldId: string;
  table: string;
  column: string;
  type: FieldType;
  required: boolean;
  writableRoles: V10Role[];
  readableRoles: V10Role[];
  description?: string;
}

export interface DataDictionaryItem {
  tableName: string;
  fieldName: string;
  type: FieldType | 'string';
  required: boolean;
  writable: 'YES' | 'NO' | 'RESTRICTED';
  readable: 'YES' | 'RESTRICTED';
  role: string;
  description: string;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  requestId: string;
  data?: T;
  duplicate?: boolean;
  recordId?: string;
  serverTimestamp?: string;
  version?: number;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    version: string;
    timestamp: string;
    gateway?: 'APPS_SCRIPT' | 'VERCEL_EDGE' | 'LOCAL_BRIDGE';
  };
}

export interface V10SessionContext {
  userId: string;
  sessionId: string;
  role: V10Role;
  schoolId: string;
  classId?: string;
  name?: string;
  permissions?: string[];
}

export interface V10SystemConfig {
  schoolName: string;
  academicYear: string;
  defaultGameDuration: number;
  maxDailySessions: number;
  featureFlags: {
    enableV10Gateway: boolean;
    enableOfflineSync: boolean;
    enableAiAdaptiveEngine: boolean;
    enableDirectAppsScript: boolean;
    enableReadAfterWriteCheck: boolean;
  };
  maintenanceMode: boolean;
  aiEnabled: boolean;
  researchMode: boolean;
  demoMode: boolean;
  schemaVersion: string;
  updatedAt: string;
  updatedBy: string;
}

export interface V10AuditEntry {
  auditId: string;
  requestId: string;
  actorId: string;
  role: V10Role;
  action: string;
  table: string;
  recordId: string;
  beforeHash?: string;
  afterHash?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  timestamp: string;
  reason?: string;
}

export interface V10SyncLogItem {
  queueId: string;
  requestId: string;
  route: string;
  status: 'queued' | 'sending' | 'accepted' | 'failed' | 'retry' | 'dead-letter';
  clientCreatedAt: string;
  serverReceivedAt?: string;
  retryCount: number;
  errorCode?: string;
  payload?: any;
}

export interface V10HealthStatus {
  ok: boolean;
  appsScript: 'healthy' | 'degraded' | 'offline';
  spreadsheet: 'healthy' | 'degraded' | 'offline';
  schemaVersion: string;
  lastWrite: string;
  lastRead: string;
  errorRate: number;
  gatewayType: 'DIRECT_APPS_SCRIPT' | 'LOCAL_BRIDGE';
  appsScriptUrl?: string;
  tablesCount: number;
  recordsCount: number;
  demoMode?: boolean;
  dataLayer?: string;
}

export interface FeatureRegistryItem {
  featureId: string;
  featureName: string;
  frontendPath: string;
  apiRoute: string;
  writeTables: string[];
  readTables: string[];
  roles: V10Role[];
  eventTypes: string[];
  metrics: string[];
  status: 'READY' | 'BETA' | 'IN_DEVELOPMENT';
  version: string;
}
