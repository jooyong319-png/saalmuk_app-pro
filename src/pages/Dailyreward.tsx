import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type EventItem = {
  id: number;
  tags: { label: string; color: string }[];
  title: string;
  reward: string;
  people: string;
  period: string;
  dDay: string;
  status: "진행중" | "발표전" | "발표완료";
};

export default function DailyReward({
  setCurrentPage,
  isMyEntriesMode = false,
}: {
  setCurrentPage: (page: string) => void;
  isMyEntriesMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("이벤트");
  const [sortType, setSortType] = useState("최신순");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [viewType, setViewType] = useState<"card" | "list">("list");
  const [selectedPrizes, setSelectedPrizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const isMyEntries = isMyEntriesMode;
  const [tradeTab, setTradeTab] = useState<"구매" | "판매">("구매");

  const tabs = ["이벤트", "공모전", "장터", "커뮤니티"];
  const sortOptions = isMyEntries
    ? ["최신순", "오늘마감", "오늘발표", "발표완료", "당첨"]
    : ["최신순", "오늘마감", "오늘발표", "발표완료"];
  const banners = [
    {
      bg: "bg-gradient-to-r from-purple-600 to-purple-400",
      badge: "🎁 더 쉬워졌어요!",
      title: "랜덤박스 열고",
      highlight: "최대 700캐시 받기",
    },
    {
      bg: "bg-gradient-to-r from-blue-600 to-cyan-400",
      badge: "🎯 신규 이벤트!",
      title: "퀴즈 풀고",
      highlight: "기프티콘 받자",
    },
    {
      bg: "bg-gradient-to-r from-orange-500 to-pink-500",
      badge: "⏰ 마감임박!",
      title: "출석체크하고",
      highlight: "포인트 2배 적립",
    },
  ];

  const filterOptions = ["퀴즈", "댓글", "출석", "미션", "HOT", "완료", "NEW"];

  const events: EventItem[] = [
    {
      id: 1,
      tags: [
        { label: "퀴즈", color: "bg-purple-100 text-purple-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[CU편의점] 12월 행운퀴즈 이벤트",
      reward: "CU 5천원권",
      people: "100명",
      period: "01-10 ~ 01-15",
      dDay: "D-3",
      status: "진행중",
    },
    {
      id: 2,
      tags: [
        { label: "댓글", color: "bg-green-100 text-green-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[스타벅스] 겨울 신메뉴 출시 기념",
      reward: "아메리카노 T",
      people: "50명",
      period: "01-10 ~ 01-15",
      dDay: "오늘",
      status: "진행중",
    },
    {
      id: 3,
      tags: [{ label: "퀴즈", color: "bg-purple-100 text-purple-600" }],
      title: "[맥도날드] 빅맥 50주년 퀴즈",
      reward: "빅맥세트",
      people: "500명",
      period: "01-10 ~ 01-15",
      dDay: "마감",
      status: "발표전",
    },
    {
      id: 4,
      tags: [{ label: "출석", color: "bg-blue-100 text-blue-600" }],
      title: "[GS25] 1월 출석체크 이벤트",
      reward: "GS25 3천원권",
      people: "200명",
      period: "01-01 ~ 01-31",
      dDay: "발표완료",
      status: "발표완료",
    },
    {
      id: 5,
      tags: [
        { label: "미션", color: "bg-orange-100 text-orange-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[배달의민족] 리뷰 작성 이벤트",
      reward: "배민 1만원권",
      people: "30명",
      period: "01-08 ~ 01-20",
      dDay: "D-5",
      status: "진행중",
    },
    {
      id: 6,
      tags: [{ label: "퀴즈", color: "bg-purple-100 text-purple-600" }],
      title: "[올리브영] 신상품 퀴즈 이벤트",
      reward: "올리브영 1만원권",
      people: "150명",
      period: "01-12 ~ 01-25",
      dDay: "오늘",
      status: "발표전",
    },
    {
      id: 7,
      tags: [{ label: "댓글", color: "bg-green-100 text-green-600" }],
      title: "[이마트] 설맞이 댓글 이벤트",
      reward: "이마트 상품권 5만원",
      people: "20명",
      period: "01-15 ~ 01-25",
      dDay: "D-7",
      status: "진행중",
    },
    {
      id: 8,
      tags: [
        { label: "출석", color: "bg-blue-100 text-blue-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[네이버페이] 출석체크 포인트 지급",
      reward: "네이버페이 1000원",
      people: "1000명",
      period: "01-01 ~ 01-31",
      dDay: "D-12",
      status: "진행중",
    },
    {
      id: 9,
      tags: [{ label: "미션", color: "bg-orange-100 text-orange-600" }],
      title: "[카카오뱅크] 저금통 미션 이벤트",
      reward: "현금 5만원",
      people: "10명",
      period: "01-05 ~ 01-20",
      dDay: "마감",
      status: "발표전",
    },
    {
      id: 10,
      tags: [{ label: "퀴즈", color: "bg-purple-100 text-purple-600" }],
      title: "[롯데시네마] 영화 퀴즈 이벤트",
      reward: "영화 예매권 2매",
      people: "300명",
      period: "01-08 ~ 01-18",
      dDay: "발표완료",
      status: "발표완료",
    },
    {
      id: 11,
      tags: [
        { label: "댓글", color: "bg-green-100 text-green-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[교보문고] 신년 독서 댓글 이벤트",
      reward: "도서상품권 3만원",
      people: "50명",
      period: "01-10 ~ 01-28",
      dDay: "D-10",
      status: "진행중",
    },
    {
      id: 12,
      tags: [{ label: "출석", color: "bg-blue-100 text-blue-600" }],
      title: "[토스] 매일 출석 이벤트",
      reward: "토스포인트 500원",
      people: "5000명",
      period: "01-01 ~ 01-31",
      dDay: "오늘",
      status: "진행중",
    },
    {
      id: 13,
      tags: [{ label: "미션", color: "bg-orange-100 text-orange-600" }],
      title: "[쿠팡] 로켓와우 가입 이벤트",
      reward: "쿠팡캐시 1만원",
      people: "100명",
      period: "01-12 ~ 01-22",
      dDay: "발표완료",
      status: "발표완료",
    },
    {
      id: 14,
      tags: [
        { label: "퀴즈", color: "bg-purple-100 text-purple-600" },
        { label: "HOT", color: "bg-red-500 text-white" },
      ],
      title: "[삼성전자] 갤럭시 퀴즈 이벤트",
      reward: "갤럭시 버즈3",
      people: "5명",
      period: "01-15 ~ 01-30",
      dDay: "D-14",
      status: "진행중",
    },
    {
      id: 15,
      tags: [{ label: "댓글", color: "bg-green-100 text-green-600" }],
      title: "[다이소] 신상품 댓글 이벤트",
      reward: "다이소 상품권 1만원",
      people: "200명",
      period: "01-08 ~ 01-15",
      dDay: "마감",
      status: "발표전",
    },
  ];

  // 정렬/필터 로직
  const filteredEvents = events.filter((event) => {
    switch (sortType) {
      case "최신순":
        return true;
      case "오늘마감":
        return event.status === "진행중" && event.dDay === "오늘";
      case "오늘발표":
        return event.status === "발표전";
      case "발표완료":
        return event.status === "발표완료";
      case "당첨":
        return event.status === "발표완료"; // 당첨된 이벤트 (실제로는 당첨 여부 필드 필요)
      default:
        return true;
    }
  });
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 1700);
    setTimeout(() => setShowToast(false), 2000);
  };

  const togglePrize = (prize: string) => {
    if (selectedPrizes.includes(prize)) {
      setSelectedPrizes(selectedPrizes.filter((p) => p !== prize));
    } else {
      setSelectedPrizes([...selectedPrizes, prize]);
    }
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* 헤더 - App.tsx 공통 헤더 사용하므로 여기선 탭만 */}
      <div className="bg-white">
        {/* 탭 메뉴 */}
        <div className="flex px-4 gap-6 border-b border-gray-100">
          {(isMyEntries ? ["이벤트", "공모전"] : tabs).map((tab) => (
            <button
              key={tab}
              className={`py-3 text-sm font-medium relative ${
                activeTab === tab ? "text-gray-900" : "text-gray-400"
              }`}
              onClick={() => {
                // 커뮤니티 탭 클릭 시 페이지 이동
                if (tab === "커뮤니티") {
                  setCurrentPage("DailyCommunity");
                  return;
                }

                // 장터 탭 클릭 시 페이지 변경
                if (tab === "장터") {
                  setCurrentPage("DailyReward-market");
                } else {
                  setCurrentPage("DailyReward");
                }
                setActiveTab(tab);
                // 탭 변경 시 sortType 초기화
                if (tab === "장터") {
                  setSortType("판매중");
                } else {
                  setSortType("최신순");
                }
              }}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        {/* 정렬 옵션 */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto">
          {activeTab === "장터" ? (
            // 장터 전용 필터
            <>
              <button
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex items-center gap-1 ${
                  sortType === "판매중"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={
                  sortType === "판매중" ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setSortType("판매중")}
              >
                판매중
                <span
                  className={`px-1.5 rounded text-xs ${
                    sortType === "판매중"
                      ? "bg-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  style={sortType === "판매중" ? { color: "#72C2FF" } : {}}
                >
                  5
                </span>
              </button>
              <button
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex items-center gap-1 ${
                  sortType === "내거래"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={
                  sortType === "내거래" ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setSortType("내거래")}
              >
                내거래
                <span
                  className={`px-1.5 rounded text-xs ${
                    sortType === "내거래"
                      ? "bg-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  style={sortType === "내거래" ? { color: "#72C2FF" } : {}}
                >
                  2
                </span>
              </button>
              <button
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap flex items-center gap-1 ${
                  sortType === "판매"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={
                  sortType === "판매" ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setSortType("판매")}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                판매
              </button>
              <button
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap ${
                  sortType === "내캐쉬"
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={
                  sortType === "내캐쉬" ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setSortType("내캐쉬")}
              >
                내캐쉬
              </button>
            </>
          ) : (
            // 기존 이벤트/공모전 필터
            sortOptions.map((option) => (
              <button
                key={option}
                className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap border ${
                  sortType === option
                    ? "text-white border-transparent"
                    : "bg-white text-gray-700"
                }`}
                style={
                  sortType === option ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setSortType(option)}
              >
                {option}
              </button>
            ))
          )}
        </div>
      </div>

      {/* 배너 - 내응모함이 아닐 때만 표시 */}
      {activeTab !== "장터" && !isMyEntries && (
        <div className="px-4 py-3">
          <div className="relative">
            <Swiper
              spaceBetween={12}
              slidesPerView={1.1}
              onSlideChange={(swiper) => setCurrentBanner(swiper.activeIndex)}
              className="w-full"
            >
              {banners.map((banner, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className={`${banner.bg} rounded-2xl p-4 h-[120px] relative overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <p className="text-white text-xs mb-1">{banner.badge}</p>
                      <p className="text-white font-bold text-lg">
                        {banner.title}
                      </p>
                      <p className="text-yellow-300 font-bold text-xl">
                        {banner.highlight}
                      </p>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 bg-white/20 rounded-xl rotate-12"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-center gap-1.5 mt-3">
              {banners.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    currentBanner === idx ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 정렬 & 필터 */}
      {!(
        activeTab === "장터" &&
        (sortType === "내거래" || sortType === "판매" || sortType === "내캐쉬")
      ) && (
        <div className="px-4 py-2 flex items-center justify-between">
          {activeTab === "장터" ? (
            // 장터일 때 - 오른쪽에 전체만 표시
            <>
              <div></div>
              <button className="text-sm text-gray-500 flex items-center gap-1">
                전체
                <span className="text-xs">▼</span>
              </button>
            </>
          ) : (
            // 기존 이벤트/공모전일 때
            <>
              <button className="text-sm text-gray-700 flex items-center gap-1">
                최신순 <span className="text-xs">↕</span>
              </button>
              <button
                className="text-sm text-gray-500 flex items-center gap-1"
                onClick={() => setShowFilterPopup(true)}
              >
                {sortType} ({filteredEvents.length}건)
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* 이벤트 리스트 또는 장터 */}
      {activeTab === "장터" ? (
        // 장터 화면
        <div className="bg-white">
          {sortType === "내거래" ? (
            // 내거래 화면
            <>
              {/* 구매/판매 탭 */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-3 text-sm font-medium text-center ${
                    tradeTab === "구매"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400"
                  }`}
                  onClick={() => setTradeTab("구매")}
                >
                  구매 내역 (1)
                </button>
                <button
                  className={`flex-1 py-3 text-sm font-medium text-center ${
                    tradeTab === "판매"
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-400"
                  }`}
                  onClick={() => setTradeTab("판매")}
                >
                  판매 내역 (1)
                </button>
              </div>

              {/* 거래 내역 리스트 */}
              <div className="px-4 py-3 space-y-3">
                {tradeTab === "구매" ? (
                  // 구매 내역
                  <>
                    {[
                      {
                        icon: "🐤",
                        brand: "스타벅스",
                        name: "카페라떼 Grande",
                        seller: "기프티마스터",
                        price: "5,500원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🐤",
                        brand: "스타벅스",
                        name: "카페라떼 Grande",
                        seller: "기프티마스터",
                        price: "5,500원",
                        status: "분쟁중",
                        hasTimer: false,
                      },
                      {
                        icon: "🍔",
                        brand: "맥도날드",
                        name: "빅맥세트",
                        seller: "쿠폰왕",
                        price: "6,500원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🥛",
                        brand: "공차",
                        name: "블랙밀크티+펄 L",
                        seller: "당첨헌터",
                        price: "4,200원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🍕",
                        brand: "도미노피자",
                        name: "포테이토 M",
                        seller: "피자러버",
                        price: "14,000원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "☕",
                        brand: "투썸플레이스",
                        name: "아이스 아메리카노",
                        seller: "커피매니아",
                        price: "3,800원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🍦",
                        brand: "배스킨라빈스",
                        name: "파인트 아이스크림",
                        seller: "디저트킹",
                        price: "8,900원",
                        status: "분쟁중",
                        hasTimer: false,
                      },
                      {
                        icon: "🍗",
                        brand: "BBQ",
                        name: "황금올리브 반반",
                        seller: "치킨마스터",
                        price: "18,000원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🎬",
                        brand: "CGV",
                        name: "영화 예매권 2매",
                        seller: "영화덕후",
                        price: "15,000원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🛒",
                        brand: "CU",
                        name: "5천원 금액권",
                        seller: "편의점왕",
                        price: "4,500원",
                        status: "거래중",
                        hasTimer: true,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-4 border border-gray-200"
                        onClick={() => setCurrentPage(`tradeDetail-${idx}`)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400">
                                  {item.brand}
                                </p>
                                <p className="font-bold text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded ${
                                  item.status === "거래중"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : item.status === "분쟁중"
                                    ? "bg-red-100 text-red-500"
                                    : "bg-blue-100 text-blue-500"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 판매자 + 가격 라인 */}
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-500">
                            <span className="text-gray-400">판매자</span>{" "}
                            {item.seller}
                          </p>
                          <p className="font-bold text-gray-900">
                            {item.price}
                          </p>
                        </div>

                        {item.hasTimer && (
                          <button className="mt-3 w-full px-3 py-2 text-xs rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center gap-1 border border-yellow-200">
                            <span>⏰</span> 자동 확정 예정
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  // 판매 내역
                  <>
                    {[
                      {
                        icon: "🍔",
                        brand: "맥도날드",
                        name: "빅맥세트",
                        buyer: "쌀먹초보",
                        price: "6,500원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🐤",
                        brand: "스타벅스",
                        name: "아메리카노 T",
                        buyer: "커피중독",
                        price: "3,650원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🍕",
                        brand: "도미노피자",
                        name: "슈퍼디럭스 M",
                        buyer: "피자헌터",
                        price: "16,000원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🥛",
                        brand: "공차",
                        name: "타로밀크티 L",
                        buyer: "밀크티러버",
                        price: "4,800원",
                        status: "분쟁중",
                        hasTimer: false,
                      },
                      {
                        icon: "☕",
                        brand: "이디야",
                        name: "아메리카노 2잔",
                        buyer: "아아매니아",
                        price: "5,200원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🍦",
                        brand: "하겐다즈",
                        name: "파인트 2개",
                        buyer: "아이스덕후",
                        price: "12,000원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🎮",
                        brand: "넥슨캐시",
                        name: "1만원권",
                        buyer: "게임러버",
                        price: "9,000원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                      {
                        icon: "🛒",
                        brand: "GS25",
                        name: "3천원 금액권",
                        buyer: "편의점헌터",
                        price: "2,700원",
                        status: "거래중",
                        hasTimer: true,
                      },
                      {
                        icon: "🍗",
                        brand: "교촌치킨",
                        name: "허니콤보",
                        buyer: "치킨마니아",
                        price: "17,500원",
                        status: "분쟁중",
                        hasTimer: false,
                      },
                      {
                        icon: "🎬",
                        brand: "롯데시네마",
                        name: "영화 예매권",
                        buyer: "영화광",
                        price: "9,500원",
                        status: "구매확정",
                        hasTimer: false,
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-4 border border-gray-200"
                        onClick={() => setCurrentPage(`tradeDetail-${idx}`)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-gray-400">
                                  {item.brand}
                                </p>
                                <p className="font-bold text-gray-900">
                                  {item.name}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded ${
                                  item.status === "거래중"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : item.status === "분쟁중"
                                    ? "bg-red-100 text-red-500"
                                    : "bg-blue-100 text-blue-500"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 구매자 + 가격 라인 */}
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-gray-500">
                            <span className="text-gray-400">구매자</span>{" "}
                            {item.buyer}
                          </p>
                          <p className="font-bold text-gray-900">
                            {item.price}
                          </p>
                        </div>

                        {item.hasTimer && (
                          <button className="mt-3 w-full px-3 py-2 text-xs rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center gap-1 border border-yellow-200">
                            <span>⏰</span> 자동 확정 예정
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : sortType === "판매" ? (
            // 판매 등록 화면
            <div className="px-4 py-4">
              {/* 안전결제 안내 */}
              <div className="flex items-center justify-center gap-2 py-3 bg-blue-50 rounded-xl mb-6">
                <span className="text-red-500">🛡️</span>
                <span className="text-sm text-blue-600">
                  모든 거래는 <span className="font-bold">안전결제</span>로
                  보호됩니다
                </span>
              </div>

              {/* 브랜드 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  브랜드
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm appearance-none bg-white text-gray-500">
                    <option>브랜드 선택</option>
                    <option>스타벅스</option>
                    <option>맥도날드</option>
                    <option>CU</option>
                    <option>GS25</option>
                    <option>배스킨라빈스</option>
                    <option>도미노피자</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* 상품명 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  상품명
                </label>
                <input
                  type="text"
                  placeholder="예: 아메리카노 Tall"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400"
                />
              </div>

              {/* 정가 / 판매가 */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    정가
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    판매가
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400"
                  />
                </div>
              </div>

              {/* 유효기간 */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  유효기간
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="연도-월-일"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400"
                  />
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* 쿠폰 이미지 */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  쿠폰 이미지
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-300 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm text-gray-400">
                    바코드가 보이는 이미지 첨부
                  </p>
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                  <span className="text-red-500">🛡️</span> 등록된 쿠폰은
                  안전결제로만 거래됩니다
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-green-500">✓</span> 구매자가 구매확정 후
                  예치금으로 정산됩니다
                </p>
              </div>

              {/* 등록하기 버튼 */}
              <button className="w-full py-4 rounded-xl text-white font-bold text-base bg-gray-400">
                등록하기
              </button>
            </div>
          ) : sortType === "내캐쉬" ? (
            // 내캐쉬 화면
            <div className="pb-4">
              {/* 상단 캐쉬 정보 카드 */}
              <div className="mx-4 mt-4 p-5 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400">
                <p className="text-white/80 text-sm mb-1">내캐쉬</p>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white text-3xl font-bold">
                    25,400 <span className="text-lg">원</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-medium"
                      onClick={() => setCurrentPage("cashCharge")}
                    >
                      충전
                    </button>
                    <button
                      className="px-4 py-2 bg-white/20 rounded-lg text-white text-sm font-medium"
                      onClick={() => setCurrentPage("cashWithdraw")}
                    >
                      출금
                    </button>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/20 rounded-xl py-3 text-center">
                    <p className="text-white/70 text-xs mb-1">이번달 판매</p>
                    <p className="text-white font-bold">45,000원</p>
                  </div>
                  <div className="flex-1 bg-white/20 rounded-xl py-3 text-center">
                    <p className="text-white/70 text-xs mb-1">거래완료</p>
                    <p className="text-white font-bold">12건</p>
                  </div>
                </div>
              </div>

              {/* 캐쉬 상세 정보 */}
              <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-200">
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">출금가능</span>
                    <span className="text-sm font-bold text-gray-900">
                      25,400원
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      거래대기 (에스크로)
                    </span>
                    <span className="text-sm font-bold text-yellow-400">
                      5,500원
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">정산예정</span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#72C2FF" }}
                    >
                      4,462원
                    </span>
                  </div>
                </div>
              </div>

              {/* 최근 내역 */}
              <div className="mx-4 mt-4">
                <h3 className="font-bold text-gray-900 mb-3">최근 내역</h3>
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                  {[
                    {
                      icon: "💰",
                      iconBg: "bg-yellow-100",
                      title: "예치금 충전",
                      date: "2025-01-10",
                      amount: "+30,000원",
                      color: "text-blue-500",
                    },
                    {
                      icon: "🛒",
                      iconBg: "bg-purple-100",
                      title: "스타벅스 카페라떼 구매",
                      date: "2025-01-10",
                      amount: "-5,500원",
                      color: "text-red-500",
                    },
                    {
                      icon: "💵",
                      iconBg: "bg-green-100",
                      title: "CU 상품권 판매 정산",
                      date: "2025-01-09",
                      amount: "+4,462원",
                      color: "text-blue-500",
                    },
                    {
                      icon: "🛒",
                      iconBg: "bg-purple-100",
                      title: "맥도날드 빅맥세트 구매",
                      date: "2025-01-08",
                      amount: "-6,500원",
                      color: "text-red-500",
                    },
                    {
                      icon: "💵",
                      iconBg: "bg-green-100",
                      title: "GS25 상품권 판매 정산",
                      date: "2025-01-07",
                      amount: "+2,700원",
                      color: "text-blue-500",
                    },
                    {
                      icon: "💰",
                      iconBg: "bg-yellow-100",
                      title: "예치금 충전",
                      date: "2025-01-05",
                      amount: "+10,000원",
                      color: "text-blue-500",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${item.iconBg} rounded-full flex items-center justify-center text-lg`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-400">{item.date}</p>
                      </div>
                      <p className={`text-sm font-bold ${item.color}`}>
                        {item.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // 판매중 - 기존 장터 상품 리스트
            <div className="px-4 space-y-3 pb-4">
              {[
                {
                  icon: "🐤",
                  iconBg: "bg-yellow-100",
                  brand: "스타벅스",
                  dDay: "D-30",
                  name: "아메리카노 T",
                  originalPrice: "4,700원",
                  salePrice: "3,650원",
                  discount: "22%↓",
                  seller: "쌀먹고수",
                  rating: 5,
                  trades: 128,
                },
                {
                  icon: "🍔",
                  iconBg: "bg-yellow-50",
                  brand: "맥도날드",
                  dDay: "D-14",
                  name: "빅맥세트",
                  originalPrice: "8,900원",
                  salePrice: "6,500원",
                  discount: "27%↓",
                  seller: "이벤트헌터",
                  rating: 5,
                  trades: 89,
                },
                {
                  icon: "🥛",
                  iconBg: "bg-purple-50",
                  brand: "공차",
                  dDay: "D-21",
                  name: "블랙밀크티+펄 L",
                  originalPrice: "5,500원",
                  salePrice: "4,200원",
                  discount: "24%↓",
                  seller: "당첨왕",
                  rating: 4.8,
                  trades: 234,
                },
                {
                  icon: "🍕",
                  iconBg: "bg-orange-50",
                  brand: "도미노피자",
                  dDay: "D-45",
                  name: "포테이토 M",
                  originalPrice: "19,900원",
                  salePrice: "14,000원",
                  discount: "30%↓",
                  seller: "쿠폰마스터",
                  rating: 5,
                  trades: 67,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-gray-200 flex items-center gap-3"
                >
                  {/* 아이콘 */}
                  <div
                    className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center text-2xl`}
                  >
                    {item.icon}
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">
                        {item.brand}
                      </span>
                      <span className="text-xs text-gray-300">{item.dDay}</span>
                    </div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 line-through">
                        {item.originalPrice}
                      </span>
                      <span className="font-bold" style={{ color: "#72C2FF" }}>
                        {item.salePrice}
                      </span>
                      <span className="text-xs text-red-500">
                        {item.discount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>{item.seller}</span>
                      <span className="flex items-center gap-0.5">
                        <span className="text-yellow-400">★</span> {item.rating}
                      </span>
                      <span>거래 {item.trades}</span>
                    </div>
                  </div>

                  {/* 구매하기 버튼 */}
                  <button
                    className="px-4 py-2 text-white rounded-lg text-sm font-medium"
                    style={{ backgroundColor: "#72C2FF" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentPage(`purchaseDetail-${idx}`);
                    }}
                  >
                    구매하기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // 기존 이벤트/공모전 리스트
        <div className="px-4 py-2 space-y-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
                onClick={() =>
                  setCurrentPage(`dailyEventDetail-${event.id}-${event.dDay}`)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 태그 */}
                    <div className="flex gap-1.5 mb-2">
                      {event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                      {/* 상태 태그 추가 */}
                      {event.status === "발표완료" && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500 text-white">
                          발표완료
                        </span>
                      )}
                      {event.status === "발표전" && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-600">
                          발표전
                        </span>
                      )}
                      {event.status === "진행중" && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-600">
                          진행중
                        </span>
                      )}
                    </div>

                    {/* 제목 */}
                    <h3 className="font-bold text-gray-900 text-sm mb-2">
                      {event.title}
                    </h3>

                    {/* 보상 정보 */}
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-red-500 font-medium">
                        {event.people}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-red-500 font-medium">
                        {event.reward}
                      </span>
                    </div>

                    {/* 기간 */}
                    <p className="text-xs text-gray-400 mt-1">{event.period}</p>
                  </div>

                  {/* D-Day */}
                  <div className="text-right">
                    <span
                      className={`text-sm font-bold ${
                        event.dDay === "오늘" ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      {event.dDay}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400">
              해당하는 이벤트가 없습니다.
            </div>
          )}
        </div>
      )}

      {/* 필터 팝업 */}
      {showFilterPopup && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilterPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            {/* 헤더 */}
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold">필터 옵션</span>
              <button onClick={() => setShowFilterPopup(false)}>
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

            {/* View 옵션 */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-xs text-gray-400 mb-2">View</p>
              <div className="space-y-2">
                <button
                  className={`w-full flex items-center justify-between py-2 ${
                    viewType === "card" ? "text-gray-900" : "text-gray-500"
                  }`}
                  onClick={() => setViewType("card")}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z" />
                    </svg>
                    <span>카드형</span>
                  </div>
                  {viewType === "card" && (
                    <span className="text-blue-500">✓</span>
                  )}
                </button>
                <button
                  className={`w-full flex items-center justify-between py-2 ${
                    viewType === "list" ? "text-gray-900" : "text-gray-500"
                  }`}
                  onClick={() => setViewType("list")}
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v1.43H3.8V5.3c0-.83.67-1.5 1.5-1.5zm10.9 4.73v2.93H3.8V8.53h12.4zm-1.5 7.67H5.3c-.83 0-1.5-.67-1.5-1.5v-1.43h12.4v1.43c0 .83-.67 1.5-1.5 1.5z" />
                    </svg>
                    <span>목록형</span>
                  </div>
                  {viewType === "list" && (
                    <span className="text-blue-500">✓</span>
                  )}
                </button>
              </div>
            </div>

            {/* 경품종류 */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 mb-3">경품종류</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "현금/주유/금",
                  "음료/식품/외식",
                  "항공/여행/숙박",
                  "도서/굿즈",
                  "가전제품",
                  "IT/스마트기기",
                  "화장품/뷰티",
                  "현금성상품권",
                  "적립금/할인쿠폰",
                  "생활/패션/잡화",
                  "완구/아동/육아",
                  "영화/공연/전시",
                  "건강/운동",
                  "기타",
                ].map((item) => (
                  <button
                    key={item}
                    className={`px-2 py-2 rounded-full text-xs border text-center ${
                      selectedPrizes.includes(item)
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => togglePrize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모형태 */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 mb-3">응모형태</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "작문/댓글",
                  "퀴즈",
                  "인증샷",
                  "팔로우/구독",
                  "공유/초대",
                  "설문/투표",
                  "기타",
                  "체험단",
                  "신규가입",
                  "단순응모",
                  "구매/샘플",
                  "선착순",
                  "100%당첨",
                  "출석체크",
                  "앱설치",
                ].map((item) => (
                  <button
                    key={item}
                    className={`px-2 py-2 rounded-full text-xs border text-center ${
                      selectedTypes.includes(item)
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => toggleType(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모플랫폼 */}
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 mb-3">
                응모플랫폼
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: "🏠", label: "홈페이지" },
                  { icon: "📘", label: "페이스북" },
                  { icon: "📸", label: "인스타그램" },
                  { icon: "▶️", label: "유튜브" },
                  { icon: "🟢", label: "네이버블로그" },
                  { icon: "☕", label: "네이버카페" },
                  { icon: "💬", label: "카카오톡채널" },
                  { icon: "🟡", label: "카카오스토리" },
                  { icon: "✖", label: "X (트위터)" },
                  { icon: "📱", label: "APP전용" },
                  { icon: "🔗", label: "스레드" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`px-2 py-2 rounded-full text-xs border flex items-center justify-center gap-1 ${
                      selectedPlatforms.includes(item.label)
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                    onClick={() => togglePlatform(item.label)}
                  >
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {showToast && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full flex items-center gap-2 z-[9999] whitespace-nowrap transition-all duration-300 ease-out ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <span className="text-green-400">✓</span>
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
