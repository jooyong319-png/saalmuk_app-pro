// @ts-nocheck
import { useState, useMemo, useEffect, useRef } from "react";

/* ═══════ 더미 데이터 ═══════ */
const USER = {
  nickname: "쌀먹유저123", badge: "모종", badgeEmoji: "🌱", avatar: "🍚",
  followers: 24, following: 18, rating: 4.8, reviewCount: 31, coupon: 7,
  point: 12500, cash: 45000,
};

const MY_SELL = [
  { id: "s1", cat: "기프티콘", brand: "스타벅스", name: "아메리카노 T", price: 3800, status: "판매중", img: "☕", date: "2026-03-24", views: 12 },
  { id: "s2", cat: "상품권", brand: "신세계", name: "신세계상품권 5만원권", price: 47000, status: "거래중", buyer: "구매자A", img: "🎫", date: "2026-03-23", views: 28 },
  { id: "s3", cat: "기프티콘", brand: "배스킨라빈스", name: "파인트 아이스크림", price: 7500, status: "판매완료", buyer: "구매자B", img: "🍨", date: "2026-03-20", views: 45 },
  { id: "s4", cat: "상품권", brand: "문화상품권", name: "문화상품권 1만원", price: 9200, status: "판매중", img: "🎟️", date: "2026-03-22", views: 8 },
];

const MY_BUY = [
  { id: "b1", cat: "기프티콘", brand: "투썸플레이스", name: "스트로베리 라떼", price: 5200, status: "구매완료", seller: "판매자X", img: "🍓", date: "2026-03-24", code: "GIFT-2026-ABCD-1234" },
  { id: "b2", cat: "상품권", brand: "해피머니", name: "해피머니 3만원권", price: 28500, status: "거래중", seller: "판매자Y", img: "💳", date: "2026-03-23", code: null },
  { id: "b3", cat: "기프티콘", brand: "맥도날드", name: "빅맥세트", price: 5500, status: "구매완료", seller: "판매자Z", img: "🍔", date: "2026-03-21", code: "GIFT-2026-EFGH-5678" },
  { id: "b4", cat: "상품권", brand: "구글플레이", name: "구글플레이 1만원", price: 9500, status: "구매완료", seller: "판매자W", img: "🎮", date: "2026-03-19", code: "GOOG-2026-IJKL-9012" },
];

const REVIEWS = [
  { id: "r1", nickname: "게이머짱", rating: 5, text: "빠른 거래 감사합니다! 코드도 바로 사용 가능했어요.", date: "2026-03-24", type: "구매자" },
  { id: "r2", nickname: "쌀먹마스터", rating: 5, text: "친절하시고 응답도 빠르셔서 좋았습니다.", date: "2026-03-22", type: "구매자" },
  { id: "r3", nickname: "할인사냥꾼", rating: 4, text: "상품 상태 좋았어요. 다음에도 거래 원해요.", date: "2026-03-20", type: "판매자" },
  { id: "r4", nickname: "닌텐도러버", rating: 5, text: "상품권 잘 받았습니다 감사합니다!", date: "2026-03-18", type: "구매자" },
];

const MY_COUPONS = [
  { id: "c1", cat: "기프티콘", brand: "스타벅스", name: "카페 아메리카노 T", code: "8809-1234-5678", expire: "2026.04.20", dday: 17, used: false, img: "☕" },
  { id: "c2", cat: "기프티콘", brand: "CJ ONE", name: "(HOT)아메리카노", code: "5186-0151-4910", expire: "2026.02.09", dday: 6, used: false, img: "☕" },
  { id: "c3", cat: "상품권", brand: "GS25", name: "1만원 상품권", code: "GS25-8827-3301", expire: "2026.05.15", dday: 28, used: false, img: "🏪" },
  { id: "c4", cat: "기프티콘", brand: "배스킨라빈스", name: "파인트 아이스크림", code: "BR31-5502-7744", expire: "2026.04.10", dday: 12, used: false, img: "🍨" },
  { id: "c5", cat: "상품권", brand: "문화상품권", name: "문화상품권 1만원", code: "CULT-9912-3344", expire: "2026.06.30", dday: 60, used: false, img: "🎟️" },
  { id: "c6", cat: "기프티콘", brand: "맥도날드", name: "빅맥세트", code: "MCD-2026-USED", expire: "2026.03.01", dday: 0, used: true, img: "🍔" },
  { id: "c7", cat: "상품권", brand: "해피머니", name: "해피머니 3만원권", code: "HAPY-7788-1122", expire: "2026.07.20", dday: 90, used: false, img: "💳" },
];

const FOLLOW_USERS = [
  { id: 1, n: "게이머짱", b: "🌾", f: true },
  { id: 2, n: "쌀먹마스터", b: "🌱", f: false },
  { id: 3, n: "할인사냥꾼", b: "🍚", f: true },
  { id: 4, n: "닌텐도러버", b: "🌾", f: false },
  { id: 5, n: "쿠폰왕", b: "🌱", f: true },
];

const B = "#72C2FF";
const BD = "#4A9FD9";
const BL = "#E8F4FD";

/* ═══════ 공통 작은 컴포넌트 ═══════ */
function TypePill({ type }: { type: string }) {
  const isGift = type === "기프티콘";
  return (
    <span
      className="text-[10px] font-semibold px-1.5 py-px rounded"
      style={{ background: isGift ? "#FFF0F5" : "#F0F0FF", color: isGift ? "#E91E8E" : "#5C5CE0" }}
    >
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const m: Record<string, { bg: string; c: string }> = {
    "판매중": { bg: BL, c: BD },
    "거래중": { bg: "#FFF3E0", c: "#F57C00" },
    "판매완료": { bg: "#E8F5E9", c: "#43A047" },
    "구매완료": { bg: "#E8F5E9", c: "#43A047" },
  };
  const s = m[status] || { bg: "#f5f5f5", c: "#999" };
  return (
    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[10px]" style={{ background: s.bg, color: s.c }}>
      {status}
    </span>
  );
}

function ModalWrapper({ show, onClose, title, children, full = false }: any) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end" style={{ animation: "fadeIn .22s ease both" }}>
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div
        className="relative bg-white rounded-t-[20px] flex flex-col max-w-md w-full mx-auto"
        style={{ height: full ? "95vh" : "85vh", animation: "slideUp .32s cubic-bezier(.16,1,.3,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3.5 border-b border-gray-100 flex-shrink-0">
          <button onClick={onClose} className="p-1 mr-2">
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <span className="flex-1 font-bold text-base text-center mr-[30px]">{title}</span>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function IcoChev({ c = "#999", s = 16 }: { c?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
  );
}

/* ═══════ 거래후기 모달 ═══════ */
function ReviewModal({ show, onClose }: any) {
  const [f, setF] = useState("전체");
  const list = f === "전체" ? REVIEWS : REVIEWS.filter((r) => r.type === f);
  return (
    <ModalWrapper show={show} onClose={onClose} title="거래 후기" full>
      <div className="px-4 pt-3">
        <div className="flex gap-2 mb-3.5">
          {["전체", "구매자", "판매자"].map((t) => (
            <button
              key={t}
              onClick={() => setF(t)}
              className="px-4 py-[7px] rounded-full text-[13px] font-semibold"
              style={{ border: f === t ? "none" : "1.5px solid #e0e0e0", background: f === t ? "#222" : "#fff", color: f === t ? "#fff" : "#666" }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 pb-5">
        {list.map((r, i) => (
          <div key={r.id} className="py-3.5" style={{ borderBottom: i < list.length - 1 ? "1px solid #f0f0f0" : "none" }}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] rounded-full bg-gray-100 flex items-center justify-center text-[13px]">👤</div>
                <span className="text-[13px] font-semibold">{r.nickname}</span>
                <span className="text-[10px] text-gray-400 px-1.5 py-px bg-gray-50 rounded-md">{r.type}</span>
              </div>
              <span className="text-[11px] text-gray-300">{r.date}</span>
            </div>
            <div className="flex gap-0.5 mb-1.5 ml-[38px]">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= r.rating ? "#FFC107" : "none"} stroke={s <= r.rating ? "#FFC107" : "#ddd"} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed ml-[38px]">{r.text}</p>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 팔로워/팔로잉 모달 ═══════ */
function FollowModal({ show, onClose, tab }: any) {
  const [at, setAt] = useState(tab || "팔로워");
  return (
    <ModalWrapper show={show} onClose={onClose} title={at}>
      <div className="flex border-b border-gray-100">
        {["팔로워", "팔로잉"].map((t) => (
          <button
            key={t}
            onClick={() => setAt(t)}
            className="flex-1 py-3.5 text-sm font-medium"
            style={{ borderBottom: at === t ? `2px solid ${B}` : "2px solid transparent", color: at === t ? "#222" : "#999", fontWeight: at === t ? 700 : 400 }}
          >
            {t} <span style={{ color: B, fontWeight: 700 }}>{t === "팔로워" ? USER.followers : USER.following}</span>
          </button>
        ))}
      </div>
      <div className="p-3.5">
        {FOLLOW_USERS.slice(0, at === "팔로워" ? 5 : 3).map((u) => (
          <div key={u.id} className="flex items-center gap-2.5 py-[11px] border-b border-gray-50">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">{u.b}</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold">{u.n}</p>
              <p className="text-[11px] text-gray-400">거래 12회</p>
            </div>
            <button
              className="px-3.5 py-1.5 rounded-[18px] text-xs font-semibold"
              style={{ background: u.f ? "#f0f0f0" : B, color: u.f ? "#666" : "#fff" }}
            >
              {u.f ? "팔로잉" : "팔로우"}
            </button>
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 판매/구매 내역 모달 ═══════ */
function TradeDetailModal({ show, onClose, isSell, onViewCode }: any) {
  const [sub, setSub] = useState("전체");
  const [tf, setTf] = useState("전체");
  const items = isSell ? MY_SELL : MY_BUY;
  const sfs = isSell ? ["전체", "판매중", "거래중", "판매완료", "환불/취소"] : ["전체", "거래중", "구매완료", "환불/취소"];
  const filtered = items.filter((it) => {
    if (sub !== "전체" && it.status !== sub) return false;
    if (tf !== "전체" && it.cat !== tf) return false;
    return true;
  });
  return (
    <ModalWrapper show={show} onClose={onClose} title={isSell ? "판매내역" : "구매내역"} full>
      <div className="px-3.5 pt-2.5">
        <div className="flex gap-1.5 mb-2.5">
          {["전체", "기프티콘", "상품권"].map((f) => (
            <button
              key={f}
              onClick={() => setTf(f)}
              className="px-3 py-[5px] rounded-[18px] text-xs font-semibold"
              style={{ border: tf === f ? `1.5px solid ${B}` : "1.5px solid #e5e5e5", background: tf === f ? BL : "#fff", color: tf === f ? BD : "#777" }}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 mb-3.5">
          {sfs.map((f) => (
            <button
              key={f}
              onClick={() => setSub(f)}
              className="px-3.5 py-1.5 rounded-[18px] text-xs font-semibold"
              style={{ border: sub === f ? "none" : "1.5px solid #e0e0e0", background: sub === f ? "#222" : "#fff", color: sub === f ? "#fff" : "#666" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="px-3.5 pb-5">
        {filtered.length > 0 ? (
          filtered.map((it) => (
            <div key={it.id} className="flex items-center gap-2.5 p-3 bg-white rounded-[14px] mb-2 border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: BL }}>{it.img}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <TypePill type={it.cat} />
                  <span className="text-[10px] text-gray-400">{it.brand}</span>
                  <StatusBadge status={it.status} />
                </div>
                <p className="text-[13px] font-semibold truncate">{it.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[13px] font-bold" style={{ color: BD }}>{it.price.toLocaleString()}원</span>
                  <span className="text-[10px] text-gray-300">{it.date}</span>
                </div>
              </div>
              {!isSell && it.status === "구매완료" && it.code && (
                <button onClick={() => onViewCode(it)} className="px-[11px] py-[7px] rounded-[10px] text-[11px] font-semibold text-white flex-shrink-0" style={{ background: B }}>코드보기</button>
              )}
              {isSell && it.status === "거래중" && (
                <button className="px-[11px] py-[7px] rounded-[10px] text-[11px] font-semibold flex-shrink-0" style={{ background: "#FFF3E0", color: "#F57C00" }}>채팅</button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-300">
            <span className="text-4xl block mb-2">{isSell ? "📦" : "🛒"}</span>
            <p className="text-sm">{isSell ? "판매 내역이 없습니다" : "구매 내역이 없습니다"}</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 코드 보기 모달 ═══════ */
function CodeModal({ show, onClose, item, onCopy }: any) {
  if (!item) return null;
  return (
    <ModalWrapper show={show} onClose={onClose} title="코드번호 확인">
      <div className="p-5">
        <div className="text-center mb-5">
          <div className="w-[68px] h-[68px] rounded-[18px] flex items-center justify-center text-[34px] mx-auto mb-2.5" style={{ background: BL }}>{item.img}</div>
          <div className="flex gap-1.5 justify-center mb-1.5">
            <TypePill type={item.cat} />
            <span className="text-xs text-gray-500 px-[7px] py-0.5 bg-gray-50 rounded-lg">{item.brand}</span>
          </div>
          <p className="text-base font-bold">{item.name}</p>
          <p className="text-sm font-semibold mt-1" style={{ color: BD }}>{item.price.toLocaleString()}원</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-5 mb-3.5">
          <p className="text-xs text-gray-500 font-medium mb-2">코드번호</p>
          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[17px] font-extrabold tracking-wide font-mono text-gray-900">{item.code}</span>
            <button onClick={() => onCopy(item.code)} className="flex items-center gap-1 px-3.5 py-2 rounded-[10px] text-[13px] font-semibold" style={{ background: BL, color: BD }}>📋 복사</button>
          </div>
        </div>
        <div className="rounded-xl p-3 mb-3.5" style={{ background: "#FFFBE6" }}>
          <p className="text-xs font-medium leading-relaxed" style={{ color: "#B8860B" }}>⚠️ 코드번호는 타인에게 절대 공유하지 마세요.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-3.5 rounded-xl text-sm font-semibold" style={{ border: `1.5px solid ${B}`, color: BD }}>사용 완료</button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white" style={{ background: B }}>확인</button>
        </div>
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 쿠폰함 모달 ═══════ */
function CouponModal({ show, onClose, onCopy }: any) {
  const [tab, setTab] = useState("사용전");
  const [catF, setCatF] = useState("전체");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("최신순");
  const [coupons, setCoupons] = useState(MY_COUPONS);

  const handleUse = (id: string) => setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, used: true } : c)));
  const handleDel = (id: string) => setCoupons((prev) => prev.filter((c) => c.id !== id));

  const unusedCount = coupons.filter((c) => !c.used).length;
  const usedCount = coupons.filter((c) => c.used).length;
  const tradeCount = MY_BUY.filter((i) => i.status === "구매완료").length;

  const filtered = useMemo(() => {
    let list: any[];
    if (tab === "사용전") list = coupons.filter((c) => !c.used);
    else if (tab === "사용완료") list = coupons.filter((c) => c.used);
    else return MY_BUY.filter((i) => i.status === "구매완료");
    if (catF !== "전체") list = list.filter((c) => c.cat === catF);
    if (search) list = list.filter((c) => c.brand.includes(search) || c.name.includes(search));
    if (sortBy === "마감임박") list = [...list].sort((a, b) => a.dday - b.dday);
    return list;
  }, [tab, catF, search, sortBy, coupons]);

  return (
    <ModalWrapper show={show} onClose={onClose} title="내 쿠폰함" full>
      <div className="px-4 pt-3">
        {/* 탭 */}
        <div className="flex gap-2 mb-3">
          {[{ k: "사용전", v: unusedCount }, { k: "사용완료", v: usedCount }, { k: "내거래", v: tradeCount }].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className="px-3.5 py-2 rounded-full text-[13px] font-semibold"
              style={{ border: tab === t.k ? "none" : "1.5px solid #e0e0e0", background: tab === t.k ? B : "#fff", color: tab === t.k ? "#fff" : "#666" }}
            >
              {t.k} {t.v}
            </button>
          ))}
        </div>
        {/* 카테고리 필터 */}
        {tab !== "내거래" && (
          <div className="flex gap-1.5 mb-2.5">
            {["전체", "기프티콘", "상품권"].map((f) => (
              <button
                key={f}
                onClick={() => setCatF(f)}
                className="px-3 py-[5px] rounded-full text-xs font-semibold"
                style={{ border: catF === f ? `1.5px solid ${B}` : "1.5px solid #e5e5e5", background: catF === f ? BL : "#fff", color: catF === f ? BD : "#888" }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
        {/* 검색 + 정렬 */}
        {tab !== "내거래" && (
          <div className="flex gap-2 mb-3.5">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-300">🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="브랜드, 상품명 검색"
                className="w-full py-2.5 pl-[34px] pr-3 rounded-xl text-[13px]"
                style={{ border: "1.5px solid #e5e5e5" }}
              />
            </div>
            <button
              onClick={() => setSortBy((s) => (s === "최신순" ? "마감임박" : "최신순"))}
              className="px-3 rounded-xl text-xs font-medium text-gray-500 flex items-center gap-1 whitespace-nowrap"
              style={{ border: "1.5px solid #e5e5e5" }}
            >
              {sortBy}
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" fill="none" stroke="#888" strokeWidth="1.5" /></svg>
            </button>
          </div>
        )}
      </div>
      <div className="px-4 pb-5">
        {/* 쿠폰 카드 */}
        {tab !== "내거래" &&
          filtered.map((cp: any) => (
            <div
              key={cp.id}
              className="rounded-[18px] p-[18px] mb-3"
              style={{ border: `1.5px solid ${cp.used ? "#e0e0e0" : B}`, background: cp.used ? "#fafafa" : "#fff", opacity: cp.used ? 0.65 : 1 }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">{cp.img}</span>
                  <span className="text-[15px] font-bold">{cp.brand}</span>
                  <TypePill type={cp.cat} />
                </div>
                <div className="flex items-center gap-1.5">
                  {!cp.used && (
                    <span className="px-2 py-[3px] rounded-[10px] text-[11px] font-bold" style={{ background: cp.dday <= 7 ? "#FFF0F0" : BL, color: cp.dday <= 7 ? "#FF4757" : BD }}>
                      D-{cp.dday}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-base font-semibold mb-3.5" style={{ color: cp.used ? "#999" : "#222" }}>{cp.name}</p>
              <div className="bg-gray-50 rounded-[14px] px-4 py-3.5 text-center mb-3">
                <p className="text-base font-bold tracking-[2px] font-mono" style={{ color: cp.used ? "#bbb" : BD }}>{cp.code}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">~{cp.expire}</span>
                <div className="flex gap-2">
                  {!cp.used && (
                    <button onClick={() => handleUse(cp.id)} className="px-3.5 py-[7px] rounded-[10px] text-xs font-bold text-white" style={{ background: B }}>✓ 사용완료</button>
                  )}
                  {cp.used && <span className="px-3.5 py-[7px] rounded-[10px] bg-gray-200 text-gray-500 text-xs font-semibold">사용완료</span>}
                  <button onClick={() => handleDel(cp.id)} className="px-3 py-[7px] rounded-[10px] text-xs font-medium text-gray-500" style={{ border: "1px solid #e0e0e0" }}>🗑 삭제</button>
                </div>
              </div>
            </div>
          ))}
        {/* 내거래 탭 */}
        {tab === "내거래" &&
          filtered.map((it: any) => (
            <div key={it.id} className="rounded-[18px] p-[18px] mb-3" style={{ border: `1.5px solid ${B}` }}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">{it.img}</span>
                  <span className="text-[15px] font-bold">{it.brand}</span>
                  <TypePill type={it.cat} />
                </div>
                <StatusBadge status={it.status} />
              </div>
              <p className="text-base font-semibold mb-2.5">{it.name}</p>
              {it.code && (
                <div className="bg-gray-50 rounded-[14px] px-4 py-3.5 text-center mb-2.5">
                  <p className="text-base font-bold tracking-[2px] font-mono mt-2" style={{ color: BD }}>{it.code}</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold" style={{ color: BD }}>{it.price.toLocaleString()}원</span>
                <span className="text-xs text-gray-300">{it.date}</span>
              </div>
            </div>
          ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-300">
            <span className="text-4xl block mb-2">🎫</span>
            <p className="text-sm">{tab === "사용전" ? "사용 가능한 쿠폰이 없습니다" : tab === "사용완료" ? "사용완료된 쿠폰이 없습니다" : "거래 내역이 없습니다"}</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 포인트 내역 데이터 ═══════ */
const POINT_HISTORY = [
  { id: 1, t: "번개복권 리워드포인트", d: "2026.03.22", e: "2026.04.21 소멸 예정", a: "+2원", tp: "적립" },
  { id: 2, t: "광고 참여 리워드", d: "2026.03.22", e: "2027.03.22 소멸 예정", a: "+2원", tp: "적립" },
  { id: 3, t: "셀렘박스 리워드 포인트", d: "2026.03.22", e: "2026.04.21 소멸 예정", a: "+1원", tp: "적립" },
  { id: 4, t: "번개복권 리워드포인트", d: "2026.03.22", e: "2026.04.21 소멸 예정", a: "+2원", tp: "적립" },
  { id: 5, t: "번개복권 리워드 포인트", d: "2026.03.22", e: "2026.04.21 소멸 예정", a: "+2원", tp: "적립" },
  { id: 6, t: "상품 구매 사용", d: "2026.03.20", e: "", a: "-15원", tp: "사용" },
  { id: 7, t: "상품 환불 포인트", d: "2026.03.19", e: "2026.04.19 소멸 예정", a: "+15원", tp: "환불" },
];

const CASH_HISTORY = [
  { id: 1, t: "쌀먹캐시 충전", d: "2026.03.22", a: "+5,000원", tp: "적립" },
  { id: 2, t: "게임쿠폰 구매", d: "2026.03.21", a: "-3,500원", tp: "사용" },
  { id: 3, t: "장터 판매 수익", d: "2026.03.20", a: "+2,000원", tp: "적립" },
  { id: 4, t: "쌀먹캐시 출금", d: "2026.03.19", a: "-1,000원", tp: "출금" },
];

/* ═══════ 포인트 서브뷰: 리워드 ═══════ */
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

function RewardSubView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#0F0F0F", color: "#fff" }}>
      <div className="flex items-center h-12 px-4 border-b flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button onClick={onBack} className="mr-3 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" /></svg>
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

/* ═══════ 포인트 서브뷰: 번개복권 ═══════ */
function LotterySubView({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"idle" | "loading" | "result">("idle");
  const [result, setResult] = useState<number | null>(null);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [chances, setChances] = useState(10);
  const [winners, setWinners] = useState({ a: 0, b: 0, c: 9 });
  const [remain, setRemain] = useState(112);
  const [timer, setTimer] = useState(2 * 3600 + 36 * 60 + 41);

  useEffect(() => { const iv = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000); return () => clearInterval(iv); }, []);
  useEffect(() => { const iv = setInterval(() => setTickerIdx((i) => (i + 1) % TICKER_DATA.length), 3000); return () => clearInterval(iv); }, []);

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
          <button onClick={reset}><svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 6L6 18M6 6l12 12" /></svg></button>
        </div>
        <div className="flex-1 flex flex-col items-center px-6 overflow-y-auto pb-6">
          <h2 className="text-xl font-bold text-center leading-relaxed mt-3">{prizeLabel(result)} 당첨!<br />{prizeAmount(result)}에 당첨됐어요!</h2>
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
          <div className="flex items-center gap-2 mt-5">
            <span className="text-sm font-bold">2회차</span>
            <span style={{ color: "#555" }}>|</span>
            <span className="text-sm font-bold" style={{ color: "#E53935" }}>{hh}:{mm}:{ss}</span>
            <span className="text-sm" style={{ color: "#888" }}>후 종료</span>
          </div>
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
          <div className="w-full mt-3 rounded-xl px-4 py-3" style={{ background: "#1A1A1A" }}>
            {[
              { rank: "1등", color: "#FFD700", prize: "10만원", cur: winners.a, max: 1 },
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
          <div className="w-full text-center mt-4 h-5 overflow-hidden">
            <p key={tickerIdx} className="text-xs" style={{ color: "#888" }}>{TICKER_DATA[tickerIdx]}</p>
          </div>
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

/* ═══════ 포인트 서브뷰: 친구 초대 ═══════ */
function InviteSubView({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const showToastLocal = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2000); };
  const handleCopyLink = () => {
    if (navigator.clipboard) navigator.clipboard.writeText("https://ssalmuk.com/invite?code=ABC123").then(() => showToastLocal("초대 링크가 복사되었어요!"));
    else showToastLocal("초대 링크가 복사되었어요!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#FAFAFA", color: "#1a1a1a" }}>
      <div className="flex items-center justify-between h-[52px] px-4 border-b border-gray-200 flex-shrink-0">
        <span className="text-base font-bold">쌀먹닷컴</span>
        <button onClick={onBack}>
          <svg className="w-6 h-6" fill="none" stroke="#333" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-9 text-center">
        <p className="text-sm font-semibold" style={{ color: "#888" }}>친구도 나도 <span className="font-bold" style={{ color: "#22C55E" }}>3,000 포인트</span></p>
        <h1 className="text-[24px] font-black leading-snug mt-2.5 mb-4">친구에게 쌀먹닷컴을<br />소개해 주세요</h1>
        <div className="inline-flex px-4 py-1.5 rounded-full" style={{ background: "#E8F8EE" }}>
          <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>초대할 때마다 포인트 무제한 지급</span>
        </div>
        <div className="mx-auto mt-8 mb-6 w-[220px] h-[160px] relative">
          <div className="absolute bottom-0 left-5 right-5 h-[100px] rounded-b-2xl" style={{ background: "linear-gradient(135deg,#FFB8B8,#FF8A8A)", boxShadow: "0 8px 30px rgba(255,100,100,0.2)" }} />
          <div className="absolute top-2.5 left-10 right-10 h-[90px] rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#DC2626,#B91C1C)", boxShadow: "0 4px 20px rgba(185,28,28,0.3)" }}>
            <span className="text-[32px] font-black text-white">3,000</span>
            <span className="text-base font-semibold text-white/80 ml-1 mt-1.5">원</span>
          </div>
          <div className="absolute bottom-0 left-5 right-5 h-[55px] rounded-b-2xl" style={{ background: "linear-gradient(135deg,#FFDADA,#FFCCCC)", clipPath: "polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%)" }} />
        </div>
        <p className="text-[13px] leading-7 mb-9" style={{ color: "#888" }}>
          초대받은 친구가 쌀먹닷컴 앱을 설치하고 가입하면<br />나와 친구 모두에게 3,000 포인트를 드려요.
        </p>
        <button onClick={() => showToastLocal("카카오톡 공유 기능은 앱에서 이용 가능합니다")} className="w-full max-w-[360px] py-[15px] rounded-xl text-[15px] font-bold mb-2.5" style={{ background: "#FEE500", color: "#1a1a1a" }}>
          카카오톡으로 초대하기
        </button>
        <button onClick={handleCopyLink} className="w-full max-w-[360px] py-[15px] rounded-xl text-[15px] font-semibold border border-gray-200 mb-5" style={{ background: "#fff" }}>
          {copied ? "✓ 링크가 복사되었어요!" : "친구 초대 링크 복사하기"}
        </button>
        <button onClick={onBack} className="text-[13px] underline underline-offset-2" style={{ color: "#888" }}>나의 포인트 확인</button>
      </div>
      {toastMsg && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-[13px] font-medium text-white z-[999]" style={{ background: "rgba(0,0,0,0.8)" }}>{toastMsg}</div>
      )}
    </div>
  );
}

/* ═══════ 포인트 서브뷰: 출금 ═══════ */
const BANKS = ["국민은행","신한은행","하나은행","우리은행","농협은행","기업은행","카카오뱅크","토스뱅크","SC제일은행","대구은행","부산은행","경남은행","광주은행","전북은행","제주은행","수협은행","새마을금고","신협","우체국"];
const PAYS = [
  { id: "naver", name: "네이버페이", color: "#03C75A", icon: "N", iconColor: "#fff" },
  { id: "toss", name: "토스페이", color: "#0064FF", icon: "T", iconColor: "#fff" },
  { id: "kakao", name: "카카오페이", color: "#FEE500", icon: "K", iconColor: "#1a1a1a" },
];

function WithdrawSubView({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<"method" | "pay" | "phone" | "bankForm" | "complete">("method");
  const [selectedPay, setSelectedPay] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authVerified, setAuthVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [showBankList, setShowBankList] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const timerRef = useRef<any>(null);

  const totalPoints = USER.point;
  const showToastLocal = (m: string) => { setToastMsg(m); setTimeout(() => setToastMsg(""), 2500); };

  useEffect(() => {
    if (timer > 0) { timerRef.current = setTimeout(() => setTimer((t) => t - 1), 1000); }
    return () => clearTimeout(timerRef.current);
  }, [timer]);
  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const sendAuth = () => {
    if (phone.length < 10) { showToastLocal("휴대폰 번호를 정확히 입력해주세요"); return; }
    setAuthSent(true); setTimer(180); showToastLocal("인증번호가 발송되었어요");
  };
  const verifyAuth = () => {
    if (authCode.length < 4) { showToastLocal("인증번호를 입력해주세요"); return; }
    setAuthVerified(true); showToastLocal("본인인증이 완료되었어요");
    setTimeout(() => setStep("bankForm"), 800);
  };
  const handlePayWithdraw = (payId: string) => { setSelectedPay(payId); setStep("phone"); };
  const submitWithdraw = () => {
    const amt = parseInt(withdrawAmt) || 0;
    if (amt < 1) { showToastLocal("출금 금액을 입력해주세요"); return; }
    if (amt > totalPoints) { showToastLocal("보유 포인트를 초과할 수 없어요"); return; }
    if (step === "bankForm" && (!bankName || !bankAccount)) { showToastLocal("계좌 정보를 입력해주세요"); return; }
    setStep("complete");
  };

  const goStepBack = () => {
    if (step === "complete") onBack();
    else if (step === "bankForm") setStep("phone");
    else if (step === "phone") setStep(selectedPay ? "pay" : "method");
    else if (step === "pay") setStep("method");
    else onBack();
  };

  const inputCls = "w-full py-3.5 px-4 rounded-xl text-sm outline-none text-white" as const;
  const inputBg = { background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.1)" };

  const Header = ({ title }: { title: string }) => (
    <div className="flex items-center h-12 px-4 flex-shrink-0" style={{ background: "#0F0F0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button onClick={goStepBack} className="mr-3">
        <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <span className="text-base font-semibold text-white">{title}</span>
    </div>
  );

  /* 완료 */
  if (step === "complete") {
    return (
      <div className="flex flex-col h-full" style={{ background: "#0F0F0F", color: "#fff" }}>
        <Header title="출금 완료" />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)" }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h2 className="text-[22px] font-bold mb-2">출금 신청 완료!</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#888" }}>
            {selectedPay ? `${PAYS.find((p) => p.id === selectedPay)?.name}로` : `${bankName} 계좌로`}<br />
            <span className="text-xl font-bold" style={{ color: "#4CD964" }}>{withdrawAmt}원</span> 출금 신청되었어요.
          </p>
          <p className="text-xs mt-3" style={{ color: "#666" }}>영업일 기준 1~2일 내 입금됩니다.</p>
          <button onClick={onBack} className="w-full max-w-[320px] py-4 rounded-xl text-[15px] font-bold text-white mt-10" style={{ background: "#22C55E" }}>확인</button>
        </div>
      </div>
    );
  }

  /* 계좌 정보 입력 */
  if (step === "bankForm") {
    return (
      <div className="flex flex-col h-full" style={{ background: "#0F0F0F", color: "#fff" }}>
        <Header title="계좌 출금" />
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="rounded-[14px] p-4 mb-6 flex justify-between items-center" style={{ background: "#1A1A1A" }}>
            <span className="text-[13px]" style={{ color: "#888" }}>출금 가능 포인트</span>
            <span className="text-base font-bold" style={{ color: "#4CD964" }}>{totalPoints.toLocaleString()}원</span>
          </div>

          <label className="text-[13px] font-semibold block mb-2" style={{ color: "#999" }}>은행 선택</label>
          <div className="relative mb-4">
            <button onClick={() => setShowBankList(!showBankList)} className={inputCls + " flex justify-between items-center text-left"} style={inputBg}>
              <span style={{ color: bankName ? "#fff" : "#555" }}>{bankName || "은행을 선택해주세요"}</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d={showBankList ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} stroke="#666" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {showBankList && (
              <div className="absolute top-full left-0 right-0 z-20 rounded-xl mt-1 max-h-[200px] overflow-y-auto" style={{ background: "#222", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 30px rgba(0,0,0,0.5)" }}>
                {BANKS.map((b) => (
                  <button key={b} onClick={() => { setBankName(b); setShowBankList(false); }}
                    className="w-full px-4 py-3 text-left text-sm text-white" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: bankName === b ? "rgba(34,197,94,0.15)" : "transparent" }}>
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="text-[13px] font-semibold block mb-2" style={{ color: "#999" }}>계좌번호</label>
          <input value={bankAccount} onChange={(e) => setBankAccount(e.target.value.replace(/[^0-9]/g, ""))} placeholder="계좌번호 입력 ('-' 제외)"
            className={inputCls + " mb-4"} style={inputBg} inputMode="numeric" />

          <label className="text-[13px] font-semibold block mb-2" style={{ color: "#999" }}>출금 금액</label>
          <div className="relative mb-2">
            <input value={withdrawAmt} onChange={(e) => setWithdrawAmt(e.target.value.replace(/[^0-9]/g, ""))} placeholder="0"
              className={inputCls + " pr-10"} style={inputBg} inputMode="numeric" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#888" }}>원</span>
          </div>
          <button onClick={() => setWithdrawAmt(String(totalPoints))} className="text-xs font-semibold mb-8 py-1" style={{ color: "#22C55E" }}>전액 출금</button>

          <button onClick={submitWithdraw}
            className="w-full py-4 rounded-xl text-[15px] font-bold text-white"
            style={{ background: bankName && bankAccount && withdrawAmt ? "#22C55E" : "#333" }}>
            출금 신청하기
          </button>
          <p className="text-[11px] text-center mt-4 leading-relaxed" style={{ color: "#555" }}>
            본인 명의 계좌만 출금 가능합니다.<br />영업일 기준 1~2일 내 입금됩니다.
          </p>
        </div>
        {toastMsg && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-[13px] font-medium text-white z-[999]" style={{ background: "rgba(0,0,0,0.85)" }}>{toastMsg}</div>}
      </div>
    );
  }

  /* 핸드폰 인증 */
  if (step === "phone") {
    return (
      <div className="flex flex-col h-full" style={{ background: "#0F0F0F", color: "#fff" }}>
        <Header title="본인인증" />
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(34,197,94,0.15)" }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#22C55E" strokeWidth="1.5" /><circle cx="12" cy="18" r="1" fill="#22C55E" /></svg>
            </div>
            <h2 className="text-lg font-bold mb-1.5">휴대폰 본인인증</h2>
            <p className="text-[13px]" style={{ color: "#888" }}>안전한 출금을 위해 본인인증이 필요해요</p>
          </div>

          <label className="text-[13px] font-semibold block mb-2" style={{ color: "#999" }}>휴대폰 번호</label>
          <div className="flex gap-2 mb-4">
            <input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))} placeholder="01012345678" maxLength={11}
              className={inputCls + " flex-1"} style={inputBg} inputMode="tel" disabled={authVerified} />
            <button onClick={sendAuth} disabled={authVerified}
              className="px-4 rounded-xl text-[13px] font-semibold flex-shrink-0 text-white"
              style={{ background: authVerified ? "#333" : authSent ? "#333" : "#22C55E", color: authVerified ? "#666" : "#fff" }}>
              {authVerified ? "인증완료" : authSent ? "재전송" : "인증요청"}
            </button>
          </div>

          {authSent && !authVerified && (
            <>
              <label className="text-[13px] font-semibold block mb-2" style={{ color: "#999" }}>
                인증번호 {timer > 0 && <span className="text-red-400 font-medium">({fmtTime(timer)})</span>}
              </label>
              <div className="flex gap-2 mb-6">
                <input value={authCode} onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ""))} placeholder="인증번호 6자리" maxLength={6}
                  className={inputCls + " flex-1"} style={inputBg} inputMode="numeric" />
                <button onClick={verifyAuth} className="px-4 rounded-xl text-[13px] font-semibold flex-shrink-0 text-white" style={{ background: "#22C55E" }}>확인</button>
              </div>
            </>
          )}

          {authVerified && (
            <div className="rounded-xl p-3.5 flex items-center gap-2.5 mb-6" style={{ background: "rgba(34,197,94,0.1)" }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-[13px] font-semibold" style={{ color: "#22C55E" }}>본인인증이 완료되었어요</span>
            </div>
          )}
        </div>
        {toastMsg && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-[13px] font-medium text-white z-[999]" style={{ background: "rgba(0,0,0,0.85)" }}>{toastMsg}</div>}
      </div>
    );
  }

  /* 페이 출금 선택 */
  if (step === "pay") {
    return (
      <div className="flex flex-col h-full" style={{ background: "#0F0F0F", color: "#fff" }}>
        <Header title="페이 출금" />
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="rounded-[14px] p-4 mb-6 flex justify-between items-center" style={{ background: "#1A1A1A" }}>
            <span className="text-[13px]" style={{ color: "#888" }}>출금 가능 포인트</span>
            <span className="text-base font-bold" style={{ color: "#4CD964" }}>{totalPoints.toLocaleString()}원</span>
          </div>
          <p className="text-sm font-semibold mb-3.5">출금할 페이를 선택해주세요</p>
          <div className="flex flex-col gap-2.5">
            {PAYS.map((p) => (
              <button key={p.id} onClick={() => handlePayWithdraw(p.id)}
                className="w-full rounded-[14px] p-4 flex items-center gap-3.5 text-left"
                style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.color }}>
                  <span className="text-lg font-extrabold" style={{ color: p.iconColor }}>{p.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">{p.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "#666" }}>본인인증 후 출금 가능</p>
                </div>
                <IcoChev c="#444" />
              </button>
            ))}
          </div>
          <p className="text-[11px] text-center mt-5 leading-relaxed" style={{ color: "#555" }}>본인 명의 페이 계정으로만 출금 가능합니다.</p>
        </div>
      </div>
    );
  }

  /* 출금 방법 선택 (메인) */
  return (
    <div className="flex flex-col h-full" style={{ background: "#0F0F0F", color: "#fff" }}>
      <Header title="포인트 출금" />
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="rounded-2xl p-5 mb-7" style={{ background: "linear-gradient(135deg,#142D1E,#1A3A28)", border: "1px solid rgba(34,197,94,0.12)" }}>
          <p className="text-xs mb-1.5" style={{ color: "#888" }}>출금 가능 포인트</p>
          <p className="text-[28px] font-bold">{totalPoints.toLocaleString()}<span className="text-base ml-0.5" style={{ color: "#ccc" }}>원</span></p>
        </div>

        <p className="text-[15px] font-bold mb-3.5">출금 방법을 선택해주세요</p>

        <button onClick={() => { setSelectedPay(null); setStep("phone"); }}
          className="w-full rounded-[14px] p-[18px] flex items-center gap-3.5 mb-2.5 text-left"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)" }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">은행계좌 출금</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#666" }}>본인 명의 계좌로 출금 · 핸드폰 인증 필요</p>
          </div>
          <IcoChev c="#444" />
        </button>

        <button onClick={() => setStep("pay")}
          className="w-full rounded-[14px] p-[18px] flex items-center gap-3.5 text-left"
          style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)" }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" stroke="#fff" strokeWidth="1.5" /><path d="M2 10h20M6 15h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">페이 출금</p>
            <p className="text-[11px] mt-0.5" style={{ color: "#666" }}>네이버페이 · 토스페이 · 카카오페이</p>
          </div>
          <IcoChev c="#444" />
        </button>

        <div className="mt-6 rounded-xl p-4" style={{ background: "#1A1A1A" }}>
          <p className="text-xs font-semibold mb-2" style={{ color: "#888" }}>출금 안내</p>
          <div className="text-[11px] leading-[1.8]" style={{ color: "#555" }}>
            <p>• 최소 출금 금액: 1,000원</p>
            <p>• 출금 수수료: 무료</p>
            <p>• 입금 소요: 영업일 기준 1~2일</p>
            <p>• 본인 명의 계좌/페이만 출금 가능</p>
            <p>• 휴대폰 본인인증이 필요합니다</p>
          </div>
        </div>
      </div>
      {toastMsg && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-[13px] font-medium text-white z-[999]" style={{ background: "rgba(0,0,0,0.85)" }}>{toastMsg}</div>}
    </div>
  );
}

/* ═══════ 포인트 모달 (서브뷰 포함) ═══════ */
function PointModal({ show, onClose }: any) {
  const [tab, setTab] = useState("전체");
  const [sub, setSub] = useState<"main" | "reward" | "lottery" | "invite" | "withdraw">("main");
  const tabs = ["전체", "적립", "사용", "출금", "환불"];
  const filtered = tab === "전체" ? POINT_HISTORY : POINT_HISTORY.filter((h) => h.tp === tab);
  const goMain = () => setSub("main");

  if (!show) return null;

  // 서브뷰를 모달 래퍼 안에서 렌더
  const renderContent = () => {
    if (sub === "reward") return <RewardSubView onBack={goMain} />;
    if (sub === "lottery") return <LotterySubView onBack={goMain} />;
    if (sub === "invite") return <InviteSubView onBack={goMain} />;
    if (sub === "withdraw") return <WithdrawSubView onBack={goMain} />;

    return (
      <div style={{ background: "#0F0F0F", color: "#fff", minHeight: "100%" }}>
        <div className="px-5 pt-5 pb-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[30px] font-bold leading-tight">{USER.point.toLocaleString()}P</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[11px] text-orange-400">⚠</span>
                <p className="text-[11px]" style={{ color: "#888" }}>30일 내 소멸 예정: <span className="text-orange-400 font-semibold">1,200P</span></p>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-md text-xs" style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.7)" }}>사용방법</button>
          </div>
        </div>

        <div className="px-5 pb-4">
          <button onClick={() => setSub("withdraw")} className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-1.5" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,.1)" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke="#4CD964" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            포인트 출금하기
          </button>
        </div>

        <div className="px-5 pb-5">
          <p className="text-sm font-bold mb-2.5" style={{ color: "rgba(255,255,255,.8)" }}>포인트 모으기</p>
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

        <div className="h-2" style={{ background: "#1A1A1A" }} />

        <div className="px-5 pt-5 pb-20">
          <p className="text-sm font-bold mb-2.5" style={{ color: "rgba(255,255,255,.8)" }}>사용 내역</p>
          <div className="flex gap-1 mb-3">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === t ? "bg-[#72C2FF] text-white" : "text-gray-400 hover:text-gray-200"}`}
                style={tab !== t ? { background: "#1A1A1A" } : {}}
              >
                {t}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: "#555" }}>내역이 없습니다</p>
          ) : (
            <div className="flex flex-col gap-1">
              {filtered.map((h, i) => (
                <div key={h.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #1A1A1A" }}>
                  <div>
                    <p className="text-sm font-semibold text-white">{h.t}</p>
                    <div className="flex gap-2.5 mt-0.5">
                      <p className="text-[11px]" style={{ color: "#555" }}>{h.d}</p>
                      {h.e && <p className="text-[11px]" style={{ color: "#444" }}>{h.e}</p>}
                    </div>
                  </div>
                  <span className="text-[15px] font-extrabold" style={{ color: h.a.startsWith("+") ? "#72C2FF" : "#FF5555" }}>{h.a}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end" style={{ animation: "fadeIn .22s ease both" }}>
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div
        className="relative bg-white rounded-t-[20px] flex flex-col max-w-md w-full mx-auto overflow-hidden"
        style={{ height: "95vh", animation: "slideUp .32s cubic-bezier(.16,1,.3,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {sub === "main" && (
          <div className="flex items-center px-4 py-3.5 flex-shrink-0" style={{ background: "#0F0F0F", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <button onClick={onClose} className="p-1 mr-2">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="flex-1 font-bold text-base text-center mr-[30px] text-white">포인트</span>
            <div className="w-8 h-8 rounded-full bg-[#72C2FF] flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">P</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}

/* ═══════ 캐시 충전 결제수단 ═══════ */
const EASY_METHODS = [
  { id: "payco", label: "PAYCO", icon: "🅿", limit: "한도 없음", fee: 5 },
  { id: "toss", label: "Toss Pay", icon: "💙", limit: "1회 : 200만원", fee: 5 },
  { id: "naver", label: "Naver Pay", icon: "🟢", limit: "최대 200만원", fee: 5 },
  { id: "kakao", label: "Kakao Pay", icon: "🟡", limit: "1회 : 200만원", fee: 5 },
  { id: "samsung", label: "Samsung Pay", icon: "🔷", limit: "카드사별 상이", fee: 5 },
];
const GENERAL_METHODS = [
  { id: "mobile", label: "휴대폰결제", icon: "📱", limit: "개인 한도", fee: 15 },
  { id: "card", label: "신용카드", icon: "💳", limit: "카드사별 상이", fee: 5 },
  { id: "transfer", label: "계좌이체", icon: "🏦", limit: "1일 : 500만원", fee: 0, fixedFee: 500 },
];
const VIRTUAL_ACCOUNT = { id: "virtual", label: "가상계좌", icon: "🏧", limit: "한도 없음", fee: 0 };

function calcFee(amount: number, method: any) {
  if (method.fixedFee) return method.fixedFee;
  return Math.floor(amount * (method.fee / 100));
}

/* ═══════ 캐시 충전 서브뷰 ═══════ */
function CashChargeView({ onBack, onComplete }: { onBack: () => void; onComplete: (amount: number) => void }) {
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
    const cur = parseInt(inputVal.replace(/,/g, ""), 10) || 0;
    setInputVal((cur + amount).toLocaleString());
  };
  const handleCharge = () => {
    if (num < 1000) return;
    onComplete(num);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <p className="text-[18px] font-extrabold text-gray-900">캐시 충전</p>
        </div>
      </div>

      <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto flex-1">
        <div className="bg-[#F0FDF4] rounded-2xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">보유 캐시</p>
          <p className="text-[22px] font-extrabold text-green-500">{USER.cash.toLocaleString()}C</p>
        </div>

        <div>
          <p className="text-sm font-bold text-gray-900 mb-2">충전 금액</p>
          <div className="relative">
            <input type="text" inputMode="numeric" value={inputVal} onChange={(e) => handleInput(e.target.value)} placeholder="충전할 금액을 입력하세요"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-8 text-[18px] font-bold text-gray-900 outline-none focus:border-[#72C2FF] transition-colors" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">원</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1000, 5000, 10000, 50000].map((amount) => (
              <button key={amount} onClick={() => addPreset(amount)}
                className="py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#72C2FF] hover:text-[#72C2FF] hover:bg-[#E8F4FD] transition-all">
                +{amount.toLocaleString()}원
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-gray-400 mb-2">추천</p>
          <button onClick={() => setChargeMethod(VIRTUAL_ACCOUNT.id)}
            className={`w-full flex items-center justify-between p-3 rounded-xl border-2 mb-3 transition-all ${chargeMethod === VIRTUAL_ACCOUNT.id ? "border-[#72C2FF] bg-[#E8F4FD]" : "border-gray-200"}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{VIRTUAL_ACCOUNT.icon}</span>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-gray-900">{VIRTUAL_ACCOUNT.label}</span>
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
                <span className="text-[11px] font-bold text-gray-900">{m.label}</span>
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
                <span className="text-[11px] font-bold text-gray-900">{m.label}</span>
                <span className={`text-[9px] font-semibold mt-0.5 ${m.fixedFee ? "text-blue-400" : "text-orange-400"}`}>
                  {m.fixedFee ? `수수료 ${m.fixedFee.toLocaleString()}원` : `수수료 ${m.fee}%`}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 pt-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-sm text-gray-500"><span>충전 금액</span><span>{num > 0 ? num.toLocaleString() : "-"}원</span></div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">수수료 ({current.label})</span>
            <span className={fee > 0 ? "text-orange-500" : "text-green-500 font-medium"}>{fee > 0 ? `+${fee.toLocaleString()}원` : "없음"}</span>
          </div>
          <div className="border-t border-gray-200 my-1" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">총 결제 금액</span>
            <span className="text-[20px] font-extrabold text-gray-900">{totalPay > 0 ? totalPay.toLocaleString() : "-"}원</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-gray-100">
        <button onClick={handleCharge} disabled={num < 1000}
          className={`w-full py-3.5 rounded-2xl font-extrabold text-[16px] transition-colors ${num >= 1000 ? "bg-[#72C2FF] text-white hover:bg-[#5BA8E6]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          {num >= 1000 ? `${totalPay.toLocaleString()}원 결제하기` : "충전할 금액을 입력하세요"}
        </button>
      </div>
    </div>
  );
}

/* ═══════ 캐시 모달 (충전 서브뷰 포함) ═══════ */
function CashModal({ show, onClose }: any) {
  const [tab, setTab] = useState("전체");
  const [sub, setSub] = useState<"main" | "charge" | "withdraw">("main");
  const [chargeToast, setChargeToast] = useState("");
  const tabs = ["전체", "적립", "사용", "출금", "환불"];
  const filtered = tab === "전체" ? CASH_HISTORY : CASH_HISTORY.filter((h) => h.tp === tab);

  if (!show) return null;

  const renderContent = () => {
    if (sub === "withdraw") return <WithdrawSubView onBack={() => setSub("main")} />;
    if (sub === "charge") return (
      <CashChargeView
        onBack={() => setSub("main")}
        onComplete={(amount) => {
          setSub("main");
          setChargeToast(`${amount.toLocaleString()}원 충전 완료!`);
          setTimeout(() => setChargeToast(""), 2500);
        }}
      />
    );

    return (
      <div style={{ background: "#0F0F0F", color: "#fff", minHeight: "100%" }}>
        <div className="px-5 pt-5 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[30px] font-bold leading-tight">{USER.cash.toLocaleString()}C</p>
              <p className="text-xs mt-2" style={{ color: "#888" }}>쌀먹캐시 잔액</p>
            </div>
            <button className="px-3 py-1.5 rounded-md text-xs" style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.7)" }}>사용방법</button>
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-2.5">
          <button onClick={() => setSub("charge")} className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white" style={{ background: "linear-gradient(135deg,#5AABF0,#72C2FF)" }}>충전하기</button>
          <button onClick={() => setSub("withdraw")} className="flex-1 py-3.5 rounded-xl font-medium text-sm text-white" style={{ background: "#1A1A1A", border: "1px solid rgba(255,255,255,.1)" }}>출금하기</button>
        </div>

        <div className="h-2" style={{ background: "#1A1A1A" }} />

        <div className="px-5 pt-5 pb-20">
          <p className="text-sm font-bold mb-2.5" style={{ color: "rgba(255,255,255,.8)" }}>거래 내역</p>
          <div className="flex gap-1 mb-3">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${tab === t ? "bg-[#72C2FF] text-white" : "text-gray-400 hover:text-gray-200"}`}
                style={tab !== t ? { background: "#1A1A1A" } : {}}>
                {t}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-sm" style={{ color: "#555" }}>내역이 없습니다</p>
          ) : (
            <div className="flex flex-col gap-1">
              {filtered.map((h) => (
                <div key={h.id} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid #1A1A1A" }}>
                  <div>
                    <p className="text-sm font-semibold text-white">{h.t}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "#555" }}>{h.d}</p>
                  </div>
                  <span className="text-[15px] font-extrabold" style={{ color: h.a.startsWith("+") ? "#4CD964" : "#FF5555" }}>{h.a}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end" style={{ animation: "fadeIn .22s ease both" }}>
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      <div
        className="relative bg-white rounded-t-[20px] flex flex-col max-w-md w-full mx-auto overflow-hidden"
        style={{ height: "95vh", animation: "slideUp .32s cubic-bezier(.16,1,.3,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {sub === "main" && (
          <div className="flex items-center px-4 py-3.5 flex-shrink-0" style={{ background: "#0F0F0F", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <button onClick={onClose} className="p-1 mr-2">
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="flex-1 font-bold text-base text-center mr-[30px] text-white">캐시</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5AABF0,#72C2FF)" }}>
              <span className="text-white font-extrabold text-sm">C</span>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
      {chargeToast && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2.5 rounded-3xl text-[13px] font-bold z-[300] whitespace-nowrap shadow-lg">
          ✓ {chargeToast}
        </div>
      )}
    </div>
  );
}

/* ═══════ 내 상품 관리 모달 ═══════ */
const MY_PRODUCTS = [
  { id: "p1", cat: "기프티콘", brand: "스타벅스", name: "아메리카노 T", price: 3800, status: "판매중", img: "☕", date: "18일 전", location: "지역정보 없음", views: 12 },
  { id: "p2", cat: "상품권", brand: "신세계", name: "신세계상품권 5만원권", price: 47000, status: "예약중", img: "🎫", date: "15일 전", location: "서울 강남구", views: 28 },
  { id: "p3", cat: "기프티콘", brand: "배스킨라빈스", name: "파인트 아이스크림", price: 7500, status: "판매완료", img: "🍨", date: "22일 전", location: "지역정보 없음", views: 45 },
  { id: "p4", cat: "상품권", brand: "문화상품권", name: "문화상품권 1만원", price: 9200, status: "판매중", img: "🎟️", date: "10일 전", location: "서울 마포구", views: 8 },
  { id: "p5", cat: "기프티콘", brand: "공차", name: "블랙밀크티+펄 L", price: 4200, status: "숨김", img: "🧋", date: "25일 전", location: "지역정보 없음", views: 3 },
];

function ProductManagementModal({ show, onClose }: any) {
  const [filterTab, setFilterTab] = useState("전체");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("최신순");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [showMore, setShowMore] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const showToastLocal = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2000); };

  const tabs = ["전체", "판매중", "예약중", "판매완료", "숨김"];

  const filtered = MY_PRODUCTS.filter((p) => {
    if (filterTab !== "전체" && p.status !== filterTab) return false;
    if (search && !p.name.includes(search) && !p.brand.includes(search)) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <ModalWrapper show={show} onClose={onClose} title="내 상품 관리" full>
      <div className="px-4 pt-2">
        {/* 필터 탭 */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mb-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTab(t)}
              className={`px-3.5 py-[7px] text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                filterTab === t
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={filterTab === t ? { background: "#222" } : {}}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 검색 */}
        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="상품을 검색해보세요."
            className="w-full py-2.5 pl-9 pr-3 rounded-xl text-[13px] bg-gray-50 border border-gray-200 outline-none focus:border-[#72C2FF] transition-colors"
          />
        </div>

        {/* 정보 바 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[13px] text-gray-500">상품 <strong className="text-gray-900">{filtered.length}</strong>개</span>
            <button className="flex items-center gap-0.5 text-[13px] text-gray-500">
              {sortType}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <button onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")} className="text-gray-400">
              {viewMode === "list" ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} /><rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} /><rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} /><rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} /></svg>
              )}
            </button>
          </div>
          <button onClick={() => { setSelectMode(!selectMode); setSelected([]); }}
            className="flex items-center gap-1 text-[13px] text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            선택
          </button>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className="px-4 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">📦</span>
            <p className="text-sm text-gray-400">등록된 상품이 없습니다</p>
          </div>
        ) : (
          filtered.map((p, idx) => (
            <div
              key={p.id}
              className="flex gap-3 py-4 relative"
              style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #f0f0f0" : "none", animation: `fadeSlideIn .35s ease ${idx * .04}s both` }}
            >
              {/* 선택 체크박스 */}
              {selectMode && (
                <button onClick={() => toggleSelect(p.id)} className="flex-shrink-0 mt-1">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected.includes(p.id) ? "border-[#72C2FF] bg-[#72C2FF]" : "border-gray-300"
                  }`}>
                    {selected.includes(p.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    )}
                  </div>
                </button>
              )}

              {/* 이미지 */}
              <div className="w-[100px] h-[100px] bg-gray-100 rounded-xl flex items-center justify-center text-[40px] flex-shrink-0 overflow-hidden">
                {p.img}
              </div>

              {/* 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-900">{p.price.toLocaleString()}원</p>
                    <p className="text-[14px] text-gray-700 mt-0.5">{p.name}</p>
                    <p className="text-[12px] text-gray-400 mt-1">{p.location} · {p.date}</p>
                  </div>
                  <button onClick={() => setShowMore(showMore === p.id ? null : p.id)} className="p-1 text-gray-400 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></svg>
                  </button>
                </div>

                {/* 상태 뱃지 */}
                {p.status !== "판매중" && (
                  <span className="inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                    style={{
                      background: p.status === "예약중" ? "#FFF3E0" : p.status === "판매완료" ? "#E8F5E9" : "#f5f5f5",
                      color: p.status === "예약중" ? "#F57C00" : p.status === "판매완료" ? "#43A047" : "#999",
                    }}>
                    {p.status}
                  </span>
                )}

                {/* 액션 버튼 (판매중일 때만) */}
                {p.status === "판매중" && (
                  <div className="flex gap-2 mt-2.5">
                    <button onClick={() => showToastLocal("UP 완료!")}
                      className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors">
                      UP하기
                    </button>
                    <button onClick={() => showToastLocal("가격이 10% 인하되었습니다")}
                      className="px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors">
                      가격내리기
                    </button>
                  </div>
                )}

                {/* 더보기 메뉴 */}
                {showMore === p.id && (
                  <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[120px]"
                    onClick={() => setShowMore(null)}>
                    {p.status === "판매중" && <button className="w-full px-4 py-2.5 text-left text-[13px] text-gray-700 hover:bg-gray-50">예약중으로 변경</button>}
                    {p.status === "판매중" && <button className="w-full px-4 py-2.5 text-left text-[13px] text-gray-700 hover:bg-gray-50">판매완료로 변경</button>}
                    {p.status !== "숨김" && <button className="w-full px-4 py-2.5 text-left text-[13px] text-gray-700 hover:bg-gray-50">숨기기</button>}
                    {p.status === "숨김" && <button className="w-full px-4 py-2.5 text-left text-[13px] text-gray-700 hover:bg-gray-50">숨김 해제</button>}
                    <button className="w-full px-4 py-2.5 text-left text-[13px] text-red-500 hover:bg-gray-50">삭제</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 하단 안내 배너 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-4 z-10">
        <button className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-1.5 text-[13px] font-semibold"
          style={{ background: "#E8F4FD", color: BD }}>
          <span style={{ color: BD, fontWeight: 700 }}>안내</span> 판매 수수료 자세히 알아보기
          <svg className="w-4 h-4" fill="none" stroke={BD} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* 선택 모드 하단 액션 */}
      {selectMode && selected.length > 0 && (
        <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto px-4 z-10">
          <div className="flex gap-2">
            <button onClick={() => showToastLocal(`${selected.length}개 UP 완료!`)}
              className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: B }}>
              {selected.length}개 UP하기
            </button>
            <button onClick={() => showToastLocal(`${selected.length}개 숨김 처리`)}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-300 text-gray-700">
              숨기기
            </button>
            <button onClick={() => showToastLocal(`${selected.length}개 삭제`)}
              className="py-3 px-4 rounded-xl text-sm font-semibold text-red-500 border border-red-200">
              삭제
            </button>
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2.5 rounded-3xl text-[13px] font-medium z-[300] whitespace-nowrap">
          {toastMsg}
        </div>
      )}
    </ModalWrapper>
  );
}

/* ═══════ 카운트업 애니메이션 훅 ═══════ */
function useCountUp(target: number, duration = 600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return val;
}

/* ═══════ 거래 현황 모달 (에스크로) ═══════ */
const ESCROW_BUYING = [
  { id: "eb1", brand: "CU", name: "5천원 상품권", price: 4500, status: "escrow", seller: "행운이", date: "2026.03.24", img: "🏪", cat: "상품권" },
  { id: "eb2", brand: "스타벅스", name: "카페라떼 T", price: 4200, status: "completed", seller: "커피러버", date: "2026.03.22", img: "☕", cat: "기프티콘", barcode: "1234-5678-9012" },
  { id: "eb3", brand: "배스킨라빈스", name: "파인트 아이스크림", price: 8500, status: "dispute", seller: "아이스맨", date: "2026.03.20", img: "🍨", cat: "기프티콘" },
  { id: "eb4", brand: "해피머니", name: "해피머니 3만원권", price: 28500, status: "completed", seller: "선물왕", date: "2026.03.18", img: "💳", cat: "상품권", barcode: "HAPY-7788-1122" },
];
const ESCROW_SELLING = [
  { id: "es1", brand: "GS25", name: "1만원 상품권", price: 9000, status: "waiting", buyer: null, date: "2026.03.24", img: "🏪", cat: "상품권" },
  { id: "es2", brand: "배스킨라빈스", name: "파인트", price: 8500, status: "escrow", buyer: "아이스크림왕", date: "2026.03.23", img: "🍨", cat: "기프티콘" },
  { id: "es3", brand: "버거킹", name: "와퍼세트", price: 7500, status: "settled", buyer: "햄버거맨", date: "2026.03.20", img: "🍔", cat: "기프티콘", settledAmount: 7237 },
  { id: "es4", brand: "문화상품권", name: "문화상품권 1만원", price: 9200, status: "completed", buyer: "문화인", date: "2026.03.18", img: "🎟️", cat: "상품권" },
];

function EscrowStatusBadge({ status }: { status: string }) {
  const m: Record<string, { text: string; bg: string; c: string }> = {
    waiting: { text: "판매중", bg: "#E8F5E9", c: "#43A047" },
    escrow: { text: "거래중", bg: "#FFF3E0", c: "#F57C00" },
    dispute: { text: "분쟁중", bg: "#FFEBEE", c: "#E53935" },
    completed: { text: "거래완료", bg: "#f5f5f5", c: "#777" },
    settled: { text: "정산완료", bg: BL, c: BD },
  };
  const s = m[status] || { text: status, bg: "#f5f5f5", c: "#999" };
  return <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg" style={{ background: s.bg, color: s.c }}>{s.text}</span>;
}

function MyEscrowTradeModal({ show, onClose }: any) {
  const [tradeTab, setTradeTab] = useState<"buying" | "selling">("buying");
  const [buyFilter, setBuyFilter] = useState("all");
  const [sellFilter, setSellFilter] = useState("all");
  const [toastMsg, setToastMsg] = useState("");

  const showToastLocal = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(""), 2000); };

  const buyFilters = [
    { key: "all", label: "전체" },
    { key: "escrow", label: "거래중" },
    { key: "dispute", label: "분쟁중" },
    { key: "completed", label: "거래완료" },
  ];
  const sellFilters = [
    { key: "all", label: "전체" },
    { key: "waiting", label: "판매중" },
    { key: "escrow", label: "거래중" },
    { key: "dispute", label: "분쟁중" },
    { key: "completed", label: "거래완료" },
  ];

  const filteredBuy = buyFilter === "all" ? ESCROW_BUYING :
    buyFilter === "completed" ? ESCROW_BUYING.filter((t) => t.status === "completed" || t.status === "settled") :
    ESCROW_BUYING.filter((t) => t.status === buyFilter);

  const filteredSell = sellFilter === "all" ? ESCROW_SELLING :
    sellFilter === "completed" ? ESCROW_SELLING.filter((t) => t.status === "completed" || t.status === "settled") :
    ESCROW_SELLING.filter((t) => t.status === sellFilter);

  const items = tradeTab === "buying" ? filteredBuy : filteredSell;
  const filters = tradeTab === "buying" ? buyFilters : sellFilters;
  const activeFilter = tradeTab === "buying" ? buyFilter : sellFilter;
  const setActiveFilter = tradeTab === "buying" ? setBuyFilter : setSellFilter;

  return (
    <ModalWrapper show={show} onClose={onClose} title="거래 현황" full>
      {/* 구매/판매 토글 */}
      <div className="px-4 pt-2 pb-3 border-b border-gray-100">
        <div className="flex bg-gray-100 rounded-xl p-[3px] relative">
          <div
            className="absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] bg-white rounded-[10px] shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: tradeTab === "buying" ? "translateX(3px)" : "translateX(calc(100% + 3px))" }}
          />
          {[{ key: "buying" as const, label: "구매 내역" }, { key: "selling" as const, label: "판매 내역" }].map((t) => (
            <button key={t.key} onClick={() => setTradeTab(t.key)}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold transition-all relative z-10 ${tradeTab === t.key ? "text-gray-900" : "text-gray-400"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="px-4 py-2.5 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button key={f.key} onClick={() => setActiveFilter(f.key)}
            className="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all"
            style={
              activeFilter === f.key
                ? { background: "#E8F4FD", border: "1.5px solid #72C2FF", color: "#4A9FD9" }
                : { background: "#fff", border: "1.5px solid #e5e5e5", color: "#888" }
            }>
            {f.label}
          </button>
        ))}
      </div>

      {/* 거래 리스트 */}
      <div className="px-4 py-3">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">{tradeTab === "buying" ? "🛒" : "📦"}</span>
            <p className="text-sm text-gray-400">{tradeTab === "buying" ? "구매 내역이 없습니다" : "판매 내역이 없습니다"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((trade: any, idx: number) => (
              <div key={trade.id} className="bg-white rounded-2xl p-4 border border-gray-100"
                style={{ animation: `fadeSlideIn .35s ease ${idx * .05}s both` }}>
                {/* 상태 + 날짜 */}
                <div className="flex items-center justify-between mb-3">
                  <EscrowStatusBadge status={trade.status} />
                  <span className="text-[11px] text-gray-400">{trade.date}</span>
                </div>
                {/* 상품 정보 */}
                <div className="flex gap-3">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: BL }}>
                    {trade.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <TypePill type={trade.cat} />
                      <span className="text-xs" style={{ color: BD }}>{trade.brand}</span>
                    </div>
                    <p className="font-bold text-gray-900 text-[14px]">{trade.name}</p>
                    <p className="font-bold mt-0.5" style={{ color: BD }}>{trade.price.toLocaleString()}원</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {tradeTab === "buying" ? `판매자: ${trade.seller}` : trade.buyer ? `구매자: ${trade.buyer}` : "대기중"}
                    </p>
                    {trade.status === "settled" && trade.settledAmount && (
                      <p className="text-[11px] font-semibold mt-0.5" style={{ color: "#43A047" }}>정산액: {trade.settledAmount.toLocaleString()}원</p>
                    )}
                  </div>
                </div>
                {/* 액션 버튼 */}
                {trade.status === "escrow" && tradeTab === "buying" && (
                  <button onClick={() => showToastLocal("구매 확정 완료!")}
                    className="w-full mt-3 py-2.5 text-sm font-bold text-white rounded-xl" style={{ background: B }}>
                    구매 확정하기
                  </button>
                )}
                {trade.status === "escrow" && tradeTab === "selling" && (
                  <button onClick={() => showToastLocal("쿠폰이 전송되었습니다")}
                    className="w-full mt-3 py-2.5 text-sm font-bold text-white rounded-xl" style={{ background: "#F57C00" }}>
                    쿠폰 전송하기
                  </button>
                )}
                {trade.status === "dispute" && (
                  <button onClick={() => showToastLocal("분쟁 상세 페이지로 이동합니다")}
                    className="w-full mt-3 py-2.5 text-sm font-bold rounded-xl" style={{ background: "#FFEBEE", color: "#E53935" }}>
                    분쟁 상세보기
                  </button>
                )}
                {trade.status === "completed" && tradeTab === "buying" && trade.barcode && (
                  <button onClick={() => showToastLocal("쿠폰 코드가 복사되었습니다")}
                    className="w-full mt-3 py-2.5 text-sm font-semibold rounded-xl" style={{ background: BL, color: BD }}>
                    쿠폰 확인하기
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {toastMsg && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2.5 rounded-3xl text-[13px] font-medium z-[300] whitespace-nowrap">
          {toastMsg}
        </div>
      )}
    </ModalWrapper>
  );
}

/* ═══════ 관심상품 (찜) 모달 ═══════ */
const WISH_ITEMS = [
  { id: "w1", name: "스타벅스 아메리카노 T 2매", price: 7200, brand: "스타벅스", img: "☕", liked: true, date: "2일 전", hearts: 5, chats: 0, cat: "기프티콘" },
  { id: "w2", name: "신세계 상품권 5만원권", price: 47000, brand: "신세계", img: "🎫", liked: true, date: "5일 전", hearts: 3, chats: 3, cat: "상품권" },
  { id: "w3", name: "배스킨라빈스 파인트", price: 7500, brand: "배스킨라빈스", img: "🍨", liked: true, date: "9일 전", hearts: 12, chats: 2, cat: "기프티콘" },
  { id: "w4", name: "문화상품권 1만원", price: 9200, brand: "문화상품권", img: "🎟️", liked: true, date: "3일 전", hearts: 7, chats: 1, cat: "상품권" },
];

const RECENT_ITEMS = [
  { id: "r1", name: "공차 블랙밀크티+펄 L", price: 4200, brand: "공차", img: "🧋", liked: false, date: "17시간 전", hearts: 34, chats: 4, cat: "기프티콘" },
  { id: "r2", name: "GS25 1만원 상품권", price: 9500, brand: "GS25", img: "🏪", liked: false, date: "22시간 전", hearts: 22, chats: 2, cat: "상품권" },
  { id: "r3", name: "해피머니 3만원권", price: 28500, brand: "해피머니", img: "💳", liked: false, date: "23시간 전", hearts: 7, chats: 1, cat: "상품권" },
  { id: "r4", name: "맥도날드 빅맥세트", price: 5500, brand: "맥도날드", img: "🍔", liked: false, date: "15시간 전", hearts: 7, chats: 1, cat: "기프티콘" },
  { id: "r5", name: "구글플레이 1만원", price: 9500, brand: "구글플레이", img: "🎮", liked: false, date: "1일 전", hearts: 4, chats: 0, cat: "상품권" },
];

function WishlistModal({ show, onClose }: any) {
  const [activeTab, setActiveTab] = useState<"찜" | "최근 본 상품">("찜");
  const [wishItems, setWishItems] = useState(WISH_ITEMS.map((w) => ({ ...w })));
  const [recentItems, setRecentItems] = useState(RECENT_ITEMS.map((r) => ({ ...r })));

  const toggleLike = (id: string, list: "wish" | "recent") => {
    if (list === "wish") {
      setWishItems((prev) => prev.map((i) => i.id === id ? { ...i, liked: !i.liked } : i));
    } else {
      setRecentItems((prev) => prev.map((i) => i.id === id ? { ...i, liked: !i.liked } : i));
    }
  };

  const items = activeTab === "찜" ? wishItems.filter((i) => i.liked) : recentItems;

  return (
    <ModalWrapper show={show} onClose={onClose} title="관심상품" full>
      {/* 탭 */}
      <div className="flex border-b border-gray-100">
        {(["찜", "최근 본 상품"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="flex-1 py-3 text-sm font-medium text-center transition-all"
            style={{
              borderBottom: activeTab === t ? "2px solid #222" : "2px solid transparent",
              color: activeTab === t ? "#222" : "#999",
              fontWeight: activeTab === t ? 700 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 그리드 */}
      <div className="px-4 pt-4 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3">{activeTab === "찜" ? "❤️" : "👀"}</span>
            <p className="text-sm text-gray-400">{activeTab === "찜" ? "찜한 상품이 없습니다" : "최근 본 상품이 없습니다"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden bg-white border border-gray-100"
                style={{ animation: `fadeSlideIn .35s ease ${idx * .05}s both` }}
              >
                {/* 이미지 */}
                <div className="relative w-full aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="text-[52px]">{item.img}</span>
                  {/* 하트 버튼 */}
                  <button
                    onClick={() => toggleLike(item.id, activeTab === "찜" ? "wish" : "recent")}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
                    style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(4px)" }}
                  >
                    {item.liked ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF4757"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                    )}
                  </button>
                </div>

                {/* 정보 */}
                <div className="p-3">
                  <p className="text-[15px] font-extrabold text-gray-900">{item.price.toLocaleString()}원</p>
                  <p className="text-[13px] text-gray-600 mt-0.5 truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-gray-400">{item.date}</span>
                    <div className="flex items-center gap-2">
                      {item.hearts > 0 && (
                        <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                          {item.hearts}
                        </span>
                      )}
                      {item.chats > 0 && (
                        <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
                          {item.chats}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

/* ═══════ 인터랙티브 아이콘 버튼 ═══════ */
function IconBtn({ icon, label, count, onClick, delay = 0 }: any) {
  const [pressed, setPressed] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), delay); return () => clearTimeout(t); }, []);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className="flex flex-col items-center gap-[7px] py-4 bg-white rounded-[14px] relative border border-gray-100"
      style={{
        transform: pressed ? "scale(.93)" : mounted ? "scale(1)" : "scale(.8)",
        opacity: mounted ? 1 : 0,
        transition: "all .25s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px]"
        style={{
          background: "linear-gradient(135deg, #E8F4FD 0%, #f0f4ff 100%)",
          transition: "transform .2s",
          transform: pressed ? "scale(1.15) rotate(-8deg)" : "scale(1)",
        }}
      >
        {icon}
      </div>
      {count > 0 && (
        <span
          className="absolute top-1.5 right-[calc(50%-30px)] text-[9px] font-bold text-white px-1.5 py-px rounded-full"
          style={{ background: "#FF4757", boxShadow: "0 2px 6px rgba(255,71,87,.4)" }}
        >
          {count}
        </span>
      )}
      <span className="text-[11px] font-semibold text-gray-500">{label}</span>
    </button>
  );
}

/* ═══════ 프로필 아바타 (float 애니메이션) ═══════ */
function FloatAvatar({ emoji }: { emoji: string }) {
  return (
    <div
      className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[26px]"
      style={{
        background: "rgba(255,255,255,.3)",
        border: "2.5px solid rgba(255,255,255,.6)",
        animation: "float 3s ease-in-out infinite",
        boxShadow: "0 4px 15px rgba(0,0,0,.1)",
      }}
    >
      {emoji}
    </div>
  );
}

/* ═══════════════════ 메인: 내거래함 콘텐츠 ═══════════════════ */
export default function MyTradeContent() {
  const [toggle, setToggle] = useState("sell");
  const [showReview, setShowReview] = useState(false);
  const [showFollow, setShowFollow] = useState<string | null>(null);
  const [showTrade, setShowTrade] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<any>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showPoint, setShowPoint] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showProductMgmt, setShowProductMgmt] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showEscrowTrade, setShowEscrowTrade] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };
  const handleCopy = (code: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(code);
    showToast("코드가 복사되었습니다!");
  };

  const sellStats = {
    selling: MY_SELL.filter((i) => i.status === "판매중").length,
    trading: MY_SELL.filter((i) => i.status === "거래중").length,
    sold: MY_SELL.filter((i) => i.status === "판매완료").length,
  };
  const buyStats = {
    trading: MY_BUY.filter((i) => i.status === "거래중").length,
    completed: MY_BUY.filter((i) => i.status === "구매완료").length,
  };
  const totalSold = MY_SELL.filter((i) => i.status === "판매완료").reduce((a, b) => a + b.price, 0);

  const animPoint = useCountUp(USER.point);
  const animCash = useCountUp(USER.cash);

  return (
    <div className="pb-24">
      {/* 인라인 keyframes */}
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeSlideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(114,194,255,.3)}50%{box-shadow:0 0 0 8px rgba(114,194,255,0)}}
        .fade-slide-in{animation:fadeSlideIn .4s ease both}
        .fade-slide-d1{animation:fadeSlideIn .4s ease .05s both}
        .fade-slide-d2{animation:fadeSlideIn .4s ease .1s both}
        .fade-slide-d3{animation:fadeSlideIn .4s ease .15s both}
      `}</style>

      {/* 프로필 카드 */}
      <div
        className="mx-4 mb-3.5 rounded-2xl p-[18px] text-white fade-slide-in overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #8B7CF7 0%, #6B9FE7 50%, #72C2FF 100%)" }}
      >
        {/* 장식 원 */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full" style={{ background: "rgba(255,255,255,.08)" }} />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full" style={{ background: "rgba(255,255,255,.06)" }} />

        <div className="flex items-center gap-3 mb-3 relative z-10">
          <FloatAvatar emoji={USER.avatar} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold">{USER.nickname}</span>
              <span className="text-[10px] font-semibold px-[7px] py-0.5 rounded-lg" style={{ background: "rgba(255,255,255,.22)", backdropFilter: "blur(4px)" }}>{USER.badgeEmoji} {USER.badge}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button onClick={() => setShowFollow("팔로워")} className="flex items-center gap-0.5 text-[13px] opacity-90 hover:opacity-100 transition-opacity">
                팔로워 <strong className="ml-0.5">{USER.followers}</strong> <IcoChev c="rgba(255,255,255,.6)" s={13} />
              </button>
              <button onClick={() => setShowFollow("팔로잉")} className="flex items-center gap-0.5 text-[13px] opacity-90 hover:opacity-100 transition-opacity">
                팔로잉 <strong className="ml-0.5">{USER.following}</strong> <IcoChev c="rgba(255,255,255,.6)" s={13} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex pt-3 mt-1 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,.18)" }}>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-[14px]" style={{ animation: "pulseGlow 2s infinite" }}>⭐</span>
              <span className="text-[17px] font-extrabold">{USER.rating}</span>
            </div>
            <p className="text-[10px] mt-0.5 opacity-50">거래별점</p>
          </div>
          <div className="w-px" style={{ background: "rgba(255,255,255,.15)" }} />
          <button onClick={() => setShowReview(true)} className="flex-1 text-center hover:bg-white/10 rounded-lg transition-colors py-1">
            <p className="text-[17px] font-extrabold">{USER.reviewCount}</p>
            <p className="text-[10px] mt-0.5 opacity-50">거래후기</p>
          </button>
          <div className="w-px" style={{ background: "rgba(255,255,255,.15)" }} />
          <button onClick={() => setShowCoupon(true)} className="flex-1 text-center hover:bg-white/10 rounded-lg transition-colors py-1">
            <p className="text-[17px] font-extrabold">{USER.coupon}</p>
            <p className="text-[10px] mt-0.5 opacity-50">보유 쿠폰</p>
          </button>
        </div>
      </div>

      {/* 포인트 + 캐시 */}
      <div className="flex gap-2 px-4 mb-3.5 fade-slide-d1">
        <button onClick={() => setShowPoint(true)} className="flex-1 bg-white rounded-[14px] p-3.5 flex items-center justify-between border border-gray-100 hover:border-purple-200 transition-colors group">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
              <span className="inline-block group-hover:scale-110 transition-transform">💎</span> 내 포인트
            </span>
            <p className="text-lg font-extrabold text-gray-900">{animPoint.toLocaleString()}<span className="text-[11px] font-medium text-gray-400"> P</span></p>
          </div>
          <IcoChev c="#ccc" />
        </button>
        <button onClick={() => setShowCash(true)} className="flex-1 bg-white rounded-[14px] p-3.5 flex items-center justify-between border border-gray-100 hover:border-amber-200 transition-colors group">
          <div>
            <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
              <span className="inline-block group-hover:scale-110 transition-transform">💰</span> 내 캐시
            </span>
            <p className="text-lg font-extrabold text-gray-900">{animCash.toLocaleString()}<span className="text-[11px] font-medium text-gray-400"> 원</span></p>
          </div>
          <IcoChev c="#ccc" />
        </button>
      </div>

      {/* 판매/구매 토글 */}
      <div className="px-4 mb-3.5 fade-slide-d2">
        <div className="flex bg-gray-100 rounded-xl p-[3px] relative">
          {/* 슬라이더 인디케이터 */}
          <div
            className="absolute top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] bg-white rounded-[10px] shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: toggle === "sell" ? "translateX(3px)" : "translateX(calc(100% + 3px))" }}
          />
          {[{ key: "sell", label: "판매", icon: "🏷️" }, { key: "buy", label: "구매", icon: "🛒" }].map((t) => (
            <button
              key={t.key}
              onClick={() => setToggle(t.key)}
              className={`flex-1 py-2.5 rounded-[10px] text-sm font-bold transition-all relative z-10 flex items-center justify-center gap-1.5 ${toggle === t.key ? "text-gray-900" : "text-gray-400"}`}
            >
              <span className={`text-sm transition-transform duration-200 ${toggle === t.key ? "scale-110" : "scale-100"}`}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 판매 */}
      {toggle === "sell" && (
        <div className="px-4 fade-slide-in">
          <button onClick={() => setShowTrade("sell")} className="w-full flex items-center justify-between bg-white rounded-xl px-3.5 py-3 mb-3.5 border border-gray-100 hover:border-sky-200 transition-colors">
            <span className="text-[13px] font-semibold text-gray-500">올해 판매 금액 <strong className="text-gray-900">{totalSold.toLocaleString()}원</strong></span>
            <IcoChev />
          </button>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <IconBtn icon="🏷️" label="내 상품 관리" count={sellStats.selling} onClick={() => setShowProductMgmt(true)} delay={50} />
            <IconBtn icon="📊" label="판매내역" count={0} onClick={() => setShowTrade("sell")} delay={100} />
            <IconBtn icon="💬" label="거래 채팅" count={0} delay={150} />
          </div>
        </div>
      )}

      {/* 구매 */}
      {toggle === "buy" && (
        <div className="px-4 fade-slide-in">
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <IconBtn icon="❤️" label="찜" count={2} onClick={() => setShowWishlist(true)} delay={50} />
            <IconBtn icon="🛒" label="구매내역" count={0} onClick={() => setShowTrade("buy")} delay={100} />
            <IconBtn icon="💬" label="거래채팅" count={0} delay={150} />
          </div>

          {/* 구매 코드 보기 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-sm font-bold">🎫 구매 코드 보기</p>
              <button onClick={() => setShowTrade("buy")} className="text-xs font-semibold flex items-center gap-0.5" style={{ color: BD }}>
                전체보기 <IcoChev c={BD} s={13} />
              </button>
            </div>
            {MY_BUY.filter((i) => i.status === "구매완료" && i.code).map((it, idx) => (
              <div
                key={it.id}
                className="flex items-center gap-2.5 p-3 bg-white rounded-xl mb-1.5 border border-gray-100 hover:border-sky-200 transition-all hover:shadow-sm"
                style={{ animation: `fadeSlideIn .35s ease ${idx * .06}s both` }}
              >
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0" style={{ background: BL }}>{it.img}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <TypePill type={it.cat} />
                    <span className="text-[10px] text-gray-400">{it.brand}</span>
                  </div>
                  <p className="text-xs font-semibold truncate">{it.name}</p>
                </div>
                <button
                  onClick={() => setShowCode(it)}
                  className="px-3 py-[7px] rounded-[10px] text-[11px] font-semibold text-white flex-shrink-0 hover:brightness-110 active:scale-95 transition-all"
                  style={{ background: B }}
                >
                  코드보기
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 거래 현황 */}
      <div className="px-4 fade-slide-d3">
        <button
          onClick={() => setShowEscrowTrade(true)}
          className="w-full bg-white rounded-[14px] p-4 border border-gray-100 hover:border-sky-200 transition-colors text-left"
        >
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[13px] font-bold">📈 거래 현황</p>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              거래 현황 <IcoChev c="#bbb" s={13} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "판매중", value: sellStats.selling, color: BD, bg: BL },
              { label: "거래중", value: sellStats.trading + buyStats.trading, color: "#F57C00", bg: "#FFF3E0" },
              { label: "판매완료", value: sellStats.sold, color: "#43A047", bg: "#E8F5E9" },
              { label: "구매완료", value: buyStats.completed, color: "#43A047", bg: "#E8F5E9" },
            ].map((x) => (
              <div key={x.label} className="rounded-xl p-2.5 text-center" style={{ background: x.bg }}>
                <p className="text-[10px] font-medium mb-0.5" style={{ color: x.color, opacity: .7 }}>{x.label}</p>
                <p className="text-lg font-extrabold" style={{ color: x.color }}>{x.value}</p>
              </div>
            ))}
          </div>
        </button>
      </div>

      {/* ===== 모달들 ===== */}
      <ReviewModal show={showReview} onClose={() => setShowReview(false)} />
      <FollowModal show={!!showFollow} onClose={() => setShowFollow(null)} tab={showFollow} />
      <TradeDetailModal
        show={showTrade === "sell"}
        onClose={() => setShowTrade(null)}
        isSell
        onViewCode={() => {}}
      />
      <TradeDetailModal
        show={showTrade === "buy"}
        onClose={() => setShowTrade(null)}
        isSell={false}
        onViewCode={(it: any) => { setShowTrade(null); setTimeout(() => setShowCode(it), 250); }}
      />
      <CodeModal show={!!showCode} onClose={() => setShowCode(null)} item={showCode} onCopy={handleCopy} />
      <CouponModal show={showCoupon} onClose={() => setShowCoupon(false)} onCopy={handleCopy} />
      <ProductManagementModal show={showProductMgmt} onClose={() => setShowProductMgmt(false)} />
      <WishlistModal show={showWishlist} onClose={() => setShowWishlist(false)} />
      <MyEscrowTradeModal show={showEscrowTrade} onClose={() => setShowEscrowTrade(false)} />
      <PointModal show={showPoint} onClose={() => setShowPoint(false)} />
      <CashModal show={showCash} onClose={() => setShowCash(false)} />

      {/* 토스트 */}
      {toast.show && (
        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2.5 rounded-3xl text-[13px] font-medium z-[300] whitespace-nowrap">
          {toast.msg}
        </div>
      )}
    </div>
  );
}
