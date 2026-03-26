import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Baro({
  initialPopupOpen = false,
  setCurrentPage,
  goBack,
}: {
  initialPopupOpen?: boolean;
  setCurrentPage?: (page: string) => void;
  goBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("참여하고 포인트");
  const [activeFilter, setActiveFilter] = useState("전체");
  const participateFilters = ["전체", "coupang", "SSG.COM", "emart mall"];
  const shoppingFilters = ["전체", "핫딜", "2만 포인트", "BEST", "1+1", "NEW"];
  const [showCashPopup, setShowCashPopup] = useState(initialPopupOpen);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [historyTab, setHistoryTab] = useState("사용내역");
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [sortType, setSortType] = useState("추천순");

  const banners = [
    "https://i.pinimg.com/736x/73/f2/5b/73f25bddf6d88c4a694f250f23e13620.jpg",
    "https://i.pinimg.com/736x/b0/71/d8/b071d8e6afcec80f98d6399b1ab9d16b.jpg",
    "https://i.pinimg.com/736x/c5/29/6e/c5296ef13278652d1d6a859ed1968860.jpg",
  ];

  const filters = ["전체", "coupang", "SSG.COM", "emart mall"];

  const events = [
    {
      id: 1,
      image:
        "https://edge.ssalmuk.com/editorImage/935049a546e744a98c0c77e1d498ae18.png",
      title: "본 어게인: 해골히어로 전격출시",
      description: "덜그럭 거리는 반란의 시작!",
    },
    {
      id: 2,
      image:
        "https://edge.ssalmuk.com/editorImage/7fd53849b50948a2be3006fafd194306.jpg",
      title: "메이플스토리 월드",
      description: "새로운 모험이 시작됩니다!",
    },
    {
      id: 3,
      image:
        "https://edge.ssalmuk.com/editorImage/935049a546e744a98c0c77e1d498ae18.png",
      title: "본 어게인: 해골히어로 전격출시",
      description: "덜그럭 거리는 반란의 시작!",
    },
    {
      id: 4,
      image:
        "https://edge.ssalmuk.com/editorImage/7fd53849b50948a2be3006fafd194306.jpg",
      title: "메이플스토리 월드",
      description: "새로운 모험이 시작됩니다!",
    },
  ];
  const shoppingItems = [
    {
      id: 1,
      image:
        "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/31ba/5c2db0c320438bc3ada9e415a8a5bafce1f598f49c233fa8da5b99b4a880.jpg",
      tag: "EVENT",
      tagColor: "bg-red-500",
      title: "[2025어워드] [코오롱제약] 콘드로이친 상어연골 프리...",
      price: "29,800원",
      originalPrice: "55,000원",
      cash: "22,000",
    },
    {
      id: 2,
      image:
        "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/vendor_inventory/65e6/ce4b5f916cd4acef0d2bfe739ac0c293820da8335503fcd2991a9616d2b5.jpg",
      tag: "EVENT",
      tagColor: "bg-red-500",
      title: "[2025어워드] 업그레이드 신제품! 고함량 김오곤 마시는 알부...",
      price: "32,900원",
      originalPrice: "119,900원",
      cash: "22,000",
    },
    {
      id: 3,
      image:
        "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/2025/10/28/18/8/faa85122-f439-46cc-9bbd-d651b686d771.jpg",
      tag: "BEST",
      tagColor: "bg-yellow-400",
      title: "[베스트셀러] 다이슨 에어랩 멀티 스타일러",
      price: "599,000원",
      originalPrice: "699,000원",
      cash: "35,000",
    },
    {
      id: 4,
      image:
        "https://thumbnail.coupangcdn.com/thumbnails/remote/320x320ex/image/retail/images/356520294251232-c73ad7c0-54a6-4a56-a26a-9a2fd48e46cb.jpg",
      tag: "1+1",
      tagColor: "bg-blue-500",
      title: "[1+1특가] 프리미엄 비타민C 1000mg 120정",
      price: "19,900원",
      originalPrice: "39,800원",
      cash: "15,000",
    },
  ];

  return (
    <>
      {/* 내 포인트 */}
      <div className="bg-white p-4 flex items-center justify-between mt-1 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              src="./img/4444.png"
              alt="포인트"
              className="w-14 h-14 rounded-full object-contain"
            />
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">532원</p>
            <p className="text-xs text-gray-400">내 포인트 →</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600"
            onClick={() => setShowHistoryPopup(true)}
          >
            사용내역
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-600"
            onClick={() => setCurrentPage?.("gallery-barossalmuk")}
          >
            바로쌀먹
            <br />
            <span className="text-[10px]">게시판</span>
          </button>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="bg-white mt-2">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-sm font-medium ${
              activeTab === "참여하고 포인트"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("참여하고 포인트")}
          >
            참여하고 포인트
          </button>
          <button
            className={`flex-1 py-4 text-sm font-medium ${
              activeTab === "쇼핑하고 포인트"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("쇼핑하고 포인트")}
          >
            쇼핑하고 포인트
          </button>
        </div>
      </div>

      {/* 배너 슬라이더 */}
      <div className="bg-white py-2">
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1.1}
          centeredSlides={true}
          pagination={{ clickable: true }}
          className="w-full pb-6"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={banner}
                alt="배너"
                className="w-full h-40 rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 필터 버튼 */}
      <div className="bg-white px-4 py-3">
        <Swiper
          modules={[]}
          spaceBetween={8}
          slidesPerView="auto"
          className="w-full"
        >
          {(activeTab === "참여하고 포인트"
            ? participateFilters
            : shoppingFilters
          ).map((filter) => (
            <SwiperSlide key={filter} className="!w-auto">
              <button
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 전체 개수 & 정렬 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">전체 210개</span>
        <button
          className="text-sm text-gray-500 flex items-center gap-1"
          onClick={() => setShowSortPopup(true)}
        >
          ↕ {sortType}
        </button>
      </div>

      {activeTab === "참여하고 포인트" ? (
        events.map((event) => (
          <div
            key={event.id}
            className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.description}</p>
              <button
                className="w-full mt-3 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700"
                onClick={() => setShowCashPopup(true)}
              >
                게임 접속하면{" "}
                <span className="text-blue-500 font-bold">+ 200포인트</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {shoppingItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt="상품"
                  className="w-full h-40 object-cover"
                />
                <span
                  className={`absolute top-2 left-2 ${item.tagColor} text-white text-[10px] px-2 py-0.5 rounded`}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-700 line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-red-500 font-bold">{item.price}</span>
                  <span className="text-gray-400 text-xs line-through">
                    {item.originalPrice}
                  </span>
                </div>
                <button className="w-full mt-2 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                  +{" "}
                  <span className="text-blue-500 font-bold">
                    {item.cash} 포인트
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 포인트 팝업 */}
      {showCashPopup && (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto flex items-center justify-center">
          <div className="bg-white overflow-y-auto w-full max-w-md">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button
                onClick={() => {
                  setShowCashPopup(false);
                  if (initialPopupOpen && setCurrentPage) {
                    setCurrentPage("home");
                  }
                }}
              >
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
              <span className="text-lg font-bold absolute left-1/2 -translate-x-1/2">
                메이플스토리
              </span>
            </div>

            {/* 배너 이미지 */}
            <div className="w-full h-56 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <img
                src="https://maplestory.vod.nexoncdn.co.kr/Media/ArtWork/artwork_125.jpg"
                alt="이벤트 배너"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 본문 */}
            <div className="px-4 py-6">
              {/* 제목 & 포인트 */}
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                메이플스토리 챌린저스 월드
              </h2>
              <p
                className="text-2xl font-bold mt-2"
                style={{ color: "#72C2FF" }}
              >
                200 포인트
              </p>

              {/* 안내 문구 */}
              <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p>*게임을 최초 내려받는 경우에만 포인트가 지급됩니다.</p>
                <p>*Wifi 환경에서 참여하는 것을 권장 드립니다.</p>
              </div>

              {/* 구분선 */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* 알려드려요 */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">알려드려요!</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-gray-400">·</span>
                    <span>
                      본 이벤트는 쌀먹닷컴 유저 ID당 1회 참여 가능합니다.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400">·</span>
                    <span>
                      신규 참여자만 참여 가능하며, 이미 이벤트 참여를 완료한
                      유저는 포인트가 지급되지 않습니다.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400">·</span>
                    <span>
                      쌀먹닷컴 앱에서 '참여하고 포인트 받기' 버튼을 누른 후
                      이벤트 참여를 완료하면 포인트가 바로 지급됩니다.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400">·</span>
                    <span>포인트 유효기간은 지급일로부터 7일 입니다.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400">·</span>
                    <span>
                      본 이벤트는 당사 사정에 의해 사전 공지 없이 이벤트 내용이
                      변경되거나 조기 종료될 수 있습니다.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 푸터 */}
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-gray-400">@ TAEKANG ST Co., Ltd</p>
            </div>

            {/* 하단 버튼 */}
            <div className="sticky bottom-0 bg-white px-4 py-4 border-t border-gray-100">
              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: "#72C2FF" }}
                onClick={() => setShowCashPopup(false)}
              >
                참여하고 포인트 받기
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 정렬 팝업 */}
      {showSortPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSortPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold">정렬</span>
              <button onClick={() => setShowSortPopup(false)}>
                <svg
                  className="w-6 h-6 text-gray-400"
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

            {/* 정렬 옵션 */}
            <div className="p-4 space-y-1">
              {["추천순", "최신순", "인기순", "포인트 높은순"].map((option) => (
                <button
                  key={option}
                  className="w-full flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => {
                    setSortType(option);
                    setShowSortPopup(false);
                  }}
                >
                  <span
                    className={`text-sm ${
                      sortType === option
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {option}
                  </span>
                  {sortType === option && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "#72C2FF" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
                충전내역
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
