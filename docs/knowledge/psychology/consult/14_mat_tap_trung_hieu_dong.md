---
id: psy-sit-14
category: consult
target_age: "11-18"
source: "STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md §50,§23; WHO 2025; development/07"
tags: [tư-vấn-nhanh, mất-tập-trung, adhd-canh-bao, không-suy-diễn]
---

# Quick Consultation Card — Mất tập trung / hiếu động (chống suy diễn ADHD)

> ⚠️ "Hay nghịch ≠ ADHD", "điểm thấp ≠ rối loạn" (§50). Chỉ quan sát, tìm hiểu, không gán nhãn.

## situation
```yaml
situation:
  id: "student-psych-014"
  domain: "school"
  topic: "attention-concentration"
  ageRange: "11-18"
  context: ["school", "home"]
```

## observable_signs
```yaml
observable_signs:
  - khó duy trì chú ý bài dài, dễ phân tâm bởi bạn/âm thanh
  - bâng quơ, quên bài, mất dụng cụ
  - ngồi không yên, nghịch liên tục
  - phản ứng hấp tấp, không chờ lượt
  - KHÁC BIỆT quan trọng: có ở NHIỀU bối cảnh (lớp + nhà + hoạt động khác) và KÉO DÀI + ẢNH HƯỞNG CHỨC NĂNG
```

## possible_explanations
```yaml
possible_explanations:
  - thiếu ngủ, mệt mỏi (phổ biến) — kiểm tra giấc ngủ trước (card 18)
  - bài không phù hợp độ khó (quá khó/quá dễ)
  - môi trường lớp nhiều kích thích, chỗ ngồi không phù hợp
  - lo âu, khí sắc thấp chiếm chỗ trí nhớ làm việc
  - áp lực gia đình, nội dung khác đang bận tâm
  - vấn đề phát triển (chú ý của THCS chưa bền như người lớn)
  - MỘT SỐ: có thể liên quan tình trạng thần kinh phát triển → NHƯNG phải chuyên môn đánh giá, KHÔNG suy diễn từ vài dấu hiệu
```

## questions
```yaml
questions:
  - "Em ngủ mấy giờ mỗi đêm?"
  - "Môn nào em dễ tập trung nhất, vì sao?"
  - "Chỗ ngồi ở lớp như thế nào, có dễ bị phân tâm không?"
  - "Gần đây có chuyện gì làm em bận tâm không?"
  - "Học sinh tự thấy cải thiện khi nào không?"
```

## first_response
```yaml
first_response:
  - ưu tiên kiểm tra giấc ngủ, caffein, thiết bị trước ngủ
  - điều chỉnh môi trường: chỗ ngồi, chia nhỏ phiếu bài (toolkits/05)
  - phân chia nhiệm vụ thành đoạn ngắn (toolkits/03)
  - phản hồi ngắn, cụ thể, không la mắng trước lớp
  - theo dõi duration/frequency/intensity/context/functional impact (§50) trước khi kết luận
```

## avoid
```yaml
avoid:
  - gán "ADHD" / "chậm hiểu" / "cá biệt"
  - đánh giá chỉ qua 1-2 buổi
  - choáng chỗ, nhục hình
  - kết luận "do nghiện điện thoại"
```

## protective_factors
```yaml
protective_factors:
  - giấc ngủ đủ + vận động
  - môi trường học có cấu trúc, ít kích thích
  - giáo viên kiên nhẫn, phản hồi cụ thể
  - sở thích mạnh (game/vẽ/đọc...) để luyện tập trung được
  - gia đình phối hợp nhịp sinh hoạt
```

## monitoring
```yaml
monitoring:
  - behavior log: bối cảnh, thời lượng tập trung, giờ ngủ
  - mốc đánh giá sau 2 tuần điều chỉnh môi trường + ngủ
  - nếu dấu hiệu kéo dài >6 tháng + nhiều bối cảnh + ảnh hưởng rõ → đề nghị đánh giá chuyên môn (không tự kết luận)
```

## referral
```yaml
referral:
  - dấu hiệu dai dẳng, lan tỏa nhiều bối cảnh, ảnh hưởng chức năng rõ → chuyên môn tâm lý/y tế đánh giá
  - kèm trốn học, tự hại, lo âu nặng
```

## emergency
```yaml
emergency: "Chỉ chuyển khẩn cấp nếu kèm nguy cơ an toàn (tự hại/bạo lực). Tất cả các trường hợp còn lại theo dõi có hệ thống."
```

## safetyLevel / evidence / version
```yaml
safetyLevel: "green"
evidence:
  - source: WHO
    title: Mental health of adolescents
    year: 2025
    claim: "Việc tự chẩn đoán từ vài biểu hiện đơn lẻ cần tránh; đánh giá của chuyên môn là cần thiết."
    population: "10-19"
    region: "global"
version: "2.0.0"
reviewDate: "2026-09-21"
```

## Căn cứ lý thuyết (nguồn thật)
- Spec OS V2 §50, §24, §26.
- WHO (2025). *Mental health of adolescents.* — who.int.
- Kế thừa `development/07` (trí nhớ chú ý học tập), `constructs/05` (Attention Control), `toolkits/05`.