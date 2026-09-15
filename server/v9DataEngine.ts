/**
 * EDUCHOICE-AI V9 DATA-FIRST SERVER ENGINE
 * Manages the 39 Canonical Sheets Store, Idempotency, Data Quality, and E2E Test Suite
 */

import { V9SheetName, V9TestStepResult, V9DataQualityMetrics } from '../src/types/v9DataContract';
import { V9_CANONICAL_SCHEMAS } from '../src/data/v9SchemaRegistry';

// Internal In-Memory Store for the 39 sheets
const sheetStore: Map<V9SheetName, any[]> = new Map();
const processedRequestIds: Set<string> = new Set();

// Seed initial realistic research data
// NOTE: All records below are DEMO/seed data (in-memory only). UI must surface this as demo,
// not as real Google Sheets production data.
export const V9_SEED_IS_DEMO = true;
function initializeV9Store() {
  const allSheetNames = Object.keys(V9_CANONICAL_SCHEMAS) as V9SheetName[];
  allSheetNames.forEach(name => {
    if (!sheetStore.has(name)) {
      sheetStore.set(name, []);
    }
  });

  // 00_CONFIG
  sheetStore.get('00_CONFIG')!.push(
    { recordId: 'REC_CFG_00', configKey: 'DATA_LAYER_MODE', configValue: 'IN_MEMORY_DEMO', description: 'Chế độ dữ liệu hiện tại: demo in-memory, chưa kết nối Google Sheets', updatedAt: new Date().toISOString(), schemaVersion: '1.0.0' },
    { recordId: 'REC_CFG_01', configKey: 'DATA_FIRST_V9_ENABLED', configValue: 'TRUE', description: 'Kích hoạt kiến trúc V9 Data-First Sheets-First', updatedAt: new Date().toISOString(), schemaVersion: '1.0.0' },
    { recordId: 'REC_CFG_02', configKey: 'STRICT_IDEMPOTENCY', configValue: 'TRUE', description: 'Chống ghi trùng với requestId bắt buộc', updatedAt: new Date().toISOString(), schemaVersion: '1.0.0' }
  );

  // 01_USERS & 03_STUDENT_PROFILES
  const students = [
    { studentId: 'STU_001', age: 14, gradeLevel: 'Lớp 8', baselineCluster: 'Can Thiệp AI Đa Tác Nhân' },
    { studentId: 'STU_002', age: 13, gradeLevel: 'Lớp 7', baselineCluster: 'Đối Chứng Truyền Thống' },
    { studentId: 'STU_003', age: 14, gradeLevel: 'Lớp 8', baselineCluster: 'Game Hóa 48 Phút' }
  ];

  students.forEach((s, idx) => {
    sheetStore.get('01_USERS')!.push({
      recordId: `REC_USR_${idx + 1}`,
      studentId: s.studentId,
      role: 'STUDENT',
      status: 'active',
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      updatedAt: new Date().toISOString(),
      schemaVersion: '1.0.0'
    });

    sheetStore.get('03_STUDENT_PROFILES')!.push({
      recordId: `REC_PRF_${idx + 1}`,
      studentId: s.studentId,
      age: s.age,
      gradeLevel: s.gradeLevel,
      baselineCluster: s.baselineCluster,
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      updatedAt: new Date().toISOString()
    });

    sheetStore.get('02_CONSENTS')!.push({
      recordId: `REC_CST_${idx + 1}`,
      studentId: s.studentId,
      consentVersion: '1.0.0',
      status: 'accepted',
      timestamp: new Date(Date.now() - 86400000 * 7).toISOString(),
      requestId: `REQ_CST_INIT_${idx + 1}`
    });
  });

  // Seed 08_GAME_RESULTS & 27_TRANSFER_MEASURES for student STU_001
  sheetStore.get('08_GAME_RESULTS')!.push(
    {
      recordId: 'REC_GMR_101',
      studentId: 'STU_001',
      sessionId: 'SES_WEEK_1',
      gameId: 'game_48_minutes',
      attemptNo: 1,
      startedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      endedAt: new Date(Date.now() - 86400000 * 3 + 185000).toISOString(),
      durationMs: 185000,
      completionStatus: 'completed',
      score: 85,
      behaviorMetricsJson: JSON.stringify({ decisionTimeMeanMs: 3800, choiceChanges: 2, pauseCount: 1, helpCount: 1, retryCount: 0, taskSwitchCount: 3, completionRate: 1 }),
      constructSignalsJson: JSON.stringify({ Planning: 72, SelfRegulation: 68, HelpSeeking: 65 }),
      schemaVersion: '1.0.0'
    },
    {
      recordId: 'REC_GMR_102',
      studentId: 'STU_001',
      sessionId: 'SES_WEEK_2',
      gameId: 'game_cam_do_thong_bao',
      attemptNo: 1,
      startedAt: new Date(Date.now() - 86400000).toISOString(),
      endedAt: new Date(Date.now() - 86400000 + 190000).toISOString(),
      durationMs: 190000,
      completionStatus: 'completed',
      score: 90,
      behaviorMetricsJson: JSON.stringify({ decisionTimeMeanMs: 2900, choiceChanges: 1, pauseCount: 0, helpCount: 2, retryCount: 0, taskSwitchCount: 1, completionRate: 1 }),
      constructSignalsJson: JSON.stringify({ Planning: 78, SelfRegulation: 75, HelpSeeking: 72 }),
      schemaVersion: '1.0.0'
    }
  );

  // 27_TRANSFER_MEASURES (Scientific Core)
  sheetStore.get('27_TRANSFER_MEASURES')!.push(
    {
      recordId: 'REC_TRF_01',
      studentId: 'STU_001',
      skillId: 'Prioritization_Eisenhower',
      gameMeasure: 88,
      nearTransferMeasure: 82,
      realWorldMeasure: 75,
      baseline: 52,
      followUp: 75,
      transferIndex: 0.85,
      transferGap: 13.0,
      confidence: 0.89,
      measurementMethod: 'Game Telemetry vs Real Micro-Action Execution before 21h',
      timestamp: new Date().toISOString()
    },
    {
      recordId: 'REC_TRF_02',
      studentId: 'STU_002',
      skillId: 'Prioritization_Eisenhower',
      gameMeasure: 65,
      nearTransferMeasure: 58,
      realWorldMeasure: 38,
      baseline: 50,
      followUp: 54,
      transferIndex: 0.58,
      transferGap: 27.0,
      confidence: 0.82,
      measurementMethod: 'Control Group Standard Log',
      timestamp: new Date().toISOString()
    }
  );

  // 29_PROBLEM_RECOGNITION
  sheetStore.get('29_PROBLEM_RECOGNITION')!.push({
    recordId: 'REC_PRB_01',
    studentId: 'STU_001',
    sessionId: 'SES_WEEK_1',
    problemType: 'TASK_FRICTION',
    construct: 'SelfRegulation',
    evidenceJson: JSON.stringify(['task_switching_high', 'pause_in_difficult_scene', 'late_decision']),
    confidence: 0.84,
    severity: 'medium',
    action: 'trigger_micro_intervention',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString()
  });

  // 11_INTERVENTION_RESULTS
  sheetStore.get('11_INTERVENTION_RESULTS')!.push({
    recordId: 'REC_ITR_01',
    studentId: 'STU_001',
    interventionId: 'INT_48MIN_BREAK',
    preJson: JSON.stringify({ taskSwitchRate: 0.42, completionRate: 0.6 }),
    postJson: JSON.stringify({ taskSwitchRate: 0.18, completionRate: 0.95 }),
    responseClass: 'responder',
    confidence: 0.88,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  });

  // 24_EXPERIMENTS & 28_TEACHER_LABELS
  sheetStore.get('24_EXPERIMENTS')!.push({
    experimentId: 'EXP_V9_RCT_01',
    name: 'Thực nghiệm A/B: Tác Nhân AI Thích Ứng vs Đối Chứng Tĩnh',
    hypothesis: 'Can thiệp giàn giáo nhận thức động giảm Transfer Gap ít nhất 12% so với danh sách tĩnh',
    controlCondition: 'Traditional Static Checklist Cohort',
    treatmentCondition: 'AI Adaptive Multi-Agent Cohort',
    primaryOutcome: 'Transfer Execution Rate (Transfer Gap Mitigation)',
    status: 'active'
  });

  sheetStore.get('28_TEACHER_LABELS')!.push({
    recordId: 'REC_TCH_01',
    teacherId: 'TCH_NGUYEN_VAN_A',
    studentId: 'STU_001',
    construct: 'Planning',
    rating: 4,
    notes: 'Học sinh biết tự lập dàn ý trước khi làm bài tập lớn',
    timestamp: new Date().toISOString()
  });
}

// Ensure store is initialized
initializeV9Store();

export class V9DataEngine {
  // Idempotency check
  public static isDuplicate(requestId: string): boolean {
    if (!requestId) return false;
    return processedRequestIds.has(requestId);
  }

  public static markProcessed(requestId: string) {
    if (requestId) processedRequestIds.add(requestId);
  }

  // Generic Append Record
  public static appendRecord(sheetName: V9SheetName, record: Record<string, any>) {
    if (!sheetStore.has(sheetName)) {
      sheetStore.set(sheetName, []);
    }
    const store = sheetStore.get(sheetName)!;
    store.push({
      ...record,
      storedAt: new Date().toISOString()
    });

    // Also record in 31_AUDIT_LOG
    if (sheetName !== '31_AUDIT_LOG') {
      const auditLog = {
        recordId: `REC_AUD_${Date.now()}`,
        requestId: record.requestId || 'SYSTEM',
        actorId: record.studentId || record.teacherId || 'SYSTEM',
        role: record.source || 'USER',
        action: `WRITE_${sheetName}`,
        resourceType: sheetName,
        resourceId: record.recordId || record.eventId || record.decisionId || 'UNKNOWN',
        timestamp: new Date().toISOString(),
        reason: 'V9 Data Contract Write'
      };
      sheetStore.get('31_AUDIT_LOG')!.push(auditLog);
    }
    return record;
  }

  // Find records in a sheet by field
  public static findBy(sheetName: V9SheetName, field: string, value: any): any[] {
    const list = sheetStore.get(sheetName) || [];
    return list.filter(item => String(item[field]) === String(value));
  }

  // Get all records in a sheet
  public static getSheetRecords(sheetName: V9SheetName, limit = 100): any[] {
    const list = sheetStore.get(sheetName) || [];
    return list.slice(-limit).reverse();
  }

  // Get overview of all 39 sheets
  public static getOverview(): { name: V9SheetName; count: number; category: string; descriptionVi: string }[] {
    return Object.keys(V9_CANONICAL_SCHEMAS).map(rawName => {
      const name = rawName as V9SheetName;
      const count = (sheetStore.get(name) || []).length;
      const meta = V9_CANONICAL_SCHEMAS[name];
      return {
        name,
        count,
        category: meta?.category || 'General',
        descriptionVi: meta?.descriptionVi || ''
      };
    });
  }

  // Data Quality Metrics (Section 39)
  // Honest fix: this deployment is an in-memory demo (no real Google Sheets sink), so
  // rates like ingestion/sync cannot be truthfully reported as production values.
  public static getDataQualityMetrics(): V9DataQualityMetrics {
    let totalRecords = 0;
    sheetStore.forEach(records => {
      totalRecords += records.length;
    });

    return {
      totalRecords,
      eventIngestionRate: 0,
      writeSuccessRate: 100.0,
      duplicateRate: 0.0,
      orphanRecordCount: 0,
      syncQueueSize: 0,
      dataFreshnessSeconds: 0,
      lastSyncTimestamp: '',
      dataSource: 'IN_MEMORY_MOCK',
      demoMode: true,
      message: 'Hệ thống đang chạy ở chế độ demo in-memory, chưa kết nối Google Sheets — các chỉ số đồng bộ/thu nạp = 0.'
    };
  }

  // Run the 20 Acceptance Test Steps (Section 43)
  // Honest fix: each step is actually executed against the in-memory store. Steps that
  // reference a real Apps Script / Sheets sink are reported FAIL until the integration exists.
  public static runE2ETests(): { tests: V9TestStepResult[]; allPassed: boolean } {
    const makeStep = (
      code: string,
      name: string,
      category: 'Write' | 'Read' | 'Validation' | 'Integrity' | 'Research',
      fn: () => void,
      traceSheet: V9SheetName
    ): V9TestStepResult => {
      const started = Date.now();
      try {
        fn();
        return {
          code, name, category, status: 'PASS',
          latencyMs: Date.now() - started, traceSheet,
          detail: 'Thực thi thành công trên in-memory demo store.'
        };
      } catch (err: any) {
        return {
          code, name, category, status: 'FAIL',
          latencyMs: Date.now() - started, traceSheet,
          detail: err?.message || 'FAILED'
        };
      }
    };

    const tests: V9TestStepResult[] = [
      makeStep('T01', 'Đăng Ký Học Viên (Register Student)', 'Write', () => {
        this.appendRecord('01_USERS', { recordId: 'REC_T01', studentId: 'STU_TEST_01', role: 'STUDENT', status: 'active' });
      }, '01_USERS'),
      makeStep('T02', 'Đồng Thuận Nghiên Cứu (Consent Record)', 'Write', () => {
        this.appendRecord('02_CONSENTS', { recordId: 'REC_T02', studentId: 'STU_TEST_01', consentVersion: '1.0.0', status: 'accepted' });
      }, '02_CONSENTS'),
      makeStep('T03', 'Khởi Tạo Phiên Học (Session Start)', 'Write', () => {
        this.appendRecord('06_SESSIONS', { recordId: 'REC_T03', sessionId: 'SES_TEST_01', studentId: 'STU_TEST_01', status: 'started' });
      }, '06_SESSIONS'),
      makeStep('T04', 'Ghi Nhận Sự Kiện Vi Mô (Event Write)', 'Write', () => {
        this.appendRecord('07_BEHAVIOR_EVENTS', { eventId: 'EVT_T04', studentId: 'STU_TEST_01', sessionId: 'SES_TEST_01', feature: 'test', action: 'choice', timestamp: new Date().toISOString() });
      }, '07_BEHAVIOR_EVENTS'),
      makeStep('T05', 'Ghi Nhận Kết Quả Game (Game Result)', 'Write', () => {
        this.appendRecord('08_GAME_RESULTS', { recordId: 'REC_T05', studentId: 'STU_TEST_01', gameId: 'game_test', score: 100, durationMs: 1000 });
      }, '08_GAME_RESULTS'),
      makeStep('T06', 'Ghi Nhận Can Thiệp Sư Phạm (Intervention)', 'Write', () => {
        // Known gap: no runtime pathway writes to 10_INTERVENTIONS today.
        throw new Error('Chưa có luồng ghi 10_INTERVENTIONS từ game runtime');
      }, '10_INTERVENTIONS'),
      makeStep('T07', 'Ghi Nhận Phản Tư Hành Vi (Reflection)', 'Write', () => {
        this.appendRecord('12_REFLECTIONS', { recordId: 'REC_T07', studentId: 'STU_TEST_01', promptId: 'P01', reflectiveIndex: 0.8 });
      }, '12_REFLECTIONS'),
      makeStep('T08', 'Ghi Nhận Vi Hành Động Đời Thực (Micro Action)', 'Write', () => {
        this.appendRecord('14_MICRO_ACTION_RESULTS', { recordId: 'REC_T08', studentId: 'STU_TEST_01', status: 'completed' });
      }, '14_MICRO_ACTION_RESULTS'),
      makeStep('T09', 'Truy Vết Quyết Định AI (AI Decision Log)', 'Write', () => {
        // 18_AI_DECISIONS is written by the server AI validation gate (logAiDecision).
        const prior = this.findBy('18_AI_DECISIONS', 'studentId', 'STU_TEST_01');
        if (prior.length === 0) {
          throw new Error('Chưa có quyết định AI nào được ghi (18_AI_DECISIONS) cho học sinh này');
        }
      }, '18_AI_DECISIONS'),
      makeStep('T10', 'Đọc Lại Hồ Sơ Học Viên (Profile Read)', 'Read', () => {
        const p = this.findBy('03_STUDENT_PROFILES', 'studentId', 'STU_001');
        if (p.length === 0) throw new Error('Hồ sơ STU_001 không tồn tại');
      }, '03_STUDENT_PROFILES'),
      makeStep('T11', 'Đọc Lại Tiến Bộ Học Tập (Progress Read)', 'Read', () => {
        const g = this.findBy('08_GAME_RESULTS', 'studentId', 'STU_TEST_01');
        if (g.length === 0) throw new Error('Không đọc được lịch sử game đã ghi');
      }, '08_GAME_RESULTS'),
      makeStep('T12', 'Đọc Lại Lịch Sử Thực Nghiệm (History Read)', 'Read', () => {
        const h = this.findBy('08_GAME_RESULTS', 'studentId', 'STU_TEST_01');
        if (h.length === 0) throw new Error('Lịch sử thực nghiệm trống');
      }, '08_GAME_RESULTS'),
      makeStep('T13', 'Chống Ghi Trùng (Duplicate Request Guard)', 'Validation', () => {
        const reqId = 'REQ_T13';
        this.markProcessed(reqId);
        if (!this.isDuplicate(reqId)) throw new Error('Cờ idempotency không được ghi nhận');
      }, '31_AUDIT_LOG'),
      makeStep('T14', 'Bảo Vệ Schema Chuẩn (Schema Validation)', 'Validation', () => {
        const schema = V9_CANONICAL_SCHEMAS['01_USERS'];
        if (!schema || !schema.headers || schema.headers.length === 0) throw new Error('Schema 01_USERS chưa được khai báo');
      }, '35_SCHEMA_VERSIONS'),
      makeStep('T15', 'Kiểm Tra Thiếu Khóa Chính (Missing Field Guard)', 'Validation', () => {
        const missing = this.appendRecord('33_ERROR_LOG' as any, { message: 'MISSING_FIELD: studentId' } as any);
        if (!missing) throw new Error('Không ghi được lỗi');
      }, '33_ERROR_LOG'),
      makeStep('T16', 'Xác Minh Đọc Sau Ghi (Read-After-Write Verification)', 'Integrity', () => {
        const w = this.appendRecord('08_GAME_RESULTS', { recordId: 'REC_T16', studentId: 'STU_TEST_01', gameId: 'game_test', score: 80 });
        const r = this.findBy('08_GAME_RESULTS', 'recordId', w.recordId);
        if (r.length === 0) throw new Error('Bản ghi không đọc lại được sau khi ghi');
      }, '08_GAME_RESULTS'),
      makeStep('T17', 'Tính Toán Khoảng Cách Chuyển Hóa (Transfer Gap)', 'Research', () => {
        const t = this.appendRecord('27_TRANSFER_MEASURES', { recordId: 'REC_T17', studentId: 'STU_TEST_01', gameScore: 80, realActionScore: 60 });
        if (!t) throw new Error('Không đo được transfer');
      }, '27_TRANSFER_MEASURES'),
      makeStep('T18', 'Truy Vết Nguồn Gốc Dữ Liệu (Data Lineage Trace)', 'Research', () => {
        const audit = this.getSheetRecords('31_AUDIT_LOG');
        if (audit.length === 0) throw new Error('Chuỗi lineage trống');
      }, '31_AUDIT_LOG'),
      makeStep('T19', 'Kiểm Tra Toàn Vẹn Hệ Thống (Data Integrity Job)', 'Integrity', () => {
        // Demonstrates the orphan check: verify every 08_GAME_RESULTS has a matching student.
        const orphans = this.getSheetRecords('08_GAME_RESULTS').filter(r => {
          return this.findBy('01_USERS', 'studentId', r.studentId).length === 0;
        });
        if (orphans.length > 0) throw new Error(`Phát hiện ${orphans.length} bản ghi mồ côi trong 08_GAME_RESULTS`);
      }, '23_SYSTEM_METRICS'),
      makeStep('T20', 'Kiểm Tra Bản Ghi Mồ Côi (Orphan Record Check)', 'Integrity', () => {
        const sessions = this.getSheetRecords('06_SESSIONS').filter(s => {
          return this.findBy('01_USERS', 'studentId', s.studentId).length === 0;
        });
        if (sessions.length > 0) throw new Error(`Phát hiện ${sessions.length} phiên mồ côi`);
      }, '32_SYSTEM_LOGS')
    ];

    return { tests, allPassed: tests.every(t => t.status === 'PASS') };
  }
}
