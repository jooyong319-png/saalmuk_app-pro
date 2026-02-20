import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Coupon = {
  id: number;
  name: string;
  description: string;
  image: string;
  codes: any[];
  genre: string;
};

export default function GameCoupon({
  setCurrentPage,
  goBack,
  initialCouponId,
  setIsCouponDetail,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  initialCouponId?: number | null;
  setIsCouponDetail: (value: boolean) => void;
}) {
  const [sortType, setSortType] = useState("최신순");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [alertCoupons, setAlertCoupons] = useState<number[]>([]);
  const [showGenrePopup, setShowGenrePopup] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("전체");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const [showReportPopup, setShowReportPopup] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState("");

  const [likedCoupons, setLikedCoupons] = useState<number[]>([4, 6, 10]);
  const [favoriteTab, setFavoriteTab] = useState<"favorite" | "alert">("favorite");

  const reportReasons = [
    "쿠폰번호가 맞지 않음",
    "장난으로 올린것 같음",
    "기간이 만료됨",
    "보상이 틀리네요",
  ];

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 1700);
    setTimeout(() => setShowToast(false), 2000);
  };

  const genres = [
    { id: "전체", icon: "✨", label: "전체" },
    { id: "MMORPG", icon: "⚔️", label: "MMORPG" },
    { id: "RPG", icon: "🛡️", label: "RPG" },
    { id: "방치형", icon: "✨", label: "방치형" },
    { id: "캐쥬얼", icon: "🎮", label: "캐쥬얼" },
  ];

  const banners = [
    "https://img.itemmania.com/portal/free_coupon/images/1490/url_detail_page_image.jpg",
    "https://img.itemmania.com/portal/free_coupon/images/1487/url_detail_page_image.jpg",
    "https://img.itemmania.com/portal/free_coupon/images/1405/url_detail_page_image.jpg",
  ];

  const coupons: Coupon[] = [
    {
      id: 1,
      name: "메이플스토리",
      description: "Nexon",
      image:
        "https://edge.ssalmuk.com/editorImage/1da2fd817f7d4a89be566fbed7df3bf9.jpg",
      genre: "MMORPG",
      codes: [
        {
          code: "U323KSK3K1K23K",
          issueDate: "2025-10-30",
          expireDate: "정보없음",
          event: "물약100개, 초보자 방어구 세트",
          author: "쿠폰다내꺼",
        },
        {
          code: "U323KSK3K1K23K",
          issueDate: "2025-09-16",
          expireDate: "정보없음",
          event: "물약100개, 초보자 방어구 세트",
        },
      ],
    },
    {
      id: 2,
      name: "아이온2",
      description: "NCSOFT",
      image:
        "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
      genre: "MMORPG",
      codes: [
        {
          code: "AION2LAUNCH",
          issueDate: "2025-08-01",
          expireDate: "2025-12-31",
          event: "출시 기념 쿠폰",
        },
      ],
    },
    {
      id: 3,
      name: "RF 온라인 넥스트",
      description: "Webzen",
      image:
        "https://edge.ssalmuk.com/editorImage/6f0ee3a64cd14ca293dd200cfdbdd918.jpg",
      genre: "MMORPG",
      codes: [
        {
          code: "RFNEXT2025",
          issueDate: "2025-06-01",
          expireDate: "정보없음",
          event: "사전예약 쿠폰",
        },
      ],
    },
    {
      id: 4,
      name: "70억 좀비 히어로",
      description: "HAEGIN",
      image:
        "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
      genre: "RPG",
      codes: [
        {
          code: "ZOMBIE7B",
          issueDate: "2025-07-15",
          expireDate: "2025-11-30",
          event: "시즌 오픈 쿠폰",
        },
      ],
    },
    {
      id: 5,
      name: "99강화 나무 몽둥이 키우기",
      description: "SuperPlanet",
      image:
        "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      genre: "방치형",
      codes: [
        {
          code: "WOODSTICK2025",
          issueDate: "2025-08-01",
          expireDate: "2025-12-31",
          event: "출시 기념 쿠폰",
        },
      ],
    },
    {
      id: 6,
      name: "리니지M",
      description: "NCSOFT",
      image:
        "https://edge.ssalmuk.com/editorImage/f85655d36efc44aaaf692cbef435271d.jpg",
      genre: "MMORPG",
      codes: [
        {
          code: "LINAGEMVIP",
          issueDate: "2025-09-01",
          expireDate: "2025-12-31",
          event: "복귀 유저 지원 패키지",
        },
      ],
    },
    {
      id: 7,
      name: "오딘: 발할라 라이징",
      description: "Kakao Games",
      image:
        "https://edge.ssalmuk.com/editorImage/56ce60fa47784514b73aa0afafbecc99.jpg",
      genre: "MMORPG",
      codes: [
        {
          code: "ODIN2025NEW",
          issueDate: "2025-07-01",
          expireDate: "2025-10-31",
          event: "신규 클래스 출시 기념 쿠폰",
        },
      ],
    },
    {
      id: 8,
      name: "쿠키런: 킹덤",
      description: "Devsisters",
      image:
        "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      genre: "캐쥬얼",
      codes: [
        {
          code: "COOKIEKINGDOM",
          issueDate: "2025-08-15",
          expireDate: "2025-11-15",
          event: "크리스탈 500개 + 쿠키 소환권",
        },
      ],
    },
    {
      id: 9,
      name: "블루 아카이브",
      description: "Nexon",
      image:
        "https://edge.ssalmuk.com/editorImage/86b0f36e3c9c4fbeb623414a29f955cb.jfif",
      genre: "RPG",
      codes: [
        {
          code: "BLUEARCHIVE25",
          issueDate: "2025-06-20",
          expireDate: "2025-09-30",
          event: "청휘석 1200개",
        },
      ],
    },
    {
      id: 10,
      name: "원신",
      description: "miHoYo",
      image:
        "https://edge.ssalmuk.com/editorImage/c93c02b72a9b4a5780f4c66127ca262b.jpg",
      genre: "RPG",
      codes: [
        {
          code: "GENSHIN2025",
          issueDate: "2025-07-10",
          expireDate: "정보없음",
          event: "원석 60개 + 모라 50000",
        },
      ],
    },
  ];

  useEffect(() => {
    setIsCouponDetail(!!selectedCoupon);
  }, [selectedCoupon, setIsCouponDetail]);

  useEffect(() => {
    return () => {
      setIsCouponDetail(false);
    };
  }, [setIsCouponDetail]);

  useEffect(() => {
    if (initialCouponId) {
      const coupon = coupons.find((c) => c.id === initialCouponId);
      if (coupon) setSelectedCoupon(coupon);
    }
  }, [initialCouponId]);

  // 쿠폰 상세 화면
  if (selectedCoupon) {
    return (
      <div className="min-h-screen bg-gray-100 pb-20">
        {/* 상세 헤더 */}
        <div className="sticky top-0 z-40 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedCoupon(null);
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

            <img
              src={selectedCoupon.image}
              alt={selectedCoupon.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="text-gray-900 font-bold">
              {selectedCoupon.name}
            </span>
          </div>

          {/* 하트 & 알람 토글 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const isLiked = likedCoupons.includes(selectedCoupon.id);
                if (isLiked) {
                  setLikedCoupons(
                    likedCoupons.filter((id) => id !== selectedCoupon.id)
                  );
                  showToastMessage("즐겨찾기가 해제되었습니다.");
                } else {
                  setLikedCoupons([...likedCoupons, selectedCoupon.id]);
                  showToastMessage("즐겨찾기가 설정되었습니다.");
                }
              }}
            >
              <svg
                className={`w-6 h-6 ${
                  likedCoupons.includes(selectedCoupon.id)
                    ? "text-red-400 fill-red-400"
                    : "text-gray-400"
                }`}
                fill={
                  likedCoupons.includes(selectedCoupon.id)
                    ? "currentColor"
                    : "none"
                }
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                const isAlerted = alertCoupons.includes(selectedCoupon.id);
                if (isAlerted) {
                  setAlertCoupons(
                    alertCoupons.filter((id) => id !== selectedCoupon.id)
                  );
                  showToastMessage("푸쉬알람이 해제되었습니다.");
                } else {
                  setAlertCoupons([...alertCoupons, selectedCoupon.id]);
                  showToastMessage("푸쉬알람이 설정되었습니다.");
                }
              }}
            >
              <svg
                className={`w-6 h-6 ${
                  alertCoupons.includes(selectedCoupon.id)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
                fill={
                  alertCoupons.includes(selectedCoupon.id)
                    ? "currentColor"
                    : "none"
                }
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
        </div>

        <div className="bg-white">
          {/* 상단 고정 영역 */}
          <div className="bg-white">
            <div className="px-4 pt-4">
              <Swiper
                slidesPerView={1.05}
                spaceBetween={12}
                centeredSlides={false}
              >
                <SwiperSlide>
                  <img
                    src="https://play-lh.googleusercontent.com/v972nBr0WsG3HaYJo-i15UembahYSMwlSzS-OGr8bEeRHR_fYraWUWO6okYA9izUroHtdB0OTN2ZZHCsG32z1Kc=w526-h296-rw"
                    className="w-full h-[160px] object-cover rounded-2xl"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://play-lh.googleusercontent.com/li8xilWmbq-JMNjSckRNtdj4Pc5FsxBHRNpy0LH1YB7F5h2ALrUSHLQa_wYSTZsv12g=w526-h296-rw"
                    className="w-full h-[160px] object-cover rounded-2xl"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://play-lh.googleusercontent.com/glkk8VYm-9pnkKhUlcbgwAii6hWs7rmKbyZngT8opQG8uRSVe3ynvu5VwQNlxLUuNEY=w526-h296-rw"
                    className="w-full h-[160px] object-cover rounded-2xl"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="pb-4">
              <div className="m-1 p-4 border-b">
                <p className="text-sm font-bold text-gray-900">게임 상세정보</p>
                <p className="text-sm text-gray-500 mt-1">
                  세상의 패권을 거머쥘 자 대륙의 패권을 가진 9명의 로드를
                  중심으로 한 대서사시 오르페의 부름을 받아 이세계로 온 당신은
                  과연 10번째 로드로 거듭날 수 있을 것인가!
                </p>
                <button className="mt-2 text-sm text-blue-500 font-medium">
                  더보기 ›
                </button>
              </div>
            </div>
          </div>

          {/* 쿠폰 리스트 */}
          {selectedCoupon.codes.map((couponCode: any, idx: number) => (
            <div key={idx} className="px-4 py-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://edge.ssalmuk.com/editorImage/1c58b4cbb5914bd0bba0ae27e6dd1175.png"
                      alt="프로필"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-1">
                        {couponCode.author || "쪽우살러쥐요"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      쿠폰번호 {couponCode.code}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      기간 {couponCode.issueDate} ~{" "}
                      {couponCode.expireDate === "정보없음"
                        ? "정보없음"
                        : couponCode.expireDate}
                    </p>
                    <p className="text-sm text-red-400 mt-1">
                      {couponCode.event}
                    </p>
                  </div>
                </div>

                <button
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium text-sm flex-shrink-0"
                  onClick={() => showToastMessage("쿠폰번호가 복사되었습니다.")}
                >
                  복사
                </button>
              </div>

              <div className="flex justify-end -mt-5">
                <button
                  className="text-gray-400 p-0.5"
                  onClick={() => setShowReportPopup(true)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 다운로드 버튼 하단 고정 */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 py-4 bg-white border-t border-gray-100">
          <button className="w-full py-3.5 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium text-sm">
            다운로드 받기
          </button>
        </div>

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

        {/* 신고 팝업 */}
        {showReportPopup && (
          <div className="fixed inset-0 z-[9999] flex items-end justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setShowReportPopup(false);
                setSelectedReportReason("");
              }}
            />
            <div className="relative bg-white rounded-t-2xl w-full max-w-md overflow-hidden">
              <div className="px-4 pt-5 pb-3">
                <h3 className="text-base font-bold text-gray-900">
                  이 쿠폰을 신고하는 이유
                </h3>
              </div>

              <div className="px-4">
                {reportReasons.map((reason) => (
                  <button
                    key={reason}
                    className={`w-full py-3 flex items-center justify-between border-t border-gray-100 ${
                      selectedReportReason === reason
                        ? "text-blue-500 font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => setSelectedReportReason(reason)}
                  >
                    <span className="text-sm">{reason}</span>
                    {selectedReportReason === reason && (
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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

              <div className="px-4 py-4">
                <button
                  className={`w-full py-3 rounded-xl font-medium text-sm ${
                    selectedReportReason
                      ? "text-white"
                      : "text-gray-400 bg-gray-200"
                  }`}
                  style={
                    selectedReportReason ? { backgroundColor: "#72C2FF" } : {}
                  }
                  disabled={!selectedReportReason}
                  onClick={() => {
                    showToastMessage("신고가 접수되었습니다.");
                    setShowReportPopup(false);
                    setSelectedReportReason("");
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 메인 화면
  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* 배너 스와이프 */}
      <div className="px-4 py-4 bg-white">
        <div className="relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setCurrentBanner(swiper.activeIndex)}
            className="rounded-2xl overflow-hidden"
          >
            {banners.map((banner, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={banner}
                  alt={`배너 ${idx + 1}`}
                  className="w-full h-auto rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center gap-1.5 z-10">
            {banners.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentBanner === idx ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 즐겨찾기 / 알림설정 탭 */}
      <div className="bg-white px-4 pt-4 pb-4 mt-2">
        <div className="flex gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              favoriteTab === "favorite"
                ? "bg-[#72C2FF] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setFavoriteTab("favorite")}
          >
            즐겨찾기
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              favoriteTab === "alert"
                ? "bg-[#72C2FF] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setFavoriteTab("alert")}
          >
            알림설정
          </button>
        </div>

        {/* 즐겨찾기/알림설정한 게임 아이콘들 */}
        <div className="flex gap-4 overflow-x-auto">
          {coupons
            .filter((c) =>
              favoriteTab === "favorite"
                ? likedCoupons.includes(c.id)
                : alertCoupons.includes(c.id)
            )
            .map((coupon) => (
              <button
                key={coupon.id}
                className="flex flex-col items-center gap-1 min-w-[60px]"
                onClick={() => setSelectedCoupon(coupon)}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={coupon.image}
                    alt={coupon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600 truncate w-full text-center">
                  {coupon.name.length > 5
                    ? coupon.name.slice(0, 5) + "..."
                    : coupon.name}
                </span>
              </button>
            ))}
          {(favoriteTab === "favorite" ? likedCoupons : alertCoupons).length ===
            0 && (
            <p className="text-sm text-gray-400">
              {favoriteTab === "favorite"
                ? "즐겨찾기한 게임이 없습니다"
                : "알림설정한 게임이 없습니다"}
            </p>
          )}
        </div>
      </div>

      {/* 정렬 & 장르 필터 */}
      <div className="px-4 py-3 bg-white flex items-center justify-between mt-2">
        <button
          className="text-sm text-gray-700 flex items-center gap-1"
          onClick={() =>
            setSortType(sortType === "최신순" ? "추천순" : "최신순")
          }
        >
          {sortType} <span className="text-xs">↕</span>
        </button>
        <button
          className="text-sm text-gray-500 font-medium flex items-center gap-1"
          onClick={() => setShowGenrePopup(true)}
        >
          {selectedGenre} <span className="text-xs">↕</span>
        </button>
      </div>

      {/* 고정쿠폰 리스트 */}
      <div className="bg-white">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setSelectedCoupon(coupon)}
            >
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden">
                  <img
                    src={coupon.image}
                    alt={coupon.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow">
                  {Math.floor(Math.random() * 20) + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-base">
                  {coupon.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {coupon.description}
                </p>
              </div>
              <span className="text-sm text-gray-400 flex-shrink-0">
                {coupon.genre}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 장르 선택 팝업 */}
      {showGenrePopup && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowGenrePopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold">장르</span>
              <button onClick={() => setShowGenrePopup(false)}>
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
            <div className="py-2">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  onClick={() => {
                    setSelectedGenre(genre.label);
                    setShowGenrePopup(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{genre.icon}</span>
                    <span
                      className={`text-sm ${
                        selectedGenre === genre.label
                          ? "text-gray-900 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {genre.label}
                    </span>
                  </div>
                  {selectedGenre === genre.label && (
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
