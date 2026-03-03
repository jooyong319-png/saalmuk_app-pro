import type { PostData } from "./types";
import LikeDislikeButton from "./LikeDislikeButton";

interface PostDetailProps {
  post: PostData;
  isLiked: boolean;
  isDisliked: boolean;
  isFollowed: boolean;
  onLike: () => void;
  onDislike: () => void;
  onFollow: () => void;
  onClose: () => void;
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
}: PostDetailProps) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto overflow-y-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={onClose}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-bold">{post.boardId || "커뮤니티"}</span>
        <div className="w-6" />
      </div>

      {/* 본문 */}
      <div className="p-4 flex-1">
        {/* 작성자 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ background: post.avatarBg }}
              >
                {post.avatar}
              </div>
              {post.authorId && (
                <span className="text-[9px] text-[#72C2FF] font-bold">주민</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[15px] font-semibold">{post.name}</p>
                {post.badge && (
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#E8F4FD] text-[#72C2FF]">
                    {post.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-gray-400">{post.meta}</p>
            </div>
          </div>
          <button
            className={`text-[13px] font-semibold px-3 py-1 rounded-full ${
              isFollowed
                ? "text-gray-400 bg-gray-100"
                : "text-[#72C2FF] bg-[#E8F4FD]"
            }`}
            onClick={onFollow}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </button>
        </div>

        {/* 제목 */}
        <h2 className="text-[18px] font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          {post.isVerified && (
            <img
              src="https://ssalmuk.com/images/img_commu/cm_list_adminmark_size22.svg"
              alt="인증글"
              className="w-5 h-5"
            />
          )}
          {post.title}
        </h2>

        {/* 본문 내용 */}
        {typeof post.body === "string" ? (
          <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
            {post.body}
          </p>
        ) : (
          <div className="mb-4">
            {post.body.map((block, idx) =>
              block.type === "text" ? (
                <p
                  key={idx}
                  className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap mb-3"
                >
                  {block.content}
                </p>
              ) : (
                <img
                  key={idx}
                  src={block.src}
                  alt={block.alt}
                  className="w-full rounded-xl mb-3"
                />
              )
            )}
          </div>
        )}
        {post.images?.map((img, idx) => (
          <img key={idx} src={img} alt="" className="w-full rounded-xl mb-3" />
        ))}

        {/* 액션 */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-3">
            <LikeDislikeButton
              likes={post.likes}
              dislikes={post.dislikes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={onLike}
              onDislike={onDislike}
            />
            <span className="flex items-center gap-1 text-gray-400 text-[13px]">
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
          </div>
          <span className="flex items-center gap-1 text-[12px] text-gray-400">
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
        </div>

        {/* 댓글 영역 */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-[15px] font-semibold mb-3">댓글 {post.comments}</p>
          {[
            {
              author: "유저A",
              content: "좋은 정보 감사합니다!",
              time: "1시간 전",
              likes: 12,
            },
            {
              author: "유저B",
              content: "저도 해봐야겠네요 ㅎㅎ",
              time: "2시간 전",
              likes: 5,
            },
          ].map((c, i) => (
            <div key={i} className="flex gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 shrink-0">
                {c.author[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium">{c.author}</span>
                  <span className="text-[11px] text-gray-400">{c.time}</span>
                </div>
                <p className="text-[14px] text-gray-700 mt-0.5">{c.content}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span>👍 {c.likes}</span>
                  <span>·</span>
                  <button>답글</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 입력 */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none"
        />
        <button className="text-[14px] font-semibold text-[#72C2FF]">등록</button>
      </div>
    </div>
  );
}
