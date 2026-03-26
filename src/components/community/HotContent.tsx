import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import type { PostData, ContentBlock } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { useFollow } from "./FollowContext";
import { initialPosts } from "./postsData";
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
  id: "ad-card-1",
  avatar: "🎮",
  avatarBg: "#E8F4FD",
  name: "히어로 키우기",
  time: "광고",
  media: {
    type: "image" as const,
    src: "https://picsum.photos/800/450?random=ad1",
  },
  title: "지금 바로 영웅이 되어보세요! 사전예약 시 특별 보상 지급",
  link: "https://example.com",
};

const listAd = {
  id: "ad-list-1",
  thumbnail: "https://picsum.photos/100/100?random=ad2",
  name: "히어로키우기",
  description:
    "지금 사전예약하고 SSR 영웅 무료로 받아가세요! 첫날부터 최강 영웅과 함께 모험을 시작하세요.",
  link: "https://example.com",
};

// ===== 본문 텍스트 추출 =====
const getBodyText = (body: string | ContentBlock[]): string => {
  if (typeof body === "string") return body;
  return body
    .filter((block) => block.type === "text")
    .map((block) => block.content || "")
    .join(" ");
};

// ===== Props =====
interface HotContentProps {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}

export default function HotContent({
  setCurrentPage,
  goBack,
}: HotContentProps) {
  const { showToast } = useToast();

  // 탭 & 뷰 상태
  const [subTab, setSubTab] = useState("베스트");
  const [viewType, setViewType] = useState("카드형");
  const [showViewPopup, setShowViewPopup] = useState(false);

  // 게시글 상세
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  // 무한스크롤 (카드형)
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 상호작용 상태
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const { isFollowing, toggleFollow } = useFollow();
  const [followedPosts, setFollowedPosts] = useState<number[]>([]);

  // 팝업 상태
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [moreMenuPost, setMoreMenuPost] = useState<PostData | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);

  const subTabs = ["인증글", "베스트", "전체글"];

  // ===== 필터링 + 인기순 정렬 =====
  const filteredPosts = initialPosts
    .filter((post) => {
      // 서브탭 필터
      if (subTab === "인증글" && !post.isVerified) return false;
      if (
        subTab === "베스트" &&
        !(post.views >= 5000 || post.likes >= 100 || post.comments >= 50)
      )
        return false;
      return true;
    })
    .sort((a, b) => b.views - a.views); // 인기순 정렬

  // ===== 무한스크롤 =====
  const cardPosts = filteredPosts.slice(0, displayCount);
  const hasMoreCards = displayCount < filteredPosts.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMoreCards) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) => Math.min(prev + 10, filteredPosts.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, hasMoreCards, filteredPosts.length]);

  useEffect(() => {
    if (viewType !== "카드형" || selectedPost) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreCards && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [viewType, hasMoreCards, isLoading, loadMore, selectedPost]);

  // 필터 변경 시 리셋
  useEffect(() => {
    setDisplayCount(10);
  }, [subTab]);

  // ===== 핸들러 =====
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

  // ===== 게시글 상세 =====
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
      {/* 독립 페이지일 때 헤더 표시 */}
      {goBack && (
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
                🔥 지금 핫한
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 서브 탭 + 보기 전환 */}
      <div
        className={`sticky ${goBack ? "top-[57px]" : "top-0"} z-40 bg-white`}
      >
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1 transition-colors ${
                subTab === tab
                  ? "bg-[#72C2FF] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab === "인증글" && (
                <img
                  src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
                  alt=""
                  className="w-4 h-4"
                />
              )}
              {tab}
            </button>
          ))}
          <div className="flex-1" />

          {/* 보기 전환 버튼 */}
          <button
            className="text-gray-400"
            onClick={() => setShowViewPopup(true)}
          >
            {viewType === "목록형" ? (
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v1.43H3.8V5.3c0-.83.67-1.5 1.5-1.5zm10.9 4.73v2.93H3.8V8.53h12.4zm-1.5 7.67H5.3c-.83 0-1.5-.67-1.5-1.5v-1.43h12.4v1.43c0 .83-.67 1.5-1.5 1.5z" />
              </svg>
            ) : (
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
      </div>

      {/* 게시글 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">🔥</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">
              핫한 게시글이 없어요
            </p>
            <p className="text-[14px] text-gray-400">다른 탭을 선택해보세요!</p>
          </div>
        ) : viewType === "카드형" ? (
          <div className="px-4">
            {cardPosts.map((post, index) => (
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

            {/* 로딩 인디케이터 / 더보기 */}
            {hasMoreCards && (
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-[#72C2FF] rounded-full animate-spin" />
                ) : (
                  <button
                    className="px-6 py-2 text-[14px] font-semibold text-gray-500 bg-gray-100 rounded-full"
                    onClick={loadMore}
                  >
                    더보기
                  </button>
                )}
              </div>
            )}
          </div>
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
                {/* 첫 번째 게시글 뒤에 광고 */}
                {index === 0 && <AdListItem ad={listAd} index={index + 1} />}
              </Fragment>
            ))}
          </div>
        )}
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

      {/* 보기 전환 팝업 (바텀시트) */}
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
