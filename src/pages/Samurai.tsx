import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Samurai({
  setCurrentPage,
  goBack,
  initialTab = "소개",
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [reviewTab, setReviewTab] = useState("유저평가");
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("인기글");
  const [showSortModal, setShowSortModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [showArrowPopup, setShowArrowPopup] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [showAwardHistory, setShowAwardHistory] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewReward, setReviewReward] = useState("");

  const tabs = [
    "소개",
    "평가글",
    "게임이벤트",
    "게임쿠폰",
    "쌀먹점수",
    "코인시세",
    "커뮤니티",
  ];

  const reviews = [
    {
      id: 1,
      name: "소보로",
      level: 7,
      date: "2025-07-30",
      rating: 4.0,
      stars: "★★★★☆",
      image:
        "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      content: [
        "게임이라기 보단 메타월드죠.",
        "가상 공간에 내 땅사고, 임대로 받고 그런느낌.",
      ],
      likes: 12,
      comments: 3,
      views: 124,
    },
    {
      id: 2,
      name: "게임러버",
      level: 12,
      date: "2025-07-28",
      rating: 3.0,
      stars: "★★★☆☆",
      image:
        "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
      content: ["초반 진입장벽이 좀 있어요.", "근데 익숙해지면 꽤 재밌습니다."],
      likes: 8,
      comments: 1,
      views: 89,
    },
    {
      id: 3,
      name: "쌀먹마스터",
      level: 25,
      date: "2025-07-25",
      rating: 5.0,
      stars: "★★★★★",
      image:
        "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
      content: ["P2E 게임 중에서는 최고입니다!", "꾸준히 하면 수익 나와요."],
      likes: 25,
      comments: 7,
      views: 256,
    },
    {
      id: 4,
      name: "뉴비게이머",
      level: 3,
      date: "2025-07-22",
      rating: 2.0,
      stars: "★★☆☆☆",
      image:
        "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      content: [
        "아직 잘 모르겠어요.",
        "좀 더 해봐야 알 것 같습니다.",
        "꾸준히 하면 수익 나와요.",
      ],
      likes: 2,
      comments: 0,
      views: 45,
    },
  ];

  const quickLinks = [
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/home_icon.svg",
      label: "홈페이지",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/update.svg",
      label: "업데이트",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/guide2.svg",
      label: "가이드북",
    },
    {
      src: "https://ssalmuk.com/images/icon_commulink.svg",
      label: "커뮤니티",
    },
  ];

  const snsLinks = [
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/discord35.svg",
      alt: "discord",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/facebook35.svg",
      alt: "facebook",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/reddit35.svg",
      alt: "reddit",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/twitter35.svg",
      alt: "twitter",
    },
    {
      src: "https://ssalmuk.com/images/img_ranking_detail/youtube35.svg",
      alt: "youtube",
    },
  ];

  return (
    <>
      {/* 상단 헤더 */}
      <div className="flex items-center px-4 py-3 bg-white">
        <button onClick={() => setCurrentPage("ranking")} className="mr-4">
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
        <div className="flex-1 text-base font-bold text-gray-500">
          디센트럴랜드
        </div>
        <button
          onClick={() => {
            setIsLiked(!isLiked);
            if (!isLiked) {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000);
            }
          }}
        >
          <svg
            className={`w-6 h-6 ${isLiked ? "text-sky-400" : "text-gray-400"}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* 게임 정보 카드 */}
      <div
        className="p-4 shadow-sm bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://ssalmuk.com/images/img_ranking_detail/detail_banner.svg')",
        }}
      >
        <div className="flex gap-4">
          {/* 게임 아이콘 */}
          <img
            src="https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif"
            alt="게임 아이콘"
            className="w-28 h-28 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white/90">디센트럴랜드</h1>
            <div className="flex gap-2 mt-1">
              <span className="bg-blue-500/80 text-white/90 text-xs px-2 py-0.5 rounded">
                메타버스
              </span>
              <span className="bg-blue-500/80 text-white/90 text-xs px-2 py-0.5 rounded">
                소셜
              </span>
            </div>
            {/* 퀵 링크 */}
            <div className="flex gap-3 mt-3 mb-3">
              {quickLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => {
                    if (link.label === "커뮤니티") {
                      setCurrentPage("channelDetail");
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-white/100 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <img src={link.src} alt={link.label} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-white/80 mt-1">
                    {link.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 순위 & SNS */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center">
            <div className="text-center px-6">
              <p className="text-xs text-gray-400">국내순위</p>
              <p className="font-bold text-gray-900">1위 (-)</p>
            </div>
            <div className="w-px h-10 bg-gray-200"></div>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-400">활성화된 SNS 채널</p>
              <div className="flex gap-1 mt-1 justify-center">
                {snsLinks.map((sns, idx) => (
                  <img
                    key={idx}
                    src={sns.src}
                    alt={sns.alt}
                    className="w-5 h-5 rounded"
                  />
                ))}
              </div>
            </div>
            <span
              className="text-gray-400 text-xl px-4 cursor-pointer"
              onClick={() => setShowArrowPopup(true)}
            >
              →
            </span>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="mt-4 border-b border-gray-200 bg-white">
        <Swiper
          modules={[]}
          spaceBetween={0}
          slidesPerView="auto"
          className="w-full"
        >
          {tabs.map((tab) => (
            <SwiperSlide key={tab} className="!w-auto">
              <button
                className={`px-4 py-3 text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "text-gray-900 font-bold border-b-2 border-gray-900"
                    : "text-gray-400"
                }`}
                onClick={() => {
                  if (tab === "커뮤니티") {
                    setCurrentPage("channelDetail");
                  } else if (tab === "게임이벤트") {
                    setCurrentPage("eventDetail");
                  } else {
                    setActiveTab(tab);
                  }
                }}
              >
                {tab}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "소개" && (
        <div className="bg-white mt-2 p-4">
          {/* 영상 & 이미지 썸네일 */}
          <Swiper
            modules={[]}
            spaceBetween={12}
            slidesPerView="auto"
            className="w-full"
          >
            {/* 영상 */}
            <SwiperSlide className="!w-64">
              <div className="relative w-64 h-40 rounded-xl overflow-hidden">
                <video
                  id="previewVideo"
                  src="https://sgimage.netmarble.com/images/netmarble/rfnext/20250121/ro4j1737451863887.mp4"
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onClick={(e) => {
                    const video = e.currentTarget;
                    const playBtn = document.getElementById("playBtn");
                    if (video.paused) {
                      video.play();
                      if (playBtn) playBtn.style.display = "none";
                    } else {
                      video.pause();
                      if (playBtn) playBtn.style.display = "flex";
                    }
                  }}
                />
                <div
                  id="playBtn"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white">▶</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* 이미지 1 */}
            <SwiperSlide className="!w-64">
              <div className="relative w-64 h-40 rounded-xl overflow-hidden">
                <img
                  src="https://edge.ssalmuk.com/gameBanner/202304/20_dmin/d99c79ec564545cc8f6f4333a9eefbb3.jpg"
                  alt="이미지1"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            {/* 이미지 2 */}
            <SwiperSlide className="!w-64">
              <div className="relative w-64 h-40 rounded-xl overflow-hidden">
                <img
                  src="https://edge.ssalmuk.com/gameBanner/202304/20_dmin/93b0fb0121864408a97d86e23226176d.jpg"
                  alt="이미지2"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>

            {/* 이미지 3 */}
            <SwiperSlide className="!w-64">
              <div className="relative w-64 h-40 rounded-xl overflow-hidden">
                <img
                  src="https://edge.ssalmuk.com/gameBanner/202304/20_dmin/81c5661e8c6b439ab14d3e6c83051739.jpg"
                  alt="이미지3"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>

          {/* 설명 텍스트 */}
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p className="font-bold">'학교 가는 길'의 추억을 그대로!</p>
            <p>
              페인트 길을 밟으며 최고의 기록을 달성해 다양한 트로피를
              획득하세요!
            </p>
            <p>■ 달리고, 수집하고, 피하고, 뿌시고!</p>
            <p>학비부·연예인·교장·선생님 등 개성 넘치는 캐릭터를 수집하고,</p>
            <p>끝없는 질주 속에서 최고의 순간을 만들어보세요!</p>
          </div>
        </div>
      )}

      {activeTab === "평가글" && (
        <div className="bg-white mt-2 p-4">
          {/* 탭 버튼 */}
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                reviewTab === "유저평가"
                  ? "text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              style={
                reviewTab === "유저평가" ? { backgroundColor: "#72C2FF" } : {}
              }
              onClick={() => setReviewTab("유저평가")}
            >
              유저평가
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                reviewTab === "평가단평가"
                  ? "text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
              style={
                reviewTab === "평가단평가" ? { backgroundColor: "#72C2FF" } : {}
              }
              onClick={() => setReviewTab("평가단평가")}
            >
              평가단평가
            </button>
          </div>

          {/* 플레이 보상체감 */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 font-medium">플레이 보상체감</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★★★☆☆</span>
              <span className="text-gray-900 font-bold">3.4</span>
              <span className="text-gray-400 text-sm">점</span>
            </div>
          </div>

          {/* 플레이 보상 상세평가 */}
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-3">
              플레이 보상 상세평가
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">매우 높음</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "5.88%", backgroundColor: "#72C2FF" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  5.88%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">높음</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "11.76%", backgroundColor: "#72C2FF" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  11.76%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">보통</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "35.29%", backgroundColor: "#72C2FF" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  35.29%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">낮음</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "29.41%", backgroundColor: "#72C2FF" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  29.41%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-12">매우 낮음</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: "17.65%", backgroundColor: "#72C2FF" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 w-12 text-right">
                  17.65%
                </span>
              </div>
            </div>
          </div>

          {/* 게임 평가 참여하기 버튼 */}
          <button
            className="w-full py-3 text-white rounded-xl font-medium mb-6"
            style={{ backgroundColor: "#72C2FF" }}
            onClick={() => setShowReviewPopup(true)}
          >
            게임 평가 참여하기
          </button>

          {/* 정렬 선택 */}
          <div className="flex justify-start mb-4">
            <button
              className="text-gray-500 text-sm"
              onClick={() => setShowSortModal(true)}
            >
              {sortOption} ∨
            </button>
          </div>
          {/* 리뷰 카드 */}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-2xl p-4 mb-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={review.image}
                    alt="프로필"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-900">
                        {review.name}
                      </span>
                      <span className="bg-blue-500 text-white text-[10px] px-1 rounded">
                        {review.level}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400 text-sm">
                      {review.stars}
                    </span>
                    <span className="font-bold text-sm">{review.rating}</span>
                    <span className="text-gray-400 text-xs">점</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-700">
                {expandedReviews.includes(review.id)
                  ? // 펼친 상태 - 전체 표시
                    review.content.map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-1" : ""}>
                        {line}
                      </p>
                    ))
                  : // 접힌 상태 - 2줄만 표시
                    review.content.slice(0, 2).map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-1" : ""}>
                        {line}
                      </p>
                    ))}
                {review.content.length > 2 && (
                  <button
                    className="text-blue-500 text-xs mt-1"
                    onClick={() => {
                      if (expandedReviews.includes(review.id)) {
                        setExpandedReviews(
                          expandedReviews.filter((id) => id !== review.id),
                        );
                      } else {
                        setExpandedReviews([...expandedReviews, review.id]);
                      }
                    }}
                  >
                    {expandedReviews.includes(review.id)
                      ? "간략하게"
                      : "더보기"}
                  </button>
                )}
              </div>

              {/* 액션 버튼 */}
              {/* 액션 버튼 */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-gray-400">
                  {/* 좋아요 */}
                  <button className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
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
                  </button>
                  {/* 댓글 */}
                  <button className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
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
                  </button>
                  {/* 리트윗 */}
                  <button className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  {/* 공유 */}
                  <button className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {/* 선물 */}
                  <button
                    className="text-gray-300"
                    onClick={() => setShowGiftPopup(true)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </button>
                  {/* 더보기 */}
                  <div className="relative">
                    <button
                      className="text-gray-300"
                      onClick={() =>
                        setShowMoreMenu(
                          showMoreMenu === review.id ? null : review.id,
                        )
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>

                    {/* 더보기 메뉴 */}
                    {showMoreMenu === review.id && (
                      <div className="absolute right-0 bottom-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[120px] z-10">
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>저장</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>차단</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>신고</span>
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* 정렬 모달 */}
          {showSortModal && (
            <div className="fixed inset-0 z-50 flex items-end">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowSortModal(false)}
              />
              <div className="relative z-10 w-full bg-white rounded-t-2xl">
                <button
                  className={`w-full py-4 text-center ${
                    sortOption === "인기글" ? "text-blue-500" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSortOption("인기글");
                    setShowSortModal(false);
                  }}
                >
                  인기글
                </button>
                <button
                  className={`w-full py-4 text-center border-t border-gray-100 ${
                    sortOption === "최신글" ? "text-blue-500" : "text-gray-700"
                  }`}
                  onClick={() => {
                    setSortOption("최신글");
                    setShowSortModal(false);
                  }}
                >
                  최신글
                </button>
                <button
                  className="w-full py-4 text-center text-white mt-2"
                  style={{ backgroundColor: "#72C2FF" }}
                  onClick={() => setShowSortModal(false)}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "게임이벤트" && (
        <div className="bg-white mt-2 p-4">
          <p className="font-bold">사전예약 보상</p>
          <p className="text-sm text-gray-500 mt-2">
            게임 출시 시 특별 보상 지급!
          </p>
        </div>
      )}

      {activeTab === "게임쿠폰" && (
        <div className="bg-white mt-2 p-4 space-y-3">
          {[
            {
              id: 1,
              avatar:
                "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
              nickname: "쿠폰다내꺼",
              code: "U323KSK3K1K23K",
              period: "2025-10-30 ~ 정보없음",
              rewards: "물약100개, 초보자 방어구 세트",
            },
            {
              id: 2,
              avatar:
                "https://edge.ssalmuk.com/editorImage/935049a546e744a98c0c77e1d498ae18.png",
              nickname: "꽝우실러취요",
              code: "WELCOME2025NEW",
              period: "2025-09-16 ~ 정보없음",
              rewards: "물약100개, 초보자 방어구 세트",
            },
            {
              id: 3,
              avatar:
                "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
              nickname: "게임마스터",
              code: "SSALMUK7777GG",
              period: "2025-12-31 ~ 2026-03-31",
              rewards: "골드 5000, 프리미엄 상자 1개",
            },
            {
              id: 4,
              avatar:
                "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
              nickname: "복귀유저혜택",
              code: "COMEBACK2025AB",
              period: "2025-11-01 ~ 정보없음",
              rewards: "경험치 부스터 3일, 펫 소환권",
            },
          ].map((coupon) => (
            <div
              key={coupon.id}
              className="border border-gray-100 rounded-2xl p-4"
            >
              {/* 상단: 아바타 + 닉네임 + 복사 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={coupon.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-500">
                    {coupon.nickname}
                  </span>
                </div>
                <button
                  className="px-4 py-1.5 rounded-lg text-sm font-medium text-white"
                  style={{ backgroundColor: "#72C2FF" }}
                  onClick={() => navigator.clipboard?.writeText(coupon.code)}
                >
                  복사
                </button>
              </div>
              {/* 쿠폰번호 */}
              <p className="text-base font-bold text-gray-900 mb-1">
                쿠폰번호 {coupon.code}
              </p>
              {/* 기간 */}
              <p className="text-sm text-gray-500 mb-1">기간 {coupon.period}</p>
              {/* 보상 */}
              <p className="text-sm" style={{ color: "#72C2FF" }}>
                {coupon.rewards}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "쌀먹점수" && (
        <div className="bg-white mt-2 p-4">
          {/* 기간 선택 */}
          <div className="flex justify-end mb-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "#72C2FF" }}
              >
                7D
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                1M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                3M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                6M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                1Y
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                ALL
              </button>
            </div>
          </div>

          {/* 차트 영역 */}
          <div className="bg-white">
            {/* Y축 라벨 + 차트 */}
            <div className="flex">
              {/* Y축 라벨 */}
              <div className="flex flex-col justify-between text-xs text-gray-400 pr-2 py-2">
                <span>12.5k</span>
                <span>10k</span>
                <span>7.5k</span>
                <span>5k</span>
                <span>2.5k</span>
                <span>0</span>
              </div>

              {/* 차트 */}
              <div className="flex-1 h-48 relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 300 150"
                  preserveAspectRatio="none"
                >
                  {/* 그리드 라인 */}
                  <line
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="300"
                    y2="30"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="60"
                    x2="300"
                    y2="60"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="90"
                    x2="300"
                    y2="90"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="120"
                    x2="300"
                    y2="120"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="300"
                    y2="150"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />

                  {/* 차트 라인 */}
                  <path
                    d="M0,35 L50,35 L100,36 L150,38 L175,32 L200,30 L250,33 L300,35"
                    fill="none"
                    stroke="#72C2FF"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            {/* X축 라벨 */}
            <div className="flex justify-between text-xs text-gray-400 mt-2 pl-8">
              <span>2025-12-25</span>
              <span>12-26</span>
              <span>12-27</span>
              <span>12-28</span>
              <span>12-29</span>
              <span>12-30</span>
              <span>12-31</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "코인시세" && (
        <div className="bg-white mt-2 p-4">
          {/* 통화 선택 */}
          <div className="flex justify-end mb-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "#72C2FF" }}
              >
                KRW
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-500">
                USD
              </button>
            </div>
          </div>

          {/* 코인 정보 */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src="https://edge.ssalmuk.com/network/202305/02_UNKWON/b52ea909ad3d44738dddf71f5e324bc5.jpg"
              alt="Decentraland"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  Decentraland
                </span>
                <span className="text-xl font-medium text-gray-700">
                  ₩213.97
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                <span className="text-green-500 text-sm">-2.46%</span>
              </div>
            </div>
          </div>

          {/* 거래량 */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">거래량</p>
            <p className="text-xs text-gray-400">(24시간 기준)</p>
            <div className="mt-1">
              <span className="text-gray-900 font-medium">₩24,639,005,627</span>
              <span className="text-green-500 text-sm ml-2">15.66%</span>
            </div>
          </div>

          {/* 기간 선택 */}
          <div className="flex justify-end mb-4">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "#72C2FF" }}
              >
                7D
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                1M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                3M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                6M
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                1Y
              </button>
              <button className="px-3 py-1.5 rounded-full text-sm font-medium text-gray-500">
                ALL
              </button>
            </div>
          </div>

          {/* 차트 영역 */}
          <div className="bg-gray-50 rounded-xl p-4">
            {/* Y축 라벨 + 차트 */}
            <div className="flex">
              {/* Y축 라벨 */}
              <div className="flex flex-col justify-between text-xs text-gray-400 pr-2 py-2">
                <span>12.5k</span>
                <span>10k</span>
                <span>7.5k</span>
                <span>5k</span>
                <span>2.5k</span>
                <span>0</span>
              </div>

              {/* 차트 */}
              <div className="flex-1 h-48 relative">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 300 150"
                  preserveAspectRatio="none"
                >
                  {/* 그리드 라인 */}
                  <line
                    x1="0"
                    y1="0"
                    x2="300"
                    y2="0"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="30"
                    x2="300"
                    y2="30"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="60"
                    x2="300"
                    y2="60"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="90"
                    x2="300"
                    y2="90"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="120"
                    x2="300"
                    y2="120"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                  <line
                    x1="0"
                    y1="150"
                    x2="300"
                    y2="150"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />

                  {/* 차트 라인 */}
                  <path
                    d="M0,35 L50,35 L100,36 L150,37 L175,32 L200,30 L250,33 L300,35"
                    fill="none"
                    stroke="#72C2FF"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            {/* X축 라벨 */}
            <div className="flex justify-between text-xs text-gray-400 mt-2 pl-8">
              <span>2025-12-25</span>
              <span>12-26</span>
              <span>12-27</span>
              <span>12-28</span>
              <span>12-29</span>
              <span>12-30</span>
              <span>12-31</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "커뮤니티" && (
        <div className="bg-white mt-2 p-4">
          <p className="font-bold">커뮤니티</p>
          <p className="text-sm text-gray-500 mt-2">클릭 시 커뮤니티로 이동</p>
        </div>
      )}
      {/* 리워드 팝업 */}
      {showRewardPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowRewardPopup(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl p-6 mx-8 text-center">
            {/* 아이콘 */}
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🎁</span>
            </div>

            {/* 텍스트 */}
            <h2 className="text-xl font-bold text-gray-900">200포인트를</h2>
            <h2 className="text-xl font-bold text-gray-900">얻으셨습니다.</h2>

            {/* 닫기 버튼 */}
            <button
              className="mt-6 text-gray-500 text-sm"
              onClick={() => setShowRewardPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 화살표 팝업 */}
      {showArrowPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowArrowPopup(false)}
          />
          <div className="relative z-10 bg-white rounded-2xl p-6 mx-8 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
              활성화된 SNS 채널
            </h2>

            <div className="space-y-4">
              {snsLinks.map((sns, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={sns.src}
                      alt={sns.alt}
                      className="w-10 h-10 rounded-lg"
                    />
                    <span className="text-gray-700">
                      {sns.alt === "discord" && "디스코드"}
                      {sns.alt === "facebook" && "페이스북"}
                      {sns.alt === "reddit" && "레딧"}
                      {sns.alt === "twitter" && "트위터"}
                      {sns.alt === "youtube" && "유튜브"}
                    </span>
                  </div>
                  <img
                    src="https://ssalmuk.com/images/event_detail/icon_move.svg"
                    alt="이동"
                    className="w-5 h-5"
                  />{" "}
                </div>
              ))}
            </div>

            <button
              className="mt-6 w-full py-3 text-white rounded-xl"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => setShowArrowPopup(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-3 rounded-full flex items-center gap-2 z-50">
          <span className="text-green-400">✓</span>
          <span className="text-sm">관심목록에 추가되었습니다</span>
        </div>
      )}

      {/* 선물 팝업 */}
      {showGiftPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowGiftPopup(false);
              setShowAwardHistory(false);
            }}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {showAwardHistory ? (
              // 수상내역 화면
              <>
                {/* 헤더 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowAwardHistory(false)}>
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
                    <span className="text-lg font-bold">수상내역</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowGiftPopup(false);
                      setShowAwardHistory(false);
                    }}
                  >
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

                {/* 총 수상 & 총 포인트 */}
                <div className="p-4">
                  <div className="flex items-center justify-center gap-8 bg-gray-50 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">총 수상</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xl">🏅</span>
                        <span className="text-2xl font-bold">26</span>
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">총 포인트</p>
                      <p className="text-2xl font-bold">2850P</p>
                    </div>
                  </div>
                </div>

                {/* 수상 리스트 */}
                <div className="px-4 pb-6 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🏆</span>
                        <span className="text-[10px] text-emerald-600">
                          논 한마지기
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">1000P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-cyan-100 flex flex-col items-center justify-center">
                        <span className="text-xl">⭐</span>
                        <span className="text-[10px] text-cyan-600">
                          황금쌀
                        </span>
                      </div>
                      <span className="text-lg font-medium">19</span>
                    </div>
                    <span className="text-gray-700 font-medium">500P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-pink-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🎁</span>
                        <span className="text-[10px] text-pink-600">
                          쌀가마
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">100P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🍚</span>
                        <span className="text-[10px] text-orange-600">
                          밥 한공기
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">50P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-green-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🌾</span>
                        <span className="text-[10px] text-green-600">
                          쌀 한톨
                        </span>
                      </div>
                      <span className="text-lg font-medium">1</span>
                    </div>
                    <span className="text-gray-700 font-medium">10P</span>
                  </div>
                </div>
              </>
            ) : (
              // 선물하기 화면
              <>
                {/* 상단 포인트 & 닫기 */}
                <div className="grid grid-cols-3 items-center p-4">
                  {/* 왼쪽 - 포인트 */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white text-lg">🍚</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold">532P</p>
                      <p className="text-xs text-gray-400">내 포인트</p>
                    </div>
                  </div>
                  {/* 가운데 - 14개 보기 */}
                  <button
                    className="flex flex-col items-center justify-center mx-auto p-3 rounded-xl bg-amber-50"
                    onClick={() => setShowAwardHistory(true)}
                  >
                    <span className="text-2xl">🏆</span>
                    <span className="text-xs text-gray-500">
                      14개 보기 &gt;
                    </span>
                  </button>
                  {/* 오른쪽 - 닫기 */}
                  <div className="flex justify-end">
                    <button onClick={() => setShowGiftPopup(false)}>
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
                </div>

                {/* 상 선택 */}
                <div className="px-4 pb-4">
                  <p className="font-bold text-gray-900 mb-3">
                    상을 선택하세요
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-green-100">
                      <span className="text-3xl mb-1">🌾</span>
                      <span className="text-xs font-medium text-gray-700">
                        쌀 한톨
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        10P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-orange-100 ring-2 ring-orange-400">
                      <span className="text-3xl mb-1">🍚</span>
                      <span className="text-xs font-medium text-gray-700">
                        밥 한공기
                      </span>
                      <span className="text-xs text-orange-600 font-medium">
                        50P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-pink-100">
                      <span className="text-3xl mb-1">🎁</span>
                      <span className="text-xs font-medium text-gray-700">
                        쌀가마
                      </span>
                      <span className="text-xs text-pink-600 font-medium">
                        100P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-cyan-100">
                      <span className="text-3xl mb-1">⭐</span>
                      <span className="text-xs font-medium text-gray-700">
                        황금쌀
                      </span>
                      <span className="text-xs text-cyan-600 font-medium">
                        500P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-emerald-100">
                      <span className="text-3xl mb-1">🏆</span>
                      <span className="text-xs font-medium text-gray-700">
                        논 한마지기
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        1000P
                      </span>
                    </button>
                  </div>
                </div>

                {/* 안내 문구 */}
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-700">
                    콘텐츠 작성자는 <span className="font-bold">상</span>을 받을
                    자격이 있습니다.
                  </p>
                </div>

                {/* 메시지 입력 */}
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="text"
                      placeholder="메시지를 추가하세요"
                      className="flex-1 text-sm outline-none"
                    />
                    <span className="text-xs text-gray-400">0/100</span>
                  </div>
                </div>

                {/* 안내 */}
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-400">
                    수상과 함께 콘텐츠 제공자에게 감사와 응원의 메시지를
                    남겨주세요.
                  </p>
                </div>

                {/* 익명 체크박스 */}
                <div className="px-4 pb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      익명으로 기부하기
                    </span>
                  </label>
                </div>

                {/* 상 주기 버튼 */}
                <div className="px-4 pb-4">
                  <button
                    className="w-full py-4 rounded-full text-white font-bold text-lg"
                    style={{ backgroundColor: "#72C2FF" }}
                    onClick={() => setShowGiftPopup(false)}
                  >
                    상 주기
                  </button>
                </div>

                {/* 하단 안내 */}
                <div className="px-4 pb-6">
                  <p className="text-xs text-center text-gray-400">
                    진행하시면 당사의{" "}
                    <span className="text-blue-500 underline">운영약관</span>에
                    동의하시는 것입니다.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* 게임 평가하기 팝업 */}
      {showReviewPopup && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={() => setShowReviewPopup(false)}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-md bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div />
              <p className="text-base font-bold text-gray-900">게임 평가하기</p>
              <button
                className="text-gray-400 text-xl"
                onClick={() => setShowReviewPopup(false)}
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-5">
              {/* 플레이 보상체감 */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  플레이 보상체감 <span className="text-red-500">*</span>
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewStars(star)}>
                      <svg
                        className={`w-8 h-8 ${star <= reviewStars ? "text-yellow-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    {reviewStars}점
                  </span>
                </div>
              </div>

              {/* 플레이 보상 상세평가 */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  플레이 보상 상세평가 <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-2">
                  {["매우낮음", "낮음", "보통", "높음", "매우높음"].map(
                    (level) => (
                      <button
                        key={level}
                        className={`flex flex-col items-center gap-1`}
                        onClick={() => setReviewReward(level)}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                            reviewReward === level
                              ? "border-blue-400 bg-blue-50"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <svg
                            className={`w-5 h-5 ${reviewReward === level ? "text-blue-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                          </svg>
                        </div>
                        <span
                          className={`text-[11px] ${reviewReward === level ? "text-blue-500 font-medium" : "text-gray-400"}`}
                        >
                          {level}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* 코멘트 */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  코멘트 <span className="text-red-500">*</span>
                </p>
                <textarea
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none resize-none min-h-[100px] focus:border-blue-300"
                  placeholder="코멘트는 5자 이상 입력해 주세요."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              {/* 주의문구 */}
              <div className="flex items-start gap-2 mb-6 bg-gray-50 rounded-xl p-3">
                <span className="text-yellow-500 text-lg">⚠️</span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  게임 평가하기는 게임 별 1일 1회 참여 가능하며 고의로 잘못된
                  정보를 지속 입력할 경우 경고 없이 유저가 획득한 모든 포인트를
                  회수합니다.
                </p>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="flex border-t border-gray-100">
              <button
                className="flex-1 py-4 text-base font-medium text-gray-500 bg-white rounded-bl-2xl"
                onClick={() => setShowReviewPopup(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-4 text-base font-medium text-white rounded-br-2xl"
                style={{ backgroundColor: "#72C2FF" }}
                onClick={() => {
                  setShowReviewPopup(false);
                  setReviewStars(0);
                  setReviewReward("");
                  setReviewComment("");
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
