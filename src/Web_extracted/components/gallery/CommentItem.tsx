import { useState } from "react";
import type { Comment, ReplyTarget } from "./types";
import ReplyItem from "./ReplyItem";
import LikeDislikeButton from "./LikeDislikeButton";
import { useToast } from "./Toast";
import ConfirmPopup from "./ConfirmPopup";
import ReportPopup from "./ReportPopup";

interface CommentItemProps {
  comment: Comment;
  postId: number;
  commentKey: string;
  isHighlighted: boolean;
  isLiked: boolean;
  isDisliked: boolean;
  isFollowed: boolean;
  replyingTo: ReplyTarget | null;
  replyInputs: { [key: string]: string };
  likedComments: string[];
  dislikedComments: string[];
  followedUsers: string[];
  commentRef: (el: HTMLDivElement | null) => void;
  onLike: () => void;
  onDislike: () => void;
  onGift: () => void;
  onFollow: () => void;
  onStartReply: (key: string, author: string) => void;
  onCancelReply: () => void;
  onReplyInputChange: (key: string, value: string) => void;
  onSubmitReply: () => void;
  onReplyLike: (key: string) => void;
  onReplyDislike: (key: string) => void;
  onReplyFollow: (name: string) => void;
  onReplyGift: (key: string) => void;
}

export default function CommentItem({
  comment,
  postId,
  commentKey,
  isHighlighted,
  isLiked,
  isDisliked,
  isFollowed,
  replyingTo,
  replyInputs,
  likedComments,
  dislikedComments,
  followedUsers,
  commentRef,
  onLike,
  onDislike,
  onGift,
  onFollow,
  onStartReply,
  onCancelReply,
  onReplyInputChange,
  onSubmitReply,
  onReplyLike,
  onReplyDislike,
  onReplyFollow,
  onReplyGift,
}: CommentItemProps) {
  const { showToast } = useToast();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showUnfollowPopup, setShowUnfollowPopup] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  return (
    <div>
      {/* 댓글 본문 */}
      <div
        ref={commentRef}
        className={`flex items-start gap-3 mb-2 p-2 -mx-2 rounded-lg transition-colors ${
          isHighlighted ? "animate-highlight" : ""
        }`}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0"
          style={{ background: comment.avatarBg || "#E5E7EB" }}
        >
          {comment.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {comment.isBest && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#72C2FF] text-white font-bold">
                BEST
              </span>
            )}
            <span className="text-[13px] font-semibold text-gray-900">
              {comment.author}
            </span>
            <span className="text-[12px] text-gray-400">{comment.time}</span>
          </div>
          <p className="text-[14px] text-gray-700 mb-1.5">{comment.content}</p>
          <div className="flex items-center gap-2">
            {/* 좋아요/싫어요 */}
            <LikeDislikeButton
              likes={comment.likes}
              dislikes={comment.dislikes || 0}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={onLike}
              onDislike={onDislike}
              size="sm"
            />

            {/* 선물 */}
            <button
              className="flex items-center gap-1 px-1.5 py-1 rounded text-[12px] text-gray-400 hover:bg-gray-100 hover:text-[#72C2FF]"
              onClick={onGift}
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

            {/* 답글 */}
            <button
              className={`flex items-center gap-1 px-1.5 py-1 rounded text-[12px] hover:bg-gray-100 ${
                replyingTo?.key === commentKey
                  ? "text-[#72C2FF]"
                  : "text-gray-400"
              }`}
              onClick={() => onStartReply(commentKey, comment.author)}
            >
              → 답글
            </button>
          </div>
        </div>

        {/* 더보기 메뉴 */}
        <div className="relative shrink-0">
          <button
            className="p-1 text-gray-300 hover:text-gray-500 transition-colors"
            onClick={() => setShowMoreMenu(!showMoreMenu)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
          {showMoreMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMoreMenu(false)}
              />
              <div className="absolute right-0 top-6 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[130px] z-20">
                <button
                  className="w-full px-4 py-2 flex items-center gap-2.5 text-[13px] text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    if (isFollowed) {
                      setShowUnfollowPopup(true);
                    } else {
                      onFollow();
                      showToast(`${comment.author}님이 새 글을 올리거나 거래할 때 알려드릴게요`);
                    }
                    setShowMoreMenu(false);
                  }}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  {isFollowed ? "팔로우 취소" : "팔로우"}
                </button>
                <button
                  className="w-full px-4 py-2 flex items-center gap-2.5 text-[13px] text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setShowBlockPopup(true);
                    setShowMoreMenu(false);
                  }}
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
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  차단
                </button>
                <button
                  className="w-full px-4 py-2 flex items-center gap-2.5 text-[13px] text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setShowReportPopup(true);
                    setShowMoreMenu(false);
                  }}
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  신고
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 대댓글 목록 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mb-3 pl-3">
          {comment.replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              postId={postId}
              commentId={comment.id}
              depth={0}
              likedComments={likedComments}
              dislikedComments={dislikedComments}
              followedUsers={followedUsers}
              replyingToKey={replyingTo?.key || null}
              replyInputs={replyInputs}
              onLike={onReplyLike}
              onDislike={onReplyDislike}
              onFollow={onReplyFollow}
              onGift={onReplyGift}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              onReplyInputChange={onReplyInputChange}
              onSubmitReply={onSubmitReply}
            />
          ))}
        </div>
      )}

      {/* 답글 입력창 - 댓글 자체에 답글할 때만 */}
      {replyingTo?.key === commentKey && (
        <div className="ml-11 mb-3 flex items-center gap-2 animate-fadeUp">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs shrink-0">
            🍚
          </div>
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-3 py-1.5">
            <input
              type="text"
              placeholder={`@${replyingTo.author}에게 답글...`}
              value={replyInputs[commentKey] || ""}
              onChange={(e) => onReplyInputChange(commentKey, e.target.value)}
              className="flex-1 bg-transparent text-[13px] outline-none"
              onKeyDown={(e) => e.key === "Enter" && onSubmitReply()}
              autoFocus
            />
          </div>
          <button
            className="px-3 py-1.5 bg-[#72C2FF] text-white text-[12px] font-semibold rounded-full hover:bg-[#5AB0F0] transition-colors"
            onClick={onSubmitReply}
          >
            등록
          </button>
          <button
            className="px-2 py-1.5 text-[12px] text-gray-400 hover:text-gray-600"
            onClick={onCancelReply}
          >
            취소
          </button>
        </div>
      )}

      {/* 팔로우 취소 확인 팝업 */}
      {showUnfollowPopup && (
        <ConfirmPopup
          title="팔로우를 취소할까요?"
          description={`팔로우를 취소하면 ${comment.author}님이 글을 올리거나 거래할 때 알림을 받을 수 없어요.`}
          confirmText="팔로우 취소"
          cancelText="닫기"
          isDestructive
          onConfirm={() => {
            onFollow();
            showToast(`${comment.author}님 팔로우를 취소했어요`);
            setShowUnfollowPopup(false);
          }}
          onCancel={() => setShowUnfollowPopup(false)}
        />
      )}

      {/* 차단 확인 팝업 */}
      {showBlockPopup && (
        <ConfirmPopup
          title={`${comment.author}님을 차단할까요?`}
          description={`앞으로 ${comment.author}님의 글을 볼 수 없고, ${comment.author}님도 내 글을 볼 수 없어요.`}
          confirmText="차단하기"
          cancelText="닫기"
          isDestructive
          onConfirm={() => {
            showToast(`${comment.author}님을 차단했어요`, { type: "block" });
            setShowBlockPopup(false);
          }}
          onCancel={() => setShowBlockPopup(false)}
        />
      )}

      {/* 신고 사유 선택 팝업 */}
      {showReportPopup && (
        <ReportPopup
          targetType="댓글"
          onReport={(reason) => {
            console.log("신고 사유:", reason);
            showToast("신고가 접수되었습니다");
            setShowReportPopup(false);
          }}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </div>
  );
}
