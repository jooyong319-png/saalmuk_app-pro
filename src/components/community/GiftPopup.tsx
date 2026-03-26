import { useState } from "react";

const giftOptions = [
  {
    emoji: "🌾",
    name: "쌀 한톨",
    price: 10,
    bg: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    emoji: "🍚",
    name: "밥 한공기",
    price: 50,
    bg: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    emoji: "🎁",
    name: "쌀가마",
    price: 100,
    bg: "bg-pink-100",
    textColor: "text-pink-600",
  },
  {
    emoji: "⭐",
    name: "황금쌀",
    price: 500,
    bg: "bg-cyan-100",
    textColor: "text-cyan-600",
  },
  {
    emoji: "🏆",
    name: "논 한마지기",
    price: 1000,
    bg: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
];

// 수상내역 더미 데이터
const awardHistory = [
  {
    emoji: "🏆",
    name: "논 한마지기",
    count: 2,
    price: 1000,
    bg: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    emoji: "⭐",
    name: "황금쌀",
    count: 19,
    price: 500,
    bg: "bg-cyan-100",
    textColor: "text-cyan-600",
  },
  {
    emoji: "🎁",
    name: "쌀가마",
    count: 2,
    price: 100,
    bg: "bg-pink-100",
    textColor: "text-pink-600",
  },
  {
    emoji: "🍚",
    name: "밥 한공기",
    count: 2,
    price: 50,
    bg: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    emoji: "🌾",
    name: "쌀 한톨",
    count: 1,
    price: 10,
    bg: "bg-green-100",
    textColor: "text-green-600",
  },
];

interface GiftPopupProps {
  onClose: () => void;
  onSend?: () => void;
  userPoints?: number;
  receivedCount?: number;
  totalAwards?: number;
  totalPoints?: number;
}

export default function GiftPopup({
  onClose,
  onSend,
  userPoints = 532,
  receivedCount = 26,
  totalAwards = 26,
  totalPoints = 2850,
}: GiftPopupProps) {
  const [selectedGift, setSelectedGift] = useState(1);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showAwardHistory, setShowAwardHistory] = useState(false);

  const handleSend = () => {
    onSend?.();
    onClose();
  };

  const handleClose = () => {
    setShowAwardHistory(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div
        className="relative bg-white rounded-t-2xl w-full max-w-md"
        style={{ animation: "slideUp 0.2s ease-out" }}
      >
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
              <button onClick={handleClose}>
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
                    <span className="text-2xl font-bold">{totalAwards}</span>
                  </div>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">총 포인트</p>
                  <p className="text-2xl font-bold">{totalPoints}P</p>
                </div>
              </div>
            </div>

            {/* 수상 리스트 */}
            <div className="px-4 pb-6 max-h-80 overflow-y-auto">
              {awardHistory.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-xl ${item.bg} flex flex-col items-center justify-center`}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span className={`text-[10px] ${item.textColor}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-lg font-medium">{item.count}</span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {item.price}P
                  </span>
                </div>
              ))}
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
                  <p className="text-lg font-bold">{userPoints}P</p>
                  <p className="text-xs text-gray-400">내 포인트</p>
                </div>
              </div>

              {/* 가운데 - N개 보기 */}
              <button
                className="flex flex-col items-center justify-center mx-auto p-3 rounded-xl bg-amber-50"
                onClick={() => setShowAwardHistory(true)}
              >
                <span className="text-2xl">🏆</span>
                <span className="text-xs text-gray-500">
                  {receivedCount}개 보기 &gt;
                </span>
              </button>

              {/* 오른쪽 - 닫기 */}
              <div className="flex justify-end">
                <button onClick={handleClose}>
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
              <p className="font-bold text-gray-900 mb-3">상을 선택하세요</p>
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {giftOptions.map((item, i) => (
                  <button
                    key={i}
                    className={`flex flex-col items-center min-w-[70px] p-3 rounded-xl transition-all ${item.bg} ${
                      selectedGift === i ? "ring-2 ring-[#72C2FF]" : ""
                    }`}
                    onClick={() => setSelectedGift(i)}
                  >
                    <span className="text-3xl mb-1">{item.emoji}</span>
                    <span className="text-xs font-medium text-gray-700">
                      {item.name}
                    </span>
                    <span className={`text-xs font-medium ${item.textColor}`}>
                      {item.price}P
                    </span>
                  </button>
                ))}
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 100))}
                  className="flex-1 text-sm outline-none"
                />
                <span className="text-xs text-gray-400">
                  {message.length}/100
                </span>
              </div>
            </div>

            {/* 안내 */}
            <div className="px-4 pb-3">
              <p className="text-xs text-gray-400">
                수상과 함께 콘텐츠 제공자에게 감사와 응원의 메시지를 남겨주세요.
              </p>
            </div>

            {/* 익명 체크박스 */}
            <div className="px-4 pb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 accent-[#72C2FF]"
                />
                <span className="text-sm text-gray-700">익명으로 기부하기</span>
              </label>
            </div>

            {/* 상 주기 버튼 */}
            <div className="px-4 pb-4">
              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg bg-[#72C2FF] active:bg-[#5AB0F0] transition-colors"
                onClick={handleSend}
              >
                상 주기
              </button>
            </div>

            {/* 하단 안내 */}
            <div className="px-4 pb-6">
              <p className="text-xs text-gray-400 text-center">
                상은 콘텐츠 제공자에게 감사와 응원을 표현하는 방법입니다.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
