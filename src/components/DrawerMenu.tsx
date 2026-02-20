import { useState } from "react";

export default function DrawerMenu({
  open,
  onClose,
  setCurrentPage,
  isLoggedIn,
  onLogout,
  onLoginClick,
}: {
  open: boolean;
  onClose: () => void;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}) {
  const [closing, setClosing] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  if (!open) return null;

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  const navigate = (page: string) => {
    setCurrentPage(page);
    handleClose();
  };

  const toggle = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isOpen = (key: string) => !collapsed[key];

  const recentCommunity = [
    {
      name: "메이플스토리 채널",
      icon: "🍁",
      sub: "3분 전",
      page: "channelDetail",
    },
    {
      name: "발로란트 채널",
      icon: "🎯",
      sub: "1시간 전",
      page: "channelDetail",
    },
    { name: "자유게시판", icon: "💬", sub: "2시간 전", page: "channelDetail" },
  ];

  const recentGames = [
    { name: "아이온2", icon: "⚔️", sub: "2시간 전", page: "samurai" },
    { name: "마비노기 모바일", icon: "🎵", sub: "어제", page: "samurai" },
  ];

  const following = [
    {
      name: "블루 아카이브",
      icon: "💙",
      sub: "8.7만",
      page: "channelDetail-profile",
    },
    {
      name: "리그 오브 레전드",
      icon: "⚡",
      sub: "45.2만",
      page: "channelDetail-profile",
    },
    { name: "원신", icon: "🌟", sub: "32.1만", page: "channelDetail-profile" },
  ];

  const interestCommunity = [
    {
      name: "RPG 게이머 모임",
      icon: "🛡️",
      sub: "1.2만명",
      page: "channelDetail",
    },
    { name: "쌀먹 꿀팁", icon: "🍚", sub: "8,400명", page: "channelDetail" },
    {
      name: "모바일게임 리뷰",
      icon: "📱",
      sub: "5,600명",
      page: "channelDetail",
    },
  ];

  const interestGames = [
    { emoji: "⚔️", name: "RPG", page: "samurai" },
    { emoji: "🏎️", name: "레이싱", page: "samurai" },
    { emoji: "🧩", name: "퍼즐", page: "samurai" },
    { emoji: "🏰", name: "전략", page: "samurai" },
  ];

  return (
    <div className="fixed inset-0 z-[200] max-w-md mx-auto overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          animation: closing
            ? "fadeOut 0.2s ease-in forwards"
            : "fadeIn 0.2s ease-out",
        }}
        onClick={handleClose}
      />

      <div
        className="absolute left-0 top-0 bottom-0 w-[80%] bg-white flex flex-col"
        style={{
          animation: closing
            ? "drawerOut 0.2s ease-in forwards"
            : "drawerIn 0.25s ease-out",
        }}
      >
        {isLoggedIn ? (
          <div className="flex-1 overflow-y-auto">
            {/* 오늘의 쌀먹 배너 */}
            <div
              className="mx-4 mt-4 mb-3 rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, #72C2FF 0%, #4A9FD9 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🍚</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-base">오늘의 쌀먹</p>
                  <p className="text-white/70 text-xs mt-0.5">
                    +3,450 포인트 · 28일 연속 출석
                  </p>
                </div>
              </div>
            </div>

            {/* 최근 본 커뮤니티 */}
            <Accordion
              title="최근 본 커뮤니티"
              isOpen={isOpen("rc")}
              onToggle={() => toggle("rc")}
            >
              {recentCommunity.map((c) => (
                <Row
                  key={c.name}
                  icon={c.icon}
                  label={c.name}
                  sub={c.sub}
                  onClick={() => navigate(c.page)}
                />
              ))}
            </Accordion>

            {/* 최근 본 게임 */}
            <Accordion
              title="최근 본 게임"
              isOpen={isOpen("rg")}
              onToggle={() => toggle("rg")}
            >
              {recentGames.map((g) => (
                <Row
                  key={g.name}
                  icon={g.icon}
                  label={g.name}
                  sub={g.sub}
                  onClick={() => navigate(g.page)}
                />
              ))}
            </Accordion>

            {/* 팔로잉 */}
            <Accordion
              title="팔로잉"
              isOpen={isOpen("fw")}
              onToggle={() => toggle("fw")}
            >
              {following.map((f) => (
                <Row
                  key={f.name}
                  icon={f.icon}
                  label={f.name}
                  sub={f.sub}
                  onClick={() => navigate(f.page)}
                />
              ))}
            </Accordion>

            {/* 관심 커뮤니티 */}
            <Accordion
              title="관심 커뮤니티"
              isOpen={isOpen("ic")}
              onToggle={() => toggle("ic")}
            >
              {interestCommunity.map((c) => (
                <Row
                  key={c.name}
                  icon={c.icon}
                  label={c.name}
                  sub={c.sub}
                  onClick={() => navigate(c.page)}
                />
              ))}
            </Accordion>

            {/* 관심 게임 */}
            <Accordion
              title="관심 게임"
              isOpen={isOpen("ig")}
              onToggle={() => toggle("ig")}
            >
              <div className="px-5 pb-3 flex flex-wrap gap-2">
                {interestGames.map((g) => (
                  <button
                    key={g.name}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-full text-sm text-gray-700 active:bg-gray-200"
                    onClick={() => navigate(g.page)}
                  >
                    {g.emoji} {g.name}
                  </button>
                ))}
              </div>
            </Accordion>

            {/* 고객센터 */}
            <Accordion
              title="고객센터"
              isOpen={isOpen("cs")}
              onToggle={() => toggle("cs")}
            >
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("inquiry")}
              >
                <span className="text-lg">💌</span>
                <span className="text-[15px] text-gray-700">1:1 문의</span>
              </button>
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("faq")}
              >
                <span className="text-lg">❓</span>
                <span className="text-[15px] text-gray-700">
                  자주 묻는 질문
                </span>
              </button>
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("hotNow")}
              >
                <span className="text-lg">📢</span>
                <span className="text-[15px] text-gray-700">공지사항</span>
              </button>
            </Accordion>
          </div>
        ) : (
          <div className="flex-1 flex flex-col pt-5">
            <div className="px-5 py-5 border-b border-gray-100">
              <p className="text-base text-gray-500 mb-3">
                로그인하고 쌀먹 혜택을 받아보세요
              </p>
              <button
                className="w-full py-3.5 rounded-xl text-base font-bold text-white active:opacity-90"
                style={{ backgroundColor: "#72C2FF" }}
                onClick={() => {
                  onLoginClick();
                  handleClose();
                }}
              >
                로그인
              </button>
            </div>

            <Accordion title="고객센터" isOpen={true} onToggle={() => {}}>
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("inquiry")}
              >
                <span className="text-lg">💌</span>
                <span className="text-[15px] text-gray-700">1:1 문의</span>
              </button>
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("faq")}
              >
                <span className="text-lg">❓</span>
                <span className="text-[15px] text-gray-700">
                  자주 묻는 질문
                </span>
              </button>
              <button
                className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-50"
                onClick={() => navigate("hotNow")}
              >
                <span className="text-lg">📢</span>
                <span className="text-[15px] text-gray-700">공지사항</span>
              </button>
            </Accordion>

            <div className="flex-1" />
          </div>
        )}

        {/* 하단 */}
        <div className="border-t border-gray-100 px-5 py-3.5 flex items-center justify-between">
          {isLoggedIn ? (
            <button
              className="text-sm text-gray-400"
              onClick={() => {
                onLogout();
                handleClose();
              }}
            >
              로그아웃
            </button>
          ) : (
            <div />
          )}
          <span className="text-xs text-gray-300">v1.0.0</span>
        </div>
      </div>

      <style>{`
        @keyframes drawerIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes drawerOut { from { transform: translateX(0); } to { transform: translateX(-100%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </div>
  );
}

function Accordion({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full px-5 py-3.5 flex items-center justify-between"
        onClick={onToggle}
      >
        <span className="text-sm font-bold text-gray-500">{title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && <div className="pb-2">{children}</div>}
    </div>
  );
}

function Row({
  icon,
  label,
  sub,
  onClick,
}: {
  icon: string;
  label: string;
  sub: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="w-full px-5 py-2 flex items-center gap-3 active:bg-gray-50"
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-[15px] text-gray-800 flex-1 truncate text-left">
        {label}
      </span>
      <span className="text-xs text-gray-400 shrink-0">{sub}</span>
    </button>
  );
}
