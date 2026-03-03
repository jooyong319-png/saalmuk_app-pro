import { useState, useRef, useEffect, useCallback } from "react";
import type { PostData, ContentBlock } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { initialPosts } from "./postsData";
import PostCardFull from "./PostCardFull";
import PostListItem from "./PostListItem";
import PostDetail from "./PostDetail";
import GiftPopup from "./GiftPopup";
import ProfilePopup from "../ProfilePopup";

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
}

export default function HotContent({ setCurrentPage }: HotContentProps) {
  const { showToast } = useToast();

  // 탭 & 뷰 상태
  const [subTab, setSubTab] = useState("베스트");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [showViewDropdown, setShowViewDropdown] = useState(false);

  // 게시글 상세
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  // 무한스크롤 (카드형)
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 상호작용 상태
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([
    "김쌀먹",
    "게임마스터",
  ]);
  const [followedPosts, setFollowedPosts] = useState<number[]>([]);

  // 팝업 상태
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

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
    if (viewMode !== "card" || selectedPost) return;

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
  }, [viewMode, hasMoreCards, isLoading, loadMore, selectedPost]);

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

  const toggleFollow = (author: string) => {
    const isFollowing = followedUsers.includes(author);
    setFollowedUsers((prev) =>
      isFollowing ? prev.filter((u) => u !== author) : [...prev, author],
    );
    showToast(
      isFollowing
        ? TOAST_MESSAGES.UNFOLLOW(author)
        : TOAST_MESSAGES.FOLLOW(author),
    );
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
      <PostDetail
        post={selectedPost}
        isLiked={likedPosts.includes(selectedPost.id)}
        isDisliked={dislikedPosts.includes(selectedPost.id)}
        isFollowed={followedUsers.includes(selectedPost.name)}
        onLike={() => toggleLike(selectedPost.id)}
        onDislike={() => toggleDislike(selectedPost.id)}
        onFollow={() => toggleFollow(selectedPost.name)}
        onClose={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 서브 탭 + 보기 전환 (헤더는 App.tsx 공통 헤더 사용) */}
      <div className="sticky top-0 z-40 bg-white">
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-100">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1 transition-colors ${
                subTab === tab
                  ? "bg-[#FF6B35] text-white"
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

          {/* 보기 전환 드롭다운 */}
          <div className="relative">
            <button
              className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] text-gray-400 rounded-lg hover:bg-gray-100"
              onClick={() => setShowViewDropdown(!showViewDropdown)}
            >
              ☰ ▾
            </button>
            {showViewDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowViewDropdown(false)}
                />
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 min-w-[120px] z-20">
                  <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400">
                    View
                  </p>
                  <button
                    className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold ${viewMode === "card" ? "text-gray-900 bg-gray-50" : "text-gray-500"}`}
                    onClick={() => {
                      setViewMode("card");
                      setShowViewDropdown(false);
                    }}
                  >
                    🃏 카드형
                  </button>
                  <button
                    className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold ${viewMode === "list" ? "text-gray-900 bg-gray-50" : "text-gray-500"}`}
                    onClick={() => {
                      setViewMode("list");
                      setShowViewDropdown(false);
                    }}
                  >
                    📋 목록형
                  </button>
                </div>
              </>
            )}
          </div>
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
        ) : viewMode === "card" ? (
          <div className="px-4">
            {cardPosts.map((post, index) => (
              <PostCardFull
                key={post.id}
                post={post}
                index={index}
                isLiked={likedPosts.includes(post.id)}
                isDisliked={dislikedPosts.includes(post.id)}
                isFollowed={followedUsers.includes(post.name)}
                onLike={() => toggleLike(post.id)}
                onDislike={() => toggleDislike(post.id)}
                onFollow={() => toggleFollow(post.name)}
                onShowGiftPopup={() => setShowGiftPopup(true)}
                onShowProfile={() => setSelectedProfile(post)}
                onClick={() => handlePostClick(post)}
              />
            ))}

            {/* 로딩 인디케이터 / 더보기 */}
            {hasMoreCards && (
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-[#FF6B35] rounded-full animate-spin" />
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
              <PostListItem
                key={post.id}
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
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 프로필 팝업 */}
      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          isFollowing={followedUsers.includes(selectedProfile.name)}
          onFollow={() => toggleFollow(selectedProfile.name)}
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
    </div>
  );
}
