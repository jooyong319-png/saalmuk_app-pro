import { useState } from "react";

export default function Login({
  onClose,
  setCurrentPage,
  onLogin,
}: {
  onClose?: () => void;
  setCurrentPage?: (page: string) => void;
  onLogin?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 팝업 상태
  const [showNotMember, setShowNotMember] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const [showFindAccount, setShowFindAccount] = useState(false);
  const [findPhone, setFindPhone] = useState("");
  const [findResult, setFindResult] = useState<"none" | "found" | null>(null);
  const [foundEmail, setFoundEmail] = useState("");

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetMethod, setResetMethod] = useState<"phone" | "email" | null>(
    null,
  );
  const [resetPhone, setResetPhone] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetVerifyCode, setResetVerifyCode] = useState("");
  const [resetStep, setResetStep] = useState(1);
  const [resetError, setResetError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <>
      {/* Step 1: SNS 선택 */}
      {step === 1 && (
        <>
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-4">
            <button
              className="text-gray-400"
              onClick={() => {
                if (onClose) onClose();
                if (setCurrentPage) setCurrentPage("faq");
              }}
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
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button onClick={onClose}>
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
          </div>

          {/* 타이틀 */}
          <div className="px-4 pt-4 pb-8">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              쌀먹닷컴에 로그인
            </h1>
          </div>

          {/* 로그인 버튼들 */}
          <div className="px-4 space-y-3">
            {/* 이메일 로그인 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 border border-gray-200 rounded-xl"
              onClick={() => setStep(2)}
            >
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-700">이메일로 로그인</span>
            </button>

            {/* 네이버 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl"
              style={{ backgroundColor: "#03C75A" }}
              onClick={() => {
                const isMember = true;
                if (isMember) {
                  onLogin?.();
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("home");
                } else {
                  setShowNotMember(true);
                }
              }}
            >
              <span className="text-white font-bold text-lg">N</span>
              <span className="text-white font-medium">네이버로 로그인</span>
            </button>

            {/* 카카오 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-yellow-400"
              onClick={() => {
                const isMember = true;
                if (isMember) {
                  onLogin?.();
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("home");
                } else {
                  setShowNotMember(true);
                }
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-black font-bold text-sm">talk</span>
              </div>
              <span className="text-black font-medium">카카오로 로그인</span>
            </button>

            {/* 구글 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-200"
              onClick={() => {
                const isMember = true;
                if (isMember) {
                  onLogin?.();
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("home");
                } else {
                  setShowNotMember(true);
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">Google로 로그인</span>
            </button>
          </div>

          {/* 하단 가입하기 */}
          <div className="py-6">
            <p className="text-center text-sm text-gray-500">
              계정이 없으세요?{" "}
              <span
                className="text-[#72C2FF] font-medium cursor-pointer"
                onClick={() => {
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("signup");
                }}
              >
                가입하기
              </span>
            </p>
          </div>
        </>
      )}

      {/* Step 2: 이메일 입력 */}
      {step === 2 && (
        <>
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setStep(1)}>
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
            <button onClick={onClose}>
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
          </div>

          {/* 타이틀 */}
          <div className="px-4 pt-4 pb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              이메일을 입력해주세요
            </h1>
          </div>

          {/* 이메일 입력 */}
          <div className="px-4">
            <div className="mb-6">
              <label className="text-sm text-gray-600 mb-2 block">이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
              />
            </div>

            {/* 계속 버튼 */}
            <button
              className="w-full py-4 rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: email ? "#72C2FF" : "#E5E7EB" }}
              onClick={() => email && setStep(3)}
            >
              계속
            </button>
          </div>

          {/* 하단 가입하기 */}
          <div className="py-6 border-t border-gray-100 mt-6">
            <p className="text-center text-sm text-gray-500">
              계정이 없으세요?{" "}
              <span
                className="text-[#72C2FF] font-medium cursor-pointer"
                onClick={() => {
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("signup");
                }}
              >
                가입하기
              </span>
            </p>
          </div>
        </>
      )}

      {/* Step 3: 비밀번호 입력 */}
      {step === 3 && (
        <>
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-4">
            <button onClick={() => setStep(2)}>
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
            <button onClick={onClose}>
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
          </div>

          {/* 타이틀 */}
          <div className="px-4 pt-4 pb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              비밀번호를 입력해주세요
            </h1>
            <p className="text-sm text-gray-400 mt-1">{email}</p>
          </div>

          {/* 비밀번호 입력 */}
          <div className="px-4">
            <div className="mb-4">
              <label className="text-sm text-gray-600 mb-2 block">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
              />
            </div>

            {/* 에러 메시지 */}
            {errorMessage && (
              <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
            )}

            {/* 로그인 버튼 */}
            <button
              className="w-full py-4 rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: password ? "#72C2FF" : "#E5E7EB" }}
              onClick={() => {
                if (password) {
                  const isValid =
                    email === "test@test.com" && password === "1234";
                  if (isValid) {
                    if (onClose) onClose();
                    if (setCurrentPage) setCurrentPage("home");
                  } else {
                    setErrorMessage(
                      "이메일 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 계정입니다.",
                    );
                  }
                }
              }}
            >
              로그인
            </button>

            {/* 로그인 도움 */}
            <button
              className="w-full py-3 text-gray-400 text-sm mt-2"
              onClick={() => setShowHelpPopup(true)}
            >
              로그인하는 데 도움이 필요하신가요?
            </button>
          </div>

          {/* 하단 가입하기 */}
          <div className="py-6 border-t border-gray-100 mt-4">
            <p className="text-center text-sm text-gray-500">
              계정이 없으세요?{" "}
              <span
                className="text-[#72C2FF] font-medium cursor-pointer"
                onClick={() => {
                  if (onClose) onClose();
                  if (setCurrentPage) setCurrentPage("signup");
                }}
              >
                가입하기
              </span>
            </p>
          </div>
        </>
      )}

      {/* 존재하지 않는 회원 팝업 */}
      {showNotMember && (
        <div className="fixed inset-0 z-[10002] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNotMember(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              존재하지 않는 회원입니다.
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              회원가입 후 이용해주세요.
            </p>
            <button
              className="w-full py-3 rounded-full text-white font-bold"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => {
                setShowNotMember(false);
                if (onClose) onClose();
                if (setCurrentPage) setCurrentPage("signup");
              }}
            >
              회원가입하기
            </button>
          </div>
        </div>
      )}
      {/* 로그인 도움 팝업 */}
      {showHelpPopup && (
        <div className="fixed inset-0 z-[10002] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowHelpPopup(false)}
          />
          <div
            className="relative bg-white rounded-t-2xl w-full max-w-md"
            style={{ animation: "slideUp 0.3s ease-out" }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-lg font-bold">도움이 필요하신가요?</span>
              <button onClick={() => setShowHelpPopup(false)}>
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

            {/* 메뉴 */}
            <div className="p-4 space-y-2">
              <button
                className="w-full flex items-center justify-between py-4 px-4 bg-gray-50 rounded-xl"
                onClick={() => {
                  setShowHelpPopup(false);
                  setShowFindAccount(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
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
                  <span className="text-gray-700 font-medium">계정 찾기</span>
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
              </button>

              <button
                className="w-full flex items-center justify-between py-4 px-4 bg-gray-50 rounded-xl"
                onClick={() => {
                  setShowHelpPopup(false);
                  setShowResetPassword(true);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">
                    비밀번호 재설정
                  </span>
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
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 계정 찾기 풀 화면 */}
      {showFindAccount && (
        <div className="fixed inset-0 z-[10002] bg-white overflow-y-auto">
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button
              onClick={() => {
                setShowFindAccount(false);
                setFindPhone("");
                setFindResult(null);
              }}
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
            <span className="text-lg font-bold">계정 찾기</span>
            <div className="w-6"></div>
          </div>

          {/* 전화번호 입력 (결과 없을 때) */}
          {findResult === null && (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                전화번호를 입력해주세요
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                가입 시 사용한 전화번호를 입력해주세요.
              </p>

              <div className="mb-6">
                <label className="text-sm text-gray-600 mb-2 block">
                  전화번호
                </label>
                <input
                  type="tel"
                  placeholder="01012345678"
                  value={findPhone}
                  onChange={(e) => setFindPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                />
              </div>

              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg"
                style={{ backgroundColor: findPhone ? "#72C2FF" : "#E5E7EB" }}
                onClick={() => {
                  if (findPhone) {
                    // 회원 체크 시뮬레이션
                    const isMember = findPhone === "01012345678";
                    if (isMember) {
                      setFoundEmail("te**@test.com");
                      setFindResult("found");
                    } else {
                      setFindResult("none");
                    }
                  }
                }}
              >
                계정 찾기
              </button>
            </div>
          )}

          {/* 결과 없음 */}
          {findResult === "none" && (
            <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                결과 없음
              </h3>
              <p className="text-sm text-gray-500 text-center mb-8">
                입력하신 전화번호로 등록된
                <br />
                계정을 찾을 수 없습니다.
              </p>

              <div className="w-full space-y-3">
                <button
                  className="w-full py-4 rounded-full text-white font-bold"
                  style={{ backgroundColor: "#72C2FF" }}
                  onClick={() => {
                    setFindPhone("");
                    setFindResult(null);
                  }}
                >
                  다시 시도
                </button>

                <button
                  className="w-full py-4 rounded-full border border-gray-200 text-gray-700 font-bold"
                  onClick={() => {
                    setShowFindAccount(false);
                    setFindPhone("");
                    setFindResult(null);
                    if (onClose) onClose();
                    if (setCurrentPage) setCurrentPage("faq");
                  }}
                >
                  계정을 찾을 수 없나요?
                </button>
              </div>
            </div>
          )}

          {/* 이메일 찾음 */}
          {findResult === "found" && (
            <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-[#72C2FF]"
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
                계정을 찾았습니다
              </h3>
              <p className="text-sm text-gray-500 mb-1">등록된 이메일</p>
              <p className="text-xl font-bold text-gray-900 mb-8">
                {foundEmail}
              </p>

              <div className="w-full space-y-3">
                <button
                  className="w-full py-4 rounded-full text-white font-bold"
                  style={{ backgroundColor: "#72C2FF" }}
                  onClick={() => {
                    setShowFindAccount(false);
                    setFindPhone("");
                    setFindResult(null);
                    setStep(2);
                  }}
                >
                  로그인하기
                </button>

                <button
                  className="w-full py-4 rounded-full border border-gray-200 text-gray-700 font-bold"
                  onClick={() => {
                    setShowFindAccount(false);
                    setFindPhone("");
                    setFindResult(null);
                    if (onClose) onClose();
                    if (setCurrentPage) setCurrentPage("faq");
                  }}
                >
                  로그인 할 수 없나요?
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {/* 비밀번호 재설정 풀 화면 */}
      {showResetPassword && (
        <div className="fixed inset-0 z-[10002] bg-white overflow-y-auto">
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button
              onClick={() => {
                if (resetStep > 1 && resetMethod) {
                  if (resetStep === 2) {
                    setResetMethod(null);
                    setResetStep(1);
                  } else {
                    setResetStep(resetStep - 1);
                  }
                } else if (resetMethod) {
                  setResetMethod(null);
                } else {
                  setShowResetPassword(false);
                  setResetStep(1);
                  setResetMethod(null);
                  setResetPhone("");
                  setResetEmail("");
                  setResetVerifyCode("");
                  setResetError("");
                  setNewPassword("");
                  setNewPasswordConfirm("");
                }
              }}
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
            <span className="text-lg font-bold">비밀번호 재설정</span>
            <div className="w-6"></div>
          </div>

          {/* Step 1: 방법 선택 (번호 or 이메일) */}
          {resetStep === 1 && !resetMethod && (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                인증 방법을 선택해주세요
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                비밀번호 재설정을 위해 본인 인증이 필요합니다.
              </p>

              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-between py-4 px-4 border border-gray-200 rounded-xl"
                  onClick={() => {
                    setResetMethod("phone");
                    setResetStep(2);
                  }}
                >
                  <div className="flex items-center gap-3">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      전화번호로 인증
                    </span>
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
                </button>

                <button
                  className="w-full flex items-center justify-between py-4 px-4 border border-gray-200 rounded-xl"
                  onClick={() => {
                    setResetMethod("email");
                    setResetStep(2);
                  }}
                >
                  <div className="flex items-center gap-3">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      이메일로 인증
                    </span>
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
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 전화번호 입력 */}
          {resetStep === 2 && resetMethod === "phone" && (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                전화번호를 입력해주세요
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                가입 시 등록한 전화번호를 입력해주세요.
              </p>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  전화번호
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={resetPhone}
                    onChange={(e) => {
                      setResetPhone(e.target.value);
                      setResetError("");
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                  />
                  <button
                    className="px-4 py-3 rounded-xl text-white font-medium"
                    style={{ backgroundColor: "#72C2FF" }}
                  >
                    인증요청
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  인증번호
                </label>
                <input
                  type="text"
                  placeholder="인증번호 6자리"
                  value={resetVerifyCode}
                  onChange={(e) => {
                    setResetVerifyCode(e.target.value);
                    setResetError("");
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                />
                <p className="text-xs text-gray-400 mt-2">3:00</p>
              </div>

              {resetError && (
                <p className="text-sm text-red-500 mb-4">{resetError}</p>
              )}

              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg"
                style={{
                  backgroundColor:
                    resetPhone && resetVerifyCode ? "#72C2FF" : "#E5E7EB",
                }}
                onClick={() => {
                  if (resetPhone && resetVerifyCode) {
                    // 회원 체크 시뮬레이션
                    const isMember = resetPhone === "01012345678";
                    if (isMember) {
                      setResetStep(4);
                    } else {
                      setResetError("존재하지 않는 회원입니다.");
                    }
                  }
                }}
              >
                다음
              </button>
            </div>
          )}

          {/* Step 2: 이메일 입력 */}
          {resetStep === 2 && resetMethod === "email" && (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                이메일을 입력해주세요
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                가입 시 등록한 이메일을 입력해주세요.
              </p>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  이메일
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      setResetError("");
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                  />
                  <button
                    className="px-4 py-3 rounded-xl text-white font-medium"
                    style={{ backgroundColor: "#72C2FF" }}
                  >
                    인증요청
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  인증번호
                </label>
                <input
                  type="text"
                  placeholder="인증번호 6자리"
                  value={resetVerifyCode}
                  onChange={(e) => {
                    setResetVerifyCode(e.target.value);
                    setResetError("");
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                />
                <p className="text-xs text-gray-400 mt-2">3:00</p>
              </div>

              {resetError && (
                <p className="text-sm text-red-500 mb-4">{resetError}</p>
              )}

              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg"
                style={{
                  backgroundColor:
                    resetEmail && resetVerifyCode ? "#72C2FF" : "#E5E7EB",
                }}
                onClick={() => {
                  if (resetEmail && resetVerifyCode) {
                    // 회원 체크 시뮬레이션
                    const isMember = resetEmail === "test@test.com";
                    if (isMember) {
                      setResetStep(4);
                    } else {
                      setResetError("존재하지 않는 회원입니다.");
                    }
                  }
                }}
              >
                다음
              </button>
            </div>
          )}

          {/* Step 4: 새 비밀번호 입력 */}
          {resetStep === 4 && (
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                새 비밀번호를 입력해주세요
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                영문/숫자/특수문자 포함 8자 이상 입력해주세요.
              </p>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  새 비밀번호 확인
                </label>
                <input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 비밀번호 조건 체크 */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      newPassword.length >= 8
                        ? "text-[#72C2FF]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      newPassword.length >= 8
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    8자 이상
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      /[A-Za-z]/.test(newPassword)
                        ? "text-[#72C2FF]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      /[A-Za-z]/.test(newPassword)
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    영문 포함
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      /[0-9]/.test(newPassword)
                        ? "text-[#72C2FF]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      /[0-9]/.test(newPassword)
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    숫자 포함
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                        ? "text-[#72C2FF]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    특수문자 포함
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className={`w-4 h-4 ${
                      newPassword && newPassword === newPasswordConfirm
                        ? "text-[#72C2FF]"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      newPassword && newPassword === newPasswordConfirm
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    비밀번호 일치
                  </span>
                </div>
              </div>

              <button
                className="w-full py-4 rounded-full text-white font-bold text-lg"
                style={{
                  backgroundColor:
                    newPassword.length >= 8 &&
                    /[A-Za-z]/.test(newPassword) &&
                    /[0-9]/.test(newPassword) &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
                    newPassword === newPasswordConfirm
                      ? "#72C2FF"
                      : "#E5E7EB",
                }}
                onClick={() => {
                  const isValid =
                    newPassword.length >= 8 &&
                    /[A-Za-z]/.test(newPassword) &&
                    /[0-9]/.test(newPassword) &&
                    /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) &&
                    newPassword === newPasswordConfirm;

                  if (isValid) {
                    // 비밀번호 재설정 완료 → 로그인 페이지로
                    setShowResetPassword(false);
                    setResetStep(1);
                    setResetMethod(null);
                    setResetPhone("");
                    setResetEmail("");
                    setResetVerifyCode("");
                    setNewPassword("");
                    setNewPasswordConfirm("");
                    setStep(1);
                  }
                }}
              >
                비밀번호 재설정
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
