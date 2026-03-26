import { ReactNode } from "react";

// ===== 아이콘 컴포넌트들 =====
const MenuIcon = () => (
  <svg
    className="w-6 h-6 text-gray-700"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    className="w-6 h-6 text-gray-700"
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
);

const SearchIcon = () => (
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    className="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4M12 16h.01"
    />
  </svg>
);

// ===== 타입 정의 =====
interface HeaderProps {
  // 좌측
  leftType?: "menu" | "back" | "none";
  onMenuClick?: () => void;
  onBackClick?: () => void;

  // 중앙 (타이틀)
  title?: string;
  logo?: boolean;
  customTitle?: ReactNode;

  // 우측 액션
  showSearch?: boolean;
  showBell?: boolean;
  showInfo?: boolean;
  showProfile?: boolean;
  onSearchClick?: () => void;
  onBellClick?: () => void;
  onInfoClick?: () => void;
  onProfileClick?: () => void;
  profileEmoji?: string;
  customRight?: ReactNode;

  // 스타일
  borderBottom?: boolean;
  className?: string;
}

// ===== 메인 헤더 컴포넌트 =====
export default function Header({
  leftType = "menu",
  onMenuClick,
  onBackClick,
  title,
  logo = false,
  customTitle,
  showSearch = true,
  showBell = false,
  showInfo = false,
  showProfile = false,
  onSearchClick,
  onBellClick,
  onInfoClick,
  onProfileClick,
  profileEmoji = "👤",
  customRight,
  borderBottom = false,
  className = "",
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between ${
        borderBottom ? "border-b border-gray-100" : ""
      } ${className}`}
    >
      {/* 좌측 */}
      <div className="flex items-center gap-3">
        {leftType === "menu" && (
          <button className="p-1 relative" onClick={onMenuClick}>
            <MenuIcon />
            {/* 알림 빨간 점 */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        )}
        {leftType === "back" && (
          <button className="p-1" onClick={onBackClick}>
            <BackIcon />
          </button>
        )}

        {/* 타이틀 영역 */}
        {customTitle ? (
          customTitle
        ) : logo ? (
          <img
            className="w-30 h-5 object-contain"
            src="https://app.ssalmuk.com/images/mobile/Logo_ssalmuk.svg"
            alt="쌀먹"
          />
        ) : title ? (
          <div>
            <span className="text-lg font-bold text-gray-900">{title}</span>
          </div>
        ) : null}
      </div>

      {/* 우측 */}
      <div className="flex items-center gap-3">
        {customRight ? (
          customRight
        ) : (
          <>
            {showSearch && (
              <button className="p-1" onClick={onSearchClick}>
                <SearchIcon />
              </button>
            )}
            {showInfo && (
              <button className="p-1" onClick={onInfoClick}>
                <InfoIcon />
              </button>
            )}
            {showBell && (
              <button className="p-1" onClick={onBellClick}>
                <BellIcon />
              </button>
            )}
            {showProfile && (
              <button
                className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
                onClick={onProfileClick}
              >
                <span className="text-white text-sm">{profileEmoji}</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

// ===== 프리셋 헤더들 =====

// 홈 헤더 (로고 + 검색 + 알림 + 프로필)
interface HomeHeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
}

export function HomeHeader({
  onMenuClick,
  onSearchClick,
  onProfileClick,
}: HomeHeaderProps) {
  return (
    <Header
      leftType="menu"
      onMenuClick={onMenuClick}
      logo
      showSearch
      showBell
      showProfile
      onSearchClick={onSearchClick}
      onProfileClick={onProfileClick}
    />
  );
}

// 커뮤니티 헤더
interface CommunityHeaderProps {
  communityNav: string;
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function CommunityHeader({
  communityNav,
  onMenuClick,
  onSearchClick,
}: CommunityHeaderProps) {
  const getTitle = () => {
    switch (communityNav) {
      case "feed":
      case "hot":
        return "피드";
      case "all":
        return "갤러리";
      case "recent":
        return "최근 방문";
      case "following":
        return "팔로잉";
      case "interest":
        return "관심 게임";
      case "ranking":
        return "순위";
      default:
        return "피드";
    }
  };

  // ranking일 때 별도 헤더
  if (communityNav === "ranking") {
    return (
      <Header
        leftType="menu"
        onMenuClick={onMenuClick}
        showSearch={false}
        showBell={false}
        customRight={
          <button
            className="text-sm text-gray-500"
            onClick={() => window.dispatchEvent(new Event("openRankingInfo"))}
          >
            안내
          </button>
        }
      />
    );
  }

  return (
    <Header
      leftType="menu"
      onMenuClick={onMenuClick}
      title={getTitle()}
      showSearch
      showBell
      onSearchClick={onSearchClick}
    />
  );
}

// 랭킹 헤더
interface RankingHeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function RankingHeader({
  onMenuClick,
  onSearchClick,
}: RankingHeaderProps) {
  return (
    <Header
      leftType="menu"
      onMenuClick={onMenuClick}
      title="게임순위"
      showSearch
      showBell
      onSearchClick={onSearchClick}
    />
  );
}

// 바로쌀먹 헤더
interface BaroHeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  onInfoClick: () => void;
}

export function BaroHeader({
  onMenuClick,
  onSearchClick,
  onInfoClick,
}: BaroHeaderProps) {
  return (
    <Header
      leftType="menu"
      onMenuClick={onMenuClick}
      title="바로쌀먹"
      showSearch
      showInfo
      onSearchClick={onSearchClick}
      onInfoClick={onInfoClick}
    />
  );
}

// 서브페이지 헤더 (뒤로가기 + 타이틀)
interface SubPageHeaderProps {
  title: string;
  onBackClick: () => void;
  showSearch?: boolean;
  showBell?: boolean;
  onSearchClick?: () => void;
}

export function SubPageHeader({
  title,
  onBackClick,
  showSearch = false,
  showBell = false,
  onSearchClick,
}: SubPageHeaderProps) {
  return (
    <Header
      leftType="back"
      onBackClick={onBackClick}
      title={title}
      showSearch={showSearch}
      showBell={showBell}
      onSearchClick={onSearchClick}
      borderBottom
    />
  );
}

// 게임쿠폰 헤더
interface GameCouponHeaderProps {
  onBackClick: () => void;
  onSearchClick?: () => void;
}

export function GameCouponHeader({
  onBackClick,
  onSearchClick,
}: GameCouponHeaderProps) {
  return (
    <Header
      leftType="back"
      onBackClick={onBackClick}
      title="게임쿠폰"
      showSearch
      showBell
      onSearchClick={onSearchClick}
      borderBottom
    />
  );
}

// ===== 헤더 표시 여부 체크 유틸 =====
export const PAGES_WITHOUT_HEADER = [
  "samurai",
  "inquiry",
  "samurai-review",
  "channelDetail",
  "hotNow",
  "faq",
  "eventDetail",
  "mypage",
  "profileEdit",
  "settings",
  "DailyReward-myEntries",
  "DailyReward-myCoupons",
  "cashCharge",
  "cashWithdraw",
  "DailyCommunity",
  "DailyReward-market",
  "DailyReward",
  "saenghwal",
  "pointWithdraw",
  "gifticonExchange",
  "signup",
  "chat",
];

export const shouldShowMainHeader = (currentPage: string): boolean => {
  if (PAGES_WITHOUT_HEADER.includes(currentPage)) return false;
  if (currentPage.includes("gameCoupon")) return false;
  if (currentPage.includes("dailyEventDetail")) return false;
  if (currentPage.includes("tradeDetail")) return false;
  if (currentPage.includes("purchaseDetail")) return false;
  if (currentPage.startsWith("gallery-")) return false; // 갤러리 상세 페이지
  return true;
};

export const shouldShowGameCouponHeader = (
  currentPage: string,
  isCouponDetail: boolean,
): boolean => {
  return (
    (currentPage === "gameCoupon" || currentPage.startsWith("gameCoupon-")) &&
    !isCouponDetail
  );
};
