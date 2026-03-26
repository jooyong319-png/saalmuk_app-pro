// @ts-nocheck
import { useState, useRef } from "react";
import type { PointSource } from "../types";
import LikeDislikeButton from "../../community/LikeDislikeButton";
import GiftPopup from "../../community/GiftPopup";
import CommentMoreMenu from "../../community/CommentMoreMenu";
import ConfirmPopup from "../../community/ConfirmPopup";
import ReportPopup from "../../community/ReportPopup";
import { useToast, TOAST_MESSAGES } from "../../community/Toast";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  avatarBg: string;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
  replyTo?: string;
  replies?: Comment[];
  isBest?: boolean;
}

const dummyComments: Comment[] = [
  {
    id: 1,
    author: "포인트헌터",
    avatar: "🎯",
    avatarBg: "#DBEAFE",
    content: "오늘 퀴즈 정답 감사합니다!",
    time: "10분 전",
    likes: 12,
    dislikes: 0,
    isBest: true,
    replies: [
      {
        id: 101,
        author: "쌀먹왕",
        avatar: "🍚",
        avatarBg: "#FEF3C7",
        content: "저도 덕분에 맞췄어요 ㅎㅎ",
        time: "5분 전",
        likes: 3,
        dislikes: 0,
        replyTo: "포인트헌터",
      },
    ],
  },
  {
    id: 2,
    author: "앱테크초보",
    avatar: "🌱",
    avatarBg: "#D1FAE5",
    content: "매일 올려주시면 좋겠어요~",
    time: "30분 전",
    likes: 8,
    dislikes: 0,
    isBest: true,
  },
];

function CommentItem({
  comment,
  depth = 0,
  likedComments,
  dislikedComments,
  onLike,
  onDislike,
  onReply,
  onGift,
  commentRef,
}: {
  comment: Comment;
  depth?: number;
  likedComments: number[];
  dislikedComments: number[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onReply: (id: number, author: string) => void;
  onGift: () => void;
  commentRef?: (el: HTMLDivElement | null) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const isLiked = likedComments.includes(comment.id);
  const isDisliked = dislikedComments.includes(comment.id);
  const avatarSize = depth === 0 ? "w-9 h-9 text-base" : "w-7 h-7 text-sm";

  return (
    <div
      ref={commentRef}
      className={depth > 0 ? "ml-6 mt-2 pl-3 border-l border-gray-100" : "mb-4"}
    >
      <div className="flex gap-2.5">
        <div
          className={`${avatarSize} rounded-full flex items-center justify-center shrink-0`}
          style={{ background: comment.avatarBg }}
        >
          {comment.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-gray-900">
              {comment.author}
            </span>
            <span className="text-[11px] text-gray-400">{comment.time}</span>
          </div>
          <p className="text-[14px] text-gray-700 mt-1 leading-relaxed">
            {comment.replyTo && (
              <span className="text-[#72C2FF] font-medium">
                @{comment.replyTo}{" "}
              </span>
            )}
            {comment.content}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <LikeDislikeButton
              likes={comment.likes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={() => onLike(comment.id)}
              onDislike={() => onDislike(comment.id)}
              size="sm"
            />
            <button
              className="text-[12px] text-gray-400 font-medium"
              onClick={() => onReply(comment.id, comment.author)}
            >
              답글
            </button>
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
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-300"
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
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 베스트 댓글 아이템
function BestCommentItem({
  comment,
  likedComments,
  dislikedComments,
  onLike,
  onDislike,
  onGift,
  onScrollTo,
}: {
  comment: Comment;
  likedComments: number[];
  dislikedComments: number[];
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  onGift: () => void;
  onScrollTo: (id: number) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-start gap-2.5 mb-4">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
        style={{ background: comment.avatarBg }}
      >
        {comment.avatar}
      </div>
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
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
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

interface Props {
  source: PointSource;
  onClose: () => void;
  onDeadline?: () => void;
}

export default function PointDetailModal({
  source,
  onClose,
  onDeadline,
}: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const { showToast } = useToast();
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [dislikedComments, setDislikedComments] = useState<number[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: number; author: string } | null>(
    null,
  );
  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

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

  const brandMatch = source.title.match(/^\[([^\]]+)\]/);
  const brand = brandMatch ? brandMatch[0] : "";
  const titleRest = brandMatch
    ? source.title.slice(brand.length).trim()
    : source.title;

  const author = {
    name: "앱테크마스터",
    avatar: "🔥",
    followers: 324,
    timeAgo: source.createdAt ?? "2시간 전",
  };

  const handleLike = (id: number) => {
    if (likedComments.includes(id)) {
      setLikedComments(likedComments.filter((c) => c !== id));
    } else {
      setLikedComments([...likedComments, id]);
      setDislikedComments(dislikedComments.filter((c) => c !== id));
    }
  };

  const handleDislike = (id: number) => {
    if (dislikedComments.includes(id)) {
      setDislikedComments(dislikedComments.filter((c) => c !== id));
    } else {
      setDislikedComments([...dislikedComments, id]);
      setLikedComments(likedComments.filter((c) => c !== id));
    }
  };

  const handleReply = (id: number, authorName: string) => {
    setReplyTo({ id, author: authorName });
  };

  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "나",
      avatar: "😊",
      avatarBg: "#E0E7FF",
      content: commentInput,
      time: "방금 전",
      likes: 0,
      dislikes: 0,
      replyTo: replyTo?.author,
    };
    if (replyTo) {
      setComments(
        comments.map((c) =>
          c.id === replyTo.id
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : c,
        ),
      );
    } else {
      setComments([newComment, ...comments]);
    }
    setCommentInput("");
    setReplyTo(null);
  };

  const countComments = (cmts: Comment[]): number =>
    cmts.reduce((acc, c) => acc + 1 + countComments(c.replies || []), 0);

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={onClose} className="p-1">
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="flex-1 text-base font-medium">
            {brand && <span className="text-[#72C2FF]">{brand}</span>}{" "}
            <span className="text-gray-900">{titleRest}</span>
          </h3>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => showMoreMenu && setShowMoreMenu(false)}
        >
          <div className="p-4">
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">{author.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{author.name}</p>
                  <p className="text-xs text-gray-500">
                    {author.timeAgo} · 팔로워 {author.followers}
                  </p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-[#72C2FF] text-white text-sm font-medium rounded-full hover:bg-[#5BB0F0] transition-colors">
                팔로우
              </button>
            </div>

            {/* 본문 내용 */}
            <div className="mb-4">
              <p className="text-gray-900 leading-relaxed">
                {source.desc ||
                  "2월 카드 이벤트로 최대 80 만원 병오년 용돈 받아요."}
              </p>
            </div>

            {/* 좋아요/싫어요, 댓글, 조회수, 후원 | 더보기 */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <LikeDislikeButton
                  likes={source.likes ?? 0}
                  isLiked={isLiked}
                  isDisliked={false}
                  onLike={() => setIsLiked(!isLiked)}
                  onDislike={() => {}}
                  size="sm"
                />
                <div className="flex items-center gap-1 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-xs">{countComments(comments)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-xs">{source.views ?? 0}</span>
                </div>
                <button
                  onClick={() => setShowGift(true)}
                  className="flex items-center gap-1 text-gray-400 hover:text-amber-500 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </button>
              </div>
              {/* 더보기 메뉴 */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1 text-gray-400"
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
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {showMoreMenu && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        showToast("링크가 복사되었어요");
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      공유
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        onDeadline?.();
                        showToast(
                          source.status === "ended"
                            ? "마감이 취소되었어요"
                            : "마감 처리되었어요",
                        );
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {source.status === "ended" ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        )}
                      </svg>
                      {source.status === "ended" ? "마감 취소" : "마감하기"}
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        setShowBlockPopup(true);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
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
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      차단
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        setShowReportPopup(true);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
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
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      신고
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 참여하기 버튼 */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <button className="w-full py-4 bg-[#72C2FF] text-white font-bold rounded-xl hover:bg-[#5BB0F0] transition-colors text-lg">
                참여하기
              </button>
            </div>

            {/* 댓글 섹션 */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-4">
                댓글{" "}
                <span className="text-[#72C2FF]">
                  {countComments(comments)}
                </span>
              </h4>

              {/* 베스트 댓글 */}
              {comments.filter((c) => c.isBest).length > 0 && (
                <div className="mb-5 pb-5 border-b border-gray-100">
                  {comments
                    .filter((c) => c.isBest)
                    .slice(0, 3)
                    .map((comment) => (
                      <BestCommentItem
                        key={`best-${comment.id}`}
                        comment={comment}
                        likedComments={likedComments}
                        dislikedComments={dislikedComments}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        onGift={() => setShowGift(true)}
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
                  likedComments={likedComments}
                  dislikedComments={dislikedComments}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onReply={handleReply}
                  onGift={() => setShowGift(true)}
                  commentRef={(el) => {
                    commentRefs.current[comment.id] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 댓글 입력 */}
        <div className="p-3 bg-white border-t border-gray-100">
          {replyTo && (
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs text-gray-500">
                <span className="text-[#72C2FF]">@{replyTo.author}</span>에게
                답글 작성 중
              </span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-xs text-gray-400"
              >
                취소
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#72C2FF]"
              onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
            />
            <button
              onClick={handleSubmitComment}
              className="px-4 py-3 bg-[#72C2FF] text-white font-medium rounded-full hover:bg-[#5BB0F0] transition-colors text-sm"
            >
              등록
            </button>
          </div>
        </div>
      </div>

      {showGift && <GiftPopup onClose={() => setShowGift(false)} />}
      {showBlockPopup && (
        <ConfirmPopup
          title={`${author.name}님을 차단할까요?`}
          description={`앞으로 ${author.name}님의 글을 볼 수 없어요.`}
          confirmText="차단하기"
          isDestructive
          onConfirm={() => {
            setShowBlockPopup(false);
            showToast(TOAST_MESSAGES.USER_BLOCKED(author.name), {
              type: "block",
            });
          }}
          onCancel={() => setShowBlockPopup(false)}
        />
      )}
      {showReportPopup && (
        <ReportPopup
          targetType="게시글"
          onReport={() => {
            setShowReportPopup(false);
            showToast(TOAST_MESSAGES.REPORTED);
          }}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </>
  );
}
