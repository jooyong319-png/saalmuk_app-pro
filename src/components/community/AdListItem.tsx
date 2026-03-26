interface AdListItemProps {
  ad: {
    id: string;
    thumbnail: string;
    name: string;
    description: string;
    link?: string;
  };
  index?: number;
}

export default function AdListItem({ ad, index = 0 }: AdListItemProps) {
  const handleClick = () => {
    if (ad.link) {
      window.open(ad.link, "_blank");
    }
  };

  return (
    <div
      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm active:bg-gray-50 transition-all animate-fadeUp cursor-pointer"
      style={{ animationDelay: `${index * 30}ms` }}
      onClick={handleClick}
    >
      {/* 썸네일 */}
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <img
          src={ad.thumbnail}
          alt={ad.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 min-w-0">
        {/* 첫째 줄: 이름 + PROMOTED + 더보기 */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[14px] font-semibold text-gray-700">{ad.name}</span>
          <span className="text-[11px] text-[#72C2FF] font-semibold">PROMOTED</span>
          <button
            className="ml-auto px-3 py-1 border border-gray-300 text-gray-600 text-[12px] font-medium rounded-full active:bg-gray-100 transition-colors shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            더 보기
          </button>
        </div>

        {/* 둘째 줄: 설명 */}
        <p className="text-[14px] text-[#72C2FF] leading-snug line-clamp-2">
          {ad.description}
        </p>
      </div>
    </div>
  );
}
