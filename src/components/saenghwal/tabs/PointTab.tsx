// @ts-nocheck
import { useState } from "react";
import PointCard from "../cards/PointCard";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function PointTab({ ctx }: Props) {
  const { pointSources, setShowPointDetail } = ctx;
  const [subTab, setSubTab] = useState("전체");
  const [sortType, setSortType] = useState("latest");

  return (
    <>
      {/* 서브탭 */}
      <div className="bg-white px-4 py-3">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {["전체", "포인트", "쿠폰", "기타"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                subTab === tab
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={
                subTab === tab
                  ? { background: "#72C2FF" }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-[#5AB0F0] to-[#72C2FF] rounded-2xl p-4 text-white mb-4">
          <p className="text-xs opacity-80 mb-1">💎 오늘 적립 가능한 포인트</p>
          <p className="font-bold text-lg">최대 1,500P</p>
          <p className="text-sm opacity-90">매일 참여하고 포인트 모으세요!</p>
        </div>
      </div>

      {/* 정렬 바 */}
      <div className="bg-white px-4 py-2 border-y border-gray-100">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSortType(sortType === "latest" ? "popular" : "latest")}
            className="flex items-center gap-1 text-xs font-medium text-gray-700"
          >
            {sortType === "latest" ? "최신순" : "인기순"}
            <span className="text-gray-400">↕</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-24 pt-3 space-y-3">
        {pointSources.map((source) => (
          <PointCard key={source.id} source={source} onPointClick={setShowPointDetail} />
        ))}
      </div>
    </>
  );
}
