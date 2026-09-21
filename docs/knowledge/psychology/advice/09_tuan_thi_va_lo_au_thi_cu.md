---
id: psy-409
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "O'Driscoll & McAleese (2022) DOI 10.1080/02643944.2022.2054021 — self-compassion giảm lo thi; VnExpress (5/2026) áp lực thi lớp 10; Thông tư 19/2019; Sleep Foundation — giấc ngủ giữ kết quả thi."
tags: [loi-khuyen, tuan-thi, lo-au-thi-cu, self-compassion, thi-cu]
---

# Tuần thi và lo âu thi cử (Exam Week & Test Anxiety)

## Mục đích
Hệ thống lời khuyên dành riêng cho **tuần thi** (dayType: examWeek): khung chuẩn bị tinh thần,
chống nhồi nhét môn, bảo vệ giấc ngủ đêm trước thi, và giảm lo âu bằng tự trắc nghiệm — bám sát
ngữ cảnh thi chuyển cấp lớp 10 của Việt Nam.

## Tóm tắt nhanh
- Lo âu thi không chỉ do "học chưa kĩ" — là cơ chế đánh giá đe dọa, cần kỹ năng ứng phó.
- Tự trắc nghiệm (self-compassion) giảm lo âu thi ở teen (O'Driscoll & McAleese 2022).
- Tuần thi = ôn retrieval + ngủ đủ đêm trước; không học mới nặng.
- "Giảm tải chủ động", không động viên bằng cách tăng yêu cầu.

## Kiến thức cốt lõi
### Lo âu thi cử ở thiếu niên
Test anxiety: trạng thái hoảng hốt/quá kích thích sinh lý trước/trong khi làm bài làm giảm huy
động trí nhớ dù đã học. Không chỉ là chuyện "học chưa kĩ" — còn là bộ máy đánh giá mối đe dọa
(Lazarus: đe dọa > nguồn lực).

### Tự trắc nghiệm làm giảm lo âu
O'Driscoll & McAleese (2022) tổng hợp mối liên hệ **self-compassion và giảm lo âu thi** ở học sinh:
tự thấu hiểu, bình thường hóa, chánh niệm giúp định hồi phục nhanh sau áp lực. Khuyến nghị thực
hành: hơi thở 4-4-4 trước khi đọc đề, tự nhủ "em đã chuẩn bị được nhiều, có vài câu trống thì vẫn
ổn".

### Nguyên tắc tuần thi (đúng + thực dụng)
1. **Đừng học cái mới nặng đêm trước thi** — ngủ đủ, não cần giấc ngủ để "nạp" (psy-407).
2. **Ôn bằng hình thức thực hành** (nhảy ra nháp, tự hỏi — retrieval practice) thay vì đọc lại
   nhiều lần.
3. **Chia nhỏ phiên ôn** — vài phiên 25 phút trong ngày thay vì một lần duy nhất.
4. **Không nhồi thêm lời khuyên dài dòng tuần thi** — ít thông điệp, rõ, dễ nhớ.
5. Theo dõi tín hiệu đỏ: mất ngủ liên tục, đau bụng/đau đầu mỗi đêm trước thi, khóc nhiều → đưa
   sang quy trình người lớn (wellness/08).

### Bối cảnh Việt Nam
Áp lực thi chuyển cấp lớp 10 được báo chí ghi nhận kéo theo quá tải (VnExpress 5/2026 — học sinh
học 5 ca/ngày đến 22h). Điều quan trọng: lời khuyên tuần thi phải **giảm tải chủ động**, không
"động viên" bằng cách tăng yêu cầu.

### Bảng kế hoạch nhỏ tuần thi (mẫu gợi ý micro-action)
| Ngày trước thi | Việc nhỏ nên làm | Việc nhỏ tránh |
|---|---|---|
| -3 | Ôn bằng bảng ghi nhớ/âm thầm tự hỏi (retrieval) | Học thử môn mới nặng |
| -2 | Giải 1 đề mẫu, canh giờ | Nhồi cả ngày không nghỉ |
| -1 | Ôn tóm tắt, sắp vật dụng thi | Học khuya, caffein |
| Trước khi vào phòng | Thở 4-4-4, tự nhủ "em đã chuẩn bị" | Đọc đề dồn dập |

## Vận dụng thực tiễn
- `classifyDayType` đã dự trù param `examWeek` (một trong 3 loại ngày); khi hệ thống phát hiện
  giai đoạn thi (từ lịch/mục tiêu), ưu tiên pool entry examWeek nếu catalog mở rộng.
- Nếu chưa dùng examWeek, áp dụng các nguyên tắc này vào micro-action tuần trước thi: giới hạn 1
  phiên nhỏ cuối ngày, giữ giờ ngủ cố định, chia sẻ với người thân khi trên đỉnh lo.
- Thiết kế mở rộng catalog: thêm entry examWeek cho outcome struggled (ưu tiên ngủ, ôn nhẹ) và
  success (khen chiến lược ôn, nhắc ngủ đủ trước khi thi).

### Kịch bản ví dụ: tối trước kỳ thi, học sinh bỏ ngang phiên ôn vì hoảng
| Bước | Hệ thống làm | Lý do |
|---|---|---|
| 1. Ngữ cảnh | lateNight + examWeek + abandoned | Khuya, tuần thi, bỏ ngang |
| 2. Thông điệp | "Em dừng đúng lúc. Ngủ đủ quan trọng hơn ôn thêm giờ cuối." | Giấc ngủ củng cố trí nhớ |
| 3. Giảm lo | Hơi thở 4-4-4, tự nhủ "em đã chuẩn bị được nhiều" | Giảm test anxiety (self-compassion) |
| 4. Micro-action | "Đặt giờ ngủ cố định, tắt màn hình." | Hành vi rõ, ngủ được |
| 5. Leo thang nếu cần | Khóc nhiều/mất ngủ liên tục → người lớn (wellness/08) | Dấu hiệu rủi ro |

## Câu hỏi ôn tập
1. Lo âu thi cử là gì và vì sao không chỉ do "học chưa kĩ"? (Đáp án: phản ứng sinh lý/huy động
   trí nhớ kém khi đe dọa > nguồn lực — Lazarus; cần xử lí cả cơ chế đánh giá mối đe dọa.)
2. Tự trắc nghiệm giúp gì cho học sinh mùa thi? (Đáp án: giảm lo âu, hồi phục nhanh sau áp lực —
   O'Driscoll & McAleese 2022.)
3. Đêm trước thi nên ôn hay ngủ? (Đáp án: ưu tiên ngủ đủ; giấc ngủ là lúc củng cố trí nhớ.)
4. Hình thức ôn hiệu quả được khuyên dùng tuần thi? (Đáp án: retrieval practice — tự hỏi/giải
   mẫu thay vì đọc lại nhiều lần.)
5. Dấu hiệu nào cần chuyển sang quy trình người lớn trong tuần thi? (Đáp án: mất ngủ liên tục,
   đau bụng/đầu mỗi đêm trước thi, khóc nhiều, dấu hiệu tự tổn thương.)

## Liên hệ với EduChoice-AI
- Construct: SelfRegulation, HealthyRoutine, TimeManagement, HelpSeeking, GoalSetting.
- Code tương lai: thêm ngữ cảnh `examWeek` trong `classifyDayType` và pool entry examWeek trong
  `adviceCatalog.ts`.
- Liên hệ tài liệu: wellness/02 (căng thẳng thi cử VN), wellness/08 (leo thang người lớn),
  psy-407 (giấc ngủ).

## Căn cứ lý thuyết (nguồn thật)
- O’Driscoll, C., & McAleese, M. (2022). *Self-compassion and test anxiety in adolescents.*
  Educational & Child Psychology. DOI 10.1080/02643944.2022.2054021.
- VnExpress (20/5/2026). *Cha mẹ sụt cân, con cái nhập viện vì áp lực thi lớp 10.*
  https://vnexpress.net/cha-me-sut-can-con-cai-nhap-vien-vi-ap-luc-thi-lop-10-5072373.html
- Thông tư 19/2019/TT-BGDĐT — xử lí vi phạm, tinh thần phi trừng phạt.
- Sleep Foundation — giấc ngủ trước kỳ thi.