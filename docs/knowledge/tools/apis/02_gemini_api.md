---
id: tool-gemini-api
category: api
official_url: "https://ai.google.dev/gemini-api/docs/pricing"
source: "https://ai.google.dev/gemini-api/docs/pricing; https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash"
tags: [gemini, google-ai, api, token, free-tier, pricing, sinh-noi-dung]
---

# Gemini API — LLM chính của EduChoice-AI

## Giới thiệu

**Gemini API** là giao diện lập trình của Google cho các mô hình Gemini (multimodal), dùng để **sinh nội dung**: câu hỏi KHTN, bài giảng, đánh giá, giải thích. EduChoice-AI hiện tích hợp qua thư viện **`@google/genai` (^2.4.0)** với biến môi trường `GEMINI_API_KEY`.

- Hai hệ phân phối: **Google AI Studio** (cho nhà phát triển dùng `ai.google.dev`) và **Vertex AI** (cho doanh nghiệp qua GCP). Dự án đang dùng Google AI Studio (README gắn AI Studio app ID).
- Mô hình phổ biến: **Gemini 2.5 Flash** (cân bằng giá/hiệu năng), **Flash-Lite** (rẻ nhất), **Pro** (mạnh, đắt).
- Tính năng hỗ trợ: function calling, structured outputs, context caching, search grounding, batch & flex inference.

## Nội dung & đối tượng

- Sinh nội dung tự động: đề câu hỏi trắc nghiệm/tự luận, paraphrase, grading rubric, giải thích từng bước Vật lý-Hóa-Sinh cho THCS.
- Multimodal: đọc ảnh (đề bài scan), không sinh ảnh/audio (bản 2.5 Flash cơ bản).
- Token limits 2.5 Flash: input **1,048,576**, output **65,536**.

## Giá cả & free tier (đã kiểm chứng — cập nhật theo nguồn chính thức)

- **Free tier** (AI Studio): miễn phí nhưng **rate-limited**; dữ liệu có thể bị Google dùng cải thiện sản phẩm. Các mô hình Flash/Flash-Lite có free tier; Pro giảm mạnh hạn mức (từng là ~50 RPD đối với 2.5 Pro) và **với một số phiên bản Pro mới đã chuyển sang trả phí**.
- **Paid tier** (giá theo 1M token, USD, đã ghi nhận):
  - Gemini 2.5 Flash: input **$0.30** / output **$2.50**.
  - Gemini 2.5 Flash-Lite: input **$0.10** / output **$0.40** (rẻ nhất).
  - Gemini 2.5 Pro: input $1.25 (≤200k token) / $2.50 (>200k); output $10–$15.
  - Các bản mới hơn (3.5/3.6 Flash, 3.1 Pro...) có giá khác và liên tục thay đổi.
- Batch API ~**50% giảm**; context caching tiết kiệm lớn (chỉ trả khi lưu).
> ⚠️ CẦN XÁC MINH tại thời điểm triển khai: bảng giá hiện hành trên trang chính thức — giá/chính sách đổi thường xuyên.

## Bản quyền & điều kiện sử dụng

- Điều khoản AI Studio: dùng free tier có nghĩa Google có thể dùng prompt/output để huấn luyện (trừ khi tắt/bản trả phí).
- Không được dùng output để huấn luyện mô hình đối thủ hoặc tái bán API.
- Nội dung sinh ra phải tuân thủ chính sách nội dung của Google (không sinh nội dung có hại cho trẻ em).

## Cơ hội tích hợp vào EduChoice-AI

- **Pipeline sinh nội dung chuẩn hoá**: dùng structured outputs (JSON schema tương ứng v9SchemaRegistry) để Gemini tạo câu hỏi đúng cấu trúc sheet — giảm lỗi parse khi ghi vào ledger.
- **Offline queue + idempotency** (v9Client) cho phép retry thoải mái khi vượt rate limit free tier.
- **Tối ưu chi phí**: batch 50% cho khối sinh đề hàng loạt; cache prompt system (hướng dẫn soạn câu hỏi) để giảm token lặp lại.
- **Chọn Flash-Lite cho chấm điểm/đánh giá**, Flash cho sinh bài giảng/câu hỏi phức tạp.

## Rủi ro & lưu ý pháp lý/đạo đức

- Chất lượng sinh nội dung không kiểm chứng tuyệt đối → cần tầng **Validation.gs** so khớp chuẩn kiến thức (đã có Validation/schema) và cơ chế phản hồi tính đúng sai của câu hỏi.
- Prompt/output có thể chứa thông tin học sinh (pseudonymous IDs) → không gửi kèm dữ liệu nhận dạng cá nhân thật.
- Chi phí không đoán trước được ở quy mô lớn → thiết lập quota usage theo ngày (đã có mô hình TELEMETRY theo dõi).
- Tuân thủ Nghị định 147/2024/NĐ-CP cho người dùng dưới 16 tuổi về thu thập/giữ gìn dữ liệu (không bật "lưu lịch sử" ngoài phạm vi đồng thuận).

## Nguồn tham khảo

- Bảng giá Gemini API: https://ai.google.dev/gemini-api/docs/pricing
- Gemini 2.5 Flash (docs/limits): https://ai.google.dev/gemini-api/docs/models/gemini-2.5-flash
- Free tier và rate limits: https://ai.google.dev/gemini-api/docs/rate-limits