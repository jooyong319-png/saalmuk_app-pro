import { createContext, useContext, useState, ReactNode } from "react";
import { useToast, TOAST_MESSAGES } from "./Toast";

// ===== 타입 정의 =====
interface FollowContextType {
  followedUsers: string[];
  isFollowing: (userId: string) => boolean;
  toggleFollow: (userId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
}

// ===== 기본값 (Provider 없을 때 사용) =====
const defaultFollowedUsers = [
  "금손e",
  "배당성장주민",
  "사전예약킹",
  "쌀먹러123",
  "핫루키",
  "주목받는자",
  "게임킹",
  "인기BJ",
  "e스포츠해설",
  "팁스터",
  "게임아티스트",
  "김쌀먹",
  "게임마스터",
  "메이플고수",
];

// ===== Context 생성 (기본값 포함) =====
const FollowContext = createContext<FollowContextType>({
  followedUsers: defaultFollowedUsers,
  isFollowing: (userId: string) => defaultFollowedUsers.includes(userId),
  toggleFollow: () => {},
  followUser: () => {},
  unfollowUser: () => {},
});

// ===== Provider 컴포넌트 =====
interface FollowProviderProps {
  children: ReactNode;
}

export function FollowProvider({ children }: FollowProviderProps) {
  // 초기 팔로우 목록
  const [followedUsers, setFollowedUsers] =
    useState<string[]>(defaultFollowedUsers);

  // 언팔로우 확인 팝업 상태
  const [unfollowTarget, setUnfollowTarget] = useState<string | null>(null);

  // Toast 사용
  const { showToast } = useToast();

  // 팔로우 여부 확인
  const isFollowing = (userId: string): boolean => {
    return followedUsers.includes(userId);
  };

  // 팔로우 토글 (팔로잉 상태면 확인 팝업 표시)
  const toggleFollow = (userId: string): void => {
    const wasFollowing = followedUsers.includes(userId);

    if (wasFollowing) {
      // 언팔로우 시 확인 팝업 표시
      setUnfollowTarget(userId);
    } else {
      // 팔로우는 바로 실행
      setFollowedUsers((prev) => [...prev, userId]);
      showToast(TOAST_MESSAGES.FOLLOW(userId));
    }
  };

  // 실제 언팔로우 실행
  const confirmUnfollow = () => {
    if (unfollowTarget) {
      setFollowedUsers((prev) => prev.filter((id) => id !== unfollowTarget));
      showToast(TOAST_MESSAGES.UNFOLLOW(unfollowTarget));
      setUnfollowTarget(null);
    }
  };

  // 언팔로우 취소
  const cancelUnfollow = () => {
    setUnfollowTarget(null);
  };

  // 팔로우 추가 (토스트 표시)
  const followUser = (userId: string): void => {
    if (!followedUsers.includes(userId)) {
      setFollowedUsers((prev) => [...prev, userId]);
      showToast(TOAST_MESSAGES.FOLLOW(userId));
    }
  };

  // 언팔로우 (확인 팝업 표시)
  const unfollowUser = (userId: string): void => {
    if (followedUsers.includes(userId)) {
      setUnfollowTarget(userId);
    }
  };

  return (
    <FollowContext.Provider
      value={{
        followedUsers,
        isFollowing,
        toggleFollow,
        followUser,
        unfollowUser,
      }}
    >
      {children}

      {/* 언팔로우 확인 팝업 */}
      {unfollowTarget && (
        <div className="fixed inset-0 z-[10003] flex items-center justify-center">
          {/* 백드롭 */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={cancelUnfollow}
          />

          {/* 모달 */}
          <div className="relative w-[320px] bg-white rounded-2xl px-5 pt-6 pb-5 mx-4 shadow-xl animate-fadeIn">
            {/* 타이틀 */}
            <h2 className="text-[18px] font-bold text-gray-900 mb-2">
              팔로우를 취소할까요?
            </h2>

            {/* 설명 */}
            <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
              팔로우를 취소하면 {unfollowTarget}님의 새 글이나 활동 알림을 받을
              수 없어요.
            </p>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={cancelUnfollow}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-[15px]"
              >
                닫기
              </button>
              <button
                onClick={confirmUnfollow}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-[15px]"
              >
                팔로우 취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out both; }
      `}</style>
    </FollowContext.Provider>
  );
}

// ===== Hook =====
export function useFollow(): FollowContextType {
  return useContext(FollowContext);
}

export default FollowContext;
