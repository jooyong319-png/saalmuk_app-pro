import { useState, useRef, useEffect } from "react";
import type { PostData } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { tabs, subTabs, initialPosts } from "./postsData";
import PostCardFull from "./PostCardFull";
import PostListItem from "./PostListItem";
import PostDetail from "./PostDetail";
import GiftPopup from "./GiftPopup";
import ProfilePopup from "../ProfilePopup";

interface FollowingContentProps {
  setCurrentPage: (page: string) => void;
}

export default function FollowingContent({ setCurrentPage }: FollowingContentProps) {
  const { showToast } = useToast();

  // State
  const [activeTab, setActiveTab] = useState("전체");
  const [subTab, setSubTab] = useState("베스트");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [dislikedPosts, setDislikedPosts] = useState<number[]>([]);
  const [followedUsers, setFollowedUsers] = useState<string[]>(["김쌀먹", "게임마스터", "메이플고수"]);
  const [followedPosts, setFollowedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showGiftPopup, setShowGiftPopup] = useState(false);

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
    const tabMatch = activeTab === "전체" || post.boardId === activeTab || post.authorId === activeTab || post.name === activeTab;
    const subTabMatch = subTab === "전체글" || (subTab === "인증글" && post.isVerified) || (subTab === "베스트" && post.likes >= 200);
    return tabMatch && subTabMatch;
  });

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setDislikedPosts((prev) => prev.filter((x) => x !== id));
  };

  const toggleDislike = (id: number) => {
    setDislikedPosts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    setLikedPosts((prev) => prev.filter((x) => x !== id));
  };

  const toggleFollow = (author: string) => {
    const isFollowing = followedUsers.includes(author);
    setFollowedUsers((prev) => (isFollowing ? prev.filter((u) => u !== author) : [...prev, author]));
    showToast(isFollowing ? TOAST_MESSAGES.UNFOLLOW(author) : TOAST_MESSAGES.FOLLOW(author));
  };

  const toggleFollowPost = (postId: number) => {
    setFollowedPosts((prev) => (prev.includes(postId) ? prev.filter((x) => x !== postId) : [...prev, postId]));
  };

  const handlePostClick = (post: PostData) => {
    setSelectedPost(post);
  };

  // 게시글 상세 모드
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
      {/* 상단 탭 */}
      <div className="sticky top-0 z-40 bg-white px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {showLeftArrow && (
            <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0" onClick={scrollLeft}>‹</button>
          )}
          <div ref={scrollRef} onScroll={checkScroll} className="flex-1 flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                  activeTab === tab.name ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {tab.type === "user" ? (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeTab === tab.name ? "bg-white/20" : "bg-gray-200"}`}>{tab.emoji}</span>
                ) : (
                  tab.emoji && <span>{tab.emoji}</span>
                )}
                {tab.name}
              </button>
            ))}
          </div>
          {showRightArrow && (
            <button className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 shrink-0" onClick={scrollRight}>›</button>
          )}
        </div>
      </div>

      {/* 서브 탭 + 보기 전환 */}
      <div className="flex items-center gap-1 px-4 py-2">
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1 transition-colors ${
              subTab === tab ? "bg-[#72C2FF] text-white" : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {tab === "인증글" && <img src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg" alt="" className="w-4 h-4" />}
            {tab}
          </button>
        ))}
        <div className="flex-1" />

        {/* 보기 전환 드롭다운 */}
        <div className="relative">
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] text-gray-400 rounded-lg hover:bg-gray-100" onClick={() => setShowViewDropdown(!showViewDropdown)}>
            ☰ ▾
          </button>
          {showViewDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowViewDropdown(false)} />
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 min-w-[120px] z-20">
                <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400">View</p>
                <button className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold ${viewMode === "card" ? "text-gray-900 bg-gray-50" : "text-gray-500"}`} onClick={() => { setViewMode("card"); setShowViewDropdown(false); }}>
                  🃏 카드형
                </button>
                <button className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] font-semibold ${viewMode === "list" ? "text-gray-900 bg-gray-50" : "text-gray-500"}`} onClick={() => { setViewMode("list"); setShowViewDropdown(false); }}>
                  📋 목록형
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex-1 overflow-y-auto">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">게시글이 없어요</p>
            <p className="text-[14px] text-gray-400">다른 탭을 선택해보세요!</p>
          </div>
        ) : viewMode === "card" ? (
          <div className="px-4">
            {filteredPosts.map((post, index) => (
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
