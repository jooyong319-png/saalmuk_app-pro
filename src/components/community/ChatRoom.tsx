import { useState, useRef, useEffect } from "react";

interface ChatRoomProps {
  profile: {
    name: string;
    avatar: string;
    avatarBg?: string;
  };
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  isMine: boolean;
  time: string;
  read?: boolean;
}

export default function ChatRoom({ profile, onClose }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "보스 공략 어떻게 해요?",
      isMine: true,
      time: "오후 1:20",
      read: true,
    },
    {
      id: 2,
      text: "공략 영상 확인해보세요~",
      isMine: false,
      time: "오후 1:25",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const nickname = profile.name || "알 수 없음";

  // 이미지 URL인지 확인
  const isImageUrl = (str: string) =>
    str.startsWith("http") || str.startsWith("/") || str.startsWith("data:");
  const hasImageAvatar = isImageUrl(profile.avatar);

  // 스크롤 하단 유지
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const timeStr = `${period} ${displayHours}:${minutes}`;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: inputText.trim(),
        isMine: true,
        time: timeStr,
        read: false,
      },
    ]);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 z-[10005] flex justify-center bg-black/40">
      <div className="w-full max-w-[480px] bg-white flex flex-col h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 -ml-1">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* 프로필 */}
          <div className="flex items-center gap-3">
            {hasImageAvatar ? (
              <img
                src={profile.avatar}
                alt={nickname}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{
                  background:
                    profile.avatarBg ||
                    "linear-gradient(135deg, #72C2FF, #5BA8E6)",
                }}
              >
                {profile.avatar}
              </div>
            )}
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">
                {nickname}
              </h2>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="text-xs text-gray-400">활동 중</span>
              </div>
            </div>
          </div>
        </div>
        {/* 더보기 버튼 */}
        <button className="p-1">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}
            >
              {/* 상대방 메시지 - 아바타 */}
              {!msg.isMine && (
                <div className="flex items-end gap-2">
                  {hasImageAvatar ? (
                    <img
                      src={profile.avatar}
                      alt={nickname}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                      style={{
                        background:
                          profile.avatarBg ||
                          "linear-gradient(135deg, #72C2FF, #5BA8E6)",
                      }}
                    >
                      {profile.avatar}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-2.5 shadow-sm max-w-[240px]">
                      <p className="text-[14px] text-gray-800">{msg.text}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 ml-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              )}

              {/* 내 메시지 */}
              {msg.isMine && (
                <div className="flex flex-col items-end">
                  <div className="bg-[#72C2FF] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[240px]">
                    <p className="text-[14px] text-white">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1 mr-1">
                    <span className="text-[11px] text-gray-400">{msg.time}</span>
                    {msg.read && (
                      <span className="text-[11px] text-[#72C2FF]">읽음</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3">
          {/* 이모지 버튼 */}
          <button className="p-1 text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {/* 입력창 */}
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="메시지 입력..."
              className="w-full bg-transparent text-[14px] text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>
          {/* 전송 버튼 */}
          <button
            onClick={handleSend}
            className={`p-2.5 rounded-full transition-colors ${
              inputText.trim()
                ? "bg-[#72C2FF] text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}