---
id: kb-map
domain: knowledge-base
level: mapping
source: Đối chiếu approvedToolkits.ts (13 toolkit) x types.ts ConstructName (20 construct) x 00_INDEX.md
tags: [knowledge-base, mapping, constructs, toolkits]
---

# Bản đồ liên kết: 20 Construct ↔ 13 Toolkit ↔ File tri thức

File tiêu thụ: dùng làm "bộ điều phối" cho LLM/script khi soạn micro-game: từ một construct
cần rèn → biết dùng toolkit can thiệp nào + đọc file tâm lý nào + nội dung khoa học nào.

## 1. Mục đích
- Đảm bảo MỌI micro-game đều gắn đúng ≤ 3 construct và mỗi construct đều có ít nhất 1
  toolkit làm cơ chế can thiệp hợp lệ trong `approvedToolkits.ts`.
- Liên kết chéo tới `rel-02`: validator chỉ duyệt 13 construct — bản đồ này chỉ ra 8
  construct còn thiếu với toolkit gợi ý để bổ sung approved.
- Trích xuất đường dẫn file để hệ thống RAG/document chaining nạp đúng context.

## 2. Ma trận 20 construct → toolkit chính + file tri thức

| # | Construct (types.ts) | Toolkit 1-1 (approvedToolkits) | File constructs/ | File toolkits/ | File development/ liên quan |
|---|---|---|---|---|---|
| 1 | Planning | planning | 01_planning_lap_ke_hoach.md | 04_planning_lap_ke_hoach.md | 08_dong_luc_hoc_tap |
| 2 | Prioritization | prioritization | 02_prioritization_u_tien.md | 01_prioritization_xac_dinh_u_tien.md | 08_dong_luc_hoc_tap |
| 3 | ProblemSolving | problem_decomposition | 03_problem_solving_giai_quyet_van_de.md | 03_problem_decomposition_chia_nho_van_de.md | 02_nhan_thuc_tu_duy_bao_quat |
| 4 | SelfRegulation | self_regulation | 04_self_regulation_dieu_hoa_cam_xuc.md | 08_self_regulation_tu_dieu_hoa.md | 04_cam_xuc_va_ki_soat_xung_dong |
| 5 | AttentionControl | time_management | 05_attention_control_kiem_soat_tap_trung.md | 05_time_management_quan_ly_thoi_gian.md | 07_tri_nho_chu_y_hoc_tap |
| 6 | HelpSeeking | help_seeking | 06_help_seeking_tim_tro_giup.md | 09_help_seeking_tim_kiem_tro_giup.md | 05_xa_hoi_dong_dang_lua |
| 7 | Reflection | reflection | 07_reflection_phan_tu.md | 12_reflection_phan_tu_duec_ket.md | 03_sieu_nhan_thuc_va_phan_tu |
| 8 | Adaptability | cognitive_reframing | 08_adaptability_thich_ung.md | 07_cognitive_reframing_tai_cau_truc_nhan_thuc.md | 02_nhan_thuc_tu_duy_bao_quat |
| 9 | GoalSetting | goal_setting | 09_goal_setting_dat_muc_tieu.md | 11_goal_setting_thiet_lap_muc_tieu.md | 08_dong_luc_hoc_tap |
| 10 | Communication | communication | 10_communication_giao_tiep.md | 10_communication_giao_tiep_quyet_doan.md | 05_xa_hoi_dong_dang_lua |
| 11 | ConsequencePrediction | consequence_prediction | 11_consequence_prediction_du_doan_hau_qua.md | 06_consequence_prediction_du_doan_he_qua.md | 06_hoat_dong_truoc_tran_dinh_cao |
| 12 | Persistence | retry_experiment | 12_persistence_kien_tri.md | 13_retry_experiment_thu_nghiem_lai.md | 08_dong_luc_hoc_tap |
| 13 | Autonomy | planning | 13_autonomy_tu_chu.md | 04_planning_lap_ke_hoach.md | 06_hoat_dong_truoc_tran_dinh_cao |
| 14 | TimeManagement | time_management | 14_time_management_quan_ly_thoi_gian.md | 05_time_management_quan_ly_thoi_gian.md | 07_tri_nho_chu_y_hoc_tap |
| 15 | DistractionRecovery | time_management | 15_distraction_recovery_phuc_hoi_phan_tam.md | 05_time_management_quan_ly_thoi_gian.md | 07_tri_nho_chu_y_hoc_tap |
| 16 | Cooperation | communication | 16_cooperation_hop_tac.md | 10_communication_giao_tiep_quyet_doan.md | 05_xa_hoi_dong_dang_lua |
| 17 | Empathy | communication | 17_empathy_thau_cam.md | 10_communication_giao_tiep_quyet_doan.md | 05_xa_hoi_dong_dang_lua |
| 18 | Responsibility | consequence_prediction | 18_responsibility_trach_nhiem.md | 06_consequence_prediction_du_doan_he_qua.md | 11_ngu_canh_viet_nam_hoc_them_thi_cu |
| 19 | HealthyRoutine | self_regulation | 19_healthy_routine_thoi_quen_lanh_manh.md | 08_self_regulation_tu_dieu_hoa.md | 09_giac_ngu_thieu_nien, 10_doi_song_so_thoi_dai_so |
| 20 | Balance | time_management | 20_balance_can_bang.md | 05_time_management_quan_ly_thoi_gian.md | 09_giac_ngu_thieu_nien, 10_doi_song_so_thoi_dai_so |

> Ghi chú: (a) file toolkits/ có 13 file nhưng đánh số theo thứ tự approved; chi tiết xem
> mục 3. (b) Toolkit `problem_identification`, `cognitive_reframing` gắn chéo thêm
> problem solving/adaptability. (c) toolkit/04_planning dùng chung cho planning & autonomy.
> (d) 8 construct chưa được validator duyệt (rel-02): tham chiếu cột toolkit gợi ý để bổ sung.

## 3. 13 toolkit (approvedToolkits.ts) — id, nameVi, cơ chế, từ khóa kịch bản

| id (file toolkits/) | nameVi | Cơ chế chính | Micro-intervention mẫu |
|---|---|---|---|
| 01_prioritization | Xác định mức độ ưu tiên | Eisenhower matrix / 1-3-5 | Dừng 5s → chọn 1 việc tạo kết quả lớn nhất |
| 02_problem_identification | Nhận diện vấn đề cốt lõi | 5 Whys / Xương cá | Liệt kê 3 điều đang thực sự xảy ra |
| 03_problem_decomposition | Chia nhỏ bài toán phức tạp | Micro-steps (<10 phút) | Làm bước đầu tiên trong 3 phút |
| 04_planning | Lập kế hoạch hành động | Implementation Intentions | Viết 1 rào cản + cách vượt |
| 05_time_management | Quản lý thời gian & nhịp tập trung | Pomodoro thích ứng / Time-blocking | Cất điện thoại 1 hiệp 15 phút |
| 06_consequence_prediction | Dự đoán hệ quả đa bước | Cây hệ quả "Sau đó thì sao" | "2 tiếng nữa và ngày mai em sẽ thế nào?" |
| 07_cognitive_reframing | Tái cấu trúc nhận thức | ABC + Growth Mindset | Thêm từ "...CHƯA..." |
| 08_self_regulation | Tự điều hòa cảm xúc | Hơi thở 4-4-4 / 5-4-3-2-1 | Hít 4s-giữ 4s-thở 4s |
| 09_help_seeking | Tìm kiếm trợ giúp đúng cách | Công thức 3 phần | Chọn 1 người đáng tin cậy để xin gợi ý |
| 10_communication | Giao tiếp quyết đoán & từ chối | I-Message / từ chối mềm kèm giải pháp | Nói "Mình quý bạn, nhưng..." |
| 11_goal_setting | Thiết lập mục tiêu thực tế | SMART | Viết mục tiêu 1 câu + số lượng + hạn |
| 12_reflection | Phản tư & đúc kết kinh nghiệm | Vòng Kolb | "Điều gì tốt hơn dự tính?" + "Sẽ đổi gì?" |
| 13_retry_experiment | Thử nghiệm lại với giả thuyết mới | Vòng lặp thử nghiệm | Chọn lại nhánh khác để xem kết cục |

## 4. Góc > nội dung khoa học (science/)
- Game dạy kỹ năng kết hợp môn học: gắn bằng từ khóa chương (mạch nội dung). Ánh xạ mẫu:
  - Planning/TimeManagement/Balance → chủ đề "Tốc độ & an toàn giao thông" (grade7 32-35),
    "Năng lượng & tiết kiệm năng lượng" (grade6 34-37), "Sức khỏe học đường" (grade8 31).
  - ConsequencePrediction/Responsibility → "An toàn hóa chất/điện" (grade7 02, grade8 01),
    "An toàn giao thông" (grade7 35), "Sinh sản & sức khỏe sinh sản" (grade8 41).
  - SelfRegulation → "Áp lực & căng thẳng học tập" (wellness 02), kết hợp "Tốc độ phản ứng
    & chất xúc tác" (grade8 10) như ẩn dụ sinh động.
  - HelpSeeking/Communication → "Trao đổi khí & hệ hô hấp" (grade8 35), chủ đề hợp tác nhóm.

## 5. Góc > wellness & leo thang
- Construct nào script tăng cũng phải kiểm tra wellness: nếu học sinh 3+ lần bỏ ngang
  (semantics của rel-03) hoặc báo lo âu/căng thẳng cao → chuyển hướng tới `wellness/08`
  (người lớn hỗ trợ), không tiếp tục thêm challenge.
- Cờ nhạy cảm (bắt nạt, tự hại) → dừng game, hiển thị quy trình `wellness/06` + `08`.
- **Tư vấn nhanh tình huống cụ thể**: dùng `STUDENT_PSYCHOLOGY_QUICK_CONSULTATION.md`
  (khung RAPID + index 23 cards `psy-sit-01…23` trong `psychology/consult/`). Cờ tự hại/xâm hại
  → ưu tiên `STUDENT_PSYCHOLOGY_SAFETY_PROTOCOL.md` (SAFETY MODE / SAFEGUARDING) TRƯỚC khi
  mở card khác.

## 5b. Góc > lời khuyên sau nhiệm vụ (advice/)
- Lời khuyên được chọn bởi `src/utils/adviceEngine.ts` từ `src/data/adviceCatalog.ts`, khớp
  theo 4 chiều: `outcome` (bắt buộc, suy từ dữ liệu thật phiên) × `construct` × `timeOfDay` ×
  `dayType`; tri thức nền ở `psychology/advice/` (psy-400→412).
- Nguyên tắc bảo vệ: không chẩn đoán (Giới hạn theo wellness), tôn trọng nhịp ngủ (`advice/07`),
  thích ứng ngày/cuối tuần (`advice/08`), xoay vòng để không lặp câu (`advice/12`).

## 6. Cách cập nhật
- Khi thêm toolkit mới vào `approvedToolkits.ts`: cập nhật mục 3.
- Khi thêm file constructs/ hay development/: cập nhật cột file của dòng tương ứng.
- Khi thêm entry vào `adviceCatalog.ts` hay file `psychology/advice/`: cập nhật mục 5b + `00_INDEX.md`.
- Khi đổi id file tri thức: sửa cả `00_INDEX.md` và bản đồ này (đảm bảo 1-1 nhất quán).