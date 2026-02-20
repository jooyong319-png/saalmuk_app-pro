import { useState } from "react";

export default function FAQ({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = ["전체", "계정", "포인트", "이벤트", "거래", "기타"];

  const faqData = [
    {
      id: 1,
      category: "계정",
      question: "회원가입은 어떻게 하나요?",
      answer:
        "앱 첫 화면에서 '가입하기'를 누르고, SNS 계정(네이버, 카카오, 구글)으로 간편하게 가입할 수 있습니다. 이후 약관 동의, 닉네임 설정, 관심 게임 선택을 완료하면 가입이 완료됩니다.",
    },
    {
      id: 2,
      category: "계정",
      question: "비밀번호를 잊어버렸어요.",
      answer:
        "로그인 화면에서 '로그인하는 데 도움이 필요하신가요?'를 클릭한 후, '비밀번호 재설정'을 선택하세요. 가입 시 등록한 전화번호 또는 이메일로 인증 후 새 비밀번호를 설정할 수 있습니다.",
    },
    {
      id: 3,
      category: "계정",
      question: "회원 탈퇴는 어떻게 하나요?",
      answer:
        "마이페이지 > 설정 > 계정 관리 > 회원 탈퇴에서 진행할 수 있습니다. 탈퇴 시 보유한 포인트와 쿠폰은 모두 소멸되며, 복구가 불가능합니다.",
    },
    {
      id: 4,
      category: "포인트",
      question: "포인트는 어떻게 적립하나요?",
      answer:
        "게임 플레이, 출석 체크, 이벤트 참여, 커뮤니티 활동 등 다양한 방법으로 포인트를 적립할 수 있습니다. 적립된 포인트는 마이페이지에서 확인할 수 있습니다.",
    },
    {
      id: 5,
      category: "포인트",
      question: "포인트 유효기간이 있나요?",
      answer:
        "포인트는 적립일로부터 1년간 유효합니다. 유효기간이 만료된 포인트는 자동으로 소멸되며, 소멸 예정 포인트는 마이페이지에서 확인할 수 있습니다.",
    },
    {
      id: 6,
      category: "포인트",
      question: "포인트로 무엇을 할 수 있나요?",
      answer:
        "적립한 포인트는 기프티콘 교환, 게임 아이템 구매, 쿠폰 구매 등에 사용할 수 있습니다. 포인트샵에서 다양한 상품을 확인해보세요.",
    },
    {
      id: 7,
      category: "이벤트",
      question: "이벤트 참여 방법을 알려주세요.",
      answer:
        "홈 화면 또는 이벤트 탭에서 진행 중인 이벤트를 확인할 수 있습니다. 각 이벤트 상세 페이지에서 참여 조건과 방법을 확인 후 참여하시면 됩니다.",
    },
    {
      id: 8,
      category: "이벤트",
      question: "이벤트 당첨 결과는 어디서 확인하나요?",
      answer:
        "마이페이지 > 내 응모함에서 참여한 이벤트의 당첨 결과를 확인할 수 있습니다. 당첨 시 앱 푸시 알림과 함께 안내됩니다.",
    },
    {
      id: 9,
      category: "거래",
      question: "쿠폰 거래는 어떻게 하나요?",
      answer:
        "거래소 탭에서 판매 중인 쿠폰을 구매하거나, 내가 보유한 쿠폰을 판매할 수 있습니다. 거래 시 수수료가 발생할 수 있으며, 상세 내용은 거래소 이용약관을 참고해주세요.",
    },
    {
      id: 10,
      category: "거래",
      question: "거래 중 문제가 발생했어요.",
      answer:
        "거래 관련 문제는 고객센터 > 1:1 문의를 통해 접수해주세요. 거래 내역과 함께 문제 상황을 상세히 작성해주시면 빠르게 도움드리겠습니다.",
    },
    {
      id: 11,
      category: "기타",
      question: "앱 알림이 오지 않아요.",
      answer:
        "기기 설정 > 알림에서 쌀먹닷컴 앱의 알림이 허용되어 있는지 확인해주세요. 앱 내 설정 > 알림 설정에서도 알림 수신 여부를 설정할 수 있습니다.",
    },
    {
      id: 12,
      category: "기타",
      question: "문의는 어디로 하면 되나요?",
      answer:
        "마이페이지 > 고객센터 > 1:1 문의를 통해 문의하실 수 있습니다. 운영 시간은 평일 10:00~18:00이며, 순차적으로 답변드립니다.",
    },
  ];

  const filteredFAQ =
    activeCategory === "전체"
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  const toggleItem = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button onClick={() => setCurrentPage("home")}>
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
        <span className="text-lg font-bold">자주 묻는 질문</span>
        <div className="w-6"></div>
      </div>

      {/* 검색 */}
      <div className="px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="궁금한 내용을 검색해보세요"
            className="w-full px-4 py-3 pl-10 bg-gray-100 rounded-xl outline-none focus:bg-gray-50 focus:ring-2 focus:ring-[#72C2FF]"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
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
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ 리스트 */}
      <div className="px-4 pb-20">
        {filteredFAQ.map((item) => (
          <div key={item.id} className="border-b border-gray-100">
            {/* 질문 */}
            <button
              className="w-full flex items-center justify-between py-4 text-left"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-start gap-3 flex-1">
                <span className="text-[#72C2FF] font-bold">Q</span>
                <span className="text-gray-900 font-medium pr-4">
                  {item.question}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openItems.includes(item.id) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* 답변 */}
            {openItems.includes(item.id) && (
              <div className="pb-4 pl-7">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-bold">A</span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 하단 문의 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button
          className="w-full py-4 rounded-full text-white font-bold"
          style={{ backgroundColor: "#72C2FF" }}
          onClick={() => setCurrentPage("inquiry")}
        >
          1:1 문의하기
        </button>
      </div>
    </div>
  );
}
