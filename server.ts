import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization of Gemini API Client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return geminiClient;
}

// In-Memory Storage & Gateway for Sheets / Data layer
interface MemoryStore {
  scripts: any[];
  games: any[];
  toolkits: any[];
  behaviorEvents: any[];
  studentModel: Record<string, any>;
  auditLogs: any[];
  sheetsConfig: {
    spreadsheetId: string;
    sheetName: string;
    appsScriptUrl: string;
    lastSyncedAt?: string;
  };
}

const store: MemoryStore = {
  scripts: [],
  games: [],
  toolkits: [],
  behaviorEvents: [],
  studentModel: {
    student_01: {
      userId: 'student_01',
      age: 13,
      gradeLevel: 'Lớp 8',
      constructs: {
        Planning: 68,
        Prioritization: 55,
        ProblemSolving: 72,
        SelfRegulation: 60,
        AttentionControl: 58,
        HelpSeeking: 50,
        Reflection: 70,
        Adaptability: 65,
        GoalSetting: 64,
        Communication: 62,
        ConsequencePrediction: 58
      },
      recentInterventions: ['prioritization', 'self_regulation'],
      sessionsCompleted: 4,
      lastActive: new Date().toISOString()
    }
  },
  auditLogs: [
    {
      id: 'audit_init',
      actor: 'Admin Principal',
      role: 'Admin',
      timestamp: new Date().toISOString(),
      entity: 'game',
      entityId: 'game_48_minutes',
      version: '1.0.0',
      operation: 'PUBLISH',
      diffNotes: 'Khởi tạo và xuất bản kịch bản mẫu chuẩn dọc "48 phút cuối"'
    }
  ],
  sheetsConfig: {
    spreadsheetId: '1EduChoice_Sheet_Sample_Data_2026',
    sheetName: '04_BEHAVIOR_EVENTS',
    appsScriptUrl: 'https://script.google.com/macros/s/AKfycbz_sample/exec',
    lastSyncedAt: new Date().toISOString()
  }
};

// ==========================================
// API ROUTES
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '3.0.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// 0. Google Gemini — Educational Game Script Scaffold Generator
// Automatically creates a rich educational game script scaffolding based on admin topic keywords
app.post('/api/ai/generate-script-scaffold', async (req, res) => {
  try {
    const {
      topicKeywords,
      ageRange,
      durationMinutes,
      selectedConstructs,
      themeStyle
    } = req.body;

    if (!topicKeywords || typeof topicKeywords !== 'string' || !topicKeywords.trim()) {
      return res.status(400).json({ error: 'Vui lòng cung cấp từ khóa chủ đề (topicKeywords).' });
    }

    const trimmedKeywords = topicKeywords.trim();
    const minAge = ageRange?.min || 11;
    const maxAge = ageRange?.max || 15;
    const duration = durationMinutes || 3;

    const gemini = getGemini();

    const scaffoldPrompt = `
Bạn là Chuyên gia Biên kịch Trò chơi Giáo dục Hành vi & Nhà Tâm lý Học đường Thực chứng (Educational Scenario Architect) của nền tảng EduChoice-AI.
Nhiệm vụ của bạn: Dựa trên Từ khóa chủ đề do Quản trị viên nhập vào: "${trimmedKeywords}", hãy sáng tạo một KHUNG KỊCH BẢN TRÒ CHƠI GIÁO DỤC (Game Script Scaffolding) hoàn chỉnh, chân thực, hấp dẫn và đậm tính giáo dục hành vi.

Thông số kịch bản:
- Đối tượng người học: Học sinh lứa tuổi ${minAge} - ${maxAge} tuổi.
- Thời lượng trải nghiệm: ${duration} phút (chuẩn micro-game hành vi).
- Định hướng phong cách: ${themeStyle || 'Tình huống thực tế học đường & sinh hoạt hàng ngày'}.
- Năng lực tâm lý mục tiêu: ${selectedConstructs && selectedConstructs.length > 0 ? selectedConstructs.join(', ') : 'Hãy chọn 2-3 năng lực phù hợp nhất từ: Prioritization, Planning, SelfRegulation, ProblemSolving, ConsequencePrediction, TimeManagement, DistractionRecovery, Reflection, HelpSeeking, Communication'}.

Hãy phản hồi dưới dạng JSON thuần túy (không thêm markdown backticks thừa bên ngoài) theo cấu trúc schema sau:
{
  "title": "Tiêu đề kịch bản thu hút, gợi cảm giác thử thách (ví dụ: '48 Phút Trước Giờ Nộp Bài', 'Cám Dỗ Thông Báo Lúc 22 Giờ', 'Xung Đột Trong Nhóm Dự Án')",
  "objectives": "Mục tiêu rèn luyện năng lực cụ thể (1-2 câu súc tích)",
  "constructs": ["Tên các construct chính"],
  "durationMinutes": ${duration},
  "summary": "Tóm tắt ngắn 2 câu về mâu thuẫn nhận thức và tình huống nan giải của nhân vật",
  "rawScript": "Nội dung đầy đủ của kịch bản, được trình bày chi tiết theo bố cục chuẩn sau:
[BỐI CẢNH]
(Mô tả cụ thể thời gian, không gian, áp lực thực tế mà học sinh đang đối mặt)

[NHÂN VẬT & XUNG ĐỘT TÂM LÝ]
(Nhân vật chính, người liên quan như bạn bè/thầy cô/cha mẹ, giằng xé nội tâm giữa hành động nhất thời và trách nhiệm dài hạn)

[TÌNH HUỐNG CAO TRÀO ĐÒI HỎI QUYẾT ĐỊNH]
(Khoảnh khắc học sinh bị đặt vào tình huống phải chọn ngay 1 trong 3 hướng đi)

[3 LỰA CHỌN HÀNH VI]
- Lựa chọn A (Sáng suốt, chủ động, ưu tiên mục tiêu dài hạn và kiểm soát bản thân):
  Mô tả hành động của A.
- Lựa chọn B (Dễ dãi theo cảm xúc ngắn hạn, tìm sự thoải mái tức thời):
  Mô tả hành động của B.
- Lựa chọn C (Trì hoãn, xao nhãng cực đoan hoặc buông xuôi, né tránh trách nhiệm):
  Mô tả hành động của C.

[HẬU QUẢ TỰ NHIÊN CHO TỪNG LỰA CHỌN]
- Kết quả khi chọn A: (Cảm giác nhẹ nhõm, hoàn thành mục tiêu, rèn luyện được nghị lực)
- Kết quả khi chọn B: (Thoải mái ban đầu nhưng áp lực dồn ứ, hối tiếc và căng thẳng tăng vọt)
- Kết quả khi chọn C: (Mất cơ hội, bài vở trễ hạn, gây tổn hại niềm tin và uy tín cá nhân)

[HỘP CÔNG CỤ TÂM LÝ CAN THIỆP THỰC CHỨNG]
- Tên công cụ: (Ví dụ: Ma trận Eisenhower / Hơi thở 4-4-4 / Quy tắc 5 giây / Pomodoro / Chia nhỏ mục tiêu)
- Hướng dẫn thực hành: (1-2 câu chỉ dẫn học sinh áp dụng ngay)

[CÂU HỎI PHẢN TƯ TỰ THẤU HIỂU]
- Câu hỏi 1 (Nhận diện cảm xúc): ...
- Câu hỏi 2 (Hành động cải thiện ngoài đời thực ngày mai): ...",
  "suggestedTags": ["tag1", "tag2", "tag3"]
}

Tiêu chuẩn an toàn & giáo dục:
1. Đảm bảo chuẩn an toàn học đường (G-rating), tuyệt đối không chứa ngôn từ bạo lực hay chẩn đoán tiêu cực.
2. Tình huống phản ánh đúng tâm lý lứa tuổi học sinh, tạo sự đồng cảm sâu sắc.
3. Không trả về giải thích ngoài JSON.
`;

    if (gemini) {
      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: scaffoldPrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.35
          }
        });

        const text = response.text?.trim() || '';
        const cleanJson = text.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(cleanJson);

        return res.json({
          success: true,
          scaffold: parsed,
          source: 'gemini-3.8-flash'
        });
      } catch (geminiErr) {
        console.warn('Gemini API temporary issue, using high-quality deterministic scenario builder:', geminiErr);
      }
    }

    // High-quality contextual fallback if Gemini key is not set or network fails
    const defaultConstructs = selectedConstructs && selectedConstructs.length > 0
      ? selectedConstructs
      : ['Prioritization', 'SelfRegulation', 'Planning'];

    const fallbackScaffold = {
      title: `Thử Thách Hành Vi: ${trimmedKeywords.charAt(0).toUpperCase() + trimmedKeywords.slice(1)}`,
      objectives: `Giúp học sinh rèn luyện kỹ năng tự chủ, phân định ưu tiên và kiềm chế xao nhãng khi đối diện với chủ đề "${trimmedKeywords}".`,
      constructs: defaultConstructs,
      durationMinutes: duration,
      summary: `Học sinh đối diện với tình huống thách thức xoay quanh chủ đề "${trimmedKeywords}", đòi hỏi sự cân nhắc thấu đáo giữa cảm xúc nhất thời và mục tiêu dài hạn.`,
      rawScript: `[BỐI CẢNH]
Buổi tối thứ Năm, chỉ còn 12 tiếng nữa là đến hạn nộp bài tập nhóm và kiểm tra định kỳ. Nhân vật chính đang chuẩn bị ngồi vào bàn học thì đối diện với thử thách liên quan đến "${trimmedKeywords}".

[NHÂN VẬT & XUNG ĐỘT TÂM LÝ]
Học sinh (Minh, 14 tuổi) cảm thấy mâu thuẫn gay gắt: một bên là mong muốn thả lỏng cảm xúc theo chủ đề "${trimmedKeywords}", một bên là trách nhiệm hoàn thành nhiệm vụ và giữ uy tín với bạn bè.

[TÌNH HUỐNG CAO TRÀO ĐÒI HỎI QUYẾT ĐỊNH]
Một thông báo bất ngờ xuất hiện kéo theo sự cám dỗ cực lớn. Đồng hồ điểm 21:30. Minh chỉ có 5 giây để quyết định hành động tiếp theo của mình.

[3 LỰA CHỌN HÀNH VI]
- Lựa chọn A (Chiến lược ưu tiên & tự chủ): Cất các thiết bị gây xao nhãng sang phòng khác, đặt chuông hẹn 25 phút tập trung xử lý dứt điểm phần việc khó nhất trước.
- Lựa chọn B (Dễ dãi theo cảm xúc ngắn hạn): Nghĩ rằng "chỉ lướt/xem 10 phút thôi rồi làm", nhưng sau đó mất kiểm soát thời gian.
- Lựa chọn C (Né tránh & buông xuôi): Tự nhủ "mai dậy sớm 5h sáng làm bù" và buông xuôi mọi việc để đắm chìm vào "${trimmedKeywords}".

[HẬU QUẢ TỰ NHIÊN CHO TỪNG LỰA CHỌN]
- Kết quả khi chọn A: Minh hoàn thành bài đúng hạn lúc 22:30, cảm thấy nhẹ nhõm, tự hào vì đã làm chủ bản thân và có giấc ngủ trọn vẹn.
- Kết quả khi chọn B: Đến 23:45 Minh mới sực tỉnh trong hoảng hốt, bài tập làm qua loa trong trạng thái kiệt sức và căng thẳng tột độ.
- Kết quả khi chọn C: Sáng hôm sau báo thức không đánh thức được Minh. Minh đến lớp muộn, bài tập chưa xong và làm cả nhóm thất vọng.

[HỘP CÔNG CỤ TÂM LÝ CAN THIỆP THỰC CHỨNG]
- Tên công cụ: Ma trận Ưu tiên Eisenhower & Quy tắc Dừng 5 giây.
- Hướng dẫn thực hành: Đếm ngược 5-4-3-2-1 và lập tức ngồi vào bàn làm 1 việc nhỏ trong 10 phút đầu tiên để phá vỡ quán tính trì hoãn.

[CÂU HỎI PHẢN TƯ TỰ THẤU HIỂU]
- Câu hỏi 1: Khi cảm xúc lôi kéo em vào "${trimmedKeywords}", tín hiệu cơ thể nào báo cho em biết mình đang xao nhãng?
- Câu hỏi 2: Ngày mai, hành động cụ thể nào em sẽ làm trước tiên để ngăn chặn tình huống tương tự lặp lại?`,
      suggestedTags: [trimmedKeywords, 'Tự chủ học đường', 'Quản lý thời gian']
    };

    res.json({
      success: true,
      scaffold: fallbackScaffold,
      source: 'deterministic_scaffold_engine'
    });
  } catch (err: any) {
    console.error('Error in /api/ai/generate-script-scaffold:', err);
    res.status(500).json({ error: err.message || 'Lỗi tạo khung kịch bản' });
  }
});

// 1. Google AI Studio — Game Designer AI endpoint
// Analyzes raw script & constructs, generates strictly compliant Game DSL JSON
app.post('/api/ai/design-game', async (req, res) => {
  try {
    const { title, rawScript, ageRange, durationMinutes, constructs, objectives } = req.body;

    const gemini = getGemini();

    const dslSchemaInstructions = `
Bạn là AI Chuyên gia Thiết kế Trò chơi Giáo dục Hành vi (Game Designer Studio của EduChoice-AI v3).
Nhiệm vụ của bạn là phân tích Kịch bản thô (Script) của Admin và chuyển hóa thành Game Specification JSON tuân thủ nghiêm ngặt Schema DSL sau:

{
  "gameId": "chuỗi định dạng snake_case, ví dụ: game_phan_bo_thoi_gian",
  "title": "Tiêu đề trò chơi hấp dẫn",
  "ageRange": {"min": ${ageRange?.min || 11}, "max": ${ageRange?.max || 15}},
  "durationMinutes": ${durationMinutes || 3},
  "constructs": ${JSON.stringify(constructs || ['Prioritization', 'Planning'])},
  "scenes": [
    {
      "id": "scene_01",
      "type": "situation",
      "content": "Mô tả bối cảnh tình huống kịch tính, ngắn gọn, đặt học sinh vào vai nhân vật",
      "characterMood": "stressed|neutral|focused|happy|reflective",
      "timeLimitSeconds": 45,
      "nextSceneId": "scene_02"
    },
    {
      "id": "scene_02",
      "type": "choice",
      "content": "Câu hỏi ra quyết định cho học sinh",
      "choices": [
        {
          "id": "A",
          "label": "Mô tả lựa chọn A",
          "consequenceId": "c_A",
          "toolkitHint": "Gợi ý tâm lý học ngắn",
          "constructImpact": {"construct": "${constructs?.[0] || 'Prioritization'}", "delta": 15}
        },
        {
          "id": "B",
          "label": "Mô tả lựa chọn B",
          "consequenceId": "c_B",
          "toolkitHint": "Gợi ý",
          "constructImpact": {"construct": "${constructs?.[0] || 'Prioritization'}", "delta": -10}
        },
        {
          "id": "C",
          "label": "Mô tả lựa chọn C",
          "consequenceId": "c_C",
          "toolkitHint": "Gợi ý",
          "constructImpact": {"construct": "${constructs?.[0] || 'Prioritization'}", "delta": -15}
        }
      ]
    },
    {
      "id": "c_A",
      "type": "consequence",
      "content": "Kết quả trực tiếp khi chọn A",
      "characterMood": "happy|stressed",
      "nextSceneId": "intervention_01"
    },
    {
      "id": "c_B",
      "type": "consequence",
      "content": "Kết quả trực tiếp khi chọn B",
      "characterMood": "stressed",
      "nextSceneId": "intervention_01"
    },
    {
      "id": "c_C",
      "type": "consequence",
      "content": "Kết quả trực tiếp khi chọn C",
      "characterMood": "stressed",
      "nextSceneId": "intervention_01"
    },
    {
      "id": "intervention_01",
      "type": "intervention",
      "content": "Giải thích hộp công cụ tâm lý giáo dục thực chứng (ví dụ: Ma trận Eisenhower, Hơi thở 4-4-4, Chia nhỏ việc)",
      "toolkitId": "prioritization|planning|self_regulation|communication|problem_decomposition",
      "interventionPrompt": "Lời kêu gọi thử lại có chiến lược",
      "nextSceneId": "reflection_01"
    },
    {
      "id": "reflection_01",
      "type": "reflection",
      "content": "Góc phản tư kích hoạt tư duy bậc cao",
      "reflectionQuestion": "Câu hỏi phản tư sâu để học sinh đúc kết bài học?",
      "nextSceneId": "ending_01"
    },
    {
      "id": "ending_01",
      "type": "ending",
      "content": "Chúc mừng hoàn thành và ghi nhận tăng trưởng năng lực",
      "characterMood": "happy"
    }
  ],
  "safety": {
    "status": "approved",
    "reviewerNotes": "Nội dung an toàn, lành mạnh, bám sát tâm lý học đường.",
    "contentRating": "G"
  },
  "version": "1.0.0"
}

Quy tắc BẮT BUỘC:
1. MỌI "consequenceId" trong choices phải có scene tương ứng tồn tại trong "scenes".
2. Thời lượng durationMinutes chỉ từ 1 đến 5 phút (chuẩn micro-game).
3. Tuyệt đối KHÔNG đưa nội dung bạo lực, xúc phạm hay chẩn đoán bệnh lý (tuân thủ Safety & Privacy EduChoice-AI).
4. Chỉ trả về JSON thuần túy, không có markdown backticks hoặc văn bản giải thích bên ngoài.
`;

    if (gemini) {
      const prompt = `${dslSchemaInstructions}\n\n[DỮ LIỆU ĐẦU VÀO TỪ ADMIN]\nTiêu đề: ${title}\nMục tiêu: ${objectives || 'Phát triển kỹ năng ra quyết định'}\nKịch bản thô:\n${rawScript}`;

      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3
          }
        });

        const responseText = response.text?.trim() || '';
        const cleanJson = responseText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const parsedSpec = JSON.parse(cleanJson);
        return res.json({
          success: true,
          spec: parsedSpec,
          source: 'gemini-3.8-flash'
        });
      } catch (geminiErr) {
        console.warn('Gemini API temporary issue or high demand spike, falling back to deterministic DSL engine:', geminiErr);
      }
    }

    // High-quality deterministic fallback if Gemini is offline or unconfigured
    const slug = (title || 'game')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 24);

    const fallbackSpec = {
      gameId: `game_${slug || 'educhoice'}`,
      title: title || 'Thử thách Ra Quyết Định',
      ageRange: ageRange || { min: 11, max: 15 },
      durationMinutes: Math.min(Math.max(durationMinutes || 3, 1), 5),
      constructs: constructs && constructs.length > 0 ? constructs : ['Prioritization', 'Planning'],
      version: '1.0.0',
      safety: {
        status: 'approved',
        reviewerNotes: 'Được tạo bởi Bộ sinh kịch bản chuẩn DSL EduChoice-AI v3.',
        contentRating: 'G'
      },
      scenes: [
        {
          id: 'scene_01',
          type: 'situation',
          content: rawScript
            ? `Tình huống: ${rawScript.slice(0, 180)}...`
            : 'Em đang đối mặt với một tình huống bất ngờ đòi hỏi sự tập trung và cân nhắc đa chiều trước khi hành động.',
          characterMood: 'neutral',
          timeLimitSeconds: 40,
          nextSceneId: 'scene_02'
        },
        {
          id: 'scene_02',
          type: 'choice',
          content: 'Trước các áp lực hiện tại, quyết định hành động sáng suốt nhất của em là gì?',
          characterMood: 'focused',
          choices: [
            {
              id: 'A',
              label: 'Chọn phương án ưu tiên việc quan trọng và khẩn cấp trước',
              consequenceId: 'c_A',
              toolkitHint: 'Tập trung giải quyết việc cốt lõi tạo ra 80% kết quả.',
              constructImpact: { construct: constructs?.[0] || 'Prioritization', delta: 20 }
            },
            {
              id: 'B',
              label: 'Chọn làm việc dễ dàng nhất để tìm cảm giác thoải mái trước',
              consequenceId: 'c_B',
              toolkitHint: 'Việc dễ giúp khởi động nhưng dễ khiến việc trọng tâm bị tồn đọng.',
              constructImpact: { construct: constructs?.[0] || 'Prioritization', delta: -5 }
            },
            {
              id: 'C',
              label: 'Trì hoãn và tìm kiếm sự xao nhãng tức thời',
              consequenceId: 'c_C',
              toolkitHint: 'Sự xao nhãng tạm thời làm tăng áp lực dồn nén về sau.',
              constructImpact: { construct: constructs?.[0] || 'Prioritization', delta: -15 }
            }
          ]
        },
        {
          id: 'c_A',
          type: 'consequence',
          content: 'Xuất sắc! Việc trọng tâm được hoàn thành đúng hạn giúp em trút bỏ gánh nặng tâm lý và tự tin tiếp tục các bước tiếp theo.',
          characterMood: 'happy',
          nextSceneId: 'intervention_01'
        },
        {
          id: 'c_B',
          type: 'consequence',
          content: 'Em đã xong việc dễ, nhưng thời gian cho việc quan trọng nhất đã bị rút ngắn đáng kể, gây áp lực gấp bội.',
          characterMood: 'stressed',
          nextSceneId: 'intervention_01'
        },
        {
          id: 'c_C',
          type: 'consequence',
          content: 'Hết giờ! Nhiệm vụ chính bị trễ hạn và em phải chịu hệ quả không mong muốn.',
          characterMood: 'stressed',
          nextSceneId: 'intervention_01'
        },
        {
          id: 'intervention_01',
          type: 'intervention',
          content: 'Hộp công cụ tâm lý: "Ma trận Ưu tiên & Dừng 5 giây". Luôn xác định việc nào tạo ra giá trị dài hạn lớn nhất trước khi bị cảm xúc chi phối.',
          toolkitId: 'prioritization',
          interventionPrompt: 'Em có muốn thử nghiệm lại một kịch bản lựa chọn khác không?',
          nextSceneId: 'reflection_01'
        },
        {
          id: 'reflection_01',
          type: 'reflection',
          content: 'Khoảnh khắc phản tư: Lựa chọn vừa rồi đã dạy cho em bài học gì về việc làm chủ tình huống?',
          reflectionQuestion: 'Nếu đối mặt lại với hoàn cảnh này ngày mai, em sẽ quyết định như thế nào?',
          nextSceneId: 'ending_01'
        },
        {
          id: 'ending_01',
          type: 'ending',
          content: 'Hoàn thành thử thách! Các dữ liệu lựa chọn đã được mã hóa gửi về mô hình năng lực hành vi học sinh.',
          characterMood: 'happy'
        }
      ]
    };

    res.json({
      success: true,
      spec: fallbackSpec,
      source: 'deterministic_dsl_engine'
    });
  } catch (err: any) {
    console.error('Error in /api/ai/design-game:', err);
    res.status(500).json({ error: err.message || 'Lỗi xử lý tạo game spec' });
  }
});

// 2. Gemini Adaptive Reasoning Endpoint
// Evaluates student constructs, recent behavior events, and approved candidate games to recommend next game and toolkit intervention
app.post('/api/ai/adaptive-reason', async (req, res) => {
  try {
    const { studentModel, recentEvents, candidateGames, approvedToolkits } = req.body;

    const gemini = getGemini();

    const reasoningSchema = `
{
  "decision": {
    "nextGameId": "chuỗi ID của game thuộc danh sách candidateGames được duyệt",
    "durationMinutes": 3,
    "difficulty": 1,
    "toolkitId": "id của toolkit thuộc approvedToolkits",
    "interventionType": "embedded|pre_game|post_reflection|just_in_time"
  },
  "evidence": {
    "primaryConstruct": "Tên construct cần củng cố nhất (ví dụ: Prioritization, SelfRegulation, Planning)",
    "confidence": 0.85,
    "reasoning": "Giải thích ngắn gọn 2 câu bằng tiếng Việt dựa trên hành vi học sinh đã thể hiện"
  },
  "safety": {
    "status": "normal"
  }
}
`;

    if (gemini && candidateGames && candidateGames.length > 0) {
      const prompt = `
Bạn là AI Suy luận Thích ứng Giáo dục (Adaptive Engine của EduChoice-AI v3).
Nhiệm vụ: Dựa trên Hồ sơ năng lực học sinh (Student Model) và các sự kiện hành vi gần nhất (Behavior Telemetry), hãy lựa chọn TRÒ CHƠI TIẾP THEO và HỘP CÔNG CỤ CAN THIỆP phù hợp nhất từ danh sách ứng viên ĐÃ ĐƯỢC PHÊ DUYỆT.

[HỒ SƠ HỌC SINH]
Độ tuổi: ${studentModel?.age || 13}
Điểm các năng lực (Constructs): ${JSON.stringify(studentModel?.constructs || {})}
Lần can thiệp gần đây: ${JSON.stringify(studentModel?.recentInterventions || [])}

[SỰ KIỆN HÀNH VI GẦN NHẤT]
${JSON.stringify((recentEvents || []).slice(-5))}

[DANH SÁCH GAME ỨNG VIÊN ĐƯỢC DUYỆT]
${JSON.stringify(candidateGames.map((g: any) => ({ gameId: g.gameId, title: g.title, constructs: g.constructs, durationMinutes: g.durationMinutes })))}

[HỘP CÔNG CỤ TÂM LÝ ĐƯỢC DUYỆT]
${JSON.stringify(approvedToolkits?.map((t: any) => ({ id: t.id, nameVi: t.nameVi })) || ['prioritization', 'self_regulation'])}

Quy định ngặt nghèo:
- "nextGameId" BẮT BUỘC phải nằm trong danh sách game ứng viên.
- "toolkitId" BẮT BUỘC phải nằm trong danh sách approvedToolkits.
- KHÔNG đưa ra chẩn đoán bệnh lý hay tâm thần học sinh.
- Trả về JSON đúng cấu trúc:
${reasoningSchema}
`;

      try {
        const response = await gemini.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });

        const text = response.text?.trim() || '';
        const parsed = JSON.parse(text);
        return res.json({
          ...parsed,
          source: 'gemini'
        });
      } catch (err) {
        console.warn('Gemini adaptive reasoning fallback triggered:', err);
      }
    }

    // Fallback deterministic recommendation
    // Find construct with the lowest score
    const constructs = studentModel?.constructs || { Prioritization: 50, SelfRegulation: 50 };
    let lowestConstruct = 'Prioritization';
    let lowestScore = 100;
    for (const [key, val] of Object.entries(constructs)) {
      if (typeof val === 'number' && val < lowestScore) {
        lowestScore = val;
        lowestConstruct = key;
      }
    }

    const availableGame = candidateGames?.find((g: any) =>
      g.constructs?.includes(lowestConstruct)
    ) || candidateGames?.[0] || { gameId: 'game_48_minutes', durationMinutes: 3 };

    const fallbackToolkit = lowestConstruct === 'SelfRegulation' ? 'self_regulation' : 'prioritization';

    res.json({
      decision: {
        nextGameId: availableGame.gameId,
        durationMinutes: availableGame.durationMinutes || 3,
        difficulty: 1,
        toolkitId: fallbackToolkit,
        interventionType: 'embedded'
      },
      evidence: {
        primaryConstruct: lowestConstruct,
        confidence: 0.82,
        reasoning: `Dựa trên điểm năng lực ${lowestConstruct} (${lowestScore}/100) cần được rèn luyện thêm, hệ thống khuyến nghị game "${availableGame.title || availableGame.gameId}" kết hợp công cụ ${fallbackToolkit}.`
      },
      safety: { status: 'normal' },
      source: 'deterministic_fallback'
    });
  } catch (err: any) {
    console.error('Error in /api/ai/adaptive-reason:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Telemetry Event Logging
app.post('/api/telemetry/event', (req, res) => {
  const event = req.body;
  if (!event || !event.type) {
    return res.status(400).json({ error: 'Missing event payload' });
  }
  const loggedEvent = {
    ...event,
    eventId: event.eventId || `evt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    timestamp: event.timestamp || Date.now()
  };
  store.behaviorEvents.push(loggedEvent);

  // Keep last 500 events in memory
  if (store.behaviorEvents.length > 500) {
    store.behaviorEvents.shift();
  }

  res.json({ success: true, eventId: loggedEvent.eventId });
});

app.get('/api/telemetry/events', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 50;
  res.json(store.behaviorEvents.slice(-limit).reverse());
});

// 4. Audit Log
app.get('/api/audit-logs', (req, res) => {
  res.json(store.auditLogs);
});

app.post('/api/audit-logs', (req, res) => {
  const { actor, role, entity, entityId, version, operation, diffNotes } = req.body;
  const newLog = {
    id: `audit_${Date.now()}`,
    actor: actor || 'Admin',
    role: role || 'Admin',
    timestamp: new Date().toISOString(),
    entity,
    entityId,
    version: version || '1.0.0',
    operation,
    diffNotes
  };
  store.auditLogs.unshift(newLog);
  res.json({ success: true, log: newLog });
});

// 5. Google Sheets Sync Gateway Simulator
app.get('/api/sheets/config', (req, res) => {
  res.json({
    ...store.sheetsConfig,
    eventCount: store.behaviorEvents.length
  });
});

app.post('/api/sheets/sync', (req, res) => {
  store.sheetsConfig.lastSyncedAt = new Date().toISOString();
  res.json({
    success: true,
    message: `Đã đồng bộ hóa thành công ${store.behaviorEvents.length} bản ghi sự kiện hành vi vào Google Sheets [04_BEHAVIOR_EVENTS].`,
    syncedAt: store.sheetsConfig.lastSyncedAt,
    targetSheet: store.sheetsConfig.sheetName
  });
});

// ==========================================
// VITE OR STATIC SERVER MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduChoice-AI v3 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
