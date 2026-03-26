import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ===== 타입 정의 =====
export interface RecentGallery {
  id: string;
  name: string;
  icon: string;
  color?: string;
  visitedAt: number; // timestamp
}

interface RecentContextType {
  recentGalleries: RecentGallery[];
  // 갤러리 방문 추가
  addRecent: (gallery: Omit<RecentGallery, "visitedAt">) => void;
  // 특정 갤러리 삭제
  removeRecent: (galleryId: string) => void;
  // 전체 삭제
  clearRecent: () => void;
  // 방문 시간 포맷팅
  getVisitedTimeText: (timestamp: number) => string;
}

const RecentContext = createContext<RecentContextType | null>(null);

// ===== 초기 데이터 =====
const initialRecent: RecentGallery[] = [
  {
    id: "maplestory",
    name: "메이플스토리",
    icon: "🍁",
    color: "bg-orange-100 text-orange-600",
    visitedAt: Date.now() - 1000 * 60 * 60, // 1시간 전
  },
  {
    id: "lineagem",
    name: "리니지M",
    icon: "⚔️",
    color: "bg-gray-100 text-gray-600",
    visitedAt: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
  },
  {
    id: "lostark",
    name: "로스트아크",
    icon: "🏰",
    color: "bg-amber-100 text-amber-600",
    visitedAt: Date.now() - 1000 * 60 * 60 * 3, // 3시간 전
  },
  {
    id: "valorant",
    name: "발로란트",
    icon: "🎯",
    color: "bg-red-100 text-red-600",
    visitedAt: Date.now() - 1000 * 60 * 60 * 24, // 어제
  },
];

// ===== Provider =====
export function RecentProvider({ children }: { children: ReactNode }) {
  const [recentGalleries, setRecentGalleries] = useState<RecentGallery[]>(initialRecent);

  // 갤러리 방문 추가 (이미 있으면 시간만 업데이트, 최대 20개)
  const addRecent = useCallback((gallery: Omit<RecentGallery, "visitedAt">) => {
    setRecentGalleries((prev) => {
      // 이미 있으면 제거
      const filtered = prev.filter((g) => g.id !== gallery.id);
      // 맨 앞에 추가
      const updated = [
        { ...gallery, visitedAt: Date.now() },
        ...filtered,
      ];
      // 최대 20개
      return updated.slice(0, 20);
    });
  }, []);

  // 특정 갤러리 삭제
  const removeRecent = useCallback((galleryId: string) => {
    setRecentGalleries((prev) => prev.filter((g) => g.id !== galleryId));
  }, []);

  // 전체 삭제
  const clearRecent = useCallback(() => {
    setRecentGalleries([]);
  }, []);

  // 방문 시간 포맷팅
  const getVisitedTimeText = useCallback((timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "방금";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    return `${Math.floor(days / 7)}주 전`;
  }, []);

  return (
    <RecentContext.Provider
      value={{
        recentGalleries,
        addRecent,
        removeRecent,
        clearRecent,
        getVisitedTimeText,
      }}
    >
      {children}
    </RecentContext.Provider>
  );
}

// ===== Hook =====
export function useRecent() {
  const context = useContext(RecentContext);
  if (!context) {
    throw new Error("useRecent must be used within a RecentProvider");
  }
  return context;
}
