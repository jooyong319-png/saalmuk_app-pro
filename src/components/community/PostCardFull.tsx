import { useState } from "react";
import type { PostData, ContentBlock } from "./types";
import LikeDislikeButton from "./LikeDislikeButton";

interface PostCardFullProps {
  post: PostData;
  index: number;
  isLiked: boolean;
  isDisliked: boolean;
  isFollowed: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFollow: () => void;
  onShowGiftPopup: () => void;
  onShowProfile: () => void;
  onShowMoreMenu: (position: { top: number; right: number }) => void;
  onClick: () => void;
}

export default function PostCardFull({
  post,
  index,
  isLiked,
  isDisliked,
  isFollowed,
  onLike,
  onDislike,
  onFollow,
  onShowGiftPopup,
  onShowProfile,
  onShowMoreMenu,
  onClick,
}: PostCardFullProps) {
  const [isBodyExpanded, setIsBodyExpanded] = useState(false);
  const [pollState, setPollState] = useState(post.poll);

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

  const isLongBody = isBlockBody
    ? bodyBlocks!.length > 2 ||
      bodyBlocks!.some(
        (b) => b.type === "text" && (b.content?.length || 0) > 100,
      )
    : (bodyString?.length || 0) > 100;

  const imageBlockCount =
    bodyBlocks?.filter((b) => b.type === "image").length || 0;
  const hasMultipleImages = isBlockBody
    ? imageBlockCount > 1
    : post.images && post.images.length > 1;

  // 블록 렌더링
  const renderBlock = (block: ContentBlock, idx: number) => {
    if (block.type === "text") {
      return (
        <p
          key={idx}
          className="text-[15px] text-gray-700 leading-[1.6] whitespace-pre-wrap"
          style={{ fontWeight: 500 }}
        >
          {block.content}
        </p>
      );
    } else if (block.type === "image") {
      return (
        <div
          key={idx}
          className="relative bg-gray-100 rounded-xl overflow-hidden my-3"
        >
          <img
            src={block.src}
            alt={block.alt || `이미지 ${idx + 1}`}
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-contain rounded-xl"
          />
        </div>
      );
    }
    return null;
  };

  // 접힌 상태의 콘텐츠 렌더링
  const renderCollapsedContent = () => {
    if (!bodyBlocks) return null;
    const textBlocks = bodyBlocks.filter((b) => b.type === "text").slice(0, 1);
    const imageBlocks = bodyBlocks.filter((b) => b.type === "image");

    return (
      <>
        {textBlocks.map((block, idx) => (
          <p
            key={idx}
            className="text-[15px] text-gray-700 leading-[1.6] whitespace-pre-wrap line-clamp-3"
            style={{ fontWeight: 500 }}
          >
            {block.content}
          </p>
        ))}
        {imageBlocks.length > 0 && (
          <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
            {imageBlocks.slice(0, 3).map((block, idx) => (
              <div
                key={idx}
                className="relative w-28 h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                onClick={() => setIsBodyExpanded(true)}
              >
                <img
                  src={block.src}
                  alt={block.alt || `미리보기 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 2 && imageBlocks.length > 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-[13px] font-bold">
                      +{imageBlocks.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div
      className="py-4 border-b border-gray-100 animate-fadeUp"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onClick}
    >
      {/* 작성자 정보 */}
      <div
        className="flex items-center justify-between mb-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 cursor-pointer"
              style={{ background: post.avatarBg }}
              onClick={onShowProfile}
            >
              {post.avatar}
            </div>
            {post.authorId && (
              <span className="text-[9px] text-[#72C2FF] font-bold">주민</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p
                className="text-[15px] font-semibold text-gray-900 cursor-pointer"
                onClick={onShowProfile}
              >
                {post.name}
              </p>
              {post.badge && (
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#E8F4FD] text-[#72C2FF] font-medium">
                  {post.badge}
                </span>
              )}
            </div>
            <p className="text-[13px] text-gray-400">{post.meta}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`text-[13px] font-semibold px-3 py-1 rounded-full transition-colors ${isFollowed ? "text-gray-400" : "text-[#72C2FF]"}`}
            onClick={onFollow}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div onClick={(e) => e.stopPropagation()}>
        {/* 제목 */}
        <h3
          className="text-[16px] font-bold text-gray-900 mb-2 leading-snug flex items-center gap-1.5 cursor-pointer"
          onClick={onClick}
        >
          {post.isVerified && (
            <img
              src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
              alt="인증글"
              className="w-5 h-5 shrink-0"
            />
          )}
          {post.title}
        </h3>

        {/* 본문 */}
        <div className="relative cursor-pointer" onClick={onClick}>
          {isBlockBody ? (
            isBodyExpanded ? (
              <>{bodyBlocks!.map((block, idx) => renderBlock(block, idx))}</>
            ) : (
              renderCollapsedContent()
            )
          ) : (
            <>
              <p
                className={`text-[15px] text-gray-700 leading-[1.6] whitespace-pre-wrap ${!isBodyExpanded && isLongBody ? "line-clamp-3" : ""}`}
                style={{ fontWeight: 500 }}
              >
                {bodyString}
              </p>
              {post.images && post.images.length > 0 && !isBodyExpanded && (
                <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                  {post.images.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-28 h-28 rounded-lg overflow-hidden bg-gray-100 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBodyExpanded(true);
                      }}
                    >
                      <img
                        src={img}
                        alt={`미리보기 ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {idx === 2 && post.images!.length > 3 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white text-[13px] font-bold">
                            +{post.images!.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {post.images && post.images.length > 0 && isBodyExpanded && (
                <div className="space-y-3 mt-3">
                  {post.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative bg-gray-100 rounded-xl overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`이미지 ${idx + 1}`}
                        className="w-full h-auto max-h-[400px] object-contain rounded-xl"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 더보기 버튼 */}
          {(isLongBody || hasMultipleImages) && !isBodyExpanded && (
            <button
              className="mt-2 text-[13px] text-gray-400 font-medium hover:text-gray-600"
              onClick={(e) => {
                e.stopPropagation();
                setIsBodyExpanded(true);
              }}
            >
              ...더 보기
            </button>
          )}
        </div>

        {/* 투표 UI */}
        {pollState && (
          <div
            className="mt-4 p-4 bg-gray-50 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-5 h-5 text-[#72C2FF]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="M9 14l2 2 4-4" />
              </svg>
              <span className="text-[14px] font-semibold text-gray-700">
                투표
              </span>
            </div>
            <div className="space-y-2">
              {pollState.options.map((option, idx) => {
                const percentage =
                  pollState.totalVotes > 0
                    ? Math.round((option.votes / pollState.totalVotes) * 100)
                    : 0;
                const isVoted = pollState.votedOption === idx;
                const hasVoted = pollState.votedOption !== undefined;

                return (
                  <button
                    key={idx}
                    onClick={() => handleVote(idx)}
                    className={`w-full relative overflow-hidden rounded-lg border transition-all ${
                      isVoted
                        ? "border-[#72C2FF] bg-[#E8F4FD]"
                        : hasVoted
                          ? "border-gray-200 bg-white"
                          : "border-gray-200 bg-white active:bg-[#F8FCFF]"
                    }`}
                    disabled={hasVoted}
                  >
                    {/* 진행률 바 */}
                    {hasVoted && (
                      <div
                        className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                          isVoted ? "bg-[#72C2FF]/20" : "bg-gray-100"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    )}
                    <div className="relative flex items-center justify-between px-4 py-3">
                      <span
                        className={`text-[14px] ${isVoted ? "font-semibold text-[#72C2FF]" : "text-gray-700"}`}
                      >
                        {option.text}
                      </span>
                      {hasVoted && (
                        <span
                          className={`text-[13px] font-semibold ${isVoted ? "text-[#72C2FF]" : "text-gray-500"}`}
                        >
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[12px] text-gray-400 text-left flex items-center gap-1">
              <span>ⓘ</span>
              <span>
                투표 {pollState.totalVotes.toLocaleString()}명 참여 중
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 액션 바 */}
      <div
        className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1">
          <LikeDislikeButton
            likes={post.likes}
            dislikes={post.dislikes}
            isLiked={isLiked}
            isDisliked={isDisliked}
            onLike={onLike}
            onDislike={onDislike}
          />
          {/* 댓글 */}
          <button
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100"
            onClick={onClick}
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-[13px]">{post.comments}</span>
          </button>
          {/* 조회수 */}
          <span className="flex items-center gap-1 px-2 py-1.5 text-[13px] text-gray-400">
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
          {/* 후원 */}
          <button
            className="px-2 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-amber-500"
            onClick={onShowGiftPopup}
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
        <button
          className="p-1.5 text-gray-300 hover:text-gray-500"
          onClick={(e) => {
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
  );
}
