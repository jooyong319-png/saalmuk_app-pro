// @ts-nocheck
import { useState } from "react";
import EventCard from "../cards/EventCard";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function EventTab({ ctx }: Props) {
  const {
    events,
    subTab,
    setSubTab,
    setShowMyEntries,
    eventViewType,
    eventFilters,
    setEventFilters,
    setShowEventFilter,
    getStatusBadge,
    getTypeBadge,
    setShowEventDetail,
  } = ctx;

  const [todaySort, setTodaySort] = useState("latest");

  const tabStatusMap = {
    진행중: "progress",
    오늘마감: "today",
    오늘발표: "announce",
    발표완료: "ended",
  };

  const filteredEvents = events
    .filter((e) => {
      const statusMatch = tabStatusMap[subTab]
        ? e.status === tabStatusMap[subTab]
        : true;
      const prizeMatch =
        eventFilters.prizeTypes.length === 0 ||
        eventFilters.prizeTypes.includes(e.prize);
      const platformMatch =
        eventFilters.platforms.length === 0 ||
        eventFilters.platforms.includes(e.platform);
      const typeMatch =
        eventFilters.entryTypes.length === 0 ||
        eventFilters.entryTypes.includes(e.type);
      return statusMatch && prizeMatch && platformMatch && typeMatch;
    })
    .sort((a, b) =>
      todaySort === "popular" ? b.likes - a.likes : b.id - a.id,
    );

  const activeFilterCount =
    eventFilters.prizeTypes.length +
    eventFilters.entryTypes.length +
    eventFilters.platforms.length;

  return (
    <>
      {/* 서브탭 */}
      <div className="bg-white px-4 py-3">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {["진행중", "오늘마감", "오늘발표", "발표완료", "내응모함"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab === "내응모함") setShowMyEntries(true);
                  else setSubTab(tab);
                }}
                className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                  subTab === tab && tab !== "내응모함"
                    ? "text-white border-none"
                    : "bg-white text-gray-500 border-[1.5px] border-gray-200"
                }`}
                style={
                  subTab === tab && tab !== "내응모함"
                    ? { background: "#72C2FF" }
                    : {}
                }
              >
                {tab}
              </button>
            ),
          )}
        </div>
      </div>

      {/* 배너 */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-[#5AB0F0] to-[#72C2FF] rounded-2xl p-4 text-white mb-4">
          <p className="text-xs opacity-80 mb-1">🔥 오늘의 핫딜</p>
          <p className="font-bold text-lg">스타벅스 당첨 이벤트</p>
          <p className="text-sm opacity-90">지금 바로 응모하세요!</p>
        </div>
      </div>

      {/* 필터 바 */}
      <div className="bg-white px-4 py-2 border-y border-gray-100">
        <div className="flex items-center justify-between gap-2">
          {/* 왼쪽: 최신순/인기순 토글 + 활성 필터 태그 */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0">
            <button
              onClick={() =>
                setTodaySort(todaySort === "latest" ? "popular" : "latest")
              }
              className="flex items-center gap-1 text-xs font-medium text-gray-700 shrink-0"
            >
              {todaySort === "latest" ? "최신순" : "인기순"}
              <span className="text-gray-400">↕</span>
            </button>

            {eventFilters.prizeTypes.map((f) => (
              <span
                key={f}
                className="flex items-center gap-0.5 px-2 py-0.5 bg-sky-100 text-sky-700 rounded-full text-xs whitespace-nowrap shrink-0"
              >
                {f}
                <button
                  onClick={() =>
                    setEventFilters((prev) => ({
                      ...prev,
                      prizeTypes: prev.prizeTypes.filter((v) => v !== f),
                    }))
                  }
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
            {eventFilters.entryTypes.map((f) => (
              <span
                key={f}
                className="flex items-center gap-0.5 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs whitespace-nowrap shrink-0"
              >
                {f}
                <button
                  onClick={() =>
                    setEventFilters((prev) => ({
                      ...prev,
                      entryTypes: prev.entryTypes.filter((v) => v !== f),
                    }))
                  }
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
            {eventFilters.platforms.map((f) => (
              <span
                key={f}
                className="flex items-center gap-0.5 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs whitespace-nowrap shrink-0"
              >
                {f}
                <button
                  onClick={() =>
                    setEventFilters((prev) => ({
                      ...prev,
                      platforms: prev.platforms.filter((v) => v !== f),
                    }))
                  }
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>

          {/* 오른쪽: 오늘등록 건수 + 필터 버튼 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-sm text-gray-700 whitespace-nowrap">
              오늘등록
            </span>
            <span className="text-sm text-sky-500 font-medium whitespace-nowrap">
              ({filteredEvents.length}건)
            </span>

            <button
              onClick={() => setShowEventFilter(true)}
              className={`flex items-center gap-1 p-2 rounded-lg transition-colors ${
                activeFilterCount > 0
                  ? "bg-sky-100 text-sky-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              {activeFilterCount > 0 && (
                <span className="text-xs font-bold">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 이벤트 목록 */}
      <div className="px-4 pb-24 pt-3 space-y-3">
        {eventViewType === "card" ? (
          filteredEvents.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              해당하는 이벤트가 없습니다
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEventClick={setShowEventDetail}
                getStatusBadge={getStatusBadge}
                getTypeBadge={getTypeBadge}
              />
            ))
          )
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => setShowEventDetail(event)}
                className="p-3 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${getTypeBadge(event.type)}`}
                  >
                    {event.type}
                  </span>
                  {event.hot && (
                    <span className="text-[10px] text-red-500">🔥 HOT</span>
                  )}
                  {event.dday === 0 && (
                    <span className="text-[10px] text-red-500 font-medium">
                      오늘마감
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">🎁 {event.prize}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>❤️ {event.likes}</span>
                    <span>마감 {event.period.split(" ~ ")[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
