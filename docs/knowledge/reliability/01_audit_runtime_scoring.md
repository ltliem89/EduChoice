---
id: rel-01
domain: reliability-audit
page: 1/4
source: Kiểm tra mã nguồn trực tiếp (game.note/presentation audit, tháng 6/2026)
tags: [reliability, audit, scoring, game-runtime, score]
---

# Audit Độ Tin Cậy #1: Điểm số & Hoàn thành trong GameRuntime

## Mục đích
Soi logic tính điểm và đo lường hoàn thành trong luồng chơi micro-game để xác định
điểm số có phản ánh hành vi thật của học sinh hay không.

## Phát hiện (đã đọc trực tiếp file)

### 1. `score` bị phóng đại vì `history` đếm mọi scene đã đi qua (GameRuntime.tsx)
- `GameRuntime.tsx:120-127`:
  - `totalChoices` = tổng số `choices` trong toàn bộ `game.scenes`.
  - `completionRate = history.length / totalChoices` với `history` được thêm **mỗi lần
    chuyển scene** (handleSelectChoice L314, handleNext L324/331, handleReflectionSubmit
    L364) — không chỉ khi học sinh chọn đáp án.
- Hệ quả: một game có 2 scene lựa chọn (4 choices) + 3 scene situation/consequence/ending
  sẽ có `totalChoices = 4` nhưng `history` có thể đạt ~6 phần tử → `completionRate > 1`
  bị clamp `Math.min(1, ...)` → `score = 100` gần như luôn luôn, ngay cả khi học sinh
  không đi hết các nhánh lựa chọn.
- Không có chỗ nào đếm chính xác "đã đưa ra bao nhiêu lựa chọn có ích" — `history` ghi
  interần visited, soi nhầm thành số lựa chọn.

### 2. `choiceChanges` bị gán sai ý nghĩa
- `GameRuntime.tsx:145` gửi `choiceChanges: history.length` lên sheet `08_GAME_RESULTS`
  dưới tên "change number of choice" — thực chất là số scene đã đi qua, không phải số
  lần thay đổi lựa chọn. Có event `choice_changed` trong `BehaviorEventType`
  (types.ts:108) nhưng không có nơi nào emit, không thấy `handleSelectChoice` đếm "đổi ý".

### 3. Mismatch hiển thị "+15 pts" với logic thật
- `GameRuntime.tsx:731-739`: UI màn `ending` hiển thị **mọi construct** trong
  `game.constructs` đều `(+15 pts)`.
- Logic thật: chỉ có `updateStudentConstruct('Reflection', 15)` khi submit phản tư
  (L359) và delta `choice.constructImpact` khi chọn lựa (L305-310). Không có nhánh nào
  cộng +15 từng construct.
- Hệ quả: giao diện hứa hẹn năng lực tăng +15/lượt (đã ghi trong slide thuyết trình)
  nhưng hệ thống điểm nội bộ chỉ cộng chính xác cho Reflection + tác động định mức nhỏ.

### 4. `completionStatus: 'completed'` luôn được ghi, kể cả khi bấm thoát
- `GameRuntime.tsx:141`: hardcode `completionStatus: 'completed'`. Không phân biệt
  người chơi bỏ ngang giữa chừng. Xem Audit #3 về event `abandoned` không bao giờ được ghi.

!> **Kết luận**: Điểm số hiện tại KHÔNG phản ánh độ hoàn thành thực. Cần tách bộ đếm
chính: `choicesMade` (chỉ đếm khi `handleSelectChoice` thực thi) thay vì dùng `history`.

## Đề xuất khắc phục (ưu tiên cao)
1. Thêm `choicesMadeRef` đếm trong `handleSelectChoice`; `completionRate =
   choicesMadeRef.current / totalChoices`.
2. `score` nên kết hợp: tỉ lệ hoàn thành + số nhánh khám phá + số lần phản tư chất lượng
   (có text ≥ 20 ký tự).
3. UI ending hiển thị đúng delta thật: Reflection +15 + tổng delta construct từ
   `constructImpact` đã đi qua (đọc từ student model, không hardcode 15 cho mọi construct).
4. Ghi `completionStatus` theo trạng thái thật (dừng khi chưa tới ending → `'abandoned'`)
   và thêm event `logBehaviorEvent('abandoned', ...)` khi unmount trước ending.

> ✅ **ĐÃ KHẮC PHỤC (2026-09-21)**: `choicesMadeRef` đếm trong `handleSelectChoice`;
> `completionRate`/`score` dùng số lựa chọn thật; màn `ending` hiển thị delta thực từ
> `appliedDeltas` (không còn hardcode +15); nút Thoát ghi `completionStatus:'abandoned'`
> + event `abandoned` khi chưa đạt ending (GameRuntime.tsx).

## Nguồn tham khảo
- `src/components/StudentApp/GameRuntime.tsx` L120-127, L141-151, L305-310, L731-739
- `src/types.ts` L104-122 (`BehaviorEventType`)
- Năng lực đo sau can thiệp dựa trên bộ 20 construct tại `src/types.ts:135-155`