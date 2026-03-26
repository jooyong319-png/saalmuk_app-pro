interface RewardDashboardProps {
  onClose: () => void;
  totalReward?: number;
  monthlyReward?: number;
}

export default function RewardDashboard({
  onClose,
  totalReward = 1432500,
  monthlyReward = 432500,
}: RewardDashboardProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl overflow-hidden animate-fadeUp shadow-xl">
        {/* 헤더 */}
        <div className="bg-[#72C2FF] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <span className="text-[17px] font-bold text-white">리워드</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white"
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

        {/* 전체 리워드 */}
        <div className="px-5 py-5">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <p className="text-[13px] text-gray-500 text-center mb-2">
              전체 리워드
            </p>
            <p className="text-[36px] font-bold text-yellow-600 text-center tracking-tight">
              {totalReward.toLocaleString()}
            </p>
            <p className="text-[12px] text-gray-400 text-center mt-2">
              활동으로 획득한 총 리워드
            </p>
          </div>
        </div>

        {/* 이달의 리워드 */}
        <div className="px-5 pb-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-[13px] text-gray-500">이달의 리워드</p>
              <span className="text-[11px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                {new Date().getFullYear()}년 {new Date().getMonth() + 1}월
              </span>
            </div>
            <p className="text-[30px] font-bold text-gray-700 text-center tracking-tight">
              {monthlyReward.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.3s ease-out; }
      `}</style>
    </div>
  );
}
