import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home({
  setCurrentPage,
  setActiveNav,
}: {
  setCurrentPage: (page: string) => void;
  setActiveNav: (nav: string) => void;
}) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [historyTab, setHistoryTab] = useState("사용내역");

  const banners = [
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
    "https://edge.ssalmuk.com/editorImage/b5e3785c3bd54e729d09eb41e5758fc3.jpg",
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
  ];
  // 갤러리 카테고리
  const galleryCategories = [
    {
      id: 1,
      name: "갤러리 전체",
      src: "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      active: true,
    },
    {
      id: 2,
      name: "쌀먹장비",
      src: "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
    },
    {
      id: 3,
      name: "메이플...",
      src: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
    },
    {
      id: 4,
      name: "로드나인",
      src: "https://edge.ssalmuk.com/editorImage/31dfb963f0064106a30044bc7fe4262b.jpg",
    },
    {
      id: 5,
      name: "오픈",
      src: "https://app.ssalmuk.com/images/event_detail/profile_bellyGom_size150.svg",
    },
  ];

  // 사전예약 게임
  const preOrderGames = [
    {
      id: 1,
      name: "메이플스토리월드",
      image: "🎮",
      tag: "뱀피르",
      gradient: "from-orange-400 to-pink-500",
      src: "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
    },
    {
      id: 2,
      name: "RF 온라인 넥스트",
      image: "🚀",
      tag: "메이플스토리",
      gradient: "from-blue-500 to-purple-600",
      src: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
    },
    {
      id: 3,
      name: "아이온2",
      image: "⚔️",
      tag: "아이온2",
      gradient: "from-amber-500 to-red-600",
      src: "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
    },
  ];

  const gameCoupons = [
    {
      id: 1,
      name: "메이플스토리",
      discount: "-57%",
      src: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
    },
    {
      id: 3,
      name: "RF 온라인 넥스트",
      discount: "-57%",
      src: "https://edge.ssalmuk.com/editorImage/6f0ee3a64cd14ca293dd200cfdbdd918.jpg",
    },
    {
      id: 2,
      name: "아이온2",
      discount: "",
      src: "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
    },
  ];

  // 오늘의 인기 생활테크
  const popularItems = [
    {
      id: 1,
      rank: "01",
      title: "[CU편의점] 12월 행운퀴즈 이벤트",
      comments: 89,
      isHot: true,
    },
    {
      id: 2,
      rank: "02",
      title: "[스타벅스] 겨울 신메뉴 출시 기념",
      comments: 123,
      isHot: true,
    },
    {
      id: 3,
      rank: "03",
      title: "[맥도날드] 빅맥 50주년 퀴즈",
      comments: 234,
      isHot: true,
    },
    {
      id: 4,
      rank: "04",
      title: "[GS25] 와인 페스티벌 이벤트",
      comments: 45,
    },
    {
      id: 5,
      rank: "05",
      title: "[올리브영] 신년맞이 럭키드로우",
      comments: 34,
    },
  ];

  return (
    <>
      {/* Main Banner - 스와이퍼 */}
      <div className="relative">
        <Swiper
          modules={[]}
          spaceBetween={0}
          slidesPerView={1}
          className="w-full"
          onSlideChange={(swiper) => setCurrentBanner(swiper.activeIndex)}
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img src={banner} alt="배너" className="w-full h-auto" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 페이지 인디케이터 */}
        <div className="absolute bottom-0 right-0 bg-black/50 text-white text-xs px-2 py-1 z-10">
          {currentBanner + 1} / {banners.length} +
        </div>
      </div>

      {/* Gallery Categories */}
      <div className="px-4 py-3 bg-white rounded-b-2xl">
        <div className="flex items-center gap-2 mb-3"></div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {galleryCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center gap-1 cursor-pointer min-w-[60px]"
              // 👇 여기 onClick 이벤트를 추가했습니다.
              onClick={() => setCurrentPage("channelDetail")}
            >
              <div
                className={`w-14 h-14 rounded-2xl overflow-hidden ${
                  cat.active ? "border-2 border-blue-200" : ""
                }`}
              >
                <img
                  src={cat.src}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-xs ${
                  cat.active ? "text-blue-600 font-medium" : "text-gray-500"
                }`}
              >
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* 내 포인트 섹션 */}
      <div className="px-4 py-3 bg-white mt-2 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./img/4444.png"
              alt="포인트"
              className="w-14 h-14 rounded-full object-contain"
            />
            <div>
              <p className="-mx-3 text-xl font-bold text-gray-900">532P</p>
              <p className="-mx-3 text-xs text-gray-400">내 포인트</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded">
              주간 사용 현도 49,500 원 남음
            </span>
            <span className="text-blue-500">ⓘ</span>
          </div>
        </div>

        {/* 퀵 액션 버튼 */}
        <div className="flex gap-2 mt-3">
          <button
            // className="flex-1 flex items-center justify-center gap-1 bg-gray-100 rounded-lg py-2 text-sm"
            className="px-4 py-2 rounded-xl text-white font-medium"
            onClick={() => setCurrentPage("pointWithdraw")}
          >
            <span className="text-orange-500">💰</span>
            <span className="text-gray-700">출금</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-1 bg-green-50 rounded-lg py-2 text-sm"
            onClick={() => setCurrentPage("pointWithdraw")}
          >
            <span className="text-green-500 font-bold text-xs">pay</span>
            <span className="text-gray-700">전환</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 rounded-lg py-2 text-sm"
            onClick={() => setCurrentPage("gifticonExchange")}
          >
            <span className="text-red-500">🎁</span>
            <span className="text-gray-700">기프티콘</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-1 bg-gray-100 rounded-lg py-2 text-sm"
            onClick={() => setShowHistoryPopup(true)}
          >
            <span>📋</span>
            <span className="text-gray-700">사용내역</span>
          </button>
        </div>
      </div>
      {/* 사전예약 게임이벤트 */}
      <div className="px-4 py-4 bg-white mt-2 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">게임 이벤트</h3>
          </div>
          <button
            className="text-gray-400 text-sm flex items-center gap-1"
            onClick={() => {
              setCurrentPage("preorder");
            }}
          >
            더보기 <span>›</span>
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {preOrderGames.map((game) => (
            <div
              key={game.id}
              className="flex-shrink-0 w-28 cursor-pointer"
              onClick={() => setCurrentPage("eventDetail")}
            >
              <div
                className={`w-28 h-28 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center mb-2 relative overflow-hidden`}
              >
                <img src={game.src} alt="a" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[12px] py-2 text-center h-8">
                  {game.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 오늘의 게임 쿠폰 */}
      <div className="px-4 py-4 bg-white mt-2 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">오늘의 게임 쿠폰</h3>
          <button
            className="text-gray-400 text-sm flex items-center gap-1"
            onClick={() => setCurrentPage("gameCoupon")}
          >
            더보기 <span>›</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {gameCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="flex-shrink-0 w-28 cursor-pointer"
              onClick={() => setCurrentPage(`gameCoupon-${coupon.id}`)}
            >
              <div className="w-28 h-28 rounded-xl mb-2 relative overflow-hidden">
                <img
                  src={coupon.src}
                  alt={coupon.name}
                  className="w-full h-full object-cover"
                />
                {coupon.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                    {coupon.discount}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[12px] py-2 text-center h-8">
                  {coupon.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 오늘의 인기 생활테크 */}
      <div className="px-4 py-4 bg-white mt-2 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">오늘의 인기 생활테크</h3>
          <button
            className="text-gray-400 text-sm flex items-center gap-1"
            onClick={() => {
              setCurrentPage("DailyReward");
              setActiveNav("life");
            }}
          >
            더보기 <span>›</span>
          </button>
        </div>
        <div className="space-y-3">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() =>
                setCurrentPage(`DailyReward-eventDetail-${item.id}`)
              }
            >
              <span
                className={`text-sm font-bold ${
                  item.rank === "01" ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {item.rank}.
              </span>
              <p className="flex-1 text-sm text-gray-800 truncate">
                {item.title}
              </p>
              {item.comments > 0 && (
                <span className="text-red-500 text-sm">{item.comments}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* 바로쌀먹 */}
      <div className="px-4 py-4 bg-white mt-2 rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">바로쌀먹</h3>
          <button
            className="text-gray-400 text-sm"
            onClick={() => {
              setCurrentPage("life");
              setActiveNav("life");
            }}
          >
            더보기 &gt;
          </button>
        </div>

        {/* 바로쌀먹 배너 Swiper */}
        <Swiper
          modules={[]}
          spaceBetween={12}
          slidesPerView={1.1}
          className="w-full"
        >
          {/* 슬라이드 1 */}
          <SwiperSlide
            className="text-gray-400 text-sm"
            onClick={() => {
              setCurrentPage("life-popup");
              setActiveNav("life");
            }}
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://maplestory.vod.nexoncdn.co.kr/Media/ArtWork/artwork_128.jpg"
                alt="바로쌀먹 배너1"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">
                    앱 접속하면 캐시 바로 지급
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    라운드 첫 접속하고 캐시 선물 받으세요
                  </p>
                </div>
              </div>
              <button
                className="w-full mt-3 bg-white border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
                onClick={() => {
                  setCurrentPage("life-popup");
                  setActiveNav("life");
                }}
              >
                앱 접속하면{" "}
                <span className="text-blue-500 font-bold">+ 300캐시</span>
              </button>
            </div>
          </SwiperSlide>

          {/* 슬라이드 2 */}
          <SwiperSlide
            className="text-gray-400 text-sm"
            onClick={() => {
              setCurrentPage("life-popup");
              setActiveNav("life");
            }}
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://dszw1qtcnsa5e.cloudfront.net/community/20250924/c8cc0a2e-ac2b-4291-a03d-0d102dbc0eec/%EC%97%AC%EC%8B%A0%EA%B0%95%EB%A6%BC3%EC%9E%A5%EC%8D%B8%EB%84%A4%EC%9D%BC740x416.png"
                alt="바로쌀먹 배너2"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎮</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">
                    게임 설치하고 포인트 받기
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    신규 게임 설치하면 포인트 지급!
                  </p>
                </div>
              </div>
              <button
                className="w-full mt-3 bg-white border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
                onClick={() => {
                  setCurrentPage("life-popup");
                  setActiveNav("life");
                }}
              >
                게임 접속하면{" "}
                <span className="text-blue-500 font-bold">+ 500포인트</span>
              </button>
            </div>{" "}
          </SwiperSlide>

          {/* 슬라이드 3 */}
          <SwiperSlide
            className="text-gray-400 text-sm"
            onClick={() => {
              setCurrentPage("life-popup");
              setActiveNav("life");
            }}
          >
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://bbscdn.df.nexon.com/data6/commu/202512/e21d33b0-0433-d057-6c0f-0342dfdaae43.jpg"
                alt="바로쌀먹 배너3"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">출석체크 이벤트</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    매일 출석하고 보상 받으세요
                  </p>
                </div>
              </div>
              <button
                className="w-full mt-3 bg-white border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
                onClick={() => {
                  setCurrentPage("life-popup");
                  setActiveNav("life");
                }}
              >
                출석체크하면{" "}
                <span className="text-blue-500 font-bold">+ 100포인트</span>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* 사용내역 팝업 */}
      {showHistoryPopup && (
        <div className="fixed inset-0 z-[9999] flex justify-center">
          <div className="bg-white overflow-y-auto w-full max-w-md">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowHistoryPopup(false)}>
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
                <span className="text-lg font-bold">포인트 내역</span>
              </div>
            </div>

            {/* 포인트 현황 */}
            <div className="px-4 py-4 border-b border-gray-100">
              <p className="text-lg">
                <span style={{ color: "#72C2FF" }} className="font-bold">
                  532
                </span>
                <span className="text-gray-700"> 포인트</span>
              </p>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">└</span>
                    <span className="text-gray-600">적립 포인트</span>
                  </div>
                  <span className="text-gray-900">532</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">└</span>
                    <span className="text-gray-600">이벤트 포인트</span>
                  </div>
                  <span className="text-gray-900">1324</span>
                </div>
              </div>
            </div>

            {/* 배너 */}
            <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-between">
              <div>
                <p className="text-white font-bold">이 게임도 해보세요!</p>
                <p className="text-white/80 text-sm mt-1">
                  게임만 하면 포인트를 드립니다.
                </p>
              </div>
              <span className="text-4xl">👀</span>
            </div>

            {/* 탭 */}
            <div className="flex border-b border-gray-200 mt-4">
              <button
                className={`flex-1 py-3 text-center text-sm font-medium ${
                  historyTab === "충전내역"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-400"
                }`}
                onClick={() => setHistoryTab("충전내역")}
              >
                보상내역
              </button>
              <button
                className={`flex-1 py-3 text-center text-sm font-medium ${
                  historyTab === "사용내역"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-400"
                }`}
                onClick={() => setHistoryTab("사용내역")}
              >
                사용내역
              </button>
            </div>

            {/* 내역 리스트 */}
            <div className="divide-y divide-gray-100">
              {historyTab === "사용내역" ? (
                <>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">3000 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">교촌치킨</p>
                    <p className="text-sm text-gray-600">교촌 허니콤보 구매</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.23 13:41:06
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">5000 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">스타벅스</p>
                    <p className="text-sm text-gray-600">
                      아이스 아메리카노 T 구매
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.20 14:51:35
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">10000 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">배스킨라빈스</p>
                    <p className="text-sm text-gray-600">
                      파인트 아이스크림 구매
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.18 12:31:32
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">2500 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">CU편의점</p>
                    <p className="text-sm text-gray-600">모바일 상품권 구매</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.09 12:53:58
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">15000 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">BBQ치킨</p>
                    <p className="text-sm text-gray-600">
                      황금올리브 반반 구매
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.09 12:53:54
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">4500 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">메가커피</p>
                    <p className="text-sm text-gray-600">아이스 라떼 L 구매</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.07 21:40:54
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">500 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">게임 접속 보상</p>
                    <p className="text-sm text-gray-600">
                      메이플스토리 첫 접속
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.25 10:30:22
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">200 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">
                      이벤트 참여 보상
                    </p>
                    <p className="text-sm text-gray-600">출석체크 7일 달성</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.20 09:15:43
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">100 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">앱 설치 보상</p>
                    <p className="text-sm text-gray-600">
                      RF온라인 넥스트 설치
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.18 14:22:11
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">300 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">
                      게임 플레이 보상
                    </p>
                    <p className="text-sm text-gray-600">아이온2 30분 플레이</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.15 18:45:30
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-bold text-gray-900">50 포인트</p>
                    <p className="text-sm text-gray-600 mt-1">출석 보상</p>
                    <p className="text-sm text-gray-600">일일 출석체크</p>
                    <p className="text-xs text-gray-400 mt-1">
                      23.05.10 08:00:05
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
