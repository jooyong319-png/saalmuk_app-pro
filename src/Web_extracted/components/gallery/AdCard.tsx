import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useToast, TOAST_MESSAGES } from "./Toast";

interface AdCardProps {
  ad: {
    id: string;
    avatar: string;
    avatarBg: string;
    name: string;
    time: string;
    media?: {
      type: "image" | "video";
      src: string;
      thumbnail?: string;
    };
    title: string;
    link?: string;
  };
  index?: number;
}

export default function AdCard({ ad, index = 0 }: AdCardProps) {
  const { showToast } = useToast();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    if (ad.link) {
      window.open(ad.link, "_blank");
    }
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fadeUp"
      style={{
        animationDelay: `${index * 30}ms`,
        zIndex: isMenuOpen ? 30 : 1,
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: ad.avatarBg }}
          >
            {ad.avatar}
          </div>
          <div>
            <p className="text-[15px] font-semibold text-gray-900">{ad.name}</p>
            <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
              <span>{ad.time}</span>
              <span>·</span>
              <span className="text-[#72C2FF] font-semibold">PROMOTED</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu
            size="lg"
            zIndex={50}
            onOpenChange={setIsMenuOpen}
            items={[
              { icon: "hide", label: "광고 숨기기", onClick: () => {} },
              { icon: "report", label: "광고 신고", onClick: () => showToast(TOAST_MESSAGES.REPORTED) },
            ]}
          />
          <button
            className={`text-[13px] font-semibold px-3 py-1 rounded-full transition-colors ${
              isFollowed
                ? "text-gray-400 bg-gray-100"
                : "text-[#72C2FF] bg-[#E8F4FD]"
            }`}
            onClick={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>

      {/* 미디어 */}
      {ad.media && (
        <div
          className="relative bg-black cursor-pointer"
          onClick={handleClick}
        >
          {ad.media.type === "video" ? (
            <video
              src={ad.media.src}
              poster={ad.media.thumbnail}
              className="w-full max-h-[400px] object-contain"
              controls
            />
          ) : (
            <img
              src={ad.media.src}
              alt={ad.title}
              className="w-full max-h-[400px] object-contain"
            />
          )}
        </div>
      )}

      {/* 하단 */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          <p className="text-[15px] text-gray-700 flex-1 truncate">{ad.title}</p>
          <button
            className="ml-3 px-4 py-1.5 bg-gray-100 text-gray-700 text-[13px] font-semibold rounded-full hover:bg-gray-200 transition-colors shrink-0"
            onClick={handleClick}
          >
            더 보기
          </button>
        </div>

        {/* 액션 버튼 (선택사항 - 광고에도 좋아요 등 표시할 경우) */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-[13px] text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              광고
            </span>
          </div>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Sponsored
          </span>
        </div>
      </div>
    </div>
  );
}
