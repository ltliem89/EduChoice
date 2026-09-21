---
id: psy-412
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "Mueller & Dweck (1998) — lời khen lặp; Blackwell (2007) — thay đổi theo thời gian; SDT (2009) — động lực nội tại bền; báo cáo về personalization (tài liệu tổng hợp)."
tags: [loi-khuyen, theo-thoi-gian, xoay-vong, ca-nhan-hoa, phat-trien]
---

# Mở rộng theo thời gian & xoay vòng lời khuyên (Development & Diversity)

## Mục đích
Giải thích hai cơ chế giúp hệ thống lời khuyên "sống" qua nhiều ngày dùng: (1) **không lặp lại
một câu** — xoay vòng deterministic theo ngày; (2) **theo dõi sự phát triển** — thay đổi gợi ý khi
kỹ năng học sinh tiến bộ hoặc tụt.

## Tóm tắt nhanh
- Xoay vòng: seed theo (ngày + outcome + construct) — đổi ngày thì đổi câu, trong ngày ổn định.
- `seenIds`: né entry vừa xem, tăng đa dạng trong chuỗi phiên.
- Cá nhân hóa (theo hồ sơ, đổi chậm) bổ trợ xoay vòng (theo ngày, đổi nhanh).
- Tụt dốc từ dữ liệu thật (wellness red / bỏ ngang nhiều) → lời khuyên nhường chỗ cho nghỉ + người lớn.

## Kiến thức cốt lõi
### Vì sao phải xoay vòng, không khóa một câu
- Học sinh dùng app nhiều ngày: nếu backend cứ trả cùng 1 lời khuyên/success, não bộ tự tắt ngấm
  (habituation). Xoay vòng giữ sự mới mẻ và tăng cơ hội **một thông điệp "chạm đúng"** vào một
  ngày em sẵn sàng tiếp thu.
- Müller, Dweck và các nghiên cứu phản hồi nhấn mạnh **tính cụ thể + hay đổi dạng** mới giữ hiệu
  quả của lời khen (khen cứng lại thành "tự động hóa" vô nghĩa chỉ sau vài lần cụ thể).

### Xoay vòng làm thế nào cho ổn định (deterministic)
Dùng seed tính từ (năm, tháng, ngày, outcome, construct) để xáo thứ tự các entry ứng viên **mỗi
ngày khác nhau nhưng đồng nhất trong cùng ngày**. Tránh randomness thuần theo device vì dễ lặp
hoặc bứt ngược trong phiên thi của cùng một học sinh.

### Theo dõi sự phát triển — các giai đoạn
1. **Mới bắt đầu**: thiên lời khuyên xây nền (chia nhỏ, đề xuất hỏi giáo viên).
2. **Đang tiến bộ**: lời khuyên thử thách hướng cao (đổi chiến lược, câu hỏi nâng cấp).
3. **Đã thành thói quen**: lời khuyên chuyển sang self-regulation ("câu hỏi tự kiểm trước khi
   làm").
4. **Cảnh báo tụt dốc**: wellness red-tier hoặc bỏ ngang nhiều → discussion người lớn thay vì
   tiếp tục thêm việc.

### Ví dụ cùng outcome success qua các giai đoạn
| Giai đoạn | Lời khuyên điển hình | Micro-action |
|---|---|---|
| Mới bắt đầu | "Em đã bắt đầu và hoàn thành — đây là nền tảng." | Lập kế hoạch 3 bước |
| Đang tiến bộ | "Em đã đổi chiến lược khi thấy khó — giỏi lắm." | Ghi lại chiến lược đã đổi |
| Thành thói quen | "Giờ em tự đặt câu hỏi trước khi quyết định chứ?" | Tự kiểm 1 câu hỏi |

### So sánh 2 cơ chế: cá nhân hóa theo hồ sơ vs xoay vòng theo ngày
| Cơ chế | Nguồn dữ liệu | Tần suất thay đổi | Mục đích |
|---|---|---|---|
| Cá nhân hóa | construct scores, growthHistory, peakHour | Thay đổi chậm (tuần) | Đúng năng lực của từng em |
| Xoay vòng | ngày + outcome + construct (seed) | Thay đổi mỗi ngày | Đa dạng, chống nhàm |
Hai cơ chế bổ sung nhau: xoay vòng làm entry khác nhau, cá nhân hóa và outcome làm **nhóm** entry
khác nhau.

### Đo sự phát triển bằng dữ liệu thật
Không dựa "tâm trạng tự khai". Sử dụng: construct score từ `studentModel.constructs`, số phiên,
`growthHistory` delta, tỉ lệ hoàn thành/retry, `peakHour` (nhịp). Lời khuyên sau mỗi phiên dùng
chính `completionRate` thật của phiên để suy outcome (đã minh chứng ở GameRuntime).

## Vận dụng thực tiễn
- `adviceForAfterTask` nhận `seenIds` để né entry vừa xem gần đây trong cùng phiên/chuỗi phiên —
  tăng đa dạng.
- Seed hằng ngày đảm bảo "cùng học sinh, cùng kết quả nhưng ngày khác nhau → câu khác nhau".
- Gợi ý mở rộng: lưu lịch sử id lời khuyên đã xem vào hồ sơ để tuần sau tránh lặp toàn bộ; thêm
  ngữ cảnh examWeek khi hệ thống có lịch thi.

## Câu hỏi ôn tập
1. Vì sao không khóa một câu lời khuyên duy nhất? (Đáp án: giảm nhàm, tránh habituation, tăng
   cơ hội thông điệp "chạm đúng" vào thời điểm sẵn sàng.)
2. Seed xoay vòng tính từ đâu? (Đáp án: ngày (năm, tháng, ngày) + outcome + construct — ổn định
   trong ngày, khác nhau qua ngày.)
3. Bốn giai đoạn phát triển của học sinh theo hệ lời khuyên? (Đáp án: mới bắt đầu → đang tiến bộ →
   thành thói quen → cảnh báo tụt dốc.)
4. Làm thế nào nhận biết "tụt dốc" để chuyển sang người lớn? (Đáp án: wellness red-level, bỏ
   ngang nhiều lần liên tiếp, dấu hiệu tổn thương — leo thang wellness/08.)
5. `seenIds` dùng để làm gì trong engine? (Đáp án: né các entry đã xem gần đây, tăng đa dạng
   trong cùng chuỗi phiên.)

## Liên hệ với EduChoice-AI
- Code: `adviceEngine.ts` (`daySeed`, `seenIds`, `adviceForAfterTask`);
  `adviceCatalog.ts` (dữ liệu); `studentAnalytics.ts` (outcome thật từ completionRate, growth).
- Construct: Reflection, GoalSetting, SelfRegulation, Persistence.
- Tham chiếu: `reliability/01_audit_runtime_scoring.md` (lý do phải dùng completionRate thật).

## Căn cứ lý thuyết (nguồn thật)
- Müller, C. M., & Dweck, C. S. (1998). *Praise for intelligence can undermine children’s
  motivation...* JPSP 75(1), 33–52.
- Blackwell, L. S., et al. (2007). *Implicit Theories of Intelligence Predict Achievement Across an
  Adolescent Transition.* Child Development 78(1), 246–263.
- Niemiec, C. P., & Ryan, R. M. (2009). *Autonomy, competence, and relatedness in the classroom.*
  Theory & Research in Education 7(2), 133–158.
- Kluger, A. N., & DeNisi, A. (1996). *The effects of feedback interventions...* Psychological
  Bulletin 119(2), 254–284.