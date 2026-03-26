// @ts-nocheck
import PostCard from "../cards/PostCard";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function CommunityTab({ ctx }: Props) {
  const { posts, communityTab, setCommunityTab } = ctx;

  return (
    <>
      <div className="bg-white px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["전체", "꿀팁", "후기", "질문", "정보", "잡담"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setCommunityTab(tab)}
              className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                communityTab === tab || (i === 0 && communityTab === "all")
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={
                communityTab === tab || (i === 0 && communityTab === "all")
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
        <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl p-4 text-white mb-3">
          <p className="text-xs opacity-80 mb-1">🔥 인기 글</p>
          <p className="font-bold">이번 주 마감 이벤트 총정리!</p>
          <p className="text-sm opacity-90">by 정보통 · 좋아요 1,523</p>
        </div>
      </div>
      <div className="px-4 pb-24 space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
