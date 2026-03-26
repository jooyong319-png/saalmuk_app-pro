import { useState } from "react";
import { useToast } from "../components/community/Toast";
import ConfirmPopup from "../components/community/ConfirmPopup";
import ReportPopup from "../components/community/ReportPopup";

// ─── 타입 정의 ───
interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isRead: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  isOnline: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: Message[];
}

interface ChatPageProps {
  goBack: () => void;
}

// ─── 채팅 페이지 컴포넌트 ───
export default function Chat({ goBack }: ChatPageProps) {
  const { showToast } = useToast();
  const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; name: string; avatar: string; avatarBg: string }[]
  >([]);

  // 검색 가능한 전체 유저 목록 (샘플)
  const allUsers = [
    {
      id: "user1",
      name: "김쌀먹",
      avatar: "김",
      avatarBg: "from-blue-400 to-blue-500",
      isOnline: true,
    },
    {
      id: "user2",
      name: "게임마스터",
      avatar: "게",
      avatarBg: "from-green-400 to-green-500",
      isOnline: true,
    },
    {
      id: "user3",
      name: "리니지황제",
      avatar: "리",
      avatarBg: "from-purple-400 to-purple-500",
      isOnline: false,
    },
    {
      id: "user4",
      name: "메이플고수",
      avatar: "메",
      avatarBg: "from-orange-400 to-orange-500",
      isOnline: true,
    },
    {
      id: "user5",
      name: "로아장인",
      avatar: "로",
      avatarBg: "from-sky-400 to-sky-500",
      isOnline: true,
    },
    {
      id: "user6",
      name: "발로란트에이스",
      avatar: "발",
      avatarBg: "from-red-400 to-red-500",
      isOnline: false,
    },
    {
      id: "user7",
      name: "오버워치탱커",
      avatar: "오",
      avatarBg: "from-amber-400 to-amber-500",
      isOnline: true,
    },
    {
      id: "user8",
      name: "롤다이아",
      avatar: "롤",
      avatarBg: "from-indigo-400 to-indigo-500",
      isOnline: false,
    },
    {
      id: "user9",
      name: "피파프로",
      avatar: "피",
      avatarBg: "from-emerald-400 to-emerald-500",
      isOnline: true,
    },
    {
      id: "user10",
      name: "배그스쿼드",
      avatar: "배",
      avatarBg: "from-yellow-400 to-yellow-500",
      isOnline: true,
    },
  ];

  // 검색 결과 필터링
  const searchResults = searchQuery.trim()
    ? allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedUsers.find((s) => s.id === user.id),
      )
    : [];

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: "kim",
      name: "김쌀먹",
      avatar: "김",
      avatarBg: "from-blue-400 to-blue-500",
      isOnline: true,
      lastMessage: "메이플 쌀먹 방법 알려주세요!",
      lastTime: "방금",
      unread: 3,
      messages: [
        {
          id: 1,
          sender: "kim",
          text: "안녕하세요!",
          time: "오후 2:30",
          isRead: true,
        },
        {
          id: 2,
          sender: "me",
          text: "네 안녕하세요~",
          time: "오후 2:31",
          isRead: true,
        },
        {
          id: 3,
          sender: "kim",
          text: "메이플 쌀먹 방법 알려주세요!",
          time: "오후 2:32",
          isRead: false,
        },
        {
          id: 4,
          sender: "kim",
          text: "초보라서 잘 모르겠어요 ㅠㅠ",
          time: "오후 2:32",
          isRead: false,
        },
        {
          id: 5,
          sender: "kim",
          text: "도움 좀 부탁드려요!",
          time: "오후 2:33",
          isRead: false,
        },
      ],
    },
    {
      id: "game",
      name: "게임마스터",
      avatar: "게",
      avatarBg: "from-green-400 to-green-500",
      isOnline: true,
      lastMessage: "공략 영상 확인해보세요~",
      lastTime: "10분 전",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "me",
          text: "보스 공략 어떻게 해요?",
          time: "오후 1:20",
          isRead: true,
        },
        {
          id: 2,
          sender: "game",
          text: "공략 영상 확인해보세요~",
          time: "오후 1:25",
          isRead: true,
        },
      ],
    },
    {
      id: "lineage",
      name: "리니지황제",
      avatar: "리",
      avatarBg: "from-purple-400 to-purple-500",
      isOnline: false,
      lastMessage: "같이 던전 돌래요?",
      lastTime: "1시간 전",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "lineage",
          text: "같이 던전 돌래요?",
          time: "오후 12:00",
          isRead: true,
        },
      ],
    },
    {
      id: "maple",
      name: "메이플고수",
      avatar: "메",
      avatarBg: "from-orange-400 to-orange-500",
      isOnline: true,
      lastMessage: "275 찍는 팁 알려드릴게요!",
      lastTime: "30분 전",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "maple",
          text: "안녕하세요 메이플 고수입니다",
          time: "오후 1:00",
          isRead: true,
        },
        {
          id: 2,
          sender: "me",
          text: "275 어떻게 빨리 찍어요?",
          time: "오후 1:05",
          isRead: true,
        },
        {
          id: 3,
          sender: "maple",
          text: "275 찍는 팁 알려드릴게요!",
          time: "오후 1:10",
          isRead: false,
        },
      ],
    },
  ]);

  const currentChatRoom = chatRooms.find((room) => room.id === activeChatRoom);

  // 유저 선택/해제
  const toggleUserSelection = (user: {
    id: string;
    name: string;
    avatar: string;
    avatarBg: string;
  }) => {
    setSelectedUsers((prev) => {
      const exists = prev.find((u) => u.id === user.id);
      if (exists) {
        return prev.filter((u) => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  // 선택된 유저 제거
  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // 채팅방 생성
  const createChatRoom = () => {
    if (selectedUsers.length === 0) return;

    const roomName =
      selectedUsers.length === 1
        ? selectedUsers[0].name
        : `${selectedUsers[0].name} 외 ${selectedUsers.length - 1}명`;

    const newRoom: ChatRoom = {
      id: `room-${Date.now()}`,
      name: roomName,
      avatar: selectedUsers[0].avatar,
      avatarBg: selectedUsers[0].avatarBg,
      isOnline: true,
      lastMessage: "",
      lastTime: "방금",
      unread: 0,
      messages: [],
    };

    setChatRooms((prev) => [newRoom, ...prev]);
    setActiveChatRoom(newRoom.id);
    setIsCreatingRoom(false);
    setSelectedUsers([]);
    setSearchQuery("");
  };

  // 새 메시지 화면 닫기
  const closeCreateRoom = () => {
    setIsCreatingRoom(false);
    setSelectedUsers([]);
    setSearchQuery("");
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!chatInput.trim() || !activeChatRoom) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "me",
      text: chatInput,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isRead: false,
    };

    setChatRooms((prev) =>
      prev.map((room) => {
        if (room.id === activeChatRoom) {
          return {
            ...room,
            messages: [...room.messages, newMessage],
            lastMessage: chatInput,
            lastTime: "방금",
          };
        }
        return room;
      }),
    );

    setChatInput("");
  };

  // 채팅방 열 때 읽음 처리
  const handleOpenChatRoom = (roomId: string) => {
    setActiveChatRoom(roomId);
    setChatRooms((prev) =>
      prev.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            unread: 0,
            messages: room.messages.map((msg) => ({ ...msg, isRead: true })),
          };
        }
        return room;
      }),
    );
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (activeChatRoom) {
      setActiveChatRoom(null);
    } else if (isCreatingRoom) {
      closeCreateRoom();
    } else {
      goBack();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {isCreatingRoom ? (
        /* ─── 새 메시지 (채팅방 만들기) ─── */
        <>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">새 메시지</h3>
              <p className="text-xs text-gray-400">대화 상대를 선택하세요</p>
            </div>
          </div>

          {/* 선택된 유저 태그 */}
          {selectedUsers.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-100 flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <span
                  key={user.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#72C2FF]/10 text-[#72C2FF] rounded-full text-sm font-medium"
                >
                  {user.name}
                  <button
                    onClick={() => removeSelectedUser(user.id)}
                    className="w-4 h-4 rounded-full bg-[#72C2FF]/20 hover:bg-[#72C2FF]/30 flex items-center justify-center transition-colors"
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
          )}

          {/* 닉네임 검색 */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="닉네임으로 검색"
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="w-5 h-5 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center text-white transition-colors"
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
              )}
            </div>
          </div>

          {/* 검색 결과 */}
          <div className="flex-1 overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">
                  닉네임을 검색해서
                  <br />
                  대화 상대를 추가하세요
                </p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">
                  "{searchQuery}" 검색 결과가 없어요
                </p>
              </div>
            ) : (
              <div>
                {searchResults.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => toggleUserSelection(user)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <div className="relative">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.avatarBg} flex items-center justify-center text-white font-bold shadow-sm`}
                      >
                        {user.avatar}
                      </div>
                      {user.isOnline && (
                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user.isOnline ? "활동 중" : "오프라인"}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedUsers.find((s) => s.id === user.id)
                          ? "bg-[#72C2FF] border-[#72C2FF]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedUsers.find((s) => s.id === user.id) && (
                        <svg
                          className="w-4 h-4 text-white"
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 채팅 시작 버튼 */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white sticky bottom-0">
            <button
              onClick={createChatRoom}
              disabled={selectedUsers.length === 0}
              className={`w-full py-3 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 ${
                selectedUsers.length > 0
                  ? "bg-[#72C2FF] text-white active:bg-[#5AB0F0] shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedUsers.length > 0 ? (
                <>
                  <span>채팅 시작</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {selectedUsers.length}명
                  </span>
                </>
              ) : (
                "대화 상대를 선택하세요"
              )}
            </button>
          </div>
        </>
      ) : !activeChatRoom ? (
        /* ─── 대화 목록 ─── */
        <>
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">메시지</h3>
              <p className="text-xs text-gray-400">
                {chatRooms.filter((r) => r.isOnline).length}명 온라인
              </p>
            </div>
            {/* 새 메시지 버튼 */}
            <button
              onClick={() => setIsCreatingRoom(true)}
              className="w-10 h-10 rounded-full bg-[#72C2FF] hover:bg-[#5AB0F0] flex items-center justify-center text-white shadow-md transition-colors"
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
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* 검색 */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="검색"
                className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* 대화 목록 */}
          <div className="flex-1 overflow-y-auto">
            {chatRooms.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-300"
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
                </div>
                <p className="text-gray-400 text-sm">아직 대화가 없어요</p>
                <button
                  onClick={() => setIsCreatingRoom(true)}
                  className="mt-4 px-6 py-2.5 bg-[#72C2FF] text-white text-sm font-medium rounded-full"
                >
                  새 대화 시작하기
                </button>
              </div>
            ) : (
              chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => handleOpenChatRoom(room.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${room.avatarBg} flex items-center justify-center text-white text-lg font-bold shadow-sm`}
                    >
                      {room.avatar}
                    </div>
                    {room.isOnline && (
                      <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p
                        className={`text-[15px] ${room.unread > 0 ? "font-bold text-gray-900" : "font-medium text-gray-900"}`}
                      >
                        {room.name}
                      </p>
                      <span
                        className={`text-xs ${room.unread > 0 ? "text-[#72C2FF] font-semibold" : "text-gray-400"}`}
                      >
                        {room.lastTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate pr-2 ${room.unread > 0 ? "text-gray-700 font-medium" : "text-gray-500"}`}
                      >
                        {room.lastMessage || "대화를 시작해보세요"}
                      </p>
                      {room.unread > 0 && (
                        <span className="shrink-0 min-w-[20px] h-5 px-1.5 bg-[#72C2FF] text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {room.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        /* ─── 채팅 대화 화면 ─── */
        <>
          {/* 채팅방 헤더 */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white sticky top-0 z-10">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentChatRoom?.avatarBg} flex items-center justify-center text-white font-bold shadow-sm`}
            >
              {currentChatRoom?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-gray-900">
                {currentChatRoom?.name}
              </p>
              <p className="text-xs text-gray-400">
                {currentChatRoom?.isOnline ? "● 활동 중" : "○ 오프라인"}
              </p>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowChatMenu(!showChatMenu)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
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
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
              {showChatMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowChatMenu(false)}
                  />
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-20">
                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      onClick={() => {
                        showToast("알림을 껐습니다");
                        setShowChatMenu(false);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                      알림 끄기
                    </button>
                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      onClick={() => {
                        showToast("채팅방을 나갔습니다");
                        setShowChatMenu(false);
                        setActiveChatRoom(null);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      채팅방 나가기
                    </button>
                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      onClick={() => {
                        setShowBlockPopup(true);
                        setShowChatMenu(false);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      차단
                    </button>
                    <button
                      className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      onClick={() => {
                        setShowReportPopup(true);
                        setShowChatMenu(false);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      신고
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 메시지 목록 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50">
            {currentChatRoom?.messages.map((msg, index) => {
              const isMe = msg.sender === "me";
              const showAvatar =
                !isMe &&
                (index === 0 ||
                  currentChatRoom.messages[index - 1].sender === "me");

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  {/* 상대방 아바타 */}
                  {!isMe && (
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentChatRoom.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 ${showAvatar ? "visible" : "invisible"}`}
                    >
                      {currentChatRoom.avatar}
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] ${isMe ? "order-1" : "order-2"}`}
                  >
                    <div
                      className={`px-4 py-2.5 text-[14px] leading-relaxed shadow-sm ${
                        isMe
                          ? "bg-[#72C2FF] text-white rounded-2xl rounded-br-md"
                          : "bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div
                      className={`flex items-center gap-1.5 mt-1.5 ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <span className="text-[11px] text-gray-400">
                        {msg.time}
                      </span>
                      {isMe && (
                        <span
                          className={`text-[11px] ${msg.isRead ? "text-[#72C2FF]" : "text-gray-300"}`}
                        >
                          {msg.isRead ? "읽음" : "전송됨"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 입력창 */}
          <div className="px-4 py-3 border-t border-gray-100 bg-white sticky bottom-0">
            <div className="flex items-center gap-2">
              {/* 이모지 버튼 */}
              <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
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

              {/* 입력 필드 */}
              <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="메시지 입력..."
                  className="flex-1 bg-transparent text-[14px] outline-none placeholder-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim()) {
                      handleSendMessage();
                    }
                  }}
                />
              </div>

              {/* 전송 버튼 */}
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  chatInput.trim()
                    ? "bg-[#72C2FF] text-white active:bg-[#5AB0F0] shadow-md"
                    : "bg-gray-100 text-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* 차단 확인 팝업 */}
      {showBlockPopup && currentChatRoom && (
        <ConfirmPopup
          title={`${currentChatRoom.name}님을 차단할까요?`}
          description={`앞으로 ${currentChatRoom.name}님의 글을 볼 수 없고, ${currentChatRoom.name}님도 내 글을 볼 수 없어요.`}
          confirmText="차단하기"
          cancelText="닫기"
          isDestructive
          onConfirm={() => {
            showToast(`${currentChatRoom.name}님을 차단했어요`);
            setShowBlockPopup(false);
            setActiveChatRoom(null);
          }}
          onCancel={() => setShowBlockPopup(false)}
        />
      )}

      {/* 신고 사유 선택 팝업 */}
      {showReportPopup && (
        <ReportPopup
          targetType="유저"
          onReport={(reason) => {
            console.log("신고 사유:", reason);
            showToast("신고가 접수되었습니다");
            setShowReportPopup(false);
          }}
          onCancel={() => setShowReportPopup(false)}
        />
      )}
    </div>
  );
}
