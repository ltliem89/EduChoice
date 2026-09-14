/**
 * EDUCHOICE-AI — SMART EDU MANAGEMENT CLOUD SPEC V10
 * Data Dictionary, Field Bindings Registry, and System Configuration
 */

import {
  FieldBinding,
  DataDictionaryItem,
  V10SystemConfig,
  FeatureRegistryItem
} from '../types/v10DataContract';

/**
 * Section 4 & 5: Field Bindings Map (FIELD_MAP)
 * Controls which field routes to which table/column, with strict RBAC writable and readable roles.
 */
export const V10_FIELD_BINDINGS: Record<string, FieldBinding> = {
  // Student Profile fields
  'student.fullName': {
    fieldId: 'student.fullName',
    table: '03_STUDENT_PROFILES',
    column: 'fullName',
    type: 'text',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCHER', 'SUPER_ADMIN'],
    description: 'Họ và tên học sinh (hiển thị trên giao diện và báo cáo)'
  },
  'student.grade': {
    fieldId: 'student.grade',
    table: '03_STUDENT_PROFILES',
    column: 'gradeLevel',
    type: 'text',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCHER', 'SUPER_ADMIN'],
    description: 'Khối lớp học tập của học sinh'
  },
  'student.cohort': {
    fieldId: 'student.cohort',
    table: '03_STUDENT_PROFILES',
    column: 'cohort',
    type: 'text',
    required: false,
    writableRoles: ['TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCH_ADMIN', 'SUPER_ADMIN'],
    readableRoles: ['TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCHER', 'SUPER_ADMIN'],
    description: 'Nhóm nghiên cứu / Lớp thực nghiệm'
  },
  'student.avatar': {
    fieldId: 'student.avatar',
    table: '03_STUDENT_PROFILES',
    column: 'avatar',
    type: 'text',
    required: false,
    writableRoles: ['STUDENT', 'TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Biểu tượng đại diện học sinh'
  },
  'student.badge': {
    fieldId: 'student.badge',
    table: '03_STUDENT_PROFILES',
    column: 'badge',
    type: 'text',
    required: false,
    writableRoles: ['STUDENT', 'TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Danh hiệu phong cách học sinh'
  },

  // Goal fields (Section 5, 18, 73)
  'goal.title': {
    fieldId: 'goal.title',
    table: '04_GOALS',
    column: 'goalTitle',
    type: 'text',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCHER', 'SUPER_ADMIN'],
    description: 'Tiêu đề mục tiêu rèn luyện (VD: Tự chủ thời gian, Giảm trì hoãn)'
  },
  'goal.category': {
    fieldId: 'goal.category',
    table: '04_GOALS',
    column: 'category',
    type: 'text',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Phân loại mục tiêu'
  },
  'goal.target': {
    fieldId: 'goal.target',
    table: '04_GOALS',
    column: 'target',
    type: 'number',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Chỉ tiêu cần đạt'
  },
  'goal.status': {
    fieldId: 'goal.status',
    table: '04_GOALS',
    column: 'status',
    type: 'text',
    required: true,
    writableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Trạng thái mục tiêu (active, completed, paused)'
  },

  // Teacher Observation Labels (Section 55)
  'teacher.observationRating': {
    fieldId: 'teacher.observationRating',
    table: '28_TEACHER_LABELS',
    column: 'rating',
    type: 'number',
    required: true,
    writableRoles: ['TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['TEACHER', 'CLASS_TEACHER', 'RESEARCHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Đánh giá quan sát năng lực học sinh (1 - 5 sao)'
  },
  'teacher.notes': {
    fieldId: 'teacher.notes',
    table: '28_TEACHER_LABELS',
    column: 'notes',
    type: 'text',
    required: false,
    writableRoles: ['TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    readableRoles: ['TEACHER', 'CLASS_TEACHER', 'RESEARCHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    description: 'Ghi chú sư phạm & bối cảnh hành vi học sinh'
  },

  // Game Results (Section 4)
  'game.score': {
    fieldId: 'game.score',
    table: '08_GAME_RESULTS',
    column: 'score',
    type: 'number',
    required: false,
    writableRoles: ['SUPER_ADMIN'], // system-generated
    readableRoles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'RESEARCHER', 'SUPER_ADMIN'],
    description: 'Điểm số hoàn thành kịch bản'
  }
};

/**
 * Section 4: Data Dictionary Registry (34_DATA_DICTIONARY)
 */
export const V10_DATA_DICTIONARY: DataDictionaryItem[] = [
  {
    tableName: '00_CONFIG',
    fieldName: 'configKey',
    type: 'string',
    required: true,
    writable: 'RESTRICTED',
    readable: 'YES',
    role: 'SUPER_ADMIN',
    description: 'Khóa cấu hình hệ thống vận hành'
  },
  {
    tableName: '01_USERS',
    fieldName: 'studentId',
    type: 'string',
    required: true,
    writable: 'NO',
    readable: 'YES',
    role: 'TEACHER',
    description: 'Mã định danh học sinh chuẩn No-PII'
  },
  {
    tableName: '01_USERS',
    fieldName: 'role',
    type: 'string',
    required: true,
    writable: 'RESTRICTED',
    readable: 'YES',
    role: 'SUPER_ADMIN',
    description: 'Vai trò người dùng trong hệ thống RBAC'
  },
  {
    tableName: '03_STUDENT_PROFILES',
    fieldName: 'fullName',
    type: 'string',
    required: true,
    writable: 'YES',
    readable: 'RESTRICTED',
    role: 'TEACHER',
    description: 'Họ và tên học sinh'
  },
  {
    tableName: '03_STUDENT_PROFILES',
    fieldName: 'gradeLevel',
    type: 'string',
    required: true,
    writable: 'YES',
    readable: 'YES',
    role: 'TEACHER',
    description: 'Khối lớp học sinh'
  },
  {
    tableName: '04_GOALS',
    fieldName: 'goalTitle',
    type: 'string',
    required: true,
    writable: 'YES',
    readable: 'YES',
    role: 'STUDENT',
    description: 'Tiêu đề mục tiêu tự rèn luyện'
  },
  {
    tableName: '04_GOALS',
    fieldName: 'status',
    type: 'string',
    required: true,
    writable: 'YES',
    readable: 'YES',
    role: 'STUDENT',
    description: 'Trạng thái thực thi mục tiêu'
  },
  {
    tableName: '07_BEHAVIOR_EVENTS',
    fieldName: 'action',
    type: 'string',
    required: true,
    writable: 'NO',
    readable: 'YES',
    role: 'RESEARCHER',
    description: 'Loại hành vi tương tác trong game'
  },
  {
    tableName: '08_GAME_RESULTS',
    fieldName: 'score',
    type: 'number',
    required: false,
    writable: 'NO',
    readable: 'YES',
    role: 'TEACHER',
    description: 'Kết quả rèn luyện kịch bản'
  },
  {
    tableName: '28_TEACHER_LABELS',
    fieldName: 'rating',
    type: 'number',
    required: true,
    writable: 'YES',
    readable: 'YES',
    role: 'TEACHER',
    description: 'Đánh giá quan sát năng lực từ giáo viên'
  },
  {
    tableName: '36_SYSTEM_CONFIG',
    fieldName: 'aiEnabled',
    type: 'boolean',
    required: true,
    writable: 'RESTRICTED',
    readable: 'YES',
    role: 'SCHOOL_ADMIN',
    description: 'Bật/tắt động cơ AI thích ứng từ xa'
  },
  {
    tableName: '36_SYNC_LOG',
    fieldName: 'status',
    type: 'string',
    required: true,
    writable: 'NO',
    readable: 'YES',
    role: 'SUPER_ADMIN',
    description: 'Trạng thái đồng bộ hàng đợi ngoại tuyến'
  }
];

/**
 * Section 22: Smart System Config Defaults (36_SYSTEM_CONFIG)
 */
export const V10_DEFAULT_SYSTEM_CONFIG: V10SystemConfig = {
  schoolName: 'Trường THCS Thực Nghiệm EduChoice',
  academicYear: '2026 - 2027',
  defaultGameDuration: 3,
  maxDailySessions: 5,
  featureFlags: {
    enableV10Gateway: true,
    enableOfflineSync: true,
    enableAiAdaptiveEngine: true,
    enableDirectAppsScript: false,
    enableReadAfterWriteCheck: true
  },
  maintenanceMode: false,
  aiEnabled: true,
  researchMode: true,
  demoMode: true,
  schemaVersion: '10.0.0',
  updatedAt: new Date().toISOString(),
  updatedBy: 'SUPER_ADMIN'
};

/**
 * Section 54: Feature Registry Matrix
 */
export const V10_FEATURE_REGISTRY: FeatureRegistryItem[] = [
  {
    featureId: 'GOAL_CREATE',
    featureName: 'Khởi tạo & Quản lý Mục tiêu Học sinh',
    frontendPath: '/student?tab=goals',
    apiRoute: '/api/v10/goal/create',
    writeTables: ['04_GOALS', '31_AUDIT_LOG'],
    readTables: ['04_GOALS'],
    roles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SUPER_ADMIN'],
    eventTypes: ['GOAL_CREATED', 'GOAL_UPDATED'],
    metrics: ['GoalCompletionRate', 'GoalActiveCount'],
    status: 'READY',
    version: '1.0'
  },
  {
    featureId: 'STUDENT_PROFILE_UPDATE',
    featureName: 'Cập nhật Hồ sơ & Tên Học sinh',
    frontendPath: '/student?tab=profile',
    apiRoute: '/api/v10/student/profile',
    writeTables: ['03_STUDENT_PROFILES', '01_USERS', '31_AUDIT_LOG'],
    readTables: ['03_STUDENT_PROFILES', '01_USERS'],
    roles: ['STUDENT', 'TEACHER', 'CLASS_TEACHER', 'SCHOOL_ADMIN', 'SUPER_ADMIN'],
    eventTypes: ['PROFILE_UPDATED'],
    metrics: ['ActiveStudentsCount'],
    status: 'READY',
    version: '1.0'
  },
  {
    featureId: 'TEACHER_OBSERVATION',
    featureName: 'Ghi chép Quan sát Sư phạm',
    frontendPath: '/admin?tab=research',
    apiRoute: '/api/v10/teacher/label',
    writeTables: ['28_TEACHER_LABELS', '31_AUDIT_LOG'],
    readTables: ['28_TEACHER_LABELS'],
    roles: ['TEACHER', 'CLASS_TEACHER', 'RESEARCHER', 'SUPER_ADMIN'],
    eventTypes: ['TEACHER_LABEL_ADDED'],
    metrics: ['TeacherLabelCount', 'ConstructAgreementScore'],
    status: 'READY',
    version: '1.0'
  },
  {
    featureId: 'SYSTEM_CONFIG_REMOTE',
    featureName: 'Điều khiển Cấu hình Từ xa (Không cần Re-deploy)',
    frontendPath: '/admin?tab=v10cloud',
    apiRoute: '/api/v10/config/system',
    writeTables: ['36_SYSTEM_CONFIG', '31_AUDIT_LOG'],
    readTables: ['36_SYSTEM_CONFIG', '00_CONFIG'],
    roles: ['SCHOOL_ADMIN', 'SUPER_ADMIN'],
    eventTypes: ['CONFIG_CHANGED'],
    metrics: ['SystemConfigVersion'],
    status: 'READY',
    version: '1.0'
  }
];

/**
 * Section 21: Smart Form Schemas (35_FORM_SCHEMAS)
 */
export const V10_FORM_SCHEMAS = {
  student_profile: {
    formId: 'student_profile',
    version: '1.0',
    title: 'Hồ Sơ Học Sinh',
    fields: [
      {
        fieldId: 'student.fullName',
        label: 'Họ và tên học sinh',
        type: 'text',
        required: true,
        placeholder: 'Nguyễn Minh Đức'
      },
      {
        fieldId: 'student.grade',
        label: 'Khối lớp',
        type: 'select',
        required: true,
        options: ['Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12']
      },
      {
        fieldId: 'student.cohort',
        label: 'Nhóm nghiên cứu / Lớp',
        type: 'text',
        required: false,
        placeholder: 'Lớp 8A1 (Nhóm Thực Nghiệm)'
      }
    ]
  },
  goal_create: {
    formId: 'goal_create',
    version: '1.0',
    title: 'Mục Tiêu Rèn Luyện',
    fields: [
      {
        fieldId: 'goal.title',
        label: 'Tiêu đề mục tiêu',
        type: 'text',
        required: true,
        placeholder: 'Hoàn thành bài tập trước 21h...'
      },
      {
        fieldId: 'goal.category',
        label: 'Lĩnh vực năng lực',
        type: 'select',
        required: true,
        options: ['Thời Gian', 'Tập Trung', 'Cảm Xúc', 'Giải Quyết Vấn Đề']
      },
      {
        fieldId: 'goal.target',
        label: 'Số phiên / lần cần đạt',
        type: 'number',
        required: true,
        defaultValue: 5
      }
    ]
  }
};
