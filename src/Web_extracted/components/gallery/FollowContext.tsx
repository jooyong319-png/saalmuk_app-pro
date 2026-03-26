import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// ===== 타입 =====
interface FollowContextType {
  followingUsers: string[];
  isFollowing: (userName: string) => boolean;
  toggleFollow: (userName: string) => void;
  followUser: (userName: string) => void;
  unfollowUser: (userName: string) => void;
  followingCount: number;
}

// ===== 기본 데이터 =====
const defaultFollowing: string[] = [
  "금손e",
  "배당성장주민",
  "사전예약킹",
  "쌀먹러123",
  "팁스터",
  "게임아티스트",
  "주목받는자",
];

// ===== Context =====
const FollowContext = createContext<FollowContextType | null>(null);

// ===== Provider =====
export function FollowProvider({ children }: { children: ReactNode }) {
  const [followingUsers, setFollowingUsers] =
    useState<string[]>(defaultFollowing);

  // 팔로우 여부 확인
  const isFollowing = useCallback(
    (userName: string) => {
      return followingUsers.includes(userName);
    },
    [followingUsers],
  );

  // 팔로우 토글
  const toggleFollow = useCallback((userName: string) => {
    setFollowingUsers((prev) => {
      if (prev.includes(userName)) {
        return prev.filter((name) => name !== userName);
      } else {
        return [...prev, userName];
      }
    });
  }, []);

  // 팔로우
  const followUser = useCallback((userName: string) => {
    setFollowingUsers((prev) => {
      if (prev.includes(userName)) {
        return prev;
      }
      return [...prev, userName];
    });
  }, []);

  // 언팔로우
  const unfollowUser = useCallback((userName: string) => {
    setFollowingUsers((prev) => prev.filter((name) => name !== userName));
  }, []);

  return (
    <FollowContext.Provider
      value={{
        followingUsers,
        isFollowing,
        toggleFollow,
        followUser,
        unfollowUser,
        followingCount: followingUsers.length,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

// ===== Hook =====
export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error("useFollow must be used within FollowProvider");
  }
  return context;
}
