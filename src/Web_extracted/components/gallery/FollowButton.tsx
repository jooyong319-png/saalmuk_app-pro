import { useState } from "react";
import ConfirmPopup from "./ConfirmPopup";
import { useToast } from "./Toast";

interface FollowButtonProps {
  name: string;
  isFollowed: boolean;
  onFollow: () => void;
  size?: "sm" | "md";
  className?: string;
}

export function FollowButton({
  name,
  isFollowed,
  onFollow,
  size = "md",
  className = "",
}: FollowButtonProps) {
  const [showUnfollowPopup, setShowUnfollowPopup] = useState(false);
  const { showToast } = useToast();

  const sizeClasses = size === "sm" ? "text-[12px]" : "text-[13px]";

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFollowed) {
      setShowUnfollowPopup(true);
    } else {
      onFollow();
      showToast(`${name}님이 새 글을 올리거나 거래할 때 알려드릴게요`);
    }
  };

  return (
    <>
      <button
        className={`${sizeClasses} font-semibold px-3 py-1 rounded-full transition-colors shrink-0 ${
          isFollowed
            ? "text-gray-400 bg-gray-100"
            : "text-[#72C2FF] bg-[#E8F4FD]"
        } ${className}`}
        onClick={handleClick}
      >
        {isFollowed ? "팔로잉" : "팔로우"}
      </button>

      {showUnfollowPopup && (
        <ConfirmPopup
          title="팔로우를 취소할까요?"
          description={`팔로우를 취소하면 ${name}님의 새 글이나 활동 알림을 받을 수 없어요.`}
          confirmText="팔로우 취소"
          cancelText="닫기"
          isDestructive
          onConfirm={() => {
            onFollow();
            showToast(`${name}님 팔로우를 취소했어요`);
            setShowUnfollowPopup(false);
          }}
          onCancel={() => setShowUnfollowPopup(false)}
        />
      )}
    </>
  );
}
