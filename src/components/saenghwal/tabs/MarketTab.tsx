// @ts-nocheck
import { useState } from "react";
import MarketCard from "../cards/MarketCard";
import MyTradeContent from "./MyTradeContent";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function MarketTab({ ctx }: Props) {
  const {
    marketItems,
    marketTab,
    setMarketTab,
    setShowPurchaseFlow,
    setSelectedProduct,
    setPurchaseStep,
  } = ctx;

  const [marketSort, setMarketSort] = useState("latest");
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("전체");
  const [showEscrowGuide, setShowEscrowGuide] = useState(false);

  // 카드 클릭 시 바로 구매 플로우로 이동
  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setPurchaseStep(1);
    setShowPurchaseFlow(true);
  };

  const sortOptions = [
    { key: "latest", label: "최신순" },
    { key: "popular", label: "인기순" },
    { key: "lowPrice", label: "저가순" },
    { key: "highPrice", label: "고가순" },
  ];

  // 정렬 함수
  const getSortedItems = (items) => {
    const sorted = [...items];
    switch (marketSort) {
      case "latest":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );
      case "popular":
        return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      case "lowPrice":
        return sorted.sort((a, b) => a.price - b.price);
      case "highPrice":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  // 현재 탭의 아이템 필터링
  const getFilteredItems = () => {
    let items = marketItems;
    if (marketTab === "selling") {
      items = items.filter((item) => item.status === "available");
    } else if (marketTab === "sold") {
      items = items.filter((item) => item.status === "sold");
    }
    if (categoryFilter !== "전체") {
      items = items.filter((item) => item.category === categoryFilter);
    }
    return items;
  };

  const filteredItems = getFilteredItems();
  const sortedItems = getSortedItems(filteredItems);

  return (
    <>
      {/* 서브탭 */}
      <div className="bg-white px-4 pb-3 pt-1">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { key: "selling", label: "판매중" },
            { key: "sold", label: "판매완료" },
            { key: "myTrade", label: "내거래함" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setMarketTab(tab.key)}
              className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                marketTab === tab.key
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={
                marketTab === tab.key
                  ? { background: "#72C2FF" }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 판매중 / 판매완료 콘텐츠 */}
      {(marketTab === "selling" || marketTab === "sold") && (
        <>
          <div className="px-4 pb-2">
            {/* 에스크로 배너 */}
            <button
              onClick={() => setShowEscrowGuide(true)}
              className="w-full bg-gradient-to-r from-[#5AB0F0] to-[#72C2FF] rounded-2xl p-4 text-white mb-3 text-left"
            >
              <p className="text-xs opacity-80 mb-1">🔒 안전거래</p>
              <p className="font-bold text-lg">에스크로 결제로 안전하게!</p>
              <p className="text-sm opacity-90">클릭해서 자세히 알아보기</p>
            </button>

            {/* 카테고리 필터 */}
            <div className="flex gap-1.5 mb-2">
              {["전체", "기프티콘", "상품권"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-3 py-1 text-xs font-semibold rounded-full transition-all"
                  style={
                    categoryFilter === cat
                      ? { background: "#E8F4FD", border: "1.5px solid #72C2FF", color: "#4A9FD9" }
                      : { background: "#fff", border: "1.5px solid #e5e5e5", color: "#888" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 정렬 & 상품 개수 바 */}
            <div className="flex items-center justify-between py-2">
              <button
                onClick={() => setShowSortPopup(true)}
                className="flex items-center gap-1 text-sm text-gray-700"
              >
                <span className="font-medium">
                  {sortOptions.find((s) => s.key === marketSort)?.label}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-500">
                상품 <span className="font-medium text-gray-700">{filteredItems.length}</span>
              </span>
            </div>
          </div>

          {/* 상품 리스트 */}
          <div className="px-4 pb-24 space-y-3">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <MarketCard key={item.id} item={item} onItemClick={handleItemClick} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{marketTab === "selling" ? "🛒" : "📦"}</span>
                </div>
                <p className="text-gray-500">
                  {marketTab === "selling" ? "판매중인 상품이 없습니다" : "판매완료된 상품이 없습니다"}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ===== 내거래함 콘텐츠 ===== */}
      {marketTab === "myTrade" && <MyTradeContent />}

      {/* 정렬 하단 팝업 */}
      {showSortPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={() => setShowSortPopup(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">정렬</h3>
              <button onClick={() => setShowSortPopup(false)} className="p-1">
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

            {/* 정렬 옵션 */}
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    setMarketSort(option.key);
                    setShowSortPopup(false);
                  }}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`text-base ${marketSort === option.key ? "text-sky-500 font-bold" : "text-gray-700"}`}
                  >
                    {option.label}
                  </span>
                  {marketSort === option.key && (
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

            {/* 하단 여백 (safe area) */}
            <div className="h-6" />
          </div>
        </div>
      )}
      {/* 에스크로 안내 모달 */}
      {showEscrowGuide && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
          {/* 헤더 */}
          <div className="flex items-center px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
            <button onClick={() => setShowEscrowGuide(false)} className="p-1 mr-2">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-gray-900">에스크로 안전결제 안내</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* 상단 안내 카드 */}
            <div className="mx-4 mt-5 bg-amber-50 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">에스크로 안전결제</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                결제금액을 쌀먹닷컴이 안전하게 보관하고,<br />
                거래 완료 후 판매자에게 정산합니다.
              </p>
            </div>

            {/* 거래 진행 단계 */}
            <div className="px-4 mt-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">거래 진행 단계</h4>

              <div className="space-y-5">
                {[
                  { step: 1, icon: "🛒", title: "상품 선택 & 구매 요청", desc: "마음에 드는 기프티콘·상품권을 선택하고 구매 요청을 보냅니다." },
                  { step: 2, icon: "🏦", title: "결제금액 에스크로 보관", desc: "구매자가 결제하면 금액이 쌀먹닷컴 에스크로 계좌에 안전하게 보관됩니다. 판매자에게 바로 전달넘기지 않아요." },
                  { step: 3, icon: "📋", title: "코드 전달 & 확인", desc: "판매자가 기프티콘·상품권 코드를 전달하면, 구매자가 코드 사용 가능 여부를 확인합니다." },
                  { step: 4, icon: "✅", title: "구매 확정", desc: "코드가 정상 작동하면 구매자가 구매 확정을 누릅니다. 이때 에스크로 보관금이 판매자에게 정산됩니다." },
                  { step: 5, icon: "🔄", title: "문제 발생 시 환불", desc: "코드에 문제가 있으면 분쟁 신청을 통해 에스크로 보관금을 환불받을 수 있습니다." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{item.step}. {item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 꼭 알아두세요 */}
            <div className="mx-4 mt-6 mb-8 bg-amber-50 rounded-xl p-4">
              <p className="font-bold text-gray-900 text-sm mb-2">💡 꼭 알아두세요</p>
              <ul className="text-xs text-gray-600 space-y-1.5 leading-relaxed">
                <li>• 에스크로를 통하지 않는 직접 거래(계좌이체 등)는 사기 피해 보상이 불가합니다.</li>
                <li>• 구매 확정 전 반드시 코드 사용 가능 여부를 확인하세요.</li>
                <li>• 거래 완료 후 72시간 내 자동 구매 확정됩니다.</li>
                <li>• 분쟁 발생 시 쌀먹닷컴 고객센터에서 중재합니다.</li>
              </ul>
            </div>
          </div>

          {/* 하단 확인 버튼 */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => setShowEscrowGuide(false)}
              className="w-full py-3.5 bg-sky-500 text-white rounded-xl font-bold text-base hover:bg-sky-600 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}
