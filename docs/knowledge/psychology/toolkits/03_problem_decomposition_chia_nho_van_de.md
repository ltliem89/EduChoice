---
id: psy-203
category: toolkit
target_age: "11-15"
source: "Sweller, van Merriënboer & Paas (1998) Educational Psychology Review (cognitive load theory); APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.0.0)"
tags: [chia-nho-bai-toan, micro-steps, tai-nhan-thuc, khoi-dong-dopamin, decom post]
---

# Toolkit: Chia nhỏ bài toán phức tạp (Problem Decomposition)

## Vai trò trong hệ thống
Toolkit chuẩn (id `problem_decomposition`, version 1.0.0) giúp giảm cảm giác "ngợp" khi đối mặt nhiệm vụ lớn bằng cách chia thành các **bước siêu nhỏ (micro-steps)**. Được gợi ý khi dữ liệu cho thấy học sinh "đứng yên không khởi động" hoặc trì hoãn vì nhiệm vụ to.

## Thông tin căn bản
- **Độ tuổi**: 10-18.
- **Mục đích**: hạ thấp rào cản khởi đầu, kích hoạt dopamine "tiến bước" để bắt đầu.
- **Kịch bản điển hình**: đồ án nghiên cứu lớn; ôn thi học kỳ; dọn dẹp góc học tập.

## Cơ chế chính
### Chia đôi – chia nhỏ – bước dưới 10 phút
- Từ nhiệm vụ mẹ: liệt kê nhiệm vụ con; mỗi nhiệm vụ con phải **tốn dưới 10 phút**.
- Mỗi lần chỉ làm một bước; trả lời câu hỏi "bước đầu tiên là gì?" trước khi nghĩ về đích cuối.
- Cơ sở: ghi nhớ làm việc có dung lượng hạn, tải nhận thức giảm khi chia nhỏ (Sweller et al., 1998); khởi động dễ tạo quán tính tiếp tục.

## Vi can thiệp
- "Chỉ cần làm bước đầu tiên trong 3 phút (ví dụ: mở file tài liệu)."
- "Đặt hẹn giờ 3 phút làm một phần nhỏ, hết giờ được phép dừng."

## Cụm từ an toàn
- "Một bước nhỏ hôm nay tốt hơn một kế hoạch hoàn hảo không bao giờ bắt đầu."

## Cụm từ cần tránh
- "Dễ thế này mà không làm xong." (hạ thấp cảm giác ngợp — ngược ý nghĩa toolkit)

## Chống chỉ định
Không dùng cho các quyết định đòi hỏi tầm nhìn tổng quan dài hạn: phân rã quá sâu ở lĩnh vực đó có thể mất định hướng chiến lược.

## Gắn với khung năng lực
- Construct: ProblemSolving, Planning, TimeManagement.
- Liên quan: Persistence (chia nhỏ giúp kiên trì bền), Motivation (SDT – cảm giác năng lực).
- Sự kiện: micro_action_started/completed, goal_created.

## Hướng dẫn triển khai
1. Phát hiện "trì hoãn khởi động" (không có hành động trong phiên đầu nhiệm vụ lớn).
2. Hỏi: "bước đầu tiên dưới 10 phút của em là gì?"
3. Cho phép hoàn thành chỉ 1 micro-step như một thắng lợi (không đòi hoàn thành nhiệm vụ).
4. Đừng biến micro-step thành to-do dài: nếu học sinh kê 20 bước là họ vẫn đang ngợp.
5. Kết hợp reflection: "làm xong bước đầu, cảm giác thế nào?" để củng cố.

## Căn cứ lý thuyết (nguồn thật)
- Sweller, J., van Merriënboer, J. J. G., & Paas, F. (1998). *Cognitive architecture and instructional design.* Educational Psychology Review, 10(3), 251-296.
- Lally, P., et al. (2010) về bắt đầu hành vi (habit formation, context cues).
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `problem_decomposition`).