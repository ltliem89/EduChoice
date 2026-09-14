# EDUCHOICE-AI V10 — FEATURE DATA CONTRACTS

## Vertical Slice (Section 73)
1. **Teacher Action**: Enters or adjusts student goal (`goal.title`, `goal.target`, `goal.category`).
   - Endpoint: `POST /api/v10/goal/create` (or `POST /api/v10/field/write`)
   - Target Sheet: `04_GOALS`
   - Audit Entry: `31_AUDIT_LOG` with action `CREATE_GOAL`
2. **Read-Back Verification**:
   - Backend performs read-after-write verification on `04_GOALS`.
3. **Student Perception**:
   - Student signs in / selects profile.
   - Endpoint: `GET /api/v10/student/goals?studentId=...`
   - UI displays assigned target immediately.

## Field-Mapping Integrity (Section 18 & 19)
- Any form input is linked to a unique `fieldId`.
- No raw cell addresses (`A1`, `C5`) in client code.
- Field write asserts role write permission from `FIELD_MAP`.
- Audit logs capture `actorId`, `before`, and `after` values.
