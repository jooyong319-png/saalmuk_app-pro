import { useState } from "react";
import type { Comment } from "./CommentTypes";
import LikeDislikeButton from "./LikeDislikeButton";
import CommentMoreMenu from "./CommentMoreMenu";

interface BestCommentItemProps {
  comment: Comment;
  likedComments: number[];
  dislikedComments: number[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onGift: () => void;
  onScrollTo: (id: number) => void;
}

export default function BestCommentItem({
  comment,
  likedComments,
  dislikedComments,
  onLike,
  onDislike,
  onGift,
  onScrollTo,
}: BestCommentItemProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-start gap-2.5 mb-4">
      {/* 아바타 */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
        style={{ background: comment.avatarBg }}
      >
        {comment.avatar}
      </div>

      {/* 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#72C2FF] text-white font-bold">
            BEST
          </span>
          <span className="text-[13px] font-semibold text-gray-900">
            {comment.author}
          </span>
          <span className="text-[11px] text-gray-400">{comment.time}</span>
        </div>
        <p className="text-[14px] text-gray-700 mb-1.5">{comment.content}</p>
        <div className="flex items-center gap-3">
          {/* 바로가기 */}
          <button
            className="text-[12px] text-gray-400 flex items-center gap-0.5"
            onClick={() => onScrollTo(comment.id)}
          >
            <span>↳</span> 바로가기
          </button>
          {/* 좋아요/싫어요 */}
          <LikeDislikeButton
            likes={comment.likes}
            isLiked={likedComments.includes(comment.id)}
            isDisliked={dislikedComments.includes(comment.id)}
            onLike={() => onLike(comment.id)}
            onDislike={() => onDislike(comment.id)}
            size="sm"
          />
          {/* 후원 */}
          <button
            onClick={onGift}
            className="flex items-center gap-1 text-[12px] text-gray-400"
          >
            <svg
              className="w-3.5 h-3.5"
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
      </div>

      {/* 더보기 */}
      <div className="relative shrink-0">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-gray-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
          </svg>
        </button>
        {showMenu && (
          <CommentMoreMenu
            authorName={comment.author}
            onClose={() => setShowMenu(false)}
          />
        )}
      </div>
    </div>
  );
}
