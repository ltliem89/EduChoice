import { GameSpecification } from '../types';

export const DEFAULT_GAMES: GameSpecification[] = [
  // ==========================================
  // NHÓM 1: SẮP XẾP MỨC ĐỘ ƯU TIÊN (PRIORITIZATION)
  // ==========================================
  {
    gameId: 'game_48_minutes',
    category: 'academic',
    microAction: {
      "id": "act_48m",
      "title": "Dọn sạch bàn học trong 5 phút & ghi ra việc quan trọng nhất tối nay",
      "durationMinutes": 5,
      "instruction": "Cất hết sách vở không liên quan vào kệ, chỉ để đúng 1 cuốn vở bài tập cần làm ngay lên bàn."
},
    title: '48 phút cuối trước giờ nộp bài',
    description: 'Minh chỉ còn 15 phút trước khi hết hạn nộp bài trực tuyến và có 3 việc dồn dập. Minh sẽ chọn làm việc gì trước?',
    ageRange: { min: 11, max: 15 },
    durationMinutes: 3,
    constructs: ['Prioritization', 'ConsequencePrediction', 'Planning'],
    toolkitIds: ['prioritization', 'consequence_prediction', 'reflection'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-10T08:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Nội dung lành mạnh, tình huống đời thường gần gũi với học sinh THCS.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Minh chỉ còn 15 phút trước khi đến giờ nộp bài trực tuyến và có ba nhiệm vụ: Nộp bài Toán chiếm 40% điểm kỳ, dọn bàn học, và trả lời tin nhắn của nhóm bạn rủ chơi game.',
        characterMood: 'stressed',
        timeLimitSeconds: 45,
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Đồng hồ đếm ngược đang trôi nhanh. Minh nên bắt đầu bằng hành động nào để tối ưu hoá thời gian còn lại?',
        characterMood: 'neutral',
        timeLimitSeconds: 30,
        choices: [
          {
            id: 'A',
            label: 'Làm việc dễ nhất: Trả lời tin nhắn nhóm bạn trước',
            consequenceId: 'c_A',
            toolkitHint: 'Trả lời tin nhắn rất dễ nhưng có nguy cơ cuốn vào cuộc trò chuyện kéo dài.',
            constructImpact: { construct: 'Prioritization', delta: -10 }
          },
          {
            id: 'B',
            label: 'Làm việc quan trọng nhất: Kiểm tra và nộp bài Toán 40% điểm',
            consequenceId: 'c_B',
            toolkitHint: 'Áp dụng Eisenhower: Bài toán là việc Vừa Khẩn Cấp Vừa Quan Trọng nhất.',
            constructImpact: { construct: 'Prioritization', delta: 25 }
          },
          {
            id: 'C',
            label: 'Xem điện thoại 5 phút để giảm bớt căng thẳng rồi mới làm',
            consequenceId: 'c_C',
            toolkitHint: '5 phút lướt điện thoại thường kéo theo mất tập trung và hết sạch thời gian.',
            constructImpact: { construct: 'ConsequencePrediction', delta: -15 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Minh trả lời tin nhắn bạn bè, nhưng nhóm bạn tiếp tục chat và tranh luận. Khi nhìn lên đồng hồ, Minh chỉ còn 3 phút, hốt hoảng nộp bài Toán vội vàng bị thiếu trang giải chi tiết!',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Tuyệt vời! Minh dành trọn 10 phút kiểm tra lại từng công thức và bấm nút nộp bài thành công vào phút thứ 12. Tinh thần Minh nhẹ nhõm hẳn, 3 phút còn lại Minh nhắn nhanh cho bạn hẹn sau giờ học.',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Minh mở video ngắn xem "chỉ 5 phút", nhưng các thuật toán mạng xã hội cuốn Minh xem hết video này đến video khác. Tiếng chuông báo hết hạn vang lên, hệ thống khóa bài nộp! Minh nhận điểm 0 oan uổng.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Hộp công cụ tâm lý: "Ma trận Ưu Tiên (Eisenhower Matrix)". Trong bất kỳ tình huống nào chịu áp lực thời gian, hãy luôn phân loại: Việc sống còn (Quan trọng & Khẩn) phải làm NGAY, các việc khác dời lại.',
        toolkitId: 'prioritization',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn thử lại để chọn giải pháp giúp Minh đạt điểm số tối ưu và giữ tâm lý bình tĩnh không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Góc phản tư: Nhìn lại các lựa chọn vừa rồi, theo em điều gì khiến chúng ta hay có xu hướng chọn làm việc dễ hoặc việc giải trí trước dù biết việc học quan trọng hơn?',
        characterMood: 'reflective',
        reflectionQuestion: 'Lựa chọn nào giúp em sử dụng thời gian còn lại hiệu quả hơn và giảm tải áp lực?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Chúc mừng em đã hoàn thành thử thách "48 phút cuối"! Kỹ năng xác định mức độ ưu tiên của em đã được ghi nhận vào Hồ sơ Năng lực Hành vi.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_weekend_trap',
    category: 'lifestyle',
    microAction: {
      "id": "act_weekend",
      "title": "Viết ra giấy 2 việc ưu tiên cho sáng thứ Bảy",
      "durationMinutes": 3,
      "instruction": "Ghi cụ thể giờ hoàn thành: xong bài tập trước 11:00 để buổi chiều thoải mái chơi thể thao."
},
    title: 'Chiếc bẫy ngày Chủ Nhật',
    description: 'Chủ Nhật chỉ có 24 giờ nhưng danh sách gồm: Bài tập nhóm thứ Hai, trận bóng giao hữu, và tập phim yêu thích vừa ra mắt.',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    constructs: ['Prioritization', 'Planning', 'SelfRegulation'],
    toolkitIds: ['prioritization', 'time_management', 'goal_setting'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-11T14:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Rèn luyện khả năng quản lý quỹ thời gian cuối tuần cân bằng giữa giải trí và trách nhiệm.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Sáng Chủ Nhật, Hoàng thức dậy với dự định nghỉ ngơi. Nhưng mở điện thoại ra: Trưởng nhóm nhắc hạn nộp phần tổng hợp lúc 16h chiều, đội bóng xóm gọi ra sân lúc 14h, và bộ phim anime hot vừa cập nhật 5 tập mới.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Hoàng nên sắp xếp thứ tự các hoạt động trong ngày như thế nào để vừa vui vẻ vừa không biến sáng thứ Hai thành thảm họa?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Cày trọn bộ phim trước từ sáng đến trưa, bài tập để tối muộn làm vội',
            consequenceId: 'c_A',
            toolkitHint: 'Dồn việc khó vào đêm muộn khiến chất lượng giảm sút và mất ngủ.',
            constructImpact: { construct: 'Prioritization', delta: -15 }
          },
          {
            id: 'B',
            label: 'Ngồi vào bàn làm dứt điểm bài nhóm từ 8h-11h, chiều đá bóng và tối xem 1 tập phim',
            consequenceId: 'c_B',
            toolkitHint: 'Nguyên lý "Nuốt con ếch trước": Giải quyết việc hóc búa nhất trước để thảnh thơi cả ngày.',
            constructImpact: { construct: 'Prioritization', delta: 25 }
          },
          {
            id: 'C',
            label: 'Đi đá bóng cả ngày cho thoải mái, bài tập nhóm để các bạn trong nhóm gánh hộ',
            consequenceId: 'c_C',
            toolkitHint: 'Đùn đẩy trách nhiệm làm rạn nứt lòng tin của bạn bè trong nhóm.',
            constructImpact: { construct: 'SelfRegulation', delta: -20 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Xem xong 5 tập phim thì đã 15h, Hoàng mỏi mắt nhức đầu. Đêm đó Hoàng ngồi gõ bài nhóm trong tình trạng ngủ gật, tài liệu thiếu sót khiến cả nhóm bị trừ điểm sáng thứ Hai.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Quá xuất sắc! Đúng 11h Hoàng gửi file hoàn chỉnh cho trưởng nhóm. Buổi chiều ra sân đá bóng với tâm lý sảng khoái và tối xem phim không chút âu lo!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Các bạn trong nhóm rất thất vọng vì Hoàng bỏ bê. Sáng thứ Hai, nhóm thống nhất gạch tên Hoàng khỏi danh sách nộp bài và báo cáo giáo viên chủ nhiệm.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp: "Quy tắc 3 Khối thời gian". Buổi sáng não bộ tỉnh táo nhất dành cho việc tư duy khó. Buổi chiều dành cho vận động thể chất. Buổi tối dành cho giải trí nhẹ nhàng.',
        toolkitId: 'prioritization',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn xây dựng lại lịch trình cuối tuần lý tưởng cho Hoàng không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Cuối tuần của em thường diễn ra như thế nào? Em đã bao giờ rơi vào cảnh "Chủ nhật vui vẻ, sáng thứ Hai kinh hoàng" chưa?',
        characterMood: 'reflective',
        reflectionQuestion: 'Làm sao để vừa được chơi thỏa thích vừa hoàn thành 100% bài vở?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Tuyệt vời! Em đã nắm vững bí quyết sắp xếp ưu tiên để tận hưởng ngày nghỉ trọn vẹn.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_allowance_budget',
    category: 'responsibility',
    microAction: {
      "id": "act_budget",
      "title": "Phân chia 3 chiếc lọ ảo hoặc phong bì: Chi tiêu, Tiết kiệm, Chia sẻ",
      "durationMinutes": 5,
      "instruction": "Dành 10-20% tiền tiêu vặt bỏ vào lọ tích lũy cho mục tiêu dài hạn."
},
    title: 'Bài toán ví tiền tiêu vặt',
    description: 'Em có 150.000đ tiền tiết kiệm. Mua sách luyện thi Toán, mua phụ kiện game đang giảm giá, hay góp tiền sinh nhật bạn thân?',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    constructs: ['Prioritization', 'ConsequencePrediction', 'GoalSetting'],
    toolkitIds: ['prioritization', 'consequence_prediction'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-12T10:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Kỹ năng quản lý tài chính cá nhân và cân nhắc giá trị lâu dài cho học sinh.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Nam cầm 150.000đ tiết kiệm trong ví. Cùng lúc đó: Cuốn sách đề thi thử chuyên Toán chỉ còn 1 cuốn (80.000đ), tựa game yêu thích đang khuyến mãi gói trang phục giới hạn (70.000đ), và cuối tuần là sinh nhật bạn thân trong nhóm (cần góp 50.000đ).',
        characterMood: 'reflective',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Tổng số tiền cần là 200.000đ nhưng Nam chỉ có 150.000đ. Nam nên đưa ra quyết định tài chính nào?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Mua ngay gói trang phục game và phần còn lại đi ăn vặt một mình',
            consequenceId: 'c_A',
            toolkitHint: 'Thỏa mãn sở thích tức thời nhưng đánh mất cơ hội học tập và tình cảm bạn bè.',
            constructImpact: { construct: 'Prioritization', delta: -15 }
          },
          {
            id: 'B',
            label: 'Mua sách Toán (80k), góp quà sinh nhật bạn (50k), để dành 20k còn lại vào quỹ tiết kiệm',
            consequenceId: 'c_B',
            toolkitHint: 'Lựa chọn cân bằng: Ưu tiên đầu tư kiến thức tương lai và gắn kết tình bạn đẹp.',
            constructImpact: { construct: 'Prioritization', delta: 25 }
          },
          {
            id: 'C',
            label: 'Mượn tiền bạn bè xung quanh để mua bằng được cả 3 thứ cùng lúc',
            consequenceId: 'c_C',
            toolkitHint: 'Thói quen vay mượn để tiêu xài ngoài khả năng tạo gánh nặng nợ nần cho học sinh.',
            constructImpact: { construct: 'ConsequencePrediction', delta: -20 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Nam chơi trang phục game mới được 2 hôm thì chán. Đến ngày sinh nhật bạn, Nam xấu hổ vì không có quà và bài kiểm tra Toán tiếp theo Nam bị đuối vì thiếu tài liệu ôn tập.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Quyết định trên cả tuyệt vời! Nam ôn trúng nhiều dạng bài Toán hay và bạn thân vô cùng xúc động khi nhận món quà ấm áp từ Nam. Khoản tiết kiệm 20k tiếp tục sinh sôi!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Nam nợ bạn bè 50.000đ và tuần sau phải nhịn ăn sáng để trả nợ trong mệt mỏi. Các bạn cũng cảm thấy e ngại khi Nam hỏi mượn tiền.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp tài chính: "Cần (Needs) vs Muốn (Wants)". Nhu cầu học tập và các mối quan hệ chân thành luôn mang lại giá trị bền vững hơn những ham muốn tức thời ảo trên màn hình.',
        toolkitId: 'prioritization',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn cân nhắc lại các khoản chi tiêu hàng tuần của mình không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Mỗi khi nhìn thấy một món đồ rất muốn mua ngay, em thường làm gì để biết mình thực sự cần nó hay chỉ là cảm xúc nhất thời?',
        characterMood: 'reflective',
        reflectionQuestion: 'Quy tắc 24 giờ chờ đợi trước khi mua sắm có tác dụng như thế nào với em?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã học được cách làm chủ đồng tiền và ưu tiên những giá trị đích thực trong cuộc sống!',
        characterMood: 'happy'
      }
    ]
  },

  // ==========================================
  // NHÓM 2: TỰ ĐIỀU HÒA CẢM XÚC & TỰ CHỦ (SELF-REGULATION)
  // ==========================================
  {
    gameId: 'game_peer_pressure',
    category: 'relationship',
    microAction: {
      "id": "act_refuse",
      "title": "Luyện tập câu từ chối tích cực trước gương",
      "durationMinutes": 3,
      "instruction": "Nói: \"Cảm ơn các bạn rủ mình, nhưng hôm nay mình đã có hẹn với gia đình rồi, hẹn dịp khác nhé!\""
},
    title: 'Áp lực rủ rê từ nhóm bạn',
    description: 'Nhóm bạn thân rủ cúp tiết thể dục để đi uống trà sữa và thách thức nếu không đi sẽ bị coi là lạc lõng. Em chọn thế nào?',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    constructs: ['SelfRegulation', 'Communication', 'ConsequencePrediction'],
    toolkitIds: ['communication', 'self_regulation', 'consequence_prediction'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-11T10:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Kịch bản chuẩn tâm lý lứa tuổi học sinh, rèn luyện kỹ năng từ chối quyết đoán lành mạnh.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Giờ ra chơi, nhóm bạn thân vây quanh An và thì thầm: "Tiết sau thầy dạy thể dục dễ tính lắm, tụi mình lẻn ra cổng sau uống trà sữa đi! Đi đông mới vui, ai không đi là đồ nhát cáy!"',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'An cảm thấy tim đập nhanh, vừa sợ bị thầy ghi sổ đầu bài, vừa sợ các bạn chê cười và tẩy chay. An nên ứng xử thế nào?',
        characterMood: 'stressed',
        choices: [
          {
            id: 'A',
            label: 'Đi theo nhóm để không bị coi là kẻ lạc lõng ngoài lề',
            consequenceId: 'c_A',
            toolkitHint: 'Nhượng bộ sự ép buộc nhất thời có thể tạo tiền lệ vi phạm kỷ luật tiếp theo.',
            constructImpact: { construct: 'SelfRegulation', delta: -15 }
          },
          {
            id: 'B',
            label: 'Từ chối quyết đoán và hẹn dịp khác: "Tiết này mình muốn tập, chiều tan học tụi mình đi nhé!"',
            consequenceId: 'c_B',
            toolkitHint: 'Sử dụng kỹ thuật Giao tiếp quyết đoán: Từ chối hành vi sai nhưng vẫn giữ tình bạn.',
            constructImpact: { construct: 'Communication', delta: 20 }
          },
          {
            id: 'C',
            label: 'Mắng thẳng vào mặt bạn bè là vô kỷ luật rồi chạy đi mách thầy',
            consequenceId: 'c_C',
            toolkitHint: 'Phản ứng công kích trực diện dễ đẩy mâu thuẫn lên đỉnh điểm.',
            constructImpact: { construct: 'Communication', delta: -5 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Vừa ra đến quán trà sữa thì giám thị trường phát hiện. Cả nhóm bị mời phụ huynh và trừ điểm thi đua của lớp. Nhóm bạn còn quay sang đổ lỗi cho nhau.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Nhóm bạn hơi tiếc nuối nhưng thấy An kiên định nên tôn trọng quyết định. Chiều hôm đó cả nhóm cùng đi uống trà sữa vui vẻ và lớp vẫn giữ trọn điểm thi đua!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Nhóm bạn tức giận, cô lập An suốt cả tuần vì cho rằng An thái quá và công kích họ trước mặt mọi người.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Hộp công cụ tâm lý: "Thông điệp Tôi & Ranh giới lành mạnh". Bạn bè thực sự sẽ tôn trọng ranh giới của em khi em bày tỏ một cách chân thành, rõ ràng và kèm giải pháp thay thế hợp lý.',
        toolkitId: 'communication',
        characterMood: 'focused',
        interventionPrompt: 'Hãy thử nghiệm lại cách từ chối khéo léo để bảo vệ nguyên tắc của bản thân mà vẫn giữ được bạn bè.',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Em đã từng gặp áp lực tương tự khi phải làm một việc trái với mong muốn để làm hài lòng người khác chưa? Cảm xúc lúc đó như thế nào?',
        characterMood: 'reflective',
        reflectionQuestion: 'Làm thế nào để phân biệt giữa bạn bè tốt với bạn bè lôi kéo điều tiêu cực?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Bài học đã hoàn thành! Em đã phát triển thêm năng lực Tự điều hòa cảm xúc và Giao tiếp quyết đoán.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_angry_comment',
    category: 'lifestyle',
    microAction: {
      "id": "act_calm_comment",
      "title": "Tạm dừng 60 giây và hít thở sâu trước khi gõ bình luận phản hồi",
      "durationMinutes": 2,
      "instruction": "Tự hỏi: \"Bình luận này có giải quyết vấn đề không hay chỉ làm mọi chuyện căng thẳng hơn?\""
},
    title: 'Cơn sốt bình luận trên mạng',
    description: 'Một bạn trong lớp đăng bài bóng gió chê bai em trên mạng xã hội. Lồng ngực em nóng bừng lên. Em sẽ đáp trả thế nào?',
    ageRange: { min: 12, max: 17 },
    durationMinutes: 3,
    constructs: ['SelfRegulation', 'ConsequencePrediction', 'Reflection'],
    toolkitIds: ['self_regulation', 'cognitive_reframing'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-12T16:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Rèn luyện kỹ năng an toàn số và quản lý cơn giận trước bắt nạt trực tuyến.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Tối thứ Bảy, Mai lướt mạng xã hội và thấy một bài đăng không nêu tên nhưng ai cũng biết đang nhắm vào Mai với những lời lẽ giễu cợt, bên dưới có nhiều bạn thả biểu cảm cười cợt. Máu Mai dồn lên mặt, tay run run vì tức giận.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Cơn thịnh nộ thôi thúc Mai gõ một tràng chửi bới đáp trả ngay lập tức. Mai nên làm gì trong giây phút này?',
        characterMood: 'stressed',
        choices: [
          {
            id: 'A',
            label: 'Đăng ngay bài phản pháo gay gắt, bóc phốt lại tật xấu của bạn kia cho bõ tức',
            consequenceId: 'c_A',
            toolkitHint: 'Đấu tố trên mạng chỉ làm leo thang cuộc chiến và để lại dấu chân số tiêu cực.',
            constructImpact: { construct: 'SelfRegulation', delta: -20 }
          },
          {
            id: 'B',
            label: 'Đặt điện thoại xuống, thực hiện nhịp thở 4-4-4, chụp màn hình lưu bằng chứng rồi trao đổi trực tiếp vào thứ Hai',
            consequenceId: 'c_B',
            toolkitHint: 'Kỹ thuật "Khoảng dừng 5 phút": Không bao giờ đưa ra quyết định khi cảm xúc đang ở đỉnh điểm.',
            constructImpact: { construct: 'SelfRegulation', delta: 25 }
          },
          {
            id: 'C',
            label: 'Kêu gọi nhóm bạn thân của mình vào bài viết spam bình luận chửi bới tập thể',
            consequenceId: 'c_C',
            toolkitHint: 'Bắt nạt tập thể trực tuyến vi phạm quy tắc ứng xử học đường và luật an ninh mạng.',
            constructImpact: { construct: 'ConsequencePrediction', delta: -15 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Bài viết của Mai làm bùng nổ cuộc khẩu chiến giữa hai phe. Sáng thứ Hai, cả hai bị ban giám hiệu mời lên phòng kỷ luật vì phát ngôn thiếu chuẩn mực trên không gian mạng.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Sau 15 phút hít thở và đi dạo, Mai lấy lại bình tĩnh. Thứ Hai, Mai gặp riêng bạn và nói rõ sự việc với sự hiện diện của cán bộ tâm lý trường. Bạn kia nhận sai, xóa bài và xin lỗi Mai chân thành.',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Vụ việc trở thành scandal lớn trong khối, giáo viên chủ nhiệm và phụ huynh can thiệp. Tình bạn trong lớp bị chia rẽ nặng nề.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Hộp công cụ tâm lý: "Khoảng dừng 4-4-4 & Tái cấu trúc nhận thức". Lời nói tức giận trên mạng giống như chiếc đinh đóng vào hàng rào: Dù nhổ ra thì vết lỗ vẫn còn.',
        toolkitId: 'self_regulation',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn trải nghiệm nhịp thở 4-4-4 để cảm nhận cơ thể bình tâm trở lại không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Khi gặp điều bất bình trên mạng, làm sao em phân biệt giữa việc "bảo vệ bản thân đúng cách" và "sa đà vào cuộc cãi vã vô bổ"?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao hít thở sâu 3 nhịp có thể cứu chúng ta khỏi những sai lầm đáng tiếc?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã rèn luyện thành công bản lĩnh tự chủ cảm xúc — một siêu năng lực quý giá trong kỷ nguyên số!',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_gaming_timer',
    category: 'lifestyle',
    microAction: {
      "id": "act_game_alarm",
      "title": "Cài chuông báo hẹn giờ tự tắt thiết bị trước khi bắt đầu chơi",
      "durationMinutes": 2,
      "instruction": "Đặt đồng hồ cách chỗ ngồi 3 mét để bắt buộc phải đứng dậy khi chuông reo."
},
    title: 'Tiếng chuông lúc 22 giờ',
    description: 'Trận game đang đến hồi gay cấn thì chuông hẹn giờ đi ngủ reo lên. Đồng đội nài nỉ: "Thêm 1 ván nữa thôi mà!". Em sẽ làm gì?',
    ageRange: { min: 11, max: 15 },
    durationMinutes: 3,
    constructs: ['SelfRegulation', 'ConsequencePrediction', 'GoalSetting'],
    toolkitIds: ['self_regulation', 'consequence_prediction'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T08:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Giáo dục thói quen vệ sinh giấc ngủ và khả năng dứt khoát với màn hình điện tử.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Đúng 22h00, chuông báo quy ước gia đình vang lên: Đến giờ tắt máy đi ngủ để chuẩn bị cho buổi học sáng mai. Trận game vừa kết thúc với một trận thắng giòn giã. Đồng đội trong tai nghe hò reo: "Đang vào cầu, chơi thêm ván nữa lên hạng luôn An ơi!"',
        characterMood: 'focused',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Bộ não của An đang tràn ngập dopamine hào hứng. An nên hành động thế nào?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Chơi thêm 1 ván nữa, tự nhủ chắc chỉ mất thêm 15 phút thôi',
            consequenceId: 'c_A',
            toolkitHint: 'Chiếc bẫy "Một ván nữa thôi" thường dẫn đến chơi thêm 1-2 tiếng mất kiểm soát.',
            constructImpact: { construct: 'SelfRegulation', delta: -15 }
          },
          {
            id: 'B',
            label: 'Bật micro thông báo dứt khoát: "Hôm nay đến đây thôi nhé, hẹn mai gặp lại!", thoát game và sạc máy ngoài phòng khách',
            consequenceId: 'c_B',
            toolkitHint: 'Sự dứt khoát và cất thiết bị xa giường ngủ là thói quen của người làm chủ bản thân.',
            constructImpact: { construct: 'SelfRegulation', delta: 25 }
          },
          {
            id: 'C',
            label: 'Tắt màn hình máy tính nhưng mang điện thoại lên giường nằm lướt tiếp trong bóng tối',
            consequenceId: 'c_C',
            toolkitHint: 'Ánh sáng xanh trong bóng tối ức chế hormone melatonin, gây mất ngủ và hại mắt nghiêm trọng.',
            constructImpact: { construct: 'ConsequencePrediction', delta: -15 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Ván sau bị thua, cả nhóm bực bội lại chơi thêm ván gỡ. Đến khi nhìn lên đồng hồ thì đã 0h30! Sáng hôm sau An ngủ quên, đi học muộn và gật gà gật gù suốt tiết 1.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Đồng đội vui vẻ chúc An ngủ ngon. An có một giấc ngủ sâu trọn vẹn 8 tiếng, thức dậy sảng khoái với tinh thần tràn đầy năng lượng cho ngày mới!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Nằm lướt mạng đến 2h sáng, mắt An cay xè và sáng hôm sau dậy với quầng thâm mắt cùng cơn đau đầu mệt mỏi.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp sinh học: "Quy tắc 30 phút ngắt kết nối". Tắt màn hình trước khi ngủ 30 phút giúp não bộ phục hồi tế bào thần kinh và củng cố trí nhớ cho bài học ban ngày.',
        toolkitId: 'self_regulation',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn thiết lập nghi thức đi ngủ chất lượng cao cho bản thân không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Điều gì khó nhất khi em phải dừng một trò chơi đang vui để đi ngủ đúng giờ? Em sẽ làm gì để khắc phục điều đó?',
        characterMood: 'reflective',
        reflectionQuestion: 'Làm thế nào để bảo vệ giấc ngủ mà vẫn duy trì tình bạn với đồng đội chơi game?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã thể hiện khả năng kỷ luật tự thân đáng ngưỡng mộ! Năng lực Tự chủ của em tăng thêm 25 điểm.',
        characterMood: 'happy'
      }
    ]
  },

  // ==========================================
  // NHÓM 3: LẬP KẾ HOẠCH & QUẢN LÝ THỜI GIAN (PLANNING)
  // ==========================================
  {
    gameId: 'game_exam_crunch',
    category: 'academic',
    microAction: {
      "id": "act_pomodoro",
      "title": "Thử nghiệm 1 hiệp Pomodoro: 20 phút tập trung cao độ + 5 phút nghỉ",
      "durationMinutes": 5,
      "instruction": "Không mở tab trình duyệt khác, để điện thoại ở chế độ im lặng."
},
    title: 'Kế hoạch tuần ôn thi học kỳ',
    description: 'Còn đúng 3 ngày trước kỳ thi chuyển cấp nhưng khối lượng đề cương quá lớn. Làm sao để lập kế hoạch ôn tập hiệu quả mà không bị kiệt sức?',
    ageRange: { min: 12, max: 17 },
    durationMinutes: 4,
    constructs: ['Planning', 'AttentionControl', 'GoalSetting'],
    toolkitIds: ['planning', 'problem_decomposition'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-12T09:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Phương pháp khoa học giáo dục thực chứng, hỗ trợ tâm lý thi cử.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Huy nhìn đống đề cương dày cộm gồm Toán, Văn, Anh. Mắt mỏi, đầu óc quay cuồng và Huy bắt đầu cảm thấy lo sợ mình sẽ không kịp nhớ bất kỳ thứ gì.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Huy nên bắt đầu chiến lược ôn tập 3 ngày này như thế nào?',
        characterMood: 'focused',
        choices: [
          {
            id: 'A',
            label: 'Thức trắng đêm học dồn dập, uống nước tăng lực để nhồi nhét tối đa',
            consequenceId: 'c_A',
            toolkitHint: 'Thức đêm làm giảm 40% khả năng ghi nhớ dài hạn của não bộ.',
            constructImpact: { construct: 'Planning', delta: -20 }
          },
          {
            id: 'B',
            label: 'Chia nhỏ đề cương thành các phiên Pomodoro 25 phút kèm sơ đồ tư duy',
            consequenceId: 'c_B',
            toolkitHint: 'Áp dụng Chia nhỏ bài toán và Pomodoro giúp não bộ tiếp thu bền vững.',
            constructImpact: { construct: 'Planning', delta: 25 }
          },
          {
            id: 'C',
            label: 'Cầu may: Chỉ học tủ 2 bài mà Huy thích nhất',
            consequenceId: 'c_C',
            toolkitHint: 'Học tủ mang tính rủi ro cao và không rèn luyện tư duy tổng quan.',
            constructImpact: { construct: 'GoalSetting', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Sau một đêm thức trắng, hôm sau Huy vào phòng thi với cơn đau đầu dữ dội, không thể tập trung đọc đề và quên sạch các công thức quan trọng.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Nhờ các nhịp nghỉ xen kẽ và sơ đồ tư duy rõ ràng, Huy ghi nhớ các ý chính rất nhanh. Huy ngủ đủ 7 tiếng và hoàn thành bài thi với tâm thế tự tin!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Đề thi không vào trúng phần học tủ. Huy ngồi bế tắc và hối tiếc vì đã không phân bố thời gian hợp lý.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Hộp công cụ tâm lý: "Chia nhỏ nhiệm vụ & Nhịp sinh học". Não bộ ghi nhớ tốt nhất khi học theo từng khối kiến thức ngắn và có giấc ngủ sâu để củng cố ký ức.',
        toolkitId: 'problem_decomposition',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn xây dựng lại thời khóa biểu thông minh cho Huy không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Em thường tự quản lý thời gian ôn bài của mình như thế nào khi kỳ thi đến gần?',
        characterMood: 'reflective',
        reflectionQuestion: 'Thói quen nào giúp em duy trì năng lượng cao nhất khi học tập?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Hoàn thành tuyệt vời! Kỹ năng Lập kế hoạch và Quản lý thời gian của em đã được nâng cấp.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_stem_expo',
    category: 'creativity',
    microAction: {
      "id": "act_kanban",
      "title": "Dán 3 mẩu giấy nhớ lên bàn: Chưa làm - Đang làm - Đã xong",
      "durationMinutes": 5,
      "instruction": "Di chuyển các đầu việc của dự án vào đúng ô để thấy rõ tiến độ từng ngày."
},
    title: 'Dự án Ngày hội STEM 10 ngày',
    description: 'Nhóm của Lan được chọn tham gia Ngày hội Khoa học trường. Làm sao lên kế hoạch từ ý tưởng đến mô hình thực tế mà không bị chậm tiến độ?',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 4,
    constructs: ['Planning', 'ProblemSolving', 'Communication'],
    toolkitIds: ['planning', 'problem_decomposition'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T10:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Phương pháp quản lý dự án học tập thực hành (PBL).',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Lan được giao làm nhóm trưởng dự án chế tạo mô hình lọc nước mini. Nhóm có 4 bạn, thời gian còn đúng 10 ngày. Nếu không có kế hoạch rõ ràng, cả nhóm sẽ rơi vào cảnh "nước đến chân mới nhảy".',
        characterMood: 'focused',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Lan nên bắt đầu buổi họp đầu tiên với các bạn như thế nào?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Cứ để mọi người tự do tìm nguyên liệu, gần ngày nộp mới gom lại làm',
            consequenceId: 'c_A',
            toolkitHint: 'Thiếu mốc kiểm tra trung gian (milestones) luôn dẫn đến vỡ trận.',
            constructImpact: { construct: 'Planning', delta: -15 }
          },
          {
            id: 'B',
            label: 'Lập bảng phân công Gantt đơn giản: Chia 3 giai đoạn (Tìm vật liệu, Thử nghiệm, Hoàn thiện poster) và họp kiểm tra mỗi 3 ngày',
            consequenceId: 'c_B',
            toolkitHint: 'Chia nhỏ dự án và phân công theo sở trường giúp mọi thành viên đều chủ động.',
            constructImpact: { construct: 'Planning', delta: 25 }
          },
          {
            id: 'C',
            label: 'Lan tự nhận làm hết mọi việc vì sợ các bạn làm hỏng',
            consequenceId: 'c_C',
            toolkitHint: 'Ôm đồm công việc làm trưởng nhóm kiệt sức và tước đoạt cơ hội học hỏi của thành viên.',
            constructImpact: { construct: 'Communication', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Đến ngày thứ 8, bạn này tưởng bạn kia đã chuẩn bị cát thạch anh và than hoạt tính. Cả nhóm cuống cuồng đi tìm mua, mô hình làm ẩu bị rò rỉ nước tại ngày hội.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Kế hoạch vận hành trơn tru! Ngày thứ 7 mô hình đã thử nghiệm thành công. Ngày hội diễn ra rực rỡ và gian hàng của nhóm Lan đạt giải Nhất!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Lan thức nhiều đêm làm một mình, mệt mỏi và cáu gắt. Các bạn cảm thấy mình bị xem thường và không ai hào hứng đến cổ vũ dự án.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp làm việc nhóm: "Kế hoạch minh bạch & Trách nhiệm cá nhân". Một kế hoạch tốt chỉ ra rõ ràng: Ai làm gì, Khi nào xong và Tiêu chuẩn đánh giá là gì.',
        toolkitId: 'planning',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn xây dựng bảng tiến độ dự án 3 bước cùng Lan không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Khi làm việc nhóm, điều gì thường khiến các bạn bị trễ hẹn? Làm thế nào để nhắc nhở nhau nhẹ nhàng mà hiệu quả?',
        characterMood: 'reflective',
        reflectionQuestion: 'Vai trò của người nhóm trưởng là làm hết việc hay giúp cả đội cùng tiến bộ?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Tuyệt đỉnh! Kỹ năng Lãnh đạo và Lập kế hoạch dự án của em đã đạt mốc mới.',
        characterMood: 'happy'
      }
    ]
  },

  // ==========================================
  // NHÓM 4: GIẢI QUYẾT VẤN ĐỀ & THÍCH ỨNG (PROBLEM SOLVING & ADAPTABILITY)
  // ==========================================
  {
    gameId: 'game_presentation_glitch',
    category: 'creativity',
    microAction: {
      "id": "act_plan_b",
      "title": "Ghi ra thẻ nhớ tay 3 gạch đầu dòng ý chính dự phòng khi mất slide",
      "durationMinutes": 5,
      "instruction": "Tập nói trôi chảy dựa vào từ khóa chính mà không cần nhìn vào màn hình."
},
    title: 'Sự cố trước giờ thuyết trình',
    description: 'Chỉ còn 3 phút trước khi đến lượt nhóm em lên bảng thì chiếc USB chứa file trình chiếu bị lỗi không đọc được. Em xử trí ra sao?',
    ageRange: { min: 11, max: 16 },
    durationMinutes: 3,
    constructs: ['ProblemSolving', 'Adaptability', 'SelfRegulation'],
    toolkitIds: ['problem_decomposition', 'self_regulation'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T11:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Rèn luyện khả năng ứng biến linh hoạt và giữ bình tĩnh trước sự cố bất ngờ.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Cả lớp đang háo hức chờ nhóm Đức lên thuyết trình môn Sinh học. Đức cắm USB vào máy chiếu thì màn hình hiện lên dòng chữ đỏ: "Drive corrupted, cannot read data". Các bạn trong nhóm bắt đầu hoảng loạn, toát mồ hôi.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Cả lớp bắt đầu xì xào, cô giáo đang nhìn về phía nhóm. Đức sẽ chọn phương án ứng phó nào?',
        characterMood: 'stressed',
        choices: [
          {
            id: 'A',
            label: 'Đổ lỗi cho bạn phụ trách USB ngay trước lớp và xin cô cho nhóm hủy phần thi',
            consequenceId: 'c_A',
            toolkitHint: 'Chỉ trích và bỏ cuộc thể hiện sự non nớt và làm mất đoàn kết nhóm.',
            constructImpact: { construct: 'Adaptability', delta: -20 }
          },
          {
            id: 'B',
            label: 'Hít sâu 1 hơi, kích hoạt Kế hoạch B: Mở bản ghi chú trên giấy, dùng bảng đen vẽ sơ đồ tóm tắt và chia sẻ trực tiếp',
            consequenceId: 'c_B',
            toolkitHint: 'Linh hoạt thích ứng: Bản chất thuyết trình là truyền đạt thông tin, không phụ thuộc tuyệt đối vào máy móc.',
            constructImpact: { construct: 'Adaptability', delta: 25 }
          },
          {
            id: 'C',
            label: 'Ngồi cắm rút USB liên tục suốt 10 phút với hy vọng máy tính sẽ tự nhận',
            consequenceId: 'c_C',
            toolkitHint: 'Lặp đi lặp lại một hành động vô nghĩa làm lãng phí thời gian quý báu của cả lớp.',
            constructImpact: { construct: 'ProblemSolving', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Không khí lớp học chùng xuống, bạn phụ trách USB bật khóc vì xấu hổ. Cô giáo chấm nhóm điểm thấp vì thiếu kỹ năng xử lý tình huống.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Cả lớp bất ngờ và thích thú khi Đức cùng các bạn bước lên bảng, tự tin phác họa sơ đồ bằng phấn màu và trình bày mạch lạc. Cô giáo khen ngợi sự bản lĩnh và chấm điểm 9.5!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Hết thời gian dành cho nhóm mà slide vẫn không mở được. Nhóm đành phải dời sang tuần sau với tâm lý ấm ức.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp thích ứng: "Tư duy Kế hoạch B (Fallback Thinking)". Luôn chuẩn bị ít nhất một phương án dự phòng cho những việc quan trọng: Bản in nháp, gửi email lưu trữ đám mây, hoặc ghi chép tay.',
        toolkitId: 'problem_decomposition',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn xây dựng cẩm nang ứng phó sự cố công nghệ cho mình không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Khi kế hoạch hoàn hảo của em đột ngột bị phá sản bởi một yếu tố bất khả kháng, phản ứng đầu tiên của em thường là gì?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao người linh hoạt luôn tìm thấy cơ hội tỏa sáng ngay trong chính sự cố?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Chúc mừng em! Em đã mở khóa huy hiệu "Nhà Ứng Biến Tài Tình" với năng lực Thích ứng xuất sắc!',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_teammate_dropped',
    category: 'responsibility',
    microAction: {
      "id": "act_team_sync",
      "title": "Nhắn 1 tin hỏi thăm và đề xuất giải pháp thay vì chỉ trích bạn",
      "durationMinutes": 4,
      "instruction": "Nói: \"Cậu có đang gặp khó khăn gì không? Bọn mình có thể hỗ trợ phần này giúp cậu\"."
},
    title: 'Đồng đội đột ngột xin rút',
    description: 'Chỉ còn 1 ngày trước khi triển lãm dự án, bạn vẽ tranh minh họa chính bị ốm sốt không thể làm tiếp. Làm sao xoay sở?',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    constructs: ['ProblemSolving', 'Adaptability', 'HelpSeeking'],
    toolkitIds: ['problem_decomposition', 'help_seeking'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T12:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Kỹ năng thấu cảm và giải quyết khó khăn linh hoạt trong tập thể.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Tối thứ Năm, nhóm nhận được tin nhắn từ Thảo: "Các bạn ơi, mình bị sốt xuất huyết phải vào viện truyền dịch, không thể hoàn thành 3 bức vẽ poster được nữa, mình xin lỗi nhiều lắm!". Ngày mai là hạn chót nộp bài.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Nhóm đang đứng trước bờ vực thiếu sản phẩm. Là thành viên trong nhóm, em sẽ đề xuất gì?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Nhắn tin trách Thảo thiếu trách nhiệm vì để sát ngày mới ốm',
            consequenceId: 'c_A',
            toolkitHint: 'Thiếu thấu cảm làm tổn thương người ốm và không giúp giải quyết được vấn đề.',
            constructImpact: { construct: 'ProblemSolving', delta: -15 }
          },
          {
            id: 'B',
            label: 'Động viên Thảo an tâm điều trị, cùng các bạn còn lại họp nhanh: Chuyển tranh vẽ tay sang in ảnh chụp tư liệu và cắt dán ghép lại',
            consequenceId: 'c_B',
            toolkitHint: 'Thấu cảm nhân văn kết hợp tái cấu trúc giải pháp (Problem Reframing).',
            constructImpact: { construct: 'ProblemSolving', delta: 25 }
          },
          {
            id: 'C',
            label: 'Mỗi người tự nộp đơn xin cô giáo cho nộp muộn mà không bàn với nhau',
            consequenceId: 'c_C',
            toolkitHint: 'Hành động đơn lẻ phá vỡ tính thống nhất của nhóm.',
            constructImpact: { construct: 'HelpSeeking', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Thảo khóc nức nở và cảm thấy tủi thân. Nhóm rạn nứt sâu sắc và vẫn không có poster nộp vào sáng hôm sau.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Cả nhóm chung tay mỗi người in ảnh, cắt dán trang trí. Poster theo phong cách ảnh ghép báo chí trông cực kỳ sáng tạo! Khi Thảo khỏe lại, Thảo vô cùng biết ơn những người đồng đội tuyệt vời.',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Cô giáo nhận 3 lá đơn khác nhau từ 3 thành viên, đánh giá nhóm thiếu khả năng gắn kết và kỹ năng giải quyết khủng hoảng.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp giải quyết vấn đề: "Tập trung vào giải pháp, không tìm người đổ lỗi". Khi khó khăn ập đến, câu hỏi đầu tiên luôn là: "Bây giờ chúng ta có thể làm gì tốt nhất với nguồn lực hiện có?".',
        toolkitId: 'problem_decomposition',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn thực hành phân chia lại công việc khẩn cấp trong nhóm không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Khi một bạn trong nhóm gặp biến cố cá nhân, em thường ứng xử ra sao giữa việc hoàn thành bài tập và giữ gìn tình bạn?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao thấu cảm là nền tảng của một đội ngũ vững mạnh?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã xuất sắc thể hiện lòng thấu cảm và tư duy giải quyết vấn đề sáng tạo!',
        characterMood: 'happy'
      }
    ]
  },

  // ==========================================
  // NHÓM 5: GIAO TIẾP QUYẾT ĐOÁN & TÌM KIẾM TRỢ GIÚP (COMMUNICATION & HELP-SEEKING)
  // ==========================================
  {
    gameId: 'game_ask_teacher',
    category: 'academic',
    microAction: {
      "id": "act_ask_prep",
      "title": "Ghi sẵn 1 câu hỏi thắc mắc vào lề vở trước khi đến lớp ngày mai",
      "durationMinutes": 3,
      "instruction": "Chỉ rõ: \"Thưa cô, em chưa hiểu rõ cách áp dụng công thức ở dòng số 3 này ạ\"."
},
    title: 'Phá vỡ sự im lặng trong lớp',
    description: 'Em đã mất gốc phần kiến thức Hóa học suốt 2 tuần nhưng sợ bị bạn bè cười nên không dám hỏi thầy cô. Em sẽ làm gì?',
    ageRange: { min: 12, max: 16 },
    durationMinutes: 3,
    constructs: ['HelpSeeking', 'Communication', 'SelfRegulation'],
    toolkitIds: ['help_seeking', 'assertive_communication'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T13:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Khuyến khích học sinh vượt qua tâm lý sợ sai và chủ động tìm kiếm sự giúp đỡ học tập.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Tuấn ngồi cắn bút nhìn bài toán cân bằng phương trình oxy hóa khử trên bảng. Tuấn hoàn toàn không hiểu gì suốt 2 tuần qua, nhưng nhìn quanh thấy các bạn dường như đều hiểu bài. Tuấn sợ giơ tay sẽ bị gắn mác là "học sinh yếu kém".',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Thầy giáo hỏi: "Có bạn nào chưa rõ phần này cần thầy giảng lại không?". Tuấn nên làm gì?',
        characterMood: 'stressed',
        choices: [
          {
            id: 'A',
            label: 'Cúi gằm mặt xuống giả vờ đang chép bài, giấu dốt để không bị chú ý',
            consequenceId: 'c_A',
            toolkitHint: 'Giấu dốt làm lỗ hổng kiến thức ngày càng phình to, dẫn đến mất gốc hoàn toàn.',
            constructImpact: { construct: 'HelpSeeking', delta: -20 }
          },
          {
            id: 'B',
            label: 'Mạnh dạn giơ tay hoặc đợi giờ ra chơi lên bàn giáo viên hỏi riêng: "Thưa thầy, em chưa hiểu rõ bước xác định số oxy hóa, nhờ thầy hướng dẫn thêm ạ"',
            consequenceId: 'c_B',
            toolkitHint: 'Tìm kiếm sự trợ giúp đúng lúc là dấu hiệu của người dũng cảm và ham học hỏi.',
            constructImpact: { construct: 'HelpSeeking', delta: 25 }
          },
          {
            id: 'C',
            label: 'Lên mạng tìm giải bài tập chép nguyên xi vào vở mà không cần hiểu bản chất',
            consequenceId: 'c_C',
            toolkitHint: 'Chép lời giải sẵn chỉ là giải pháp đối phó, vào phòng thi sẽ bất lực.',
            constructImpact: { construct: 'HelpSeeking', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Tuấn im lặng suốt học kỳ. Đến bài kiểm tra 1 tiết, Tuấn nhận điểm 2 vì không làm được bất kỳ câu nào liên quan đến phương trình oxy hóa khử.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Thầy giáo mỉm cười khen Tuấn có tinh thần học hỏi. Thầy giảng lại bằng một mẹo ghi nhớ cực kỳ dễ hiểu chỉ trong 5 phút. Vài bạn khác cũng thở phào vì chính các bạn ấy cũng chưa hiểu!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Vở bài tập của Tuấn điểm 10 nhưng khi cô gọi lên bảng làm bài tương tự, Tuấn đứng im như tượng và bị phê bình vì thiếu trung thực.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp học tập: "Hỏi một lần chỉ dốt một lúc, không hỏi sẽ dốt cả đời". Thầy cô luôn trân trọng học sinh dám nói thật về điểm yếu của mình để cùng tìm cách bù đắp.',
        toolkitId: 'help_seeking',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn luyện tập câu mở đầu để hỏi bài thầy cô và bạn bè tự tin hơn không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Điều gì từng khiến em ngại đặt câu hỏi trong lớp học? Làm sao để vượt qua cảm giác e dè đó?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao những học sinh thành công nhất luôn là những người biết tìm kiếm sự trợ giúp đúng lúc?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Hoan hô em! Kỹ năng Chủ động tìm kiếm trợ giúp (Help-Seeking) của em đã đạt bước tiến lớn.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_borrow_boundary',
    category: 'relationship',
    microAction: {
      "id": "act_boundary",
      "title": "Quy ước lịch sự: Nhắc bạn nhẹ nhàng về thời hạn trả sách hoặc đồ dùng",
      "durationMinutes": 3,
      "instruction": "Nói lịch sự: \"Hôm nay mình cần dùng cuốn sách đó để làm bài tập, mai bạn mang trả mình nhé!\"."
},
    title: 'Bảo vệ ranh giới đồ dùng cá nhân',
    description: 'Bạn cùng bàn liên tục mượn bút và máy tính nhưng làm mất nắp, bấm hỏng và không bao giờ tự trả. Nói thế nào cho khéo?',
    ageRange: { min: 11, max: 15 },
    durationMinutes: 3,
    constructs: ['Communication', 'SelfRegulation', 'ConsequencePrediction'],
    toolkitIds: ['assertive_communication', 'communication'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T14:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Rèn luyện kỹ năng thiết lập ranh giới tôn trọng lẫn nhau trong học đường.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Nam là bạn ngồi cạnh Hà. Nam có thói quen tiện tay lấy máy tính casio và bộ bút màu của Hà dùng mà không hỏi, dùng xong vứt bừa bãi làm gãy ngòi bút. Hôm nay đến giờ kiểm tra, Hà mở hộp bút thì thấy máy tính lại đang nằm bên bàn của Nam.',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Hà cảm thấy rất bực mình nhưng sợ nói ra sẽ bị coi là keo kiệt, ích kỷ. Hà nên xử lý thế nào?',
        characterMood: 'neutral',
        choices: [
          {
            id: 'A',
            label: 'Nuốt giận vào trong, chịu khó đi mượn bạn khác để không làm mất lòng Nam',
            consequenceId: 'c_A',
            toolkitHint: 'Im lặng cam chịu khiến đối phương ngầm hiểu rằng hành vi của họ được chấp nhận.',
            constructImpact: { construct: 'Communication', delta: -15 }
          },
          {
            id: 'B',
            label: 'Sử dụng Thông điệp Tôi: "Nam ơi, khi bạn lấy máy tính của mình mà không hỏi, mình cảm thấy rất bị động trong giờ kiểm tra. Từ giờ nếu cần, bạn hỏi mình trước và dùng xong trả lại vị trí cũ giúp mình nhé"',
            consequenceId: 'c_B',
            toolkitHint: 'Giao tiếp quyết đoán: Rõ ràng, bình tĩnh, tập trung vào hành vi và cảm xúc, không công kích nhân phẩm.',
            constructImpact: { construct: 'Communication', delta: 25 }
          },
          {
            id: 'C',
            label: 'Giật mạnh máy tính lại rồi la lớn cho cả lớp cùng nghe: "Đồ ăn trộm đồ mặt dày!"',
            consequenceId: 'c_C',
            toolkitHint: 'Xúc phạm đối phương đẩy sự việc thành cãi vã, xúc phạm danh dự lẫn nhau.',
            constructImpact: { construct: 'SelfRegulation', delta: -20 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Nam tiếp tục thói quen vô ý tứ. Cuối học kỳ, chiếc máy tính đắt tiền của Hà bị hỏng màn hình và Hà luôn cảm thấy ức chế mỗi khi ngồi cạnh Nam.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Nam thoáng đỏ mặt nhận ra sự vô tâm của mình, liền gửi lại máy tính và xin lỗi Hà. Từ hôm đó, Nam luôn hỏi mượn lịch sự và giữ gìn cẩn thận đồ dùng của Hà.',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Nam và Hà lao vào cãi nhau gay gắt. Giáo viên nhắc nhở cả hai và đổi chỗ ngồi. Tình bạn tan vỡ trong tiếc nuối.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp giao tiếp: "Công thức Thông Điệp Tôi (I-Message)". Khi bạn [hành vi]... tôi cảm thấy [cảm xúc]... vì [lý do]... Tôi đề xuất [giải pháp tôn trọng cả hai].',
        toolkitId: 'assertive_communication',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn thực hành ghép câu Thông điệp Tôi để giải quyết các mâu thuẫn đời thường không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Tại sao việc nói lên cảm xúc của mình một cách bình tĩnh lại hiệu quả hơn nhiều so với việc im lặng hoặc la hét?',
        characterMood: 'reflective',
        reflectionQuestion: 'Làm thế nào để vừa là một người bạn tốt bụng vừa biết bảo vệ quyền lợi chính đáng của mình?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã thành thạo kỹ năng Giao tiếp quyết đoán — chìa khóa của những mối quan hệ bền vững!',
        characterMood: 'happy'
      }
    ]
  },

  // ==========================================
  // NHÓM 6: THIẾT LẬP MỤC TIÊU & PHẢN TƯ (GOAL SETTING & REFLECTION)
  // ==========================================
  {
    gameId: 'game_smart_reading',
    category: 'academic',
    microAction: {
      "id": "act_reading_summary",
      "title": "Đọc 5 trang sách và tóm tắt lại 1 bài học tâm đắc nhất bằng 2 câu",
      "durationMinutes": 7,
      "instruction": "Ghi chú vào một mẩu giấy kẹp sách để ghi nhớ lâu hơn."
},
    title: 'Thử thách 21 ngày đọc sách',
    description: 'Đầu năm học, em quyết tâm đọc hết 10 cuốn sách dày cộp nhưng chỉ sau 3 ngày đã chán nản bỏ cuộc. Làm sao đặt mục tiêu thông minh?',
    ageRange: { min: 11, max: 16 },
    durationMinutes: 3,
    constructs: ['GoalSetting', 'Reflection', 'Planning'],
    toolkitIds: ['goal_setting', 'reflection'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T15:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Phương pháp đặt mục tiêu SMART và xây dựng thói quen vi mô (Atomic Habits).',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Lan đặt mục tiêu năm học mới: "Mỗi ngày phải đọc 50 trang sách văn học kinh điển!". Hai ngày đầu Lan gồng mình đọc, đến ngày thứ 3 cuốn sách dày cộm nằm im lìm trên kệ, Lan thấy nản và tự dằn vặt: "Chắc mình không có khiếu đọc sách!".',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Lan nên điều chỉnh lại chiến lược xây dựng thói quen đọc sách của mình như thế nào?',
        characterMood: 'reflective',
        choices: [
          {
            id: 'A',
            label: 'Tự phạt bản thân bằng cách ép phải đọc 100 trang vào ngày thứ 4 để bù lại',
            consequenceId: 'c_A',
            toolkitHint: 'Phạt ép bản thân quá mức càng tạo ra sự sợ hãi và chán ghét việc đọc.',
            constructImpact: { construct: 'GoalSetting', delta: -15 }
          },
          {
            id: 'B',
            label: 'Áp dụng Thói quen vi mô (Micro-habits): Bắt đầu chỉ với 5 trang/ngày vào đúng 20h30 sau khi tắm xong, kiên trì trong 21 ngày',
            consequenceId: 'c_B',
            toolkitHint: 'Mục tiêu SMART: Cụ thể, vừa sức, có mốc thời gian rõ ràng giúp não bộ dễ hình thành thói quen bền vững.',
            constructImpact: { construct: 'GoalSetting', delta: 25 }
          },
          {
            id: 'C',
            label: 'Bỏ cuộc luôn, tự kết luận là mình chỉ hợp xem video ngắn trên mạng',
            consequenceId: 'c_C',
            toolkitHint: 'Tư duy cố định (Fixed Mindset) cản trở sự phát triển tiềm năng cá nhân.',
            constructImpact: { construct: 'Reflection', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Lan đọc trong trạng thái mệt mỏi, mắt lướt qua con chữ mà không đọng lại được gì. Sau ngày thứ 4, Lan từ bỏ hoàn toàn thói quen đọc sách suốt cả năm.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Mỗi ngày 5 trang nhẹ như một làn gió! Dần dần Lan thấy cuốn hút và tự động đọc 10-15 trang mà không hề bị gượng ép. Sau 1 tháng, Lan hoàn thành trọn vẹn 2 cuốn sách đầu đời!',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Lan tiếp tục lướt màn hình vô thức hàng giờ liền và khả năng tập trung đọc văn bản dài ngày càng suy giảm.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Bí kíp mục tiêu SMART: Đừng bắt đầu với mục tiêu khổng lồ khiến em sợ hãi. Hãy bắt đầu với một hành động nhỏ đến mức em KHÔNG THỂ NÓI KHÔNG.',
        toolkitId: 'goal_setting',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn biến một mục tiêu lớn của mình thành 3 bước nhỏ xíu để làm ngay hôm nay không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Em đã từng đặt mục tiêu nào quá cao rồi bỏ cuộc chưa? Nếu được làm lại, em sẽ chia nhỏ mục tiêu đó ra sao?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao tính kiên trì mỗi ngày quan trọng hơn sự bộc phát trong chốc lát?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Chúc mừng em! Em đã nắm trong tay chìa khóa thiết lập mục tiêu thông minh SMART.',
        characterMood: 'happy'
      }
    ]
  },
  {
    gameId: 'game_after_bad_grade',
    category: 'lifestyle',
    microAction: {
      "id": "act_growth_mindset",
      "title": "Khoanh tròn câu bị trừ điểm và ghi ra bài học để không lặp lại",
      "durationMinutes": 5,
      "instruction": "Ghi: \"Lỗi này do đọc lướt đề hay chưa thuộc công thức?\" và tự sửa lại một lần cho chuẩn."
},
    title: 'Cú ngã điểm 4 môn Hóa',
    description: 'Nhận bài kiểm tra 1 tiết với điểm 4 đỏ chót, cảm giác thất bại ùa về. Em sẽ suy sụp hay mổ xẻ nguyên nhân để lội ngược dòng?',
    ageRange: { min: 12, max: 17 },
    durationMinutes: 3,
    constructs: ['Reflection', 'SelfRegulation', 'Adaptability'],
    toolkitIds: ['reflection', 'cognitive_reframing'],
    version: '1.0.0',
    status: 'published',
    approvedBy: 'Admin Principal',
    publishedAt: '2026-09-13T16:00:00Z',
    safety: {
      status: 'approved',
      reviewerNotes: 'Rèn luyện Tư duy phát triển (Growth Mindset) khi đối diện với thất bại học tập.',
      contentRating: 'G'
    },
    scenes: [
      {
        id: 'scene_01',
        type: 'situation',
        content: 'Cô giáo trả bài kiểm tra. Con điểm 4 đỏ chót đập vào mắt Bảo. Tai Bảo ù đi, nước mắt chực trào. Một giọng nói tiêu cực trong đầu thì thầm: "Mày thật vô dụng! Mày không bao giờ học được môn này đâu!".',
        characterMood: 'stressed',
        nextSceneId: 'scene_02'
      },
      {
        id: 'scene_02',
        type: 'choice',
        content: 'Bảo nên phản ứng thế nào trước cú sốc điểm số này?',
        characterMood: 'stressed',
        choices: [
          {
            id: 'A',
            label: 'Vò nát bài kiểm tra nhét đáy cặp, giấu nhẹm bố mẹ và buông xuôi môn Hóa',
            consequenceId: 'c_A',
            toolkitHint: 'Trốn tránh thất bại tước đi cơ hội tìm ra nguyên nhân cốt lõi để sửa chữa.',
            constructImpact: { construct: 'Reflection', delta: -20 }
          },
          {
            id: 'B',
            label: 'Hít sâu tĩnh tâm, mở bài kiểm tra mổ xẻ từng câu sai: Phân loại sai do nhầm lẫn tính toán hay do chưa nắm bản chất lý thuyết, rồi nhờ bạn chỉ lại',
            consequenceId: 'c_B',
            toolkitHint: 'Tư duy phát triển: Thất bại chỉ là dữ liệu phản hồi giúp ta biết chính xác chỗ nào cần cải thiện.',
            constructImpact: { construct: 'Reflection', delta: 25 }
          },
          {
            id: 'C',
            label: 'Đổ lỗi cho cô giáo ra đề khó và chấm quá khắt khe để bảo vệ lòng tự ái',
            consequenceId: 'c_C',
            toolkitHint: 'Đổ lỗi bên ngoài ngăn cản sự trưởng thành và phản tư nội tại.',
            constructImpact: { construct: 'SelfRegulation', delta: -10 }
          }
        ]
      },
      {
        id: 'c_A',
        type: 'consequence',
        content: 'Bảo sống trong lo âu sợ bố mẹ phát hiện. Lỗ hổng kiến thức không được vá khiến các bài kiểm tra tiếp theo tiếp tục tụt dốc.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_B',
        type: 'consequence',
        content: 'Bảo phát hiện mình chỉ sai ở bước đổi đơn vị mol. Sau 1 tuần luyện lại dạng này, bài kiểm tra học kỳ Bảo đạt điểm 9 xuất sắc! Bố mẹ và thầy cô tự hào về sự kiên cường của Bảo.',
        characterMood: 'happy',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'c_C',
        type: 'consequence',
        content: 'Bảo ôm mối bực bội với giáo viên suốt học kỳ, không chịu chú ý nghe giảng và kết quả môn học bị ảnh hưởng nghiêm trọng.',
        characterMood: 'stressed',
        nextSceneId: 'intervention_01'
      },
      {
        id: 'intervention_01',
        type: 'intervention',
        content: 'Hộp công cụ tâm lý: "Lật ngược góc nhìn (Cognitive Reframing)". Thay vì nói "Tôi kém môn này", hãy nói "Tôi CHƯA hiểu dạng bài này, và tôi hoàn toàn có thể làm được nếu sửa lỗi sai".',
        toolkitId: 'cognitive_reframing',
        characterMood: 'focused',
        interventionPrompt: 'Em có muốn cùng Bảo giải mã 3 bài học quý giá từ một thất bại vừa qua không?',
        nextSceneId: 'reflection_01'
      },
      {
        id: 'reflection_01',
        type: 'reflection',
        content: 'Lần gần đây nhất em bị điểm kém hoặc làm hỏng một việc, em đã vượt qua cảm giác thất vọng đó như thế nào?',
        characterMood: 'reflective',
        reflectionQuestion: 'Tại sao những người kiên cường coi sai lầm là người thầy tốt nhất của mình?',
        nextSceneId: 'ending_01'
      },
      {
        id: 'ending_01',
        type: 'ending',
        content: 'Em đã tôi luyện tinh thần bền bỉ (Grit) và năng lực Phản tư đỉnh cao. Không có thất bại, chỉ có bài học để tiến bộ!',
        characterMood: 'happy'
      }
    ]
  }
];
