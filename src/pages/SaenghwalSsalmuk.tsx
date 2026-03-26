// @ts-nocheck
import { useState } from "react";
import { ToastProvider } from "../components/community/Toast";
import DrawerMenu from "../components/DrawerMenu";

// 데이터
import {
  initialUserStats,
  initialCashHistory,
  events,
  pointSources as initialPointSources,
  surveys,
  quickPolls,
  marketItems,
  posts,
  initialMyCoupons,
  initialMyTrades,
} from "../components/saenghwal/data";

// 탭
import EventTab from "../components/saenghwal/tabs/EventTab";
import PointTab from "../components/saenghwal/tabs/PointTab";
import SurveyTab from "../components/saenghwal/tabs/SurveyTab";
import MarketTab from "../components/saenghwal/tabs/MarketTab";
import CommunityTab from "../components/saenghwal/tabs/CommunityTab";

// 모달 그룹
import CouponModals from "../components/saenghwal/modals/CouponModals";
import CashModals from "../components/saenghwal/modals/CashModals";
import MarketModals from "../components/saenghwal/modals/MarketModals";
import EventModals from "../components/saenghwal/modals/EventModals";
import MiscModals from "../components/saenghwal/modals/MiscModals";

export default function SaenghwalSsalmuk2({
  setCurrentPage,
  goBack,
  isLoggedIn = true,
  onLogout,
  onShowLogin,
  initialShowMyEntries = false,
  initialShowMyCoupon = false,
  initialMainTab = "event",
  initialEventId = null,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onShowLogin?: () => void;
  initialShowMyEntries?: boolean;
  initialShowMyCoupon?: boolean;
  initialMainTab?: string;
  initialEventId?: number | null;
}) {
  // ===== 탭 상태 =====
  const [mainTab, setMainTab] = useState(initialMainTab);
  const [subTab, setSubTab] = useState("진행중");
  const [surveyMainTab, setSurveyMainTab] = useState("quick");
  const [surveyTab, setSurveyTab] = useState("all");
  const [marketTab, setMarketTab] = useState("selling");
  const [communityTab, setCommunityTab] = useState("all");
  const [quickPollFilter, setQuickPollFilter] = useState("all");

  // ===== 이벤트 필터 =====
  const [eventSort, setEventSort] = useState("latest");
  const [eventViewType, setEventViewType] = useState("card");
  const [eventFilters, setEventFilters] = useState({
    prizeTypes: [],
    entryTypes: [],
    platforms: [],
  });

  // ===== 유저 데이터 =====
  const [userStats, setUserStats] = useState(initialUserStats);
  const [cashHistory] = useState(initialCashHistory);
  const [myCoupons, setMyCoupons] = useState(initialMyCoupons);
  const [myTrades, setMyTrades] = useState(initialMyTrades);
  const [pointSources, setPointSources] = useState(initialPointSources);

  // ===== 쿠폰 상태 =====
  const [showMyCoupon, setShowMyCoupon] = useState(initialShowMyCoupon);
  const [couponTab, setCouponTab] = useState("unused");
  const [couponSort, setCouponSort] = useState("latest");
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // ===== 캐시 상태 =====
  const [showMyCash, setShowMyCash] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [chargeStep, setChargeStep] = useState(1);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showBankChange, setShowBankChange] = useState(false);
  const [showCashHistory, setShowCashHistory] = useState(false);

  // ===== 이벤트 모달 상태 =====
  const [showEventDetail, setShowEventDetail] = useState(() => {
    if (initialEventId) {
      return events.find((e) => e.id === initialEventId) || null;
    }
    return null;
  });
  const [showWinnerRegister, setShowWinnerRegister] = useState(false);
  const [showCorrectionRequest, setShowCorrectionRequest] = useState(false);
  const [winnerAnnouncement, setWinnerAnnouncement] = useState({
    url: "",
    memo: "",
    isPrivate: false,
    isRegistered: false,
    registeredBy: "",
    registeredDate: "",
  });
  const [showMyEntries, setShowMyEntries] = useState(initialShowMyEntries);
  const [entryTab, setEntryTab] = useState("progress");
  const [entrySort, setEntrySort] = useState("registered");
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [showPointDetail, setShowPointDetail] = useState(null);

  // ===== 장터 상태 =====
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showSellFlow, setShowSellFlow] = useState(false);
  const [sellStep, setSellStep] = useState(1);
  const [showMyTrade, setShowMyTrade] = useState(false);
  const [myTradeTab, setMyTradeTab] = useState("buying");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "저기 이거 거래를 안해봐서",
      time: "10:45",
    },
    {
      id: 2,
      sender: "other",
      text: "그냥 구매만 하면 되는건가요?",
      time: "10:46",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatPartner, setChatPartner] = useState("");
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeEtcText, setDisputeEtcText] = useState("");
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("trading");
  const [showDisputeToast, setShowDisputeToast] = useState(false);

  // ===== 기타 상태 =====
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeStep, setWriteStep] = useState(1);
  const [showMyPage, setShowMyPage] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // ===== 설문 상태 =====
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quickPollVoted, setQuickPollVoted] = useState(false);

  // ===== 유틸 함수 =====
  const getStatusBadge = (status, dday) => {
    if (dday === 0) return { text: "오늘마감", color: "text-red-500" };
    if (status === "progress") {
      if (dday && dday > 0) {
        return { text: `D-${dday}`, color: "text-gray-900" };
      }
      return { text: "진행중", color: "text-emerald-500" };
    }
    if (status === "announce")
      return { text: "발표전", color: "text-amber-500" };
    if (status === "ended") return { text: "발표완료", color: "text-gray-400" };
    return { text: "진행중", color: "text-emerald-500" };
  };

  const getTypeBadge = (type) => {
    const colors = {
      퀴즈: "bg-blue-100 text-blue-700",
      댓글: "bg-purple-100 text-purple-700",
      인증샷: "bg-pink-100 text-pink-700",
      팔로우: "bg-green-100 text-green-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const handleVote = (pollId, optionIndex) => {
    if (quickPollVoted) return;
    setQuickPollVoted(true);
    const poll = quickPolls.find((p) => p.id === pollId);
    setUserStats((prev) => ({
      ...prev,
      ssalmukCash: prev.ssalmukCash + poll.reward,
    }));
  };

  // ===== 하위 컴포넌트에 공유하는 ctx =====
  const ctx = {
    userStats,
    setUserStats,
    myCoupons,
    setMyCoupons,
    myTrades,
    setMyTrades,
    cashHistory,
    mainTab,
    setMainTab,
    subTab,
    setSubTab,
    surveyMainTab,
    setSurveyMainTab,
    surveyTab,
    setSurveyTab,
    marketTab,
    setMarketTab,
    communityTab,
    setCommunityTab,
    quickPollFilter,
    setQuickPollFilter,
    eventSort,
    setEventSort,
    eventViewType,
    setEventViewType,
    eventFilters,
    setEventFilters,
    showMyCoupon,
    setShowMyCoupon,
    showMyCash,
    setShowMyCash,
    showChargeModal,
    setShowChargeModal,
    chargeStep,
    setChargeStep,
    chargeAmount,
    setChargeAmount,
    showWithdrawModal,
    setShowWithdrawModal,
    withdrawStep,
    setWithdrawStep,
    withdrawAmount,
    setWithdrawAmount,
    showBankChange,
    setShowBankChange,
    showCashHistory,
    setShowCashHistory,
    showEventDetail,
    setShowEventDetail,
    showWinnerRegister,
    setShowWinnerRegister,
    showCorrectionRequest,
    setShowCorrectionRequest,
    winnerAnnouncement,
    setWinnerAnnouncement,
    showProductDetail,
    setShowProductDetail,
    showPurchaseFlow,
    setShowPurchaseFlow,
    purchaseStep,
    setPurchaseStep,
    selectedProduct,
    setSelectedProduct,
    isSeller,
    setIsSeller,
    showSellFlow,
    setShowSellFlow,
    sellStep,
    setSellStep,
    showMyTrade,
    setShowMyTrade,
    myTradeTab,
    setMyTradeTab,
    showChat,
    setShowChat,
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    chatPartner,
    setChatPartner,
    showDisputeModal,
    setShowDisputeModal,
    disputeReason,
    setDisputeReason,
    disputeEtcText,
    setDisputeEtcText,
    showTransactionDetail,
    setShowTransactionDetail,
    transactionStatus,
    setTransactionStatus,
    showDisputeToast,
    setShowDisputeToast,
    showWriteModal,
    setShowWriteModal,
    writeStep,
    setWriteStep,
    showMyPage,
    setShowMyPage,
    showSearchModal,
    setShowSearchModal,
    showNotification,
    setShowNotification,
    couponTab,
    setCouponTab,
    couponSort,
    setCouponSort,
    selectedCoupon,
    setSelectedCoupon,
    showMyEntries,
    setShowMyEntries,
    entryTab,
    setEntryTab,
    entrySort,
    setEntrySort,
    showEventFilter,
    setShowEventFilter,
    showPointDetail,
    setShowPointDetail,
    selectedSurvey,
    setSelectedSurvey,
    currentQuestion,
    setCurrentQuestion,
    quickPollVoted,
    setQuickPollVoted,
    setCurrentPage,
    goBack,
    initialShowMyEntries,
    initialShowMyCoupon,
    initialEventId,
    isLoggedIn,
    onLogout,
    onShowLogin,
    marketItems,
    events,
    pointSources,
    setPointSources,
    surveys,
    quickPolls,
    posts,
    getStatusBadge,
    getTypeBadge,
    handleVote,
  };

  // ===== 설문 진행 화면 (전체 화면) =====
  if (selectedSurvey) {
    const survey = selectedSurvey;
    if (survey.questions.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center p-6">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {survey.title}
          </h2>
          <p className="text-gray-500 mb-6 text-center">{survey.description}</p>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-sm border border-amber-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">예상 소요시간</span>
              <span className="font-medium">{survey.duration}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">보상</span>
              <span className="font-bold text-amber-600">
                +{survey.reward}P
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setUserStats((prev) => ({
                ...prev,
                ssalmukCash: prev.ssalmukCash + survey.reward,
              }));
              setSelectedSurvey(null);
            }}
            className="mt-6 px-8 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors"
          >
            설문 시작하기
          </button>
          <button
            onClick={() => setSelectedSurvey(null)}
            className="mt-3 text-gray-500 hover:text-gray-700"
          >
            뒤로가기
          </button>
        </div>
      );
    }
    const question = survey.questions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="bg-white border-b border-amber-100 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setSelectedSurvey(null)}
            className="text-gray-500 hover:text-gray-700"
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
          <div className="flex-1 mx-4">
            <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${((currentQuestion + 1) / survey.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {currentQuestion + 1}/{survey.questions.length}
          </span>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <span className="text-amber-500 text-sm font-medium">
              Q{currentQuestion + 1}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-2">
              {question.question}
            </h2>
          </div>
          <div className="space-y-3">
            {question.type === "scale" ? (
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() =>
                      currentQuestion < survey.questions.length - 1
                        ? setCurrentQuestion(currentQuestion + 1)
                        : (setUserStats((prev) => ({
                            ...prev,
                            ssalmukCash: prev.ssalmukCash + survey.reward,
                          })),
                          setSelectedSurvey(null))
                    }
                    className="flex-1 py-4 bg-white border-2 border-amber-200 rounded-xl text-lg font-bold text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition-all"
                  >
                    {n}
                  </button>
                ))}
              </div>
            ) : (
              question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    currentQuestion < survey.questions.length - 1
                      ? setCurrentQuestion(currentQuestion + 1)
                      : (setUserStats((prev) => ({
                          ...prev,
                          ssalmukCash: prev.ssalmukCash + survey.reward,
                        })),
                        setSelectedSurvey(null))
                  }
                  className="w-full p-4 bg-white border-2 border-amber-200 rounded-xl text-left font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-400 transition-all"
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // ===== 메인 렌더 =====
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
        {/* 드로어 메뉴 */}
        <DrawerMenu
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          onLogout={() => onLogout?.()}
          onLoginClick={() => onShowLogin?.()}
        />

        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-gray-100">
          <div className="flex items-center gap-2">
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
            <h1 className="text-xl font-bold text-gray-900">생활테크</h1>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
              onClick={() => setShowNotification(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <svg
                className="w-5 h-5 text-gray-600"
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
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* 메인 탭 */}
        <div className="bg-white border-b border-gray-100 sticky top-[52px] z-20">
          <div className="flex">
            {[
              { key: "event", label: "이벤트", icon: "🎁" },
              { key: "point", label: "포인트", icon: "💰" },
              { key: "survey", label: "설문조사", icon: "📋" },
              { key: "market", label: "장터", icon: "🏪" },
              { key: "community", label: "커뮤니티", icon: "💬" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key === "community")
                    setCurrentPage("gallery-saenghwaltech");
                  else setMainTab(tab.key);
                }}
                className={`flex-1 py-3 text-center transition-colors relative ${
                  mainTab === tab.key
                    ? "text-sky-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="block text-xs mt-0.5">{tab.label}</span>
                {mainTab === tab.key && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-sky-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        {mainTab === "event" && <EventTab ctx={ctx} />}
        {mainTab === "point" && <PointTab ctx={ctx} />}
        {mainTab === "survey" && <SurveyTab ctx={ctx} />}
        {mainTab === "market" && <MarketTab ctx={ctx} />}
        {mainTab === "community" && <CommunityTab ctx={ctx} />}

        {/* 플로팅 글쓰기 버튼 (FAB) */}
        <div className="fixed bottom-32 right-0 left-0 max-w-md mx-auto pointer-events-none z-40">
          <button
            onClick={() => setShowWriteModal(true)}
            className="absolute right-4 w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-300 hover:bg-sky-600 transition-colors pointer-events-auto"
          >
            <svg
              className="w-6 h-6 text-white"
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
          </button>
        </div>

        {/* 모달 그룹 */}
        <CouponModals ctx={ctx} />
        <CashModals ctx={ctx} />
        <MarketModals ctx={ctx} />
        <EventModals ctx={ctx} />
        <MiscModals ctx={ctx} />
      </div>
    </ToastProvider>
  );
}
