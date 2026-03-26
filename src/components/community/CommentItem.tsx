import { useState } from "react";
import type { Comment } from "./CommentTypes";
import LikeDislikeButton from "./LikeDislikeButton";
import CommentMoreMenu from "./CommentMoreMenu";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  likedComments: number[];
  dislikedComments: number[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onReply: (id: number, author: string) => void;
  onGift: () => void;
  onReport: () => void;
  commentRef?: (el: HTMLDivElement | null) => void;
}

export default function CommentItem({
  comment,
  depth = 0,
  likedComments,
  dislikedComments,
  onLike,
  onDislike,
  onReply,
  onGift,
  onReport,
  commentRef,
}: CommentItemProps) {
  const [showMenu, setShowMenu] = useState(false);
  const isLiked = likedComments.includes(comment.id);
  const isDisliked = dislikedComments.includes(comment.id);
  const avatarSize = depth === 0 ? "w-9 h-9 text-base" : "w-7 h-7 text-sm";

  return (
    <div
      ref={commentRef}
      className={depth > 0 ? "ml-6 mt-2 pl-3 border-l border-gray-100" : "mb-4"}
    >
      <div className="flex items-start gap-2.5">
        {/* 아바타 */}
        <div
          className={`${avatarSize} rounded-full flex items-center justify-center shrink-0`}
          style={{ background: comment.avatarBg }}
        >
          {comment.avatar}
        </div>

        {/* 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-gray-900">
              {comment.author}
            </span>
            {comment.isResident && (
              <span className="text-[9px] px-1 py-0.5 rounded bg-[#E8F4FD] text-[#72C2FF] font-bold">
                주민
              </span>
            )}
            <span className="text-[11px] text-gray-400">{comment.time}</span>
          </div>
          <p className="text-[14px] text-gray-700 mt-1 leading-relaxed">
            {comment.replyTo && (
              <span className="text-gray-400 font-medium">
                @{comment.replyTo}{" "}
              </span>
            )}
            {comment.content}
          </p>
          <div className="flex items-center gap-3 mt-2">
            {/* 좋아요/싫어요 */}
            <LikeDislikeButton
              likes={comment.likes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={() => onLike(comment.id)}
              onDislike={() => onDislike(comment.id)}
              size="sm"
            />
            {/* 답글 */}
            <button
              className="text-[12px] text-gray-400 font-medium"
              onClick={() => onReply(comment.id, comment.author)}
            >
              답글
            </button>
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

      {/* 대댓글 (재귀) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              likedComments={likedComments}
              dislikedComments={dislikedComments}
              onLike={onLike}
              onDislike={onDislike}
              onReply={onReply}
              onGift={onGift}
              onReport={onReport}
            />
          ))}
        </div>
      )}
    </div>
  );
}
