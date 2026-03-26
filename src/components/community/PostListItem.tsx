import type { PostData } from "./types";
import { getRelativeTime } from "./postsData";
import LikeDislikeButton from "./LikeDislikeButton";

interface PostListItemProps {
  post: PostData;
  index: number;
  isLiked: boolean;
  isDisliked: boolean;
  isFollowed: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFollow: () => void;
  onComment: () => void;
  onGift: () => void;
  onShowMoreMenu: (position: { top: number; right: number }) => void;
  onClick: () => void;
  onBoardClick?: (boardId: string) => void;
}

export default function PostListItem({
  post,
  index,
  isLiked,
  isDisliked,
  isFollowed,
  onLike,
  onDislike,
  onFollow,
  onComment,
  onGift,
  onShowMoreMenu,
  onClick,
  onBoardClick,
}: PostListItemProps) {
  const stopPropagation = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div
      className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm animate-fadeUp relative cursor-pointer"
      style={{ animationDelay: `${index * 30}ms` }}
      onClick={onClick}
    >
      {/* 프로필 */}
      <div className="flex flex-col items-center gap-0.5 shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: post.avatarBg }}
          onClick={(e) => e.stopPropagation()}
        >
          {post.avatar}
        </div>
        {post.authorId && (
          <span className="text-[9px] text-[#72C2FF] font-bold">주민</span>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 min-w-0">
        {/* 첫째 줄: 제목 + 팔로우 */}
        <div className="flex items-center gap-2 mb-1.5">
          <p className="text-[15px] font-bold text-gray-900 truncate flex-1 flex items-center gap-1.5">
            {post.isVerified && (
              <img
                src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
                alt="인증글"
                className="w-5 h-5 shrink-0"
              />
            )}
            {post.title}
          </p>

          {/* 팔로우 버튼 */}
          <button
            className={`text-[12px] font-semibold px-3 py-1 rounded-full shrink-0 transition-colors ${
              isFollowed ? "text-gray-400" : "text-[#72C2FF]"
            }`}
            onClick={(e) => stopPropagation(e, onFollow)}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </button>
        </div>

        {/* 둘째 줄: 메타 정보 */}
        <div className="flex items-center gap-1.5 text-[12px] text-gray-400 mb-2">
          <span className="text-gray-500">{post.name}</span>
          <span>·</span>
          <button
            className="text-[#72C2FF] font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onBoardClick?.(post.boardId || "자유");
            }}
          >
            {post.boardId || "자유"}
          </button>
          <span>·</span>
          <span>{getRelativeTime(post.createdAt)}</span>
        </div>

        {/* 셋째 줄: 액션 버튼들 */}
        <div
          className="flex items-center justify-between text-[12px] text-gray-400"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 왼쪽: 좋아요/싫어요, 댓글, 조회수, 후원 */}
          <div className="flex items-center gap-4">
            <LikeDislikeButton
              likes={post.likes}
              dislikes={post.dislikes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={onLike}
              onDislike={onDislike}
              size="sm"
            />
            <button
              className="flex items-center gap-1 hover:text-gray-600"
              onClick={(e) => stopPropagation(e, onComment)}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {post.comments}
            </button>
            <span className="flex items-center gap-1">
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.views.toLocaleString()}
            </span>
            <button
              className="flex items-center gap-1 hover:text-amber-500"
              onClick={(e) => stopPropagation(e, onGift)}
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
          </div>

          {/* 오른쪽: 더보기 메뉴 (가로 점) */}
          <button
            className="p-1 text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              onShowMoreMenu({
                top: rect.bottom + 4,
                right: window.innerWidth - rect.right,
              });
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
