---
id: tool-firebase-auth
category: api
official_url: "https://firebase.google.com/docs/auth"
source: "https://firebase.google.com/pricing; https://firebase.google.com/docs/auth"
tags: [firebase, auth, xac-thuc, oauth, spark, blaze, mien-phi]
---

# Firebase Authentication — Tùy chọn xác thực người dùng

## Giới thiệu

**Firebase Authentication** là dịch vụ xác thực của Google, cung cấp đăng nhập bằng email/mật khẩu, mạng xã hội (Google, Apple, Facebook, GitHub...), số điện thoại, anonymous và custom token.

- Hai gói thanh toán: **Spark** (miễn phí, không cần thẻ) và **Blaze** (pay-as-you-go).
- Có tùy chọn nâng cấp **Identity Platform** (SAML, OIDC, multi-tenancy, blocking functions) với chính sách giá khác.

## Giá & free tier (đã kiểm chứng theo trang chính thức)

- **Base product (không dùng Identity Platform)**:
  - Email/password, social login, anonymous, custom: **miễn phí** ở mọi quy mô trên gói Spark và Blaze (cho "most sign-in providers").
  - Phone (SMS) auth: tính phí theo từng SMS gửi.
- **Identity Platform (nâng cấp)**:
  - Spark giới hạn ~**3.000 daily active users (DAU)** cho email/social/anonymous.
  - Blaze miễn phí tới **50.000 monthly active users (MAU)**, vượt trần tính phí theo MAU.
- Hiện dự án chưa dùng Firebase; mô hình hiện tại dựa chủ yếu vào pseudonymous student IDs + Google OAuth qua Apps Script proxy.

## Bản quyền & điều kiện sử dụng

- Firebase thuộc Google; sử dụng theo Điều khoản dịch vụ Google và chính sách bảo vệ dữ liệu.
- Dữ liệu xác thực (email, SĐT) đặt dưới sự kiểm soát của tổ chức triển khai; cần DPA khi đưa vào sản phẩm B2B.

## Cơ hội tích hợp vào EduChoice-AI

- **Bổ sung xác thực thực thụ** cho ứng dụng web React hiện tại: Google OAuth + email/password cho giáo viên/phụ huynh; tài khoản học sinh có thể giữ **pseudonymous** để giảm diện tích dữ liệu cá nhân.
- **Kết nối Google Cloud**: chung hệ sinh thái Google với Sheets ledger (tài khoản Firebase và Google Cloud dùng chung).
- **MVP không cần thiết**: nếu dự án muốn ít phụ thuộc, giữ model xác thực hiện hữu (Google OAuth + provider riêng trong Auth.gs) và đánh giá Firebase khi cần anonymous/phone hoặc multi-provider.

## Rủi ro & lưu ý pháp lý/đạo đức

- **Người dùng THCS (dưới 16 tuổi)**: theo Nghị định 147/2024/NĐ-CP cần xác thực tài khoản và có đồng thuận người giám hộ khi lập tài khoản mạng/ứng dụng; thuê xác thực không làm thay nghĩa vụ này.
- Không bật thu thập dữ liệu xác thực vượt nhu cầu; liên kết tài khoản-login với pseudonymous student ID ở layer ứng dụng (không lưu chung bảng với điểm số).
- Audit mọi đăng nhập vào 31_AUDIT_LOG; xử lý sai sót (Password reset) phải có quy trình riêng.

## Nguồn tham khảo

- Firebase Authentication docs: https://firebase.google.com/docs/auth
- Firebase pricing: https://firebase.google.com/pricing
- Chi tiết Identity Platform limits: https://firebase.google.com/docs/auth (mục pricing/usage limits)