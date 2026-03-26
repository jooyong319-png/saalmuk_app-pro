interface FameMenuPopupProps {
  onClose: () => void;
  onSelectFame: () => void;
  onSelectReward: () => void;
  onSelectRanking: () => void;
}

export default function FameMenuPopup({
  onClose,
  onSelectFame,
  onSelectReward,
  onSelectRanking,
}: FameMenuPopupProps) {
  const menuItems = [
    { id: "fame", label: "Fame", onClick: onSelectFame },
    { id: "reward", label: "리워드", onClick: onSelectReward },
    { id: "ranking", label: "이달의 랭킹전", onClick: onSelectRanking },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* 배경 */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* 바텀시트 */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl animate-slideUp">
        {/* 핸들 */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 메뉴 리스트 */}
        <div className="px-4 pb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full text-left py-4 text-[16px] font-medium text-gray-800 active:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 취소 버튼 */}
        <div className="px-4 pb-8">
          <button
            onClick={onClose}
            className="w-full py-3 text-[15px] font-medium text-gray-500 bg-gray-100 rounded-xl active:bg-gray-200 transition-colors"
          >
            취소
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
    </div>
  );
}
