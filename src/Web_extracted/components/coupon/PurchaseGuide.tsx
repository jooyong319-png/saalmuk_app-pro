// @ts-nocheck
export default function PurchaseGuide() {
  const methods = [
    {
      icon: (
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      iconBg: "bg-yellow-50",
      type: "UID 방식",
      summary: "게임 UID 입력 → 우편함 직접 지급",
      desc: "서버와 UID를 입력하면 게임 내 우편함으로 직접 지급됩니다.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      iconBg: "bg-blue-50",
      type: "PIN 방식",
      summary: "코드 발급 → 게임 내 직접 등록",
      desc: "구매 후 PIN 코드가 발급되며, 게임 내 교환소에서 직접 등록합니다.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-[15px] font-bold text-[#1A1A2E] mb-4">구매방법 안내</p>
      <div className="flex flex-col gap-4">
        {methods.map((m) => (
          <div key={m.type} className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${m.iconBg} flex items-center justify-center flex-shrink-0`}>
              {m.icon}
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#1A1A2E]">{m.type}</p>
              <p className="text-[13px] text-gray-500 mt-0.5">{m.summary}</p>
              <p className="text-[12px] text-[#72C2FF] mt-1 leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
