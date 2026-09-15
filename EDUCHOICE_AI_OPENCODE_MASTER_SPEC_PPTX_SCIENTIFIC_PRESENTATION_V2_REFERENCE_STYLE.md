# EDUCHOICE-AI / KHKT — MASTER SPEC FOR OPENCODE
## Hệ thống kiểm soát hiệu quả ứng dụng + xây dựng PPTX thuyết trình sản phẩm có cơ sở khoa học, công thức đúng, bố cục đúng và minh chứng truy nguyên được

**Version:** PPTX-AUDIT-PRESENTATION V1.0  
**Status:** Implementation Specification  
**Primary agent:** OpenCode  
**Secondary reviewers:** Codex / Antigravity / human teacher  
**Output:** PPTX + source assets + evidence manifest + formula manifest + presenter script + QA report

---

# 0. MỤC ĐÍCH

Tài liệu này yêu cầu OpenCode xây dựng một quy trình và công cụ tạo PowerPoint cho dự án EduChoice-AI/KHKT theo nguyên tắc:

```text
SOURCE TRUTH
→ EVIDENCE
→ SCIENTIFIC CLAIM
→ DATA
→ FORMULA
→ CHART
→ SLIDE
→ ORAL PRESENTATION
```

Không được làm ngược:

```text
làm slide đẹp
→ nhét số liệu
→ tìm công thức
→ tìm nguồn sau
```

Mục tiêu cuối cùng:

> Học sinh có thể trình bày sản phẩm một cách tự nhiên, rõ ràng và thuyết phục; mỗi nhận định quan trọng đều có bằng chứng; mỗi con số quan trọng đều có nguồn; mỗi công thức đều đúng về ý nghĩa, ký hiệu, đơn vị, điều kiện áp dụng; mỗi biểu đồ đều truy ngược được về dữ liệu gốc.

---

# 1. CƠ SỞ QUY CHUẨN PHẢI TUÂN THỦ

Tài liệu người dùng cung cấp về **Báo cáo kết quả thực hiện dự án** yêu cầu đối với dự án khoa học:

- Câu hỏi nghiên cứu;
- đóng góp của dự án;
- mục tiêu cụ thể, rõ ràng và đánh giá được bằng phương pháp khoa học;
- thiết kế và phương pháp;
- phương pháp thu thập số liệu;
- tham số, thông số, biến số;
- thực hiện;
- dữ liệu;
- xử lý, phân tích, thống kê;
- giải thích, nhận định, đánh giá;
- kết luận theo mục tiêu nghiên cứu. fileciteturn10file0L6-L20

Đối với dự án kỹ thuật, tài liệu yêu cầu:

- vấn đề thực tế và tính cấp thiết;
- tiêu chí của giải pháp;
- tìm tòi các giải pháp khác nhau;
- phân tích và lựa chọn giải pháp khả thi;
- thiết kế mô hình/nguyên mẫu;
- quá trình chế tạo;
- kiểm tra trong nhiều điều kiện/thử nghiệm;
- chứng minh tính khả thi và hiệu quả;
- hoàn thiện sản phẩm qua quá trình thử nghiệm. fileciteturn10file0L21-L36

Tài liệu cũng nêu yêu cầu hình thức của **báo cáo kết quả thực hiện dự án**: không quá 15 trang kể cả bìa, phụ lục, tài liệu tham khảo; khổ A4; lề trái 3 cm, phải 2 cm, trên 2 cm, dưới 2 cm; Times New Roman 14; cách dòng đơn. fileciteturn10file0L2-L5

**QUAN TRỌNG:** Những yêu cầu trên là yêu cầu của báo cáo được cung cấp. PowerPoint thuyết trình không được tự động coi là có cùng quy định định dạng. OpenCode phải tách:

```text
REPORT FORMAT
vs
PRESENTATION FORMAT
```

và kiểm tra quy định cuộc thi cấp đang tham gia trước khi khóa bản PPTX cuối.

Theo thông tin về cuộc thi quốc gia 2025–2026, phần trình bày/phỏng vấn được chấm độc lập và có trọng số đáng kể; đây là lý do PPTX phải được thiết kế cho **khả năng thuyết trình và trả lời vấn đáp**, không chỉ để chiếu đẹp. citeturn953969search0turn953969search1

---

# 2. NGUYÊN TẮC CỐT LÕI

## 2.1. Một slide = một ý chính

Không làm:

```text
1 slide
→ 8 đoạn văn
→ 4 biểu đồ
→ 3 công thức
→ 7 hình
```

Mà:

```text
1 slide
→ 1 câu hỏi
→ 1 thông điệp chính
→ 1–2 bằng chứng
```

---

# 3. HỆ THỐNG "CLAIM → EVIDENCE"

Mọi claim khoa học phải có ID.

Ví dụ:

```text
CLM-001:
Behavioral sequence có thể giúp phát hiện tình huống học tập.

Evidence:
EV-001
EV-002
EV-003
```

Mỗi claim phải có:

```yaml
claimId:
statement:
type:
scope:
evidenceIds:
confidence:
source:
studentGenerated:
reviewStatus:
```

Các loại:

```text
OBSERVATION
CALCULATION
EXPERIMENT
LITERATURE
DESIGN
ENGINEERING
INFERENCE
HYPOTHESIS
LIMITATION
```

Không cho phép slide biến:

```text
INFERENCE
```

thành:

```text
FACT
```

---

# 4. EVIDENCE LEDGER

OpenCode phải xây:

```text
docs/evidence/EVIDENCE_LEDGER.md
```

Mỗi evidence:

```yaml
evidenceId:
description:
sourceType:
source:
location:
rawData:
measurementMethod:
date:
sample:
unit:
processing:
formula:
result:
uncertainty:
limitations:
verifiedBy:
status:
```

Các mức:

```text
VERIFIED
PARTIALLY_VERIFIED
INFERRED
NOT_VERIFIED
NOT_ACCESSIBLE
```

---

# 5. DATA LINEAGE

Mọi con số trên PPTX phải có thể truy nguyên:

```text
SLIDE
→ chart/table
→ metric
→ processed dataset
→ raw dataset
→ collection method
```

Mọi chart phải có:

```text
chartId
datasetId
source
processingVersion
formulaVersion
```

Không có dữ liệu truy nguyên:

```text
DO NOT PUBLISH
```

---

# 6. FORMULA GOVERNANCE — BẮT BUỘC

Đây là phần đặc biệt quan trọng.

OpenCode phải xây một **Formula Registry**.

File:

```text
docs/formulas/FORMULA_REGISTRY.md
```

Mỗi công thức phải có:

```yaml
formulaId:
name:
purpose:
equation:
LaTeX:
variables:
units:
domain:
conditions:
assumptions:
source:
sourceLocation:
example:
expectedResult:
validationStatus:
reviewer:
version:
```

---

# 7. FORMULA FIVE-GATE CHECK

Một công thức chỉ được đưa vào PPTX nếu vượt qua 5 cổng:

```text
GATE 1 — Mathematical correctness
GATE 2 — Scientific meaning
GATE 3 — Symbol consistency
GATE 4 — Unit consistency
GATE 5 — Visual/layout correctness
```

Nếu fail một gate:

```text
BLOCK SLIDE GENERATION
```

---

# 8. FORMULA 5-GATE DETAIL

## Gate 1 — Toán học

Kiểm tra:

- phép tính;
- dấu;
- ngoặc;
- phân số;
- lũy thừa;
- log;
- căn;
- vector nếu có;
- trung bình;
- độ lệch chuẩn;
- phần trăm;
- hiệu suất;
- confidence interval;
- effect size.

---

## Gate 2 — Ý nghĩa khoa học

Ví dụ:

```text
v = s/t
```

phải xác định:

```text
v = tốc độ
s = quãng đường
t = thời gian
```

Không cho:

```text
v = vận tốc
```

nếu ngữ cảnh đang chỉ dùng khái niệm tốc độ trong chương trình/nguồn đang trình bày.

Tên đại lượng phải khớp nguồn.

---

## Gate 3 — Ký hiệu

Toàn bộ deck phải dùng cùng một ký hiệu.

Không:

```text
T = thời gian
t = nhiệt độ
```

ở slide 4 nhưng slide 9 lại:

```text
t = thời gian
T = nhiệt độ
```

---

## Gate 4 — Đơn vị

Mọi đại lượng định lượng phải kiểm tra:

```text
SI unit
derived unit
conversion
dimension
```

Ví dụ:

```text
distance: m
time: s
speed: m/s
```

Nếu hiển thị:

```text
km/h
```

phải có conversion hoặc nguồn đã chuẩn hóa.

---

## Gate 5 — Layout

Không để công thức:

- quá sát mép;
- chồng hình;
- xuống dòng sai;
- numerator/denominator lệch;
- ký hiệu nhỏ hơn chữ xung quanh;
- đơn vị nằm ngoài phạm vi;
- chỉ số trên/dưới mất;
- dấu ± biến mất;
- dấu ngoặc mất;
- phân số bị thay thành dấu `/` ở vị trí khó đọc.

---

# 9. FORMULA RENDERING RULE

OpenCode ưu tiên:

```text
LaTeX → SVG/PNG/PDF vector-like asset → PPTX
```

không ưu tiên:

```text
plain text approximation
```

Ví dụ:

```latex
v = \frac{s}{t}
```

render thành công thức sạch.

Không tạo:

```text
v = s/t
```

nếu slide đang cần công thức trung tâm.

---

# 10. FORMULA OCR / VISUAL QA

Sau khi tạo PPTX:

```text
render PPTX → PNG
→ inspect formula slides
```

Phải kiểm tra tự động và bằng visual QA:

```text
glyph clipping
superscript
subscript
fraction
radical
Greek letters
minus sign
±
×
≤
≥
```

---

# 11. KHÔNG DÙNG CÔNG THỨC TRANG TRÍ

Công thức không phải decoration.

Chỉ đưa công thức lên slide khi:

```text
formula is necessary to explain:
- measurement
- algorithm
- metric
- analysis
- engineering mechanism
```

Nếu không cần:

```text
remove formula
```

---

# 12. MỘT CÔNG THỨC PHẢI ĐI VỚI Ý NGHĨA

Mẫu:

```text
Metric:
Adaptive Efficiency

Formula:
...

Where:
X = ...
Y = ...

Interpretation:
...
```

Không đặt một công thức trơ trọi ở giữa slide.

---

# 13. FORMULA EXAMPLE

Mẫu đúng:

```text
Hiệu suất hoàn thành nhiệm vụ

Completion Rate =
Completed Tasks / Eligible Tasks × 100%
```

Slide phải ghi:

```text
Tử số: số nhiệm vụ hoàn thành
Mẫu số: số nhiệm vụ đủ điều kiện
Đơn vị: %
```

và có note về phạm vi.

---

# 14. KHÔNG TỰ BỊA CÔNG THỨC

Nếu công thức là construct mới:

```text
proposed metric
```

phải ghi rõ:

> Công thức đề xuất cho nghiên cứu.

Không gọi:

> Công thức khoa học chuẩn.

Nếu formula lấy từ literature:

```text
citation required
```

Nếu formula do nhóm tự xây:

```text
author-developed metric
```

---

# 15. STATISTICAL QA

Nếu deck sử dụng thống kê:

Kiểm tra:

```text
n
mean
median
SD
SE
CI
effect size
p-value
model
```

Không báo:

```text
p < 0.05
→ intervention effective
```

nếu thiết kế nghiên cứu không hỗ trợ kết luận nhân quả.

---

# 16. SMALL-N / REPEATED MEASURES

Nếu có repeated measurements:

```text
Student
→ multiple sessions
→ multiple games
```

phải cân nhắc cấu trúc dữ liệu lặp.

Không được xem:

```text
100 events
```

là:

```text
100 independent students
```

OpenCode phải kiểm tra:

```text
unit of analysis
```

và:

```text
unit of observation
```

---

# 17. RESEARCH CLAIM HIERARCHY

Các mức claim:

```text
LEVEL 0:
Raw observation

LEVEL 1:
Descriptive statistic

LEVEL 2:
Association

LEVEL 3:
Predictive relation

LEVEL 4:
Causal inference
```

Không được nhảy từ:

```text
LEVEL 1
→ LEVEL 4
```

chỉ vì chart đẹp.

---

# 18. THE THREE-LAYER EVIDENCE MODEL

Mọi kết quả chính nên có 3 lớp:

```text
1. DATA
2. ANALYSIS
3. INTERPRETATION
```

Ví dụ:

```text
DATA:
78/100 students completed micro-action

ANALYSIS:
completion rate = 78%

INTERPRETATION:
system observed a substantial level of transfer completion

NOT:
system proved long-term behavior change
```

---

# 19. SCIENTIFIC STORY

PPTX phải kể theo logic:

```text
PROBLEM
→ EVIDENCE
→ RESEARCH QUESTION
→ HYPOTHESIS
→ METHOD
→ PRODUCT
→ EXPERIMENT
→ DATA
→ ANALYSIS
→ RESULT
→ LIMITATION
→ CONCLUSION
→ NEXT STEP
```

---

# 20. TECHNICAL STORY

Song song:

```text
Need
→ Design constraints
→ Architecture
→ Core mechanism
→ Implementation
→ Validation
→ Failure cases
→ Iteration
→ Final product
```

---

# 21. KHÔNG CHO SẢN PHẨM "NHẢY CÓC"

Không:

```text
Problem
→ screenshot app
→ "AI thông minh"
→ conclusion
```

Phải:

```text
Problem
→ design requirement
→ mechanism
→ test
→ evidence
→ result
```

---

# 22. PPTX ARCHITECTURE

OpenCode phải tạo deck theo 3 lớp:

```text
LAYER A — PRESENTATION
LAYER B — EVIDENCE
LAYER C — APPENDIX
```

## Layer A

10–15 slide chính.

## Layer B

backup evidence slides.

## Layer C

formula, raw data, methodology, logs, extra charts.

---

# 23. RECOMMENDED MAIN DECK

Khoảng 12–14 slide:

```text
01 Cover
02 Problem
03 Why Existing Approaches Are Not Enough
04 Research Question + Hypothesis
05 Scientific/Technical Contribution
06 System Concept
07 Architecture
08 How Intelligence Works
09 Product Demo Flow
10 Experimental Design
11 Evidence / Results
12 Scientific Analysis
13 Limitations + Safety
14 Conclusion + Future Work
```

Không ép số lượng này nếu quy định địa phương khác.

---

# 24. SLIDE 01 — COVER

Chỉ:

```text
Project title
1-line value proposition
visual product
category/field
```

Không:

```text
full abstract
long subtitle
7 logos
```

---

# 25. SLIDE 02 — PROBLEM

Dùng:

```text
1 real-world scenario
1 evidence block
1 problem statement
```

Câu hỏi:

> Vấn đề nào thực sự cần giải quyết?

---

# 26. SLIDE 03 — WHY EXISTING APPROACHES ARE NOT ENOUGH

Không công kích sản phẩm khác.

Dùng:

```text
Existing capabilities
vs
Gap
```

Ví dụ:

```text
Student support
Academic adaptive learning
Game-based learning
AI coaching
Behavior tracking

↓

EduChoice research gap:
closed-loop integration
```

Phải ghi rõ:

```text
potential integration gap
```

không tuyên bố tuyệt đối "chưa từng có".

---

# 27. SLIDE 04 — RESEARCH QUESTION

Một câu hỏi chính.

Ví dụ:

> Liệu việc nhận diện tình huống từ chuỗi hành vi, lựa chọn can thiệp thích ứng và đo phản ứng/transfer có cải thiện hiệu quả can thiệp so với phản hồi cố định hay không?

Bên dưới:

```text
Hypothesis H1
H0
Primary outcome
Secondary outcomes
```

---

# 28. SLIDE 05 — CONTRIBUTION

Tách:

```text
Scientific contribution
Engineering contribution
Educational contribution
```

Ví dụ:

```text
Scientific:
behavior → situation → intervention → response → transfer

Engineering:
rule + student model + controlled AI

Educational:
short game + retry + reflection + micro-action
```

---

# 29. SLIDE 06 — SYSTEM CONCEPT

Một sơ đồ lớn:

```text
Game
 ↓
Behavior
 ↓
Situation
 ↓
Student State
 ↓
Candidate Intervention
 ↓
AI Reasoning
 ↓
Validation
 ↓
Game Director
 ↓
Response
 ↓
Transfer
 ↓
Model Update
```

Không nhồi code.

---

# 30. SLIDE 07 — ARCHITECTURE

Hiển thị:

```text
Vercel
Apps Script/API Gateway
Google Sheets/Data Layer
Rule Engine
Student Model
Toolkit
Gemini
Adaptive Engine
Teacher Control
```

Mỗi khối 1 câu.

---

# 31. SLIDE 08 — INTELLIGENCE

Giải thích:

```text
Rule Engine
= safety + deterministic logic

Student Model
= accumulated evidence

Gemini
= contextual reasoning

Validation
= restrict output

Adaptive Engine
= final action
```

Điểm quan trọng:

> Gemini không phải hệ thống tự trị.

---

# 32. SLIDE 09 — PRODUCT FLOW

Hiển thị ảnh thật của app.

Flow:

```text
Enter
→ Play
→ Choice
→ Consequence
→ Retry
→ Reflection
→ Recommendation
```

---

# 33. SLIDE 10 — EXPERIMENT

Bắt buộc biểu diễn:

```text
Group A:
Game → Fixed Feedback

Group B:
Behavior → Adaptive Intervention

Group C:
Behavior → Adaptive Intervention → Transfer
```

Nếu nghiên cứu thực tế khác thì phải dùng thiết kế thật.

---

# 34. SLIDE 11 — RESULTS

Không đưa 15 biểu đồ.

Chọn:

```text
2–4 primary metrics
```

Mỗi metric:

```text
Value
n
Comparison
Effect
CI if applicable
```

---

# 35. SLIDE 12 — SCIENTIFIC ANALYSIS

Một biểu đồ + một đoạn diễn giải.

Mẫu:

```text
What happened?
Why might it have happened?
What evidence supports this?
What alternative explanation remains?
```

---

# 36. SLIDE 13 — LIMITATIONS

Bắt buộc có.

Ví dụ:

```text
sample size
short follow-up
self-selection
single-school context
AI dependence
measurement limitations
```

Một dự án khoa học tốt không che giấu giới hạn.

---

# 37. SLIDE 14 — CONCLUSION

Chỉ 3 dòng:

```text
1. What problem was addressed?
2. What was demonstrated?
3. What remains to test?
```

Không dùng:

> "Sản phẩm hoàn hảo."

---

# 38. BACKUP SLIDES

Phải tạo 8–20 backup slides tùy dự án:

```text
B01 Research Variables
B02 Sampling
B03 Raw Data
B04 Data Cleaning
B05 Statistical Formula
B06 Formula Definitions
B07 Architecture Details
B08 AI Schema
B09 Safety
B10 Security
B11 Game Telemetry
B12 Intervention Registry
B13 Error Cases
B14 Failure Recovery
B15 User Flow
B16 Alternative Designs
B17 Cost
B18 Limitations
```

---

# 39. "EVIDENCE SLIDE"

OpenCode phải tự tạo slide evidence cho mỗi claim quan trọng.

Template:

```text
CLAIM
What we claim

EVIDENCE
What we measured

METHOD
How measured

RESULT
What happened

LIMITATION
What it does not prove
```

---

# 40. APPLICATION EFFECTIVENESS FRAMEWORK

Để kiểm soát hiệu quả ứng dụng, không dùng một metric duy nhất.

Dùng 5 nhóm:

```text
A. Functionality
B. Usability
C. Engagement
D. Educational/Behavioral Outcome
E. System Reliability
```

---

# 41. FUNCTIONALITY METRICS

Ví dụ:

```text
Feature success rate
API success rate
Game completion
Recommendation execution success
Data write success
Fallback success
```

---

# 42. USABILITY METRICS

Ví dụ:

```text
Task completion time
Navigation error
Teacher task time
Student task friction
SUS / other validated usability instrument if actually used
```

Không tự gọi metric nội bộ là "SUS".

---

# 43. ENGAGEMENT METRICS

Ví dụ:

```text
Voluntary replay
Completion
Retry
Challenge participation
Agency rating
Drop-off
```

Không kết luận:

```text
longer screen time = better
```

---

# 44. EDUCATIONAL/BEHAVIORAL OUTCOME

Chọn đúng outcome theo research question:

```text
Problem recognition
Strategy change
Goal completion
Transfer
Help-seeking
Persistence
Reflection quality
```

Không gom tất cả thành:

```text
"psychological improvement"
```

---

# 45. RELIABILITY METRICS

Bắt buộc:

```text
crash rate
API error rate
Gemini fallback rate
Sheet write failure
data loss rate
latency
```

---

# 46. SYSTEM EFFECTIVENESS SCORE

Không tự tạo một "overall effectiveness" nếu chưa định nghĩa trọng số.

Nếu cần:

```text
Effectiveness Index
```

phải:

1. định nghĩa components;
2. định nghĩa normalization;
3. định nghĩa weights;
4. lưu công thức;
5. sensitivity analysis;
6. chứng minh vì sao weights hợp lý.

Nếu chưa đủ:

```text
DO NOT CREATE OVERALL SCORE
```

---

# 47. FORMULA / DATA SEPARATION

PPTX phải phân biệt:

```text
Formula
Data
Metric
Result
Interpretation
```

Ví dụ:

```text
Formula:
Completion Rate = Completed / Eligible × 100%

Data:
Completed = 78
Eligible = 100

Result:
78%

Interpretation:
78% of eligible actions were completed
```

---

# 48. CHART GOVERNANCE

Mỗi chart phải có:

```yaml
chartId:
title:
question:
x:
y:
dataset:
n:
unit:
aggregation:
errorBars:
source:
caption:
```

---

# 49. CHART TYPES

Chỉ dùng khi phù hợp:

```text
Bar
→ group comparison

Line
→ time trend

Scatter
→ association

Box/violin
→ distribution

Stacked
→ composition

Flow
→ process
```

Không dùng pie chart cho dữ liệu có quá nhiều nhóm.

---

# 50. ERROR BARS

Nếu sử dụng error bars phải ghi:

```text
SD
SE
95% CI
```

Không ghi:

```text
± error
```

mơ hồ.

---

# 51. AXIS GOVERNANCE

Không:

```text
cắt trục y
```

để làm chênh lệch nhìn lớn hơn nếu không giải thích.

Nếu bắt buộc:

```text
axis break
```

phải hiển thị rõ.

---

# 52. PERCENTAGE GOVERNANCE

Phân biệt:

```text
percentage
percentage point
relative increase
absolute change
```

Ví dụ:

```text
40% → 60%

absolute increase = 20 percentage points
relative increase = 50%
```

Không ghi:

> tăng 20%

nếu ý là 20 điểm phần trăm.

---

# 53. ROUNDING RULE

Không dùng quá nhiều chữ số.

Ví dụ:

```text
78.3%
```

thay vì:

```text
78.341928%
```

Nhưng raw data vẫn giữ đầy đủ.

PPTX chỉ hiển thị precision cần thiết.

---

# 54. CONSISTENCY CHECK

Toàn deck phải đồng nhất:

```text
student/student(s)
game/game
intervention
AI
Gemini
Rule Engine
Student Model
```

Không đổi tên cùng một thành phần.

---

# 55. TERMINOLOGY GOVERNANCE

File:

```text
docs/presentation/TERMINOLOGY_GLOSSARY.md
```

Ví dụ:

```text
Student State
Situation
Behavior Event
Intervention
Transfer
Adaptive Engine
```

Mỗi thuật ngữ có định nghĩa chính thức.

---

# 56. NO DIAGNOSIS RULE

Không sử dụng slide:

```text
Student anxiety score
Student depression score
ADHD risk
psychological diagnosis
```

nếu dự án không có cơ sở lâm sàng phù hợp.

Dùng:

```text
behavioral signal
educational state
support signal
```

---

# 57. AI CLAIM GOVERNANCE

Không nói:

> AI hiểu tâm lý học sinh.

Nên nói:

> AI tổng hợp các tín hiệu hành vi đã được chuẩn hóa để đề xuất lựa chọn trong tập tính năng được kiểm soát.

Không nói:

> Gemini quyết định học sinh cần gì.

Nên nói:

> Gemini hỗ trợ reasoning giữa các lựa chọn đã được hệ thống kiểm soát.

---

# 58. SAFETY SLIDE

Phải thể hiện:

```text
No diagnosis
Minimum data
Allow-list
Human review
Fallback
Audit log
```

---

# 59. PRIVACY SLIDE

Nêu:

```text
pseudonymous ID
data minimization
role-based access
server-side API key
consent
retention
audit log
```

Không hiện API key.

---

# 60. DEMO SAFETY

OpenCode phải tạo demo mode:

```text
DEMO DATA ONLY
```

Không dùng dữ liệu học sinh thật trong video/presentation nếu không cần.

---

# 61. FORMULA APPENDIX

Tạo slide dạng:

```text
Formula ID
Equation
Variable table
Units
Example
Validation status
Source
```

---

# 62. ANSWERABLE PRESENTATION

Một deck tốt phải khiến giám khảo có thể trả lời:

```text
What problem?
Why important?
What is new?
How built?
How tested?
What data?
What formula?
Why valid?
What did result show?
What does it NOT prove?
What are limitations?
What is next?
```

Nếu deck không giúp trả lời 12 câu này:

```text
REVISION REQUIRED
```

---

# 63. JUDGE QUESTION MATRIX

OpenCode phải tạo:

```text
docs/presentation/JUDGE_QUESTION_BANK.md
```

Ít nhất:

### Problem

```text
Why this problem?
Who has it?
How do you know?
```

### Science

```text
What is hypothesis?
Independent variable?
Dependent variable?
Control?
Sample?
Bias?
```

### Engineering

```text
Why this architecture?
Why this sensor/API/algorithm?
What failed?
What changed?
```

### AI

```text
Why Gemini?
Could rules work?
What happens when AI fails?
How prevent hallucination?
What data goes to AI?
```

### Evidence

```text
Where did this number come from?
How measured?
Why this formula?
Why this statistic?
```

### Novelty

```text
What exactly is new?
What already exists?
What is only your integration?
```

---

# 64. STUDENT SPEECH DESIGN

Học sinh không đọc slide.

Mỗi slide có:

```yaml
slideId:
headline:
message:
evidence:
speakerScript:
keyTerm:
likelyQuestion:
backupSlide:
```

Speaker script:

```text
20–45 seconds / slide
```

Không viết đoạn văn quá dài.

---

# 65. "30-SECOND TEST"

Mỗi slide phải trả lời:

> Trong 30 giây, học sinh có thể nói gì là ý chính?

Nếu không:

```text
split
simplify
or remove
```

---

# 66. "BLIND TEST"

Xuất từng slide thành PNG và đưa cho người không tham gia dự án.

Hỏi:

```text
Bạn hiểu slide nói gì?
Bằng chứng ở đâu?
Con số nào quan trọng?
```

Nếu người xem không hiểu:

```text
layout problem
```

---

# 67. "FORMULA BLIND TEST"

Cho reviewer chỉ nhìn công thức.

Họ phải xác định được:

```text
what is calculated
variables
units
scope
```

Nếu không:

```text
formula slide fails
```

---

# 68. PPTX DESIGN SYSTEM

Dùng một design system:

```text
16:9
consistent margins
consistent typography
consistent spacing
consistent title position
consistent footer
consistent source notation
```

---

# 69. SAFE MARGINS

Thiết lập:

```text
left/right safe zone
top/bottom safe zone
```

Không đặt nội dung quan trọng sát mép.

---

# 70. FONT HIERARCHY

Tối thiểu:

```text
Title
Section
Body
Caption
Footnote
```

Không dùng quá nhiều font.

Khuyến nghị:

```text
1 primary font
1 optional display font
```

---

# 71. COLOR GOVERNANCE

Màu phải có ý nghĩa.

Ví dụ:

```text
Primary = system
Secondary = data
Accent = AI
Warning = limitation
```

Không dùng màu chỉ để trang trí.

Đặc biệt:

```text
Red ≠ "bad student"
```

---

# 72. ICON GOVERNANCE

Icon phải nhất quán.

Không trộn:

```text
emoji
3D icon
line icon
flat icon
```

trên cùng một slide nếu không có lý do.

---

# 73. SCREENSHOT GOVERNANCE

Screenshot app phải:

```text
actual build
correct version
no fake data
no API key
no debug error
```

Thêm:

```text
Source: EduChoice-AI vX.Y
```

khi cần.

---

# 74. VIDEO DEMO

Nếu dùng video:

```text
problem
→ interaction
→ adaptation
→ result
```

Không dùng video chỉ để khoe animation.

---

# 75. PRODUCT DEMONSTRATION

Demo lý tưởng:

```text
Scenario 1:
normal

Scenario 2:
difficulty

Scenario 3:
system adapts

Scenario 4:
intervention response

Scenario 5:
transfer
```

---

# 76. BEFORE/AFTER

Nếu có:

```text
before
after
```

phải xác định:

```text
same measure
same denominator
same context
```

Không dùng before/after không tương đương.

---

# 77. CONTROL GROUP

Nếu có control:

```text
control condition
intervention condition
```

phải giải thích:

```text
what differed
what stayed same
```

---

# 78. ABLATION

Rất khuyến khích cho EduChoice-AI:

```text
Rule-only
Rule + Adaptive
Rule + Adaptive + Transfer
Rule + Adaptive + Gemini
```

Nếu có đủ dữ liệu.

Mục tiêu:

> thành phần nào thực sự tạo giá trị?

---

# 79. GEMINI JUSTIFICATION

Slide AI phải trả lời:

```text
What does deterministic logic do?
What does Gemini add?
Why not use only Gemini?
What happens when Gemini fails?
```

Mẫu:

```text
Rule Engine:
safety + hard constraints

Gemini:
reasoning among allowed candidates

Fallback:
deterministic recommendation
```

---

# 80. CONTROL OF AI OUTPUT

Hiển thị:

```text
candidate set
→ Gemini
→ schema validation
→ allow-list
→ safety
→ business rules
→ final action
```

Không:

```text
Gemini
→ direct execution
```

---

# 81. DATA-TO-AI FLOW

Một slide riêng hoặc backup:

```text
Raw events
→ contextualized summary
→ minimized context
→ Gemini
```

Không gửi:

```text
unnecessary PII
```

---

# 82. "WHY THIS DATA?"

Mỗi loại dữ liệu phải có:

```text
purpose
decision
value
risk
```

Ví dụ:

```text
Retry count
Purpose: persistence signal
Decision: choose smaller challenge
Risk: low
```

---

# 83. DATA CONTROL PANEL

Nếu app có dashboard:

```text
Data quality
AI calls
Fallback rate
Intervention response
Transfer
```

Teacher nên thấy:

```text
what matters
```

không phải 10.000 raw events.

---

# 84. APPLICATION EFFECTIVENESS DASHBOARD

OpenCode phải có concept:

```text
Functionality
Usability
Engagement
Outcome
Reliability
```

và cho phép drill-down:

```text
Overall
→ class
→ student pseudonym
→ session
→ game
→ event
```

---

# 85. NO OVER-PERSONALIZATION

Không để AI thay đổi quá nhiều thứ cùng lúc.

Khuyến nghị:

```text
1 primary adaptation
+
1 support feature
```

trong một lượt.

---

# 86. GAME ENGAGEMENT

Học sinh "mê" vì:

```text
curiosity
agency
challenge
feedback
mastery
story
discovery
```

Không tối ưu:

```text
screen time
compulsion
ranking
shame
```

---

# 87. VISUAL STORY

Một slide game nên hiển thị:

```text
HOOK
CHOICE
CONSEQUENCE
RETRY
```

và có một screenshot thật.

---

# 88. SCIENTIFIC VISUALIZATION

Không dùng ảnh stock để thay cho bằng chứng.

Ưu tiên:

```text
real product screenshot
experimental photo
data chart
system diagram
measured result
```

---

# 89. SOURCE FOOTER

Mỗi slide có external scientific fact phải có:

```text
Source: Author, year
```

hoặc:

```text
Source: Project dataset, collection date
```

Không để nguồn ở cuối deck mà không biết slide nào dùng nguồn nào.

---

# 90. CITATION MANIFEST

File:

```text
docs/presentation/CITATION_MANIFEST.md
```

Mỗi citation:

```yaml
citationId:
slide:
claim:
source:
location:
accessDate:
usedFor:
```

---

# 91. AI-GENERATED CONTENT DISCLOSURE

Nếu AI hỗ trợ:

```text
code generation
image generation
diagram
speaker-script draft
```

phải log rõ.

Theo thông tin về hướng dẫn AI của cuộc thi 2026–2027 tại TP.HCM được báo chí dẫn lại, quy định đang nhấn mạnh việc học sinh phải chịu trách nhiệm về nghiên cứu và không được dùng AI để viết thay nội dung nghiên cứu/kết luận; vì vậy OpenCode phải giữ **AI-use log** và không để AI thay thế phần suy luận, dữ liệu và kết luận của học sinh. citeturn126033search0

---

# 92. AI USAGE LOG

Tạo:

```text
docs/ai/AI_USAGE_LOG.md
```

Mẫu:

```yaml
date:
agent:
tool:
task:
promptSummary:
outputUsed:
humanVerified:
studentContribution:
```

---

# 93. HUMAN AUTHorship CHECK

Trước khi khóa deck:

```text
Can the student explain every slide?
Can the student explain every number?
Can the student explain every formula?
Can the student explain every design choice?
Can the student explain every limitation?
```

Nếu không:

```text
NOT READY
```

---

# 94. PRESENTATION REHEARSAL SYSTEM

Tạo:

```text
docs/presentation/REHEARSAL_PLAN.md
```

3 levels:

```text
Level 1:
slide-by-slide

Level 2:
full presentation timed

Level 3:
blind Q&A
```

---

# 95. TIMING

Không hard-code thời lượng nếu cuộc thi địa phương chưa xác định.

Config:

```yaml
presentationDuration:
qaDuration:
buffer:
```

Nếu không có config:

```text
UNKNOWN — MUST VERIFY
```

---

# 96. TIMER MODE

Trong PPTX có thể thêm:

```text
Presenter notes
```

với:

```text
target seconds
```

Không đặt timer lớn trên slide thật trừ khi phục vụ luyện tập.

---

# 97. SPEAKER SCRIPT

Mỗi slide phải có:

```text
What to say
What not to say
Key number
Potential judge question
Transition
```

---

# 98. TRANSITION DESIGN

Mẫu:

```text
Problem
→ Therefore, we asked...
Research question
→ To answer that...
Method
→ The result was...
Result
→ This means...
```

Học sinh không nói từng slide như các mảnh rời nhau.

---

# 99. JUDGE-FOCUSED PRESENTATION

Giám khảo cần thấy:

```text
student understanding
scientific reasoning
technical ownership
evidence
limitations
```

Không chỉ:

```text
beautiful UI
```

---

# 100. OWNERSHIP TEST

OpenCode tạo 20 câu:

```text
What did you personally do?
What failed?
What did you change?
Why did you choose this sensor?
Why this metric?
Why this algorithm?
Why this formula?
Why this sample?
What would you change next?
```

Học sinh phải trả lời được.

---

# 101. FAILURE SLIDE

Có thể có một slide backup:

```text
Prototype 1
→ failure
→ finding
→ modification
→ Prototype 2
→ improvement
```

Đây là bằng chứng nghiên cứu/kỹ thuật rất mạnh.

---

# 102. ITERATION TIMELINE

Hiển thị:

```text
v0
→ test
→ problem
→ v1
→ test
→ problem
→ v2
→ final
```

Không chỉ show final product.

---

# 103. ENGINEERING TRADE-OFFS

Phải có ít nhất một bảng nếu phù hợp:

| Option | Benefit | Cost | Risk | Decision |
|---|---|---|---|---|
| A | ... | ... | ... | reject |
| B | ... | ... | ... | select |

Cho thấy học sinh thực sự lựa chọn giải pháp.

---

# 104. TECHNICAL VALIDATION

Có thể kiểm tra:

```text
API latency
failure rate
data integrity
recommendation validity
formula correctness
game completion
```

---

# 105. SCIENTIFIC VALIDATION

Phân biệt:

```text
technical validation
```

và:

```text
scientific validation
```

Một app chạy tốt:

```text
≠
```

bằng chứng rằng intervention có hiệu quả.

---

# 106. PRODUCT VALIDATION MATRIX

| Claim | Test | Metric | Result | Conclusion |
|---|---|---|---|---|
| Data writes are reliable | integration test | write success | ... | supported |
| AI fallback works | failure test | recovery rate | ... | supported |
| Intervention helps | experiment | primary outcome | ... | evidence |
| Transfer occurs | micro-action | completion/retention | ... | preliminary |

---

# 107. TRACEABILITY MATRIX

File:

```text
docs/presentation/TRACEABILITY_MATRIX.csv
```

Columns:

```text
Claim
Requirement
Data
Formula
Chart
Slide
Source
Test
Status
```

---

# 108. NO ORPHAN CLAIMS

Claim không có evidence:

```text
ORPHAN CLAIM
```

Phải sửa hoặc loại.

---

# 109. NO ORPHAN DATA

Data không được dùng:

```text
unused
```

có thể vẫn giữ trong research archive nhưng không nhét vào deck.

---

# 110. NO ORPHAN FORMULAS

Formula không được dùng:

```text
remove
```

trừ appendix nếu cần audit.

---

# 111. PPTX BUILD PIPELINE

OpenCode phải triển khai:

```text
01_READ_SOURCE
02_BUILD_EVIDENCE_LEDGER
03_BUILD_DATA_DICTIONARY
04_BUILD_FORMULA_REGISTRY
05_BUILD_CLAIM_REGISTRY
06_BUILD_STORYBOARD
07_BUILD_CHART_SPECS
08_RENDER_FORMULAS
09_BUILD_PPTX
10_RENDER_SLIDES
11_VISUAL_QA
12_FORMULA_QA
13_DATA_QA
14_CITATION_QA
15_TIMING_QA
16_GENERATE_SPEAKER_NOTES
17_EXPORT_FINAL
```

---

# 112. STOP-THE-LINE CONDITIONS

Nếu phát hiện:

```text
formula error
unit error
citation mismatch
wrong number
chart mismatch
claim unsupported
missing source
conflicting terminology
```

thì:

```text
STOP
→ report
→ fix source
→ rebuild
```

Không tiếp tục export final.

---

# 113. AUTOMATED CHECKS

Tạo script:

```text
scripts/qa_presentation.*
```

Phải kiểm:

```text
missing title
overflow
clipping
tiny text
missing source
missing chart source
missing formula metadata
duplicate slide title
inconsistent terminology
broken image
broken hyperlink
notes absent
```

---

# 114. VISUAL QA

Sau khi render:

```text
inspect every slide
```

Không chỉ inspect slide 1.

Phải scan:

```text
text overlaps
objects outside bounds
formula clipping
chart labels
footnotes
source text
screenshots
icons
```

---

# 115. MACHINE READABLE PRESENTATION SPEC

Tạo:

```text
presentation/
├── presentation.yaml
├── slides/
├── charts/
├── formulas/
├── evidence/
├── assets/
├── notes/
└── qa/
```

---

# 116. PRESENTATION.YAML

Ví dụ:

```yaml
project:
  id: EDUCHOICE-AI
  title: ...
  version: ...

competition:
  type: ...
  rulesSource: ...
  presentationDuration: unknown

design:
  aspectRatio: "16:9"
  theme: ...

research:
  question: ...
  hypothesis: ...
  primaryOutcome: ...

ai:
  provider: Gemini
  role: reasoning
  fallback: rule-engine

quality:
  requireCitations: true
  requireFormulaValidation: true
  requireVisualQA: true
```

---

# 117. SLIDE YAML

Ví dụ:

```yaml
slideId: S11
type: result
headline: "Adaptive intervention increased..."
claimIds:
  - CLM-011
evidenceIds:
  - EV-101
chartIds:
  - CH-04
formulaIds:
  - F-03
speaker:
  targetSeconds: 35
backupSlide: B05
```

Không cho slide reference ID không tồn tại.

---

# 118. DATA SCHEMA

Mỗi dataset:

```yaml
datasetId:
name:
description:
source:
rows:
unitOfObservation:
unitOfAnalysis:
variables:
missingPolicy:
processing:
version:
```

---

# 119. VARIABLE DICTIONARY

Mỗi variable:

```yaml
name:
label:
type:
unit:
source:
role:
allowedRange:
missingAllowed:
meaning:
```

---

# 120. FORMULA REGISTRY EXAMPLE

```yaml
formulaId: F-001
name: Completion Rate
equation: "Completed / Eligible × 100%"
variables:
  Completed:
    unit: "count"
  Eligible:
    unit: "count"
resultUnit: "%"
scope:
  denominator: eligible actions only
status: VERIFIED
```

---

# 121. FORMULA TEST CASES

Mỗi formula phải có test:

```yaml
formulaId:
cases:
  - input:
      Completed: 78
      Eligible: 100
    expected: 78
  - input:
      Completed: 0
      Eligible: 100
    expected: 0
```

Edge cases:

```text
denominator = 0
missing
negative
out-of-range
```

---

# 122. UNIT TEST FOR FORMULAS

Không chỉ kiểm bằng mắt.

OpenCode phải viết test code cho formula.

Ví dụ:

```text
testCompletionRate()
testPercentPointChange()
testRelativeChange()
testMean()
testSD()
```

---

# 123. STATISTICAL FORMULA LIBRARY

Không cài công thức vô tội vạ.

Chỉ hỗ trợ:

```text
descriptive statistics
appropriate effect sizes
appropriate confidence intervals
appropriate repeated-measures analysis
```

Nếu analysis method không được quyết định:

```text
DO NOT AUTOSELECT STATISTICAL METHOD FOR FINAL CLAIM
```

Agent phải flag cho human review.

---

# 124. RESEARCH DESIGN VALIDATOR

Check:

```text
RQ
→ outcome
→ variable
→ method
→ statistic
```

Ví dụ:

```text
RQ asks causal effect
but
design = one-group pre/post
```

→ flag:

```text
CAUSALITY OVERCLAIM
```

---

# 125. USER DATA PROTECTION IN PPTX

Không export:

```text
real names
phone
email
address
student ID
```

nếu không cần.

Thay:

```text
S001
S002
```

---

# 126. DEMOGRAPHIC DATA

Chỉ hiển thị nếu:

```text
research-relevant
consented
aggregated
safe
```

---

# 127. RAW DATA BACKUP

PPTX không cần raw data đầy đủ.

Nhưng package phải có:

```text
raw/
processed/
analysis/
```

nội bộ.

---

# 128. PRESENTATION PACKAGE

Final output:

```text
dist/
├── EduChoice-AI_Presentation.pptx
├── EduChoice-AI_Presentation.pdf
├── Speaker_Notes.pdf
├── Evidence_Appendix.pdf
├── Formula_Appendix.pdf
├── QA_Report.md
├── Formula_QA_Report.md
├── Citation_Manifest.md
├── Traceability_Matrix.csv
└── assets/
```

---

# 129. PDF PREVIEW

Export PDF để:

```text
quick visual review
```

Nhưng PDF không thay thế PPTX.

---

# 130. FINAL QA REPORT

File:

```text
dist/QA_REPORT.md
```

Phải có:

```text
Deck status
Slide count
Formula count
Chart count
Citation count
Unsupported claims
Visual errors
Overflow count
Formula errors
Data errors
Timing estimate
Risk level
Final status
```

---

# 131. FORMULA QA REPORT

File:

```text
dist/FORMULA_QA_REPORT.md
```

Mỗi công thức:

```text
Formula ID
Equation
Math check
Science check
Symbol check
Unit check
Rendering check
Source
Status
```

---

# 132. CLAIM QA REPORT

File:

```text
dist/CLAIM_QA_REPORT.md
```

Mỗi claim:

```text
Claim ID
Slide
Evidence
Source
Claim type
Overclaim risk
Status
```

---

# 133. PRESENTATION READINESS SCORE

Không dùng một điểm tổng duy nhất để che lỗi.

Có thể dùng:

```text
Evidence Readiness
Formula Readiness
Data Readiness
Scientific Readiness
Engineering Readiness
Visual Readiness
Speaking Readiness
```

Mỗi nhóm 0–5.

Nhưng:

```text
Critical issue
→ NOT READY
```

dù score cao.

---

# 134. RED FLAGS

Nếu có một trong các lỗi:

```text
fake data
wrong formula
wrong unit
unsupported claim
citation fabrication
student cannot explain result
AI-written conclusion without verification
causal overclaim
```

→:

```text
NO-GO
```

---

# 135. GREEN LIGHT CONDITIONS

Chỉ cho FINAL khi:

```text
all formulas verified
all primary numbers traceable
all primary claims evidenced
all charts checked
all sources recorded
all slides rendered
all speaker notes checked
student can explain
```

---

# 136. SPEAKING SCRIPT STRUCTURE

Học sinh nên trình bày theo:

```text
1. Vấn đề
2. Bằng chứng
3. Câu hỏi
4. Giải pháp
5. Cách kiểm tra
6. Kết quả
7. Điều kết quả cho phép kết luận
8. Điều chưa thể kết luận
```

---

# 137. SCIENTIFIC LANGUAGE FOR STUDENTS

Khuyến khích:

```text
"Dữ liệu của nhóm cho thấy..."
"Kết quả bước đầu gợi ý..."
"Trong điều kiện thử nghiệm..."
"Chúng em chưa đủ bằng chứng để kết luận..."
```

Tránh:

```text
"chắc chắn"
"100% hiệu quả"
"AI hiểu hoàn toàn"
"chưa ai trên thế giới làm"
"tốt nhất"
```

nếu không có bằng chứng.

---

# 138. ENGINEERING LANGUAGE

Dùng:

```text
prototype
iteration
constraint
trade-off
failure mode
validation
reliability
latency
fallback
```

---

# 139. RESEARCH LANGUAGE

Dùng:

```text
variable
sample
method
evidence
association
effect
confidence
limitation
replication
```

---

# 140. PRODUCT LANGUAGE

Dùng:

```text
user flow
feature
interaction
adaptive behavior
teacher dashboard
data control
```

---

# 141. DO NOT CONFUSE PRODUCT METRICS AND RESEARCH OUTCOMES

Ví dụ:

```text
App completion rate
```

là product metric.

Không tự gọi:

```text
learning improvement
```

---

# 142. DO NOT CONFUSE AI QUALITY AND STUDENT OUTCOME

Ví dụ:

```text
AI recommendation acceptance = 90%
```

không có nghĩa:

```text
learning improved 90%
```

---

# 143. DO NOT CONFUSE INTERVENTION RESPONSE AND TRANSFER

```text
Student completed retry
≠
real-world behavior changed
```

Transfer cần đo riêng.

---

# 144. TRANSFER SLIDE

Nếu có transfer:

```text
Game behavior
→ Micro-action
→ completion
→ follow-up
```

và hiển thị:

```text
opportunity
completion
retention
```

nếu thực sự có dữ liệu.

---

# 145. STUDENT EXPERIENCE SLIDE

Không dùng:

```text
Student State = 0.62
```

trên student-facing deck.

Dùng:

```text
"Thử một cách khác"
"Chia nhiệm vụ thành bước nhỏ"
"Em đã thay đổi chiến lược"
```

---

# 146. TEACHER EXPERIENCE SLIDE

Giáo viên thấy:

```text
signal
evidence
recommendation
reason
confidence
action
```

---

# 147. SYSTEM CONTROL SLIDE

Quản trị thấy:

```text
API health
data quality
AI usage
fallback
audit
```

---

# 148. THREE AUDIENCES

PPTX phải phục vụ:

```text
Student
→ can present

Judge
→ can evaluate

Teacher
→ can defend
```

---

# 149. PRESENTATION MODE VS DEMO MODE

Tạo:

```text
presentation mode
```

và:

```text
demo mode
```

Presentation:

```text
simple
```

Demo:

```text
interactive
```

Không để demo UI làm deck rối.

---

# 150. OPENING HOOK

Trong 15–20 giây đầu:

```text
real problem
or
short scenario
or
unexpected measured fact
```

Không mở bằng:

```text
"Xin chào, hôm nay nhóm chúng em..."
```

quá lâu.

Có thể nói:

> "Điều gì xảy ra nếu hệ thống không chỉ biết học sinh làm đúng hay sai, mà còn nhận ra cách các em đang xử lý một nhiệm vụ?"

Sau câu này mới giới thiệu dự án.

---

# 151. CLOSING

Kết:

```text
Problem
→ mechanism
→ evidence
→ next step
```

Không kết bằng:

```text
"Cảm ơn quý thầy cô đã lắng nghe."
```

trước khi chốt đóng góp.

---

# 152. VISUAL NARRATIVE TEMPLATE

Mỗi slide nên ưu tiên một trong:

```text
BIG NUMBER
PROCESS
COMPARISON
BEFORE/AFTER
SYSTEM MAP
SCREENSHOT
EXPERIMENT
RESULT
LIMITATION
```

Không làm tất cả cùng lúc.

---

# 153. BIG NUMBER RULE

Ví dụ:

```text
78%
```

Nhưng phải kèm:

```text
what
n
period
definition
```

Không để "78%" trơ trọi.

---

# 154. COMPARISON RULE

Một comparison phải ghi:

```text
same outcome
same scale
same population
same conditions
```

---

# 155. ACCESSIBILITY

Kiểm tra:

```text
contrast
font size
colorblind-safe encoding
captions
alt text in source docs
```

Không dùng màu là tín hiệu duy nhất.

---

# 156. LANGUAGE QA

Deck tiếng Việt phải kiểm tra:

```text
chính tả
dấu
thuật ngữ
viết hoa
viết tắt
khoảng cách
```

Các thuật ngữ tiếng Anh phải nhất quán.

---

# 157. FORMULA LANGUAGE QA

Không để:

```text
"công thức tính hiệu quả"
```

nếu formula thực ra chỉ đo:

```text
completion rate
```

Tên metric phải đúng.

---

# 158. EVIDENCE LABELS

Có thể dùng tag:

```text
MEASURED
CALCULATED
INFERRED
LITERATURE
DESIGN
```

trên backup slides.

---

# 159. SOURCE PRIORITY

Nguồn cho claim khoa học:

```text
official regulation
peer-reviewed study
official documentation
primary dataset
reliable institutional source
```

Không dùng:

```text
random blog
AI-generated citation
```

---

# 160. EXTERNAL PLATFORM COMPARISON

Nếu so sánh với:

```text
Panorama
Alongside
DreamBox
ALEKS
IXL
Minecraft Education
Kahoot
ClassDojo
```

phải ghi:

```text
scope
source
date accessed
capability observed
uncertainty
```

Không phán:

```text
"platform X không có..."
```

nếu nguồn không đủ chứng minh.

---

# 161. STATE-OF-THE-ART SLIDE

Chỉ nên có:

```text
Existing landscape
Our target gap
```

Không đưa 20 logo.

---

# 162. NOVELTY CLAIM

Dùng:

```text
Potentially novel integration
```

hoặc:

```text
Distinct system mechanism
```

nếu bằng chứng hỗ trợ.

Không dùng:

```text
World's first
```

nếu chưa có prior-art search đầy đủ.

---

# 163. SCIENCE VS PRODUCT

Một slide phải phân biệt:

```text
Product:
what we built

Science:
what we tested

Evidence:
what data showed
```

---

# 164. RESEARCH DIAGRAM

Khuyến nghị:

```text
Research Question
        ↓
Hypothesis
        ↓
Variables
        ↓
Method
        ↓
Data
        ↓
Analysis
        ↓
Conclusion
```

---

# 165. ENGINEERING DIAGRAM

```text
Requirement
↓
Options
↓
Selection
↓
Prototype
↓
Testing
↓
Failure
↓
Iteration
↓
Final
```

---

# 166. BOTH MODELS MUST MATCH

Nếu dự án kỹ thuật + nghiên cứu:

```text
Engineering loop
```

phải nối với:

```text
Scientific validation loop
```

---

# 167. PRESENTATION QA GATES

## Gate A — Source

All source files read.

## Gate B — Data

All primary numbers verified.

## Gate C — Formula

All formulas verified.

## Gate D — Claim

All claims evidenced.

## Gate E — Visual

All slides rendered and inspected.

## Gate F — Speech

Student can explain.

## Gate G — Integrity

AI use disclosed and human ownership confirmed.

---

# 168. FINAL GO/NO-GO

```text
GO
```

tất cả gates pass.

```text
GO WITH CONDITIONS
```

chỉ có minor issue.

```text
NO-GO
```

nếu:

```text
formula error
data error
unsupported major claim
missing citation for major claim
student cannot defend
```

---

# 169. OPEN CODE IMPLEMENTATION TASKS

OpenCode phải thực hiện:

### Task 1

Scan repository.

### Task 2

Locate current project data.

### Task 3

Locate research documents.

### Task 4

Locate formulas.

### Task 5

Locate charts.

### Task 6

Locate existing PPTX assets.

### Task 7

Build registries.

### Task 8

Build storyboard.

### Task 9

Generate PPTX.

### Task 10

Render and QA.

### Task 11

Generate speaker notes.

### Task 12

Generate backup slides.

### Task 13

Generate reports.

---

# 170. OPEN CODE MUST NOT

Không được:

```text
invent data
invent results
invent statistical significance
invent formula
invent references
invent experiment
invent sample
invent screenshot
```

Nếu thiếu:

```text
TODO / EVIDENCE GAP
```

---

# 171. MISSING EVIDENCE POLICY

Ví dụ:

```text
Result requested:
Effect size

Data unavailable:
```

Không tạo effect size giả.

Ghi:

```text
NOT COMPUTABLE FROM AVAILABLE DATA
```

---

# 172. FORMULA CONFLICT POLICY

Nếu hai tài liệu có công thức khác nhau:

```text
Do not silently choose.
```

Tạo:

```text
FORMULA CONFLICT
```

và yêu cầu human review.

---

# 173. DATA CONFLICT POLICY

Nếu:

```text
report says 78
dataset says 76
```

không chọn một số tùy ý.

Tạo:

```text
DATA CONFLICT
```

---

# 174. SOURCE CONFLICT POLICY

Nếu nguồn khác nhau:

```text
citation conflict
```

phải ghi cả hai và đánh giá.

---

# 175. SLIDE SOURCE HIERARCHY

Ưu tiên:

```text
project measurement
→ official documentation
→ peer-reviewed literature
→ institutional source
→ other credible source
```

---

# 176. CHART SOURCE DISPLAY

Ví dụ:

```text
Nguồn: Dữ liệu thử nghiệm của nhóm, N = 42, 08–09/2026.
```

Không:

```text
Source: Group
```

quá mơ hồ.

---

# 177. EXPERIMENT PHOTO RULE

Ảnh thí nghiệm phải có:

```text
date/context
```

nếu cần xác minh.

---

# 178. PRODUCT PHOTO RULE

Ảnh sản phẩm phải đúng:

```text
final build
```

hoặc ghi:

```text
Prototype v1
```

---

# 179. SCREENSHOT VERSIONING

Screenshot metadata:

```text
build
commit
version
date
```

---

# 180. PICTURE-IN-PICTURE RULE

Không thu nhỏ screenshot quá mức.

Nếu chi tiết quan trọng:

```text
crop
zoom
callout
```

---

# 181. CALLOUT RULE

Callout:

```text
1–3 per image
```

không dùng 12 mũi tên.

---

# 182. FLOW ARROW RULE

Mũi tên phải chỉ chiều.

Không để:

```text
4 arrows cross
```

---

# 183. ARCHITECTURE LAYOUT

Dùng:

```text
top = interface
middle = intelligence
bottom = data
side = safety/human
```

---

# 184. COMPLEXITY BUDGET

Mỗi slide tối đa:

```text
1 main diagram
OR
1 major chart
OR
1 major screenshot
```

Không phải tất cả.

---

# 185. TEXT DENSITY

Nếu slide có nhiều chữ:

```text
convert to:
diagram
table
3 bullets
```

Không trình bày như báo cáo Word.

---

# 186. TABLE RULE

Mỗi table:

```text
≤ 6–8 rows visible
```

Nếu dài:

```text
backup slide
```

---

# 187. FOOTNOTE RULE

Footnotes:

```text
small but readable
```

Không dùng font quá nhỏ để nhét citation.

---

# 188. APPENDIX FORMULA TABLE

Nếu có nhiều công thức:

| ID | Formula | Purpose | Unit | Source | Status |
|---|---|---|---|---|---|

---

# 189. APPENDIX RAW DATA

Chỉ đưa:

```text
sample subset
```

trên slide.

Full data ở file phụ.

---

# 190. RESEARCH ETHICS

Nếu nghiên cứu có học sinh:

```text
consent
data minimization
pseudonymization
teacher oversight
```

phải ghi trong methodology backup.

---

# 191. STUDENT INTERVIEW PREPARATION

Mỗi thành viên nhóm có:

```text
personal contribution sheet
```

Mẫu:

```text
What I did
What I learned
What failed
What I would change
```

---

# 192. TEAM DEFENSE

Nếu dự án 2–3 học sinh:

```text
Member A = problem/science
Member B = engineering/AI
Member C = data/evaluation
```

nhưng tất cả phải hiểu toàn hệ thống.

---

# 193. RANDOM QUESTION TEST

OpenCode tạo chế độ:

```text
RANDOM JUDGE QUESTION
```

Chọn ngẫu nhiên:

```text
science
engineering
AI
data
formula
ethics
novelty
```

Học sinh tập trả lời trong:

```text
20–60 seconds
```

---

# 194. ANSWER FRAMEWORK

Khuyến nghị:

```text
Answer
→ Evidence
→ Limitation
```

Ví dụ:

> "Nhóm em chọn phương án B vì trong thử nghiệm B đạt tỷ lệ ghi nhận dữ liệu cao hơn. Tuy nhiên phạm vi thử nghiệm còn nhỏ nên đây mới là bằng chứng bước đầu."

---

# 195. DO NOT MEMORIZE NUMBERS BLINDLY

Học sinh phải biết:

```text
what the number means
where it came from
how it was calculated
```

---

# 196. DO NOT MEMORIZE FORMULA BLINDLY

Phải biết:

```text
why formula
variables
units
assumption
```

---

# 197. FORMULA EXPLANATION TEMPLATE

```text
"Công thức này dùng để..."
"Trong đó ... là..."
"Đơn vị là..."
"Nhóm dùng nó vì..."
```

---

# 198. DATA EXPLANATION TEMPLATE

```text
"Dữ liệu được thu bằng..."
"Mẫu gồm..."
"Nhóm xử lý bằng..."
"Kết quả..."
"Điều này cho phép..."
"Nhưng chưa cho phép..."
```

---

# 199. LIMITATION EXPLANATION TEMPLATE

```text
"Hạn chế hiện tại là..."
"Điều này có thể ảnh hưởng..."
"Lần tới nhóm sẽ..."
```

---

# 200. AI EXPLANATION TEMPLATE

```text
"Rule Engine chịu trách nhiệm..."
"Gemini hỗ trợ..."
"Output được kiểm tra bằng..."
"Nếu AI lỗi, hệ thống..."
```

---

# 201. FINAL PROJECT NARRATIVE

Deck phải tạo được một câu chuyện:

> **Chúng em bắt đầu từ một vấn đề thực tế. Chúng em đo vấn đề thay vì giả định. Từ dữ liệu đó, chúng em thiết kế một cơ chế. Chúng em xây dựng nguyên mẫu, thử nghiệm, ghi nhận lỗi và cải tiến. Chúng em đo kết quả bằng những chỉ số đã định nghĩa trước. Những gì dữ liệu cho phép kết luận được trình bày rõ; những gì chưa đủ bằng chứng cũng được nói rõ.**

---

# 202. FINAL DELIVERABLES

OpenCode phải xuất:

```text
01_EduChoice-AI_Presentation.pptx
02_EduChoice-AI_Presentation.pdf
03_Speaker_Notes.md
04_Speaker_Notes.pdf
05_Judge_QA.md
06_Evidence_Ledger.md
07_Formula_Registry.md
08_Formula_QA_Report.md
09_Claim_QA_Report.md
10_Citation_Manifest.md
11_Traceability_Matrix.csv
12_Presentation_QA_Report.md
13_AI_Usage_Log.md
14_Data_Dictionary.md
15_Research_Method_Summary.md
```

---

# 203. FINAL ACCEPTANCE CRITERIA

## Scientific

```text
[ ] Research question clear
[ ] Variables identified
[ ] Method reproducible
[ ] Data traceable
[ ] Statistics appropriate
[ ] Claims bounded
[ ] Limitations included
```

## Engineering

```text
[ ] Problem defined
[ ] Criteria defined
[ ] Alternatives considered
[ ] Prototype shown
[ ] Testing shown
[ ] Failure/iteration shown
[ ] Final solution justified
```

## Formula

```text
[ ] No formula errors
[ ] Units consistent
[ ] Symbols consistent
[ ] Conditions explicit
[ ] Formula source known
[ ] Rendering correct
```

## Data

```text
[ ] No invented data
[ ] No duplicate counts
[ ] Denominators correct
[ ] Missing data handled
[ ] Aggregation correct
[ ] Chart matches dataset
```

## AI

```text
[ ] AI role clear
[ ] Gemini role bounded
[ ] Fallback shown
[ ] Data minimization
[ ] Human oversight
[ ] AI usage logged
```

## Presentation

```text
[ ] One idea per slide
[ ] Readable from distance
[ ] Strong opening
[ ] Logical flow
[ ] Real screenshots
[ ] Evidence visible
[ ] Backup slides ready
[ ] Speaker notes ready
```

## Student ownership

```text
[ ] Students can explain all numbers
[ ] Students can explain all formulas
[ ] Students can explain system architecture
[ ] Students can explain limitations
[ ] Students can explain AI role
[ ] Students can defend novelty carefully
```

---

# 204. IMPLEMENTATION COMMAND FOR OPENCODE

Use the following as the execution instruction:

```text
You are the presentation engineering lead for EduChoice-AI.

Read this specification completely.

Then inspect the entire repository and all available project documents, datasets, formulas, screenshots, reports, code, and research files.

Do NOT invent missing information.

Build the following registries first:
- Evidence Ledger
- Data Dictionary
- Formula Registry
- Claim Registry
- Citation Manifest
- Terminology Glossary
- Traceability Matrix

Then audit:
- scientific logic
- engineering logic
- data integrity
- formula correctness
- units
- statistical logic
- AI claims
- novelty claims
- privacy
- visual assets

Then produce a storyboard for the main presentation and backup slides.

Then generate the PPTX.

Then render every slide to images.

Then perform:
- visual QA
- formula QA
- data QA
- citation QA
- claim QA
- terminology QA
- timing QA

If any critical issue exists:
STOP FINAL EXPORT
and generate a failure report.

Only when all critical gates pass:
- export PPTX
- export PDF
- export speaker notes
- export QA reports
- export judge question bank
- export evidence/formula/citation manifests.

The presentation must help students prove:
1. what problem they solved;
2. why it matters;
3. what they built;
4. what scientific/technical mechanism they used;
5. how they tested it;
6. what data they collected;
7. how formulas were defined and validated;
8. what the results actually show;
9. what remains uncertain;
10. why the product is meaningful.

Do not optimize the deck for visual beauty at the expense of scientific truth.
Do not optimize the deck for complexity.
Optimize for:
truth → evidence → clarity → student ownership → judge confidence.
```

---

# 205. FINAL PRINCIPLE

> **Một bài PPTX KHKT tốt không phải là bản PowerPoint đẹp của một sản phẩm. Nó là một "chuỗi bằng chứng có thể trình bày bằng hình ảnh".**

Cấu trúc cuối cùng:

```text
REAL PROBLEM
      ↓
MEASURED EVIDENCE
      ↓
RESEARCH QUESTION
      ↓
DESIGN
      ↓
PRODUCT
      ↓
EXPERIMENT
      ↓
DATA
      ↓
FORMULA
      ↓
ANALYSIS
      ↓
RESULT
      ↓
LIMITATION
      ↓
CONCLUSION
      ↓
NEXT EXPERIMENT
```

Và nguyên tắc bất biến:

```text
Không có dữ liệu
→ không có số.

Không có nguồn
→ không có claim ngoài phạm vi nội bộ.

Không hiểu công thức
→ không đưa vào slide chính.

Không giải thích được kết quả
→ chưa sẵn sàng thuyết trình.

Không chứng minh được
→ không tuyên bố.

Không được AI tự bịa
→ mọi nội dung quan trọng phải truy nguyên.
```

---

# 206. DEFINITION OF DONE

Dự án chỉ được coi là hoàn tất phần trình bày khi:

```text
SOURCE
✓

DATA
✓

FORMULA
✓

EVIDENCE
✓

PRESENTATION
✓

VISUAL QA
✓

SCIENTIFIC QA
✓

STUDENT DEFENSE
✓
```

Nếu thiếu một dấu:

```text
NOT READY FOR FINAL PRESENTATION
```


---

# PHỤ LỤC A — VISUAL / DOCUMENT PRESENTATION REFERENCE
## Tham chiếu bắt buộc từ PPTX mẫu “AI SMART CONTROL – BẢN HOÀN CHỈNH”

Tài liệu PPTX được cung cấp làm **visual reference** cho cách tổ chức một bài thuyết trình sản phẩm học sinh. PPTX mẫu có cấu trúc 35 slide và thể hiện một mạch trình bày tương đối rõ:

```text
COVER
→ GIỚI THIỆU / THÀNH VIÊN
→ NỘI DUNG
→ ĐẶT VẤN ĐỀ
→ KHOẢNG TRỐNG
→ MỤC TIÊU
→ TÍNH MỚI
→ TÍNH SÁNG TẠO
→ Ý TƯỞNG
→ TỔNG QUAN SẢN PHẨM
→ LINH KIỆN / CHI PHÍ
→ CHẾ TẠO
→ HƯỚNG DẪN / CHI TIẾT
→ NGUYÊN LÝ
→ CƠ SỞ KHOA HỌC
→ MỤC TIÊU GIÁO DỤC
→ TÁC ĐỘNG
→ THÁCH THỨC / GIẢI PHÁP
→ AN TOÀN / ĐẠO ĐỨC
→ ĐÁNH GIÁ
→ TÓM TẮT
→ KẾT LUẬN
→ TÀI LIỆU THAM KHẢO
→ CLOSING
```

Đây được xem là **tham chiếu về thể thức kể chuyện và bố trí nội dung**, không phải mẫu để sao chép nguyên xi.

### A.1. Cách chia chương bằng slide

PPTX mẫu sử dụng các slide chuyển chương như:

```text
Giới thiệu
Nội dung
Đặt vấn đề
Mục tiêu cụ thể
Tính mới
Tính sáng tạo
Tổng quan về sản phẩm
Chế tạo sản phẩm
Chi tiết sản phẩm
Vận hành sản phẩm
AI-CONTROL: Nguyên lý hoạt động
Mục tiêu giáo dục
Tác động giáo dục
Đánh giá
Kết luận
Tài liệu tham khảo
```

Ví dụ, phần “Đặt vấn đề” được chia thành các pain point đánh số 01–05, sau đó mới chuyển sang khoảng trống và mục tiêu. Đây là cách tổ chức có giá trị để OpenCode tham khảo khi phân tầng câu chuyện. fileciteturn11file0L62-L73

### A.2. Cách trình bày vấn đề

PPTX mẫu không mở đầu bằng kiến trúc kỹ thuật. Nó đi từ:

```text
khó khăn thực tế
→ nguyên nhân
→ nhu cầu
→ khoảng trống
```

Sau đó mới giới thiệu giải pháp.

Đây phải trở thành nguyên tắc cho EduChoice-AI:

```text
PROBLEM FIRST
TECHNOLOGY SECOND
```

---

# A.3. Cách trình bày khoảng trống và tính mới

PPTX mẫu có phần:

```text
Tổng quan
Khoảng trống nghiên cứu
```

sau đó tách:

```text
Tính mới
Tính sáng tạo
```

Đây là một cấu trúc tốt để OpenCode sử dụng.

Tuy nhiên, EduChoice-AI phải nâng cấp:

```text
Tính mới
```

thành:

```text
What already exists
→ What remains incomplete
→ What EduChoice specifically integrates
→ What has been experimentally demonstrated
```

Không được dùng “tính mới” như một khẩu hiệu không có prior-art/evidence.

---

# A.4. Cách trình bày mục tiêu

PPTX mẫu có slide “Mục tiêu cụ thể”, trong đó mục tiêu được mô tả theo hướng:

```text
cụ thể
đo lường
khả thi
liên quan
thời hạn
```

và có các target định lượng như tỷ lệ học sinh hoàn thành sản phẩm, tỷ lệ đạt rubric... fileciteturn11file0L110-L128

EduChoice-AI phải giữ tinh thần này nhưng **chỉ dùng con số khi có dữ liệu/thiết kế nghiên cứu hỗ trợ**.

---

# A.5. Cách trình bày sản phẩm

PPTX mẫu sử dụng:

```text
Tổng quan sản phẩm
→ BOM/chi phí
→ chế tạo
→ chi tiết module
→ giao diện
→ vận hành
```

Phần tổng quan sản phẩm có bảng linh kiện, công dụng, số lượng và đơn giá. fileciteturn11file0L247-L264

Đây là mô hình tốt để EduChoice-AI áp dụng cho:

```text
software modules
data modules
AI modules
game modules
deployment components
```

không nhất thiết chỉ liệt kê linh kiện phần cứng.

---

# A.6. Cách trình bày hướng dẫn theo từng bước

PPTX mẫu dùng cấu trúc:

```text
Bước 1
Bước 2
Bước 3
...
```

và mô tả rõ chức năng của từng thao tác:

```text
Chọn Camera
Chọn Cổng COM
Quét lại
Kết nối
Ngắt kết nối
```

sau đó giải thích ý nghĩa từng thành phần. fileciteturn11file0L281-L293

EduChoice-AI nên sử dụng cùng cách kể cho demo:

```text
Bước 1 — Start
Bước 2 — Play
Bước 3 — Behavior captured
Bước 4 — Situation recognized
Bước 5 — Recommendation
Bước 6 — Intervention
Bước 7 — Retry
Bước 8 — Transfer
```

---

# A.7. Cách trình bày nguyên lý hoạt động

PPTX mẫu có một slide riêng cho:

```text
Công cụ AI cốt lõi
→ Bước 1 thu nhận
→ Bước 2 phân tích
→ Bước 3 kết quả
→ Bước 4 chuyển dữ liệu
→ Bước 5 điều khiển
```

Đây là một pattern rất phù hợp với EduChoice-AI. fileciteturn11file0L334-L339

Chuyển thành:

```text
1. Collect
2. Validate
3. Contextualize
4. Recognize
5. Decide
6. Validate AI
7. Act
8. Measure response
9. Transfer
10. Update model
```

---

# A.8. Cách trình bày cơ sở khoa học

PPTX mẫu có một vùng riêng cho “Luận cứ khoa học” và sau đó mới diễn giải nguyên lý phần cứng/phần mềm. fileciteturn11file0L367-L388

EduChoice-AI phải giữ cách phân tách:

```text
WHAT THE PRODUCT DOES
```

và:

```text
WHY THE METHOD IS SCIENTIFICALLY JUSTIFIED
```

Không trộn hai thứ thành một đoạn quảng cáo.

---

# A.9. Cách trình bày module

PPTX mẫu minh họa module bằng sơ đồ trực quan:

```text
PC
→ Arduino UNO
→ Relay
→ PCA9685
→ Servo
```

và sau đó giải thích chức năng từng linh kiện. fileciteturn11file0L370-L387

EduChoice-AI phải dùng pattern tương tự:

```text
Student UI
→ API Gateway
→ Data Layer
→ Rule Engine
→ Student Model
→ Candidate Generator
→ Gemini
→ Validation
→ Game Director
→ Intervention
→ Response
```

Mỗi module:

```text
Tên
Vai trò
Input
Output
Tại sao cần
Cách kiểm tra
```

---

# A.10. Cách trình bày tác động bằng số liệu

PPTX mẫu có cách trình bày nổi bật:

```text
GIẢM 50% THỜI GIAN
25–30 phút → ~12 phút
```

sau đó giải thích phương pháp cũ, phương pháp mới và bằng chứng thử nghiệm. fileciteturn11file0L445-L472

Đây là **visual pattern được phép tham khảo**, nhưng EduChoice-AI phải nâng cấp thành:

```text
BIG NUMBER
+
definition
+
n
+
measurement window
+
comparison
+
uncertainty/limitation
```

Không được chỉ lấy một “con số đẹp” làm tiêu đề.

---

# A.11. Cách trình bày thách thức → giải pháp

PPTX mẫu có:

```text
Thách thức
→ Cơ sở vật chất
→ Kinh phí
→ Chuyên môn GV
```

sau đó là:

```text
Giải pháp
→ Offline
→ kinh phí thấp
→ thiết bị dễ mua
→ tập huấn
```

fileciteturn11file0L499-L510

EduChoice-AI nên dùng:

```text
Challenge
→ Data privacy
→ AI reliability
→ Teacher workload
→ Network
→ Research validity

Solution
→ minimization
→ fallback
→ dashboard aggregation
→ offline-safe behavior
→ controlled experiment
```

---

# A.12. Cách trình bày an toàn và đạo đức

PPTX mẫu dành riêng một vùng:

```text
Quyền riêng tư
Đạo đức
An toàn
```

và nhấn mạnh giáo dục AI có trách nhiệm. fileciteturn11file0L534-L538

EduChoice-AI phải mở rộng thành:

```text
No diagnosis
Data minimization
Consent
Role-based access
Human oversight
AI fallback
Audit log
Student agency
```

---

# A.13. Cách trình bày kết luận

PPTX mẫu có phần:

```text
Tóm tắt đề tài
→ Giá trị giáo dục
→ Giá trị ứng dụng AI
→ Giá trị cộng đồng
→ Kết luận
```

fileciteturn11file0L552-L581

EduChoice-AI nên đổi thành:

```text
What we built
What we measured
What the results support
What remains uncertain
What we will test next
```

---

# A.14. Cách trình bày tài liệu tham khảo

PPTX mẫu có slide tài liệu tham khảo và liệt kê các nguồn khoa học/giáo dục/AI làm nền tảng cho sản phẩm. fileciteturn11file0L584-L597

EduChoice-AI phải nâng cấp thành:

```text
References
+
Claim-to-source mapping
```

Mỗi claim khoa học quan trọng phải truy được tới citation.

---

# A.15. PHONG CÁCH HÌNH THỨC CẦN THAM CHIẾU

PPTX mẫu cho thấy một visual language thiên về:

```text
large section titles
strong chapter separators
short textual blocks
large product visuals
process arrows
numbered steps
tables where needed
highlighted key numbers
technical diagrams
```

Khi kiểm tra trực tiếp file mẫu, font sử dụng chủ đạo là **Be Vietnam Pro**, với một số text Times New Roman; cỡ chữ phổ biến trong nội dung khoảng 11–20 pt, tiêu đề lớn có thể lên cao hơn. Vì đây là quan sát kỹ thuật từ file mẫu, OpenCode chỉ dùng nó làm **reference**, không bắt buộc sao chép tuyệt đối.

Một số màu chủ đạo quan sát được từ file mẫu gồm sắc tím/xanh và các màu accent vàng/cam/xanh lục. OpenCode phải xây **design tokens** thay vì hard-code từng slide.

---

# A.16. KHÔNG SAO CHÉP NHỮNG ĐIỂM CHƯA TỐT

PPTX mẫu được dùng để học:

```text
story structure
visual hierarchy
technical explanation
product walkthrough
impact storytelling
```

nhưng OpenCode phải sửa các vấn đề nếu gặp:

```text
text quá dài
claim quá mạnh
số liệu chưa đủ nguồn
formula chưa có metadata
trang quá nhiều object
visual hierarchy chưa rõ
lặp nội dung
```

Đặc biệt không được sao chép lỗi chỉ vì chúng xuất hiện trong reference deck.

---

# A.17. REFERENCE DECK → EDUCHOICE-AI ADAPTATION MATRIX

| Pattern từ deck mẫu | EduChoice-AI áp dụng |
|---|---|
| Đặt vấn đề bằng 01–05 | Pain points + evidence |
| Khoảng trống nghiên cứu | State-of-the-art gap |
| Mục tiêu cụ thể | RQ + measurable outcomes |
| Tính mới | mechanism/integration gap |
| Tính sáng tạo | micro-adaptation/game/transfer |
| Tổng quan sản phẩm | system architecture |
| BOM | software/data/AI modules |
| Chế tạo | engineering iterations |
| Bước 1–5 | product demo flow |
| Nguyên lý hoạt động | closed-loop intelligence |
| Luận cứ khoa học | scientific rationale |
| Tác động giáo dục | measured outcomes |
| Thách thức → giải pháp | risk → mitigation |
| An toàn/đạo đức | privacy/AI governance |
| Đánh giá | experimental evidence |
| Kết luận | evidence-bounded conclusion |
| Tài liệu tham khảo | citation + claim mapping |

---

# A.18. RECOMMENDED EDUCHOICE-AI PRESENTATION TEMPLATE

OpenCode xây deck theo cấu trúc:

```text
01. Bìa
02. Đội ngũ / Vai trò
03. Nội dung
04. Đặt vấn đề
05. Bằng chứng vấn đề
06. Thực trạng / State of the Art
07. Khoảng trống
08. Câu hỏi nghiên cứu
09. Mục tiêu + tiêu chí đo
10. Tính mới / mechanism
11. Tính sáng tạo / user experience
12. Tổng quan sản phẩm
13. Kiến trúc hệ thống
14. Vòng đời dữ liệu
15. Cơ chế AI
16. Adaptive Decision
17. Demo bước 1
18. Demo bước 2
19. Demo bước 3
20. Demo kết quả
21. Thiết kế thử nghiệm
22. Dữ liệu
23. Công thức / Metric
24. Kết quả chính
25. Phân tích
26. So sánh / Ablation
27. Tác động
28. Thách thức
29. Safety / Privacy / Ethics
30. Hạn chế
31. Kết luận
32. Hướng phát triển
33. Tài liệu tham khảo
34+. Backup slides
```

Không bắt buộc đủ 33 slide chính. OpenCode phải co giãn theo thời lượng thật của cuộc thi.

---

# A.19. PRESENTATION DENSITY RULE

Học từ deck mẫu nhưng nâng chuẩn:

```text
chapter slide
→ low density

technical slide
→ medium density

result slide
→ low density + strong evidence

backup slide
→ high density is acceptable
```

Không làm mọi slide cùng một mật độ.

---

# A.20. "VISUAL RHYTHM"

Deck phải có nhịp:

```text
TEXT
→ VISUAL
→ DIAGRAM
→ SCREENSHOT
→ DATA
→ BIG NUMBER
→ PROCESS
→ DATA
```

tránh:

```text
10 text slides liên tiếp
```

hoặc:

```text
10 screenshot slides liên tiếp
```

---

# A.21. PRODUCT STORYTELLING RULE

Học từ reference deck:

```text
show it
→ explain it
→ operate it
→ prove it
```

EduChoice-AI:

```text
SHOW GAME
→ SHOW SIGNAL
→ SHOW ADAPTATION
→ SHOW RESPONSE
→ SHOW TRANSFER
→ SHOW DATA
```

---

# A.22. SCIENTIFIC STORYTELLING RULE

Song song:

```text
Claim
→ Evidence
→ Method
→ Result
→ Limitation
```

Nếu slide chỉ có:

```text
Claim
```

→ không đạt.

---

# A.23. TECHNICAL STORYTELLING RULE

```text
Requirement
→ design
→ implementation
→ failure
→ iteration
→ validation
```

Nếu không có evidence về iteration, không giả tạo "quá trình chế tạo".

---

# A.24. STUDENT PRESENTATION STYLE

Reference deck có nhiều đoạn giải thích sản phẩm khá chi tiết. OpenCode cần chuyển những đoạn này thành:

```text
headline
+
diagram
+
1–3 key statements
+
speaker note
```

Học sinh nói nhiều hơn slide.

---

# A.25. FINAL REFERENCE RULE

Tài liệu PPTX mẫu là:

```text
REFERENCE
```

không phải:

```text
SOURCE OF SCIENTIFIC FACT
```

Nội dung khoa học của EduChoice-AI phải lấy từ:

```text
project data
research literature
official documentation
validated formulas
actual experiments
```

Không lấy "cách trình bày" làm bằng chứng khoa học.

---

# A.26. REQUIRED CHANGE TO OPEN CODE BUILD

Trong bước tạo deck, OpenCode phải:

1. đọc reference PPTX;
2. trích xuất layout patterns;
3. nhận diện chapter structure;
4. nhận diện visual hierarchy;
5. lập `REFERENCE_PRESENTATION_ANALYSIS.md`;
6. lập `REFERENCE_STYLE_TOKENS.yaml`;
7. chuyển pattern thành design system EduChoice-AI;
8. không sao chép nội dung cá nhân hoặc dữ liệu riêng tư;
9. không sao chép claim chưa được kiểm chứng;
10. render deck mới;
11. so sánh với design reference ở mức **cấu trúc và nhịp thị giác**, không pixel-copy.

---

# A.27. FINAL QUALITY TARGET

Deck EduChoice-AI phải đạt:

```text
REFERENCE-DECK CLARITY
+
SCIENTIFIC EVIDENCE
+
TECHNICAL OWNERSHIP
+
DATA TRACEABILITY
+
FORMULA CORRECTNESS
+
STUDENT SPEAKABILITY
+
JUDGE DEFENSIBILITY
```

Không đánh đổi tính đúng đắn khoa học để đạt hình thức đẹp.

---

# A.28. VISUAL REFERENCE ACCEPTANCE TEST

Sau khi tạo PPTX, OpenCode phải kiểm:

```text
[ ] Có chapter separation rõ
[ ] Có problem → gap → solution
[ ] Có product walkthrough
[ ] Có process diagrams
[ ] Có big-number evidence
[ ] Có technical rationale
[ ] Có safety
[ ] Có references
[ ] Không copy nguyên văn reference deck
[ ] Không copy dữ liệu cá nhân
[ ] Không có unsupported claims
[ ] Không có formula/layout errors
```
