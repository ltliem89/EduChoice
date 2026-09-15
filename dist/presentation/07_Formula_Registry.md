# Formula Registry — EduChoice-AI

## Quy ước
Mỗi công thức: định danh, mục đích, biến, đơn vị, nguồn, trạng thái xác minh. Không có công thức "phantasm".
| ID | Metric | Công thức | Biến | Đơn vị | Ví dụ số | Nguồn | Trạng thái |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F-001 | Completion Rate | Completed / Eligible × 100% | Completed: count; Eligible: count (>0) | % | {"Completed":4,"Eligible":4,"expected":100} | đặc tả §13 + GameRuntime.tsx (completionRate) | VERIFIED |
| F-002 | Transfer Gap | Game Gain − Real Gain | Game Gain: điểm trong game; Real Gain: điểm vi hành động đời thực | điểm (cùng thang đo) | {"Game Gain":88,"Real Gain":75,"expected":13} | v9SchemaRegistry.ts 27_TRANSFER_MEASURES (ghi chú schema) | VERIFIED |
| F-003 | Decision Time Mean | Σ(decision time) / N | t_i: ms của lựa chọn i; N: số lựa chọn | ms/lựa chọn | {"durationMs":185000,"N":49,"expected":"≈3776 ms"} | GameRuntime.tsx decisionTimeMeanMs | VERIFIED |
| F-004 | Write Success Rate | successful writes / total writes × 100% | w_ok: số ghi thành công; W: tổng số ghi | % | {"w_ok":40,"W":40,"expected":100} | V9DataEngine getDataQualityMetrics writeSuccessRate | VERIFIED |
| F-005 | Transfer Index | chưa có công thức được tài liệu hóa trong repo |  | 0–1 | — | chỉ xuất hiện trong seed data (REC_TRF_01: 0.85, REC_TRF_02: 0.58) — không có định nghĩa | NOT_VERIFIED — không đưa lên slide chính |
