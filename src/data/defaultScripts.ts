import { ScriptItem } from '../types';

export const DEFAULT_SCRIPTS: ScriptItem[] = [
  {
    id: 'script_48_minutes',
    title: '48 phút cuối — Áp lực trước giờ nộp bài',
    ageRange: { min: 11, max: 15 },
    durationMinutes: 3,
    objectives: 'Giúp học sinh rèn luyện kỹ năng phân loại mức độ ưu tiên công việc theo ma trận Eisenhower khi gặp áp lực thời gian dồn dập.',
    constructs: ['Prioritization', 'ConsequencePrediction', 'Planning'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Minh (học sinh lớp 8, thường có xu hướng phân tâm bởi thông báo điện thoại).
Thời điểm: Còn đúng 15 phút nữa là đến hạn chót hệ thống nộp bài thi môn Toán trực tuyến (chiếm 40% điểm kỳ).
Xung đột:
1. Bàn học bừa bộn và mẹ dặn dọn trước khi mẹ đi chợ về.
2. Bạn thân nhắn tin rủ vào trận game sinh tồn đang có sự kiện đặc biệt.
3. Bài tập Toán đã làm nháp xong nhưng chưa chụp ảnh scan và tải lên hệ thống.

[LỰA CHỌN CỦA MINH]
- Lựa chọn A: Mở tin nhắn trả lời bạn bè trước để khỏi bị trách "chảnh".
- Lựa chọn B: Tắt hết thông báo, tập trung 100% rà soát và nộp bài Toán trước.
- Lựa chọn C: Lướt TikTok/Shorts 5 phút để "xả stress" lấy lại cảm hứng rồi mới nộp.

[HỆ QUẢ]
- Nhánh A: Sa đà vào cuộc chat nhóm, nộp bài muộn, mất trang giải chi tiết.
- Nhánh B: Nộp bài trọn vẹn, tinh thần nhẹ nhõm, còn thừa thời gian giải quyết việc phụ.
- Nhánh C: Bị thuật toán cuốn đi, đồng hồ điểm hết giờ và bị khóa bài, điểm 0 đáng tiếc.

[CAN THIỆP TÂM LÝ & PHẢN TƯ]
Áp dụng Toolkit Prioritization (Ma trận Khẩn cấp vs Quan trọng).
Học sinh tự trả lời câu hỏi: Điều gì khiến ta dễ sa vào bẫy chọn việc dễ trước việc quan trọng?`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-08T14:30:00Z',
    updatedAt: '2026-09-10T08:00:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_peer_pressure',
    title: 'Áp lực rủ rê từ nhóm bạn thân',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    objectives: 'Rèn luyện kỹ năng từ chối quyết đoán (Assertive Refusal), giữ vững ranh giới đạo đức và kỷ luật trường học mà không làm tổn thương tình bạn.',
    constructs: ['SelfRegulation', 'Communication', 'ConsequencePrediction'],
    rawScript: `[BỐI CẢNH]
Nhân vật: An (lớp 8).
Tình huống: Giờ ra chơi, nhóm bạn rủ cúp tiết thể dục lẻn ra cổng sau uống trà sữa và thách thức "Ai không đi là đồ nhát cáy!".

[LỰA CHỌN]
- Lựa chọn A: Đi theo nhóm để không bị coi là kẻ lạc lõng ngoài lề.
- Lựa chọn B: Từ chối quyết đoán và hẹn dịp khác: "Tiết này mình muốn tập, chiều tan học tụi mình đi nhé!".
- Lựa chọn C: Mắng thẳng vào mặt bạn bè là vô kỷ luật rồi chạy đi mách thầy.

[HỆ QUẢ & CAN THIỆP]
- Nhánh B đạt kết quả tốt nhất.
Áp dụng Toolkit Assertive Communication & Self-Regulation.`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-10T10:00:00Z',
    updatedAt: '2026-09-11T10:00:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_weekend_trap',
    title: 'Chiếc bẫy ngày Chủ Nhật — Cân bằng học tập và giải trí',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    objectives: 'Giúp học sinh thoát khỏi hội chứng trì hoãn cuối tuần (Sunday Procrastination Syndrome), biết cách sắp xếp các hoạt động hài hòa.',
    constructs: ['Prioritization', 'Planning', 'SelfRegulation'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Hoàng.
Tình huống: Sáng Chủ Nhật, bài tập nhóm hạn nộp chiều, bạn rủ đá bóng 14h và bộ phim yêu thích ra mắt tập mới.
Xung đột: Cám dỗ giải trí trước mắt đối đầu với trách nhiệm học tập ngày mai.

[LỰA CHỌN]
- Lựa chọn A: Xem phim trước, để bài tập nhóm vào đêm muộn.
- Lựa chọn B: Xong bài nhóm buổi sáng (8h-11h), chiều thể thao, tối xem 1 tập phim.
- Lựa chọn C: Đi chơi cả ngày, phó mặc bài nhóm cho các bạn gánh hộ.

[CAN THIỆP]
Nguyên lý "Nuốt con ếch khó nhất trước" (Eat that frog).`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-11T14:00:00Z',
    updatedAt: '2026-09-11T15:00:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_social_media_rumor',
    title: 'Ứng phó trước tin đồn và bình luận tiêu cực trên mạng xã hội',
    ageRange: { min: 12, max: 17 },
    durationMinutes: 3,
    objectives: 'Phát triển năng lực tự điều hòa cảm xúc (Self-Regulation) và kỹ năng an toàn số khi bị công kích trực tuyến.',
    constructs: ['SelfRegulation', 'ConsequencePrediction', 'Reflection'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Mai.
Tình huống: Đọc thấy bài đăng bóng gió giễu cợt mình trên mạng xã hội, tim đập nhanh, thôi thúc muốn đáp trả chửi bới ngay lập tức.

[LỰA CHỌN]
- Lựa chọn A: Đăng bài bóc phốt chửi lại ngay trong cơn giận.
- Lựa chọn B: Buông điện thoại, thở 4-4-4, chụp bằng chứng và gặp trao đổi trực tiếp vào thứ Hai.
- Lựa chọn C: Rủ bạn bè vào spam bình luận xúc phạm đối phương.

[CAN THIỆP]
Toolkit Box Breathing (4-4-4) & Cognitive Reframing.`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-12T16:00:00Z',
    updatedAt: '2026-09-12T17:00:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_presentation_glitch',
    title: 'Sự cố thiết bị trước giờ thuyết trình',
    ageRange: { min: 11, max: 16 },
    durationMinutes: 3,
    objectives: 'Huấn luyện tâm lý bình tĩnh, khả năng thích ứng linh hoạt (Adaptability) và tư duy Kế hoạch B khi công nghệ gặp sự cố.',
    constructs: ['ProblemSolving', 'Adaptability', 'SelfRegulation'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Đức (nhóm trưởng).
Tình huống: USB báo lỗi dữ liệu 3 phút trước khi đến lượt thuyết trình trước toàn trường.

[LỰA CHỌN]
- Lựa chọn A: Đổ lỗi cho bạn phụ trách USB và xin hủy bài thi.
- Lựa chọn B: Bình tĩnh mở sổ tay, dùng phấn vẽ sơ đồ tóm tắt lên bảng và thuyết trình trực tiếp.
- Lựa chọn C: Cắm rút USB liên tục suốt 10 phút hy vọng máy tự sửa.

[CAN THIỆP]
Tư duy Kế hoạch B (Fallback Thinking) & Kiểm soát chú ý.`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-13T11:00:00Z',
    updatedAt: '2026-09-13T11:30:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_ask_for_help',
    title: 'Vượt qua nỗi sợ hỏi bài thầy cô và bạn bè',
    ageRange: { min: 11, max: 16 },
    durationMinutes: 3,
    objectives: 'Xóa bỏ tâm lý e ngại "sợ bị coi là yếu kém", xây dựng thói quen tìm kiếm sự trợ giúp đúng lúc (Help-Seeking).',
    constructs: ['HelpSeeking', 'Communication', 'SelfRegulation'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Tuấn.
Tình huống: Mất gốc môn Hóa suốt 2 tuần, giáo viên hỏi lớp ai chưa hiểu cần giảng lại. Tuấn phân vân giữa giấu dốt hay giơ tay.

[LỰA CHỌN]
- Lựa chọn A: Giấu dốt, cúi gằm mặt chép bài.
- Lựa chọn B: Mạnh dạn giơ tay hoặc gặp riêng giờ ra chơi nhờ thầy cô hướng dẫn thêm.
- Lựa chọn C: Chép lời giải trên mạng để đối phó bài kiểm tra.

[CAN THIỆP]
Toolkit Help-Seeking & Tự tin giao tiếp học đường.`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-13T13:00:00Z',
    updatedAt: '2026-09-13T13:30:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_smart_goals',
    title: 'Thiết lập mục tiêu thông minh SMART và rèn luyện thói quen bền bỉ',
    ageRange: { min: 11, max: 17 },
    durationMinutes: 3,
    objectives: 'Giúp học sinh chuyển đổi mục tiêu viển vông thành các hành động vi mô có thể thực hiện mỗi ngày (Atomic Habits).',
    constructs: ['GoalSetting', 'Reflection', 'Planning'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Lan.
Tình huống: Quyết tâm đọc 50 trang sách mỗi ngày rồi chán nản bỏ cuộc vào ngày thứ 3, rơi vào tự dằn vặt tiêu cực.

[LỰA CHỌN]
- Lựa chọn A: Ép bản thân đọc bù 100 trang trong mệt mỏi.
- Lựa chọn B: Áp dụng mục tiêu SMART: Đọc đều đặn 5 trang/ngày vào 20h30 sau khi tắm.
- Lựa chọn C: Từ bỏ thói quen đọc sách vì nghĩ mình không có khiếu.

[CAN THIỆP]
Nguyên lý SMART Goals & Thói quen vi mô (Micro-habits).`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-13T15:00:00Z',
    updatedAt: '2026-09-13T15:30:00Z',
    approvedBy: 'Admin Principal'
  },
  {
    id: 'script_failure_growth_mindset',
    title: 'Biến cú ngã điểm kém thành bệ phóng tiến bộ',
    ageRange: { min: 12, max: 17 },
    durationMinutes: 3,
    objectives: 'Rèn luyện Tư duy phát triển (Growth Mindset), biến cảm giác thất vọng thành hành động phân tích nguyên nhân để bứt phá.',
    constructs: ['Reflection', 'SelfRegulation', 'Adaptability'],
    rawScript: `[BỐI CẢNH]
Nhân vật: Bảo.
Tình huống: Nhận bài kiểm tra điểm 4 đỏ chót, cảm giác suy sụp và tự phán xét bản thân là kẻ kém cỏi.

[LỰA CHỌN]
- Lựa chọn A: Vò nát bài kiểm tra, giấu bố mẹ và buông xuôi môn học.
- Lựa chọn B: Tĩnh tâm, phân loại từng lỗi sai (do tính toán ẩu hay chưa hiểu lý thuyết) rồi nhờ bạn hướng dẫn lại.
- Lựa chọn C: Đổ lỗi cho cô giáo ra đề khó và chấm khắt khe.

[CAN THIỆP]
Toolkit Cognitive Reframing (Lật ngược suy nghĩ tiêu cực) & Phản tư sâu sắc.`,
    version: '1.0.0',
    status: 'published',
    createdAt: '2026-09-13T16:00:00Z',
    updatedAt: '2026-09-13T16:30:00Z',
    approvedBy: 'Admin Principal'
  }
];
