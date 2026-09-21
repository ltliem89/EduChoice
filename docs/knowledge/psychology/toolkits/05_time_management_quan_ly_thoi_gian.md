---
id: psy-205
category: toolkit
target_age: "11-15"
source: "Cirillo (2018) The Pomodoro Technique; Macan (1994) Journal of Applied Psychology; APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.2.0)"
tags: [quan-ly-thoi-gian, pomodoro, time-blocking, nhp-tap-trung, chong-tri-hoan]
---

# Toolkit: Quản lý thời gian và Nhịp tập trung (Time Management)

## Vai trò trong hệ thống
Toolkit chuẩn (id `time_management`, version 1.2.0) tối ưu năng lượng học tập và thiết lập ranh giới với tác nhân gây xao nhãng. Được gợi ý khi dữ liệu cho thấy phiên học ngắt quãng, trì hoãn, hoặc thức khuya.

## Thông tin căn bản
- **Độ tuổi**: 10-18.
- **Mục đích**: chủ động nhịp làm việc – nghỉ; giảm trì hoãn lướt mạng; ngủ đúng giờ.
- **Kịch bản điển hình**: trì hoãn lướt mạng xã hội; thức khuya làm bài thi; mất tập trung sau 10 phút.

## Cơ chế chính
### Pomodoro thích ứng
- Hiệp tập trung **15-20 phút** (ngắn hơn chuẩn 25 phút vì năng lực chú ý thiếu niên và nhịp học ngắn) + nghỉ 3 phút.
- Sau mỗi hiệp: đứng dậy, nhìn xa, uống nước — phục hồi chú ý chứ không chuyển sang lướt mạng.

### Time-blocking
- Xếp khối thời gian cho từng loại việc trong ngày, ưu tiên khối "quan trọng + khẩn cấp" trước.
- Bảo vệ khối ngủ tối thiểu: đảo lại thứ tự ưu tiên nếu lịch ăn vào giấc ngủ.

## Vi can thiệp
- "Cất điện thoại ngoài tầm với trong đúng 1 hiệp 15 phút."
- "Đặt hẹn giờ 15 phút; khi chuông kêu, đứng dậy và nhìn ra xa 2 phút."

## Cụm từ an toàn
- "Mỗi phút em chủ động làm chủ thời gian là một bước rèn luyện tính tự chủ."

## Cụm từ cần tránh
- "Sao lúc nào em cũng nước đến chân mới nhảy?" (chê trách → xấu hổ, không đổi hành vi)

## Chống chỉ định
Không áp dụng khi học sinh đang suy nhược cơ thể hoặc thiếu ngủ trầm trọng: ưu tiên nghỉ ngơi, không tăng ca học.

## Gắn với khung năng lực
- Construct: TimeManagement, AttentionControl, Balance.
- Liên quan: HealthyRoutine, DistractionRecovery, Prioritization.
- Sự kiện: micro_action_started, pause/resumed, goal_updated.

## Hướng dẫn triển khai
1. Phát hiện trì hoãn (phiên không khởi động) hoặc thức khuya (histogram đêm khuya).
2. Kích hoạt 1 hiệp 15 phút với mục tiêu rõ ràng.
3. Sau hiệp, hỏi cảm giác → phản hồi tích cực cho việc làm chủ nhịp.
4. Khi lịch quá dày: đề nghị bỏ bớt việc không quan trọng, không thêm giờ.
5. Tuyệt đối không khuyến khích "tăng hiệp học bù" khi mệt.

## Căn cứ lý thuyết (nguồn thật)
- Cirillo, F. (2018). *The Pomodoro Technique.* Currency.
- Macan, T. H. (1994). *Time management: Test of a process model.* Journal of Applied Psychology, 79(3), 381-391.
- Britton, B. K., & Tesser, A. (1991). *Effects of time-management practices on college grades.* Journal of Educational Psychology.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `time_management`).