---
id: kb-00
domain: knowledge-base
level: root
source: Tổng hợp có chọn lọc + nguồn chính thức (Bộ GD&ĐT, tác giả nổi bật, tài liệu tham khảo)
tags: [knowledge-base, index, cover]
---

# Kho Tri Thức EduChoice-AI (docs/knowledge)

Kho dữ liệu Markdown làm nguồn soạn nội dung cho sản phẩm EduChoice-AI: trò chơi
micro-game giáo dục kỹ năng THCS, trợ lý học tập, báo cáo nghiên cứu cho phụ huynh,
ban giám hiệu và nhà trường.

## 1. Nguyên tắc "làm thật, không bịa"
- Mọi khái niệm, số liệu, mốc phát triển, tên nền tảng, giấy phép, giá API đều ghi rõ
  nguồn ở metadata (`source`) và phần `## Căn cứ lý thuyết / nguồn thật`.
- Chỗ nào chưa thể xác minh khách quan trong lúc soạn: đánh dấu `> ⚠️ CẦN XÁC MINH`
  ngay trong file, KHÔNG để im như sự thật.
- Không gán số liệu cho một phiên bản game/thư viện khi chưa kiểm tra; không bịa URL nền
  tảng (nếu không chắc link, ghi "xem trang chủ chính thức" thay vì đoán URL).
- Nội dung tâm lý chỉ dừng ở mức giáo dục phòng ngừa; tuyệt đối không chẩn đoán/điều trị;
  khi có dấu hiệu nguy hiểm luôn khuyến nghị liên hệ người lớn / chuyên gia theo quy trình
  leo thang (xem wellness/08_when_need_adult_support).

## 2. Cấu trúc thư mục
```
docs/knowledge/
├── 00_INDEX.md                → danh mục toàn bộ file (cập nhật mỗi khi thêm file)
├── 00_MAP.md                  → bản đồ 20 construct ↔ 13 toolkit ↔ file tri thức (RAG supplement)
├── README.md (file này)
├── CONVENTIONS.md             → chuẩn metadata/id/đặt tên/format khi viết & thêm file
├── reliability/               → 4 báo cáo audit độ tin cậy mã nguồn (ref 01-04)
├── psychology/
│   ├── development/           → tâm lý phát triển lứa tuổi 11-15 (12 file)
│   ├── constructs/            → 20 năng lực/kỹ năng target (20 file)
│   ├── toolkits/              → 13 công cụ can thiệp đã phê duyệt (13 file)
│   ├── wellness/              → sức khỏe tâm lý, leo thang cảnh báo (9 file)
│   └── advice/                → lời khuyên sau nhiệm vụ theo outcome×thời điểm (13 file)
├── science/
│   ├── grade6/                → Khoa học Tự nhiên lớp 6 (40 file)
│   ├── grade7/                → KHTN lớp 7 (41 file)
│   ├── grade8/                → KHTN lớp 8 (45 file)
│   └── grade9/                → KHTN lớp 9 (45 file)
└── tools/
    ├── platforms/             → nền tảng học tập có thể tích hợp (13 file)
    ├── apis/                  → API/dịch vụ (TTS, Sheets, AI...) (8 file)
    └── curriculum/            → chương trình khung (KHTN 2018, GDCD 2018...) (4 file)
```

## 3. Cách tiêu thụ
- ChatGPT/LLM soạn micro-game: nạp file của `psychology/constructs/<construct>` +
  `psychology/toolkits/<toolkit>` + `science/grade<7-9>/<bai>` cần dạy.
- Chọn nội dung khoa học theo **đúng khối lớp, đúng mạch nội dung** trong `curriculum/01_khtn_2018.md`.
- Kiểm tra an toàn: luôn bám liên kết construct→toolkit→wellness khi viết phản hồi.
- Nhóm phát triển: khi hỏi về số liệu lứa tuổi/tâm lý, trả lời hoặc ủy quyền đọc từ
  `psychology/development/`, không nhớ cầu may.

## 4. Thống kê hiện tại
- Tổng số file Markdown: **271** (đạt ngưỡng 200–500 theo yêu cầu).
- Phân bổ: psychology 67 · science 171 · tools 25 · reliability 4 · README/CONVENTIONS/INDEX/MAP 4.

## 5. Những việc còn mở (roadmap tri thức)
- [x] Map 20 construct ↔ 13 toolkit ↔ từng tool tri thức (xem `00_MAP.md`)
- [x] Kho lời khuyên sau nhiệm vụ: 13 file `psychology/advice/` (psy-400→412) + catalog/engine ở `src/`
- [ ] Bổ sung giáo án mẫu cho từng construct theo từng bộ SGK (Cánh diều/KNTT/CTST)
- [ ] Kiểm chứng giá API ở thời điểm triển khai thực tế (giá trong apis/ là tham chiếu
      có thể đổi)
- [ ] Đối soát nội dung còn `⚠️ CẦN XÁC MINH` với SGK bản in