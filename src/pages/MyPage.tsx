import { useState } from "react";
import FameMenuPopup from "../components/FameMenuPopup";
import FameDashboard from "../components/FameDashboard";
import RewardDashboard from "../components/RewardDashboard";
import RankingPage from "../components/RankingPage";
import { ToastProvider } from "../components/community/Toast";
import {
  FollowProvider,
  useFollow,
} from "../components/community/FollowContext";

// Props 인터페이스
interface MyPageProps {
  setCurrentPage: (page: string) => void;
  goBack: () => void;
  onLogout: () => void;
}

// --- 타입 정의 ---
interface Badge {
  id: number;
  name: string;
  emoji: string;
  desc: string;
  owned: boolean;
  category: "achievement" | "ranking";
  bgColor: string;
  date?: string;
}

interface SocialLink {
  id: number;
  platformId: string;
  label: string;
  url: string;
}

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  color: string;
  placeholder: string;
}

interface AvatarItem {
  id: number;
  src: string;
  name: string;
  description: string;
  unlockFame: number;
  owned: boolean;
}

interface FollowUser {
  id: number;
  nickname: string;
  avatar: string;
  isFollowing: boolean;
  intro: string;
}

interface FollowingCommunity {
  id: number;
  name: string;
  icon: string;
  memberCount: string;
}

interface PostItem {
  id: number;
  galleryId: number;
  boardIcon: string;
  boardName: string;
  title: string;
  content: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
}

interface CommentItem {
  id: number;
  targetIcon: string;
  targetName: string;
  date: string;
  content: string;
  mentionedUser?: string;
  likes: number;
  postId: number;
  galleryId: number;
}

// --- 소셜 플랫폼 데이터 ---
const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "youtube",
    name: "유튜브",
    icon: "📺",
    color: "#FF0000",
    placeholder: "https://youtube.com/@채널명",
  },
  {
    id: "twitch",
    name: "트위치",
    icon: "🎮",
    color: "#9146FF",
    placeholder: "https://twitch.tv/채널명",
  },
  {
    id: "instagram",
    name: "인스타그램",
    icon: "📸",
    color: "#E4405F",
    placeholder: "https://instagram.com/아이디",
  },
  {
    id: "twitter",
    name: "X (트위터)",
    icon: "🐦",
    color: "#000000",
    placeholder: "https://x.com/아이디",
  },
  {
    id: "tiktok",
    name: "틱톡",
    icon: "🎵",
    color: "#000000",
    placeholder: "https://tiktok.com/@아이디",
  },
  {
    id: "discord",
    name: "디스코드",
    icon: "💬",
    color: "#5865F2",
    placeholder: "https://discord.gg/초대코드",
  },
  {
    id: "custom",
    name: "커스텀 링크",
    icon: "🔗",
    color: "#6B7280",
    placeholder: "https://example.com",
  },
];

// --- 아바타 데이터 ---
const AVATAR_ITEMS: AvatarItem[] = [
  {
    id: 1,
    src: "https://edge.ssalmuk.com/editorImage/164433adf1f74f30adf6d65de1bcf631.png",
    name: "불꽃 달팽이",
    description: "쌀먹닷컴의 열정 넘치는 불꽃 달팽이!",
    unlockFame: 0,
    owned: true,
  },
  {
    id: 2,
    src: "https://edge.ssalmuk.com/editorImage/628e9422ca0d4d0a9c4676b282e8f370.png",
    name: "주황 달팽이",
    description: "상큼한 오렌지 컬러의 달팽이!",
    unlockFame: 0,
    owned: true,
  },
  {
    id: 3,
    src: "https://edge.ssalmuk.com/editorImage/d13662afec0a4b36b490a27aa0e44d5f.png",
    name: "초록 달팽이",
    description: "자연을 사랑하는 초록 달팽이!",
    unlockFame: 0,
    owned: true,
  },
  {
    id: 4,
    src: "https://edge.ssalmuk.com/editorImage/452483c1a34849f19fdd91b084f6cc6d.png",
    name: "핑크 달팽이",
    description: "사랑스러운 핑크 달팽이!",
    unlockFame: 0,
    owned: true,
  },
  {
    id: 5,
    src: "https://edge.ssalmuk.com/editorImage/a5d026e2b1e74974b7291b9b0720c5c8.png",
    name: "파랑 달팽이",
    description: "차분하고 지적인 파랑 달팽이!",
    unlockFame: 50000,
    owned: false,
  },
  {
    id: 6,
    src: "https://edge.ssalmuk.com/editorImage/93460ed22a3a4a1180c5b1558d3475ae.png",
    name: "보라 달팽이",
    description: "신비로운 보라 달팽이!",
    unlockFame: 100000,
    owned: false,
  },
  {
    id: 7,
    src: "https://edge.ssalmuk.com/editorImage/636ec77257614b1eafd00eb6852984cd.png",
    name: "노랑 달팽이",
    description: "밝고 명랑한 노랑 달팽이!",
    unlockFame: 200000,
    owned: false,
  },
  {
    id: 8,
    src: "https://edge.ssalmuk.com/editorImage/ed19af783aad472ba506c749c1894e4a.png",
    name: "민트 달팽이",
    description: "시원한 민트 달팽이!",
    unlockFame: 500000,
    owned: false,
  },
  {
    id: 9,
    src: "https://edge.ssalmuk.com/editorImage/1503bab4d1a84925883922dd3c6962e0.png",
    name: "회색 달팽이",
    description: "묵묵히 자신의 길을 가는 회색 달팽이!",
    unlockFame: 1000000,
    owned: false,
  },
  {
    id: 10,
    src: "https://edge.ssalmuk.com/editorImage/0490382f65a84ad584dc1d36b1336b04.png",
    name: "검정 달팽이",
    description: "카리스마 넘치는 검정 달팽이!",
    unlockFame: 2000000,
    owned: false,
  },
  {
    id: 11,
    src: "https://edge.ssalmuk.com/editorImage/c5de86eaadef4674bbe044bfec7dacfc.png",
    name: "무지개 달팽이",
    description: "모든 색을 품은 무지개 달팽이!",
    unlockFame: 5000000,
    owned: false,
  },
  {
    id: 12,
    src: "https://edge.ssalmuk.com/editorImage/1c58b4cbb5914bd0bba0ae27e6dd1175.png",
    name: "골드 달팽이",
    description: "전설의 쌀먹러만이 획득 가능!",
    unlockFame: 10000000,
    owned: false,
  },
];

// --- 배지 데이터 (이미지 기준 수정) ---
const ALL_BADGES: Badge[] = [
  // 업적배지 8개
  {
    id: 1,
    emoji: "🌱",
    name: "기본 주먹밥",
    desc: "가입 시 기본 제공",
    bgColor: "from-green-100 to-emerald-200",
    owned: true,
    category: "achievement",
    date: "24.01.10",
  },
  {
    id: 2,
    emoji: "🍚",
    name: "갓 지은 밥",
    desc: "첫 게시물 작성 시 획득",
    bgColor: "from-amber-50 to-orange-100",
    owned: true,
    category: "achievement",
    date: "24.01.15",
  },
  {
    id: 3,
    emoji: "🌾",
    name: "황금 벼",
    desc: "좋아요 100개 획득 시 획득",
    bgColor: "from-yellow-100 to-amber-200",
    owned: true,
    category: "achievement",
    date: "24.02.01",
  },
  {
    id: 4,
    emoji: "🌿",
    name: "쌘베이",
    desc: "댓글 50개 작성 시 획득",
    bgColor: "from-green-50 to-emerald-100",
    owned: true,
    category: "achievement",
  },
  {
    id: 5,
    emoji: "🍛",
    name: "카레라이스",
    desc: "30일 연속 출석 시 획득",
    bgColor: "from-orange-100 to-amber-200",
    owned: true,
    category: "achievement",
  },
  {
    id: 6,
    emoji: "🍜",
    name: "라멘",
    desc: "게시글 10개 작성 시 획득",
    bgColor: "from-red-50 to-orange-100",
    owned: true,
    category: "achievement",
  },
  {
    id: 7,
    emoji: "🍣",
    name: "초밥",
    desc: "인기 게시글 달성 시 획득",
    bgColor: "from-pink-50 to-rose-100",
    owned: true,
    category: "achievement",
  },
  {
    id: 8,
    emoji: "🍱",
    name: "도시락",
    desc: "모든 업적 달성 시 획득",
    bgColor: "from-slate-100 to-gray-200",
    owned: false,
    category: "achievement",
  },
  // 랭킹배지 4개
  {
    id: 10,
    emoji: "👑",
    name: "VIP 왕관",
    desc: "VIP 등급 달성",
    bgColor: "from-yellow-200 to-amber-300",
    owned: false,
    category: "ranking",
  },
  {
    id: 11,
    emoji: "🌸",
    name: "문꽃",
    desc: "소셜 점수 상위 10% 달성",
    bgColor: "from-pink-100 to-rose-200",
    owned: false,
    category: "ranking",
  },
  {
    id: 12,
    emoji: "💎",
    name: "다이아몬드",
    desc: "최상위 5% 달성",
    bgColor: "from-cyan-100 to-blue-200",
    owned: false,
    category: "ranking",
  },
  {
    id: 13,
    emoji: "🏆",
    name: "트로피",
    desc: "최상위 1% 달성",
    bgColor: "from-yellow-200 to-amber-300",
    owned: false,
    category: "ranking",
  },
];

const getPlatform = (platformId: string) =>
  SOCIAL_PLATFORMS.find((p) => p.id === platformId);

export default function MyPage({
  setCurrentPage,
  goBack,
  onLogout,
}: MyPageProps) {
  return (
    <ToastProvider>
      <FollowProvider>
        <MyPageContent
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          onLogout={onLogout}
        />
      </FollowProvider>
    </ToastProvider>
  );
}

function MyPageContent({ setCurrentPage, goBack, onLogout }: MyPageProps) {
  // === 메인 탭 상태 ===
  const [activeTab, setActiveTab] = useState<
    "posts" | "comments" | "saved" | "badges"
  >("posts");

  // === 유저 정보 상태 ===
  const [nickname, setNickname] = useState("쌀먹마스터");
  const [selectedAvatarId, setSelectedAvatarId] = useState(1);
  const userFame = 25331;

  // === 프로필 편집 팝업 상태 ===
  const [showProfileEditPopup, setShowProfileEditPopup] = useState(false);
  const [tempNickname, setTempNickname] = useState(nickname);
  const [tempAvatarId, setTempAvatarId] = useState(selectedAvatarId);

  // === 아바타 상세 팝업 상태 ===
  const [showAvatarDetailPopup, setShowAvatarDetailPopup] = useState(false);
  const [selectedAvatarForDetail, setSelectedAvatarForDetail] =
    useState<AvatarItem | null>(null);

  // === 소셜 링크 상태 ===
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [linkPopupStep, setLinkPopupStep] = useState<
    "none" | "manager" | "selector" | "input"
  >("none");
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(
    SOCIAL_PLATFORMS[0],
  );
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);

  // === 팔로우/팔로잉 상태 ===
  const { followedUsers, isFollowing, toggleFollow } = useFollow();
  const [showFollowPopup, setShowFollowPopup] = useState(false);
  const [followActiveTab, setFollowActiveTab] = useState<
    "follower" | "following"
  >("follower");
  const [followingSubTab, setFollowingSubTab] = useState<
    "community" | "people"
  >("people");

  // === 배지 장착 상태 ===
  const [equippedBadgeId, setEquippedBadgeId] = useState<number | null>(1);
  const [showBadgeDetailPopup, setShowBadgeDetailPopup] = useState(false);
  const [selectedBadgeForDetail, setSelectedBadgeForDetail] =
    useState<Badge | null>(null);

  // === Fame 관련 상태 ===
  const [showFameMenu, setShowFameMenu] = useState(false);
  const [showFameDashboard, setShowFameDashboard] = useState(false);
  const [showRewardDashboard, setShowRewardDashboard] = useState(false);
  const [showRankingPage, setShowRankingPage] = useState(false);
  const [rankingInitialTab, setRankingInitialTab] = useState<"fame" | "reward">(
    "fame",
  );

  // === 게시글 데이터 (웹과 동일한 형식) ===
  const [myPosts] = useState<PostItem[]>([
    {
      id: 1,
      galleryId: 202,
      boardIcon: "🍁",
      boardName: "메이플스토리",
      title: "275레벨 달성 후기입니다",
      content: "드디어 275 찍었네요.. 3년 걸렸습니다 ㅠㅠ 다들 파이팅하세요!",
      date: "2월 11일 15:30",
      views: 1542,
      likes: 89,
      comments: 23,
    },
    {
      id: 2,
      galleryId: 203,
      boardIcon: "🏰",
      boardName: "로스트아크",
      title: "카양겔 하드 첫 클리어!",
      content: "공대원분들 덕분에 드디어 클리어했습니다. 너무 기쁘네요",
      date: "2월 10일 22:15",
      views: 892,
      likes: 45,
      comments: 12,
    },
  ]);

  // === 댓글 데이터 (웹과 동일한 형식) ===
  const [myComments] = useState<CommentItem[]>([
    {
      id: 1,
      targetIcon: "🎮",
      targetName: "아이온2 갤러리에 남긴 댓글",
      date: "2월 11일 17:20",
      content: "이번 업데이트 진짜 대박이네요 ㄷㄷ",
      mentionedUser: "고전적인라이102",
      likes: 3,
      postId: 1,
      galleryId: 101,
    },
    {
      id: 2,
      targetIcon: "🍁",
      targetName: "메이플스토리 갤러리에 남긴 댓글",
      date: "2월 11일 15:45",
      content: "275 축하드려요!! 저도 열심히 해야겠네요",
      likes: 12,
      postId: 2,
      galleryId: 202,
    },
    {
      id: 3,
      targetIcon: "🏰",
      targetName: "로스트아크 갤러리에 남긴 댓글",
      date: "2월 10일 21:30",
      content: "카양겔 하드 공략 정보 감사합니다! 덕분에 클리어했어요",
      likes: 8,
      postId: 3,
      galleryId: 203,
    },
  ]);

  // === 저장됨 데이터 (웹과 동일한 형식) ===
  const [savedPosts, setSavedPosts] = useState<PostItem[]>([
    {
      id: 1,
      galleryId: 202,
      boardIcon: "🍁",
      boardName: "메이플스토리",
      title: "[공략] 보스 데미지 올리는 꿀팁 정리",
      content: "스탯 찍는 순서랑 링크스킬 조합 정리해봤습니다. 참고하세요!",
      date: "2월 10일 18:20",
      views: 5234,
      likes: 342,
      comments: 89,
    },
    {
      id: 2,
      galleryId: 203,
      boardIcon: "🏰",
      boardName: "로스트아크",
      title: "이번주 레이드 보상 정리표",
      content: "골드, 재료 등 한눈에 보기 쉽게 정리했습니다",
      date: "2월 9일 12:30",
      views: 8921,
      likes: 567,
      comments: 123,
    },
    {
      id: 3,
      galleryId: 101,
      boardIcon: "⚔️",
      boardName: "아이온2",
      title: "신규 유저 필독! 초반 세팅 가이드",
      content: "처음 시작하시는 분들을 위한 가이드입니다.",
      date: "2월 8일 09:15",
      views: 3456,
      likes: 234,
      comments: 67,
    },
  ]);

  // --- 샘플 데이터 ---
  const assets = { points: "125,400", cash: "32,000", coupons: 7, market: 12 };

  const mockFollowers: FollowUser[] = [
    {
      id: 1,
      nickname: "메이플고수",
      avatar: "🍁",
      isFollowing: true,
      intro: "200렙 찍으러 갑니다",
    },
    {
      id: 2,
      nickname: "게임러버",
      avatar: "🎮",
      isFollowing: false,
      intro: "게임은 인생",
    },
  ];

  const mockFollowingPeople: FollowUser[] = [
    {
      id: 3,
      nickname: "쌀먹대장",
      avatar: "🍚",
      isFollowing: true,
      intro: "오늘도 쌀먹 완료",
    },
  ];

  const mockFollowingCommunities: FollowingCommunity[] = [
    { id: 1, name: "메이플스토리 채널", icon: "🍁", memberCount: "1.2만" },
    { id: 2, name: "로스트아크 채널", icon: "🏰", memberCount: "8.5천" },
  ];

  const equippedBadge = ALL_BADGES.find((b) => b.id === equippedBadgeId);
  const selectedAvatar = AVATAR_ITEMS.find((a) => a.id === selectedAvatarId);

  // --- 프로필 편집 함수 ---
  const openProfileEdit = () => {
    setTempNickname(nickname);
    setTempAvatarId(selectedAvatarId);
    setShowProfileEditPopup(true);
  };

  const saveProfile = () => {
    setNickname(tempNickname);
    setSelectedAvatarId(tempAvatarId);
    setShowProfileEditPopup(false);
  };

  const handleAvatarClick = (avatar: AvatarItem) => {
    if (avatar.owned) {
      setTempAvatarId(avatar.id);
    } else {
      setSelectedAvatarForDetail(avatar);
      setShowAvatarDetailPopup(true);
    }
  };

  // --- 소셜 링크 함수 ---
  const handleAddLink = () => {
    if (newLinkUrl) {
      const newLink: SocialLink = {
        id: Date.now(),
        platformId: selectedPlatform.id,
        label: newLinkLabel || selectedPlatform.name,
        url: newLinkUrl.startsWith("http")
          ? newLinkUrl
          : `https://${newLinkUrl}`,
      };
      if (editingLinkId) {
        setSocialLinks(
          socialLinks.map((l) => (l.id === editingLinkId ? newLink : l)),
        );
      } else {
        setSocialLinks([...socialLinks, newLink]);
      }
      resetLinkForm();
      setLinkPopupStep("manager");
    }
  };

  const resetLinkForm = () => {
    setNewLinkLabel("");
    setNewLinkUrl("");
    setEditingLinkId(null);
    setSelectedPlatform(SOCIAL_PLATFORMS[0]);
  };

  const startEditLink = (link: SocialLink) => {
    const platform = getPlatform(link.platformId);
    if (platform) {
      setSelectedPlatform(platform);
      setNewLinkLabel(link.label);
      setNewLinkUrl(link.url);
      setEditingLinkId(link.id);
      setLinkPopupStep("input");
    }
  };

  // --- 저장됨 삭제 함수 ---
  const handleRemoveSaved = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts(savedPosts.filter((p) => p.id !== postId));
  };

  // --- 배지 선택 함수 ---
  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadgeForDetail(badge);
    setShowBadgeDetailPopup(true);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* ═══ 1. 상단 프로필 섹션 ═══ */}
      <div className="bg-[#72C2FF] p-4 text-white pb-6">
        {/* 헤더 - 마이페이지 왼쪽 정렬 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={goBack} className="p-1">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold">마이페이지</h1>
          </div>
          <button onClick={() => setCurrentPage("settings")} className="p-1">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{nickname}</h2>
              {equippedBadge && (
                <div
                  className="flex items-center bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/30 cursor-pointer"
                  onClick={() => setActiveTab("badges")}
                >
                  <span className="text-xs mr-1">{equippedBadge.emoji}</span>
                  <span className="text-[10px] font-bold">
                    {equippedBadge.name}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-[12px] opacity-90 flex-wrap">
              <span
                className="cursor-pointer"
                onClick={() => {
                  setFollowActiveTab("follower");
                  setShowFollowPopup(true);
                }}
              >
                팔로워 {mockFollowers.length} 〉
              </span>
              <span
                className="cursor-pointer"
                onClick={() => {
                  setFollowActiveTab("following");
                  setShowFollowPopup(true);
                }}
              >
                팔로잉{" "}
                {mockFollowingPeople.length + mockFollowingCommunities.length}{" "}
                〉
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setShowFameMenu(true)}
              >
                Fame {userFame.toLocaleString()} 〉
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setLinkPopupStep("manager")}
              >
                링크 {socialLinks.length} 〉
              </span>
            </div>
          </div>
          <button
            onClick={openProfileEdit}
            className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm relative"
          >
            {selectedAvatar ? (
              <img
                src={selectedAvatar.src}
                alt={selectedAvatar.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl flex items-center justify-center h-full">
                🐼
              </span>
            )}
            <div className="absolute bottom-0 right-0 bg-white/90 rounded-tl-lg p-0.5">
              <svg
                className="w-3 h-3 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* 자산 버튼 - 라벨 변경 */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "포인트", val: assets.points, page: "life" },
            { label: "캐시", val: assets.cash, page: "DailyReward-market" },
            {
              label: "보유 쿠폰",
              val: assets.coupons,
              page: "DailyReward-myCoupons",
            },
            {
              label: "장터 진행중",
              val: assets.market,
              page: "DailyReward-myEntries",
            },
          ].map((item, idx) => (
            <button
              key={idx}
              className="bg-white/20 rounded-xl p-3 backdrop-blur-sm text-left active:bg-white/30"
              onClick={() => setCurrentPage(item.page)}
            >
              <p className="text-[16px] font-bold leading-tight">{item.val}</p>
              <p className="text-[10px] opacity-80 mt-1">{item.label} 〉</p>
            </button>
          ))}
        </div>
      </div>

      {/* ═══ 2. 소셜 링크 칩 ═══ */}
      {socialLinks.length > 0 && (
        <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-gray-50 overflow-x-auto scrollbar-hide">
          {socialLinks.map((link) => {
            const platform = getPlatform(link.platformId);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-100 bg-gray-50"
              >
                <span className="text-sm">{platform?.icon}</span>
                <span className="text-xs font-bold text-gray-700">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      )}

      {/* ═══ 3. 탭 메뉴 ═══ */}
      <div className="flex border-b border-gray-100 sticky top-0 bg-white z-10 shadow-sm">
        {[
          { id: "posts", label: "게시글" },
          { id: "comments", label: "댓글" },
          { id: "saved", label: "저장됨" },
          { id: "badges", label: "배지" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-4 text-sm font-bold text-center ${activeTab === tab.id ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══ 4. 탭별 콘텐츠 ═══ */}
      <div>
        {/* ─── 게시글 탭 ─── */}
        {activeTab === "posts" && (
          <div className="divide-y divide-gray-100">
            {myPosts.length > 0 ? (
              myPosts.map((post) => (
                <div key={post.id} className="p-4 active:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
                      {post.boardIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[#72C2FF] font-medium">
                          {post.boardName}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-300 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium mb-1">
                  작성한 게시글이 없어요
                </p>
                <p className="text-sm text-gray-400">
                  첫 게시글을 작성해보세요!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─── 댓글 탭 ─── */}
        {activeTab === "comments" && (
          <div className="divide-y divide-gray-100">
            {myComments.length > 0 ? (
              myComments.map((comment) => (
                <div key={comment.id} className="p-4 active:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">
                      {comment.targetIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {comment.targetName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {comment.date}
                      </p>
                      {comment.mentionedUser && (
                        <p className="text-sm text-[#72C2FF] mb-1">
                          @{comment.mentionedUser}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span className="text-xs">{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium mb-1">
                  작성한 댓글이 없어요
                </p>
                <p className="text-sm text-gray-400">
                  게시글에 댓글을 남겨보세요!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─── 저장됨 탭 ─── */}
        {activeTab === "saved" && (
          <div className="divide-y divide-gray-100">
            {savedPosts.length > 0 ? (
              savedPosts.map((post) => (
                <div key={post.id} className="p-4 active:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg shrink-0">
                      {post.boardIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[#72C2FF] font-medium">
                          {post.boardName}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          {post.comments}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleRemoveSaved(post.id, e)}
                      className="p-2 text-[#72C2FF] active:bg-red-50 active:text-red-500 rounded-lg transition-colors shrink-0"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium mb-1">
                  저장된 게시글이 없어요
                </p>
                <p className="text-sm text-gray-400">
                  관심있는 게시글을 저장해보세요!
                </p>
              </div>
            )}
          </div>
        )}

        {/* ─── 배지 탭 (이미지 기준 수정) ─── */}
        {activeTab === "badges" && (
          <div className="p-4 bg-gray-50 min-h-[60vh]">
            {/* 현재 장착 중 */}
            <p className="text-[13px] font-semibold text-gray-500 mb-3">
              현재 장착 중
            </p>
            {equippedBadge ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${equippedBadge.bgColor} flex items-center justify-center text-3xl`}
                >
                  {equippedBadge.emoji}
                </div>
                <div>
                  <p className="text-[16px] font-bold text-gray-900">
                    {equippedBadge.name}
                  </p>
                  <p className="text-[13px] text-[#72C2FF]">
                    {equippedBadge.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-6 text-center text-sm text-gray-400 mb-8">
                장착된 배지가 없습니다.
              </div>
            )}

            {/* 업적 배지 */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-bold text-gray-900">
                업적배지{" "}
                <span className="text-[#72C2FF]">
                  {
                    ALL_BADGES.filter(
                      (b) => b.category === "achievement" && b.owned,
                    ).length
                  }
                </span>
              </p>
              <p className="text-[12px] text-gray-400">조건 달성 시 획득</p>
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8">
              {ALL_BADGES.filter((b) => b.category === "achievement").map(
                (badge) => (
                  <button
                    key={badge.id}
                    onClick={() => handleBadgeClick(badge)}
                    className={`relative flex flex-col items-center p-2 rounded-xl transition-all ${
                      badge.owned ? "active:bg-gray-50" : "opacity-40 grayscale"
                    } ${equippedBadgeId === badge.id ? "bg-[#E8F7FF] border-2 border-[#72C2FF]" : "bg-white border border-gray-100"}`}
                  >
                    {equippedBadgeId === badge.id && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#72C2FF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.bgColor} flex items-center justify-center text-xl mb-1.5 shadow-sm`}
                    >
                      {badge.emoji}
                    </div>
                    <span
                      className={`text-[11px] font-semibold text-center line-clamp-1 ${
                        equippedBadgeId === badge.id
                          ? "text-[#72C2FF]"
                          : "text-gray-700"
                      }`}
                    >
                      {badge.name}
                    </span>
                  </button>
                ),
              )}
            </div>

            {/* 랭킹 배지 */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[15px] font-bold text-gray-900">
                랭킹배지 |{" "}
                <span className="text-[#72C2FF]">
                  {
                    ALL_BADGES.filter(
                      (b) => b.category === "ranking" && b.owned,
                    ).length
                  }
                </span>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3 pb-10">
              {ALL_BADGES.filter((b) => b.category === "ranking").map(
                (badge) => (
                  <button
                    key={badge.id}
                    onClick={() => handleBadgeClick(badge)}
                    className={`relative flex flex-col items-center p-2 rounded-xl transition-all ${
                      badge.owned ? "active:bg-gray-50" : "opacity-40 grayscale"
                    } ${equippedBadgeId === badge.id ? "bg-[#E8F7FF] border-2 border-[#72C2FF]" : "bg-white border border-gray-100"}`}
                  >
                    {equippedBadgeId === badge.id && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#72C2FF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.bgColor} flex items-center justify-center text-xl mb-1.5 shadow-sm`}
                    >
                      {badge.emoji}
                    </div>
                    <span
                      className={`text-[11px] font-semibold text-center line-clamp-1 ${
                        equippedBadgeId === badge.id
                          ? "text-[#72C2FF]"
                          : "text-gray-700"
                      }`}
                    >
                      {badge.name}
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          팝업 레이어들
          ═══════════════════════════════════════════════════════════════════ */}

      {/* ═══ 프로필 편집 팝업 ═══ */}
      {showProfileEditPopup && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowProfileEditPopup(false)}
          />
          <div
            className="relative bg-white w-full max-w-md rounded-t-3xl flex flex-col animate-slide-up"
            style={{ maxHeight: "85vh" }}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4 shrink-0" />

            <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">프로필 편집</h3>
              <button
                onClick={() => setShowProfileEditPopup(false)}
                className="text-gray-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 shadow-sm shrink-0">
                  {AVATAR_ITEMS.find((a) => a.id === tempAvatarId) ? (
                    <img
                      src={AVATAR_ITEMS.find((a) => a.id === tempAvatarId)?.src}
                      alt="선택된 아바타"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl flex items-center justify-center h-full">
                      🐼
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    닉네임 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={tempNickname}
                    onChange={(e) => setTempNickname(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-100 border-none text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#72C2FF]"
                    placeholder="닉네임을 입력하세요"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    닉네임은 2일 뒤 다시 바꿀 수 있어요
                  </p>
                </div>
              </div>

              <h4 className="text-sm font-bold text-gray-700 mb-3">
                아바타 선택
              </h4>
              <div className="grid grid-cols-4 gap-3">
                {AVATAR_ITEMS.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => handleAvatarClick(avatar)}
                    className={`flex flex-col items-center transition-all ${!avatar.owned ? "opacity-40 grayscale" : ""}`}
                  >
                    <div
                      className={`w-16 h-16 rounded-xl overflow-hidden mb-1.5 transition-all relative ${
                        tempAvatarId === avatar.id
                          ? "ring-[3px] ring-[#72C2FF] ring-offset-2"
                          : avatar.owned
                            ? "active:scale-95"
                            : ""
                      }`}
                    >
                      <img
                        src={avatar.src}
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                      {!avatar.owned && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-600 text-center truncate w-full">
                      {avatar.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setShowProfileEditPopup(false)}
                className="flex-1 py-4 bg-gray-200 text-gray-600 font-bold rounded-2xl"
              >
                취소
              </button>
              <button
                onClick={saveProfile}
                className="flex-1 py-4 bg-[#72C2FF] text-white font-bold rounded-2xl active:bg-[#5BB5F5]"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 아바타 상세 팝업 ═══ */}
      {showAvatarDetailPopup && selectedAvatarForDetail && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowAvatarDetailPopup(false)}
          />
          <div className="relative bg-white w-full max-w-sm rounded-3xl p-6 animate-scale-in">
            <button
              onClick={() => setShowAvatarDetailPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center pt-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {selectedAvatarForDetail.name}
              </h2>
              <p className="text-sm text-gray-500 mb-6 px-4 leading-relaxed">
                {selectedAvatarForDetail.description}
              </p>

              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden grayscale opacity-60">
                <img
                  src={selectedAvatarForDetail.src}
                  alt={selectedAvatarForDetail.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                  style={{
                    width: `${Math.min((userFame / selectedAvatarForDetail.unlockFame) * 100, 100)}%`,
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-gray-900">
                    {selectedAvatarForDetail.unlockFame.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">잠금해제 Fame</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg font-bold text-gray-900">
                    {userFame.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">현재 Fame</p>
                </div>
              </div>

              <button
                disabled
                className="w-full py-4 rounded-2xl bg-gray-200 text-gray-400 font-bold cursor-not-allowed"
              >
                🔒 Fame이 부족합니다
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ 배지 상세 팝업 ═══ */}
      {showBadgeDetailPopup && selectedBadgeForDetail && (
        <div className="fixed inset-0 z-[11000] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBadgeDetailPopup(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 flex flex-col animate-slide-up shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 shrink-0" />
            <div className="text-center mb-8">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedBadgeForDetail.bgColor} flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm`}
              >
                {selectedBadgeForDetail.emoji}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedBadgeForDetail.name}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedBadgeForDetail.desc}
              </p>
              {selectedBadgeForDetail.date && (
                <p className="text-xs text-gray-400 mt-2">
                  획득일: {selectedBadgeForDetail.date}
                </p>
              )}
              {!selectedBadgeForDetail.owned && (
                <div className="mt-4 px-4 py-2 bg-gray-100 rounded-full inline-block">
                  <span className="text-xs text-gray-500">
                    🔒 아직 획득하지 못한 배지예요
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
                onClick={() => setShowBadgeDetailPopup(false)}
              >
                닫기
              </button>
              {selectedBadgeForDetail.owned && (
                <button
                  className={`flex-1 py-4 text-white font-bold rounded-2xl ${equippedBadgeId === selectedBadgeForDetail.id ? "bg-gray-300" : "bg-gray-900"}`}
                  disabled={equippedBadgeId === selectedBadgeForDetail.id}
                  onClick={() => {
                    setEquippedBadgeId(selectedBadgeForDetail.id);
                    setShowBadgeDetailPopup(false);
                  }}
                >
                  {equippedBadgeId === selectedBadgeForDetail.id
                    ? "장착 중"
                    : "장착하기"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ 팔로워/팔로잉 팝업 ═══ */}
      {showFollowPopup && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowFollowPopup(false)}
          />
          <div
            className="relative bg-white w-full max-w-md rounded-t-3xl flex flex-col animate-slide-up"
            style={{ height: "80vh" }}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4 shrink-0" />

            <div className="flex border-b border-gray-100 px-4 shrink-0">
              <button
                className={`flex-1 py-4 text-sm font-bold ${followActiveTab === "follower" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
                onClick={() => setFollowActiveTab("follower")}
              >
                팔로워
              </button>
              <button
                className={`flex-1 py-4 text-sm font-bold ${followActiveTab === "following" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400"}`}
                onClick={() => setFollowActiveTab("following")}
              >
                팔로잉
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {followActiveTab === "follower"
                ? mockFollowers.map((u) => (
                    <div
                      key={u.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{u.nickname}</p>
                          <p className="text-xs text-gray-400">{u.intro}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFollow(u.nickname)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold ${isFollowing(u.nickname) ? "bg-gray-100 text-gray-500" : "bg-[#72C2FF] text-white"}`}
                      >
                        {isFollowing(u.nickname) ? "팔로잉" : "팔로우"}
                      </button>
                    </div>
                  ))
                : mockFollowingPeople.map((u) => (
                    <div
                      key={u.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          {u.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{u.nickname}</p>
                          <p className="text-xs text-gray-400">{u.intro}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFollow(u.nickname)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold ${isFollowing(u.nickname) ? "bg-gray-100 text-gray-500" : "bg-[#72C2FF] text-white"}`}
                      >
                        {isFollowing(u.nickname) ? "팔로잉" : "팔로우"}
                      </button>
                    </div>
                  ))}
            </div>

            <button
              className="m-4 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl"
              onClick={() => setShowFollowPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* ═══ 소셜 링크 관리 팝업 ═══ */}
      {linkPopupStep !== "none" && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setLinkPopupStep("none");
              resetLinkForm();
            }}
          />
          <div className="relative bg-white w-full max-w-md rounded-t-3xl p-6 min-h-[40vh] animate-slide-up">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

            {linkPopupStep === "manager" && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">소셜 링크</h3>
                  {socialLinks.length < 5 && (
                    <button
                      className="text-[#72C2FF] font-bold text-sm"
                      onClick={() => setLinkPopupStep("selector")}
                    >
                      + 추가
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {socialLinks.map((link) => {
                    const platform = getPlatform(link.platformId);
                    return (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{platform?.icon}</span>
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {link.label}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[180px]">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditLink(link)}
                            className="text-gray-400 text-sm"
                          >
                            수정
                          </button>
                          <button
                            onClick={() =>
                              setSocialLinks(
                                socialLinks.filter((l) => l.id !== link.id),
                              )
                            }
                            className="text-red-400 text-sm"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {socialLinks.length === 0 && (
                    <div className="py-10 text-center text-gray-400 text-sm">
                      등록된 링크가 없습니다.
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  최대 5개까지 등록할 수 있어요
                </p>
              </>
            )}

            {linkPopupStep === "selector" && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setLinkPopupStep("manager")}
                    className="text-gray-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-gray-900">
                    플랫폼 선택
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      className="p-4 border border-gray-100 rounded-2xl flex items-center gap-3 active:bg-gray-50"
                      onClick={() => {
                        setSelectedPlatform(p);
                        setLinkPopupStep("input");
                      }}
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {p.name}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {linkPopupStep === "input" && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => {
                      setLinkPopupStep("selector");
                      resetLinkForm();
                    }}
                    className="text-gray-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedPlatform.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedPlatform.name}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      표시 이름 (선택)
                    </label>
                    <input
                      type="text"
                      placeholder={selectedPlatform.name}
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#72C2FF]"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL *
                    </label>
                    <input
                      type="text"
                      placeholder={selectedPlatform.placeholder}
                      className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#72C2FF]"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button
                    className={`w-full py-4 rounded-2xl font-bold ${newLinkUrl ? "bg-[#72C2FF] text-white active:bg-[#5BB5F5]" : "bg-gray-200 text-gray-400"}`}
                    onClick={handleAddLink}
                    disabled={!newLinkUrl}
                  >
                    {editingLinkId ? "수정하기" : "저장하기"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Fame 메뉴 팝업 */}
      {showFameMenu && (
        <FameMenuPopup
          onClose={() => setShowFameMenu(false)}
          onSelectFame={() => {
            setShowFameMenu(false);
            setShowFameDashboard(true);
          }}
          onSelectReward={() => {
            setShowFameMenu(false);
            setShowRewardDashboard(true);
          }}
          onSelectRanking={() => {
            setShowFameMenu(false);
            setShowRankingPage(true);
          }}
        />
      )}

      {/* Fame 대시보드 */}
      {showFameDashboard && (
        <FameDashboard
          onClose={() => setShowFameDashboard(false)}
          totalFame={userFame}
        />
      )}

      {/* 리워드 대시보드 */}
      {showRewardDashboard && (
        <RewardDashboard onClose={() => setShowRewardDashboard(false)} />
      )}

      {/* 랭킹 페이지 */}
      {showRankingPage && (
        <RankingPage
          goBack={() => setShowRankingPage(false)}
          initialTab={rankingInitialTab}
        />
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  );
}
