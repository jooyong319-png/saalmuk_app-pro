// @ts-nocheck
import { useState, useEffect } from "react";
import DrawerMenu from "../components/DrawerMenu";

// 생활쌀먹 앱 - 이벤트/포인트/설문조사/장터/커뮤니티
export default function SaenghwalSsalmuk({
  setCurrentPage,
  goBack,
  isLoggedIn = true,
  onLogout,
  onShowLogin,
  initialShowMyEntries = false,
  initialShowMyCoupon = false,
  initialMainTab = "event",
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onShowLogin?: () => void;
  initialShowMyEntries?: boolean;
  initialShowMyCoupon?: boolean;
  initialMainTab?: string;
}) {
  const [mainTab, setMainTab] = useState(initialMainTab);
  const [subTab, setSubTab] = useState("최신");
  const [surveyMainTab, setSurveyMainTab] = useState("quick"); // quick, general
  const [surveyTab, setSurveyTab] = useState("all");
  const [marketTab, setMarketTab] = useState("selling");
  const [communityTab, setCommunityTab] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(null);
  const [showWinnerRegister, setShowWinnerRegister] = useState(false); // 당첨자발표 등록 모달
  const [showCorrectionRequest, setShowCorrectionRequest] = useState(false); // 정정신청 모달
  const [winnerAnnouncement, setWinnerAnnouncement] = useState({
    url: "",
    memo: "",
    isPrivate: false,
    isRegistered: false,
    registeredBy: "",
    registeredDate: "",
  });
  const [showProductDetail, setShowProductDetail] = useState(null);
  const [showMyCoupon, setShowMyCoupon] = useState(initialShowMyCoupon);
  const [showMyCash, setShowMyCash] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [chargeStep, setChargeStep] = useState(1);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [showBankChange, setShowBankChange] = useState(false);
  const [showCashHistory, setShowCashHistory] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quickPollVoted, setQuickPollVoted] = useState(false);

  // 에스크로 결제 관련 상태
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);
  const [purchaseStep, setPurchaseStep] = useState(1); // 1:결제, 2:거래중, 3:쿠폰수령, 4:구매확정완료
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSeller, setIsSeller] = useState(false); // 거래중 쿠폰에서 판매자인지 여부
  const [showSellFlow, setShowSellFlow] = useState(false);
  const [sellStep, setSellStep] = useState(1); // 1:정보입력, 2:가격설정, 3:등록완료
  const [showMyTrade, setShowMyTrade] = useState(false);
  const [myTradeTab, setMyTradeTab] = useState("buying"); // buying, selling

  // 채팅 관련 상태
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

  // 분쟁 관련 상태
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeEtcText, setDisputeEtcText] = useState("");
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("trading"); // trading, dispute
  const [showDisputeToast, setShowDisputeToast] = useState(false);

  // 글쓰기 관련 상태
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [writeStep, setWriteStep] = useState(1); // 1:작성, 2:미리보기, 3:완료

  // 마이페이지 관련 상태
  const [showMyPage, setShowMyPage] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  // 쿠폰 상세 관련 상태
  const [couponTab, setCouponTab] = useState("trading"); // trading, purchased, sold
  const [couponSort, setCouponSort] = useState("latest"); // latest, expiringSoon, expiringLate
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // 내응모함 관련 상태
  const [showMyEntries, setShowMyEntries] = useState(initialShowMyEntries);
  const [entryTab, setEntryTab] = useState("all"); // all, progress, won, completed
  const [entrySort, setEntrySort] = useState("registered"); // registered, platform, deadline, announced, announceSoon

  // 이벤트 필터 관련 상태
  const [showEventFilter, setShowEventFilter] = useState(false);
  const [eventSort, setEventSort] = useState("latest"); // latest, deadline, popular
  const [eventViewType, setEventViewType] = useState("card"); // card, list
  const [eventFilters, setEventFilters] = useState({
    prizeTypes: [], // 경품종류
    entryTypes: [], // 응모형태
    platforms: [], // 응모플랫폼
  });

  // 포인트 상세 관련 상태
  const [showPointDetail, setShowPointDetail] = useState(null);

  // 퀵설문 필터 상태
  const [quickPollFilter, setQuickPollFilter] = useState("all"); // all, available, completed

  // 유저 데이터
  const [userStats, setUserStats] = useState({
    ssalmukCash: 29400,
    escrowCash: 5500, // 거래중 (에스크로)
    purchaseDeposit: 10000, // 구매전용 예치금
    coupons: 5,
    level: 3,
    levelName: "알찬벼",
    exp: 65,
    streak: 7,
    totalSurveys: 23,
    bankName: "카카오뱅크",
    bankAccount: "3333-01-******",
  });

  // 캐시 내역 데이터
  const [cashHistory] = useState([
    {
      id: 1,
      type: "+",
      title: "설문조사 완료",
      amount: 500,
      date: "오늘 14:23",
      status: "완료",
    },
    {
      id: 2,
      type: "+",
      title: "퀵폴 참여",
      amount: 30,
      date: "오늘 12:05",
      status: "완료",
    },
    {
      id: 3,
      type: "-",
      title: "기프티콘 구매",
      amount: 3650,
      date: "어제",
      status: "거래완료",
    },
    {
      id: 4,
      type: "+",
      title: "판매 정산",
      amount: 4462,
      date: "01.28",
      status: "정산완료",
    },
    {
      id: 5,
      type: "+",
      title: "캐시 충전",
      amount: 10000,
      date: "01.27",
      status: "충전완료",
    },
    {
      id: 6,
      type: "-",
      title: "스타벅스 아메리카노 구매",
      amount: 3200,
      date: "01.25",
      status: "거래완료",
    },
    {
      id: 7,
      type: "+",
      title: "이벤트 당첨",
      amount: 1000,
      date: "01.24",
      status: "완료",
    },
    {
      id: 8,
      type: "-",
      title: "출금",
      amount: 5000,
      date: "01.23",
      status: "출금완료",
    },
    {
      id: 9,
      type: "+",
      title: "설문조사 완료",
      amount: 800,
      date: "01.22",
      status: "완료",
    },
    {
      id: 10,
      type: "+",
      title: "친구 초대 보상",
      amount: 2000,
      date: "01.20",
      status: "완료",
    },
  ]);

  // 이벤트 데이터
  const events = [
    {
      id: 1,
      type: "퀴즈",
      hot: true,
      status: "progress",
      title: "[CU편의점] 12월 행운퀴즈 이벤트",
      prize: "CU 5천원권",
      winners: 100,
      period: "01-10 ~ 01-15",
      dday: 3,
      host: "CU편의점",
      platform: "홈페이지",
      likes: 156,
      comments: 89,
    },
    {
      id: 2,
      type: "댓글",
      hot: true,
      status: "progress",
      title: "[스타벅스] 겨울 신메뉴 출시 기념",
      prize: "아메리카노 T",
      winners: 50,
      period: "01-10 ~ 01-15",
      dday: 1,
      host: "스타벅스",
      platform: "인스타그램",
      likes: 234,
      comments: 123,
    },
    {
      id: 3,
      type: "퀴즈",
      hot: true,
      status: "today",
      title: "[맥도날드] 빅맥 50주년 퀴즈",
      prize: "빅맥세트",
      winners: 500,
      period: "01-10 ~ 01-15",
      dday: 0,
      host: "맥도날드",
      platform: "APP전용",
      likes: 847,
      comments: 234,
    },
    {
      id: 4,
      type: "인증샷",
      hot: false,
      status: "announce",
      title: "[GS25] 와인 페스티벌 이벤트",
      prize: "GS25 1만원권",
      winners: 200,
      period: "01-05 ~ 01-10",
      dday: -2,
      host: "GS25",
      platform: "홈페이지",
      likes: 89,
      comments: 45,
    },
    {
      id: 5,
      type: "팔로우",
      hot: false,
      status: "ended",
      title: "[올리브영] 신년맞이 럭키드로우",
      prize: "올리브영 3만원권",
      winners: 100,
      period: "01-01 ~ 01-07",
      dday: -5,
      host: "올리브영",
      platform: "인스타그램",
      likes: 67,
      comments: 34,
    },
  ];

  // 포인트 적립처 데이터
  const pointSources = [
    {
      id: 1,
      category: "앱테크",
      title: "캐시워크",
      desc: "걸으면서 포인트 적립",
      reward: "일 최대 100P",
      icon: "🚶",
      hot: true,
    },
    {
      id: 2,
      category: "광고",
      title: "버즈빌 오퍼월",
      desc: "광고 시청하고 포인트 받기",
      reward: "회당 10~500P",
      icon: "📺",
      hot: true,
    },
    {
      id: 3,
      category: "쇼핑",
      title: "네이버쇼핑 리워드",
      desc: "쇼핑하면 포인트 적립",
      reward: "구매금액 1%",
      icon: "🛒",
      hot: false,
    },
    {
      id: 4,
      category: "출석",
      title: "쌀먹 출석체크",
      desc: "매일 출석하고 보상받기",
      reward: "일 20P",
      icon: "📅",
      hot: true,
    },
    {
      id: 5,
      category: "미션",
      title: "앱 설치 미션",
      desc: "앱 설치하고 포인트 받기",
      reward: "앱당 100~500P",
      icon: "📱",
      hot: false,
    },
    {
      id: 6,
      category: "게임",
      title: "게임 플레이 리워드",
      desc: "게임하고 포인트 적립",
      reward: "분당 1P",
      icon: "🎮",
      hot: true,
    },
  ];

  // 설문조사 데이터
  const surveys = [
    {
      id: 1,
      type: "game",
      title: "2026년 기대되는 모바일 게임 조사",
      description: "신규 출시 예정 게임에 대한 의견을 들려주세요",
      reward: 500,
      duration: "5분",
      participants: 234,
      maxParticipants: 500,
      deadline: "오늘 23:59",
      tags: ["모바일게임", "신작"],
      isHot: true,
      questions: [
        {
          type: "single",
          question: "주로 플레이하는 게임 장르는?",
          options: ["RPG", "전략", "액션", "퍼즐", "시뮬레이션"],
        },
        {
          type: "multi",
          question: "게임 선택 시 중요하게 생각하는 요소는? (복수선택)",
          options: ["그래픽", "스토리", "커뮤니티", "PvP", "캐릭터"],
        },
        {
          type: "scale",
          question: "인게임 광고에 대한 거부감은?",
          min: 1,
          max: 5,
        },
      ],
    },
    {
      id: 2,
      type: "brand",
      title: "게이밍 기어 브랜드 인지도 조사",
      description: "로지텍 X 쌀먹닷컴 제휴 설문",
      reward: 800,
      duration: "8분",
      participants: 89,
      maxParticipants: 200,
      deadline: "3일 후",
      tags: ["제휴설문", "게이밍기어"],
      isHot: false,
      questions: [],
    },
    {
      id: 3,
      type: "quick",
      title: "[퀵] P2E 게임 인식 조사",
      description: "간단한 5문항 설문",
      reward: 150,
      duration: "2분",
      participants: 412,
      maxParticipants: 1000,
      deadline: "오늘 23:59",
      tags: ["P2E", "퀵설문"],
      isHot: false,
      questions: [],
    },
    {
      id: 4,
      type: "beta",
      title: "🎮 신작 RPG 클로즈베타 테스터 모집",
      description: "2주간 베타테스트 참여 후 상세 리뷰 작성",
      reward: 5000,
      duration: "2주",
      participants: 45,
      maxParticipants: 100,
      deadline: "1월 31일",
      tags: ["베타테스트", "RPG", "프리미엄"],
      isHot: true,
      isPremium: true,
      questions: [],
    },
  ];

  // 퀵폴 데이터
  const quickPolls = [
    {
      id: 1,
      question: "귀하에서는 다음 중 어디에 해당하시나요?",
      tags: ["#담배"],
      options: [
        {
          text: "비흡연자 & 1년 내 해외 여행 경험 없음",
          votes: 1625,
          percent: 54,
        },
        {
          text: "비흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입",
          votes: 391,
          percent: 13,
        },
        {
          text: "비흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입",
          votes: 541,
          percent: 18,
        },
        { text: "흡연자 & 1년 내 해외 여행 경험 없음", votes: 241, percent: 8 },
        {
          text: "흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입",
          votes: 150,
          percent: 5,
        },
        {
          text: "흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 비구입",
          votes: 90,
          percent: 3,
        },
      ],
      reward: 1,
      participated: true,
      participants: 29820,
      comments: 1,
      likes: 33,
    },
    {
      id: 2,
      question:
        "만일 쿠팡이 영업정지 처분 등의 이유로 이용할 수 없게 된다면, 신선/가공 식품을 주로 어디서 구매하시겠습니까?",
      tags: ["#쇼핑", "#식품구매"],
      options: [
        { text: "신선/가공식품은 쿠팡에서 구매하지 않았음", votes: 0 },
        { text: "이마트", votes: 0 },
        { text: "롯데마트", votes: 0 },
        { text: "기타 대형마트(홈플러스, 코스트코 등)", votes: 0 },
        { text: "대형/일반 슈퍼마켓", votes: 0 },
        { text: "재래시장", votes: 0 },
        { text: "네이버쇼핑", votes: 0 },
        { text: "종합 오픈마켓(G마켓 11번가 등)", votes: 0 },
        { text: "신선식품 전문몰(마켓컬리, 오아시스 등)", votes: 0 },
        { text: "다른 곳에서 구매하지 않음", votes: 0 },
      ],
      reward: 1,
      participated: false,
      participants: 32889,
      comments: 1,
      likes: 39,
    },
    {
      id: 3,
      question: "영화관 예매 시 주로 선택하는 좌석 위치는 어디인가요?",
      tags: ["#영화관", "#좌석"],
      options: [
        { text: "스크린에 가까운 앞쪽 좌석", votes: 0 },
        { text: "가운데(중앙) 좌석", votes: 0 },
        { text: "뒤쪽(후면) 좌석", votes: 0 },
        { text: "측면(사이드) 좌석", votes: 0 },
        { text: "통로(출입구 쪽) 좌석", votes: 0 },
        { text: "좌석은 크게 신경쓰지 않음", votes: 0 },
      ],
      reward: 1,
      participated: false,
      participants: 45408,
      comments: 3,
      likes: 50,
    },
    {
      id: 4,
      question:
        "2026년 설 연휴 KTX 예매 시, 가장 우선 고려할(한) 좌석 유형은 무엇인가요?",
      tags: ["#KTX", "#설연휴"],
      options: [
        { text: "이번 설 연휴에 이용 계획 없음", votes: 0 },
        { text: "일반실 창가", votes: 0 },
        { text: "일반실 통로", votes: 0 },
        { text: "특실", votes: 0 },
        { text: "동반자와 붙는 좌석이 우선", votes: 0 },
        { text: "기타", votes: 0 },
      ],
      reward: 1,
      participated: false,
      participants: 46041,
      comments: 2,
      likes: 49,
    },
    {
      id: 5,
      question:
        "귀하께서는 향후 1년 이내에 침대 또는 매트리스를 교체(구매) 예정이신가요?",
      tags: ["#침대", "#트리스"],
      options: [
        {
          text: "침대 또는 매트리스 교체(구매) 예정이 없다.",
          votes: 2054,
          percent: 69,
        },
        {
          text: "침대 또는 매트리스 교체(구매) 예정이다.",
          votes: 922,
          percent: 31,
        },
      ],
      reward: 1,
      participated: true,
      participants: 2976,
      comments: 0,
      likes: 5,
    },
  ];

  // 장터 데이터
  const marketItems = [
    {
      id: 1,
      brand: "스타벅스",
      dday: 30,
      name: "아메리카노 T",
      originalPrice: 4700,
      price: 3650,
      discount: 22,
      seller: "쌀먹고수",
      rating: 5,
      trades: 128,
      status: "available",
      barcode: "1234-5678-9012-3456",
      validUntil: "2025.03.15",
    },
    {
      id: 2,
      brand: "맥도날드",
      dday: 14,
      name: "빅맥세트",
      originalPrice: 8900,
      price: 6500,
      discount: 27,
      seller: "이벤트헌터",
      rating: 5,
      trades: 89,
      status: "available",
      barcode: "9876-5432-1098-7654",
      validUntil: "2025.02.28",
    },
    {
      id: 3,
      brand: "공차",
      dday: 21,
      name: "블랙밀크티+펄 L",
      originalPrice: 5500,
      price: 4200,
      discount: 24,
      seller: "당첨왕",
      rating: 4.8,
      trades: 234,
      status: "available",
      barcode: "5555-6666-7777-8888",
      validUntil: "2025.03.05",
    },
    {
      id: 4,
      brand: "도미노피자",
      dday: 45,
      name: "포테이토 M",
      originalPrice: 19900,
      price: 14000,
      discount: 30,
      seller: "쿠폰마스터",
      rating: 5,
      trades: 67,
      status: "available",
      barcode: "1111-2222-3333-4444",
      validUntil: "2025.04.01",
    },
    {
      id: 5,
      brand: "배스킨라빈스",
      dday: 0,
      name: "파인트 아이스크림",
      originalPrice: 12000,
      price: 9500,
      discount: 21,
      seller: "아이스러버",
      rating: 4.9,
      trades: 56,
      status: "sold",
      barcode: "2222-3333-4444-5555",
      validUntil: "2025.01.31",
      soldDate: "2025.01.25",
    },
    {
      id: 6,
      brand: "GS25",
      dday: 0,
      name: "5천원 상품권",
      originalPrice: 5000,
      price: 4500,
      discount: 10,
      seller: "편의점마스터",
      rating: 5,
      trades: 89,
      status: "sold",
      barcode: "6666-7777-8888-9999",
      validUntil: "2025.02.15",
      soldDate: "2025.01.28",
    },
  ];

  // 내 거래 내역 데이터
  const [myTrades, setMyTrades] = useState({
    buying: [
      {
        id: 1,
        brand: "CU",
        name: "5천원 상품권",
        price: 4500,
        status: "escrow",
        seller: "행운이",
        date: "01.30",
        barcode: null,
      },
      {
        id: 2,
        brand: "스타벅스",
        name: "카페라떼 T",
        price: 4200,
        status: "completed",
        seller: "커피러버",
        date: "01.28",
        barcode: "1234-5678-9012-3456",
      },
    ],
    selling: [
      {
        id: 1,
        brand: "GS25",
        name: "1만원 상품권",
        price: 9000,
        status: "waiting",
        buyer: null,
        date: "01.30",
      },
      {
        id: 2,
        brand: "배스킨라빈스",
        name: "파인트",
        price: 8500,
        status: "escrow",
        buyer: "아이스크림왕",
        date: "01.29",
      },
      {
        id: 3,
        brand: "버거킹",
        name: "와퍼세트",
        price: 7500,
        status: "settled",
        buyer: "햄버거맨",
        date: "01.25",
        settledAmount: 7237,
      },
    ],
  });

  // 커뮤니티 데이터
  const posts = [
    {
      id: 1,
      category: "꿀팁",
      title: "스타벅스 이벤트 당첨 확률 높이는 꿀팁!",
      author: "이벤트고수",
      time: "2시간 전",
      likes: 847,
      comments: 123,
      hot: true,
    },
    {
      id: 2,
      category: "후기",
      title: "CU 행운퀴즈 당첨 후기입니다 ㅎㅎ",
      author: "럭키보이",
      time: "3시간 전",
      likes: 234,
      comments: 45,
      hot: false,
    },
    {
      id: 3,
      category: "질문",
      title: "쌀먹캐시 출금은 어떻게 하나요?",
      author: "뉴비123",
      time: "5시간 전",
      likes: 156,
      comments: 67,
      hot: false,
    },
    {
      id: 4,
      category: "정보",
      title: "🔥 이번 주 마감 이벤트 총정리!",
      author: "정보통",
      time: "6시간 전",
      likes: 1523,
      comments: 234,
      hot: true,
    },
    {
      id: 5,
      category: "잡담",
      title: "오늘 설문조사로 500캐시 벌었어요",
      author: "쌀먹러",
      time: "7시간 전",
      likes: 89,
      comments: 23,
      hot: false,
    },
  ];

  // 내 쿠폰 데이터 (상세)
  const [myCoupons, setMyCoupons] = useState([
    {
      id: 1,
      brand: "CJ ONE",
      brandLogo: "🔵",
      name: "(HOT)아메리카노",
      barcode: "5186-0151-4910",
      validFrom: "2025.12.18",
      validUntil: "2026.02.09",
      dday: 6,
      status: "unused",
      tradeStatus: "trading", // 거래중
      source: "장터구매",
      purchaseDate: "2025.12.18",
      usedDate: null,
      price: 3200,
      seller: "USER123",
    },
    {
      id: 2,
      brand: "스타벅스",
      brandLogo: "☕",
      name: "카페 아메리카노 T",
      barcode: "8809-1234-5678",
      validFrom: "2025.12.20",
      validUntil: "2026.01.20",
      dday: 17,
      status: "unused",
      tradeStatus: "purchased", // 구매완료
      source: "장터구매",
      purchaseDate: "2025.12.20",
      usedDate: null,
      price: 4500,
      seller: "SELLER01",
    },
    {
      id: 3,
      brand: "GS25",
      brandLogo: "🏪",
      name: "1만원 상품권",
      barcode: "1234-5678-9012",
      validFrom: "2025.12.01",
      validUntil: "2026.01.31",
      dday: 28,
      status: "unused",
      tradeStatus: "purchased", // 구매완료
      source: "직접등록",
      purchaseDate: "2025.12.10",
      usedDate: null,
      price: 10000,
      seller: null,
    },
    {
      id: 4,
      brand: "메가MGC커피",
      brandLogo: "🧋",
      name: "(HOT)아메리카노",
      barcode: "5186-0151-4962",
      validFrom: "2025.12.18",
      validUntil: "2026.02.09",
      dday: 37,
      status: "used",
      tradeStatus: "sold", // 판매완료
      source: "내가 판매",
      purchaseDate: "2025.12.18",
      usedDate: "2025.12.25",
      price: 2000,
      buyer: "BUYER01",
    },
    {
      id: 5,
      brand: "CU",
      brandLogo: "🏬",
      name: "5천원 상품권",
      barcode: "222",
      validFrom: "2025.01.01",
      validUntil: "2026.01.15",
      dday: 12,
      status: "unused",
      tradeStatus: "trading", // 거래중 (판매자)
      source: "내가 판매",
      purchaseDate: "2025.01.05",
      usedDate: null,
      price: 5000,
      buyer: "BUYER03",
    },
    {
      id: 6,
      brand: "치맥",
      brandLogo: "🍗",
      name: "치킨 상품권",
      barcode: "55809",
      validFrom: "2025.01.01",
      validUntil: "2026.03.01",
      dday: 57,
      status: "unused",
      tradeStatus: "sold", // 판매완료
      source: "내가 판매",
      purchaseDate: "2025.01.10",
      usedDate: null,
      price: 20000,
      buyer: "BUYER02",
    },
  ]);

  const getStatusBadge = (status, dday) => {
    if (dday === 0) return { text: "오늘마감", color: "bg-red-500" };
    if (status === "progress")
      return { text: "진행중", color: "bg-emerald-500" };
    if (status === "announce") return { text: "발표전", color: "bg-amber-500" };
    if (status === "ended") return { text: "발표완료", color: "bg-gray-400" };
    return { text: "진행중", color: "bg-emerald-500" };
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

  // 이벤트 카드 컴포넌트
  const EventCard = ({ event }) => {
    const badge = getStatusBadge(event.status, event.dday);
    return (
      <div
        onClick={() => setShowEventDetail(event)}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeBadge(event.type)}`}
            >
              {event.type}
            </span>
            {event.hot && (
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
                🔥 HOT
              </span>
            )}
          </div>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium text-white ${badge.color}`}
          >
            {badge.text}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>🎁 {event.prize}</span>
          <span>
            {event.dday > 0
              ? `D-${event.dday}`
              : event.dday === 0
                ? "오늘마감"
                : "마감"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">{event.winners}명 당첨</span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>❤️ {event.likes}</span>
            <span>💬 {event.comments}</span>
          </div>
        </div>
      </div>
    );
  };

  // 포인트 카드 컴포넌트
  const PointCard = ({ source }) => (
    <div
      onClick={() => setShowPointDetail(source)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl">
          {source.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {source.category}
            </span>
            {source.hot && <span className="text-xs text-red-500">🔥</span>}
          </div>
          <h3 className="font-bold text-gray-900">{source.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{source.desc}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-sm font-medium text-amber-600">
          {source.reward}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-lg hover:bg-amber-600 transition-colors"
        >
          참여하기
        </button>
      </div>
    </div>
  );

  // 설문 카드 컴포넌트
  const SurveyCard = ({ survey }) => (
    <div
      onClick={() => setSelectedSurvey(survey)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {survey.isHot && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
              🔥 HOT
            </span>
          )}
          {survey.isPremium && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-600">
              프리미엄
            </span>
          )}
        </div>
        <span className="text-amber-600 font-bold text-sm">
          +{survey.reward}P
        </span>
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{survey.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{survey.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {survey.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>⏱️ {survey.duration}</span>
        <span>
          👥 {survey.participants}/{survey.maxParticipants}명
        </span>
        <span>⏰ {survey.deadline}</span>
      </div>
      <div className="mt-2">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full"
            style={{
              width: `${(survey.participants / survey.maxParticipants) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );

  // 장터 카드 컴포넌트
  const MarketCard = ({ item }) => (
    <div
      onClick={() => setShowProductDetail(item)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
          <span className="text-3xl">🎁</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              {item.brand}
            </span>
            <span className="text-xs text-gray-400">D-{item.dday}</span>
          </div>
          <h3 className="font-bold text-gray-900">{item.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-gray-900">
              {item.price.toLocaleString()}원
            </span>
            <span className="text-sm text-gray-400 line-through">
              {item.originalPrice.toLocaleString()}원
            </span>
            <span className="text-sm text-red-500 font-medium">
              {item.discount}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <span>⭐ {item.rating}</span>
            <span>거래 {item.trades}회</span>
            <span>{item.seller}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 커뮤니티 포스트 카드
  const PostCard = ({ post }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
          {post.category}
        </span>
        {post.hot && <span className="text-xs text-red-500">🔥</span>}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  );

  // 퀵폴 컴포넌트
  const QuickPollCard = ({ poll }) => {
    const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);
    const isCompleted = poll.participated;

    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        {/* 상단: 배지 + 좋아요 */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs px-2 py-1 rounded font-medium ${
              isCompleted
                ? "bg-gray-100 text-gray-600"
                : "bg-rose-500 text-white"
            }`}
          >
            {isCompleted ? "참여완료" : "참여가능"}
          </span>
          <div className="flex items-center gap-1 text-rose-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">{poll.likes}</span>
          </div>
        </div>

        {/* 해시태그 */}
        <div className="flex gap-1 mb-2">
          {poll.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>

        {/* 질문 */}
        <h4 className="font-bold text-gray-900 mb-4 text-sm leading-relaxed">
          {poll.question}
        </h4>

        {/* 선택지 */}
        <div className="space-y-2">
          {poll.options.map((option, idx) => {
            const percent =
              option.percent ||
              (totalVotes > 0
                ? Math.round((option.votes / totalVotes) * 100)
                : 0);
            return (
              <div
                key={idx}
                className={`relative rounded-lg border overflow-hidden ${
                  isCompleted
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-200 hover:border-rose-300 cursor-pointer"
                }`}
              >
                {/* 참여완료 시 퍼센트 바 */}
                {isCompleted && percent > 0 && (
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-rose-100"
                    style={{ width: `${percent}%` }}
                  />
                )}
                <div className="relative px-3 py-2.5 flex items-center justify-between">
                  <span className="text-sm text-gray-700 flex-1 pr-2">
                    {option.text}
                  </span>
                  {isCompleted && percent > 0 && (
                    <span className="text-sm font-medium text-rose-500 whitespace-nowrap">
                      {percent}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단: 참여자 수 + 댓글 수 */}
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>{poll.participants.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
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
            <span>{poll.comments}</span>
          </div>
          {!isCompleted && (
            <span className="ml-auto text-rose-500 font-medium">
              +{poll.reward}P
            </span>
          )}
        </div>
      </div>
    );
  };

  // 내 쿠폰 모달 (개선된 UX/UI)
  const MyCouponModal = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddCoupon, setShowAddCoupon] = useState(false);
    const [barcodeInputType, setBarcodeInputType] = useState("manual"); // 'manual' or 'image'
    const [couponFormData, setCouponFormData] = useState({
      brand: "",
      customBrand: "",
      name: "",
      barcode: "",
      validUntil: "",
      barcodeImage: null,
    });

    // 필터링된 쿠폰
    const getFilteredCoupons = () => {
      let filtered = [...myCoupons];

      // 탭 필터
      if (couponTab === "trading") {
        filtered = filtered.filter((c) => c.tradeStatus === "trading");
      } else if (couponTab === "purchased") {
        filtered = filtered.filter((c) => c.tradeStatus === "purchased");
      } else if (couponTab === "sold") {
        filtered = filtered.filter((c) => c.tradeStatus === "sold");
      }

      // 검색 필터
      if (searchQuery) {
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // 정렬
      if (couponSort === "latest") {
        filtered.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
        );
      } else if (couponSort === "expiringSoon") {
        filtered.sort((a, b) => a.dday - b.dday);
      } else if (couponSort === "expiringLate") {
        filtered.sort((a, b) => b.dday - a.dday);
      }

      return filtered;
    };

    const filteredCoupons = getFilteredCoupons();
    const tradingCount = myCoupons.filter(
      (c) => c.tradeStatus === "trading",
    ).length;
    const purchasedCount = myCoupons.filter(
      (c) => c.tradeStatus === "purchased",
    ).length;
    const soldCount = myCoupons.filter((c) => c.tradeStatus === "sold").length;

    // 쿠폰 사용완료 처리
    const handleUseCoupon = (couponId) => {
      setMyCoupons((prev) =>
        prev.map((c) =>
          c.id === couponId
            ? {
                ...c,
                status: "used",
                usedDate: new Date()
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, "."),
              }
            : c,
        ),
      );
      setSelectedCoupon(null);
      setUserStats((prev) => ({ ...prev, coupons: prev.coupons - 1 }));
    };

    // 쿠폰 삭제
    const handleDeleteCoupon = (couponId, e) => {
      if (e) e.stopPropagation();
      const coupon = myCoupons.find((c) => c.id === couponId);
      setMyCoupons((prev) => prev.filter((c) => c.id !== couponId));
      if (coupon?.status === "unused") {
        setUserStats((prev) => ({ ...prev, coupons: prev.coupons - 1 }));
      }
      setSelectedCoupon(null);
    };

    // D-day 색상
    const getDdayColor = (dday) => {
      if (dday <= 3) return "text-red-500 bg-red-50";
      if (dday <= 7) return "text-amber-500 bg-amber-50";
      return "text-gray-500 bg-gray-100";
    };

    // 바코드 시각화
    const BarcodeVisual = ({ code, large = false }) => {
      const bars = code
        .replace(/-/g, "")
        .split("")
        .flatMap((char, idx) => {
          const num = parseInt(char) || idx;
          return [
            { width: num % 3 === 0 ? 3 : 2, black: true },
            { width: num % 2 === 0 ? 2 : 1, black: false },
          ];
        });

      return (
        <div
          className={`flex justify-center items-end ${large ? "h-20" : "h-12"}`}
        >
          {bars.slice(0, 40).map((bar, idx) => (
            <div
              key={idx}
              style={{
                width: bar.width,
                height: `${80 + (idx % 5) * 4}%`,
                backgroundColor: bar.black ? "#000" : "#fff",
              }}
            />
          ))}
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 - 심플하게 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (initialShowMyCoupon && goBack) {
                  goBack();
                } else {
                  setShowMyCoupon(false);
                }
              }}
              className="p-1 -ml-1"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="text-lg font-bold text-gray-900">내 쿠폰함</h3>
            <button
              onClick={() => setShowAddCoupon(true)}
              className="px-3 py-1.5 border border-sky-500 text-sky-500 text-sm font-medium rounded-lg hover:bg-sky-50 transition-colors"
            >
              쿠폰등록
            </button>
          </div>
        </div>

        {/* 탭 - 큰 버튼 스타일 */}
        <div className="bg-white px-4 py-3">
          <div className="flex gap-2">
            {[
              { key: "trading", label: "거래중", count: tradingCount },
              { key: "purchased", label: "구매완료", count: purchasedCount },
              { key: "sold", label: "판매완료", count: soldCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setCouponTab(tab.key)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  couponTab === tab.key
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.label}{" "}
                <span
                  className={
                    couponTab === tab.key ? "text-sky-100" : "text-gray-400"
                  }
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 검색 & 정렬 - 한 줄로 */}
        <div className="bg-gray-50 px-4 py-2 flex items-center gap-2">
          <div className="flex-1 relative">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="브랜드, 상품명 검색"
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <select
            value={couponSort}
            onChange={(e) => setCouponSort(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
          >
            <option value="expiringSoon">임박순</option>
            <option value="latest">최신순</option>
            <option value="expiringLate">여유순</option>
          </select>
        </div>

        {/* 쿠폰 목록 - 리스트 형태 */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎫</span>
              </div>
              <p className="text-gray-500 mb-2">쿠폰이 없습니다</p>
              <button
                onClick={() => setShowAddCoupon(true)}
                className="text-sky-500 text-sm font-medium"
              >
                + 쿠폰 등록하기
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  onClick={() => setSelectedCoupon(coupon)}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${
                    coupon.status === "used" ? "opacity-60" : ""
                  }`}
                >
                  {/* 상단 - 브랜드 & 상품바로가기 & D-day */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{coupon.brandLogo}</span>
                      <span className="font-medium text-gray-900">
                        {coupon.brand}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          // 거래중 상태인 경우 쿠폰 수령 화면으로 이동
                          if (coupon.tradeStatus === "trading") {
                            // 쿠폰 정보로 상품 생성
                            const productData = {
                              id: coupon.id,
                              brand: coupon.brand,
                              name: coupon.name,
                              price: coupon.price,
                              originalPrice: coupon.price,
                              discount: 0,
                              dday: coupon.dday,
                              barcode: coupon.barcode,
                              validUntil: coupon.validUntil,
                              seller: coupon.seller || "판매자",
                              buyer: coupon.buyer || "구매자",
                              rating: 5,
                              trades: 0,
                              status: "available",
                            };
                            setSelectedProduct(productData);
                            // 판매자인지 구매자인지 확인 (source로 구분)
                            setIsSeller(coupon.source === "내가 판매");
                            setPurchaseStep(3); // 쿠폰 수령 단계로
                            setShowPurchaseFlow(true);
                            setShowMyCoupon(false);
                          } else {
                            // 구매완료/판매완료 상태는 상품 상세로 이동
                            const matchedProduct = marketItems.find(
                              (item) =>
                                item.brand === coupon.brand ||
                                item.name.includes(
                                  coupon.name.replace("(HOT)", "").trim(),
                                ),
                            );
                            if (matchedProduct) {
                              setSelectedProduct(matchedProduct);
                              setShowProductDetail(matchedProduct);
                            } else {
                              setShowProductDetail({
                                id: coupon.id,
                                brand: coupon.brand,
                                name: coupon.name,
                                price: coupon.price,
                                originalPrice: coupon.price,
                                discount: 0,
                                dday: coupon.dday,
                                barcode: coupon.barcode,
                                validUntil: coupon.validUntil,
                                seller: coupon.seller || "판매자",
                                rating: 5,
                                trades: 0,
                                status:
                                  coupon.tradeStatus === "sold"
                                    ? "sold"
                                    : "available",
                              });
                            }
                            setShowMyCoupon(false);
                          }
                        }}
                        className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg hover:bg-sky-600 transition-colors"
                      >
                        상품바로가기
                      </button>
                      {coupon.status === "unused" ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDdayColor(coupon.dday)}`}
                        >
                          D-{coupon.dday}
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          사용완료
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 중간 - 상품명 & 바코드 */}
                  <div className="px-4 py-4">
                    <h4 className="font-bold text-gray-900 text-lg mb-3">
                      {coupon.name}
                    </h4>

                    {/* 바코드 영역 */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <BarcodeVisual code={coupon.barcode} />
                      <p className="text-center text-gray-600 mt-2 font-mono tracking-wider">
                        {coupon.barcode}
                      </p>
                    </div>
                  </div>

                  {/* 하단 - 정보 & 액션 */}
                  <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span>~{coupon.validUntil}</span>
                      <span className="mx-2">·</span>
                      <span>{coupon.source}</span>
                    </div>
                    {coupon.status === "unused" && (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUseCoupon(coupon.id);
                          }}
                          className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg"
                        >
                          사용완료
                        </button>
                        <button
                          onClick={(e) => handleDeleteCoupon(coupon.id, e)}
                          className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-lg"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                    {coupon.status === "used" && (
                      <button
                        onClick={(e) => handleDeleteCoupon(coupon.id, e)}
                        className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-lg"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 쿠폰 상세 모달 - 바코드 풀스크린 */}
        {selectedCoupon && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
            {/* 헤더 */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-3 flex items-center justify-between">
              <button onClick={() => setSelectedCoupon(null)} className="p-1">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <span className="text-sm text-gray-500">쿠폰 상세</span>
              <div className="w-6"></div>
            </div>

            {/* 브랜드 & 상품명 */}
            <div className="bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
                <span className="text-xl">{selectedCoupon.brandLogo}</span>
                <span className="text-sm font-medium text-gray-600">
                  {selectedCoupon.brand}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCoupon.name}
              </h2>
            </div>

            {/* 바코드 영역 - 크게 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
              <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="bg-white p-4">
                  <BarcodeVisual code={selectedCoupon.barcode} large={true} />
                </div>
                <p className="text-center text-xl font-mono tracking-widest text-gray-800 mt-4">
                  {selectedCoupon.barcode}
                </p>
              </div>

              {/* 밝기 안내 */}
              <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-amber-50 rounded-full">
                <span className="text-amber-500">☀️</span>
                <span className="text-sm text-amber-700">
                  바코드 사용 시 화면을 밝게 해주세요
                </span>
              </div>

              {/* 사용기간 */}
              <div className="w-full mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">사용기간</span>
                  {selectedCoupon.status === "unused" && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDdayColor(selectedCoupon.dday)}`}
                    >
                      D-{selectedCoupon.dday}
                    </span>
                  )}
                </div>
                <p className="font-medium text-gray-900">
                  {selectedCoupon.validFrom} ~ {selectedCoupon.validUntil}
                </p>
              </div>

              {/* 추가 정보 */}
              <div className="w-full mt-3 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">구매일</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCoupon.purchaseDate}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">구매처</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCoupon.source}
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="p-4 border-t border-gray-100 bg-white">
              {selectedCoupon.status === "unused" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDeleteCoupon(selectedCoupon.id)}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => handleUseCoupon(selectedCoupon.id)}
                    className="flex-[2] py-3.5 bg-sky-500 text-white font-bold rounded-xl"
                  >
                    사용완료 처리
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedCoupon(null)}
                  className="w-full py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl"
                >
                  닫기
                </button>
              )}
            </div>
          </div>
        )}

        {/* 쿠폰 등록 모달 */}
        {showAddCoupon && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCoupon(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  쿠폰 등록하기
                </h3>
                <button
                  onClick={() => {
                    setShowAddCoupon(false);
                    setBarcodeInputType("manual");
                    setCouponFormData({
                      brand: "",
                      customBrand: "",
                      name: "",
                      barcode: "",
                      validUntil: "",
                      barcodeImage: null,
                    });
                  }}
                  className="p-1"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 폼 */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* 브랜드 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    브랜드 *
                  </label>
                  <select
                    value={couponFormData.brand}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        brand: e.target.value,
                        customBrand: "",
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="">브랜드 선택</option>
                    <option value="스타벅스">스타벅스</option>
                    <option value="CU">CU</option>
                    <option value="GS25">GS25</option>
                    <option value="메가MGC커피">메가MGC커피</option>
                    <option value="맥도날드">맥도날드</option>
                    <option value="배스킨라빈스">배스킨라빈스</option>
                    <option value="버거킹">버거킹</option>
                    <option value="기타">직접 입력하기</option>
                  </select>
                  {couponFormData.brand === "기타" && (
                    <input
                      type="text"
                      value={couponFormData.customBrand}
                      onChange={(e) =>
                        setCouponFormData({
                          ...couponFormData,
                          customBrand: e.target.value,
                        })
                      }
                      placeholder="브랜드명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 mt-2"
                    />
                  )}
                </div>

                {/* 상품명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={couponFormData.name}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        name: e.target.value,
                      })
                    }
                    placeholder="예: 아메리카노 T"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* 바코드 번호 - 입력 방식 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    바코드 번호 *
                  </label>

                  {/* 입력 방식 탭 */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setBarcodeInputType("manual")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        barcodeInputType === "manual"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      직접 입력
                    </button>
                    <button
                      onClick={() => setBarcodeInputType("image")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        barcodeInputType === "image"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      이미지 첨부
                    </button>
                  </div>

                  {/* 직접 입력 */}
                  {barcodeInputType === "manual" && (
                    <input
                      type="text"
                      value={couponFormData.barcode}
                      onChange={(e) =>
                        setCouponFormData({
                          ...couponFormData,
                          barcode: e.target.value,
                        })
                      }
                      placeholder="바코드 번호 입력"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 font-mono"
                    />
                  )}

                  {/* 이미지 첨부 */}
                  {barcodeInputType === "image" && (
                    <div>
                      {couponFormData.barcodeImage ? (
                        <div className="relative">
                          <img
                            src={couponFormData.barcodeImage}
                            alt="바코드 이미지"
                            className="w-full h-40 object-contain border border-gray-200 rounded-xl bg-gray-50"
                          />
                          <button
                            onClick={() =>
                              setCouponFormData({
                                ...couponFormData,
                                barcodeImage: null,
                              })
                            }
                            className="absolute top-2 right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            바코드 이미지를 첨부해주세요
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            JPG, PNG 지원
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setCouponFormData({
                                  ...couponFormData,
                                  barcodeImage: URL.createObjectURL(file),
                                });
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                {/* 유효기한 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유효기한 *
                  </label>
                  <input
                    type="date"
                    value={couponFormData.validUntil}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        validUntil: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* 등록 버튼 */}
                <button
                  onClick={() => {
                    setShowAddCoupon(false);
                    setBarcodeInputType("manual");
                    setCouponFormData({
                      brand: "",
                      customBrand: "",
                      name: "",
                      barcode: "",
                      validUntil: "",
                      barcodeImage: null,
                    });
                  }}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 내 캐시 모달
  const MyCashModal = () => {
    const [bankAccounts] = useState([
      {
        id: 1,
        bank: "국민은행",
        bankCode: "국민",
        account: "000012-**-**1323",
        isDefault: true,
      },
      {
        id: 2,
        bank: "신한은행",
        bankCode: "신한",
        account: "110-***-***456",
        isDefault: false,
      },
    ]);

    const recentTransactions = [
      {
        id: 1,
        type: "+",
        icon: "💰",
        title: "캐시 충전",
        date: "01.10 14:32",
        amount: 30000,
        status: "",
      },
      {
        id: 2,
        type: "-",
        icon: "☕",
        title: "스타벅스 아메리카노 T 구매",
        date: "01.10 15:20",
        amount: 3650,
        status: "거래중",
      },
      {
        id: 3,
        type: "+",
        icon: "🏪",
        title: "CU 상품권 판매",
        date: "01.09 10:15",
        amount: 4462,
        status: "",
      },
      {
        id: 4,
        type: "-",
        icon: "💸",
        title: "출금",
        date: "01.08 09:00",
        amount: 20000,
        status: "",
      },
      {
        id: 5,
        type: "-",
        icon: "💸",
        title: "출금",
        date: "01.08 09:00",
        amount: 20000,
        status: "",
      },
    ];

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMyCash(false)} className="p-1">
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
            <h1 className="text-lg font-bold text-gray-900">내 캐시</h1>
          </div>
          <button className="text-purple-500 font-medium text-sm">
            결제수단
          </button>
        </header>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 보유 캐시 카드 */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl p-5 text-white relative overflow-hidden">
              {/* 번개 아이콘 */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <p className="text-sm opacity-80">보유 캐시</p>
              <p className="text-3xl font-bold mt-1">
                {userStats.ssalmukCash.toLocaleString()} 원
              </p>

              {/* 충전/출금 버튼 */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setShowMyCash(false);
                    setChargeStep(1);
                    setChargeAmount(0);
                    setShowChargeModal(true);
                  }}
                  className="flex-1 py-3 bg-white text-purple-600 font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <span>+</span> 충전하기
                </button>
                <button
                  onClick={() => {
                    setShowMyCash(false);
                    setWithdrawStep(1);
                    setWithdrawAmount(0);
                    setShowWithdrawModal(true);
                  }}
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  출금하기
                </button>
              </div>
            </div>
          </div>

          {/* 캐시 상세 3개 박스 */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">출금가능</p>
                <p className="text-lg font-bold text-gray-900">
                  {(
                    userStats.ssalmukCash -
                    userStats.escrowCash -
                    userStats.purchaseDeposit
                  ).toLocaleString()}
                </p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">구매전용 예치금</p>
                <p className="text-lg font-bold text-purple-500">
                  {userStats.purchaseDeposit.toLocaleString()}
                </p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">거래중</p>
                <p className="text-lg font-bold text-purple-500">
                  {userStats.escrowCash.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 출금 계좌 섹션 */}
          <div className="bg-white mx-4 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">출금 계좌</h3>
              <button
                onClick={() => {
                  setShowMyCash(false);
                  setShowBankChange(true);
                }}
                className="text-purple-500 text-sm font-medium"
              >
                관리
              </button>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                      account.bankCode === "국민"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {account.bankCode}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{account.bank}</p>
                    <p className="text-sm text-gray-500">{account.account}</p>
                  </div>
                  {account.isDefault && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                      기본
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 최근 거래 섹션 */}
          <div className="bg-white mx-4 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">최근 거래</h3>
              <button
                onClick={() => {
                  setShowMyCash(false);
                  setShowCashHistory(true);
                }}
                className="text-purple-500 text-sm font-medium"
              >
                전체보기
              </button>
            </div>

            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        tx.type === "+" ? "bg-amber-100" : "bg-pink-100"
                      }`}
                    >
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.title}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${tx.type === "+" ? "text-blue-500" : "text-gray-900"}`}
                    >
                      {tx.type}
                      {tx.amount.toLocaleString()}원
                    </p>
                    {tx.status && (
                      <p className="text-xs text-purple-500">{tx.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 계좌 변경 모달
  const BankChangeModal = () => {
    const [selectedBank, setSelectedBank] = useState(userStats.bankName);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [step, setStep] = useState(1);

    const banks = [
      { name: "카카오뱅크", icon: "💛" },
      { name: "토스뱅크", icon: "💙" },
      { name: "국민은행", icon: "⭐" },
      { name: "신한은행", icon: "💚" },
      { name: "우리은행", icon: "💜" },
      { name: "하나은행", icon: "🩵" },
      { name: "NH농협", icon: "💚" },
      { name: "기업은행", icon: "🔵" },
    ];

    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
        onClick={() => setShowBankChange(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else setShowBankChange(false);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="text-lg font-bold text-gray-900">
              {step === 1 && "출금 계좌 변경"}
              {step === 2 && "계좌 정보 입력"}
              {step === 3 && "변경 완료"}
            </h3>
            <button
              onClick={() => setShowBankChange(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
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
          </div>

          <div className="p-6">
            {/* Step 1: 은행 선택 */}
            {step === 1 && (
              <>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs text-gray-500">현재 등록된 계좌</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {userStats.bankName} {userStats.bankAccount}
                  </p>
                </div>

                <h4 className="font-medium text-gray-700 mb-3">은행 선택</h4>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {banks.map((bank) => (
                    <button
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.name)}
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        selectedBank === bank.name
                          ? "bg-sky-100 border-2 border-sky-500"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl">{bank.icon}</span>
                      <span className="text-xs text-gray-700 font-medium">
                        {bank.name}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  다음
                </button>
              </>
            )}

            {/* Step 2: 계좌 정보 입력 */}
            {step === 2 && (
              <>
                <div className="bg-sky-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <span className="text-2xl">
                    {banks.find((b) => b.name === selectedBank)?.icon}
                  </span>
                  <span className="font-medium text-sky-700">
                    {selectedBank}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      계좌번호
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="계좌번호 입력 ('-' 제외)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      예금주명
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="예금주명 입력"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-700">
                    ⚠️ 본인 명의의 계좌만 등록 가능합니다.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (accountNumber && accountHolder) {
                      setUserStats((prev) => ({
                        ...prev,
                        bankName: selectedBank,
                        bankAccount: accountNumber.slice(0, 7) + "-******",
                      }));
                      setStep(3);
                    }
                  }}
                  disabled={!accountNumber || !accountHolder}
                  className={`w-full py-4 rounded-xl font-bold transition-colors ${
                    accountNumber && accountHolder
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  계좌 인증하기
                </button>
              </>
            )}

            {/* Step 3: 변경 완료 */}
            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-emerald-500"
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
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  계좌 변경 완료!
                </h3>
                <p className="text-gray-500 mb-6">
                  출금 계좌가 성공적으로 변경되었습니다.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                  <p className="text-sm text-gray-500 mb-2">새로운 출금 계좌</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">
                      {banks.find((b) => b.name === selectedBank)?.icon}
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedBank}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{userStats.bankAccount}</p>
                </div>

                <button
                  onClick={() => setShowBankChange(false)}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 캐시 내역 상세 페이지
  const CashHistoryModal = () => {
    const [filterType, setFilterType] = useState("all");

    const filteredHistory = cashHistory.filter((item) => {
      if (filterType === "all") return true;
      if (filterType === "in") return item.type === "+";
      if (filterType === "out") return item.type === "-";
      return true;
    });

    const totalIn = cashHistory
      .filter((i) => i.type === "+")
      .reduce((acc, i) => acc + i.amount, 0);
    const totalOut = cashHistory
      .filter((i) => i.type === "-")
      .reduce((acc, i) => acc + i.amount, 0);

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button
            onClick={() => setShowCashHistory(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">캐시 내역</h3>
          <div className="w-8"></div>
        </div>

        {/* 요약 카드 */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">총 적립</p>
              <p className="text-xl font-bold text-emerald-600">
                +{totalIn.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">총 사용</p>
              <p className="text-xl font-bold text-red-500">
                -{totalOut.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex gap-2">
            {[
              { key: "all", label: "전체" },
              { key: "in", label: "적립" },
              { key: "out", label: "사용" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === filter.key
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 내역 리스트 */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-2">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === "+" ? "bg-emerald-100" : "bg-red-100"}`}
                    >
                      <span
                        className={`text-xl ${item.type === "+" ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {item.type === "+" ? "↓" : "↑"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${item.type === "+" ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {item.type}
                      {item.amount.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-400">{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ==================== 에스크로 결제 플로우 ====================

  // 구매 플로우 (결제 → 거래중 → 쿠폰수령 → 구매확정)
  const PurchaseFlowModal = () => {
    if (!selectedProduct) return null;
    const product = selectedProduct;
    const fee = 0; // 구매자 수수료 무료
    const totalPrice = product.price + fee;
    const canBuy = userStats.ssalmukCash >= totalPrice;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => {
              if (purchaseStep > 1 && purchaseStep < 4) return; // 진행중엔 뒤로가기 불가
              setShowPurchaseFlow(false);
              setPurchaseStep(1);
              setIsSeller(false);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">
            {purchaseStep === 1 && "결제하기"}
            {purchaseStep === 2 && "거래중"}
            {purchaseStep === 3 && "쿠폰 수령"}
            {purchaseStep === 4 && "거래 완료"}
          </h3>
          <div className="w-8"></div>
        </div>

        {/* 진행 상태 바 */}
        <div className="px-4 py-3 bg-gray-50">
          <div className="flex items-center justify-between">
            {["결제", "거래중", "쿠폰수령", "구매확정"].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    purchaseStep > idx + 1
                      ? "bg-emerald-500 text-white"
                      : purchaseStep === idx + 1
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {purchaseStep > idx + 1 ? "✓" : idx + 1}
                </div>
                {idx < 3 && (
                  <div
                    className={`w-8 h-1 ${purchaseStep > idx + 1 ? "bg-emerald-500" : "bg-gray-200"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>결제</span>
            <span>거래중</span>
            <span>쿠폰수령</span>
            <span>구매확정</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Step 1: 결제하기 */}
          {purchaseStep === 1 && (
            <>
              {/* 상품 정보 */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <h3 className="font-bold text-gray-900 mt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      유효기간 D-{product.dday}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </div>

              {/* 판매자 정보 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.seller}
                      </p>
                      <p className="text-xs text-gray-400">
                        거래 {product.trades}회 · ⭐ {product.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 결제 금액 */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">결제 금액</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">상품 금액</span>
                    <span className="font-medium">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">수수료</span>
                    <span className="font-medium text-emerald-600">무료</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">
                      총 결제 금액
                    </span>
                    <span className="font-bold text-xl text-sky-600">
                      {totalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 결제 수단 */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
                <h4 className="font-bold text-gray-900 mb-3">결제 수단</h4>
                <div
                  className={`p-4 rounded-xl ${canBuy ? "bg-emerald-50 border-2 border-emerald-200" : "bg-red-50 border-2 border-red-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <p className="font-medium text-gray-900">쌀먹캐시</p>
                        <p
                          className={`text-sm ${canBuy ? "text-emerald-600" : "text-red-600"}`}
                        >
                          잔액 {userStats.ssalmukCash.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                    {canBuy ? (
                      <span className="text-emerald-500 text-xl">✓</span>
                    ) : (
                      <button
                        onClick={() => {
                          setShowPurchaseFlow(false);
                          setChargeStep(1);
                          setChargeAmount(totalPrice - userStats.ssalmukCash);
                          setShowChargeModal(true);
                        }}
                        className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg"
                      >
                        충전하기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 안전거래 안내 */}
              <div className="bg-sky-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="font-medium text-sky-700">
                      에스크로 안전결제
                    </p>
                    <p className="text-xs text-sky-600 mt-1">
                      결제 금액은 구매확정 전까지 안전하게 보관됩니다. 쿠폰 수령
                      후 구매확정 시 판매자에게 정산됩니다.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (canBuy) {
                    setUserStats((prev) => ({
                      ...prev,
                      ssalmukCash: prev.ssalmukCash - totalPrice,
                      escrowCash: prev.escrowCash + totalPrice,
                    }));
                    setPurchaseStep(2);
                  }
                }}
                disabled={!canBuy}
                className={`w-full py-4 rounded-xl font-bold text-lg ${canBuy ? "bg-sky-500 text-white hover:bg-sky-600" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
              >
                {canBuy
                  ? `${totalPrice.toLocaleString()}원 결제하기`
                  : "잔액이 부족합니다"}
              </button>
            </>
          )}

          {/* Step 2: 거래중 (에스크로 보관) */}
          {purchaseStep === 2 && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-4xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                결제 완료! 거래중입니다
              </h3>
              <p className="text-gray-500 mb-6">
                판매자가 쿠폰을 전송하면 알려드릴게요
              </p>

              <div className="bg-gray-50 rounded-2xl p-5 text-left mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div>
                    <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <h4 className="font-bold text-gray-900 mt-1">
                      {product.name}
                    </h4>
                    <p className="text-sky-600 font-bold">
                      {product.price.toLocaleString()}원
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">거래 상태</span>
                    <span className="text-amber-600 font-medium">
                      🔒 에스크로 보관중
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">판매자</span>
                    <span className="text-gray-900">{product.seller}</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-700">
                  ⏰ 판매자가 24시간 내 쿠폰을 전송하지 않으면 자동 환불됩니다.
                </p>
              </div>

              {/* 테스트용 버튼 */}
              <button
                onClick={() => setPurchaseStep(3)}
                className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600"
              >
                쿠폰 수령하기 (테스트)
              </button>
            </div>
          )}

          {/* Step 3: 쿠폰 수령 */}
          {purchaseStep === 3 && (
            <>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <button
                    onClick={() => {
                      setChatPartner(
                        isSeller
                          ? product.buyer || "구매자"
                          : product.seller || "판매자",
                      );
                      setShowChat(true);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    문의하기
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  쿠폰이 도착했어요!
                </h3>
                <p className="text-gray-500">
                  쿠폰 확인 후 구매확정을 눌러주세요
                </p>
              </div>

              {/* 쿠폰 카드 */}
              <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-5 text-white mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm opacity-80">{product.brand}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    D-{product.dday}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4">{product.name}</h3>
                <div className="bg-white/20 rounded-xl p-4 mb-4">
                  <p className="text-xs opacity-80 mb-1">바코드 번호</p>
                  <p className="text-lg font-mono font-bold tracking-wider">
                    {product.barcode}
                  </p>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-80">유효기간</span>
                  <span className="font-medium">{product.validUntil}</span>
                </div>
              </div>

              {/* 바코드 이미지 (가상) */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
                <div className="h-16 bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
                  <div className="flex gap-0.5">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-white ${Math.random() > 0.5 ? "h-12" : "h-8"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 font-mono">
                  {product.barcode}
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-700 font-medium">
                  ⚠️ 구매확정 전 확인하세요!
                </p>
                <ul className="text-xs text-amber-600 mt-2 space-y-1">
                  <li>• 바코드 번호가 정확한지 확인</li>
                  <li>• 유효기간이 맞는지 확인</li>
                  <li>• 사용 가능 여부 확인 (매장 문의)</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowDisputeModal(true)}
                  className="py-3 bg-amber-100 text-amber-700 font-medium rounded-xl hover:bg-amber-200"
                >
                  분쟁신청
                </button>
                {isSeller ? (
                  <button
                    disabled
                    className="py-3 bg-amber-400 text-white font-bold rounded-xl cursor-not-allowed"
                  >
                    거래중
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUserStats((prev) => ({
                        ...prev,
                        escrowCash: prev.escrowCash - product.price,
                        coupons: prev.coupons + 1,
                      }));
                      // 거래 완료 후 채팅 내용 삭제
                      setChatMessages([]);
                      setPurchaseStep(4);
                    }}
                    className="py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600"
                  >
                    구매확정
                  </button>
                )}
              </div>
            </>
          )}

          {/* Step 4: 구매확정 완료 */}
          {purchaseStep === 4 && (
            <div className="text-center py-8">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-emerald-500"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                거래가 완료되었어요!
              </h3>
              <p className="text-gray-500 mb-6">
                쿠폰이 내쿠폰함에 저장되었습니다
              </p>

              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <h4 className="font-bold text-gray-900 mt-1">
                      {product.name}
                    </h4>
                    <p className="text-emerald-600 font-medium text-sm">
                      구매확정 완료
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-emerald-700">
                  ✅ 판매자에게 {product.price.toLocaleString()}원이 정산됩니다.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowPurchaseFlow(false);
                  setPurchaseStep(1);
                  setSelectedProduct(null);
                  setIsSeller(false);
                }}
                className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 채팅 모달
  const ChatModal = () => {
    const sendMessage = () => {
      if (!chatInput.trim()) return;
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "me",
          text: chatInput,
          time: timeStr,
        },
      ]);
      setChatInput("");
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-teal-500 text-white px-4 py-3 flex items-center">
          <button onClick={() => setShowChat(false)} className="p-1 mr-3">
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
          <div>
            <span className="font-bold text-orange-300">{chatPartner}</span>
            <span className="font-medium">님과의 대화</span>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>대화 내용이 없습니다</p>
              <p className="text-sm mt-1">메시지를 보내 대화를 시작하세요</p>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%]`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-amber-400 text-gray-900 rounded-tr-sm"
                        : "bg-white text-gray-900 rounded-tl-sm shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-400 mt-1 ${msg.sender === "me" ? "text-right" : ""}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 입력 영역 */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="메세지를 입력하세요..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
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
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 분쟁신청 모달
  const DisputeModal = () => {
    const disputeReasons = [
      "이미 사용된 쿠폰입니다",
      "유효기간이 만료되었습니다",
      "바코드가 인식되지 않습니다",
      "상품 정보가 다릅니다",
      "기타",
    ];

    const handleSubmitDispute = () => {
      if (!disputeReason) return;
      setShowDisputeModal(false);
      setTransactionStatus("dispute");
      setShowTransactionDetail(true);
      setShowPurchaseFlow(false);
      // 2초간 토스트 표시
      setShowDisputeToast(true);
      setTimeout(() => {
        setShowDisputeToast(false);
      }, 2000);
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
          {/* 헤더 */}
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">분쟁신청</h3>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-gray-400 hover:text-gray-600"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 내용 */}
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              문제가 발생한 사유를 선택해주세요
            </p>

            <div className="space-y-2">
              {disputeReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setDisputeReason(reason)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                    disputeReason === reason
                      ? "border-amber-400 bg-amber-50 text-amber-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {disputeReason === "기타" && (
              <textarea
                value={disputeEtcText}
                onChange={(e) => setDisputeEtcText(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
                className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-amber-400"
                rows={3}
              />
            )}

            <div className="bg-amber-50 rounded-xl p-3 mt-4">
              <p className="text-xs text-amber-700">
                ⚠️ 분쟁 접수 시 자동구매확정이 중지되며, 관리자 검토 후 결과를
                안내드립니다.
              </p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 p-4 border-t border-gray-100">
            <button
              onClick={() => setShowDisputeModal(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={handleSubmitDispute}
              disabled={!disputeReason}
              className={`flex-1 py-3 font-bold rounded-xl ${
                disputeReason
                  ? "bg-amber-400 text-white hover:bg-amber-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              분쟁신청
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 거래 상세 모달
  const TransactionDetailModal = () => {
    const product = selectedProduct;
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center">
          <button
            onClick={() => {
              setShowTransactionDetail(false);
              setTransactionStatus("trading");
              setDisputeReason("");
              setDisputeEtcText("");
            }}
            className="p-1 mr-3"
          >
            <span className="text-gray-600">← 뒤로</span>
          </button>
          <h3 className="text-lg font-bold text-gray-900">거래 상세</h3>
        </div>

        {/* 상태 배지 */}
        <div className="px-4 py-3 flex justify-center">
          <span
            className={`px-6 py-2 rounded-full font-bold ${
              transactionStatus === "dispute"
                ? "bg-red-100 text-red-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {transactionStatus === "dispute" ? "분쟁중" : "거래중"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 상품 정보 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">{product.brand}</p>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
              </div>
            </div>
            <button
              onClick={() => {
                setChatPartner(product.seller || "판매자");
                setShowChat(true);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
            >
              문의하기
            </button>
          </div>

          {/* 쿠폰 바코드 */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">쿠폰 바코드</h4>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="h-16 bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                <div className="flex gap-0.5">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white"
                      style={{ height: Math.random() > 0.5 ? "48px" : "32px" }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-sm font-mono text-gray-700">
                {product.barcode}
              </p>
              <p className="text-center text-xs text-gray-500 mt-2">
                매장에서 바코드를 스캔하여 사용하세요
              </p>
            </div>
          </div>

          {/* 거래 정보 */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">거래 정보</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">거래번호</span>
                <span className="text-gray-900 text-sm">tx1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">판매자</span>
                <span className="text-gray-900 text-sm">
                  {product.seller || "쌀먹고수"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">결제금액</span>
                <span className="text-gray-900 font-bold">
                  {product.price?.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 분쟁 진행중 표시 */}
          {transactionStatus === "dispute" && (
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <div>
                  <p className="font-bold text-red-600 mb-1">분쟁 진행중</p>
                  <p className="text-sm text-red-500 mb-2">
                    {disputeReason || "기타"}
                  </p>
                  <p className="text-sm text-red-500">
                    문의하기를 통하여 해결을 해주세요
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    해결이 안될 시 쌀먹닷컴, 홈페이지 하단에
                    <br />
                    1:1 문의를 통해서 문의해주세요
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 분쟁 접수 토스트 */}
        {showDisputeToast && (
          <div className="absolute bottom-20 left-4 right-4 bg-emerald-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
            <svg
              className="w-5 h-5"
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
            <span className="font-medium">분쟁이 접수되었습니다</span>
          </div>
        )}
      </div>
    );
  };

  // 판매 등록 플로우
  const SellFlowModal = () => {
    const [sellData, setSellData] = useState({
      brand: "",
      customBrand: "",
      name: "",
      barcode: "",
      barcodeImage: null,
      validUntil: "",
      originalPrice: "",
      price: "",
    });
    const [barcodeInputType, setBarcodeInputType] = useState("manual"); // 'manual' or 'image'
    const fee = sellData.price ? Math.round(Number(sellData.price) * 0.035) : 0;
    const settleAmount = sellData.price ? Number(sellData.price) - fee : 0;
    const actualBrand =
      sellData.brand === "기타" ? sellData.customBrand : sellData.brand;
    const isBarcodeValid =
      barcodeInputType === "manual" ? sellData.barcode : sellData.barcodeImage;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">쿠폰 등록하기</h3>
            <button
              onClick={() => {
                setShowSellFlow(false);
                setSellStep(1);
              }}
              className="p-1"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Step 1: 정보 입력 */}
            {sellStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    브랜드 *
                  </label>
                  <select
                    value={sellData.brand}
                    onChange={(e) =>
                      setSellData({
                        ...sellData,
                        brand: e.target.value,
                        customBrand: "",
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none bg-white"
                  >
                    <option value="">브랜드 선택</option>
                    <option value="스타벅스">스타벅스</option>
                    <option value="맥도날드">맥도날드</option>
                    <option value="CU">CU</option>
                    <option value="GS25">GS25</option>
                    <option value="배스킨라빈스">배스킨라빈스</option>
                    <option value="공차">공차</option>
                    <option value="버거킹">버거킹</option>
                    <option value="도미노피자">도미노피자</option>
                    <option value="기타">직접 입력하기</option>
                  </select>
                  {sellData.brand === "기타" && (
                    <input
                      type="text"
                      value={sellData.customBrand}
                      onChange={(e) =>
                        setSellData({
                          ...sellData,
                          customBrand: e.target.value,
                        })
                      }
                      placeholder="브랜드명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none mt-2"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={sellData.name}
                    onChange={(e) =>
                      setSellData({ ...sellData, name: e.target.value })
                    }
                    placeholder="예: 아메리카노 T"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    바코드 번호 *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setBarcodeInputType("manual")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        barcodeInputType === "manual"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      직접 입력
                    </button>
                    <button
                      onClick={() => setBarcodeInputType("image")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        barcodeInputType === "image"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      이미지 첨부
                    </button>
                  </div>
                  {barcodeInputType === "manual" && (
                    <input
                      type="text"
                      value={sellData.barcode}
                      onChange={(e) =>
                        setSellData({ ...sellData, barcode: e.target.value })
                      }
                      placeholder="바코드 번호 입력"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none font-mono"
                    />
                  )}
                  {barcodeInputType === "image" && (
                    <div>
                      {sellData.barcodeImage ? (
                        <div className="relative">
                          <img
                            src={sellData.barcodeImage}
                            alt="바코드"
                            className="w-full h-40 object-contain border border-gray-200 rounded-xl bg-gray-50"
                          />
                          <button
                            onClick={() =>
                              setSellData({ ...sellData, barcodeImage: null })
                            }
                            className="absolute top-2 right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                          <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            바코드 이미지를 첨부해주세요
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file)
                                setSellData({
                                  ...sellData,
                                  barcodeImage: URL.createObjectURL(file),
                                });
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유효기한 *
                  </label>
                  <input
                    type="date"
                    value={sellData.validUntil}
                    onChange={(e) =>
                      setSellData({ ...sellData, validUntil: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() =>
                    actualBrand &&
                    sellData.name &&
                    isBarcodeValid &&
                    setSellStep(2)
                  }
                  disabled={!actualBrand || !sellData.name || !isBarcodeValid}
                  className={`w-full py-4 rounded-xl font-bold text-lg mt-2 ${
                    actualBrand && sellData.name && isBarcodeValid
                      ? "bg-sky-500 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  등록하기
                </button>
              </div>
            )}

            {/* Step 2: 가격 설정 */}
            {sellStep === 2 && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <div>
                      <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        {actualBrand}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-1">
                        {sellData.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    판매 가격 *
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-sky-500">
                    <input
                      type="number"
                      value={sellData.price}
                      onChange={(e) =>
                        setSellData({ ...sellData, price: e.target.value })
                      }
                      placeholder="0"
                      className="flex-1 outline-none text-xl font-bold"
                    />
                    <span className="text-gray-400">원</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-medium text-amber-700 mb-3 text-sm">
                    예상 정산 금액
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-600">판매 가격</span>
                      <span className="font-medium">
                        {sellData.price
                          ? Number(sellData.price).toLocaleString()
                          : 0}
                        원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600">수수료 (3.5%)</span>
                      <span className="font-medium text-red-500">
                        -{fee.toLocaleString()}원
                      </span>
                    </div>
                    <div className="border-t border-amber-200 pt-2 flex justify-between">
                      <span className="font-bold text-amber-700">
                        정산 예정액
                      </span>
                      <span className="font-bold text-amber-700">
                        {settleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setSellStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => sellData.price && setSellStep(3)}
                    disabled={!sellData.price}
                    className={`flex-1 py-3 font-bold rounded-xl ${
                      sellData.price
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    등록하기
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 등록 완료 */}
            {sellStep === 3 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-emerald-500"
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
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  등록 완료!
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  구매자가 나타나면 알려드릴게요
                </p>

                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🎁</span>
                    </div>
                    <div>
                      <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        {actualBrand}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-1 text-sm">
                        {sellData.name}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">판매 가격</span>
                      <span className="font-medium text-sky-600">
                        {Number(sellData.price).toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">예상 정산액</span>
                      <span className="font-medium">
                        {settleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSellFlow(false);
                    setSellStep(1);
                  }}
                  className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 내 거래 페이지
  const MyTradeModal = () => {
    const getStatusBadge = (status) => {
      const badges = {
        waiting: { text: "판매중", color: "bg-emerald-100 text-emerald-700" },
        escrow: { text: "거래중", color: "bg-amber-100 text-amber-700" },
        completed: { text: "거래완료", color: "bg-gray-100 text-gray-600" },
        settled: { text: "정산완료", color: "bg-sky-100 text-sky-700" },
      };
      return (
        badges[status] || { text: status, color: "bg-gray-100 text-gray-600" }
      );
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setShowMyTrade(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">내 거래</h3>
          <div className="w-8"></div>
        </div>

        {/* 탭 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setMyTradeTab("buying")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                myTradeTab === "buying"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              구매 내역
            </button>
            <button
              onClick={() => setMyTradeTab("selling")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                myTradeTab === "selling"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              판매 내역
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 구매 내역 */}
          {myTradeTab === "buying" && (
            <div className="space-y-3">
              {myTrades.buying.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">🛒</span>
                  <p className="mt-2">구매 내역이 없습니다</p>
                </div>
              ) : (
                myTrades.buying.map((trade) => {
                  const badge = getStatusBadge(trade.status);
                  return (
                    <div
                      key={trade.id}
                      className="bg-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-400">
                          {trade.date}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🎁</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-sky-600">
                            {trade.brand}
                          </span>
                          <h4 className="font-bold text-gray-900">
                            {trade.name}
                          </h4>
                          <p className="text-sky-600 font-bold mt-1">
                            {trade.price.toLocaleString()}원
                          </p>
                          <p className="text-xs text-gray-400">
                            판매자: {trade.seller}
                          </p>
                        </div>
                      </div>
                      {trade.status === "escrow" && (
                        <button className="w-full mt-3 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg">
                          쿠폰 확인하기
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* 판매 내역 */}
          {myTradeTab === "selling" && (
            <div className="space-y-3">
              {myTrades.selling.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">📦</span>
                  <p className="mt-2">판매 내역이 없습니다</p>
                </div>
              ) : (
                myTrades.selling.map((trade) => {
                  const badge = getStatusBadge(trade.status);
                  return (
                    <div
                      key={trade.id}
                      className="bg-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-400">
                          {trade.date}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🎁</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-sky-600">
                            {trade.brand}
                          </span>
                          <h4 className="font-bold text-gray-900">
                            {trade.name}
                          </h4>
                          <p className="text-sky-600 font-bold mt-1">
                            {trade.price.toLocaleString()}원
                          </p>
                          {trade.buyer && (
                            <p className="text-xs text-gray-400">
                              구매자: {trade.buyer}
                            </p>
                          )}
                          {trade.status === "settled" && (
                            <p className="text-xs text-emerald-600">
                              정산액: {trade.settledAmount.toLocaleString()}원
                            </p>
                          )}
                        </div>
                      </div>
                      {trade.status === "escrow" && (
                        <button className="w-full mt-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg">
                          쿠폰 전송하기
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 글쓰기 모달 - 탭별 다른 양식
  const WriteModal = () => {
    // 이벤트 글쓰기 폼 데이터
    const [eventForm, setEventForm] = useState({
      title: "",
      type: "추첨",
      prize: "",
      winners: "",
      startDate: "",
      endDate: "",
      host: "",
      platform: "",
      link: "",
      description: "",
      images: [],
    });

    // 포인트 글쓰기 폼 데이터
    const [pointForm, setPointForm] = useState({
      appName: "",
      category: "앱테크",
      reward: "",
      rewardType: "포인트",
      difficulty: "쉬움",
      description: "",
      link: "",
      images: [],
    });

    // 설문조사 글쓰기 폼 데이터
    const [surveyForm, setSurveyForm] = useState({
      type: "일반설문",
      content: "",
      email: "",
      contact: "",
    });

    // 커뮤니티 글쓰기 폼 데이터
    const [communityForm, setCommunityForm] = useState({
      category: "자유",
      title: "",
      content: "",
    });

    const getModalTitle = () => {
      switch (mainTab) {
        case "event":
          return "이벤트 공유하기";
        case "point":
          return "포인트 정보 공유";
        case "survey":
          return "설문조사 의뢰하기";
        case "market":
          return "기프티콘 판매하기";
        case "community":
          return "글쓰기";
        default:
          return "글쓰기";
      }
    };

    const getTabIcon = () => {
      switch (mainTab) {
        case "event":
          return "🎁";
        case "point":
          return "💰";
        case "survey":
          return "📋";
        case "market":
          return "🛒";
        case "community":
          return "💬";
        default:
          return "✏️";
      }
    };

    const getTabColor = () => {
      switch (mainTab) {
        case "event":
          return "sky";
        case "point":
          return "amber";
        case "survey":
          return "emerald";
        case "market":
          return "rose";
        case "community":
          return "purple";
        default:
          return "gray";
      }
    };

    // 탭별 스타일 클래스
    const getTabStyles = () => {
      switch (mainTab) {
        case "event":
          return {
            bgLight: "bg-sky-50",
            textDark: "text-sky-700",
            textMedium: "text-sky-600",
            bgSolid: "bg-sky-500 hover:bg-sky-600",
            bgActive: "bg-sky-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-sky-500",
            badgeBg: "bg-sky-100",
            badgeText: "text-sky-700",
          };
        case "point":
          return {
            bgLight: "bg-amber-50",
            textDark: "text-amber-700",
            textMedium: "text-amber-600",
            bgSolid: "bg-amber-500 hover:bg-amber-600",
            bgActive: "bg-amber-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-amber-500",
            badgeBg: "bg-amber-100",
            badgeText: "text-amber-700",
          };
        case "survey":
          return {
            bgLight: "bg-emerald-50",
            textDark: "text-emerald-700",
            textMedium: "text-emerald-600",
            bgSolid: "bg-emerald-500 hover:bg-emerald-600",
            bgActive: "bg-emerald-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-emerald-500",
            badgeBg: "bg-emerald-100",
            badgeText: "text-emerald-700",
          };
        case "community":
          return {
            bgLight: "bg-purple-50",
            textDark: "text-purple-700",
            textMedium: "text-purple-600",
            bgSolid: "bg-purple-500 hover:bg-purple-600",
            bgActive: "bg-purple-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-purple-500",
            badgeBg: "bg-purple-100",
            badgeText: "text-purple-700",
          };
        default:
          return {
            bgLight: "bg-gray-50",
            textDark: "text-gray-700",
            textMedium: "text-gray-600",
            bgSolid: "bg-gray-500 hover:bg-gray-600",
            bgActive: "bg-gray-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-gray-500",
            badgeBg: "bg-gray-100",
            badgeText: "text-gray-700",
          };
      }
    };

    const styles = getTabStyles();

    // 장터는 기존 SellFlowModal 사용
    if (mainTab === "market") {
      setShowWriteModal(false);
      setSellStep(1);
      setShowSellFlow(true);
      return null;
    }

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => {
              setShowWriteModal(false);
              setWriteStep(1);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
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
          {mainTab === "survey" ? (
            <h3 className="text-base font-medium text-gray-900">
              <span>설문조사</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>의뢰하기</span>
            </h3>
          ) : (
            <h3 className="text-lg font-bold text-gray-900">
              {getModalTitle()}
            </h3>
          )}
          {mainTab === "survey" ? (
            <div className="w-6" />
          ) : (
            <button
              onClick={() => setWriteStep(3)}
              className={`px-4 py-1.5 text-white text-sm font-medium rounded-lg ${styles.bgSolid}`}
            >
              등록하기
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Step 1: 작성 */}
          {writeStep === 1 && (
            <div className="p-4">
              {/* 탭 안내 배너 - 설문조사일 때는 간소화 */}
              {mainTab === "survey" ? (
                <p className="text-sm text-gray-500 text-center mb-6">
                  의뢰하시고 싶은 설문 내용을 남겨주시면,
                  <br />
                  확인 후 빠르게 연락 드리겠습니다.
                </p>
              ) : (
                <div className={`${styles.bgLight} rounded-xl p-4 mb-6`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTabIcon()}</span>
                    <div>
                      <p className={`font-medium ${styles.textDark}`}>
                        {getModalTitle()}
                      </p>
                      <p className={`text-xs ${styles.textMedium}`}>
                        {mainTab === "event" &&
                          "발견한 이벤트 정보를 공유해주세요!"}
                        {mainTab === "point" &&
                          "포인트 적립 꿀팁을 공유해주세요!"}
                        {mainTab === "community" &&
                          "자유롭게 이야기를 나눠보세요!"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 이벤트 폼 */}
              {mainTab === "event" && (
                <div className="space-y-4">
                  {/* 사진 첨부 영역 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        사진/동영상
                      </label>
                      <span className="text-xs text-sky-500">
                        이벤트 등록시 포인트 룰렛 1회 지급
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {/* 사진 추가 버튼 */}
                      <label className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-6 h-6 text-gray-400 mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">
                          {eventForm.images.length}/5
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files).slice(
                              0,
                              5 - eventForm.images.length,
                            );
                            const newImages = files.map((file) =>
                              URL.createObjectURL(file),
                            );
                            setEventForm({
                              ...eventForm,
                              images: [...eventForm.images, ...newImages].slice(
                                0,
                                5,
                              ),
                            });
                          }}
                        />
                      </label>
                      {/* 업로드된 이미지들 */}
                      {eventForm.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative flex-shrink-0 w-20 h-20"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            onClick={() =>
                              setEventForm({
                                ...eventForm,
                                images: eventForm.images.filter(
                                  (_, i) => i !== idx,
                                ),
                              })
                            }
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-sky-500 text-white text-[10px] rounded">
                              대표
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이벤트 유형 *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["추첨", "선착순", "출석", "미션", "퀴즈", "기타"].map(
                        (type) => (
                          <button
                            key={type}
                            onClick={() => setEventForm({ ...eventForm, type })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              eventForm.type === type
                                ? "bg-sky-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {type}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이벤트 제목 *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      placeholder="예: 스타벅스 아메리카노 100명 추첨"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        경품 *
                      </label>
                      <input
                        type="text"
                        value={eventForm.prize}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, prize: e.target.value })
                        }
                        placeholder="스타벅스 아메리카노"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        당첨자 수
                      </label>
                      <input
                        type="number"
                        value={eventForm.winners}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            winners: e.target.value,
                          })
                        }
                        placeholder="100"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        시작일
                      </label>
                      <input
                        type="date"
                        value={eventForm.startDate}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        종료일 *
                      </label>
                      <input
                        type="date"
                        value={eventForm.endDate}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            endDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        주최 *
                      </label>
                      <input
                        type="text"
                        value={eventForm.host}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, host: e.target.value })
                        }
                        placeholder="스타벅스코리아"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        플랫폼
                      </label>
                      <select
                        value={eventForm.platform}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            platform: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                      >
                        <option value="">선택</option>
                        <option value="인스타그램">인스타그램</option>
                        <option value="네이버">네이버</option>
                        <option value="카카오">카카오</option>
                        <option value="공식홈페이지">공식홈페이지</option>
                        <option value="앱">앱</option>
                        <option value="기타">기타</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이벤트 링크 *
                    </label>
                    <input
                      type="url"
                      value={eventForm.link}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, link: e.target.value })
                      }
                      placeholder="https://"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      추가 설명
                    </label>
                    <textarea
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="참여 방법이나 팁을 작성해주세요"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* 포인트 폼 */}
              {mainTab === "point" && (
                <div className="space-y-4">
                  {/* 사진 첨부 영역 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        사진/동영상
                      </label>
                      <span className="text-xs text-amber-500">
                        포인트 등록시 보너스 포인트 지급
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {/* 사진 추가 버튼 */}
                      <label className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-6 h-6 text-gray-400 mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">
                          {pointForm.images.length}/5
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files).slice(
                              0,
                              5 - pointForm.images.length,
                            );
                            const newImages = files.map((file) =>
                              URL.createObjectURL(file),
                            );
                            setPointForm({
                              ...pointForm,
                              images: [...pointForm.images, ...newImages].slice(
                                0,
                                5,
                              ),
                            });
                          }}
                        />
                      </label>
                      {/* 업로드된 이미지들 */}
                      {pointForm.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative flex-shrink-0 w-20 h-20"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            onClick={() =>
                              setPointForm({
                                ...pointForm,
                                images: pointForm.images.filter(
                                  (_, i) => i !== idx,
                                ),
                              })
                            }
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-amber-500 text-white text-[10px] rounded">
                              대표
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        "앱테크",
                        "광고",
                        "출석",
                        "미션",
                        "게임",
                        "설문",
                        "기타",
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() =>
                            setPointForm({ ...pointForm, category: cat })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            pointForm.category === cat
                              ? "bg-amber-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      앱/서비스명 *
                    </label>
                    <input
                      type="text"
                      value={pointForm.appName}
                      onChange={(e) =>
                        setPointForm({ ...pointForm, appName: e.target.value })
                      }
                      placeholder="예: 토스, 캐시워크, 리브메이트"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보상 *
                      </label>
                      <input
                        type="text"
                        value={pointForm.reward}
                        onChange={(e) =>
                          setPointForm({ ...pointForm, reward: e.target.value })
                        }
                        placeholder="500"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보상 유형
                      </label>
                      <select
                        value={pointForm.rewardType}
                        onChange={(e) =>
                          setPointForm({
                            ...pointForm,
                            rewardType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      >
                        <option value="포인트">포인트</option>
                        <option value="현금">현금</option>
                        <option value="기프티콘">기프티콘</option>
                        <option value="캐시">캐시</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      다운로드/참여 링크
                    </label>
                    <input
                      type="url"
                      value={pointForm.link}
                      onChange={(e) =>
                        setPointForm({ ...pointForm, link: e.target.value })
                      }
                      placeholder="https://"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 설명 *
                    </label>
                    <textarea
                      value={pointForm.description}
                      onChange={(e) =>
                        setPointForm({
                          ...pointForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="포인트 적립 방법, 꿀팁 등을 자세히 작성해주세요"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* 설문조사 의뢰 폼 */}
              {mainTab === "survey" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설문 유형 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {["일반설문", "퀵설문"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSurveyForm({ ...surveyForm, type })}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            surveyForm.type === type
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설문내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={surveyForm.content}
                      onChange={(e) =>
                        setSurveyForm({
                          ...surveyForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="의뢰하실 설문의 내용, 목적, 대상 등을 자세히 작성해주세요"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={surveyForm.email}
                      onChange={(e) =>
                        setSurveyForm({ ...surveyForm, email: e.target.value })
                      }
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자님 성함 / 연락처{" "}
                      <span className="text-gray-400 text-xs">
                        (필수사항 아님)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={surveyForm.contact}
                      onChange={(e) =>
                        setSurveyForm({
                          ...surveyForm,
                          contact: e.target.value,
                        })
                      }
                      placeholder="홍길동 / 010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none"
                    />
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    onClick={() => {
                      if (surveyForm.content && surveyForm.email) {
                        setWriteStep(3);
                      }
                    }}
                    disabled={!surveyForm.content || !surveyForm.email}
                    className={`w-full py-4 rounded-xl font-bold text-white mt-4 transition-colors ${
                      surveyForm.content && surveyForm.email
                        ? "bg-gray-800 hover:bg-gray-900"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    의뢰하기
                  </button>
                </div>
              )}

              {/* 커뮤니티 폼 */}
              {mainTab === "community" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["자유", "질문", "정보", "후기", "꿀팁", "잡담"].map(
                        (cat) => (
                          <button
                            key={cat}
                            onClick={() =>
                              setCommunityForm({
                                ...communityForm,
                                category: cat,
                              })
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              communityForm.category === cat
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {cat}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 *
                    </label>
                    <input
                      type="text"
                      value={communityForm.title}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="제목을 입력하세요"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      내용 *
                    </label>
                    <textarea
                      value={communityForm.content}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="내용을 입력하세요"
                      rows={8}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">이미지</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span className="text-sm">링크</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: 미리보기 */}
          {writeStep === 2 && (
            <div className="p-4">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">미리보기</p>

                {/* 이벤트 미리보기 */}
                {mainTab === "event" && eventForm.title && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-700">
                        {eventForm.type}
                      </span>
                      {eventForm.endDate && (
                        <span className="text-xs text-gray-400">
                          ~{eventForm.endDate}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {eventForm.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {eventForm.prize && (
                        <p className="text-gray-600">
                          🎁 {eventForm.prize}{" "}
                          {eventForm.winners && `(${eventForm.winners}명)`}
                        </p>
                      )}
                      {eventForm.host && (
                        <p className="text-gray-600">🏢 {eventForm.host}</p>
                      )}
                      {eventForm.platform && (
                        <p className="text-gray-600">📱 {eventForm.platform}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 포인트 미리보기 */}
                {mainTab === "point" && pointForm.appName && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                        {pointForm.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {pointForm.difficulty}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {pointForm.appName}
                    </h3>
                    <p className="text-amber-600 font-bold mb-2">
                      +{pointForm.reward} {pointForm.rewardType}
                    </p>
                    {pointForm.description && (
                      <p className="text-sm text-gray-500">
                        {pointForm.description}
                      </p>
                    )}
                  </div>
                )}

                {/* 설문 의뢰 미리보기 */}
                {mainTab === "survey" &&
                  surveyForm.content &&
                  surveyForm.email && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {surveyForm.type}
                        </span>
                        <span className="text-xs text-gray-400">설문 의뢰</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap line-clamp-3">
                        {surveyForm.content}
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>📧 {surveyForm.email}</p>
                        {surveyForm.contact && <p>👤 {surveyForm.contact}</p>}
                      </div>
                    </div>
                  )}

                {/* 커뮤니티 미리보기 */}
                {mainTab === "community" && communityForm.title && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                        {communityForm.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {communityForm.title}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {communityForm.content}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWriteStep(1)}
                  className="py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
                >
                  수정하기
                </button>
                <button
                  onClick={() => setWriteStep(3)}
                  className={`py-3 text-white font-bold rounded-xl ${styles.bgSolid}`}
                >
                  등록하기
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 등록 완료 */}
          {writeStep === 3 && (
            <div className="p-4 text-center py-12">
              <div
                className={`w-24 h-24 ${mainTab === "survey" ? "bg-gray-100" : "bg-emerald-100"} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <svg
                  className={`w-12 h-12 ${mainTab === "survey" ? "text-gray-600" : "text-emerald-500"}`}
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {mainTab === "survey" ? "의뢰 접수 완료!" : "등록 완료!"}
              </h3>
              <p className="text-gray-500 mb-6">
                {mainTab === "survey"
                  ? "설문 의뢰가 접수되었습니다. 검토 후 빠르게 연락드리겠습니다."
                  : "게시글이 등록되었습니다."}
              </p>

              {mainTab !== "survey" && (
                <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-amber-700 font-medium">
                    🎉 보상 안내
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    정보 공유로 50 쌀먹캐시가 적립되었어요!
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setShowWriteModal(false);
                  setWriteStep(1);
                }}
                className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 검색 모달
  const SearchModal = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchHistory] = useState([
      "스타벅스 이벤트",
      "토스 포인트",
      "설문조사 500원",
      "기프티콘",
    ]);
    const popularSearches = [
      "스타벅스",
      "CU",
      "맥도날드",
      "토스",
      "페이코",
      "설문조사",
      "출석체크",
      "선착순",
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 검색 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <button onClick={() => setShowSearchModal(false)} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이벤트, 설문조사, 기프티콘 검색"
              className="w-full px-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 최근 검색어 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">최근 검색어</h3>
              <button className="text-xs text-gray-400">전체 삭제</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200"
                >
                  <span>{term}</span>
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
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

          {/* 인기 검색어 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">인기 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-sm font-medium hover:bg-sky-100"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* 추천 이벤트 */}
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-3">
              🔥 지금 인기있는 이벤트
            </h3>
            <div className="space-y-2">
              {[
                {
                  title: "스타벅스 아메리카노 100명 추첨",
                  badge: "추첨",
                  hot: true,
                },
                {
                  title: "CU 편의점 상품권 선착순",
                  badge: "선착순",
                  hot: true,
                },
                {
                  title: "토스 포인트 500원 적립",
                  badge: "포인트",
                  hot: false,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-lg font-bold text-sky-500">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${item.hot ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 알림 모달
  const NotificationModal = () => {
    const notifications = [
      {
        id: 1,
        type: "event",
        title: "스타벅스 이벤트 당첨!",
        desc: "아메리카노 기프티콘이 도착했어요",
        time: "방금",
        read: false,
        icon: "🎁",
      },
      {
        id: 2,
        type: "cash",
        title: "쌀먹캐시 적립",
        desc: "설문조사 참여 보상 +500원",
        time: "10분 전",
        read: false,
        icon: "💰",
      },
      {
        id: 3,
        type: "trade",
        title: "거래 완료",
        desc: "구매하신 기프티콘이 도착했어요",
        time: "1시간 전",
        read: false,
        icon: "🛒",
      },
      {
        id: 4,
        type: "survey",
        title: "새로운 설문조사",
        desc: "MZ세대 소비습관 조사 - 1,000원",
        time: "3시간 전",
        read: true,
        icon: "📋",
      },
      {
        id: 5,
        type: "event",
        title: "마감 임박!",
        desc: "참여한 이벤트가 내일 마감이에요",
        time: "어제",
        read: true,
        icon: "⏰",
      },
      {
        id: 6,
        type: "system",
        title: "공지사항",
        desc: "생활쌀먹 v2.0 업데이트 안내",
        time: "2일 전",
        read: true,
        icon: "📢",
      },
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button onClick={() => setShowNotification(false)} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">알림</h3>
          <button className="text-sm text-sky-600">모두 읽음</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.map((noti) => (
            <div
              key={noti.id}
              className={`flex items-start gap-3 p-4 border-b border-gray-50 ${!noti.read ? "bg-sky-50/50" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${!noti.read ? "bg-sky-100" : "bg-gray-100"}`}
              >
                <span className="text-xl">{noti.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-medium ${!noti.read ? "text-gray-900" : "text-gray-600"}`}
                  >
                    {noti.title}
                  </p>
                  {!noti.read && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{noti.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{noti.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 마이페이지 모달
  const MyPageModal = () => {
    const menuItems = [
      {
        section: "내 활동",
        items: [
          {
            icon: "🎫",
            label: "내 쿠폰",
            count: userStats.coupons,
            action: () => {
              setShowMyPage(false);
              setShowMyCoupon(true);
            },
          },
          {
            icon: "💰",
            label: "내 캐시",
            value: `${userStats.ssalmukCash.toLocaleString()}원`,
            action: () => {
              setShowMyPage(false);
              setShowMyCash(true);
            },
          },
          {
            icon: "🛒",
            label: "내 거래",
            action: () => {
              setShowMyPage(false);
              setShowMyTrade(true);
            },
          },
          { icon: "❤️", label: "찜한 이벤트", count: 12 },
          { icon: "📝", label: "내가 쓴 글", count: 5 },
        ],
      },
      {
        section: "참여 내역",
        items: [
          { icon: "🎁", label: "참여한 이벤트", count: 28 },
          { icon: "📋", label: "참여한 설문조사", count: 15 },
          { icon: "🏆", label: "당첨 내역", count: 3 },
        ],
      },
      {
        section: "설정",
        items: [
          { icon: "🔔", label: "알림 설정" },
          { icon: "👤", label: "계정 관리" },
          { icon: "🔒", label: "개인정보 처리방침" },
          { icon: "📄", label: "이용약관" },
          { icon: "❓", label: "고객센터" },
        ],
      },
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button onClick={() => setShowMyPage(false)} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">마이페이지</h3>
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 프로필 섹션 */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍚</span>
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-xl font-bold">쌀먹러123</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    Lv.{userStats.level} {userStats.levelName}
                  </span>
                  <span className="text-xs opacity-80">
                    {userStats.streak}일 연속 출석
                  </span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-white/20 text-white text-sm rounded-lg">
                프로필 수정
              </button>
            </div>

            {/* 경험치 바 */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>다음 레벨까지</span>
                <span>{userStats.exp}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${userStats.exp}%` }}
                />
              </div>
            </div>
          </div>

          {/* 퀵 메뉴 */}
          <div className="bg-white p-4 border-b border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyCoupon(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎫</span>
                </div>
                <span className="text-xs text-gray-600">쿠폰</span>
                <span className="text-sm font-bold text-amber-600">
                  {userStats.coupons}
                </span>
              </button>
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyCash(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <span className="text-xs text-gray-600">캐시</span>
                <span className="text-sm font-bold text-sky-600">
                  {(userStats.ssalmukCash / 10000).toFixed(1)}만
                </span>
              </button>
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyTrade(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🛒</span>
                </div>
                <span className="text-xs text-gray-600">거래</span>
                <span className="text-sm font-bold text-emerald-600">2건</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <span className="text-xs text-gray-600">당첨</span>
                <span className="text-sm font-bold text-rose-600">3회</span>
              </button>
            </div>
          </div>

          {/* 이번달 활동 요약 */}
          <div className="bg-white p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">📊 이번달 활동</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-sky-600">28</p>
                  <p className="text-xs text-gray-500">이벤트 참여</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">15</p>
                  <p className="text-xs text-gray-500">설문 완료</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">12,500</p>
                  <p className="text-xs text-gray-500">적립 캐시</p>
                </div>
              </div>
            </div>
          </div>

          {/* 메뉴 섹션들 */}
          {menuItems.map((section, sIdx) => (
            <div key={sIdx} className="bg-white border-b border-gray-100">
              <h3 className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400">
                {section.section}
              </h3>
              {section.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-sm text-sky-600 font-medium">
                        {item.count}
                      </span>
                    )}
                    {item.value && (
                      <span className="text-sm text-sky-600 font-medium">
                        {item.value}
                      </span>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ))}

          {/* 로그아웃 */}
          <div className="p-4">
            <button className="w-full py-3 text-gray-500 text-sm">
              로그아웃
            </button>
          </div>

          {/* 버전 정보 */}
          <div className="text-center pb-8">
            <p className="text-xs text-gray-400">생활쌀먹 v2.0.1</p>
          </div>
        </div>
      </div>
    );
  };

  // 내응모함 모달
  const MyEntriesModal = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // 응모 내역 데이터
    const [myEntries] = useState([
      {
        id: 1,
        type: "댓글",
        hot: true,
        title: "[스타벅스] 겨울 신메뉴 출시 기념",
        prize: "아메리카노 T",
        status: "won", // progress, won, completed
        deadline: "01.12",
        announceDate: "01.14",
        actualAnnounce: "01.14",
        announceLink: null,
        platform: "인스타그램",
        registeredAt: "2025.01.10",
      },
      {
        id: 2,
        type: "댓글",
        hot: true,
        title: "[스타벅스] 겨울 신메뉴 출시 기념",
        prize: "아메리카노 T",
        status: "won",
        deadline: "01.31",
        announceDate: "02.05",
        actualAnnounce: "02.05",
        announceLink: null,
        platform: "홈페이지",
        registeredAt: "2025.01.15",
      },
      {
        id: 3,
        type: "퀴즈",
        hot: false,
        title: "[CU편의점] 12월 행운퀴즈 이벤트",
        prize: "CU 5천원권",
        status: "won",
        deadline: "01.15",
        announceDate: "01.20",
        actualAnnounce: "01.20",
        announceLink: "https://example.com",
        platform: "홈페이지",
        registeredAt: "2025.01.08",
      },
      {
        id: 4,
        type: "인증샷",
        hot: false,
        title: "[GS25] 와인 페스티벌 이벤트",
        prize: "GS25 1만원권",
        status: "progress",
        deadline: "02.10",
        announceDate: "02.15",
        actualAnnounce: null,
        announceLink: null,
        platform: "홈페이지",
        registeredAt: "2025.01.20",
      },
      {
        id: 5,
        type: "팔로우",
        hot: false,
        title: "[올리브영] 신년맞이 럭키드로우",
        prize: "올리브영 3만원권",
        status: "completed",
        deadline: "01.07",
        announceDate: "01.10",
        actualAnnounce: "01.10",
        announceLink: "https://example.com",
        platform: "인스타그램",
        registeredAt: "2025.01.05",
      },
    ]);

    // 필터링
    const getFilteredEntries = () => {
      let filtered = [...myEntries];

      // 탭 필터
      if (entryTab === "progress") {
        filtered = filtered.filter((e) => e.status === "progress");
      } else if (entryTab === "won") {
        filtered = filtered.filter((e) => e.status === "won");
      } else if (entryTab === "completed") {
        filtered = filtered.filter((e) => e.status === "completed");
      }

      // 검색 필터
      if (searchQuery) {
        filtered = filtered.filter(
          (e) =>
            e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.prize.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // 정렬
      if (entrySort === "registered") {
        filtered.sort(
          (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt),
        );
      } else if (entrySort === "platform") {
        filtered.sort((a, b) => a.platform.localeCompare(b.platform));
      } else if (entrySort === "deadline") {
        filtered.sort((a, b) => a.deadline.localeCompare(b.deadline));
      } else if (entrySort === "announced") {
        filtered.sort((a, b) =>
          (a.actualAnnounce || "zz").localeCompare(b.actualAnnounce || "zz"),
        );
      } else if (entrySort === "announceSoon") {
        filtered.sort((a, b) => a.announceDate.localeCompare(b.announceDate));
      }

      return filtered;
    };

    const filteredEntries = getFilteredEntries();
    const progressCount = myEntries.filter(
      (e) => e.status === "progress",
    ).length;
    const wonCount = myEntries.filter((e) => e.status === "won").length;
    const completedCount = myEntries.filter(
      (e) => e.status === "completed",
    ).length;

    const getTypeBadgeColor = (type) => {
      const colors = {
        퀴즈: "bg-blue-100 text-blue-600",
        댓글: "bg-purple-100 text-purple-600",
        인증샷: "bg-pink-100 text-pink-600",
        팔로우: "bg-green-100 text-green-600",
      };
      return colors[type] || "bg-gray-100 text-gray-600";
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (initialShowMyEntries && goBack) {
                  goBack();
                } else {
                  setShowMyEntries(false);
                }
              }}
              className="p-1 -ml-1"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="text-lg font-bold text-gray-900">응모함</h3>
            <div className="w-6"></div>
          </div>
        </div>

        {/* 상태 요약 */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="flex justify-around">
            <button
              onClick={() => setEntryTab("progress")}
              className={`flex flex-col items-center ${entryTab === "progress" ? "text-sky-600" : "text-gray-500"}`}
            >
              <span className="text-sm text-gray-500">진행중</span>
              <span className="text-2xl font-bold">{progressCount}</span>
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              onClick={() => setEntryTab("won")}
              className={`flex flex-col items-center ${entryTab === "won" ? "text-sky-600" : "text-gray-500"}`}
            >
              <span className="text-sm text-gray-500">당첨함</span>
              <span className="text-2xl font-bold">{wonCount}</span>
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              onClick={() => setEntryTab("completed")}
              className={`flex flex-col items-center ${entryTab === "completed" ? "text-sky-600" : "text-gray-500"}`}
            >
              <span className="text-sm text-gray-500">발표완료</span>
              <span className="text-2xl font-bold">{completedCount}</span>
            </button>
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide text-sm">
            {[
              { key: "registered", label: "등록일" },
              { key: "platform", label: "플랫폼순" },
              { key: "deadline", label: "마감일" },
              { key: "announced", label: "발표일" },
              { key: "announceSoon", label: "발표예정일" },
            ].map((sort) => (
              <button
                key={sort.key}
                onClick={() => setEntrySort(sort.key)}
                className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                  entrySort === sort.key
                    ? "text-sky-600 border-sky-600 font-medium"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* 검색 */}
        <div className="bg-gray-50 px-4 py-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이벤트명&경품태그 검색"
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
            <button className="px-4 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-lg">
              검색
            </button>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center text-xs text-gray-500 font-medium">
            <div className="flex-1">제목</div>
            <div className="w-14 text-center">당첨유무</div>
            <div className="w-12 text-center">마감</div>
            <div className="w-20 text-center">발표예정</div>
            <div className="w-14 text-center">발표링크</div>
          </div>
        </div>

        {/* 응모 목록 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📋</span>
              </div>
              <p className="text-gray-500 mb-2">응모 내역이 없습니다</p>
              <p className="text-sm text-gray-400">이벤트에 참여해보세요!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    {/* 제목 영역 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${getTypeBadgeColor(entry.type)}`}
                        >
                          {entry.type}
                        </span>
                        {entry.hot && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-red-100 text-red-500 rounded flex items-center gap-0.5">
                            🔥 HOT
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {entry.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <span>🎁</span> {entry.prize}
                      </p>
                    </div>

                    {/* 당첨유무 */}
                    <div className="w-14 flex justify-center">
                      {entry.status === "won" ? (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
                          당첨
                        </span>
                      ) : entry.status === "progress" ? (
                        <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs font-medium rounded">
                          대기
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-400 text-xs font-medium rounded">
                          미당첨
                        </span>
                      )}
                    </div>

                    {/* 마감 */}
                    <div className="w-12 text-center">
                      <span className="text-xs text-gray-600">
                        {entry.deadline}
                      </span>
                    </div>

                    {/* 발표예정(실제) */}
                    <div className="w-20 text-center">
                      <span className="text-xs text-gray-600">
                        {entry.actualAnnounce || entry.announceDate}
                      </span>
                    </div>

                    {/* 발표링크 */}
                    <div className="w-14 text-center">
                      {entry.announceLink ? (
                        <a
                          href={entry.announceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-sky-500 hover:text-sky-600"
                        >
                          바로가기
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">미발표</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 전체보기 탭 */}
        <div className="bg-white border-t border-gray-100 px-4 py-3">
          <button
            onClick={() => setEntryTab("all")}
            className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all ${
              entryTab === "all"
                ? "bg-sky-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            전체보기 ({myEntries.length})
          </button>
        </div>
      </div>
    );
  };

  // 이벤트 필터 모달
  const EventFilterModal = () => {
    const [tempFilters, setTempFilters] = useState({ ...eventFilters });
    const [tempViewType, setTempViewType] = useState(eventViewType);

    const prizeTypes = [
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
    ];

    const entryTypes = [
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
      "즉석당첨",
      "라이브방송",
    ];

    const platforms = [
      { name: "홈페이지", color: "bg-gray-100 text-gray-700" },
      { name: "페이스북", color: "bg-blue-100 text-blue-700" },
      { name: "인스타그램", color: "bg-pink-100 text-pink-700" },
      { name: "유튜브", color: "bg-red-100 text-red-700" },
      { name: "네이버블로그", color: "bg-green-100 text-green-700" },
      { name: "네이버카페", color: "bg-green-100 text-green-700" },
      { name: "카카오톡채널", color: "bg-yellow-100 text-yellow-700" },
      { name: "카카오스토리", color: "bg-yellow-100 text-yellow-700" },
      { name: "X (트위터)", color: "bg-gray-800 text-white" },
      { name: "APP전용", color: "bg-purple-100 text-purple-700" },
      { name: "스레드", color: "bg-gray-100 text-gray-700" },
    ];

    const toggleFilter = (category, value) => {
      setTempFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      }));
    };

    const applyFilters = () => {
      setEventFilters(tempFilters);
      setEventViewType(tempViewType);
      setShowEventFilter(false);
    };

    const resetFilters = () => {
      setTempFilters({ prizeTypes: [], entryTypes: [], platforms: [] });
      setTempViewType("card");
    };

    const totalFilters =
      tempFilters.prizeTypes.length +
      tempFilters.entryTypes.length +
      tempFilters.platforms.length;

    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
        onClick={() => setShowEventFilter(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
            <h3 className="text-lg font-bold text-gray-900">필터 옵션</h3>
            <button onClick={() => setShowEventFilter(false)} className="p-1">
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

          {/* 내용 */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* View 타입 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">View</h4>
              <div className="space-y-2">
                <button
                  onClick={() => setTempViewType("card")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                    tempViewType === "card"
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200"
                  }`}
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="text-gray-700">카드형</span>
                  {tempViewType === "card" && (
                    <svg
                      className="w-5 h-5 text-sky-500 ml-auto"
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
                <button
                  onClick={() => setTempViewType("list")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                    tempViewType === "list"
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200"
                  }`}
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span className="text-gray-700">목록형</span>
                  {tempViewType === "list" && (
                    <svg
                      className="w-5 h-5 text-sky-500 ml-auto"
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
              </div>
            </div>

            {/* 경품종류 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">경품종류</h4>
              <div className="flex flex-wrap gap-2">
                {prizeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("prizeTypes", type)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.prizeTypes.includes(type)
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모형태 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">응모형태</h4>
              <div className="flex flex-wrap gap-2">
                {entryTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("entryTypes", type)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.entryTypes.includes(type)
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모플랫폼 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">응모플랫폼</h4>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => toggleFilter("platforms", platform.name)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.platforms.includes(platform.name)
                        ? "bg-sky-500 text-white"
                        : platform.color
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl"
            >
              초기화
            </button>
            <button
              onClick={applyFilters}
              className="flex-[2] py-3 bg-sky-500 text-white font-bold rounded-xl"
            >
              적용하기 {totalFilters > 0 && `(${totalFilters})`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 충전하기 모달
  const ChargeModal = () => {
    const [selectedPayment, setSelectedPayment] = useState("kakao");
    const [simplePayment, setSimplePayment] = useState(false);
    const quickAmounts = [10000, 30000, 50000, 100000];
    const recentAmounts = [10000, 30000, 50000];

    const paymentMethods = [
      {
        id: "bank",
        name: "무통장입금 / 계좌이체",
        icon: "🏦",
        iconBg: "bg-emerald-100",
        fee: 0,
        feeText: "수수료 무료",
        desc: "출금 가능",
        recommended: true,
      },
      {
        id: "card",
        name: "신용/체크카드",
        icon: "💳",
        iconBg: "bg-amber-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
      {
        id: "naver",
        name: "네이버페이",
        icon: "●",
        iconColor: "text-green-500",
        iconBg: "bg-green-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
      {
        id: "kakao",
        name: "카카오페이",
        icon: "●",
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "",
      },
      {
        id: "toss",
        name: "토스페이",
        icon: "●",
        iconColor: "text-blue-500",
        iconBg: "bg-blue-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
    ];

    const selectedMethod = paymentMethods.find((m) => m.id === selectedPayment);
    const feeAmount = selectedMethod?.fee
      ? Math.round((chargeAmount * selectedMethod.fee) / 100)
      : 0;
    const totalAmount = chargeAmount + feeAmount;

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <button
            onClick={() => {
              if (chargeStep > 1) setChargeStep(chargeStep - 1);
              else setShowChargeModal(false);
            }}
            className="p-1"
          >
            {chargeStep === 1 ? (
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
            ) : (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-bold text-gray-900">캐시 충전</h1>
          <div className="w-6"></div>
        </header>

        {/* 상단 보라색 바 (Step 1만) */}
        {chargeStep === 1 && (
          <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
        )}

        {/* 스텝 인디케이터 */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep > 1
                  ? "bg-emerald-500 text-white"
                  : chargeStep === 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {chargeStep > 1 ? "✓" : "1"}
            </div>
            <div
              className={`w-12 h-0.5 ${chargeStep > 1 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 2 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep > 2
                  ? "bg-emerald-500 text-white"
                  : chargeStep === 2
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {chargeStep > 2 ? "✓" : "2"}
            </div>
            <div
              className={`w-12 h-0.5 ${chargeStep > 2 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 3 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep === 3
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Step 1: 금액 입력 */}
          {chargeStep === 1 && (
            <div className="px-6 pb-6">
              {/* 현재 잔액 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">현재 잔액</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userStats.ssalmukCash.toLocaleString()}원
                </p>
              </div>

              {/* 충전할 금액 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">충전할 금액</p>
                <div className="border-b-2 border-gray-200 pb-2 focus-within:border-purple-500">
                  <input
                    type="text"
                    value={chargeAmount ? chargeAmount.toLocaleString() : ""}
                    onChange={(e) =>
                      setChargeAmount(Number(e.target.value.replace(/,/g, "")))
                    }
                    placeholder="0"
                    className="w-full text-3xl font-bold text-right outline-none"
                  />
                </div>
              </div>

              {/* 빠른 선택 버튼 */}
              <div className="flex gap-2 mb-6">
                {quickAmounts.map((amount, idx) => (
                  <button
                    key={amount}
                    onClick={() => setChargeAmount(amount)}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      chargeAmount === amount
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {idx === 0
                      ? "1만"
                      : idx === 1
                        ? "3만"
                        : idx === 2
                          ? "5만"
                          : "10만"}
                  </button>
                ))}
              </div>

              {/* 최근 충전 금액 */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">최근 충전 금액</p>
                <div className="flex gap-2">
                  {recentAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setChargeAmount(amount)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600"
                    >
                      {amount.toLocaleString()}원
                    </button>
                  ))}
                </div>
              </div>

              {/* 충전 후 예상 잔액 */}
              <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                <span className="text-gray-600">충전 후 예상 잔액</span>
                <span className="text-xl font-bold text-purple-600">
                  {(userStats.ssalmukCash + chargeAmount).toLocaleString()}원
                </span>
              </div>

              {/* 예치금 안내 */}
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-purple-700 mb-2">
                  예치금 안내
                </p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• 일반 예치금 : 무통장/계좌이체로 충전, 출금 가능</li>
                  <li>• 구매전용 예치금 : 카드/간편결제로 충전, 출금 불가</li>
                  <li>• 구매 시 구매전용 예치금이 먼저 사용됩니다</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: 결제 수단 선택 */}
          {chargeStep === 2 && (
            <div className="px-6 pb-6">
              {/* 충전 금액 표시 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">충전 금액</p>
                <p className="text-3xl font-bold text-gray-900">
                  {chargeAmount.toLocaleString()}원
                </p>
              </div>

              {/* 결제 수단 선택 */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 font-medium mb-3">
                  결제 수단 선택
                </p>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedPayment === method.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${method.iconBg}`}
                      >
                        <span className={`text-lg ${method.iconColor || ""}`}>
                          {method.icon}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {method.name}
                          </span>
                          {method.recommended && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                              추천
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {method.feeText} · {method.desc || "일반"}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 금액 상세 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">충전금액</span>
                  <span className="font-medium">
                    {chargeAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2 text-purple-600">
                  <span>수수료 {selectedMethod?.fee || 0}%</span>
                  <span>+{feeAmount.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-3">
                  <span className="font-bold text-gray-900">실 입금액</span>
                  <span className="font-bold text-purple-600">
                    {totalAmount.toLocaleString()} 원
                  </span>
                </div>
              </div>

              {/* 간편 결제 토글 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔒</span>
                  <div>
                    <p className="font-medium text-gray-900">간편 결제</p>
                    <p className="text-xs text-gray-400">
                      Face ID / 지문으로 결제
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSimplePayment(!simplePayment)}
                  className={`w-12 h-7 rounded-full transition-colors ${simplePayment ? "bg-purple-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${simplePayment ? "translate-x-6" : "translate-x-1"}`}
                  ></div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 충전 완료 */}
          {chargeStep === 3 && (
            <div className="px-6 pb-6 text-center">
              <div className="py-8">
                {/* 체크 아이콘 */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  충전 완료!
                </h2>
                <p className="text-gray-500 mb-8">
                  {chargeAmount.toLocaleString()}원이 충전되었습니다
                </p>

                {/* 현재 잔액 */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-500 mb-2">현재 잔액</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {userStats.ssalmukCash.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          {chargeStep === 1 && (
            <button
              onClick={() => chargeAmount > 0 && setChargeStep(2)}
              disabled={chargeAmount <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                chargeAmount > 0
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          )}

          {chargeStep === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setChargeStep(1)}
                className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setUserStats((prev) => ({
                    ...prev,
                    ssalmukCash: prev.ssalmukCash + chargeAmount,
                  }));
                  setChargeStep(3);
                }}
                className="flex-1 py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 flex items-center justify-center gap-2"
              >
                <span>🔒</span> {chargeAmount.toLocaleString()}원 결제
              </button>
            </div>
          )}

          {chargeStep === 3 && (
            <button
              onClick={() => setShowChargeModal(false)}
              className="w-full py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600"
            >
              확인
            </button>
          )}
        </div>
      </div>
    );
  };

  // 출금하기 모달
  const WithdrawModal = () => {
    const availableCash =
      userStats.ssalmukCash - userStats.escrowCash - userStats.purchaseDeposit;
    const withdrawFee = withdrawAmount >= 10000 ? 0 : 1000;
    const finalAmount = withdrawAmount - withdrawFee;
    const [selectedBank, setSelectedBank] = useState(0);

    const bankAccounts = [
      {
        id: 0,
        bank: "국민은행",
        bankCode: "국민",
        account: "000012-**-**1323",
        holder: "홍길동",
        color: "bg-yellow-500",
      },
      {
        id: 1,
        bank: "신한은행",
        bankCode: "신한",
        account: "110-***-***456",
        holder: "홍길동",
        color: "bg-blue-500",
      },
    ];

    const quickAmounts = [10000, 30000, 50000];

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <button onClick={() => setShowWithdrawModal(false)} className="p-1">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">출금 신청</h1>
          <div className="w-6"></div>
        </header>

        {/* 스텝 인디케이터 */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep > 1
                  ? "bg-emerald-500 text-white"
                  : withdrawStep === 1
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {withdrawStep > 1 ? "✓" : "1"}
            </div>
            <div
              className={`w-12 h-0.5 ${withdrawStep > 1 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 2 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep > 2
                  ? "bg-emerald-500 text-white"
                  : withdrawStep === 2
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {withdrawStep > 2 ? "✓" : "2"}
            </div>
            <div
              className={`w-12 h-0.5 ${withdrawStep > 2 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 3 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep === 3
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Step 1: 금액 입력 */}
          {withdrawStep === 1 && (
            <div className="px-6 pb-6">
              {/* 출금 가능 금액 카드 */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl p-5 text-white mb-6">
                <p className="text-sm opacity-80 mb-1">출금 가능 금액</p>
                <p className="text-3xl font-bold">
                  {availableCash.toLocaleString()}원
                </p>
              </div>

              {/* 출금 금액 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">출금 금액</p>
                <div className="border-b-2 border-gray-200 pb-2 focus-within:border-gray-900">
                  <input
                    type="text"
                    value={
                      withdrawAmount ? withdrawAmount.toLocaleString() : ""
                    }
                    onChange={(e) => {
                      const value = Number(e.target.value.replace(/,/g, ""));
                      setWithdrawAmount(Math.min(value, availableCash));
                    }}
                    placeholder="0"
                    className="w-full text-3xl font-bold text-right outline-none"
                  />
                </div>
              </div>

              {/* 빠른 선택 버튼 */}
              <div className="flex gap-2 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() =>
                      setWithdrawAmount(Math.min(amount, availableCash))
                    }
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      withdrawAmount === amount
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {amount === 10000
                      ? "1만"
                      : amount === 30000
                        ? "3만"
                        : "5만"}
                  </button>
                ))}
                <button
                  onClick={() => setWithdrawAmount(availableCash)}
                  className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    withdrawAmount === availableCash
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  전액
                </button>
              </div>

              {/* 금액 상세 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">출금 금액</span>
                  <span className="font-medium">
                    {withdrawAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">수수료</span>
                  <span
                    className={`font-medium ${withdrawFee > 0 ? "text-red-500" : "text-gray-600"}`}
                  >
                    {withdrawFee > 0 ? `-${withdrawFee.toLocaleString()}` : "0"}{" "}
                    원
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-3">
                  <span className="font-bold text-gray-900">실 입금액</span>
                  <span className="font-bold text-emerald-600">
                    {Math.max(0, finalAmount).toLocaleString()} 원
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 계좌 선택 */}
          {withdrawStep === 2 && (
            <div className="px-6 pb-6">
              {/* 입금 예정액 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">입금 예정액</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {Math.max(0, finalAmount).toLocaleString()}원
                </p>
              </div>

              {/* 입금 계좌 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-700 font-medium">입금 계좌</p>
                  <button
                    onClick={() => {
                      setShowWithdrawModal(false);
                      setShowBankChange(true);
                    }}
                    className="text-emerald-600 text-sm font-medium"
                  >
                    계좌 관리
                  </button>
                </div>
                <div className="space-y-2">
                  {bankAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => setSelectedBank(account.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedBank === account.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${account.color}`}
                      >
                        {account.bankCode}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900">
                          {account.bank}
                        </p>
                        <p className="text-sm text-gray-500">
                          {account.account} · {account.holder}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedBank === account.id
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedBank === account.id && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 출금 안내 */}
              <div className="bg-amber-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="font-medium text-amber-700 mb-1">출금 안내</p>
                    <ul className="text-sm text-amber-600 space-y-0.5">
                      <li>• 평일 09~16시: 1시간 내 입금</li>
                      <li>• 그 외: 다음 영업일 입금</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 출금 완료 */}
          {withdrawStep === 3 && (
            <div className="px-6 pb-6 text-center">
              <div className="py-8">
                {/* 체크 아이콘 */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  출금 신청 완료!
                </h2>
                <p className="text-gray-500 mb-8">
                  {Math.max(0, finalAmount).toLocaleString()}원이 입금될
                  예정입니다
                </p>

                {/* 입금 계좌 */}
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-sm font-bold ${bankAccounts[selectedBank].color}`}
                  >
                    {bankAccounts[selectedBank].bankCode}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {bankAccounts[selectedBank].bank}
                    </p>
                    <p className="text-sm text-gray-500">
                      {bankAccounts[selectedBank].account}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          {withdrawStep === 1 && (
            <button
              onClick={() => withdrawAmount >= 1000 && setWithdrawStep(2)}
              disabled={withdrawAmount < 1000}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                withdrawAmount >= 1000
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          )}

          {withdrawStep === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setWithdrawStep(1)}
                className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setUserStats((prev) => ({
                    ...prev,
                    ssalmukCash: prev.ssalmukCash - withdrawAmount,
                  }));
                  setWithdrawStep(3);
                }}
                className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
              >
                출금 신청
              </button>
            </div>
          )}

          {withdrawStep === 3 && (
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
            >
              확인
            </button>
          )}
        </div>
      </div>
    );
  };

  // 당첨자발표 등록 모달
  const WinnerRegisterModal = () => {
    const [url, setUrl] = useState("");
    const [memo, setMemo] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const handleRegister = () => {
      if (url) {
        setWinnerAnnouncement({
          url,
          memo,
          isPrivate,
          isRegistered: true,
          registeredBy: "TOT24",
          registeredDate: "2026-01-16",
        });
        setShowWinnerRegister(false);
        setUrl("");
        setMemo("");
        setIsPrivate(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-sky-600">
              [미발표] 당첨자발표 등록하기
            </h3>
            <p className="text-sm text-amber-500 mt-1">
              🔗 링크 등록시 20쌀 적립
            </p>
          </div>

          {/* 폼 */}
          <div className="p-4 space-y-4">
            {/* URL 입력 */}
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="발표 확인 가능한 URL 입력하기"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* 도움메모 입력 */}
            <div>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="도움메모 입력해주세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* 개별통보 체크박스 */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />
              <span className="text-sm text-gray-700">개별통보</span>
            </label>

            {/* 경고 문구 */}
            <p className="text-sm text-sky-500">
              관련없는 정보는 삭제 및 포인트가 회수됩니다.
            </p>
          </div>

          {/* 버튼 */}
          <div className="p-4 flex gap-3">
            <button
              onClick={() => {
                setShowWinnerRegister(false);
                setUrl("");
                setMemo("");
                setIsPrivate(false);
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleRegister}
              disabled={!url}
              className={`flex-1 py-3 font-medium rounded-xl transition-colors ${
                url
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 정정신청 모달
  const CorrectionRequestModal = () => {
    const [selectedReason, setSelectedReason] = useState(null);

    const handleSubmit = () => {
      if (selectedReason) {
        // 정정신청 처리
        alert("정정신청이 접수되었습니다.");
        setShowCorrectionRequest(false);
        setSelectedReason(null);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          {/* 헤더 */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">정정신청</h3>
            <p className="text-sm text-gray-500 mt-1">
              신청 사유를 선택해주세요
            </p>
          </div>

          {/* 선택 옵션 */}
          <div className="p-4 space-y-3">
            <button
              onClick={() => setSelectedReason("wrong_link")}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedReason === "wrong_link"
                  ? "border-sky-500 bg-sky-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedReason === "wrong_link"
                      ? "border-sky-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedReason === "wrong_link" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  )}
                </div>
                <span
                  className={`font-medium ${selectedReason === "wrong_link" ? "text-sky-700" : "text-gray-700"}`}
                >
                  당첨자 링크가 아니에요
                </span>
              </div>
            </button>

            <button
              onClick={() => setSelectedReason("prank")}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedReason === "prank"
                  ? "border-sky-500 bg-sky-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedReason === "prank"
                      ? "border-sky-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedReason === "prank" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  )}
                </div>
                <span
                  className={`font-medium ${selectedReason === "prank" ? "text-sky-700" : "text-gray-700"}`}
                >
                  장난으로 등록했어요
                </span>
              </div>
            </button>
          </div>

          {/* 버튼 */}
          <div className="p-4 flex gap-3">
            <button
              onClick={() => {
                setShowCorrectionRequest(false);
                setSelectedReason(null);
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className={`flex-1 py-3 font-medium rounded-xl transition-colors ${
                selectedReason
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 이벤트 상세 모달
  const EventDetailModal = () => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const event = showEventDetail;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setShowEventDetail(null)} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="flex-1 text-base font-medium text-gray-900 truncate">
            {event.title}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-1"
            >
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
            {/* 더보기 메뉴 */}
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
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
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  내응모함 저장
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
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
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  차단
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  신고
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => showMoreMenu && setShowMoreMenu(false)}
        >
          <div className="p-4">
            {/* 태그들 */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeBadge(event.type)}`}
              >
                {event.type}
              </span>
              {event.hot && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
                  🔥 HOT
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-600">
                진행중
              </span>
            </div>

            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🦎</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    저렴가를찾는용가리
                  </p>
                  <p className="text-xs text-gray-500">1시간 전 · 팔로워 192</p>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-sky-500 text-sky-500 text-sm font-medium rounded-full hover:bg-sky-50 transition-colors">
                팔로우
              </button>
            </div>

            {/* 당첨자 발표 등록 안내 */}
            {!winnerAnnouncement.isRegistered ? (
              // 미발표 상태
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sky-700 font-medium mb-1">
                      [미발표] 당첨자발표 등록하기
                    </p>
                    <p className="text-xs text-sky-600">
                      🔗 링크 등록시 20쌀 적립
                    </p>
                  </div>
                  <button
                    onClick={() => setShowWinnerRegister(true)}
                    className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    등록
                  </button>
                </div>
              </div>
            ) : (
              // 발표완료 상태
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <p className="text-sky-600 font-medium mb-3">
                  [발표완료] 당첨자발표 확인하기
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">등록회원:</span>
                    <span className="text-gray-900 font-medium">
                      {winnerAnnouncement.registeredBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">발표등록일:</span>
                    <span className="text-gray-900">
                      {winnerAnnouncement.registeredDate}
                    </span>
                    <button
                      onClick={() => setShowCorrectionRequest(true)}
                      className="text-sky-500 text-xs border border-sky-300 px-2 py-0.5 rounded hover:bg-sky-50"
                    >
                      정정신청
                    </button>
                  </div>
                </div>
                {/* 도움메모 표시 */}
                {winnerAnnouncement.memo && (
                  <p className="mt-3 text-sky-500 text-sm">
                    {winnerAnnouncement.memo}
                  </p>
                )}
              </div>
            )}

            {/* 이벤트 정보 테이블 */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500 w-28">
                      주최사
                    </td>
                    <td className="px-4 py-3 text-gray-900 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {event.host}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      응모기간
                    </td>
                    <td className="px-4 py-3 text-gray-900">{event.period}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      응모형태
                    </td>
                    <td className="px-4 py-3 text-gray-900">{event.type}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      당첨자 발표일
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      2026.01.23
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      총 당첨자수
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {event.winners}명
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">경품</td>
                    <td className="px-4 py-3">
                      <span className="text-sky-600 font-medium">
                        {event.prize}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 좋아요/댓글/공유 */}
            <div className="flex items-center gap-4 py-3 mb-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isLiked ? "currentColor" : "none"}
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
                <span className="text-sm">
                  {event.likes + (isLiked ? 1 : 0)}
                </span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
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
                <span className="text-sm">6</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
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

            {/* 본문 글 */}
            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="text-gray-900 leading-relaxed">
                2월 카드 이벤트로 최대 80 만원 병오년 용돈 받아요.
              </p>
            </div>

            {/* 이벤트 이미지 */}
            <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-b from-sky-400 to-sky-600">
              <div className="p-4 text-center text-white">
                <div className="bg-white/20 rounded-lg p-2 mb-3 inline-block">
                  <span className="text-xs font-medium">🏢 {event.host}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">
                  신년맞이 단어뽑기 이벤트
                </h4>
                <div className="bg-white/10 rounded-lg p-3 text-left text-sm space-y-2">
                  <p className="font-medium">참여방법</p>
                  <p>1. {event.host} 인스타그램 계정 팔로우</p>
                  <p>2. 이벤트 영상 속 키워드를 뽑아서 캡쳐</p>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-t from-purple-500/50 to-transparent flex items-end justify-center pb-4">
                <div className="flex gap-2">
                  {["🎁", "🎉", "✨"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => window.open("#", "_blank")}
            className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors text-lg"
          >
            이벤트 바로가기
          </button>
        </div>
      </div>
    );
  };

  // 포인트 상세 모달
  const PointDetailModal = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const source = showPointDetail;

    // 작성자 정보 (더미 데이터)
    const author = {
      name: "앱테크마스터",
      avatar: "🔥",
      followers: 324,
      timeAgo: "2시간 전",
      posts: [
        { id: 1, title: "토스 만보기 매일 300원 벌기", reward: "일 최대 300P" },
        { id: 2, title: "캐시워크 출석체크 꿀팁", reward: "일 최대 100P" },
        { id: 3, title: "리브메이트 퀴즈 정답 모음", reward: "일 최대 50P" },
      ],
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => setShowPointDetail(null)} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="flex-1 text-base font-medium text-gray-900">
            {source.title}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-1"
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
            {/* 더보기 메뉴 */}
            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
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
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  차단
                </button>
                <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  신고
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => showMoreMenu && setShowMoreMenu(false)}
        >
          <div className="p-4">
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">{author.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{author.name}</p>
                  <p className="text-xs text-gray-500">
                    {author.timeAgo} · 팔로워 {author.followers}
                  </p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-amber-400 text-white text-sm font-medium rounded-full hover:bg-amber-500 transition-colors">
                팔로우
              </button>
            </div>

            {/* 좋아요/댓글/공유 */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isLiked ? "currentColor" : "none"}
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
                <span className="text-sm">{23 + (isLiked ? 1 : 0)}</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
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
                <span className="text-sm">8</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
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

            {/* 본문 내용 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <p className="text-gray-900 leading-relaxed">
                {source.desc ||
                  "2월 카드 이벤트로 최대 80 만원 병오년 용돈 받아요."}
              </p>
            </div>

            {/* 작성자의 다른 글 */}
            <div>
              <h4 className="mb-3">
                <span className="font-bold text-gray-900">{author.name}</span>
                <span className="text-gray-400 text-sm ml-1">님의 다른 글</span>
              </h4>
              <div className="space-y-2">
                {author.posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {post.title}
                      </p>
                      <p className="text-xs text-amber-600 mt-0.5">
                        {post.reward}
                      </p>
                    </div>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="p-4 bg-white border-t border-gray-100">
          <button className="w-full py-4 bg-amber-400 text-white font-bold rounded-xl hover:bg-amber-500 transition-colors text-lg">
            참여하기
          </button>
        </div>
      </div>
    );
  };

  // 상품 상세 모달 (장터) - 번개장터 스타일
  const ProductDetailModal = () => {
    const canBuy = userStats.ssalmukCash >= showProductDetail.price;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setShowProductDetail(null)}
            className="p-1 hover:bg-gray-100 rounded-full"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">상품 상세</h3>
          <button className="p-1 hover:bg-gray-100 rounded-full">
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 상품 이미지 */}
          <div className="w-full h-64 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <span className="text-8xl">🎁</span>
          </div>

          <div className="p-4">
            {/* 브랜드 & 상태 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-full font-medium">
                {showProductDetail.brand}
              </span>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                D-{showProductDetail.dday}
              </span>
            </div>

            {/* 상품명 */}
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {showProductDetail.name}
            </h2>

            {/* 가격 */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                {showProductDetail.price.toLocaleString()}
              </span>
              <span className="text-lg text-gray-900">원</span>
              <span className="text-sm text-gray-400 line-through ml-2">
                {showProductDetail.originalPrice.toLocaleString()}원
              </span>
              <span className="text-sm text-red-500 font-bold">
                {showProductDetail.discount}%
              </span>
            </div>

            {/* 판매자 정보 */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {showProductDetail.seller}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>⭐ {showProductDetail.rating}</span>
                      <span>·</span>
                      <span>거래 {showProductDetail.trades}회</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setChatPartner(showProductDetail.seller);
                    setShowChat(true);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 font-medium"
                >
                  문의하기
                </button>
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="border-t border-gray-100 pt-4 mb-4">
              <h3 className="font-bold text-gray-900 mb-3">상품 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">상품 유형</span>
                  <span className="font-medium text-gray-900">기프티콘</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">유효기간</span>
                  <span className="font-medium text-gray-900">
                    {showProductDetail.validUntil ||
                      `D-${showProductDetail.dday}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">정가</span>
                  <span className="font-medium text-gray-900">
                    {showProductDetail.originalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            {/* 안전거래 안내 */}
            <div className="bg-sky-50 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔒</span>
                </div>
                <div>
                  <p className="font-bold text-sky-700 mb-1">
                    에스크로 안전결제
                  </p>
                  <p className="text-sm text-sky-600">
                    결제 금액은 구매확정 전까지 안전하게 보관됩니다. 쿠폰 확인
                    후 구매확정 시 판매자에게 정산돼요.
                  </p>
                </div>
              </div>
            </div>

            {/* 거래 방법 */}
            <div className="border-t border-gray-100 pt-4 mb-6">
              <h3 className="font-bold text-gray-900 mb-3">거래 방법</h3>
              <div className="flex gap-3">
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm">1</span>
                  </div>
                  <p className="text-xs text-gray-600">결제하기</p>
                </div>
                <div className="flex items-center">→</div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm">2</span>
                  </div>
                  <p className="text-xs text-gray-600">쿠폰 수령</p>
                </div>
                <div className="flex items-center">→</div>
                <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm">3</span>
                  </div>
                  <p className="text-xs text-gray-600">구매확정</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 고정 버튼 */}
        <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0">
          {/* 판매완료 상품인 경우 */}
          {showProductDetail.status === "sold" ? (
            <div className="flex gap-3">
              <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button
                disabled
                className="flex-1 py-4 font-bold rounded-xl text-lg bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                판매완료
              </button>
            </div>
          ) : (
            <>
              {/* 내 캐시 잔액 */}
              <div
                className={`rounded-xl p-3 mb-3 ${canBuy ? "bg-emerald-50" : "bg-red-50"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <div>
                      <p
                        className={`text-xs ${canBuy ? "text-emerald-600" : "text-red-600"}`}
                      >
                        내 쌀먹캐시
                      </p>
                      <p
                        className={`font-bold ${canBuy ? "text-emerald-700" : "text-red-700"}`}
                      >
                        {userStats.ssalmukCash.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  {!canBuy && (
                    <button
                      onClick={() => {
                        setShowProductDetail(null);
                        setChargeStep(1);
                        setChargeAmount(
                          showProductDetail.price - userStats.ssalmukCash,
                        );
                        setShowChargeModal(true);
                      }}
                      className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg"
                    >
                      {(
                        showProductDetail.price - userStats.ssalmukCash
                      ).toLocaleString()}
                      원 충전
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="w-14 h-14 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button
                  disabled={!canBuy}
                  onClick={() => {
                    if (canBuy) {
                      setSelectedProduct(showProductDetail);
                      setShowProductDetail(null);
                      setPurchaseStep(1);
                      setShowPurchaseFlow(true);
                    }
                  }}
                  className={`flex-1 py-4 font-bold rounded-xl text-lg transition-colors ${
                    canBuy
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canBuy ? "구매하기" : "잔액 부족"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // 설문 진행 화면
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

  return (
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
        {/* 왼쪽 - 메뉴 + 로고 */}
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
          <h1 className="text-xl font-bold text-gray-900">생활쌀먹</h1>
        </div>

        {/* 오른쪽 - 검색, 알림 */}
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
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
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
                if (tab.key === "community") {
                  setCurrentPage("DailyCommunity");
                } else {
                  setMainTab(tab.key);
                }
              }}
              className={`flex-1 py-3 text-center transition-colors relative ${mainTab === tab.key ? "text-sky-600 font-medium" : "text-gray-500"}`}
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

      {/* 이벤트 탭 */}
      {mainTab === "event" && (
        <>
          <div className="bg-white px-4 py-3">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {["최신", "인기", "오늘마감", "발표완료", "내응모함"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      if (tab === "내응모함") {
                        setShowMyEntries(true);
                      } else {
                        setSubTab(tab);
                      }
                    }}
                    className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all border rounded ${
                      subTab === tab
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl p-4 text-white mb-4">
              <p className="text-xs opacity-80 mb-1">🔥 오늘의 핫딜</p>
              <p className="font-bold text-lg">스타벅스 당첨 이벤트</p>
              <p className="text-sm opacity-90">지금 바로 응모하세요!</p>
            </div>
          </div>

          {/* 필터 바 */}
          <div className="bg-white px-4 py-2 border-y border-gray-100 flex items-center justify-between">
            {/* 오늘등록 */}
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-700">오늘등록</span>
              <span className="text-sm text-sky-500 font-medium">
                ({events.length}건)
              </span>
            </div>

            {/* 필터 버튼 */}
            <button
              onClick={() => setShowEventFilter(true)}
              className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${
                eventFilters.prizeTypes.length +
                  eventFilters.entryTypes.length +
                  eventFilters.platforms.length >
                0
                  ? "bg-sky-100 text-sky-600"
                  : "bg-gray-100 text-gray-600"
              }`}
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {eventFilters.prizeTypes.length +
                eventFilters.entryTypes.length +
                eventFilters.platforms.length >
                0 && (
                <span className="text-xs font-bold">
                  {eventFilters.prizeTypes.length +
                    eventFilters.entryTypes.length +
                    eventFilters.platforms.length}
                </span>
              )}
            </button>
          </div>

          {/* 활성 필터 태그 */}
          {eventFilters.prizeTypes.length +
            eventFilters.entryTypes.length +
            eventFilters.platforms.length >
            0 && (
            <div className="bg-gray-50 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {eventFilters.prizeTypes.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-2 py-1 bg-sky-100 text-sky-700 rounded-full text-xs whitespace-nowrap"
                >
                  {f}
                  <button
                    onClick={() =>
                      setEventFilters((prev) => ({
                        ...prev,
                        prizeTypes: prev.prizeTypes.filter((v) => v !== f),
                      }))
                    }
                  >
                    <svg
                      className="w-3 h-3"
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
                </span>
              ))}
              {eventFilters.entryTypes.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs whitespace-nowrap"
                >
                  {f}
                  <button
                    onClick={() =>
                      setEventFilters((prev) => ({
                        ...prev,
                        entryTypes: prev.entryTypes.filter((v) => v !== f),
                      }))
                    }
                  >
                    <svg
                      className="w-3 h-3"
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
                </span>
              ))}
              {eventFilters.platforms.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs whitespace-nowrap"
                >
                  {f}
                  <button
                    onClick={() =>
                      setEventFilters((prev) => ({
                        ...prev,
                        platforms: prev.platforms.filter((v) => v !== f),
                      }))
                    }
                  >
                    <svg
                      className="w-3 h-3"
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
                </span>
              ))}
              <button
                onClick={() =>
                  setEventFilters({
                    prizeTypes: [],
                    entryTypes: [],
                    platforms: [],
                  })
                }
                className="px-2 py-1 text-gray-500 text-xs whitespace-nowrap"
              >
                전체 해제
              </button>
            </div>
          )}

          <div className="px-4 pb-24 pt-3 space-y-3">
            {eventViewType === "card" ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              /* 목록형 뷰 */
              <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setShowEventDetail(event)}
                    className="p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${getTypeBadge(event.type)}`}
                      >
                        {event.type}
                      </span>
                      {event.hot && (
                        <span className="text-[10px] text-red-500">🔥 HOT</span>
                      )}
                      {event.dday === 0 && (
                        <span className="text-[10px] text-red-500 font-medium">
                          오늘마감
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">🎁 {event.prize}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>❤️ {event.likes}</span>
                        <span>마감 {event.period.split(" ~ ")[1]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* 포인트 탭 */}
      {mainTab === "point" && (
        <>
          <div className="px-4 py-4">
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-5 text-white mb-4">
              <p className="text-sm opacity-80">오늘 적립 가능한 포인트</p>
              <p className="text-3xl font-bold mt-1">최대 1,500P</p>
              <p className="text-sm opacity-80 mt-2">
                매일 참여하고 포인트 모으세요!
              </p>
            </div>
          </div>
          <div className="bg-white px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {["전체", "앱테크", "광고", "출석", "미션", "게임"].map(
                (tab, i) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${i === 0 ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="px-4 pb-24 pt-3 space-y-3">
            {pointSources.map((source) => (
              <PointCard key={source.id} source={source} />
            ))}
          </div>
        </>
      )}

      {/* 설문조사 탭 */}
      {mainTab === "survey" && (
        <>
          {/* 상위 메뉴: 퀵설문 / 일반설문 */}
          <div className="bg-white px-4 pt-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex">
                <button
                  onClick={() => setSurveyMainTab("quick")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                    surveyMainTab === "quick"
                      ? "text-amber-600 border-amber-500"
                      : "text-gray-400 border-transparent"
                  }`}
                >
                  퀵설문
                </button>
                <button
                  onClick={() => setSurveyMainTab("general")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                    surveyMainTab === "general"
                      ? "text-amber-600 border-amber-500"
                      : "text-gray-400 border-transparent"
                  }`}
                >
                  일반설문
                </button>
              </div>
              <span className="text-xs text-gray-400">
                간단 참여로 포인트 적립
              </span>
            </div>
          </div>

          {/* 퀵설문 탭 */}
          {surveyMainTab === "quick" && (
            <>
              {/* 하위 필터: 전체, 참여가능, 참여완료 */}
              <div className="bg-white px-4 py-3">
                <div className="flex gap-2">
                  {[
                    { key: "all", label: "전체" },
                    { key: "available", label: "참여가능" },
                    { key: "completed", label: "참여완료" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setQuickPollFilter(tab.key)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        quickPollFilter === tab.key
                          ? "bg-rose-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 퀵설문 리스트 */}
              <div className="px-4 pt-4 pb-24 space-y-4 bg-gray-50">
                {quickPolls
                  .filter((poll) => {
                    if (quickPollFilter === "available")
                      return !poll.participated;
                    if (quickPollFilter === "completed")
                      return poll.participated;
                    return true;
                  })
                  .map((poll) => (
                    <QuickPollCard key={poll.id} poll={poll} />
                  ))}
              </div>
            </>
          )}

          {/* 일반설문 탭 */}
          {surveyMainTab === "general" && (
            <div className="px-4 pb-24 pt-4 space-y-3">
              {surveys.map((survey) => (
                <SurveyCard key={survey.id} survey={survey} />
              ))}
            </div>
          )}
        </>
      )}

      {/* 장터 탭 */}
      {mainTab === "market" && (
        <>
          <div className="bg-white px-4 py-3">
            <div className="flex gap-2">
              {[
                { key: "selling", label: "판매중" },
                { key: "sold", label: "판매완료" },
                { key: "myCoupon", label: "내쿠폰함" },
                { key: "myCash", label: "내캐쉬" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    if (tab.key === "myCash") setShowMyCash(true);
                    else if (tab.key === "myCoupon") setShowMyCoupon(true);
                    else setMarketTab(tab.key);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tab.key === "myCash" || tab.key === "myCoupon"
                      ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                      : marketTab === tab.key
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl p-4 text-white mb-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs opacity-80 mb-1">🔒 안전거래</p>
                  <p className="font-bold">에스크로 결제로 안전하게!</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setChargeStep(1);
                      setChargeAmount(0);
                      setShowChargeModal(true);
                    }}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    충전
                  </button>
                  <button
                    onClick={() => {
                      setWithdrawStep(1);
                      setWithdrawAmount(0);
                      setShowWithdrawModal(true);
                    }}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    출금
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <span className="text-sm opacity-80">내 쌀먹캐시</span>
                <span className="text-lg font-bold ml-2">
                  {userStats.ssalmukCash.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 판매중 탭 */}
          {marketTab === "selling" && (
            <div className="px-4 pb-24 space-y-3">
              {marketItems
                .filter((item) => item.status === "available")
                .map((item) => (
                  <MarketCard key={item.id} item={item} />
                ))}
            </div>
          )}

          {/* 판매완료 탭 */}
          {marketTab === "sold" && (
            <div className="px-4 pb-24 space-y-3">
              {marketItems.filter((item) => item.status === "sold").length >
              0 ? (
                marketItems
                  .filter((item) => item.status === "sold")
                  .map((item) => <MarketCard key={item.id} item={item} />)
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <p className="text-gray-500">
                    판매완료된 기프티콘이 없습니다
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* 커뮤니티 탭 */}
      {mainTab === "community" && (
        <>
          <div className="bg-white px-4 py-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {["전체", "꿀팁", "후기", "질문", "정보", "잡담"].map(
                (tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setCommunityTab(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${communityTab === tab || (i === 0 && communityTab === "all") ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl p-4 text-white mb-3">
              <p className="text-xs opacity-80 mb-1">🔥 인기 글</p>
              <p className="font-bold">이번 주 마감 이벤트 총정리!</p>
              <p className="text-sm opacity-90">by 정보통 · 좋아요 1,523</p>
            </div>
          </div>
          <div className="px-4 pb-24 space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}

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

      {/* 모달들 */}
      {showMyCoupon && <MyCouponModal />}
      {showMyCash && <MyCashModal />}
      {showChargeModal && <ChargeModal />}
      {showWithdrawModal && <WithdrawModal />}
      {showBankChange && <BankChangeModal />}
      {showCashHistory && <CashHistoryModal />}
      {showEventDetail && <EventDetailModal />}
      {showWinnerRegister && <WinnerRegisterModal />}
      {showCorrectionRequest && <CorrectionRequestModal />}
      {showPointDetail && <PointDetailModal />}
      {showProductDetail && <ProductDetailModal />}
      {showPurchaseFlow && <PurchaseFlowModal />}
      {showSellFlow && <SellFlowModal />}
      {showMyTrade && <MyTradeModal />}
      {showWriteModal && <WriteModal />}
      {showSearchModal && <SearchModal />}
      {showNotification && <NotificationModal />}
      {showMyPage && <MyPageModal />}
      {showMyEntries && <MyEntriesModal />}
      {showEventFilter && <EventFilterModal />}
      {showChat && <ChatModal />}
      {showDisputeModal && <DisputeModal />}
      {showTransactionDetail && <TransactionDetailModal />}
    </div>
  );
}
