import { useState } from "react";

type Step =
  | "main" // 메인 출금 화면 (잔액 + 금액선택 + 출금수단)
  | "verify" // 본인인증
  | "addMethod" // 출금 수단 추가 선택
  | "addNaverpay" // 네이버페이 추가
  | "addBank" // 계좌 추가
  | "complete"; // 출금 완료

export default function PointWithdraw({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [step, setStep] = useState<Step>("main");
  const [isVerified, setIsVerified] = useState(false);

  // 금액 선택
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const amounts = [500, 5000, 100000];
  const balance = 25400; // 보유 포인트

  // 출금 수단
  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(
    null
  );
  const [savedMethods, setSavedMethods] = useState<
    Array<{ type: "naverpay" | "bank"; info: string }>
  >([{ type: "naverpay", info: "************" }]);

  // 네이버페이 등록
  const [naverpayAgreed, setNaverpayAgreed] = useState({
    all: false,
    terms1: false,
    terms2: false,
    terms3: false,
  });
  const [naverpayId, setNaverpayId] = useState("");

  // 계좌 등록
  const [bankInfo, setBankInfo] = useState({
    firstName: "",
    lastName: "",
    bankName: "",
    accountNumber: "",
    email: "",
  });

  // 토스트
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  // 공지 닫기
  const [showNotice, setShowNotice] = useState(true);

  const showToastMsg = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setToastVisible(true), 10);
    setTimeout(() => setToastVisible(false), 1700);
    setTimeout(() => setShowToast(false), 2000);
  };

  // 네이버페이 전체 동의 핸들러
  const handleNaverpayAllAgree = () => {
    const newValue = !naverpayAgreed.all;
    setNaverpayAgreed({
      all: newValue,
      terms1: newValue,
      terms2: newValue,
      terms3: newValue,
    });
  };

  // 개별 동의 핸들러
  const handleNaverpayAgree = (key: "terms1" | "terms2" | "terms3") => {
    const newAgreed = { ...naverpayAgreed, [key]: !naverpayAgreed[key] };
    newAgreed.all = newAgreed.terms1 && newAgreed.terms2 && newAgreed.terms3;
    setNaverpayAgreed(newAgreed);
  };

  // 계좌 정보 모두 입력 여부
  const isBankInfoComplete =
    bankInfo.firstName &&
    bankInfo.lastName &&
    bankInfo.bankName &&
    bankInfo.accountNumber &&
    bankInfo.email;

  // 네이버페이 등록 가능 여부
  const canRegisterNaverpay =
    naverpayAgreed.terms1 &&
    naverpayAgreed.terms2 &&
    naverpayAgreed.terms3 &&
    naverpayId;

  // 뒤로가기 핸들러
  const handleBack = () => {
    switch (step) {
      case "main":
        setCurrentPage("home");
        break;
      case "verify":
        setStep("main");
        break;
      case "addMethod":
        setStep("main");
        break;
      case "addNaverpay":
      case "addBank":
        setStep("addMethod");
        break;
      case "complete":
        setCurrentPage("home");
        break;
    }
  };

  // 네이버페이 등록 완료
  const handleNaverpayRegister = () => {
    setSavedMethods([...savedMethods, { type: "naverpay", info: naverpayId }]);
    setNaverpayId("");
    setNaverpayAgreed({
      all: false,
      terms1: false,
      terms2: false,
      terms3: false,
    });
    showToastMsg("네이버페이가 등록되었습니다.");
    setStep("main");
  };

  // 계좌 등록 완료
  const handleBankRegister = () => {
    setSavedMethods([
      ...savedMethods,
      {
        type: "bank",
        info: `${bankInfo.bankName} ****${bankInfo.accountNumber.slice(-4)}`,
      },
    ]);
    setBankInfo({
      firstName: "",
      lastName: "",
      bankName: "",
      accountNumber: "",
      email: "",
    });
    showToastMsg("계좌가 등록되었습니다.");
    setStep("main");
  };

  // 출금 버튼 클릭
  const handleWithdrawClick = () => {
    if (!isVerified) {
      setStep("verify");
    } else {
      // 출금 처리
      setStep("complete");
    }
  };

  // 출금 가능 여부
  const canWithdraw = selectedAmount <= balance && selectedMethodIndex !== null;

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
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
            {step === "main" && "리워드 교환"}
            {step === "verify" && "본인인증"}
            {step === "addMethod" && "출금 수단 추가"}
            {step === "addNaverpay" && "네이버페이 등록"}
            {step === "addBank" && "계좌 등록"}
            {step === "complete" && "출금 완료"}
          </span>
        </div>
        {step === "main" && (
          <button
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            onClick={() => setCurrentPage("faq")}
          >
            <span className="text-gray-500 text-lg">?</span>
          </button>
        )}
      </header>

      {/* 메인 출금 화면 */}
      {step === "main" && (
        <div className="p-4 space-y-4">
          {/* 공지 배너 */}
          {showNotice && (
            <div className="bg-white rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">📢</span>
                <span className="text-sm text-gray-700">
                  포인트에 대한 새로운 규칙 확인
                </span>
              </div>
              <button onClick={() => setShowNotice(false)}>
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
          )}

          {/* 잔액 카드 */}
          <div className="bg-gray-900 rounded-2xl p-5">
            <p className="text-gray-400 text-sm mb-1">회원님의 잔액</p>
            <p className="text-white text-3xl font-bold mb-1">
              ₩{balance.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">
              = {balance.toLocaleString()} 포인트
            </p>

            {/* 내 거래 */}
            <button className="w-full mt-4 bg-gray-800 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                내 거래: ₩{balance.toLocaleString()}
              </span>
              <svg
                className="w-5 h-5 text-gray-500"
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
            </button>
          </div>

          {/* 라이브를 위해 코인 받기 (선택사항) */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  바로쌀먹에서 포인트 모아보자!
                </h3>
                <p className="text-sm text-gray-500">
                  바로쌀먹에서 쌀먹할 수 있습니다.
                </p>
              </div>
              <div className="text-4xl">🎁</div>
            </div>
            <button
              className="w-full py-3 rounded-xl text-white font-medium"
              style={{ backgroundColor: "#FF6B81" }}
            >
              포인트 받기
            </button>
          </div>

          {/* 현금 출금 */}
          <div className="bg-white rounded-2xl p-5">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">현금 출금</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs">
                  pay
                </span>
                <span>/</span>
                <span className="flex items-center gap-1">
                  <span>🏦</span> 은행 송금
                </span>
              </div>
            </div>

            {/* 금액 선택 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {amounts.map((amount, idx) => (
                <button
                  key={amount}
                  className={`relative py-4 rounded-xl border-2 text-center transition-colors ${
                    selectedAmount === amount
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white"
                  } ${amount > balance ? "opacity-50" : ""}`}
                  onClick={() => {
                    if (amount <= balance) {
                      setSelectedAmount(amount);
                    }
                  }}
                  disabled={amount > balance}
                >
                  {idx === 0 && (
                    <span className="absolute -top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      한 번만
                    </span>
                  )}
                  <span
                    className={`font-bold text-lg ${
                      selectedAmount === amount
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    ₩{amount.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>

            {/* 출금 수단 선택 */}
            <button
              className="w-full px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-between mb-4"
              onClick={() => setStep("addMethod")}
            >
              {savedMethods.length > 0 && selectedMethodIndex !== null ? (
                <div className="flex items-center gap-2">
                  {savedMethods[selectedMethodIndex].type === "naverpay" ? (
                    <>
                      <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                        N pay
                      </span>
                      <span className="text-sm text-gray-700">
                        네이버페이 {savedMethods[selectedMethodIndex].info}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>🏦</span>
                      <span className="text-sm text-gray-700">
                        {savedMethods[selectedMethodIndex].info}
                      </span>
                    </>
                  )}
                </div>
              ) : savedMethods.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                    N pay
                  </span>
                  <span className="text-sm text-gray-700">
                    네이버페이 {savedMethods[0].info}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">
                  출금 수단을 선택해주세요
                </span>
              )}
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
            </button>

            {/* 출금 버튼 */}
            <button
              className={`w-full py-4 rounded-xl font-bold transition-colors ${
                selectedAmount <= balance
                  ? "text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              style={
                selectedAmount <= balance ? { backgroundColor: "#72C2FF" } : {}
              }
              disabled={selectedAmount > balance}
              onClick={handleWithdrawClick}
            >
              현금 출금
            </button>

            {/* 안내 문구 */}
            <p className="text-xs text-gray-400 text-center mt-3">
              현금을 인출하려면 최소 ₩500의 잔액이 있어야 합니다.
              <br />
              개인 출금
              <br />
              한도 및 월별 거래는 국가나 지역에 따라 달라집니다.
            </p>
          </div>

          {/* 약관 동의 */}
          <p className="text-xs text-gray-400 text-center">
            계속 진행하시면 쌀먹닷컴의{" "}
            <span className="underline">사용 약관</span>에 동의하시는 것<br />
            으로 간주됩니다.
          </p>
        </div>
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
                안전한 출금을 위해 본인인증을 진행해주세요.
              </p>
            </div>

            <button
              className="w-full py-3 rounded-xl text-white font-medium mb-3"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => {
                setIsVerified(true);
                showToastMsg("본인인증이 완료되었습니다.");
                setStep("complete");
              }}
            >
              휴대폰 본인인증
            </button>

            <button
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-medium"
              onClick={() => {
                setIsVerified(true);
                showToastMsg("본인인증이 완료되었습니다.");
                setStep("complete");
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
              <br />
              <br />
              최초 1회 본인인증이 필요합니다.
            </p>
          </div>
        </div>
      )}

      {/* 출금 수단 추가 선택 화면 */}
      {step === "addMethod" && (
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-4">
            출금 수단을 선택하거나 추가해주세요.
          </p>
          0{/* 등록된 출금 수단 */}
          {savedMethods.length > 0 && (
            <div className="space-y-3 mb-4">
              {savedMethods.map((method, idx) => (
                <button
                  key={idx}
                  className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-3 transition-colors ${
                    selectedMethodIndex === idx
                      ? "border-[#72C2FF] bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => {
                    setSelectedMethodIndex(idx);
                    setStep("main");
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      method.type === "naverpay"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {method.type === "naverpay" ? (
                      <span className="text-green-600 font-bold text-xs">
                        N
                      </span>
                    ) : (
                      "🏦"
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">
                      {method.type === "naverpay" ? "네이버페이" : "계좌이체"}
                    </p>
                    <p className="text-sm text-gray-500">{method.info}</p>
                  </div>
                  {selectedMethodIndex === idx && (
                    <svg
                      className="w-6 h-6 text-[#72C2FF]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
          {/* 추가 버튼들 */}
          <div className="space-y-3">
            <button
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 bg-white text-left flex items-center gap-3"
              onClick={() => setStep("addNaverpay")}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold">N</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">네이버페이 추가</p>
                <p className="text-sm text-gray-500">네이버페이로 출금받기</p>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <button
              className="w-full p-4 rounded-xl border-2 border-dashed border-gray-300 bg-white text-left flex items-center gap-3"
              onClick={() => setStep("addBank")}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                🏦
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">계좌 추가</p>
                <p className="text-sm text-gray-500">은행 계좌로 출금받기</p>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 네이버페이 등록 화면 */}
      {step === "addNaverpay" && (
        <div className="p-4">
          {/* 약관 동의 */}
          <div className="bg-white rounded-xl border border-gray-200 mb-4">
            <button
              className="w-full p-4 flex items-center gap-3 border-b border-gray-100"
              onClick={handleNaverpayAllAgree}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  naverpayAgreed.all
                    ? "bg-[#72C2FF] border-[#72C2FF]"
                    : "border-gray-300"
                }`}
              >
                {naverpayAgreed.all && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>
              <span className="font-bold text-gray-900">전체 동의</span>
            </button>

            {[
              { key: "terms1", label: "[필수] 서비스 이용약관 동의" },
              { key: "terms2", label: "[필수] 개인정보 수집 및 이용 동의" },
              { key: "terms3", label: "[필수] 개인정보 제3자 제공 동의" },
            ].map((term) => (
              <button
                key={term.key}
                className="w-full p-4 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                onClick={() =>
                  handleNaverpayAgree(
                    term.key as "terms1" | "terms2" | "terms3"
                  )
                }
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center ${
                    naverpayAgreed[term.key as keyof typeof naverpayAgreed]
                      ? "bg-[#72C2FF] border-[#72C2FF]"
                      : "border-gray-300"
                  }`}
                >
                  {naverpayAgreed[term.key as keyof typeof naverpayAgreed] && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">{term.label}</span>
              </button>
            ))}
          </div>

          {/* 네이버 ID 입력 */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              네이버 ID
            </label>
            <input
              type="text"
              value={naverpayId}
              onChange={(e) => setNaverpayId(e.target.value)}
              placeholder="네이버 아이디를 입력해주세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <button
            className={`w-full py-4 rounded-xl font-bold ${
              canRegisterNaverpay ? "text-white" : "bg-gray-300 text-gray-500"
            }`}
            style={canRegisterNaverpay ? { backgroundColor: "#72C2FF" } : {}}
            disabled={!canRegisterNaverpay}
            onClick={handleNaverpayRegister}
          >
            등록하기
          </button>
        </div>
      )}

      {/* 계좌 등록 화면 */}
      {step === "addBank" && (
        <div className="p-4">
          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  성
                </label>
                <input
                  type="text"
                  value={bankInfo.lastName}
                  onChange={(e) =>
                    setBankInfo({ ...bankInfo, lastName: e.target.value })
                  }
                  placeholder="홍"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  이름
                </label>
                <input
                  type="text"
                  value={bankInfo.firstName}
                  onChange={(e) =>
                    setBankInfo({ ...bankInfo, firstName: e.target.value })
                  }
                  placeholder="길동"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                은행 이름
              </label>
              <select
                value={bankInfo.bankName}
                onChange={(e) =>
                  setBankInfo({ ...bankInfo, bankName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white"
              >
                <option value="">은행을 선택해주세요</option>
                <option value="국민은행">국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="우리은행">우리은행</option>
                <option value="하나은행">하나은행</option>
                <option value="농협은행">농협은행</option>
                <option value="카카오뱅크">카카오뱅크</option>
                <option value="토스뱅크">토스뱅크</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                계좌번호
              </label>
              <input
                type="text"
                value={bankInfo.accountNumber}
                onChange={(e) =>
                  setBankInfo({ ...bankInfo, accountNumber: e.target.value })
                }
                placeholder="계좌번호를 입력해주세요 (- 제외)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                이메일
              </label>
              <input
                type="email"
                value={bankInfo.email}
                onChange={(e) =>
                  setBankInfo({ ...bankInfo, email: e.target.value })
                }
                placeholder="이메일을 입력해주세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <button
            className={`w-full py-4 rounded-xl font-bold ${
              isBankInfoComplete ? "text-white" : "bg-gray-300 text-gray-500"
            }`}
            style={isBankInfoComplete ? { backgroundColor: "#72C2FF" } : {}}
            disabled={!isBankInfoComplete}
            onClick={handleBankRegister}
          >
            등록하기
          </button>
        </div>
      )}

      {/* 출금 완료 화면 */}
      {step === "complete" && (
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

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            출금 신청 완료!
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            출금 신청이 완료되었습니다.
            <br />
            영업일 기준 1-3일 내에 입금됩니다.
          </p>

          <div className="w-full bg-gray-100 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">신청 금액</span>
              <span className="font-bold text-gray-900">
                ₩{selectedAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            className="w-full py-4 rounded-xl text-white font-bold"
            style={{ backgroundColor: "#72C2FF" }}
            onClick={() => setCurrentPage("home")}
          >
            홈으로 돌아가기
          </button>
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
