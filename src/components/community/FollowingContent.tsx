import { useState, useRef, useEffect, Fragment } from "react";
import type { PostData } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { useFollow } from "./FollowContext";
import { tabs, initialPosts } from "./postsData";
import PostCardFull from "./PostCardFull";
import PostListItem from "./PostListItem";
import PostDetail from "./PostDetail";
import GiftPopup from "./GiftPopup";
import ProfilePopup from "../ProfilePopup";
import MoreMenu from "./MoreMenu";
import AdCard from "./AdCard";
import AdListItem from "./AdListItem";

// ===== 광고 데이터 =====
const cardAd = {
  id: "ad-following-card",
  avatar: "⚔️",
  avatarBg: "#FEE2E2",
  name: "삼국지 전략",
  time: "광고",
  media: {
    type: "image" as const,
    src: "https://picsum.photos/800/450?random=ad3",
  },
  title: "전략의 대가가 되어보세요! 지금 가입하면 황금 10,000 지급",
  link: "https://example.com",
};

const listAd = {
  id: "ad-following-list",
  thumbnail: "https://picsum.photos/100/100?random=ad4",
  name: "삼국지 전략",
  description:
    "무과금으로도 최강! 전략만으로 천하통일하세요. 지금 시작하면 5성 장수 무료!",
  link: "https://example.com",
};

interface FollowingContentProps {
  setCurrentPage: (page: string) => void;
}

export default function FollowingContent({
  setCurrentPage,
}: FollowingContentProps) {
  const { showToast } = useToast();

  // State
  const [activeTab, setActiveTab] = useState("전체");
  const [subTab, setSubTab] = useState("전체글");
  // const [viewType, setViewType] = useState("카드형"); // 뷰타입 주석처리 - 카드형만 사용
  // const [showViewPopup, setShowViewPopup] = useState(false); // 뷰타입 팝업 주석처리
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const { isFollowing, toggleFollow } = useFollow();
  const [followedPosts, setFollowedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [moreMenuPost, setMoreMenuPost] = useState<PostData | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  // 스크롤 상태
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -120, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 120, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  // 필터링
  const filteredPosts = initialPosts.filter((post) => {
    const tabMatch =
      activeTab === "전체" ||
      post.boardId === activeTab ||
      post.authorId === activeTab ||
      post.name === activeTab;
    const subTabMatch =
      subTab === "전체글" ||
      (subTab === "인증글" && post.isVerified) ||
      (subTab === "베스트" && post.likes >= 200);
    return tabMatch && subTabMatch;
  });

  const toggleLike = (id: number) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setDislikedPosts((prev) => prev.filter((x) => x !== id));
  };

  const toggleDislike = (id: number) => {
    setDislikedPosts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setLikedPosts((prev) => prev.filter((x) => x !== id));
  };

  const toggleFollowPost = (postId: number) => {
    setFollowedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((x) => x !== postId)
        : [...prev, postId],
    );
  };

  const handlePostClick = (post: PostData) => {
    setSelectedPost(post);
  };

  // 게시글 상세 모드
  if (selectedPost) {
    return (
      <>
        <PostDetail
          post={selectedPost}
          isLiked={likedPosts.includes(selectedPost.id)}
          isDisliked={dislikedPosts.includes(selectedPost.id)}
          isFollowed={isFollowing(selectedPost.name)}
          onLike={() => toggleLike(selectedPost.id)}
          onDislike={() => toggleDislike(selectedPost.id)}
          onFollow={() => toggleFollow(selectedPost.name)}
          onShowGiftPopup={() => setShowGiftPopup(true)}
          onClose={() => setSelectedPost(null)}
        />
        {showGiftPopup && <GiftPopup onClose={() => setShowGiftPopup(false)} />}
      </>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 상단 탭 */}
      <div className="sticky top-0 z-40 bg-white px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {showLeftArrow && (
            <button
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0"
              onClick={scrollLeft}
            >
              ‹
            </button>
          )}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex-1 flex items-center gap-2 overflow-x-auto hide-scrollbar"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                  activeTab === tab.name
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {tab.type === "user" ? (
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeTab === tab.name ? "bg-white/20" : "bg-gray-200"}`}
                  >
                    {tab.emoji}
                  </span>
                ) : (
                  tab.emoji && <span>{tab.emoji}</span>
                )}
                {tab.name}
              </button>
            ))}
          </div>
          {showRightArrow && (
            <button
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0"
              onClick={scrollRight}
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">
              게시글이 없어요
            </p>
            <p className="text-[14px] text-gray-400">다른 탭을 선택해보세요!</p>
          </div>
        ) : (
          <div className="px-4">
            {filteredPosts.map((post, index) => (
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
                  onShowMoreMenu={(pos) => {
                    setMoreMenuPost(post);
                    setMenuPosition(pos);
                  }}
                  onClick={() => handlePostClick(post)}
                />
                {/* 첫 번째 게시글 뒤에 광고 */}
                {index === 0 && <AdCard ad={cardAd} index={index + 1} />}
              </Fragment>
            ))}
          </div>
        )}
        {/* === 목록형 코드 (주석처리) ===
        ) : (
          <div className="p-4 flex flex-col gap-3">
            {filteredPosts.map((post, index) => (
              <Fragment key={post.id}>
                <PostListItem
                  post={post}
                  index={index}
                  isLiked={likedPosts.includes(post.id)}
                  isDisliked={dislikedPosts.includes(post.id)}
                  isFollowed={followedPosts.includes(post.id)}
                  onLike={() => toggleLike(post.id)}
                  onDislike={() => toggleDislike(post.id)}
                  onFollow={() => toggleFollowPost(post.id)}
                  onComment={() => handlePostClick(post)}
                  onGift={() => setShowGiftPopup(true)}
                  onShowMoreMenu={(pos) => {
                    setMoreMenuPost(post);
                    setMenuPosition(pos);
                  }}
                  onClick={() => handlePostClick(post)}
                />
                {index === 0 && <AdListItem ad={listAd} index={index + 1} />}
              </Fragment>
            ))}
          </div>
        === 목록형 코드 끝 === */}
      </div>

      {/* 프로필 팝업 */}
      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* 선물 팝업 */}
      {showGiftPopup && (
        <GiftPopup
          onClose={() => setShowGiftPopup(false)}
          onSend={() => showToast(TOAST_MESSAGES.GIFT_SENT)}
        />
      )}

      {/* === 보기 전환 팝업 (주석처리) ===
      {showViewPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowViewPopup(false)}
          />
          <div className="relative bg-white rounded-t-2xl w-full max-w-md">
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
            <div className="p-4">
              <button
                className="w-full flex items-center justify-between py-3"
                onClick={() => {
                  setViewType("목록형");
                  setShowViewPopup(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="text-sm text-gray-700">목록형</span>
                </div>
                {viewType === "목록형" && (
                  <svg className="w-5 h-5 text-[#72C2FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 5h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm0 9h16a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                  </svg>
                  <span className="text-sm text-gray-700">카드형</span>
                </div>
                {viewType === "카드형" && (
                  <svg className="w-5 h-5 text-[#72C2FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      === 보기 전환 팝업 끝 === */}

      {/* 더보기 메뉴 */}
      <MoreMenu
        post={moreMenuPost}
        position={menuPosition}
        onClose={() => {
          setMoreMenuPost(null);
          setMenuPosition(null);
        }}
      />
    </div>
  );
}
