---
id: psy-400
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "Hattie & Timperley (2007) The Power of Feedback, DOI 10.3102/003465430298487; Mueller & Dweck (1998) JPSP 75(1), 33-52; Niemiec & Ryan (2009) Theory & Research in Education 7(2), 133-158; Goldin et al. (2020) Nat Hum Behav 4, 397-405; Sleep Foundation — teens 8-10 giờ/đêm."
tags: [loi-khuyen, advice-system, sau-nhiem-vu, dung-ca-dien-tich, thoi-gian]
---

# Tổng quan hệ thống lời khuyên tâm lý sau nhiệm vụ (Advice System)

## Mục đích
Hệ thống lời khuyên tâm lý (advice) cung cấp cho học sinh một thông điệp **đúng tình huống** ngay
sau mỗi thử thách trong EduChoice-AI: đúng kết quả (thành công / một phần / khó khăn / bỏ ngang),
đúng **năng lực được luyện** (construct), đúng **thời điểm trong ngày** và **loại ngày** (trong tuần /
cuối tuần / tuần thi). Mục đích tâm lý: biến trải nghiệm chơi thành một khoảnh khắc học hỏi có hồi
đáp (feedback loop) thay vì chỉ là số điểm.

## Kiến thức cốt lõi
### 4 kết quả (outcome)
Mỗi phiên ended là một trong 4 trạng thái, suy ra **từ dữ liệu thật của phiên** (không bịa):
- `success` — hoàn thành, tỉ lệ lựa chọn thật cao, không cần thử lại nhiều.
- `partial` — hoàn thành với vài thử lại, nhiều lần đổi chiến lược, hoặc xin gợi ý.
- `struggled` — hoàn thành nhưng có nhiều lần thử lại/xin trợ giúp, tỉ lệ hoàn thành thấp.
- `abandoned` — thoát giữa chừng (hệ thống ghi event `abandoned`).

### 3 lớp ngữ cảnh
- `timeOfDay`: morning 5–<11 · afternoon 11–<17 · evening 17–<22 · lateNight 22–<5 (theo nhịp
  circadian thiếu niên).
- `dayType`: weekday / weekend / examWeek (tuần thi).
- `construct`: 20 năng lực (xem `psychology/constructs/`), lấy từ `game.constructs[0]`.

### Nguyên tắc nội dung
1. **Khen quá trình, không khen năng lực bẩm sinh** (process praise, Dweck): thay vì "Em thông
   minh", nói "Em đã nghĩ ra chiến lược hay".
2. **Phản hồi đúng mức công việc/chiến lược** (Hattie 2007): corrective feedback hiệu quả cao
   (ES 0.37) hơn lời khen chung (ES 0.14).
3. **Bảo vệ nhu cầu tâm lý** (SDT 2009): lời khuyên giúp học sinh thấy có năng lực (competence),
   tự chủ (autonomy), kết nối (relatedness).
4. **Kỷ luật tích cực**: không trách móc, không xúc phạm nhân phẩm; ở mức nặng → chuyển người lớn
   (wellness/08).
5. **Mỗi lời khuyên kèm 1 "việc nhỏ"** (micro-action): cam kết 1 hành động nhỏ làm được ngay để
   rời màn hình, kiến tạo cảm giác làm chủ.

### Đa dạng theo thời gian thật
Advice engine chọn lời khuyên bằng **xoay vòng deterministic theo ngày**: cùng một học sinh, cùng
kết quả, nhưng sang ngày khác sẽ gặp lời khuyên khác — tránh nhàm, dễ "phản xạ bỏ qua". Thứ tự
ưu tiên của mỗi ứng viên = khớp outcome (bắt buộc) + thưởng điểm khớp construct + khớp thời gian +
khớp ngày. Entry khớp **tất cả** các lớp sẽ thắng.

## Vận dụng thực tiễn
- File lời khuyên trong thư mục này là **kho tri thức**, file `src/data/adviceCatalog.ts` là **mã
  hóa vận hành** (một phần kho được đưa vào sản phẩm).
- `src/utils/adviceEngine.ts` chứa `adviceForAfterTask`, `classifyTimeOfDay`, `classifyDayType`,
  và bảng ghi nguồn `basisOf`.
- Điểm tích hợp: màn hình kết thúc `GameRuntime.tsx` (thẻ "Lời khuyên tâm lý cho riêng em" ngay
  dưới thẻ micro-action gốc) và câu trả lời chủ đề `wellness` của `assistant2050.ts`.

### Quy trình dữ liệu end-to-end
1. Học sinh chơi thử thách → `GameRuntime` ghi telemetry thật (lựa chọn, retry, help, pause,
   abandon) vào refs và Google Sheets.
2. Khi vào scene `ending`, module tính `completionRate` thật → suy outcome (success / partial /
   struggled; abandoned nếu có event bỏ ngang).
3. `endingAdvice` gọi `adviceForAfterTask` với {construct, outcome, now, seenIds}.
4. Engine chấm điểm khớp ngữ cảnh, xoay vòng theo ngày, né entry đã xem → trả `AdviceSelections`.
5. Giao diện hiện thẻ lời khuyên + micro-action + nguồn khoa học.

### Bản đồ 13 file kho lời khuyên
| File | id | Trả lời câu hỏi chính |
|---|---|---|
| `00_tong_quan...` | psy-400 | Hệ thống advice hoạt động ra sao? |
| `01_sau_thanh_cong...` | psy-401 | Sau success khen thế nào? |
| `02_sau_ket_qua_mot_phan...` | psy-402 | Sau partial điều chỉnh gì? |
| `03_sau_kho_khan...` | psy-403 | Sau struggled xây sức bền? |
| `04_sau_bo_ngang...` | psy-404 | Sau abandoned không trách? |
| `05_loi_khen_dung_cach...` | psy-405 | Vì sao khen đúng cách quan trọng? |
| `06_khung_gio_vang...` | psy-406 | Nhịp sinh học teen ra sao? |
| `07_gio_giac_ngu...` | psy-407 | Ranh giới học khuya? |
| `08_ngay_trong_tuan...` | psy-408 | Khác nhau weekday/weekend? |
| `09_tuan_thi...` | psy-409 | Tuần thi và lo âu thi? |
| `10_nguyen_ly_khop_ngu_canh` | psy-410 | Vì sao lời khuyên phải khớp bối cảnh? |
| `11_micro_action...` | psy-411 | Việc nhỏ cầu nối ra đời thực? |
| `12_xoay_vong...` | psy-412 | Đa dạng & theo dõi phát triển? |

## Câu hỏi ôn tập
1. Bốn trạng thái outcome là gì? (Đáp án: success / partial / struggled / abandoned.)
2. Bốn khung giờ `timeOfDay` và ranh giới giờ của chúng? (Đáp án: morning 5–11, afternoon 11–17,
   evening 17–22, lateNight 22–5.)
3. Vì sao phải xoay vòng lời khuyên theo ngày thay vì cố định một câu? (Đáp án: tránh nhàm,
   tránh phản xạ bỏ qua, tăng khả năng thấm thía của thông điệp.)
4. Entry nào được ưu tiên khi nhiều ứng viên cùng khớp outcome? (Đáp án: entry khớp nhiều lớp
   ngữ cảnh nhất — construct + timeOfDay + dayType — nhờ cộng điểm cụ thể hóa.)
5. Lời khuyên có nguồn gốc gì trước khi vào catalog? (Đáp án: từ các file kiến thức thư mục
   `advice/` này, mỗi entry khai báo `basis` trỏ về nguồn khoa học thật.)
6. Nêu 2 nguồn khoa học nền tảng của toàn hệ thống. (Đáp án: Hattie & Timperley (2007) về phản
   hồi; Mueller & Dweck (1998) về khen; kèm SDT 2009, Goldin 2020, Sleep Foundation.)

## Liên hệ với EduChoice-AI
- 20 construct → 20 nhóm lời khuyên theo construct trong catalog.
- chạy ở cả ending screen (GameRuntime) lẫn hội thoại ASTRA (assistant2050).
- Tuân thủ mức an toàn: ở `abandoned`/`struggled` liên tiếp nhiều lần, sản phẩm giữ đúng thông
  điệp "được nhờ giúp đỡ là việc thông minh" và khuyến nghị người lớn (wellness/08).

## Căn cứ lý thuyết (nguồn thật)
- Hattie, J., & Timperley, H. (2007). *The Power of Feedback.* Review of Educational Research
  77(1), 81–112. DOI 10.3102/003465430298487.
- Mueller, C. M., & Dweck, C. S. (1998). *Praise for intelligence can undermine children’s
  motivation and performance.* JPSP 75(1), 33–52.
- Niemiec, C. P., & Ryan, R. M. (2009). *Autonomy, competence, and relatedness in the classroom.*
  Theory & Research in Education 7(2), 133–158.
- Goldin, A. P., et al. (2020). *Interplay of chronotype and school timing predicts school
  performance.* Nature Human Behaviour 4, 397–405.
- Sleep Foundation. *Teens and Sleep.* sleepfoundation.org — khuyến nghị 8–10 giờ/đêm.
- Mã nguồn: `src/data/adviceCatalog.ts`, `src/utils/adviceEngine.ts`,
  `src/components/StudentApp/GameRuntime.tsx`.