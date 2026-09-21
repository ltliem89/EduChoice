---
id: psy-301
category: wellness
target_age: "11-15"
source: "WHO (2021) Adolescent mental health fact sheet; UNICEF (2021) The State of the World's Children 2021 — On My Mind; computeWellness (src/utils/studentAnalytics.ts)"
tags: [suc-khoe-tam-ly, wellness, tinh-than, tong-quan, cham-soc-ban-than]
---

# Sức khỏe tâm lý học sinh THCS: tổng quan (Wellness)

## Mục đích của mục wellness trong hệ thống
Khu "Wellness" không đo lường bệnh lý mà đánh giá trạng thái tinh thần dựa trên hành vi trong sản phẩm: thử thách bỏ ngang, tỉ lệ hoàn thành, số lần thử lại, mức độ phản tư. Hệ thống trả về 3 trạng thái (khớp `computeWellness` trong code):
- **green – Tinh thần ổn định**: gần đây chưa phát hiện dấu hiệu căng thẳng bất thường.
- **yellow – Nên nghỉ ngơi thêm**: có tín hiệu căng thẳng nhẹ (bỏ ngang, thử lại nhiều).
- **red – Cần được quan tâm**: nhiều dấu hiệu mệt mỏi (≥3 lần bỏ ngang, hoặc ≥2 bỏ ngang + 0 hoàn thành trong cửa sổ 48 giờ).

## Ý nghĩa đối với học sinh
- Được "đọc" bằng dữ liệu hành vi thay vì phán xét: hệ thống nhận ra mệt mỏi trước khi học sinh tự nhận ra.
- Thông điệp có tông an ủi, định hướng hành động (nghỉ, nói chuyện với người lớn), không dọa dẫm.
- Trạng thái có thể thay đổi theo thời gian: wellness là "nhiệt kế" tạm thời, không phải nhãn dán.

## Các yếu tố sức khỏe tâm lý cần quan tâm ở THCS
1. Căng thẳng học tập, thi cử (xem wellness/02).
2. Lo âu và sợ hãi (xem wellness/03).
3. Giấc ngủ và nhịp sinh học (xem wellness/04).
4. Sử dụng màn hình, game (xem wellness/05).
5. Quan hệ bạn bè, bắt nạt (xem wellness/06).
6. Giao tiếp trong gia đình (xem wellness/07).

## Nguyên tắc bảo mật và đạo đức
- Sản phẩm mang tính **giáo dục tâm lý (psychoeducational)**, không chẩn đoán lâm sàng.
- Không gắn nhãn triệu chứng cho học sinh; diễn đạt bằng "dấu hiệu mệt mỏi/tinh thần" thông thường.
- Khi phát hiện dấu hiệu nghiêm trọng → chuyển luồng đến người lớn có trách nhiệm (xem wellness/08).

## Dấu hiệu cần người lớn (không thay thế chuyên môn)
- Không học sinh nào bị bỏ lại trong trạng thái đỏ mà không được hướng dẫn nhờ người lớn phù hợp.
- Kể cả ở trạng thái vàng, khuyến khích nghỉ ngơi, nói chuyện cùng bố mẹ/thầy cô (đúng thông điệp computeWellness: "được nhờ giúp đỡ là một việc thông minh").

## Căn cứ lý thuyết (nguồn thật)
- WHO. *Adolescent mental health.* Fact sheet. https://apps.who.int/... (adolescent mental health)
- UNICEF (2021). *The State of the World's Children 2021 — On My Mind.* https://www.unicef.org/reports/state-worlds-children-2021
- `computeWellness` — `src/utils/studentAnalytics.ts` (logic 3 mức green/yellow/red, thông điệp tiếng Việt).