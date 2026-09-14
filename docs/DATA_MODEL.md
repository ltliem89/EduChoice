# EDUCHOICE-AI V10 — DATA MODEL & FIELD BINDING SPECIFICATION

## 1. Overview
EduChoice-AI V10 operates as a **stateless frontend (Vercel / GitHub)** communicating via a **serverless data gateway (Google Apps Script / Node API Bridge)** with **Google Sheets** serving as the operational and research database.

## 2. Field-First & Form-First Architecture
The frontend never accesses Google Sheets column positions or range coordinates directly (`Sheet1!A:A`). Instead, all interactions are abstracted through **Field Bindings**:
```
FIELD → TABLE → API → UI
```
Example:
- `student.fullName` maps to `03_STUDENT_PROFILES.fullName`
- `goal.title` maps to `04_GOALS.goalTitle`
- `teacher.observationRating` maps to `28_TEACHER_LABELS.rating`

## 3. Schema Registry & Tables
1. `00_CONFIG`: System operational configurations.
2. `01_USERS`: User identity and RBAC role (No passwords stored!).
3. `02_CONSENTS`: Research ethics and parental consent records.
4. `03_STUDENT_PROFILES`: Student demographic, avatar, grade, cohort.
5. `04_GOALS`: Student growth goals with targets and progress.
6. `07_BEHAVIOR_EVENTS`: High-frequency game telemetry events.
7. `08_GAME_RESULTS`: Session outcomes and construct measurements.
8. `28_TEACHER_LABELS`: Qualitative pedagogical teacher observations.
9. `31_AUDIT_LOG`: Immutable audit trail for every mutation.
10. `34_DATA_DICTIONARY`: Central registry defining types, required fields, and RBAC rules.
11. `36_SYSTEM_CONFIG`: Runtime configuration without redeployment.
12. `36_SYNC_LOG`: Offline synchronization queue and conflict resolution.
