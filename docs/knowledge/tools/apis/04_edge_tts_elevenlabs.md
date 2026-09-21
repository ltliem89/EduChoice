---
id: tool-edge-tts-elevenlabs
category: api
official_url: "https://pypi.org/project/edge-tts/"
source: "https://pypi.org/project/edge-tts; https://github.com/rany2/edge-tts; https://elevenlabs.io/text-to-speech/vietnamese"
tags: [tts, edge-tts, microsoft, elevenlabs, tieng-viet, mien-phi, chi-phi-thap]
---

# Edge-TTS (miễn phí) và ElevenLabs — Phương án TTS tiếng Việt chi phí thấp

## Giới thiệu

Hai hướng lựa chọn bổ trợ cho Google Cloud TTS khi EduChoice-AI cần giọng đọc tiếng Việt với chi phí tối thiểu:

**1. Edge-TTS (Microsoft Edge online TTS — không chính thức)**
- Thư viện Python `edge-tts` (bởi @rany2, PyPI) sử dụng **dịch vụ giọng đọc trực tuyến của Microsoft Edge** qua WebSocket — **miễn phí, không cần API key**, giới hạn theo API của Microsoft.
- Ngôn ngữ: 400+ giọng/140+ ngôn ngữ; riêng tiếng Việt có các giọng neural như **vi-VN-NamMinhNeural (Nam)** và **vi-VN-HoaiMyNeural (Nữ)**.
- Chỉnh được `--rate`, `--volume`, `--pitch`; xuất MP3; hỗ trợ subtitle.
- Cấp phép LGPLv3; **không phải sản phẩm chính thức** của Microsoft — rủi ro bị chặn/thay đổi bất kỳ lúc nào.

**2. ElevenLabs (thương mại, chất lượng cao)**
- Sản phẩm AI audio (TTS/STT) hỗ trợ chính thức tiếng Việt trên model **Eleven v3** và **Flash v2.5**.
- Trang có mục chuyên biệt: TTS tiếng Việt (elevenlabs.io/text-to-speech/vietnamese) và STT Scribe tiếng Việt.
- Giá: **Free** 10k credits/tháng (~10 phút audio, phi thương mại), **Starter** ~$5–6/tháng (30k credits, có giấy phép thương mại), **Creator** ~$22/tháng (121k credits).
> ⚠️ CẦN XÁC MINH: mức giá hiện hành (bảng giá thay đổi) và hạn mức voice cloning.

## Bản quyền & điều kiện sử dụng

- Edge-TTS: không phải API được hỗ trợ chính thức — không có SLA; việc dùng trong sản phẩm thương mại rủi ro vi phạm điều khoản sử dụng dịch vụ của Microsoft.
- ElevenLabs: cần gói có **giấy phép thương mại** (Starter trở lên) nếu dùng trong sản phẩm thu phí; free tier chỉ phi thương mại.

## Cơ hội tích hợp vào EduChoice-AI

- **Giai đoạn MVP / prototype**: dùng Edge-TTS để sinh nhanh các đoạn đọc mẫu thuật ngữ KHTN không tốn phí; pipeline server Express gọi CLI/API, lưu MP3 vào Drive, trỏ link trong sheet.
- **Bản production**: ưu tiên Google Cloud TTS (SLA, vi-VN chính chủ) hoặc ElevenLabs khi cần giọng cảm xúc; tạo abstract layer `TtsProvider` để đổi nhà cung cấp không phá vỡ phần còn lại.
- **STT tiếng Việt** (nếu có tính năng trả lời miệng): ElevenLabs Scribe là lựa chọn thương mại; cạnh tranh Google STT.

## Rủi ro & lưu ý pháp lý/đạo đức

- Edge-TTS là giải pháp "grey area" — không dùng cho sản phẩm quy mô lớn/phụ thuộc.
- Giọng AI phải được gắn nhãn rõ ràng với HS/số giám hộ.
- Dữ liệu audio của học sinh: xử lý giống dữ liệu nhạy cảm (xem apis/03_google_cloud_tts_stt.md về quy tắc lưu/xoá).

## Nguồn tham khảo

- PyPI edge-tts: https://pypi.org/project/edge-tts
- GitHub rany2/edge-tts: https://github.com/rany2/edge-tts
- ElevenLabs TTS tiếng Việt: https://elevenlabs.io/text-to-speech/vietnamese