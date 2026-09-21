---
id: aud-psy-3x
domain: tam-ly-hoc
level: audit
source: "Rà soát thủ công toàn bộ docs/knowledge/psychology (ngày 2026-09-21) theo STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md"
tags: [audit, tam-ly-hoc, baseline, bao-cao, 3x]
---

# Audit — Bộ tri thức tâm lý học sinh (Baseline trước khi mở rộng 3X)

> Ngày audit: 2026-09-21 · Bản đồ nguồn: `STUDENT_PSYCHOLOGY_KNOWLEDGE_OS_V2_3X.md v2.0`.
> Phương pháp: quét toàn bộ `docs/knowledge/psychology/*`, đối chiếu với 36 miền (§5) và 72 chủ đề (§6) của spec, không giả định tên file.

## 1. Current domains — các lĩnh vực đang có

| Lĩnh vực (thư mục) | Số file | Phạm vi hiện tại |
|---|---|---|
| `development/` | 12 | Tâm lý phát triển THCS 11-15: tổng quan, dậy thì, nhận thức, siêu nhận thức, cảm xúc & xung động, xã hội đồng đẳng, chức năng điều hành, trí nhớ–chú ý, động lực, giấc ngủ, đời sống số, ngữ cảnh Việt Nam |
| `constructs/` | 20 | 20 năng lực target (Planning…Balance) mà micro-game rèn luyện |
| `toolkits/` | 13 | 13 công cụ can thiệp đã duyệt, khớp 1-1 với `approvedToolkits.ts` |
| `wellness/` | 9 | Sức khỏe tâm lý: căng thẳng, lo âu, giấc ngủ, màn hình/game, bạn bè & bắt nạt, giao tiếp gia đình, leo thang hỗ trợ, đạo đức AI |
| `advice/` | 13 | Lời khuyên sau nhiệm vụ theo outcome × thời điểm (nền cho `adviceCatalog.ts`) |
| **Tổng `psychology/`** | **67** | + `docs/PSYCHOLOGY_SUPPORT_BENCHMARK.md` (contract `computeWellness` L1–L6) |

Tổng toàn kho lúc audit: **271 file Markdown** (psychology 67 · science 171 · tools 25 · reliability 4 · root 4).

## 2. Current records — các bản ghi dữ liệu có thể máy đọc

| Bản ghi | Vị trí | Ghi chú |
|---|---|---|
| Advice catalog 13 nhóm | `src/data/adviceCatalog.ts` | outcome × construct × timeOfDay × dayType |
| Toolkit đã duyệt 13 | `src/data/approvedToolkits.ts` | khớp `toolkits/01–13` |
| Máy đo wellness | `src/utils/studentAnalytics.ts` | `computeWellness` → L1_LOW…L6_HUMAN_SUPPORT |

Chưa có **record tình huống/tư vấn nhanh** cấu trúc (none theo schema §54). Kho hoạt động ở dạng tài liệu Markdown con người đọc, chưa có lớp dữ liệu card.

## 3. Current sources — nguồn đang được trích dẫn

- WHO. *Adolescent mental health* (fact sheet) — `wellness/08`, `development/00`.
- UNICEF (2021). *State of the World's Children — On My MindTM* — `wellness/08`.
- Carskadon & Tarokh (2014), Steinberg (2008), Socolar & Rieser (2024) — `development/00`.
- HT2007, DWECK, SDT2009, IRIS, Goldin (chronobiology), Sleep Foundation, self-compassion, Lazarus, O'Driscoll (test anxiety) — nằm trong `advice/00_tong_quan` (`ADVICE_BASIS_LINKS`).
- Bộ GD&ĐT CT 2018 (KHTN/GDCD) — `tools/curriculum`.

**Thiếu hụt nguồn so với §52:** WHO 2025 (*Mental health of adolescents*, cập nhật 01/09/2025), WHO 2024 (*service guidance* 9789240100374), CDC YRBS 2023 (*2023 YRBS Results*, 2024), CDC *School Connectedness*, CDC MMWR *Mental Health & Suicide Risk…* (2024) — chưa đi vào metadata của file.

## 4. Duplicate content — trùng lặp

- **Không có** trùng lặp căn bản giữa `development/`–`constructs/`–`toolkits/–`wellness/–`advice/` (mỗi construct 1 file, mỗi toolkit 1 file — đã kiểm soát bởi CONVENTIONS).
- Trùng lặp **khái niệm chồng lấn** (dự kiến gộp mối tham chiếu, không copy):
  - Lo âu: `wellness/03` ↔ `development/04` ↔ `advice/09` (lo âu thi cử).
  - Bắt nạt: `wellness/06` ↔ `constructs/10` (communication) ↔ `constructs/17` (empathy).
  - Giấc ngủ: `development/09` ↔ `wellness/04` ↔ `advice/07`.
  - Màn hình/game: `development/10` ↔ `wellness/05`.
- Chiến lược 3X: các khái niệm chồng lấn này sẽ **một chủ đề, nhiều bối cảnh** (Bước 8 Deduplication), không sinh thêm bản sao.

## 5. Outdated content — nội dung cần làm mới

| Chỗ | Vấn đề |
|---|---|
| `wellness/08` | Chưa có SAFETY MODE đầy đủ (spec §35) và luồng abuse/safeguarding (§36); mới dừng ở kênh `L6_HUMAN_SUPPORT`. |
| `advice/00` | `ADVICE_BASIS_LINKS` thiếu nguồn 2023–2025 (WHO/CDC cập nhật mới). |
| `development/00` | Chưa chèn dữ liệu WHO 2025 (§52) về tỉ lệ vị thành niên gặp vấn đề sức khỏe tâm thần (~1/7 người 10-19). |
| Metadata | Nhiều file `wellness/` chưa có trường `safetyLevel` / `referral` (theo schema §54). |

## 6. Missing domains — các miền chưa có file riêng

Đối chiếu 36 miền (§5) với file hiện có:

| Miền (spec §5) | Trạng thái |
|---|---|
| A1 Phát triển nhận thức | ✅ `development/02` |
| A2 Phát triển cảm xúc | 🟡 `development/04` (một phần) |
| A3 Phát triển xã hội | ✅ `development/05` |
| A4 Hình thành bản sắc | 🟡 `development/01` (một phần) |
| A5 Tự chủ & độc lập | 🟡 `constructs/13` |
| A6 Điều chỉnh hành vi | ❌ chưa có file riêng |
| B7 Buồn | ❌ (chỉ nhắc trong `wellness/08`) |
| B8 Lo lắng | ✅ `wellness/03` |
| B9 Sợ hãi | ❌ |
| B10 Tức giận | ❌ |
| B11 Xấu hổ | ❌ |
| B12 Ghen tị | ❌ |
| B13 Cô đơn | ❌ |
| B14 Thất vọng | ❌ |
| B15 Cảm giác thất bại | 🟡 `advice/04` |
| B16 Mất động lực | 🟡 `development/08`, `advice/03` |
| C17 Áp lực học tập | ✅ `wellness/02` |
| C18 Thi cử | 🟡 `advice/09`, `wellness/02` |
| C19 Điểm số | 🟡 rải rác |
| C20 Sợ giáo viên | ❌ |
| C21 Trốn học | ❌ |
| C22 Không làm bài | ❌ |
| C23 Mất tập trung | 🟡 `constructs/05` |
| C24 Khó thích nghi lớp mới | 🟡 `constructs/08` (adaptability) |
| D25 Tình bạn | 🟡 `wellness/06` |
| D26 Bắt nạt | ✅ `wellness/06` |
| D27 Bạo lực học đường | ❌ (chỉ nhắc trong `wellness/06`) |
| D28 Cô lập xã hội | ❌ |
| D29 Xung đột nhóm | 🟡 `constructs/16` (cooperation) |
| D30 Áp lực đồng trang lứa | ❌ |
| D31 Từ chối xã hội | ❌ |
| E32 Mâu thuẫn cha mẹ | ❌ |
| E33 Kỳ vọng thành tích | 🟡 `development/11` (ngữ cảnh VN) |
| E34 Ly thân/ly hôn | ❌ |
| E35 Thiếu giao tiếp gia đình | 🟡 `wellness/07` |
| E36 Môi trường gia đình căng thẳng | ❌ |

**Kết luận:** 36 miền → có file trực tiếp ~9, một phần ~10, **chưa có ~17 miền quan trọng** (nhất là nhóm Cảm xúc B, Quan hệ xã hội D, Gia đình E).

## 7. Safety gaps — lỗ hổng an toàn (đối chiếu §35, §36, §37)

| Yêu cầu | Hiện trạng | Hành động 3X |
|---|---|---|
| SAFETY MODE khi có tự hại/tự sát | 🟡 `wellness/08` có leo thang, thiếu quy trình 7 bước của spec | `SAFETY_PROTOCOL.md` |
| Abuse/sexual safety/safeguarding | ❌ chưa có | `SAFETY_PROTOCOL.md` §S2–S3 |
| Phân loại GREEN/YELLOW/ORANGE/RED | ❌ chưa có | `QUICK_CONSULTATION.md` + cards |
| Cấm chẩn đoán, cấm suy diễn 1 dấu hiệu | 🟡 các file wellness có disclaimer, chưa có bộ quy tắc hệ thống | `KNOWLEDGE_V2.md` §Anti-diagnosis |
| Tự sát/tự hại là ưu tiên cao nhất | 🟡 đúng tinh thần, chưa đủ thủ tục | `SAFETY_PROTOCOL.md` |
| Ngôn ngữ nên/không nên dùng | 🟡 rải rác thiếu danh sách chuẩn | `KNOWLEDGE_V2.md` §30–34 |

## 8. Vietnam localization gaps — khoảng trống địa phương hóa (§53)

| Yêu cầu | Hiện trạng |
|---|---|
| Tách GLOBAL / VIETNAM / SCHOOL LOCAL | ❌ chưa có lớp `LOCALIZATION` riêng |
| Ngữ cảnh VN (học thêm, thi cử, kỳ vọng) | 🟡 chỉ `development/11` |
| Dân tộc thiểu số / bối cảnh đặc thù (§43) | ❌ |
| Học sinh nội trú (§44) | ❌ |
| Đường dây hỗ trợ / người lớn tin cậy VN | 🟡 `wellness/08` (cần xác minh số liên hệ từng thời điểm) |
| Dữ liệu CDC YRBS (học sinh trung học Mỹ) — cảnh báo không áp nguyên xi cho VN | ❌ chưa có cảnh báo chính thức | 

## 9. Kết luận & mục tiêu 3X

- **Baseline đo được:** 36 miền → phủ trực tiếp **9/36 (25%)**; 72 chủ đề con → nhiều chủ đề mới thiếu hẳn.
- **Mục tiêu:** nâng phủ lên ~3X thực dụng bằng (a) thêm 5 tài liệu hệ thống (Audit/Matrix/V2/Quick Consult/Safety/Changelog), (b) bộ **quick-consultation cards** cho nhóm tình huống ưu tiên (cảm xúc, trường học, xã hội, gia đình, an toàn, môi trường số), (c) làm mới nguồn WHO 2025/CDC 2024, (d) tách lớp Vietnam localization.
- Bám nguyên tắc: **không chẩn đoán, không xóa kiến thức cũ, không bịa nguồn.**

## 10. Phụ lục — command đã dùng

```powershell
Get-ChildItem docs/knowledge/psychology -Recurse -Filter *.md | Group-Object Directory | Select-Object Name,Count
(Get-ChildItem docs/knowledge -Recurse -Filter *.md).Count   # = 271
```