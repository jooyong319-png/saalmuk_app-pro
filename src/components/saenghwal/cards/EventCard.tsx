// @ts-nocheck
import { useState } from "react";
import type { Event } from "../types";
import LikeDislikeButton from "../../community/LikeDislikeButton";
import GiftPopup from "../../community/GiftPopup";

interface Props {
  event: any;
  onEventClick: (event: any) => void;
  getStatusBadge: (
    status: string,
    dday: number,
  ) => { text: string; color: string };
  getTypeBadge: (type: string) => string;
  onMarkWon?: () => void;
  showWonButton?: boolean;
  isWon?: boolean;
  onToggleWon?: () => void;
}

export default function EventCard({
  event,
  onEventClick,
  getStatusBadge,
  getTypeBadge,
  onMarkWon,
  showWonButton,
  isWon,
  onToggleWon,
}: Props) {
  // 상태 뱃지 (completed도 발표완료로 표시)
  const badge =
    event.status === "completed"
      ? { text: "발표완료", color: "text-gray-400" }
      : getStatusBadge(event.status, event.dday);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showGift, setShowGift] = useState(false);

  return (
    <>
      <div
        onClick={() => onEventClick(event)}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      >
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="text-base">
              {event.platform === "인스타그램"
                ? "📷"
                : event.platform === "유튜브"
                  ? "▶️"
                  : event.platform === "페이스북"
                    ? "🔵"
                    : event.platform === "네이버블로그"
                      ? "🟢"
                      : event.platform === "X (트위터)"
                        ? "🐦"
                        : event.platform === "홈페이지"
                          ? "🌐"
                          : "🎁"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeBadge(event.type)}`}
            >
              {event.type}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-500">{event.prize}</span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400">
              {event.winners}명 당첨
            </span>
          </div>
          <span className={`text-xs font-medium ${badge.color}`}>
            {badge.text}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-50">
          {/* 왼쪽: 좋아요/싫어요, 댓글, 조회수, 후원 */}
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <LikeDislikeButton
              likes={event.likes}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={() => {
                setIsLiked(!isLiked);
                if (isDisliked) setIsDisliked(false);
              }}
              onDislike={() => {
                setIsDisliked(!isDisliked);
                if (isLiked) setIsLiked(false);
              }}
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
              <span className="text-xs">{event.comments}</span>
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
              <span className="text-xs">{event.views ?? 0}</span>
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

          {/* 오른쪽: 당첨 버튼 또는 등록일 */}
          <div onClick={(e) => e.stopPropagation()}>
            {showWonButton && onToggleWon ? (
              <button
                onClick={onToggleWon}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
                  isWon
                    ? "bg-gray-200 text-gray-500 hover:bg-gray-300"
                    : "bg-amber-400 text-white hover:bg-amber-500"
                }`}
              >
                당첨
              </button>
            ) : onMarkWon ? (
              <button
                onClick={onMarkWon}
                className="px-2 py-0.5 bg-amber-400 text-white text-[11px] font-bold rounded-full"
              >
                당첨
              </button>
            ) : (
              <span className="text-xs text-gray-400">
                {event.createdAt ?? event.registeredAt ?? "1일 전"}
              </span>
            )}
          </div>
        </div>
      </div>

      {showGift && <GiftPopup onClose={() => setShowGift(false)} />}
    </>
  );
}
