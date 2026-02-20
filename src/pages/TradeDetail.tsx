import { useState } from "react";

type TradeDetailProps = {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  tradeId?: string;
};

export default function TradeDetail({
  setCurrentPage,
  goBack,
  tradeId,
}: TradeDetailProps) {
  // 임시 데이터 (실제로는 tradeId로 조회)
  const tradeData = {
    id: tradeId,
    icon: "🏪",
    brand: "CU",
    name: "모바일 상품권 5천원",
    status: "구매확정", // "거래중" | "분쟁중" | "구매확정"
    tradeNumber: "tx2",
    buyer: "할인헌터",
    paymentAmount: "4,600원",
    fee: "-138원",
    settlementAmount: "4,462원",
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "거래중":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "분쟁중":
        return "bg-red-100 text-red-500 border-red-200";
      case "구매확정":
        return "bg-blue-100 text-blue-500 border-blue-200";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button
          className="flex items-center gap-1 text-gray-700"
          onClick={() => setCurrentPage("DailyReward")}
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
        <h1 className="text-base font-medium">거래 상세</h1>
        <div className="w-12"></div>
      </header>

      {/* 상태 버튼 */}
      <div className="px-4 py-3">
        <button
          className={`w-full py-3 rounded-xl text-sm font-medium border ${getStatusStyle(
            tradeData.status
          )}`}
        >
          {tradeData.status}
        </button>
      </div>

      {/* 상품 정보 */}
      <div className="px-4 py-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
            {tradeData.icon}
          </div>
          <div>
            <p className="text-xs text-gray-400">{tradeData.brand}</p>
            <p className="font-bold text-blue-500">{tradeData.name}</p>
          </div>
        </div>
      </div>

      {/* 거래 정보 */}
      <div className="mt-3 bg-white">
        <div className="px-4 py-3 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">거래 정보</h2>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">거래번호</span>
            <span className="text-sm text-gray-400">
              {tradeData.tradeNumber}
            </span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">구매자</span>
            <span className="text-sm text-gray-900">{tradeData.buyer}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">결제금액</span>
            <span className="text-sm font-bold text-gray-900">
              {tradeData.paymentAmount}
            </span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">수수료 (3%)</span>
            <span className="text-sm text-red-500">{tradeData.fee}</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">정산금액</span>
            <span className="text-sm font-bold" style={{ color: "#72C2FF" }}>
              {tradeData.settlementAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
