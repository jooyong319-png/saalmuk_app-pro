import { useState } from "react";

const giftOptions = [
  { emoji: "🌾", name: "쌀 한톨", price: 10, bg: "bg-green-100", textColor: "text-green-600" },
  { emoji: "🍚", name: "밥 한공기", price: 50, bg: "bg-orange-100", textColor: "text-orange-600" },
  { emoji: "🎁", name: "쌀가마", price: 100, bg: "bg-pink-100", textColor: "text-pink-600" },
  { emoji: "⭐", name: "황금쌀", price: 500, bg: "bg-cyan-100", textColor: "text-cyan-600" },
  { emoji: "🏆", name: "논 한마지기", price: 1000, bg: "bg-emerald-100", textColor: "text-emerald-600" },
];

interface GiftPopupProps {
  onClose: () => void;
  onSend?: () => void;
  userPoints?: number;
  receivedCount?: number;
}

export default function GiftPopup({
  onClose,
  onSend,
  userPoints = 532,
  receivedCount = 14,
}: GiftPopupProps) {
  const [selectedGift, setSelectedGift] = useState(1);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSend = () => {
    onSend?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-white rounded-2xl w-[calc(100%-32px)] max-w-sm overflow-hidden"
        style={{ animation: "popIn 0.2s ease-out" }}
      >
        {/* 헤더 */}
        <div className="grid grid-cols-3 items-center p-4">
          {/* 내 포인트 */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white text-base">🍚</span>
            </div>
            <div>
              <p className="text-base font-bold">{userPoints}P</p>
              <p className="text-[10px] text-gray-400">내 포인트</p>
            </div>
          </div>

          {/* 받은 선물 */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center p-2 rounded-xl bg-amber-50">
              <span className="text-xl">🏆</span>
              <span className="text-[10px] text-gray-500">{receivedCount}개 보기</span>
            </div>
          </div>

          {/* 닫기 버튼 */}
          <div className="flex justify-end">
            <button onClick={onClose}>
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

        {/* 선물 선택 */}
        <div className="px-4 pb-3">
          <p className="font-bold text-gray-900 mb-3">상을 선택하세요</p>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {giftOptions.map((item, i) => (
              <button
                key={i}
                className={`flex flex-col items-center min-w-[68px] p-2.5 rounded-xl transition-all ${item.bg} ${
                  selectedGift === i ? "ring-2 ring-[#72C2FF]" : ""
                }`}
                onClick={() => setSelectedGift(i)}
              >
                <span className="text-2xl mb-0.5">{item.emoji}</span>
                <span className="text-[10px] font-medium text-gray-700">{item.name}</span>
                <span className={`text-[10px] font-medium ${item.textColor}`}>
                  {item.price}P
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 메시지 입력 */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
            <input
              type="text"
              placeholder="메시지를 추가하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 100))}
              className="flex-1 text-sm outline-none"
            />
            <span className="text-xs text-gray-400">{message.length}/100</span>
          </div>
        </div>

        {/* 익명 옵션 */}
        <div className="px-4 pb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 rounded accent-[#72C2FF]"
            />
            <span className="text-sm text-gray-700">익명으로 기부하기</span>
          </label>
        </div>

        {/* 전송 버튼 */}
        <div className="px-4 pb-4">
          <button
            className="w-full py-3.5 rounded-full text-white font-bold text-base bg-[#72C2FF] active:bg-[#5AB0F0] transition-colors"
            onClick={handleSend}
          >
            상 주기
          </button>
        </div>
      </div>
    </div>
  );
}
