import { useState } from "react";

export default function Inquiry({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("서비스 문의");
  const [category, setCategory] = useState("캐시프렌즈(쇼핑하기)");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [content, setContent] =
    useState(`아래 내용을 입력해주시면 보다 원활한 상담이 가능합니다.

- 구매한 상품명 :
- 상품 구매 일시 :
- 문의 사항 :`);
  const inquiryHistory = [
    {
      id: 1,
      category: "캐시프렌즈(쇼핑하기)",
      title: "상품 배송 문의드립니다",
      date: "2025-01-15",
      status: "답변완료",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100">
        <button onClick={() => setCurrentPage("life")} className="mr-4">
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
        <span className="text-lg font-bold text-gray-900">문의하기</span>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-4 text-sm font-medium ${
            activeTab === "서비스 문의"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("서비스 문의")}
        >
          서비스 문의
        </button>
        <button
          className={`flex-1 py-4 text-sm font-medium ${
            activeTab === "내 문의내역"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("내 문의내역")}
        >
          내 문의내역
        </button>
      </div>

      {activeTab === "서비스 문의" ? (
        <div className="p-4">
          {/* 안내 문구 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-bold text-gray-900 mb-1">꼭 확인해주세요!</p>
            <p className="text-sm text-gray-600">
              문의량이 증가할 경우, 답변이 다소 지연될 수 있습니다. 순차적으로
              확인 후 답변 드릴 예정이니 조금만 기다려 주시길 부탁드립니다.
            </p>
          </div>

          {/* 문의 분류 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              문의 분류 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg appearance-none bg-white text-gray-700"
              >
                <option>캐시프렌즈(쇼핑하기)</option>
                <option>바로쌀먹</option>
                <option>포인트</option>
                <option>기타</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                ∨
              </span>
            </div>
          </div>

          {/* 답변 받을 이메일 주소 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              답변 받을 이메일 주소 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg text-gray-700"
            />
          </div>

          {/* 휴대폰 번호 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="휴대폰 번호를 입력해주세요."
              className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* 주문번호 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              주문번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="주문번호를 입력해주세요."
              className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400"
            />
            <p className="text-xs text-gray-400 mt-2">
              카카오톡 우하단 더보기 &gt; 톡딜 &gt; 좌상단 메뉴 &gt; 닉네임 &gt;
              주문 배송 &gt; 상세보기에서 확인해주세요.
            </p>
          </div>

          {/* 문의 내용 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              문의 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-lg text-gray-700 h-40 resize-none"
            />
            <p className="text-right text-sm text-gray-400 mt-1">
              <span className="font-bold text-gray-700">{content.length}</span>{" "}
              / 3000
            </p>
          </div>

          {/* 파일 첨부 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              파일 첨부
            </label>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="text-gray-700">첨부 파일 추가</span>
              <button className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg">
                추가
              </button>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>첨부파일은 최대 5개, 30MB까지 등록 가능합니다.</span>
              <span>
                <span className="font-bold text-gray-700">0MB</span> / 30MB
              </span>
            </div>
          </div>

          {/* 문의 접수 버튼 */}
          <button
            className="w-full py-4 text-white rounded-xl text-center font-medium"
            style={{ backgroundColor: "#72C2FF" }}
          >
            문의 접수
          </button>
        </div>
      ) : (
        <div className="p-4">
          {inquiryHistory.length > 0 ? (
            inquiryHistory.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 mb-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{item.category}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.status === "답변완료"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400 mt-2">{item.date}</p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-gray-500">
                최근 1년간 문의하신 내역이 없습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
