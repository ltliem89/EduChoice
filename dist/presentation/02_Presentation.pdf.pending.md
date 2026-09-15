# 02_EduChoice-AI_Presentation.pdf — PENDING (limitation)

Máy build không cài LibreOffice (NO_LIBREOFFICE) nên bước render PPTX→PDF không tự động chạy.
Cách sinh trên máy có LibreOffice:
    soffice --headless --convert-to pdf --outdir dist/presentation dist/presentation/01_EduChoice-AI_Presentation.pptx

Đây là giới hạn công cụ, KHÔNG phải dữ liệu thiếu. PDF sẽ giữ nguyên nội dung PPTX (cùng source of truth content.mjs).
