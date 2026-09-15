# Formula QA Report — EduChoice-AI

Quy trình: mỗi công thức phải (1) có định nghĩa trong registry, (2) có nguồn trong code/docs, (3) có ví dụ định hướng, (4) trạng thái xác minh rõ ràng.

## Kết quả từng công thức
| ID | Định nghĩa | Nguồn | Ví dụ | Xác minh | Quyết định |
| --- | --- | --- | --- | --- | --- |
| F-001 | Completion Rate | đặc tả §13 + GameRuntime.tsx (completionRate) | Có | VERIFIED | Dùng trên slide chính (S18) |
| F-002 | Transfer Gap | v9SchemaRegistry.ts 27_TRANSFER_MEASURES (ghi chú schema) | Có | VERIFIED | Dùng trên slide chính (S18) |
| F-003 | Decision Time Mean | GameRuntime.tsx decisionTimeMeanMs | Có | VERIFIED | Dùng trên slide chính (S18) |
| F-004 | Write Success Rate | V9DataEngine getDataQualityMetrics writeSuccessRate | Có | VERIFIED | Dùng trên slide chính (S18) |
| F-005 | Transfer Index | chỉ xuất hiện trong seed data (REC_TRF_01: 0.85, REC_TRF_02: 0.58) — không có định nghĩa | Thiếu | NOT_VERIFIED — không đưa lên slide chính | KHÔNG dùng trên slide chính (gap dữ liệu) |

## Phát hiện & hành động
- F-005 (Transfer Index) chưa xác minh vì chưa có dữ liệu transfer thật → loại khỏi slide chính, chỉ nêu trong backup B04 (spec: không trưng công thức chưa xác minh ở slide chính).
- F-001..F-004 có ví dụ số khớp với computation thật trong engine.
