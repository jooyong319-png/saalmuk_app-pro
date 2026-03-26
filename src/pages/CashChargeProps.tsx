type CashChargeProps = {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
};

export default function CashCharge({
  setCurrentPage,
  goBack,
}: CashChargeProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center">
        <button
          className="flex items-center gap-1 text-gray-700"
          onClick={() => (goBack ? goBack() : setCurrentPage("DailyReward"))}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm">뒤로</span>
        </button>
        <h1 className="flex-1 text-center font-medium text-gray-900 pr-12">
          내캐쉬 충전
        </h1>
      </header>

      {/* 본문 */}
      <div className="px-4 pb-8">
        {/* 캐쉬 잔액 카드 */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800">
          <p className="text-gray-400 text-sm mb-1">내캐쉬</p>
          <p className="text-white text-3xl font-bold mb-3">171,400원</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-400">일반</span>
              <span className="text-white">125,400원</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-gray-400">구매전용</span>
              <span className="text-white">46,000원</span>
            </span>
          </div>
        </div>

        {/* 충전 방법 선택 */}
        <div className="mt-6">
          <h3 className="font-bold text-gray-900 mb-3">충전 방법 선택</h3>
          <div className="space-y-3">
            {/* 무통장입금 */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  무통장입금 / 계좌이체
                </p>
                <p className="text-xs text-gray-400">수수료 무료 · 출금 가능</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                추천
              </span>
            </div>

            {/* 신용/체크카드 */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">신용/체크카드</p>
                <p className="text-xs text-gray-400">수수료 5.5% · 구매전용</p>
              </div>
            </div>

            {/* 네이버페이 */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">네이버페이</p>
                <p className="text-xs text-gray-400">수수료 5.5% · 구매전용</p>
              </div>
            </div>

            {/* 카카오페이 */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-900 text-lg">💬</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">카카오페이</p>
                <p className="text-xs text-gray-400">수수료 5.5% · 구매전용</p>
              </div>
            </div>

            {/* 토스페이 */}
            <div className="bg-white rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">toss</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">토스페이</p>
                <p className="text-xs text-gray-400">수수료 5.5% · 구매전용</p>
              </div>
            </div>
          </div>
        </div>

        {/* 예치금 안내 */}
        <div className="mt-6 p-4 bg-white rounded-xl">
          <p className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3">
            <span>💡</span> 예치금 안내
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></span>
              <span className="text-gray-600">
                <span className="text-green-600 font-medium">일반 예치금</span>{" "}
                - 무통장/계좌이체로 충전, 출금 가능
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5"></span>
              <span className="text-gray-600">
                <span className="text-orange-500 font-medium">
                  구매전용 예치금
                </span>{" "}
                - 카드/간편결제로 충전,{" "}
                <span className="text-red-500">출금 불가</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></span>
              <span className="text-gray-600">
                구매 시 구매전용 예치금이 먼저 사용됩니다
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
