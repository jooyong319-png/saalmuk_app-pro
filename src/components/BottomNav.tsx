// ===== 네비게이션 아이템 타입 =====
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// ===== 아이콘 컴포넌트들 =====
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const BaroIcon = () => (
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
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const GiftIcon = () => (
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
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    />
  </svg>
);

const RankingIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const CommunityIcon = () => (
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
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// 커뮤니티 서브 아이콘들
const HeartIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const FireIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M9.879 16.121A3 3 0 1012.015 11L11 14l2.015-1.121z"
    />
  </svg>
);

const ClockIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const GridIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

// 피드 아이콘
const FeedIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

// 관심 아이콘 (별)
const StarIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

// 순위 아이콘 (트로피)
const TrophyIcon = ({ active }: { active: boolean }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={active ? 2.5 : 1.5}
      d="M5 3h14M5 3v4a7 7 0 007 7m-7-7H3m16 0h-2m2 0v4a7 7 0 01-7 7m0 0v4m0-4h-4m4 0h4m-8 4h8"
    />
  </svg>
);

// ===== 메인 네비게이션 아이템 =====
const mainNavItems: NavItem[] = [
  { id: "home", label: "추천", icon: <HomeIcon /> },
  { id: "life", label: "바로쌀먹", icon: <BaroIcon /> },
  { id: "DailyReward", label: "생활테크", icon: <GiftIcon /> },
  { id: "ranking", label: "게임순위", icon: <RankingIcon /> },
  { id: "community", label: "갤러리", icon: <CommunityIcon /> },
];

// ===== Props =====
interface BottomNavProps {
  activeNav: string;
  currentPage: string;
  communityNav: string;
  showCommunityNav: boolean;
  onNavClick: (id: string) => void;
  onCommunityNavClick: (nav: string) => void;
  onBackToHome: () => void;
}

// ===== 메인 컴포넌트 =====
export default function BottomNav({
  activeNav,
  currentPage,
  communityNav,
  showCommunityNav,
  onNavClick,
  onCommunityNavClick,
  onBackToHome,
}: BottomNavProps) {
  // 커뮤니티 서브 네비게이션
  if (currentPage === "community" && showCommunityNav) {
    // feed 또는 hot일 때 피드 탭 활성화
    const isFeedActive = communityNav === "feed" || communityNav === "hot";

    return (
      <nav
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-md px-3 py-2 z-40 bottom-3 mx-auto rounded-2xl shadow-lg border border-gray-100 bg-white"
        style={{ width: "calc(100% - 24px)", maxWidth: "calc(448px - 24px)" }}
      >
        <div className="flex items-center justify-around">
          {/* 뒤로가기 */}
          <button
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"
            onClick={onBackToHome}
          >
            <span className="text-xl">←</span>
          </button>

          {/* 피드 */}
          <button
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              isFeedActive ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={() => onCommunityNavClick("feed")}
          >
            <FeedIcon active={isFeedActive} />
            <span className="text-xs">피드</span>
          </button>

          {/* 갤러리 */}
          <button
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              communityNav === "all" ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={() => onCommunityNavClick("all")}
          >
            <GridIcon active={communityNav === "all"} />
            <span className="text-xs">갤러리</span>
          </button>

          {/* 관심 */}
          <button
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              communityNav === "interest" ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={() => onCommunityNavClick("interest")}
          >
            <StarIcon active={communityNav === "interest"} />
            <span className="text-xs">관심</span>
          </button>

          {/* 순위 */}
          <button
            className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
              communityNav === "ranking" ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={() => onCommunityNavClick("ranking")}
          >
            <TrophyIcon active={communityNav === "ranking"} />
            <span className="text-xs">순위</span>
          </button>
        </div>
      </nav>
    );
  }

  // 기본 네비게이션
  return (
    <nav className="fixed left-1/2 -translate-x-1/2 w-full max-w-md px-2 py-2 z-40 bottom-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              activeNav === item.id ? "text-gray-800" : "text-gray-400"
            }`}
            onClick={() => onNavClick(item.id)}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ===== 표시 여부 유틸 =====
export const PAGES_WITHOUT_BOTTOM_NAV = [
  "samurai",
  "inquiry",
  "channelDetail",
  "hotNow",
  "faq",
  "eventDetail",
  "cashCharge",
  "cashWithdraw",
  "DailyCommunity",
  "signup",
  "chat",
];

export const shouldShowBottomNav = (currentPage: string): boolean => {
  if (PAGES_WITHOUT_BOTTOM_NAV.includes(currentPage)) return false;
  if (currentPage.includes("dailyEventDetail")) return false;
  if (currentPage.includes("purchaseDetail")) return false;
  if (currentPage.startsWith("gameCoupon")) return false;
  if (currentPage.startsWith("gallery-")) return false; // 갤러리 상세 페이지
  return true;
};
