---
id: kb-conv
domain: knowledge-base
level: root
source: Quy ước nội bộ dự án
tags: [knowledge-base, conventions]
---

# Conventions — Chuẩn viết & thêm file vào docs/knowledge

Áp dụng cho MỌI file Markdown trong `docs/knowledge/`. Mục tiêu: file nhất quán, máy đọc
được, LLM tiêu thụ tốt, đếm được, không trùng lặp.

## 1. Đặt tên file
- Chỉ ASCII: chữ thường không dấu (diacritics bỏ), gạch dưới ngăn từ, ví dụ
  `05_ba_the_cua_chat.md`, `01_planning_lap_ke_hoach.md`.
- Tiền tố 2 chữ số ở đầu (`00`–`99`) để giữ thứ tự ổn định trong mỗi thư mục.
- Phải có đuôi `.md`.

## 2. Metadata block bắt buộc (đầu file)
```yaml
---
id: <prefix>-<so>          # ví dụ khtn6-05, psy-dev-02, tool-plat-07
domain: <lanh-vuc>          # khoa-hoc-tu-nhien | tam-ly-hoc | cong-cu-nguon | reliability-audit
source: <nguon chinh thuc / cach ing>   # ghi rõ Bộ GD&ĐT, tác giả, trang, năm
tags: [...]                 # mảng tiếng Việt/ASCII có dấu để grep & lọc
---
```
- Hàng 1 KHÔNG để trống ngoài khung `---`. Không viết `title` riêng ngoài `# <Tên>`.
- `id` phải duy nhất toàn kho; dùng nhóm prefix sau:
  `khtn6-`/`khtn7-`/`khtn8-`/`khtn9-`, tâm lý học dùng `psy-<tầng><2 số>` (0=development,
  `psy-dev-`, `psy-1xx` constructs/`psy-con-`, `psy-2xx` toolkits/`psy-tool-`, `psy-3xx`
  wellness/`psy-wel-`, `psy-4xx` advice/`psy-adv-`), thêm `tool-plat-`, `tool-api-`,
  `tool-curr-`, `rel-`.

## 3. Cách chia section (tuân theo thứ tự này khi có thể)
```
# <Tiêu đề>

## Mục tiêu (yêu cầu cần đạt)      (khoa học) / ## Mục đích (audit, tools)
## Kiến thức cốt lõi                (hoặc ## Phát hiện)
## Thuật ngữ quan trọng             (khoa học)
## Vận dụng thực tiễn               (khoa học)
## Câu hỏi ôn tập / Kiểm tra        (mỗi câu kèm "(Đáp án: ...)")
## Liên hệ với EduChoice-AI         (mỗi file tâm lý/khoa học nhắc construct mục tiêu)
## Căn cứ lý thuyết / nguồn thật     (ghi URL/tài liệu đã dùng; tools/apis/psychology bắt buộc)
```

## 4. Quy tắc nội dung "thật, không bịa"
- Mỗi thông tin định lượng (cm/năm, tiết/tuần, giá, quota, %...) phải có nguồn đi kèm.
- Nếu chỉ chắc chắn 80%: viết `> ⚠️ CẦN XÁC MINH` ngay trước câu đó, kèm lý do ngắn.
- KHÔNG đoán đường link. Nếu không nhớ chính xác URL, ghi văn bản miêu tả
  ("search 'Khan Academy' trên trang chính thức khanacademy.org").
- Không trích dẫn kiểu tạo lập dữ liệu cho riêng dự án (vd series giả) vào file nội dung
  khoa học; nếu là ví dụ demo thì ghi rõ `isDemo`/`DỮ LIỆU DEMO`.
- Tâm lý: mọi mô tả triệu chứng đều kèm chú dẫn giới hạn — "đây là kiến thức giáo dục,
  không phải chẩn đoán". Wellness luôn có đoạn leo thang cảnh báo + khuyến nghị chuyên gia.

## 5. Kích thước & chất lượng
- 90–220 dòng mỗi file. Dưới 90: gộp; trên 220: tách chủ đề con.
- Mỗi file khoa học có ít nhất 5 câu hỏi ôn tập kèm đáp án ngắn.
- Dùng bảng Markdown khi so sánh ≥3 đối tượng (3 thể của chất, tỉ lệ Lý/Hóa/Sinh...).

## 6. Chống trùng lặp
- Trước khi tạo file: grep từ khóa chính trong thư mục đích. Nếu chủ đề đã có, CẬP NHẬT
  file cũ thay vì sinh file mới.
- Mỗi construct chỉ có 1 file trong `psychology/constructs/`, 1 file trong `toolkits/`.
- Số prefix không được đổi không lý do; nếu đánh số lại cả thư mục thì cập nhật 00_INDEX.

## 7. Kiểm tra trước khi commit
1. `Get-ChildItem -Recurse -Filter *.md docs/knowledge | Measure-Object` → cập nhật mục
   "Thống kê" trong README.
2. `rg -l "CẦN XÁC MINH" docs/knowledge` → biết những chỗ còn mở.
3. `rg -l "id: " docs/knowledge` trùng id (2 file cùng id) → sửa trước khi push.
4. Xem 00_INDEX.md có liệt kê file mới chưa; chưa thì thêm.

## 8. Lệnh tiện (Windows PowerShell)
```powershell
Get-ChildItem -Recurse -Filter *.md docs/knowledge | Group-Object { ($_.FullName -replace [regex]::Escape((Resolve-Path docs/knowledge).Path + '\'), '') -replace '\\.*','' } | Select Name,Count
```