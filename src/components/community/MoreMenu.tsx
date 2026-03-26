import { useState } from "react";
import type { PostData } from "./types";
import { useToast, TOAST_MESSAGES } from "./Toast";
import ConfirmPopup from "./ConfirmPopup";
import ReportPopup from "./ReportPopup";

interface MoreMenuProps {
  post: PostData | null;
  position: { top: number; right: number } | null;
  onClose: () => void;
}

export default function MoreMenu({ post, position, onClose }: MoreMenuProps) {
  const { showToast } = useToast();
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);

  if (!post || !position) return null;

  return (
    <>
      {/* 드롭다운 메뉴 */}
      {!showBlockPopup && !showReportPopup && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div
            className="fixed bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50"
            style={{ top: position.top, right: position.right }}
          >
            <button
              className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-gray-700 active:bg-gray-50"
              onClick={() => {
                showToast(TOAST_MESSAGES.LINK_COPIED, { type: "link" });
                onClose();
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
                onClose();
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
              onClick={() => setShowBlockPopup(true)}
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
              className="w-full px-4 py-3 flex items-center gap-3 text-[15px] text-gray-700 active:bg-gray-50"
              onClick={() => setShowReportPopup(true)}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              신고
            </button>
          </div>
        </>
      )}

      {/* 차단 팝업 */}
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
            onClose();
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
            onClose();
          }}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </>
  );
}
