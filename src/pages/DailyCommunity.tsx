import { useState, useEffect, Fragment } from "react";
import ProfilePopup from "../components/ProfilePopup";
import PostCardFull from "../components/community/PostCardFull";
import PostListItem from "../components/community/PostListItem";
import PostDetail from "../components/community/PostDetail";
import GiftPopup from "../components/community/GiftPopup";
import MoreMenu from "../components/community/MoreMenu";
import AdCard from "../components/community/AdCard";
import AdListItem from "../components/community/AdListItem";
import GalleryManagementPopup from "../components/GalleryManagementPopup";
import {
  ToastProvider,
  useToast,
  TOAST_MESSAGES,
} from "../components/community/Toast";
import {
  useFollow,
  FollowProvider,
} from "../components/community/FollowContext";
import type { PostData } from "../components/community/types";
import { initialPosts } from "../components/community/postsData";

// ===== 광고 데이터 =====
const cardAd = {
  id: "ad-channel-card",
  avatar: "💰",
  avatarBg: "#FED7AA",
  name: "토스 출석체크",
  time: "광고",
  media: {
    type: "image" as const,
    src: "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
  },
  title: "매일 출석체크하고 포인트 받자! 연속 출석 보너스까지",
  link: "https://example.com",
};

const listAd = {
  id: "ad-channel-list",
  thumbnail:
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
  name: "토스 출석체크",
  description: "퀴즈 맞추고 기프티콘 받자! 오늘의 정답 공개",
  link: "https://example.com",
};

// ===== 갤러리 정보 =====
const galleryInfo = {
  name: "생활테크",
  icon: "💰",
  color: "bg-gradient-to-br from-yellow-400 to-amber-500",
  banner:
    "https://www.venturesquare.net/wp-content/uploads/2021/09/mobile-phone-5836879_1280.png",
  description: "이벤트 참여 & 당첨 인증 커뮤니티",
  manager: "쌀먹마스터",
  subManagers: ["이벤트헌터", "복권의신"],
  memberCount: 12453,
};

// ===== 카테고리 탭 =====
const categoryTabs = ["전체", "공략/팁", "질문", "인증/자랑", "장터"];

// ===== 정렬 옵션 =====
const sortOptions = [
  { id: "verified", label: "인증글", icon: "✅" },
  { id: "best", label: "베스트", icon: "⭐" },
  { id: "all", label: "전체글", icon: "📋" },
];

// ===== Props =====
interface DailyCommunityProps {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  initialProfileOpen?: boolean;
  initialPostId?: number;
}

// ===== 메인 컴포넌트 =====
function DailyCommunityContent({
  setCurrentPage,
  goBack,
  initialProfileOpen = false,
  initialPostId,
}: DailyCommunityProps) {
  const { showToast } = useToast();

  // ===== 상태 =====
  const [activeTab, setActiveTab] = useState("전체");
  const [sortType, setSortType] = useState("all");
  const [viewType, setViewType] = useState<"card" | "list">("card");
  const [isGalleryFollowed, setIsGalleryFollowed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [showManagementPopup, setShowManagementPopup] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [writeCategory, setWriteCategory] = useState("전체");
  const [writeImages, setWriteImages] = useState<string[]>([]);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  // 게시글 상태
  const [posts, setPosts] = useState<PostData[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);

  // FollowContext 연결
  const { isFollowing, toggleFollow } = useFollow();

  // 팝업 상태
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [moreMenuPost, setMoreMenuPost] = useState<PostData | null>(null);
  const [moreMenuPosition, setMoreMenuPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  // ===== 초기 상태 설정 =====
  useEffect(() => {
    if (initialProfileOpen) {
      setSelectedProfile({
        author: "블루아카이브러버",
        avatar: "https://i.pravatar.cc/100?img=12",
        badges: ["Lv.15", "쌀먹마스터"],
      });
    }
  }, [initialProfileOpen]);

  useEffect(() => {
    if (initialPostId) {
      const post = posts.find((p) => p.id === initialPostId);
      if (post) setSelectedPost(post);
    }
  }, [initialPostId, posts]);

  // ===== 핸들러 =====
  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      setLikedPosts((prev) => [...prev, postId]);
      setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    }
  };

  const toggleDislike = (postId: number) => {
    if (dislikedPosts.includes(postId)) {
      setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      setDislikedPosts((prev) => [...prev, postId]);
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    }
  };

  const handleShowMoreMenu = (
    post: PostData,
    position: { top: number; right: number },
  ) => {
    setMoreMenuPost(post);
    setMoreMenuPosition(position);
  };

  // ===== 필터링된 게시글 =====
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "전체") return true;
    // 카테고리 필터링 로직 (실제로는 post.category로 필터링)
    return true;
  });

  // ===== 게시글 상세 열려있을 때 =====
  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        isLiked={likedPosts.includes(selectedPost.id)}
        isDisliked={dislikedPosts.includes(selectedPost.id)}
        isFollowed={isFollowing(selectedPost.name)}
        onLike={() => toggleLike(selectedPost.id)}
        onDislike={() => toggleDislike(selectedPost.id)}
        onFollow={() => toggleFollow(selectedPost.name)}
        onClose={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== 헤더 ===== */}
      <div className="sticky top-0 z-50 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="p-1 -ml-1">
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {galleryInfo.name}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-600 font-medium">
              인기
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowSearch(true)} className="p-2">
            <svg
              className="w-5 h-5 text-gray-600"
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
          <button
            onClick={() => setIsGalleryFollowed(!isGalleryFollowed)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
              isGalleryFollowed
                ? "bg-gray-100 text-gray-500"
                : "bg-[#72C2FF] text-white"
            }`}
          >
            {isGalleryFollowed ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>

      {/* ===== 배너 이미지 ===== */}
      <div className="w-full h-36 overflow-hidden">
        <img
          src={galleryInfo.banner}
          alt="배너"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ===== 갤러리 정보 (웹 버전 스타일) ===== */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${galleryInfo.color}`}
          >
            {galleryInfo.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[18px] font-bold text-gray-900">
              {galleryInfo.name}
            </h1>
            <button
              onClick={() => setShowManagementPopup(true)}
              className="text-[12px] text-gray-500 mt-0.5 flex items-center gap-1 active:text-[#72C2FF]"
            >
              <span>
                매니저 {galleryInfo.manager} | 부매니저{" "}
                {galleryInfo.subManagers.join(", ")}
              </span>
              <svg
                className="w-3.5 h-3.5 text-gray-400"
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
            <p className="text-[12px] text-gray-400 mt-0.5">
              {galleryInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* ===== 정렬 옵션 + 뷰 전환 (팔로잉 페이지 스타일) ===== */}
      <div className="sticky top-[57px] z-40 bg-white flex items-center gap-1 px-4 py-2 border-b border-gray-100">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSortType(option.id)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1 transition-colors ${
              sortType === option.id
                ? "bg-[#72C2FF] text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {option.id === "verified" && (
              <img
                src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
                alt=""
                className="w-4 h-4"
              />
            )}
            {option.label}
          </button>
        ))}
        <div className="flex-1" />

        {/* 보기 전환 버튼 */}
        <button
          className="text-gray-400"
          onClick={() => setShowViewPopup(true)}
        >
          {viewType === "list" ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v1.43H3.8V5.3c0-.83.67-1.5 1.5-1.5zm10.9 4.73v2.93H3.8V8.53h12.4zm-1.5 7.67H5.3c-.83 0-1.5-.67-1.5-1.5v-1.43h12.4v1.43c0 .83-.67 1.5-1.5 1.5z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z" />
            </svg>
          )}
        </button>
      </div>

      {/* ===== 카테고리 드롭다운 ===== */}
      <div className="bg-white px-4 py-2 border-b border-gray-100">
        <button
          className="flex items-center gap-1 text-[13px] text-gray-700"
          onClick={() => setShowCategoryPopup(true)}
        >
          {activeTab}
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* ===== 게시글 목록 ===== */}
      <div className="bg-white px-4 pb-20">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-[15px] font-medium text-gray-500">
              게시글이 없어요
            </p>
            <p className="text-[13px] text-gray-400 mt-1">
              첫 번째 글을 작성해보세요!
            </p>
          </div>
        ) : viewType === "card" ? (
          // 카드형
          filteredPosts.map((post, index) => (
            <Fragment key={post.id}>
              <PostCardFull
                post={post}
                index={index}
                isLiked={likedPosts.includes(post.id)}
                isDisliked={dislikedPosts.includes(post.id)}
                isFollowed={isFollowing(post.name)}
                onLike={() => toggleLike(post.id)}
                onDislike={() => toggleDislike(post.id)}
                onFollow={() => toggleFollow(post.name)}
                onShowGiftPopup={() => setShowGiftPopup(true)}
                onShowProfile={() => setSelectedProfile(post)}
                onShowMoreMenu={(position) =>
                  handleShowMoreMenu(post, position)
                }
                onClick={() => setSelectedPost(post)}
              />
              {/* 첫 번째 게시글 뒤에 광고 */}
              {index === 0 && <AdCard ad={cardAd} index={index + 1} />}
            </Fragment>
          ))
        ) : (
          // 목록형
          filteredPosts.map((post, index) => (
            <Fragment key={post.id}>
              <PostListItem
                post={post}
                index={index}
                isLiked={likedPosts.includes(post.id)}
                isDisliked={dislikedPosts.includes(post.id)}
                isFollowed={isFollowing(post.name)}
                onLike={() => toggleLike(post.id)}
                onDislike={() => toggleDislike(post.id)}
                onFollow={() => toggleFollow(post.name)}
                onComment={() => setSelectedPost(post)}
                onGift={() => setShowGiftPopup(true)}
                onShowMoreMenu={(position) =>
                  handleShowMoreMenu(post, position)
                }
                onClick={() => setSelectedPost(post)}
              />
              {/* 첫 번째 게시글 뒤에 광고 */}
              {index === 0 && <AdListItem ad={listAd} index={index + 1} />}
            </Fragment>
          ))
        )}
      </div>

      {/* ===== 하단 입력창 ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 max-w-md mx-auto z-40">
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

      {/* ===== 팝업들 ===== */}

      {/* 선물 팝업 */}
      {showGiftPopup && <GiftPopup onClose={() => setShowGiftPopup(false)} />}

      {/* 더보기 메뉴 */}
      <MoreMenu
        post={moreMenuPost}
        position={moreMenuPosition}
        onClose={() => {
          setMoreMenuPost(null);
          setMoreMenuPosition(null);
        }}
      />

      {/* 프로필 팝업 */}
      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* 카테고리 팝업 */}
      {showCategoryPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowCategoryPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md py-4 animate-slideUp">
            <div className="px-4 pb-3 border-b border-gray-100">
              <h3 className="text-[16px] font-bold text-gray-900">카테고리</h3>
            </div>
            <div className="px-4 py-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  className={`w-full flex items-center gap-3 py-3 ${activeTab === tab ? "text-[#72C2FF]" : "text-gray-700"}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowCategoryPopup(false);
                  }}
                >
                  <span className="text-[15px]">{tab}</span>
                  {activeTab === tab && (
                    <svg
                      className="w-5 h-5 ml-auto"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 뷰 타입 팝업 */}
      {showViewPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowViewPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md animate-slideUp">
            {/* 핸들바 */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* 내용 */}
            <div className="p-4">
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setViewType("list");
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
                {viewType === "list" && (
                  <svg
                    className="w-5 h-5 text-[#72C2FF]"
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
                  setViewType("card");
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
                {viewType === "card" && (
                  <svg
                    className="w-5 h-5 text-[#72C2FF]"
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

      {/* 글쓰기 폼 */}
      {showWriteForm && (
        <div className="fixed inset-0 z-50 bg-white max-w-md mx-auto flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-[16px] font-bold text-gray-900">글쓰기</h2>
            <div className="w-6" />
          </div>

          {/* 본문 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* 갤러리 정보 */}
            <div className="flex items-center gap-1 text-[14px]">
              <span className="font-semibold text-gray-900">
                {galleryInfo.name}
              </span>
              <span className="text-gray-400">갤러리에 글 작성</span>
            </div>

            {/* 카테고리 선택 */}
            <div className="flex flex-wrap gap-2">
              {categoryTabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setWriteCategory(cat)}
                  className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                    writeCategory === cat
                      ? "bg-[#72C2FF] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 제목 입력 */}
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3.5 text-[15px] bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72C2FF]/30 focus:bg-white transition-all placeholder:text-gray-400"
            />

            {/* 내용 입력 + 투표 */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <textarea
                placeholder="내용을 입력하세요"
                value={postContent}
                onChange={(e) => {
                  if (e.target.value.length <= 2000) {
                    setPostContent(e.target.value);
                  }
                }}
                rows={showPoll ? 4 : 8}
                className="w-full px-4 py-3.5 text-[15px] bg-transparent focus:outline-none placeholder:text-gray-400 resize-none"
              />

              {/* 투표 UI */}
              {showPoll && (
                <div className="px-4 pb-4 space-y-2">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`선택지 ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions];
                          newOptions[index] = e.target.value;
                          setPollOptions(newOptions);
                        }}
                        maxLength={50}
                        className="flex-1 px-4 py-3 text-[14px] bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#72C2FF] placeholder:text-gray-400"
                      />
                      {pollOptions.length > 2 && (
                        <button
                          onClick={() =>
                            setPollOptions(
                              pollOptions.filter((_, i) => i !== index),
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center text-gray-400"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-1">
                    {pollOptions.length < 5 ? (
                      <button
                        onClick={() => setPollOptions([...pollOptions, ""])}
                        className="flex items-center gap-1 text-[13px] text-[#72C2FF] font-medium"
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
                            strokeWidth={2}
                            d="M12 5v14m-7-7h14"
                          />
                        </svg>
                        선택지 추가
                      </button>
                    ) : (
                      <span className="text-[12px] text-gray-400">
                        최대 5개
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setShowPoll(false);
                        setPollOptions(["", ""]);
                      }}
                      className="text-[13px] text-gray-400"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 이미지 미리보기 */}
            {writeImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {writeImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`업로드 이미지 ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() =>
                        setWriteImages(
                          writeImages.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 하단 툴바 */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-1">
              {/* 이미지 첨부 */}
              <input
                type="file"
                id="imageUpload"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    Array.from(files).forEach((file) => {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setWriteImages((prev) => [
                            ...prev,
                            event.target!.result as string,
                          ]);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                }}
                accept="image/*"
                multiple
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="p-2 text-gray-500 rounded-lg cursor-pointer"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </label>

              {/* 이모지 */}
              <button className="p-2 text-gray-500 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </button>

              {/* 투표 */}
              <button
                onClick={() => setShowPoll(!showPoll)}
                className={`p-2 rounded-lg ${showPoll ? "text-[#72C2FF] bg-[#E8F4FD]" : "text-gray-500"}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                  <rect x="9" y="3" width="6" height="4" rx="1" />
                  <path d="M9 14l2 2 4-4" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* 남은 글자 수 */}
              <span
                className={`text-[13px] ${2000 - postContent.length < 100 ? "text-red-500" : "text-gray-400"}`}
              >
                {(2000 - postContent.length).toLocaleString()}
              </span>

              {/* 남기기 버튼 */}
              <button
                onClick={() => {
                  // 새 게시글 생성
                  const newPost: PostData = {
                    id: Date.now(),
                    avatar: "🍚",
                    avatarBg: "linear-gradient(135deg,#72C2FF,#4AABF5)",
                    name: "나",
                    badge: "",
                    meta: `방금 전 · ${writeCategory}`,
                    title: postTitle.trim(),
                    body: postContent.trim(),
                    likes: 0,
                    dislikes: 0,
                    comments: 0,
                    views: 0,
                    boardId: galleryInfo.name,
                    authorId: "me",
                    isVerified: false,
                    createdAt: Date.now(),
                    images: writeImages.length > 0 ? writeImages : undefined,
                    category: writeCategory,
                    poll:
                      showPoll &&
                      pollOptions.filter((opt) => opt.trim()).length >= 2
                        ? {
                            question: "투표", // ← 이 줄 추가
                            options: pollOptions
                              .filter((opt) => opt.trim())
                              .map((text) => ({ text: text.trim(), votes: 0 })),
                            totalVotes: 0,
                          }
                        : undefined,
                  };

                  // 게시글 목록 맨 앞에 추가
                  setPosts([newPost, ...posts]);

                  // 폼 초기화
                  showToast("글이 등록되었어요");
                  setShowWriteForm(false);
                  setPostTitle("");
                  setPostContent("");
                  setWriteCategory("전체");
                  setWriteImages([]);
                  setShowPoll(false);
                  setPollOptions(["", ""]);
                }}
                disabled={!postTitle.trim() || !postContent.trim()}
                className={`px-5 py-2 text-[14px] font-semibold rounded-lg transition-all ${
                  postTitle.trim() && postContent.trim()
                    ? "bg-[#72C2FF] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                남기기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 검색 화면 */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white max-w-md mx-auto">
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
                  placeholder={`${galleryInfo.name}에서 검색`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[14px]"
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
          <div className="p-4">
            <p className="text-[14px] text-gray-400 text-center py-8">
              검색어를 입력해주세요
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.4s ease-out both; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 갤러리 관리 내역 팝업 */}
      {showManagementPopup && (
        <GalleryManagementPopup
          galleryName={galleryInfo.name}
          manager={galleryInfo.manager}
          subManagers={galleryInfo.subManagers}
          onClose={() => setShowManagementPopup(false)}
        />
      )}
    </div>
  );
}

// ===== ToastProvider 래퍼 =====
export default function DailyCommunity(props: DailyCommunityProps) {
  return (
    <ToastProvider>
      <FollowProvider>
        <DailyCommunityContent {...props} />
      </FollowProvider>
    </ToastProvider>
  );
}
