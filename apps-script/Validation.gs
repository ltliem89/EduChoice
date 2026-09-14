/**
 * EDUCHOICE-AI V10 — VALIDATION ENGINE (Validation.gs)
 * Validates payload structures and ensures non-empty required fields
 */

function validatePayload_(schemaId, payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("INVALID_PAYLOAD: Body must be a JSON object");
  }

  if (schemaId === "goal/create") {
    if (!payload.fields && !payload.goalTitle && !payload.title) {
      throw new Error("VALIDATION_FAILED: Goal title is required");
    }
  }

  if (schemaId === "student/profile") {
    if (!payload.fields && !payload.name && !payload.fullName) {
      throw new Error("VALIDATION_FAILED: Student full name is required");
    }
  }

  return true;
}
