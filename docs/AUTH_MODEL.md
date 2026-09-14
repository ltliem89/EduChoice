# EDUCHOICE-AI V10 — AUTHENTICATION & RBAC MODEL

## 1. No Password in Sheets Principle
Google Sheets is **NEVER** used to store passwords, password hashes, or API secrets.

## 2. Two-Layer Security Architecture
- **Layer A (Identity Provider / Session Context)**: Google Sign-In or verified session context generating `sessionId` and `requestId`.
- **Layer B (EduChoice Authorization & RBAC)**: Google Sheets (`01_USERS`, `02_USER_ROLES`) verifies the role, school tenant, and assigned permissions.

## 3. Role Hierarchy & Permitted Operations
1. `STUDENT`: Read own profile, create own events, goals, reflections, read own progress.
2. `TEACHER`: Read class aggregates, view permitted student info, record teacher labels, assign interventions.
3. `CLASS_TEACHER`: Teacher permissions scoped to assigned homeroom class.
4. `CONTENT_ADMIN`: Draft, review, and test game scripts and psychology toolkits.
5. `RESEARCHER`: Access pseudonymous research datasets, measurement metrics, and transfer engine.
6. `RESEARCH_ADMIN`: Manage experiment hypotheses, condition assignments, and measurement protocols.
7. `SCHOOL_ADMIN`: School-wide configuration, class creation, and consent management.
8. `SUPER_ADMIN`: Full system permissions, system config updates, schema registry modifications.

## 4. Multi-Tenant Boundary
Every query enforces tenant isolation via `schoolId` and `classId`. Tenant boundaries are validated server-side and never trusted from raw client input.
