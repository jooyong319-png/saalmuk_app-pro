import { useState, useRef, useEffect } from "react";
import type { GalleryItemData } from "./galleryData";
import { useToast } from "./Toast";
import { useInterest, InterestChannel } from "./InterestContext";
import AddGroupModal from "./AddGroupModal";

// ===== 최근 방문 아이템 타입 =====
interface RecentGalleryItem extends GalleryItemData {
  visitedAt: string;
  addedAt?: number;
  userCount?: number;
  galleryId?: string; // galleryData의 id
}

// 그룹 데이터 타입
interface GroupData {
  id: string;
  name: string;
  items: RecentGalleryItem[];
  isDefault?: boolean;
  sortType?: SortType;
}

// 정렬 타입
type SortType = "custom" | "added" | "alphabetical" | "popular";

interface RecentChannelsContentProps {
  setCurrentPage: (page: string) => void;
}

// 정렬 옵션
const sortOptions: { type: SortType; label: string }[] = [
  { type: "custom", label: "직접 설정한 순" },
  { type: "added", label: "추가한 순" },
  { type: "alphabetical", label: "가나다 순" },
  { type: "popular", label: "유저 많은 순" },
];

// 전체 갤러리 목록 (추가용)
const allGalleries: RecentGalleryItem[] = [
  {
    id: 202,
    icon: "🍁",
    name: "메이플스토리",
    desc: "메이플 유저들의 커뮤니티",
    color: "bg-orange-100 text-orange-600",
    visitedAt: "",
    addedAt: 1,
    userCount: 15420,
  },
  {
    id: 104,
    icon: "⚔️",
    name: "리니지M",
    desc: "리니지M 정보 공유",
    color: "bg-gray-100 text-gray-600",
    visitedAt: "",
    addedAt: 2,
    userCount: 8930,
  },
  {
    id: 203,
    icon: "🏰",
    name: "로스트아크",
    desc: "로아 공략 및 팁",
    color: "bg-amber-100 text-amber-600",
    visitedAt: "",
    addedAt: 3,
    userCount: 12850,
  },
  {
    id: 1,
    icon: "🔥",
    name: "지금 핫한",
    desc: "실시간 인기 게임 정보",
    color: "bg-orange-100 text-orange-600",
    visitedAt: "",
    addedAt: 4,
    userCount: 25000,
  },
  {
    id: 106,
    icon: "🍁",
    name: "메이플스토리M",
    desc: "모바일 메이플 커뮤니티",
    color: "bg-orange-100 text-orange-600",
    visitedAt: "",
    addedAt: 5,
    userCount: 6780,
  },
  {
    id: 3,
    icon: "💬",
    name: "쌀먹 라운지",
    desc: "자유로운 수다 공간",
    color: "bg-blue-100 text-blue-600",
    visitedAt: "",
    addedAt: 6,
    userCount: 18900,
  },
  {
    id: 205,
    icon: "👊",
    name: "던전앤파이터",
    desc: "던파 유저 모임",
    color: "bg-blue-100 text-blue-600",
    visitedAt: "",
    addedAt: 7,
    userCount: 9450,
  },
  {
    id: 301,
    icon: "🌐",
    name: "디센트럴랜드",
    desc: "메타버스 P2E",
    color: "bg-red-100 text-red-600",
    visitedAt: "",
    addedAt: 8,
    userCount: 3200,
  },
  {
    id: 302,
    icon: "🎮",
    name: "엑시인피니티",
    desc: "P2E 게임",
    color: "bg-purple-100 text-purple-600",
    visitedAt: "",
    addedAt: 9,
    userCount: 4100,
  },
  {
    id: 107,
    icon: "🎯",
    name: "발로란트",
    desc: "발로란트 공략",
    color: "bg-red-100 text-red-600",
    visitedAt: "",
    addedAt: 10,
    userCount: 11200,
  },
  {
    id: 108,
    icon: "🏆",
    name: "리그오브레전드",
    desc: "롤 커뮤니티",
    color: "bg-blue-100 text-blue-600",
    visitedAt: "",
    addedAt: 11,
    userCount: 22000,
  },
  {
    id: 109,
    icon: "🔫",
    name: "오버워치2",
    desc: "오버워치 유저 모임",
    color: "bg-orange-100 text-orange-600",
    visitedAt: "",
    addedAt: 12,
    userCount: 7800,
  },
  {
    id: 110,
    icon: "⚽",
    name: "FC온라인",
    desc: "피파 유저 커뮤니티",
    color: "bg-green-100 text-green-600",
    visitedAt: "",
    addedAt: 13,
    userCount: 5600,
  },
  {
    id: 111,
    icon: "🃏",
    name: "하스스톤",
    desc: "하스스톤 덱 공유",
    color: "bg-yellow-100 text-yellow-600",
    visitedAt: "",
    addedAt: 14,
    userCount: 2900,
  },
];

export default function RecentChannelsContent({
  setCurrentPage,
}: RecentChannelsContentProps) {
  const { showToast } = useToast();
  const {
    groups: interestGroups,
    addToInterest,
    removeFromInterest,
    deleteGroup: deleteInterestGroup,
    changeGroup: changeInterestGroup,
    pendingChannel,
  } = useInterest();

  // InterestContext groups를 로컬 형식으로 변환
  const convertInterestToLocal = (): GroupData[] => {
    // "최근 본" 그룹은 로컬에서만 관리
    const recentGroup: GroupData = {
      id: "recent",
      name: "최근 본",
      isDefault: true,
      sortType: "custom",
      items: [
        {
          id: 202,
          icon: "🍁",
          name: "메이플스토리",
          desc: "메이플 유저들의 커뮤니티",
          color: "bg-orange-100 text-orange-600",
          visitedAt: "",
          addedAt: 1,
          userCount: 15420,
          galleryId: "maplestory",
        },
        {
          id: 104,
          icon: "⚔️",
          name: "리니지M",
          desc: "리니지M 정보 공유",
          color: "bg-gray-100 text-gray-600",
          visitedAt: "",
          addedAt: 2,
          userCount: 8930,
          galleryId: "lineagem",
        },
        {
          id: 203,
          icon: "🏰",
          name: "로스트아크",
          desc: "로아 공략 및 팁",
          color: "bg-amber-100 text-amber-600",
          visitedAt: "",
          addedAt: 3,
          userCount: 12850,
          galleryId: "lostark",
        },
      ],
    };

    // InterestContext의 그룹들을 로컬 형식으로 변환
    const convertedGroups: GroupData[] = interestGroups.map((group) => ({
      id: group.id,
      name: group.name,
      sortType: "custom" as SortType,
      items: group.channels.map((ch, idx) => ({
        id:
          typeof ch.id === "string"
            ? parseInt(ch.id, 10) || idx + 100
            : (ch.id as unknown as number),
        icon: ch.icon,
        name: ch.name,
        desc: ch.description || "",
        color: ch.color,
        visitedAt: "",
        addedAt: idx + 1,
        userCount: 1000 + idx * 100,
        galleryId: ch.id, // galleryData의 id
      })),
    }));

    return [recentGroup, ...convertedGroups];
  };

  // 그룹 데이터
  const [groups, setGroups] = useState<GroupData[]>(convertInterestToLocal);

  // InterestContext 변경 시 로컬 상태 업데이트
  useEffect(() => {
    setGroups(convertInterestToLocal());
  }, [interestGroups]);

  // pendingChannel이 있으면 그룹 추가 팝업 자동 열기
  useEffect(() => {
    if (pendingChannel) {
      setShowAddGroupPopup(true);
    }
  }, [pendingChannel]);

  const [activeGroupId, setActiveGroupId] = useState("recent");

  // 팝업/모달 상태
  const [showAddGroupPopup, setShowAddGroupPopup] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteGroupConfirm, setShowDeleteGroupConfirm] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showSortConfirm, setShowSortConfirm] = useState(false);
  const [pendingSortType, setPendingSortType] = useState<SortType | null>(null);

  // 그룹편집 모달 상태
  const [showGroupEditModal, setShowGroupEditModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<GroupData | null>(null);
  const [showGroupDeleteConfirm, setShowGroupDeleteConfirm] = useState(false);

  // 입력 상태
  const [renameValue, setRenameValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 편집 모드용 상태
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [galleriesSelected, setGalleriesSelected] = useState<number[]>([]);

  // 드래그 상태 (터치 기반)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragStartY = useRef<number>(0);
  const itemHeight = useRef<number>(60);
  const listRef = useRef<HTMLDivElement>(null);

  // 롱프레스 상태
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [longPressGroupId, setLongPressGroupId] = useState<string | null>(null);

  // 현재 그룹 가져오기
  const currentGroup = groups.find((g) => g.id === activeGroupId);
  const currentItems = currentGroup?.items || [];
  const currentSortType = currentGroup?.sortType || "custom";
  const isRecentTab = activeGroupId === "recent";

  // ===== 정렬된 아이템 =====
  const getSortedItems = (items: RecentGalleryItem[], sortType: SortType) => {
    const sorted = [...items];
    switch (sortType) {
      case "added":
        return sorted.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0));
      case "alphabetical":
        return sorted.sort((a, b) => a.name.localeCompare(b.name, "ko"));
      case "popular":
        return sorted.sort((a, b) => (b.userCount || 0) - (a.userCount || 0));
      case "custom":
      default:
        return sorted;
    }
  };

  const sortedItems = getSortedItems(currentItems, currentSortType);

  // ===== 기본 화면 핸들러 =====
  const handleDelete = (id: number) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === activeGroupId
          ? { ...group, items: group.items.filter((item) => item.id !== id) }
          : group,
      ),
    );
    showToast("삭제되었어요");
  };

  const handleItemClick = (item: RecentGalleryItem) => {
    console.log(
      "[RecentChannels] item clicked:",
      item.name,
      "galleryId:",
      item.galleryId,
    );
    if (item.name === "지금 핫한") {
      setCurrentPage("nav-hot");
    } else if (item.galleryId) {
      console.log(
        "[RecentChannels] navigating to:",
        `gallery-${item.galleryId}`,
      );
      setCurrentPage(`gallery-${item.galleryId}`);
    } else {
      // fallback: 이름 기반으로 간단한 id 생성
      const fallbackId = item.name.toLowerCase().replace(/\s+/g, "");
      console.log(
        "[RecentChannels] fallback navigating to:",
        `gallery-${fallbackId}`,
      );
      setCurrentPage(`gallery-${fallbackId}`);
    }
  };

  // ===== 그룹 추가 완료 콜백 (AddGroupModal에서 호출) =====
  const handleGroupCreated = (groupId: string) => {
    setShowAddGroupPopup(false);
    setShowGroupEditModal(false);
    // 새 그룹으로 이동
    setActiveGroupId(groupId);
  };

  // ===== 그룹 이름 변경 =====
  const handleRenameGroup = () => {
    if (
      renameValue.trim() &&
      currentGroup &&
      !currentGroup.isDefault &&
      currentGroup.id !== "recent"
    ) {
      // 로컬 상태만 업데이트 (InterestContext에는 rename 기능이 없으므로)
      setGroups((prev) =>
        prev.map((group) =>
          group.id === activeGroupId
            ? { ...group, name: renameValue.trim() }
            : group,
        ),
      );
      showToast("그룹 이름이 변경되었어요");
      setRenameValue("");
      setShowRenameModal(false);
    }
  };

  // ===== 그룹 삭제 (그룹편집 모달에서) =====
  const handleDeleteGroupFromModal = () => {
    if (groupToDelete && groupToDelete.id !== "recent") {
      // InterestContext에서도 삭제
      deleteInterestGroup(groupToDelete.id);
      if (activeGroupId === groupToDelete.id) {
        setActiveGroupId("recent");
      }
      showToast(`'${groupToDelete.name}' 그룹이 삭제되었어요`);
    }
    setGroupToDelete(null);
    setShowGroupDeleteConfirm(false);
  };

  // ===== 정렬 변경 =====
  const handleSortSelect = (sortType: SortType) => {
    setShowSortOptions(false);

    if (currentSortType === "custom" && sortType !== "custom") {
      setPendingSortType(sortType);
      setShowSortConfirm(true);
    } else {
      applySort(sortType);
    }
  };

  const applySort = (sortType: SortType) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === activeGroupId ? { ...group, sortType } : group,
      ),
    );
    const label = sortOptions.find((o) => o.type === sortType)?.label;
    showToast(`${label}으로 변경되었어요`);
  };

  const handleConfirmSort = () => {
    if (pendingSortType) {
      applySort(pendingSortType);
    }
    setPendingSortType(null);
    setShowSortConfirm(false);
  };

  // ===== 편집 모드 =====
  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === currentItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map((item) => item.id));
    }
  };

  const handleEditComplete = () => {
    setShowEditMode(false);
    setSelectedItems([]);
    showToast("편집이 완료되었어요");
  };

  // ===== 선택 아이템 삭제 =====
  const handleDeleteSelected = () => {
    // 최근 본이 아닌 경우 InterestContext에서도 삭제
    if (activeGroupId !== "recent") {
      const currentGroup = groups.find((g) => g.id === activeGroupId);
      if (currentGroup) {
        selectedItems.forEach((itemId) => {
          const item = currentGroup.items.find((i) => i.id === itemId);
          if (item) {
            removeFromInterest(String(itemId));
          }
        });
      }
    } else {
      // 최근 본은 로컬에서만 삭제
      setGroups((prev) =>
        prev.map((group) =>
          group.id === activeGroupId
            ? {
                ...group,
                items: group.items.filter(
                  (item) => !selectedItems.includes(item.id),
                ),
              }
            : group,
        ),
      );
    }
    showToast(`${selectedItems.length}개 갤러리가 삭제되었어요`);
    setSelectedItems([]);
  };

  // ===== 갤러리 추가 =====
  const handleAddGalleries = () => {
    const itemsToAdd = allGalleries.filter((g) =>
      galleriesSelected.includes(g.id),
    );

    // 최근 본이 아닌 경우 InterestContext에도 추가
    if (activeGroupId !== "recent") {
      itemsToAdd.forEach((item) => {
        const channel: InterestChannel = {
          id: String(item.id),
          name: item.name,
          icon: item.icon,
          color: item.color,
          description: item.desc,
        };
        addToInterest(channel, activeGroupId);
      });
    } else {
      // 최근 본은 로컬에서만 추가
      const now = Date.now();
      setGroups((prev) =>
        prev.map((group) => {
          if (group.id === activeGroupId) {
            const existingIds = group.items.map((i) => i.id);
            const newItems = itemsToAdd
              .filter((i) => !existingIds.includes(i.id))
              .map((item, idx) => ({ ...item, addedAt: now + idx }));
            return { ...group, items: [...group.items, ...newItems] };
          }
          return group;
        }),
      );
    }

    showToast(`${galleriesSelected.length}개 갤러리가 추가되었어요`);
    setGalleriesSelected([]);
    setSearchQuery("");
    setShowAddGalleryModal(false);
  };

  // ===== 터치 드래그 =====
  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    if (currentSortType !== "custom" || isRecentTab) return;

    setDraggedIndex(index);
    dragStartY.current = e.touches[0].clientY;

    const target = e.currentTarget as HTMLElement;
    itemHeight.current = target.offsetHeight + 8;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedIndex === null || currentSortType !== "custom" || isRecentTab)
      return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY.current;
    const indexDiff = Math.round(diff / itemHeight.current);
    const newIndex = Math.max(
      0,
      Math.min(currentItems.length - 1, draggedIndex + indexDiff),
    );

    if (newIndex !== dragOverIndex) {
      setDragOverIndex(newIndex);
    }
  };

  const handleTouchEnd = () => {
    if (
      draggedIndex !== null &&
      dragOverIndex !== null &&
      draggedIndex !== dragOverIndex
    ) {
      setGroups((prev) =>
        prev.map((group) => {
          if (group.id === activeGroupId) {
            const newItems = [...group.items];
            const [removed] = newItems.splice(draggedIndex, 1);
            newItems.splice(dragOverIndex, 0, removed);
            return { ...group, items: newItems };
          }
          return group;
        }),
      );
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // ===== 롱프레스 (탭 삭제) =====
  const handleTabLongPressStart = (groupId: string) => {
    const group = groups.find((g) => g.id === groupId);
    if (group?.isDefault) return;

    longPressTimer.current = setTimeout(() => {
      setLongPressGroupId(groupId);
      setShowDeleteGroupConfirm(true);
    }, 600);
  };

  const handleTabLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // 빈 상태 메시지
  const emptyMessage =
    activeGroupId === "recent"
      ? {
          emoji: "🕐",
          title: "최근 방문한 갤러리가 없어요",
          desc: "갤러리를 둘러보고 관심있는 곳에 가입해보세요!",
        }
      : {
          emoji: "⭐",
          title: "갤러리가 없어요",
          desc: "자주 방문하는 갤러리를 추가해보세요!",
        };

  // 검색 필터링
  const filteredAllGalleries = allGalleries.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 드래그 중인 아이템 순서 계산
  const getDisplayItems = () => {
    if (currentSortType !== "custom" || isRecentTab) return sortedItems;
    if (
      draggedIndex === null ||
      dragOverIndex === null ||
      draggedIndex === dragOverIndex
    ) {
      return currentItems;
    }

    const items = [...currentItems];
    const [removed] = items.splice(draggedIndex, 1);
    items.splice(dragOverIndex, 0, removed);
    return items;
  };

  // 현재 정렬 라벨
  const currentSortLabel =
    sortOptions.find((o) => o.type === currentSortType)?.label ||
    "직접 설정한 순";

  // ===== 편집 모드 화면 =====
  if (showEditMode) {
    const displayItems = getDisplayItems();

    return (
      <div className="fixed inset-0 z-[100] flex justify-center bg-black/50">
        <div className="w-full max-w-md h-full bg-white flex flex-col">
          {/* 헤더 */}
          <div className="bg-white border-b border-gray-100">
            <div className="flex items-center justify-between px-4 h-14">
              <button
                onClick={() => {
                  setShowEditMode(false);
                  setSelectedItems([]);
                }}
                className="w-10 h-10 -ml-2 flex items-center justify-center"
              >
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
              <h1 className="text-base font-bold text-gray-900">관심 편집</h1>
              <div className="w-10" />
            </div>

            {/* 탭 */}
            <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
              {/* 그룹편집 버튼 - 항상 표시 */}
              <button
                onClick={() => setShowGroupEditModal(true)}
                className="px-3 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap text-[#72C2FF] border border-[#72C2FF] shrink-0"
              >
                그룹편집
              </button>

              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroupId(group.id);
                    setSelectedItems([]);
                  }}
                  onTouchStart={() => handleTabLongPressStart(group.id)}
                  onTouchEnd={handleTabLongPressEnd}
                  onMouseDown={() => handleTabLongPressStart(group.id)}
                  onMouseUp={handleTabLongPressEnd}
                  onMouseLeave={handleTabLongPressEnd}
                  className={`px-3 py-1.5 text-[12px] font-medium rounded-full whitespace-nowrap transition-all flex items-center gap-1 ${
                    activeGroupId === group.id
                      ? "bg-[#72C2FF] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {group.name}
                  {activeGroupId === group.id && group.id !== "recent" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameValue(group.name);
                        setShowRenameModal(true);
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 옵션 바 - 최근 본 탭이면 비활성화 스타일 */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
            <button
              onClick={isRecentTab ? undefined : handleSelectAll}
              disabled={isRecentTab}
              className={`text-[13px] ${isRecentTab ? "text-gray-300 cursor-default" : "text-gray-500"}`}
            >
              {selectedItems.length === currentItems.length
                ? "전체해제"
                : "전체선택"}
            </button>
            <button
              onClick={isRecentTab ? undefined : () => setShowSortOptions(true)}
              disabled={isRecentTab}
              className={`text-[13px] font-medium flex items-center gap-1 ${
                isRecentTab ? "text-gray-300 cursor-default" : "text-[#72C2FF]"
              }`}
            >
              {currentSortLabel}
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* 갤러리 추가하기 - 최근 본 탭이 아닐 때만 표시 */}
          {!isRecentTab && (
            <div className="px-4 py-3 bg-white border-b border-gray-100">
              <button
                onClick={() => setShowAddGalleryModal(true)}
                className="flex items-center gap-3 text-[#72C2FF]"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
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
                </div>
                <span className="text-[14px] font-medium">갤러리 추가하기</span>
              </button>
            </div>
          )}

          {/* 아이템 목록 */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto bg-gray-50"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {currentItems.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-5xl mb-4">{emptyMessage.emoji}</p>
                <p className="text-[16px] font-semibold text-gray-500 mb-2">
                  {emptyMessage.title}
                </p>
                <p className="text-[14px] text-gray-400">{emptyMessage.desc}</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {displayItems.map((item, index) => {
                  const originalIndex = currentItems.findIndex(
                    (i) => i.id === item.id,
                  );
                  const isDragging = draggedIndex === originalIndex;
                  const isOver =
                    dragOverIndex === index && draggedIndex !== null;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 py-3 px-4 border-b border-gray-100 bg-white transition-all ${
                        isDragging ? "opacity-50 scale-95" : ""
                      } ${isOver ? "border-t-2 border-t-[#72C2FF]" : ""}`}
                    >
                      {/* 최근 본 탭이 아닐 때: 체크박스 */}
                      {!isRecentTab && (
                        <button
                          onClick={() => toggleSelectItem(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                            selectedItems.includes(item.id)
                              ? "bg-[#72C2FF] border-[#72C2FF]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
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
                        </button>
                      )}

                      {/* 아이콘 */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${item.color}`}
                      >
                        {item.icon}
                      </div>

                      {/* 이름 */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                      </div>

                      {/* 최근 본 탭: X 삭제 버튼 */}
                      {isRecentTab ? (
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 active:text-gray-600"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      ) : (
                        /* 다른 탭: 드래그 핸들 */
                        <div
                          className={`p-2 touch-none select-none ${
                            currentSortType === "custom"
                              ? "text-gray-300"
                              : "text-gray-200"
                          }`}
                          onTouchStart={(e) =>
                            handleTouchStart(originalIndex, e)
                          }
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-8 8a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm8 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 하단 버튼 */}
          <div className="p-4 bg-white border-t border-gray-100">
            {!isRecentTab && selectedItems.length > 0 ? (
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteSelected}
                  className="flex-1 py-3 bg-red-50 text-red-500 font-semibold rounded-xl active:bg-red-100"
                >
                  삭제 {selectedItems.length}
                </button>
                <button
                  onClick={handleEditComplete}
                  className="flex-1 py-3 bg-[#72C2FF] text-white font-semibold rounded-xl active:bg-[#5ab0f0]"
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditComplete}
                className="w-full py-4 bg-gray-100 text-gray-600 font-semibold rounded-xl active:bg-gray-200"
              >
                완료
              </button>
            )}
          </div>
        </div>

        {/* ===== 그룹편집 바텀시트 ===== */}
        {showGroupEditModal && (
          <div
            className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50"
            onClick={() => setShowGroupEditModal(false)}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-2xl overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-center">그룹 편집</h3>
              </div>

              <div className="py-2 max-h-[60vh] overflow-y-auto">
                {/* 새 그룹 추가 */}
                <button
                  onClick={() => {
                    setShowGroupEditModal(false);
                    setShowAddGroupPopup(true);
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 active:bg-gray-50"
                >
                  <div className="w-7 h-7 rounded-full bg-[#72C2FF] flex items-center justify-center">
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium text-gray-900">
                    새 그룹 추가
                  </span>
                </button>

                {/* 그룹 목록 */}
                {groups.map((group) => {
                  const isRecent = group.id === "recent";

                  return (
                    <div
                      key={group.id}
                      className="w-full px-4 py-3 flex items-center gap-3"
                    >
                      {/* 삭제 버튼 - 최근 본만 삭제 불가 */}
                      <button
                        onClick={() => {
                          if (!isRecent) {
                            setGroupToDelete(group);
                            setShowGroupDeleteConfirm(true);
                          }
                        }}
                        disabled={isRecent}
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          isRecent ? "bg-gray-300" : "bg-red-500"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      {/* 그룹 이름 */}
                      <span
                        className={`text-[14px] font-medium ${isRecent ? "text-gray-400" : "text-gray-900"}`}
                      >
                        {group.name}
                      </span>

                      {/* 갤러리 개수 */}
                      <span className="text-[12px] text-gray-400 ml-auto">
                        {group.items.length}개
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setShowGroupEditModal(false)}
                  className="w-full py-3 text-gray-500 font-medium"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 그룹 삭제 확인 모달 (그룹편집에서) ===== */}
        {showGroupDeleteConfirm && groupToDelete && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-6">
            <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-6 text-center">
                <p className="text-[16px] font-bold text-gray-900 mb-2">
                  "{groupToDelete.name}"을 삭제할까요?
                </p>
                <p className="text-[14px] text-gray-500">
                  그룹 내 갤러리도 함께 삭제됩니다.
                </p>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => {
                    setGroupToDelete(null);
                    setShowGroupDeleteConfirm(false);
                  }}
                  className="flex-1 py-4 text-gray-500 font-medium border-r border-gray-100"
                >
                  나중에
                </button>
                <button
                  onClick={handleDeleteGroupFromModal}
                  className="flex-1 py-4 text-red-500 font-semibold"
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 정렬 옵션 바텀시트 ===== */}
        {showSortOptions && (
          <div
            className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50"
            onClick={() => setShowSortOptions(false)}
          >
            <div
              className="w-full max-w-md bg-white rounded-t-2xl overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-4 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-center">정렬</h3>
              </div>
              <div className="py-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => handleSortSelect(option.type)}
                    className={`w-full px-4 py-3 text-left text-[14px] flex items-center justify-between ${
                      currentSortType === option.type
                        ? "text-[#72C2FF] font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                    {currentSortType === option.type && (
                      <svg
                        className="w-5 h-5 text-[#72C2FF]"
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
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setShowSortOptions(false)}
                  className="w-full py-3 text-gray-500 font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 정렬 변경 확인 팝업 ===== */}
        {showSortConfirm && pendingSortType && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-6">
            <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-6 text-center">
                <p className="text-[16px] font-bold text-gray-900 mb-2">
                  순서를 바꾸면 직접 설정한
                  <br />
                  순서가 사라져요
                </p>
                <p className="text-[14px] text-gray-500">
                  {sortOptions.find((o) => o.type === pendingSortType)?.label}
                  으로 바꿀까요?
                </p>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => {
                    setPendingSortType(null);
                    setShowSortConfirm(false);
                  }}
                  className="flex-1 py-4 text-gray-500 font-medium border-r border-gray-100"
                >
                  그대로 두기
                </button>
                <button
                  onClick={handleConfirmSort}
                  className="flex-1 py-4 text-[#72C2FF] font-semibold"
                >
                  순서 바꾸기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 이름 변경 모달 ===== */}
        {showRenameModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm mx-4 bg-white rounded-2xl overflow-hidden">
              <div className="px-6 py-5">
                <h3 className="text-[16px] font-bold text-center mb-4">
                  그룹 이름 변경
                </h3>
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  placeholder="새 이름 입력"
                  className="w-full px-4 py-3 text-[14px] border border-gray-200 rounded-xl focus:border-[#72C2FF] outline-none"
                  autoFocus
                />
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowRenameModal(false);
                    setRenameValue("");
                  }}
                  className="flex-1 py-4 text-gray-500 font-medium border-r border-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={handleRenameGroup}
                  disabled={!renameValue.trim()}
                  className={`flex-1 py-4 font-medium ${
                    renameValue.trim() ? "text-[#72C2FF]" : "text-gray-300"
                  }`}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 그룹 삭제 확인 모달 (롱프레스) ===== */}
        {showDeleteGroupConfirm && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50">
            <div className="w-full max-w-sm mx-4 bg-white rounded-2xl overflow-hidden">
              <div className="px-6 py-5 text-center">
                <p className="text-[16px] font-bold mb-2">그룹 삭제</p>
                <p className="text-[14px] text-gray-500">
                  '{groups.find((g) => g.id === longPressGroupId)?.name}' 그룹을
                  삭제할까요?
                </p>
              </div>
              <div className="flex border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowDeleteGroupConfirm(false);
                    setLongPressGroupId(null);
                  }}
                  className="flex-1 py-4 text-gray-500 font-medium border-r border-gray-100"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    if (longPressGroupId) {
                      setGroups((prev) =>
                        prev.filter((g) => g.id !== longPressGroupId),
                      );
                      if (activeGroupId === longPressGroupId) {
                        setActiveGroupId("recent");
                      }
                      showToast("그룹이 삭제되었어요");
                    }
                    setShowDeleteGroupConfirm(false);
                    setLongPressGroupId(null);
                  }}
                  className="flex-1 py-4 text-red-500 font-medium"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 갤러리 추가 모달 (전체화면) ===== */}
        {showAddGalleryModal && (
          <div className="fixed inset-0 z-[110] flex justify-center bg-black/50">
            <div className="w-full max-w-md h-full bg-white flex flex-col">
              {/* 헤더 */}
              <div className="flex items-center px-4 h-14 border-b border-gray-100">
                <button
                  onClick={() => {
                    setShowAddGalleryModal(false);
                    setGalleriesSelected([]);
                    setSearchQuery("");
                  }}
                  className="w-10 h-10 -ml-2 flex items-center justify-center"
                >
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
                <h1 className="flex-1 text-base font-bold text-gray-900 text-center pr-10">
                  갤러리 추가
                </h1>
              </div>

              {/* 검색 */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="갤러리 검색"
                    className="flex-1 bg-transparent text-[14px] outline-none"
                  />
                </div>
              </div>

              {/* 갤러리 목록 */}
              <div className="flex-1 overflow-y-auto">
                {filteredAllGalleries.map((gallery) => {
                  const isSelected = galleriesSelected.includes(gallery.id);
                  const isAlreadyAdded = currentItems.some(
                    (i) => i.id === gallery.id,
                  );

                  return (
                    <button
                      key={gallery.id}
                      onClick={() => {
                        if (isAlreadyAdded) return;
                        setGalleriesSelected((prev) =>
                          prev.includes(gallery.id)
                            ? prev.filter((id) => id !== gallery.id)
                            : [...prev, gallery.id],
                        );
                      }}
                      disabled={isAlreadyAdded}
                      className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 ${
                        isAlreadyAdded ? "opacity-50" : ""
                      }`}
                    >
                      {/* 체크박스 */}
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? "bg-[#72C2FF] border-[#72C2FF]"
                            : isAlreadyAdded
                              ? "border-gray-200 bg-gray-100"
                              : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
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
                        {isAlreadyAdded && !isSelected && (
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      {/* 아이콘 */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 ${gallery.color}`}
                      >
                        {gallery.icon}
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-[14px] font-medium text-gray-900 truncate">
                          {gallery.name}
                        </p>
                        <p className="text-[12px] text-gray-400 truncate">
                          {gallery.desc}
                        </p>
                      </div>

                      {isAlreadyAdded && (
                        <span className="text-[12px] text-gray-400 shrink-0">
                          추가됨
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 추가 버튼 */}
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleAddGalleries}
                  disabled={galleriesSelected.length === 0}
                  className={`w-full py-4 font-semibold rounded-xl transition-colors ${
                    galleriesSelected.length > 0
                      ? "bg-[#72C2FF] text-white active:bg-[#5ab0f0]"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {galleriesSelected.length > 0
                    ? `${galleriesSelected.length}개 추가`
                    : "추가"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== 그룹추가 모달 ===== */}
        <AddGroupModal
          isOpen={showAddGroupPopup}
          onClose={() => setShowAddGroupPopup(false)}
          onGroupCreated={handleGroupCreated}
        />
      </div>
    );
  }

  // ===== 기본 화면 =====
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* 서브탭 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 px-4 py-3">
          {/* 탭 버튼들 */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`px-4 py-2 text-[13px] font-semibold rounded-full transition-all whitespace-nowrap shrink-0 ${
                  activeGroupId === group.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>

          {/* 그룹추가 버튼 - 오른쪽 붙임 */}
          <button
            onClick={() => setShowAddGroupPopup(true)}
            className="px-3 py-2 text-[13px] font-semibold whitespace-nowrap shrink-0 text-[#72C2FF]"
          >
            + 그룹추가
          </button>
        </div>
      </div>

      {/* 편집 버튼 - 카드 위 오른쪽 */}
      <div className="flex justify-end px-4 pt-3">
        <button
          onClick={() => setShowEditMode(true)}
          className="px-3 py-1.5 text-[13px] font-medium text-gray-500"
        >
          편집
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {sortedItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">{emptyMessage.emoji}</p>
            <p className="text-[16px] font-semibold text-gray-500 mb-2">
              {emptyMessage.title}
            </p>
            <p className="text-[14px] text-gray-400">{emptyMessage.desc}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedItems.map((item, index) => (
              <div
                key={item.id}
                className="relative animate-fadeUp"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <GalleryCard1Col
                  item={item}
                  onClick={() => handleItemClick(item)}
                />
                {/* 삭제 버튼 - 최근 본 탭에서만 표시 */}
                {activeGroupId === "recent" && (
                  <button
                    className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 active:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <svg
                      className="w-3.5 h-3.5"
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
            ))}
          </div>
        )}
      </div>

      {/* ===== 그룹추가 모달 - 기본 화면에서 ===== */}
      <AddGroupModal
        isOpen={showAddGroupPopup}
        onClose={() => setShowAddGroupPopup(false)}
        onGroupCreated={handleGroupCreated}
      />

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.3s ease-out forwards;
          opacity: 0;
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// ===== 1열 갤러리 카드 컴포넌트 =====
function GalleryCard1Col({
  item,
  onClick,
}: {
  item: RecentGalleryItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm active:bg-gray-50 transition-colors cursor-pointer"
    >
      {/* 아이콘 */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${item.color}`}
      >
        {item.icon}
      </div>

      {/* 정보 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
        </div>
        <p className="text-[12px] text-gray-400 truncate mt-0.5">{item.desc}</p>
      </div>

      {/* 화살표 */}
      <svg
        className="w-4 h-4 text-gray-300"
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
  );
}
