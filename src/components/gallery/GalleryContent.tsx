import { useState } from "react";
import type { GalleryItemData } from "./types";
import { galleryTabs, galleryCategories } from "./galleryData";
import GalleryCard, { GalleryCardCompact } from "./GalleryCard";
import { ToastProvider, useToast } from "../community/Toast";

// ===== 애니메이션 스타일 =====
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeUp { animation: fadeUp 0.4s ease-out both; }
`;

// ===== Props =====
interface GalleryContentProps {
  onSelectGallery?: (gallery: GalleryItemData) => void;
  onNavigateToHot?: () => void;
}

// ===== 메인 컨텐츠 =====
function GalleryContentInner({
  onSelectGallery,
  onNavigateToHot,
}: GalleryContentProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("주요채널");
  const [followedGalleries, setFollowedGalleries] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleFollow = (id: number, name: string) => {
    const isFollowing = followedGalleries.includes(id);
    setFollowedGalleries((prev) =>
      isFollowing ? prev.filter((gid) => gid !== id) : [...prev, id],
    );
    showToast(
      isFollowing
        ? `${name} 팔로우를 취소했어요`
        : `${name}의 새 글이 올라오면 알려드릴게요`,
    );
  };

  const toggleCategory = (catIdx: number) => {
    setExpandedCategories((prev) =>
      prev.includes(catIdx)
        ? prev.filter((i) => i !== catIdx)
        : [...prev, catIdx],
    );
  };

  const handleItemClick = (item: GalleryItemData) => {
    if (item.name === "지금 핫한" && onNavigateToHot) {
      onNavigateToHot();
    } else {
      onSelectGallery?.(item);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <style>{animationStyles}</style>

      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white px-4 pt-3 pb-2 border-b border-gray-100">
        {/* 탭 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

          {/* 보기 전환 */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : "text-gray-400"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-400"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리별 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {galleryCategories.map((category, catIdx) => (
          <div
            key={catIdx}
            className="mb-6 animate-fadeUp"
            style={{ animationDelay: `${catIdx * 80}ms` }}
          >
            {/* 카테고리 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[15px] font-bold text-gray-900">
                {category.title}
              </h3>
              <span className="text-[12px] text-gray-400">
                {category.items.length}개
              </span>
            </div>

            {/* 아이템 목록 */}
            {viewMode === "list" ? (
              // 리스트형
              <div className="flex flex-col gap-2">
                {(expandedCategories.includes(catIdx)
                  ? category.items
                  : category.items.slice(0, 4)
                ).map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fadeUp"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <GalleryCard
                      item={item}
                      isFollowed={followedGalleries.includes(item.id)}
                      onToggleFollow={() => toggleFollow(item.id, item.name)}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // 그리드형
              <div className="grid grid-cols-4 gap-2">
                {(expandedCategories.includes(catIdx)
                  ? category.items
                  : category.items.slice(0, 8)
                ).map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fadeUp"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <GalleryCardCompact
                      item={item}
                      onClick={() => handleItemClick(item)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 더보기 / 접기 */}
            {category.items.length > (viewMode === "list" ? 4 : 8) && (
              <button
                onClick={() => toggleCategory(catIdx)}
                className="w-full mt-3 py-2.5 text-[13px] text-gray-400 font-medium bg-white border border-gray-100 rounded-xl active:bg-gray-50 transition-colors"
              >
                {expandedCategories.includes(catIdx)
                  ? "접기 ↑"
                  : `더보기 (${category.items.length - (viewMode === "list" ? 4 : 8)}개) ↓`}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Export =====
export default function GalleryContent(props: GalleryContentProps) {
  return (
    <ToastProvider>
      <GalleryContentInner {...props} />
    </ToastProvider>
  );
}
