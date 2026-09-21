---
id: rel-03
domain: reliability-audit
page: 3/4
source: Kiểm tra mã nguồn trực tiếp (grep toàn bộ src/, studentAnalytics.ts)
tags: [reliability, audit, abandoned, wellness, event-logging]
---

# Audit Độ Tin Cậy #3: Event 'abandoned' không bao giờ được ghi từ runtime

## Mục đích
Kiểm tra cơ chế cảnh báo "bỏ ngang" có thực sự sống trên dữ liệu thật hay không.

## Phát hiện
- Kiểu `BehaviorEventType` định nghĩa `'abandoned'` (types.ts:113).
- `studentAnalytics.ts:185, 222-236` dựa vào `abandonedCount` để hạ mức hỗ trợ/đánh dấu
  đỏ (red flag: ≥3 lần bỏ ngang, hoặc ≥2 lần + chưa có completion, giảm resilience trong
  `assistant2050.ts:87`).
- **Grep toàn `src/`: không có `logBehaviorEvent('abandoned', ...)` nào.** Các nơi duy
  nhất nhắc `abandoned` là khai báo type + đếm trong analytics.
- Khi học sinh thoát game giữa chừng (bấm nút thoát / đóng modal), `GameRuntime.tsx`
  không ghi event kết thúc dạng `abandoned`; ngược lại L141 còn hardcode
  `completionStatus: 'completed'`.

## Hệ quả
- `computeWellness` (studentAnalytics.ts:219+) tính nhánh red/yellow theo abandoned gần
  như vô dụng: `abandonedCount` mãi bằng 0 với dữ liệu thật → học sinh bỏ ngang thử
  thách không bao giờ được hệ thống "chú ý".
- Báo cáo hàng ngày thiếu tín hiệu bỏ cuộc → hệ thống tự mãn "đang tiến triển" trong khi
  thực tế học sinh bỏ dở nhiều thử thách.

## Đề xuất khắc phục (ưu tiên cao)
1. Trong `onExit`/cleanup unmount của `GameRuntime`: nếu scene hiện tại chưa phải
   `'ending'` thì gọi
   `logBehaviorEvent('abandoned', currentSceneId, { gameId, title })`.
2. Đồng bộ `completionStatus` trong sheet `08_GAME_RESULTS`: khi thoát giữa chừng ghi
   `'abandoned'`, khi hết giờ 3 lần ghi `'timeout'` — dùng index union đã có
   (v9DataContract.ts:113).
3. Thêm nút "Dừng phiên" ở màn xác nhận thoát để phân biệt "bỏ ngang" với "chuyển game".

> ✅ **ĐÃ KHẮC PHỤC (2026-09-21)**: nút Thoát trong `GameRuntime` kiểm tra
> `completedRef`, nếu chưa hoàn thành sẽ gọi `logBehaviorEvent('abandoned', ...)` và
> `submitGameResult({ completionStatus: 'abandoned', score: 0 })` trước khi gọi `onExit()`.

## Nguồn tham khảo
- `src/components/StudentApp/GameRuntime.tsx`: toàn bộ (không có event abandoned),
  L141-151 (completionStatus cứng)
- `src/types.ts:104-122` (`BehaviorEventType`)
- `src/utils/studentAnalytics.ts` L185-193, L219-236 (`computeWellness`)
- `src/utils/assistant2050.ts` L87 (resilience -8 khi abandoned + completionRate thấp)
- `src/types/v9DataContract.ts:113` (completionStatus union)