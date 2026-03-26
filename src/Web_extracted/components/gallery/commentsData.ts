import type { Comment } from "./types";

// ─── 댓글 샘플 데이터 (중첩 구조) ───
export const initialComments: { [key: number]: Comment[] } = {
  1: [
    { 
      id: 47, author: "wemby", avatar: "🐻", avatarBg: "#E5E7EB", 
      content: "뭐 돌아본거 보면 의도한거 같은데 ㅋㅋ", time: "5시간 전", 
      likes: 23, dislikes: 2, isBest: true,
      replies: [
        { 
          id: 1001, author: "게임러버", avatar: "🎮", avatarBg: "#BFDBFE", 
          content: "ㅋㅋㅋ 인정", time: "4시간 전", likes: 5, dislikes: 0,
          replies: [
            { 
              id: 1002, author: "초보자123", avatar: "🌱", avatarBg: "#D9F99D", 
              content: "무슨 뜻이에요?", time: "3시간 전", likes: 2, dislikes: 0, replyTo: "게임러버",
              replies: [
                { id: 1003, author: "wemby", avatar: "🐻", avatarBg: "#E5E7EB", content: "영상 다시 보면 알 수 있어요!", time: "3시간 전", likes: 8, dislikes: 0, replyTo: "초보자123" },
              ]
            },
          ]
        },
      ]
    },
    { 
      id: 23, author: "ㅂㅂㅂㅂㅂ", avatar: "🦊", avatarBg: "#FED7AA", 
      content: "박스 순간 뇌 꺼져서 어정쩡하게 편토", time: "5시간 전", 
      likes: 23, dislikes: 1, isBest: true,
      replies: [
        { 
          id: 1004, author: "프로게이머", avatar: "⚔️", avatarBg: "#C4B5FD", 
          content: "ㅋㅋㅋ 공감", time: "4시간 전", likes: 3, dislikes: 0,
          replies: [
            { id: 1005, author: "ㅂㅂㅂㅂㅂ", avatar: "🦊", avatarBg: "#FED7AA", content: "ㅋㅋ 그쵸?", time: "4시간 전", likes: 1, dislikes: 0, replyTo: "프로게이머" },
          ]
        },
      ]
    },
    { 
      id: 58, author: "중신자빵", avatar: "🐰", avatarBg: "#FECACA", 
      content: "짝스의 아크로바틱 어시스트 ㄷㄷㄷㄷㄷ", time: "5시간 전", 
      likes: 23, dislikes: 0, isBest: true,
      replies: []
    },
    { 
      id: 12, author: "페이저베커스", avatar: "🐶", avatarBg: "#BBF7D0", 
      content: "짝스 미친 벡보드 앨리웁패스 ㄷㄷㄷ", time: "5시간 전", 
      likes: 23, dislikes: 3, isBest: true,
      replies: [
        { 
          id: 1006, author: "농구팬", avatar: "🏀", avatarBg: "#FDE68A", 
          content: "NBA급 플레이ㄷㄷ", time: "4시간 전", likes: 12, dislikes: 0,
          replies: [
            { 
              id: 1007, author: "스포츠맨", avatar: "⚽", avatarBg: "#BFDBFE", 
              content: "이건 레전드다", time: "3시간 전", likes: 7, dislikes: 0, replyTo: "농구팬",
              replies: [
                { id: 1008, author: "농구팬", avatar: "🏀", avatarBg: "#FDE68A", content: "ㅋㅋ 맞아요 역대급임", time: "3시간 전", likes: 4, dislikes: 0, replyTo: "스포츠맨" },
              ]
            },
          ]
        },
      ]
    },
    { 
      id: 5, author: "게임러버", avatar: "🎮", avatarBg: "#BFDBFE", 
      content: "대박 축하드려요!!", time: "3시간 전", 
      likes: 12, dislikes: 1,
      replies: [
        { 
          id: 1010, author: "메이플고수", avatar: "🍁", avatarBg: "#FED7AA", 
          content: "감사합니다 ㅎㅎ", time: "2시간 전", likes: 15, dislikes: 0,
          replies: [
            { id: 1011, author: "게임러버", avatar: "🎮", avatarBg: "#BFDBFE", content: "앞으로도 화이팅이에요!", time: "2시간 전", likes: 3, dislikes: 0, replyTo: "메이플고수" },
          ]
        },
      ]
    },
    { 
      id: 102, author: "초보자123", avatar: "🌱", avatarBg: "#D9F99D", 
      content: "어떻게 하신거에요? 팁 좀 주세요", time: "1시간 전", 
      likes: 5, dislikes: 0,
      replies: [
        { 
          id: 1012, author: "메이플고수", avatar: "🍁", avatarBg: "#FED7AA", 
          content: "매일 보스 돌리고 주간퀘 꼭 하세요!", time: "30분 전", likes: 20, dislikes: 0,
          replies: [
            { 
              id: 1013, author: "초보자123", avatar: "🌱", avatarBg: "#D9F99D", 
              content: "감사합니다!! 열심히 해볼게요", time: "20분 전", likes: 3, dislikes: 0, replyTo: "메이플고수",
              replies: [
                { 
                  id: 1014, author: "또다른뉴비", avatar: "🐣", avatarBg: "#FDE68A", 
                  content: "저도 같이 해도 될까요?", time: "15분 전", likes: 1, dislikes: 0, replyTo: "초보자123",
                  replies: [
                    { id: 1015, author: "초보자123", avatar: "🌱", avatarBg: "#D9F99D", content: "네 같이해요! 닉 알려주세요", time: "10분 전", likes: 2, dislikes: 0, replyTo: "또다른뉴비" },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ],
  2: [
    { 
      id: 67, author: "프로게이머", avatar: "⚔️", avatarBg: "#C4B5FD", 
      content: "이 공략 진짜 좋네요", time: "2시간 전", 
      likes: 23, dislikes: 0, isBest: true,
      replies: [
        { 
          id: 2001, author: "게임마스터", avatar: "🎮", avatarBg: "#6366F1", 
          content: "도움이 되셨다니 다행이에요!", time: "1시간 전", likes: 8, dislikes: 0,
          replies: [
            { id: 2002, author: "프로게이머", avatar: "⚔️", avatarBg: "#C4B5FD", content: "다음 공략도 기대할게요!", time: "50분 전", likes: 5, dislikes: 0, replyTo: "게임마스터" },
          ]
        },
      ]
    },
    { 
      id: 15, author: "뉴비유저", avatar: "🌟", avatarBg: "#FDE68A", 
      content: "감사합니다! 덕분에 클리어했어요", time: "1시간 전", 
      likes: 8, dislikes: 0, isBest: true,
      replies: []
    },
    { 
      id: 88, author: "게임고수", avatar: "🎯", avatarBg: "#FDA4AF", 
      content: "추가 팁: 2페이즈에서 오른쪽으로 가세요", time: "1시간 전", 
      likes: 15, dislikes: 1, isBest: true,
      replies: [
        { 
          id: 2003, author: "뉴비유저", avatar: "🌟", avatarBg: "#FDE68A", 
          content: "오 이거 몰랐어요! 감사합니다", time: "50분 전", likes: 4, dislikes: 0,
          replies: [
            { id: 2004, author: "게임고수", avatar: "🎯", avatarBg: "#FDA4AF", content: "ㅎㅎ 클리어 화이팅!", time: "45분 전", likes: 2, dislikes: 0, replyTo: "뉴비유저" },
          ]
        },
      ]
    },
  ],
  5: [
    { 
      id: 156, author: "리니지팬", avatar: "🗡️", avatarBg: "#C4B5FD", 
      content: "ㄷㄷㄷ 대박 50번만에 성공이라니", time: "10분 전", 
      likes: 67, dislikes: 2, isBest: true,
      replies: [
        { 
          id: 5001, author: "리니지황제", avatar: "⚔️", avatarBg: "#8B5CF6", 
          content: "감사합니다 ㅠㅠ 손이 아직도 떨려요", time: "8분 전", likes: 30, dislikes: 0,
          replies: [
            { 
              id: 5002, author: "강화장인", avatar: "🔨", avatarBg: "#FCA5A5", 
              content: "50번이면 운 좋은거임 ㄹㅇ", time: "7분 전", likes: 25, dislikes: 0, replyTo: "리니지황제",
              replies: [
                { id: 5003, author: "리니지황제", avatar: "⚔️", avatarBg: "#8B5CF6", content: "ㅋㅋ 그러게요 운이 좋았어요", time: "6분 전", likes: 10, dislikes: 0, replyTo: "강화장인" },
              ]
            },
          ]
        },
      ]
    },
    { 
      id: 78, author: "무기장인", avatar: "⚔️", avatarBg: "#FCA5A5", 
      content: "나는 100번 넘게 실패중...", time: "8분 전", 
      likes: 45, dislikes: 0, isBest: true,
      replies: [
        { 
          id: 5004, author: "리니지황제", avatar: "⚔️", avatarBg: "#8B5CF6", 
          content: "힘내세요! 언젠간 됩니다", time: "6분 전", likes: 18, dislikes: 0,
          replies: [
            { 
              id: 5005, author: "무기장인", avatar: "⚔️", avatarBg: "#FCA5A5", 
              content: "감사합니다 ㅠㅠ", time: "5분 전", likes: 5, dislikes: 0, replyTo: "리니지황제",
              replies: [
                { id: 5006, author: "응원단", avatar: "📣", avatarBg: "#BBF7D0", content: "화이팅!! 꼭 성공하실거에요", time: "4분 전", likes: 8, dislikes: 0, replyTo: "무기장인" },
              ]
            },
          ]
        },
      ]
    },
    { 
      id: 203, author: "부자유저", avatar: "💰", avatarBg: "#86EFAC", 
      content: "강화 비용만 몇천이냐 ㄷㄷ", time: "5분 전", 
      likes: 34, dislikes: 1, isBest: true,
      replies: [
        { 
          id: 5007, author: "리니지황제", avatar: "⚔️", avatarBg: "#8B5CF6", 
          content: "3천만원 정도요... 하하", time: "4분 전", likes: 45, dislikes: 0,
          replies: [
            { id: 5008, author: "부자유저", avatar: "💰", avatarBg: "#86EFAC", content: "ㄷㄷㄷ 대단하시네요", time: "3분 전", likes: 12, dislikes: 0, replyTo: "리니지황제" },
          ]
        },
      ]
    },
    { 
      id: 245, author: "뉴비", avatar: "🌱", avatarBg: "#D9F99D", 
      content: "+20이 뭐에요?", time: "2분 전", 
      likes: 2, dislikes: 0,
      replies: [
        { 
          id: 5009, author: "친절한유저", avatar: "😊", avatarBg: "#BFDBFE", 
          content: "무기 강화 +20 성공이에요! 엄청 어려워요", time: "1분 전", likes: 8, dislikes: 0,
          replies: [
            { id: 5010, author: "뉴비", avatar: "🌱", avatarBg: "#D9F99D", content: "아하! 감사합니다~", time: "방금 전", likes: 2, dislikes: 0, replyTo: "친절한유저" },
          ]
        },
      ]
    },
  ],
};