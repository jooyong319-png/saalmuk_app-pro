// @ts-nocheck
import { useState, useEffect } from "react";

const bannerSlides = [
  {
    bg: "linear-gradient(135deg, #4AABF5, #72C2FF)",
    badge: "추천 이벤트",
    title: "친구 초대하면\n1,000P 적립",
    icon: "🎁",
  },
  {
    bg: "linear-gradient(135deg, #FF6B9D, #FF8C42)",
    badge: "신규 이벤트",
    title: "첫 쿠폰 등록하면\n500P 지급",
    icon: "🎟️",
  },
  {
    bg: "linear-gradient(135deg, #7C3AED, #4AABF5)",
    badge: "한정 이벤트",
    title: "주간 쿠폰왕\n특별 보상",
    icon: "🏆",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % bannerSlides.length),
      3500,
    );
    return () => clearInterval(timer);
  }, []);

  const slide = bannerSlides[current];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden flex items-center justify-between px-8"
      style={{ background: slide.bg, height: "120px" }}
    >
      <div>
        <span className="inline-block bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-2">
          {slide.badge}
        </span>
        <p className="text-white font-extrabold text-[20px] leading-tight whitespace-pre-line">
          {slide.title}
        </p>
      </div>
      <span className="text-5xl">{slide.icon}</span>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
