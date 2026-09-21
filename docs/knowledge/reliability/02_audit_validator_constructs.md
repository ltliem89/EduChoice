---
id: rel-02
domain: reliability-audit
page: 2/4
source: Kiểm tra mã nguồn trực tiếp (validator.ts, types.ts, studentAnalytics.ts)
tags: [reliability, audit, validator, construct, whitelist, drc]
---

# Audit Độ Tin Cậy #2: Danh mục Construct trong Validator lệch chuẩn hệ thống

## Mục đích
So sánh danh sách construct mà `validateGameSpecification` chấp nhận với tập construct
chuẩn của toàn hệ thống.

## Cơ sở: danh mục chính thức
- `types.ts:135-155` định nghĩa kiểu hợp nhất `ConstructName` gồm **20 giá trị chính
  thức**: Planning, Prioritization, ProblemSolving, SelfRegulation, AttentionControl,
  HelpSeeking, Reflection, Adaptability, GoalSetting, Communication,
  ConsequencePrediction, Persistence, Autonomy, TimeManagement, DistractionRecovery,
  Cooperation, Empathy, Responsibility, HealthyRoutine, Balance.
- `studentAnalytics.ts:67` `CONSTRUCT_LABELS: Record<ConstructName, string>` thống nhất
  20 giá trị này (nguồn quy chiếu để chấm năng lực, xem `computeWellness`, báo cáo hàng
  ngày, ML forecasting).

## Phát hiện: `APPROVED_CONSTRUCTS` chỉ có 13 entry và lệch tập (validator.ts:4-18)
- **Chứa `ProblemDecomposition`** — KHÔNG tồn tại trong `ConstructName` (20 giá trị
  chính thức). Nếu một game khai báo `ProblemDecomposition`, validator không cảnh báo mà
  coi là hợp lệ, nhưng hệ thống chấm điểm không có construct này → đo đạc sai/hụt.
- **Thiếu 8 construct chính thức**: `Persistence`, `Autonomy`, `DistractionRecovery`,
  `Cooperation`, `Empathy`, `Responsibility`, `HealthyRoutine`, `Balance`.
- Với 8 construct bị thiếu: validator hiện cảnh báo "chưa nằm trong danh mục chuẩn quốc
  tế, cần kiểm tra lại" (validator.ts:91-93) — **cảnh báo sai** cho chính các construct
  mà sản phẩm đang muốn rèn (8/20 = 40% bộ kỹ năng).

## Ảnh hưởng dây chuyền
- Bộ 13 toolkit đã duyệt (`approvedToolkits.ts`) và 20 file tri thức tâm lý
  (`docs/knowledge/psychology/constructs/`) sử dụng chung 20 construct — nhưng validator
  "cổng an toàn" lại nói khác → chặn/xác nhận nhầm.
- `validateGameSpecification` được dùng trước khi biên soạn kịch bản game → kịch bản với
  `Empathy`/`Balance` v.v. được đánh dấu "cần kiểm tra" ngay từ đầu, làm hỏng trải nghiệm
  tác giả + nhiễu báo cáo kiểm duyệt.

## Đề xuất khắc phục (ưu tiên cao)
1. Sinh `APPROVED_CONSTRUCTS` từ chính nguồn duy nhất thay vì hardcode: dùng
   `new Set(Object.keys(CONSTRUCT_LABELS))` (studentAnalytics.ts:67) hoặc import từ một
   hằng số chung dùng cho cả `types.ts` và validator — tránh 2 nguồn rời rạc.
2. Bỏ `ProblemDecomposition` khỏi danh sách hoặc thêm nó vào `ConstructName` nếu là
   kỹ năng con của `ProblemSolving` (nên gộp, không thêm độc lập).
3. Thêm test đơn vị: với mọi `ConstructName`, gọi `validateGameSpecification(gameWithConstruct)`
   không được sinh warning; và mọi warning phải đúng nguyên nhân.

> ✅ **ĐÃ KHẮC PHỤC (2026-09-21)**: `APPROVED_CONSTRUCTS` nay sinh từ
> `new Set(Object.keys(CONSTRUCT_LABELS))` — đúng 20 construct, bỏ `ProblemDecomposition`
> (validator.ts L1-8).

## Nguồn tham khảo
- `src/utils/validator.ts` L4-18, L85-97
- `src/types.ts` L135-155 (`ConstructName`), L88-102 (`PsychologyToolkit`)
- `src/utils/studentAnalytics.ts` L67 (`CONSTRUCT_LABELS`)
- `src/data/approvedToolkits.ts` (13 toolkit, mỗi toolkit gắn construct mục tiêu)