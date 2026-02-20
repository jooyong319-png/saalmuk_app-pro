import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Life from "./pages/Life";
import Samurai from "./pages/Samurai";
import Baro from "./pages/Baro";
import Inquiry from "./pages/Inquiry";
import Ranking from "./pages/Ranking";
import Community from "./pages/Community";
import ChannelDetail from "./pages/ChannelDetail";
import HotNow from "./pages/HotNow";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FAQ from "./pages/FAQ";
import DailyReward from "./pages/Dailyreward";
import SaenghwalSsalmuk from "./pages/SaenghwalSsalmuk";
import GameCoupon from "./pages/GameCoupon";
import EventDetail from "./pages/EventDetail";
import DailyEventDetail from "./pages/DaiyEventDetail";
import TradeDetail from "./pages/TradeDetail";
import PurchaseDetail from "./pages/PurchaseDetail";
import CashCharge from "./pages/CashChargeProps";
import CashWithdraw from "./pages/CashWithdraw";
import DailyCommunity from "./pages/DailyCommunity";
import PointWithdraw from "./pages/PointWithdraw";
import GifticonExchange from "./pages/GifticonExchange";
import MyPage from "./pages/MyPage";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";
import DrawerMenu from "./components/DrawerMenu";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [currentPage, setCurrentPage] = useState("home");
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]); // 페이지 히스토리
  const [showPopup, setShowPopup] = useState(false);
  const [showCommunityNav, setShowCommunityNav] = useState(false);
  const [communityNav, setCommunityNav] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [couponNav, setCouponNav] = useState("free"); // 고정쿠폰등록, 고정쿠폰, 무료쿠폰, 브랜드쿠폰
  const [showCouponNav, setShowCouponNav] = useState(false);
  const [isCouponDetail, setIsCouponDetail] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<any>(null);

  // 페이지 이동 함수 (히스토리에 추가)
  const navigateTo = (page: string) => {
    if (page !== currentPage) {
      setPageHistory((prev) => [...prev, page]);
      setCurrentPage(page);
    }
  };

  // 뒤로가기 함수
  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop(); // 현재 페이지 제거
      const prevPage = newHistory[newHistory.length - 1]; // 이전 페이지
      setPageHistory(newHistory);
      setIsGoingBack(true);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage("home");
    }
  };

  // 페이지 변경 시 히스토리에 추가 (goBack에서 설정한 경우 제외)
  const [isGoingBack, setIsGoingBack] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // goBack으로 이동한 게 아니면 히스토리에 추가
    if (!isGoingBack && pageHistory[pageHistory.length - 1] !== currentPage) {
      setPageHistory((prev) => [...prev, currentPage]);
    }
    setIsGoingBack(false);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100 pb-20 max-w-md mx-auto relative">
      {/* 드로어 메뉴 */}
      <DrawerMenu
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        onLoginClick={() => setShowLogin(true)}
      />

      {/* Header */}
      {currentPage !== "samurai" &&
        currentPage !== "inquiry" &&
        currentPage !== "samurai-review" &&
        currentPage !== "channelDetail" &&
        currentPage !== "hotNow" &&
        currentPage !== "faq" &&
        currentPage !== "eventDetail" &&
        currentPage !== "mypage" &&
        currentPage !== "profileEdit" &&
        currentPage !== "settings" &&
        !currentPage.includes("gameCoupon") &&
        !currentPage.includes("dailyEventDetail") &&
        currentPage !== "DailyReward-myEntries" &&
        currentPage !== "DailyReward-myCoupons" &&
        !currentPage.includes("tradeDetail") &&
        !currentPage.includes("purchaseDetail") &&
        currentPage !== "cashCharge" &&
        currentPage !== "cashWithdraw" &&
        currentPage !== "DailyCommunity" &&
        currentPage !== "DailyReward-market" &&
        currentPage !== "DailyReward" &&
        currentPage !== "saenghwal" &&
        currentPage !== "pointWithdraw" &&
        currentPage !== "gifticonExchange" &&
        currentPage !== "signup" && (
          <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-1" onClick={() => setShowDrawer(true)}>
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
              </button>
              {currentPage === "life" ? (
                <span className="text-lg font-bold text-gray-900">
                  바로쌀먹
                </span>
              ) : currentPage === "ranking" ? (
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    쌀먹순위
                  </span>
                  <p className="text-[10px] text-gray-400">
                    투명한 데이터 기반 게임 랭킹
                  </p>
                </div>
              ) : currentPage === "community" ? (
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {communityNav === "all"
                      ? "커뮤니티"
                      : communityNav === "following"
                        ? "팔로잉"
                        : communityNav === "interest"
                          ? "관심 게임"
                          : "🔥 지금 핫한"}
                  </span>
                  {communityNav !== "all" && (
                    <p className="text-[10px] text-gray-400">
                      {communityNav === "following"
                        ? "팔로우한 유저들의 최신 글"
                        : communityNav === "interest"
                          ? "관심 등록한 게임의 최신 글"
                          : "좋아요가 많은 인기 게시글"}
                    </p>
                  )}
                </div>
              ) : currentPage.startsWith("gameCoupon") ? (
                <span className="text-lg font-bold text-gray-900">
                  게임쿠폰
                </span>
              ) : currentPage.startsWith("DailyReward") ? (
                <span className="text-lg font-bold text-gray-900">
                  생활쌀먹
                </span>
              ) : (
                <img
                  className="w-30 h-5 object-contain"
                  src="https://app.ssalmuk.com/images/mobile/Logo_ssalmuk.svg"
                  alt=""
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              {currentPage === "life" ? (
                <>
                  <button className="p-1" onClick={() => setShowSearch(true)}>
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
                  </button>
                  <button
                    className="p-1"
                    onClick={() => setCurrentPage("inquiry")}
                  >
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
                  </button>
                </>
              ) : currentPage === "ranking" ||
                currentPage === "community" ||
                currentPage.startsWith("gameCoupon") ? (
                <>
                  <button className="p-1" onClick={() => setShowSearch(true)}>
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
                  </button>
                  <button className="p-1">
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
                  </button>
                </>
              ) : (
                <>
                  <button className="p-1" onClick={() => setShowSearch(true)}>
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
                  </button>
                  <button className="p-1 relative">
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
                  </button>
                  <button
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
                    onClick={() => setCurrentPage("mypage")}
                  >
                    <span className="text-white text-sm">👤</span>
                  </button>
                </>
              )}
            </div>
          </header>
        )}
      {/* 게임쿠폰 전용 헤더 */}
      {(currentPage === "gameCoupon" ||
        currentPage.startsWith("gameCoupon-")) &&
        !isCouponDetail && (
          <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button className="p-1" onClick={goBack}>
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
              </button>
              <span className="text-lg font-bold">게임쿠폰</span>
            </div>
            <div className="flex items-center gap-2">
              {/* 검색 */}
              <button className="p-1">
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
              </button>
              {/* 알림 */}
              <button className="p-1">
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
              </button>
            </div>
          </header>
        )}
      {/* 페이지 */}
      {currentPage === "home" && (
        <Home setCurrentPage={setCurrentPage} setActiveNav={setActiveNav} />
      )}
      {(currentPage === "life" || currentPage === "life-popup") && (
        <Baro
          initialPopupOpen={currentPage === "life-popup"}
          setCurrentPage={setCurrentPage}
          goBack={goBack}
        />
      )}
      {currentPage === "instant" && (
        <div className="p-4">
          <h1 className="text-xl font-bold">생활쌀먹</h1>
        </div>
      )}
      {currentPage === "preorder" && <Life setCurrentPage={setCurrentPage} />}
      {currentPage === "ranking" && <Ranking setCurrentPage={setCurrentPage} />}

      {/* {currentPage === "ranking" && (
        <div className="p-4">
          <h1 className="text-xl font-bold">랭킹</h1>
        </div>
      )} */}
      {currentPage === "community" && (
        <Community
          setCurrentPage={setCurrentPage}
          communityNav={communityNav}
        />
      )}
      {currentPage === "samurai" && (
        <Samurai
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          initialTab="소개"
        />
      )}
      {currentPage === "samurai-review" && (
        <Samurai
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          initialTab="평가글"
        />
      )}
      {currentPage === "inquiry" && (
        <Inquiry setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "mypage" && (
        <MyPage
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}
      {currentPage === "profileEdit" && (
        <ProfileEdit setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "settings" && (
        <Settings
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}
      {currentPage === "channelDetail" && (
        <ChannelDetail setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "channelDetail-profile" && (
        <ChannelDetail
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          initialProfileOpen={true}
        />
      )}
      {currentPage.startsWith("channelDetail-post-") && (
        <ChannelDetail
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          initialPostId={parseInt(
            currentPage.replace("channelDetail-post-", ""),
          )}
        />
      )}
      {currentPage === "hotNow" && (
        <HotNow setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "eventDetail" && (
        <EventDetail setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {(currentPage === "DailyReward" ||
        currentPage === "DailyReward-myEntries" ||
        currentPage === "DailyReward-myCoupons" ||
        currentPage === "DailyReward-market" ||
        currentPage === "saenghwal") && (
        <SaenghwalSsalmuk
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          isLoggedIn={isLoggedIn}
          onLogout={() => setIsLoggedIn(false)}
          onShowLogin={() => setShowLogin(true)}
          initialShowMyEntries={currentPage === "DailyReward-myEntries"}
          initialShowMyCoupon={currentPage === "DailyReward-myCoupons"}
          initialMainTab={
            currentPage === "DailyReward-market" ? "market" : "event"
          }
        />
      )}
      {currentPage.startsWith("dailyEventDetail") && (
        <DailyEventDetail
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          dDay={currentPage.split("-")[2] || "D-3"}
          eventId={currentPage.split("-")[1] || "1"}
        />
      )}
      {(currentPage === "gameCoupon" ||
        currentPage.startsWith("gameCoupon-")) && (
        <GameCoupon
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          initialCouponId={
            currentPage.includes("-")
              ? parseInt(currentPage.split("-")[1])
              : null
          }
          setIsCouponDetail={setIsCouponDetail}
        />
      )}
      {currentPage.startsWith("tradeDetail") && (
        <TradeDetail
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          tradeId={currentPage.split("-")[1]}
        />
      )}
      {currentPage.startsWith("purchaseDetail") && (
        <PurchaseDetail
          setCurrentPage={setCurrentPage}
          goBack={goBack}
          productId={currentPage.split("-")[1]}
        />
      )}
      {currentPage === "cashCharge" && (
        <CashCharge setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "cashWithdraw" && (
        <CashWithdraw setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "DailyCommunity" && (
        <DailyCommunity setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "pointWithdraw" && (
        <PointWithdraw setCurrentPage={setCurrentPage} goBack={goBack} />
      )}
      {currentPage === "gifticonExchange" && (
        <GifticonExchange setCurrentPage={setCurrentPage} goBack={goBack} />
      )}

      {/* 로그인 팝업 */}
      {showLogin && (
        <div className="fixed inset-0 z-[10001] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowLogin(false)}
          />
          <div
            className="relative bg-white rounded-t-3xl w-full max-w-md"
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            <Login
              onClose={() => setShowLogin(false)}
              setCurrentPage={setCurrentPage}
              onLogin={() => setIsLoggedIn(true)}
            />
          </div>
        </div>
      )}
      {currentPage === "signup" && (
        <Signup
          setCurrentPage={setCurrentPage}
          onLogin={() => setIsLoggedIn(true)}
        />
      )}
      {currentPage === "faq" && (
        <FAQ setCurrentPage={setCurrentPage} goBack={goBack} />
      )}

      {/* Bottom Navigation */}
      {currentPage !== "samurai" &&
        currentPage !== "inquiry" &&
        currentPage !== "channelDetail" &&
        currentPage !== "hotNow" &&
        currentPage !== "faq" &&
        currentPage !== "eventDetail" &&
        !currentPage.includes("dailyEventDetail") &&
        !currentPage.includes("purchaseDetail") &&
        currentPage !== "cashCharge" &&
        currentPage !== "cashWithdraw" &&
        currentPage !== "DailyCommunity" &&
        currentPage !== "signup" &&
        !currentPage.startsWith("gameCoupon") && (
          <nav
            className={`fixed left-1/2 -translate-x-1/2 w-full max-w-md px-2 py-2 z-40 ${
              currentPage === "community" && showCommunityNav
                ? "bottom-3 mx-auto px-3 rounded-2xl shadow-lg border border-gray-100 bg-white"
                : "bottom-0 bg-white border-t border-gray-200"
            }`}
            style={
              currentPage === "community" && showCommunityNav
                ? { width: "calc(100% - 24px)", maxWidth: "calc(448px - 24px)" }
                : {}
            }
          >
            {currentPage === "community" && showCommunityNav ? (
              // 커뮤니티 하단 네비게이션
              <div className="flex items-center justify-around">
                <button
                  className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-400"
                  onClick={() => {
                    setCurrentPage("home");
                    setActiveNav("home");
                  }}
                >
                  <span className="text-xl">←</span>
                </button>
                {/* 전체채널 */}
                <button
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    communityNav === "all" ? "text-gray-800" : "text-gray-400"
                  }`}
                  onClick={() => setCommunityNav("all")}
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
                      strokeWidth={communityNav === "all" ? 2.5 : 1.5}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="text-xs">전체채널</span>
                </button>
                {/* 팔로잉 */}
                <button
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    communityNav === "following"
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                  onClick={() => setCommunityNav("following")}
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
                      strokeWidth={communityNav === "following" ? 2.5 : 1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-xs">팔로잉</span>
                </button>
                {/* 관심 */}
                <button
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    communityNav === "interest"
                      ? "text-gray-800"
                      : "text-gray-400"
                  }`}
                  onClick={() => setCommunityNav("interest")}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      strokeWidth={communityNav === "interest" ? 2.5 : 1.5}
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="3"
                      ry="9"
                      strokeWidth={communityNav === "interest" ? 2.5 : 1.5}
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={communityNav === "interest" ? 2.5 : 1.5}
                      d="M3 12h18"
                    />
                  </svg>
                  <span className="text-xs">관심</span>
                </button>
                {/* 지금핫한 */}
                <button
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    communityNav === "hot" ? "text-gray-800" : "text-gray-400"
                  }`}
                  onClick={() => setCommunityNav("hot")}
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
                      strokeWidth={communityNav === "hot" ? 2.5 : 1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-xs">지금핫한</span>
                </button>
              </div>
            ) : (
              // 기본 하단 네비게이션
              <div className="flex items-center justify-around">
                {[
                  {
                    id: "home",
                    label: "추천",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                      </svg>
                    ),
                  },
                  {
                    id: "life",
                    label: "바로쌀먹",
                    icon: (
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
                    ),
                  },
                  {
                    id: "DailyReward",
                    label: "생활쌀먹",
                    icon: (
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
                    ),
                  },
                  {
                    id: "ranking",
                    label: "쌀먹순위",
                    icon: (
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
                    ),
                  },
                  {
                    id: "community",
                    label: "커뮤니티",
                    icon: (
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
                    ),
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                      activeNav === item.id ? "text-gray-800" : "text-gray-400"
                    }`}
                    onClick={() => {
                      setActiveNav(item.id);
                      setCurrentPage(item.id);
                      if (item.id === "home") {
                        setShowPopup(true);
                      }
                      if (item.id === "community") {
                        setShowCommunityNav(true);
                      }
                    }}
                  >
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </nav>
        )}
      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          />
          <div className="relative z-10 w-full max-w-md">
            <Swiper
              modules={[Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="w-full"
            >
              <SwiperSlide>
                <img
                  src="https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png"
                  alt="프로모션1"
                  className="w-full"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png"
                  alt="프로모션2"
                  className="w-full"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png"
                  alt="프로모션3"
                  className="w-full"
                />
              </SwiperSlide>
            </Swiper>
            <div className="flex bg-white py-3 px-4 justify-end items-center gap-4">
              <span
                className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => setShowPopup(false)}
              >
                오늘 하루 보지않기
              </span>
              <button
                className="px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-full cursor-pointer hover:bg-blue-50"
                onClick={() => setShowPopup(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 검색 화면 */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white max-w-md mx-auto">
          {/* 검색 헤더 */}
          <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSearch(false)}>
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
              </button>
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
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
                <input
                  type="text"
                  placeholder={`${
                    currentPage === "home"
                      ? "전체"
                      : currentPage === "preorder"
                        ? "사전예약"
                        : currentPage === "life"
                          ? "바로쌀먹"
                          : currentPage === "ranking"
                            ? "쌀먹순위"
                            : currentPage === "community"
                              ? "커뮤니티"
                              : currentPage === "channelDetail"
                                ? "메이플스토리"
                                : currentPage === "gameCoupon"
                                  ? "게임쿠폰"
                                  : currentPage === "DailyReward"
                                    ? "생활쌀먹"
                                    : "전체"
                  }에서 찾기`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 최근 검색어 */}
          {!searchQuery && (
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">최근 검색어</h3>
                <button className="text-sm text-gray-400">전체 삭제</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["메이플스토리", "사전예약", "쿠폰", "RF온라인", "P2E"].map(
                  (keyword) => (
                    <button
                      key={keyword}
                      className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-1"
                      onClick={() => setSearchQuery(keyword)}
                    >
                      {keyword}
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
