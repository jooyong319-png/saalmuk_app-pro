interface LikeDislikeButtonProps {
  likes: number;
  dislikes?: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  size?: "sm" | "md";
}

export default function LikeDislikeButton({
  likes,
  dislikes = 0,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  size = "md",
}: LikeDislikeButtonProps) {
  const baseScore = likes - dislikes;
  const myScore = isLiked ? 1 : isDisliked ? -1 : 0;
  const score = baseScore + myScore;

  const styles =
    size === "sm"
      ? { icon: "w-4 h-4", text: "text-[12px]", padding: "p-1" }
      : { icon: "w-5 h-5", text: "text-[13px]", padding: "p-1.5" };

  return (
    <div className="flex items-center gap-1">
      {/* 좋아요 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike();
        }}
        className={`${styles.padding} rounded-lg transition-colors ${
          isLiked ? "text-[#72C2FF] bg-[#E8F4FD]" : "text-gray-400 hover:bg-gray-100"
        }`}
      >
        <svg
          className={styles.icon}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
          />
        </svg>
      </button>

      {/* 점수 */}
      <span className={`${styles.text} font-medium min-w-[20px] text-center text-gray-400`}>
        {score}
      </span>

      {/* 싫어요 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDislike();
        }}
        className={`${styles.padding} rounded-lg transition-colors ${
          isDisliked ? "text-red-400 bg-red-50" : "text-gray-400 hover:bg-gray-100"
        }`}
      >
        <svg
          className={styles.icon}
          fill={isDisliked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"
          />
        </svg>
      </button>
    </div>
  );
}
