import { useState } from "react";

export default function Signup({
  setCurrentPage,
  setShowLogin,
  onLogin,
}: {
  setCurrentPage: (page: string) => void;
  setShowLogin?: (show: boolean) => void;
  onLogin?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agrees, setAgrees] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 팝업 상태
  const [showDuplicateAccount, setShowDuplicateAccount] = useState(false);
  const [showDuplicateNickname, setShowDuplicateNickname] = useState(false);

  const handleAgreeAll = () => {
    const newValue = !agreeAll;
    setAgreeAll(newValue);
    setAgrees({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleAgree = (key: keyof typeof agrees) => {
    const newAgrees = { ...agrees, [key]: !agrees[key] };
    setAgrees(newAgrees);
    setAgreeAll(Object.values(newAgrees).every((v) => v));
  };

  const games = [
    { id: 1, name: "메이플스토리", icon: "🍁" },
    { id: 2, name: "로스트아크", icon: "⚔️" },
    { id: 3, name: "리니지", icon: "🗡️" },
    { id: 4, name: "던전앤파이터", icon: "👊" },
    { id: 5, name: "피파온라인", icon: "⚽" },
    { id: 6, name: "롤", icon: "🎮" },
    { id: 7, name: "발로란트", icon: "🔫" },
    { id: 8, name: "오버워치", icon: "🦸" },
  ];

  const toggleGame = (gameName: string) => {
    if (selectedGames.includes(gameName)) {
      setSelectedGames(selectedGames.filter((g) => g !== gameName));
    } else {
      setSelectedGames([...selectedGames, gameName]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={() =>
            step > 1 ? setStep(step - 1) : setCurrentPage("home")
          }
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
        <span className="text-lg font-bold">회원가입</span>
        <div className="w-6"></div>
      </div>

      {/* 진행 상태 바 */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2">
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 1 ? "bg-[#72C2FF]" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 2 ? "bg-[#72C2FF]" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 3 ? "bg-[#72C2FF]" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`flex-1 h-1 rounded-full ${
              step >= 4 ? "bg-[#72C2FF]" : "bg-gray-200"
            }`}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">{step}/4</p>
      </div>

      {/* Step 1: SNS 선택 */}
      {step === 1 && (
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            간편하게 시작하기
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            SNS 계정으로 빠르게 가입하세요.
          </p>

          <div className="space-y-3">
            {/* 네이버 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl"
              style={{ backgroundColor: "#03C75A" }}
              onClick={() => setStep(2)}
            >
              <span className="text-white font-bold text-lg">N</span>
              <span className="text-white font-medium">네이버로 계속하기</span>
            </button>

            {/* 카카오 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-yellow-400"
              onClick={() => setStep(2)}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-black font-bold text-sm">talk</span>
              </div>
              <span className="text-black font-medium">카카오로 계속하기</span>
            </button>

            {/* 구글 */}
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-gray-200"
              onClick={() => setStep(2)}
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
              <span className="text-gray-700 font-medium">
                Google로 계속하기
              </span>
            </button>
          </div>

          <p className="text-xs text-center text-gray-400 mt-8">
            계속하면 <span className="text-gray-600">서비스 이용약관</span> 및{" "}
            <span className="text-gray-600">개인정보 처리방침</span>에 동의하는
            것으로 간주됩니다.
          </p>
        </div>
      )}

      {/* Step 2: 약관 동의 */}
      {step === 2 && (
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            약관에 동의해주세요
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            서비스 이용을 위해 약관 동의가 필요합니다.
          </p>

          {/* 전체 동의 */}
          <div
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-4 cursor-pointer"
            onClick={handleAgreeAll}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                agreeAll ? "bg-[#72C2FF]" : "border-2 border-gray-300"
              }`}
            >
              {agreeAll && (
                <svg
                  className="w-4 h-4 text-white"
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
            </div>
            <span className="font-bold text-gray-900">전체 동의</span>
          </div>

          {/* 개별 약관 */}
          <div className="space-y-3 mb-8">
            <div
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={() => handleAgree("terms")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    agrees.terms ? "bg-[#72C2FF]" : "border-2 border-gray-300"
                  }`}
                >
                  {agrees.terms && (
                    <svg
                      className="w-3 h-3 text-white"
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
                </div>
                <span className="text-gray-700">[필수] 서비스 이용약관</span>
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
            </div>

            <div
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={() => handleAgree("privacy")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    agrees.privacy ? "bg-[#72C2FF]" : "border-2 border-gray-300"
                  }`}
                >
                  {agrees.privacy && (
                    <svg
                      className="w-3 h-3 text-white"
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
                </div>
                <span className="text-gray-700">[필수] 개인정보 처리방침</span>
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
            </div>

            <div
              className="flex items-center justify-between py-3 cursor-pointer"
              onClick={() => handleAgree("marketing")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    agrees.marketing
                      ? "bg-[#72C2FF]"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {agrees.marketing && (
                    <svg
                      className="w-3 h-3 text-white"
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
                </div>
                <span className="text-gray-700">
                  [선택] 마케팅 정보 수신 동의
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
            </div>
          </div>

          {/* 다음 버튼 */}
          <button
            className="w-full py-4 rounded-full text-white font-bold text-lg"
            style={{
              backgroundColor:
                agrees.terms && agrees.privacy ? "#72C2FF" : "#E5E7EB",
            }}
            onClick={() => agrees.terms && agrees.privacy && setStep(3)}
          >
            다음
          </button>
        </div>
      )}

      {/* Step 3: 닉네임 입력 */}
      {step === 3 && (
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            닉네임을 설정해주세요
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            다른 유저들에게 보여질 이름이에요.
          </p>

          {/* 닉네임 입력 */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#72C2FF]"
            />
            <p className="text-xs text-gray-400 mt-2">
              한글, 영문, 숫자 중 1자 이상 10자 이하
            </p>
          </div>

          {/* 다음 버튼 */}
          <button
            className="w-full py-4 rounded-full text-white font-bold text-lg"
            style={{
              backgroundColor:
                nickname.length >= 1 && nickname.length <= 10
                  ? "#72C2FF"
                  : "#E5E7EB",
            }}
            onClick={() => {
              if (nickname.length >= 1 && nickname.length <= 10) {
                // 중복 체크 시뮬레이션 (실제로는 API 호출)
                const isDuplicate = nickname === "테스트"; // 예시: "테스트"는 중복
                if (isDuplicate) {
                  setShowDuplicateNickname(true);
                } else {
                  setStep(4);
                }
              }
            }}
          >
            다음
          </button>
        </div>
      )}

      {/* Step 4: 관심 게임 선택 */}
      {step === 4 && (
        <div className="px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            관심 게임을 선택해주세요
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            맞춤 콘텐츠를 추천해 드릴게요.
          </p>

          {/* 게임 선택 */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {games.map((game) => (
              <button
                key={game.id}
                className={`flex items-center gap-3 p-4 rounded-xl border ${
                  selectedGames.includes(game.name)
                    ? "border-[#72C2FF] bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => toggleGame(game.name)}
              >
                <span className="text-2xl">{game.icon}</span>
                <span
                  className={`text-sm ${
                    selectedGames.includes(game.name)
                      ? "text-[#72C2FF] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {game.name}
                </span>
              </button>
            ))}
          </div>

          {/* 가입 완료 버튼 */}
          <button
            className="w-full py-4 rounded-full text-white font-bold text-lg"
            style={{ backgroundColor: "#72C2FF" }}
            onClick={() => {
              onLogin?.();
              setCurrentPage("home");
            }}
          >
            가입 완료
          </button>

          {/* 건너뛰기 */}
          <button
            className="w-full py-3 text-gray-400 text-sm mt-2"
            onClick={() => {
              onLogin?.();
              setCurrentPage("home");
            }}
          >
            건너뛰기
          </button>
        </div>
      )}

      {/* 가입된 계정 팝업 */}
      {showDuplicateAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDuplicateAccount(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              가입된 계정이 있습니다.
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              이미 가입된 계정으로 로그인해주세요.
            </p>
            <button
              className="w-full py-3 rounded-full text-white font-bold"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => {
                setShowDuplicateAccount(false);
                if (setShowLogin) setShowLogin(true);
                setCurrentPage("home");
              }}
            >
              로그인하기
            </button>
          </div>
        </div>
      )}

      {/* 중복 닉네임 팝업 */}
      {showDuplicateNickname && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDuplicateNickname(false)}
          />
          <div className="relative bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              중복된 닉네임이 있습니다.
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              다른 닉네임을 입력해주세요.
            </p>
            <button
              className="w-full py-3 rounded-full text-white font-bold"
              style={{ backgroundColor: "#72C2FF" }}
              onClick={() => setShowDuplicateNickname(false)}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
