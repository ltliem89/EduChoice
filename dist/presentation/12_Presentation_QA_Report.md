# Presentation QA Report — EduChoice-AI

Tệp xem xét: 01_EduChoice-AI_Presentation.pptx (15 slide).

## 1. Cấu trúc & tính hợp lệ
- Đúng 15 slide; mỗi slide một ý chính; không slide backup (gọn theo yêu cầu).
- 16:9; header chip + title + footer đồng bộ trên mọi slide; dòng nguồn trên slide dùng dữ liệu.

## 2. Chữ & bố cục
- Font: Times New Roman toàn bộ; kích thước nhỏ nhất 16pt (đã kiểm tra XML: 0 đoạn < 16pt).
- Không chồng chữ lên chữ / hình lên chữ — bố trí theo lưới cố định; card/icon có khoảng cách rõ.

## 3. Data QA
- E2E 18/20: S10 — khớp runE2ETests live 2026-09-15.
- Audit 30: S4 — khớp EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md.
- 39 schema, 14 games, 13 toolkits, 45 APIs — khớp scan.
- Dữ liệu demo đều có nhãn in-memory demo (S9, S14).

## 4. Formula & Claim QA
- S11 trưng 4 công thức VERIFIED (chi tiết 08/09).
- Không vi phạm CAUSALITY OVERCLAIM — không có câu "can thiệp cải thiện học tập".

## 5. Thẩm mỹ & minh họa
- Màu đa dạng sinh động theo bộ palette đồng nhất; icon minh họa theo từng đơn vị kiến thức.
- Có minh họa giao diện sản phẩm (S8 theo GameRuntime/StudentApp) và bảng minh chứng (S10, S11).

## 6. Giới hạn xuất bản
- PDF (02) đã sinh bằng PowerPoint COM; nếu cần tái sinh dùng soffice --convert-to pdf (xem 02_Presentation.pdf.md).
- 04_Speaker_Notes.pdf và 20_BaoCao pdf cần Word/LibreOffice (máy build chưa xuất được).
- Visual QA pixel-to-pixel chưa tự động; đã kiểm tra số liệu, font (TNR ≥16pt) và cấu trúc bằng script XML.

## Kết luận
Không có critical issue chặn xuất bản deck.
