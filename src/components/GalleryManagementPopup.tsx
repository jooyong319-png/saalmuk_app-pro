import { useState } from "react";

interface ManagementRecord {
  id: number;
  nickname: string;
  type: "댓글" | "게시글";
  content: string;
  reason: string;
  duration: string;
  processedAt: string;
  processor: string;
}

interface GalleryManagementPopupProps {
  galleryName: string;
  manager: string;
  subManagers: string[];
  onClose: () => void;
}

// 더미 데이터
const dummyBlockRecords: ManagementRecord[] = [
  {
    id: 1291,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "니애미정녀요 ㅂㅅ아 ㅋㅋ",
    reason: "신문고 욕설",
    duration: "31일",
    processedAt: "2026.02.25",
    processor: "soft3518",
  },
  {
    id: 1290,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "죽어",
    reason: "도배",
    duration: "31일",
    processedAt: "2026.02.25",
    processor: "hang2563",
  },
  {
    id: 1289,
    nickname: "ㅇㅇ",
    type: "게시글",
    content: "https://m.dcinside.com/mini...",
    reason: "신문고 허위남용",
    duration: "6시간",
    processedAt: "2026.02.25",
    processor: "truly8574",
  },
  {
    id: 1288,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "ㄴㄱㅁ",
    reason: "신문고욕설",
    duration: "31일",
    processedAt: "2026.02.25",
    processor: "soft3518",
  },
  {
    id: 1287,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "디시콘",
    reason: "신문고 장난",
    duration: "1일",
    processedAt: "2026.02.25",
    processor: "knbn43lmv",
  },
  {
    id: 1286,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "ㅌㄹㄱㄹㅁㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    reason: "도배",
    duration: "31일",
    processedAt: "2026.02.25",
    processor: "truly8574",
  },
];

const dummyDeleteRecords: ManagementRecord[] = [
  {
    id: 501,
    nickname: "ㅇㅇ",
    type: "게시글",
    content: "광고글입니다",
    reason: "광고",
    duration: "-",
    processedAt: "2026.02.25",
    processor: "soft3518",
  },
  {
    id: 500,
    nickname: "ㅇㅇ",
    type: "댓글",
    content: "스팸 댓글",
    reason: "스팸",
    duration: "-",
    processedAt: "2026.02.24",
    processor: "hang2563",
  },
  {
    id: 499,
    nickname: "ㅇㅇ",
    type: "게시글",
    content: "부적절한 내용",
    reason: "불건전",
    duration: "-",
    processedAt: "2026.02.24",
    processor: "truly8574",
  },
];

export default function GalleryManagementPopup({
  galleryName,
  manager,
  subManagers,
  onClose,
}: GalleryManagementPopupProps) {
  const [activeTab, setActiveTab] = useState<"block" | "delete">("block");

  const records =
    activeTab === "block" ? dummyBlockRecords : dummyDeleteRecords;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white max-w-md mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#72C2FF] text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 active:bg-white/30 transition-colors"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-[16px] font-bold">{galleryName} 관리 내역</h2>
        </div>
      </div>

      {/* 매니저 / 부매니저 정보 */}
      <div className="px-4 py-4 bg-[#E8F4FC]">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[14px] font-bold text-gray-800">매니저</span>
          <svg
            className="w-4 h-4 text-orange-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[14px] text-gray-700">{manager}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-[14px] font-bold text-gray-800 shrink-0">
            부매니저
          </span>
          <span className="text-[14px] text-gray-700">
            {subManagers.join(", ")}
          </span>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("block")}
            className={`text-[14px] font-semibold transition-colors ${
              activeTab === "block" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            차단 내역
          </button>
          <button
            onClick={() => setActiveTab("delete")}
            className={`text-[14px] font-semibold transition-colors ${
              activeTab === "delete" ? "text-gray-900" : "text-gray-400"
            }`}
          >
            삭제 내역
          </button>
        </div>
        <button className="px-3 py-1.5 text-[12px] font-medium text-[#72C2FF] border border-[#72C2FF] rounded-full active:bg-[#72C2FF] active:text-white transition-colors">
          내 차단 내역
        </button>
      </div>

      {/* 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {records.map((record) => (
          <div
            key={record.id}
            className="px-4 py-3 border-b border-gray-100 active:bg-gray-50"
          >
            {/* 상단: 번호 + 닉네임 + 날짜 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-400">#{record.id}</span>
                <span className="text-[14px] font-medium text-gray-800">
                  {record.nickname}
                </span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded ${
                    record.type === "댓글"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {record.type}
                </span>
              </div>
              <span className="text-[12px] text-gray-400">
                {record.processedAt}
              </span>
            </div>

            {/* 내용 */}
            <p className="text-[13px] text-gray-600 line-clamp-1 mb-2">
              {record.content}
            </p>

            {/* 하단: 사유 + 기간 + 처리자 */}
            <div className="flex items-center gap-3 text-[12px]">
              <span className="text-red-500 font-medium">{record.reason}</span>
              {record.duration !== "-" && (
                <span className="text-gray-500">{record.duration}</span>
              )}
              <span className="text-gray-400 ml-auto">
                처리: {record.processor}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 푸터 안내 */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-[11px] text-gray-400 text-center">
          ※ 최근 30일 내역만 공개됩니다.
        </p>
      </div>
    </div>
  );
}
