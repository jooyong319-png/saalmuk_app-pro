import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import type {
  PostData,
  Comment,
  Reply,
  ReplyTarget,
  TabItem,
  ContentBlock,
} from "./types";
import { initialComments } from "./commentsData";
import { initialPosts } from "./postsData";
import PostCardFull from "./PostCardFull";
import PostListItem from "./PostListItem";
import PostDetail from "./PostDetail";
import Pagination from "./Pagination";
import GiftPopup from "./GiftPopup";
import ProfilePopup from "./ProfilePopup";
import AdCard from "./AdCard";
import AdListItem from "./AdListItem";
import { useToast } from "./Toast";

// ─── 애니메이션 스타일 ───
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; max-height: 0; }
    to { opacity: 1; max-height: 2000px; }
  }
  @keyframes highlight {
    0%, 100% { background-color: transparent; }
    50% { background-color: #FEF3C7; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-fadeUp { animation: fadeUp 0.5s ease-out both; }
  .animate-slideUp { animation: slideUp 0.3s ease-out both; }
  .animate-slideDown { animation: slideDown 0.3s ease-out both; }
  .animate-highlight { animation: highlight 1s ease-in-out; }
  .animate-spin { animation: spin 1s linear infinite; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
`;

// ─── 광고 데이터 ───
const cardAd = {
  id: "ad-card-1",
  avatar: "🇺🇸",
  avatarBg: "#E5E7EB",
  name: "히어로 키우기",
  time: "27분",
  media: {
    type: "video" as const,
    src: "https://example.com/ad-video.mp4",
    thumbnail: "https://picsum.photos/800/450?random=ad1",
  },
  title: "히어로 키우기",
  link: "https://example.com",
};

const listAd = {
  id: "ad-list-1",
  thumbnail: "https://picsum.photos/100/100?random=ad2",
  name: "히어로키우기",
  description:
    "언어 학습 앱은 정답 하나만 가르쳐주지만, 인생은 그렇지 않습니다. Preply 튜터와 함께 연습을 시작하고 첫날부터 자신감을 키워보세요.",
  link: "https://example.com",
};

// ─── 탭 데이터 ───
const tabs: TabItem[] = [
  { name: "전체", emoji: "" },
  { name: "메이플스토리", emoji: "🍁", type: "board" },
  { name: "리니지M", emoji: "⚔️", type: "board" },
  { name: "로스트아크", emoji: "🏰", type: "board" },
  { name: "발로란트", emoji: "🎯", type: "board" },
  { name: "카트라이더", emoji: "🚗", type: "board" },
  { name: "포켓몬고", emoji: "⚡", type: "board" },
  { name: "김쌀먹", emoji: "👤", type: "user" },
  { name: "게임마스터", emoji: "👤", type: "user" },
  { name: "메이플고수", emoji: "👤", type: "user" },
];

const subTabs = ["인증글", "베스트", "전체글"];

// ─── 본문 텍스트 추출 함수 ───
const getBodyText = (body: string | ContentBlock[]): string => {
  if (typeof body === "string") {
    return body;
  }
  return body
    .filter((block) => block.type === "text")
    .map((block) => block.content || "")
    .join(" ");
};

// ─── Props 타입 ───
interface FollowingContentProps {
  initialPostId?: number | null;
  onPostOpened?: () => void;
  onProfileClick?: (name: string, avatar: string, avatarBg?: string) => void;
}

// ─── 메인 컴포넌트 ───
export default function FollowingContent({
  initialPostId,
  onPostOpened,
  onProfileClick,
}: FollowingContentProps) {
  const { showToast } = useToast();

  // ─── 탭 상태 ───
  const [activeTab, setActiveTab] = useState("전체");
  const [subTab, setSubTab] = useState("베스트");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [showCountDropdown, setShowCountDropdown] = useState(false);

  // ─── 게시글 상세 상태 ───
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  // ─── 외부에서 전달받은 게시글 ID로 상세 열기 ───
  useEffect(() => {
    if (initialPostId) {
      const post = initialPosts.find((p) => p.id === initialPostId);
      if (post) {
        setSelectedPost(post);
        onPostOpened?.();
      }
    }
  }, [initialPostId, onPostOpened]);

  // ─── 무한스크롤 상태 (카드형) ───
  const [displayCount, setDisplayCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // ─── 페이지네이션 상태 (목록형) ───
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchType, setSearchType] = useState("title");

  const [followedPosts, setFollowedPosts] = useState<number[]>([]);

  // ─── 스크롤 상태 ───
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ─── 게시글 인터랙션 상태 ───
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>([
    "김쌀먹",
    "게임마스터",
    "메이플고수",
  ]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {},
  );
  const [highlightedComment, setHighlightedComment] = useState<string | null>(
    null,
  );

  // ─── 댓글 상태 ───
  const [commentsState, setCommentsState] = useState<{
    [key: number]: Comment[];
  }>(initialComments);
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [dislikedComments, setDislikedComments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<ReplyTarget | null>(null);
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});

  // ─── 팝업 상태 ───
  const [showGiftPopup, setShowGiftPopup] = useState(false);
  const [showCommentGiftPopup, setShowCommentGiftPopup] = useState<
    string | null
  >(null);
  const [selectedProfile, setSelectedProfile] = useState<PostData | null>(null);

  // ─── Refs ───
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 상대 시간 변환 함수
  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // ─── 스크롤 체크 ───
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
      setTimeout(checkScroll, 200);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // ─── 필터링 + 검색 ───
  const filteredPosts = initialPosts
    .filter((post) => {
      // 탭 필터
      if (activeTab !== "전체") {
        const selectedTab = tabs.find((t) => t.name === activeTab);
        if (selectedTab?.type === "board" && post.boardId !== activeTab)
          return false;
        if (selectedTab?.type === "user" && post.authorId !== activeTab)
          return false;
      }
      // 서브탭 필터
      if (subTab === "인증글" && !post.isVerified) return false;
      if (
        subTab === "베스트" &&
        !(post.views >= 5000 || post.likes >= 100 || post.comments >= 50)
      )
        return false;

      // 검색 필터
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        const bodyText = getBodyText(post.body);
        switch (searchType) {
          case "title":
            return post.title.toLowerCase().includes(keyword);
          case "content":
            return bodyText.toLowerCase().includes(keyword);
          case "author":
            return post.name.toLowerCase().includes(keyword);
          case "title_content":
            return (
              post.title.toLowerCase().includes(keyword) ||
              bodyText.toLowerCase().includes(keyword)
            );
          default:
            return true;
        }
      }
      return true;
    })
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  // ─── 무한스크롤 (카드형) ───
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

  // IntersectionObserver for infinite scroll
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

  // 필터 변경 시 무한스크롤 리셋
  useEffect(() => {
    setDisplayCount(10);
    setCurrentPage(1);
  }, [activeTab, subTab, searchKeyword]);

  // ─── 페이지네이션 계산 (목록형) ───
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / itemsPerPage),
  );
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ─── 게시글 핸들러 ───
  const toggleLike = (postId: number) => {
    if (dislikedPosts.includes(postId))
      setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  const toggleDislike = (postId: number) => {
    if (likedPosts.includes(postId))
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    setDislikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  const toggleFollow = (userName: string) => {
    setFollowedUsers((prev) =>
      prev.includes(userName)
        ? prev.filter((u) => u !== userName)
        : [...prev, userName],
    );
  };

  const toggleFollowPost = (postId: number) => {
    // const isFollowing = followedPosts.includes(postId);
    setFollowedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
    // 토스트는 하위 컴포넌트에서 표시
  };

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  };

  // ─── 댓글 핸들러 ───
  const toggleCommentLike = (key: string) => {
    if (dislikedComments.includes(key))
      setDislikedComments((prev) => prev.filter((k) => k !== key));
    setLikedComments((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const toggleCommentDislike = (key: string) => {
    if (likedComments.includes(key))
      setLikedComments((prev) => prev.filter((k) => k !== key));
    setDislikedComments((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const submitComment = (postId: number) => {
    const input = commentInputs[postId];
    if (input?.trim()) {
      const newComment: Comment = {
        id: Date.now(),
        author: "나",
        avatar: "🍚",
        avatarBg: "#E5E7EB",
        content: input,
        time: "방금 전",
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setCommentsState((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      showToast("댓글이 등록되었습니다");
    }
  };

  const startReply = (key: string, author: string) => {
    setReplyingTo({ key, author });
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const addReplyToNested = (
    replies: Reply[],
    targetId: number,
    newReply: Reply,
  ): Reply[] => {
    return replies.map((reply) => {
      if (reply.id === targetId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), newReply],
        };
      }
      if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: addReplyToNested(reply.replies, targetId, newReply),
        };
      }
      return reply;
    });
  };

  const submitReply = (postId: number, commentId: number) => {
    if (!replyingTo) return;

    const input = replyInputs[replyingTo.key];
    if (!input?.trim()) return;

    const newReply: Reply = {
      id: Date.now(),
      author: "나",
      avatar: "🍚",
      avatarBg: "#E5E7EB",
      content: input,
      time: "방금 전",
      likes: 0,
      dislikes: 0,
      replyTo: replyingTo.author,
      replies: [],
    };

    const keyParts = replyingTo.key.split("-");

    if (keyParts.length === 2) {
      setCommentsState((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...(comment.replies || []), newReply] }
            : comment,
        ),
      }));
    } else {
      const targetReplyId = parseInt(keyParts[keyParts.length - 1]);
      setCommentsState((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: addReplyToNested(
                  comment.replies || [],
                  targetReplyId,
                  newReply,
                ),
              }
            : comment,
        ),
      }));
    }

    setReplyInputs((prev) => ({ ...prev, [replyingTo.key]: "" }));
    setReplyingTo(null);
    showToast("답글이 등록되었습니다");
  };

  const scrollToComment = (postId: number, commentId: number) => {
    const key = `${postId}-${commentId}`;
    const element = commentRefs.current[key];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedComment(key);
      setTimeout(() => setHighlightedComment(null), 1500);
    }
  };

  const handleSearch = (keyword: string, type: string) => {
    setSearchKeyword(keyword);
    setSearchType(type);
    setCurrentPage(1);
  };

  // ─── 게시글 클릭 핸들러 (목록형) ───
  const handlePostClick = (post: PostData) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── 상세에서 뒤로가기 ───
  const handleBackFromDetail = () => {
    setSelectedPost(null);
  };

  // ─── 렌더링 ───
  return (
    <>
      <style>{animationStyles}</style>

      {/* 게시글 상세 모드 */}
      {selectedPost ? (
        <PostDetail
          post={selectedPost}
          comments={commentsState[selectedPost.id] || []}
          isLiked={likedPosts.includes(selectedPost.id)}
          isDisliked={dislikedPosts.includes(selectedPost.id)}
          isFollowed={followedUsers.includes(selectedPost.name)}
          onBack={handleBackFromDetail}
          onLike={() => toggleLike(selectedPost.id)}
          onDislike={() => toggleDislike(selectedPost.id)}
          onFollow={toggleFollow}
          onShowGiftPopup={() => setShowGiftPopup(true)}
          onShowProfile={() => {
            if (onProfileClick) {
              onProfileClick(
                selectedPost.author || selectedPost.name,
                selectedPost.avatar,
                selectedPost.avatarBg,
              );
            } else {
              setSelectedProfile(selectedPost);
            }
          }}
          // 댓글 관련 props
          commentInput={commentInputs[selectedPost.id] || ""}
          replyingTo={replyingTo}
          replyInputs={replyInputs}
          likedComments={likedComments}
          dislikedComments={dislikedComments}
          followedUsers={followedUsers}
          highlightedComment={highlightedComment}
          commentRefs={commentRefs}
          onCommentInputChange={(value) =>
            setCommentInputs((prev) => ({ ...prev, [selectedPost.id]: value }))
          }
          onSubmitComment={() => submitComment(selectedPost.id)}
          onCommentLike={toggleCommentLike}
          onCommentDislike={toggleCommentDislike}
          onCommentGift={setShowCommentGiftPopup}
          onStartReply={startReply}
          onCancelReply={cancelReply}
          onReplyInputChange={(key, value) =>
            setReplyInputs((prev) => ({ ...prev, [key]: value }))
          }
          onSubmitReply={(commentId) => submitReply(selectedPost.id, commentId)}
          onScrollToComment={(commentId) =>
            scrollToComment(selectedPost.id, commentId)
          }
        />
      ) : (
        <>
          {/* 상단 탭 */}
          <div className="flex items-center gap-2 py-4 border-b border-gray-200 animate-fadeUp max-w-[930px]">
            {showLeftArrow && (
              <button
                className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 hover:bg-gray-200 transition-colors"
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
                  className={`px-4 py-2 rounded-full text-[14px] font-semibold border whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    activeTab === tab.name
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {tab.type === "user" ? (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        activeTab === tab.name ? "bg-white/20" : "bg-gray-200"
                      }`}
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
                className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 shrink-0 hover:bg-gray-200 transition-colors"
                onClick={scrollRight}
              >
                ›
              </button>
            )}
          </div>

          {/* 서브 탭 */}
          <div className="flex items-center gap-1 py-3">
            {subTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`px-4 py-1.5 rounded-full text-[14px] font-semibold transition-colors flex items-center gap-1 ${
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

            {/* 개수 선택 드롭다운 (목록형일 때만) */}
            {viewMode === "list" && (
              <div className="relative">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-[14px] text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setShowCountDropdown(!showCountDropdown)}
                >
                  {itemsPerPage}개
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
                {showCountDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowCountDropdown(false)}
                    />
                    <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 min-w-[100px] z-20">
                      {[30, 50, 100].map((count) => (
                        <button
                          key={count}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-[14px] font-medium transition-colors ${
                            itemsPerPage === count
                              ? "text-[#72C2FF] bg-blue-50"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setItemsPerPage(count);
                            setCurrentPage(1);
                            setShowCountDropdown(false);
                          }}
                        >
                          {itemsPerPage === count && (
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                          {count}개
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 보기 전환 드롭다운 */}
            <div className="relative">
              <button
                className="flex items-center gap-1 px-2.5 py-1.5 text-[14px] text-gray-400 rounded-lg hover:bg-gray-100 transition-colors"
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
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 min-w-[140px] z-20">
                    <p className="px-3 py-1.5 text-[12px] font-semibold text-gray-400">
                      View
                    </p>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-[14px] font-semibold transition-colors ${
                        viewMode === "card"
                          ? "text-[#1A1A2E] bg-gray-50"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        setViewMode("card");
                        setShowViewDropdown(false);
                      }}
                    >
                      🃏 카드형
                    </button>
                    <button
                      className={`w-full flex items-center gap-2 px-3 py-2 text-[14px] font-semibold transition-colors ${
                        viewMode === "list"
                          ? "text-[#1A1A2E] bg-gray-50"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
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

          {/* 콘텐츠 */}
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">📭</p>
              <p className="text-[16px] font-semibold text-gray-500 mb-2">
                게시글이 없어요
              </p>
              <p className="text-[14px] text-gray-400">
                다른 탭을 선택해보세요!
              </p>
            </div>
          ) : viewMode === "card" ? (
            <>
              {/* 카드형 (무한스크롤) */}
              <div>
                {cardPosts.map((post, index) => (
                  <Fragment key={post.id}>
                    <PostCardFull
                      post={post}
                      index={index}
                      comments={commentsState[post.id] || []}
                      isLiked={likedPosts.includes(post.id)}
                      isDisliked={dislikedPosts.includes(post.id)}
                      isFollowed={followedUsers.includes(post.name)}
                      isCommentsExpanded={expandedComments.includes(post.id)}
                      commentInput={commentInputs[post.id] || ""}
                      replyingTo={replyingTo}
                      replyInputs={replyInputs}
                      likedComments={likedComments}
                      dislikedComments={dislikedComments}
                      followedUsers={followedUsers}
                      highlightedComment={highlightedComment}
                      commentRefs={commentRefs}
                      onLike={() => toggleLike(post.id)}
                      onDislike={() => toggleDislike(post.id)}
                      onFollow={toggleFollow}
                      onToggleComments={() => toggleComments(post.id)}
                      onShowGiftPopup={() => setShowGiftPopup(true)}
                      onShowProfile={() => {
                        if (onProfileClick) {
                          onProfileClick(
                            post.author || post.name,
                            post.avatar,
                            post.avatarBg,
                          );
                        } else {
                          setSelectedProfile(post);
                        }
                      }}
                      onCommentInputChange={(value) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post.id]: value,
                        }))
                      }
                      onSubmitComment={() => submitComment(post.id)}
                      onCommentLike={toggleCommentLike}
                      onCommentDislike={toggleCommentDislike}
                      onCommentGift={setShowCommentGiftPopup}
                      onStartReply={startReply}
                      onCancelReply={cancelReply}
                      onReplyInputChange={(key, value) =>
                        setReplyInputs((prev) => ({ ...prev, [key]: value }))
                      }
                      onSubmitReply={(commentId) =>
                        submitReply(post.id, commentId)
                      }
                      onScrollToComment={(commentId) =>
                        scrollToComment(post.id, commentId)
                      }
                    />
                    {/* 첫 번째 게시글 뒤에 광고 */}
                    {index === 0 && <AdCard ad={cardAd} index={index + 1} />}
                  </Fragment>
                ))}
              </div>

              {/* 무한스크롤 로딩 영역 */}
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-[14px]">불러오는 중...</span>
                  </div>
                ) : hasMoreCards ? (
                  <p className="text-[14px] text-gray-400">
                    스크롤하여 더 보기
                  </p>
                ) : (
                  <p className="text-[14px] text-gray-400">
                    모든 게시글을 불러왔어요
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* 목록형 (페이지네이션) */}
              <div className="pt-3 flex flex-col gap-3">
                {paginatedPosts.map((post, index) => (
                  <Fragment key={post.id}>
                    <PostListItem
                      post={post}
                      index={index}
                      isFollowed={followedPosts.includes(post.id)}
                      isLiked={likedPosts.includes(post.id)}
                      isDisliked={dislikedPosts.includes(post.id)}
                      onFollow={() => toggleFollowPost(post.id)}
                      onLike={() => toggleLike(post.id)}
                      onDislike={() => toggleDislike(post.id)}
                      onComment={() => handlePostClick(post)}
                      onGift={() => setShowGiftPopup(true)}
                      onClick={() => handlePostClick(post)}
                      getRelativeTime={getRelativeTime}
                    />
                    {/* 첫 번째 게시글 뒤에 광고 */}
                    {index === 0 && (
                      <AdListItem ad={listAd} index={index + 1} />
                    )}
                  </Fragment>
                ))}
              </div>

              {/* 페이지네이션 */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onSearch={handleSearch}
              />
            </>
          )}
        </>
      )}

      {/* 팝업들 */}
      {showGiftPopup && (
        <GiftPopup type="post" onClose={() => setShowGiftPopup(false)} />
      )}

      {showCommentGiftPopup && (
        <GiftPopup
          type="comment"
          onClose={() => setShowCommentGiftPopup(null)}
        />
      )}

      {!onProfileClick && selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          isFollowed={followedUsers.includes(selectedProfile.name)}
          onClose={() => setSelectedProfile(null)}
          onFollow={() => toggleFollow(selectedProfile.name)}
        />
      )}
    </>
  );
}
