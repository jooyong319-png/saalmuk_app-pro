import { useState, useRef } from "react";
import type { Coupon, DiscountItem } from "./types";
import PaymentFlowModal from "./PaymentFlow";

interface CouponDetailPanelProps {
  coupon: Coupon;
  likedCoupons: number[];
  alertCoupons: number[];
  onToggleLike: (id: number) => void;
  onToggleAlert: (id: number) => void;
  onBack: () => void;
  onToast: (msg: string) => void;
  initialDetailTab?: "할인쿠폰" | "고정쿠폰";
}

function calcDiscountedPrice(original: number, discount: number) {
  return Math.floor((original * (100 - discount)) / 100 / 10) * 10;
}

function DiscountItemCard({
  item,
  onBuy,
}: {
  item: DiscountItem;
  onBuy: () => void;
}) {
  const discountedPrice = calcDiscountedPrice(
    item.originalPrice,
    item.discount,
  );
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center gap-4 px-5 pt-5 pb-4">
        <div className="w-20 h-20 rounded-2xl bg-[#2D2D2D] flex items-center justify-center flex-shrink-0">
          <svg
            className="w-10 h-10 text-white opacity-80"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.5 2.5c0 1.5-1.5 5-1.5 5h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 9c-1.1 0-2 .9-2 2v1l-5 5 1.5 1.5 5-5h1l5 5 1.5-1.5-5-5v-1c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#1A1A2E] text-[16px]">
              {item.name}
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                item.type === "UID"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-orange-100 text-orange-500"
              }`}
            >
              {item.type}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{item.description}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-[13px] font-bold text-red-500">
              -{item.discount}%
            </span>
            <span className="text-[13px] text-gray-400 line-through">
              {item.originalPrice.toLocaleString()}원
            </span>
          </div>
          <span className="text-[18px] font-extrabold text-[#1A1A2E]">
            {discountedPrice.toLocaleString()}원
          </span>
        </div>
      </div>
      <div className="px-5 pb-5">
        <button
          onClick={onBuy}
          className="w-full py-3.5 rounded-xl bg-[#72C2FF] text-white font-bold text-[15px] hover:bg-[#5BA8E6] transition-colors"
        >
          바로구매
        </button>
      </div>
    </div>
  );
}

function BannerImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{ height: "300px" }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 40) next();
        else if (diff < -40) prev();
      }}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{ width: `${100 / images.length}%` }}
            className="h-full flex-shrink-0"
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
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
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
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
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const reportReasons = [
  "쿠폰번호가 맞지 않음",
  "장난으로 올린것 같음",
  "기간이 만료됨",
  "보상이 틀리네요",
];

export default function CouponDetailPanel({
  coupon,
  likedCoupons,
  alertCoupons,
  onToggleLike,
  onToggleAlert,
  onBack,
  onToast,
  initialDetailTab = "고정쿠폰",
}: CouponDetailPanelProps) {
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [expandDesc, setExpandDesc] = useState(false);
  const [detailTab, setDetailTab] = useState<"할인쿠폰" | "고정쿠폰">(
    initialDetailTab,
  );
  const [paymentItem, setPaymentItem] = useState<DiscountItem | null>(null);

  const isLiked = likedCoupons.includes(coupon.id);
  const isAlerted = alertCoupons.includes(coupon.id);
  const hasDiscountItems = !!(
    coupon.discountItems && coupon.discountItems.length > 0
  );
  const maxDiscount = hasDiscountItems
    ? Math.max(...(coupon.discountItems ?? []).map((d) => d.discount))
    : 0;

  return (
    <div className="bg-white min-h-full">
      {/* 상단 브레드크럼 */}
      <div className="flex items-center gap-2 px-2 py-4 border-b border-gray-100 sticky top-[60px] bg-white">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          목록으로
        </button>
        <span className="text-gray-300 text-sm">/</span>
        <span className="text-sm text-gray-700 font-medium">{coupon.name}</span>
      </div>

      {/* 2단 레이아웃 */}
      <div className="flex gap-0 min-h-[calc(100vh-120px)]">
        {/* ── 왼쪽 사이드바 (고정) ── */}
        <aside
          className="w-64 flex-shrink-0 border-r border-gray-100 flex flex-col"
          style={{ position: "sticky", top: "120px", alignSelf: "flex-start" }}
        >
          {/* 게임 이미지 */}
          <div className="p-5 pb-0">
            <div className="relative">
              <img
                src={coupon.image}
                alt={coupon.name}
                className="w-full aspect-square rounded-2xl object-cover border border-gray-100"
              />
              {hasDiscountItems && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
                  최대 {maxDiscount}% 할인
                </div>
              )}
            </div>
          </div>

          {/* 게임 정보 */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-xs text-gray-400 mb-0.5">{coupon.description}</p>
            <h2 className="text-[18px] font-extrabold text-[#1A1A2E] leading-tight">
              {coupon.name}
            </h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                {coupon.genre}
              </span>
            </div>
          </div>

          {/* 즐겨찾기 / 알림 버튼 */}
          <div className="px-5 pt-2 pb-4 flex gap-2">
            <button
              onClick={() => {
                onToggleLike(coupon.id);
                onToast(
                  isLiked
                    ? "즐겨찾기가 해제되었습니다."
                    : "즐겨찾기가 설정되었습니다.",
                );
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              즐겨찾기
            </button>
            <button
              onClick={() => {
                onToggleAlert(coupon.id);
                onToast(
                  isAlerted
                    ? "푸쉬알람이 해제되었습니다."
                    : "푸쉬알람이 설정되었습니다.",
                );
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                isAlerted
                  ? "bg-yellow-50 border-yellow-200 text-yellow-500"
                  : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={isAlerted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              알림
            </button>
          </div>

        </aside>

        {/* ── 오른쪽 콘텐츠 ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 탭 sticky */}
          {hasDiscountItems && (
            <div className="sticky top-[60px] z-20 bg-white border-b border-gray-100 flex">
              {(["할인쿠폰", "고정쿠폰"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDetailTab(tab)}
                  className={`px-6 py-3.5 text-sm font-medium transition-colors ${
                    detailTab === tab
                      ? "text-[#72C2FF] border-b-2 border-[#72C2FF]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* ── 고정쿠폰 탭 ── */}
          {detailTab === "고정쿠폰" && (
            <div>
              {/* 배너 슬라이더 */}
              <div className="p-5 pb-4">
                <BannerImageSlider
                  images={coupon.bannerImages || [coupon.image]}
                  alt={coupon.name}
                />
                <div className="mt-4">
                  <div
                    className={`overflow-hidden transition-all duration-300 ${!expandDesc ? "max-h-[3rem]" : "max-h-[600px]"}`}
                  >
                    <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{`${coupon.name}은(는) 수백만 유저가 즐기는 대규모 온라인 게임입니다. 끊임없이 업데이트되는 콘텐츠와 치열한 경쟁, 화려한 그래픽으로 게이머들의 심장을 뛰게 만듭니다.

■ 주요 특징
· 방대한 오픈월드와 100개 이상의 던전 콘텐츠
· 실시간 PvP · 길드전 · 레이드 등 다양한 전투 콘텐츠
· 매월 대규모 업데이트로 새로운 스토리 및 캐릭터 추가
· PC·모바일 크로스플레이 지원 (계정 연동 가능)

■ 최근 업데이트
· [2025.10] 신규 클래스 '이터널나이트' 출시
· [2025.09] 월드 보스 레이드 시즌 3 오픈
· [2025.08] 길드전 시스템 전면 개편

※ 일부 콘텐츠는 일정에 따라 변경될 수 있습니다.`}</p>
                  </div>

                  <button
                    onClick={() => setExpandDesc(!expandDesc)}
                    className="mt-2 flex items-center gap-1 text-sm text-[#72C2FF] font-medium"
                  >
                    {expandDesc ? "접기" : "더보기"}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${expandDesc ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 쿠폰 목록 */}
              <div className="border-t border-gray-100 stiky">
                {coupon.codes.map((item, idx) => (
                  <div key={idx} className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img
                              src="https://edge.ssalmuk.com/editorImage/1c58b4cbb5914bd0bba0ae27e6dd1175.png"
                              alt="프로필"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-400">
                            {item.author || "쪽우살러쥐요"}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-[#1A1A2E] text-[14px]">
                            쿠폰번호 {item.code}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            기간 {item.issueDate} ~ {item.expireDate}
                          </p>
                          <p className="text-xs text-red-400 mt-1">
                            {item.event}
                          </p>
                        </div>
                      </div>
                      <button
                        className="bg-[#72C2FF] text-white px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 hover:bg-[#5BA8E6] transition-colors"
                        onClick={() => onToast("쿠폰번호가 복사되었습니다.")}
                      >
                        복사
                      </button>
                    </div>
                    <div className="flex justify-end mt-1">
                      <button
                        className="text-gray-300 hover:text-gray-400 p-0.5"
                        onClick={() => setShowReportPopup(true)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 다운로드 버튼 */}
              <div className="px-5 py-4">
                <button className="w-full py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors">
                  다운로드 받기
                </button>
              </div>
            </div>
          )}

          {/* ── 할인쿠폰 탭 ── */}
          {detailTab === "할인쿠폰" && (
            <>
              {/* 배너 슬라이더 */}
              <div className="p-5 pb-0">
                <BannerImageSlider
                  images={coupon.bannerImages || [coupon.image]}
                  alt={coupon.name}
                />
              </div>

              {/* 게임 설명 */}
              <div className="p-5 pb-4 border-b border-gray-100">
                <div
                  className={`overflow-hidden transition-all duration-300 ${!expandDesc ? "max-h-[3rem]" : "max-h-[600px]"}`}
                >
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{`${coupon.name}은(는) 수백만 유저가 즐기는 대규모 온라인 게임입니다. 끊임없이 업데이트되는 콘텐츠와 치열한 경쟁, 화려한 그래픽으로 게이머들의 심장을 뛰게 만듭니다.

■ 주요 특징
· 방대한 오픈월드와 100개 이상의 던전 콘텐츠
· 실시간 PvP · 길드전 · 레이드 등 다양한 전투 콘텐츠
· 매월 대규모 업데이트로 새로운 스토리 및 캐릭터 추가
· PC·모바일 크로스플레이 지원 (계정 연동 가능)

■ 최근 업데이트
· [2025.10] 신규 클래스 '이터널나이트' 출시
· [2025.09] 월드 보스 레이드 시즌 3 오픈
· [2025.08] 길드전 시스템 전면 개편

※ 일부 콘텐츠는 일정에 따라 변경될 수 있습니다.`}</p>
                </div>
                <button
                  onClick={() => setExpandDesc(!expandDesc)}
                  className="mt-2 flex items-center gap-1 text-sm text-[#72C2FF] font-medium"
                >
                  {expandDesc ? "접기" : "더보기"}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${expandDesc ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {coupon.discountItems && coupon.discountItems.length > 0 ? (
                <div className="p-4 flex flex-col gap-3 bg-[#F5F6F8]">
                  {coupon.discountItems.map((item) => (
                    <DiscountItemCard
                      key={item.id}
                      item={item}
                      onBuy={() => setPaymentItem(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl mb-3">🎟️</span>
                  <p className="text-sm font-medium text-gray-600">
                    할인쿠폰이 없습니다.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    이 게임은 현재 할인쿠폰을 제공하지 않습니다.
                  </p>
                </div>
              )}

              {/* 상품 설명 */}
              <div className="px-5 py-4">
                <p className="text-[15px] font-bold text-[#1A1A2E] mb-3">
                  상품 설명
                </p>
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-4 text-[13px]">
                  <div>
                    <p className="font-bold text-[#1A1A2E] mb-1">
                      [코드 확인방법]
                    </p>
                    <p className="text-gray-500">
                      •{" "}
                      {coupon.productInfo?.checkMethod ??
                        "내 구매내역 > 상품 정보 > 상품 코드 확인"}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A2E] mb-1">
                      [코드 등록방법]
                    </p>
                    <div className="flex flex-col gap-1">
                      {(
                        coupon.productInfo?.registerSteps ?? [
                          "게임 공식 충전 상점 접속",
                          "메뉴 내 [교환/REDEEM] 클릭",
                          "게임이 연동된 계정으로 로그인",
                          "상품 코드(REDEEM CODE) 입력 후 교환 확인",
                        ]
                      ).map((step, i) => (
                        <p
                          key={i}
                          className={
                            step.startsWith("-")
                              ? "text-gray-400 pl-2"
                              : "text-gray-500"
                          }
                        >
                          {step.startsWith("-") ? step : `${i + 1}. ${step}`}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A2E] mb-1">[유의사항]</p>
                    <p className="text-red-500 leading-relaxed">
                      ※{" "}
                      {coupon.productInfo?.note ??
                        "PIN 번호 형태의 디지털 상품권은 상품 특성상 발급(또는 노출) 이후에는 환불이 불가능합니다."}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 신고 팝업 */}
      {showReportPopup && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowReportPopup(false);
              setSelectedReason("");
            }}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden">
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-base font-bold text-gray-900">
                이 쿠폰을 신고하는 이유
              </h3>
            </div>
            <div className="px-2">
              {reportReasons.map((reason) => (
                <button
                  key={reason}
                  className={`w-full py-3 px-3 flex items-center justify-between border-t border-gray-100 ${
                    selectedReason === reason
                      ? "text-[#72C2FF] font-medium"
                      : "text-gray-600"
                  }`}
                  onClick={() => setSelectedReason(reason)}
                >
                  <span className="text-sm">{reason}</span>
                  {selectedReason === reason && (
                    <svg
                      className="w-5 h-5 text-[#72C2FF]"
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
            <div className="px-5 py-4">
              <button
                className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
                  selectedReason
                    ? "bg-[#72C2FF] text-white hover:bg-[#5BA8E6]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!selectedReason}
                onClick={() => {
                  onToast("신고가 접수되었습니다.");
                  setShowReportPopup(false);
                  setSelectedReason("");
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 결제 플로우 */}
      {paymentItem && (
        <PaymentFlowModal
          item={paymentItem}
          coupon={coupon}
          onClose={() => setPaymentItem(null)}
        />
      )}

    </div>
  );
}
