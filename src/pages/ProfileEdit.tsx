import { useState, useEffect } from "react";

export default function ProfileEdit({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [nickname, setNickname] = useState("쌀먹마스터");
  const [originalNickname] = useState("쌀먹마스터");
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState(false);
  const [isCheckingNickname, setIsCheckingNickname] = useState(false);
  
  // 본인 인증 관련
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [verifyStep, setVerifyStep] = useState(1); // 1: 방법 선택, 2: 인증 중, 3: 완료
  
  // 닉네임 유효성 검사 (한글, 영문, 숫자 1~10자)
  const isValidNickname = (name: string) => {
    const regex = /^[가-힣a-zA-Z0-9]{1,10}$/;
    return regex.test(name);
  };
  
  const isNicknameChanged = nickname !== originalNickname;
  const canCheckNickname = isValidNickname(nickname) && isNicknameChanged;
  
  // 닉네임 중복 체크 (시뮬레이션)
  const checkNicknameDuplicate = async () => {
    if (!canCheckNickname) return;
    
    setIsCheckingNickname(true);
    setNicknameError("");
    setNicknameSuccess(false);
    
    // 시뮬레이션: 1초 후 결과
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 테스트용: "테스트", "admin", "쌀먹"이 포함되면 중복
    const duplicateNames = ["테스트", "admin", "쌀먹유저", "test"];
    const isDuplicate = duplicateNames.some(name => 
      nickname.toLowerCase() === name.toLowerCase()
    );
    
    if (isDuplicate) {
      setNicknameError("중복된 닉네임이 있습니다.");
    } else {
      setNicknameSuccess(true);
    }
    
    setIsCheckingNickname(false);
  };
  
  // 본인 인증 처리 (시뮬레이션)
  const handleVerify = async (method: string) => {
    setVerifyStep(2);
    setVerifyError("");
    
    // 시뮬레이션: 2초 후 결과
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 테스트용: 랜덤하게 성공/실패 (80% 성공)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      setVerifyStep(3);
      setTimeout(() => {
        setIsVerified(true);
        setShowVerifyModal(false);
        setVerifyStep(1);
      }, 1500);
    } else {
      setVerifyError("해당 정보로 등록된 계정이 존재합니다.");
      setVerifyStep(1);
    }
  };
  
  // 확인 버튼 클릭
  const handleConfirm = () => {
    if (nicknameSuccess || !isNicknameChanged) {
      // 마이페이지로 이동
      goBack ? goBack() : setCurrentPage("mypage");
    }
  };
  
  // 뒤로가기 처리
  useEffect(() => {
    if (showVerifyModal) {
      window.history.pushState({ verify: true }, "");
      const handlePopState = () => {
        setShowVerifyModal(false);
        setVerifyStep(1);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [showVerifyModal]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-bold text-gray-900">정보 수정</span>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* 프로필 이미지 */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-5xl shadow-md">
                🍙
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">프로필 이미지 변경</p>
          </div>
        </div>

        {/* 닉네임 변경 */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">닉네임</h3>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setNicknameError("");
                    setNicknameSuccess(false);
                  }}
                  placeholder="닉네임 입력"
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                    nicknameError 
                      ? "border-red-400 bg-red-50" 
                      : nicknameSuccess 
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 focus:border-[#72C2FF]"
                  }`}
                />
                {nickname && (
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      setNickname("");
                      setNicknameError("");
                      setNicknameSuccess(false);
                    }}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={checkNicknameDuplicate}
                disabled={!canCheckNickname || isCheckingNickname}
                className={`px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  canCheckNickname && !isCheckingNickname
                    ? "bg-[#72C2FF] text-white active:bg-[#5BA8E6]"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCheckingNickname ? "확인 중..." : "중복 확인"}
              </button>
            </div>
            
            {/* 안내 메시지 */}
            <div className="text-xs space-y-1">
              <p className={`${!isValidNickname(nickname) && nickname ? "text-red-500" : "text-gray-400"}`}>
                • 한글, 영문, 숫자 조합 1~10자
              </p>
              {nicknameError && (
                <p className="text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {nicknameError}
                </p>
              )}
              {nicknameSuccess && (
                <p className="text-green-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  사용 가능한 닉네임입니다.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 본인 인증 */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">본인 인증</h3>
          
          {isVerified ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">본인 인증 완료</p>
                <p className="text-xs text-green-600">인증이 완료되었습니다.</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowVerifyModal(true)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl active:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">본인 인증하기</p>
                  <p className="text-xs text-gray-400">휴대폰 또는 PASS 인증</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* 계정 정보 */}
        <div className="bg-white rounded-2xl p-4">
          <h3 className="text-sm font-bold text-gray-900 mb-4">계정 정보</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">가입일</span>
              <span className="text-sm text-gray-700">2024.03.15</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">로그인 방식</span>
              <span className="text-sm text-gray-700">카카오 로그인</span>
            </div>
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={handleConfirm}
          disabled={isNicknameChanged && !nicknameSuccess}
          className={`w-full py-4 rounded-xl text-base font-bold transition-colors ${
            (!isNicknameChanged || nicknameSuccess)
              ? "bg-[#72C2FF] text-white active:bg-[#5BA8E6]"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          확인
        </button>

        {/* 회원 탈퇴 */}
        <button className="w-full text-center text-sm text-gray-400 py-2">
          회원 탈퇴
        </button>
      </div>

      {/* 본인 인증 모달 */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center" onClick={() => window.history.back()}>
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">본인 인증</h3>
              <button onClick={() => window.history.back()} className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {verifyStep === 1 && (
                <>
                  {verifyError && (
                    <div className="mb-4 p-3 bg-red-50 rounded-xl flex items-center gap-2 text-red-500 text-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {verifyError}
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-500 mb-4">인증 방법을 선택해주세요.</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleVerify("phone")}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl active:bg-gray-50"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">휴대폰 본인 인증</p>
                        <p className="text-xs text-gray-400">SMS로 인증번호 받기</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleVerify("pass")}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl active:bg-gray-50"
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🔐</span>
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">PASS 인증</p>
                        <p className="text-xs text-gray-400">PASS 앱으로 간편 인증</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
              
              {verifyStep === 2 && (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-[#72C2FF] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm text-gray-500">인증 진행 중...</p>
                </div>
              )}
              
              {verifyStep === 3 && (
                <div className="py-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">인증이 완료되었습니다!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
