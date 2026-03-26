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
import SaenghwalSsalmuk from "./pages/SaenghwalSsalmuk";
import GameCoupon from "./pages/GameCoupon";
import EventDetail from "./pages/EventDetail";
import DailyEventDetail from "./pages/DaiyEventDetail";
import TradeDetail from "./pages/TradeDetail";
import PurchaseDetail from "./pages/PurchaseDetail";
import CashCharge from "./pages/CashChargeProps";
import CashWithdraw from "./pages/CashWithdraw";
import DailyCommunity from "./pages/DailyCommunity";
import Chat from "./pages/Chat";
import PointWithdraw from "./pages/PointWithdraw";
import GifticonExchange from "./pages/GifticonExchange";
import MyPage from "./pages/MyPage";
import ProfileEdit from "./pages/ProfileEdit";
import Settings from "./pages/Settings";
import DrawerMenu from "./components/DrawerMenu";

// 전역 Context
import { InterestProvider } from "./components/community/InterestContext";
import { RecentProvider } from "./components/community/RecentContext";

// 새로운 공통 컴포넌트
import Header, {
  HomeHeader,
  CommunityHeader,
  RankingHeader,
  BaroHeader,
  GameCouponHeader,
  shouldShowMainHeader,
  shouldShowGameCouponHeader,
} from "./components/Header";
import BottomNav, { shouldShowBottomNav } from "./components/BottomNav";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function App() {
  // ===== State =====
  const [activeNav, setActiveNav] = useState("home");
  const [currentPage, setCurrentPage] = useState("home");
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCommunityNav, setShowCommunityNav] = useState(false);
  const [communityNav, setCommunityNav] = useState("feed");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCouponDetail, setIsCouponDetail] = useState(false);
  const [isGoingBack, setIsGoingBack] = useState(false);

  // ===== 네비게이션 함수들 =====
  const navigateTo = (page: string) => {
    if (page !== currentPage) {
      setPageHistory((prev) => [...prev, page]);
      setCurrentPage(page);
    }
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const prevPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setIsGoingBack(true);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage("home");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // "nav-feed" 처리: 하단바 피드 탭 클릭과 동일하게 동작
    if (currentPage === "nav-feed") {
      setCommunityNav("feed");
      setCurrentPage("community");
      setActiveNav("community");
      setShowCommunityNav(true);
      return;
    }

    // "nav-hot" 처리: 커뮤니티의 "지금 핫한" 탭으로 이동
    if (currentPage === "nav-hot") {
      setCommunityNav("hot");
      setCurrentPage("community");
      setActiveNav("community");
      setShowCommunityNav(true);
      return;
    }

    if (!isGoingBack && pageHistory[pageHistory.length - 1] !== currentPage) {
      setPageHistory((prev) => [...prev, currentPage]);
    }
    setIsGoingBack(false);
  }, [currentPage]);

  // ===== 네비게이션 핸들러 =====
  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setCurrentPage(id);
    if (id === "home") setShowPopup(true);
    if (id === "community") setShowCommunityNav(true);
  };

  const handleCommunityNavClick = (nav: string) => {
    setCommunityNav(nav);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setActiveNav("home");
  };

  // ===== 헤더 렌더링 =====
  const renderHeader = () => {
    // 게임쿠폰 전용 헤더 (먼저 체크!)
    if (shouldShowGameCouponHeader(currentPage, isCouponDetail)) {
      return (
        <GameCouponHeader
          onBackClick={goBack}
          onSearchClick={() => setShowSearch(true)}
        />
      );
    }

    // 메인 헤더 표시 안하는 페이지
    if (!shouldShowMainHeader(currentPage)) return null;

    // 페이지별 헤더
    switch (currentPage) {
      case "home":
        return (
          <HomeHeader
            onMenuClick={() => setShowDrawer(true)}
            onSearchClick={() => setShowSearch(true)}
            onProfileClick={() => setCurrentPage("mypage")}
          />
        );
      case "life":
        return (
          <BaroHeader
            onMenuClick={() => setShowDrawer(true)}
            onSearchClick={() => setShowSearch(true)}
            onInfoClick={() => setCurrentPage("inquiry")}
          />
        );
      case "ranking":
        return (
          <RankingHeader
            onMenuClick={() => setShowDrawer(true)}
            onSearchClick={() => setShowSearch(true)}
          />
        );
      case "community":
        return (
          <CommunityHeader
            communityNav={communityNav}
            onMenuClick={() => setShowDrawer(true)}
            onSearchClick={() => setShowSearch(true)}
          />
        );
      default:
        // 기본 홈 스타일 헤더 (로고)
        return (
          <HomeHeader
            onMenuClick={() => setShowDrawer(true)}
            onSearchClick={() => setShowSearch(true)}
            onProfileClick={() => setCurrentPage("mypage")}
          />
        );
    }
  };

  return (
    <InterestProvider>
      <RecentProvider>
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

          {/* 헤더 */}
          {renderHeader()}

          {/* ===== 페이지 렌더링 ===== */}
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
          {currentPage === "preorder" && (
            <Life setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "ranking" && (
            <Ranking setCurrentPage={setCurrentPage} />
          )}
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
          {/* 갤러리 상세 페이지 (gallery-{galleryId}) */}
          {currentPage.startsWith("gallery-") &&
            !currentPage.includes("-post-") &&
            !currentPage.includes("-profile") && (
              <ChannelDetail
                setCurrentPage={setCurrentPage}
                goBack={goBack}
                galleryId={currentPage.replace("gallery-", "")}
              />
            )}
          {/* 갤러리 내 프로필 (gallery-{galleryId}-profile) */}
          {currentPage.startsWith("gallery-") &&
            currentPage.endsWith("-profile") && (
              <ChannelDetail
                setCurrentPage={setCurrentPage}
                goBack={goBack}
                galleryId={currentPage
                  .replace("gallery-", "")
                  .replace("-profile", "")}
                initialProfileOpen={true}
              />
            )}
          {/* 갤러리 내 게시물 (gallery-{galleryId}-post-{postId}) */}
          {currentPage.startsWith("gallery-") &&
            currentPage.includes("-post-") && (
              <ChannelDetail
                setCurrentPage={setCurrentPage}
                goBack={goBack}
                galleryId={currentPage
                  .split("-post-")[0]
                  .replace("gallery-", "")}
                initialPostId={parseInt(currentPage.split("-post-")[1])}
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
          {currentPage === "chat" && <Chat goBack={goBack} />}
          {currentPage === "pointWithdraw" && (
            <PointWithdraw setCurrentPage={setCurrentPage} goBack={goBack} />
          )}
          {currentPage === "gifticonExchange" && (
            <GifticonExchange setCurrentPage={setCurrentPage} goBack={goBack} />
          )}
          {currentPage === "faq" && (
            <FAQ setCurrentPage={setCurrentPage} goBack={goBack} />
          )}
          {currentPage === "signup" && (
            <Signup
              setCurrentPage={setCurrentPage}
              onLogin={() => setIsLoggedIn(true)}
            />
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

          {/* 하단 네비게이션 */}
          {shouldShowBottomNav(currentPage) && (
            <BottomNav
              activeNav={activeNav}
              currentPage={currentPage}
              communityNav={communityNav}
              showCommunityNav={showCommunityNav}
              onNavClick={handleNavClick}
              onCommunityNavClick={handleCommunityNavClick}
              onBackToHome={handleBackToHome}
            />
          )}

          {/* 홈 팝업 */}
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
                          : currentPage === "life"
                            ? "바로쌀먹"
                            : currentPage === "ranking"
                              ? "게임순위"
                              : currentPage === "community"
                                ? "갤러리"
                                : currentPage === "gameCoupon"
                                  ? "게임쿠폰"
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
                    {[
                      "메이플스토리",
                      "사전예약",
                      "쿠폰",
                      "RF온라인",
                      "P2E",
                    ].map((keyword) => (
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </RecentProvider>
    </InterestProvider>
  );
}
