import { useState, useEffect } from "react";
import ProfilePopup from "../components/ProfilePopup";

export default function ChannelDetail({
  setCurrentPage,
  goBack,
  initialProfileOpen = false,
  initialPostId,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  initialProfileOpen?: boolean;
  initialPostId?: number;
}) {
  //#region 변수
  const [activeTab, setActiveTab] = useState("전체");
  const [activeFilter, setActiveFilter] = useState("전체글");
  const [isLiked, setIsLiked] = useState(false);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [showAwardHistory, setShowAwardHistory] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewType, setViewType] = useState("카드형");
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("최신순");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showSortPopup, setShowSortPopup] = useState(false);

  // 프로필 팝업 초기 오픈
  useEffect(() => {
    if (initialProfileOpen) {
      setSelectedProfile({
        author: "블루아카이브러버",
        avatar: "https://i.pravatar.cc/100?img=12",
        badges: ["Lv.15", "쌀먹마스터"],
        content: "팔로잉한 유저입니다",
      });
    }
  }, [initialProfileOpen]);

  // 프로필 팝업 뒤로가기 처리 (일반 클릭으로 열린 경우만)
  useEffect(() => {
    if (selectedProfile && !initialProfileOpen) {
      window.history.pushState({ profileOpen: true }, "");
      const handlePopState = () => {
        setSelectedProfile(null);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [selectedProfile, initialProfileOpen]);

  // initialPostId로 게시글 상세 자동 열기
  useEffect(() => {
    if (initialPostId) {
      const post = posts.find((p) => p.id === initialPostId);
      if (post) {
        setSelectedPost(post);
      } else {
        // 게시글이 posts 배열에 없으면 임시 데이터로 생성
        setSelectedPost({
          id: initialPostId,
          author: "쌀먹마스터",
          avatar: "https://i.pravatar.cc/100?img=12",
          time: "방금 전",
          content: "마이페이지에서 이동한 게시글입니다.",
          image: null,
          likes: 0,
          comments: 0,
          category: "일반",
          badges: ["🌾 쌀먹러"],
        });
      }
    }
  }, [initialPostId]);

  // 게시글 상세 뒤로가기 처리
  useEffect(() => {
    if (selectedPost && !initialPostId) {
      window.history.pushState({ postOpen: true }, "");
      const handlePopState = () => {
        setSelectedPost(null);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [selectedPost, initialPostId]);

  const tabs = ["전체", "공략/팁", "질문", "스샷/자랑"];
  const filters = ["인증", "베스트", "전체글"];

  const posts = [
    {
      id: 1,
      author: "전사의심장7",
      avatar:
        "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      time: "방금 전",
      content: "상한가자 🚀🚀🚀 오늘 드디어 보스 클리어함 ㅋㅋㅋ",
      image: null,
      likes: 24,
      comments: 8,
      category: "공지",
      badges: ["🏆 공략왕"],
    },
    {
      id: 2,
      author: "나무늘보56894",
      avatar:
        "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      time: "1시간 전",
      content:
        "이걸 살아 돌아온다고.....? 진짜 개빡세게 했는데 겨우 클리어함 ㅠㅠ",
      image:
        "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_10.png",
      likes: 156,
      comments: 42,
      category: "일반",
      badges: ["🌾 쌀먹러"],
    },
    {
      id: 3,
      author: "메이플고인물",
      avatar:
        "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
      time: "2시간 전",
      content:
        "신규 유저분들 팁 드릴게요! 초반에 레벨업 빠르게 하려면 퀘스트 절대 스킵하지 마세요.",
      image: null,
      likes: 89,
      comments: 23,
      category: "베스트글",
      badges: ["👑 VIP"],
    },
    {
      id: 4,
      author: "전사의심장7",
      avatar:
        "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      time: "3시간 전",
      content: "일단 1폰으로 활 키우고 있어요. 레벨은 34입니다.",
      image:
        "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
      likes: 45,
      comments: 12,
      category: "인증글",
      badges: ["🏆 공략왕"],
    },
    {
      id: 5,
      author: "불꽃냥이",
      avatar:
        "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
      time: "5시간 전",
      content: "오늘 뽑기 개이득 봄 ㅋㅋㅋㅋ 10연차에서 전설 2개 떴다 ㄷㄷ",
      image: null,
      likes: 234,
      comments: 67,
      category: "일반",
      badges: ["💎 럭키가이"],
    },
    {
      id: 6,
      author: "게임하는직장인",
      avatar:
        "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      time: "6시간 전",
      content: "퇴근하고 겜하는 재미로 산다... 오늘도 화이팅 💪",
      image: null,
      likes: 78,
      comments: 15,
      category: "일반",
      badges: [],
    },
    {
      id: 7,
      author: "초보탈출중",
      avatar:
        "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      time: "8시간 전",
      content:
        "질문있어요! 직업 추천 좀 해주세요 ㅠㅠ 전사 vs 마법사 뭐가 더 좋음?",
      image: null,
      likes: 12,
      comments: 31,
      category: "일반",
      badges: ["🌱 뉴비"],
    },
    {
      id: 8,
      author: "만렙달성자",
      avatar:
        "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
      time: "1일 전",
      content: "드디어 만렙 찍었습니다!!!! 3개월 걸렸네요 ㅎㅎ",
      image:
        "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
      likes: 512,
      comments: 89,
      category: "일반",
      badges: ["💰 부자"],
    },
  ];
  //#endregion
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={goBack}>
            <span className="text-xl">←</span>
          </button>
          <span className="text-lg font-bold">메이플스토리</span>
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{
              backgroundImage:
                "url(https://ssalmuk.com/images/img_commu/commu_title_home.svg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            순위
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowSearch(true)}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button onClick={() => setIsLiked(!isLiked)}>
            <svg
              className={`w-6 h-6 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 배너 이미지 */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src="https://maplestory.vod.nexoncdn.co.kr/Media/ArtWork/artwork_127.png"
          alt="배너"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 탭 메뉴 */}
      <div className="sticky top-12 z-40 bg-white px-4 pt-3">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm ${
                activeTab === tab
                  ? "text-gray-900 font-medium"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 정렬 & 보기 */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <button
          className="text-sm text-gray-700 flex items-center gap-1"
          onClick={() => setShowSortPopup(true)}
        >
          {sortType} <span>↕</span>
        </button>
        <button
          className="text-gray-400"
          onClick={() => setShowViewPopup(true)}
        >
          {viewType === "목록형" ? (
            // 목록형 아이콘
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v1.43H3.8V5.3c0-.83.67-1.5 1.5-1.5zm10.9 4.73v2.93H3.8V8.53h12.4zm-1.5 7.67H5.3c-.83 0-1.5-.67-1.5-1.5v-1.43h12.4v1.43c0 .83-.67 1.5-1.5 1.5z" />
            </svg>
          ) : (
            // 카드형 아이콘
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z" />
            </svg>
          )}
        </button>
      </div>

      {/* 게시글 리스트 */}
      <div className="bg-white">
        {posts.map((post, index) => (
          <div key={post.id}>
            <div
              className="px-1.5 py-1.5 border-b border-gray-100 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              {viewType === "카드형" ? (
                // 카드형 보기
                <>
                  {/* 작성자 정보 */}
                  <div
                    className="flex items-center justify-between mb-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProfile(post);
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-1 flex-wrap">
                          <p
                            className="text-sm font-medium text-gray-900 "
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProfile(post);
                            }}
                          >
                            {post.author}
                          </p>
                          {post.badges &&
                            post.badges.map((badge, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                              >
                                {badge}
                              </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400">{post.time}</p>
                      </div>
                    </div>
                    <button
                      className="text-sm"
                      style={{
                        color: followedUsers.includes(post.author)
                          ? "#9CA3AF"
                          : "#72C2FF",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (followedUsers.includes(post.author)) {
                          setFollowedUsers(
                            followedUsers.filter(
                              (user) => user !== post.author,
                            ),
                          );
                        } else {
                          setFollowedUsers([...followedUsers, post.author]);
                        }
                      }}
                    >
                      {followedUsers.includes(post.author)
                        ? "팔로잉"
                        : "팔로우"}
                    </button>
                  </div>

                  {/* 게시글 이미지 */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="게시글 이미지"
                      className="w-64 h-64 rounded-xl mb-3 object-cover"
                    />
                  )}
                  {/* 게시글 내용 */}
                  {post.content && (
                    <p className="text-sm text-gray-900 mb-3">{post.content}</p>
                  )}

                  {/* 액션 버튼 */}
                  <div
                    className="flex items-center justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-4 text-gray-400">
                      {/* 좋아요 */}
                      <button
                        className="flex items-center gap-1"
                        onClick={() => {
                          if (likedPosts.includes(post.id)) {
                            setLikedPosts(
                              likedPosts.filter((id) => id !== post.id),
                            );
                          } else {
                            setLikedPosts([...likedPosts, post.id]);
                          }
                        }}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            likedPosts.includes(post.id)
                              ? "text-red-500 fill-red-500"
                              : ""
                          }`}
                          fill={
                            likedPosts.includes(post.id)
                              ? "currentColor"
                              : "none"
                          }
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
                        <span
                          className={`text-xs ${
                            likedPosts.includes(post.id) ? "text-red-500" : ""
                          }`}
                        >
                          {likedPosts.includes(post.id)
                            ? post.likes + 1
                            : post.likes}
                        </span>
                      </button>
                      {/* 댓글 */}
                      <button
                        className="flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
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
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="text-xs">{post.comments}</span>
                      </button>
                      {/* 리트윗 */}
                      <button className="flex items-center gap-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                      {/* 공유 */}
                      <button className="flex items-center gap-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* 선물 */}
                      <button
                        className="text-gray-300"
                        onClick={() => setShowGiftPopup(true)}
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
                            strokeWidth={1.5}
                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                          />
                        </svg>
                      </button>
                      {/* 더보기 */}
                      <div className="relative">
                        <button
                          className="text-gray-300"
                          onClick={() =>
                            setShowMoreMenu(
                              showMoreMenu === post.id ? null : post.id,
                            )
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>

                        {/* 더보기 메뉴 */}
                        {showMoreMenu === post.id && (
                          <div className="absolute right-0 bottom-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[120px] z-10">
                            <button
                              className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowMoreMenu(null)}
                            >
                              <span>저장</span>
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
                                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                              </svg>
                            </button>
                            <button
                              className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowMoreMenu(null)}
                            >
                              <span>차단</span>
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
                            </button>
                            <button
                              className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setShowMoreMenu(null)}
                            >
                              <span>신고</span>
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
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // 목록형 보기
                <div className="bg-white rounded-lg border border-gray-100 p-2">
                  <div className="flex items-start gap-1">
                    {/* 카테고리 아이콘 */}
                    <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                      {post.category === "일반" && (
                        <img
                          src="https://ssalmuk.com/images/img_commu/cm_list_normal_size22.svg"
                          alt="일반"
                          className="w-6 h-6"
                        />
                      )}
                      {post.category === "인증글" && (
                        <img
                          src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
                          alt="인증글"
                          className="w-6 h-6"
                        />
                      )}
                      {post.category === "베스트글" && (
                        <img
                          src="https://ssalmuk.com/images/img_commu/cm_list_best_size22.svg"
                          alt="베스트글"
                          className="w-6 h-6"
                        />
                      )}
                      {post.category === "공지" && (
                        <img
                          src="https://ssalmuk.com/images/img_commu/cm_list_notice_size20.svg"
                          alt="공지"
                          className="w-6 h-6"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* 제목/내용 */}
                      <div className="flex items-center">
                        <span className="text-sm text-gray-800 font-medium truncate max-w-[200px]">
                          {post.content}
                        </span>
                        {post.image && (
                          <img
                            src="https://ssalmuk.com/images/img_commu/square_gray_img.png"
                            alt="이미지"
                            className="w-5 h-5 flex-shrink-0"
                          />
                        )}
                        {post.comments > 0 && (
                          <span className="text-xs text-blue-400 flex-shrink-0">
                            [{post.comments}]
                          </span>
                        )}
                      </div>

                      {/* 메타 정보 */}
                      <div className="flex items-center text-[10px] text-gray-400 mt-1">
                        {/* 닉네임 */}
                        <span className="max-w-[50px] truncate">
                          {post.author}
                        </span>
                        <span className="mx-1.5 text-gray-200">|</span>
                        {/* 게시판 */}
                        <span>공략/팁</span>
                        <span className="mx-1.5 text-gray-200">|</span>
                        {/* 작성일 */}
                        <span>{post.time}</span>
                        <span className="mx-1.5 text-gray-200">|</span>
                        {/* 조회수 */}
                        <span className="flex items-center gap-0.5">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          {post.likes}
                        </span>

                        <span className="mx-1.5 text-gray-200">|</span>
                        {/* 좋아요 */}
                        <span className="flex items-center gap-0.5">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          {post.comments}
                        </span>
                        <span className="mx-1.5 text-gray-200">|</span>
                        {/* 공유 */}
                        <button className="text-gray-400">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                        </button>

                        {/* 오른쪽 액션 버튼 */}
                        <div
                          className="flex items-center gap-2 ml-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* 선물 */}
                          <button
                            className="text-gray-400"
                            onClick={() => setShowGiftPopup(true)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                              />
                            </svg>
                          </button>
                          {/* 더보기 */}
                          <div className="relative">
                            <button
                              className="text-gray-400"
                              onClick={() =>
                                setShowMoreMenu(
                                  showMoreMenu === post.id ? null : post.id,
                                )
                              }
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                              </svg>
                            </button>

                            {/* 더보기 메뉴 */}
                            {showMoreMenu === post.id && (
                              <div className="absolute right-0 bottom-6 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[100px] z-10">
                                <button
                                  className="w-full px-3 py-1.5 flex items-center justify-between text-xs text-gray-700 hover:bg-gray-50"
                                  onClick={() => setShowMoreMenu(null)}
                                >
                                  <span>저장</span>
                                  <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="w-full px-3 py-1.5 flex items-center justify-between text-xs text-gray-700 hover:bg-gray-50"
                                  onClick={() => setShowMoreMenu(null)}
                                >
                                  <span>차단</span>
                                  <svg
                                    className="w-4 h-4 text-gray-400"
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
                                </button>
                                <button
                                  className="w-full px-3 py-1.5 flex items-center justify-between text-xs text-gray-700 hover:bg-gray-50"
                                  onClick={() => setShowMoreMenu(null)}
                                >
                                  <span>신고</span>
                                  <svg
                                    className="w-4 h-4 text-gray-400"
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
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* 3번째 게시글 뒤에 인기글 섹션 삽입 */}
            {index === 2 && (
              <div className="w-full px-4 py-4 border-b border-gray-100 bg-white">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white text-sm">🔥</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">지금핫한 인기글</p>
                      <p className="text-xs text-gray-400">
                        팔로워 4.5만 · 글 1,348
                      </p>
                    </div>
                  </div>
                  <button
                    className="ml-auto"
                    onClick={() => setCurrentPage("hotNow")}
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* 인기글 카드 슬라이드 */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {/* 인기글 카드 1 */}
                  <div className="min-w-[280px] bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                        <span className="text-xs">福</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        메이플쌀먹러
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-500">
                        팔로워 부자
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">2시간 전</p>
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      메이플하면 쌀먹이지 ㅋㅋㅋ
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                      내가 메이플로 맨날 2시간씩 재획하는데 쌀먹 진짜
                      미첫습니다. 이렇게만 해도 한달에 40~50은 번다. ㅎㅎ
                    </p>
                    <img
                      src="https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png"
                      alt="썸네일"
                      className="w-full h-32 rounded-lg object-cover"
                    />
                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-4 mt-3 pt-3">
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
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
                        <span className="text-xs">7</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
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
                        <span className="text-xs">1</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 인기글 카드 2 */}
                  <div className="min-w-[280px] bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs">🎮</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        게임마스터
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-500">
                        공략왕
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">4시간 전</p>
                    <p className="text-sm font-bold text-gray-900 mb-2">
                      신규 보스 공략 총정리
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                      이번 업데이트로 추가된 신규 보스의 패턴과 공략법을
                      정리했습니다. 초보자도 쉽게 따라할 수 있는...
                    </p>
                    <img
                      src="https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg"
                      alt="썸네일"
                      className="w-full h-32 rounded-lg object-cover"
                    />
                    {/* 액션 버튼 */}
                    <div className="flex items-center gap-4 mt-3 pt-3">
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
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
                        <span className="text-xs">12</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
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
                        <span className="text-xs">5</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 선물 팝업 */}
      {showGiftPopup && (
        <div className="fixed inset-0 z-[10000]  flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowGiftPopup(false);
              setShowAwardHistory(false);
            }}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {showAwardHistory ? (
              // 수상내역 화면
              <>
                {/* 헤더 */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowAwardHistory(false)}>
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
                    <span className="text-lg font-bold">수상내역</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowGiftPopup(false);
                      setShowAwardHistory(false);
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-gray-400"
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

                {/* 총 수상 & 총 포인트 */}
                <div className="p-4">
                  <div className="flex items-center justify-center gap-8 bg-gray-50 rounded-xl p-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">총 수상</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xl">🏅</span>
                        <span className="text-2xl font-bold">26</span>
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gray-200"></div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">총 포인트</p>
                      <p className="text-2xl font-bold">2850P</p>
                    </div>
                  </div>
                </div>

                {/* 수상 리스트 */}
                <div className="px-4 pb-6 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-emerald-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🏆</span>
                        <span className="text-[10px] text-emerald-600">
                          논 한마지기
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">1000P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-cyan-100 flex flex-col items-center justify-center">
                        <span className="text-xl">⭐</span>
                        <span className="text-[10px] text-cyan-600">
                          황금쌀
                        </span>
                      </div>
                      <span className="text-lg font-medium">19</span>
                    </div>
                    <span className="text-gray-700 font-medium">500P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-pink-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🎁</span>
                        <span className="text-[10px] text-pink-600">
                          쌀가마
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">100P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-orange-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🍚</span>
                        <span className="text-[10px] text-orange-600">
                          밥 한공기
                        </span>
                      </div>
                      <span className="text-lg font-medium">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">50P</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-green-100 flex flex-col items-center justify-center">
                        <span className="text-xl">🌾</span>
                        <span className="text-[10px] text-green-600">
                          쌀 한톨
                        </span>
                      </div>
                      <span className="text-lg font-medium">1</span>
                    </div>
                    <span className="text-gray-700 font-medium">10P</span>
                  </div>
                </div>
              </>
            ) : (
              // 선물하기 화면
              <>
                {/* 상단 포인트 & 닫기 */}
                <div className="grid grid-cols-3 items-center p-4">
                  {/* 왼쪽 - 포인트 */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-white text-lg">🍚</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold">532P</p>
                      <p className="text-xs text-gray-400">내 포인트</p>
                    </div>
                  </div>
                  {/* 가운데 - 14개 보기 */}
                  <button
                    className="flex flex-col items-center justify-center mx-auto p-3 rounded-xl bg-amber-50"
                    onClick={() => setShowAwardHistory(true)}
                  >
                    <span className="text-2xl">🏆</span>
                    <span className="text-xs text-gray-500">
                      14개 보기 &gt;
                    </span>
                  </button>
                  {/* 오른쪽 - 닫기 */}
                  <div className="flex justify-end">
                    <button onClick={() => setShowGiftPopup(false)}>
                      <svg
                        className="w-6 h-6 text-gray-400"
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
                </div>

                {/* 상 선택 */}
                <div className="px-4 pb-4">
                  <p className="font-bold text-gray-900 mb-3">
                    상을 선택하세요
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-green-100">
                      <span className="text-3xl mb-1">🌾</span>
                      <span className="text-xs font-medium text-gray-700">
                        쌀 한톨
                      </span>
                      <span className="text-xs text-green-600 font-medium">
                        10P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-orange-100 ring-2 ring-orange-400">
                      <span className="text-3xl mb-1">🍚</span>
                      <span className="text-xs font-medium text-gray-700">
                        밥 한공기
                      </span>
                      <span className="text-xs text-orange-600 font-medium">
                        50P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-pink-100">
                      <span className="text-3xl mb-1">🎁</span>
                      <span className="text-xs font-medium text-gray-700">
                        쌀가마
                      </span>
                      <span className="text-xs text-pink-600 font-medium">
                        100P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-cyan-100">
                      <span className="text-3xl mb-1">⭐</span>
                      <span className="text-xs font-medium text-gray-700">
                        황금쌀
                      </span>
                      <span className="text-xs text-cyan-600 font-medium">
                        500P
                      </span>
                    </button>
                    <button className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-emerald-100">
                      <span className="text-3xl mb-1">🏆</span>
                      <span className="text-xs font-medium text-gray-700">
                        논 한마지기
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        1000P
                      </span>
                    </button>
                  </div>
                </div>

                {/* 안내 문구 */}
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-700">
                    콘텐츠 작성자는 <span className="font-bold">상</span>을 받을
                    자격이 있습니다.
                  </p>
                </div>

                {/* 메시지 입력 */}
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="text"
                      placeholder="메시지를 추가하세요"
                      className="flex-1 text-sm outline-none"
                    />
                    <span className="text-xs text-gray-400">0/100</span>
                  </div>
                </div>

                {/* 안내 */}
                <div className="px-4 pb-3">
                  <p className="text-xs text-gray-400">
                    수상과 함께 콘텐츠 제공자에게 감사와 응원의 메시지를
                    남겨주세요.
                  </p>
                </div>

                {/* 익명 체크박스 */}
                <div className="px-4 pb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      익명으로 기부하기
                    </span>
                  </label>
                </div>

                {/* 상 주기 버튼 */}
                <div className="px-4 pb-4">
                  <button
                    className="w-full py-4 rounded-full text-white font-bold text-lg"
                    style={{ backgroundColor: "#72C2FF" }}
                    onClick={() => setShowGiftPopup(false)}
                  >
                    상 주기
                  </button>
                </div>

                {/* 하단 안내 */}
                <div className="px-4 pb-6">
                  <p className="text-xs text-center text-gray-400">
                    진행하시면 당사의{" "}
                    <span className="text-blue-500 underline">운영약관</span>에
                    동의하시는 것입니다.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 보기 팝업 */}
      {showViewPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowViewPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold">POST VIEW</span>
              <button onClick={() => setShowViewPopup(false)}>
                <svg
                  className="w-6 h-6 text-gray-400"
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

            {/* 내용 */}
            <div className="p-4">
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setViewType("목록형");
                  setShowViewPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">목록형</span>
                </div>
                {viewType === "목록형" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setViewType("카드형");
                  setShowViewPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 5h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 9h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                  </svg>
                  <span className="text-sm text-gray-700">카드형</span>
                </div>
                {viewType === "카드형" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 하단 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <img
            src="https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png"
            alt="프로필"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 cursor-pointer"
            onClick={() => setShowWriteForm(true)}
          >
            <span className="text-sm text-gray-400">
              무슨 생각을 하고 있나요?
            </span>
          </div>
        </div>
      </div>

      {/* 글쓰기 폼 */}
      {showWriteForm && (
        <div className="fixed inset-0 z-50 bg-gray-100">
          {/* 헤더 */}
          <div className="sticky top-0 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <button onClick={() => setShowWriteForm(false)}>
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
            <button
              className="text-sm font-medium"
              style={{ color: "#72C2FF" }}
            >
              남기기
            </button>
          </div>

          {/* 본문 */}
          <div className="bg-white px-4 py-4">
            {/* 제목 입력 */}
            <input
              type="text"
              placeholder="(선택) 제목을 입력해주세요"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full text-lg text-gray-700 placeholder-gray-400 outline-none pb-4 border-b border-gray-200"
            />

            {/* 내용 입력 */}
            <div className="pt-4">
              <textarea
                placeholder="광고, 비난, 도배성 글을 남기면 영구적으로 활동이 제한될 수 있어요. 건강한 커뮤니티 문화를 함께 만들어가요."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="w-full h-40 text-sm text-gray-700 placeholder-gray-400 outline-none resize-none"
              />
              <p className="text-sm text-gray-400 mt-2">
                자세한 내용은{" "}
                <span className="text-blue-500 underline">
                  커뮤니티 이용규칙
                </span>
                을 참고해주세요.
              </p>
            </div>
          </div>

          {/* 외부 공유 허용됨 */}
          <div className="bg-white mt-2 px-4 py-3 border-t border-gray-100">
            <span className="text-sm text-gray-700">외부 공유 허용됨</span>
          </div>

          {/* 하단 툴바 */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                  <span className="text-xs font-bold border border-gray-400 rounded px-1">
                    GIF
                  </span>
                  GIF
                </button>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  사진
                </button>
                <button className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  투표
                </button>
              </div>
              <button className="text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 검색 화면 */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* 검색 헤더 */}
          <div className="sticky top-0 bg-white px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSearch(false)}>
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
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="메이플스토리에서 찾기"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")}>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 최근 검색어 */}
          {!searchQuery && (
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">최근 검색어</h3>
                <button className="text-sm text-gray-400">전체 삭제</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["보스 공략", "레벨업", "신규 이벤트", "무료 쿠폰"].map(
                  (keyword) => (
                    <button
                      key={keyword}
                      className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center gap-1"
                      onClick={() => setSearchQuery(keyword)}
                    >
                      {keyword}
                      <svg
                        className="w-4 h-4 text-gray-400"
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
                  ),
                )}
              </div>
            </div>
          )}

          {/* 검색 결과 */}
          {searchQuery && (
            <div className="px-4 py-4">
              <p className="text-sm text-gray-500 mb-4">
                '
                <span className="font-medium text-gray-900">{searchQuery}</span>
                ' 검색 결과
              </p>
              <div className="space-y-3">
                {posts
                  .filter((post) =>
                    post.content
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .map((post) => (
                    <div
                      key={post.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                      onClick={() => setShowSearch(false)}
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt="썸네일"
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 line-clamp-2">
                          {post.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {post.author} · {post.time}
                        </p>
                      </div>
                    </div>
                  ))}
                {posts.filter((post) =>
                  post.content
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
                ).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">검색 결과가 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 게시글 상세 */}
      {selectedPost && (
        <div className="fixed inset-0 z-[9999] flex justify-center bg-black/50">
          <div className="w-full max-w-md h-full bg-white overflow-y-auto">
            {/* 헤더 */}
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <button
                onClick={() => {
                  if (initialPostId) {
                    goBack?.();
                  } else {
                    window.history.back();
                  }
                }}
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
              <span className="text-lg font-bold">게시글</span>
              <div className="w-6"></div>
            </div>

            {/* 게시글 내용 */}
            <div className="p-4">
              {/* 작성자 정보 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPost.avatar}
                    alt={selectedPost.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1 flex-wrap">
                      <p className="font-bold text-gray-900">
                        {selectedPost.author}
                      </p>
                      {selectedPost.badges &&
                        selectedPost.badges.map(
                          (badge: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600"
                            >
                              {badge}
                            </span>
                          ),
                        )}
                    </div>
                    <p className="text-xs text-gray-400">{selectedPost.time}</p>
                  </div>
                </div>
                <button
                  className="text-sm"
                  style={{
                    color: followedUsers.includes(selectedPost.author)
                      ? "#9CA3AF"
                      : "#72C2FF",
                  }}
                  onClick={() => {
                    if (followedUsers.includes(selectedPost.author)) {
                      setFollowedUsers(
                        followedUsers.filter(
                          (user) => user !== selectedPost.author,
                        ),
                      );
                    } else {
                      setFollowedUsers([...followedUsers, selectedPost.author]);
                    }
                  }}
                >
                  {followedUsers.includes(selectedPost.author)
                    ? "팔로잉"
                    : "팔로우"}
                </button>
              </div>

              {/* 본문 */}
              <div className="mb-4">
                <p className="text-gray-900 leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>

              {/* 이미지 */}
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt="게시글 이미지"
                  className="w-full rounded-xl mb-4 object-cover"
                />
              )}

              {/* 액션 버튼 */}
              <div className="flex items-center justify-between py-3 border-t border-b border-gray-100">
                <div className="flex items-center gap-5">
                  {/* 좋아요 */}
                  <button
                    className={`flex items-center gap-1 ${
                      likedPosts.includes(selectedPost.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => {
                      if (likedPosts.includes(selectedPost.id)) {
                        setLikedPosts(
                          likedPosts.filter((id) => id !== selectedPost.id),
                        );
                      } else {
                        setLikedPosts([...likedPosts, selectedPost.id]);
                      }
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={
                        likedPosts.includes(selectedPost.id)
                          ? "currentColor"
                          : "none"
                      }
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
                    <span className="text-sm">
                      {likedPosts.includes(selectedPost.id)
                        ? selectedPost.likes + 1
                        : selectedPost.likes}
                    </span>
                  </button>
                  {/* 댓글 */}
                  <button className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="w-5 h-5"
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
                    <span className="text-sm">{selectedPost.comments}</span>
                  </button>
                  {/* 리트윗 */}
                  <button className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  {/* 공유 */}
                  <button className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {/* 선물 */}
                  <button
                    className="text-gray-500"
                    onClick={() => setShowGiftPopup(true)}
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
                        strokeWidth={1.5}
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                  </button>
                  {/* 더보기 */}
                  <div className="relative">
                    <button
                      className="text-gray-500"
                      onClick={() =>
                        setShowMoreMenu(
                          showMoreMenu === selectedPost.id
                            ? null
                            : selectedPost.id,
                        )
                      }
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm6 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                      </svg>
                    </button>

                    {/* 더보기 메뉴 */}
                    {showMoreMenu === selectedPost.id && (
                      <div className="absolute right-0 bottom-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[120px] z-10">
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>저장</span>
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
                              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>차단</span>
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
                        </button>
                        <button
                          className="w-full px-4 py-2 flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowMoreMenu(null)}
                        >
                          <span>신고</span>
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
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 이 작성자의 다른 글 */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">
                    이 작성자의 다른 글
                  </h3>
                  <button className="text-sm text-gray-400 flex items-center gap-1">
                    더 보기
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {/* 다른 글 카드 1 */}
                  <div className="min-w-[200px] bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">
                        2025년 12월 24일 · 메이플
                      </p>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        메이플 쌀먹 야무지내 ㅋㅋ
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      보스 레이드 클리어
                    </p>
                  </div>

                  {/* 다른 글 카드 2 */}
                  <div className="min-w-[200px] bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">
                        2025년 12월 20일 · 메이플
                      </p>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        오늘 1재획 했따 ㅎ
                      </p>
                      <p className="text-sm text-gray-700">이게 게임이지</p>
                    </div>
                    <p className="text-xs text-blue-500 mt-4">레벨업 달성!</p>
                  </div>

                  {/* 다른 글 카드 3 */}
                  <div className="min-w-[200px] bg-gray-50 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-gray-400 mb-2">
                        2025년 12월 15일 · 메이플
                      </p>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        오늘의 수확
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      아이템 파밍 완료
                    </p>
                  </div>
                </div>
              </div>
              {/* 댓글 섹션 */}
              <div className="mt-4">
                <p className="font-bold text-gray-900 mb-4">
                  댓글 {selectedPost.comments}개
                </p>

                {/* 댓글 리스트 */}
                <div className="space-y-4">
                  {/* 댓글 1 */}
                  <div className="flex gap-3">
                    <img
                      src="https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png"
                      alt="댓글 작성자"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          게임러버
                        </span>
                        <span className="text-xs text-gray-400">10분 전</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        오 대박 축하해요!! 저도 빨리 클리어하고 싶다 ㅠㅠ
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="text-xs text-gray-400">답글</button>
                        <button className="flex items-center gap-1 text-xs text-gray-400">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          3
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 댓글 2 */}
                  <div className="flex gap-3">
                    <img
                      src="https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif"
                      alt="댓글 작성자"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          쌀먹고수
                        </span>
                        <span className="text-xs text-gray-400">30분 전</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        어떤 직업으로 깼어요? 저도 도전해볼까 고민중
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="text-xs text-gray-400">답글</button>
                        <button className="flex items-center gap-1 text-xs text-gray-400">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          1
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 댓글 3 */}
                  <div className="flex gap-3">
                    <img
                      src="https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif"
                      alt="댓글 작성자"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          초보자123
                        </span>
                        <span className="text-xs text-gray-400">1시간 전</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">
                        ㅋㅋㅋ 부럽다 진짜
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="text-xs text-gray-400">답글</button>
                        <button className="flex items-center gap-1 text-xs text-gray-400">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          0
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 더보기 */}
                <button className="w-full py-3 text-sm text-gray-500 mt-4">
                  댓글 더보기
                </button>
              </div>
            </div>

            {/* 하단 댓글 입력 */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png"
                  alt="내 프로필"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                <button
                  style={{ color: "#72C2FF" }}
                  className="font-medium text-sm"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 팝업 */}
      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          isFollowing={followedUsers.includes(selectedProfile.author)}
          onFollow={() => {
            if (followedUsers.includes(selectedProfile.author)) {
              setFollowedUsers(
                followedUsers.filter((user) => user !== selectedProfile.author),
              );
            } else {
              setFollowedUsers([...followedUsers, selectedProfile.author]);
            }
          }}
          onClose={() => {
            if (initialProfileOpen && goBack) {
              goBack();
            } else {
              setSelectedProfile(null);
            }
          }}
        />
      )}
      {/* 정렬 팝업 */}
      {showSortPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSortPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
            {/* 헤더 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-bold">글 정렬</span>
              <button onClick={() => setShowSortPopup(false)}>
                <svg
                  className="w-6 h-6 text-gray-400"
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

            {/* 정렬 옵션 */}
            <div className="p-4">
              {/* 인증글 - 메달 */}
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setSortType("인증글");
                  setShowSortPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-6 h-6 ${
                      sortType === "인증글" ? "text-gray-900" : "text-gray-400"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath id="adminBadgeClip">
                        <path d="M12.00 1.80 L13.55 3.20 L15.60 2.76 L16.24 4.76 L18.24 5.40 L17.80 7.45 L19.20 9.00 L17.80 10.55 L18.24 12.60 L16.24 13.24 L15.60 15.24 L13.55 14.80 L12.00 16.20 L10.45 14.80 L8.40 15.24 L7.76 13.24 L5.76 12.60 L6.20 10.55 L4.80 9.00 L6.20 7.45 L5.76 5.40 L7.76 4.76 L8.40 2.76 L10.45 3.20 Z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M12.00 1.80 L13.55 3.20 L15.60 2.76 L16.24 4.76 L18.24 5.40 L17.80 7.45 L19.20 9.00 L17.80 10.55 L18.24 12.60 L16.24 13.24 L15.60 15.24 L13.55 14.80 L12.00 16.20 L10.45 14.80 L8.40 15.24 L7.76 13.24 L5.76 12.60 L6.20 10.55 L4.80 9.00 L6.20 7.45 L5.76 5.40 L7.76 4.76 L8.40 2.76 L10.45 3.20 Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                    <g clipPath="url(#adminBadgeClip)">
                      <path
                        d="M6 3.2 L18.5 15.7 L16.5 17.7 L4 5.2 Z"
                        fill="currentColor"
                        opacity="0.18"
                      />
                    </g>
                    <path
                      d="M9 14.4 V22 L12 20 L15 22 V14.4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className={`text-sm ${
                      sortType === "인증글"
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    인증글
                  </span>
                </div>
                {sortType === "인증글" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* 인기순 - 우주선 */}
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setSortType("인기순");
                  setShowSortPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-6 h-6 ${
                      sortType === "인기순" ? "text-gray-900" : "text-gray-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15.22 8.6c-.6-3.51-2.68-6.21-4.76-7.47a.912.912 0 00-.93 0C7.59 2.3 5.37 4.89 4.76 8.61c-2.77 2.65-4.02 4.46-3.57 7.32.17 1.08 1.14 1.9 2.27 1.9h3.18c.61.72 1.53 1.17 2.51 1.17h1.71c.98 0 1.9-.44 2.51-1.17h3.18c1.12 0 2.1-.82 2.27-1.9.45-2.87-.8-4.67-3.59-7.33h-.01zM2.97 15.65c-.24-1.53.15-2.65 1.66-4.33.1 1.83.55 3.45 1.06 4.71H3.46c-.24 0-.45-.17-.49-.38zm6.18 1.55c-.57 0-1.09-.32-1.33-.81-.64-1.31-1.41-3.37-1.41-5.78 0-3.71 1.84-6.34 3.6-7.63 1.81 1.35 3.6 4.16 3.6 7.63 0 2.41-.77 4.47-1.41 5.78-.24.49-.77.81-1.33.81H9.15zm7.88-1.55c-.03.21-.25.38-.49.38h-2.23c.51-1.26.96-2.88 1.06-4.71 1.51 1.69 1.9 2.8 1.66 4.33z" />
                  </svg>
                  <span
                    className={`text-sm ${
                      sortType === "인기순"
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    인기순
                  </span>
                </div>
                {sortType === "인기순" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* 인기 급상승 - 별똥별 */}
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setSortType("인기 급상승");
                  setShowSortPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 ${
                      sortType === "인기 급상승"
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17.8 2.6 l2.1 4.6 5 .4 -3.7 3.2 1.3 4.9 -4.7 -2.8 -4.7 2.8 1.3 -4.9 -3.7 -3.2 5 -.4 Z" />
                    <path d="M2.8 16.9l4.6-1.6" />
                    <path d="M4.2 19.9l5.6-2" />
                  </svg>
                  <span
                    className={`text-sm ${
                      sortType === "인기 급상승"
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    인기 급상승
                  </span>
                </div>
                {sortType === "인기 급상승" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* 최신순 - 시계 + 오른쪽 위 화살표 */}
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setSortType("최신순");
                  setShowSortPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-6 h-6 ${
                      sortType === "최신순" ? "text-gray-900" : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" d="M20 12a8 8 0 11-5-7.4" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l-3 3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 4l4 0l0 4"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 4l-4 4"
                    />
                    <circle cx="17" cy="7" r="0.5" fill="currentColor" />
                  </svg>
                  <span
                    className={`text-sm ${
                      sortType === "최신순"
                        ? "text-gray-900 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    최신순
                  </span>
                </div>
                {sortType === "최신순" && (
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
