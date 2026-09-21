---
id: psy-208
category: toolkit
target_age: "11-15"
source: "Gross (1998) Review of General Psychology; Brown & Gerbarg (2005) 'Sudarshan Kriya Yogic breathing' (Medical Hypotheses); Tolin, Frost & Steketee — sensory anchoring adaptation; APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.2.0)"
tags: [dieu-hoa-cam-xuc, ho-tho-4-4-4, box-breathing, 5-4-3-2-1, ha-nhiet]
---

# Toolkit: Tự điều hòa cảm xúc (Self-Regulation)

## Vai trò trong hệ thống
Toolkit chuẩn (id `self_regulation`, version 1.2.0) giúp hạ nhiệt phản ứng căng thẳng của **hệ thần kinh giao cảm** trước khi đưa ra quyết định hành vi. Được gợi ý khi phát hiện kích thích cảm xúc mạnh: nổi nóng, hồi hộp trước kiểm tra, bực bội khi thua.

## Thông tin căn bản
- **Độ tuổi**: 10-18.
- **Mục đích**: chủ quản phản ứng sinh lý; tạo cửa sổ nhận thức để chọn hành vi phù hợp.
- **Kịch bản điển hình**: nổi nóng khi bị trêu chọc; tim đập nhanh trước giờ kiểm tra; muốn đập bàn phím khi thua game.

## Cơ chế chính
### Hơi thở 4-4-4 (Box Breathing)
" Hít sâu bằng mũi 4 giây, giữ 4 giây, thở chậm qua miệng 4 giây" — làm chậm nhịp hô hấp, kích hoạt dây thần kinh phế vị, giảm phản ứng giao cảm.
### Kỹ thuật neo giác quan 5-4-3-2-1
"Kể tên 5 điều em nhìn thấy, 4 thứ em nghe, 3 thứ em chạm được, 2 thứ em ngửi, 1 thứ em nếm" — đưa chú ý về hiện tại, thoát khỏi vòng lo lắng.

## Vi can thiệp
- "Hít sâu bằng mũi trong 4 giây, giữ 4 giây, thở chậm qua miệng trong 4 giây."
- "Kể 5-4-3-2-1 theo giác quan ngay bây giờ."

## Cụm từ an toàn
- "Cảm xúc của em hoàn toàn hợp lệ, hãy cho cơ thể một vài giây để lắng dịu lại."

## Cụm từ cần tránh
- "Bình tĩnh lại ngay đi!" (ép buộc → tăng phản kháng)

## Chống chỉ định
Không ép học sinh nén cảm xúc tiêu cực một cách gượng ép (suppression). Điều hòa ≠ cấm biểu hiện; ưu tiên thừa nhận rồi hạ nhiệt.

## Gắn với khung năng lực
- Construct: SelfRegulation, AttentionControl.
- Liên quan: ConsequencePrediction, DistractionRecovery.
- Sự kiện: pause, micro_action_started/completed, choice_made sau hạ nhiệt.

## Hướng dẫn triển khai
1. Phát hiện dấu hiệu kích thích cảm xúc (hành vi nóng vội, từ ngữ mạnh).
2. Chặn quyết định ngay lập tức, mời thực hành thở 1 hiệp 4-4-4.
3. Sau khi hạ nhiệt, hỏi lại quyết định (so sánh với quyết định ban đầu).
4. Lưu lại thời điểm hạ nhiệt thành công như tín hiệu dương của SelfRegulation.
5. Không kiểm soát "kết quả": công nhận nỗ lực điều tiết bất kể quyết định cuối.

## Căn cứ lý thuyết (nguồn thật)
- Gross, J. J. (1998). *The emerging field of emotion regulation: An integrative review.* Review of General Psychology, 2(3), 271-299.
- Brown, R. P., & Gerbarg, P. L. (2005). *Sudarshan Kriya yogic breathing in the treatment of stress, anxiety, and depression.* Medical Hypotheses, 64(6), 1129-1137.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `self_regulation`).