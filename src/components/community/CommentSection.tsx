import { useState, useRef } from "react";
import type { Comment } from "./CommentTypes";
import { addReplyToComment, countComments } from "./CommentTypes";
import BestCommentItem from "./BestCommentItem";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
  initialComments: Comment[];
  onGift: () => void;
  onReport: () => void;
}

export default function CommentSection({
  initialComments,
  onGift,
  onReport,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [dislikedComments, setDislikedComments] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<{
    id: number;
    author: string;
  } | null>(null);

  const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const inputRef = useRef<HTMLInputElement | null>(null);

  const totalComments = countComments(comments);
  const bestComments = comments.filter((c) => c.isBest);

  // 좋아요 토글
  const toggleCommentLike = (id: number) => {
    setLikedComments((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setDislikedComments((prev) => prev.filter((c) => c !== id));
  };

  // 싫어요 토글
  const toggleCommentDislike = (id: number) => {
    setDislikedComments((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
    setLikedComments((prev) => prev.filter((c) => c !== id));
  };

  // 답글 시작
  const handleStartReply = (id: number, author: string) => {
    setReplyingTo({ id, author });
    inputRef.current?.focus();
  };

  // 베스트 댓글 바로가기
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

  // 댓글 등록
  const handleSubmitComment = () => {
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "나",
      avatar: "😊",
      avatarBg: "#E0E7FF",
      content: commentInput,
      time: "방금",
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

  return (
    <>
      {/* 댓글 섹션 */}
      <div className="pt-2 pb-24">
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
                onGift={onGift}
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
            onGift={onGift}
            onReport={onReport}
            commentRef={(el) => {
              commentRefs.current[comment.id] = el;
            }}
          />
        ))}

        {/* 댓글 없을 때 */}
        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-[14px]">첫 댓글을 남겨보세요!</p>
          </div>
        )}
      </div>

      {/* 댓글 입력 - 하단 고정 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-50 max-w-md mx-auto">
        {replyingTo && (
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[13px] text-[#72C2FF]">
              @{replyingTo.author}에게 답글 작성 중
            </span>
            <button
              className="text-[13px] text-gray-400"
              onClick={() => setReplyingTo(null)}
            >
              취소
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              replyingTo ? "답글을 입력하세요" : "댓글을 입력하세요"
            }
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#72C2FF]/30"
            onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
          />
          <button
            className={`text-[14px] font-semibold px-3 py-2 rounded-full transition-colors ${
              commentInput.trim()
                ? "text-white bg-[#72C2FF]"
                : "text-gray-400 bg-gray-100"
            }`}
            onClick={handleSubmitComment}
            disabled={!commentInput.trim()}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
}
