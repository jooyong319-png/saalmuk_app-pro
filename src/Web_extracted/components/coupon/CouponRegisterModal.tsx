// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import type { Coupon } from "./types";

interface CouponRegisterModalProps {
  coupon: Coupon;
  allCoupons: Coupon[];
  onClose: () => void;
  onToast: (msg: string) => void;
  initialTab?: "등록" | "신규";
}

export default function CouponRegisterModal({ coupon, allCoupons, onClose, onToast, initialTab = "등록" }: CouponRegisterModalProps) {
  const [tab, setTab] = useState<"등록" | "신규">(initialTab);

  // 게임 선택 드롭다운
  const [showPicker, setShowPicker] = useState(false);
  const [gameSearch, setGameSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Coupon | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // 등록된 게임 폼
  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [source, setSource] = useState("");

  // 신규 게임 폼
  const [newGameName, setNewGameName] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newReward, setNewReward] = useState("");
  const [newExpireDate, setNewExpireDate] = useState("");
  const [newSource, setNewSource] = useState("");

  const filteredGames = allCoupons.filter((c) =>
    c.name.toLowerCase().includes(gameSearch.toLowerCase()) ||
    c.description.toLowerCase().includes(gameSearch.toLowerCase())
  );

  // 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelectGame = (c: Coupon) => {
    setSelectedGame(c);
    setShowPicker(false);
    setGameSearch("");
  };

  const handleSubmit = () => {
    if (tab === "등록") {
      if (!selectedGame || !code.trim() || !reward.trim()) {
        onToast("게임, 쿠폰 코드, 보상 내용을 입력해주세요.");
        return;
      }
      onToast("쿠폰이 등록되었습니다! +100P 지급");
    } else {
      if (!newGameName.trim() || !newCode.trim() || !newReward.trim()) {
        onToast("게임 이름, 쿠폰 코드, 보상 내용을 입력해주세요.");
        return;
      }
      onToast("신규 게임쿠폰 신청이 완료되었습니다! +100P 지급");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col" style={{ maxHeight: "88vh" }}>

        {/* 헤더 */}
        <div className="flex-shrink-0 px-5 pt-5 pb-4" style={{ background: "linear-gradient(135deg, #72C2FF 0%, #9B6FF5 100%)" }}>
          <div className="flex items-center justify-between mb-1">
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <p className="text-white font-bold text-[17px]">{tab === "등록" ? "쿠폰 등록하기" : "신규 게임쿠폰 신청"}</p>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <span className="text-white/80 text-xs">등록 시</span>
            <span className="bg-white/25 text-white text-xs font-bold px-2 py-0.5 rounded-full">+100P</span>
            <span className="text-white/80 text-xs">즉시 지급</span>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex-shrink-0 px-4 pt-4 pb-0">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {(["등록", "신규"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t ? "bg-white text-[#1A1A2E] shadow-sm" : "text-gray-400"
                }`}
              >
                {t === "등록" ? "등록된 게임" : "신규 게임 신청"}
              </button>
            ))}
          </div>
        </div>

        {/* 폼 영역 */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          {tab === "등록" ? (
            <>
              {/* 게임 선택 커스텀 드롭다운 */}
              <div ref={pickerRef} className="relative">
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  게임 선택 <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPicker((v) => !v)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-colors ${
                    showPicker ? "border-[#72C2FF]" : "border-gray-200"
                  } ${selectedGame ? "text-gray-800" : "text-gray-400"}`}
                >
                  {selectedGame ? (
                    <div className="flex items-center gap-2">
                      <img src={selectedGame.image} className="w-6 h-6 rounded-md object-cover" />
                      <span className="font-medium">{selectedGame.name}</span>
                    </div>
                  ) : (
                    <span>게임을 선택해주세요</span>
                  )}
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${showPicker ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 드롭다운 패널 */}
                {showPicker && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                    {/* 검색 */}
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        autoFocus
                        type="text"
                        value={gameSearch}
                        onChange={(e) => setGameSearch(e.target.value)}
                        placeholder="게임명 검색"
                        className="flex-1 text-sm outline-none placeholder-gray-400"
                      />
                    </div>

                    {/* 게임 목록 */}
                    <div className="max-h-[200px] overflow-y-auto">
                      {filteredGames.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectGame(c)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                        >
                          <img src={c.image} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#1A1A2E] truncate">{c.name}</p>
                            <p className="text-xs text-gray-400">{c.description}</p>
                          </div>
                        </button>
                      ))}
                      {filteredGames.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-6">검색 결과가 없습니다</p>
                      )}
                    </div>

                    {/* 게임이 없나요? */}
                    <button
                      type="button"
                      onClick={() => { setShowPicker(false); setTab("신규"); }}
                      className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-100 hover:bg-blue-50 transition-colors text-left"
                    >
                      <div className="w-9 h-9 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#72C2FF]">게임이 없나요?</p>
                        <p className="text-xs text-gray-400">새 게임쿠폰 등록 신청하기</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* 쿠폰 코드 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  쿠폰 코드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="예 : GENSHIN2026"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 보상 내용 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  보상 내용 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="예: 원석 100개 + 모라 50,000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 만료일 + 출처 */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">만료일 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <input
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#72C2FF]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">출처 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="예: 공식 트위터"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                  />
                </div>
              </div>

              {/* 안내 박스 */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mb-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  등록 전 확인해주세요!
                </p>
                <ul className="flex flex-col gap-0.5">
                  <li className="text-xs text-amber-600">· 이미 등록된 쿠폰은 중복 등록이 불가해요</li>
                  <li className="text-xs text-amber-600">· 허위 정보 등록 시 포인트가 회수돼요</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* 게임 이름 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  게임 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newGameName}
                  onChange={(e) => setNewGameName(e.target.value)}
                  placeholder="예: 원신, 블루 아카이브"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 쿠폰 코드 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  쿠폰 코드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="예 : GENSHIN2026"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 보상 내용 */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                  보상 내용 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newReward}
                  onChange={(e) => setNewReward(e.target.value)}
                  placeholder="예: 원석 100개 + 모라 50,000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                />
              </div>

              {/* 만료일 + 출처 */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">만료일 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <input
                    type="date"
                    value={newExpireDate}
                    onChange={(e) => setNewExpireDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#72C2FF]"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">출처 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    placeholder="예: 공식 트위터"
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm placeholder-gray-300 focus:outline-none focus:border-[#72C2FF]"
                  />
                </div>
              </div>

              {/* 안내 박스 */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex flex-col gap-2">
                <div>
                  <p className="text-xs font-bold text-amber-700 flex items-center gap-1 mb-1.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    등록 전 확인해주세요!
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    <li className="text-xs text-amber-600">· 이미 등록된 쿠폰은 중복 등록이 불가해요</li>
                    <li className="text-xs text-amber-600">· 허위 정보 등록 시 포인트가 회수돼요</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-2.5">
                  <p className="text-xs text-green-700 leading-relaxed">
                    신규 게임쿠폰 등록을 신청하시면, 운영진이 확인 후 게임쿠폰 등록 여부를 결정합니다.<br />
                    <span className="font-bold">단, 등록이 안되더라도 포인트는 지급됩니다.</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex-shrink-0 px-4 py-4">
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl text-white font-bold text-[15px]"
            style={{ background: "linear-gradient(135deg, #72C2FF 0%, #9B6FF5 100%)" }}
          >
            {tab === "등록" ? "쿠폰 등록하기" : "신규 게임쿠폰 신청하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
