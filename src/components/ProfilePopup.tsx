import { useState } from "react";
import { useFollow } from "./community/FollowContext";
import { useToast } from "./community/Toast";
import ReportPopup from "./community/ReportPopup";
import ConfirmPopup from "./community/ConfirmPopup";
import ChatRoom from "./community/ChatRoom";

interface ProfilePopupProps {
  profile: {
    author?: string;
    name?: string;
    avatar: string;
    avatarBg?: string;
    badges?: string[];
  };
  onClose: () => void;
}

// URL인지 이모지인지 판단
const isImageUrl = (str: string) => {
  return (
    str.startsWith("http") || str.startsWith("/") || str.startsWith("data:")
  );
};

export default function ProfilePopup({ profile, onClose }: ProfilePopupProps) {
  const [activeTab, setActiveTab] = useState("게시물");
  const [showMenu, setShowMenu] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);

  // 닉네임 (author 또는 name)
  const nickname = profile.author || profile.name || "알 수 없음";

  // 아바타가 URL인지 이모지인지
  const hasImageAvatar = isImageUrl(profile.avatar);

  // FollowContext 연결
  const { isFollowing, toggleFollow } = useFollow();
  const { showToast } = useToast();
  const following = isFollowing(nickname);

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
      dislikes: 2,
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
      dislikes: 0,
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
      dislikes: 1,
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
      dislikes: 0,
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
      dislikes: 1,
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
      dislikes: 0,
    },
  ];

  // 팔로우 버튼 클릭
  const handleFollowClick = () => {
    toggleFollow(nickname);
  };

  // 신고 처리
  const handleReport = (reason: string) => {
    setShowReportPopup(false);
    setShowMenu(false);
    showToast(`${nickname}님을 신고했습니다.`);
  };

  // 차단 처리
  const handleBlock = () => {
    setShowBlockConfirm(false);
    setShowMenu(false);
    showToast(`${nickname}님을 차단했습니다.`);
  };

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
                onClick={() => {
                  setShowMenu(false);
                  setShowBlockConfirm(true);
                }}
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
                onClick={() => {
                  setShowMenu(false);
                  setShowReportPopup(true);
                }}
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
                  {hasImageAvatar ? (
                    <img
                      src={profile.avatar}
                      alt={nickname}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full border-4 border-white shadow-md flex items-center justify-center text-3xl"
                      style={{
                        background:
                          profile.avatarBg ||
                          "linear-gradient(135deg, #72C2FF, #5BA8E6)",
                      }}
                    >
                      {profile.avatar}
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-gray-900">
                      {nickname}
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
                    backgroundColor: following ? "#F3F4F6" : "#72C2FF",
                    color: following ? "#6B7280" : "#FFFFFF",
                  }}
                  onClick={handleFollowClick}
                >
                  {following ? (
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
                <button
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-600"
                  onClick={() => setShowChatRoom(true)}
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="bg-white mt-3 sticky top-0 z-10">
            <div className="flex border-b border-gray-100">
              {["게시물", "댓글", "배지"].map((tab) => (
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
                    <div className="flex items-center gap-1 mt-2">
                      {/* 좋아요 */}
                      <span className="flex items-center gap-1 p-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
                          />
                        </svg>
                      </span>
                      {/* 점수 */}
                      <span className="text-xs font-medium text-gray-400 min-w-[20px] text-center">
                        {post.likes - (post.dislikes || 0)}
                      </span>
                      {/* 싫어요 */}
                      <span className="flex items-center gap-1 p-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"
                          />
                        </svg>
                      </span>
                      {/* 댓글 */}
                      <span className="flex items-center gap-1 p-1 text-gray-400 ml-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-xs">{post.comments}</span>
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
                    <div className="flex items-center gap-1 mt-2">
                      {/* 좋아요 */}
                      <span className="flex items-center gap-1 p-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
                          />
                        </svg>
                      </span>
                      {/* 점수 */}
                      <span className="text-xs font-medium text-gray-400 min-w-[20px] text-center">
                        {comment.likes - (comment.dislikes || 0)}
                      </span>
                      {/* 싫어요 */}
                      <span className="flex items-center gap-1 p-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {/* 배지 탭 */}
            {activeTab === "배지" && (
              <div className="p-4">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      emoji: "🎮",
                      name: "게이머",
                      desc: "첫 게임 플레이",
                      rarity: "일반",
                    },
                    {
                      emoji: "🏅",
                      name: "랭커",
                      desc: "랭킹 100위 달성",
                      rarity: "레어",
                    },
                    {
                      emoji: "💎",
                      name: "다이아",
                      desc: "누적 1000젬 획득",
                      rarity: "에픽",
                    },
                    {
                      emoji: "🔥",
                      name: "인기인",
                      desc: "좋아요 100개 달성",
                      rarity: "레어",
                    },
                    {
                      emoji: "⭐",
                      name: "스타",
                      desc: "팔로워 50명 달성",
                      rarity: "레어",
                    },
                    {
                      emoji: "📝",
                      name: "작가",
                      desc: "게시글 10개 작성",
                      rarity: "일반",
                    },
                    {
                      emoji: "💬",
                      name: "수다쟁이",
                      desc: "댓글 50개 작성",
                      rarity: "일반",
                    },
                    {
                      emoji: "🎁",
                      name: "선물왕",
                      desc: "선물 10회 전송",
                      rarity: "레어",
                    },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm mb-2">
                        {badge.emoji}
                      </div>
                      <span className="text-xs font-medium text-gray-700 text-center">
                        {badge.name}
                      </span>
                      <span
                        className={`text-[10px] mt-0.5 ${
                          badge.rarity === "에픽"
                            ? "text-purple-500"
                            : badge.rarity === "레어"
                              ? "text-blue-500"
                              : "text-gray-400"
                        }`}
                      >
                        {badge.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 text-center">
              <button className="text-sm text-gray-400">더 보기</button>
            </div>
          </div>
        </div>
      </div>

      {/* 신고 팝업 */}
      {showReportPopup && (
        <ReportPopup
          targetType="유저"
          onReport={handleReport}
          onCancel={() => setShowReportPopup(false)}
        />
      )}

      {/* 차단 확인 팝업 */}
      {showBlockConfirm && (
        <ConfirmPopup
          title="차단하기"
          description={`${nickname}님을 차단하시겠습니까?\n차단하면 이 유저의 게시물과 댓글이 보이지 않습니다.`}
          confirmText="차단"
          cancelText="취소"
          isDestructive
          onConfirm={handleBlock}
          onCancel={() => setShowBlockConfirm(false)}
        />
      )}

      {/* 채팅방 */}
      {showChatRoom && (
        <ChatRoom
          profile={{
            name: nickname,
            avatar: profile.avatar,
            avatarBg: profile.avatarBg,
          }}
          onClose={() => setShowChatRoom(false)}
        />
      )}
    </div>
  );
}
