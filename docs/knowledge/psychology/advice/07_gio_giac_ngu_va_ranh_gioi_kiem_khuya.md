---
id: psy-407
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "Sleep Foundation — teens 8-10 giờ/đêm; Carskadon (2011); Jenni & Carskadon — thiếu ngủ và kết quả; Goldin (2020) Nat Hum Behav."
tags: [loi-khuyen, giac-ngu, demo-khuya, suc-khoe, late-night]
---

# Giấc ngủ thiếu niên & ranh giới "học khuya" (Sleep & Late-Night Boundary)

## Mục đích
Cung cấp cơ sở cho các lời khuyên `lateNight` có tone cảnh báo: vì sao hệ thống khuyên **dừng học
sau 22h** thay vì khích lệ học thêm — nhất là khi học sinh đã `struggled`/`abandoned`.

## Tóm tắt nhanh
- Teen cần 8–10 giờ/đêm; giấc ngủ là lúc củng cố trí nhớ.
- Khuya: hiệu quả học thấp + rủi ro tâm lý cao → ưu tiên ngủ.
- Hai thói quen xấu chính: màn hình trong giường và giờ ngủ thất thường cuối tuần (jetlag xã hội).

## Kiến thức cốt lõi
### Nhu cầu ngủ của thiếu niên
Khuyến nghị chuẩn (Sleep Foundation / CDC): teen 13–18 tuổi ngủ **8–10 giờ** mỗi đêm. Khi dậy
thì, giai đoạn ngủ chuyển muộn (đã mô tả ở psy-406) làm nhiều em ngủ trễ nhưng vẫn phải dậy sớm
đi học → tích lũy thiếu ngủ mạn tính (debt sleep).

### Hệ quả của học khuya
- Giảm ghi nhớ: giấc ngủ là lúc **củng cố trí nhớ** (consolidation); học khuya thay vì ngủ đủ thì
  kiến thức khó "chuyển vào lâu dài".
- Sáng hôm sau mệt → khó tập trung trên lớp → học "bù" kém → vòng xoáy thiếu ngủ.
- Cảm xúc nhạy cảm hơn, dễ nổi cáu với bạn bè/gia đình — tăng rủi ro tự trách sau thất bại.
- Nhìn theo lời khuyên: đêm khuya là thời điểm **hiệu quả học thấp nhất** trong khi cộng hưởng
  rủi ro tâm lý cao nhất.

### Ranh giới đúng của lời khuyên
- Sau 22h nếu học sinh đã gặp khó nhiều hoặc bỏ ngang: ưu tiên **đi ngủ ngay**, không tiếp tục cày.
- Sau 22h nhưng khỏe và vui vẻ (morning-type, đã ngủ trưa đủ...): lời khuyên nhẹ — "nếu em còn
  khỏe thì được, nhưng hôm sau xếp giờ. Và đừng biến khuya thành thói quen" (trao lựa chọn,
  không cấm đoán gia trưởng).
- Không bao giờ đưa nhiệm vụ khó mới vào giờ khuya (kể cả với học sinh giỏi).

### Bảng hướng xử lí theo trạng thái khi đã khuya
| Trạng thái học sinh lúc ≥22h | Thông điệp | Tone | Diễn giải |
|---|---|---|---|
| Chật vật/bỏ ngang | "Dừng ngay, đi ngủ. Ngủ đủ là chiến thuật học tốt nhất." | alert | Bảo vệ giấc ngủ > cố hoàn thành. |
| Hoàn thành khá/kém | "Nếu em còn khỏe, kết thúc bằng ôn nhẹ, rồi tắt màn hình." | warm | Không mở nhiệm vụ mới. |
| Khỏe, đang hứng thú | "Trao chọn: làm tiếp việc nhỏ THIS HOUR hoặc dừng ngủ. Đừng biến khuya thành lề." | growth | Tự chủ, không cấm đoán. |

### Vệ sinh giấc ngủ (sleep hygiene) nhúng trong micro-action
Các micro-action ở catalog giờ khuya tập trung vào: tắt màn hình trước khi ngủ, cất điện thoại ra
khỏi giường, đặt giờ ngủ cố định, tránh caffeine/đồ uống kích thích buổi tối. Với học sinh THCS,
hai thói quen có ảnh hưởng lớn nhất là **màn hình trong giường** và **giờ ngủ thất thường cuối
tuần** (social jetlag).

> ⚠️ CẦN XÁC MINH: giới hạn "sau 22h cấm việc khó" là ngưỡng quy ước sư phạm của dự án, không
phải con số luật định từ một nghiên cứu duy nhất — chỉ nên dẫn theo giấc ngủ khuyến nghị và
hiệu quả học thấp.

## Vận dụng thực tiễn
- Entry `lateNight` trong catalog dùng `tone: 'alert'` (nền đỏ) và thông điệp rõ: "Đi ngủ ngay;
  ngủ đủ giấc chính là chiến thuật học tốt nhất."
- Micro-action khuya luôn hướng tới vệ sinh giấc ngủ: tắt màn hình trước khi ngủ, cất điện thoại,
  đặt báo thức ngủ cố định.
- ASTRA chủ đề `balance` nhắc "Đang ít hơn mục tiêu: Ngủ" khi lịch thực tế < mục tiêu.

### Kịch bản ví dụ 23h, học sinh bỏ ngang thử thách
| Bước | Hệ thống làm | Lý do |
|---|---|---|
| 1. Phát hiện | TimeOfDay = lateNight (≥22h), ended với bỏ ngang | Ngữ cảnh khuya |
| 2. Chọn entry | Entry lateNight/abandoned, tone alert | Ưu tiên ngủ, không thêm việc |
| 3. Hiển thị | "Em dừng đúng lúc trước khi quá muộn... Ngủ sớm là quyết định thông minh." | Không trách, dừng càng sớm càng tốt |
| 4. Micro-action | "Đặt báo thức ngủ và tắt màn hình ngay bây giờ." | Hành vi cụ thể 1 bước |
| 5. (Tùy) | Nếu bỏ ngang nhiều lần → chuyển khuyến nghị người lớn (wellness/08) | Bảo vệ sức khỏe |

## Câu hỏi ôn tập
1. Nhu cầu ngủ khuyến nghị của teen? (Đáp án: 8–10 giờ/đêm.)
2. Vai trò của giấc ngủ với trí nhớ? (Đáp án: củng cố/consolidation — kiến thức chuyển vào trí
   nhớ dài hạn trong lúc ngủ.)
3. Học khuya về tâm lý có mặt hại gì ngoài mệt? (Đáp án: cảm xúc nhạy cảm, dễ cáu, tăng tự trách
   khi thất bại, giảm hiệu quả ngày sau.)
4. Khi `struggled` và đã khuya, hệ thống khuyên gì? (Đáp án: dừng và ngủ; không thêm công việc — ưu
   tiên phục hồi.)
5. Vì sao lời khuyên khuya dùng tone alert thay vì khích lệ "cố lên"? (Đáp án: tránh tạo áp lực
   cày thêm; bảo vệ giấc ngủ là ưu tiên tâm lý và sinh lý.)

## Liên hệ với EduChoice-AI
- Construct: HealthyRoutine, SelfRegulation, AttentionControl, TimeManagement.
- Code: entry `timeOfDay: 'lateNight'` trong `adviceCatalog.ts`; phân loại `classifyTimeOfDay`
  trong `adviceEngine.ts`; `computeWellness` đếm hoạt động theo giờ.
- Ranh giới đạo đức: không khuyến khích làm việc khuya dưới bất kỳ dạng gamification nào.

## Căn cứ lý thuyết (nguồn thật)
- Sleep Foundation. *Teens and Sleep.* sleepfoundation.org/teens-and-sleep
- Carskadon, M. A. (2011). *Sleep in adolescents: the perfect storm.* Pediatric Clinics of North
  America 58(3), 637–647.
- Goldin, A. P., et al. (2020). *Interplay of chronotype and school timing...* Nature Human Behaviour
  4, 397–405.
- CDC — sleep recommendations (riêng cho thiếu niên 13–18).