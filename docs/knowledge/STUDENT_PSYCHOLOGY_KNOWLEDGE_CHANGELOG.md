---
id: psy-changelog
category: system
source: internal
tags: [hệ-thống, changelog, lịch-sử]
---

# STUDENT PSYCHOLOGY — KNOWLEDGE CHANGELOG (v 2.1)

> Ghi nhận mọi thay đổi lớn của kho tri thức tâm lý học sinh. Phiên bản hiện tại: **v2.1** (bản "3X" mở rộng).

---

## v2.0 → v2.1 (Giai đoạn "3X")

### Thêm mới — Tài liệu hệ thống (5)
| ID | File | Nội dung |
|---|---|---|
| aud-psy-3x | `docs/audit/STUDENT_PSYCHOLOGY_KNOWLEDGE_AUDIT.md` | Audit baseline: số file, gaps, mục tiêu 3X |
| psy-matrix-3x | `docs/knowledge/STUDENT_PSYCHOLOGY_COVERAGE_MATRIX.md` | Ma trận phủ 36 miền × 72 chủ đề + ưu tiên |
| psy-kb-v2 | `docs/knowledge/STUDENT_PSYCHOLOGY_KNOWLEDGE_V2.md` | Kiến thức v2: khung tầng, phân loại màu, quy trình cốt lõi |
| psy-quick-consult | `docs/knowledge/STUDENT_PSYCHOLOGY_QUICK_CONSULTATION.md` | Khung RAPID + index 23 cards |
| psy-safety-protocol | `docs/knowledge/STUDENT_PSYCHOLOGY_SAFETY_PROTOCOL.md` | SAFETY MODE + SAFEGUARDING + bắt nạt |

### Thêm mới — Quick Consultation Cards (23)
- Thư mục `docs/knowledge/psychology/consult/`.
- IDs `psy-sit-01` → `psy-sit-23`: situations thường gặp (vui ngắn gọn trong section Bảng 2 của `QUICK_CONSULTATION.md`).
- Độ phủ mục tiêu S-priority: bắt nạt/cyberbullying/self-harm/abuse/cô lập research và học đường.

### Cải tiến
- Chuẩn datamodel card theo §54: `situation/observable_signs/possible_explanations/questions/first_response/avoid/protective_factors/monitoring/referral/emergency/safetyLevel/evidence/version`.
- `safetyLevel` gán màu theo §37; card 20/21 = RED để cảnh báo an toàn tuyệt đối.
- Thêm các nguồn WHO (2024/2025), CDC, UNICEF vào phần evidence.

---

## v1.x → v2.0 (lịch sử trước đó — cơ sở)
- Kho `psychology/` ban đầu: advice (13), constructs (20), development (12), toolkits (13), wellness (9).
- Được đo baseline qua audit: 36 miền phủ trực tiếp 9/36 (25%) → 3X mở rộng.
- (Những bản cập nhật nhỏ trước v2.1 không ghi chi tiết ở đây; v2.1 bắt đầu log đầy đủ theo chuẩn này.)

---

## Phiên bản
| Phiên bản | Ngày | Ghi chú |
|---|---|---|
| v2.1 | 2026-09-21 | Thêm 5 tài liệu hệ thống + 23 cards; bắt đầu log theo chuẩn |
| v2.0 | (trước) | Cơ sở 3X: mục tiêu mở rộng kho từ 1X → 3X |

## Hướng dẫn cập nhật
- Mỗi thay đổi tri thức/định tuyến → thêm dòng vX.Y_Y+1 ở trên (mục "Thêm mới/Cải tiến").
- Card mới: phải tạo trong `psychology/consult/`, có datamodel hợp lệ, cập nhật index `QUICK_CONSULTATION.md` Bảng 2 + `CHANGELOG.md` này.
- Nguồn mới: tuân thủ §51 (thứ bậc nguồn) chi tiết trong `KNOWLEDGE_V2.md`.