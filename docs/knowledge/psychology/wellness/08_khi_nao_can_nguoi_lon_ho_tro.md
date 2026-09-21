---
id: psy-308
category: wellness
target_age: "11-15"
source: "computeWellness (src/utils/studentAnalytics.ts) quy trình L6_HUMAN_SUPPORT (PSYCHOLOGY_SUPPORT_BENCHMARK.md); WHO adolescent mental health; UNICEF 2021"
tags: [nguoi-lon, ho-tro, canh-bao, soi-tu-tu, bao-ve]
---

# Khi nào cần người lớn có trách nhiệm hỗ trợ (Escalation & Safety)

## Nguyên tắc nền tảng
EduChoice-AI là công cụ **giáo dục tâm lý**, KHÔNG phải dịch vụ chẩn đoán hay trị liệu lâm sàng. Khi xuất hiện dấu hiệu rủi ro cao, việc đúng đắn là **chuyển quy trình đến người lớn có trách nhiệm** (cha mẹ, giáo viên, cán bộ y tế học đường, đường dây hỗ trợ chuyên môn) — giống bậc thang `MinimumEffectiveIntervention` kết thúc ở mức `L6_HUMAN_SUPPORT`.

## Dấu hiệu cần chuyển ngay (không trì hoãn)
1. **Nói về tự làm hại hoặc ý định tự tử** (trực tiếp hay gián tiếp: "không muốn sống nữa", "thà biến mất").
2. **Buồn/Khóc/tuyệt vọng kéo dài hơn 2 tuần**, kèm mất hứng thú, suy giảm ăn-ngủ-ở.
3. **Tự làm đau bản thân** (rạch tay, đập đầu...) — dưới mọi hình thức.
4. **Bị bạo lực, đe dọa, bắt nạt nghiêm trọng, xâm hại** trong hoặc ngoài trường.
5. Lo âu/hoảng sợ kịch liệt không kiểm soát được, tách biệt hoàn toàn khỏi trường c/hoạt động.

## Quy trình xử lý trong hệ thống
- **Trạng thái red** (computeWellness) → thông báo thấu cảm: "Vừa qua có khá nhiều dấu hiệu mệt mỏi. Em hãy dành chút thời gian nghỉ ngơi, nói chuyện với bố mẹ hoặc thầy cô, và nhớ rằng được nhờ giúp đỡ là một việc thông minh." — khuyến khích nhờ giúp, không phán xét.
- **Dấu hiệu rủi ro cao** → kích hoạt kênh `L6_HUMAN_SUPPORT` (benchmark hiện chưa có quy trình vận hành đầy đủ — đây là khoảng trống cần bổ sung): hướng dẫn học sinh nói với người lớn tin cậy; thông báo cho đơn vị vận hành; theo dõi tiếp theo.
- **Tuyệt đối không** giao việc "tự xử lý theo kỹ năng" cho học sinh trong các tình huống nguy hiểm.

## Tông giọng khuyến nghị
- Không hoảng loạn, không trách móc, không đếm ngược thời gian quá cứng nhắc.
- Dùng ngôn ngữ bình thường hóa: "Nhiều bạn ở tuổi này có những cảm xúc rất khó khăn. Việc nói với người lớn tin cậy là điều đúng đắn nhất em có thể làm."
- Cung cấp danh bạ tin cậy khi có thể: cha mẹ, thầy cô chủ nhiệm, tổng đài tâm lý/trợ giúp trẻ em Việt Nam (cập nhật theo từng thời điểm, cần xác minh trước khi in ấn).

## Phạm vi và giới hạn
- Sản phẩm không thay thế chuyên gia tâm lý học đường hay dịch vụ y tế.
- Không dùng các thuật ngữ chẩn đoán (trầm cảm lâm sàng, rối loạn...) về học sinh.
- Toàn bộ hồ sơ cần tuân thủ quyền riêng tư, chỉ trao đổi với người có trách nhiệm hợp pháp.

## Căn cứ lý thuyết (nguồn thật)
- WHO. *Adolescent mental health.* Fact sheet.
- UNICEF (2021). *The State of the World's Children 2021 — On My Mind.*
- `computeWellness` — `src/utils/studentAnalytics.ts`; `MinimumEffectiveIntervention` & `L6_HUMAN_SUPPORT` — `docs/PSYCHOLOGY_SUPPORT_BENCHMARK.md`.