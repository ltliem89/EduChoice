# Data Dictionary — EduChoice-AI

Các thuật ngữ chuẩn dùng trong deck. Theo đặc tả: trình bày và vấn đáp phải dùng cùng từ vựng.
| Thuật ngữ | Định nghĩa |
| --- | --- |
| Behavior Event | Sự kiện vi mô trong game (chọn, đổi lựa chọn, dừng, trợ giúp, chuyển scene) được đo thật |
| Situation | Tình huống học tập được nhận diện từ chuỗi hành vi (không phải chẩn đoán lâm sàng) |
| Student State / Model | Tích lũy bằng chứng hành vi của học sinh (construct scores) |
| Rule Engine | Tầng logic quyết định + ràng buộc an toàn (deterministic, không AI) |
| Gemini | Mô hình AI hỗ trợ reasoning giữa các lựa chọn trong allow-list (gemini-3.8-flash) |
| Adaptive Engine | Lựa chọn cuối cùng sau validation — hành động hệ thống thực thi |
| Intervention | Can thiệp thích ứng: micro-nudge / prompt / micro-action / game / đề xuất GV |
| Transfer | Chuyển hóa kỹ năng từ game sang vi hành động đời thực (đo riêng) |
| Demo / In-Memory Mock | Data layer hiện tại: IN_MEMORY_MOCK, chưa nối Google Sheets thật |
| No-PII | Chỉ dùng ID giả định danh (STU_xxx), không lưu tên thật/email/SĐT |
