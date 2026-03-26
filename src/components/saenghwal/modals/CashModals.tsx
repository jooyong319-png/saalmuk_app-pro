// @ts-nocheck
import { useState } from "react";
import type { SaenghwalCtx } from "../types";

interface Props { ctx: SaenghwalCtx; }

export default function CashModals({ ctx }: Props) {
  const {
    showMyCash, setShowMyCash,
    showChargeModal, setShowChargeModal,
    chargeStep, setChargeStep,
    chargeAmount, setChargeAmount,
    showWithdrawModal, setShowWithdrawModal,
    withdrawStep, setWithdrawStep,
    withdrawAmount, setWithdrawAmount,
    showBankChange, setShowBankChange,
    showCashHistory, setShowCashHistory,
    cashHistory, userStats, setUserStats,
  } = ctx;

  const MyCashModal = () => {
    const [bankAccounts] = useState([
      {
        id: 1,
        bank: "국민은행",
        bankCode: "국민",
        account: "000012-**-**1323",
        isDefault: true,
      },
      {
        id: 2,
        bank: "신한은행",
        bankCode: "신한",
        account: "110-***-***456",
        isDefault: false,
      },
    ]);

    const recentTransactions = [
      {
        id: 1,
        type: "+",
        icon: "💰",
        title: "캐시 충전",
        date: "01.10 14:32",
        amount: 30000,
        status: "",
      },
      {
        id: 2,
        type: "-",
        icon: "☕",
        title: "스타벅스 아메리카노 T 구매",
        date: "01.10 15:20",
        amount: 3650,
        status: "거래중",
      },
      {
        id: 3,
        type: "+",
        icon: "🏪",
        title: "CU 상품권 판매",
        date: "01.09 10:15",
        amount: 4462,
        status: "",
      },
      {
        id: 4,
        type: "-",
        icon: "💸",
        title: "출금",
        date: "01.08 09:00",
        amount: 20000,
        status: "",
      },
      {
        id: 5,
        type: "-",
        icon: "💸",
        title: "출금",
        date: "01.08 09:00",
        amount: 20000,
        status: "",
      },
    ];

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMyCash(false)} className="p-1">
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
            <h1 className="text-lg font-bold text-gray-900">내 캐시</h1>
          </div>
          <button className="text-purple-500 font-medium text-sm">
            결제수단
          </button>
        </header>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 보유 캐시 카드 */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-400 rounded-2xl p-5 text-white relative overflow-hidden">
              {/* 번개 아이콘 */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <p className="text-sm opacity-80">보유 캐시</p>
              <p className="text-3xl font-bold mt-1">
                {userStats.ssalmukCash.toLocaleString()} 원
              </p>

              {/* 충전/출금 버튼 */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => {
                    setShowMyCash(false);
                    setChargeStep(1);
                    setChargeAmount(0);
                    setShowChargeModal(true);
                  }}
                  className="flex-1 py-3 bg-white text-purple-600 font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <span>+</span> 충전하기
                </button>
                <button
                  onClick={() => {
                    setShowMyCash(false);
                    setWithdrawStep(1);
                    setWithdrawAmount(0);
                    setShowWithdrawModal(true);
                  }}
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  출금하기
                </button>
              </div>
            </div>
          </div>

          {/* 캐시 상세 3개 박스 */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">출금가능</p>
                <p className="text-lg font-bold text-gray-900">
                  {(
                    userStats.ssalmukCash -
                    userStats.escrowCash -
                    userStats.purchaseDeposit
                  ).toLocaleString()}
                </p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">구매전용 예치금</p>
                <p className="text-lg font-bold text-purple-500">
                  {userStats.purchaseDeposit.toLocaleString()}
                </p>
              </div>
              <div className="flex-1 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">거래중</p>
                <p className="text-lg font-bold text-purple-500">
                  {userStats.escrowCash.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 출금 계좌 섹션 */}
          <div className="bg-white mx-4 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">출금 계좌</h3>
              <button
                onClick={() => {
                  setShowMyCash(false);
                  setShowBankChange(true);
                }}
                className="text-purple-500 text-sm font-medium"
              >
                관리
              </button>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                      account.bankCode === "국민"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {account.bankCode}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{account.bank}</p>
                    <p className="text-sm text-gray-500">{account.account}</p>
                  </div>
                  {account.isDefault && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded">
                      기본
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 최근 거래 섹션 */}
          <div className="bg-white mx-4 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">최근 거래</h3>
              <button
                onClick={() => {
                  setShowMyCash(false);
                  setShowCashHistory(true);
                }}
                className="text-purple-500 text-sm font-medium"
              >
                전체보기
              </button>
            </div>

            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        tx.type === "+" ? "bg-amber-100" : "bg-pink-100"
                      }`}
                    >
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tx.title}</p>
                      <p className="text-xs text-gray-400">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${tx.type === "+" ? "text-blue-500" : "text-gray-900"}`}
                    >
                      {tx.type}
                      {tx.amount.toLocaleString()}원
                    </p>
                    {tx.status && (
                      <p className="text-xs text-purple-500">{tx.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };


  const BankChangeModal = () => {
    const [selectedBank, setSelectedBank] = useState(userStats.bankName);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [step, setStep] = useState(1);

    const banks = [
      { name: "카카오뱅크", icon: "💛" },
      { name: "토스뱅크", icon: "💙" },
      { name: "국민은행", icon: "⭐" },
      { name: "신한은행", icon: "💚" },
      { name: "우리은행", icon: "💜" },
      { name: "하나은행", icon: "🩵" },
      { name: "NH농협", icon: "💚" },
      { name: "기업은행", icon: "🔵" },
    ];

    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
        onClick={() => setShowBankChange(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-t-3xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (step > 1) setStep(step - 1);
                else setShowBankChange(false);
              }}
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
            <h3 className="text-lg font-bold text-gray-900">
              {step === 1 && "출금 계좌 변경"}
              {step === 2 && "계좌 정보 입력"}
              {step === 3 && "변경 완료"}
            </h3>
            <button
              onClick={() => setShowBankChange(false)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {/* Step 1: 은행 선택 */}
            {step === 1 && (
              <>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs text-gray-500">현재 등록된 계좌</p>
                  <p className="font-medium text-gray-900 mt-1">
                    {userStats.bankName} {userStats.bankAccount}
                  </p>
                </div>

                <h4 className="font-medium text-gray-700 mb-3">은행 선택</h4>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {banks.map((bank) => (
                    <button
                      key={bank.name}
                      onClick={() => setSelectedBank(bank.name)}
                      className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                        selectedBank === bank.name
                          ? "bg-sky-100 border-2 border-sky-500"
                          : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl">{bank.icon}</span>
                      <span className="text-xs text-gray-700 font-medium">
                        {bank.name}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                >
                  다음
                </button>
              </>
            )}

            {/* Step 2: 계좌 정보 입력 */}
            {step === 2 && (
              <>
                <div className="bg-sky-50 rounded-xl p-4 mb-6 flex items-center gap-3">
                  <span className="text-2xl">
                    {banks.find((b) => b.name === selectedBank)?.icon}
                  </span>
                  <span className="font-medium text-sky-700">
                    {selectedBank}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      계좌번호
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="계좌번호 입력 ('-' 제외)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      예금주명
                    </label>
                    <input
                      type="text"
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="예금주명 입력"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-500 focus:outline-none text-lg"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-amber-700">
                    ⚠️ 본인 명의의 계좌만 등록 가능합니다.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (accountNumber && accountHolder) {
                      setUserStats((prev) => ({
                        ...prev,
                        bankName: selectedBank,
                        bankAccount: accountNumber.slice(0, 7) + "-******",
                      }));
                      setStep(3);
                    }
                  }}
                  disabled={!accountNumber || !accountHolder}
                  className={`w-full py-4 rounded-xl font-bold transition-colors ${
                    accountNumber && accountHolder
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  계좌 인증하기
                </button>
              </>
            )}

            {/* Step 3: 변경 완료 */}
            {step === 3 && (
              <div className="text-center py-8">
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  계좌 변경 완료!
                </h3>
                <p className="text-gray-500 mb-6">
                  출금 계좌가 성공적으로 변경되었습니다.
                </p>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                  <p className="text-sm text-gray-500 mb-2">새로운 출금 계좌</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">
                      {banks.find((b) => b.name === selectedBank)?.icon}
                    </span>
                    <span className="font-bold text-gray-900">
                      {selectedBank}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{userStats.bankAccount}</p>
                </div>

                <button
                  onClick={() => setShowBankChange(false)}
                  className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
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


  const CashHistoryModal = () => {
    const [filterType, setFilterType] = useState("all");

    const filteredHistory = cashHistory.filter((item) => {
      if (filterType === "all") return true;
      if (filterType === "in") return item.type === "+";
      if (filterType === "out") return item.type === "-";
      return true;
    });

    const totalIn = cashHistory
      .filter((i) => i.type === "+")
      .reduce((acc, i) => acc + i.amount, 0);
    const totalOut = cashHistory
      .filter((i) => i.type === "-")
      .reduce((acc, i) => acc + i.amount, 0);

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button
            onClick={() => setShowCashHistory(false)}
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
          <h3 className="text-lg font-bold text-gray-900">캐시 내역</h3>
          <div className="w-8"></div>
        </div>

        {/* 요약 카드 */}
        <div className="p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">총 적립</p>
              <p className="text-xl font-bold text-emerald-600">
                +{totalIn.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">총 사용</p>
              <p className="text-xl font-bold text-red-500">
                -{totalOut.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* 필터 */}
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex gap-2">
            {[
              { key: "all", label: "전체" },
              { key: "in", label: "적립" },
              { key: "out", label: "사용" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterType(filter.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterType === filter.key
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 내역 리스트 */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-2">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === "+" ? "bg-emerald-100" : "bg-red-100"}`}
                    >
                      <span
                        className={`text-xl ${item.type === "+" ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {item.type === "+" ? "↓" : "↑"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${item.type === "+" ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {item.type}
                      {item.amount.toLocaleString()}
                    </span>
                    <p className="text-xs text-gray-400">{item.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ChargeModal = () => {
    const [selectedPayment, setSelectedPayment] = useState("kakao");
    const [simplePayment, setSimplePayment] = useState(false);
    const quickAmounts = [10000, 30000, 50000, 100000];
    const recentAmounts = [10000, 30000, 50000];

    const paymentMethods = [
      {
        id: "bank",
        name: "무통장입금 / 계좌이체",
        icon: "🏦",
        iconBg: "bg-emerald-100",
        fee: 0,
        feeText: "수수료 무료",
        desc: "출금 가능",
        recommended: true,
      },
      {
        id: "card",
        name: "신용/체크카드",
        icon: "💳",
        iconBg: "bg-amber-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
      {
        id: "naver",
        name: "네이버페이",
        icon: "●",
        iconColor: "text-green-500",
        iconBg: "bg-green-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
      {
        id: "kakao",
        name: "카카오페이",
        icon: "●",
        iconColor: "text-yellow-400",
        iconBg: "bg-yellow-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "",
      },
      {
        id: "toss",
        name: "토스페이",
        icon: "●",
        iconColor: "text-blue-500",
        iconBg: "bg-blue-100",
        fee: 5.5,
        feeText: "수수료 5.5%",
        desc: "구매전용",
      },
    ];

    const selectedMethod = paymentMethods.find((m) => m.id === selectedPayment);
    const feeAmount = selectedMethod?.fee
      ? Math.round((chargeAmount * selectedMethod.fee) / 100)
      : 0;
    const totalAmount = chargeAmount + feeAmount;

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <button
            onClick={() => {
              if (chargeStep > 1) setChargeStep(chargeStep - 1);
              else setShowChargeModal(false);
            }}
            className="p-1"
          >
            {chargeStep === 1 ? (
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
            ) : (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
          <h1 className="text-lg font-bold text-gray-900">캐시 충전</h1>
          <div className="w-6"></div>
        </header>

        {/* 상단 보라색 바 (Step 1만) */}
        {chargeStep === 1 && (
          <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-400"></div>
        )}

        {/* 스텝 인디케이터 */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep > 1
                  ? "bg-emerald-500 text-white"
                  : chargeStep === 1
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {chargeStep > 1 ? "✓" : "1"}
            </div>
            <div
              className={`w-12 h-0.5 ${chargeStep > 1 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 2 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep > 2
                  ? "bg-emerald-500 text-white"
                  : chargeStep === 2
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {chargeStep > 2 ? "✓" : "2"}
            </div>
            <div
              className={`w-12 h-0.5 ${chargeStep > 2 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 3 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                chargeStep === 3
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Step 1: 금액 입력 */}
          {chargeStep === 1 && (
            <div className="px-6 pb-6">
              {/* 현재 잔액 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">현재 잔액</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userStats.ssalmukCash.toLocaleString()}원
                </p>
              </div>

              {/* 충전할 금액 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">충전할 금액</p>
                <div className="border-b-2 border-gray-200 pb-2 focus-within:border-purple-500">
                  <input
                    type="text"
                    value={chargeAmount ? chargeAmount.toLocaleString() : ""}
                    onChange={(e) =>
                      setChargeAmount(Number(e.target.value.replace(/,/g, "")))
                    }
                    placeholder="0"
                    className="w-full text-3xl font-bold text-right outline-none"
                  />
                </div>
              </div>

              {/* 빠른 선택 버튼 */}
              <div className="flex gap-2 mb-6">
                {quickAmounts.map((amount, idx) => (
                  <button
                    key={amount}
                    onClick={() => setChargeAmount(amount)}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      chargeAmount === amount
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {idx === 0
                      ? "1만"
                      : idx === 1
                        ? "3만"
                        : idx === 2
                          ? "5만"
                          : "10만"}
                  </button>
                ))}
              </div>

              {/* 최근 충전 금액 */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">최근 충전 금액</p>
                <div className="flex gap-2">
                  {recentAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setChargeAmount(amount)}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600"
                    >
                      {amount.toLocaleString()}원
                    </button>
                  ))}
                </div>
              </div>

              {/* 충전 후 예상 잔액 */}
              <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-4">
                <span className="text-gray-600">충전 후 예상 잔액</span>
                <span className="text-xl font-bold text-purple-600">
                  {(userStats.ssalmukCash + chargeAmount).toLocaleString()}원
                </span>
              </div>

              {/* 예치금 안내 */}
              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-purple-700 mb-2">
                  예치금 안내
                </p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• 일반 예치금 : 무통장/계좌이체로 충전, 출금 가능</li>
                  <li>• 구매전용 예치금 : 카드/간편결제로 충전, 출금 불가</li>
                  <li>• 구매 시 구매전용 예치금이 먼저 사용됩니다</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: 결제 수단 선택 */}
          {chargeStep === 2 && (
            <div className="px-6 pb-6">
              {/* 충전 금액 표시 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">충전 금액</p>
                <p className="text-3xl font-bold text-gray-900">
                  {chargeAmount.toLocaleString()}원
                </p>
              </div>

              {/* 결제 수단 선택 */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 font-medium mb-3">
                  결제 수단 선택
                </p>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedPayment === method.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${method.iconBg}`}
                      >
                        <span className={`text-lg ${method.iconColor || ""}`}>
                          {method.icon}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {method.name}
                          </span>
                          {method.recommended && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                              추천
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {method.feeText} · {method.desc || "일반"}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? "border-purple-500 bg-purple-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedPayment === method.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 금액 상세 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">충전금액</span>
                  <span className="font-medium">
                    {chargeAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2 text-purple-600">
                  <span>수수료 {selectedMethod?.fee || 0}%</span>
                  <span>+{feeAmount.toLocaleString()} 원</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-3">
                  <span className="font-bold text-gray-900">실 입금액</span>
                  <span className="font-bold text-purple-600">
                    {totalAmount.toLocaleString()} 원
                  </span>
                </div>
              </div>

              {/* 간편 결제 토글 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔒</span>
                  <div>
                    <p className="font-medium text-gray-900">간편 결제</p>
                    <p className="text-xs text-gray-400">
                      Face ID / 지문으로 결제
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSimplePayment(!simplePayment)}
                  className={`w-12 h-7 rounded-full transition-colors ${simplePayment ? "bg-purple-500" : "bg-gray-300"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${simplePayment ? "translate-x-6" : "translate-x-1"}`}
                  ></div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 충전 완료 */}
          {chargeStep === 3 && (
            <div className="px-6 pb-6 text-center">
              <div className="py-8">
                {/* 체크 아이콘 */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  충전 완료!
                </h2>
                <p className="text-gray-500 mb-8">
                  {chargeAmount.toLocaleString()}원이 충전되었습니다
                </p>

                {/* 현재 잔액 */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <p className="text-sm text-gray-500 mb-2">현재 잔액</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {userStats.ssalmukCash.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          {chargeStep === 1 && (
            <button
              onClick={() => chargeAmount > 0 && setChargeStep(2)}
              disabled={chargeAmount <= 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                chargeAmount > 0
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          )}

          {chargeStep === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setChargeStep(1)}
                className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setUserStats((prev) => ({
                    ...prev,
                    ssalmukCash: prev.ssalmukCash + chargeAmount,
                  }));
                  setChargeStep(3);
                }}
                className="flex-1 py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 flex items-center justify-center gap-2"
              >
                <span>🔒</span> {chargeAmount.toLocaleString()}원 결제
              </button>
            </div>
          )}

          {chargeStep === 3 && (
            <button
              onClick={() => setShowChargeModal(false)}
              className="w-full py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600"
            >
              확인
            </button>
          )}
        </div>
      </div>
    );
  };


  const WithdrawModal = () => {
    const availableCash =
      userStats.ssalmukCash - userStats.escrowCash - userStats.purchaseDeposit;
    const withdrawFee = withdrawAmount >= 10000 ? 0 : 1000;
    const finalAmount = withdrawAmount - withdrawFee;
    const [selectedBank, setSelectedBank] = useState(0);

    const bankAccounts = [
      {
        id: 0,
        bank: "국민은행",
        bankCode: "국민",
        account: "000012-**-**1323",
        holder: "홍길동",
        color: "bg-yellow-500",
      },
      {
        id: 1,
        bank: "신한은행",
        bankCode: "신한",
        account: "110-***-***456",
        holder: "홍길동",
        color: "bg-blue-500",
      },
    ];

    const quickAmounts = [10000, 30000, 50000];

    return (
      <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <button onClick={() => setShowWithdrawModal(false)} className="p-1">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-gray-900">출금 신청</h1>
          <div className="w-6"></div>
        </header>

        {/* 스텝 인디케이터 */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {/* Step 1 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep > 1
                  ? "bg-emerald-500 text-white"
                  : withdrawStep === 1
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {withdrawStep > 1 ? "✓" : "1"}
            </div>
            <div
              className={`w-12 h-0.5 ${withdrawStep > 1 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 2 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep > 2
                  ? "bg-emerald-500 text-white"
                  : withdrawStep === 2
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {withdrawStep > 2 ? "✓" : "2"}
            </div>
            <div
              className={`w-12 h-0.5 ${withdrawStep > 2 ? "bg-emerald-500" : "bg-gray-200"}`}
            ></div>

            {/* Step 3 */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                withdrawStep === 3
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              3
            </div>
          </div>
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Step 1: 금액 입력 */}
          {withdrawStep === 1 && (
            <div className="px-6 pb-6">
              {/* 출금 가능 금액 카드 */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-2xl p-5 text-white mb-6">
                <p className="text-sm opacity-80 mb-1">출금 가능 금액</p>
                <p className="text-3xl font-bold">
                  {availableCash.toLocaleString()}원
                </p>
              </div>

              {/* 출금 금액 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">출금 금액</p>
                <div className="border-b-2 border-gray-200 pb-2 focus-within:border-gray-900">
                  <input
                    type="text"
                    value={
                      withdrawAmount ? withdrawAmount.toLocaleString() : ""
                    }
                    onChange={(e) => {
                      const value = Number(e.target.value.replace(/,/g, ""));
                      setWithdrawAmount(Math.min(value, availableCash));
                    }}
                    placeholder="0"
                    className="w-full text-3xl font-bold text-right outline-none"
                  />
                </div>
              </div>

              {/* 빠른 선택 버튼 */}
              <div className="flex gap-2 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() =>
                      setWithdrawAmount(Math.min(amount, availableCash))
                    }
                    className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      withdrawAmount === amount
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {amount === 10000
                      ? "1만"
                      : amount === 30000
                        ? "3만"
                        : "5만"}
                  </button>
                ))}
                <button
                  onClick={() => setWithdrawAmount(availableCash)}
                  className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    withdrawAmount === availableCash
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  전액
                </button>
              </div>

              {/* 금액 상세 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">출금 금액</span>
                  <span className="font-medium">
                    {withdrawAmount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">수수료</span>
                  <span
                    className={`font-medium ${withdrawFee > 0 ? "text-red-500" : "text-gray-600"}`}
                  >
                    {withdrawFee > 0 ? `-${withdrawFee.toLocaleString()}` : "0"}{" "}
                    원
                  </span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-3">
                  <span className="font-bold text-gray-900">실 입금액</span>
                  <span className="font-bold text-emerald-600">
                    {Math.max(0, finalAmount).toLocaleString()} 원
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 계좌 선택 */}
          {withdrawStep === 2 && (
            <div className="px-6 pb-6">
              {/* 입금 예정액 */}
              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-1">입금 예정액</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {Math.max(0, finalAmount).toLocaleString()}원
                </p>
              </div>

              {/* 입금 계좌 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-gray-700 font-medium">입금 계좌</p>
                  <button
                    onClick={() => {
                      setShowWithdrawModal(false);
                      setShowBankChange(true);
                    }}
                    className="text-emerald-600 text-sm font-medium"
                  >
                    계좌 관리
                  </button>
                </div>
                <div className="space-y-2">
                  {bankAccounts.map((account) => (
                    <button
                      key={account.id}
                      onClick={() => setSelectedBank(account.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedBank === account.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-100 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold ${account.color}`}
                      >
                        {account.bankCode}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900">
                          {account.bank}
                        </p>
                        <p className="text-sm text-gray-500">
                          {account.account} · {account.holder}
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedBank === account.id
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedBank === account.id && (
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 출금 안내 */}
              <div className="bg-amber-50 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="font-medium text-amber-700 mb-1">출금 안내</p>
                    <ul className="text-sm text-amber-600 space-y-0.5">
                      <li>• 평일 09~16시: 1시간 내 입금</li>
                      <li>• 그 외: 다음 영업일 입금</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 출금 완료 */}
          {withdrawStep === 3 && (
            <div className="px-6 pb-6 text-center">
              <div className="py-8">
                {/* 체크 아이콘 */}
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  출금 신청 완료!
                </h2>
                <p className="text-gray-500 mb-8">
                  {Math.max(0, finalAmount).toLocaleString()}원이 입금될
                  예정입니다
                </p>

                {/* 입금 계좌 */}
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-sm font-bold ${bankAccounts[selectedBank].color}`}
                  >
                    {bankAccounts[selectedBank].bankCode}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">
                      {bankAccounts[selectedBank].bank}
                    </p>
                    <p className="text-sm text-gray-500">
                      {bankAccounts[selectedBank].account}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          {withdrawStep === 1 && (
            <button
              onClick={() => withdrawAmount >= 1000 && setWithdrawStep(2)}
              disabled={withdrawAmount < 1000}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors ${
                withdrawAmount >= 1000
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          )}

          {withdrawStep === 2 && (
            <div className="flex gap-3">
              <button
                onClick={() => setWithdrawStep(1)}
                className="flex-1 py-4 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
              >
                이전
              </button>
              <button
                onClick={() => {
                  setUserStats((prev) => ({
                    ...prev,
                    ssalmukCash: prev.ssalmukCash - withdrawAmount,
                  }));
                  setWithdrawStep(3);
                }}
                className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
              >
                출금 신청
              </button>
            </div>
          )}

          {withdrawStep === 3 && (
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800"
            >
              확인
            </button>
          )}
        </div>
      </div>
    );
  };


  return (
    <>
      {showMyCash && <MyCashModal />}
      {showBankChange && <BankChangeModal />}
      {showCashHistory && <CashHistoryModal />}
      {showChargeModal && <ChargeModal />}
      {showWithdrawModal && <WithdrawModal />}
    </>
  );
}
