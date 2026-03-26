import { useState, useRef } from "react";
import type { PostData, ContentBlock } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import LikeDislikeButton from "./LikeDislikeButton";
import ConfirmPopup from "./ConfirmPopup";
import ReportPopup from "./ReportPopup";
// 분리된 댓글 컴포넌트
import type { Comment } from "./CommentTypes";
import {
  addReplyToComment,
  countComments,
  dummyComments,
} from "./CommentTypes";
import BestCommentItem from "./BestCommentItem";
import CommentItem from "./CommentItem";
import CommentInput, { CommentInputRef } from "./CommentInput";

interface PostDetailProps {
  post: PostData;
  isLiked: boolean;
  isDisliked: boolean;
  isFollowed: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFollow: () => void;
  onClose: () => void;
  onShowGiftPopup?: () => void;
}

export default function PostDetail({
  post,
  isLiked,
  isDisliked,
  isFollowed,
  onLike,
  onDislike,
  onFollow,
  onClose,
  onShowGiftPopup,
}: PostDetailProps) {
  const { showToast } = useToast();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [dislikedComments, setDislikedComments] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<{
    id: number;
    author: string;
  } | null>(null);
  const [pollState, setPollState] = useState(post.poll);
  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const commentInputRef = useRef<CommentInputRef | null>(null);

  const totalComments = countComments(comments);
  const bestComments = comments.filter((c) => c.isBest);

  const scrollToComment = (id: number) => {
    const el = commentRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.backgroundColor = "#EFF9FF";
      setTimeout(() => {
        el.style.backgroundColor = "";
      }, 1500);
    }
  };

  // 투표 핸들러
  const handleVote = (optionIndex: number) => {
    if (!pollState || pollState.votedOption !== undefined) return;

    setPollState({
      ...pollState,
      options: pollState.options.map((opt, idx) =>
        idx === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt,
      ),
      totalVotes: pollState.totalVotes + 1,
      votedOption: optionIndex,
    });
  };

  const isBlockBody = Array.isArray(post.body);
  const bodyBlocks = isBlockBody ? (post.body as ContentBlock[]) : null;
  const bodyString = !isBlockBody ? (post.body as string) : null;

  const renderBlock = (block: ContentBlock, idx: number) => {
    if (block.type === "text") {
      return (
        <p
          key={idx}
          className="text-[15px] text-gray-700 leading-[1.7] whitespace-pre-wrap mb-4"
        >
          {block.content}
        </p>
      );
    } else if (block.type === "image") {
      return (
        <div
          key={idx}
          className="relative bg-gray-100 rounded-xl overflow-hidden my-4"
        >
          <img
            src={block.src}
            alt={block.alt || ""}
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>
      );
    }
    return null;
  };

  const toggleCommentLike = (id: number) => {
    if (likedComments.includes(id)) {
      setLikedComments((prev) => prev.filter((cid) => cid !== id));
    } else {
      setLikedComments((prev) => [...prev, id]);
      setDislikedComments((prev) => prev.filter((cid) => cid !== id));
    }
  };

  const toggleCommentDislike = (id: number) => {
    if (dislikedComments.includes(id)) {
      setDislikedComments((prev) => prev.filter((cid) => cid !== id));
    } else {
      setDislikedComments((prev) => [...prev, id]);
      setLikedComments((prev) => prev.filter((cid) => cid !== id));
    }
  };

  const handleStartReply = (id: number, author: string) => {
    setReplyingTo({ id, author });
    commentInputRef.current?.focus();
  };

  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "나",
      avatar: "😊",
      avatarBg: "#E8F4FD",
      content: commentInput,
      time: "방금 전",
      likes: 0,
      dislikes: 0,
      replyTo: replyingTo?.author,
    };

    if (replyingTo) {
      setComments((prev) => addReplyToComment(prev, replyingTo.id, newComment));
    } else {
      setComments((prev) => [...prev, newComment]);
    }

    setCommentInput("");
    setReplyingTo(null);
  };

  const handleGift = () => {
    if (onShowGiftPopup) onShowGiftPopup();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto">
      {/* 헤더 */}
      <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-white sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-1 -ml-1 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
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
        <div className="flex-1 mx-3 text-center">
          <span className="text-[15px] font-medium text-gray-900 truncate block">
            {post.boardId}
          </span>
        </div>
      </div>

      {/* 스크롤 영역 */}
      <div
        className="flex-1 overflow-y-auto"
        onClick={() => showMoreMenu && setShowMoreMenu(false)}
      >
        <div className="p-4 pb-24">
          {/* 작성자 정보 */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{ background: post.avatarBg }}
            >
              {post.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[15px] font-semibold text-gray-900">
                  {post.name}
                </span>
                {post.badge && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#E8F4FD] text-[#72C2FF] font-bold">
                    {post.badge}
                  </span>
                )}
              </div>
              <span className="text-[13px] text-gray-400">{post.meta}</span>
            </div>
            {/* 팔로우 버튼 */}
            <button
              onClick={onFollow}
              className={`text-[13px] font-medium ${
                isFollowed ? "text-gray-400" : "text-[#72C2FF]"
              }`}
            >
              {isFollowed ? "팔로잉" : "팔로우"}
            </button>
          </div>

          {/* 제목 */}
          <h2 className="text-[17px] font-bold text-gray-900 mb-3 leading-snug">
            {post.title}
          </h2>

          {/* 본문 */}
          {bodyString && (
            <p className="text-[15px] text-gray-700 leading-[1.7] whitespace-pre-wrap mb-4">
              {bodyString}
            </p>
          )}
          {bodyBlocks &&
            bodyBlocks.map((block, idx) => renderBlock(block, idx))}

          {/* 이미지 */}
          {post.images && post.images.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative bg-gray-100 rounded-xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`이미지 ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 투표 */}
          {pollState && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-[14px] font-semibold text-gray-900 mb-3">
                {pollState.question}
              </p>
              <div className="space-y-2">
                {pollState.options.map((opt, idx) => {
                  const percent =
                    pollState.totalVotes > 0
                      ? Math.round((opt.votes / pollState.totalVotes) * 100)
                      : 0;
                  const isVoted = pollState.votedOption === idx;
                  const hasVoted = pollState.votedOption !== undefined;

                  return (
                    <button
                      key={idx}
                      className={`w-full relative overflow-hidden rounded-lg border transition-all ${
                        isVoted
                          ? "border-[#72C2FF] bg-[#E8F4FD]"
                          : hasVoted
                            ? "border-gray-200 bg-white"
                            : "border-gray-200 bg-white hover:border-[#72C2FF]"
                      }`}
                      onClick={() => handleVote(idx)}
                      disabled={hasVoted}
                    >
                      {hasVoted && (
                        <div
                          className={`absolute inset-y-0 left-0 ${isVoted ? "bg-[#72C2FF]/20" : "bg-gray-100"}`}
                          style={{ width: `${percent}%` }}
                        />
                      )}
                      <div className="relative px-4 py-3 flex items-center justify-between">
                        <span
                          className={`text-[14px] ${isVoted ? "font-semibold text-[#72C2FF]" : "text-gray-700"}`}
                        >
                          {opt.text}
                        </span>
                        {hasVoted && (
                          <span
                            className={`text-[13px] font-semibold ${isVoted ? "text-[#72C2FF]" : "text-gray-400"}`}
                          >
                            {percent}%
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[12px] text-gray-400 mt-3 text-center">
                {pollState.totalVotes.toLocaleString()}명 참여
              </p>
            </div>
          )}

          {/* 액션 바 */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-4">
            <div className="flex items-center gap-1">
              {/* 좋아요/싫어요 */}
              <LikeDislikeButton
                likes={post.likes}
                isLiked={isLiked}
                isDisliked={isDisliked}
                onLike={onLike}
                onDislike={onDislike}
              />
              {/* 댓글 */}
              <span className="flex items-center gap-1 px-2 py-1.5 text-gray-400">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {post.comments}
              </span>
              {/* 조회수 */}
              <span className="flex items-center gap-1 px-2 py-1.5 text-gray-400">
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
              {/* 후원 */}
              <button
                className="px-2 py-1.5 rounded-lg text-gray-400 active:bg-gray-100 transition-colors"
                onClick={handleGift}
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
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </button>
            </div>
            {/* 더보기 버튼 (가로) */}
            <div className="relative">
              <button
                className="p-1.5 text-gray-300 hover:text-gray-500"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm8 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                </svg>
              </button>
              {/* 더보기 메뉴 */}
              {showMoreMenu && (
                <>
                  <div
                    className="fixed inset-0 z-[60]"
                    onClick={() => setShowMoreMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-[70]">
                    <button
                      className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-gray-700 active:bg-gray-50"
                      onClick={() => {
                        showToast(TOAST_MESSAGES.LINK_COPIED, {
                          type: "link",
                        });
                        setShowMoreMenu(false);
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      공유
                    </button>
                    <button
                      className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-gray-700 active:bg-gray-50"
                      onClick={() => {
                        showToast(TOAST_MESSAGES.POST_SAVED(post.name));
                        setShowMoreMenu(false);
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      저장
                    </button>
                    <button
                      className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-gray-700 active:bg-gray-50"
                      onClick={() => {
                        setShowBlockPopup(true);
                        setShowMoreMenu(false);
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                      className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-red-500 active:bg-gray-50"
                      onClick={() => {
                        setShowReportPopup(true);
                        setShowMoreMenu(false);
                      }}
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

          {/* 댓글 섹션 */}
          <div className="pt-4">
            <p className="text-[15px] font-bold text-gray-900 mb-4">
              댓글 <span className="text-[#72C2FF]">{totalComments}</span>
            </p>

            {/* 베스트 댓글 */}
            {bestComments.length > 0 && (
              <div className="mb-5 pb-5 border-b border-gray-100">
                {bestComments.slice(0, 3).map((comment) => (
                  <BestCommentItem
                    key={`best-${comment.id}`}
                    comment={comment}
                    likedComments={likedComments}
                    dislikedComments={dislikedComments}
                    onLike={toggleCommentLike}
                    onDislike={toggleCommentDislike}
                    onGift={handleGift}
                    onScrollTo={scrollToComment}
                  />
                ))}
              </div>
            )}

            {/* 전체 댓글 */}
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                depth={0}
                likedComments={likedComments}
                dislikedComments={dislikedComments}
                onLike={toggleCommentLike}
                onDislike={toggleCommentDislike}
                onReply={handleStartReply}
                onGift={handleGift}
                onReport={() => setShowReportPopup(true)}
                commentRef={(el) => {
                  commentRefs.current[comment.id] = el;
                }}
              />
            ))}
            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-[14px]">첫 댓글을 남겨보세요!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 댓글 입력 */}
      <CommentInput
        ref={commentInputRef}
        value={commentInput}
        onChange={setCommentInput}
        onSubmit={handleSubmitComment}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        position="sticky"
      />

      {/* 차단 확인 팝업 */}
      {showBlockPopup && (
        <ConfirmPopup
          title={`${post.name}님을 차단할까요?`}
          description={`앞으로 ${post.name}님의 글을 볼 수 없어요.`}
          confirmText="차단하기"
          isDestructive
          onConfirm={() => {
            showToast(TOAST_MESSAGES.USER_BLOCKED(post.name), {
              type: "block",
            });
            setShowBlockPopup(false);
          }}
          onCancel={() => setShowBlockPopup(false)}
        />
      )}

      {/* 신고 팝업 */}
      {showReportPopup && (
        <ReportPopup
          onReport={() => {
            showToast(TOAST_MESSAGES.REPORTED);
            setShowReportPopup(false);
          }}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </div>
  );
}
