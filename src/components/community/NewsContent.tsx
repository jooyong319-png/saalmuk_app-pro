import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import type { PostData, ContentBlock } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { useFollow } from "./FollowContext";
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
  id: "ad-news-card-1",
  avatar: "📰",
  avatarBg: "#E8F4FD",
  name: "게임뉴스 프리미엄",
  time: "광고",
  media: {
    type: "image" as const,
    src: "https://picsum.photos/800/450?random=newsad1",
  },
  title: "게임 뉴스를 가장 빠르게! 프리미엄 구독으로 광고 없이 즐기세요",
  link: "https://example.com",
};

const listAd = {
  id: "ad-news-list-1",
  thumbnail: "https://picsum.photos/100/100?random=newsad2",
  name: "게임뉴스 프리미엄",
  description:
    "프리미엄 구독 시 모든 기사 광고 없이 읽기, 독점 인터뷰, 얼리 액세스 제공",
  link: "https://example.com",
};

// ===== 뉴스 기사 데이터 =====
const newsArticles: PostData[] = [
  {
    id: 2001,
    name: "게임조선",
    avatar: "📰",
    avatarBg: "#E8F4FD",
    badge: "공식 미디어",
    meta: "2시간 전",
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    title:
      "넥슨, 신작 MMORPG '더 퍼스트 디센던트' 글로벌 동시 접속자 100만 돌파",
    body: "넥슨의 신작 루터슈터 '더 퍼스트 디센던트'가 출시 첫 주 글로벌 동시 접속자 100만 명을 돌파했다. 스팀 차트 기준 최고 동시 접속자는 26만 명을 기록했으며, PS5와 Xbox 시리즈 X|S에서도 폭발적인 반응을 얻고 있다. 넥슨 관계자는 '예상을 뛰어넘는 성과'라며 추가 콘텐츠 업데이트 계획을 밝혔다.",
    images: ["https://picsum.photos/800/450?random=news1"],
    likes: 1520,
    dislikes: 23,
    comments: 342,
    views: 125400,
    category: "게임뉴스",
  },
  {
    id: 2002,
    name: "게임인사이트",
    avatar: "📊",
    avatarBg: "#FEF3E2",
    badge: "게임 전문지",
    meta: "3시간 전",
    createdAt: Date.now() - 3 * 60 * 60 * 1000,
    title: "2024년 상반기 모바일 게임 매출 순위 발표... 리니지M 1위 수성",
    body: "한국 모바일 게임 시장에서 리니지M이 올해 상반기에도 1위 자리를 지켰다. 2위는 리니지W, 3위는 오딘: 발할라 라이징이 차지했으며 신작 게임들의 약진도 두드러졌다. 특히 신작 '승리의 여신: 니케'가 4위로 급상승하며 새로운 강자로 떠올랐다.",
    images: ["https://picsum.photos/800/450?random=news2"],
    likes: 892,
    dislikes: 15,
    comments: 256,
    views: 89200,
    category: "업계동향",
  },
  {
    id: 2003,
    name: "쌀먹닷컴",
    avatar: "🍚",
    avatarBg: "#E8F8E8",
    badge: "쌀먹 공식",
    meta: "4시간 전",
    createdAt: Date.now() - 4 * 60 * 60 * 1000,
    title: "[꿀팁] 이번 주 사전예약 보상 총정리! 최대 30만원 상당 혜택",
    body: "이번 주 진행 중인 사전예약 이벤트를 총정리했습니다. '프로젝트 문라이트' 사전예약 시 SSR 캐릭터 교환권, '블레이드 앤 소울2'는 레전더리 무기 세트 지급, '아키에이지2'는 30일 프리미엄 이용권을 제공합니다. 놓치지 마세요!",
    images: ["https://picsum.photos/800/450?random=news3"],
    likes: 3241,
    dislikes: 8,
    comments: 892,
    views: 203100,
    category: "쌀먹정보",
    isVerified: true,
  },
  {
    id: 2004,
    name: "게임메카",
    avatar: "🎮",
    avatarBg: "#F3E8FD",
    badge: "공식 미디어",
    meta: "5시간 전",
    createdAt: Date.now() - 5 * 60 * 60 * 1000,
    title:
      "엘든 링 DLC '그림자나무의 숲' 스팀 역대급 호평... 동시접속 90만 돌파",
    body: "프롬소프트웨어의 '엘든 링' 첫 DLC '그림자나무의 숲'이 출시와 동시에 스팀 동시 접속자 90만 명을 돌파했다. 유저 평가는 '압도적 긍정적'으로, 본편의 명성을 이어가고 있다. 미야자키 히데타카 디렉터는 '팬들의 기대에 부응하기 위해 최선을 다했다'고 소감을 밝혔다.",
    images: ["https://picsum.photos/800/450?random=news4"],
    likes: 2103,
    dislikes: 45,
    comments: 521,
    views: 156800,
    category: "게임뉴스",
  },
  {
    id: 2005,
    name: "게임포커스",
    avatar: "🔍",
    avatarBg: "#FDE8E8",
    badge: "게임 전문지",
    meta: "6시간 전",
    createdAt: Date.now() - 6 * 60 * 60 * 1000,
    title: "마이크로소프트, 베데스다 신작 '스타필드' 확장팩 9월 출시 확정",
    body: "마이크로소프트가 베데스다 게임 스튜디오의 '스타필드' 첫 번째 대규모 확장팩 '쉐터드 스페이스'를 오는 9월 30일 출시한다고 발표했다. 새로운 행성, 스토리, 장비가 추가되며 게임패스 가입자는 무료로 이용 가능하다.",
    images: ["https://picsum.photos/800/450?random=news5"],
    likes: 756,
    dislikes: 32,
    comments: 189,
    views: 78300,
    category: "업계동향",
  },
  {
    id: 2006,
    name: "쌀먹닷컴",
    avatar: "🍚",
    avatarBg: "#E8F8E8",
    badge: "쌀먹 공식",
    meta: "7시간 전",
    createdAt: Date.now() - 7 * 60 * 60 * 1000,
    title: "[속보] 카카오게임즈, 신규 유저 대상 100연차 무료 이벤트 진행",
    body: "카카오게임즈가 자사 인기 게임 '우마무스메'에서 신규 유저를 대상으로 100연차 무료 소환 이벤트를 진행한다. 이벤트 기간은 7월 1일부터 7월 31일까지이며, 복귀 유저에게도 50연차가 제공된다. 지금 바로 시작하세요!",
    images: ["https://picsum.photos/800/450?random=news6"],
    likes: 4521,
    dislikes: 12,
    comments: 1243,
    views: 312500,
    category: "쌀먹정보",
    isVerified: true,
  },
  {
    id: 2007,
    name: "게임샷",
    avatar: "📸",
    avatarBg: "#E8F4FD",
    badge: "공식 미디어",
    meta: "8시간 전",
    createdAt: Date.now() - 8 * 60 * 60 * 1000,
    title:
      "라이엇게임즈, '발로란트' 신규 에이전트 '클로브' 공개... 자가 부활 스킬 탑재",
    body: "라이엇게임즈가 '발로란트'의 25번째 에이전트 '클로브'를 공개했다. 클로브는 컨트롤러 역할로, 특이하게도 사망 후 자가 부활이 가능한 궁극기를 보유하고 있다. 프로 선수들 사이에서 메타 변화에 대한 기대와 우려가 동시에 나오고 있다.",
    images: ["https://picsum.photos/800/450?random=news7"],
    likes: 1876,
    dislikes: 28,
    comments: 432,
    views: 145200,
    category: "게임뉴스",
  },
  {
    id: 2008,
    name: "게임동아",
    avatar: "📈",
    avatarBg: "#FEF3E2",
    badge: "게임 전문지",
    meta: "9시간 전",
    createdAt: Date.now() - 9 * 60 * 60 * 1000,
    title: "한국 게임 시장 규모 20조원 돌파 전망... e스포츠 산업도 급성장",
    body: "한국콘텐츠진흥원에 따르면 올해 국내 게임 시장 규모가 사상 처음으로 20조원을 돌파할 것으로 전망된다. 특히 e스포츠 산업은 전년 대비 25% 성장하며 글로벌 시장에서 한국의 위상을 높이고 있다. 정부도 게임 산업 지원 정책을 확대할 예정이다.",
    images: ["https://picsum.photos/800/450?random=news8"],
    likes: 543,
    dislikes: 18,
    comments: 156,
    views: 67900,
    category: "업계동향",
  },
  {
    id: 2009,
    name: "게임조선",
    avatar: "📰",
    avatarBg: "#E8F4FD",
    badge: "공식 미디어",
    meta: "10시간 전",
    createdAt: Date.now() - 10 * 60 * 60 * 1000,
    title: "닌텐도 스위치2, 내년 3월 출시 유력... 4K 지원 및 역호환 탑재",
    body: "닌텐도의 차세대 콘솔 '스위치2'가 내년 3월 출시될 것으로 보인다. 업계 소식통에 따르면 4K 출력 지원과 기존 스위치 게임 역호환 기능이 탑재될 예정이며, 출시 타이틀로 '젤다의 전설' 신작이 준비 중이라는 소문도 있다.",
    images: ["https://picsum.photos/800/450?random=news9"],
    likes: 2341,
    dislikes: 56,
    comments: 678,
    views: 198700,
    category: "게임뉴스",
  },
  {
    id: 2010,
    name: "쌀먹닷컴",
    avatar: "🍚",
    avatarBg: "#E8F8E8",
    badge: "쌀먹 공식",
    meta: "11시간 전",
    createdAt: Date.now() - 11 * 60 * 60 * 1000,
    title: "[분석] 7월 출시 예정 신작 게임 쌀먹 포인트 비교 분석",
    body: "7월에 출시 예정인 신작 게임들의 사전예약 보상과 쌀먹 포인트를 비교 분석했습니다. '프로젝트 L'이 가장 높은 보상을, '아키에이지2'가 가장 다양한 혜택을 제공합니다. 자세한 비교표는 본문을 확인하세요!",
    images: ["https://picsum.photos/800/450?random=news10"],
    likes: 1567,
    dislikes: 5,
    comments: 423,
    views: 145600,
    category: "쌀먹정보",
    isVerified: true,
  },
];

// ===== 본문 텍스트 추출 =====
const getBodyText = (body: string | ContentBlock[]): string => {
  if (typeof body === "string") return body;
  return body
    .filter((block) => block.type === "text")
    .map((block) => block.content || "")
    .join(" ");
};

// ===== Props =====
interface NewsContentProps {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}

export default function NewsContent({
  setCurrentPage,
  goBack,
}: NewsContentProps) {
  const { showToast } = useToast();

  // 탭 & 뷰 상태
  const [sortType, setSortType] = useState<"latest" | "popular">("latest");
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

  // 글쓰기 상태
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [writeTitle, setWriteTitle] = useState("");
  const [writeContent, setWriteContent] = useState("");
  const [writeImages, setWriteImages] = useState<string[]>([]);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  // ===== 정렬 =====
  const filteredPosts = [...newsArticles].sort((a, b) => {
    if (sortType === "latest") {
      return b.createdAt - a.createdAt; // 최신순
    } else {
      return b.views - a.views; // 인기순
    }
  });

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

  // 정렬 변경 시 리셋
  useEffect(() => {
    setDisplayCount(10);
  }, [sortType]);

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
              <span className="text-lg font-bold text-gray-900">📰 뉴스</span>
            </div>
          </div>
        </div>
      )}

      {/* 정렬 + 보기 전환 */}
      <div
        className={`sticky ${goBack ? "top-[57px]" : "top-0"} z-40 bg-white`}
      >
        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100">
          {/* 최신순/인기순 토글 */}
          <button
            onClick={() =>
              setSortType(sortType === "latest" ? "popular" : "latest")
            }
            className="flex items-center gap-1 text-[14px] text-gray-600"
          >
            {sortType === "latest" ? "최신순" : "인기순"}
            <span className="text-gray-400">↕</span>
          </button>
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
            <p className="text-5xl mb-4">📰</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">
              뉴스가 없어요
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

      {/* 글쓰기 플로팅 버튼 */}
      <div className="fixed bottom-36 right-0 left-0 max-w-md mx-auto pointer-events-none z-40">
        <button
          onClick={() => setShowWriteForm(true)}
          className="absolute right-4 w-14 h-14 bg-[#72C2FF] rounded-full shadow-lg flex items-center justify-center hover:bg-[#5eb3f0] transition-colors pointer-events-auto"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      </div>

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
              <span className="font-semibold text-gray-900">뉴스</span>
              <span className="text-gray-400">갤러리에 글 작성</span>
            </div>

            {/* 제목 입력 */}
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={writeTitle}
              onChange={(e) => setWriteTitle(e.target.value)}
              maxLength={100}
              className="w-full px-4 py-3.5 text-[15px] bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#72C2FF]/30 focus:bg-white transition-all placeholder:text-gray-400"
            />

            {/* 내용 입력 + 투표 */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <textarea
                placeholder="내용을 입력하세요"
                value={writeContent}
                onChange={(e) => {
                  if (e.target.value.length <= 2000) {
                    setWriteContent(e.target.value);
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
                id="newsImageUpload"
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
                htmlFor="newsImageUpload"
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

              {/* 이모티콘 */}
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
                className={`text-[13px] ${2000 - writeContent.length < 100 ? "text-red-500" : "text-gray-400"}`}
              >
                {(2000 - writeContent.length).toLocaleString()}
              </span>

              {/* 등록 버튼 */}
              <button
                onClick={() => {
                  if (!writeTitle.trim() || !writeContent.trim()) {
                    showToast("제목과 내용을 입력해주세요");
                    return;
                  }
                  showToast("글이 등록되었습니다");
                  setShowWriteForm(false);
                  setWriteTitle("");
                  setWriteContent("");
                  setWriteImages([]);
                  setShowPoll(false);
                  setPollOptions(["", ""]);
                }}
                disabled={!writeTitle.trim() || !writeContent.trim()}
                className={`px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors ${
                  writeTitle.trim() && writeContent.trim()
                    ? "bg-[#72C2FF] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
