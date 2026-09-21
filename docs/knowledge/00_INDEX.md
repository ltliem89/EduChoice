---
id: kb-index
domain: knowledge-base
level: root
source: Tự sinh từ thư mục docs/knowledge
tags: [knowledge-base, file-list, navigation]
---

# 00_INDEX — Danh mục toàn bộ file kho tri thức

> Cập nhật ngày: 2026-09-21 · Tổng: **271 file** (psychology 67 · science 171 · tools 25 ·
> reliability 4 · README/CONVENTIONS/INDEX/MAP 4). Quy ước thêm file mới: xem `CONVENTIONS.md`.

## 0. Root file (4)
| File | Vai trò |
|---|---|
| `README.md` | Giới thiệu kho, cấu trúc, cách tiêu thụ, thống kê |
| `CONVENTIONS.md` | Chuẩn viết file (metadata, đặt tên, bảo vệ "không bịa") |
| `00_INDEX.md` | File này — danh mục toàn bộ |
| `00_MAP.md` | Bản đồ 20 construct ↔ 13 toolkit ↔ file tri thức (supplement RAG) |

## 1. reliability/ (4 file) — Audit độ tin cậy mã nguồn
| # | id | File | Nội dung |
|---|---|---|---|
| 01 | rel-01 | `reliability/01_audit_runtime_scoring.md` | Score bị phóng đại, completionRate sai, mismatch +15pts, completionStatus cứng 'completed' |
| 02 | rel-02 | `reliability/02_audit_validator_constructs.md` | APPROVED_CONSTRUCTS 13 ≠ 20 (thừa ProblemDecomposition, thiếu 8 construct) |
| 03 | rel-03 | `reliability/03_audit_abandoned_event.md` | Event 'abandoned' khai báo nhưng chưa bao giờ được log từ runtime |
| 04 | rel-04 | `reliability/04_audit_ml_forecast_demo_data.md` | MLForecasting vẽ dữ liệu giả hằng ngày 2026, key TaskCompletion không tồn tại |

## 2. psychology/development/ (12 file) — Tâm lý phát triển lứa tuổi THCS
`psy-dev-00` tổng quan tâm lý THCS · `01` đặc điểm thị tán lý · `02` nhận thức tư duy bao quát ·
`03` siêu nhận thức & phản tư · `04` cảm xúc & kiểm soát xung động · `05` xã hội đồng đẳng lứa ·
`06` hoạt động trước trận đỉnh cao · `07` trí nhớ chú ý học tập · `08` động lực học tập ·
`09` giấc ngủ thiếu niên · `10` đời sống số thời đại số · `11` ngữ cảnh VN (học thêm, thi cử)

## 3. psychology/constructs/ (20 file) — 20 năng lực target
1 Planning · 2 Prioritization · 3 ProblemSolving · 4 SelfRegulation · 5 AttentionControl ·
6 HelpSeeking · 7 Reflection · 8 Adaptability · 9 GoalSetting · 10 Communication ·
11 ConsequencePrediction · 12 Persistence · 13 Autonomy · 14 TimeManagement ·
15 DistractionRecovery · 16 Cooperation · 17 Empathy · 18 Responsibility ·
19 HealthyRoutine · 20 Balance — tên file đi kèm hậu tố tiếng Việt (quản lý thời gian,
thấu cảm...).

## 4. psychology/toolkits/ (13 file) — 13 công cụ can thiệp đã duyệt
Khớp 1-1 với `approvedToolkits.ts`: Prioritization, ProblemIdentification,
ProblemDecomposition, Planning, TimeManagement, ConsequencePrediction,
CognitiveReframing, SelfRegulation, HelpSeeking, Communication, GoalSetting,
Reflection, RetryExperiment (xem toolkits/01–13).

## 5. psychology/wellness/ (9 file) — Sức khỏe tâm lý & quy trình leo thang
`01` tổng quan sức khỏe tâm lý · `02` căng thẳng học tập · `03` lo âu & lo lắng ·
`04` vệ sinh giấc ngủ · `05` màn hình & game · `06` quan hệ bạn bè & bắt nạt ·
`07` giao tiếp gia đình · `08` khi nào cần người lớn hỗ trợ (leo thang) ·
`09` đạo đức AI & giáo dục tâm lý

## 6. psychology/advice/ (13 file) — Lời khuyên tâm lý sau nhiệm vụ (psy-4xx)
Dữ liệu nền cho `src/data/adviceCatalog.ts` + `src/utils/adviceEngine.ts`: chọn lời khuyên theo
outcome × construct × thời điểm (giờ/ngày) sau mỗi phiên micro-game.
- `psy-400` tổng quan hệ thống & luồng dữ liệu · 4 dạng outcome: `success/partial/struggled/abandoned`
- `psy-401` success — chúc mừng quá trình · `402` partial — điều chỉnh nhẹ ·
  `403` struggled — xây sức bền · `404` abandoned — bỏ ngang không phải thất bại
- `psy-405` khoa học lời khen & feedback · `410` lý thuyết matching context-fit (chấm điểm entry)
- Lớp thời gian: `406` khung giờ & nhịp sinh học · `407` giấc ngủ & ranh giới học khuya ·
  `408` ngày trong tuần vs cuối tuần · `409` tuần thi & lo âu thi cử ·
  `411` micro-action cầu nối ra đời thực · `412` xoay vòng & phát triển theo thời gian
- Kèm `ADVICE_BASIS_LINKS` (12 nguồn): HT2007, DWECK, SDT2009, IRIS, Chronobiology (Goldin),
  Sleep Foundation, self-compassion, Lazarus, O'Driscoll test anxiety, v.v.

## 7. science/grade6/ (40 file) — KHTN lớp 6
`01-03` mở đầu/an toàn · Chất và biến đổi chất `04-13` (thể, chuyển thể, hỗn hợp, tách chất...) ·
Vật sống `14-24` (tế bào, đa dạng sinh học...) · Năng lượng `25-27` (đo lường) ·
Lực `28-33` · Năng lượng `34-37` · Trái Đất & bầu trời `38-40`.

## 8. science/grade7/ (41 file) — KHTN lớp 7
`01-02` phương pháp & an toàn · `03-13` chất & chuyển hóa (nguyên tử → PTHH) ·
`14-31` trao đổi chất & sinh sản sinh vật · `32-35` chuyển động & an toàn giao thông ·
`36-39` âm thanh · `40-41` ánh sáng.

## 9. science/grade8/ (45 file) — KHTN lớp 8
`01-15` hóa (mol, dung dịch, acid/base/oxide/muối, phân bón...) · `16-29` lý (khối lượng riêng,
áp suất, Archimedes, điện, nhiệt...) · `30-41` cơ thể người · `42-45` sinh thái & môi trường.

## 10. science/grade9/ (45 file) — KHTN lớp 9
`01-13` lý nâng cao & năng lượng (công-suất, điện, điện từ, khúc xạ-thấu kính...) ·
`14-30` hóa hữu cơ & kim loại/phi kim (alkane, alcohol, glucozơ, polymer, dãy hoạt động...) ·
`31-43` di truyền & biến dị (Mendel, DNA/RNA, NST, phân bào, di truyền người, công nghệ gene) ·
`44-45` tiến hóa & sinh quyển.

## 11. tools/platforms/ (13 file) — Nền tảng học tập
1 OLM · 2 VioEdu · 3 HocMai · 4 Sách Mềm · 5 Khan Academy · 6 PhET · 7 GeoGebra ·
8 Quizizz · 9 Kahoot! · 10 Blooket · 11 Google Classroom · 12 MS Teams for Education ·
13 ICAN (cảnh báo trùng tên thương hiệu).
> Ghi chú: OLM/VioEdu/HocMai/Sách Mềm bám SGK bộ sách, KHÔNG phải nguồn chuyên môn
> KHTN thuần; Khan/PhET có nội dung quốc tế mạnh (CC BY-NC-SA / CC BY-NC 4.0).

## 12. tools/apis/ (8 file) — API & dịch vụ
1 Google Sheets API · 2 Gemini API · 3 Google Cloud TTS-STT · 4 Edge TTS/ElevenLabs ·
5 QTI/GIFT · 6 LMS (Moodle/Cavas) · 7 Firebase Auth · 8 Analytics (GA4/Looker).
> Giá & quota trong các file mang tính tham chiếu thời điểm soạn; trước triển khai
> phải kiểm chứng lại.

## 13. tools/curriculum/ (4 file) — Chương trình khung
01 KHTN 2018 (toàn bộ 01-03) · 02 GDCD 2018 · 03 Sách giáo khoa & các bộ sách ·
04 STEM/Công nghệ - Tin học.
> `01_khtn_2018.md` là "bản đồ" bắt buộc khi chọn nội dung: tra mạch nội dung + tỉ lệ
> Lý/Hóa/Sinh theo từng khối trước khi viết bài.

## Tra cứu nhanh theo uses case
- **Soạn micro-game kỹ năng X**: `psychology/constructs/{X}` + `psychology/toolkits/{toolkit}`
- **Soạn lời khuyên sau phiên**: `psychology/advice/` (psy-400 → 412) + `src/utils/adviceEngine.ts`
- **Dạy bài KHTN lớp Y**: `curriculum/01_khtn_2018.md` → `science/grade{Y}/{bai}`
- **Trả lời câu hỏi tâm lý học sinh**: `psychology/development/` + `wellness/`
- **Kiểm tra độ tin cậy hệ thống**: `reliability/01` → `04`