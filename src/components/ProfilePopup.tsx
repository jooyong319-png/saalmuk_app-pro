import { useState } from "react";

interface ProfilePopupProps {
  profile: {
    author: string;
    avatar: string;
    badges?: string[];
  };
  isFollowing: boolean;
  onFollow: () => void;
  onClose: () => void;
}

export default function ProfilePopup({
  profile,
  isFollowing,
  onFollow,
  onClose,
}: ProfilePopupProps) {
  const [activeTab, setActiveTab] = useState("게시물");
  const [showMenu, setShowMenu] = useState(false);

  const profileStats = { posts: 42, followers: 128, following: 89 };

  // 게시물 데이터
  const posts = [
    {
      id: 1,
      date: "오늘",
      time: "10:24",
      channel: "리니지M",
      icon: "L",
      iconBg: "bg-purple-500",
      content:
        "이번 업데이트 진짜 대박이네요. 신규 던전 보상이 역대급입니다 👍",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      date: "오늘",
      time: "09:15",
      channel: "메이플스토리",
      icon: "M",
      iconBg: "bg-orange-500",
      content: "오늘 이벤트 쿠폰 어디서 받는지 아시는분?",
      likes: 8,
      comments: 12,
    },
    {
      id: 3,
      date: "어제",
      time: "18:30",
      channel: "로스트아크",
      icon: "R",
      iconBg: "bg-blue-500",
      content: "카던 파티 구합니다! 1490 서폿이요~",
      likes: 15,
      comments: 3,
    },
  ];

  // 댓글 데이터
  const comments = [
    {
      id: 1,
      date: "오늘",
      time: "11:30",
      channel: "메이플스토리",
      icon: "M",
      iconBg: "bg-orange-500",
      originalPost: "신규 유저 추천 직업 뭐가 좋을까요?",
      myComment: "아크 추천드려요! 초보자한테 딱입니다 👍",
      likes: 12,
    },
    {
      id: 2,
      date: "오늘",
      time: "08:45",
      channel: "로스트아크",
      icon: "R",
      iconBg: "bg-blue-500",
      originalPost: "1520 세이지 카던 구해요",
      myComment: "저 1515 바드인데 같이 해도 될까요?",
      likes: 3,
    },
    {
      id: 3,
      date: "어제",
      time: "22:10",
      channel: "리니지M",
      icon: "L",
      iconBg: "bg-purple-500",
      originalPost: "오늘 보스 타임 몇시에요?",
      myComment: "밤 10시입니다!",
      likes: 8,
    },
  ];

  // 좋아요 데이터
  const likedPosts = [
    {
      id: 1,
      date: "오늘",
      time: "12:00",
      author: "게임고수123",
      avatar: "https://i.pravatar.cc/100?img=1",
      channel: "메이플스토리",
      icon: "M",
      iconBg: "bg-orange-500",
      content: "드디어 250 달성!! 3년 걸렸네요 ㅠㅠ",
      likes: 342,
    },
    {
      id: 2,
      date: "오늘",
      time: "10:30",
      author: "쌀먹러버",
      avatar: "https://i.pravatar.cc/100?img=2",
      channel: "로스트아크",
      icon: "R",
      iconBg: "bg-blue-500",
      content: "에키드나 하드 원트 공략 정리해봤습니다",
      likes: 567,
    },
    {
      id: 3,
      date: "어제",
      time: "19:45",
      author: "이벤트헌터",
      avatar: "https://i.pravatar.cc/100?img=3",
      channel: "리니지M",
      icon: "L",
      iconBg: "bg-purple-500",
      content: "이번 주 쿠폰 코드 총정리 🎁",
      likes: 892,
    },
  ];

  return (
    <div className="fixed inset-0 z-[10001] flex justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col">
        {/* 헤더 */}
        <div className="bg-white border-b border-gray-100 flex-shrink-0 relative">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={onClose}
              className="w-10 h-10 -ml-2 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-gray-700"
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
            <h1 className="text-base font-bold text-gray-900">프로필</h1>
            <button
              className="w-10 h-10 -mr-2 flex items-center justify-center"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
          {showMenu && (
            <div className="absolute top-14 right-4 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-30">
              <button
                className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setShowMenu(false)}
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
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span>차단하기</span>
              </button>
              <button
                className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-500 hover:bg-gray-50"
                onClick={() => setShowMenu(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>신고하기</span>
              </button>
            </div>
          )}
        </div>

        {/* 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* 배너 */}
          <div className="h-24 bg-gradient-to-br from-[#72C2FF] via-[#5BA8E6] to-[#4A9CD9]" />

          {/* 프로필 카드 */}
          <div className="px-4 -mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="flex items-start gap-4">
                <div className="relative -mt-12">
                  <img
                    src={profile.avatar}
                    alt={profile.author}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: "#72C2FF" }}
                  >
                    Lv.12
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-gray-900">
                      {profile.author}
                    </h1>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-medium rounded-full">
                      🍙 쌀먹러
                    </span>
                  </div>
                  {profile.badges && profile.badges.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {profile.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    게임 좋아하는 평범한 유저입니다 🎮
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-center">
                      <p className="text-base font-bold text-gray-900">
                        {profileStats.posts}
                      </p>
                      <p className="text-[10px] text-gray-400">게시물</p>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="text-center">
                      <p className="text-base font-bold text-gray-900">
                        {profileStats.followers}
                      </p>
                      <p className="text-[10px] text-gray-400">팔로워</p>
                    </div>
                    <div className="w-px h-6 bg-gray-100" />
                    <div className="text-center">
                      <p className="text-base font-bold text-gray-900">
                        {profileStats.following}
                      </p>
                      <p className="text-[10px] text-gray-400">팔로잉</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                  style={{
                    backgroundColor: isFollowing ? "#F3F4F6" : "#72C2FF",
                    color: isFollowing ? "#6B7280" : "#FFFFFF",
                  }}
                  onClick={onFollow}
                >
                  {isFollowing ? (
                    <span className="flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      팔로잉
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      팔로우
                    </span>
                  )}
                </button>
                <button className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 배지 섹션 */}
          <div className="bg-white mx-4 rounded-2xl p-4 mt-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">🏆 획득 배지</h3>
              <span className="text-xs text-gray-400">5개</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["🎮", "🏅", "💎", "🔥", "⭐"].map((badge, idx) => (
                <div
                  key={idx}
                  className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="bg-white mt-3 sticky top-0 z-10">
            <div className="flex border-b border-gray-100">
              {["게시물", "댓글", "좋아요"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 text-center text-sm font-medium relative ${activeTab === tab ? "text-gray-900" : "text-gray-400"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  {activeTab === tab && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                      style={{ backgroundColor: "#72C2FF" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="bg-white min-h-[200px] pb-20">
            {/* 게시물 탭 */}
            {activeTab === "게시물" &&
              posts.map((post, index) => (
                <div key={post.id} className="px-4">
                  {(index === 0 || posts[index - 1].date !== post.date) && (
                    <div className="py-3 mt-1">
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        {post.date}
                      </span>
                    </div>
                  )}
                  <div className="py-3 border-b border-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg ${post.iconBg} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-[10px]">
                          {post.icon}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {post.channel}
                        </span>
                        에 남긴 글
                      </span>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {post.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {/* 댓글 탭 */}
            {activeTab === "댓글" &&
              comments.map((comment, index) => (
                <div key={comment.id} className="px-4">
                  {(index === 0 ||
                    comments[index - 1].date !== comment.date) && (
                    <div className="py-3 mt-1">
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        {comment.date}
                      </span>
                    </div>
                  )}
                  <div className="py-3 border-b border-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg ${comment.iconBg} flex items-center justify-center`}
                      >
                        <span className="text-white font-bold text-[10px]">
                          {comment.icon}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                          {comment.channel}
                        </span>
                        에 남긴 댓글
                      </span>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {comment.time}
                      </span>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 mb-2">
                      <p className="text-xs text-gray-500 line-clamp-1">
                        "{comment.originalPost}"
                      </p>
                    </div>
                    <p className="text-sm text-gray-800">{comment.myComment}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {comment.likes}
                    </div>
                  </div>
                </div>
              ))}

            {/* 좋아요 탭 */}
            {activeTab === "좋아요" &&
              likedPosts.map((post, index) => (
                <div key={post.id} className="px-4">
                  {(index === 0 ||
                    likedPosts[index - 1].date !== post.date) && (
                    <div className="py-3 mt-1">
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        {post.date}
                      </span>
                    </div>
                  )}
                  <div className="py-3 border-b border-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={post.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-medium text-gray-700">
                        {post.author}
                      </span>
                      <div
                        className={`w-5 h-5 rounded ${post.iconBg} flex items-center justify-center ml-1`}
                      >
                        <span className="text-white font-bold text-[8px]">
                          {post.icon}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 ml-auto">
                        {post.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {post.content}
                    </p>
                    <div
                      className="flex items-center gap-1 mt-2 text-xs"
                      style={{ color: "#72C2FF" }}
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      좋아요 · {post.likes.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}

            <div className="p-4 text-center">
              <button className="text-sm text-gray-400">더 보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
