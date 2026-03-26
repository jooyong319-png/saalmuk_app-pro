// @ts-nocheck
import type { Coupon } from "./types";

interface Props {
  coupon: Coupon;
  onClick: () => void;
}

export default function DiscountCouponCard({ coupon, onClick }: Props) {
  const maxDiscount = Math.max(
    ...(coupon.discountItems?.map((d) => d.discount) ?? [0]),
  );
  const types = [...new Set(coupon.discountItems?.map((d) => d.type) ?? [])];

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
          {maxDiscount}%
        </div>
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {types.map((t) => (
            <span
              key={t}
              className={`text-[9px] font-bold px-1 py-0.5 rounded ${t === "UID" ? "bg-blue-500 text-white" : "bg-orange-400 text-white"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="aspect-square w-full relative bg-gray-100">
          <img
            src={coupon.image}
            alt={coupon.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/60 py-1 text-center">
            <span className="text-white text-[10px] font-semibold tracking-wide">
              {coupon.description}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-1.5 text-[13px] font-medium text-[#1A1A2E] text-center truncate px-1">
        {coupon.name}
      </p>
    </div>
  );
}
