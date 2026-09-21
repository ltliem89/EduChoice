# UNIVERSAL EDUCATIONAL GAME OS SPEC V1.0

> **Mục đích:** Đây là đặc tả kiến trúc gốc cho một nền tảng game hóa giáo dục đa môn, chạy ổn định trên Vercel, có giao diện tương lai, kho tri thức lớn và có khả năng cập nhật nội dung/cấu hình mà không phải xây lại toàn bộ game.
>
> **Nguyên tắc:** Xây một **Educational Game OS**, không xây từng game như một ứng dụng độc lập.

---

# 1. TẦM NHÌN HỆ THỐNG

Hệ thống phải biến nội dung giáo dục thành trải nghiệm game hóa:

```text
KIẾN THỨC
   ↓
KNOWLEDGE GRAPH
   ↓
GAME BLUEPRINT
   ↓
WORLD / QUEST / CHALLENGE
   ↓
INTERACTION
   ↓
XP / LEVEL / SKILL / REWARD
   ↓
PROGRESSION
   ↓
NEW CONTENT
```

Nền tảng phải hỗ trợ:

- Khoa học tự nhiên
- Sinh học
- Vật lý
- Hóa học
- Toán
- STEM
- Công nghệ
- Địa lý
- Các môn học khác
- Mô phỏng 2D
- Mô phỏng 3D
- Mini-game
- Puzzle
- Exploration
- Simulation
- Quest
- Boss Challenge
- Collaborative activities

---

# 2. NGUYÊN TẮC KIẾN TRÚC BẮT BUỘC

## 2.1. Tách Engine khỏi Content

Không được hard-code kiến thức vào game engine.

```text
ENGINE
   ≠
CONTENT
```

Engine xử lý:

- Rendering
- Physics
- Interaction
- Quest
- Progression
- Reward
- Achievement
- Event
- Save state

Content xử lý:

- Concept
- Facts
- Questions
- Missions
- Quests
- Explanations
- Assets
- Learning objectives

---

## 2.2. Tách Game khỏi Game Blueprint

Game không được chứa toàn bộ cấu hình riêng biệt.

```text
GAME ENGINE
      ↑
GAME BLUEPRINT
      ↑
KNOWLEDGE / CONTENT
```

Một blueprint có thể tạo nhiều game.

---

## 2.3. Tách UI khỏi Gameplay

UI không được phụ thuộc trực tiếp vào một môn học.

```text
FUTURE UI
    ↓
GAME SHELL
    ↓
GAME ENGINE
```

Nhờ đó có thể thay:

- Biology theme
- Space theme
- Cyberpunk theme
- Laboratory theme
- Ancient theme
- Nature theme

mà không thay engine.

---

## 2.4. AI không được tự ý sửa Core Engine

AI phải hoạt động theo pipeline:

```text
USER REQUEST
     ↓
AI ANALYSIS
     ↓
GAME BLUEPRINT
     ↓
SCHEMA VALIDATION
     ↓
CONTENT VALIDATION
     ↓
PREVIEW
     ↓
PUBLISH
```

AI chỉ được sửa Core Engine khi có yêu cầu phát triển hệ thống và phải tạo change set rõ ràng.

---

# 3. TECHNOLOGY STACK

## 3.1. Application

- Next.js
- React
- TypeScript

## 3.2. Styling

- Tailwind CSS
- CSS Variables
- Design Tokens
- Responsive Layout

## 3.3. Game

### 2D Game

Ưu tiên:

- Phaser

### Interactive 2D / Visual Effects

Có thể dùng:

- PixiJS

### 3D

Ưu tiên:

- Three.js
- React Three Fiber

### Quy tắc

Không dùng engine 3D cho một mini-game 2D đơn giản nếu không cần thiết.

---

# 4. DEPLOYMENT

Production:

```text
GitHub
   ↓
Vercel
   ↓
Production
```

Development:

```text
Local
   ↓
Git Branch
   ↓
Pull Request
   ↓
Vercel Preview
   ↓
Review
   ↓
Merge
   ↓
Production
```

Mỗi thay đổi quan trọng phải có khả năng kiểm thử trên Preview trước khi Production.

---

# 5. REPOSITORY STRUCTURE

```text
educational-game-os/
│
├── app/
│   ├── page.tsx
│   ├── play/
│   ├── world/
│   ├── quest/
│   ├── profile/
│   ├── leaderboard/
│   └── admin/
│
├── engine/
│   ├── core/
│   ├── game/
│   ├── quest/
│   ├── progression/
│   ├── reward/
│   ├── achievement/
│   ├── event/
│   └── save/
│
├── games/
│   ├── biology/
│   ├── physics/
│   ├── chemistry/
│   ├── mathematics/
│   └── stem/
│
├── knowledge/
│   ├── khtn6/
│   ├── khtn7/
│   ├── khtn8/
│   ├── khtn9/
│   ├── physics/
│   ├── chemistry/
│   ├── biology/
│   └── mathematics/
│
├── content/
│   ├── worlds/
│   ├── quests/
│   ├── missions/
│   ├── questions/
│   ├── rewards/
│   ├── achievements/
│   └── events/
│
├── simulation/
│   ├── 2d/
│   ├── 3d/
│   ├── physics/
│   ├── biology/
│   └── experiments/
│
├── components/
│   ├── futuristic-ui/
│   ├── hud/
│   ├── cards/
│   ├── dialogs/
│   ├── menus/
│   ├── progress/
│   └── effects/
│
├── themes/
│   ├── future/
│   ├── science/
│   ├── space/
│   ├── laboratory/
│   └── nature/
│
├── ai/
│   ├── analyzer/
│   ├── generator/
│   ├── validator/
│   ├── repair/
│   └── publisher/
│
├── schemas/
│
├── database/
│
├── assets/
│
├── config/
│
├── tests/
│
└── docs/
    ├── GAME_OS_SPEC.md
    ├── KNOWLEDGE_SPEC.md
    ├── GAME_BLUEPRINT_SPEC.md
    ├── QUEST_SPEC.md
    ├── UI_DESIGN_SYSTEM.md
    └── AI_CONTENT_PROTOCOL.md
```

---

# 6. GAME OS CORE

Game OS phải cung cấp các hệ thống dùng chung.

## 6.1. Game State

```text
GameState
├── player
├── world
├── quest
├── inventory
├── skills
├── progression
├── achievements
├── settings
└── session
```

## 6.2. Event System

Mọi hành động quan trọng phải tạo event.

Ví dụ:

```text
PLAYER_LOGIN
WORLD_ENTER
QUEST_START
QUESTION_ANSWER
OBJECT_INTERACT
MISSION_COMPLETE
XP_GAIN
LEVEL_UP
ITEM_UNLOCK
ACHIEVEMENT_UNLOCK
WORLD_UNLOCK
```

Event-driven architecture giúp các module không phụ thuộc cứng vào nhau.

---

# 7. GAMEPLAY ENGINE

Game engine phải hỗ trợ các interaction primitive:

```text
CLICK
DRAG
DROP
MOVE
ROTATE
ZOOM
SELECT
MATCH
SORT
BUILD
COLLECT
EXPLORE
DIALOG
ANSWER
SIMULATE
EXPERIMENT
COMBINE
DISCOVER
```

Một game mới ưu tiên kết hợp các primitive này thay vì viết lại engine.

---

# 8. KNOWLEDGE ENGINE

Kho tri thức là thành phần trung tâm.

Mỗi concept nên có:

```text
Concept
├── id
├── title
├── subject
├── grade
├── topic
├── definition
├── facts
├── examples
├── misconceptions
├── prerequisites
├── relatedConcepts
├── learningObjectives
└── sourceReferences
```

Ví dụ:

```json
{
  "id": "bio-cell-nucleus",
  "title": "Nhân tế bào",
  "subject": "Sinh học",
  "grade": 6,
  "definition": "...",
  "facts": [],
  "examples": [],
  "misconceptions": [],
  "prerequisites": [],
  "relatedConcepts": []
}
```

---

# 9. KNOWLEDGE GRAPH

Không chỉ lưu nội dung dạng danh sách.

Phải có quan hệ:

```text
CONCEPT A
   ↓ prerequisite
CONCEPT B
   ↓ related
CONCEPT C
   ↓ application
CONCEPT D
```

Ví dụ:

```text
Tế bào
  ↓
Nhân tế bào
  ↓
DNA
  ↓
Di truyền
```

Điều này cho phép hệ thống tự đề xuất:

- Bài học tiếp theo
- Quest tiếp theo
- Nội dung cần ôn
- Concept còn thiếu
- Challenge phù hợp

---

# 10. GAME BLUEPRINT

Mỗi game phải được mô tả bằng blueprint.

```yaml
game:
  id:
  title:
  subject:
  grade:
  theme:
  mode:

learning:
  objectives:
  concepts:
  prerequisites:

world:
  type:
  scenes:
  zones:

gameplay:
  mechanics:
  interactions:
  challenges:

progression:
  xp:
  levels:
  skills:
  unlocks:

rewards:
  coins:
  items:
  badges:

assessment:
  questions:
  scoring:
  mastery:

assets:
  images:
  models:
  audio:
  effects:
```

Blueprint phải có version.

```text
blueprintVersion: 1.0.0
```

---

# 11. QUEST ENGINE

Quest là đơn vị gameplay chính.

```yaml
quest:
  id: bio-cell-001
  title: "Khôi phục trung tâm điều khiển"
  objective: "Xác định nhân tế bào"

  steps:
    - explore
    - identify
    - answer
    - activate

  reward:
    xp: 100
    coins: 20

  unlock:
    - bio-cell-002
```

Quest phải hỗ trợ:

- Main Quest
- Side Quest
- Daily Quest
- Challenge
- Boss Quest
- Discovery Quest
- Experiment Quest

---

# 12. PROGRESSION ENGINE

Phải có:

```text
XP
LEVEL
RANK
SKILL
SKILL TREE
MASTERY
UNLOCK
STREAK
```

Ví dụ:

```text
Level 1
 ↓
Level 2
 ↓
Level 3
 ↓
Skill Unlock
 ↓
New World
 ↓
Boss
```

Không được chỉ dùng điểm số.

---

# 13. REWARD ENGINE

Reward phải đa dạng:

```text
XP
COIN
CRYSTAL
BADGE
ITEM
AVATAR
THEME
TITLE
SKILL
WORLD ACCESS
```

Reward không nên làm biến dạng mục tiêu học tập.

---

# 14. ACHIEVEMENT ENGINE

Ví dụ:

```text
FIRST_DISCOVERY
PERFECT_SCORE
FAST_SOLVER
EXPLORER
SCIENTIST
PROBLEM_SOLVER
MASTER_OF_TOPIC
```

Achievement phải được định nghĩa bằng rule.

```json
{
  "id": "perfect-score",
  "condition": {
    "type": "score",
    "operator": "equals",
    "value": 100
  }
}
```

---

# 15. FUTURE UI DESIGN SYSTEM

Giao diện mặc định:

- Dark-first
- Glassmorphism
- Holographic cards
- Soft glow
- Particle effects
- Dynamic gradients
- Rounded panels
- Layered depth
- Animated transitions
- Responsive HUD

## UI Components

```text
GameHUD
XPBar
LevelBadge
QuestPanel
MissionCard
SkillTree
Inventory
WorldMap
AchievementPanel
Leaderboard
Dialog
HintPanel
ProgressRing
Notification
RewardAnimation
```

## Không lạm dụng hiệu ứng

Hiệu ứng phải phục vụ:

- Feedback
- Navigation
- Hierarchy
- Reward
- Discovery

Không làm giảm khả năng đọc.

---

# 16. GAME SHELL

Game Shell là lớp giao diện chung.

```text
GAME SHELL
├── Header
├── HUD
├── World View
├── Quest Panel
├── Interaction Layer
├── Notification Layer
├── Reward Layer
└── Navigation
```

Mỗi game chỉ cung cấp:

```text
World
Rules
Content
Assets
Quest
```

---

# 17. SIMULATION ENGINE

Simulation phải hỗ trợ:

```text
2D
3D
PHYSICS
BIOLOGY
CHEMISTRY
MATHEMATICS
STEM
```

Simulation phải tách:

```text
MODEL
VIEW
CONTROL
```

Ví dụ:

```text
WaterModel
WaterView
WaterController
```

Không để UI trực tiếp điều khiển model.

---

# 18. CONTENT HOT UPDATE

Đây là yêu cầu bắt buộc.

Mục tiêu:

> Thay đổi nội dung mà không cần xây lại engine.

Pipeline:

```text
CONTENT EDIT
      ↓
VALIDATE
      ↓
VERSION
      ↓
PUBLISH
      ↓
CACHE INVALIDATION / REVALIDATION
      ↓
USER RECEIVES NEW CONTENT
```

Nội dung có thể cập nhật:

- Questions
- Quests
- Concepts
- Rewards
- Events
- Dialogues
- Assets
- Difficulty
- Learning objectives

---

# 19. CONTENT VERSIONING

Mỗi content object phải có:

```text
id
version
status
createdAt
updatedAt
author
source
```

Status:

```text
DRAFT
REVIEW
APPROVED
PUBLISHED
ARCHIVED
```

Không xóa dữ liệu cũ nếu có người chơi đang sử dụng.

---

# 20. BACKWARD COMPATIBILITY

Mọi thay đổi schema phải ưu tiên backward compatibility.

Không được:

```text
Schema V1
   ↓
breaking change
   ↓
game cũ hỏng
```

Phải:

```text
Schema V1
   ↓
migration
   ↓
Schema V2
```

---

# 21. AI CONTENT PIPELINE

AI phải hoạt động theo các Agent:

```text
ANALYZER
   ↓
DESIGNER
   ↓
GENERATOR
   ↓
VALIDATOR
   ↓
REPAIR
   ↓
PUBLISHER
```

## Analyzer

Phân tích yêu cầu.

## Designer

Tạo Game Blueprint.

## Generator

Sinh content.

## Validator

Kiểm tra schema, logic, giáo dục.

## Repair

Sửa lỗi.

## Publisher

Đưa content vào hệ thống.

---

# 22. CHAT-TO-GAME

Người dùng có thể nhập:

> "Tạo game về hệ tuần hoàn cho học sinh lớp 8."

Agent phải tự thu thập tối thiểu:

```text
Môn
Lớp
Chủ đề
Mục tiêu
Loại game
Độ khó
Phong cách
Thời lượng
```

Nếu thông tin thiếu:

```text
ASK ONLY ESSENTIAL QUESTIONS
```

Không hỏi lan man.

Sau khi đủ:

```text
USER REQUEST
 ↓
GAME BLUEPRINT
 ↓
CONTENT
 ↓
VALIDATE
 ↓
PREVIEW
 ↓
PUBLISH
```

---

# 23. GAME BUILDER

Admin phải có:

```text
Dashboard
Knowledge Manager
Game Builder
Quest Builder
Question Builder
Reward Builder
World Builder
Asset Manager
Theme Manager
AI Generator
Version Manager
Publish Manager
Analytics
```

Mục tiêu:

> Giáo viên có thể tạo/cập nhật nội dung mà không cần sửa source code.

---

# 24. DATA STORAGE

Có thể dùng:

```text
PostgreSQL / Supabase
```

cho:

- Users
- Profiles
- Progress
- XP
- Achievements
- Quests
- Content metadata
- Analytics

Static content có thể dùng:

```text
JSON
Markdown
MDX
```

Asset dùng:

```text
Vercel Blob
Cloudinary
Object Storage
```

Không lưu asset lớn trực tiếp vào database.

---

# 25. PERFORMANCE

Mục tiêu:

```text
Fast Initial Load
Lazy Loading
Code Splitting
Dynamic Import
Asset Compression
Image Optimization
Caching
Incremental Revalidation
```

Game engine chỉ tải khi cần.

Ví dụ:

```text
Trang chủ
 ↓
Không tải Phaser
 ↓
User chọn game
 ↓
Lazy-load Phaser
```

---

# 26. MOBILE / DESKTOP

Phải responsive.

Ưu tiên:

```text
Desktop
Tablet
Mobile
```

Không thiết kế desktop-only.

Touch interaction phải được xem xét ngay từ đầu.

---

# 27. ACCESSIBILITY

Phải hỗ trợ:

- Keyboard navigation
- Focus state
- Readable contrast
- Reduced motion
- Screen-reader friendly UI ở lớp React
- Không phụ thuộc hoàn toàn vào màu sắc
- Text alternatives cho nội dung quan trọng

---

# 28. ANALYTICS

Theo dõi:

```text
Session
Quest Started
Quest Completed
Question Answered
Question Failed
Hint Used
Time Spent
Drop-off
Level Up
Achievement
Mastery
```

Không chỉ đo:

```text
PAGE VIEW
```

Mà phải đo:

```text
LEARNING + GAMEPLAY EVENTS
```

---

# 29. LEARNING ANALYTICS

Mỗi concept nên có mastery:

```text
0 = chưa biết
1 = nhận biết
2 = hiểu
3 = vận dụng
4 = thành thạo
```

Hệ thống dùng dữ liệu này để điều chỉnh:

- Difficulty
- Quest
- Hint
- Review
- Recommendation

---

# 30. ADAPTIVE GAMEPLAY

Game có thể điều chỉnh:

```text
Difficulty
Hints
Question type
Time limit
Enemy/Challenge strength
Number of attempts
```

Ví dụ:

```text
3 lần sai
 ↓
Difficulty giảm
 ↓
Hint xuất hiện
 ↓
Concept review
```

Không được làm người học cảm thấy bị phạt vì chưa biết.

---

# 31. AI SAFETY / QUALITY

AI-generated content phải được kiểm tra:

```text
Schema
Factual consistency
Curriculum alignment
Age appropriateness
Duplicate detection
Difficulty
Language quality
Learning objective alignment
```

Content chưa qua validation không được tự động publish production.

---

# 32. TESTING

Bắt buộc có:

```text
Unit Test
Schema Test
Content Validation Test
Gameplay Test
E2E Test
Build Test
Performance Test
```

Mỗi release phải kiểm tra:

```text
npm run lint
npm run typecheck
npm run test
npm run build
```

---

# 33. RELEASE STRATEGY

Không sửa trực tiếp production.

Pipeline:

```text
FEATURE BRANCH
      ↓
LOCAL TEST
      ↓
GITHUB
      ↓
VERCEL PREVIEW
      ↓
QA
      ↓
MERGE
      ↓
PRODUCTION
```

---

# 34. SAFE UPDATE RULE

Mọi AI Agent khi cập nhật hệ thống phải:

1. Đọc architecture spec.
2. Xác định module bị ảnh hưởng.
3. Không sửa module ngoài phạm vi.
4. Kiểm tra dependency.
5. Tạo change plan.
6. Thực hiện thay đổi.
7. Chạy validation.
8. Kiểm tra regression.
9. Tạo changelog.
10. Chỉ publish khi pass.

---

# 35. KHÔNG ĐƯỢC LÀM

AI Agent không được:

- Viết lại toàn bộ project chỉ vì thêm một feature.
- Xóa engine cũ nếu chưa có migration.
- Hard-code nội dung vào UI.
- Hard-code quest vào component.
- Tạo database mới cho từng game.
- Tạo project mới cho từng môn.
- Thay đổi schema âm thầm.
- Xóa dữ liệu người chơi.
- Publish content chưa validate.
- Đưa API secret vào client.
- Commit secret vào GitHub.
- Làm game phụ thuộc vào một màn hình duy nhất.

---

# 36. PRINCIPLE: CONFIGURATION OVER RE-CODING

Ưu tiên:

```text
CONFIG
DATA
SCHEMA
PLUGIN
MODULE
```

trước:

```text
REWRITE CODE
```

Ví dụ thay đổi:

```text
Màu giao diện
→ Theme config

Phần thưởng
→ Reward config

Quest
→ Quest data

Câu hỏi
→ Question data

Độ khó
→ Difficulty config

Bản đồ
→ World config
```

---

# 37. PLUGIN ARCHITECTURE

Hệ thống phải cho phép thêm module:

```text
Plugin
├── manifest
├── schema
├── engine
├── UI
├── assets
└── tests
```

Ví dụ:

```text
PhysicsPlugin
BiologyPlugin
IoTPlugin
AgriculturePlugin
ChemistryPlugin
GeometryPlugin
```

---

# 38. THEME ENGINE

Theme không được hard-code.

```json
{
  "theme": "future-science",
  "colors": {},
  "typography": {},
  "effects": {},
  "background": {},
  "particles": {},
  "sounds": {}
}
```

Cho phép:

```text
Future Science
Cyber Lab
Space
Nature
Mekong
Ancient
Minimal
```

---

# 39. LOCALIZATION

Thiết kế sẵn:

```text
vi
en
th
id
ms
```

Không hard-code text trong component.

```text
i18n
 ↓
translation key
 ↓
UI
```

---

# 40. EDUCATIONAL QUALITY LAYER

Mỗi game phải xác định:

```text
Subject
Grade
Topic
Learning Objectives
Prerequisites
Knowledge
Skills
Assessment
Mastery
```

Game hóa không được thay thế mục tiêu học tập.

Game mechanics phải phục vụ learning objective.

---

# 41. EXAMPLE USER FLOW

```text
USER
 ↓
"Chơi game về tế bào"
 ↓
GAME OS
 ↓
Load Biology World
 ↓
Player Spawn
 ↓
Quest Available
 ↓
Explore Cell
 ↓
Interact with Nucleus
 ↓
Question
 ↓
Correct
 ↓
XP +100
 ↓
Badge
 ↓
New Zone Unlock
 ↓
Next Quest
```

---

# 42. EXAMPLE FUTURE GAME

## BIOVERSE

```text
WORLD
└── CELL CITY
    ├── Membrane Gate
    ├── Cytoplasm Lab
    ├── Nucleus Core
    ├── Mitochondria Factory
    └── Ribosome Workshop
```

Người chơi:

```text
Explore
 ↓
Collect
 ↓
Solve
 ↓
Build
 ↓
Discover
 ↓
Unlock
```

---

# 43. MINIMUM VIABLE GAME OS

Phiên bản đầu tiên chỉ cần:

```text
Next.js
TypeScript
Tailwind
Phaser
Supabase/Postgres
GitHub
Vercel
JSON Content
Game Blueprint
Quest Engine
XP
Level
Reward
Future UI
Admin Content Editor
```

Không xây tất cả tính năng ngay từ V1.

---

# 44. ROADMAP

## P0 — FOUNDATION

```text
Next.js
Vercel
GitHub
Game Shell
Design System
Schema
```

## P1 — GAME ENGINE

```text
Phaser
World
Player
Interaction
Quest
XP
Reward
```

## P2 — KNOWLEDGE

```text
Knowledge Schema
Knowledge Graph
Question Bank
Learning Objectives
```

## P3 — CONTENT BUILDER

```text
Admin
Quest Builder
Question Builder
World Builder
```

## P4 — AI

```text
Analyzer
Blueprint Generator
Content Generator
Validator
Repair
Publisher
```

## P5 — SIMULATION

```text
2D
3D
Physics
Biology
Chemistry
STEM
```

## P6 — SCALE

```text
Analytics
Adaptive Learning
Multiplayer
Localization
PWA
```

---

# 45. ACCEPTANCE CRITERIA

Một phiên bản được xem là đạt khi:

- [ ] Chạy ổn định trên Vercel.
- [ ] Có Game Shell dùng chung.
- [ ] Có Future UI.
- [ ] Có XP.
- [ ] Có Level.
- [ ] Có Quest.
- [ ] Có Reward.
- [ ] Có Achievement.
- [ ] Nội dung tách khỏi engine.
- [ ] Có Game Blueprint.
- [ ] Có schema validation.
- [ ] Có versioning.
- [ ] Có content hot-update.
- [ ] Có admin/content builder.
- [ ] Có GitHub workflow.
- [ ] Có Vercel Preview.
- [ ] Có production deployment.
- [ ] Có regression test.
- [ ] Có khả năng thêm game mới mà không fork toàn bộ project.

---

# 46. MASTER RULE

> **BUILD ONCE — CONFIGURE MANY — UPDATE WITHOUT REBUILDING THE GAME**

Toàn bộ nền tảng phải hướng tới mô hình:

```text
ONE GAME OS
      │
      ├── MANY SUBJECTS
      ├── MANY WORLDS
      ├── MANY GAMES
      ├── MANY QUESTS
      ├── MANY SIMULATIONS
      └── MANY CONTENT PACKS
```

---

# 47. AI AGENT MASTER INSTRUCTION

Khi AI Agent làm việc với repository này, luôn thực hiện theo thứ tự:

```text
1. READ THIS SPEC
2. READ EXISTING ARCHITECTURE
3. INSPECT CURRENT IMPLEMENTATION
4. IDENTIFY REUSABLE MODULES
5. CREATE CHANGE PLAN
6. MODIFY ONLY REQUIRED MODULES
7. PRESERVE BACKWARD COMPATIBILITY
8. VALIDATE SCHEMA
9. RUN TESTS
10. RUN BUILD
11. GENERATE CHANGELOG
12. PREPARE VERCEL PREVIEW
```

Không được tự ý chuyển sang kiến trúc mới nếu chưa có lý do kỹ thuật rõ ràng.

---

# 48. FINAL ARCHITECTURE

```text
                 ┌─────────────────────┐
                 │       USER          │
                 │  Chat / Game / Web  │
                 └──────────┬──────────┘
                            │
                 ┌──────────▼──────────┐
                 │     GAME SHELL      │
                 │   FUTURE UI / HUD   │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼───────┐   ┌───────▼───────┐   ┌──────▼──────┐
│ GAME ENGINE   │   │ KNOWLEDGE     │   │ AI ENGINE   │
│ Phaser/Pixi   │   │ ENGINE        │   │ Generator   │
│ Three.js      │   │ Knowledge     │   │ Validator   │
└───────┬───────┘   └───────┬───────┘   └──────┬──────┘
        │                   │                  │
        └───────────────────┼──────────────────┘
                            │
                  ┌─────────▼─────────┐
                  │ CONTENT / CONFIG  │
                  │ JSON / DB / MD    │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │   NEXT.JS / API   │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │       VERCEL      │
                  └─────────┬─────────┘
                            │
                  ┌─────────▼─────────┐
                  │      GITHUB       │
                  └───────────────────┘
```

---

# 49. SUCCESS DEFINITION

Hệ thống thành công khi giáo viên có thể nhập:

> "Tạo game 3D về hệ Mặt Trời cho học sinh lớp 6, phong cách tương lai, có khám phá, nhiệm vụ, XP, cấp độ và thử thách."

và hệ thống có thể:

```text
CHAT
 ↓
UNDERSTAND
 ↓
BLUEPRINT
 ↓
KNOWLEDGE
 ↓
QUEST
 ↓
GAME
 ↓
VALIDATE
 ↓
PREVIEW
 ↓
PUBLISH
```

Sau đó giáo viên có thể nhập:

> "Thêm 20 câu hỏi mới."

hoặc:

> "Tăng độ khó."

hoặc:

> "Thêm nhiệm vụ về Sao Hỏa."

hoặc:

> "Đổi giao diện sang phòng thí nghiệm tương lai."

và hệ thống **cập nhật module/content tương ứng**, không tạo lại toàn bộ ứng dụng.

---

## STATUS

```text
SPEC VERSION: 1.0.0
ARCHITECTURE: UNIVERSAL EDUCATIONAL GAME OS
DEPLOYMENT: VERCEL
SOURCE CONTROL: GITHUB
PRIMARY FRAMEWORK: NEXT.JS
GAME ENGINE: PHASER
2D RENDERING: PIXIJS (OPTIONAL)
3D: THREE.JS / R3F
DATABASE: POSTGRESQL / SUPABASE
CONTENT: JSON / MARKDOWN / DATABASE
AI: AGENT PIPELINE
UPDATE MODEL: CONTENT HOT-UPDATE
DESIGN: FUTURISTIC EDUCATIONAL GAME UI
```

**END OF SPEC**
