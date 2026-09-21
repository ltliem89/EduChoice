---
id: rel-04
domain: reliability-audit
page: 4/4
source: Kiểm tra mã nguồn trực tiếp (mlForecasting.ts, AppContext.tsx, researchV5Data.ts)
tags: [reliability, audit, ml, forecasting, demo-data, trustworthiness]
---

# Audit Độ Tin Cậy #4: Dữ liệu demo cứng bị hiển thị như dữ liệu thật trong ML Forecasting

## Mục đích
Kiểm tra chuỗi thời gian mà UI "Dự báo tăng trưởng năng lực" đang vẽ có phải số thật
của học sinh hay là số tạo sẵn.

## Phát hiện chính
### `getConstructTimeSeriesData` — MLForecastingView dùng toàn bộ dữ liệu giả
- `mlForecasting.ts:451-476`: hàm trả về chuỗi 11 phiên với ngày **cố định tháng 8-9/2026**
  và danh sách số **tạo sẵn** cho từng construct (`overall`, `Planning`, `Persistence`,
  `SelfRegulation`, `DistractionRecovery`, `TaskCompletion`...). Không đọc từ
  `studentModel.growthHistory` / Google Sheets.
- `MLForecastingView.tsx:91,109`: gọi thẳng `getConstructTimeSeriesData(selectedConstruct)`
  → màn hình "ML Forecast" hiện đường xu hướng, R², khoảng tin cậy 95% của DỮ
  LIỆU GIẢ, không phải hành vi học sinh.
- Hệ quả nghiêm trọng: dashboard nghiên cứu (AdminPortal > Research) vẽ "dự báo tăng
  trưởng" ảo → người dùng bên ngoài (ban giám hiệu, phụ huynh) tin đó là năng lực thật.

### Phụ: `TaskCompletion` không phải construct; 'overall' trùng default
- `mlForecasting.ts:465`: có key `TaskCompletion` — không nằm trong 20 `ConstructName`
  (types.ts:135-155) → từ khóa mồi nhầm cho dropdown.
- `mlForecasting.ts:468`: `|| seriesMap['overall']` — mọi construct không có series sẽ
  trả về cùng chuỗi "overall" mà không đánh dấu, gây lặp chuỗi giả.

### Phụ: `researchV5Data.ts` dùng `lastEvaluated` là hằng string '2026-08-20'
- File demo research có ngày đánh giá khóa trong mã (không phải nguồn dữ liệu chính của
  app, RIÊNG biệt với nguồn đang hoạt động), nhưng cùng năm/kiểu hằng cứng với chuỗi
  forecasting → nguy cơ nhầm lẫn với dữ liệu chạy thật.

## Đề xuất khắc phục (ưu tiên cao)
1. Chuyển `getConstructTimeSeriesData` thành hàm đọc `growthHistory` thật:
   `buildSeriesFromGrowthHistory(studentModel.growthHistory, construct)` — chỉ fallback
   series giả khi **có 0 điểm** và phải over-ride `isDemo: true` để UI hiện huy hiệu
   "DỮ LIỆU DEMO".
2. Mỗi `ForecastPoint`/`ModelMetrics` thêm cờ `source: 'real' | 'demo'`; MLForecastingView
   hiển thị rõ nguồn + banner khi trộn demo.
3. Bỏ `TaskCompletion`, gom tên construct từ `CONSTRUCT_LABELS` (20 giá trị).
4. `fitLinearRegression` ném lỗi khi n<2 (mlForecasting.ts:50) → viewer phải bắt lỗi và
   hiển thị "cần ≥2 lần đo", không hiện đồ thị giả.
5. Xóa/đổi tên hằng ngày 2026 trong researchV5Data.ts nếu không còn dùng production.

> ✅ **ĐÃ KHẮC PHỤC (2026-09-21)**: `getConstructTimeSeriesData(constructKey,
> growthHistory?)` nay ưu tiên dữ liệu growthHistory thật (≥2 lần đo); khi fallback demo
> mỗi điểm gán `isDemo: true`; bỏ `TaskCompletion` khỏi seriesMap (mlForecasting.ts).
> MLForecastingView truyền `studentModel.growthHistory`, xóa option `TaskCompletion`, và
> hiển thị banner `DỮ LIỆU DEMO (MINH HOẠ)` khi mọi điểm là demo.

## Nguồn tham khảo
- `src/utils/mlForecasting.ts` L45-52 (fitLinearRegression guard), L451-476 (series giả)
- `src/components/AdminPortal/Research/MLForecastingView.tsx` L35, L91, L109
- `src/context/AppContext.tsx` L693-730 (`updateStudentConstruct`, growthHistory dedupe
  theo ngày + slice -240)
- `src/data/researchV5Data.ts` L119, 149, 179 (`lastEvaluated` cứng)
- `src/types.ts:135-155` (20 ConstructName — TaskCompletion không tồn tại)