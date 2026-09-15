/**
 * EDUCHOICE-AI V10 — AUTHORIZATION & RBAC (Authorization.gs)
 * Role-Based Access Control and Tenant Boundary Enforcement
 */

const ROLE_HIERARCHY = {
  "SUPER_ADMIN": 100,
  "SCHOOL_ADMIN": 80,
  "RESEARCH_ADMIN": 70,
  "RESEARCHER": 60,
  "CONTENT_ADMIN": 50,
  "CLASS_TEACHER": 40,
  "TEACHER": 30,
  "STUDENT": 10,
  "GUEST": 0
};

const PUBLIC_ROUTES = new Set(["health", "config/public"]);

function authorize_(context, route) {
  // Fail-closed: every route except the public allow-list requires a verified identity.
  if (!context || !context.authenticated) {
    if (PUBLIC_ROUTES.has(route)) return true;
    throw new Error("UNAUTHENTICATED: Yêu cầu định danh hợp lệ để truy cập route '" + route + "'");
  }

  const role = context.role || "STUDENT";
  
  // Super Admin bypasses all route checks
  if (role === "SUPER_ADMIN") return true;

  // Protect Admin routes
  if (route.startsWith("admin/") && !["SUPER_ADMIN", "SCHOOL_ADMIN"].includes(role)) {
    throw new Error("UNAUTHORIZED_ADMIN_ACCESS: Requires ADMIN role");
  }

  // Protect Research raw datasets
  if (route.startsWith("research/raw") && !["SUPER_ADMIN", "RESEARCHER", "RESEARCH_ADMIN"].includes(role)) {
    throw new Error("UNAUTHORIZED_RESEARCH_ACCESS: Requires RESEARCHER role");
  }

  // Protect Teacher Class Management
  if (route.startsWith("teacher/") && !["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "CLASS_TEACHER"].includes(role)) {
    throw new Error("UNAUTHORIZED_TEACHER_ACCESS: Requires TEACHER role");
  }

  return true;
}

function assertWritable_(role, writableRoles) {
  if (role === "SUPER_ADMIN") return true;
  if (!writableRoles.includes(role)) {
    throw new Error(`FORBIDDEN_WRITE: Role ${role} is not authorized to write this field.`);
  }
  return true;
}

function assertReadable_(role, readableRoles) {
  if (role === "SUPER_ADMIN") return true;
  if (!readableRoles.includes(role)) {
    throw new Error(`FORBIDDEN_READ: Role ${role} is not authorized to read this field.`);
  }
  return true;
}
