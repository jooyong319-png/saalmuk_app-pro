// @ts-nocheck
import { useState } from "react";
import type { SaenghwalCtx } from "../types";
import PointDetailModal from "./PointDetailModal";
import PointWriteModal from "./PointWriteModal";

interface Props {
  ctx: SaenghwalCtx;
}

export default function MiscModals({ ctx }: Props) {
  const {
    showWriteModal,
    setShowWriteModal,
    writeStep,
    setWriteStep,
    showSearchModal,
    setShowSearchModal,
    showNotification,
    setShowNotification,
    showMyPage,
    setShowMyPage,
    showPointDetail,
    setShowPointDetail,
    mainTab,
    showSellFlow,
    setShowSellFlow,
    sellStep,
    setSellStep,
    userStats,
    setUserStats,
    setCurrentPage,
    setPointSources,
  } = ctx;

  // 마감/마감취소 토글 핸들러
  const handleDeadline = () => {
    if (showPointDetail) {
      const newStatus = showPointDetail.status === "ended" ? "" : "ended";

      // pointSources 업데이트
      setPointSources((prev) =>
        prev.map((source) =>
          source.id === showPointDetail.id
            ? { ...source, status: newStatus }
            : source,
        ),
      );

      // 모달에 표시되는 source도 업데이트
      setShowPointDetail({ ...showPointDetail, status: newStatus });
    }
  };

  const WriteModal = () => {
    // 이벤트 글쓰기 폼 데이터
    const [eventForm, setEventForm] = useState({
      title: "",
      type: "추첨",
      prize: "",
      winners: "",
      startDate: "",
      endDate: "",
      host: "",
      platform: "",
      link: "",
      description: "",
      images: [],
    });

    // 포인트 글쓰기 폼 데이터
    const [pointForm, setPointForm] = useState({
      appName: "",
      category: "앱테크",
      reward: "",
      rewardType: "포인트",
      difficulty: "쉬움",
      description: "",
      link: "",
      images: [],
    });

    // 설문조사 글쓰기 폼 데이터
    const [surveyForm, setSurveyForm] = useState({
      type: "일반설문",
      content: "",
      email: "",
      contact: "",
    });

    // 커뮤니티 글쓰기 폼 데이터
    const [communityForm, setCommunityForm] = useState({
      category: "자유",
      title: "",
      content: "",
    });

    const getModalTitle = () => {
      switch (mainTab) {
        case "event":
          return "이벤트 공유하기";
        case "point":
          return "포인트 정보 공유";
        case "survey":
          return "설문조사 의뢰하기";
        case "market":
          return "기프티콘 판매하기";
        case "community":
          return "글쓰기";
        default:
          return "글쓰기";
      }
    };

    const getTabIcon = () => {
      switch (mainTab) {
        case "event":
          return "🎁";
        case "point":
          return "💰";
        case "survey":
          return "📋";
        case "market":
          return "🛒";
        case "community":
          return "💬";
        default:
          return "✏️";
      }
    };

    const getTabColor = () => {
      switch (mainTab) {
        case "event":
          return "sky";
        case "point":
          return "amber";
        case "survey":
          return "emerald";
        case "market":
          return "rose";
        case "community":
          return "purple";
        default:
          return "gray";
      }
    };

    // 탭별 스타일 클래스
    const getTabStyles = () => {
      switch (mainTab) {
        case "event":
          return {
            bgLight: "bg-sky-50",
            textDark: "text-sky-700",
            textMedium: "text-sky-600",
            bgSolid: "bg-sky-500 hover:bg-sky-600",
            bgActive: "bg-sky-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-sky-500",
            badgeBg: "bg-sky-100",
            badgeText: "text-sky-700",
          };
        case "point":
          return {
            bgLight: "bg-amber-50",
            textDark: "text-amber-700",
            textMedium: "text-amber-600",
            bgSolid: "bg-amber-500 hover:bg-amber-600",
            bgActive: "bg-amber-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-amber-500",
            badgeBg: "bg-amber-100",
            badgeText: "text-amber-700",
          };
        case "survey":
          return {
            bgLight: "bg-emerald-50",
            textDark: "text-emerald-700",
            textMedium: "text-emerald-600",
            bgSolid: "bg-emerald-500 hover:bg-emerald-600",
            bgActive: "bg-emerald-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-emerald-500",
            badgeBg: "bg-emerald-100",
            badgeText: "text-emerald-700",
          };
        case "community":
          return {
            bgLight: "bg-purple-50",
            textDark: "text-purple-700",
            textMedium: "text-purple-600",
            bgSolid: "bg-purple-500 hover:bg-purple-600",
            bgActive: "bg-purple-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-purple-500",
            badgeBg: "bg-purple-100",
            badgeText: "text-purple-700",
          };
        default:
          return {
            bgLight: "bg-gray-50",
            textDark: "text-gray-700",
            textMedium: "text-gray-600",
            bgSolid: "bg-gray-500 hover:bg-gray-600",
            bgActive: "bg-gray-500 text-white",
            bgInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
            border: "focus:border-gray-500",
            badgeBg: "bg-gray-100",
            badgeText: "text-gray-700",
          };
      }
    };

    const styles = getTabStyles();

    // 장터는 기존 SellFlowModal 사용
    if (mainTab === "market") {
      setShowWriteModal(false);
      setSellStep(1);
      setShowSellFlow(true);
      return null;
    }

    // 포인트는 PointWriteModal 사용
    if (mainTab === "point") {
      return (
        <PointWriteModal
          onClose={() => {
            setShowWriteModal(false);
            setWriteStep(1);
          }}
          onSubmit={(data) => {
            // pointSources에 새 글 추가
            const newPoint = {
              id: Date.now(),
              category: data.category,
              title: `[${data.appName}] ${data.title}`,
              desc: data.description,
              reward: data.category,
              icon: "💰",
              hot: false,
              likes: 0,
              comments: 0,
              views: 0,
              status: "",
              createdAt: "방금 전",
            };
            setPointSources((prev) => [newPoint, ...prev]);
            setShowWriteModal(false);
            setWriteStep(1);
          }}
        />
      );
    }

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
          <button
            onClick={() => {
              setShowWriteModal(false);
              setWriteStep(1);
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <svg
              className="w-6 h-6"
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
          {mainTab === "survey" ? (
            <h3 className="text-base font-medium text-gray-900">
              <span>설문조사</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>의뢰하기</span>
            </h3>
          ) : (
            <h3 className="text-lg font-bold text-gray-900">
              {getModalTitle()}
            </h3>
          )}
          <div className="w-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Step 1: 작성 */}
          {writeStep === 1 && (
            <div className="p-4">
              {/* 탭 안내 배너 - 설문조사일 때는 간소화 */}
              {mainTab === "survey" ? (
                <p className="text-sm text-gray-500 text-center mb-6">
                  의뢰하시고 싶은 설문 내용을 남겨주시면,
                  <br />
                  확인 후 빠르게 연락 드리겠습니다.
                </p>
              ) : (
                <div className={`${styles.bgLight} rounded-xl p-4 mb-6`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTabIcon()}</span>
                      <p className={`font-medium ${styles.textDark}`}>
                        {getModalTitle()}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">
                      {mainTab === "event" && (
                        <span className="flex items-center gap-1">
                          이벤트 등록시
                          <span className="font-bold text-sky-500">
                            +30포인트
                          </span>
                        </span>
                      )}
                      {mainTab === "point" &&
                        "포인트 적립 꿀팁을 공유해주세요!"}
                      {mainTab === "community" &&
                        "자유롭게 이야기를 나눠보세요!"}
                    </p>
                  </div>
                </div>
              )}

              {/* 이벤트 폼 */}
              {mainTab === "event" && (
                <div className="space-y-5">
                  {/* 주최사 + 당첨자 수 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        주최사*
                      </label>
                      <input
                        type="text"
                        value={eventForm.host}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, host: e.target.value })
                        }
                        placeholder="스타벅스"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        당첨자 수 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="number"
                        value={eventForm.winners}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            winners: e.target.value,
                          })
                        }
                        placeholder="100"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* 이벤트 제목 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      이벤트 제목 *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      placeholder="예: 스타벅스 아메리카노 100명 추첨"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                    />
                  </div>

                  {/* 이벤트 링크 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      이벤트 링크 *
                    </label>
                    <input
                      type="url"
                      value={eventForm.link}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, link: e.target.value })
                      }
                      placeholder="https://"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                    />
                  </div>

                  {/* 시작일 + 종료일 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        시작일 *
                      </label>
                      <input
                        type="date"
                        value={eventForm.startDate}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            startDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        종료일 *
                      </label>
                      <input
                        type="date"
                        value={eventForm.endDate}
                        onChange={(e) =>
                          setEventForm({
                            ...eventForm,
                            endDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:border-sky-400 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* 경품정보 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      경품정보*
                    </label>
                    <div
                      className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4"
                      style={{
                        overflowX: "scroll",
                        WebkitOverflowScrolling: "touch",
                        touchAction: "pan-x",
                      }}
                    >
                      {[
                        "현금/자산",
                        "가전",
                        "식음료",
                        "상품권",
                        "뷰티",
                        "문화",
                        "기타",
                      ].map((p) => (
                        <button
                          key={p}
                          onClick={() =>
                            setEventForm({ ...eventForm, prize: p })
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all border shrink-0 ${
                            eventForm.prize === p
                              ? "bg-sky-500 text-white border-sky-500"
                              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {p === "기타" ? "※ 기타" : p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 응모형태 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      응모형태*
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["추첨", "선착순", "출석", "미션", "퀴즈", "기타"].map(
                        (t) => (
                          <button
                            key={t}
                            onClick={() =>
                              setEventForm({ ...eventForm, type: t })
                            }
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${
                              eventForm.type === t
                                ? "bg-sky-500 text-white border-sky-500"
                                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            {t}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* 응모 플랫폼 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      응모 플랫폼*
                    </label>
                    <div
                      className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4"
                      style={{
                        overflowX: "scroll",
                        WebkitOverflowScrolling: "touch",
                        touchAction: "pan-x",
                      }}
                    >
                      {[
                        { name: "인스타그램", emoji: "📷" },
                        { name: "유튜브", emoji: "▶️" },
                        { name: "페이스북", emoji: "🔵" },
                        { name: "홈페이지", emoji: "🏠" },
                        { name: "네이버블로그", emoji: "🟢" },
                        { name: "X (트위터)", emoji: "🐦" },
                        { name: "기타", emoji: "※" },
                      ].map((pl) => (
                        <button
                          key={pl.name}
                          onClick={() =>
                            setEventForm({ ...eventForm, platform: pl.name })
                          }
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all border shrink-0 ${
                            eventForm.platform === pl.name
                              ? "bg-sky-500 text-white border-sky-500"
                              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          <span className="text-xs">{pl.emoji}</span>
                          <span>{pl.name === "기타" ? "※ 기타" : pl.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 내용 텍스트에어리어 */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <textarea
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          description: e.target.value.slice(0, 2000),
                        })
                      }
                      placeholder="내용을 입력하세요"
                      rows={5}
                      className="w-full px-4 py-3 focus:outline-none resize-none text-sm"
                    />
                    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">
                        {eventForm.description?.length ?? 0}/2,000
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 포인트 폼 */}
              {mainTab === "point" && (
                <div className="space-y-4">
                  {/* 사진 첨부 영역 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        사진/동영상
                      </label>
                      <span className="text-xs text-amber-500">
                        포인트 등록시 보너스 포인트 지급
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {/* 사진 추가 버튼 */}
                      <label className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <svg
                          className="w-6 h-6 text-gray-400 mb-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-xs text-gray-500">
                          {pointForm.images.length}/5
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files).slice(
                              0,
                              5 - pointForm.images.length,
                            );
                            const newImages = files.map((file) =>
                              URL.createObjectURL(file),
                            );
                            setPointForm({
                              ...pointForm,
                              images: [...pointForm.images, ...newImages].slice(
                                0,
                                5,
                              ),
                            });
                          }}
                        />
                      </label>
                      {/* 업로드된 이미지들 */}
                      {pointForm.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative flex-shrink-0 w-20 h-20"
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            onClick={() =>
                              setPointForm({
                                ...pointForm,
                                images: pointForm.images.filter(
                                  (_, i) => i !== idx,
                                ),
                              })
                            }
                            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1 left-1 px-1 py-0.5 bg-amber-500 text-white text-[10px] rounded">
                              대표
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        "앱테크",
                        "광고",
                        "출석",
                        "미션",
                        "게임",
                        "설문",
                        "기타",
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() =>
                            setPointForm({ ...pointForm, category: cat })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            pointForm.category === cat
                              ? "bg-amber-500 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      앱/서비스명 *
                    </label>
                    <input
                      type="text"
                      value={pointForm.appName}
                      onChange={(e) =>
                        setPointForm({ ...pointForm, appName: e.target.value })
                      }
                      placeholder="예: 토스, 캐시워크, 리브메이트"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보상 *
                      </label>
                      <input
                        type="text"
                        value={pointForm.reward}
                        onChange={(e) =>
                          setPointForm({ ...pointForm, reward: e.target.value })
                        }
                        placeholder="500"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        보상 유형
                      </label>
                      <select
                        value={pointForm.rewardType}
                        onChange={(e) =>
                          setPointForm({
                            ...pointForm,
                            rewardType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                      >
                        <option value="포인트">포인트</option>
                        <option value="현금">현금</option>
                        <option value="기프티콘">기프티콘</option>
                        <option value="캐시">캐시</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      다운로드/참여 링크
                    </label>
                    <input
                      type="url"
                      value={pointForm.link}
                      onChange={(e) =>
                        setPointForm({ ...pointForm, link: e.target.value })
                      }
                      placeholder="https://"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세 설명 *
                    </label>
                    <textarea
                      value={pointForm.description}
                      onChange={(e) =>
                        setPointForm({
                          ...pointForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="포인트 적립 방법, 꿀팁 등을 자세히 작성해주세요"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* 설문조사 의뢰 폼 */}
              {mainTab === "survey" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설문 유형 <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {["일반설문", "퀵설문"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setSurveyForm({ ...surveyForm, type })}
                          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                            surveyForm.type === type
                              ? "bg-gray-800 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      설문내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={surveyForm.content}
                      onChange={(e) =>
                        setSurveyForm({
                          ...surveyForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="의뢰하실 설문의 내용, 목적, 대상 등을 자세히 작성해주세요"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={surveyForm.email}
                      onChange={(e) =>
                        setSurveyForm({ ...surveyForm, email: e.target.value })
                      }
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      담당자님 성함 / 연락처{" "}
                      <span className="text-gray-400 text-xs">
                        (필수사항 아님)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={surveyForm.contact}
                      onChange={(e) =>
                        setSurveyForm({
                          ...surveyForm,
                          contact: e.target.value,
                        })
                      }
                      placeholder="홍길동 / 010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none"
                    />
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    onClick={() => {
                      if (surveyForm.content && surveyForm.email) {
                        setWriteStep(3);
                      }
                    }}
                    disabled={!surveyForm.content || !surveyForm.email}
                    className={`w-full py-4 rounded-xl font-bold text-white mt-4 transition-colors ${
                      surveyForm.content && surveyForm.email
                        ? "bg-gray-800 hover:bg-gray-900"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    의뢰하기
                  </button>
                </div>
              )}

              {/* 커뮤니티 폼 */}
              {mainTab === "community" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      카테고리 *
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {["자유", "질문", "정보", "후기", "꿀팁", "잡담"].map(
                        (cat) => (
                          <button
                            key={cat}
                            onClick={() =>
                              setCommunityForm({
                                ...communityForm,
                                category: cat,
                              })
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              communityForm.category === cat
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {cat}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      제목 *
                    </label>
                    <input
                      type="text"
                      value={communityForm.title}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="제목을 입력하세요"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      내용 *
                    </label>
                    <textarea
                      value={communityForm.content}
                      onChange={(e) =>
                        setCommunityForm({
                          ...communityForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="내용을 입력하세요"
                      rows={8}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">이미지</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span className="text-sm">링크</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: 미리보기 */}
          {writeStep === 2 && (
            <div className="p-4">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">미리보기</p>

                {/* 이벤트 미리보기 */}
                {mainTab === "event" && eventForm.title && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-700">
                        {eventForm.type}
                      </span>
                      {eventForm.endDate && (
                        <span className="text-xs text-gray-400">
                          ~{eventForm.endDate}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {eventForm.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      {eventForm.prize && (
                        <p className="text-gray-600">
                          🎁 {eventForm.prize}{" "}
                          {eventForm.winners && `(${eventForm.winners}명)`}
                        </p>
                      )}
                      {eventForm.host && (
                        <p className="text-gray-600">🏢 {eventForm.host}</p>
                      )}
                      {eventForm.platform && (
                        <p className="text-gray-600">📱 {eventForm.platform}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 포인트 미리보기 */}
                {mainTab === "point" && pointForm.appName && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-700">
                        {pointForm.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {pointForm.difficulty}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {pointForm.appName}
                    </h3>
                    <p className="text-amber-600 font-bold mb-2">
                      +{pointForm.reward} {pointForm.rewardType}
                    </p>
                    {pointForm.description && (
                      <p className="text-sm text-gray-500">
                        {pointForm.description}
                      </p>
                    )}
                  </div>
                )}

                {/* 설문 의뢰 미리보기 */}
                {mainTab === "survey" &&
                  surveyForm.content &&
                  surveyForm.email && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {surveyForm.type}
                        </span>
                        <span className="text-xs text-gray-400">설문 의뢰</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap line-clamp-3">
                        {surveyForm.content}
                      </p>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>📧 {surveyForm.email}</p>
                        {surveyForm.contact && <p>👤 {surveyForm.contact}</p>}
                      </div>
                    </div>
                  )}

                {/* 커뮤니티 미리보기 */}
                {mainTab === "community" && communityForm.title && (
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
                        {communityForm.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {communityForm.title}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {communityForm.content}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setWriteStep(1)}
                  className="py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200"
                >
                  수정하기
                </button>
                <button
                  onClick={() => setWriteStep(3)}
                  className={`py-3 text-white font-bold rounded-xl ${styles.bgSolid}`}
                >
                  등록하기
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 등록 완료 */}
          {writeStep === 3 && (
            <div className="p-4 text-center py-12">
              <div
                className={`w-24 h-24 ${mainTab === "survey" ? "bg-gray-100" : "bg-emerald-100"} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <svg
                  className={`w-12 h-12 ${mainTab === "survey" ? "text-gray-600" : "text-emerald-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {mainTab === "survey" ? "의뢰 접수 완료!" : "등록 완료!"}
              </h3>
              <p className="text-gray-500 mb-6">
                {mainTab === "survey"
                  ? "설문 의뢰가 접수되었습니다. 검토 후 빠르게 연락드리겠습니다."
                  : "게시글이 등록되었습니다."}
              </p>

              {mainTab !== "survey" && (
                <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm text-amber-700 font-medium">
                    🎉 보상 안내
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    정보 공유로 50 쌀먹캐시가 적립되었어요!
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setShowWriteModal(false);
                  setWriteStep(1);
                }}
                className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600"
              >
                확인
              </button>
            </div>
          )}
        </div>

        {/* 하단 등록하기 버튼 */}
        {mainTab !== "survey" &&
          writeStep !== 3 &&
          (() => {
            const isEventValid =
              mainTab !== "event" ||
              (eventForm.host.trim() &&
                eventForm.winners.toString().trim() &&
                eventForm.title.trim() &&
                eventForm.link.trim() &&
                eventForm.startDate &&
                eventForm.endDate &&
                eventForm.prize &&
                eventForm.type &&
                eventForm.platform);
            return (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <button
                  onClick={() => isEventValid && setWriteStep(3)}
                  disabled={!isEventValid}
                  className={`w-full py-4 font-bold text-base rounded-xl transition-colors ${
                    isEventValid
                      ? "bg-[#72C2FF] text-white active:bg-[#5AB0F0]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  등록하기
                </button>
              </div>
            );
          })()}
      </div>
    );
  };

  const SearchModal = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchHistory] = useState([
      "스타벅스 이벤트",
      "토스 포인트",
      "설문조사 500원",
      "기프티콘",
    ]);
    const popularSearches = [
      "스타벅스",
      "CU",
      "맥도날드",
      "토스",
      "페이코",
      "설문조사",
      "출석체크",
      "선착순",
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 검색 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          <button onClick={() => setShowSearchModal(false)} className="p-1">
            <svg
              className="w-6 h-6 text-gray-600"
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
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이벤트, 설문조사, 기프티콘 검색"
              className="w-full px-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* 최근 검색어 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">최근 검색어</h3>
              <button className="text-xs text-gray-400">전체 삭제</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((term, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200"
                >
                  <span>{term}</span>
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* 인기 검색어 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">인기 검색어</h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 bg-sky-50 text-sky-600 rounded-full text-sm font-medium hover:bg-sky-100"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* 추천 이벤트 */}
          <div className="mt-6">
            <h3 className="font-bold text-gray-900 mb-3">
              🔥 지금 인기있는 이벤트
            </h3>
            <div className="space-y-2">
              {[
                {
                  title: "스타벅스 아메리카노 100명 추첨",
                  badge: "추첨",
                  hot: true,
                },
                {
                  title: "CU 편의점 상품권 선착순",
                  badge: "선착순",
                  hot: true,
                },
                {
                  title: "토스 포인트 500원 적립",
                  badge: "포인트",
                  hot: false,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-lg font-bold text-sky-500">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.title}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${item.hot ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationModal = () => {
    const notifications = [
      {
        id: 1,
        type: "event",
        title: "스타벅스 이벤트 당첨!",
        desc: "아메리카노 기프티콘이 도착했어요",
        time: "방금",
        read: false,
        icon: "🎁",
      },
      {
        id: 2,
        type: "cash",
        title: "쌀먹캐시 적립",
        desc: "설문조사 참여 보상 +500원",
        time: "10분 전",
        read: false,
        icon: "💰",
      },
      {
        id: 3,
        type: "trade",
        title: "거래 완료",
        desc: "구매하신 기프티콘이 도착했어요",
        time: "1시간 전",
        read: false,
        icon: "🛒",
      },
      {
        id: 4,
        type: "survey",
        title: "새로운 설문조사",
        desc: "MZ세대 소비습관 조사 - 1,000원",
        time: "3시간 전",
        read: true,
        icon: "📋",
      },
      {
        id: 5,
        type: "event",
        title: "마감 임박!",
        desc: "참여한 이벤트가 내일 마감이에요",
        time: "어제",
        read: true,
        icon: "⏰",
      },
      {
        id: 6,
        type: "system",
        title: "공지사항",
        desc: "생활쌀먹 v2.0 업데이트 안내",
        time: "2일 전",
        read: true,
        icon: "📢",
      },
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button onClick={() => setShowNotification(false)} className="p-1">
            <svg
              className="w-6 h-6 text-gray-600"
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
          <h3 className="text-lg font-bold text-gray-900">알림</h3>
          <button className="text-sm text-sky-600">모두 읽음</button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.map((noti) => (
            <div
              key={noti.id}
              className={`flex items-start gap-3 p-4 border-b border-gray-50 ${!noti.read ? "bg-sky-50/50" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${!noti.read ? "bg-sky-100" : "bg-gray-100"}`}
              >
                <span className="text-xl">{noti.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`font-medium ${!noti.read ? "text-gray-900" : "text-gray-600"}`}
                  >
                    {noti.title}
                  </p>
                  {!noti.read && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{noti.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{noti.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MyPageModal = () => {
    const menuItems = [
      {
        section: "내 활동",
        items: [
          {
            icon: "🎫",
            label: "내 쿠폰",
            count: userStats.coupons,
            action: () => {
              setShowMyPage(false);
              setShowMyCoupon(true);
            },
          },
          {
            icon: "💰",
            label: "내 캐시",
            value: `${userStats.ssalmukCash.toLocaleString()}원`,
            action: () => {
              setShowMyPage(false);
              setShowMyCash(true);
            },
          },
          {
            icon: "🛒",
            label: "내 거래",
            action: () => {
              setShowMyPage(false);
              setShowMyTrade(true);
            },
          },
          { icon: "❤️", label: "찜한 이벤트", count: 12 },
          { icon: "📝", label: "내가 쓴 글", count: 5 },
        ],
      },
      {
        section: "참여 내역",
        items: [
          { icon: "🎁", label: "참여한 이벤트", count: 28 },
          { icon: "📋", label: "참여한 설문조사", count: 15 },
          { icon: "🏆", label: "당첨 내역", count: 3 },
        ],
      },
      {
        section: "설정",
        items: [
          { icon: "🔔", label: "알림 설정" },
          { icon: "👤", label: "계정 관리" },
          { icon: "🔒", label: "개인정보 처리방침" },
          { icon: "📄", label: "이용약관" },
          { icon: "❓", label: "고객센터" },
        ],
      },
    ];

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0">
          <button onClick={() => setShowMyPage(false)} className="p-1">
            <svg
              className="w-6 h-6 text-gray-600"
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
          <h3 className="text-lg font-bold text-gray-900">마이페이지</h3>
          <button className="p-1">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* 프로필 섹션 */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍚</span>
              </div>
              <div className="flex-1 text-white">
                <h2 className="text-xl font-bold">쌀먹러123</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    Lv.{userStats.level} {userStats.levelName}
                  </span>
                  <span className="text-xs opacity-80">
                    {userStats.streak}일 연속 출석
                  </span>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-white/20 text-white text-sm rounded-lg">
                프로필 수정
              </button>
            </div>

            {/* 경험치 바 */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>다음 레벨까지</span>
                <span>{userStats.exp}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{ width: `${userStats.exp}%` }}
                />
              </div>
            </div>
          </div>

          {/* 퀵 메뉴 */}
          <div className="bg-white p-4 border-b border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyCoupon(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎫</span>
                </div>
                <span className="text-xs text-gray-600">쿠폰</span>
                <span className="text-sm font-bold text-amber-600">
                  {userStats.coupons}
                </span>
              </button>
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyCash(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💰</span>
                </div>
                <span className="text-xs text-gray-600">캐시</span>
                <span className="text-sm font-bold text-sky-600">
                  {(userStats.ssalmukCash / 10000).toFixed(1)}만
                </span>
              </button>
              <button
                onClick={() => {
                  setShowMyPage(false);
                  setShowMyTrade(true);
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🛒</span>
                </div>
                <span className="text-xs text-gray-600">거래</span>
                <span className="text-sm font-bold text-emerald-600">2건</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <span className="text-xs text-gray-600">당첨</span>
                <span className="text-sm font-bold text-rose-600">3회</span>
              </button>
            </div>
          </div>

          {/* 이번달 활동 요약 */}
          <div className="bg-white p-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3">📊 이번달 활동</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-sky-600">28</p>
                  <p className="text-xs text-gray-500">이벤트 참여</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">15</p>
                  <p className="text-xs text-gray-500">설문 완료</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">12,500</p>
                  <p className="text-xs text-gray-500">적립 캐시</p>
                </div>
              </div>
            </div>
          </div>

          {/* 메뉴 섹션들 */}
          {menuItems.map((section, sIdx) => (
            <div key={sIdx} className="bg-white border-b border-gray-100">
              <h3 className="px-4 pt-4 pb-2 text-xs font-medium text-gray-400">
                {section.section}
              </h3>
              {section.items.map((item, iIdx) => (
                <button
                  key={iIdx}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count !== undefined && (
                      <span className="text-sm text-sky-600 font-medium">
                        {item.count}
                      </span>
                    )}
                    {item.value && (
                      <span className="text-sm text-sky-600 font-medium">
                        {item.value}
                      </span>
                    )}
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ))}

          {/* 로그아웃 */}
          <div className="p-4">
            <button className="w-full py-3 text-gray-500 text-sm">
              로그아웃
            </button>
          </div>

          {/* 버전 정보 */}
          <div className="text-center pb-8">
            <p className="text-xs text-gray-400">생활쌀먹 v2.0.1</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showWriteModal && <WriteModal />}
      {showSearchModal && <SearchModal />}
      {showNotification && <NotificationModal />}
      {showMyPage && <MyPageModal />}
      {showPointDetail && (
        <PointDetailModal
          source={showPointDetail}
          onClose={() => setShowPointDetail(null)}
          onDeadline={handleDeadline}
        />
      )}
    </>
  );
}
