// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import LikeDislikeButton from "../../community/LikeDislikeButton";
import GiftPopup from "../../community/GiftPopup";
import ReportPopup from "../../community/ReportPopup";
import { useToast, TOAST_MESSAGES } from "../../community/Toast";
import EventCard from "../cards/EventCard";
import type { SaenghwalCtx } from "../types";

// ===== 분리된 댓글 컴포넌트 =====
import type { Comment } from "../../community/CommentTypes";
import { addReplyToComment, countComments } from "../../community/CommentTypes";
import BestCommentItem from "../../community/BestCommentItem";
import CommentItem from "../../community/CommentItem";
import CommentInput, { CommentInputRef } from "../../community/CommentInput";

interface Props {
  ctx: SaenghwalCtx;
}

// ===== 이벤트용 더미 댓글 데이터 =====
const dummyEventComments: Comment[] = [
  {
    id: 1,
    author: "이벤트헌터",
    avatar: "🎯",
    avatarBg: "#FEF3C7",
    content: "좋은 이벤트 공유 감사해요!",
    time: "10분 전",
    likes: 8,
    dislikes: 0,
    isBest: true,
    replies: [
      {
        id: 101,
        author: "쌀먹왕",
        avatar: "🍚",
        avatarBg: "#DBEAFE",
        content: "저도 응모했어요 ㅎㅎ",
        time: "5분 전",
        likes: 2,
        dislikes: 0,
        replyTo: "이벤트헌터",
      },
    ],
  },
  {
    id: 2,
    author: "혜택모으기",
    avatar: "💰",
    avatarBg: "#D1FAE5",
    content: "당첨되면 알려주세요!",
    time: "30분 전",
    likes: 5,
    dislikes: 0,
    isBest: true,
  },
];

export default function EventModals({ ctx }: Props) {
  const { showToast } = useToast();
  const {
    showEventDetail,
    setShowEventDetail,
    showWinnerRegister,
    setShowWinnerRegister,
    showCorrectionRequest,
    setShowCorrectionRequest,
    winnerAnnouncement,
    setWinnerAnnouncement,
    showMyEntries,
    setShowMyEntries,
    entryTab,
    setEntryTab,
    entrySort,
    setEntrySort,
    showEventFilter,
    setShowEventFilter,
    eventSort,
    setEventSort,
    eventViewType,
    setEventViewType,
    eventFilters,
    setEventFilters,
    userStats,
    setUserStats,
    events,
    getTypeBadge,
    getStatusBadge,
    goBack,
    initialShowMyEntries,
    initialEventId,
  } = ctx;

  // myEntries 상태
  const [myEntries, setMyEntries] = useState([
    {
      id: 1,
      type: "댓글",
      hot: true,
      title: "[스타벅스] 겨울 신메뉴 출시 기념",
      prize: "아메리카노 T",
      status: "progress",
      isWon: false,
      dday: 5,
      deadline: "01.12",
      announceDate: "01.14",
      platform: "인스타그램",
      likes: 24,
      comments: 8,
      winners: 1,
      host: "스타벅스코리아",
      period: "2025.01.01 ~ 2025.01.12",
    },
    {
      id: 2,
      type: "댓글",
      hot: true,
      title: "[스타벅스] 연말 럭키드로우 이벤트",
      prize: "텀블러 세트",
      status: "completed",
      isWon: false,
      deadline: "01.31",
      announceDate: "02.05",
      platform: "홈페이지",
      likes: 31,
      comments: 12,
      winners: 3,
      host: "스타벅스코리아",
      period: "2025.01.15 ~ 2025.01.31",
    },
    {
      id: 3,
      type: "퀴즈",
      hot: false,
      title: "[CU편의점] 12월 행운퀴즈 이벤트",
      prize: "CU 5천원권",
      status: "completed",
      isWon: false,
      deadline: "01.15",
      announceDate: "01.20",
      platform: "홈페이지",
      likes: 19,
      comments: 5,
      winners: 5,
      host: "BGF리테일",
      period: "2025.01.01 ~ 2025.01.15",
    },
    {
      id: 4,
      type: "인증샷",
      hot: false,
      title: "[GS25] 와인 페스티벌 이벤트",
      prize: "GS25 1만원권",
      status: "progress",
      isWon: false,
      dday: 12,
      deadline: "02.10",
      announceDate: "02.15",
      platform: "홈페이지",
      likes: 11,
      comments: 3,
      winners: 2,
      host: "GS리테일",
      period: "2025.01.20 ~ 2025.02.10",
    },
    {
      id: 5,
      type: "팔로우",
      hot: false,
      title: "[올리브영] 신년맞이 럭키드로우",
      prize: "올리브영 3만원권",
      status: "completed",
      isWon: false,
      deadline: "01.07",
      announceDate: "01.10",
      platform: "인스타그램",
      likes: 44,
      comments: 17,
      winners: 10,
      host: "올리브영",
      period: "2024.12.26 ~ 2025.01.07",
    },
    {
      id: 6,
      type: "댓글",
      hot: true,
      title: "[배스킨라빈스] 겨울 한정 신메뉴 이벤트",
      prize: "패밀리 세트 쿠폰",
      status: "completed",
      isWon: false,
      deadline: "01.20",
      announceDate: "01.25",
      platform: "인스타그램",
      likes: 38,
      comments: 14,
      winners: 5,
      host: "비알코리아",
      period: "2025.01.10 ~ 2025.01.20",
    },
  ]);

  const toggleWon = (id: number) => {
    const entry = myEntries.find((e) => e.id === id);
    if (!entry) return;

    const newIsWon = !entry.isWon;
    setMyEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isWon: newIsWon } : e)),
    );

    if (newIsWon) showToast("🏆 당첨 등록됐어요!");
    else showToast("당첨이 취소됐어요");
  };

  // ===== EventDetailModal =====
  const EventDetailModal = () => {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showGiftPopup, setShowGiftPopup] = useState(false);
    const [showReportPopup, setShowReportPopup] = useState(false);
    const { showToast } = useToast();
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState<Comment[]>(dummyEventComments);
    const [likedComments, setLikedComments] = useState<number[]>([]);
    const [dislikedComments, setDislikedComments] = useState<number[]>([]);
    const [replyingTo, setReplyingTo] = useState<{
      id: number;
      author: string;
    } | null>(null);
    const commentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const commentInputRef = useRef<CommentInputRef | null>(null);

    const totalComments = countComments(comments);
    const bestComments = comments.filter((c) => c.isBest);

    const toggleCommentLike = (id: number) => {
      setLikedComments((prev) =>
        prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
      );
      setDislikedComments((prev) => prev.filter((c) => c !== id));
    };

    const toggleCommentDislike = (id: number) => {
      setDislikedComments((prev) =>
        prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
      );
      setLikedComments((prev) => prev.filter((c) => c !== id));
    };

    const handleStartReply = (id: number, author: string) => {
      setReplyingTo({ id, author });
      commentInputRef.current?.focus();
    };

    const scrollToComment = (id: number) => {
      const el = commentRefs.current[id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.backgroundColor = "#EFF9FF";
        setTimeout(() => {
          el.style.backgroundColor = "";
        }, 1500);
      }
    };

    const handleSubmitComment = () => {
      if (!commentInput.trim()) return;
      const newComment: Comment = {
        id: Date.now(),
        author: "나",
        avatar: "😊",
        avatarBg: "#E0E7FF",
        content: commentInput,
        time: "방금",
        likes: 0,
        dislikes: 0,
        replyTo: replyingTo?.author,
      };
      if (replyingTo) {
        setComments((prev) =>
          addReplyToComment(prev, replyingTo.id, newComment),
        );
      } else {
        setComments((prev) => [...prev, newComment]);
      }
      setCommentInput("");
      setReplyingTo(null);
    };

    const event = showEventDetail;

    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col max-w-md mx-auto">
        {/* 헤더 */}
        <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3 sticky top-0 z-10">
          <button
            onClick={() => {
              if (initialEventId && goBack) {
                goBack();
              } else {
                setShowEventDetail(null);
              }
            }}
            className="p-1"
          >
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
          <h3 className="flex-1 text-base font-medium text-gray-900 truncate">
            {event.title}
          </h3>
        </div>

        {/* 스크롤 영역 */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => showMoreMenu && setShowMoreMenu(false)}
        >
          <div className="p-4">
            {/* 작성자 정보 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🦎</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    저렴가를찾는용가리
                  </p>
                  <p className="text-xs text-gray-500">1시간 전 · 팔로워 192</p>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-sky-500 text-sky-500 text-sm font-medium rounded-full hover:bg-sky-50 transition-colors">
                팔로우
              </button>
            </div>

            {/* 당첨자 발표 등록 안내 */}
            {!winnerAnnouncement.isRegistered ? (
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sky-700 font-medium mb-1">
                      [미발표] 당첨자발표 등록하기
                    </p>
                    <p className="text-xs text-sky-600">
                      🔗 링크 등록시 20쌀 적립
                    </p>
                  </div>
                  <button
                    onClick={() => setShowWinnerRegister(true)}
                    className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    등록
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <p className="text-sky-600 font-medium mb-3">
                  [발표완료] 당첨자발표 확인하기
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">등록회원:</span>
                    <span className="text-gray-900 font-medium">
                      {winnerAnnouncement.registeredBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">발표등록일:</span>
                    <span className="text-gray-900">
                      {winnerAnnouncement.registeredDate}
                    </span>
                    <button
                      onClick={() => setShowCorrectionRequest(true)}
                      className="text-sky-500 text-xs border border-sky-300 px-2 py-0.5 rounded hover:bg-sky-50"
                    >
                      정정신청
                    </button>
                  </div>
                </div>
                {winnerAnnouncement.memo && (
                  <p className="mt-3 text-sky-500 text-sm">
                    {winnerAnnouncement.memo}
                  </p>
                )}
              </div>
            )}

            {/* 이벤트 정보 테이블 */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500 w-28">
                      주최사
                    </td>
                    <td className="px-4 py-3 text-gray-900 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {event.host}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      응모기간
                    </td>
                    <td className="px-4 py-3 text-gray-900">{event.period}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      응모형태
                    </td>
                    <td className="px-4 py-3 text-gray-900">{event.type}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      당첨자 발표일
                    </td>
                    <td className="px-4 py-3 text-gray-900 font-medium">
                      2026.01.23
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">
                      총 당첨자수
                    </td>
                    <td className="px-4 py-3 text-gray-900">
                      {event.winners}명
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 text-gray-500">경품</td>
                    <td className="px-4 py-3">
                      <span className="text-sky-600 font-medium">
                        {event.prize}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 본문 */}
            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="text-gray-900 leading-relaxed">
                2월 카드 이벤트로 최대 80 만원 병오년 용돈 받아요.
              </p>
            </div>

            {/* 액션 바 */}
            <div className="flex items-center justify-between py-3 mb-4">
              <div className="flex items-center gap-3">
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
                  size="md"
                />
                <button className="flex items-center gap-1 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm">{event.comments}</span>
                </button>
                <button
                  onClick={() => setShowGiftPopup(true)}
                  className="flex items-center gap-1 text-gray-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </button>
              </div>
              {/* 더보기 메뉴 */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-1"
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                {showMoreMenu && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        showToast("링크가 복사되었어요");
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      공유
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        showToast("응모함에 저장했어요");
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      응모함 저장
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        showToast(TOAST_MESSAGES.USER_BLOCKED("해당 유저"));
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      차단
                    </button>
                    <button
                      onClick={() => {
                        setShowMoreMenu(false);
                        setShowReportPopup(true);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                    >
                      신고
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 이벤트 이미지 */}
            <div className="rounded-xl overflow-hidden mb-4 bg-gradient-to-b from-sky-400 to-sky-600">
              <div className="p-4 text-center text-white">
                <div className="bg-white/20 rounded-lg p-2 mb-3 inline-block">
                  <span className="text-xs font-medium">🏢 {event.host}</span>
                </div>
                <h4 className="text-xl font-bold mb-2">
                  신년맞이 단어뽑기 이벤트
                </h4>
                <div className="bg-white/10 rounded-lg p-3 text-left text-sm space-y-2">
                  <p className="font-medium">참여방법</p>
                  <p>1. {event.host} 인스타그램 계정 팔로우</p>
                  <p>2. 이벤트 영상 속 키워드를 뽑아서 캡쳐</p>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-t from-purple-500/50 to-transparent flex items-end justify-center pb-4">
                <div className="flex gap-2">
                  {["🎁", "🎉", "✨"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 이벤트 바로가기 버튼 */}
            <button
              onClick={() => window.open("#", "_blank")}
              className="w-full py-4 bg-[#72C2FF] text-white font-bold rounded-xl active:bg-[#5AB0F0] transition-colors text-base mb-6"
            >
              이벤트 바로가기
            </button>

            {/* ===== 댓글 섹션 (분리된 컴포넌트 사용) ===== */}
            <div className="pt-2 pb-24">
              <p className="text-[15px] font-bold text-gray-900 mb-4">
                댓글 <span className="text-[#72C2FF]">{totalComments}</span>
              </p>

              {/* 베스트 댓글 */}
              {bestComments.length > 0 && (
                <div className="mb-5 pb-5 border-b border-gray-100">
                  {bestComments.slice(0, 3).map((comment) => (
                    <BestCommentItem
                      key={`best-${comment.id}`}
                      comment={comment}
                      likedComments={likedComments}
                      dislikedComments={dislikedComments}
                      onLike={toggleCommentLike}
                      onDislike={toggleCommentDislike}
                      onGift={() => setShowGiftPopup(true)}
                      onScrollTo={scrollToComment}
                    />
                  ))}
                </div>
              )}

              {/* 전체 댓글 */}
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  depth={0}
                  likedComments={likedComments}
                  dislikedComments={dislikedComments}
                  onLike={toggleCommentLike}
                  onDislike={toggleCommentDislike}
                  onReply={handleStartReply}
                  onGift={() => setShowGiftPopup(true)}
                  onReport={() => setShowReportPopup(true)}
                  commentRef={(el) => {
                    commentRefs.current[comment.id] = el;
                  }}
                />
              ))}

              {comments.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-[14px]">첫 댓글을 남겨보세요!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 댓글 입력 (분리된 컴포넌트 사용) */}
        <CommentInput
          ref={commentInputRef}
          value={commentInput}
          onChange={setCommentInput}
          onSubmit={handleSubmitComment}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          position="sticky"
        />

        {/* 팝업들 */}
        {showGiftPopup && (
          <GiftPopup
            onClose={() => setShowGiftPopup(false)}
            onSend={() => {
              setShowGiftPopup(false);
              showToast(TOAST_MESSAGES.GIFT_SENT);
            }}
          />
        )}
        {showReportPopup && (
          <ReportPopup
            targetType="이벤트"
            onReport={() => {
              setShowReportPopup(false);
              showToast(TOAST_MESSAGES.REPORTED);
            }}
            onCancel={() => setShowReportPopup(false)}
          />
        )}
      </div>
    );
  };

  // ===== WinnerRegisterModal =====
  const WinnerRegisterModal = () => {
    const [url, setUrl] = useState("");
    const [memo, setMemo] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const handleRegister = () => {
      if (url) {
        setWinnerAnnouncement({
          url,
          memo,
          isPrivate,
          isRegistered: true,
          registeredBy: "TOT24",
          registeredDate: "2026-01-16",
        });
        setShowWinnerRegister(false);
        setUrl("");
        setMemo("");
        setIsPrivate(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-sky-600">
              [미발표] 당첨자발표 등록하기
            </h3>
            <p className="text-sm text-amber-500 mt-1">
              🔗 링크 등록시 20쌀 적립
            </p>
          </div>

          <div className="p-4 space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="발표 확인 가능한 URL 입력하기"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="도움메모 입력해주세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-sky-500"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-sky-500 focus:ring-sky-500"
              />
              <span className="text-sm text-gray-700">개별통보</span>
            </label>
            <p className="text-sm text-sky-500">
              관련없는 정보는 삭제 및 포인트가 회수됩니다.
            </p>
          </div>

          <div className="p-4 flex gap-3">
            <button
              onClick={() => {
                setShowWinnerRegister(false);
                setUrl("");
                setMemo("");
                setIsPrivate(false);
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleRegister}
              disabled={!url}
              className={`flex-1 py-3 font-medium rounded-xl transition-colors ${
                url
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== CorrectionRequestModal =====
  const CorrectionRequestModal = () => {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);

    const handleSubmit = () => {
      if (selectedReason) {
        alert("정정신청이 접수되었습니다.");
        setShowCorrectionRequest(false);
        setSelectedReason(null);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">정정신청</h3>
            <p className="text-sm text-gray-500 mt-1">
              신청 사유를 선택해주세요
            </p>
          </div>

          <div className="p-4 space-y-3">
            {[
              { key: "wrong_link", label: "당첨자 링크가 아니에요" },
              { key: "prank", label: "장난으로 등록했어요" },
            ].map((reason) => (
              <button
                key={reason.key}
                onClick={() => setSelectedReason(reason.key)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedReason === reason.key
                    ? "border-sky-500 bg-sky-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedReason === reason.key
                        ? "border-sky-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedReason === reason.key && (
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      selectedReason === reason.key
                        ? "text-sky-700"
                        : "text-gray-700"
                    }`}
                  >
                    {reason.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 flex gap-3">
            <button
              onClick={() => {
                setShowCorrectionRequest(false);
                setSelectedReason(null);
              }}
              className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className={`flex-1 py-3 font-medium rounded-xl transition-colors ${
                selectedReason
                  ? "bg-sky-500 text-white hover:bg-sky-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              신청하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===== MyEntriesModal =====
  const MyEntriesModal = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEntries = myEntries.filter((e) => {
      const matchTab =
        (entryTab === "progress" && e.status === "progress") ||
        (entryTab === "completed" && e.status === "completed") ||
        (entryTab === "won" && e.status === "completed" && e.isWon === true);
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.prize.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });

    const progressCount = myEntries.filter(
      (e) => e.status === "progress",
    ).length;
    const completedCount = myEntries.filter(
      (e) => e.status === "completed",
    ).length;
    const wonCount = myEntries.filter(
      (e) => e.status === "completed" && e.isWon === true,
    ).length;

    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
        <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => {
                if (initialShowMyEntries && goBack) {
                  goBack();
                } else {
                  setShowMyEntries(false);
                }
              }}
              className="p-1 -ml-1"
            >
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
            <h3 className="text-lg font-bold text-gray-900">응모함</h3>
            <div className="w-6" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이벤트명 · 경품 검색"
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#72C2FF]/30"
              />
            </div>
            <button className="px-4 py-2.5 bg-[#72C2FF] text-white text-sm font-semibold rounded-xl">
              검색
            </button>
          </div>
        </div>

        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex gap-2">
            {[
              { key: "progress", label: "진행중", count: progressCount },
              { key: "completed", label: "발표완료", count: completedCount },
              { key: "won", label: "당첨함", count: wonCount },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setEntryTab(tab.key)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  entryTab === tab.key
                    ? "bg-[#72C2FF] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1 text-xs ${
                    entryTab === tab.key ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#F5F6F8] px-4 py-3 space-y-3">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📋</span>
              </div>
              <p className="text-gray-500 mb-2">응모 내역이 없습니다</p>
              <p className="text-sm text-gray-400">이벤트에 참여해보세요!</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <EventCard
                key={entry.id}
                event={entry}
                onEventClick={() => setShowEventDetail(entry)}
                getStatusBadge={getStatusBadge}
                getTypeBadge={getTypeBadge}
                showWonButton={entryTab === "completed" || entryTab === "won"}
                isWon={entry.isWon}
                onToggleWon={() => toggleWon(entry.id)}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  // ===== EventFilterModal =====
  const EventFilterModal = () => {
    const [tempFilters, setTempFilters] = useState({ ...eventFilters });
    const [tempViewType, setTempViewType] = useState(eventViewType);

    const prizeTypes = [
      "현금/자산",
      "가전",
      "식음료",
      "상품권",
      "뷰티",
      "문화",
      "기타",
    ];
    const entryTypes = [
      "현금/자산",
      "가전",
      "식음료",
      "상품권",
      "뷰티",
      "문화",
      "기타",
    ];
    const platforms = [
      { name: "인스타그램", color: "bg-pink-100 text-pink-700" },
      { name: "유튜브", color: "bg-red-100 text-red-700" },
      { name: "페이스북", color: "bg-blue-100 text-blue-700" },
      { name: "홈페이지", color: "bg-gray-100 text-gray-700" },
      { name: "네이버블로그", color: "bg-green-100 text-green-700" },
      { name: "X (트위터)", color: "bg-gray-100 text-gray-700" },
      { name: "기타", color: "bg-gray-100 text-gray-700" },
    ];

    const toggleFilter = (category: string, value: string) => {
      setTempFilters((prev) => ({
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((v: string) => v !== value)
          : [...prev[category], value],
      }));
    };

    const applyFilters = () => {
      setEventFilters(tempFilters);
      setEventViewType(tempViewType);
      setShowEventFilter(false);
    };

    const resetFilters = () => {
      setTempFilters({ prizeTypes: [], entryTypes: [], platforms: [] });
      setTempViewType("card");
    };

    const totalFilters =
      tempFilters.prizeTypes.length +
      tempFilters.entryTypes.length +
      tempFilters.platforms.length;

    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
        onClick={() => setShowEventFilter(false)}
      >
        <div
          className="bg-white w-full max-w-md rounded-t-3xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
            <h3 className="text-lg font-bold text-gray-900">필터 옵션</h3>
            <button onClick={() => setShowEventFilter(false)} className="p-1">
              <svg
                className="w-6 h-6 text-gray-400"
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
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* View 타입 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">View</h4>
              <div className="space-y-2">
                {["card", "list"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTempViewType(type)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                      tempViewType === type
                        ? "border-sky-500 bg-sky-50"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="text-gray-700">
                      {type === "card" ? "카드형" : "목록형"}
                    </span>
                    {tempViewType === type && (
                      <svg
                        className="w-5 h-5 text-sky-500 ml-auto"
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
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 경품종류 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">경품종류</h4>
              <div className="flex flex-wrap gap-2">
                {prizeTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("prizeTypes", type)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.prizeTypes.includes(type)
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모형태 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">응모형태</h4>
              <div className="flex flex-wrap gap-2">
                {entryTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleFilter("entryTypes", type)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.entryTypes.includes(type)
                        ? "bg-sky-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 응모플랫폼 */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-500 mb-3">응모플랫폼</h4>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => toggleFilter("platforms", platform.name)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      tempFilters.platforms.includes(platform.name)
                        ? "bg-sky-500 text-white"
                        : platform.color
                    }`}
                  >
                    {platform.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl"
            >
              초기화
            </button>
            <button
              onClick={applyFilters}
              className="flex-[2] py-3 bg-sky-500 text-white font-bold rounded-xl"
            >
              적용하기 {totalFilters > 0 && `(${totalFilters})`}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showEventDetail && <EventDetailModal />}
      {showWinnerRegister && <WinnerRegisterModal />}
      {showCorrectionRequest && <CorrectionRequestModal />}
      {showMyEntries && <MyEntriesModal />}
      {showEventFilter && <EventFilterModal />}
    </>
  );
}
