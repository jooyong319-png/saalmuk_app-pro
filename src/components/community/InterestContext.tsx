import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ===== 타입 정의 =====
export interface InterestGroup {
  id: string;
  name: string;
  channels: InterestChannel[];
}

export interface InterestChannel {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

interface InterestContextType {
  groups: InterestGroup[];
  // 채널이 관심에 있는지 확인
  isInInterest: (channelId: string) => boolean;
  // 채널이 속한 그룹 찾기
  getChannelGroup: (channelId: string) => InterestGroup | null;
  // 채널을 그룹에 추가 (기본: "default")
  addToInterest: (channel: InterestChannel, groupId?: string) => void;
  // 채널을 관심에서 제거
  removeFromInterest: (channelId: string) => void;
  // 채널의 그룹 변경
  changeGroup: (channelId: string, newGroupId: string) => void;
  // 새 그룹 생성
  createGroup: (name: string) => string;
  // 그룹 삭제
  deleteGroup: (groupId: string) => void;
  // 토글 (있으면 제거, 없으면 기본에 추가)
  toggleInterest: (channel: InterestChannel) => boolean; // true: 추가됨, false: 제거됨
  // 새 그룹 추가 시 자동으로 추가될 채널
  pendingChannel: InterestChannel | null;
  setPendingChannel: (channel: InterestChannel | null) => void;
  // 새 그룹 추가 후 pending 채널 처리
  addPendingToGroup: (groupId: string) => void;
}

const InterestContext = createContext<InterestContextType | null>(null);

// ===== 초기 데이터 =====
const initialGroups: InterestGroup[] = [
  {
    id: "default",
    name: "기본",
    channels: [
      {
        id: "bluearchive",
        name: "블루 아카이브",
        icon: "💙",
        color: "bg-gradient-to-br from-blue-400 to-sky-500",
        description: "넥슨게임즈 | 미소녀 수집형 RPG",
      },
      {
        id: "genshin",
        name: "원신",
        icon: "⭐",
        color: "bg-gradient-to-br from-amber-400 to-orange-500",
        description: "miHoYo | 오픈월드 액션 RPG",
      },
    ],
  },
  {
    id: "group1",
    name: "휴머노이드배터리",
    channels: [
      {
        id: "nikke",
        name: "승리의 여신: 니케",
        icon: "🎯",
        color: "bg-gradient-to-br from-red-400 to-pink-500",
        description: "시프트업 | 미소녀 슈팅 RPG",
      },
      {
        id: "arknights",
        name: "명일방주",
        icon: "🗡️",
        color: "bg-gradient-to-br from-slate-600 to-gray-800",
        description: "Yostar | 타워디펜스 RPG",
      },
    ],
  },
];

// ===== Provider =====
export function InterestProvider({ children }: { children: ReactNode }) {
  const [groups, setGroups] = useState<InterestGroup[]>(initialGroups);

  // 채널이 관심에 있는지 확인
  const isInInterest = useCallback(
    (channelId: string) => {
      return groups.some((group) =>
        group.channels.some((ch) => ch.id === channelId),
      );
    },
    [groups],
  );

  // 채널이 속한 그룹 찾기
  const getChannelGroup = useCallback(
    (channelId: string) => {
      return (
        groups.find((group) =>
          group.channels.some((ch) => ch.id === channelId),
        ) || null
      );
    },
    [groups],
  );

  // 채널을 그룹에 추가
  const addToInterest = useCallback(
    (channel: InterestChannel, groupId: string = "default") => {
      setGroups((prev) => {
        // 이미 있으면 먼저 제거
        const withoutChannel = prev.map((group) => ({
          ...group,
          channels: group.channels.filter((ch) => ch.id !== channel.id),
        }));

        // 해당 그룹에 추가
        return withoutChannel.map((group) =>
          group.id === groupId
            ? { ...group, channels: [...group.channels, channel] }
            : group,
        );
      });
    },
    [],
  );

  // 채널을 관심에서 제거
  const removeFromInterest = useCallback((channelId: string) => {
    setGroups((prev) =>
      prev.map((group) => ({
        ...group,
        channels: group.channels.filter((ch) => ch.id !== channelId),
      })),
    );
  }, []);

  // 채널의 그룹 변경
  const changeGroup = useCallback(
    (channelId: string, newGroupId: string) => {
      const channel = groups
        .flatMap((g) => g.channels)
        .find((ch) => ch.id === channelId);
      if (channel) {
        addToInterest(channel, newGroupId);
      }
    },
    [groups, addToInterest],
  );

  // 새 그룹 생성
  const createGroup = useCallback((name: string) => {
    const newId = `group_${Date.now()}`;
    setGroups((prev) => [...prev, { id: newId, name, channels: [] }]);
    return newId;
  }, []);

  // 그룹 삭제 (채널들은 기본 그룹으로 이동)
  const deleteGroup = useCallback((groupId: string) => {
    if (groupId === "default") return; // 기본 그룹은 삭제 불가

    setGroups((prev) => {
      const groupToDelete = prev.find((g) => g.id === groupId);
      if (!groupToDelete) return prev;

      // 삭제할 그룹의 채널들을 기본 그룹으로 이동
      return prev
        .filter((g) => g.id !== groupId)
        .map((g) =>
          g.id === "default"
            ? { ...g, channels: [...g.channels, ...groupToDelete.channels] }
            : g,
        );
    });
  }, []);

  // 토글 (있으면 제거, 없으면 기본에 추가)
  const toggleInterest = useCallback(
    (channel: InterestChannel) => {
      if (isInInterest(channel.id)) {
        removeFromInterest(channel.id);
        return false;
      } else {
        addToInterest(channel, "default");
        return true;
      }
    },
    [isInInterest, removeFromInterest, addToInterest],
  );

  // 새 그룹 추가 시 자동으로 추가될 채널 (pending)
  const [pendingChannel, setPendingChannel] = useState<InterestChannel | null>(
    null,
  );

  // 새 그룹 추가 후 pending 채널 자동 추가
  const addPendingToGroup = useCallback(
    (groupId: string) => {
      if (pendingChannel) {
        addToInterest(pendingChannel, groupId);
        setPendingChannel(null);
      }
    },
    [pendingChannel, addToInterest],
  );

  return (
    <InterestContext.Provider
      value={{
        groups,
        isInInterest,
        getChannelGroup,
        addToInterest,
        removeFromInterest,
        changeGroup,
        createGroup,
        deleteGroup,
        toggleInterest,
        pendingChannel,
        setPendingChannel,
        addPendingToGroup,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
}

// ===== Hook =====
export function useInterest() {
  const context = useContext(InterestContext);
  if (!context) {
    throw new Error("useInterest must be used within an InterestProvider");
  }
  return context;
}
