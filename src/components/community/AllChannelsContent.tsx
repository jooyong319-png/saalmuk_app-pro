import { useState } from "react";
import type { GalleryItemData } from "../gallery/types";
import { useToast } from "./Toast";
import { galleryTabs, galleryCategories } from "../gallery/galleryData";
import GalleryCard, { GalleryCardCompact } from "../gallery/GalleryCard";

interface AllChannelsContentProps {
  setCurrentPage: (page: string) => void;
}

export default function AllChannelsContent({ setCurrentPage }: AllChannelsContentProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("주요채널");
  const [followedGalleries, setFollowedGalleries] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFollow = (id: number, name: string) => {
    const isFollowing = followedGalleries.includes(id);
    setFollowedGalleries((prev) =>
      isFollowing ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
    showToast(
      isFollowing
        ? `${name} 팔로우를 취소했어요`
        : `${name}의 새 글이 올라오면 알려드릴게요`
    );
  };

  const toggleCategory = (catIdx: number) => {
    setExpandedCategories((prev) =>
      prev.includes(catIdx) ? prev.filter((i) => i !== catIdx) : [...prev, catIdx]
    );
  };

  const handleItemClick = (item: GalleryItemData) => {
    if (item.name === "지금 핫한") {
      setCurrentPage("hot");
    } else {
      setCurrentPage("channelDetail");
    }
  };

  // 검색 필터링
  const filteredCategories = galleryCategories.map((cat) => ({
    ...cat,
    items: searchQuery
      ? cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : cat.items,
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="flex flex-col h-full bg-gray-50">
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

        {/* 검색바 */}
        <div className="mt-3 relative">
          <input
            type="text"
            placeholder="갤러리 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 rounded-xl px-4 py-2.5 pl-10 text-[14px] outline-none focus:ring-2 focus:ring-[#72C2FF]/30"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 카테고리별 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">검색 결과가 없어요</p>
            <p className="text-[14px] text-gray-400">다른 키워드로 검색해보세요</p>
          </div>
        ) : (
          filteredCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="mb-6 animate-fadeUp"
              style={{ animationDelay: `${catIdx * 80}ms` }}
            >
              {/* 카테고리 헤더 */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-bold text-gray-900">{category.title}</h3>
                <span className="text-[12px] text-gray-400">{category.items.length}개</span>
              </div>

              {/* 아이템 목록 */}
              {viewMode === "list" ? (
                <div className="flex flex-col gap-2">
                  {(expandedCategories.includes(catIdx)
                    ? category.items
                    : category.items.slice(0, 4)
                  ).map((item, index) => (
                    <div key={item.id} className="animate-fadeUp" style={{ animationDelay: `${index * 40}ms` }}>
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
                <div className="grid grid-cols-4 gap-2">
                  {(expandedCategories.includes(catIdx)
                    ? category.items
                    : category.items.slice(0, 8)
                  ).map((item, index) => (
                    <div key={item.id} className="animate-fadeUp" style={{ animationDelay: `${index * 30}ms` }}>
                      <GalleryCardCompact item={item} onClick={() => handleItemClick(item)} />
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
          ))
        )}
      </div>
    </div>
  );
}
