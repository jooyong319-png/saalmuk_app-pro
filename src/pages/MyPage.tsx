import { useState, useEffect } from "react";

export default function MyPage({
  setCurrentPage,
  goBack,
  onLogout,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  onLogout?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"activity" | "badge" | "ssalcon">(
    "activity",
  );
  const [activitySubTab, setActivitySubTab] = useState<
    "posts" | "comments" | "saved"
  >("posts");
  const [showLevelInfo, setShowLevelInfo] = useState(false);

  // 유저 데이터
  const userData = {
    nickname: "쌀먹마스터",
    avatar: "🍙",
    level: 12,
    exp: 7850,
    expToNext: 10000,
    title: "게임계의 쌀부자",
    joinDate: "2024.03.15",
    consecutiveDays: 28,
    totalPlayTime: 1247,
    totalEarnedPoints: 847500,
  };

  // 오늘의 쌀먹 현황
  const todayStats = {
    playTime: 127,
    earnedPoints: 3450,
    completedMissions: 4,
    totalMissions: 6,
  };

  // 자산
  const assets = {
    points: 125400,
    cash: 32000,
    coupons: 7,
    entries: 12,
  };

  // 배지
  const badges = [
    {
      id: 1,
      emoji: "🏆",
      name: "챔피언",
      desc: "100시간 플레이",
      acquired: true,
    },
    {
      id: 2,
      emoji: "🔥",
      name: "연속왕",
      desc: "30일 연속 출석",
      acquired: true,
    },
    {
      id: 3,
      emoji: "💎",
      name: "다이아몬드",
      desc: "50만 포인트 적립",
      acquired: true,
    },
    {
      id: 4,
      emoji: "🎮",
      name: "게이머",
      desc: "10개 게임 플레이",
      acquired: true,
    },
    {
      id: 5,
      emoji: "✍️",
      name: "작가",
      desc: "게시글 50개 작성",
      acquired: true,
    },
    {
      id: 6,
      emoji: "💬",
      name: "수다쟁이",
      desc: "댓글 200개 작성",
      acquired: false,
      progress: 128,
      total: 200,
    },
    {
      id: 7,
      emoji: "🌟",
      name: "인플루언서",
      desc: "팔로워 1000명",
      acquired: false,
      progress: 234,
      total: 1000,
    },
    {
      id: 8,
      emoji: "🍚",
      name: "쌀부자",
      desc: "100만 포인트 적립",
      acquired: false,
      progress: 847500,
      total: 1000000,
    },
  ];

  // 내 게시물
  const myPosts = [
    {
      id: 1,
      title: "메이플 신규 이벤트 정리했습니다",
      community: "메이플스토리",
      likes: 234,
      comments: 45,
      time: "2시간 전",
    },
    {
      id: 2,
      title: "이번 달 쌀먹 현황 공유해요",
      community: "쌀먹 꿀팁",
      likes: 156,
      comments: 32,
      time: "1일 전",
    },
    {
      id: 3,
      title: "발로란트 신규 요원 리뷰",
      community: "발로란트",
      likes: 89,
      comments: 18,
      time: "3일 전",
    },
    {
      id: 4,
      title: "원신 4.5 업데이트 공략",
      community: "원신",
      likes: 312,
      comments: 67,
      time: "4일 전",
    },
    {
      id: 5,
      title: "리니지M 이벤트 꿀팁 공유",
      community: "리니지M",
      likes: 178,
      comments: 41,
      time: "5일 전",
    },
    {
      id: 6,
      title: "로스트아크 레이드 공략법",
      community: "로스트아크",
      likes: 423,
      comments: 89,
      time: "1주일 전",
    },
    {
      id: 7,
      title: "던파 신규 직업 리뷰",
      community: "던전앤파이터",
      likes: 267,
      comments: 53,
      time: "1주일 전",
    },
    {
      id: 8,
      title: "쿠키런 킹덤 PVP 덱 추천",
      community: "쿠키런",
      likes: 145,
      comments: 28,
      time: "2주일 전",
    },
    {
      id: 9,
      title: "블루 아카이브 신캐 평가",
      community: "블루 아카이브",
      likes: 198,
      comments: 44,
      time: "2주일 전",
    },
    {
      id: 10,
      title: "게임하면서 돈 버는 꿀팁 총정리",
      community: "쌀먹 꿀팁",
      likes: 567,
      comments: 123,
      time: "3주일 전",
    },
  ];

  // 내 댓글
  const myComments = [
    {
      id: 1,
      content: "저도 이 방법으로 하니까 잘 되더라고요!",
      post: "효율적인 쌀먹 루틴",
      postId: 101,
      likes: 12,
      time: "30분 전",
    },
    {
      id: 2,
      content: "감사합니다 덕분에 해결했어요 ㅎㅎ",
      post: "메이플 버그 해결법",
      postId: 102,
      likes: 8,
      time: "2시간 전",
    },
    {
      id: 3,
      content: "이거 진짜 개꿀팁이네요 ㄷㄷ",
      post: "원신 원석 무료로 얻는 법",
      postId: 103,
      likes: 24,
      time: "5시간 전",
    },
    {
      id: 4,
      content: "저는 다른 방법 썼는데 이것도 좋네요",
      post: "로스트아크 골드 파밍",
      postId: 104,
      likes: 15,
      time: "1일 전",
    },
    {
      id: 5,
      content: "우와 대박 정보 감사합니다!",
      post: "사전예약 보상 정리",
      postId: 105,
      likes: 31,
      time: "1일 전",
    },
    {
      id: 6,
      content: "이 덱 써봤는데 진짜 좋아요",
      post: "쿠키런 최강 덱 추천",
      postId: 106,
      likes: 19,
      time: "2일 전",
    },
    {
      id: 7,
      content: "혹시 다른 공략도 있나요?",
      post: "던파 레이드 가이드",
      postId: 107,
      likes: 7,
      time: "3일 전",
    },
    {
      id: 8,
      content: "저도 이거 해봐야겠네요",
      post: "블아 이벤트 공략",
      postId: 108,
      likes: 11,
      time: "4일 전",
    },
    {
      id: 9,
      content: "좋은 정보 공유 감사드립니다~",
      post: "게임 쿠폰 모음",
      postId: 109,
      likes: 28,
      time: "5일 전",
    },
    {
      id: 10,
      content: "이거 아직도 되나요??",
      post: "무료 캐시 이벤트",
      postId: 110,
      likes: 5,
      time: "1주일 전",
    },
  ];

  // 저장한 글
  const savedPosts = [
    {
      id: 1,
      title: "2025년 게임 쿠폰 총정리",
      community: "쌀먹 꿀팁",
      saves: 1200,
      time: "저장: 1주일 전",
    },
    {
      id: 2,
      title: "모바일게임 사전예약 꿀팁",
      community: "모바일게임 리뷰",
      saves: 890,
      time: "저장: 2주일 전",
    },
    {
      id: 3,
      title: "무과금으로 즐기는 게임 추천",
      community: "쌀먹 꿀팁",
      saves: 2341,
      time: "저장: 2주일 전",
    },
    {
      id: 4,
      title: "이번 달 필수 이벤트 정리",
      community: "게임 이벤트",
      saves: 1567,
      time: "저장: 3주일 전",
    },
    {
      id: 5,
      title: "초보자를 위한 쌀먹 가이드",
      community: "쌀먹 꿀팁",
      saves: 3421,
      time: "저장: 1달 전",
    },
    {
      id: 6,
      title: "게임별 리워드 비교 분석",
      community: "게임 분석",
      saves: 987,
      time: "저장: 1달 전",
    },
    {
      id: 7,
      title: "효율적인 플레이 타임 관리법",
      community: "쌀먹 꿀팁",
      saves: 1123,
      time: "저장: 1달 전",
    },
    {
      id: 8,
      title: "신규 게임 출시 일정표",
      community: "게임 뉴스",
      saves: 2156,
      time: "저장: 2달 전",
    },
    {
      id: 9,
      title: "각 게임사 고객센터 연락처 모음",
      community: "게임 정보",
      saves: 4521,
      time: "저장: 2달 전",
    },
    {
      id: 10,
      title: "게임 환불 방법 총정리",
      community: "게임 정보",
      saves: 3892,
      time: "저장: 3달 전",
    },
  ];

  // 레벨 정보 팝업 뒤로가기 처리
  useEffect(() => {
    if (showLevelInfo) {
      window.history.pushState({ levelInfo: true }, "");
      const handlePopState = () => setShowLevelInfo(false);
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [showLevelInfo]);

  const expPercentage = (userData.exp / userData.expToNext) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: "#72C2FF" }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="text-lg font-bold text-white">마이페이지</span>
          <div className="flex-1" />
          <button
            onClick={() => setCurrentPage("settings")}
            className="w-8 h-8 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* 프로필 섹션 - 레딧 스타일 */}
      <div className="bg-gray-900 items-center">
        {/* 배너 + 프로필 영역 통합 */}
        <div
          className="px-3 pb-5"
          style={{
            background: "linear-gradient(180deg, #72C2FF 0%, #5c9ccc 95%)",
          }}
        >
          {/* 아바타 + 레벨바 */}
          <div className="flex items-center gap-3">
            {/* 아바타 - 그라디언트 프레임 */}
            <button
              className="relative flex-shrink-0"
              onClick={() => setShowLevelInfo(true)}
            >
              <div
                className="w-24 h-24 rounded-2xl p-1 shadow-xl"
                style={{ background: "linear-gradient(135deg, #ffffff)" }}
              >
                <div className="w-full h-full rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl">{userData.avatar}</span>
                </div>
              </div>
              {/* 레벨 배지 */}
              <div
                className="absolute -bottom-1 -right-1 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg border-2 border-gray-900"
                style={{ backgroundColor: "#72C2FF" }}
              >
                Lv.{userData.level}
              </div>
            </button>
            {/* 레벨 & 경험치 바 */}
            <button
              className="flex-1 p-3 bg-gray-50 rounded-xl active:bg-gray-100"
              onClick={() => setShowLevelInfo(true)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#72C2FF" }}
                  >
                    Lv.{userData.level}
                  </span>
                  <span className="text-xs text-gray-400">
                    → Lv.{userData.level + 1}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {userData.exp.toLocaleString()} /{" "}
                  {userData.expToNext.toLocaleString()} EXP
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${expPercentage}%`,
                    background: "linear-gradient(90deg, #72C2FF, #5BA8E6)",
                  }}
                />
              </div>
            </button>
          </div>
          {/* 닉네임 & 정보 */}
          <div className="mt-5 flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                {userData.nickname}
              </h2>
              <button
                className="text-xs text-white/60 hover:text-white transition-colors"
                onClick={() => setCurrentPage("profileEdit")}
              >
                프로필 수정
              </button>
            </div>
            <p className="text-sm text-white/70 mt-1">• 팔로워 128명 〉</p>
          </div>
          {/* 4열 통계 - 포인트, 캐시, 보유 쿠폰, 응모함 */}
          <div className="flex items-center mt-1 pt-2">
            <button
              className="flex-1 flex justify-center bg-white/15 rounded-xl p-2 m-0.5 text-center"
              onClick={() => setCurrentPage("life")}
            >
              <div className="text-left">
                <p className="text-lg font-bold text-white">
                  {assets.points.toLocaleString()}
                </p>
                <p className="text-xs text-white/60 mt-0.5">포인트 〉</p>
              </div>
            </button>
            <button
              className="flex-1 flex justify-center bg-white/15 rounded-xl p-2 m-0.5 text-center"
              onClick={() => setCurrentPage("DailyReward-market")}
            >
              <div className="text-left">
                <p className="text-lg font-bold text-white">
                  {assets.cash.toLocaleString()}
                </p>
                <p className="text-xs text-white/60 mt-0.5">캐시 〉</p>
              </div>
            </button>
            <button
              className="flex-1 flex justify-center bg-white/15 rounded-xl p-2 m-0.5 text-center"
              onClick={() => setCurrentPage("DailyReward-myCoupons")}
            >
              <div className="text-left">
                <p className="text-lg font-bold text-white">{assets.coupons}</p>
                <p className="text-xs text-white/60 mt-0.5">보유 쿠폰 〉</p>
              </div>
            </button>
            <button
              className="flex-1 flex justify-center bg-white/15 rounded-xl p-2 m-0.5 text-center"
              onClick={() => setCurrentPage("DailyReward-myEntries")}
            >
              <div className="text-left">
                <p className="text-lg font-bold text-white">{assets.entries}</p>
                <p className="text-xs text-white/60 mt-0.5">응모함 〉</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 탭 섹션 */}
      <div className="mt-2 bg-white">
        <div className="flex border-b border-gray-100">
          {[
            { key: "activity", label: "활동", icon: "📝" },
            { key: "badge", label: "배지", icon: "🏆" },
            { key: "ssalcon", label: "쌀콘", icon: "🍙" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-1.5 relative ${activeTab === tab.key ? "text-gray-900" : "text-gray-400"}`}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.key && (
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ backgroundColor: "#72C2FF" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[200px]">
          {activeTab === "activity" && (
            <div>
              <div className="flex gap-2 p-3 border-b border-gray-50">
                {[
                  { key: "posts", label: "게시물" },
                  { key: "comments", label: "댓글" },
                  { key: "saved", label: "저장됨" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${activitySubTab === tab.key ? "text-white" : "bg-gray-100 text-gray-500"}`}
                    style={
                      activitySubTab === tab.key
                        ? { backgroundColor: "#72C2FF" }
                        : {}
                    }
                    onClick={() =>
                      setActivitySubTab(tab.key as typeof activitySubTab)
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activitySubTab === "posts" && (
                <div className="divide-y divide-gray-50">
                  {myPosts.map((post) => (
                    <button
                      key={post.id}
                      className="w-full px-4 py-3 text-left active:bg-gray-50"
                      onClick={() =>
                        setCurrentPage(`channelDetail-post-${post.id}`)
                      }
                    >
                      <p className="text-[10px] text-gray-400 mb-0.5">
                        {post.community}
                      </p>
                      <p className="text-sm text-gray-800 line-clamp-1">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                        <span className="ml-auto">{post.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activitySubTab === "comments" && (
                <div className="divide-y divide-gray-50">
                  {myComments.map((comment) => (
                    <button
                      key={comment.id}
                      className="w-full px-4 py-3 text-left active:bg-gray-50"
                      onClick={() =>
                        setCurrentPage(`channelDetail-post-${comment.postId}`)
                      }
                    >
                      <p className="text-[10px] text-gray-400 mb-0.5">
                        "{comment.post}"에 댓글
                      </p>
                      <p className="text-sm text-gray-800 line-clamp-2">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                        <span>👍 {comment.likes}</span>
                        <span className="ml-auto">{comment.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activitySubTab === "saved" && (
                <div className="divide-y divide-gray-50">
                  {savedPosts.map((post) => (
                    <button
                      key={post.id}
                      className="w-full px-4 py-3 text-left active:bg-gray-50"
                      onClick={() =>
                        setCurrentPage(`channelDetail-post-${post.id}`)
                      }
                    >
                      <p className="text-[10px] text-gray-400 mb-0.5">
                        {post.community}
                      </p>
                      <p className="text-sm text-gray-800 line-clamp-1">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                        <span>🔖 {post.saves}</span>
                        <span className="ml-auto">{post.time}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "badge" && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  획득한 배지{" "}
                  <span className="font-bold text-gray-900">
                    {badges.filter((b) => b.acquired).length}
                  </span>
                  /{badges.length}
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`relative flex flex-col items-center p-3 rounded-xl ${badge.acquired ? "bg-gradient-to-br from-amber-50 to-orange-50" : "bg-gray-50"}`}
                  >
                    <span
                      className={`text-3xl ${!badge.acquired && "grayscale opacity-40"}`}
                    >
                      {badge.emoji}
                    </span>
                    <p
                      className={`text-[10px] font-medium mt-1 ${badge.acquired ? "text-gray-700" : "text-gray-400"}`}
                    >
                      {badge.name}
                    </p>
                    {!badge.acquired && badge.progress !== undefined && (
                      <div className="w-full mt-1">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-400 rounded-full"
                            style={{
                              width: `${(badge.progress / badge.total!) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {badge.acquired && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "ssalcon" && (
            <div className="p-4">
              {/* 현재 장착 중인 쌀콘 */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">현재 장착 중</p>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl">
                    🍙
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      기본 주먹밥
                    </p>
                    <p className="text-xs text-gray-500">가입 시 기본 제공</p>
                  </div>
                </div>
              </div>

              {/* 보유 쌀콘 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-900">
                    보유 쌀콘 <span className="text-[#72C2FF]">8</span>
                  </h4>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: "🍙", name: "기본 주먹밥", equipped: true },
                    { icon: "🍚", name: "갓 지은 밥", equipped: false },
                    { icon: "🌾", name: "황금 벼", equipped: false },
                    { icon: "🍘", name: "센베이", equipped: false },
                    { icon: "🍛", name: "카레라이스", equipped: false },
                    { icon: "🍜", name: "라멘", equipped: false },
                    { icon: "🍣", name: "초밥", equipped: false },
                    { icon: "🍱", name: "도시락", equipped: false },
                  ].map((ssalcon, idx) => (
                    <button
                      key={idx}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center relative ${ssalcon.equipped ? "bg-blue-50 ring-2 ring-[#72C2FF]" : "bg-gray-50 active:bg-gray-100"}`}
                    >
                      <span className="text-2xl mb-1">{ssalcon.icon}</span>
                      <span className="text-[9px] text-gray-500 truncate w-full px-1 text-center">
                        {ssalcon.name}
                      </span>
                      {ssalcon.equipped && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#72C2FF] rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 획득 가능한 쌀콘 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-900">획득 가능</h4>
                  <span className="text-xs text-gray-400">
                    조건 달성 시 획득
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      icon: "👑",
                      name: "VIP 왕관",
                      condition: "VIP 등급 달성",
                    },
                    { icon: "🔥", name: "불꽃", condition: "연속 출석 30일" },
                    { icon: "💎", name: "다이아몬드", condition: "누적 10만P" },
                    { icon: "🏆", name: "트로피", condition: "랭킹 1위" },
                  ].map((ssalcon, idx) => (
                    <button
                      key={idx}
                      className="aspect-square rounded-xl bg-gray-100 flex flex-col items-center justify-center relative opacity-50"
                    >
                      <span className="text-2xl mb-1 grayscale">
                        {ssalcon.icon}
                      </span>
                      <span className="text-[9px] text-gray-400 truncate w-full px-1 text-center">
                        {ssalcon.name}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 안내 */}
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 text-center">
                  쌀콘을 탭하면 프로필에 장착됩니다
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 레벨 정보 팝업 */}
      {showLevelInfo && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-end justify-center"
          onClick={() => window.history.back()}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl overflow-hidden"
            style={{ animation: "slideUp 0.3s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">레벨 정보</h3>
              <button
                onClick={() => window.history.back()}
                className="w-8 h-8 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-5xl">
                  {userData.avatar}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    Lv.{userData.level}
                  </p>
                  <p className="text-sm text-gray-500">{userData.title}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">다음 레벨까지</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#72C2FF" }}
                  >
                    {(userData.expToNext - userData.exp).toLocaleString()} EXP
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${expPercentage}%`,
                      background: "linear-gradient(90deg, #72C2FF, #5BA8E6)",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {userData.exp.toLocaleString()} /{" "}
                  {userData.expToNext.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-900 mb-3">
                  Lv.{userData.level + 1} 달성 보상
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl">🪙</span>
                    <p className="text-xs text-gray-500 mt-1">+500 P</p>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl">🎟️</span>
                    <p className="text-xs text-gray-500 mt-1">쿠폰 1장</p>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-3 text-center">
                    <span className="text-2xl">🏆</span>
                    <p className="text-xs text-gray-500 mt-1">새 배지</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-bold text-gray-900 mb-2">
                  경험치 획득 방법
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• 게임 플레이 1분 = 1 EXP</p>
                  <p>• 일일 미션 완료 = 50 EXP</p>
                  <p>• 게시글 작성 = 30 EXP</p>
                  <p>• 댓글 작성 = 10 EXP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
