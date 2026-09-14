/**
 * EDUCHOICE-AI V10 — FIELD MAP ENGINE (FieldMap.gs)
 * Section 18, 19, 20: Generic Field-Level Read and Write Engine
 */

const FIELD_MAP = {
  "student.fullName": {
    sheet: "03_STUDENT_PROFILES",
    column: "fullName",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "RESEARCHER", "SUPER_ADMIN"]
  },
  "student.grade": {
    sheet: "03_STUDENT_PROFILES",
    column: "gradeLevel",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "RESEARCHER", "SUPER_ADMIN"]
  },
  "student.cohort": {
    sheet: "03_STUDENT_PROFILES",
    column: "cohort",
    writableRoles: ["TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "RESEARCH_ADMIN", "SUPER_ADMIN"],
    readableRoles: ["TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "RESEARCHER", "SUPER_ADMIN"]
  },
  "goal.title": {
    sheet: "04_GOALS",
    column: "goalTitle",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "RESEARCHER", "SUPER_ADMIN"]
  },
  "goal.category": {
    sheet: "04_GOALS",
    column: "category",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"]
  },
  "goal.target": {
    sheet: "04_GOALS",
    column: "target",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"]
  },
  "goal.status": {
    sheet: "04_GOALS",
    column: "status",
    writableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "CLASS_TEACHER", "SCHOOL_ADMIN", "SUPER_ADMIN"]
  },
  "teacher.observationRating": {
    sheet: "28_TEACHER_LABELS",
    column: "rating",
    writableRoles: ["TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["TEACHER", "CLASS_TEACHER", "RESEARCHER", "SCHOOL_ADMIN", "SUPER_ADMIN"]
  },
  "teacher.notes": {
    sheet: "28_TEACHER_LABELS",
    column: "notes",
    writableRoles: ["TEACHER", "CLASS_TEACHER", "SUPER_ADMIN"],
    readableRoles: ["TEACHER", "CLASS_TEACHER", "RESEARCHER", "SCHOOL_ADMIN", "SUPER_ADMIN"]
  }
};

function updateFields_(context, payload) {
  const fields = payload.fields || {};
  const recordId = payload.recordId || "REC_" + Utilities.getUuid();
  const results = {};

  Object.keys(fields).forEach(fieldId => {
    const binding = FIELD_MAP[fieldId];
    if (!binding) {
      throw new Error("UNKNOWN_FIELD: " + fieldId);
    }

    assertWritable_(context.role, binding.writableRoles);

    const repo = new SheetRepository(binding.sheet);
    const existing = repo.findBy("recordId", recordId);
    const beforeVal = existing.length > 0 ? existing[0][binding.column] : null;

    repo.updateByKey(recordId, binding.column, fields[fieldId]);
    results[fieldId] = fields[fieldId];

    // Audit every mutation (Section 55)
    logAudit_(context, {
      action: "UPDATE_FIELD",
      table: binding.sheet,
      recordId: recordId,
      before: { [binding.column]: beforeVal },
      after: { [binding.column]: fields[fieldId] },
      reason: payload.reason || "Generic Field Update"
    });
  });

  return {
    recordId: recordId,
    updatedFields: results,
    serverTimestamp: new Date().toISOString()
  };
}

function readFields_(context, recordId, fieldIds) {
  return fieldIds.reduce((result, fieldId) => {
    const binding = FIELD_MAP[fieldId];
    if (!binding) {
      throw new Error("UNKNOWN_FIELD: " + fieldId);
    }

    assertReadable_(context.role, binding.readableRoles);

    const repo = new SheetRepository(binding.sheet);
    const records = repo.findBy("recordId", recordId);
    result[fieldId] = records.length > 0 ? records[0][binding.column] : null;

    return result;
  }, {});
}
