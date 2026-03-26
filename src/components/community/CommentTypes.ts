// ===== 댓글 타입 =====
export interface Comment {
  id: number;
  author: string;
  avatar: string;
  avatarBg: string;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
  replyTo?: string;
  replies?: Comment[];
  isBest?: boolean;
  isResident?: boolean; // 주민 뱃지
}

// ===== 헬퍼 함수 =====

// 대댓글 추가 (재귀적)
export function addReplyToComment(
  comments: Comment[],
  targetId: number,
  newReply: Comment
): Comment[] {
  return comments.map((c) => {
    if (c.id === targetId) {
      return { ...c, replies: [...(c.replies || []), newReply] };
    }
    if (c.replies) {
      return {
        ...c,
        replies: addReplyToComment(c.replies, targetId, newReply),
      };
    }
    return c;
  });
}

// 댓글 총 개수 카운트 (재귀적)
export function countComments(comments: Comment[]): number {
  return comments.reduce(
    (acc, c) => acc + 1 + countComments(c.replies || []),
    0
  );
}

// ===== 더미 데이터 =====
export const dummyComments: Comment[] = [
  {
    id: 1,
    author: "게임고수",
    avatar: "🎮",
    avatarBg: "#DBEAFE",
    content: "좋은 정보 감사합니다!",
    time: "10분 전",
    likes: 12,
    dislikes: 0,
    isBest: true,
    isResident: true,
    replies: [
      {
        id: 101,
        author: "쌀먹왕",
        avatar: "🍚",
        avatarBg: "#FEF3C7",
        content: "저도 동의해요 ㅎㅎ",
        time: "5분 전",
        likes: 3,
        dislikes: 0,
        replyTo: "게임고수",
      },
    ],
  },
  {
    id: 2,
    author: "혜택모으기",
    avatar: "💰",
    avatarBg: "#D1FAE5",
    content: "이거 꿀팁이네요!",
    time: "30분 전",
    likes: 8,
    dislikes: 0,
    isBest: true,
  },
  {
    id: 3,
    author: "초보게이머",
    avatar: "🐣",
    avatarBg: "#FEE2E2",
    content: "저도 해봐야겠어요",
    time: "1시간 전",
    likes: 2,
    dislikes: 0,
    isResident: true,
  },
];