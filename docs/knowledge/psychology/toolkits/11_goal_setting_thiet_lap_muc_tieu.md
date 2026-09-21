---
id: psy-211
category: toolkit
target_age: "11-15"
source: "Locke & Latham (2002) American Psychologist; Doran (1981) Management Review (SMART); APPROVED_TOOLKITS (src/data/approvedToolkits.ts, version 1.0.0)"
tags: [thiet-lap-muc-tieu, smart, muc-tieu-thuc-te, dong-luc-noi-tai, hai-han-dinh]
---

# Toolkit: Thiết lập mục tiêu thực tế (Goal Setting)

## Vai trò trong hệ thống
Toolkit chuẩn (id `goal_setting`, version 1.0.0) giúp xác định mục tiêu rõ ràng, đo lường được, và tạo **động lực nội tại** thay vì chỉ chạy theo kỳ vọng bên ngoài. Được gợi ý đầu năm học, trước kỳ thi chuyển cấp, hoặc khi học sinh đặt mục tiêu mơ hồ.

## Thông tin căn bản
- **Độ tuổi**: 10-18.
- **Mục đích**: đặt mục tiêu vừa sức, cụ thể, có hạn định; theo dõi tiến độ; duy trì cam kết.
- **Kịch bản điển hình**: đầu năm học mới; chuẩn bị cho kỳ thi chuyển cấp; rèn luyện thể thao.

## Cơ chế chính: SMART
- **S**pecific – cụ thể (mục tiêu rõ việc gì).
- **M**easurable – đo được (có con số).
- **A**chievable – khả thi so với nền tảng hiện tại (hơi thử thách nhưng với được — theo Locke & Latham).
- **R**elevant – liên quan, có ý nghĩa với học sinh (gắn nhu cầu tự chủ).
- **T**ime-bound – hạn định rõ.

## Vi can thiệp
- "Viết mục tiêu thành 1 câu duy nhất kèm số lượng cụ thể và ngày hoàn thành."
- "Hỏi vì sao mục tiêu này có ý nghĩa với em (trước khi viết)?" — neo động lực nội tại.

## Cụm từ an toàn
- "Mục tiêu rõ ràng giúp em không lãng phí công sức vào những việc ngoài lề."

## Cụm từ cần tránh
- "Mục tiêu phải thật vĩ đại mới xứng đáng." (mục tiêu quá sức → thất vọng, bỏ cuộc)

## Chống chỉ định
Không áp đặt mục tiêu vượt quá năng lực nền tảng hiện tại (kể cả khi gia đình muốn mục tiêu cao): khả thi là yếu tố tiên quyết cho cam kết lâu dài.

## Gắn với khung năng lực
- Construct: GoalSetting, Planning, Persistence.
- Liên quan: Autonomy (tự chọn mục tiêu), Balance (mục tiêu không ăn hết giờ ngủ/nghỉ).
- Sự kiện: goal_created, goal_updated, completed.

## Hướng dẫn triển khai
1. Kích hoạt lúc học sinh đặt mục tiêu mơ hồ (goal_created không đủ dữ liệu).
2. Dẫn qua 5 chữ SMART (đặc biệt nhấn R: ý nghĩa với em).
3. Chuyển mục tiêu thành 1 câu ngắn với số và ngày.
4. Bổ sung theo dõi (goal_updated) định kỳ; đón nhận việc điều chỉnh mục tiêu khi hết cảnh tù.
5. Phản hồi tiến độ thường xuyên — không chỉ đo cuối kỳ.

## Căn cứ lý thuyết (nguồn thật)
- Locke, E. A., & Latham, G. P. (2002). *Building a practically useful theory of goal setting and task motivation.* American Psychologist, 57(9), 705-717.
- Doran, G. T. (1981). *There's a S.M.A.R.T. way to write management's goals and objectives.* Management Review, 70(11), 35-36.
- Định nghĩa toolkit: `src/data/approvedToolkits.ts` (id `goal_setting`).