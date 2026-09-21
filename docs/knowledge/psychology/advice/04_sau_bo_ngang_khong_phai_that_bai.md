---
id: psy-404
domain: tam-ly-hoc
category: advice
target_age: "11-15"
source: "Neff (2011) — tự trắc nghiệm sau từ bỏ; Niemiec & Ryan (2009) SDT — autonomy quay lại; Thông tư 19/2019 mô hình kỷ luật tích cực; Lazarus & Folkman (1984) — đối phó tránh né."
tags: [loi-khuyen, sau-bo-ngang, khong-trach-moc, dua-tro-lai, micro-action]
---

# Lời khuyên khi học sinh bỏ ngang (Outcome: abandoned)

## Mục đích
Xử lí tình huống học sinh thoát giữa chừng mà **không xé chữ "thất bại"** vào con người teen.
Mục tiêu: giảm xấu hổ, đọc tín hiệu "vì sao em dừng" (mệt? quá tải? hoảng?), và mở cánh cửa
**quay lại ở mức dễ hơn** vào lần sau — bởi vì thật sự quay lại là điều quan trọng nhất.

## Tóm tắt nhanh
- Bỏ ngang có thể là phán đoán đúng (quá tải/mệt) theo Lazarus — không gắn tội.
- Ngôn ngữ kỷ luật tích cực: tách hành vi khỏi con người.
- Mời quay lại bằng phiên cực nhỏ (3-5 phút), không bắt làm lại y nguyên.
- Bỏ ngang nhiều lần liên tiếp → chuyển sang khuyến nghị nghỉ + người lớn.

## Kiến thức cốt lõi
### Bỏ ngang ≠ đổ vỡ
Thoát giữa chừng có thể là phán đoán đúng (bảo vệ sức khỏe, quá muộn, quá tải) chứ không phải
thiếu nghị lực. Đánh giá lại theo Lazarus & Folkman: khi nguồn lực đối phó (thời gian, năng lượng,
kiến thức) thấp hơn mức đe dọa, **tránh đối phó là phản ứng sinh lý bình thường**. Gắn tội chỉ làm
nghiền thói loại bỏ.

### Ngôn ngữ không trách móc (kỷ luật tích cực)
Thông tư 19/2019/TT-BGDĐT và mô hình kỷ luật tích cực nhấn mạnh: nhận diện lỗi + tự kiểm điểm +
tự sửa, nghiêm cấm xúc phạm nhân phẩm. Lời khuyên hệ thống cũng áp tinh thần đó với chính học
sinh: tách **hành vi** (việc chưa xong) khỏi **xiếc** (con người vẫn ổn).

### "Ngày mai bắt đầu ở mức nhỏ"
Thời điểm từ bỏ, học sinh thường bị "đề nghị phải làm lại y nguyên". Điểm đột phá là yêu cầu
**một phiên cực nhỏ** (3–5 phút) — đủ để ghi cảm giác "mình làm được" (competence) và "mình chủ
động quay lại" (autonomy, SDT).

### 4 nguyên nhân bỏ ngang phổ biến và cách hệ thống đối xử
| Nguyên nhân | Tín hiệu có thể có | Hướng đối xử trong lời khuyên |
|---|---|---|
| Quá tải (deadline dồn) | nhiều lần bỏ cùng tuần | Giảm tải rõ: hoãn, cắt 1 việc |
| Mệt thật sự (thiếu ngủ) | bỏ buổi tối khuya | Tone alert: ngủ sớm, không thêm việc |
| Lo/hoảng không lối thoát | bỏ ngay giữa scene khó | Ưu tiên người lớn/help-seeking |
| Chơi "thử nghiệm" (không nghiêm túc) | bỏ xong ấn vào game khác | Nhẹ nhàng nhắc giá trị phản tư, mời làm nhỏ |

### Nhịp đỏ tích lũy
Một lần bỏ ngang là chuyện thường. Bỏ ngang **nhiều lần liên tiếp hoặc nhiều trong 48h** sẽ được
`computeWellness` phát hiện (mức vàng → đỏ) → hệ thống chuyển từ "lời khuyên" sang "khuyến nghị
nghỉ + người lớn" (wellness/08). Không bao giờ dùng chính lời khuyên để "thuyết phục" một học sinh
đang kiệt sức học tiếp.

### Đọc tín hiệu cần người lớn
Bỏ ngang NhiỀU lần liên tiếp trong thời gian ngắn là dấu hiệu mệt mỏi tích lũy (chuyển sang mức đỏ
của `computeWellness`). Khi đó chữ khuyến nghị: nghỉ, chia sẻ với người lớn — không phải lời
khuyên thuần "cố lên".

## Vận dụng thực tiễn
Mẫu trong catalog (outcome: abandoned):
- SelfRegulation: "Bỏ ngang không biến em thành người thất bại... ngủ sớm, mai mới lại" → micro:
  bữa tối làm việc êm dịu, ngủ sớm.
- HelpSeeking: "Đó chính là lúc thông minh nhất để gọi người lớn hoặc bạn đáng tin hỗ trợ" → micro:
  nói với một người lớn "hôm nay em gặp khó ở điểm này".
- TimeManagement: "Có lẽ hôm nay em đã quá tải từ trước khi bắt đầu" → micro: giữ quỹ thời gian
  ngày sau bằng 70% ngày nay.
- LateNight (`tone: alert`): "Ngủ sớm là quyết định thông minh" — dừng, đừng cày thêm đêm.

### Kịch bản ví dụ: bỏ ngang giữa scene khó lúc buổi sáng
| Bước | Hệ thống làm | Lý do |
|---|---|---|
| 1. Phát hiện | Event `abandoned` được log khi thoát | rel-03 đã đảm bảo event thật |
| 2. Ngữ cảnh | morning + abandoned | Không phải khuya, không cần alert |
| 3. Thông điệp | "Em dừng lại — thông tin quý: kế hoạch này có thể quá nặng. Lần sau bớt việc." | Tách hành vi khỏi con người |
| 4. Micro-action | "Ngày mai bắt đầu với chỉ 1 việc thật nhỏ." | Mở cánh cửa quay lại |
| 5. Theo dõi | Đếm tần suất bỏ ngang trong 48h | Nếu nhiều → đỏ → người lớn |

## Câu hỏi ôn tập
1. Bỏ ngang có luôn là hành vi xấu không? (Đáp án: không — có thể là phán đoán bảo vệ khi quá tải
   theo mô hình Lazarus.)
2. Vì sao tránh trách móc trong lời khuyên sau abandoned? (Đáp án: kỷ luật tích cực/Thông tư 19 —
   tách hành vi khỏi con người, tránh xúc phạm nhân phẩm.)
3. Việc nhỏ gợi ý nên cỡ nào? (Đáp án: cực nhỏ, 3–5 phút, dễ thắng, để ghi lại cảm giác làm
   được.)
4. Dấu hiệu nào chuyển lời khuyên sang cảnh báo người lớn? (Đáp án: bỏ ngang nhiều lần liên tiếp,
   mệt mỏi tích lũy red-level, hoặc dấu hiệu tự tổn thương — leo thang wellness/08.)
5. Vì sao "quay lại ở mức nhỏ" quan trọng hơn "làm lại y nguyên"? (Đáp án: níu cánh cửa quay lại,
   phục hồi năng lực + tự chủ; nguy cơ bỏ lần nữa giảm.)

## Liên hệ với EduChoice-AI
- Sự kiện `abandoned` được log khi thoát giữa chừng (audit rel-03) và được dùng trong
  `studentAnalytics.computeWellness` để tăng mức căng thẳng.
- Construct liên quan: SelfRegulation, HelpSeeking, TimeManagement, HealthyRoutine, Persistence.
- Code: nhóm `outcome: 'abandoned'` trong `src/data/adviceCatalog.ts`; tone mặc định `warm`, tone
  `alert` khi `lateNight`.

## Căn cứ lý thuyết (nguồn thật)
- Neff, K. (2011). *Self-Compassion.* William Morrow.
- Niemiec, C. P., & Ryan, R. M. (2009). *Autonomy, competence, and relatedness in the classroom.*
  Theory & Research in Education 7(2), 133–158.
- Thông tư 19/2019/TT-BGDĐT — khen thưởng và xử lí vi phạm học sinh; mô hình kỷ luật tích cực.
- Lazarus, R. S., & Folkman, S. (1984). *Stress, Appraisal, and Coping.* Springer.
- Quy trình leo thang: `psychology/wellness/08_khi_nao_can_nguoi_lon_ho_tro.md`.