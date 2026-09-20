# EduChoice-AI — Benchmark Phương pháp Hỗ trợ Tâm lý Học sinh trên các Nền tảng khác

**Phiên bản:** V1.0 — Nghiên cứu tham chiếu (2026-09-20)
**Bối cảnh:** Bước 1 của chương trình cải tiến (đã hoàn thành: phân tích tổng quan + lưu vết + hỗ trợ tâm lý hiện tại, xem `EDUCHOICE_AI_PRE_IMPROVEMENT_AUDIT_REPORT.md`). Tài liệu này là kết quả **bước 2 — tra cứu phương pháp hỗ trợ tâm lý học sinh** trên các nền tảng khác, được tổ chức theo 3 trục khớp với các khoảng trống của EduChoice-AI.
**Mục đích sử dụng:** Làm cơ sở để xây kế hoạch cải tiến hỗ trợ tâm lý. Không phải đặc tả triển khai.

---

## 1. Tóm tắt hiện trạng (từ Bước 1)

- **Lưu vết học sinh làm bài:** đã có telemetry khá đủ — 17 loại `BehaviorEvent` (game_started, scene_viewed, choice_made, hint/help_requested, pause, abandoned, retry, reflection_submitted, micro_action_*, goal_*), `GameResult` với metrics thật (decisionTimeMeanMs, pause/help/retry count, completionRate...), goal engine, micro-action đời thực, mô hình 20 construct.
- **Hỗ trợ tâm lý:** mới ở dạng **nội dung nhúng trong game** — 13 toolkit đã kiểm duyệt (có safePhrases / avoidPhrases / contraindications), scene `intervention` + `toolkitHint`, prompt "thử lại", ảnh nhân vật `characterMood`, disclaimers "không chẩn đoán lâm sàng".
- **3 khoảng trống chính được xác định ở Bước 1:**
  1. **Không phát hiện sớm / không cảnh báo** — hệ thống không có chỉ số "wellness" tổng hợp, không có ngưỡng cảnh báo stress, không có dashboard giáo viên.
  2. **Không đo vòng hiệu quả can thiệp** — không log `intervention_*`, không phân loại phản ứng (intervention → response → retry → behavior change); các sheet 10/11/30 chỉ tồn tại ở schema.
  3. **Không có luồng tăng cấp con người** — mô hình `MinimumEffectiveIntervention` có bậc cuối L6_HUMAN_SUPPORT nhưng chưa có quy trình thực sự (gửi cảnh báo tới giáo viên/cán bộ tâm lý, quy trình tham chiếu).

Tài liệu này bổ sung bằng chứng nền tảng bên ngoài cho 3 trục trên, cộng với khung pháp lý Việt Nam.

---

## 2. TRỤC A — Phát hiện sớm & cảnh báo rủi ro (Early Warning / Wellness Signals)

### 2.1 Bảng benchmark các nền tảng

| Nền tảng | Tín hiệu thu thập | Cách phát hiện | Giao diện cảnh báo | Đặc điểm nổi bật |
|---|---|---|---|---|
| **Rhythm Mental Health** (rhythmmentalhealth.com) | Task nhận thức 90 giây/ngày (PVT — reaction time, hit rate, consistency) | So sánh **với chính baseline của học sinh**, không so với peer; độ lệch baseline = flag | Dashboard giáo viên: xanh/vàng/đỏ; danh sách "cần check-in hôm nay"; danh sách "recovery" | Phát hiện sớm 3-4 tuần so với self-report; **không hoàn thành task cũng là tín hiệu**; không thu biometrics; FERPA/COPPA |
| **Securly Aware** (securly.com/aware) | Hoạt động online trên thiết bị trường (email, social, Drive, browsing, conversational AI) | AI phân tích sentiment/keyword → mức wellness theo thời gian thực | Alert 24/7; cảnh báo giảm wellness | Kèm screening phòng ngừa; prompt học sinh xem lại trước khi gửi tin nhắn; human analysis bổ trợ |
| **NeuroCheck** (neurocheck.space) | 7 check-in ngắn/ngày | **HMM + Kalman filter + Bayesian updating + Viterbi** → chỉ số lo âu, dự báo trạng thái ngày mai | Chỉ số rủi ro phần trăm; dashboard | Mô hình toán học xác nhận bằng pilot 15 HS; chú trọng giảm quá tải cho nhà tâm lý học đường |
| **Goodin Class** (goodinclass.com) | Mood check-in 30 giây (emoji scale) | AI (Claude) phân tích chuỗi mood → trend → nâng cấp | Hệ thống 4 tầng (tier-based alert); dashboard counselor | Đơn giản, chi phí thấp; tích hợp MTSS |
| **Menthra Compass** (menthra.ai/education) | Hội thoại 24/7 với AI companion (KHÔNG ép buộc) | Phát hiện khủng hoảng gần như real-time | Phân cấp "Elevated Concern" / "Imminent Danger"; thông báo tới counselor + admin + parents + mandatory reporters | Duy trì AI bên cạnh HS đến khi con người xác nhận; SLA: human review trong 10 phút giờ hành chính |
| **CalmSpace EDU** (calmspace.ai/schools) | Mood check-in, gratitude reflection, voice companion "Bliss" | **Safety classifier độc lập** chạy song song; gắn nhãn độ nặng | Severity: Normal → Watch → Concern → Urgent → Critical; Urgent/Critical → SMS/email + vòng gửi lại tới khi xác nhận | "B-I-D" không thay counselor; N≥5 để chống tái nhận dạng; parent consent flow |
| **Lumii** (lumii.me) | "Tiếng nói học sinh" hàng ngày (chat tự do trên LMS chat) + quan sát nhân viên + hành vi | Large Mental Health Model (LMHM) đọc ngữ cảnh; mọi flag đều kèm lý do | Green (giữ nguyên) → Amber (moderator) → Purple/Red (alert tức thì); **mọi flag được con người rà** | Kiến trúc "walled garden", ẩn danh; UAE PDPL; đối trọng với các AI companion tiêu dùng không an toàn |
| **brightn** (brightn.app/for-schools) | Journaling AI + sentiment analysis hằng ngày | Flag sớm trước khi leo thang; sentiment theo thời gian thực | Real-time mood dashboard; định vị cohort cần hỗ trợ | Gắn vào **MTSS Tier 1-2**; pilot báo -30% discipline referrals, +60% wellness 30 ngày |
| **Wysa C&YP** (wysa.com/children-and-young-people) | Check-in sáng/tối + hội thoại 24/7 | Risk pathway tùy biến → signposting cục bộ | Tự dẫn tới dịch vụ địa phương khi nhu cầu cao | Đạt chuẩn lâm sàng NHS DCB 0129; 150+ tool-pack; đo routine outcomes ẩn danh cho commissioners |

### 2.2 Các mẫu hình (patterns) rút ra cho trục A

1. **Baseline cá nhân, không phải chuẩn peer** (Rhythm): học sinh chậm tự nhiên không bị cờ; học sinh nhanh tự nhiên bỗng chậm lại → bị cờ. Đây là nguyên tắc công bằng và ít sai lệch nhất.
2. **Tín hiệu hành vi thụ động thay vì self-report** (Rhythm, Lumii, brightn): học sinh (đặc biệt tuổi dậy thì 11-14) **hệ thống báo thấp mức distress** trên khảo sát. Đo từ hành vi (phản xạ, độ ổn định, từ bỏ) bắt được sớm hơn 3-4 tuần.
3. **"Không tham gia" là một tín hiệu** (Rhythm, CalmSpace): bỏ check-in, streak ngắt, không hoàn thành task → chính là học sinh cần được hỏi thăm nhất. EduChoice-AI hiện có sẵn dữ liệu này (`abandoned`, streak, sessionsCompleted).
4. **Check-in vi mô, ngắn (30-90 giây) mỗi ngày** thay cho khảo sát dài (Goodin, Rhythm, CalmSpace): giữ tỉ lệ tham gia cao; Emotion Recognition ngắn.
5. **Cờ theo nấc màu + danh sách ưu tiên** (Rhythm, Compass, CalmSpace, Goodin) thay vì 1 ngưỡng: mọi platform đều dùng traffic-light (xanh/vàng/đỏ) hoặc 4-5 mức severity. Không platform nào hiển thị điểm số thô cho học sinh.
6. **Vòng hồi phục (recovery) được theo dõi riêng** (Rhythm): HS đã được flag rồi trở lại baseline được liệt kê riêng → counselor đóng vòng lặp hỗ trợ.
7. **Thuật toán chuỗi thời gian phổ biến**: HMM/Bayesian/Kalman (NeuroCheck), sentiment trend (Goodin/brightn), baseline deviation (Rhythm) — phù hợp triển khai bằng luồng deterministic (rule-based) trên telemetry sẵn có, không cần AI mạnh.

---

## 3. TRỤC B — Đo lường hiệu quả can thiệp (Intervention → Response → Retry → Behavior Change)

### 3.1 Khung khoa học: JITAI + Micro-Randomized Trial (MRT)

- **Just-in-Time Adaptive Interventions (JITAI)** là thiết kế chuẩn cho can thiệp số thích ứng thời gian thực: đúng thành phần, đúng người, đúng thời điểm. Ứng dụng mạnh trong giáo dục (Breitwieser et al., 2023 — "Realizing the potential of mobile interventions for education", DOI 10.31234/osf.io/sy3b9).
- **MRT** (Klasnja et al., 2015, PMC4732571; Walton et al., 2020) là thiết kế để **tối ưu từng thành phần can thiệp trong JITAI**: tại mỗi decision-point, ngẫu nhiên hóa trong-cá-thể (intra-individual) giữa "có/không" hoặc giữa các biến thể → nhận định **tác động nhân quả của từng thành phần** và **yếu tố điều tiết theo thời gian/ngữ cảnh**.
- **Các khái niệm khóa:** *decision point* (điểm quyết định), *proximal outcome* (kết quả gần — đo ngay sau can thiệp, cửa sổ thời gian cụ thể), *distal outcome* (kết quả xa — mục tiêu dài hạn), *availability condition* (ngữ cảnh KHÔNG được can thiệp, tránh phiền nhiễu), *burden/habituation* (gánh nặng và nhờn do liều cao), *time-varying moderation*.

### 3.2 Các case study minh họa

| Nghiên cứu | Can thiệp | Proximal outcome | Kết luận mẫu |
|---|---|---|---|
| **HeartSteps** (MRT) | Gợi ý vận động theo ngữ cảnh vs không gợi ý; hỗ trợ lập kế hoạch | Số bước trong **30 phút** sau gợi ý; số bước **ngày hôm sau** cho thành phần planning | Hiệu quả phụ thuộc cửa sổ đo: đo quá sớm/quá muộn đều mất tín hiệu |
| **BariFit** (MRT) | Reminder track food (x/f), activity suggestions | Vào app ghi food ngay sau | Randomization probability thấp (.15) để giữ gánh nặng ~1.5 lần/ngày, tránh nhờn |
| **SARA** (MRT) | Reciprocity notification 4pm | Hoàn thành survey trong ngày/ngày sau | Decision point gắn với sinh hoạt thực tế của học sinh |
| **PROMPT** (giáo dục, Breitwieser) | Nhắc distributed practice + củng cố kế hoạch học | Học vocab trong ngày có nhắc vs không nhắc | **Có tác động nhân quả**: ngày có nhắc, tỉ lệ học tăng |
| **UPWIND / Kramer et al. 2022** (trẻ 9-13, N=171, MRT) | Thở cơ hoành chậm 3 phút (video) vs xem video giáo dục vs không | Negative affect / relaxation | **Không có main effect** nhưng có **điều tiết**: thở giúp thư giãn đúng vào ngày HS lo nhiều hơn mức thường → ủng hộ "can thiệp đúng thời điểm" |
| **Woebot GenZD** (NCT05372913) | Chatbot CBT-guided 8 tuần vs CBT-group telehealth (trẻ 13-17 có chẩn đoán) | PHQ-8, GAD-7 tại tuần 4; working alliance | Đo BL/Day5/W2/W4/EOT/W8; tiêu chí loại trừ an toàn chặt (suicidal ideation gần, psychosis...) |

### 3.3 JITA-EMA — Giảm gánh nặng đo lường

- **Just-in-Time Adaptive EMA** (JITA-EMA, Springer 2023, DOI 10.3758/s13428-023-02083-8): áp dụng computerized adaptive testing để chỉ hỏi đúng số câu tối thiểu đủ phân loại trạng thái tức thì của cá nhân → **giảm 54% (nghiên cứu 1) và 40% (nghiên cứu 2) số item** so với EMA cố định 5 câu, đồng thời độ chính xác phân loại tốt hơn (sensitivity 80%, specificity 90%, kappa 0.70).
- Hàm ý: nếu EduChoice-AI thêm check-in cảm xúc, nên dùng **câu hỏi thích ứng tối thiểu** thay vì phiếu cố định 5-10 câu → giữ tỉ lệ tham gia.

### 3.4 Hàm ý trực tiếp cho EduChoice-AI

EduChoice-AI **đã có sẵn toàn bộ "proximal outcome"** chỉ cần gắn định nghĩa + cửa sổ thời gian + so sánh trước/sau can thiệp:

| Thành phần can thiệp hiện có | Cửa sổ đo (proximal) | Kết quả gần tiềm năng | Kết quả xa |
|---|---|---|---|
| Scene `intervention` + `toolkitHint` tại điểm bối rối | Ngay trong phiên (sau scene can thiệp) | Retry sau can thiệp?; đổi lựa chọn ít bốc đồng hơn (`choice_changed`); `decisionTimeMs` giảm đột biến | Construct score; transfer |
| Prompt "thử lại" (`interventionPrompt`) | 2 lựa chọn tiếp theo trong phiên | `retry` xảy ra?; outcome sau retry | Persistence, SelfRegulation |
| Reflection | Sau reflection, phiên kế tiếp | `reflection_submitted`; độ tích cực text; construct delta ở phiên sau | Reflection skill |
| Micro-action đời thực 5 phút | 24 giờ | `micro_action_completed`; self-report hoàn thành | Transfer gap, real-world success rate |
| Goal engine | Hàng tuần | `current` tiến về `target` | Goal attainment |

- Nên đổi từ "AI quyết định" sang **"AI đề xuất trong allow-list + vòng MRT để đo thành phần nào hiệu quả, cho ai, khi nào"** (đúng nguyên tắc Rule Engine đã nêu trong audit report §40).
- Chống nhờn (habituation)/burden: giới hạn số lần can thiệp mỗi học sinh/tuần (dose cap), chỉ can thiệp tại availability condition có ý nghĩa.

---

## 4. TRỤC C — Luồng tăng cấp con người & An toàn vị thành niên

### 4.1 Bảng so sánh mô hình leo thang

| Nền tảng | Bậc thang cảnh báo | Người nhận & SLA | Ai là người hành động cuối |
|---|---|---|---|
| **Woebot** (woebothealth.com/safety; IFU 2024) | NLP flag "concerning language" → xác nhận với user → offer danh sách emergency resources; KO phải crisis service | KHÔNG có người rà real-time; transcript xem lại sau; disclaimers tường minh | Không có con người; resources + 988/911 |
| **Trong nghiên cứu GenZD** (NCT05372913) | Safety Net Protocol: NLP phát hiện → user xác nhận → **alert tới on-call clinician 24/7** → clinician gọi điện đánh giá safety + triage + ghi log | On-call clinician, 24/7 | Licensed clinician nhúng trong hệ (CHKD) |
| **Menthra Compass** | *Elevated Concern* → counselor (default 1st line); *Imminent Danger* → counselor + admin + parents + mandatory reporters | Human review ≤10 phút giờ hành chính; on-call qua đêm; AI ở lại với HS tới khi con người xác nhận | Counselor / mandatory reporter theo luật |
| **CalmSpace EDU** | Severity 5 mức; Urgent/Critical → SMS+email counselor, **vòng gửi lại tới khi ack** | Trường chịu trách nhiệm emergency; "I need help" nút học sinh chủ động | Counselor (platform không cấp emergency service) |
| **Lumii** | Green/Amber/Purple/Red; mọi amber+ do DSL/wellbeing team rà | Setup 1 giờ; walled-garden; ẩn danh | School wellbeing/safeguarding team |
| **Wysa C&YP** | Risk pathway tùy biến → signposting tới dịch vụ địa phương; check-in sáng/tối | DCB 0129 (chuẩn an toàn lâm sàng NHS); ko xử lý khủng hoảng | Dịch vụ địa phương |

### 4.2 Các bài học an toàn từ thất bại và đánh giá độc lập

- **BBC 2018 (bbc.com/news/technology-46507900):** Wysa và Woebot đều **không nhận ra tường thuật lạm dụng tình dục trẻ em**, không dẫn tới trợ giúp khẩn cấp → buộc phát hiện và cờ các vi phạm pháp luật/bảo vệ trẻ em, không chỉ self-harm. Điểm CEO Woebot: *"conversational AI is not capable of adequately detecting crisis situations among children"* — câu hỏi con người rà vẫn bắt buộc.
- **JAMA Network Open 2025 (DOI 10.1001/jamanetworkopen.2025.39022):** red-teaming 25 chatbot tiêu dùng với kịch bản tự tử/lạm dụng/ma túy của vị thành niên → trung bình chỉ **60% chatbot nhận ra cần leo thang**, **36% cung cấp giới thiệu resource**, **46.7% phản hồi phù hợp lâm sàng**; chatbot "general-assistant" tốt hơn "companion". Kết luận: KHÔNG nên để AI companion tiêu dùng đứng giữa HS và hỗ trợ.
- **Quy định:** UAE MoE (2026) hạn chế gen-AI dưới 13 tuổi và cấm đưa dữ liệu học sinh ra AI ngoài (lumii.me/citing; chuẩn đã được trích trong kết quả tìm). UK KCSIE 2025 lần đầu đề cập AI trong nghĩa vụ bảo vệ trẻ em.

### 4.3 Khung pháp lý Việt Nam (mới nhất, quan trọng cho sản phẩm tiếng Việt)

- **Thông tư 18/2025/TT-BGDĐT** (hiệu lực 31/10/2025, thay TT 31/2017 và TT 33/2018): hướng dẫn công tác tư vấn tâm lý và công tác xã hội trong trường học. Quy định:
  - Quy trình 3 bậc: **phòng ngừa → sàng lọc & phát hiện sớm → tư vấn → tham chiếu khi cần** (Điều 7).
  - Bắt buộc xây dựng **Kế hoạch** (Mẫu 01), **Biên bản bàn giao/Phiếu tham chiếu** (Mẫu 03) khi chuyển tới cơ sở chuyên môn; phối hợp gia đình theo dõi duy trì kết quả.
  - Kênh trực tuyến (website, email, mạng xã hội, nội mạng) được công nhận là hình thức tư vấn.
  - Đường dây hotline quốc gia: **111 (Tổng đài quốc gia bảo vệ trẻ em).**
  - Yêu cầu nhân sự: mỗi trường phổ thông 01 vị trí cán bộ tư vấn học đường (toàn thời gian; nếu không thể thì giao kiêm nhiệm theo TT 20/2023).
- **Quan điểm chuyên môn (PGS.TS Trần Thanh Nam — ĐH Giáo dục, ĐHQG Hà Nội; vietnam.vn 2026-08):**
  - Không kỳ vọng mọi trường có nhà tâm lý chuyên trách; cần **mạng lưới hỗ trợ nhiều tầng**: (1) giáo viên chủ nhiệm được huấn luyện tối thiểu (nhận diện thay đổi cảm xúc/hành vi, biết chuyển tầng), (2) tổ tư vấn nhà trường, (3) mạng lưới bệnh viện/chuyên gia/dịch vụ bảo vệ trẻ em.
  - **Không chờ HS tự tìm đến**; mở nhiều kênh (đặt lịch online, kênh giao tiếp an toàn). **AI/tech chỉ là kênh tiếp cận, không thay con người.**
  - Sàng lọc bằng công cụ chuẩn hóa + quan sát GV + thông tin gia đình + khả năng tự tìm trợ giúp; **bảng hỏi sàng lọc không phải công cụ chẩn đoán**; tránh tạo danh sách "HS có nguy cơ" mà không có năng lực giúp đỡ.
  - "Trường học hạnh phúc", cảm giác **thuộc về (belonging)** là biện pháp phòng ngừa: gắn kết cao → tâm lý tốt hơn, ít ý nghĩ tự tử.
  - Hiệu quả không đo bằng số lượt vào phòng tư vấn mà bằng: HS cảm thấy được lắng nghe, biết cách tìm kiếm giúp đỡ, trường phát hiện sớm.

---

## 5. Khung năng lực SEL (CASEL) — Bản đồ hóa với 20 construct của EduChoice-AI

- **CASEL 5** (casel.org/fundamentals-of-sel): *Self-awareness, Self-management, Social awareness, Relationship skills, Responsible decision-making*. Được ít nhất 90 nghiên cứu/meta phân tích (47 chương trình, ~20.000 HS K-12 Mỹ 2008-2020) cho thấy: cải thiện học tập, hành vi, kỹ năng xã hội-cảm xúc, khí hậu trường, an toàn; **hiệu quả mạnh nhất khi giáo viên là người triển khai**; hiệu quả ngang nhau nam/nữ.
- **Nguyên tắc SAFE** của chương trình SEL hiệu quả: **S**equenced (trình tự từng bước), **A**ctive (học chủ động/thực hành), **F**ocused (tập trung đúng năng lực), **E**xplicit (mục tiêu rõ ràng). —— EduChoice-AI đã đáp ứng tốt Sequencing/Active trong game; cần thêm Focused/Explicit cho từng construct (hiện `objectives` còn mô tả tự do).
- **Hệ thống phân tầng MTSS** (universal → targeted → intensive) tương ứng trực tiếp với mô hình `MinimumEffectiveIntervention` L0→L6 sẵn có.
- **Cảnh báo từ meta**: hiệu quả SEL **theo dõi quá 6 tháng sau khi kết thúc chương trình thường không còn** → cần thiết kế **tính bền vững/dose** (uống nhắc nhở), đúng với khái niệm "chống habituation" ở trục B.

### Bản đồ CASEL 5 ↔ 20 Construct EduChoice-AI (gợi ý)

| CASEL | Constructs EduChoice-AI tương ứng |
|---|---|
| Self-awareness | Reflection, SelfRegulation |
| Self-management | AttentionControl, DistractionRecovery, TimeManagement, Persistence, HealthyRoutine, Balance, SelfRegulation |
| Social awareness | Empathy, Autonomy |
| Relationship skills | Communication, Cooperation, HelpSeeking |
| Responsible decision-making | Planning, Prioritization, ProblemSolving, ConsequencePrediction, Responsibility, GoalSetting |

→ Gợi ý: nhãn construct hiện tại có thể tổ chức lại theo 5 cụm CASEL để kể chuyện tiến bộ rõ ràng hơn với nhà trường/giáo viên (báo cáo "năng lực tự chủ / quan hệ / ra quyết định...").

---

## 6. Ma trận khoảng cách (Gap Analysis) — EduChoice-AI vs Benchmark

| # | Khoảng cách | Bằng chứng trong repo | Giải pháp trên thị trường | Mức độ đề xuất |
|---|---|---|---|---|
| G1 | Không có chỉ số wellness tổng hợp & cảnh báo tầng | Không có dashboard stress; `adaptiveDecision.safety` chỉ đơn giản | Rhythm (baseline cá nhân), Goodin/CalmSpace (traffic-light), NeuroCheck (HMM/Bayes) | **P1 — xây WellnessIndex từ telemetry sẵn có** |
| G2 | Reflection/mood không được phân tích | `reflectionText` lưu thô | brightn/Lumii (sentiment AI), CalmSpace (mood check-in) | P2 — sentiment classification + từ khóa an toàn |
| G3 | Không đo vòng intervention → response → retry | Sheet 10/11/30 chỉ ở schema; không event `intervention_*` (MED-009) | JITAI/MRT (proximal outcome, cửa sổ đo), Wysa (routime outcome measures) | **P1 — định nghĩa proximal outcomes + ghi event** |
| G4 | Không có dose cap / chống nhờn | Fallback luôn chọn game đầu, không xét repetition/burden (audit §21) | MRT randomization probabilities, availability condition | P2 — dose cap + repetition check trong adaptive |
| G5 | Không có luồng leo thang con người | L6_HUMAN_SUPPORT chưa wire; không UI counselor thật (MED-007) | Menthra/CalmSpace (severity + SLA + ack loop), Lumii (human review mọi flag), Woebot GenZD (SNP) | **P1 — protoc leo thang + vai counselor theo TT 18/2025** |
| G6 | Không có referral/consent/screening đúng luật | `02_CONSENTS` ghi nhưng không gate (MED-006) | TT 18/2025 (Mẫu 01/03, hotline 111), Wysa DCB0129 | P1 — consent gate + referral form + hotline 111 |
| G7 | Claims nghiên cứu không dựa trên số thật | Audit CRIT-004 | MRT/EMA → dữ liệu thật; các platform đo outcome thật | P0/P1 — chỉ hiển thị số liệu từ pipeline thật |
| G8 | Nội dung SEL chưa gắn khung chuẩn | 20 construct tự đặt tên | CASEL 5, SAFE, ESSA tiers | P3 — tổ chức lại theo cụm CASEL, thêm Explicit objectives |

---

## 7. Đề xuất lộ trình áp dụng (theo đúng nguyên tắc Audit → Báo cáo → Phê duyệt → mới code)

**Giai đoạn A — Nội dung + Rule-based, không cần hạ tầng mới (P1):**
1. **WellnessIndex + traffic-light cá nhân** cho mỗi học sinh từ telemetry SẴN CÓ: trọng số cho `abandoned` streak, `help_requested` tăng đột biến, `retry` tụt, sessionsCompleted tụt, reflection có cảm xúc tiêu cực, micro-action không hoàn thành, streak break. So với **baseline cá nhân** (chạy 10 phiên đầu), không so với peer (theo Rhythm).
2. Thêm event telemetry `intervention_presented`, `intervention_accepted`, `intervention_completed`, `post_intervention_retry`, `post_intervention_outcome` (đóng G3, MED-009).
3. Adding nút **"Em cần trợ giúp"** (help request) trong game → cờ vàng, đúng mẫu CalmSpace "I need help".

**Giai đoạn B — Vòng đo hiệu quả (P1):**
4. Định nghĩa bảng **proximal outcome ↔ cửa sổ đo** (mục 3.4) và pipeline tính trên dữ liệu thật.
5. Dose cap + repetition/burden check trong adaptive engine (đóng G4).
6. (Tùy chọn, khi đủ dữ liệu) triển khai **micro-randomized trial** nhỏ: so sánh 2 kiểu gợi ý can thiệp trên cùng học sinh giữa các phiên → xác định thành phần thật sự hiệu quả (đúng khung HeartSteps/UPWIND).

**Giai đoạn C — Luồng con người + tuân thủ pháp lý (P1):**
7. Xây **protoc leo thang 5 mức** (Normal → Watch → Concern → Urgent → Critical) mapping L0→L6 của `MinimumEffectiveIntervention`; Urgent/Critical → thông báo tới cán bộ tư vấn/giáo viên chủ nhiệm + **vòng gửi lại tới khi xác nhận** (theo đúng CalmSpace + TT 18/2025).
8. Thêm **tham chiếu (referral)**: mẫu bàn giao, hotline **111**, danh bạ local; **consent gate** thật cho telemetry (đóng G6, G5).
9. Disclaimers bắt buộc: "Không phải dịch vụ khủng hoảng", "AI không thay counselor", "AI chỉ là kênh tiếp cận" — theo bài học Woebot/JAMA/BBC (mục 4.2).

**Giai đoạn D — Trình bày khung chuẩn (P3):**
10. Tổ chức lại 20 construct theo 5 cụm CASEL; chuẩn hóa `objectives` theo SAFE; xóa dữ liệu nghiên cứu giả hoặc gắn nhãn DEMO (đóng G7, G8).

---

## 8. Rủi ro & nguyên tắc bắt buộc

1. **Không biến game thành công cụ chẩn đoán.** Mọi cờ đều là "tín hiệu để trò chuyện", không phải kết luận lâm sàng (đúng Rhythm, Lumii, bác sĩ Việt Nam).
2. **Thu thập tối thiểu, đúng luật:** PII tối giản, consent có gate, tuân thủ TT 18/2025 + 111; không đưa dữ liệu HS vào AI ngoài (bài học UAE).
3. **AI không đứng một mình trước học sinh** ở bậc cao; luôn có vòng con người rà (lesson từ JAMA 2025, BBC 2018).
4. **Chống lại việc "tầng 1 (universal) tự động cứu"**: meta-analysis chỉ ra chương trình SEL phổ quát giúp hiểu biết sức khỏe tâm thần nhưng **tác động trực tiếp lên trầm cảm/lo âu thường nhỏ và không bền** (đúng cảnh báo PGS Trần Thanh Nam) → phải đi kèm phát hiện sớm + năng lực tham chiếu.
5. **Hiệu quả đo bằng: HS được lắng nghe / biết cách nhờ giúp đỡ / trường phát hiện sớm** — không phải số lượt vào phòng tư vấn (tiêu chí đánh giá của TT 18/2025).

---

## 9. Nguồn tham khảo chính

- Rhythm Mental Health — https://rhythmmentalhealth.com/
- Securly Aware — https://www.securly.com/aware
- NeuroCheck — https://neurocheck.space/
- Goodin Class — https://goodinclass.com/
- Menthra for Education — https://www.menthra.ai/education/
- CalmSpace EDU — https://calmspace.ai/schools/
- Lumii — https://lumii.me/
- brightn for Schools — https://www.brightn.app/for-schools
- Wysa Children & Young People — https://www.wysa.com/children-and-young-people
- Woebot Health (Safety, IFU docs 2024) — https://woebothealth.com/safety/
- Nghiên cứu Woebot GenZD (SNP) — https://cdn.clinicaltrials.gov/large-docs/13/NCT05372913/Prot_SAP_000.pdf
- JAMA Network Open 2025 — DOI 10.1001/jamanetworkopen.2025.39022
- BBC (2018), "Child advice chatbots fail to spot sexual abuse" — https://www.bbc.com/news/technology-46507900
- Klasnja et al., "Micro-randomized trials" (PMC) — https://pmc.ncbi.nlm.nih.gov/articles/PMC4732571/
- Walton et al., "The Micro-Randomized Trial..." — https://doi.org/10.48550/arxiv.2005.05880
- Breitwieser et al., "Mobile interventions for education" — DOI 10.31234/osf.io/sy3b9
- Kramer et al., UPWIND breathing MRT (trẻ 9-13) — trích trong Breitwieser et al. (DOI 10.31234/osf.io/sy3b9)
- JITA-EMA (Springer) — DOI 10.3758/s13428-023-02083-8
- CASEL Framework — https://casel.org/fundamentals-of-sel/what-is-the-casel-framework/
- CASEL Program Guide & evidence — https://casel.org/11_casel-program-criteria-rationale/?view=true ; https://casel.org/does-sel-work/
- Meta-analysis SEL (90 studies, ScienceDirect) — https://www.sciencedirect.com/science/article/pii/S2773233924000032
- Thông tư 18/2025/TT-BGDĐT — https://english.luatvietnam.vn/circular-no-18-2025-tt-bgddt-dated-september-15-2025-of-the-ministry-of-education-and-training-providing-guidance-on-school-counseling-and-social-wo-411445-doc1.html
- PGS Trần Thanh Nam về tư vấn tâm lý học đường (2026) — https://www.vietnam.vn/en/tu-van-tam-ly-hoc-duong-chuyen-tu-chua-chay-sang-phong-ngua-phat-hien-som