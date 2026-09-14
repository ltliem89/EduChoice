# EDUCHOICE-AI V10 — API CONTRACT SPECIFICATION

## 1. Unified Response Envelope
All API endpoints on Google Apps Script and the Node API Bridge return the unified V10 response envelope:
```typescript
interface ApiResponse<T> {
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
```

## 2. Standard Endpoints
- `GET /health` / `GET ?route=health`: System status, sheet connectivity, error rate.
- `POST /field/write` / `POST ?route=field/write`: Generic field-level write with RBAC validation and audit logging.
- `GET /field/read` / `GET ?route=field/read`: Generic field-level read with RBAC permissions.
- `GET /config/public`: Public configuration parameters.
- `POST /config/system`: Remote runtime configuration updates (`36_SYSTEM_CONFIG`).
- `POST /goal/create`: Create student goal with field mapping.
- `GET /student/goals`: Retrieve goals for a student.
- `POST /student/profile`: Update student profile information.
- `GET /student/profile`: Retrieve student profile by `studentId`.
- `POST /sync/queue`: Batch sync from offline queue.
- `GET /audit/logs`: Retrieve audit trail.
