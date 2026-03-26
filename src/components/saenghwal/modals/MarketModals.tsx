// @ts-nocheck
import { useState } from "react";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function MarketModals({ ctx }: Props) {
  const {
    showPurchaseFlow,
    setShowPurchaseFlow,
    purchaseStep,
    setPurchaseStep,
    selectedProduct,
    setSelectedProduct,
    isSeller,
    setIsSeller,
    showChat,
    setShowChat,
    chatMessages,
    setChatMessages,
    chatInput,
    setChatInput,
    chatPartner,
    setChatPartner,
    showDisputeModal,
    setShowDisputeModal,
    disputeReason,
    setDisputeReason,
    disputeEtcText,
    setDisputeEtcText,
    showTransactionDetail,
    setShowTransactionDetail,
    transactionStatus,
    setTransactionStatus,
    showDisputeToast,
    setShowDisputeToast,
    showSellFlow,
    setShowSellFlow,
    sellStep,
    setSellStep,
    showMyTrade,
    setShowMyTrade,
    myTradeTab,
    setMyTradeTab,
    myTrades,
    setMyTrades,
    userStats,
    setUserStats,
    myCoupons,
    setMyCoupons,
    setShowMyCoupon,
    setShowChargeModal,
    setChargeStep,
    setChargeAmount,
  } = ctx;

  // 토스트 state (상위 레벨)
  const [showPurchaseToast, setShowPurchaseToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // 구매확정 팝업 state
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [confirmRating, setConfirmRating] = useState(0);

  const PurchaseFlowModal = () => {
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    if (!selectedProduct) return null;
    const product = selectedProduct;
    const fee = 0; // 구매자 수수료 무료
    const totalPrice = product.price + fee;
    const canBuy = userStats.ssalmukCash >= totalPrice;

    // 할인율 계산 (예시: 정가 대비)
    const originalPrice = Math.round(product.price * 1.11); // 11% 할인 가정
    const discountRate = Math.round((1 - product.price / originalPrice) * 100);

    // 자동확정 남은 시간 (예시)
    const autoConfirmTime = "2일 23시간";

    // 거래번호 생성
    const transactionId = `tx${Date.now()}`;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center sticky top-0 z-10">
          <button
            onClick={() => {
              setShowPurchaseFlow(false);
              setPurchaseStep(1);
              setIsSeller(false);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
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
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Step 1: 상품 상세 (결제 전) */}
          {purchaseStep === 1 && (
            <div className="pb-24">
              {/* 상품 이미지 영역 */}
              <div className="flex flex-col items-center py-8 bg-white">
                <div className="w-24 h-24 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">☕</span>
                  )}
                </div>
                <div className="bg-gray-100 rounded-xl px-6 py-3 text-center">
                  <p className="text-gray-500 text-sm">
                    바코드는 결제 후 공개됩니다
                  </p>
                </div>
              </div>

              {/* 상품 정보 */}
              <div className="px-4 py-4 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                      {product.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setChatPartner(product.seller || "판매자");
                      setShowChat(true);
                    }}
                    className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium flex-shrink-0"
                  >
                    문의하기
                  </button>
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </span>
                  <span className="text-red-500 font-medium">
                    {discountRate}% 할인
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-through">
                  정가 {originalPrice.toLocaleString()}원
                </p>
              </div>

              {/* 정보 테이블 */}
              <div className="mx-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="flex border-b border-gray-100">
                  <div className="w-24 py-3 px-4 bg-gray-50 text-gray-500 text-sm">
                    유효기간
                  </div>
                  <div className="flex-1 py-3 px-4 text-red-500 text-sm font-medium">
                    {product.validUntil || "2025-03-15"} (-{product.dday}일
                    남음)
                  </div>
                </div>
                <div className="flex border-b border-gray-100">
                  <div className="w-24 py-3 px-4 bg-gray-50 text-gray-500 text-sm">
                    판매자
                  </div>
                  <div className="flex-1 py-3 px-4 text-gray-900 text-sm">
                    {product.seller}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 py-3 px-4 bg-gray-50 text-gray-500 text-sm">
                    거래방식
                  </div>
                  <div className="flex-1 py-3 px-4 text-sky-600 text-sm font-medium flex items-center gap-1">
                    <span className="text-red-500">🛡️</span> 안전결제 (에스크로)
                  </div>
                </div>
              </div>

              {/* 안전결제 안내 */}
              <div className="mx-4 mt-4 bg-red-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-500">🛡️</span>
                  <span className="font-bold text-gray-900">
                    안전결제로 거래됩니다
                  </span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 ml-6">
                  <li>결제금은 쌀먹닷컴이 안전하게 보관합니다</li>
                  <li>쿠폰 확인 후 구매확정하면 판매자에게 정산됩니다</li>
                  <li>문제 발생 시 3일 내 분쟁 신청 가능</li>
                  <li>3일 후 자동으로 구매확정 처리됩니다</li>
                </ul>
              </div>

              {/* 결제 금액 */}
              <div className="mx-4 mt-4 bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">상품가격</span>
                  <span className="text-gray-900">
                    {product.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">수수료</span>
                  <span className="text-sky-500">무료 (판매자 부담)</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-100 mt-2 pt-3">
                  <span className="font-bold text-gray-900">결제 금액</span>
                  <span className="font-bold text-gray-900">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => {
                    if (canBuy) {
                      setShowPaymentPopup(true);
                    } else {
                      setShowPurchaseFlow(false);
                      setChargeStep(1);
                      setChargeAmount(totalPrice - userStats.ssalmukCash);
                      setShowChargeModal(true);
                    }
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg ${
                    canBuy
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {canBuy
                    ? `${totalPrice.toLocaleString()}원 안전결제`
                    : "잔액 부족 - 충전하기"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 거래중 (결제 완료 후) */}
          {purchaseStep === 2 && (
            <div className="pb-24">
              {/* 거래중 배너 */}
              <div className="bg-amber-400 text-center py-4">
                <p className="text-xl font-bold text-white">거래중</p>
                <p className="text-amber-100 text-sm flex items-center justify-center gap-1">
                  <span>⏰</span> {autoConfirmTime} 후 자동확정
                </p>
              </div>

              {/* 쿠폰 바코드 카드 */}
              <div className="mx-4 mt-4 bg-amber-50 rounded-2xl p-5 border border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="text-2xl">☕</span>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <p className="font-bold text-gray-900">{product.name}</p>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <p className="text-emerald-600 font-medium flex items-center justify-center gap-1">
                    <span>🏷️</span> 쿠폰 바코드
                  </p>
                </div>

                {/* 바코드 */}
                <div className="bg-white rounded-xl p-4 mb-3">
                  <div className="flex justify-center items-end h-12 mb-2">
                    {/* 시작 */}
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    {/* 데이터 */}
                    <div
                      className="bg-gray-800"
                      style={{ width: 4, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 4 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 3, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 4, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 3, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    {/* 중앙 */}
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 4 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    {/* 데이터 */}
                    <div
                      className="bg-gray-800"
                      style={{ width: 3, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 4, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 4, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 2 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    {/* 끝 */}
                    <div
                      className="bg-gray-800"
                      style={{ width: 1, height: "100%" }}
                    />
                    <div style={{ width: 3 }} />
                    <div
                      className="bg-gray-800"
                      style={{ width: 2, height: "100%" }}
                    />
                  </div>
                  <p className="text-center text-gray-700 font-mono">
                    {product.barcode || "8801234567890"}
                  </p>
                </div>

                <p className="text-center text-gray-500 text-sm">
                  매장에서 바코드를 스캔하여 사용하세요
                </p>
              </div>

              {/* 거래 정보 */}
              <div className="mx-4 mt-4 bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-bold text-gray-900 mb-3">거래 정보</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">거래번호</span>
                    <span className="text-gray-700 text-sm font-mono">
                      {transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">판매자</span>
                    <span className="text-gray-900 text-sm">
                      {product.seller}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">결제금액</span>
                    <span className="text-gray-900 text-sm font-bold">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>

              {/* 거래 진행 타임라인 */}
              <div className="mx-4 mt-4 bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-bold text-gray-900 mb-4">거래 진행</h4>
                <div className="space-y-4">
                  {/* 결제 완료 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">💳</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">결제 완료</p>
                      <p className="text-xs text-gray-400">
                        {new Date().toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </div>
                  {/* 에스크로 보관중 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🔒</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        에스크로 보관중
                      </p>
                      <p className="text-xs text-gray-400">구매확정 대기</p>
                    </div>
                  </div>
                  {/* 구매 확정 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-400">구매 확정</p>
                    </div>
                  </div>
                  {/* 정산 완료 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-400 text-sm">💰</span>
                    </div>
                    <div>
                      <p className="text-gray-400">정산 완료</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100">
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDisputeModal(true)}
                    className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium"
                  >
                    분쟁신청
                  </button>
                  <button
                    onClick={() => setShowConfirmPopup(true)}
                    className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold"
                  >
                    구매확정
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 결제 확인 팝업 */}
        {showPaymentPopup && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
            onClick={() => setShowPaymentPopup(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-t-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">🛡️</span>
                  <h3 className="text-lg font-bold text-gray-900">안전결제</h3>
                </div>
                <button
                  onClick={() => setShowPaymentPopup(false)}
                  className="p-1"
                >
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
              <div className="px-4 py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <span className="text-2xl">☕</span>
                    )}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <p className="font-bold text-gray-900">{product.name}</p>
                  </div>
                </div>

                {/* 금액 정보 */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">상품금액</span>
                    <span className="text-gray-900">
                      {product.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">차감 예치금</span>
                    <span className="text-red-500">
                      -{product.price.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">결제 후 잔액</span>
                    <span className="text-gray-900">
                      {(userStats.ssalmukCash - product.price).toLocaleString()}
                      원
                    </span>
                  </div>
                </div>

                {/* 안내 */}
                <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-emerald-500">🛡️</span>
                    결제금은 구매확정 전까지 안전하게 보관됩니다
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-sky-500">📅</span>
                    3일 이내 구매확정 또는 분쟁신청을 해주세요
                  </p>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 p-4 border-t border-gray-100">
                <button
                  onClick={() => setShowPaymentPopup(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl font-medium"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setUserStats((prev) => ({
                      ...prev,
                      ssalmukCash: prev.ssalmukCash - totalPrice,
                      escrowCash: prev.escrowCash + totalPrice,
                    }));
                    setShowPaymentPopup(false);
                    setPurchaseStep(2);
                    // 토스트 표시
                    setToastMessage("결제 완료! 쿠폰함을 확인해 주세요.");
                    setShowPurchaseToast(true);
                    setTimeout(() => setShowPurchaseToast(false), 3000);
                  }}
                  className="flex-1 py-3 bg-sky-500 text-white rounded-xl font-bold"
                >
                  결제하기
                </button>
              </div>

              {/* 하단 여백 */}
              <div className="h-4" />
            </div>
          </div>
        )}

        {/* 구매확정 확인 팝업 */}
        {showConfirmPopup && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
            onClick={() => setShowConfirmPopup(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-t-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-100">
                <span className="text-emerald-500 text-xl">✓</span>
                <h3 className="text-lg font-bold text-gray-900">구매확정</h3>
              </div>

              {/* 본문 */}
              <div className="px-4 py-5">
                <p className="text-center text-gray-700 mb-4">
                  쿠폰을 정상적으로 확인하셨나요?
                </p>

                <div className="bg-amber-50 rounded-xl p-3 mb-5">
                  <p className="text-sm text-amber-700 text-center">
                    ⚠️ 구매확정 후에는 취소가 불가능하며,
                    <br />
                    판매자에게 대금이 즉시 정산됩니다.
                  </p>
                </div>

                {/* 구매평점 */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-3">
                    구매평점 <span className="text-red-500">*</span>
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setConfirmRating(star)}
                          className="transition-transform hover:scale-110 active:scale-95"
                        >
                          <svg
                            className={`w-10 h-10 ${star <= confirmRating ? "text-amber-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <span className="mt-2 text-lg font-medium text-gray-600">
                      {confirmRating}점
                    </span>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 p-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowConfirmPopup(false);
                    setConfirmRating(0);
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-600 font-medium rounded-xl"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setUserStats((prev) => ({
                      ...prev,
                      escrowCash: prev.escrowCash - product.price,
                      coupons: prev.coupons + 1,
                    }));
                    // 쿠폰함에 추가
                    setMyCoupons((prev) => [
                      ...prev,
                      {
                        id: Date.now(),
                        brand: product.brand,
                        name: product.name,
                        barcode: product.barcode || "8801234567890",
                        validUntil: product.validUntil || "2025.03.15",
                        status: "unused",
                        dday: product.dday,
                      },
                    ]);
                    // 팝업 닫고 모달 닫기
                    setShowConfirmPopup(false);
                    setConfirmRating(0);
                    setShowPurchaseFlow(false);
                    setPurchaseStep(1);
                    setSelectedProduct(null);
                    // 토스트 표시
                    setToastMessage("구매 확정 되었습니다.");
                    setShowPurchaseToast(true);
                    setTimeout(() => setShowPurchaseToast(false), 3000);
                  }}
                  className="flex-1 py-3 bg-sky-500 text-white font-bold rounded-xl"
                >
                  구매확정
                </button>
              </div>

              {/* 하단 여백 */}
              <div className="h-4" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const ChatModal = () => {
    const sendMessage = () => {
      if (!chatInput.trim()) return;
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "me",
          text: chatInput,
          time: timeStr,
        },
      ]);
      setChatInput("");
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-teal-500 text-white px-4 py-3 flex items-center">
          <button onClick={() => setShowChat(false)} className="p-1 mr-3">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <span className="font-bold text-orange-300">{chatPartner}</span>
            <span className="font-medium">님과의 대화</span>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>대화 내용이 없습니다</p>
              <p className="text-sm mt-1">메시지를 보내 대화를 시작하세요</p>
            </div>
          ) : (
            chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%]`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-amber-400 text-gray-900 rounded-tr-sm"
                        : "bg-white text-gray-900 rounded-tl-sm shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-400 mt-1 ${msg.sender === "me" ? "text-right" : ""}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 입력 영역 */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="메세지를 입력하세요..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DisputeModal = () => {
    const disputeReasons = [
      "이미 사용된 쿠폰입니다",
      "유효기간이 만료되었습니다",
      "바코드가 인식되지 않습니다",
      "상품 정보가 다릅니다",
      "기타",
    ];

    const handleSubmitDispute = () => {
      if (!disputeReason) return;
      setShowDisputeModal(false);
      setTransactionStatus("dispute");
      setShowTransactionDetail(true);
      setShowPurchaseFlow(false);
      // 2초간 토스트 표시
      setShowDisputeToast(true);
      setTimeout(() => {
        setShowDisputeToast(false);
      }, 2000);
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden">
          {/* 헤더 */}
          <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">분쟁신청</h3>
              <button
                onClick={() => setShowDisputeModal(false)}
                className="text-gray-400 hover:text-gray-600"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 내용 */}
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              문제가 발생한 사유를 선택해주세요
            </p>

            <div className="space-y-2">
              {disputeReasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => setDisputeReason(reason)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                    disputeReason === reason
                      ? "border-amber-400 bg-amber-50 text-amber-700"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {disputeReason === "기타" && (
              <textarea
                value={disputeEtcText}
                onChange={(e) => setDisputeEtcText(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
                className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-amber-400"
                rows={3}
              />
            )}

            <div className="bg-amber-50 rounded-xl p-3 mt-4">
              <p className="text-xs text-amber-700">
                ⚠️ 분쟁 접수 시 자동구매확정이 중지되며, 관리자 검토 후 결과를
                안내드립니다.
              </p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 p-4 border-t border-gray-100">
            <button
              onClick={() => setShowDisputeModal(false)}
              className="flex-1 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={handleSubmitDispute}
              disabled={!disputeReason}
              className={`flex-1 py-3 font-bold rounded-xl ${
                disputeReason
                  ? "bg-amber-400 text-white hover:bg-amber-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              분쟁신청
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TransactionDetailModal = () => {
    const product = selectedProduct;
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center">
          <button
            onClick={() => {
              setShowTransactionDetail(false);
              setTransactionStatus("trading");
              setDisputeReason("");
              setDisputeEtcText("");
            }}
            className="p-1 mr-3"
          >
            <span className="text-gray-600">← 뒤로</span>
          </button>
          <h3 className="text-lg font-bold text-gray-900">거래 상세</h3>
        </div>

        {/* 상태 배지 */}
        <div className="px-4 py-3 flex justify-center">
          <span
            className={`px-6 py-2 rounded-full font-bold ${
              transactionStatus === "dispute"
                ? "bg-red-100 text-red-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {transactionStatus === "dispute" ? "분쟁중" : "거래중"}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 상품 정보 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">{product.brand}</p>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
              </div>
            </div>
            <button
              onClick={() => {
                setChatPartner(product.seller || "판매자");
                setShowChat(true);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
            >
              문의하기
            </button>
          </div>

          {/* 쿠폰 바코드 */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">쿠폰 바코드</h4>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="h-16 bg-gray-900 rounded-lg mb-3 flex items-center justify-center">
                <div className="flex gap-0.5">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white"
                      style={{ height: Math.random() > 0.5 ? "48px" : "32px" }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-sm font-mono text-gray-700">
                {product.barcode}
              </p>
              <p className="text-center text-xs text-gray-500 mt-2">
                매장에서 바코드를 스캔하여 사용하세요
              </p>
            </div>
          </div>

          {/* 거래 정보 */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">거래 정보</h4>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">거래번호</span>
                <span className="text-gray-900 text-sm">tx1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">판매자</span>
                <span className="text-gray-900 text-sm">
                  {product.seller || "쌀먹고수"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">결제금액</span>
                <span className="text-gray-900 font-bold">
                  {product.price?.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* 분쟁 진행중 표시 */}
          {transactionStatus === "dispute" && (
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">⚠️</span>
                <div>
                  <p className="font-bold text-red-600 mb-1">분쟁 진행중</p>
                  <p className="text-sm text-red-500 mb-2">
                    {disputeReason || "기타"}
                  </p>
                  <p className="text-sm text-red-500">
                    문의하기를 통하여 해결을 해주세요
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    해결이 안될 시 쌀먹닷컴, 홈페이지 하단에
                    <br />
                    1:1 문의를 통해서 문의해주세요
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 분쟁 접수 토스트 */}
        {showDisputeToast && (
          <div className="absolute bottom-20 left-4 right-4 bg-emerald-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium">분쟁이 접수되었습니다</span>
          </div>
        )}
      </div>
    );
  };

  const SellFlowModal = () => {
    const [sellData, setSellData] = useState({
      brand: "",
      customBrand: "",
      name: "",
      barcode: "",
      barcodeImage: null,
      validUntil: "",
      originalPrice: "",
      price: "",
    });
    const [barcodeInputType, setBarcodeInputType] = useState("manual"); // 'manual' or 'image'
    const fee = sellData.price ? Math.round(Number(sellData.price) * 0.035) : 0;
    const settleAmount = sellData.price ? Number(sellData.price) - fee : 0;
    const actualBrand =
      sellData.brand === "기타" ? sellData.customBrand : sellData.brand;
    const isBarcodeValid =
      barcodeInputType === "manual" ? sellData.barcode : sellData.barcodeImage;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">쿠폰 등록하기</h3>
            <button
              onClick={() => {
                setShowSellFlow(false);
                setSellStep(1);
              }}
              className="p-1"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Step 1: 정보 입력 */}
            {sellStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    브랜드 *
                  </label>
                  <select
                    value={sellData.brand}
                    onChange={(e) =>
                      setSellData({
                        ...sellData,
                        brand: e.target.value,
                        customBrand: "",
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none bg-white"
                  >
                    <option value="">브랜드 선택</option>
                    <option value="스타벅스">스타벅스</option>
                    <option value="맥도날드">맥도날드</option>
                    <option value="CU">CU</option>
                    <option value="GS25">GS25</option>
                    <option value="배스킨라빈스">배스킨라빈스</option>
                    <option value="공차">공차</option>
                    <option value="버거킹">버거킹</option>
                    <option value="도미노피자">도미노피자</option>
                    <option value="기타">직접 입력하기</option>
                  </select>
                  {sellData.brand === "기타" && (
                    <input
                      type="text"
                      value={sellData.customBrand}
                      onChange={(e) =>
                        setSellData({
                          ...sellData,
                          customBrand: e.target.value,
                        })
                      }
                      placeholder="브랜드명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none mt-2"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={sellData.name}
                    onChange={(e) =>
                      setSellData({ ...sellData, name: e.target.value })
                    }
                    placeholder="예: 아메리카노 T"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    바코드 번호 *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setBarcodeInputType("manual")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        barcodeInputType === "manual"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      직접 입력
                    </button>
                    <button
                      onClick={() => setBarcodeInputType("image")}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        barcodeInputType === "image"
                          ? "bg-sky-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      이미지 첨부
                    </button>
                  </div>
                  {barcodeInputType === "manual" && (
                    <input
                      type="text"
                      value={sellData.barcode}
                      onChange={(e) =>
                        setSellData({ ...sellData, barcode: e.target.value })
                      }
                      placeholder="바코드 번호 입력"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none font-mono"
                    />
                  )}
                  {barcodeInputType === "image" && (
                    <div>
                      {sellData.barcodeImage ? (
                        <div className="relative">
                          <img
                            src={sellData.barcodeImage}
                            alt="바코드"
                            className="w-full h-40 object-contain border border-gray-200 rounded-xl bg-gray-50"
                          />
                          <button
                            onClick={() =>
                              setSellData({ ...sellData, barcodeImage: null })
                            }
                            className="absolute top-2 right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
                          <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-500">
                            바코드 이미지를 첨부해주세요
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file)
                                setSellData({
                                  ...sellData,
                                  barcodeImage: URL.createObjectURL(file),
                                });
                            }}
                          />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유효기한 *
                  </label>
                  <input
                    type="date"
                    value={sellData.validUntil}
                    onChange={(e) =>
                      setSellData({ ...sellData, validUntil: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() =>
                    actualBrand &&
                    sellData.name &&
                    isBarcodeValid &&
                    setSellStep(2)
                  }
                  disabled={!actualBrand || !sellData.name || !isBarcodeValid}
                  className={`w-full py-4 rounded-xl font-bold text-lg mt-2 ${
                    actualBrand && sellData.name && isBarcodeValid
                      ? "bg-sky-500 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  등록하기
                </button>
              </div>
            )}

            {/* Step 2: 가격 설정 */}
            {sellStep === 2 && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎁</span>
                    </div>
                    <div>
                      <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        {actualBrand}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-1">
                        {sellData.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    판매 가격 *
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-sky-500">
                    <input
                      type="number"
                      value={sellData.price}
                      onChange={(e) =>
                        setSellData({ ...sellData, price: e.target.value })
                      }
                      placeholder="0"
                      className="flex-1 outline-none text-xl font-bold"
                    />
                    <span className="text-gray-400">원</span>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4">
                  <h4 className="font-medium text-amber-700 mb-3 text-sm">
                    예상 정산 금액
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-amber-600">판매 가격</span>
                      <span className="font-medium">
                        {sellData.price
                          ? Number(sellData.price).toLocaleString()
                          : 0}
                        원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-600">수수료 (3.5%)</span>
                      <span className="font-medium text-red-500">
                        -{fee.toLocaleString()}원
                      </span>
                    </div>
                    <div className="border-t border-amber-200 pt-2 flex justify-between">
                      <span className="font-bold text-amber-700">
                        정산 예정액
                      </span>
                      <span className="font-bold text-amber-700">
                        {settleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => setSellStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                  >
                    이전
                  </button>
                  <button
                    onClick={() => sellData.price && setSellStep(3)}
                    disabled={!sellData.price}
                    className={`flex-1 py-3 font-bold rounded-xl ${
                      sellData.price
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    등록하기
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 등록 완료 */}
            {sellStep === 3 && (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  등록 완료!
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  구매자가 나타나면 알려드릴게요
                </p>

                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🎁</span>
                    </div>
                    <div>
                      <span className="text-xs text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        {actualBrand}
                      </span>
                      <h4 className="font-bold text-gray-900 mt-1 text-sm">
                        {sellData.name}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-sm border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">판매 가격</span>
                      <span className="font-medium text-sky-600">
                        {Number(sellData.price).toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">예상 정산액</span>
                      <span className="font-medium">
                        {settleAmount.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowSellFlow(false);
                    setSellStep(1);
                  }}
                  className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MyTradeModal = () => {
    const [buyingFilter, setBuyingFilter] = useState("all");
    const [showBuyingFilterPopup, setShowBuyingFilterPopup] = useState(false);
    const [sellingFilter, setSellingFilter] = useState("all");
    const [showSellingFilterPopup, setShowSellingFilterPopup] = useState(false);

    const buyingFilterOptions = [
      { key: "all", label: "전체" },
      { key: "trading", label: "거래중" },
      { key: "dispute", label: "분쟁중" },
      { key: "completed", label: "거래완료" },
    ];

    const sellingFilterOptions = [
      { key: "all", label: "전체" },
      { key: "waiting", label: "판매중" },
      { key: "trading", label: "거래중" },
      { key: "dispute", label: "분쟁중" },
      { key: "completed", label: "거래완료" },
    ];

    const getStatusBadge = (status) => {
      const badges = {
        waiting: { text: "판매중", color: "bg-emerald-100 text-emerald-700" },
        escrow: { text: "거래중", color: "bg-amber-100 text-amber-700" },
        dispute: { text: "분쟁중", color: "bg-red-100 text-red-700" },
        completed: { text: "거래완료", color: "bg-gray-100 text-gray-600" },
        settled: { text: "정산완료", color: "bg-sky-100 text-sky-700" },
      };
      return (
        badges[status] || { text: status, color: "bg-gray-100 text-gray-600" }
      );
    };

    // 필터링 함수
    const getFilteredBuyingTrades = () => {
      if (buyingFilter === "all") return myTrades.buying;
      if (buyingFilter === "trading")
        return myTrades.buying.filter((t) => t.status === "escrow");
      if (buyingFilter === "dispute")
        return myTrades.buying.filter((t) => t.status === "dispute");
      if (buyingFilter === "completed")
        return myTrades.buying.filter(
          (t) => t.status === "completed" || t.status === "settled",
        );
      return myTrades.buying;
    };

    const getFilteredSellingTrades = () => {
      if (sellingFilter === "all") return myTrades.selling;
      if (sellingFilter === "waiting")
        return myTrades.selling.filter((t) => t.status === "waiting");
      if (sellingFilter === "trading")
        return myTrades.selling.filter((t) => t.status === "escrow");
      if (sellingFilter === "dispute")
        return myTrades.selling.filter((t) => t.status === "dispute");
      if (sellingFilter === "completed")
        return myTrades.selling.filter(
          (t) => t.status === "completed" || t.status === "settled",
        );
      return myTrades.selling;
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => setShowMyTrade(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-bold text-gray-900">내 거래</h3>
          <div className="w-8"></div>
        </div>

        {/* 탭 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setMyTradeTab("buying")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                myTradeTab === "buying"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              구매 내역
            </button>
            <button
              onClick={() => setMyTradeTab("selling")}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                myTradeTab === "selling"
                  ? "bg-sky-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              판매 내역
            </button>
          </div>
        </div>

        {/* 필터 바 */}
        <div className="bg-white px-4 py-2 border-b border-gray-50">
          {myTradeTab === "buying" && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowBuyingFilterPopup(true)}
                className="flex items-center gap-1 text-sm text-gray-700"
              >
                <span className="font-medium">
                  {
                    buyingFilterOptions.find((f) => f.key === buyingFilter)
                      ?.label
                  }
                </span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                {getFilteredBuyingTrades().length}건
              </span>
            </div>
          )}
          {myTradeTab === "selling" && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowSellingFilterPopup(true)}
                className="flex items-center gap-1 text-sm text-gray-700"
              >
                <span className="font-medium">
                  {
                    sellingFilterOptions.find((f) => f.key === sellingFilter)
                      ?.label
                  }
                </span>
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                {getFilteredSellingTrades().length}건
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 구매 내역 */}
          {myTradeTab === "buying" && (
            <div className="space-y-3">
              {getFilteredBuyingTrades().length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">🛒</span>
                  <p className="mt-2">
                    {buyingFilter === "all"
                      ? "구매 내역이 없습니다"
                      : `${buyingFilterOptions.find((f) => f.key === buyingFilter)?.label} 내역이 없습니다`}
                  </p>
                </div>
              ) : (
                getFilteredBuyingTrades().map((trade) => {
                  const badge = getStatusBadge(trade.status);
                  return (
                    <div
                      key={trade.id}
                      className="bg-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-400">
                          {trade.date}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🎁</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-sky-600">
                            {trade.brand}
                          </span>
                          <h4 className="font-bold text-gray-900">
                            {trade.name}
                          </h4>
                          <p className="text-sky-600 font-bold mt-1">
                            {trade.price.toLocaleString()}원
                          </p>
                          <p className="text-xs text-gray-400">
                            판매자: {trade.seller}
                          </p>
                        </div>
                      </div>
                      {trade.status === "escrow" && (
                        <button className="w-full mt-3 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg">
                          쿠폰 확인하기
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* 판매 내역 */}
          {myTradeTab === "selling" && (
            <div className="space-y-3">
              {getFilteredSellingTrades().length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <span className="text-4xl">📦</span>
                  <p className="mt-2">
                    {sellingFilter === "all"
                      ? "판매 내역이 없습니다"
                      : `${sellingFilterOptions.find((f) => f.key === sellingFilter)?.label} 내역이 없습니다`}
                  </p>
                </div>
              ) : (
                getFilteredSellingTrades().map((trade) => {
                  const badge = getStatusBadge(trade.status);
                  return (
                    <div
                      key={trade.id}
                      className="bg-white rounded-2xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                        <span className="text-xs text-gray-400">
                          {trade.date}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🎁</span>
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-sky-600">
                            {trade.brand}
                          </span>
                          <h4 className="font-bold text-gray-900">
                            {trade.name}
                          </h4>
                          <p className="text-sky-600 font-bold mt-1">
                            {trade.price.toLocaleString()}원
                          </p>
                          {trade.buyer && (
                            <p className="text-xs text-gray-400">
                              구매자: {trade.buyer}
                            </p>
                          )}
                          {trade.status === "settled" && (
                            <p className="text-xs text-emerald-600">
                              정산액: {trade.settledAmount.toLocaleString()}원
                            </p>
                          )}
                        </div>
                      </div>
                      {trade.status === "escrow" && (
                        <button className="w-full mt-3 py-2 bg-amber-500 text-white text-sm font-medium rounded-lg">
                          쿠폰 전송하기
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* 구매내역 필터 하단 팝업 */}
        {showBuyingFilterPopup && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
            onClick={() => setShowBuyingFilterPopup(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-t-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">필터</h3>
                <button
                  onClick={() => setShowBuyingFilterPopup(false)}
                  className="p-1"
                >
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
              <div className="py-2">
                {buyingFilterOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setBuyingFilter(option.key);
                      setShowBuyingFilterPopup(false);
                    }}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className={`text-base ${buyingFilter === option.key ? "text-sky-500 font-bold" : "text-gray-700"}`}
                    >
                      {option.label}
                    </span>
                    {buyingFilter === option.key && (
                      <svg
                        className="w-5 h-5 text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="h-6" />
            </div>
          </div>
        )}

        {/* 판매내역 필터 하단 팝업 */}
        {showSellingFilterPopup && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] flex items-end justify-center"
            onClick={() => setShowSellingFilterPopup(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-t-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">필터</h3>
                <button
                  onClick={() => setShowSellingFilterPopup(false)}
                  className="p-1"
                >
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
              <div className="py-2">
                {sellingFilterOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      setSellingFilter(option.key);
                      setShowSellingFilterPopup(false);
                    }}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className={`text-base ${sellingFilter === option.key ? "text-sky-500 font-bold" : "text-gray-700"}`}
                    >
                      {option.label}
                    </span>
                    {sellingFilter === option.key && (
                      <svg
                        className="w-5 h-5 text-sky-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="h-6" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 토스트 메시지 - 하단 */}
      {showPurchaseToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[9999]">
          <div className="bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <span className="text-emerald-400 text-lg">✓</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
      {showPurchaseFlow && <PurchaseFlowModal />}
      {showChat && <ChatModal />}
      {showDisputeModal && <DisputeModal />}
      {showTransactionDetail && <TransactionDetailModal />}
      {showSellFlow && <SellFlowModal />}
      {showMyTrade && <MyTradeModal />}
    </>
  );
}
