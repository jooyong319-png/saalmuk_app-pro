import { useState } from "react";

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

type EventDetailProps = {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  dDay?: string;
  eventId?: string;
};

const eventsData: EventItem[] = [
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

export default function DailyEventDetail({
  setCurrentPage,
  goBack,
  dDay = "D-3",
  eventId,
}: EventDetailProps) {
  // eventId로 이벤트 찾기
  const eventData =
    eventsData.find((e) => e.id === Number(eventId)) || eventsData[0];

  // dDay는 찾은 이벤트의 dDay 사용
  const currentDDay = eventData.dDay;
  const isEnded =
    currentDDay === "마감" ||
    currentDDay === "발표완료" ||
    eventData.status === "발표전" ||
    eventData.status === "발표완료";
  const [isFollowing, setIsFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(10);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [memo, setMemo] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showWinnerRegister, setShowWinnerRegister] = useState(false);
  const [winnerUrl, setWinnerUrl] = useState("");
  const [winnerMemo, setWinnerMemo] = useState("");
  const [individualNotify, setIndividualNotify] = useState(false);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 1700);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setCurrentPage("DailyReward")} className="p-1">
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
          <h1 className="text-base font-medium text-gray-900 flex-1 text-center truncate px-4">
            {eventData.title}
          </h1>
          <div className="w-6" />
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-white">
        {/* 태그 & 유저 정보 */}
        <div className="px-4 pt-4">
          {/* 태그 */}
          <div className="flex gap-1.5 mb-3">
            {eventData.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-xs font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
            {/* 상태 태그 */}
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                eventData.status === "발표완료"
                  ? "bg-blue-500 text-white"
                  : eventData.status === "발표전"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {eventData.status}
            </span>
          </div>

          {/* 유저 프로필 & 팔로우 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm">🦆</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">저렴가를찾는용가리</p>
                <p className="text-xs text-gray-400">1시간 전 · 팔로워 192</p>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                isFollowing
                  ? "bg-gray-200 text-gray-700"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "팔로잉" : "팔로우"}
            </button>
          </div>
        </div>

        {/* 당첨자 발표정보 - 발표전/발표완료일 때 표시 */}
        {isEnded && (
          <div className="mx-4 mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            {eventData.status === "발표완료" ? (
              // 발표완료 상태
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-blue-600 font-medium">[발표완료]</span>{" "}
                  <span className="text-gray-900">당첨자발표 확인하기</span>
                </p>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="text-gray-500">등록회원:</span>{" "}
                    <span className="text-gray-900">TOT24</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-500">발표등록일:</span>{" "}
                    <span className="text-gray-900">2026-01-16</span>
                    <button className="px-2 py-0.5 border border-blue-400 text-blue-500 text-xs rounded">
                      정정신청
                    </button>
                  </p>
                </div>
                <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-600">댓글로 발표</p>
                </div>
              </div>
            ) : (
              // 발표전 상태
              <div className="space-y-1 text-sm">
                <p className="text-blue-600">
                  <span className="text-gray-500">[미발표]</span>{" "}
                  <button
                    className="text-blue-600 underline font-medium"
                    onClick={() => setShowWinnerRegister(true)}
                  >
                    당첨자발표 등록하기
                  </button>
                </p>
                <p className="text-orange-600">
                  • 링크 등록시{" "}
                  <span className="text-orange-600 font-medium">
                    포인트 20 적립
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
        {/* 이벤트 상세 정보 */}
        <div className="px-4 py-4 mt-4 space-y-3">
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">주최사</span>
            <span className="text-sm text-gray-900 flex items-center gap-1">
              <span className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
                S
              </span>
              신라면세점
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">응모기간</span>
            <span className="text-sm text-gray-900">{eventData.period}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">응모형태</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">
              {eventData.tags[0]?.label || "기타"}
            </span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">당첨자 발표일</span>
            <span className="text-sm text-gray-900">2026-01-26</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">총 당첨자수</span>
            <span className="text-sm text-gray-900">{eventData.people}</span>
          </div>
          <div className="flex">
            <span className="w-24 text-gray-500 text-sm">경품</span>
            <span className="text-sm text-red-500 font-medium">
              {eventData.reward}
            </span>
          </div>
        </div>

        {/* 좋아요, 댓글, 공유, 더보기 */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 좋아요 */}
            <button
              className="flex items-center gap-1"
              onClick={() => {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
              }}
            >
              <svg
                className={`w-5 h-5 ${
                  liked ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
                fill={liked ? "currentColor" : "none"}
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
              <span className="text-sm text-gray-500">{likeCount}</span>
            </button>

            {/* 댓글 */}
            <button className="flex items-center gap-1">
              <svg
                className="w-5 h-5 text-gray-400"
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
              <span className="text-sm text-gray-500">6</span>
            </button>

            {/* 공유 */}
            <button>
              <svg
                className="w-5 h-5 text-gray-400"
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

          {/* 더보기 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-1"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {/* 더보기 드롭다운 */}
            {showMoreMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 w-40">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    showToastMessage("내응모함에 저장되었습니다.");
                    setShowMoreMenu(false);
                  }}
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
                      strokeWidth={1.5}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  내응모함 저장
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => {
                    showToastMessage("신고가 접수되었습니다.");
                    setShowMoreMenu(false);
                  }}
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
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  신고
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 이벤트 페이지 바로가기 버튼 */}
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 max-w-md mx-auto">
          <button
            style={{ backgroundColor: "#72C2FF" }}
            className="text-white w-full py-3 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 flex items-center justify-center gap-2 shadow-lg"
          >
            이벤트 페이지 바로가기
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 이벤트 이미지 */}
        <div className="px-4 py-4 space-y-4">
          {/* 메인 배너 이미지 */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://img.itemmania.com/portal/free_coupon/images/1490/url_detail_page_image.jpg"
              alt="이벤트 배너"
              className="w-full h-auto"
            />
          </div>

          {/* 이벤트 안내 */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">📢</span> 이벤트 안내
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {eventData.title} 이벤트에 참여하시고 푸짐한 경품을 받아가세요! 본
              이벤트는 {eventData.period} 기간 동안 진행되며, 총{" "}
              {eventData.people}에게{" "}
              <span className="text-red-500 font-medium">
                {eventData.reward}
              </span>
              을(를) 드립니다.
            </p>
          </div>

          {/* 참여 방법 */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-lg">✅</span> 참여 방법
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    이벤트 페이지 접속
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    위 버튼을 클릭하여 공식 이벤트 페이지로 이동해주세요.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">응모 조건 확인</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    이벤트 참여 조건과 필수 사항을 꼼꼼히 확인해주세요.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">응모하기</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {eventData.tags[0]?.label || "이벤트"} 형식에 맞게 응모를
                    완료해주세요.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900">당첨 확인</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    발표일에 당첨 여부를 확인하고, 경품을 수령하세요!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 유의 사항 */}
          <div className="bg-orange-50 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">⚠️</span> 유의 사항
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>본 이벤트는 1인 1회만 참여 가능합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>부정한 방법으로 참여 시 당첨이 취소될 수 있습니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>경품 수령을 위해 개인정보 제공에 동의해야 합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>
                  당첨자 발표는 이벤트 페이지 또는 개별 연락으로 안내됩니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-500">•</span>
                <span>
                  경품은 제세공과금(22%)이 발생할 수 있으며, 당첨자 부담입니다.
                </span>
              </li>
            </ul>
          </div>

          {/* 주최사 정보 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-lg">🏢</span> 주최사 정보
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="w-20 text-gray-500">주최</span>
                <span className="text-gray-900">신라면세점</span>
              </div>
              <div className="flex">
                <span className="w-20 text-gray-500">문의</span>
                <span className="text-blue-500">고객센터 1588-0000</span>
              </div>
              <div className="flex">
                <span className="w-20 text-gray-500">홈페이지</span>
                <span className="text-blue-500">www.shilladfs.com</span>
              </div>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              #이벤트
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              #경품
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{eventData.tags[0]?.label || "응모"}
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              #무료
            </span>
            <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              #당첨
            </span>
          </div>

          {/* 하단 여백 (플로팅 버튼 공간) */}
          <div className="h-16"></div>
        </div>
      </div>

      {/* 당첨자발표 등록 팝업 */}
      {showWinnerRegister && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowWinnerRegister(false)}
          />
          <div className="relative bg-gradient-to-b from-blue-50 to-white rounded-2xl w-full max-w-sm p-5">
            {/* 미발표 & 등록하기 */}
            <div className="mb-2">
              <span className="text-gray-500 text-sm">[미발표]</span>{" "}
              <span className="px-2 py-0.5 text-sm text-blue-500">
                당첨자발표 등록하기
              </span>
            </div>

            <p className="text-red-500 text-sm mb-4">
              • 링크 등록시 포인트 20원 적립
            </p>

            {/* URL 입력 */}
            <input
              type="text"
              placeholder="발표 확인 가능한 URL 입력하기"
              value={winnerUrl}
              onChange={(e) => setWinnerUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 mb-3"
            />

            {/* 메모 입력 */}
            <input
              type="text"
              placeholder="도움메모 입력하기"
              value={winnerMemo}
              onChange={(e) => setWinnerMemo(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-blue-400 mb-3"
            />

            {/* 개별통보 체크박스 */}
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={individualNotify}
                onChange={(e) => setIndividualNotify(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">개별통보</span>
            </label>

            <p className="text-xs text-gray-400 mb-4">
              관련없는 정보는 삭제 및 포인트가 회수됩니다.
            </p>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
                onClick={() => {
                  setShowWinnerRegister(false);
                  setWinnerUrl("");
                  setWinnerMemo("");
                  setIndividualNotify(false);
                }}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-medium"
                onClick={() => {
                  showToastMessage("당첨자 발표가 등록되었습니다.");
                  setShowWinnerRegister(false);
                  setWinnerUrl("");
                  setWinnerMemo("");
                  setIndividualNotify(false);
                }}
              >
                등록
              </button>
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

      {/* 더보기 메뉴 외부 클릭 시 닫기 */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </div>
  );
}
