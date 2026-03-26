import { useState } from "react";

interface RankingPageProps {
  goBack: () => void;
  initialTab?: "fame" | "reward";
}

interface RankUser {
  rank: number;
  nickname: string;
  avatar?: string;
  badge?: string;
  value: number;
  reward: number;
}

// 더미 데이터
const fameRankings: RankUser[] = [
  { rank: 1, nickname: "힌고미이", badge: "팔로우 부자", value: 98121, reward: 100000 },
  { rank: 2, nickname: "iouiouip", value: 55121, reward: 50000 },
  { rank: 3, nickname: "awerfasd", avatar: "🐸", value: 25121, reward: 25000 },
  { rank: 4, nickname: "word349", value: 15121, reward: 20000 },
  { rank: 5, nickname: "gfhgjhbm", value: 13121, reward: 15000 },
  { rank: 6, nickname: "tedtedoi", avatar: "🌻", value: 13121, reward: 10000 },
  { rank: 7, nickname: "sddcdcs", avatar: "🌻", value: 13121, reward: 10000 },
  { rank: 8, nickname: "player88", value: 12500, reward: 8000 },
  { rank: 9, nickname: "gamer99", value: 11800, reward: 7000 },
  { rank: 10, nickname: "pro100", value: 10500, reward: 5000 },
];

const rewardRankings: RankUser[] = [
  { rank: 1, nickname: "힌고미이", badge: "팔로우 부자", value: 98121, reward: 100000 },
  { rank: 2, nickname: "iouiouip", value: 55121, reward: 50000 },
  { rank: 3, nickname: "awerfasd", avatar: "🐸", value: 25121, reward: 25000 },
  { rank: 4, nickname: "word349", value: 15121, reward: 20000 },
  { rank: 5, nickname: "gfhgjhbm", value: 13121, reward: 15000 },
  { rank: 6, nickname: "tedtedoi", avatar: "🌻", value: 13121, reward: 10000 },
  { rank: 7, nickname: "sddcdcs", avatar: "🌻", value: 13121, reward: 10000 },
];

// 내 정보
const myInfo = {
  nickname: "쿠놀",
  avatar: "https://picsum.photos/100/100?random=me",
  fame: 121,
  reward: 121,
  point: 0,
};

export default function RankingPage({
  goBack,
  initialTab = "fame",
}: RankingPageProps) {
  const [activeTab, setActiveTab] = useState<"fame" | "reward">(initialTab);

  const rankings = activeTab === "fame" ? fameRankings : rewardRankings;
  const currentMonth = new Date().getMonth() + 1;

  // 순위 메달/숫자 렌더링
  const renderRank = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-2xl">🥇</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-2xl">🥈</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-2xl">🥉</span>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <span className="text-[16px] font-bold text-gray-500">{rank}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white max-w-md mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={goBack}
          className="w-8 h-8 flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">랭킹</h1>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab("fame")}
          className={`flex-1 py-3 text-[15px] font-semibold text-center transition-colors ${
            activeTab === "fame"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400"
          }`}
        >
          Fame
        </button>
        <button
          onClick={() => setActiveTab("reward")}
          className={`flex-1 py-3 text-[15px] font-semibold text-center transition-colors ${
            activeTab === "reward"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-400"
          }`}
        >
          리워드
        </button>
      </div>

      {/* 랭킹전 배너 */}
      <div className="px-4 py-4">
        <button className="w-full flex items-center justify-center gap-2 py-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-[18px] font-bold text-gray-900">{currentMonth}월 랭킹전</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 총 상금 / 남은 시간 */}
        <div className="flex mt-2 border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex-1 py-3 text-center border-r border-gray-200">
            <p className="text-[12px] text-gray-500 mb-1">총 상금</p>
            <p className="text-[16px] font-bold text-gray-900 flex items-center justify-center gap-1">
              <span className="text-yellow-500">⭐</span>
              335,000
            </p>
          </div>
          <div className="flex-1 py-3 text-center">
            <p className="text-[12px] text-gray-500 mb-1">남은 시간</p>
            <p className="text-[16px] font-bold text-gray-900">6일 8시간 27분</p>
          </div>
        </div>
      </div>

      {/* 내 정보 카드 */}
      <div className="mx-4 mb-2 p-4 bg-[#E8F4FC] rounded-xl flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
          <img
            src={myInfo.avatar}
            alt={myInfo.nickname}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-bold text-gray-900">{myInfo.nickname}</p>
          <p className="text-[13px] text-gray-500">
            {activeTab === "fame" ? myInfo.fame.toLocaleString() : myInfo.reward.toLocaleString()} {activeTab === "fame" ? "Fame" : "리워드"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="text-[16px] font-bold text-gray-900">{myInfo.point.toLocaleString()}</span>
        </div>
      </div>

      {/* 랭킹 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {rankings.map((user) => (
          <div
            key={user.rank}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-50"
          >
            {/* 순위 */}
            {renderRank(user.rank)}

            {/* 아바타 */}
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <span className="text-xl">{user.avatar}</span>
              ) : (
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            {/* 닉네임 + 배지 + 값 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-gray-900 truncate">
                  {user.nickname}
                </span>
                {user.badge && (
                  <span className="text-[11px] px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded font-medium shrink-0">
                    {user.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-gray-500">
                {user.value.toLocaleString()} {activeTab === "fame" ? "Fame" : "리워드"}
              </p>
            </div>

            {/* 리워드 */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">P</span>
              </div>
              <span className="text-[15px] font-bold text-gray-900">
                {user.reward.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
