interface FameDashboardProps {
  onClose: () => void;
  totalFame?: number;
  postFame?: number;
  commentFame?: number;
  postCount?: number;
  commentCount?: number;
  monthlyFame?: number;
  monthlyPostFame?: number;
  monthlyCommentFame?: number;
  monthlyPostCount?: number;
  monthlyCommentCount?: number;
}

export default function FameDashboard({
  onClose,
  totalFame = 1432500,
  postFame = 840500,
  commentFame = 592000,
  postCount = 1250,
  commentCount = 3840,
  monthlyFame = 432500,
  monthlyPostFame = 40500,
  monthlyCommentFame = 92000,
  monthlyPostCount = 85,
  monthlyCommentCount = 620,
}: FameDashboardProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* 모달 */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-2xl overflow-hidden animate-fadeUp shadow-xl">
        {/* 헤더 */}
        <div className="bg-[#72C2FF] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <span className="text-[17px] font-bold text-white">
              Fame 대시보드
            </span>
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

        {/* 전체 Fame */}
        <div className="px-5 py-5">
          <div className="bg-gradient-to-r from-[#72C2FF]/10 to-[#72C2FF]/5 rounded-xl p-5 border border-[#72C2FF]/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[13px] text-gray-500 font-medium">
                전체 Fame
              </span>
            </div>
            <p className="text-[32px] font-bold text-gray-900 tracking-tight">
              {totalFame.toLocaleString()}
            </p>
            <p className="text-[12px] text-gray-400 mt-1">
              글과 댓글에서 받은 전체 추천수의 합
            </p>

            {/* 게시글 / 댓글 Fame */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[12px]">📝</span>
                  <span className="text-[12px] text-gray-500">게시글 Fame</span>
                </div>
                <p className="text-[18px] font-bold text-gray-800">
                  {postFame.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-400">
                  게시글 {postCount.toLocaleString()}개
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[12px]">💬</span>
                  <span className="text-[12px] text-gray-500">댓글 Fame</span>
                </div>
                <p className="text-[18px] font-bold text-gray-800">
                  {commentFame.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-400">
                  댓글 {commentCount.toLocaleString()}개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 이달의 Fame */}
        <div className="px-5 pb-5">
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">🔥</span>
                <span className="text-[13px] text-gray-500 font-medium">
                  이달의 Fame
                </span>
              </div>
              <span className="text-[11px] text-gray-400 bg-white px-2 py-0.5 rounded-full">
                {new Date().getFullYear()}년 {new Date().getMonth() + 1}월
              </span>
            </div>
            <p className="text-[28px] font-bold text-orange-500 tracking-tight">
              {monthlyFame.toLocaleString()}
            </p>

            {/* 이달 게시글 / 댓글 Fame */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px]">📝</span>
                  <span className="text-[11px] text-gray-500">게시글 Fame</span>
                </div>
                <p className="text-[16px] font-bold text-gray-800">
                  {monthlyPostFame.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-400">
                  게시글 {monthlyPostCount}개
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px]">💬</span>
                  <span className="text-[11px] text-gray-500">댓글 Fame</span>
                </div>
                <p className="text-[16px] font-bold text-gray-800">
                  {monthlyCommentFame.toLocaleString()}
                </p>
                <p className="text-[11px] text-gray-400">
                  댓글 {monthlyCommentCount}개
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fame 계산식 */}
        <div className="px-5 pb-5">
          <p className="text-[11px] text-gray-400 text-center">
            Fame = 글 추천수 + 댓글 추천수
          </p>
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
