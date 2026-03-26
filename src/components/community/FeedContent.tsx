import { useState } from "react";
import HotContent from "./HotContent";
import FollowingContent from "./FollowingContent";
import NewsContent from "./NewsContent";
import ProfilePopup from "../ProfilePopup";

// ===== 애니메이션 스타일 =====
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeUp { animation: fadeUp 0.4s ease-out both; }
`;

// 내 프로필 데이터
const myProfile = {
  author: "쌀먹러",
  avatar: "https://i.pravatar.cc/100?img=12",
  badges: ["🎮", "🏅", "💎"],
};

interface FeedContentProps {
  setCurrentPage: (page: string) => void;
}

export default function FeedContent({ setCurrentPage }: FeedContentProps) {
  const [activeSubTab, setActiveSubTab] = useState("지금핫한");
  const [showMyProfile, setShowMyProfile] = useState(false);

  const subTabs = ["지금핫한", "팔로잉", "뉴스"];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <style>{animationStyles}</style>

      {/* 서브탭 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 px-4 py-3">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                activeSubTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-500 active:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}

          {/* 오른쪽 여백 */}
          <div className="flex-1" />

          {/* 프로필 버튼 */}
          <button
            className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-sm"
            onClick={() => setShowMyProfile(true)}
          >
            <span className="text-white text-sm">😊</span>
          </button>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto">
        {activeSubTab === "지금핫한" && (
          <HotContent setCurrentPage={setCurrentPage} />
        )}
        {activeSubTab === "팔로잉" && (
          <FollowingContent setCurrentPage={setCurrentPage} />
        )}
        {activeSubTab === "뉴스" && (
          <NewsContent setCurrentPage={setCurrentPage} />
        )}
      </div>

      {/* 내 프로필 팝업 */}
      {showMyProfile && (
        <ProfilePopup
          profile={myProfile}
          onClose={() => setShowMyProfile(false)}
        />
      )}
    </div>
  );
}
