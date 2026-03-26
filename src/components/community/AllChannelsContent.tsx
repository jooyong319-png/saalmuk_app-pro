import { useState } from "react";
import type { GalleryItemData } from "./galleryData";
import {
  galleryTabs,
  galleryCategories,
  getGalleryIdByName,
} from "./galleryData";

interface AllChannelsContentProps {
  setCurrentPage: (page: string) => void;
}

// 서브탭 정의
const subTabs = ["전체", "모바일게임", "PC게임", "P2E 게임"];

// 서브탭과 카테고리 title 매핑
const subTabCategoryMap: Record<string, string> = {
  모바일게임: "모바일 게임",
  PC게임: "PC 게임",
  "P2E 게임": "P2E 게임",
};

export default function AllChannelsContent({
  setCurrentPage,
}: AllChannelsContentProps) {
  const [activeTab, setActiveTab] = useState("주요채널");
  const [activeSubTab, setActiveSubTab] = useState("전체");

  // viewMode 제거됨 - 2열 고정
  // followedGalleries 제거됨 - 팔로우 버튼 없음
  // expandedCategories 제거됨 - 더보기 버튼 없음

  const handleItemClick = (item: GalleryItemData) => {
    // 지금 핫한 → 피드의 "지금 핫한" 탭
    if (item.name === "지금 핫한") {
      setCurrentPage("nav-hot");
      return;
    }

    // 사전예약, 신서버 → 게임 이벤트 페이지
    if (item.name === "사전예약, 신서버") {
      setCurrentPage("preorder");
      return;
    }

    // galleryData에서 이름으로 ID 찾기
    const galleryId = getGalleryIdByName(item.name);
    if (galleryId) {
      setCurrentPage(`gallery-${galleryId}`);
    } else {
      // fallback - 메이플로
      setCurrentPage("gallery-maplestory");
    }
  };

  // 서브탭에 따라 카테고리 필터링
  const filteredCategories =
    activeSubTab === "전체"
      ? galleryCategories
      : galleryCategories.filter(
          (cat) => cat.title === subTabCategoryMap[activeSubTab],
        );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        {/* 메인 탭 */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 active:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 서브탭 */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap transition-all ${
                activeSubTab === tab
                  ? "bg-[#72C2FF] text-white"
                  : "bg-gray-100 text-gray-500 active:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 카테고리별 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredCategories.map((category, catIdx) => (
          <div
            key={catIdx}
            className="mb-6 animate-fadeUp"
            style={{ animationDelay: `${catIdx * 80}ms` }}
          >
            {/* 카테고리 헤더 - 개수 제거 */}
            <div className="flex items-center mb-3">
              <h3 className="text-[15px] font-bold text-gray-900">
                {category.title}
              </h3>
            </div>

            {/* 아이템 목록 - 2열 그리드 */}
            <div className="grid grid-cols-2 gap-2">
              {(activeTab === "주요채널"
                ? category.items.slice(0, 4) // 주요채널: 4개만 표시
                : category.items
              ) // 일반채널: 전체 표시
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fadeUp"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <GalleryCard2Col
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
            </div>

            {/* 더보기 버튼 제거됨 */}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== 2열용 갤러리 카드 (팔로우 버튼 없음) =====
interface GalleryCard2ColProps {
  item: GalleryItemData;
  onClick?: () => void;
}

function GalleryCard2Col({ item, onClick }: GalleryCard2ColProps) {
  return (
    <div
      className="flex items-center gap-2.5 p-3 bg-white border border-gray-100 rounded-xl active:bg-gray-50 transition-all"
      onClick={onClick}
    >
      {/* 아이콘 */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${item.color}`}
      >
        {item.icon}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-gray-900 truncate">
          {item.name}
        </p>
        <p className="text-[10px] text-gray-400 truncate mt-0.5">{item.desc}</p>
      </div>
    </div>
  );
}
