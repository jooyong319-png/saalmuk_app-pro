// @ts-nocheck
import type { Event, PointSource, Survey, QuickPoll, MarketItem, Post, Coupon, CashHistory, UserStats } from "./types";

export const initialUserStats: UserStats = {
  ssalmukCash: 29400,
  escrowCash: 5500,
  purchaseDeposit: 10000,
  coupons: 5,
  level: 3,
  levelName: "알찬벼",
  exp: 65,
  streak: 7,
  totalSurveys: 23,
  bankName: "카카오뱅크",
  bankAccount: "3333-01-******",
};

export const initialCashHistory: CashHistory[] = [
  { id: 1, type: "+", title: "설문조사 완료", amount: 500, date: "오늘 14:23", status: "완료" },
  { id: 2, type: "+", title: "퀵폴 참여", amount: 30, date: "오늘 12:05", status: "완료" },
  { id: 3, type: "-", title: "기프티콘 구매", amount: 3650, date: "어제", status: "거래완료" },
  { id: 4, type: "+", title: "판매 정산", amount: 4462, date: "01.28", status: "정산완료" },
  { id: 5, type: "+", title: "캐시 충전", amount: 10000, date: "01.27", status: "충전완료" },
  { id: 6, type: "-", title: "스타벅스 아메리카노 구매", amount: 3200, date: "01.25", status: "거래완료" },
  { id: 7, type: "+", title: "이벤트 당첨", amount: 1000, date: "01.24", status: "완료" },
  { id: 8, type: "-", title: "출금", amount: 5000, date: "01.23", status: "출금완료" },
  { id: 9, type: "+", title: "설문조사 완료", amount: 800, date: "01.22", status: "완료" },
  { id: 10, type: "+", title: "친구 초대 보상", amount: 2000, date: "01.20", status: "완료" },
];

export const events: Event[] = [
  { id: 1, type: "퀴즈", hot: true, status: "progress", title: "[CU편의점] 12월 행운퀴즈 이벤트", prize: "CU 5천원권", winners: 100, period: "01-10 ~ 01-15", dday: 3, host: "CU편의점", platform: "홈페이지", likes: 156, views: 2024, comments: 89 },
  { id: 2, type: "댓글", hot: true, status: "progress", title: "[스타벅스] 겨울 신메뉴 출시 기념", prize: "아메리카노 T", winners: 50, period: "01-10 ~ 01-15", dday: 1, host: "스타벅스", platform: "인스타그램", likes: 234, views: 609, comments: 123 },
  { id: 3, type: "퀴즈", hot: true, status: "today", title: "[맥도날드] 빅맥 50주년 퀴즈", prize: "빅맥세트", winners: 500, period: "01-10 ~ 01-15", dday: 0, host: "맥도날드", platform: "APP전용", likes: 847, views: 4706, comments: 234 },
  { id: 4, type: "인증샷", hot: false, status: "announce", title: "[GS25] 와인 페스티벌 이벤트", prize: "GS25 1만원권", winners: 200, period: "01-05 ~ 01-10", dday: -2, host: "GS25", platform: "홈페이지", likes: 89, views: 4212, comments: 45 },
  { id: 5, type: "팔로우", hot: false, status: "ended", title: "[올리브영] 신년맞이 럭키드로우", prize: "올리브영 3만원권", winners: 100, period: "01-01 ~ 01-07", dday: -5, host: "올리브영", platform: "인스타그램", likes: 67, views: 3857, comments: 34 },
];

export const pointSources: PointSource[] = [
  { id: 1, category: "앱테크", title: "[토스] 만보기 출석체크", desc: "매일 걸으면서 포인트 적립! 하루 10분이면 100P", reward: "포인트", icon: "🚶", hot: true, likes: 234, comments: 45, views: 1892, status: "", createdAt: "2시간 전" },
  { id: 2, category: "광고", title: "[캐시워크] 광고 시청 이벤트", desc: "광고 보고 최대 500P 받기", reward: "포인트", icon: "📺", hot: true, likes: 187, comments: 32, views: 1456, status: "", createdAt: "3시간 전" },
  { id: 3, category: "설문", title: "[리서치패널] 설문조사 참여", desc: "10분 설문으로 800P 적립", reward: "포인트", icon: "📝", hot: false, likes: 89, comments: 12, views: 892, status: "", createdAt: "5시간 전" },
  { id: 4, category: "출석", title: "[쌀먹] 7일 연속 출석체크", desc: "매일 출석하면 보너스 2배!", reward: "쿠폰", icon: "📅", hot: true, likes: 456, comments: 78, views: 3421, status: "", createdAt: "6시간 전" },
  { id: 5, category: "미션", title: "[네이버페이] 앱 설치 미션", desc: "앱 설치 후 가입하면 500P 즉시 지급", reward: "포인트", icon: "📱", hot: false, likes: 123, comments: 23, views: 1123, status: "ended", createdAt: "1일 전" },
  { id: 6, category: "게임", title: "[플레이오] 게임 플레이 리워드", desc: "게임하면서 젬 적립, 현금으로 교환", reward: "기타", icon: "🎮", hot: true, likes: 567, comments: 89, views: 4521, status: "", createdAt: "2일 전" },
];

export const surveys: Survey[] = [
  {
    id: 1, type: "game", title: "2026년 기대되는 모바일 게임 조사", description: "신규 출시 예정 게임에 대한 의견을 들려주세요",
    reward: 500, duration: "5분", participants: 234, maxParticipants: 500, deadline: "오늘 23:59", tags: ["모바일게임", "신작"], isHot: true,
    questions: [
      { type: "single", question: "주로 플레이하는 게임 장르는?", options: ["RPG", "전략", "액션", "퍼즐", "시뮬레이션"] },
      { type: "multi", question: "게임 선택 시 중요하게 생각하는 요소는? (복수선택)", options: ["그래픽", "스토리", "커뮤니티", "PvP", "캐릭터"] },
      { type: "scale", question: "인게임 광고에 대한 거부감은?", min: 1, max: 5 },
    ],
  },
  { id: 2, type: "brand", title: "게이밍 기어 브랜드 인지도 조사", description: "로지텍 X 쌀먹닷컴 제휴 설문", reward: 800, duration: "8분", participants: 89, maxParticipants: 200, deadline: "3일 후", tags: ["제휴설문", "게이밍기어"], isHot: false, questions: [] },
  { id: 3, type: "quick", title: "[퀵] P2E 게임 인식 조사", description: "간단한 5문항 설문", reward: 150, duration: "2분", participants: 412, maxParticipants: 1000, deadline: "오늘 23:59", tags: ["P2E", "퀵설문"], isHot: false, questions: [] },
  { id: 4, type: "beta", title: "🎮 신작 RPG 클로즈베타 테스터 모집", description: "2주간 베타테스트 참여 후 상세 리뷰 작성", reward: 5000, duration: "2주", participants: 45, maxParticipants: 100, deadline: "1월 31일", tags: ["베타테스트", "RPG", "프리미엄"], isHot: true, isPremium: true, questions: [] },
];

export const quickPolls: QuickPoll[] = [
  {
    id: 1, question: "귀하에서는 다음 중 어디에 해당하시나요?", tags: ["#담배"],
    options: [
      { text: "비흡연자 & 1년 내 해외 여행 경험 없음", votes: 1625, percent: 54 },
      { text: "비흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입", votes: 391, percent: 13 },
      { text: "비흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입", votes: 541, percent: 18 },
      { text: "흡연자 & 1년 내 해외 여행 경험 없음", votes: 241, percent: 8 },
      { text: "흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 구입", votes: 150, percent: 5 },
      { text: "흡연자 & 1년 내 해외 여행시 공항면세점에서 면세 담배 비구입", votes: 90, percent: 3 },
    ],
    reward: 1, participated: true, participants: 29820, comments: 1, likes: 33,
  },
  {
    id: 2, question: "만일 쿠팡이 영업정지 처분 등의 이유로 이용할 수 없게 된다면, 신선/가공 식품을 주로 어디서 구매하시겠습니까?",
    tags: ["#쇼핑", "#식품구매"],
    options: [
      { text: "신선/가공식품은 쿠팡에서 구매하지 않았음", votes: 0 },
      { text: "이마트", votes: 0 }, { text: "롯데마트", votes: 0 },
      { text: "기타 대형마트(홈플러스, 코스트코 등)", votes: 0 },
      { text: "대형/일반 슈퍼마켓", votes: 0 }, { text: "재래시장", votes: 0 },
      { text: "네이버쇼핑", votes: 0 },
      { text: "종합 오픈마켓(G마켓 11번가 등)", votes: 0 },
      { text: "신선식품 전문몰(마켓컬리, 오아시스 등)", votes: 0 },
      { text: "다른 곳에서 구매하지 않음", votes: 0 },
    ],
    reward: 1, participated: false, participants: 32889, comments: 1, likes: 39,
  },
  {
    id: 3, question: "영화관 예매 시 주로 선택하는 좌석 위치는 어디인가요?",
    tags: ["#영화관", "#좌석"],
    options: [
      { text: "스크린에 가까운 앞쪽 좌석", votes: 0 }, { text: "가운데(중앙) 좌석", votes: 0 },
      { text: "뒤쪽(후면) 좌석", votes: 0 }, { text: "측면(사이드) 좌석", votes: 0 },
      { text: "통로(출입구 쪽) 좌석", votes: 0 }, { text: "좌석은 크게 신경쓰지 않음", votes: 0 },
    ],
    reward: 1, participated: false, participants: 45408, comments: 3, likes: 50,
  },
  {
    id: 4, question: "2026년 설 연휴 KTX 예매 시, 가장 우선 고려할(한) 좌석 유형은 무엇인가요?",
    tags: ["#KTX", "#설연휴"],
    options: [
      { text: "이번 설 연휴에 이용 계획 없음", votes: 0 }, { text: "일반실 창가", votes: 0 },
      { text: "일반실 통로", votes: 0 }, { text: "특실", votes: 0 },
      { text: "동반자와 붙는 좌석이 우선", votes: 0 }, { text: "기타", votes: 0 },
    ],
    reward: 1, participated: false, participants: 46041, comments: 2, likes: 49,
  },
  {
    id: 5, question: "귀하께서는 향후 1년 이내에 침대 또는 매트리스를 교체(구매) 예정이신가요?",
    tags: ["#침대", "#트리스"],
    options: [
      { text: "침대 또는 매트리스 교체(구매) 예정이 없다.", votes: 2054, percent: 69 },
      { text: "침대 또는 매트리스 교체(구매) 예정이다.", votes: 922, percent: 31 },
    ],
    reward: 1, participated: true, participants: 2976, comments: 0, likes: 5,
  },
];

export const marketItems: MarketItem[] = [
  // 기프티콘 - 스타벅스
  { id: 1, brand: "스타벅스", dday: 30, name: "아메리카노 T", originalPrice: 4700, price: 3650, discount: 22, seller: "쌀먹고수", rating: 5, trades: 128, status: "available", barcode: "1234-5678-9012-3456", validUntil: "2025.03.15", createdAt: "1시간 전", image: "", category: "기프티콘" },
  // 기프티콘 - GS25 상품들 (실제 이미지 사용)
  { id: 2, brand: "GS25", dday: 28, name: "팔도 김치왕뚜껑(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "편의점마스터", rating: 5, trades: 89, status: "available", barcode: "1111-2222-3333-4444", validUntil: "2026.03.31", createdAt: "2시간 전", image: "https://atom.donutbook.co.kr:14405/goods/JDDS2UFQCPZFZLAV70ST.jpg", category: "기프티콘" },
  { id: 3, brand: "GS25", dday: 28, name: "팔도 왕뚜껑(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "라면러버", rating: 4.9, trades: 67, status: "available", barcode: "2222-3333-4444-5555", validUntil: "2026.03.31", createdAt: "3시간 전", image: "https://atom.donutbook.co.kr:14405/goods/IRXL2312H5B56SK7GVG7.jpg", category: "기프티콘" },
  { id: 4, brand: "GS25", dday: 28, name: "농심 튀김우동큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "우동좋아", rating: 5, trades: 45, status: "available", barcode: "3333-4444-5555-6666", validUntil: "2026.03.31", createdAt: "4시간 전", image: "https://atom.donutbook.co.kr:14405/goods/LV7AXF31FUS39FV8MSFZ.jpg", category: "기프티콘" },
  { id: 5, brand: "GS25", dday: 28, name: "농심 짜파게티큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "짜파구리", rating: 5, trades: 234, status: "available", barcode: "4444-5555-6666-7777", validUntil: "2026.03.31", createdAt: "5시간 전", image: "https://atom.donutbook.co.kr:14405/goods/Q8C8E0SK014JC6SSASSP.jpg", category: "기프티콘" },
  { id: 6, brand: "GS25", dday: 28, name: "농심 육개장큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "육개장팬", rating: 4.8, trades: 123, status: "available", barcode: "5555-6666-7777-8888", validUntil: "2026.03.31", createdAt: "6시간 전", image: "https://atom.donutbook.co.kr:14405/goods/AHPSEK4X0UYTC2ZDCJJP.jpg", category: "기프티콘" },
  { id: 7, brand: "GS25", dday: 28, name: "농심 신라면큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "신라면왕", rating: 5, trades: 567, status: "available", barcode: "6666-7777-8888-9999", validUntil: "2026.03.31", createdAt: "7시간 전", image: "https://atom.donutbook.co.kr:14405/goods/5PS517239OQ0C2H99TZI.jpg", category: "기프티콘" },
  { id: 8, brand: "GS25", dday: 28, name: "농심 새우탕큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "새우매니아", rating: 4.9, trades: 78, status: "available", barcode: "7777-8888-9999-0000", validUntil: "2026.03.31", createdAt: "8시간 전", image: "https://atom.donutbook.co.kr:14405/goods/O347TP1URJ16MI3FISWR.jpg", category: "기프티콘" },
  { id: 9, brand: "GS25", dday: 28, name: "농심 사리곰탕큰사발(대컵)", originalPrice: 2000, price: 1500, discount: 25, seller: "곰탕러버", rating: 5, trades: 56, status: "available", barcode: "8888-9999-0000-1111", validUntil: "2026.03.31", createdAt: "9시간 전", image: "https://atom.donutbook.co.kr:14405/goods/GAQD66O8O9WHW7Q8HGNF.jpg", category: "기프티콘" },
  { id: 10, brand: "GS25", dday: 28, name: "농심 새우깡", originalPrice: 2000, price: 1500, discount: 25, seller: "과자킹", rating: 5, trades: 345, status: "available", barcode: "9999-0000-1111-2222", validUntil: "2026.03.31", createdAt: "10시간 전", image: "https://atom.donutbook.co.kr:14405/goods/V68Q169WXQWBCFC05WXW.jpg", category: "기프티콘" },
  { id: 11, brand: "GS25", dday: 28, name: "동아 오로나민C 120ML", originalPrice: 1800, price: 1500, discount: 17, seller: "음료수집사", rating: 4.9, trades: 189, status: "available", barcode: "0000-1111-2222-3333", validUntil: "2026.03.31", createdAt: "11시간 전", image: "https://atom.donutbook.co.kr:14405/goods/INPGG3WXFHNAB4N6WCKP.jpg", category: "기프티콘" },
  { id: 12, brand: "GS25", dday: 28, name: "농심 웰치스포도탄산 355ML", originalPrice: 2000, price: 1500, discount: 25, seller: "탄산중독", rating: 5, trades: 234, status: "available", barcode: "1111-2222-3333-4444", validUntil: "2026.03.31", createdAt: "12시간 전", image: "https://atom.donutbook.co.kr:14405/goods/X2YI3U6CEB62IWRCQ7TF.jpg", category: "기프티콘" },
  { id: 13, brand: "GS25", dday: 28, name: "칸타타 프리미엄라떼 200ML캔", originalPrice: 2000, price: 1500, discount: 25, seller: "커피홀릭", rating: 5, trades: 456, status: "available", barcode: "2222-3333-4444-5555", validUntil: "2026.03.31", createdAt: "1일 전", image: "https://atom.donutbook.co.kr:14405/goods/Z8100WHMZ9Y9BJVF1YRQ.jpg", category: "기프티콘" },
  // 기프티콘 - 기타 브랜드
  { id: 14, brand: "맥도날드", dday: 14, name: "빅맥세트", originalPrice: 8900, price: 6500, discount: 27, seller: "이벤트헌터", rating: 5, trades: 89, status: "available", barcode: "9876-5432-1098-7654", validUntil: "2025.02.28", createdAt: "1일 전", image: "", category: "기프티콘" },
  { id: 15, brand: "공차", dday: 21, name: "블랙밀크티+펄 L", originalPrice: 5500, price: 4200, discount: 24, seller: "당첨왕", rating: 4.8, trades: 234, status: "available", barcode: "5555-6666-7777-8888", validUntil: "2025.03.05", createdAt: "2일 전", image: "", category: "기프티콘" },
  { id: 16, brand: "도미노피자", dday: 45, name: "포테이토 M", originalPrice: 19900, price: 14000, discount: 30, seller: "쿠폰마스터", rating: 5, trades: 67, status: "available", barcode: "1111-2222-3333-4444", validUntil: "2025.04.01", createdAt: "2일 전", image: "", category: "기프티콘" },
  { id: 17, brand: "배스킨라빈스", dday: 0, name: "파인트 아이스크림", originalPrice: 12000, price: 9500, discount: 21, seller: "아이스러버", rating: 4.9, trades: 56, status: "sold", barcode: "2222-3333-4444-5555", validUntil: "2025.01.31", soldDate: "2025.01.25", createdAt: "3일 전", image: "", category: "기프티콘" },
  { id: 19, brand: "메가MGC커피", dday: 20, name: "아메리카노 HOT", originalPrice: 2000, price: 1600, discount: 20, seller: "커피러버", rating: 5, trades: 156, status: "available", barcode: "7777-8888-9999-0000", validUntil: "2025.03.10", createdAt: "4일 전", image: "", category: "기프티콘" },
  { id: 20, brand: "더벤티", dday: 25, name: "아이스아메리카노", originalPrice: 2500, price: 2000, discount: 20, seller: "벤티팬", rating: 4.9, trades: 78, status: "available", barcode: "8888-9999-0000-1111", validUntil: "2025.03.15", createdAt: "5일 전", image: "", category: "기프티콘" },
  // 상품권
  { id: 18, brand: "CU", dday: 15, name: "5천원 상품권", originalPrice: 5000, price: 4500, discount: 10, seller: "편의점달인", rating: 5, trades: 89, status: "available", barcode: "6666-7777-8888-9999", validUntil: "2025.02.15", createdAt: "3일 전", image: "", category: "상품권" },
  { id: 21, brand: "GS25", dday: 30, name: "1만원 상품권", originalPrice: 10000, price: 9200, discount: 8, seller: "상품권뱅크", rating: 5, trades: 312, status: "available", barcode: "1010-2020-3030-4040", validUntil: "2026.04.30", createdAt: "1시간 전", image: "", category: "상품권" },
  { id: 22, brand: "CU", dday: 25, name: "1만원 상품권", originalPrice: 10000, price: 9000, discount: 10, seller: "편의점달인", rating: 5, trades: 245, status: "available", barcode: "2020-3030-4040-5050", validUntil: "2026.04.15", createdAt: "2시간 전", image: "", category: "상품권" },
  { id: 23, brand: "신세계", dday: 60, name: "5만원 상품권", originalPrice: 50000, price: 46500, discount: 7, seller: "백화점러버", rating: 5, trades: 178, status: "available", barcode: "3030-4040-5050-6060", validUntil: "2026.06.30", createdAt: "3시간 전", image: "", category: "상품권" },
  { id: 24, brand: "롯데", dday: 45, name: "3만원 상품권", originalPrice: 30000, price: 27500, discount: 8, seller: "쇼핑매니아", rating: 4.9, trades: 134, status: "available", barcode: "4040-5050-6060-7070", validUntil: "2026.05.31", createdAt: "5시간 전", image: "", category: "상품권" },
  { id: 25, brand: "해피머니", dday: 40, name: "2만원 온라인상품권", originalPrice: 20000, price: 18500, discount: 8, seller: "기프트킹", rating: 5, trades: 267, status: "available", barcode: "5050-6060-7070-8080", validUntil: "2026.05.15", createdAt: "6시간 전", image: "", category: "상품권" },
  { id: 26, brand: "문화", dday: 55, name: "1만원 문화상품권", originalPrice: 10000, price: 9300, discount: 7, seller: "문화생활", rating: 5, trades: 456, status: "available", barcode: "6060-7070-8080-9090", validUntil: "2026.06.15", createdAt: "8시간 전", image: "", category: "상품권" },
  { id: 27, brand: "구글플레이", dday: 90, name: "5만원 기프트카드", originalPrice: 50000, price: 46000, discount: 8, seller: "게임충전소", rating: 5, trades: 89, status: "available", barcode: "7070-8080-9090-1010", validUntil: "2026.09.30", createdAt: "1일 전", image: "", category: "상품권" },
  { id: 28, brand: "애플", dday: 90, name: "5만원 기프트카드", originalPrice: 50000, price: 47000, discount: 6, seller: "애플매니아", rating: 4.9, trades: 67, status: "available", barcode: "8080-9090-1010-2020", validUntil: "2026.09.30", createdAt: "1일 전", image: "", category: "상품권" },
  { id: 29, brand: "신세계", dday: 0, name: "3만원 상품권", originalPrice: 30000, price: 27000, discount: 10, seller: "쿠폰마스터", rating: 5, trades: 145, status: "sold", barcode: "9090-1010-2020-3030", validUntil: "2025.01.31", soldDate: "2025.01.20", createdAt: "5일 전", image: "", category: "상품권" },
  { id: 30, brand: "문화", dday: 0, name: "5만원 문화상품권", originalPrice: 50000, price: 46000, discount: 8, seller: "상품권뱅크", rating: 5, trades: 312, status: "sold", barcode: "1212-3434-5656-7878", validUntil: "2025.02.10", soldDate: "2025.01.28", createdAt: "7일 전", image: "", category: "상품권" },
];

export const posts: Post[] = [
  { id: 1, category: "꿀팁", title: "스타벅스 이벤트 당첨 확률 높이는 꿀팁!", author: "이벤트고수", time: "2시간 전", likes: 847, views: 2486, comments: 123, hot: true },
  { id: 2, category: "후기", title: "CU 행운퀴즈 당첨 후기입니다 ㅎㅎ", author: "럭키보이", time: "3시간 전", likes: 234, views: 1879, comments: 45, hot: false },
  { id: 3, category: "질문", title: "쌀먹캐시 출금은 어떻게 하나요?", author: "뉴비123", time: "5시간 전", likes: 156, views: 9135, comments: 67, hot: false },
  { id: 4, category: "정보", title: "🔥 이번 주 마감 이벤트 총정리!", author: "정보통", time: "6시간 전", likes: 1523, views: 1624, comments: 234, hot: true },
  { id: 5, category: "잡담", title: "오늘 설문조사로 500캐시 벌었어요", author: "쌀먹러", time: "7시간 전", likes: 89, views: 7112, comments: 23, hot: false },
];

export const initialMyCoupons: Coupon[] = [
  { id: 1, brand: "CJ ONE", brandLogo: "🔵", name: "(HOT)아메리카노", barcode: "5186-0151-4910", validFrom: "2025.12.18", validUntil: "2026.02.09", dday: 6, status: "unused", tradeStatus: "trading", source: "장터구매", purchaseDate: "2025.12.18", usedDate: null, price: 3200, seller: "USER123" },
  { id: 2, brand: "스타벅스", brandLogo: "☕", name: "카페 아메리카노 T", barcode: "8809-1234-5678", validFrom: "2025.12.20", validUntil: "2026.01.20", dday: 17, status: "unused", tradeStatus: "purchased", source: "장터구매", purchaseDate: "2025.12.20", usedDate: null, price: 4500, seller: "SELLER01" },
  { id: 3, brand: "GS25", brandLogo: "🏪", name: "1만원 상품권", barcode: "1234-5678-9012", validFrom: "2025.12.01", validUntil: "2026.01.31", dday: 28, status: "unused", tradeStatus: "purchased", source: "직접등록", purchaseDate: "2025.12.10", usedDate: null, price: 10000, seller: null },
  { id: 4, brand: "메가MGC커피", brandLogo: "🧋", name: "(HOT)아메리카노", barcode: "5186-0151-4962", validFrom: "2025.12.18", validUntil: "2026.02.09", dday: 37, status: "used", tradeStatus: "sold", source: "내가 판매", purchaseDate: "2025.12.18", usedDate: "2025.12.25", price: 2000, buyer: "BUYER01" },
  { id: 5, brand: "CU", brandLogo: "🏬", name: "5천원 상품권", barcode: "222", validFrom: "2025.01.01", validUntil: "2026.01.15", dday: 12, status: "unused", tradeStatus: "trading", source: "내가 판매", purchaseDate: "2025.01.05", usedDate: null, price: 5000, buyer: "BUYER03" },
  { id: 6, brand: "치맥", brandLogo: "🍗", name: "치킨 상품권", barcode: "55809", validFrom: "2025.01.01", validUntil: "2026.03.01", dday: 57, status: "unused", tradeStatus: "sold", source: "내가 판매", purchaseDate: "2025.01.10", usedDate: null, price: 20000, buyer: "BUYER02" },
];

export const initialMyTrades = {
  buying: [
    { id: 1, brand: "CU", name: "5천원 상품권", price: 4500, status: "escrow", seller: "행운이", date: "01.30", barcode: null },
    { id: 2, brand: "스타벅스", name: "카페라떼 T", price: 4200, status: "completed", seller: "커피러버", date: "01.28", barcode: "1234-5678-9012-3456" },
  ],
  selling: [
    { id: 1, brand: "GS25", name: "1만원 상품권", price: 9000, status: "waiting", buyer: null, date: "01.30" },
    { id: 2, brand: "배스킨라빈스", name: "파인트", price: 8500, status: "escrow", buyer: "아이스크림왕", date: "01.29" },
    { id: 3, brand: "버거킹", name: "와퍼세트", price: 7500, status: "settled", buyer: "햄버거맨", date: "01.25", settledAmount: 7237 },
  ],
};