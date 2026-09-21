---
id: tool-google-cloud-tts-stt
category: api
official_url: "https://cloud.google.com/text-to-speech"
source: "https://cloud.google.com/text-to-speech; http://cloud.google.com/speech-to-text/pricing"
tags: [tts, stt, tieng-viet, google-cloud, giong-noi, neural, pricing]
---

# Google Cloud Text-to-Speech & Speech-to-Text — Tiếng nói tiếng Việt chất lượng cao

## Giới thiệu

**Google Cloud Text-to-Speech (TTS)** và **Speech-to-Text (STT)** là các API âm thanh của Google Cloud (nền tảng DeepMind), hỗ trợ **tiếng Việt (vi-VN)** với nhiều bậc giọng đọc từ standard đến neural chất lượng cao.

- TTS: **380+ giọng** trên **75+ ngôn ngữ/giọng vùng**; hỗ trợ SSML, chỉnh cao độ/tốc độ/âm lượng, streaming và long-audio.
- STT: nhận dạng giọng nói, hỗ trợ tiếng Việt; song song có mô hình mới (Chirp, Gemini-based) cho chất lượng cao.
- Phân loại giọng TTS: **Standard** (rẻ), **WaveNet/Neural2** (chất lượng cao), **Chirp 3: HD** (âm thanh HD, GA cho nhiều ngôn ngữ) và **Studio** (đắt nhất).

## Nội dung & đối tượng

- Dùng cho tính năng **đọc thành tiếng** bài tập/đề KHTN, **gợi ý hội thoại** và nhận dạng câu trả lời bằng giọng nói.
- TTS có free tier: **1 triệu ký tự/tháng** cho WaveNet/Neural2, **4 triệu ký tự/tháng** cho Standard (miễn phí trước khi tính phí).
- STT có free tier: **60 phút/tháng** (V1 có data logging), sau đó tính phí theo phút.

## Giá (đã kiểm chứng — theo trang chính thức)

- **TTS**:
  - Standard: $4/1M ký tự (sau free tier).
  - WaveNet / Neural2: $16/1M ký tự.
  - Chirp 3: HD: ~$30/1M ký tự.
  - Studio: ~$160/1M ký tự.
- **STT** (V2):
  - Standard: $0.016/phút (0–500k phút/tháng), giảm theo nấc.
  - Dynamic batch: $0.003/phút.
  - V1 (có data logging): miễn phí 60 phút, sau đó $0.016/phút.
> ⚠️ CẦN XÁC MINH: bảng giá hiện hành và danh sách giọng vi-VN tại thời điểm triển khai.

## Bản quyền & điều kiện sử dụng

- Dung lượng miễn phí chỉ hiển thị trong quota; cần bật billing trước khi dùng API (chỉ tính phí khi vượt quota).
- Giọng đọc sinh ra có thể dùng thương mại theo điều khoản Google Cloud (không cấp quyền thương hiệu cho nhân vật).

## Cơ hội tích hợp vào EduChoice-AI

- **TTS cho bài đọc KHTN**: phát audio chính tả thuật ngữ (ví dụ: "nguyên tử", "quang hợp") giúp HS luyện đọc – hiểu; tăng khả năng tiếp cận cho HS yếu đọc.
- **STT cho câu hỏi miệng/tự luận ngắn**: xác thực câu trả lời bằng giọng nói; ghi nhận kết quả vào ledger.
- **Kiến trúc**: chạy tổng hợp audio phía Apps Script viz-proxy (gọi Node/Cloud Function) hoặc phía server Express hiện có; lưu file MP3 vào Drive rồi trỏ link trong sheet.
- **Chi phí MVP**: dùng free tier ban đầu; chuyển sang **Edge-TTS** nếu cần 0 chi phí (xem apis/04_edge_tts_elevenlabs.md).

## Rủi ro & lưu ý pháp lý/đạo đức

- File audio chứa giọng đọc sinh tự động: gán nhãn "giọng đọc AI" để tránh gây nhầm lẫn cho HS/giám hộ.
- Dữ liệu âm thanh của học sinh (nếu STT) thuộc dữ liệu cá nhân nhạy cảm — mã hoá, không lưu audio lâu dài trừ khi được đồng thuận (tương tự 02_CONSENTS).
- Tuân thủ Nghị định 147/2024/NĐ-CP; riêng audio phải có quy tắc xoá định kỳ ghi trong DATA_MODEL.

## Nguồn tham khảo

- Google Cloud TTS: https://cloud.google.com/text-to-speech
- Giá TTS: https://cloud.google.com/text-to-speech/pricing
- Giá STT: http://cloud.google.com/speech-to-text/pricing