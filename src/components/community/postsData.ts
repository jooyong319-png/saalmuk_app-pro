import type { PostData, TabItem } from "./types";

// ===== 게시글 이미지 =====
export const gameImages = [
  "https://ssalmuk.com/crosseditor/binary/images/000131/aW1hZ2U=_62.png",
  "https://ssalmuk.com/crosseditor/binary/images/000131/aW1hZ2U=_65.png",
  "https://ssalmuk.com/crosseditor/binary/images/000187/aW1hZ2U=_18.png",
  "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_7.png",
  "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_9.png",
  "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_13.png",
];

// ===== 탭 데이터 =====
export const tabs: TabItem[] = [
  { name: "전체", emoji: "" },
  { name: "메이플스토리", emoji: "🍁", type: "board" },
  { name: "리니지M", emoji: "⚔️", type: "board" },
  { name: "로스트아크", emoji: "🏰", type: "board" },
  { name: "발로란트", emoji: "🎯", type: "board" },
  { name: "카트라이더", emoji: "🚗", type: "board" },
  { name: "포켓몬고", emoji: "⚡", type: "board" },
  { name: "김쌀먹", emoji: "👤", type: "user" },
  { name: "게임마스터", emoji: "👤", type: "user" },
  { name: "메이플고수", emoji: "👤", type: "user" },
];

export const subTabs = ["인증글", "베스트", "전체글"];

// ===== 게시글 데이터 =====
export const initialPosts: PostData[] = [
  {
    id: 1,
    avatar: "🍁",
    avatarBg: "linear-gradient(135deg,#F59E0B,#D97706)",
    name: "메이플고수",
    badge: "레벨링 장인",
    meta: "방금 전 · 메이플스토리",
    title: "드디어 275 달성했습니다!! 🎉",
    body: "3년 만에 드디어 275 찍었어요... 감격스럽네요 ㅠㅠ 다들 포기하지 마세요!",
    likes: 342,
    dislikes: 12,
    comments: 89,
    views: 15420,
    boardId: "메이플스토리",
    authorId: "메이플고수",
    isVerified: true,
    createdAt: Date.now(),
    images: [gameImages[0]],
  },
  {
    id: 2,
    avatar: "⚔️",
    avatarBg: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
    name: "발악군단장",
    badge: "공략왕",
    meta: "10분 전 · 리니지M",
    title: "린클 수동 쌀먹시즈? 시세도 개 박살이 나고 있습니다!",
    body: [
      { type: "text", content: "안녕하세요 발악군단장 입니다~!\n\n린클 수동 쌀먹시즈? 시세도 개 박살이 나고 있습니다!\n모든 아이템은 빠르게 판매 하시는게 정답입니다~!" },
      { type: "image", src: gameImages[3], alt: "캐릭터 정보" },
      { type: "text", content: "제 캐릭의 렙은 5입니다. 사냥 한번 조금 들려봤나? 그냥 막 했습니다.\n\n결제는 정액권 3달짜리 7만원, 그리고 3만원 박스 결제 총 10만원 과금계획입니다." },
    ],
    likes: 892,
    dislikes: 34,
    comments: 234,
    views: 45600,
    boardId: "리니지M",
    authorId: "발악군단장",
    isVerified: true,
    createdAt: Date.now() - 600000,
  },
  {
    id: 3,
    avatar: "💰",
    avatarBg: "linear-gradient(135deg,#10B981,#059669)",
    name: "김쌀먹",
    badge: "쌀먹러",
    meta: "30분 전 · 메이플스토리",
    title: "이번 주 메이플 쌀먹 수익 인증 💵",
    body: "메이플로 이번 주 3만원 벌었습니다! 꾸준히 하니까 되네요 ㅎㅎ",
    likes: 234,
    dislikes: 8,
    comments: 56,
    views: 8900,
    boardId: "메이플스토리",
    authorId: "김쌀먹",
    isVerified: true,
    createdAt: Date.now() - 1800000,
    images: [gameImages[3]],
  },
  {
    id: 4,
    avatar: "🎮",
    avatarBg: "linear-gradient(135deg,#6366F1,#4F46E5)",
    name: "게임마스터",
    badge: "인기 크리에이터",
    meta: "1시간 전 · 로스트아크",
    title: "신규 보스 공략법 총정리 📋",
    body: [
      { type: "text", content: "이번 업데이트로 추가된 신규 보스의 패턴과 공략법을 정리했습니다.\n\n📌 1단계 패턴\n- 기본 공격: 전방 3연타 (회피 가능)\n- 특수 공격: 전체 맵 장판 (점프로 회피)" },
      { type: "image", src: gameImages[1], alt: "1단계 패턴" },
      { type: "text", content: "📌 2단계 패턴\n- 분신 소환: 4방향에서 동시 공격\n- 즉사기: 바닥 빨간색 표시 후 3초 뒤 발동" },
    ],
    likes: 567,
    dislikes: 15,
    comments: 142,
    views: 32450,
    boardId: "로스트아크",
    authorId: "게임마스터",
    isVerified: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: 5,
    avatar: "🎯",
    avatarBg: "linear-gradient(135deg,#EF4444,#DC2626)",
    name: "발로마스터",
    badge: "핵인싸",
    meta: "5분 전 · 발로란트",
    title: "레디언트 달성 후기 ✨",
    body: "솔로큐로 레디언트 찍었습니다! 팁 공유할게요.\n\n🎯 에임보다 포지셔닝이 중요해요\n많은 분들이 에임 연습에만 집중하시는데, 사실 다이아 이상부터는 포지셔닝이 더 중요합니다.",
    likes: 678,
    dislikes: 34,
    comments: 156,
    views: 34500,
    boardId: "발로란트",
    authorId: "발로마스터",
    isVerified: true,
    createdAt: Date.now() - 300000,
    images: [gameImages[2]],
  },
  {
    id: 6,
    avatar: "🚗",
    avatarBg: "linear-gradient(135deg,#3B82F6,#2563EB)",
    name: "카트신",
    badge: "갤주민",
    meta: "25분 전 · 카트라이더",
    title: "신맵 무한부스터 루트 공개 🏎️",
    body: "새로 나온 맵 최적 루트 찾았습니다! 영상으로 정리해봤어요",
    likes: 234,
    dislikes: 8,
    comments: 45,
    views: 8900,
    boardId: "카트라이더",
    authorId: "카트신",
    isVerified: true,
    createdAt: Date.now() - 1500000,
  },
  {
    id: 7,
    avatar: "🐣",
    avatarBg: "linear-gradient(135deg,#FBBF24,#D97706)",
    name: "Pokemon트레이너",
    badge: "포켓몬덕후",
    meta: "40분 전 · 포켓몬고",
    title: "색이 뮤츠 드디어 잡음!!!! 1/450 확률 뚫음",
    body: "레이드 450번만에 드디어 색이 뮤츠 나옴 ㅠㅠㅠㅠ\n\n손 떨려서 캡쳐 3번 놓침 ㅋㅋㅋㅋ IV도 96%라 거의 완벽함",
    likes: 5678,
    dislikes: 123,
    comments: 1234,
    views: 234000,
    boardId: "포켓몬고",
    authorId: "Pokemon트레이너",
    isVerified: true,
    createdAt: Date.now() - 2400000,
    images: [gameImages[1]],
  },
];

// ===== 유틸리티 함수 =====
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  const date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};
