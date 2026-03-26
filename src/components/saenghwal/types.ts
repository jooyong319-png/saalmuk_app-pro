// @ts-nocheck

export interface UserStats {
  ssalmukCash: number;
  escrowCash: number;
  purchaseDeposit: number;
  coupons: number;
  level: number;
  levelName: string;
  exp: number;
  streak: number;
  totalSurveys: number;
  bankName: string;
  bankAccount: string;
}

export interface Event {
  id: number;
  type: string;
  hot: boolean;
  status: string;
  title: string;
  prize: string;
  winners: number;
  period: string;
  dday: number;
  host: string;
  platform: string;
  likes: number;
  comments: number;
}

// ✅ 새 필드 추가 (optional로 기존 호환 유지)
export interface PointSource {
  id: number;
  category: string;
  title: string;
  desc: string;
  reward: string;
  icon: string;
  hot: boolean;
  // 새 필드
  likes?: number;
  comments?: number;
  views?: number;
  status?: string;
  createdAt?: string;
}

export interface Survey {
  id: number;
  type: string;
  title: string;
  description: string;
  reward: number;
  duration: string;
  participants: number;
  maxParticipants: number;
  deadline: string;
  tags: string[];
  isHot: boolean;
  isPremium?: boolean;
  questions: any[];
}

export interface QuickPoll {
  id: number;
  question: string;
  tags: string[];
  options: { text: string; votes: number; percent?: number }[];
  reward: number;
  participated: boolean;
  participants: number;
  comments: number;
  likes: number;
}

export interface MarketItem {
  id: number;
  brand: string;
  dday: number;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
  seller: string;
  rating: number;
  trades: number;
  status: string;
  barcode: string;
  validUntil: string;
  soldDate?: string;
  createdAt?: string;
  image?: string;
  category?: string;
}

export interface Post {
  id: number;
  category: string;
  title: string;
  author: string;
  time: string;
  likes: number;
  comments: number;
  hot: boolean;
}

export interface Coupon {
  id: number;
  brand: string;
  brandLogo: string;
  name: string;
  barcode: string;
  validFrom: string;
  validUntil: string;
  dday: number;
  status: string;
  tradeStatus: string;
  source: string;
  purchaseDate: string;
  usedDate: string | null;
  price: number;
  seller?: string | null;
  buyer?: string | null;
}

export interface CashHistory {
  id: number;
  type: string;
  title: string;
  amount: number;
  date: string;
  status: string;
}

export interface MyTrade {
  id: number;
  brand: string;
  name: string;
  price: number;
  status: string;
  date: string;
  barcode?: string | null;
  seller?: string;
  buyer?: string | null;
  settledAmount?: number;
}

// 모달/탭에 공통으로 내려주는 context 타입
export interface SaenghwalCtx {
  // 유저 데이터
  userStats: UserStats;
  setUserStats: (fn: any) => void;
  myCoupons: Coupon[];
  setMyCoupons: (fn: any) => void;
  myTrades: { buying: MyTrade[]; selling: MyTrade[] };
  setMyTrades: (fn: any) => void;
  cashHistory: CashHistory[];

  // 탭 상태
  mainTab: string;
  setMainTab: (v: string) => void;
  subTab: string;
  setSubTab: (v: string) => void;
  surveyMainTab: string;
  setSurveyMainTab: (v: string) => void;
  surveyTab: string;
  setSurveyTab: (v: string) => void;
  marketTab: string;
  setMarketTab: (v: string) => void;
  communityTab: string;
  setCommunityTab: (v: string) => void;
  quickPollFilter: string;
  setQuickPollFilter: (v: string) => void;

  // 이벤트 필터
  eventSort: string;
  setEventSort: (v: string) => void;
  eventViewType: string;
  setEventViewType: (v: string) => void;
  eventFilters: { prizeTypes: string[]; entryTypes: string[]; platforms: string[] };
  setEventFilters: (fn: any) => void;

  // 모달 show 상태
  showMyCoupon: boolean;
  setShowMyCoupon: (v: boolean) => void;
  showMyCash: boolean;
  setShowMyCash: (v: boolean) => void;
  showChargeModal: boolean;
  setShowChargeModal: (v: boolean) => void;
  chargeStep: number;
  setChargeStep: (v: number) => void;
  chargeAmount: number;
  setChargeAmount: (v: number) => void;
  showWithdrawModal: boolean;
  setShowWithdrawModal: (v: boolean) => void;
  withdrawStep: number;
  setWithdrawStep: (v: number) => void;
  withdrawAmount: number;
  setWithdrawAmount: (v: number) => void;
  showBankChange: boolean;
  setShowBankChange: (v: boolean) => void;
  showCashHistory: boolean;
  setShowCashHistory: (v: boolean) => void;
  showEventDetail: Event | null;
  setShowEventDetail: (v: Event | null) => void;
  showWinnerRegister: boolean;
  setShowWinnerRegister: (v: boolean) => void;
  showCorrectionRequest: boolean;
  setShowCorrectionRequest: (v: boolean) => void;
  winnerAnnouncement: any;
  setWinnerAnnouncement: (fn: any) => void;
  showProductDetail: MarketItem | null;
  setShowProductDetail: (v: MarketItem | null) => void;
  showPurchaseFlow: boolean;
  setShowPurchaseFlow: (v: boolean) => void;
  purchaseStep: number;
  setPurchaseStep: (v: number) => void;
  selectedProduct: MarketItem | null;
  setSelectedProduct: (v: MarketItem | null) => void;
  isSeller: boolean;
  setIsSeller: (v: boolean) => void;
  showSellFlow: boolean;
  setShowSellFlow: (v: boolean) => void;
  sellStep: number;
  setSellStep: (v: number) => void;
  showMyTrade: boolean;
  setShowMyTrade: (v: boolean) => void;
  myTradeTab: string;
  setMyTradeTab: (v: string) => void;
  showChat: boolean;
  setShowChat: (v: boolean) => void;
  chatMessages: any[];
  setChatMessages: (fn: any) => void;
  chatInput: string;
  setChatInput: (v: string) => void;
  chatPartner: string;
  setChatPartner: (v: string) => void;
  showDisputeModal: boolean;
  setShowDisputeModal: (v: boolean) => void;
  disputeReason: string;
  setDisputeReason: (v: string) => void;
  disputeEtcText: string;
  setDisputeEtcText: (v: string) => void;
  showTransactionDetail: boolean;
  setShowTransactionDetail: (v: boolean) => void;
  transactionStatus: string;
  setTransactionStatus: (v: string) => void;
  showDisputeToast: boolean;
  setShowDisputeToast: (v: boolean) => void;
  showWriteModal: boolean;
  setShowWriteModal: (v: boolean) => void;
  writeStep: number;
  setWriteStep: (v: number) => void;
  showMyPage: boolean;
  setShowMyPage: (v: boolean) => void;
  showSearchModal: boolean;
  setShowSearchModal: (v: boolean) => void;
  showNotification: boolean;
  setShowNotification: (v: boolean) => void;
  couponTab: string;
  setCouponTab: (v: string) => void;
  couponSort: string;
  setCouponSort: (v: string) => void;
  selectedCoupon: Coupon | null;
  setSelectedCoupon: (v: Coupon | null) => void;
  showMyEntries: boolean;
  setShowMyEntries: (v: boolean) => void;
  entryTab: string;
  setEntryTab: (v: string) => void;
  entrySort: string;
  setEntrySort: (v: string) => void;
  showEventFilter: boolean;
  setShowEventFilter: (v: boolean) => void;
  showPointDetail: PointSource | null;
  setShowPointDetail: (v: PointSource | null) => void;
  selectedSurvey: Survey | null;
  setSelectedSurvey: (v: Survey | null) => void;
  currentQuestion: number;
  setCurrentQuestion: (v: number) => void;
  quickPollVoted: boolean;
  setQuickPollVoted: (v: boolean) => void;

  // 내비게이션
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  initialShowMyCoupon: boolean;
  initialEventId?: number | null;
  isLoggedIn: boolean;
  onLogout?: () => void;
  onShowLogin?: () => void;

  // 공통 데이터
  marketItems: MarketItem[];
  events: Event[];
  pointSources: PointSource[];
  setPointSources: (fn: (prev: PointSource[]) => PointSource[]) => void; // ✅ 추가
  surveys: Survey[];
  quickPolls: QuickPoll[];
  posts: Post[];

  // 유틸 함수
  getStatusBadge: (status: string, dday: number) => { text: string; color: string };
  getTypeBadge: (type: string) => string;
  handleVote: (pollId: number, optionIndex: number) => void;
}