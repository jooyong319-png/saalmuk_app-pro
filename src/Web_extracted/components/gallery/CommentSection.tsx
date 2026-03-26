import type { Comment, ReplyTarget } from "./types";
import CommentItem from "./CommentItem";
import LikeDislikeButton from "./LikeDislikeButton";
import DropdownMenu, { getCommentMenuItems } from "./DropdownMenu";

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
  commentInput: string;
  replyingTo: ReplyTarget | null;
  replyInputs: { [key: string]: string };
  likedComments: string[];
  dislikedComments: string[];
  followedUsers: string[];
  highlightedComment: string | null;
  commentRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  onCommentInputChange: (value: string) => void;
  onSubmitComment: () => void;
  onCommentLike: (key: string) => void;
  onCommentDislike: (key: string) => void;
  onCommentGift: (key: string) => void;
  onFollow: (name: string) => void;
  onStartReply: (key: string, author: string) => void;
  onCancelReply: () => void;
  onReplyInputChange: (key: string, value: string) => void;
  onSubmitReply: (commentId: number) => void;
  onScrollToComment: (commentId: number) => void;
}

export default function CommentSection({
  postId,
  comments,
  commentInput,
  replyingTo,
  replyInputs,
  likedComments,
  dislikedComments,
  followedUsers,
  highlightedComment,
  commentRefs,
  onCommentInputChange,
  onSubmitComment,
  onCommentLike,
  onCommentDislike,
  onCommentGift,
  onFollow,
  onStartReply,
  onCancelReply,
  onReplyInputChange,
  onSubmitReply,
  onScrollToComment,
}: CommentSectionProps) {
  const bestComments = comments.filter((c) => c.isBest).slice(0, 4);
  const allComments = [...comments].sort((a, b) => a.id - b.id);

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {/* 댓글 입력 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm">
          🍚
        </div>
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={commentInput}
            onChange={(e) => onCommentInputChange(e.target.value)}
            className="flex-1 bg-transparent text-[14px] outline-none"
            onKeyDown={(e) => e.key === "Enter" && onSubmitComment()}
          />
        </div>
        <button
          className="px-4 py-2 bg-[#72C2FF] text-white text-[14px] font-semibold rounded-full hover:bg-[#5AB0F0] transition-colors"
          onClick={onSubmitComment}
        >
          등록
        </button>
      </div>

      {/* 베스트 댓글 */}
      {bestComments.length > 0 && (
        <div className="mb-6">
          {bestComments.map((comment) => {
            const commentKey = `${postId}-${comment.id}`;
            return (
              <div
                key={`best-${comment.id}`}
                className="flex items-start gap-3 mb-4"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0"
                  style={{ background: comment.avatarBg || "#E5E7EB" }}
                >
                  {comment.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#72C2FF] text-white font-bold">
                      BEST
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">
                      {comment.author}
                    </span>
                    <span className="text-[12px] text-gray-400">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-700 mb-1.5">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-[12px] text-gray-400 hover:text-[#72C2FF] flex items-center gap-1"
                      onClick={() => onScrollToComment(comment.id)}
                    >
                      <span>↳</span> 바로가기
                    </button>
                    <LikeDislikeButton
                      likes={comment.likes}
                      dislikes={comment.dislikes || 0}
                      isLiked={likedComments.includes(commentKey)}
                      isDisliked={dislikedComments.includes(commentKey)}
                      onLike={() => onCommentLike(commentKey)}
                      onDislike={() => onCommentDislike(commentKey)}
                      size="sm"
                    />
                    <button
                      className="flex items-center gap-1 px-1.5 py-1 rounded text-[12px] text-gray-400 hover:bg-gray-100 hover:text-[#72C2FF]"
                      onClick={() => onCommentGift(commentKey)}
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

                {/* 더보기 메뉴 - DropdownMenu 적용 */}
                <DropdownMenu
                  size="md"
                  items={getCommentMenuItems({
                    onFollow: () => onFollow(comment.author),
                    onBlock: () => console.log("차단"),
                    onReport: () => console.log("신고"),
                    isFollowed: followedUsers.includes(comment.author),
                  })}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* 전체 댓글 목록 */}
      <div>
        {allComments.map((comment) => {
          const commentKey = `${postId}-${comment.id}`;
          return (
            <CommentItem
              key={`comment-${comment.id}`}
              comment={comment}
              postId={postId}
              commentKey={commentKey}
              isHighlighted={highlightedComment === commentKey}
              isLiked={likedComments.includes(commentKey)}
              isDisliked={dislikedComments.includes(commentKey)}
              isFollowed={followedUsers.includes(comment.author)}
              replyingTo={replyingTo}
              replyInputs={replyInputs}
              likedComments={likedComments}
              dislikedComments={dislikedComments}
              followedUsers={followedUsers}
              commentRef={(el) => {
                commentRefs.current[commentKey] = el;
              }}
              onLike={() => onCommentLike(commentKey)}
              onDislike={() => onCommentDislike(commentKey)}
              onGift={() => onCommentGift(commentKey)}
              onFollow={() => onFollow(comment.author)}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              onReplyInputChange={onReplyInputChange}
              onSubmitReply={() => onSubmitReply(comment.id)}
              onReplyLike={onCommentLike}
              onReplyDislike={onCommentDislike}
              onReplyFollow={onFollow}
              onReplyGift={onCommentGift}
            />
          );
        })}
        {allComments.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <p className="text-[14px]">첫 댓글을 남겨보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
