// @ts-nocheck
import { useState } from "react";
import type { PointSource } from "../types";
import LikeDislikeButton from "../../community/LikeDislikeButton";
import GiftPopup from "../../community/GiftPopup";

interface Props {
  source: PointSource;
  onPointClick: (source: PointSource) => void;
}

export default function PointCard({ source, onPointClick }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showGift, setShowGift] = useState(false);

  // 제목에서 [브랜드] 추출
  const brandMatch = source.title.match(/^\[([^\]]+)\]/);
  const brand = brandMatch ? brandMatch[0] : "";
  const titleRest = brandMatch
    ? source.title.slice(brand.length).trim()
    : source.title;

  // 마감 상태 배지
  const getStatusBadge = () => {
    if (source.status === "ended") {
      return { text: "마감", color: "bg-gray-400" };
    }
    return null;
  };

  const badge = getStatusBadge();

  return (
    <>
      <div
        onClick={() => onPointClick(source)}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
      >
        {/* 상단: 제목 + 마감 배지 */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold line-clamp-2 flex-1">
            {brand && <span className="text-[#72C2FF]">{brand}</span>}{" "}
            <span className="text-gray-900">{titleRest}</span>
          </h3>
          {badge && (
            <span
              className={`text-xs font-medium ${badge.color} text-white px-2 py-0.5 rounded shrink-0`}
            >
              {badge.text}
            </span>
          )}
        </div>

        {/* 하단: 좋아요/싫어요, 댓글, 조회수, 후원 | 등록일 */}
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-gray-50">
          {/* 왼쪽: 좋아요/싫어요, 댓글, 조회수, 후원 */}
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <LikeDislikeButton
              likes={source.likes ?? 0}
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
              <span className="text-xs">{source.comments ?? 0}</span>
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

          {/* 오른쪽: 등록일 */}
          <span className="text-xs text-gray-400">
            {source.createdAt ?? "1시간 전"}
          </span>
        </div>
      </div>

      {showGift && <GiftPopup onClose={() => setShowGift(false)} />}
    </>
  );
}
