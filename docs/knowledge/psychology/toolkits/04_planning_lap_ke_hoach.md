---
id: psy-204
category: toolkit
target_age: "11-15"
source: "Gollwitzer (1999) American Psychologist (implementation intentions); APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.1.0)"
tags: [lap-ke-hoach, implementation-intentions, neu-thi, phuong-an-du-phong, ke-hoach-hanh-dong]
---

# Toolkit: Lập kế hoạch hành động (Planning)

## Vai trò trong hệ thống
Toolkit chuẩn (id `planning`, version 1.1.0) chuyển hóa mục tiêu thành **chuỗi hành động cụ thể có mốc thời gian và phương án dự phòng**. Được gợi ý khi học sinh có mục tiêu nhưng chưa có lộ trình cụ thể.

## Thông tin căn bản
- **Độ tuổi**: 11-18.
- **Mục đích**: biến "mình muốn đạt X" thành "tuần này mình làm 1,2,3".
- **Kịch bản điển hình**: lên lịch học tuần; chuẩn bị bài thuyết trình; quản lý dự án câu lạc bộ.

## Cơ chế chính
### Ý định thực thi (Implementation Intentions)
Quy tắc "**Nếu [tình huống] thì tôi sẽ [hành động]**":
- "Nếu 7h tối thứ Ba mà mình chưa làm xong bài văn, thì mình sẽ làm 30 phút trước khi mở điện thoại."
- Cơ sở: quy tắc "nếu-thì" tự động hóa quyết định, giảm gánh nặng ra quyết định lúc mệt — làm tăng xác suất thực hiện mục tiêu (Gollwitzer, 1999; meta-analysis Gollwitzer & Sheeran, 2006).
- Kế hoạch tốt: cụ thể hóa điều kiện kích hoạt + hành động + thời điểm.

## Vi can thiệp
- "Viết ra 1 rào cản dự kiến và cách em vượt qua nó nếu nó xuất hiện."
- "Nếu [rào cản] xảy ra, thì em sẽ [hành động thay thế]."

## Cụm từ an toàn
- "Kế hoạch là chiếc la bàn, không phải chiếc còng tay. Em có thể điều chỉnh linh hoạt."

## Cụm từ cần tránh
- "Cứ làm theo kế hoạch, cấm được sai lệch." (tạo áp lực cứng nhắc, phản tác dụng khi có biến)

## Chống chỉ định
Không đặt kế hoạch quá dày đặc gây kiệt sức: đảm bảo khung ngủ/nghỉ trong lịch.

## Gắn với khung năng lực
- Construct: Planning, Prioritization, GoalSetting.
- Liên quan: TimeManagement, Adaptability (kế hoạch linh hoạt).
- Sự kiện: goal_created, goal_updated, micro_action_accepted.

## Hướng dẫn triển khai
1. Phát hiện mục tiêu "mơ hồ, không lộ trình" từ goal_created đơn lẻ.
2. Dẫn dắt viết 3-5 bước hành động, mỗi bước kèm thời điểm.
3. Bổ sung đúng 1 phương án dự phòng cho rào cản có khả năng cao nhất.
4. Cho phép cập nhật kế hoạch (goal_updated) khi học sinh nhận thấy sai lệch — đó là tín hiệu tích cực.
5. Nhắc nguyên tắc "la bàn, không còng tay" khi kế hoạch đổ vỡ để tránh tự trách.

## Căn cứ lý thuyết (nguồn thật)
- Gollwitzer, P. M. (1999). *Implementation intentions: Strong effects of simple plans.* American Psychologist, 54(7), 493-503.
- Gollwitzer, P. M., & Sheeran, P. (2006). *Implementation intentions and goal achievement: A meta-analysis.* Advances in Experimental Social Psychology, 38, 69-119.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `planning`).