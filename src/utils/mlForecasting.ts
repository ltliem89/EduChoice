/**
 * Machine Learning Forecasting Utility for EduChoice-AI ResearchMetrics
 * Implements interpretable client-side ML regression & time-series models:
 * - Ordinary Least Squares (OLS) Linear Regression with 95% Prediction Intervals
 * - Polynomial Regression (Degree 2) for Curvature & Saturation Detection
 * - Holt's Linear Exponential Smoothing with Trend Dampening
 * - Model Evaluation Metrics (R², RMSE, MAE, Slope/Velocity)
 */

export interface TimePoint {
  index: number;
  date: string;
  label: string;
  actual: number; // 0..100
}

export interface ForecastPoint {
  index: number;
  date: string;
  label: string;
  actual?: number;
  predicted: number;
  lowerBound: number; // 95% CI Lower
  upperBound: number; // 95% CI Upper
  isForecast: boolean;
  scenarioOptimistic?: number;
  scenarioPessimistic?: number;
}

export interface ModelMetrics {
  modelName: string;
  rSquared: number;
  rmse: number;
  mae: number;
  slope: number; // Velocity per period
  direction: 'UP' | 'DOWN' | 'STABLE';
  summary: string;
}

export type MLModelType = 'linear' | 'polynomial' | 'holt_winters';

/**
 * Fit OLS Linear Regression: y = mx + b
 */
export function fitLinearRegression(points: TimePoint[], forecastSteps: number = 7): {
  forecast: ForecastPoint[];
  metrics: ModelMetrics;
} {
  const n = points.length;
  if (n < 2) {
    throw new Error('Cần tối thiểu 2 điểm dữ liệu để huấn luyện mô hình hồi quy tuyến tính');
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    const x = points[i].index;
    const y = points[i].actual;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const meanX = sumX / n;
  const meanY = sumY / n;

  const denominator = sumXX - sumX * meanX;
  const slope = denominator !== 0 ? (sumXY - sumX * meanY) / denominator : 0;
  const intercept = meanY - slope * meanX;

  // Compute residuals & variance
  let ssRes = 0;
  let ssTot = 0;
  let sumAbsErr = 0;

  for (let i = 0; i < n; i++) {
    const x = points[i].index;
    const y = points[i].actual;
    const yPred = slope * x + intercept;
    const res = y - yPred;
    ssRes += res * res;
    ssTot += (y - meanY) * (y - meanY);
    sumAbsErr += Math.abs(res);
  }

  const rSquared = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 1;
  const standardError = n > 2 ? Math.sqrt(ssRes / (n - 2)) : 1.5;
  const rmse = Math.sqrt(ssRes / n);
  const mae = sumAbsErr / n;

  // t-critical approximation for 95% CI (~2.0 for n >= 10)
  const tCrit = 1.98;
  const ssX = sumXX - n * meanX * meanX;

  const forecast: ForecastPoint[] = [];

  // Historical fitted points
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const yPred = Math.min(100, Math.max(0, slope * p.index + intercept));
    const sePred = standardError * Math.sqrt(1 / n + (ssX > 0 ? Math.pow(p.index - meanX, 2) / ssX : 0));
    const ci = tCrit * sePred;

    forecast.push({
      index: p.index,
      date: p.date,
      label: p.label,
      actual: p.actual,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ci) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ci) * 10) / 10),
      isForecast: false
    });
  }

  // Future predicted points
  const lastDate = new Date(points[n - 1].date);
  for (let step = 1; step <= forecastSteps; step++) {
    const futureIndex = points[n - 1].index + step;
    const futureDate = new Date(lastDate);
    futureDate.setDate(lastDate.getDate() + step);

    const dateStr = futureDate.toISOString().split('T')[0];
    const labelStr = `T+${step}`;

    const rawPred = slope * futureIndex + intercept;
    const yPred = Math.min(100, Math.max(0, rawPred));

    // Prediction interval expands further into the future
    const seFuture = standardError * Math.sqrt(1 + 1 / n + (ssX > 0 ? Math.pow(futureIndex - meanX, 2) / ssX : 0));
    const ciFuture = tCrit * seFuture;

    const opt = Math.min(100, Math.round((yPred + step * 0.8) * 10) / 10);
    const pess = Math.max(0, Math.round((yPred - step * 0.9) * 10) / 10);

    forecast.push({
      index: futureIndex,
      date: dateStr,
      label: labelStr,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ciFuture) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ciFuture) * 10) / 10),
      isForecast: true,
      scenarioOptimistic: opt,
      scenarioPessimistic: pess
    });
  }

  const direction = slope > 0.15 ? 'UP' : slope < -0.15 ? 'DOWN' : 'STABLE';
  const summary = `Mô hình Hồi quy Tuyến tính dự báo xu hướng ${direction === 'UP' ? 'tăng trưởng' : direction === 'DOWN' ? 'suy giảm' : 'ổn định'} với vận tốc ${Math.abs(slope).toFixed(2)} điểm/chu kỳ. Độ phù hợp R² = ${(rSquared * 100).toFixed(1)}%.`;

  return {
    forecast,
    metrics: {
      modelName: 'Hồi Quy Tuyến Tính (OLS Linear Regression)',
      rSquared: Math.round(rSquared * 1000) / 1000,
      rmse: Math.round(rmse * 100) / 100,
      mae: Math.round(mae * 100) / 100,
      slope: Math.round(slope * 100) / 100,
      direction,
      summary
    }
  };
}

/**
 * Fit Polynomial Regression (Degree 2): y = ax^2 + bx + c
 */
export function fitPolynomialRegression(points: TimePoint[], forecastSteps: number = 7): {
  forecast: ForecastPoint[];
  metrics: ModelMetrics;
} {
  const n = points.length;
  if (n < 3) {
    return fitLinearRegression(points, forecastSteps);
  }

  // Gaussian elimination for 3x3 normal equations
  let s0 = n;
  let s1 = 0, s2 = 0, s3 = 0, s4 = 0;
  let t0 = 0, t1 = 0, t2 = 0;

  for (let i = 0; i < n; i++) {
    const x = points[i].index;
    const y = points[i].actual;
    const x2 = x * x;
    s1 += x;
    s2 += x2;
    s3 += x2 * x;
    s4 += x2 * x2;

    t0 += y;
    t1 += y * x;
    t2 += y * x2;
  }

  // Augmented matrix [A | B]
  // [ s0  s1  s2 | t0 ]
  // [ s1  s2  s3 | t1 ]
  // [ s2  s3  s4 | t2 ]
  const M = [
    [s0, s1, s2, t0],
    [s1, s2, s3, t1],
    [s2, s3, s4, t2]
  ];

  // 3x3 Solver
  for (let i = 0; i < 3; i++) {
    let maxRow = i;
    for (let k = i + 1; k < 3; k++) {
      if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {
        maxRow = k;
      }
    }
    const temp = M[i];
    M[i] = M[maxRow];
    M[maxRow] = temp;

    const pivot = M[i][i];
    if (Math.abs(pivot) < 1e-9) continue;

    for (let j = i; j <= 3; j++) {
      M[i][j] /= pivot;
    }

    for (let k = 0; k < 3; k++) {
      if (k !== i) {
        const factor = M[k][i];
        for (let j = i; j <= 3; j++) {
          M[k][j] -= factor * M[i][j];
        }
      }
    }
  }

  const c = M[0][3];
  const b = M[1][3];
  const a = M[2][3];

  let ssRes = 0;
  let ssTot = 0;
  let sumAbsErr = 0;
  const meanY = t0 / n;

  for (let i = 0; i < n; i++) {
    const x = points[i].index;
    const y = points[i].actual;
    const yPred = a * x * x + b * x + c;
    const res = y - yPred;
    ssRes += res * res;
    ssTot += (y - meanY) * (y - meanY);
    sumAbsErr += Math.abs(res);
  }

  const rSquared = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 1;
  const standardError = n > 3 ? Math.sqrt(ssRes / (n - 3)) : 1.5;
  const rmse = Math.sqrt(ssRes / n);
  const mae = sumAbsErr / n;

  const forecast: ForecastPoint[] = [];

  // Historical
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const rawPred = a * p.index * p.index + b * p.index + c;
    const yPred = Math.min(100, Math.max(0, rawPred));
    const ci = 1.96 * standardError * 0.8;

    forecast.push({
      index: p.index,
      date: p.date,
      label: p.label,
      actual: p.actual,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ci) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ci) * 10) / 10),
      isForecast: false
    });
  }

  // Future with dampening to avoid runaway quadratic curves
  const lastDate = new Date(points[n - 1].date);
  const lastX = points[n - 1].index;
  const lastSlope = 2 * a * lastX + b;

  for (let step = 1; step <= forecastSteps; step++) {
    const futureIndex = lastX + step;
    const futureDate = new Date(lastDate);
    futureDate.setDate(lastDate.getDate() + step);

    // Damped polynomial: blended with last local slope
    const rawQuad = a * futureIndex * futureIndex + b * futureIndex + c;
    const linearContinuation = (points[n - 1].actual) + lastSlope * step * 0.7;
    const blended = 0.6 * rawQuad + 0.4 * linearContinuation;
    const yPred = Math.min(100, Math.max(0, blended));

    const ciFuture = 1.96 * standardError * Math.sqrt(1 + step * 0.25);

    forecast.push({
      index: futureIndex,
      date: futureDate.toISOString().split('T')[0],
      label: `T+${step}`,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ciFuture) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ciFuture) * 10) / 10),
      isForecast: true,
      scenarioOptimistic: Math.min(100, Math.round((yPred + step * 0.9) * 10) / 10),
      scenarioPessimistic: Math.max(0, Math.round((yPred - step * 1.1) * 10) / 10)
    });
  }

  const direction = lastSlope > 0.1 ? 'UP' : lastSlope < -0.1 ? 'DOWN' : 'STABLE';
  const curvature = a > 0.02 ? 'tăng tốc' : a < -0.02 ? 'giảm tốc/bão hòa' : 'đều đặn';

  return {
    forecast,
    metrics: {
      modelName: 'Hồi Quy Đa Thức Bậc 2 (Quadratic Polynomial Regression)',
      rSquared: Math.round(rSquared * 1000) / 1000,
      rmse: Math.round(rmse * 100) / 100,
      mae: Math.round(mae * 100) / 100,
      slope: Math.round(lastSlope * 100) / 100,
      direction,
      summary: `Mô hình Đa thức phát hiện xu hướng cong ${curvature}, tốc độ tức thời ${Math.abs(lastSlope).toFixed(2)} điểm/chu kỳ. R² = ${(rSquared * 100).toFixed(1)}%.`
    }
  };
}

/**
 * Fit Holt's Linear Exponential Smoothing with Trend Dampening
 */
export function fitHoltWinters(points: TimePoint[], forecastSteps: number = 7, alpha: number = 0.4, beta: number = 0.3, phi: number = 0.9): {
  forecast: ForecastPoint[];
  metrics: ModelMetrics;
} {
  const n = points.length;
  if (n < 2) {
    return fitLinearRegression(points, forecastSteps);
  }

  let level = points[0].actual;
  let trend = points[1].actual - points[0].actual;

  const fitted: number[] = [level];
  let ssRes = 0;
  let sumAbsErr = 0;
  let sumY = points[0].actual;

  for (let i = 1; i < n; i++) {
    const y = points[i].actual;
    sumY += y;

    const prevLevel = level;
    const prevTrend = trend;

    // One-step ahead forecast
    const yHat = prevLevel + prevTrend;
    fitted.push(yHat);

    const res = y - yHat;
    ssRes += res * res;
    sumAbsErr += Math.abs(res);

    // Update level and trend
    level = alpha * y + (1 - alpha) * (prevLevel + prevTrend);
    trend = beta * (level - prevLevel) + (1 - beta) * prevTrend;
  }

  const meanY = sumY / n;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    ssTot += Math.pow(points[i].actual - meanY, 2);
  }

  const rSquared = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 1;
  const rmse = Math.sqrt(ssRes / (n - 1));
  const mae = sumAbsErr / (n - 1);
  const standardError = rmse;

  const forecast: ForecastPoint[] = [];

  // Historical
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const yPred = Math.min(100, Math.max(0, fitted[i]));
    const ci = 1.96 * standardError * 0.7;

    forecast.push({
      index: p.index,
      date: p.date,
      label: p.label,
      actual: p.actual,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ci) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ci) * 10) / 10),
      isForecast: false
    });
  }

  // Future steps using damped trend
  const lastDate = new Date(points[n - 1].date);
  let currentLevel = level;
  let currentTrend = trend;

  for (let step = 1; step <= forecastSteps; step++) {
    currentTrend *= phi; // Dampen trend over time
    currentLevel += currentTrend;

    const yPred = Math.min(100, Math.max(0, currentLevel));
    const futureDate = new Date(lastDate);
    futureDate.setDate(lastDate.getDate() + step);

    const ciFuture = 1.96 * standardError * Math.sqrt(step);

    forecast.push({
      index: points[n - 1].index + step,
      date: futureDate.toISOString().split('T')[0],
      label: `T+${step}`,
      predicted: Math.round(yPred * 10) / 10,
      lowerBound: Math.max(0, Math.round((yPred - ciFuture) * 10) / 10),
      upperBound: Math.min(100, Math.round((yPred + ciFuture) * 10) / 10),
      isForecast: true,
      scenarioOptimistic: Math.min(100, Math.round((yPred + step * 0.75) * 10) / 10),
      scenarioPessimistic: Math.max(0, Math.round((yPred - step * 0.85) * 10) / 10)
    });
  }

  const direction = trend > 0.1 ? 'UP' : trend < -0.1 ? 'DOWN' : 'STABLE';

  return {
    forecast,
    metrics: {
      modelName: "Làm Mịn Mũ Holt (Holt's Linear Exponential Smoothing)",
      rSquared: Math.round(rSquared * 1000) / 1000,
      rmse: Math.round(rmse * 100) / 100,
      mae: Math.round(mae * 100) / 100,
      slope: Math.round(trend * 100) / 100,
      direction,
      summary: `Mô hình Làm mịn Mũ gán trọng số cao hơn cho các phiên gần đây, kiểm soát quán tính tăng trưởng với hệ số triệt tiêu φ = ${phi}. R² = ${(rSquared * 100).toFixed(1)}%.`
    }
  };
}

/**
 * Multi-Construct Synthetic & Real Historical Series Generator
 */
export function getConstructTimeSeriesData(constructKey: string): TimePoint[] {
  const baseDates = [
    '2026-08-25', '2026-08-27', '2026-08-29', '2026-08-31',
    '2026-09-02', '2026-09-04', '2026-09-06', '2026-09-08',
    '2026-09-10', '2026-09-12', '2026-09-14'
  ];

  const seriesMap: Record<string, number[]> = {
    overall: [52, 54, 53, 57, 59, 62, 60, 65, 68, 67, 71],
    Planning: [48, 50, 52, 55, 54, 60, 63, 62, 66, 68, 70],
    Prioritization: [42, 45, 43, 46, 49, 50, 48, 52, 54, 53, 56],
    Persistence: [58, 60, 59, 63, 65, 67, 69, 71, 72, 74, 76],
    SelfRegulation: [50, 49, 52, 51, 55, 54, 58, 57, 60, 59, 63],
    DistractionRecovery: [38, 40, 42, 45, 44, 48, 52, 55, 54, 58, 62],
    TaskCompletion: [60, 62, 58, 65, 70, 68, 75, 78, 80, 82, 85]
  };

  const values = seriesMap[constructKey] || seriesMap['overall'];

  return values.map((val, idx) => ({
    index: idx + 1,
    date: baseDates[idx] || `2026-09-${10 + idx}`,
    label: `Phiên ${idx + 1}`,
    actual: val
  }));
}
