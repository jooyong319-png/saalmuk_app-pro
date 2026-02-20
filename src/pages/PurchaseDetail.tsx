import { useState } from "react";

type PurchaseDetailProps = {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  productId?: string;
};

export default function PurchaseDetail({
  setCurrentPage,
  goBack,
  productId,
}: PurchaseDetailProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  // 임시 데이터 (실제로는 productId로 조회)
  const productData = {
    id: productId,
    icon: "☕",
    brand: "스타벅스",
    name: "아메리카노 Tall",
    salePrice: "4,000원",
    salePriceNum: 4000,
    discount: "11% 할인",
    originalPrice: "4,500원",
    expiryDate: "2025-03-15",
    daysLeft: 268,
    seller: "쿠폰왕",
    tradeMethod: "안전결제 (에스크로)",
    fee: "무료 (판매자 부담)",
    userBalance: 25400,
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 2700);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 border-b border-gray-100">
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
      </header>

      {/* 상품 이미지 영역 */}
      <div className="bg-white flex flex-col items-center py-8">
        <div className="w-24 h-24 flex items-center justify-center text-6xl mb-4">
          {productData.icon}
        </div>
        <div className="bg-gray-100 rounded-xl px-6 py-3">
          <p className="text-sm text-gray-400 text-center">
            바코드는 결제 후 공개됩니다
          </p>
        </div>
      </div>

      {/* 상품 정보 */}
      <div className="bg-white px-4 py-4 mt-1">
        <p className="text-xs text-gray-400">{productData.brand}</p>
        <h1 className="text-xl font-bold text-gray-900 mt-1">
          {productData.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-2xl font-bold" style={{ color: "#72C2FF" }}>
            {productData.salePrice}
          </span>
          <span className="text-sm text-red-500">{productData.discount}</span>
        </div>
        <p className="text-sm text-gray-400 line-through mt-1">
          정가 {productData.originalPrice}
        </p>
      </div>

      {/* 거래 정보 */}
      <div className="bg-white px-4 py-4 mt-3">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">유효기간</span>
            <span className="text-sm" style={{ color: "#72C2FF" }}>
              {productData.expiryDate} (-{productData.daysLeft}일 남음)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">판매자</span>
            <span className="text-sm text-gray-900">{productData.seller}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">거래방식</span>
            <span className="text-sm text-red-500 flex items-center gap-1">
              <span>🛡️</span> {productData.tradeMethod}
            </span>
          </div>
        </div>
      </div>

      {/* 안전결제 안내 */}
      <div className="mx-4 mt-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm font-bold text-blue-600 flex items-center gap-1 mb-2">
          <span>🛡️</span> 안전결제로 거래됩니다
        </p>
        <ul className="space-y-1 text-xs text-blue-600">
          <li>• 결제금은 쌀먹닷컴이 안전하게 보관합니다</li>
          <li>• 쿠폰 확인 후 구매확정하면 판매자에게 정산됩니다</li>
          <li>• 문제 발생 시 3일 내 분쟁 신청 가능</li>
          <li>• 3일 후 자동으로 구매확정 처리됩니다</li>
        </ul>
      </div>

      {/* 결제 정보 */}
      <div className="bg-white px-4 py-4 mt-3">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">상품가격</span>
            <span className="text-sm text-gray-900">
              {productData.salePrice}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">수수료</span>
            <span className="text-sm" style={{ color: "#72C2FF" }}>
              {productData.fee}
            </span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">결제 금액</span>
            <span className="text-lg font-bold" style={{ color: "#72C2FF" }}>
              {productData.salePrice}
            </span>
          </div>
        </div>
      </div>

      {/* 하단 결제 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-gray-100 max-w-md mx-auto">
        <button
          className="w-full py-4 rounded-xl text-white font-bold text-base"
          style={{ backgroundColor: "#72C2FF" }}
          onClick={() => setShowPaymentPopup(true)}
        >
          {productData.salePrice} 안전결제
        </button>
      </div>
      {/* 결제 팝업 */}
      {showPaymentPopup && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPaymentPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {/* 팝업 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-red-500">🛡️</span>
                <span className="font-bold text-gray-900">안전결제</span>
              </div>
              <button onClick={() => setShowPaymentPopup(false)}>
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

            {/* 상품 정보 */}
            <div className="p-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  {productData.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400">{productData.brand}</p>
                  <p className="font-bold text-gray-900">{productData.name}</p>
                </div>
              </div>

              {/* 금액 정보 */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">상품금액</span>
                  <span className="text-sm text-gray-900">
                    {productData.salePrice}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">차감 예치금</span>
                  <span className="text-sm text-red-500">
                    -{productData.salePrice}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500">결제 후 잔액</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#72C2FF" }}
                  >
                    {(
                      productData.userBalance - productData.salePriceNum
                    ).toLocaleString()}
                    원
                  </span>
                </div>
              </div>

              {/* 안내 메시지 */}
              <div className="bg-yellow-50 rounded-xl p-3 space-y-1">
                <p className="text-xs text-yellow-700 flex items-center gap-1">
                  <span>🛡️</span> 결제금은 구매확정 전까지 안전하게 보관됩니다
                </p>
                <p className="text-xs text-yellow-700 flex items-center gap-1">
                  <span>📅</span> 3일 이내 구매확정 또는 분쟁신청을 해주세요
                </p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 p-4 border-t border-gray-100">
              <button
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
                onClick={() => setShowPaymentPopup(false)}
              >
                취소
              </button>
              <button
                className="flex-1 py-3 rounded-xl text-white font-medium"
                style={{ backgroundColor: "#72C2FF" }}
                onClick={() => {
                  setShowPaymentPopup(false);
                  setShowCompletePopup(true);
                  showToastMessage("결제 완료! 쿠폰을 확인하세요");
                }}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 결제 완료 팝업 */}
      {showCompletePopup && (
        <div className="fixed inset-0 z-[9999] bg-white max-w-md mx-auto flex flex-col">
          {/* 헤더 */}
          <header className="sticky top-0 z-50 bg-white px-4 py-3 border-b border-gray-100">
            <button
              className="flex items-center gap-1 text-gray-700"
              onClick={() => {
                setShowCompletePopup(false);
                setCurrentPage("DailyReward");
              }}
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
          </header>

          {/* 본문 */}
          <div className="flex-1 overflow-y-auto pb-24">
            {/* 상태 배너 */}
            <div className="mx-4 mt-4 py-4 bg-yellow-100 rounded-xl text-center">
              <p className="text-yellow-700 font-bold">거래중</p>
              <p className="text-yellow-600 text-sm flex items-center justify-center gap-1 mt-1">
                <span>📅</span> 2일 23시간 후 자동확정
              </p>
            </div>

            {/* 상품 정보 */}
            <div className="px-4 py-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {productData.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400">{productData.brand}</p>
                <p className="font-bold text-gray-900">{productData.name}</p>
              </div>
            </div>

            {/* 쿠폰 바코드 */}
            <div className="mx-4 p-4 border border-blue-200 rounded-xl bg-blue-50">
              <p className="text-blue-600 text-sm font-medium text-center mb-3 flex items-center justify-center gap-1">
                <span>📊</span> 쿠폰 바코드
              </p>
              <div className="bg-white p-4 rounded-lg flex flex-col items-center">
                {/* 바코드 이미지 */}
                <div className="flex gap-[2px] mb-2">
                  {[...Array(40)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: Math.random() > 0.5 ? "2px" : "1px",
                        height: "50px",
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm tracking-widest">
                  8801234567890
                </p>
              </div>
              <p className="text-blue-600 text-xs text-center mt-3">
                매장에서 바코드를 스캔하여 사용하세요
              </p>
            </div>

            {/* 거래 정보 */}
            <div className="mx-4 mt-4">
              <h3 className="font-bold text-gray-900 mb-3">거래 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">거래번호</span>
                  <span className="text-sm text-gray-400">tx17861788443Z0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">판매자</span>
                  <span className="text-sm text-gray-900">
                    {productData.seller}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">결제금액</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#72C2FF" }}
                  >
                    {productData.salePrice}
                  </span>
                </div>
              </div>
            </div>

            {/* 거래 진행 */}
            <div className="mx-4 mt-6">
              <h3 className="font-bold text-gray-900 mb-3">거래 진행</h3>
              <div className="relative">
                {/* 연결선 */}
                <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-gray-200"></div>

                <div className="space-y-4">
                  {/* 결제 완료 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center z-10">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        결제 완료
                      </p>
                      <p className="text-xs text-gray-400">
                        2025. 12. 8. 오후 4:27:24
                      </p>
                    </div>
                  </div>

                  {/* 에스크로 보관중 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center z-10">
                      <span className="text-white text-xs">●</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">
                        에스크로 보관중
                      </p>
                      <p className="text-xs text-gray-400">구매확정 대기</p>
                    </div>
                  </div>

                  {/* 구매 확정 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center z-10">
                      <span className="text-gray-300 text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-400">구매 확정</p>
                  </div>

                  {/* 정산 완료 */}
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center z-10">
                      <span className="text-gray-300 text-xs">○</span>
                    </div>
                    <p className="text-sm text-gray-400">정산 완료</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-gray-100 max-w-md mx-auto flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
              onClick={() => {
                // 분쟁신청 로직
              }}
            >
              분쟁신청
            </button>
            <button
              className="flex-1 py-3 rounded-xl text-white font-medium bg-blue-400"
              onClick={() => {
                setShowCompletePopup(false);
                setCurrentPage("DailyReward");
              }}
            >
              구매확정
            </button>
          </div>
        </div>
      )}
      {/* 토스트 */}
      {showToast && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full flex items-center gap-2 z-[10000] whitespace-nowrap transition-all duration-300 ease-out ${
            toastVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <span className="text-green-400">✓</span>
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
