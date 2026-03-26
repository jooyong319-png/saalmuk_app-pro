import { useState } from "react";
import { useInterest } from "./community/InterestContext";
import { useRecent } from "./community/RecentContext";

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

  // 관심 컨텍스트에서 데이터 가져오기
  const { groups } = useInterest();

  // 최근 본 컨텍스트에서 데이터 가져오기
  const { recentGalleries, getVisitedTimeText } = useRecent();

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

  const isOpen = (key: string) => {
    if (key === "recent") {
      return collapsed[key] !== false; // 기본 열림
    }
    return collapsed[key] === true; // 나머지는 기본 접힘
  };

  // 관심 데이터 (컨텍스트에서 가져온 모든 채널)
  const interestItems = groups.flatMap((group) =>
    group.channels.map((channel) => ({
      name: channel.name,
      id: channel.id,
      page: `gallery-${channel.id}`,
    })),
  );

  // 최근 본 데이터 (컨텍스트에서 가져옴)
  const recentItems = recentGalleries.map((g) => ({
    ...g,
    visitedAtText: getVisitedTimeText(g.visitedAt),
    page: `gallery-${g.id}`,
  }));

  // 생활테크 데이터
  const lifeTechItems = [
    { name: "이벤트", page: "DailyReward" },
    { name: "장터", page: "DailyReward-market" },
    { name: "내 쿠폰함", page: "DailyReward-myCoupons" },
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
            {/* 프로필 + 채팅 */}
            <div className="px-5 pt-5 pb-5 border-b border-[#72C2FF]/30 bg-gradient-to-br from-[#72C2FF] via-[#8ECFFF] to-[#AADBFF]">
              {/* 로고 */}
              <img
                src="https://app.ssalmuk.com/images/m_img/Logo_ssalmuk.svg"
                alt="쌀먹"
                className="h-5 mb-4 opacity-90"
              />
              <div className="flex items-center gap-3">
                <img
                  src="https://edge.ssalmuk.com/editorImage/452483c1a34849f19fdd91b084f6cc6d.png"
                  alt="프로필"
                  className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-white/30"
                />
                <div className="flex-1">
                  <p className="font-bold text-white text-[17px]">쌀먹유저</p>
                  <p className="text-white/80 text-[14px] mt-0.5 font-semibold">
                    3,450 P
                  </p>
                </div>
                {/* 채팅 아이콘 */}
                <button
                  onClick={() => navigate("chat")}
                  className="relative p-2 rounded-full active:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {/* 뱃지 */}
                  <div className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border border-white/50">
                    <span className="text-[10px] text-white font-bold">3</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 최근 본 */}
            <Accordion
              title="최근 본"
              isOpen={isOpen("recent")}
              onToggle={() => toggle("recent")}
            >
              {recentItems.length > 0 ? (
                <>
                  {recentItems.slice(0, 3).map((item) => (
                    <Row
                      key={item.id}
                      label={item.name}
                      sub={item.visitedAtText}
                      onClick={() => navigate(item.page)}
                    />
                  ))}
                  <button
                    onClick={() => {
                      navigate("community");
                      // 최근 본 탭으로 이동하는 로직 필요시 추가
                    }}
                    className="w-full px-5 py-2 text-[13px] text-[#72C2FF] font-medium text-left active:bg-gray-100 transition-colors"
                  >
                    갤러리 최근 본으로 이동 →
                  </button>
                </>
              ) : (
                <p className="px-5 py-3 text-[13px] text-gray-400">
                  최근 본 갤러리가 없습니다
                </p>
              )}
            </Accordion>

            {/* 관심 */}
            <Accordion
              title="관심"
              isOpen={isOpen("interest")}
              onToggle={() => toggle("interest")}
            >
              {interestItems.length > 0 ? (
                <>
                  {interestItems.slice(0, 3).map((item) => (
                    <Row
                      key={item.id}
                      label={item.name}
                      onClick={() => navigate(item.page)}
                    />
                  ))}
                  <button
                    onClick={() => {
                      navigate("community");
                      // 관심 탭으로 이동하는 로직 필요시 추가
                    }}
                    className="w-full px-5 py-2 text-[13px] text-[#72C2FF] font-medium text-left active:bg-gray-100 transition-colors"
                  >
                    갤러리 관심으로 이동 →
                  </button>
                </>
              ) : (
                <p className="px-5 py-3 text-[13px] text-gray-400">
                  관심 갤러리가 없습니다
                </p>
              )}
            </Accordion>

            {/* 생활테크 */}
            <Accordion
              title="생활테크"
              isOpen={isOpen("lifetech")}
              onToggle={() => toggle("lifetech")}
            >
              {lifeTechItems.map((item) => (
                <Row
                  key={item.name}
                  label={item.name}
                  onClick={() => navigate(item.page)}
                />
              ))}
            </Accordion>

            {/* 고객센터 */}
            <Accordion
              title="고객센터"
              isOpen={isOpen("feedback")}
              onToggle={() => toggle("feedback")}
            >
              <Row label="의견" onClick={() => navigate("inquiry")} />
              <Row label="자주 묻는 질문" onClick={() => navigate("faq")} />
              <Row label="공지사항" onClick={() => navigate("hotNow")} />
            </Accordion>
          </div>
        ) : (
          /* 비로그인 상태 */
          <div className="flex-1 flex flex-col">
            <div className="px-5 pt-5 pb-6 border-b border-[#72C2FF]/30 bg-gradient-to-br from-[#72C2FF] via-[#8ECFFF] to-[#AADBFF]">
              {/* 로고 */}
              <img
                src="https://app.ssalmuk.com/images/m_img/Logo_ssalmuk.svg"
                alt="쌀먹"
                className="h-5 mb-4 opacity-90"
              />
              <p className="text-[15px] text-white/90 mb-4">
                로그인하고 쌀먹 혜택을 받아보세요
              </p>
              <button
                className="w-full py-3.5 rounded-xl text-base font-bold text-[#72C2FF] bg-white active:bg-gray-100"
                onClick={() => {
                  onLoginClick();
                  handleClose();
                }}
              >
                로그인
              </button>
            </div>

            {/* 비로그인 - 고객센터만 */}
            <Accordion title="고객센터" isOpen={true} onToggle={() => {}}>
              <Row label="의견" onClick={() => navigate("inquiry")} />
              <Row label="자주 묻는 질문" onClick={() => navigate("faq")} />
              <Row label="공지사항" onClick={() => navigate("hotNow")} />
            </Accordion>

            <div className="flex-1" />
          </div>
        )}

        {/* 하단 */}
        <div className="border-t border-gray-200 px-5 py-3.5 flex items-center justify-between">
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
    <div className="border-b border-gray-200">
      <button
        className="w-full px-5 py-3.5 flex items-center gap-2 active:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <span className="text-[15px] font-semibold text-gray-800 flex-1 text-left">
          {title}
        </span>
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
  label,
  sub,
  onClick,
}: {
  label: string;
  sub?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="w-full px-5 py-2.5 flex items-center gap-3 active:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <span className="text-[15px] text-gray-800 flex-1 truncate text-left">
        {label}
      </span>
      {sub && <span className="text-xs text-gray-400 shrink-0">{sub}</span>}
    </button>
  );
}
