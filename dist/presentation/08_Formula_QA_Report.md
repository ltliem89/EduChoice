# Formula QA Report — EduChoice-AI

Quy trình: mỗi công thức phải (1) có định nghĩa, (2) có nguồn, (3) có ví dụ định hướng, (4) có trạng thái xác minh rõ.

## Kết quả từng công thức
| ID | Định nghĩa | Nguồn | Ví dụ | Xác minh | Quyết định |
| --- | --- | --- | --- | --- | --- |
| F-001 | Completion Rate | đặc tả §13 + GameRuntime.tsx (completionRate) | Có | VERIFIED | Dùng trên slide chính (S11) |
| F-002 | Transfer Gap | v9SchemaRegistry.ts 27_TRANSFER_MEASURES (ghi chú schema) | Có | VERIFIED | Dùng trên slide chính (S11) |
| F-003 | Decision Time Mean | GameRuntime.tsx decisionTimeMeanMs | Có | VERIFIED | Dùng trên slide chính (S11) |
| F-004 | Write Success Rate | V9DataEngine getDataQualityMetrics writeSuccessRate | Có | VERIFIED | Dùng trên slide chính (S11) |
| F-005 | Transfer Index | chỉ xuất hiện trong seed data (REC_TRF_01: 0.85, REC_TRF_02: 0.58) — không có định nghĩa | Thiếu | NOT_VERIFIED — không đưa lên slide chính | KHÔNG dùng trên slide chính (gap dữ liệu) |

## Phát hiện & hành động
- F-005 (Transfer Index) chưa xác minh vì chưa có dữ liệu transfer thật → không trưng lên slide chính; chỉ nêu hạn chế (S11).
- F-001..F-004 có ví dụ số khớp với computation thật trong engine.
