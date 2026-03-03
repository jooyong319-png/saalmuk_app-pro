import type { GalleryItemData } from "./types";

interface GalleryCardProps {
  item: GalleryItemData;
  isFollowed?: boolean;
  onToggleFollow?: () => void;
  onClick?: () => void;
}

export default function GalleryCard({
  item,
  isFollowed = false,
  onToggleFollow,
  onClick,
}: GalleryCardProps) {
  return (
    <div
      className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl active:bg-gray-50 transition-all"
      onClick={onClick}
    >
      {/* 아이콘 */}
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${item.color}`}
      >
        {item.icon}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-gray-900 truncate">
          {item.name}
        </p>
        <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.desc}</p>
      </div>

      {/* 팔로우 버튼 */}
      <button
        className={`px-3 py-1.5 text-[11px] font-bold rounded-lg shrink-0 transition-colors ${
          isFollowed
            ? "text-gray-500 bg-gray-100"
            : "text-[#72C2FF] bg-[#E8F4FD]"
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

// ===== 컴팩트 버전 (그리드용) =====
interface GalleryCardCompactProps {
  item: GalleryItemData;
  onClick?: () => void;
}

export function GalleryCardCompact({ item, onClick }: GalleryCardCompactProps) {
  return (
    <div
      className="flex flex-col items-center p-3 bg-white border border-gray-100 rounded-xl active:bg-gray-50 transition-all"
      onClick={onClick}
    >
      {/* 아이콘 */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-2 ${item.color}`}
      >
        {item.icon}
      </div>

      {/* 이름 */}
      <p className="text-[12px] font-semibold text-gray-900 text-center line-clamp-1">
        {item.name}
      </p>
    </div>
  );
}
