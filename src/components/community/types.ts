// ===== 탭 아이템 =====
export interface TabItem {
  name: string;
  emoji: string;
  type?: "board" | "user";
}

// ===== 본문 콘텐츠 블록 =====
export interface ContentBlock {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
}

// ===== 게시글 데이터 =====
export interface PostData {
  id: number;
  avatar: string;
  avatarBg: string;
  name: string;
  badge?: string;
  meta: string;
  title: string;
  body: string | ContentBlock[];
  likes: number;
  dislikes: number;
  comments: number;
  views: number;
  boardId?: string;
  authorId?: string;
  isVerified?: boolean;
  createdAt: number;
  images?: string[];
  category?: string;
  poll?: {
    question: string;  // ← 이 줄 추가
    options: { text: string; votes: number }[];
    totalVotes: number;
    votedOption?: number;
  };
}

// ===== 댓글 =====
export interface Reply {
  id: number;
  author: string;
  avatar: string;
  avatarBg?: string;
  content: string;
  time: string;
  likes: number;
  dislikes?: number;
  replyTo?: string;
  replies?: Reply[];
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  avatarBg?: string;
  content: string;
  time: string;
  likes: number;
  dislikes?: number;
  isBest?: boolean;
  replies?: Reply[];
}

// ===== Toast 타입 =====
export type ToastType = "success" | "link" | "block" | "info";

export interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
  onUndo?: () => void;
}