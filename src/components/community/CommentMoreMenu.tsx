import { useState } from "react";
import { useToast, TOAST_MESSAGES } from "./Toast";
import { useFollow } from "./FollowContext";
import ConfirmPopup from "./ConfirmPopup";
import ReportPopup from "./ReportPopup";

interface CommentMoreMenuProps {
  authorName: string;
  onClose: () => void;
}

export default function CommentMoreMenu({
  authorName,
  onClose,
}: CommentMoreMenuProps) {
  const { showToast } = useToast();
  const { isFollowing, toggleFollow } = useFollow();
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  const followed = isFollowing(authorName);

  // 팔로우 핸들러
  const handleFollow = () => {
    toggleFollow(authorName);
    onClose();
  };

  // 차단 확인 핸들러
  const handleBlockConfirm = () => {
    showToast(TOAST_MESSAGES.USER_BLOCKED(authorName), { type: "block" });
    setShowBlockPopup(false);
    onClose();
  };

  // 신고 핸들러
  const handleReport = () => {
    showToast(TOAST_MESSAGES.REPORTED);
    setShowReportPopup(false);
    onClose();
  };

  return (
    <>
      {/* 드롭다운 메뉴 */}
      {!showBlockPopup && !showReportPopup && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 w-28 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
            {/* 팔로우/팔로우 취소 */}
            <button
              onClick={handleFollow}
              className="w-full px-3 py-2.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {followed ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                )}
              </svg>
              {followed ? "팔로우 취소" : "팔로우"}
            </button>

            {/* 차단 */}
            <button
              onClick={() => setShowBlockPopup(true)}
              className="w-full px-3 py-2.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-400"
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

            {/* 신고 */}
            <button
              onClick={() => setShowReportPopup(true)}
              className="w-full px-3 py-2.5 text-left text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <svg
                className="w-3.5 h-3.5 text-gray-400"
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
        </>
      )}

      {/* 차단 확인 팝업 */}
      {showBlockPopup && (
        <ConfirmPopup
          title={`${authorName}님을 차단할까요?`}
          description={`앞으로 ${authorName}님의 글을 볼 수 없어요.`}
          confirmText="차단하기"
          isDestructive
          onConfirm={handleBlockConfirm}
          onCancel={() => setShowBlockPopup(false)}
        />
      )}

      {/* 신고 팝업 */}
      {showReportPopup && (
        <ReportPopup
          onReport={handleReport}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </>
  );
}
