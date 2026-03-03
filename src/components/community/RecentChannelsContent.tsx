import { useState } from "react";
import type { GalleryItemData } from "../gallery/types";
import { useToast } from "./Toast";
import GalleryCard from "../gallery/GalleryCard";

// ===== 최근 방문 아이템 타입 =====
interface RecentGalleryItem extends GalleryItemData {
  visitedAt: string;
}

interface RecentChannelsContentProps {
  setCurrentPage: (page: string) => void;
}

export default function RecentChannelsContent({ setCurrentPage }: RecentChannelsContentProps) {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [followedGalleries, setFollowedGalleries] = useState<number[]>([]);
  const [recentItems, setRecentItems] = useState<RecentGalleryItem[]>([
    { id: 202, icon: "🍁", name: "메이플스토리", desc: "메이플 유저들의 커뮤니티", color: "bg-orange-100 text-orange-600", visitedAt: "방금 전" },
    { id: 104, icon: "⚔️", name: "리니지M", desc: "리니지M 정보 공유", color: "bg-gray-100 text-gray-600", visitedAt: "10분 전" },
    { id: 203, icon: "🏰", name: "로스트아크", desc: "로아 공략 및 팁", color: "bg-amber-100 text-amber-600", visitedAt: "30분 전" },
    { id: 1, icon: "🔥", name: "지금 핫한", desc: "실시간 인기 게임 정보", color: "bg-orange-100 text-orange-600", visitedAt: "1시간 전" },
    { id: 106, icon: "🍁", name: "메이플스토리M", desc: "모바일 메이플 커뮤니티", color: "bg-orange-100 text-orange-600", visitedAt: "2시간 전" },
    { id: 3, icon: "💬", name: "쌀먹 라운지", desc: "자유로운 수다 공간", color: "bg-blue-100 text-blue-600", visitedAt: "3시간 전" },
    { id: 205, icon: "👊", name: "던전앤파이터", desc: "던파 유저 모임", color: "bg-blue-100 text-blue-600", visitedAt: "5시간 전" },
    { id: 301, icon: "🌐", name: "디센트럴랜드", desc: "메타버스 P2E", color: "bg-red-100 text-red-600", visitedAt: "어제" },
  ]);

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

  const handleDelete = (id: number) => {
    setRecentItems((prev) => prev.filter((item) => item.id !== id));
    showToast("삭제되었어요");
  };

  const handleClearAll = () => {
    setRecentItems([]);
    showToast("전체 삭제되었어요");
  };

  const handleItemClick = (item: GalleryItemData) => {
    if (item.name === "지금 핫한") {
      setCurrentPage("hot");
    } else {
      setCurrentPage("channelDetail");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white px-4 pt-3 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕐</span>
            <span className="text-[16px] font-bold text-gray-900">최근 방문</span>
            <span className="text-[13px] text-gray-400">{recentItems.length}개</span>
          </div>
          <div className="flex items-center gap-2">
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
            {/* 전체 삭제 */}
            {recentItems.length > 0 && (
              <button className="text-[13px] text-gray-400 px-2" onClick={handleClearAll}>
                전체 삭제
              </button>
            )}
          </div>
        </div>
        <p className="text-[13px] text-gray-400 mt-2">
          자주 방문하는 갤러리는 팔로우 해보세요!
        </p>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {recentItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">🕐</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">최근 방문한 갤러리가 없어요</p>
            <p className="text-[14px] text-gray-400">갤러리를 둘러보고 관심있는 곳에 가입해보세요!</p>
          </div>
        ) : viewMode === "list" ? (
          // 리스트형
          <div className="flex flex-col gap-2">
            {recentItems.map((item, index) => (
              <div
                key={item.id}
                className="relative animate-fadeUp"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <GalleryCard
                  item={item}
                  isFollowed={followedGalleries.includes(item.id)}
                  onToggleFollow={() => toggleFollow(item.id, item.name)}
                  onClick={() => handleItemClick(item)}
                />
                {/* 방문 시간 뱃지 */}
                <span className="absolute top-2 right-16 text-[10px] font-medium text-gray-400 bg-white/90 px-2 py-0.5 rounded-full border border-gray-100">
                  {item.visitedAt}
                </span>
                {/* 삭제 버튼 */}
                <button
                  className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 active:bg-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          // 그리드형
          <div className="grid grid-cols-3 gap-3">
            {recentItems.map((item, index) => (
              <div
                key={item.id}
                className="relative animate-fadeUp"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div
                  className="flex flex-col items-center p-3 bg-white border border-gray-100 rounded-xl active:bg-gray-50 transition-all"
                  onClick={() => handleItemClick(item)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-2 ${item.color}`}>
                    {item.icon}
                  </div>
                  <p className="text-[12px] font-semibold text-gray-900 text-center line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.visitedAt}</p>
                </div>
                {/* 삭제 버튼 */}
                <button
                  className="absolute top-1 right-1 w-5 h-5 bg-gray-200/80 rounded-full flex items-center justify-center text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
