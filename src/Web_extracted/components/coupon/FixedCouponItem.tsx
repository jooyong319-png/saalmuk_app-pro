// @ts-nocheck
import type { Coupon } from "./types";

interface Props {
  coupon: Coupon;
  onClick: () => void;
}

export default function FixedCouponItem({ coupon, onClick }: Props) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <div className="w-[72px] h-[72px] rounded-xl overflow-hidden border border-gray-100">
          <img
            src={coupon.image}
            alt={coupon.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow">
          {coupon.codes.length}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#1A1A2E] text-[15px] truncate">
          {coupon.name}
        </h3>
        <p className="text-sm text-gray-400 mt-0.5">{coupon.description}</p>
      </div>
      <span className="flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
        {coupon.genre}
      </span>
    </div>
  );
}
