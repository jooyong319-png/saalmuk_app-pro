import { useState, useEffect } from "react";
import type { Coupon, DiscountItem } from "./types";

// ===== 목업 유저 잔액 =====
const USER_POINTS = 15000;
const USER_CASH = 5000;

// ===== 결제수단 정의 =====
const EASY_METHODS = [
  { id: "payco", label: "PAYCO", icon: "🅿", limit: "한도 없음", fee: 5 },
  { id: "toss", label: "Toss Pay", icon: "💙", limit: "1회 : 200만원", fee: 5 },
  { id: "naver", label: "Naver Pay", icon: "🟢", limit: "포인트: 최대 200만원", fee: 5 },
  { id: "kakao", label: "Kakao Pay", icon: "🟡", limit: "1회 : 200만원", fee: 5 },
  { id: "samsung", label: "Samsung Pay", icon: "🔷", limit: "카드사별 상이", fee: 5 },
];
const GENERAL_METHODS = [
  { id: "mobile", label: "휴대폰결제", icon: "📱", limit: "고객 개인 한도", fee: 15 },
  { id: "card", label: "신용카드", icon: "💳", limit: "카드사별 상이", fee: 5 },
  { id: "transfer", label: "실시간계좌이체", icon: "🏦", limit: "1일 : 500만원", fee: 0, fixedFee: 500 },
];
const VIRTUAL_ACCOUNT = { id: "virtual", label: "가상계좌", icon: "🏧", limit: "한도 없음", fee: 0 };

const SERVERS = ["아시아", "아메리카", "유럽", "TW/HK/MO"];
const REVIEW_TAGS = ["가격 만족", "빠른 발송", "사용 편리", "재구매 의사", "친절한 판매자", "포장 깔끔"];

function calcFee(amount: number, method: typeof EASY_METHODS[0] | typeof GENERAL_METHODS[0] | typeof VIRTUAL_ACCOUNT) {
  if ("fixedFee" in method && method.fixedFee) return method.fixedFee;
  return Math.floor(amount * (method.fee / 100));
}

// ===== Step1: 상품 결제 모달 =====
function PurchaseModal({
  item, coupon, onClose, onPay,
}: {
  item: DiscountItem;
  coupon: Coupon;
  onClose: () => void;
  onPay: (info: PurchaseInfo) => void;
}) {
  const [method, setMethod] = useState<"UID" | "PIN">(item.type);
  const [server, setServer] = useState(SERVERS[0]);
  const [uid, setUid] = useState("");
  const [qty, setQty] = useState(1);
  const [payMethod, setPayMethod] = useState<"point" | "cash" | "card">("point");
  const [showCharge, setShowCharge] = useState<"point" | "cash" | null>(null);

  const discounted = Math.floor((item.originalPrice * (100 - item.discount)) / 100 / 10) * 10;
  const total = discounted * qty;

  const handlePay = () => {
    if (method === "UID" && !uid.trim()) {
      alert("게임 UID를 입력해주세요.");
      return;
    }
    if (payMethod === "point" && USER_POINTS < total) {
      alert("포인트가 부족합니다.");
      return;
    }
    if (payMethod === "cash" && USER_CASH < total) {
      alert("캐시가 부족합니다.");
      return;
    }
    onPay({ method, server, uid, qty, payMethod, total, cardMethod: "" });
  };

  return (<>
    <WideDialog onClose={onClose}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <div>
          <p className="text-xs font-semibold text-[#4A9FD9]">{coupon.name}</p>
          <p className="text-xl font-extrabold text-[#1A1A2E]">상품 결제</p>
        </div>
        <CloseBtn onClick={onClose} />
      </div>

      {/* 2열 본문 */}
      <div className="grid grid-cols-[1fr_300px] flex-1 overflow-hidden">

        {/* 왼쪽: 상품 정보 + 구매 방식 */}
        <div className="px-6 py-5 overflow-y-auto flex flex-col gap-5 border-r border-gray-100">
          {/* 상품 카드 */}
          <div className="flex items-center gap-4 p-4 bg-[#F5F6F8] rounded-2xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.5 2.5c0 1.5-1.5 5-1.5 5h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 9c-1.1 0-2 .9-2 2v1l-5 5 1.5 1.5 5-5h1l5 5 1.5-1.5-5-5v-1c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1A1A2E] text-[15px] truncate">{item.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${item.type === "UID" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-500"}`}>{item.type}</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="text-xs font-bold text-red-500">-{item.discount}%</span>
              <span className="text-xs text-gray-400 line-through">{item.originalPrice.toLocaleString()}원</span>
              <span className="text-[16px] font-extrabold text-[#1A1A2E]">{discounted.toLocaleString()}원</span>
            </div>
          </div>

          {/* 구매 방식 */}
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] mb-2.5">구매 방식</p>
            <div className="grid grid-cols-2 gap-3">
              {(["UID", "PIN"] as const).map((m) => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${method === m ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                  <span className="text-2xl">{m === "UID" ? "🔑" : "🎫"}</span>
                  <div>
                    <p className={`text-sm font-bold ${method === m ? "text-[#4A9FD9]" : "text-gray-600"}`}>{m} 방식</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{m === "UID" ? "UID 입력 → 우편함 지급" : "코드 발급 → 게임 내 등록"}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* UID 방식 추가 필드 */}
          {method === "UID" && (
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1.5">서버 선택</p>
                <select value={server} onChange={(e) => setServer(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#72C2FF] bg-white">
                  {SERVERS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1.5">게임 UID</p>
                <input type="text" value={uid} onChange={(e) => setUid(e.target.value)}
                  placeholder="게임 내 UID를 입력하세요"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#72C2FF]" />
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽: 결제 */}
        <div className="px-5 py-5 bg-gray-50 flex flex-col gap-4">
          {/* 수량 */}
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] mb-2">수량</p>
            <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 border border-gray-200 w-fit">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-7 h-7 rounded-full bg-gray-100 font-bold text-base hover:bg-gray-200 transition-colors flex items-center justify-center">−</button>
              <span className="text-[16px] font-extrabold text-[#1A1A2E] w-6 text-center">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="w-7 h-7 rounded-full bg-gray-100 font-bold text-base hover:bg-gray-200 transition-colors flex items-center justify-center">+</button>
            </div>
          </div>

          {/* 결제 수단 */}
          <div>
            <p className="text-sm font-bold text-[#1A1A2E] mb-2">결제 수단</p>
            <div className="flex flex-col gap-1.5">
              {[
                { id: "point" as const, label: "포인트", icon: "🔵" },
                { id: "cash" as const, label: "캐시", icon: "🔴" },
                { id: "card" as const, label: "신용카드", icon: "💜" },
              ].map((pm) => (
                <button key={pm.id} onClick={() => setPayMethod(pm.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all text-left ${payMethod === pm.id ? "border-[#72C2FF] bg-[#E8F4FD] text-[#4A9FD9]" : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"}`}>
                  <span>{pm.icon}</span>{pm.label}
                </button>
              ))}
            </div>
            {payMethod !== "card" && (
              <div className="mt-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  보유: <span className="font-bold text-[#1A1A2E]">{(payMethod === "point" ? USER_POINTS : USER_CASH).toLocaleString()}{payMethod === "point" ? "P" : "C"}</span>
                </span>
                <button onClick={() => setShowCharge(payMethod === "point" ? "point" : "cash")}
                  className="text-xs text-[#72C2FF] font-semibold border border-[#72C2FF] rounded-full px-2.5 py-0.5 hover:bg-[#72C2FF]/10">충전</button>
              </div>
            )}
            {payMethod === "card" && (
              <p className="mt-2 text-xs text-gray-400 bg-white border border-gray-200 rounded-xl px-3 py-2.5">💜 결제하기를 누르면 결제수단을 선택할 수 있습니다</p>
            )}
          </div>

          {/* 스페이서 */}
          <div className="flex-1" />

          {/* 주문 요약 */}
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex flex-col gap-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>상품 금액</span><span>{discounted.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>수량</span><span>{qty}개</span>
            </div>
            <div className="border-t border-dashed border-gray-200 my-1" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-[#1A1A2E]">결제 금액</span>
              <span className="text-[18px] font-extrabold text-[#1A1A2E]">{total.toLocaleString()}원</span>
            </div>
          </div>

          <button onClick={handlePay}
            className="w-full py-3 rounded-xl bg-[#72C2FF] text-white font-extrabold text-[15px] hover:bg-[#5BA8E6] transition-colors">
            {total.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </WideDialog>

    {showCharge === "point" && (
      <PointChargeModal onClose={() => setShowCharge(null)} />
    )}
    {showCharge === "cash" && (
      <CashChargeModal
        onClose={() => setShowCharge(null)}
        onComplete={() => {
          setShowCharge(null);
          alert("충전이 완료되었습니다!");
        }}
      />
    )}
  </>);
}

// ===== 포인트 서브뷰 데이터 =====
const REWARDS_DATA = [
  { id: 1, ic: "🎯", t: "출석 체크 리워드", d: "매일 출석 시 포인트 적립", r: "10~100원" },
  { id: 2, ic: "📱", t: "앱 설치 리워드", d: "제휴 앱 설치 시 포인트 적립", r: "100~1,000원" },
  { id: 3, ic: "🎯", t: "미션 완료 리워드", d: "다양한 미션 완료 시 포인트 적립", r: "10~500원" },
  { id: 4, ic: "📝", t: "설문 참여 리워드", d: "설문조사 참여 시 포인트 적립", r: "50~2,000원" },
  { id: 5, ic: "👥", t: "친구 초대 리워드", d: "친구 1명 초대 시 포인트 적립", r: "500원" },
  { id: 6, ic: "🎮", t: "게임 플레이 리워드", d: "제휴 게임 플레이 시 포인트 적립", r: "5~100원" },
];

const TICKER_DATA = [
  "p***님 3등 당첨! 번개포인트 1천원 29분 전",
  "깡*님 3등 당첨! 번개포인트 1천원 32분 전",
  "미***님 3등 당첨! 번개포인트 1천원 41분 전",
  "하**님 2등 당첨! 번개포인트 5천원 1시간 전",
  "김***님 3등 당첨! 번개포인트 1천원 2시간 전",
];

// ─── 미션 서브뷰 ───
function RewardSubView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0F0F0F", color: "#fff" }}>
      <div className="flex items-center h-12 px-4 border-b flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button onClick={onBack} className="mr-3 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-base font-semibold">리워드</span>
      </div>
      <div className="overflow-y-auto flex-1 px-5 py-5">
        <p className="text-xs mb-1" style={{ color: "#888" }}>오늘 받을 수 있는 리워드</p>
        <p className="text-[26px] font-bold mb-5">최대 6,273,705<span className="text-base">원</span></p>
        <p className="text-sm font-semibold mb-3 px-1">미션 리스트</p>
        <div className="flex flex-col gap-2">
          {REWARDS_DATA.map((r) => (
            <button key={r.id} className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl" style={{ background: "#1A1A1A", color: "#fff" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0" style={{ background: "#252525" }}>{r.ic}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium">{r.t}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#666" }}>{r.d}</p>
              </div>
              <span className="text-[13px] font-bold flex-shrink-0" style={{ color: "#4CD964" }}>{r.r}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 번개복권 서브뷰 ───
function LotterySubView({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "result">("idle");
  const [result, setResult] = useState<number | null>(null);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [chances, setChances] = useState(10);
  const [winners, setWinners] = useState({ a: 0, b: 0, c: 9 });
  const [remain, setRemain] = useState(112);
  const [timer, setTimer] = useState(2 * 3600 + 36 * 60 + 41);

  useEffect(() => {
    const iv = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => setTickerIdx((i) => (i + 1) % TICKER_DATA.length), 3000);
    return () => clearInterval(iv);
  }, []);

  const hh = String(Math.floor(timer / 3600)).padStart(2, "0");
  const mm = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
  const ss = String(timer % 60).padStart(2, "0");

  const prizeLabel = (v: number) => v >= 100000 ? "1등" : v >= 10000 ? "2등" : "3등";
  const prizeAmount = (v: number) => v >= 100000 ? "10만원" : v >= 10000 ? "1만원" : "1천원";

  const handleDraw = () => {
    if (chances <= 0) return;
    setPhase("loading");
    const prizes = [1000, 1000, 1000, 1000, 1000, 1000, 1000, 10000, 10000, 100000];
    const won = prizes[Math.floor(Math.random() * prizes.length)];
    setResult(won);
    setTimeout(() => {
      setPhase("result");
      setChances((c) => c - 1);
      if (won >= 100000) setWinners((w) => ({ ...w, a: w.a + 1 }));
      else if (won >= 10000) setWinners((w) => ({ ...w, b: w.b + 1 }));
      else setWinners((w) => ({ ...w, c: w.c + 1 }));
      setRemain((r) => Math.max(0, r - 1));
    }, 2000);
  };

  const reset = () => { setPhase("idle"); setResult(null); };

  if (phase === "loading") {
    return (
      <div className="flex flex-col h-full items-center justify-center" style={{ background: "#0F0F0F", color: "#fff" }}>
        <h2 className="text-xl font-bold text-center leading-relaxed mb-10">두근두근...<br />얼마가 나올까요?</h2>
        <svg className="w-8 h-8" viewBox="0 0 24 24" style={{ animation: "spin 0.8s linear infinite" }}>
          <circle cx="12" cy="12" r="10" stroke="#999" strokeWidth="2.5" fill="none" strokeDasharray="50" strokeLinecap="round" />
        </svg>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (phase === "result" && result !== null) {
    return (
      <div className="flex flex-col h-full overflow-hidden relative" style={{ background: "#0F0F0F", color: "#fff" }}>
        <div className="flex justify-end px-4 pt-4 flex-shrink-0">
          <button onClick={reset}>
            <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center px-6 overflow-y-auto pb-6">
          <h2 className="text-xl font-bold text-center leading-relaxed mt-3">
            {prizeLabel(result)} 당첨!<br />{prizeAmount(result)}에 당첨됐어요!
          </h2>
          <div className="mt-10 w-full max-w-[280px]">
            <div className="w-full h-[160px] rounded-2xl flex items-center justify-center flex-col" style={{ background: "linear-gradient(135deg,#7CEAAB 0%,#4CD964 50%,#7CEAAB 100%)" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "rgba(0,0,0,0.45)" }}>{prizeLabel(result)} 당첨</p>
              <p className="text-[44px] font-black" style={{ color: "#1a1a1a" }}>{prizeAmount(result)}</p>
            </div>
          </div>
          <p className="text-sm mt-5" style={{ color: "#888" }}>남은 기회: {chances}번</p>
          <div className="flex-1" />
          <button onClick={() => { reset(); setTimeout(handleDraw, 300); }} disabled={chances <= 0}
            className="w-full py-4 rounded-xl text-base font-bold mt-4"
            style={{ background: chances > 0 ? "#E53935" : "#333", color: chances > 0 ? "#fff" : "#666" }}>
            {chances > 0 ? "5초 영상 보고 또 긁기" : "오늘의 기회를 모두 사용했어요"}
          </button>
          <button onClick={reset} className="text-sm mt-3 mb-2" style={{ color: "#888" }}>돌아가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0F0F0F", color: "#fff" }}>
      <div className="px-4 pt-4 flex-shrink-0">
        <button onClick={onBack}><svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" /></svg></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex flex-col items-center">
          <p className="text-xs mt-2" style={{ color: "#999" }}>회차마다 최대 10만원</p>
          <h1 className="text-[22px] font-black mt-1 mb-6">번개복권</h1>
          {/* 티켓 */}
          <div className="w-full max-w-[280px] h-[160px] rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: "#1A1A1A" }}>
            <div className="absolute w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", filter: "blur(15px)" }} />
            <div className="relative z-10 text-center">
              <p className="text-[13px] font-medium mb-1" style={{ color: "#888" }}>1등 당첨</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[56px] font-black leading-none">10</span>
                <span className="text-[22px] font-bold">만원</span>
              </div>
            </div>
          </div>
          {/* 회차/타이머 */}
          <div className="flex items-center gap-2 mt-5">
            <span className="text-sm font-bold">2회차</span>
            <span style={{ color: "#555" }}>|</span>
            <span className="text-sm font-bold" style={{ color: "#E53935" }}>{hh}:{mm}:{ss}</span>
            <span className="text-sm" style={{ color: "#888" }}>후 종료</span>
          </div>
          {/* 통계 */}
          <div className="w-full flex mt-4 rounded-xl overflow-hidden" style={{ background: "#1A1A1A" }}>
            <div className="flex-1 p-4 text-center border-r" style={{ borderColor: "#2A2A2A" }}>
              <p className="text-xs mb-1" style={{ color: "#888" }}>남은 당첨자 수</p>
              <p className="text-[22px] font-black">{remain} <span className="text-sm font-medium" style={{ color: "#888" }}>명</span></p>
            </div>
            <div className="flex-1 p-4 text-center">
              <p className="text-xs mb-1" style={{ color: "#888" }}>나의 남은 기회</p>
              <p className="text-[22px] font-black">{chances} <span className="text-sm font-medium" style={{ color: "#888" }}>번</span></p>
            </div>
          </div>
          {/* 등수 */}
          <div className="w-full mt-3 rounded-xl px-4 py-3" style={{ background: "#1A1A1A" }}>
            {[
              { rank: "1등", color: "#FFD700", prize: "10 만원", cur: winners.a, max: 1 },
              { rank: "2등", color: "#C0C0C0", prize: "1만원", cur: winners.b, max: 10 },
              { rank: "3등", color: "#CD7F32", prize: "1천원", cur: winners.c, max: 100 },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? "1px solid #2A2A2A" : "none" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-sm font-semibold">{p.rank}</span>
                  <span className="text-sm ml-2" style={{ color: "#ccc" }}>{p.prize}</span>
                </div>
                <span className="text-[13px]" style={{ color: "#888" }}>{p.cur}<span style={{ color: "#555" }}>/{p.max}명</span></span>
              </div>
            ))}
          </div>
          {/* 티커 */}
          <div className="w-full text-center mt-4 h-5 overflow-hidden">
            <p key={tickerIdx} className="text-xs" style={{ color: "#888" }}>{TICKER_DATA[tickerIdx]}</p>
          </div>
          {/* CTA */}
          <button onClick={handleDraw} disabled={chances <= 0}
            className="w-full py-4 rounded-xl text-base font-bold mt-3"
            style={{ background: chances > 0 ? "#E53935" : "#333", color: chances > 0 ? "#fff" : "#666", opacity: chances > 0 ? 1 : 0.6 }}>
            {chances > 0 ? "5초 영상 보고 또 긁기" : "오늘의 기회를 모두 사용했어요"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 친구 초대 서브뷰 ───
function InviteSubView({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2000);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://ssalmuk.com/invite?code=ABC123").then(() => showToast("초대 링크가 복사되었어요!"));
    } else {
      showToast("초대 링크가 복사되었어요!");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#FAFAFA", color: "#1a1a1a" }}>
      <div className="flex items-center justify-between h-[52px] px-4 border-b border-gray-200 flex-shrink-0" style={{ background: "#FAFAFA" }}>
        <span className="text-base font-bold">쌀먹닷컴</span>
        <button onClick={onBack}>
          <svg className="w-6 h-6" fill="none" stroke="#333" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-9 text-center">
        <p className="text-sm font-semibold" style={{ color: "#888" }}>
          친구도 나도 <span className="font-bold" style={{ color: "#22C55E" }}>3,000 포인트</span>
        </p>
        <h1 className="text-[24px] font-black leading-snug mt-2.5 mb-4">친구에게 쌀먹닷컴을<br />소개해 주세요</h1>
        <div className="inline-flex px-4 py-1.5 rounded-full" style={{ background: "#E8F8EE" }}>
          <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>초대할 때마다 포인트 무제한 지급</span>
        </div>
        {/* 선물 일러스트 */}
        <div className="mx-auto mt-8 mb-6 w-[220px] h-[160px] relative">
          <div className="absolute bottom-0 left-5 right-5 h-[100px] rounded-b-2xl" style={{ background: "linear-gradient(135deg,#FFB8B8,#FF8A8A)", boxShadow: "0 8px 30px rgba(255,100,100,0.2)" }} />
          <div className="absolute top-5 left-5 right-5 h-[70px] rounded-t-2xl" style={{ background: "linear-gradient(180deg,#FFCECE,#FFB0B0)", clipPath: "polygon(0 100%, 50% 20%, 100% 100%)" }} />
          <div className="absolute top-2.5 left-10 right-10 h-[90px] rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#DC2626,#B91C1C)", boxShadow: "0 4px 20px rgba(185,28,28,0.3)" }}>
            <span className="text-[32px] font-black text-white">3,000</span>
            <span className="text-base font-semibold text-white/80 ml-1 mt-1.5">원</span>
          </div>
          <div className="absolute bottom-0 left-5 right-5 h-[55px] rounded-b-2xl" style={{ background: "linear-gradient(135deg,#FFDADA,#FFCCCC)", clipPath: "polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%)" }} />
        </div>
        <p className="text-[13px] leading-7 mb-9" style={{ color: "#888" }}>
          초대받은 친구가 쌀먹닷컴 앱을 설치하고 가입하면<br />나와 친구 모두에게 3,000 포인트를 드려요.
        </p>
        <button
          onClick={() => showToast("카카오톡 공유 기능은 앱에서 이용 가능합니다")}
          className="w-full max-w-[360px] py-[15px] rounded-xl text-[15px] font-bold mb-2.5"
          style={{ background: "#FEE500", color: "#1a1a1a" }}
        >
          카카오톡으로 초대하기
        </button>
        <button
          onClick={handleCopy}
          className="w-full max-w-[360px] py-[15px] rounded-xl text-[15px] font-semibold border border-gray-200 mb-5"
          style={{ background: "#fff", color: "#1a1a1a" }}
        >
          {copied ? "✓ 링크가 복사되었어요!" : "친구 초대 링크 복사하기"}
        </button>
        <button onClick={onBack} className="text-[13px] underline underline-offset-2" style={{ color: "#888" }}>나의 포인트 확인</button>
      </div>
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-[13px] font-medium text-white z-[999]" style={{ background: "rgba(0,0,0,0.8)" }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// ===== 포인트 충전 모달 (다크 테마) =====
const POINT_HISTORY = [
  { type: "적립", label: "미션 보상", amount: 500, date: "2026-03-20" },
  { type: "사용", label: "원신 창천수지 구매", amount: -109650, date: "2026-03-11" },
  { type: "적립", label: "친구 초대 보상", amount: 3000, date: "2026-03-05" },
  { type: "적립", label: "출석 보너스", amount: 100, date: "2026-03-01" },
  { type: "사용", label: "메이플스토리 메소 구매", amount: -24650, date: "2026-02-27" },
];

function PointChargeModal({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<"전체" | "적립" | "사용" | "출금" | "환불">("전체");
  const [sub, setSub] = useState<"main" | "reward" | "lottery" | "invite">("main");
  const expiringPoints = 1200;

  const filtered = tab === "전체" ? POINT_HISTORY : POINT_HISTORY.filter((h) => h.type === tab);
  const goMain = () => setSub("main");

  if (sub === "reward") return <SideDrawer onClose={onClose}><RewardSubView onBack={goMain} /></SideDrawer>;
  if (sub === "lottery") return <SideDrawer onClose={onClose}><LotterySubView onBack={goMain} /></SideDrawer>;
  if (sub === "invite") return <SideDrawer onClose={onClose}><InviteSubView onBack={goMain} /></SideDrawer>;

  return (
    <SideDrawer onClose={onClose}>
      <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0F0F0F" }}>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <p className="text-[18px] font-extrabold text-white">포인트</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#72C2FF] flex items-center justify-center">
            <span className="text-white font-extrabold text-sm">P</span>
          </div>
        </div>

        <div className="px-5 overflow-y-auto flex-1 flex flex-col gap-5 pb-5">
          {/* 보유 포인트 */}
          <div>
            <p className="text-[30px] font-extrabold text-white">{USER_POINTS.toLocaleString()}P</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[11px] text-orange-400">⚠</span>
              <p className="text-[11px] text-gray-400">30일 내 소멸 예정: <span className="text-orange-400 font-semibold">{expiringPoints.toLocaleString()}P</span></p>
            </div>
            <button className="mt-2 text-xs text-gray-500 border border-gray-700 rounded-full px-3 py-1 hover:border-gray-500 transition-colors">사용방법</button>
          </div>

          {/* 포인트 모으기 */}
          <div>
            <p className="text-sm font-bold text-gray-300 mb-2.5">포인트 모으기</p>
            <div className="flex flex-col gap-2">
              {[
                { icon: "🎯", label: "미션하고 최대 6,273,705원 받기", gradient: "from-green-600 to-green-400", sub: "reward" as const },
                { icon: "👥", label: "친구 초대하고 3,000원 받기", gradient: "from-teal-600 to-teal-400", sub: "invite" as const },
                { icon: "⚡", label: "매일 복권 긁고 총 상금 1,000만 원 받기", gradient: "from-emerald-700 to-green-500", sub: "lottery" as const },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => setSub(btn.sub)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r ${btn.gradient} text-white text-left hover:opacity-90 transition-opacity`}
                >
                  <span className="text-2xl">{btn.icon}</span>
                  <span className="text-[13px] font-bold">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 사용 내역 */}
          <div>
            <p className="text-sm font-bold text-gray-300 mb-2.5">사용 내역</p>
            {/* 탭 */}
            <div className="flex gap-1 mb-3">
              {(["전체", "적립", "사용", "출금", "환불"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === t ? "bg-[#72C2FF] text-white" : "bg-[#1A1A1A] text-gray-400 hover:text-gray-200"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* 내역 리스트 */}
            {filtered.length === 0 ? (
              <p className="text-center text-gray-600 text-sm py-8">내역이 없습니다</p>
            ) : (
              <div className="flex flex-col gap-1">
                {filtered.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-[#1A1A1A]">
                    <div>
                      <p className="text-sm font-semibold text-white">{h.label}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{h.date}</p>
                    </div>
                    <span className={`text-[15px] font-extrabold ${h.amount > 0 ? "text-[#72C2FF]" : "text-red-400"}`}>
                      {h.amount > 0 ? "+" : ""}{h.amount.toLocaleString()}P
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SideDrawer>
  );
}

// ===== 캐시 충전 모달 =====
function CashChargeModal({ onClose, onComplete }: { onClose: () => void; onComplete: (amount: number) => void }) {
  const [inputVal, setInputVal] = useState("");
  const [chargeMethod, setChargeMethod] = useState("virtual");

  const num = parseInt(inputVal.replace(/,/g, ""), 10) || 0;
  const allMethods = [VIRTUAL_ACCOUNT, ...EASY_METHODS, ...GENERAL_METHODS];
  const current = allMethods.find((m) => m.id === chargeMethod) ?? VIRTUAL_ACCOUNT;
  const fee = calcFee(num, current);
  const totalPay = num + fee;

  const handleInput = (val: string) => {
    const digits = val.replace(/\D/g, "");
    setInputVal(digits ? parseInt(digits, 10).toLocaleString() : "");
  };

  const addPreset = (amount: number) => {
    const current = parseInt(inputVal.replace(/,/g, ""), 10) || 0;
    setInputVal((current + amount).toLocaleString());
  };

  const handleCharge = () => {
    if (num < 1000) { alert("최소 충전 금액은 1,000원 입니다."); return; }
    onComplete(num);
  };

  return (
    <SideDrawer onClose={onClose}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <p className="text-[18px] font-extrabold text-[#1A1A2E]">캐시 충전</p>
        <CloseBtn onClick={onClose} />
      </div>

      <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {/* 현재 잔액 */}
        <div className="bg-[#F0FDF4] rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">보유 캐시</p>
          <p className="text-[22px] font-extrabold text-green-500">{USER_CASH.toLocaleString()}C</p>
        </div>

        {/* 충전 금액 입력 */}
        <div>
          <p className="text-sm font-bold text-[#1A1A2E] mb-2">충전 금액</p>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={inputVal}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="충전할 금액을 입력하세요"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-8 text-[18px] font-bold text-[#1A1A2E] outline-none focus:border-[#72C2FF] transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">원</span>
          </div>
          {/* 프리셋 버튼 */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1000, 5000, 10000, 50000].map((amount) => (
              <button
                key={amount}
                onClick={() => addPreset(amount)}
                className="py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#72C2FF] hover:text-[#72C2FF] hover:bg-[#E8F4FD] transition-all"
              >
                +{amount.toLocaleString()}원
              </button>
            ))}
          </div>
        </div>

        {/* 결제 수단 */}
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2">추천</p>
          <button
            onClick={() => setChargeMethod(VIRTUAL_ACCOUNT.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 mb-3 transition-all ${chargeMethod === VIRTUAL_ACCOUNT.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200"}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{VIRTUAL_ACCOUNT.icon}</span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#1A1A2E]">{VIRTUAL_ACCOUNT.label}</span>
                  <span className="text-[10px] bg-[#72C2FF] text-white px-1.5 py-0.5 rounded-full font-bold">추천</span>
                </div>
                <p className="text-[10px] text-gray-400">{VIRTUAL_ACCOUNT.limit}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-500">수수료 없음</span>
          </button>

          <p className="text-xs font-bold text-gray-400 mb-2">간편결제</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {EASY_METHODS.map((m) => (
              <button key={m.id} onClick={() => setChargeMethod(m.id)}
                className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${chargeMethod === m.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200"}`}>
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-[11px] font-bold text-[#1A1A2E]">{m.label}</span>
                <span className="text-[9px] text-orange-400 font-semibold mt-0.5">수수료 {m.fee}%</span>
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-gray-400 mb-2">일반결제</p>
          <div className="grid grid-cols-3 gap-2">
            {GENERAL_METHODS.map((m) => (
              <button key={m.id} onClick={() => setChargeMethod(m.id)}
                className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${chargeMethod === m.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200"}`}>
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-[11px] font-bold text-[#1A1A2E]">{m.label}</span>
                <span className={`text-[9px] font-semibold mt-0.5 ${"fixedFee" in m && m.fixedFee ? "text-blue-400" : "text-orange-400"}`}>
                  {"fixedFee" in m && m.fixedFee ? `수수료 ${m.fixedFee.toLocaleString()}원` : `수수료 ${m.fee}%`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 주문 요약 */}
        <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>충전 금액</span><span>{num > 0 ? num.toLocaleString() : "-"}원</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">수수료 ({current.label})</span>
            <span className={fee > 0 ? "text-orange-500" : "text-green-500 font-medium"}>
              {fee > 0 ? `+${fee.toLocaleString()}원` : "없음"}
            </span>
          </div>
          <div className="border-t border-gray-200 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#1A1A2E]">총 결제 금액</span>
            <span className="text-[20px] font-extrabold text-[#1A1A2E]">{totalPay > 0 ? totalPay.toLocaleString() : "-"}원</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={handleCharge}
          disabled={num < 1000}
          className={`w-full py-3.5 rounded-2xl font-extrabold text-[16px] transition-colors ${num >= 1000 ? "bg-[#72C2FF] text-white hover:bg-[#5BA8E6]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          {num >= 1000 ? `${totalPay.toLocaleString()}원 결제하기` : "충전할 금액을 입력하세요"}
        </button>
      </div>
    </SideDrawer>
  );
}

// ===== Step2: 결제수단 선택 모달 =====
function CardPaymentGatewayModal({
  item, total, onClose, onPay,
}: {
  item: DiscountItem;
  total: number;
  onClose: () => void;
  onPay: (cardMethod: string) => void;
}) {
  const [selected, setSelected] = useState("virtual");

  const allMethods = [VIRTUAL_ACCOUNT, ...EASY_METHODS, ...GENERAL_METHODS];
  const current = allMethods.find((m) => m.id === selected) ?? VIRTUAL_ACCOUNT;
  const fee = calcFee(total, current);

  return (
    <ModalWrap onClose={onClose}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <p className="text-[18px] font-extrabold text-[#1A1A2E]">결제수단 선택</p>
        <CloseBtn onClick={onClose} />
      </div>

      <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
        {/* 결제 상품 요약 */}
        <div className="bg-[#F5F6F8] rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-400 mb-1">결제 상품</p>
          <p className="text-sm font-bold text-[#1A1A2E]">{item.name}</p>
          <p className="text-[22px] font-extrabold text-[#4A9FD9] mt-1">{total.toLocaleString()}원</p>
        </div>

        {/* 추천 */}
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2">추천</p>
          <button
            onClick={() => setSelected(VIRTUAL_ACCOUNT.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${selected === VIRTUAL_ACCOUNT.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200 bg-white"}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{VIRTUAL_ACCOUNT.icon}</span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#1A1A2E]">{VIRTUAL_ACCOUNT.label}</span>
                  <span className="text-[10px] bg-[#72C2FF] text-white px-1.5 py-0.5 rounded-full font-bold">추천</span>
                </div>
                <p className="text-[10px] text-gray-400">{VIRTUAL_ACCOUNT.limit}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-500">수수료 없음</span>
          </button>
        </div>

        {/* 간편결제 */}
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2">간편결제</p>
          <div className="grid grid-cols-3 gap-2">
            {EASY_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${selected === m.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200 bg-white"}`}
              >
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-[11px] font-bold text-[#1A1A2E]">{m.label}</span>
                <span className="text-[9px] text-gray-400 mt-0.5">{m.limit}</span>
                <span className="text-[9px] text-orange-400 font-semibold mt-0.5">수수료 {m.fee}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* 일반결제 */}
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2">일반결제</p>
          <div className="grid grid-cols-3 gap-2">
            {GENERAL_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${selected === m.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200 bg-white"}`}
              >
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-[11px] font-bold text-[#1A1A2E]">{m.label}</span>
                <span className="text-[9px] text-gray-400 mt-0.5">{m.limit}</span>
                <span className={`text-[9px] font-semibold mt-0.5 ${"fixedFee" in m && m.fixedFee ? "text-blue-400" : "text-orange-400"}`}>
                  {"fixedFee" in m && m.fixedFee ? `수수료 ${m.fixedFee.toLocaleString()}원` : `수수료 ${m.fee}%`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 주문 요약 */}
        <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-sm text-gray-500">
            <span>상품 금액</span><span>{total.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>수수료</span>
            <span className={fee > 0 ? "text-orange-500" : "text-green-500"}>{fee > 0 ? `+${fee.toLocaleString()}` : "없음"}원</span>
          </div>
          <div className="border-t border-gray-200 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-[#1A1A2E]">총 결제 금액</span>
            <span className="text-[20px] font-extrabold text-[#1A1A2E]">{(total + fee).toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={() => onPay(selected)}
          className="w-full py-3.5 rounded-2xl bg-[#72C2FF] text-white font-extrabold text-[16px] hover:bg-[#5BA8E6] transition-colors"
        >
          {(total + fee).toLocaleString()}원 결제하기
        </button>
      </div>
    </ModalWrap>
  );
}

// ===== Step3: 구매 완료 모달 =====
const PAY_LABELS: Record<string, string> = {
  point: "포인트", cash: "캐시", virtual: "가상계좌",
  payco: "PAYCO", toss: "Toss Pay", naver: "Naver Pay",
  kakao: "Kakao Pay", samsung: "Samsung Pay",
  mobile: "휴대폰결제", card: "신용카드", transfer: "실시간계좌이체",
};

function PurchaseCompleteModal({
  item, coupon, info, onClose, onReview,
}: {
  item: DiscountItem;
  coupon: Coupon;
  info: PurchaseInfo;
  onClose: () => void;
  onReview: (rating: number) => void;
}) {
  const [rating, setRating] = useState(0);
  const payLabel = PAY_LABELS[info.cardMethod || info.payMethod] ?? info.payMethod;

  return (
    <ModalWrap onClose={onClose}>
      <div className="px-5 py-6 flex flex-col items-center text-center gap-4">
        <span className="text-[56px]">🎉</span>
        <div>
          <p className="text-[22px] font-extrabold text-[#1A1A2E]">구매 완료!</p>
          <p className="text-sm text-gray-500 mt-1">{coupon.name} {item.name} {info.qty}개를 {payLabel}로 결제했습니다.</p>
        </div>

        {/* 결제 요약 */}
        <div className="w-full bg-[#F5F6F8] rounded-2xl p-4 text-left flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">결제 수단</span>
            <span className="font-semibold text-[#1A1A2E]">{payLabel}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-500">결제 금액</span>
            <span className="text-[16px] font-extrabold text-[#4A9FD9]">{info.total.toLocaleString()}P</span>
          </div>
        </div>

        {/* 후기 유도 */}
        <div className="w-full bg-[#FEF9E7] rounded-2xl p-4 flex flex-col items-center gap-2">
          <span className="text-[32px]">⭐</span>
          <p className="text-[16px] font-extrabold text-[#1A1A2E]">구매후기를 남겨주세요!</p>
          <p className="text-xs text-gray-500">후기를 작성하면 <span className="font-bold text-amber-500">50P</span>를 드려요</p>
          {/* 별점 */}
          <div className="flex gap-1 my-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} className="text-2xl transition-transform hover:scale-110">
                {s <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
          <button
            onClick={() => rating > 0 && onReview(rating)}
            className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors ${rating > 0 ? "bg-amber-400 text-white hover:bg-amber-500" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            별점을 선택하고 후기 작성하기
          </button>
        </div>

        <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
          나중에 할게요
        </button>
      </div>
    </ModalWrap>
  );
}

// ===== Step4: 후기 작성 화면 =====
function ReviewWriteScreen({
  item, coupon, initialRating, onClose,
}: {
  item: DiscountItem;
  coupon: Coupon;
  initialRating: number;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(initialRating);
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  const toggleTag = (tag: string) => setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleSubmit = () => {
    alert("후기가 등록되었습니다! 50P가 지급됩니다.");
    onClose();
  };

  return (
    <ModalWrap onClose={onClose} fullHeight>
      {/* 헤더 */}
      <div className="flex items-center px-5 py-4 border-b border-gray-100 relative">
        <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-[#1A1A2E]">구매후기 작성</p>
      </div>

      <div className="px-5 py-4 flex flex-col gap-5 overflow-y-auto flex-1">
        {/* 상품 카드 */}
        <div className="bg-[#F5F6F8] rounded-2xl p-3 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.5 2.5c0 1.5-1.5 5-1.5 5h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 9c-1.1 0-2 .9-2 2v1l-5 5 1.5 1.5 5-5h1l5 5 1.5-1.5-5-5v-1c0-1.1-.9-2-2-2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#4A9FD9]">{coupon.description}</p>
            <p className="text-[15px] font-bold text-[#1A1A2E]">{item.name}</p>
          </div>
        </div>

        {/* 별점 */}
        <div>
          <p className="text-sm font-bold text-[#1A1A2E]">상품은 어떠셨나요?</p>
          <p className="text-xs text-gray-400 mt-0.5 mb-2">별점을 선택해주세요</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)} className="text-3xl transition-transform hover:scale-110">
                {s <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* 태그 */}
        <div>
          <p className="text-sm font-bold text-[#1A1A2E]">어떤 점이 좋았나요?</p>
          <p className="text-xs text-gray-400 mt-0.5 mb-2">해당하는 태그를 선택해주세요 (선택사항)</p>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm border-2 font-medium transition-all ${tags.includes(tag) ? "border-[#72C2FF] bg-[#E8F4FD] text-[#4A9FD9]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 텍스트 후기 */}
        <div>
          <p className="text-sm font-bold text-[#1A1A2E]">상세 후기</p>
          <p className="text-xs text-gray-400 mt-0.5 mb-2">다른 구매자에게 도움이 될 후기를 남겨주세요 (최소 10자)</p>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 300))}
              placeholder="상품 사용 경험, 배송, 가격 등 솔직한 후기를 남겨주세요..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#72C2FF] resize-none"
              style={{ minHeight: "120px" }}
            />
            <span className="absolute bottom-2.5 right-3 text-[10px] text-gray-300">{text.length}/300</span>
          </div>
        </div>
      </div>

      {/* 제출 버튼 고정 */}
      <div className="px-5 py-4 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3.5 rounded-2xl font-extrabold text-[16px] transition-colors ${rating > 0 ? "bg-[#72C2FF] text-white hover:bg-[#5BA8E6]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
        >
          {rating === 0 ? "별점을 선택해주세요" : "후기 등록하기"}
        </button>
      </div>
    </ModalWrap>
  );
}

// ===== 공통 모달 래퍼 =====
function ModalWrap({ children, onClose, fullHeight = false }: { children: React.ReactNode; onClose: () => void; fullHeight?: boolean }) {
  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col ${fullHeight ? "h-[90vh]" : "max-h-[90vh]"}`}>
        {children}
      </div>
    </div>
  );
}

// ===== Wide Dialog (바로구매용) =====
function WideDialog({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ maxHeight: "88vh" }}>
        {children}
      </div>
    </div>
  );
}

// ===== Side Drawer (충전 모달용) =====
function SideDrawer({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[800] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative w-[420px] h-full bg-white shadow-2xl flex flex-col overflow-hidden"
        style={{ animation: "slideInRight 0.22s ease-out" }}
      >
        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        {children}
      </div>
    </div>
  );
}

function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-1 text-gray-400 hover:text-gray-600">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

// ===== 타입 =====
export interface PurchaseInfo {
  method: "UID" | "PIN";
  server: string;
  uid: string;
  qty: number;
  payMethod: "point" | "cash" | "card";
  cardMethod: string;
  total: number;
}

// ===== 메인: 결제 플로우 관리 =====
type FlowStep = "purchase" | "card-select" | "complete" | "review";

export default function PaymentFlowModal({
  item, coupon, onClose,
}: {
  item: DiscountItem;
  coupon: Coupon;
  onClose: () => void;
}) {
  const [step, setStep] = useState<FlowStep>("purchase");
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | null>(null);
  const [reviewRating, setReviewRating] = useState(0);

  const handlePay = (info: PurchaseInfo) => {
    setPurchaseInfo(info);
    if (info.payMethod === "card") {
      setStep("card-select");
    } else {
      setStep("complete");
    }
  };

  const handleCardPay = (cardMethod: string) => {
    setPurchaseInfo((prev) => prev ? { ...prev, cardMethod } : prev);
    setStep("complete");
  };

  const handleReview = (rating: number) => {
    setReviewRating(rating);
    setStep("review");
  };

  if (step === "purchase") {
    return <PurchaseModal item={item} coupon={coupon} onClose={onClose} onPay={handlePay} />;
  }
  if (step === "card-select" && purchaseInfo) {
    return <CardPaymentGatewayModal item={item} total={purchaseInfo.total} onClose={onClose} onPay={handleCardPay} />;
  }
  if (step === "complete" && purchaseInfo) {
    return <PurchaseCompleteModal item={item} coupon={coupon} info={purchaseInfo} onClose={onClose} onReview={handleReview} />;
  }
  if (step === "review" && purchaseInfo) {
    return <ReviewWriteScreen item={item} coupon={coupon} initialRating={reviewRating} onClose={onClose} />;
  }
  return null;
}
