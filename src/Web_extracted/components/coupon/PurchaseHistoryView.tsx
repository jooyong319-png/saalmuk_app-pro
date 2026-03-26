// @ts-nocheck
import { useState } from "react";

const mockPurchaseHistory = [
  {
    id: "33994000123",
    game: "원신",
    name: "창천수지 × 6480",
    description: "프리미엄 가차 재화 직접 충전",
    type: "UID" as const,
    discount: 15,
    originalPrice: 129000,
    discountedPrice: 109650,
    email: "user@example.com",
    date: "2026-03-11 11:41:53",
    pinCode: "A3F9-KX72-PQ4R",
    gameImage: "https://edge.ssalmuk.com/editorImage/c93c02b72a9b4a5780f4c66127ca262b.jpg",
  },
  {
    id: "33994000124",
    game: "원신",
    name: "모험가 번들팩",
    description: "레벨업 지원 + 원소석 번들",
    type: "PIN" as const,
    discount: 10,
    originalPrice: 49000,
    discountedPrice: 44100,
    email: "user@example.com",
    date: "2026-03-08 15:22:10",
    pinCode: "D9X2-KM7F-Q3BR",
    gameImage: "https://edge.ssalmuk.com/editorImage/c93c02b72a9b4a5780f4c66127ca262b.jpg",
  },
  {
    id: "33994000118",
    game: "메이플스토리",
    name: "메소 × 5000만",
    description: "메소 직접 충전",
    type: "UID" as const,
    discount: 15,
    originalPrice: 29000,
    discountedPrice: 24650,
    email: "user@example.com",
    date: "2026-02-27 09:05:44",
    pinCode: "M1K3-ZT8W-NR6V",
    gameImage: "https://edge.ssalmuk.com/editorImage/1da2fd817f7d4a89be566fbed7df3bf9.jpg",
  },
  {
    id: "33994000105",
    game: "리니지M",
    name: "다이아 × 8000",
    description: "다이아 직접 충전",
    type: "UID" as const,
    discount: 12,
    originalPrice: 99000,
    discountedPrice: 87120,
    email: "user@example.com",
    date: "2026-02-14 20:33:01",
    pinCode: "L2N5-HB9C-WF3X",
    gameImage: "https://edge.ssalmuk.com/editorImage/f85655d36efc44aaaf692cbef435271d.jpg",
  },
];

type PurchaseItem = typeof mockPurchaseHistory[0];

function CouponConfirmPopup({ item, onClose }: { item: PurchaseItem; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const masked = item.pinCode.replace(/[A-Z0-9]/g, "●");

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-sm mx-auto shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center pt-8 pb-4">
          <span className="text-4xl mb-2">🎟️</span>
          <p className="text-[17px] font-extrabold text-[#1A1A2E]">쿠폰 확인</p>
        </div>

        <div className="mx-4 mb-4 bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={item.gameImage}
              alt={item.game}
              className="w-12 h-12 rounded-xl object-cover border border-gray-200"
            />
            <div>
              <p className="font-bold text-[#1A1A2E] text-[15px]">{item.game}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.name}</p>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mb-2">
            {item.type === "PIN" ? "PIN 코드" : "UID 코드"}
          </p>
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-center mb-3">
            {visible ? (
              <span className="text-[16px] font-bold text-[#72C2FF] tracking-widest">{item.pinCode}</span>
            ) : (
              <span className="text-[18px] text-gray-300 tracking-widest">{masked}</span>
            )}
          </div>

          <button
            onClick={() => setVisible((v) => !v)}
            className={`w-full py-2.5 rounded-xl border text-sm font-medium transition-all ${
              visible
                ? "border-gray-300 text-gray-500 bg-white hover:bg-gray-50"
                : "border-[#72C2FF] text-[#72C2FF] bg-white hover:bg-[#72C2FF]/5"
            }`}
          >
            {visible ? "숨기기" : `${item.type === "PIN" ? "PIN" : "UID"} 코드 보기`}
          </button>
        </div>

        <div className="px-4 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-[#72C2FF] text-white font-bold text-[16px] hover:bg-[#5BA8E6] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiptPopup({ item, onClose }: { item: PurchaseItem; onClose: () => void }) {
  const discountAmt = item.originalPrice - item.discountedPrice;
  const vat = Math.floor(item.discountedPrice / 11);
  const approvalNo = "J" + item.id.slice(-8);
  const payDate = item.date.slice(0, 10);

  const Cell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`border border-gray-300 px-2 py-1.5 text-[12px] ${className}`}>{children}</div>
  );
  const Label = ({ children }: { children: React.ReactNode }) => (
    <div className="text-[10px] text-gray-500 mb-0.5">{children}</div>
  );

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-sm mx-auto shadow-2xl overflow-hidden rounded-lg flex flex-col max-h-[90vh]">
        <div className="overflow-y-auto flex-1">
          <div className="flex items-start justify-between px-4 pt-4 pb-2 border-b border-gray-300">
            <div>
              <p className="text-[14px] font-extrabold text-[#1A1A2E]">현금영수증 (고객용)</p>
              <p className="text-[11px] text-gray-400 tracking-widest">CASH RECEIPT</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-extrabold text-[#72C2FF] tracking-tight">ssalmuk</p>
              <p className="text-[10px] text-gray-400">살뭇 게임몰</p>
            </div>
          </div>

          <div className="text-[12px]">
            <Cell>
              <Label>소비자 등록번호 (휴대폰, 자진발급번호)</Label>
              {item.email}
            </Cell>
            <Cell>
              <Label>소비자 결제정보</Label>
              {item.type === "UID" ? "UID 직접 충전" : "PIN 코드 결제"}
            </Cell>
            <div className="grid grid-cols-2">
              <Cell><Label>거래일시</Label>{payDate}</Cell>
              <Cell><Label>취소일자</Label><span className="text-gray-300">-</span></Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell><Label>결제구분</Label>현금승인(소득공제)</Cell>
              <Cell>
                <Label>금액 AMOUNT</Label>
                <span className="font-bold text-[#1A1A2E]">{item.discountedPrice.toLocaleString()}원</span>
              </Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell><Label>현금영수증 사업자</Label>(주) 살뭇</Cell>
              <Cell><Label>부가세 VAT</Label>{vat.toLocaleString()}원</Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell><Label>품명/ITEMS</Label>{item.name}</Cell>
              <Cell><Label>봉사료 TIPS</Label>0원</Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell><Label>발급대행사</Label>(주) 살뭇</Cell>
              <Cell>
                <Label>합계 TOTAL</Label>
                <span className="font-bold text-[#1A1A2E]">{item.discountedPrice.toLocaleString()}원</span>
              </Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell>
                <Label>상품 원가</Label>
                <span className="line-through text-gray-400">{item.originalPrice.toLocaleString()}원</span>
              </Cell>
              <Cell>
                <Label>할인 ({item.discount}%)</Label>
                <span className="text-red-500 font-bold">-{discountAmt.toLocaleString()}원</span>
              </Cell>
            </div>
            <Cell><Label>승인번호 / Approval No.</Label>{approvalNo}</Cell>
            <div className="grid grid-cols-2">
              <Cell><Label>현금영수증 가맹점/MALLNAME</Label>(주) 살뭇</Cell>
              <Cell><Label>대표자명/NAME</Label>살뭇대표</Cell>
            </div>
            <div className="grid grid-cols-2">
              <Cell><Label>사업자등록번호</Label>000-00-00000</Cell>
              <Cell><Label>주소 전화번호/ADDRESS</Label><span className="text-[10px]">Tel. 1544-8278</span></Cell>
            </div>
            <Cell><Label>주문번호 / Order No.</Label>{item.id}</Cell>
          </div>

          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-[9px] text-gray-400 leading-relaxed">
              이 영수증은 [조세특례제한법 제 126조 3]에 의거 열람결산시 소득공제 혜택부여(국세청 사이트 회원가입 필수)목적으로 발행됩니다.
              이 현금영수증은 24시간 이내 국세청에 자동 신고 후 확인 조회가 가능합니다.
            </p>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#72C2FF] text-white font-bold text-[15px] hover:bg-[#5BA8E6] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PurchaseHistoryView() {
  const [search, setSearch] = useState("");
  const [periodTab, setPeriodTab] = useState<"월" | "년" | "전체">("월");
  const [month, setMonth] = useState(3);
  const [year, setYear] = useState(2026);
  const [receiptItem, setReceiptItem] = useState<PurchaseItem | null>(null);
  const [couponItem, setCouponItem] = useState<PurchaseItem | null>(null);
  const joinDate = "2024-06-01";
  const today = new Date().toISOString().slice(0, 10);
  const formatDate = (d: string) => d.slice(2).replace(/-/g, ".");

  const filtered = mockPurchaseHistory.filter((item) => {
    const matchSearch =
      item.name.includes(search) || item.description.includes(search);
    if (!matchSearch) return false;

    const itemDate = new Date(item.date);
    if (periodTab === "월") {
      return (
        itemDate.getFullYear() === year && itemDate.getMonth() + 1 === month
      );
    }
    if (periodTab === "년") {
      return itemDate.getFullYear() === year;
    }
    const from = new Date(joinDate);
    const to = new Date(today);
    return itemDate >= from && itemDate <= to;
  });

  return (
    <div className="py-4">
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="게임명을 입력해주세요"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#72C2FF] transition-colors"
        />
        <svg
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
          />
        </svg>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5">
        <p className="text-[13px] font-semibold text-blue-600">
          상품 수령시 취소가 붙가합니다.
        </p>
        <p className="text-[12px] text-blue-400 mt-0.5">
          주문번호, 이메일 등의 정보로 조회 가능합니다. 문의는
          고객센터(1544-8278)
        </p>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          {periodTab === "월" && (
            <>
              <button
                onClick={() => setMonth((m) => (m === 1 ? 12 : m - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-bold text-[#1A1A2E] min-w-[90px] text-center">
                {month}월 거래내역
              </span>
              <button
                onClick={() => setMonth((m) => (m === 12 ? 1 : m + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          {periodTab === "년" && (
            <>
              <button
                onClick={() => setYear((y) => y - 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-bold text-[#1A1A2E] min-w-[90px] text-center">
                {year}년 거래내역
              </span>
              <button
                onClick={() => setYear((y) => y + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          {periodTab === "전체" && (
            <span className="text-sm font-bold text-[#1A1A2E]">
              {formatDate(joinDate)} ~ {formatDate(today)} 거래내역
            </span>
          )}
        </div>

        <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
          {(["월", "년", "전체"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setPeriodTab(t)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                periodTab === t
                  ? "bg-white text-[#72C2FF] shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            구매 내역이 없습니다.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="w-11 h-11 rounded-xl bg-[#2D2D2D] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 2.5c0 1.5-1.5 5-1.5 5h-2S9.5 4 9.5 2.5a2.5 2.5 0 015 0zM12 9c-1.1 0-2 .9-2 2v1l-5 5 1.5 1.5 5-5h1l5 5 1.5-1.5-5-5v-1c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#1A1A2E] text-[14px] truncate">
                      {item.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        item.type === "UID"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-500"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">주문번호 {item.id}</p>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-red-500">-{item.discount}%</span>
                    <span className="text-[11px] text-gray-400 line-through">
                      {item.originalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <span className="text-[15px] font-extrabold text-[#1A1A2E]">
                    {item.discountedPrice.toLocaleString()}원
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5">{item.date}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                <button
                  onClick={() => setCouponItem(item)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-[#72C2FF] bg-white text-sm font-semibold text-[#72C2FF] hover:bg-[#72C2FF]/5 transition-colors"
                >
                  <span>🎟️</span> 쿠폰확인
                </button>
                <button
                  onClick={() => setReceiptItem(item)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <span>🧾</span> 영수증
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {couponItem && <CouponConfirmPopup item={couponItem} onClose={() => setCouponItem(null)} />}
      {receiptItem && <ReceiptPopup item={receiptItem} onClose={() => setReceiptItem(null)} />}
    </div>
  );
}
