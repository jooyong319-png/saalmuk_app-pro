import { useState } from "react";

type CashWithdrawProps = {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
};

export default function CashWithdraw({ setCurrentPage, goBack }: CashWithdrawProps) {
  const [amount, setAmount] = useState("10000");
  const withdrawFee = 1000;
  const availableAmount = 125400;

  const numericAmount = parseInt(amount) || 0;
  const actualAmount = Math.max(0, numericAmount - withdrawFee);

  const handleFullAmount = () => {
    setAmount(availableAmount.toString());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center">
        <button
          className="flex items-center gap-1 text-gray-700"
          onClick={() => goBack ? goBack() : setCurrentPage("DailyReward")}
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
          출금 신청
        </h1>
      </header>

      {/* 본문 */}
      <div className="px-4 pb-8">
        {/* 출금 가능 금액 카드 */}
        <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-800">
          <p className="text-gray-400 text-sm mb-1">출금 가능 금액</p>
          <p className="text-white text-3xl font-bold mb-2">125,400원</p>
          <p className="text-gray-400 text-xs">
            ※ 구매전용 예치금 46,000원은 출금 불가
          </p>
        </div>

        {/* 출금 금액 입력 */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            출금 금액
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-bold text-gray-900 bg-white"
                placeholder="0"
              />
            </div>
            <span className="text-gray-500 font-medium">원</span>
          </div>
          <button
            onClick={handleFullAmount}
            className="mt-2 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg"
          >
            전액 출금
          </button>
        </div>

        {/* 출금 계좌 */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            출금 계좌
          </label>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-200">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-yellow-900 font-bold text-xs">KB</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">국민은행</p>
              <p className="text-sm text-gray-400">538801-**-47323</p>
            </div>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* 출금 정보 */}
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">출금 금액</span>
            <span className="text-sm font-bold text-gray-900">
              {numericAmount.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">출금 수수료</span>
            <span className="text-sm font-bold text-red-500">
              {withdrawFee.toLocaleString()}원
            </span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">실 입금액</span>
            <span className="text-lg font-bold text-gray-900">
              {actualAmount.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button
          className="w-full py-4 rounded-xl text-white font-bold text-base"
          style={{ backgroundColor: numericAmount > 0 ? "#72C2FF" : "#9ca3af" }}
          disabled={numericAmount <= 0}
        >
          출금 신청하기
        </button>
      </div>
    </div>
  );
}
