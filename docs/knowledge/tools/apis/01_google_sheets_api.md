---
id: tool-google-sheets-api
category: api
official_url: "https://developers.google.com/sheets/api"
source: "https://developers.google.com/sheets/api/limits"
tags: [google-sheets, api, ledger, quota, apps-script, batch]
---

# Google Sheets API v4 — "Ledger" dữ liệu chính của EduChoice-AI

## Giới thiệu

**Google Sheets API v4** là REST API của Google để đọc/ghi dữ liệu trong Google Sheets. Trong kiến trúc EduChoice-AI, Google Sheets đóng vai trò **cơ sở dữ liệu sổ cái (ledger)** — mọi bản ghi (cấu hình, người dùng, phản hồi, phiên làm bài, telemetry, audit) được lưu theo 39 schema định nghĩa trong `v9SchemaRegistry.ts` và được truy cập qua **lớp Apps Script proxy** (Router.gs, Repository.gs, Sync.gs...).

## Nội dung & đối tượng

- Trao đổi dữ liệu bằng API methods: `spreadsheets.values.get/append/update`, `spreadsheets.batchUpdate` (vận hành atomic), `batchGet/batchUpdateValues`.
- Hỗ trợ kỹ thuật:
  - Đọc/ghi JSON trực tiếp qua giao diện REST.
  - OAuth 2.0 hoặc key API; dùng được cả từ Apps Script (Api services nội bộ) mà không cần key.
- Áp dụng trong dự án: `v9Client.ts` (offline queue, idempotency REQ ids, read-back verification) + `v10Client.ts` (gateway `bridge | direct_apps_script`) + `apps-script/` (Auth.gs, Audit.gs, Validation.gs...).

## Quota & giới hạn (đã kiểm chứng)

Theo tài liệu chính thức `developers.google.com/sheets/api/limits` (được cập nhật gần nhất trong các lần kiểm tra):
- **Read requests**: 300/phút/project; 60/phút/user/project.
- **Write requests**: 300/phút/project; 60/phút/user/project.
- Không có giới hạn tổng request mỗi ngày (chỉ giới hạn theo phút).
- **2 MB** payload khuyến nghị tối đa/request.
- Timeout khi xử lý một request > **180 giây**.
- Atomic: nếu 1 request không hợp lệ trong `batchUpdate`, toàn bộ update bị từ chối.
- Giới hạn bảng tính: 10 triệu ô, 18.278 cột, 50.000 ký tự/ô.
- **Hội đủ**: "All use of the Google Sheets API is available at no additional cost."

## Bản quyền & điều kiện sử dụng

- API miễn phí trong giới hạn quota; vượt quota → HTTP **429 Too Many Requests** (cần exponential backoff).
- Dữ liệu trong sheet thuộc chủ sở hữu/tài khoản Google; phải tuân thủ Chính sách dữ liệu Google và quyền chia sẻ của file.

## Cơ hội tích hợp vào EduChoice-AI (phù hợp hiện trạng)

- **Đã dùng đúng hướng**: kiến trúc sổ cái + Apps Script proxy khiến EduChoice-AI không phụ thuộc máy chủ riêng — tối ưu chi phí MVP.
- **Khuyến nghị tuân thủ quota**: batch gộp ghi (batchUpdateValues) và cache đọc (cache tại Apps Script) để không chạm trần 300 RPM.
- **Đối chiếu khi ghép nền tảng ngoài** (Moodle/Classroom/Teams): luôn map về ledger Sheets trước rồi mới xuất ra nền tảng, giữ một nguồn dữ liệu duy nhất.
- **Cảnh báo 180 giây**: nếu một sync lớn bị timeout, tách thành nhiều lô nhỏ (mô hình `Sync.gs` phân trang).

## Rủi ro & lưu ý pháp lý/đạo đức

- Lưu dữ liệu học sinh THCS vào Drive/Sheets phải đáp ứng Nghị định 147/2024/NĐ-CP và cam kết bảo mật với nhà trường; mã hoá dữ liệu nhạy cảm trong ô (hoặc băm ID).
- Audit: mọi thao tác ghi phải đi qua Audit.gs ghi vào 31_AUDIT_LOG để truy vết.
- Không chia sẻ sheet công khai; giới hạn quyền editor chỉ cho service account/proxy.
- Giới hạn 2MB → các bản ghi telemetry lớn cần nén hoặc chỉ ghi tổng hợp.

## Nguồn tham khảo

- Usage limits chính thức: https://developers.google.com/sheets/api/limits
- Google Sheets API reference: https://developers.google.com/sheets/api/reference/rest