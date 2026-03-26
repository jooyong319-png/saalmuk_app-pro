// @ts-nocheck
import type { MarketItem } from "../types";

interface Props {
  item: MarketItem;
  onItemClick: (item: MarketItem) => void;
}

export default function MarketCard({ item, onItemClick }: Props) {
  return (
    <div
      onClick={() => onItemClick(item)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex gap-3">
        {/* 이미지 */}
        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">🎁</span>
          )}
        </div>

        {/* 내용 */}
        <div className="flex-1 min-w-0">
          {/* Row 1: 브랜드 + 상품명 */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#72C2FF] bg-sky-50 px-1.5 py-0.5 rounded font-medium flex-shrink-0">
              {item.brand}
            </span>
            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
          </div>

          {/* Row 2: 가격 + D-day */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-gray-900">
                {item.price.toLocaleString()}원
              </span>
              <span className="text-sm text-gray-400 line-through">
                {item.originalPrice.toLocaleString()}원
              </span>
              <span className="text-sm text-red-500 font-medium">
                {item.discount}%
              </span>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">
              D-{item.dday}
            </span>
          </div>

          {/* Row 3: 평점/거래/판매자 + 시간 */}
          <div className="flex items-center justify-between mt-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span>⭐ {item.rating}</span>
              <span>거래 {item.trades}회</span>
              <span className="text-gray-400">{item.seller}</span>
            </div>
            <span className="flex-shrink-0">
              {item.createdAt || "1시간 전"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
