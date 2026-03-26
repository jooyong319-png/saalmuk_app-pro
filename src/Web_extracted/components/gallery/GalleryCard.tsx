import type { GalleryItemData } from "./types";

// ─── 갤러리 카드 ───

interface GalleryCardProps {
  item: GalleryItemData;
  isFollowed?: boolean;
  onToggleFollow?: () => void;
}

export default function GalleryCard({
  item,
  isFollowed = false,
  onToggleFollow,
}: GalleryCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer transition-all hover:border-[#72C2FF] hover:shadow-md group">
      {/* 아이콘 */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${item.color}`}
      >
        {item.icon}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-[#1A1A2E] truncate">
          {item.name}
        </p>
        <p className="text-[12px] text-gray-400 truncate mt-0.5">{item.desc}</p>
      </div>

      {/* 팔로우 버튼 */}
      <button
        className={`px-4 py-1.5 text-[12px] font-bold rounded-lg shrink-0 transition-colors ${
          isFollowed
            ? "text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200"
            : "text-[#72C2FF] bg-[#E8F4FD] border border-[#72C2FF] hover:bg-[#D0EBFF]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFollow?.();
        }}
      >
        {isFollowed ? "팔로잉" : "팔로우"}
      </button>
    </div>
  );
}
