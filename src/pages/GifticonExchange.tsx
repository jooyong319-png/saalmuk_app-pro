import { useState } from "react";

type Step =
  | "main" // 기프티콘 선택 화면
  | "verify" // 본인인증
  | "complete"; // 구매 완료

type Gifticon = {
  id: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function GifticonExchange({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [step, setStep] = useState<Step>("main");
  const [isVerified, setIsVerified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedGifticon, setSelectedGifticon] = useState<Gifticon | null>(
    null
  );
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [purchasedGifticon, setPurchasedGifticon] = useState<Gifticon | null>(
    null
  );

  const balance = 25400; // 보유 포인트

  // 토스트
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 1700);
    setTimeout(() => setShowToast(false), 2000);
  };

  const categories = [
    "전체",
    "카페",
    "편의점",
    "치킨",
    "피자",
    "아이스크림",
    "베이커리",
  ];

  const gifticons: Gifticon[] = [
    {
      id: 1,
      brand: "스타벅스",
      name: "아메리카노 Tall",
      price: 4500,
      image: "☕",
      category: "카페",
    },
    {
      id: 2,
      brand: "스타벅스",
      name: "카페라떼 Tall",
      price: 5000,
      image: "☕",
      category: "카페",
    },
    {
      id: 3,
      brand: "투썸플레이스",
      name: "아이스 아메리카노",
      price: 4300,
      image: "☕",
      category: "카페",
    },
    {
      id: 4,
      brand: "이디야",
      name: "아메리카노 (HOT/ICE)",
      price: 3000,
      image: "☕",
      category: "카페",
    },
    {
      id: 5,
      brand: "CU",
      name: "5,000원 금액권",
      price: 5000,
      image: "🏪",
      category: "편의점",
    },
    {
      id: 6,
      brand: "GS25",
      name: "5,000원 금액권",
      price: 5000,
      image: "🏪",
      category: "편의점",
    },
    {
      id: 7,
      brand: "세븐일레븐",
      name: "5,000원 금액권",
      price: 5000,
      image: "🏪",
      category: "편의점",
    },
    {
      id: 8,
      brand: "BBQ",
      name: "황금올리브 치킨",
      price: 20000,
      image: "🍗",
      category: "치킨",
    },
    {
      id: 9,
      brand: "교촌치킨",
      name: "교촌 허니콤보",
      price: 19000,
      image: "🍗",
      category: "치킨",
    },
    {
      id: 10,
      brand: "BHC",
      name: "뿌링클",
      price: 18000,
      image: "🍗",
      category: "치킨",
    },
    {
      id: 11,
      brand: "도미노피자",
      name: "포테이토 M",
      price: 15000,
      image: "🍕",
      category: "피자",
    },
    {
      id: 12,
      brand: "피자헛",
      name: "리치골드 M",
      price: 16000,
      image: "🍕",
      category: "피자",
    },
    {
      id: 13,
      brand: "배스킨라빈스",
      name: "파인트 아이스크림",
      price: 8500,
      image: "🍦",
      category: "아이스크림",
    },
    {
      id: 14,
      brand: "하겐다즈",
      name: "파인트",
      price: 12000,
      image: "🍦",
      category: "아이스크림",
    },
    {
      id: 15,
      brand: "파리바게뜨",
      name: "5,000원 금액권",
      price: 5000,
      image: "🥐",
      category: "베이커리",
    },
    {
      id: 16,
      brand: "뚜레쥬르",
      name: "5,000원 금액권",
      price: 5000,
      image: "🥐",
      category: "베이커리",
    },
  ];

  const filteredGifticons =
    selectedCategory === "전체"
      ? gifticons
      : gifticons.filter((g) => g.category === selectedCategory);

  // 기프티콘 클릭 핸들러
  const handleGifticonClick = (gifticon: Gifticon) => {
    if (!isVerified) {
      setSelectedGifticon(gifticon);
      setStep("verify");
    } else {
      setSelectedGifticon(gifticon);
      setShowPurchasePopup(true);
    }
  };

  // 구매 핸들러
  const handlePurchase = () => {
    if (selectedGifticon && selectedGifticon.price <= balance) {
      setPurchasedGifticon(selectedGifticon);
      setShowPurchasePopup(false);
      setStep("complete");
    }
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    switch (step) {
      case "main":
        setCurrentPage("home");
        break;
      case "verify":
        setStep("main");
        setSelectedGifticon(null);
        break;
      case "complete":
        setStep("main");
        setPurchasedGifticon(null);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={handleBack}>
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
        <span className="text-lg font-bold">
          {step === "main" && "기프티콘"}
          {step === "verify" && "본인인증"}
          {step === "complete" && "구매 완료"}
        </span>
        {step === "main" && (
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="text-gray-800 font-semibold">
              {balance.toLocaleString()}
            </span>
          </div>
        )}
      </header>

      {/* 메인 기프티콘 선택 화면 */}
      {step === "main" && (
        <>
          {/* 카테고리 필터 */}
          <div className="bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  style={
                    selectedCategory === category
                      ? { backgroundColor: "#72C2FF" }
                      : {}
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 기프티콘 리스트 */}
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {filteredGifticons.map((gifticon) => (
                <button
                  key={gifticon.id}
                  className="bg-white rounded-2xl p-4 border border-gray-200 text-left"
                  onClick={() => handleGifticonClick(gifticon)}
                >
                  <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center text-4xl mb-3">
                    {gifticon.image}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{gifticon.brand}</p>
                  <p className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                    {gifticon.name}
                  </p>
                  <p className="font-bold" style={{ color: "#72C2FF" }}>
                    {gifticon.price.toLocaleString()}P
                  </p>
                  {gifticon.price > balance && (
                    <p className="text-xs text-red-400 mt-1">포인트 부족</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 본인인증 화면 */}
      {step === "verify" && (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                본인인증이 필요합니다
              </h3>
              <p className="text-sm text-gray-500">
                기프티콘 구매를 위해 본인인증을 진행해주세요.
              </p>
            </div>

            <button
              className="w-full py-3 rounded-xl text-white font-medium mb-3"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => {
                setIsVerified(true);
                showToastMsg("본인인증이 완료되었습니다.");
                setShowPurchasePopup(true);
                setStep("main");
              }}
            >
              휴대폰 본인인증
            </button>

            <button
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
              onClick={() => {
                setIsVerified(true);
                showToastMsg("본인인증이 완료되었습니다.");
                setShowPurchasePopup(true);
                setStep("main");
              }}
            >
              아이핀 인증
            </button>
          </div>

          {/* 중복 안내 */}
          <div className="bg-yellow-50 rounded-xl p-4">
            <p className="text-sm text-yellow-700">
              ⚠️ 해당 정보로 등록된 계정이 존재할 경우 인증이 제한될 수
              있습니다.
            </p>
          </div>
        </div>
      )}

      {/* 구매 완료 화면 */}
      {step === "complete" && purchasedGifticon && (
        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-green-500"
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

          <h2 className="text-xl font-bold text-gray-900 mb-2">구매 완료!</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            기프티콘이 발급되었습니다.
            <br />
            마이페이지에서 확인하세요.
          </p>

          <div className="w-full bg-white rounded-2xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                {purchasedGifticon.image}
              </div>
              <div>
                <p className="text-xs text-gray-400">
                  {purchasedGifticon.brand}
                </p>
                <p className="font-bold text-gray-900">
                  {purchasedGifticon.name}
                </p>
                <p className="font-bold" style={{ color: "#72C2FF" }}>
                  {purchasedGifticon.price.toLocaleString()}P
                </p>
              </div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <button
              className="w-full py-4 rounded-xl text-white font-bold"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => {
                setStep("main");
                setPurchasedGifticon(null);
              }}
            >
              더 둘러보기
            </button>
            <button
              className="w-full py-4 rounded-xl border border-gray-300 text-gray-700 font-bold"
              onClick={() => setCurrentPage("home")}
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      )}

      {/* 구매 팝업 */}
      {showPurchasePopup && selectedGifticon && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPurchasePopup(false)}
          />
          <div className="relative bg-white w-full max-w-md rounded-t-2xl overflow-hidden">
            {/* 핸들 */}
            <div className="pt-3 pb-2 flex justify-center">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* 상품 정보 */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl">
                  {selectedGifticon.image}
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    {selectedGifticon.brand}
                  </p>
                  <p className="font-bold text-gray-900 mb-1">
                    {selectedGifticon.name}
                  </p>
                  <p className="text-lg font-bold" style={{ color: "#72C2FF" }}>
                    {selectedGifticon.price.toLocaleString()}P
                  </p>
                </div>
              </div>

              {/* 잔액 정보 */}
              <div className="bg-gray-100 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">보유 포인트</span>
                  <span className="font-bold text-gray-900">
                    {balance.toLocaleString()}P
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">차감 포인트</span>
                  <span className="font-bold text-red-500">
                    -{selectedGifticon.price.toLocaleString()}P
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">구매 후 잔액</span>
                  <span
                    className={`font-bold ${
                      balance - selectedGifticon.price >= 0
                        ? "text-gray-900"
                        : "text-red-500"
                    }`}
                  >
                    {(balance - selectedGifticon.price).toLocaleString()}P
                  </span>
                </div>
              </div>

              {/* 잔액 부족 안내 */}
              {selectedGifticon.price > balance && (
                <div className="bg-red-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-red-500">
                    ⚠️ 포인트가 부족합니다. 포인트를 충전해주세요.
                  </p>
                </div>
              )}

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  className="flex-1 py-4 rounded-xl border border-gray-300 text-gray-700 font-bold"
                  onClick={() => setShowPurchasePopup(false)}
                >
                  취소
                </button>
                <button
                  className={`flex-1 py-4 rounded-xl font-bold ${
                    selectedGifticon.price <= balance
                      ? "text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                  style={
                    selectedGifticon.price <= balance
                      ? { backgroundColor: "#72C2FF" }
                      : {}
                  }
                  disabled={selectedGifticon.price > balance}
                  onClick={handlePurchase}
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 */}
      {showToast && (
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full flex items-center gap-2 z-[9999] whitespace-nowrap transition-all duration-300 ease-out ${
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
