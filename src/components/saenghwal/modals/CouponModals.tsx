// @ts-nocheck
import { useState } from "react";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function CouponModals({ ctx }: Props) {
  const {
    showMyCoupon,
    setShowMyCoupon,
    myCoupons,
    setMyCoupons,
    couponTab,
    setCouponTab,
    couponSort,
    setCouponSort,
    selectedCoupon,
    setSelectedCoupon,
    userStats,
    setUserStats,
    showPurchaseFlow,
    setShowPurchaseFlow,
    purchaseStep,
    setPurchaseStep,
    selectedProduct,
    setSelectedProduct,
    isSeller,
    setIsSeller,
    showProductDetail,
    setShowProductDetail,
    marketItems,
    initialShowMyCoupon,
    goBack,
    setShowMyTrade,
  } = ctx;

  const MyCouponModal = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddCoupon, setShowAddCoupon] = useState(false);
    const [barcodeInputType, setBarcodeInputType] = useState(""); // 'manual' or 'image'
    const [showBarcodePopup, setShowBarcodePopup] = useState(false);
    const [showUseConfirm, setShowUseConfirm] = useState(false);
    const [confirmCoupon, setConfirmCoupon] = useState(null); // 확인할 쿠폰
    const [couponFormData, setCouponFormData] = useState({
      brand: "",
      customBrand: "",
      name: "",
      barcode: "",
      validUntil: "",
      barcodeImage: null,
    });

    // 필터링된 쿠폰
    const getFilteredCoupons = () => {
      let filtered = [...myCoupons];

      // 탭 필터
      if (couponTab === "unused") {
        filtered = filtered.filter((c) => c.status === "unused");
      } else if (couponTab === "used") {
        filtered = filtered.filter((c) => c.status === "used");
      } else if (couponTab === "myTrade") {
        filtered = filtered.filter(
          (c) => c.tradeStatus === "trading" || c.tradeStatus === "sold",
        );
      }

      // 검색 필터
      if (searchQuery) {
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.brand.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // 정렬
      if (couponSort === "latest") {
        filtered.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate),
        );
      } else if (couponSort === "expiringSoon") {
        filtered.sort((a, b) => a.dday - b.dday);
      } else if (couponSort === "expiringLate") {
        filtered.sort((a, b) => b.dday - a.dday);
      }

      return filtered;
    };

    const filteredCoupons = getFilteredCoupons();
    const unusedCount = myCoupons.filter((c) => c.status === "unused").length;
    const usedCount = myCoupons.filter((c) => c.status === "used").length;
    const myTradeCount = myCoupons.filter(
      (c) => c.tradeStatus === "trading" || c.tradeStatus === "sold",
    ).length;

    // 쿠폰 사용완료/미사용 확인 팝업 표시
    const handleUseCoupon = (coupon) => {
      setConfirmCoupon(coupon);
      setShowUseConfirm(true);
    };

    // 실제 쿠폰 상태 변경 처리
    const confirmUseCoupon = () => {
      if (!confirmCoupon) return;

      const newStatus = confirmCoupon.status === "unused" ? "used" : "unused";

      setMyCoupons((prev) =>
        prev.map((c) =>
          c.id === confirmCoupon.id
            ? {
                ...c,
                status: newStatus,
                usedDate:
                  newStatus === "used"
                    ? new Date().toISOString().split("T")[0].replace(/-/g, ".")
                    : null,
              }
            : c,
        ),
      );
      setSelectedCoupon(null);
      setShowUseConfirm(false);
      setConfirmCoupon(null);
    };

    // 쿠폰 삭제
    const handleDeleteCoupon = (couponId, e) => {
      if (e) e.stopPropagation();
      const coupon = myCoupons.find((c) => c.id === couponId);
      setMyCoupons((prev) => prev.filter((c) => c.id !== couponId));
      if (coupon?.status === "unused") {
        setUserStats((prev) => ({ ...prev, coupons: prev.coupons - 1 }));
      }
      setSelectedCoupon(null);
    };

    // D-day 색상
    const getDdayColor = (dday) => {
      if (dday <= 3) return "text-red-500 bg-red-50";
      if (dday <= 7) return "text-amber-500 bg-amber-50";
      return "text-gray-500 bg-gray-100";
    };

    // 바코드 시각화 - 고정 패턴
    const BarcodeVisual = ({ large = false }) => {
      const height = large ? 60 : 40;

      return (
        <div className="flex justify-center items-end" style={{ height }}>
          {/* 시작 */}
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          {/* 데이터 */}
          <div className="bg-gray-800" style={{ width: 4, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 4 }} />
          <div className="bg-gray-800" style={{ width: 3, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 4, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 3, height: "100%" }} />
          <div style={{ width: 3 }} />
          {/* 중앙 */}
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 4 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          {/* 데이터 */}
          <div className="bg-gray-800" style={{ width: 3, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 4, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 4, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 2 }} />
          <div className="bg-gray-800" style={{ width: 3, height: "100%" }} />
          <div style={{ width: 3 }} />
          {/* 끝 */}
          <div className="bg-gray-800" style={{ width: 1, height: "100%" }} />
          <div style={{ width: 3 }} />
          <div className="bg-gray-800" style={{ width: 2, height: "100%" }} />
        </div>
      );
    };

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 - 심플하게 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (initialShowMyCoupon && goBack) {
                  goBack();
                } else {
                  setShowMyCoupon(false);
                }
              }}
              className="p-1 -ml-1"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
            <h3 className="text-lg font-bold text-gray-900">내 쿠폰함</h3>
            <button
              onClick={() => setShowAddCoupon(true)}
              className="px-3 py-1.5 border border-sky-500 text-sky-500 text-sm font-medium rounded-lg hover:bg-sky-50 transition-colors"
            >
              쿠폰등록
            </button>
          </div>
        </div>

        {/* 탭 - 큰 버튼 스타일 */}
        <div className="bg-white px-4 py-3">
          <div className="flex gap-2">
            {[
              { key: "unused", label: "사용전", count: unusedCount },
              { key: "used", label: "사용완료", count: usedCount },
              { key: "myTrade", label: "내거래", count: myTradeCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  if (tab.key === "myTrade") {
                    setShowMyTrade(true);
                  } else {
                    setCouponTab(tab.key);
                  }
                }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  couponTab === tab.key && tab.key !== "myTrade"
                    ? "bg-sky-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.label}{" "}
                <span
                  className={
                    couponTab === tab.key && tab.key !== "myTrade"
                      ? "text-sky-100"
                      : "text-gray-400"
                  }
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 검색 & 정렬 - 한 줄로 */}
        <div className="bg-gray-50 px-4 py-2 flex items-center gap-2">
          <div className="flex-1 relative">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="브랜드, 상품명 검색"
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500"
            />
          </div>
          <select
            value={couponSort}
            onChange={(e) => setCouponSort(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none"
          >
            <option value="expiringSoon">임박순</option>
            <option value="latest">최신순</option>
            <option value="expiringLate">여유순</option>
          </select>
        </div>

        {/* 쿠폰 목록 - 리스트 형태 */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎫</span>
              </div>
              <p className="text-gray-500 mb-2">쿠폰이 없습니다</p>
              <button
                onClick={() => setShowAddCoupon(true)}
                className="text-sky-500 text-sm font-medium"
              >
                + 쿠폰 등록하기
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  onClick={() => setSelectedCoupon(coupon)}
                  className={`rounded-2xl overflow-hidden shadow-lg ${
                    coupon.status === "used" ? "opacity-60" : ""
                  }`}
                >
                  {/* 외곽 그라데이션 */}
                  <div className="bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50 p-1 rounded-2xl">
                    <div className="bg-white rounded-xl overflow-hidden">
                      {/* 상단 헤더 */}
                      <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-lg">
                            {coupon.brandLogo}
                          </div>
                          <span className="font-bold text-gray-800">
                            {coupon.brand}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (coupon.tradeStatus === "trading") {
                                const productData = {
                                  id: coupon.id,
                                  brand: coupon.brand,
                                  name: coupon.name,
                                  price: coupon.price,
                                  originalPrice: coupon.price,
                                  discount: 0,
                                  dday: coupon.dday,
                                  barcode: coupon.barcode,
                                  validUntil: coupon.validUntil,
                                  seller: coupon.seller || "판매자",
                                  buyer: coupon.buyer || "구매자",
                                  rating: 5,
                                  trades: 0,
                                  status: "available",
                                };
                                setSelectedProduct(productData);
                                setIsSeller(coupon.source === "내가 판매");
                                setPurchaseStep(3);
                                setShowPurchaseFlow(true);
                                setShowMyCoupon(false);
                              } else {
                                const matchedProduct = marketItems.find(
                                  (item) =>
                                    item.brand === coupon.brand ||
                                    item.name.includes(
                                      coupon.name.replace("(HOT)", "").trim(),
                                    ),
                                );
                                if (matchedProduct) {
                                  setSelectedProduct(matchedProduct);
                                  setShowProductDetail(matchedProduct);
                                } else {
                                  setShowProductDetail({
                                    id: coupon.id,
                                    brand: coupon.brand,
                                    name: coupon.name,
                                    price: coupon.price,
                                    originalPrice: coupon.price,
                                    discount: 0,
                                    dday: coupon.dday,
                                    barcode: coupon.barcode,
                                    validUntil: coupon.validUntil,
                                    seller: coupon.seller || "판매자",
                                    rating: 5,
                                    trades: 0,
                                    status:
                                      coupon.tradeStatus === "sold"
                                        ? "sold"
                                        : "available",
                                  });
                                }
                                setShowMyCoupon(false);
                              }
                            }}
                            className="px-3 py-1 bg-sky-100 text-sky-600 text-xs font-medium rounded-full border border-sky-200"
                          >
                            상품바로가기
                          </button>
                          {coupon.status === "unused" ? (
                            <span className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-amber-300 shadow-sm">
                              D-{coupon.dday}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded-full">
                              사용완료
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 상품명 */}
                      <div className="px-4 pb-3">
                        <h4 className="text-xl font-bold text-sky-600">
                          {coupon.name}
                        </h4>
                      </div>

                      {/* 바코드 영역 */}
                      <div className="mx-4 mb-4 bg-gray-100 rounded-xl p-4 text-center">
                        <BarcodeVisual />
                        <p className="text-lg font-mono text-gray-700 tracking-wider mt-2">
                          {coupon.barcode}
                        </p>
                      </div>

                      {/* 하단 액션 */}
                      <div className="px-4 py-3 bg-sky-50 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          ~{coupon.validUntil}
                        </span>
                        {coupon.status === "unused" && (
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseCoupon(coupon);
                              }}
                              className="px-3 py-1.5 bg-sky-500 text-white text-sm rounded-lg flex items-center gap-1"
                            >
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
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              사용완료
                            </button>
                            <button
                              onClick={(e) => handleDeleteCoupon(coupon.id, e)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-sm rounded-lg flex items-center gap-1"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              삭제
                            </button>
                          </div>
                        )}
                        {coupon.status === "used" && (
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseCoupon(coupon);
                              }}
                              className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg flex items-center gap-1 border border-gray-300"
                            >
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
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                              미사용 전환
                            </button>
                            <button
                              onClick={(e) => handleDeleteCoupon(coupon.id, e)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-sm rounded-lg flex items-center gap-1"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 쿠폰 상세 모달 - 바코드 풀스크린 */}
        {selectedCoupon && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
            {/* 헤더 */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-3 flex items-center justify-between">
              <button onClick={() => setSelectedCoupon(null)} className="p-1">
                <svg
                  className="w-6 h-6 text-gray-600"
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
              <span className="text-sm text-gray-500">쿠폰 상세</span>
              <div className="w-6"></div>
            </div>

            {/* 브랜드 & 상품명 */}
            <div className="bg-gradient-to-b from-gray-50 to-white px-6 pt-6 pb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
                <span className="text-xl">{selectedCoupon.brandLogo}</span>
                <span className="text-sm font-medium text-gray-600">
                  {selectedCoupon.brand}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCoupon.name}
              </h2>
            </div>

            {/* 바코드 영역 - 크게 */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6">
              <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="bg-white p-4">
                  <BarcodeVisual large={true} />
                </div>
                <p className="text-center text-xl font-mono tracking-widest text-gray-800 mt-4">
                  {selectedCoupon.barcode}
                </p>
              </div>

              {/* 밝기 안내 */}
              <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-amber-50 rounded-full">
                <span className="text-amber-500">☀️</span>
                <span className="text-sm text-amber-700">
                  바코드 사용 시 화면을 밝게 해주세요
                </span>
              </div>

              {/* 사용기간 */}
              <div className="w-full mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">사용기간</span>
                  {selectedCoupon.status === "unused" && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDdayColor(selectedCoupon.dday)}`}
                    >
                      D-{selectedCoupon.dday}
                    </span>
                  )}
                </div>
                <p className="font-medium text-gray-900">
                  {selectedCoupon.validFrom} ~ {selectedCoupon.validUntil}
                </p>
              </div>

              {/* 추가 정보 */}
              <div className="w-full mt-3 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">구매일</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCoupon.purchaseDate}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">구매처</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedCoupon.source}
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="p-4 border-t border-gray-100 bg-white">
              {selectedCoupon.status === "unused" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDeleteCoupon(selectedCoupon.id)}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => handleUseCoupon(selectedCoupon)}
                    className="flex-[2] py-3.5 bg-sky-500 text-white font-bold rounded-xl"
                  >
                    사용완료 처리
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleDeleteCoupon(selectedCoupon.id)}
                    className="flex-1 py-3.5 bg-gray-100 text-gray-700 font-medium rounded-xl"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => handleUseCoupon(selectedCoupon)}
                    className="flex-[2] py-3.5 bg-gray-100 text-gray-700 font-bold rounded-xl border border-gray-300"
                  >
                    미사용 전환
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 쿠폰 등록 모달 */}
        {showAddCoupon && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCoupon(false)}
          >
            <div
              className="bg-white w-full max-w-md rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  쿠폰 등록하기
                </h3>
                <button
                  onClick={() => {
                    setShowAddCoupon(false);
                    setBarcodeInputType("");
                    setShowBarcodePopup(false);
                    setCouponFormData({
                      brand: "",
                      customBrand: "",
                      name: "",
                      barcode: "",
                      validUntil: "",
                      barcodeImage: null,
                    });
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

              {/* 폼 */}
              <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* 브랜드 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    브랜드 *
                  </label>
                  <select
                    value={couponFormData.brand}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        brand: e.target.value,
                        customBrand: "",
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="">브랜드 선택</option>
                    <option value="스타벅스">스타벅스</option>
                    <option value="CU">CU</option>
                    <option value="GS25">GS25</option>
                    <option value="메가MGC커피">메가MGC커피</option>
                    <option value="맥도날드">맥도날드</option>
                    <option value="배스킨라빈스">배스킨라빈스</option>
                    <option value="버거킹">버거킹</option>
                    <option value="기타">직접 입력하기</option>
                  </select>
                  {couponFormData.brand === "기타" && (
                    <input
                      type="text"
                      value={couponFormData.customBrand}
                      onChange={(e) =>
                        setCouponFormData({
                          ...couponFormData,
                          customBrand: e.target.value,
                        })
                      }
                      placeholder="브랜드명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500 mt-2"
                    />
                  )}
                </div>

                {/* 상품명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    상품명 *
                  </label>
                  <input
                    type="text"
                    value={couponFormData.name}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        name: e.target.value,
                      })
                    }
                    placeholder="예: 아메리카노 T"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* 바코드 번호 - 버튼 클릭 시 팝업 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    바코드 번호 *
                  </label>

                  {/* 입력 방식 버튼 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setBarcodeInputType("manual");
                        setShowBarcodePopup(true);
                      }}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all border border-gray-300 bg-white text-gray-700 hover:border-sky-500 hover:text-sky-500 flex items-center justify-center gap-2"
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
                          strokeWidth={1.5}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      직접 입력
                    </button>
                    <button
                      onClick={() => {
                        setBarcodeInputType("image");
                        setShowBarcodePopup(true);
                      }}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all border border-gray-300 bg-white text-gray-700 hover:border-sky-500 hover:text-sky-500 flex items-center justify-center gap-2"
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
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      이미지 첨부
                    </button>
                  </div>

                  {/* 쿠폰 미리보기 카드 */}
                  {(couponFormData.barcode || couponFormData.barcodeImage) && (
                    <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
                      {/* 외곽 그라데이션 */}
                      <div className="bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50 p-1 rounded-2xl">
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* 상단 헤더 */}
                          <div className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-lg">
                                {couponFormData.brand === "스타벅스"
                                  ? "☕"
                                  : couponFormData.brand === "CU"
                                    ? "🏪"
                                    : couponFormData.brand === "GS25"
                                      ? "🏪"
                                      : couponFormData.brand === "메가MGC커피"
                                        ? "☕"
                                        : couponFormData.brand === "맥도날드"
                                          ? "🍔"
                                          : couponFormData.brand ===
                                              "배스킨라빈스"
                                            ? "🍨"
                                            : couponFormData.brand === "버거킹"
                                              ? "🍔"
                                              : "🎁"}
                              </div>
                              <span className="font-bold text-gray-800">
                                {couponFormData.brand === "기타"
                                  ? couponFormData.customBrand || "브랜드"
                                  : couponFormData.brand || "브랜드"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-sky-100 text-sky-600 text-xs font-medium rounded-full border border-sky-200">
                                상품바로가기
                              </span>
                              {couponFormData.validUntil && (
                                <span className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold border-2 border-amber-300 shadow-sm">
                                  D-
                                  {Math.max(
                                    0,
                                    Math.ceil(
                                      (new Date(
                                        couponFormData.validUntil,
                                      ).getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24),
                                    ),
                                  )}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 상품명 */}
                          <div className="px-4 pb-3">
                            <h4 className="text-xl font-bold text-sky-600">
                              {couponFormData.name || "상품명"}
                            </h4>
                          </div>

                          {/* 바코드 영역 */}
                          <div className="mx-4 mb-4 bg-gray-100 rounded-xl p-4 text-center">
                            {couponFormData.barcodeImage ? (
                              <img
                                src={couponFormData.barcodeImage}
                                alt="바코드"
                                className="w-full h-16 object-contain mb-2"
                              />
                            ) : (
                              <BarcodeVisual />
                            )}
                            <p className="text-lg font-mono text-gray-700 tracking-wider">
                              {couponFormData.barcode || "0000-0000-0000"}
                            </p>
                          </div>

                          {/* 하단 액션 */}
                          <div className="px-4 py-3 bg-sky-50 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              ~
                              {couponFormData.validUntil
                                ? new Date(couponFormData.validUntil)
                                    .toLocaleDateString("ko-KR", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                    })
                                    .replace(/\. /g, ".")
                                    .replace(".", "")
                                : "0000.00.00"}
                            </span>
                            <button
                              onClick={() =>
                                setCouponFormData({
                                  ...couponFormData,
                                  barcode: "",
                                  barcodeImage: null,
                                })
                              }
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-sm rounded-lg flex items-center gap-1"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 바코드 입력 팝업 - 이미지 스타일 */}
                {showBarcodePopup && (
                  <div
                    className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center px-3"
                    onClick={() => setShowBarcodePopup(false)}
                  >
                    <div
                      className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* 배경 그라데이션 */}
                      <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-white p-1">
                        <div className="bg-white rounded-xl p-4 space-y-3">
                          {/* Row 1: 쿠폰 이름 + 유효기간 */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponFormData.name}
                              onChange={(e) =>
                                setCouponFormData({
                                  ...couponFormData,
                                  name: e.target.value,
                                })
                              }
                              placeholder="필수 : 쿠폰 이름"
                              className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm"
                            />
                            <input
                              type="text"
                              value={couponFormData.validUntil}
                              onChange={(e) =>
                                setCouponFormData({
                                  ...couponFormData,
                                  validUntil: e.target.value,
                                })
                              }
                              placeholder="유효기간"
                              onFocus={(e) => (e.target.type = "date")}
                              onBlur={(e) => {
                                if (!e.target.value) e.target.type = "text";
                              }}
                              className="w-24 px-2 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm text-center"
                            />
                          </div>

                          {/* Row 2: 라디오 버튼 */}
                          <div className="flex items-center justify-center gap-4">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="inputType"
                                checked={barcodeInputType === "manual"}
                                onChange={() => setBarcodeInputType("manual")}
                                className="w-4 h-4 text-sky-500 accent-sky-500"
                              />
                              <span className="text-sm text-gray-700">
                                PIN 번호 입력
                              </span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="inputType"
                                checked={barcodeInputType === "image"}
                                onChange={() => setBarcodeInputType("image")}
                                className="w-4 h-4 text-sky-500 accent-sky-500"
                              />
                              <span className="text-sm text-gray-700">
                                쿠폰 이미지 등록
                              </span>
                            </label>
                          </div>

                          {/* Row 3: PIN 입력 또는 이미지 업로드 + 버튼 */}
                          {barcodeInputType === "image" ? (
                            <div className="space-y-2">
                              {/* 이미지 업로드 영역 */}
                              {couponFormData.barcodeImage ? (
                                <div className="relative">
                                  <img
                                    src={couponFormData.barcodeImage}
                                    alt="쿠폰 이미지"
                                    className="w-full h-28 object-contain border border-gray-200 rounded-lg bg-gray-50"
                                  />
                                  <button
                                    onClick={() =>
                                      setCouponFormData({
                                        ...couponFormData,
                                        barcodeImage: null,
                                      })
                                    }
                                    className="absolute top-2 right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                  <svg
                                    className="w-7 h-7 text-gray-400 mb-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span className="text-xs text-gray-500">
                                    이미지 첨부
                                  </span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        setCouponFormData({
                                          ...couponFormData,
                                          barcodeImage:
                                            URL.createObjectURL(file),
                                        });
                                      }
                                    }}
                                  />
                                </label>
                              )}
                              {/* 등록 버튼 */}
                              <button
                                onClick={() => setShowBarcodePopup(false)}
                                className="w-full py-2.5 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors text-sm"
                              >
                                쿠폰 등록하기
                              </button>
                              <p className="text-xs text-gray-400 text-center">
                                이미지를 등록하시면 쿠폰이 생성됩니다.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {/* PIN 입력 + 버튼 */}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={couponFormData.barcode}
                                  onChange={(e) =>
                                    setCouponFormData({
                                      ...couponFormData,
                                      barcode: e.target.value,
                                    })
                                  }
                                  placeholder="필수 : PIN 번호"
                                  className="flex-1 min-w-0 px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-sky-500 text-sm font-mono"
                                  autoFocus
                                />
                                <button
                                  onClick={() => setShowBarcodePopup(false)}
                                  className="px-3 py-2.5 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors whitespace-nowrap text-sm shrink-0"
                                >
                                  쿠폰 등록하기
                                </button>
                              </div>
                              <p className="text-xs text-gray-400 text-center">
                                PIN 번호를 등록하시면 쿠폰이 생성됩니다.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 유효기한 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    유효기한 *
                  </label>
                  <input
                    type="date"
                    value={couponFormData.validUntil}
                    onChange={(e) =>
                      setCouponFormData({
                        ...couponFormData,
                        validUntil: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                {/* 등록 버튼 */}
                <button
                  onClick={() => {
                    setShowAddCoupon(false);
                    setBarcodeInputType("");
                    setShowBarcodePopup(false);
                    setCouponFormData({
                      brand: "",
                      customBrand: "",
                      name: "",
                      barcode: "",
                      validUntil: "",
                      barcodeImage: null,
                    });
                  }}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 사용완료/미사용 확인 팝업 */}
        {showUseConfirm && confirmCoupon && (
          <div
            className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center px-4"
            onClick={() => {
              setShowUseConfirm(false);
              setConfirmCoupon(null);
            }}
          >
            <div
              className="bg-white w-full max-w-[300px] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-sky-100 flex items-center justify-center">
                  {confirmCoupon.status === "unused" ? (
                    <svg
                      className="w-7 h-7 text-sky-500"
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
                  ) : (
                    <svg
                      className="w-7 h-7 text-sky-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  )}
                </div>
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {confirmCoupon.status === "unused"
                    ? "사용완료한 쿠폰으로 변경하시겠습니까?"
                    : "미사용 쿠폰으로 변경하시겠습니까?"}
                </p>
                <p className="text-sm text-gray-500">
                  {confirmCoupon.brand} - {confirmCoupon.name}
                </p>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowUseConfirm(false);
                    setConfirmCoupon(null);
                  }}
                  className="flex-1 py-4 text-gray-600 font-medium border-r border-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={confirmUseCoupon}
                  className="flex-1 py-4 text-sky-500 font-bold"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <>{showMyCoupon && <MyCouponModal />}</>;
}
