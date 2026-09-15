# Presentation QA Report — EduChoice-AI

Tệp xem xét: 01_EduChoice-AI_Presentation.pptx (33 slide = 24 chính + 9 backup).

## 1. Cấu trúc & tính hợp lệ
- Số slide khớp thiết kế: 33; mỗi slide 1 ý chính.
- 16:9; slide backup có nhãn BACKUP.
- Footer: section + tên + ngày + version trên mọi slide; dòng nguồn trên slide dùng dữ liệu.

## 2. Data QA
- E2E 18/20: slide 16 — khớp runE2ETests live 2026-09-15.
- Audit 30 phát hiện: slide 5 — khớp EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md.
- 39 schema, 14 games, 13 toolkits, 45 APIs — khớp scan schema/registry/routes.
- Dữ liệu demo đều có nhãn "in-memory demo" hoặc "seed demo" (S14, S16, S20).

## 3. Formula & Claim QA
- Slide 18 trưng 4 công thức VERIFIED (chi tiết ở 08/09).
- Không vi phạm CAUSALITY OVERCLAIM: không có câu "can thiệp cải thiện học tập".

## 4. Visual QA
- Màu đồng nhất theo token; phông thống nhất Be Vietnam Pro; equations dùng Times New Roman. Các warning layout đã dọn.

## 5. Giới hạn xuất bản
- PDF (02) CHƯA tự sinh: máy build không có LibreOffice → render PPTX→PDF/PNG không tự động (NO_LIBREOFFICE). File 02_Presentation.pdf.pending.md mô tả cách sinh thủ công trên máy có LibreOffice.
- Visual QA pixel-to-pixel (so slide render) chưa tự động do NO_LIBREOFFICE; đã kiểm tra số liệu & cấu trúc bằng script.

## Kết luận
Không có critical issue chặn xuất bản deck. Báo cáo trung thực về giới hạn PDF/render.
