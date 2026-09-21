---
id: psy-410
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "Hattie & Timperley (2007) — context-fit feedback; Lazarus & Folkman (1984); Goldin (2020) — thời điểm & không gian phù hợp; tài liệu tổng hợp về personalize feedback (ví dụ Kluger & DeNisi 1996)."
tags: [loi-khuyen, dung-tinh-huong, context-fit, ket-hop, nhan-dien-kep]
---

# Lời khuyên "đúng tình huống" — nguyên lý khớp ngữ cảnh (Context-fit)

## Mục đích
Trình bày nguyên lý cốt lõi khiến lời khuyên của EduChoice-AI khác lời khô khan trong sách:
một thông điệp **chỉ có ý nghĩa khi khớp ngữ cảnh**. Giải thích phép tổ hợp 4 chiều
(outcome × construct × timeOfDay × dayType) và cách chọn entry tối ưu.

## Kiến thức cốt lõi
### Vì sao "câu nào cũng đúng" lại vô dụng
Phản hồi chung chung vừa thiếu thông tin để cải thiện (Hattie: mức task không đủ) vừa bị bộ não
gắn cờ "nhiễu" và bỏ qua. Cùng một học sinh, cùng bài, nhưng:
- lời khuyên sau **success** và sau **abandoned** phải hoàn toàn khác;
- lời khuyên lúc **23h** và lúc **9h sáng** phải khác;
- lời khuyên cho kỹ năng **Giao tiếp** và kỹ năng **Quản lý thời gian** phải khác.

### Bài toán mẫu: cùng học sinh, cùng kết quả, khác ngữ cảnh
Học sinh hoàn thành thử thách Tình huống ưu tiên (Prioritization) với kết quả `partial`:
| Ngữ cảnh | Lời khuyên nhận được | Lý do |
|---|---|---|
| 9h sáng, thứ Ba | Xếp việc quan trọng làm trước, hard tasks vào buổi em tỉnh | Buổi sáng, weekday → tập chiến lược + khung giờ |
| 22h30, thứ Bảy | Dừng lại; ngủ sớm; mai xếp lại — đừng ép khuya | lateNight lo âu/alert + weekend phục hồi |
| 9h sáng, tuần thi | Ôn bằng retrieval, không học mới nặng | examWeek → ưu tiên ôn và giấc ngủ |
Cùng "partial", cùng kỹ năng, nhưng lời khuyên khác nhau vì ngữ cảnh khác — đó là context-fit.

### Cách tính điểm chọn entry (minh họa)
Mỗi entry trong catalog được chấm điểm độ khớp:
- Khớp outcome = bắt buộc +100.
- Khớp construct cụ thể = +40.
- Khớp timeOfDay = +25 (thêm +10 nếu cùng lúc khớp dayType).
- Khớp dayType = +25 (thêm +10 nếu cùng lúc khớp timeOfDay).
- Khớp cả construct + time/day = +15 nữa.
Entry dùng nhiều khía cạnh khớp nhất → đúng tình huống nhất.

### Thứ tự ưu tiên khi "không trúng hết"
Không phải lúc nào cũng có entry khớp toàn bộ. Thứ tự hạ dần:
1. Khớp outcome + construct + thời gian + ngày (lý tưởng).
2. Khớp outcome + construct (đúng kỹ năng, đúng kết quả).
3. Khớp outcome nhưng không có construct cụ thể (general) — vẫn đúng trạng thái tâm lý.
4. Fallback duy nhất (rất hiếm gặp) — thông điệp an toàn chung.
Điều này đảm bảo **không bao giờ hiện lời khuyên lệch trạng thái**.

### "Cửa sổ thời điểm áp dụng"
Kiến thức tâm lý học lứa tuổi thường không có độ chính xác thời gian chặt chẽ; chúng ta chỉ áp
ngưỡng giờ quy ước (5/11/17/22h). Vì vậy file này lưu ý: ngưỡng giờ là **hướng dẫn sư phạm**, nên
điều chỉnh linh hoạt theo nhịp thực của học sinh (peakHour) thay vì cứng nhắc.

## Vận dụng thực tiễn
- Bảng tính điểm ở trên được cài trong `scoreEntry` của `adviceEngine.ts`.
- Khi thêm entry mới vào catalog, hãy đọc code hue: "entry này khớp được những chiều nào?" để
  chọn đúng tập con `adviceCatalog.ts` sắp theo outcome.
- Test nhanh bằng niệm câu hỏi: "Lời khuyên này đổi ý nghĩa nếu biết nó đang được kể lúc (giờ) nào,
  ngày nào, kết quả nào không?" — nếu không đổi thì chưa đủ context-fit.

### Kịch bản ví dụ: entry khớp toàn bộ 4 chiều
Bối cảnh: học sinh `partial` kỹ năng Planning, 22h, cuối tuần.
1. Outcome=partial → bắt buộc (100 điểm).
2. construct=Planning → khớp (+40).
3. timeOfDay=lateNight → có entry lateNight/partial? Nếu có:
   - khớp timeOfDay (+25).
   - entry vừa khớp construct vừa khớp timeOfDay (+15).
4. dayType=weekend → nếu entry đó cũng khớp (+10; phần thời gian dayType kèm).
→ Entry Planning/partial/lateNight/weekend (nếu tồn tại) thắng tuyệt đối; nếu chưa có, engine
hạ dần xuống Planning/partial rồi general/partial. Đây chính là bậc thang ưu tiên 4 cấp đã mô tả.

## Câu hỏi ôn tập
1. Bốn chiều ngữ cảnh của lời khuyên? (Đáp án: outcome × construct × timeOfDay × dayType.)
2. Vì sao lời khuyên chung chung bị não bộ bỏ qua? (Đáp án: thiếu thông tin cải thiện (HL) và bị
   gắn cờ nhiễu — lọc bỏ.)
3. Thứ tự ưu tiên khi entry không khớp toàn bộ? (Đáp án: outcome+construct+thời+ngày → outcome+
   construct → general theo outcome → fallback.)
4. Ngưỡng giờ 5/11/17/22 có phải luật cứng không? (Đáp án: không — hướng dẫn sư phạm, nên điều
   chỉnh theo nhịp thực của học sinh.)
5. Câu hỏi tự kiểm để biết entry có đủ context-fit không? (Đáp án: ý nghĩa của entry có đổi theo
   giờ/ngày/kết quả không — không đổi thì chưa đủ.)

## Liên hệ với EduChoice-AI
- Code: `scoreEntry` + `adviceForAfterTask` trong `src/utils/adviceEngine.ts`.
- Dữ liệu: `src/data/adviceCatalog.ts` × nhóm entry cho từng outcome/construct/time/day.
- Nguyên lý liên đới chung của sản phẩm: cá nhân hóa theo hồ sơ (20 construct + wellness + lịch
  sinh hoạt).

## Căn cứ lý thuyết (nguồn thật)
- Hattie, J., & Timperley, H. (2007). *The Power of Feedback.* Review of Educational Research
  77(1), 81–112.
- Kluger, A. N., & DeNisi, A. (1996). *The effects of feedback interventions on performance: A
  historical review, a meta-analysis, and a preliminary feedback intervention theory.* Psychological
  Bulletin 119(2), 254–284.
- Lazarus, R. S., & Folkman, S. (1984). *Stress, Appraisal, and Coping.* Springer.
- Goldin, A. P., et al. (2020). *Interplay of chronotype and school timing...* Nature Human
  Behaviour 4, 397–405.