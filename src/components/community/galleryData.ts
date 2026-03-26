// ===== 갤러리 데이터 타입 =====
export interface GalleryData {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  category: "info" | "mobile" | "pc" | "p2e";
  manager?: string;
  subManagers?: string[];
  memberCount?: number;
  banner?: string;
  // 갤러리별 카테고리 탭 (없으면 기본값 사용)
  categoryTabs?: string[];
  // 정렬 UI 타입: "sort" = 인증글/베스트/전체글, "toggle" = 최신순/인기순
  sortType?: "sort" | "toggle";
}

// ===== UI용 타입 =====
export interface GalleryItemData {
  id: number;
  icon: string;
  name: string;
  desc: string;
  description?: string;
  color: string;
}

export interface GalleryCategory {
  title: string;
  items: GalleryItemData[];
}

// ===== 탭 =====
export const galleryTabs = ["주요채널", "일반채널"];

// ===== 전체 갤러리 데이터 (마스터) =====
export const galleries: Record<string, GalleryData> = {
  // ========== 쌀먹 정보 ==========
  hotnow: {
    id: "hotnow",
    name: "지금 핫한",
    icon: "🔥",
    color: "bg-orange-100 text-orange-600",
    description: "실시간 인기 게임 정보",
    category: "info",
    manager: "핫게관리자",
    memberCount: 89420,
  },
  prereserve: {
    id: "prereserve",
    name: "사전예약, 신서버",
    icon: "📢",
    color: "bg-purple-100 text-purple-600",
    description: "신규 게임 및 서버 오픈",
    category: "info",
    manager: "사전예약지기",
    memberCount: 45230,
  },
  saenghwaltech: {
    id: "saenghwaltech",
    name: "생활테크",
    icon: "💰",
    color: "bg-green-100 text-green-600",
    description: "생활 속 재테크 정보",
    category: "info",
    manager: "테크마스터",
    memberCount: 34560,
    categoryTabs: ["전체", "꿀팁", "후기", "질문", "정보공유"],
    sortType: "toggle",
  },
  barossalmuk: {
    id: "barossalmuk",
    name: "바로쌀먹",
    icon: "⚡",
    color: "bg-yellow-100 text-yellow-600",
    description: "즉시 리워드 획득",
    category: "info",
    manager: "바로쌀먹지기",
    memberCount: 52180,
    categoryTabs: ["전체", "미션인증", "꿀팁", "질문", "이벤트"],
    sortType: "toggle",
  },
  lounge: {
    id: "lounge",
    name: "쌀먹 라운지",
    icon: "💬",
    color: "bg-blue-100 text-blue-600",
    description: "자유로운 수다 공간",
    category: "info",
    manager: "라운지지기",
    memberCount: 67890,
    categoryTabs: ["전체", "쌀먹꿀팁", "질문", "인증샷", "짤/유머", "뉴스"],
    sortType: "toggle",
  },
  pcsetup: {
    id: "pcsetup",
    name: "쌀먹장비 세팅",
    icon: "🖥️",
    color: "bg-gray-100 text-gray-600",
    description: "PC 및 장비 세팅 정보",
    category: "info",
    manager: "컴덕후",
    memberCount: 23450,
    categoryTabs: ["전체", "임대컴", "컴퓨터", "쌀먹장터", "질문/후기"],
    sortType: "toggle",
  },

  // ========== 모바일 게임 ==========
  genshin: {
    id: "genshin",
    name: "원신",
    icon: "⭐",
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    description: "miHoYo | 오픈월드 액션 RPG",
    category: "mobile",
    manager: "여행자",
    subManagers: ["파이몬", "나히다"],
    memberCount: 156780,
  },
  bluearchive: {
    id: "bluearchive",
    name: "블루 아카이브",
    icon: "💙",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    description: "넥슨게임즈 | 미소녀 수집형 RPG",
    category: "mobile",
    manager: "선생님",
    subManagers: ["아로나", "유우카"],
    memberCount: 134560,
  },
  nikke: {
    id: "nikke",
    name: "승리의 여신: 니케",
    icon: "🎯",
    color: "bg-gradient-to-br from-red-400 to-pink-500",
    description: "시프트업 | 미소녀 슈팅 RPG",
    category: "mobile",
    manager: "지휘관",
    subManagers: ["모더니아", "라피"],
    memberCount: 98760,
  },
  arknights: {
    id: "arknights",
    name: "명일방주",
    icon: "🗡️",
    color: "bg-gradient-to-br from-slate-500 to-gray-700",
    description: "Yostar | 타워디펜스 RPG",
    category: "mobile",
    manager: "박사",
    subManagers: ["아미야", "켈시"],
    memberCount: 87650,
  },
  starrail: {
    id: "starrail",
    name: "붕괴: 스타레일",
    icon: "🚂",
    color: "bg-gradient-to-br from-purple-400 to-indigo-500",
    description: "miHoYo | 턴제 RPG",
    category: "mobile",
    manager: "개척자",
    subManagers: ["삼월칠", "단항"],
    memberCount: 145230,
  },
  maplestory: {
    id: "maplestory",
    name: "메이플스토리",
    icon: "🍁",
    color: "bg-gradient-to-br from-orange-400 to-amber-500",
    description: "넥슨 | 2D 사이드스크롤 MMORPG",
    category: "mobile",
    manager: "우라마이싱",
    subManagers: ["김고로게", "나요티"],
    memberCount: 178920,
    banner: "https://maplestory.vod.nexoncdn.co.kr/Media/ArtWork/artwork_127.png",
  },
  lineagem: {
    id: "lineagem",
    name: "리니지M",
    icon: "⚔️",
    color: "bg-gradient-to-br from-gray-500 to-slate-700",
    description: "엔씨소프트 | MMORPG",
    category: "mobile",
    manager: "혈맹주",
    memberCount: 89340,
  },
  aion2: {
    id: "aion2",
    name: "아이온2",
    icon: "⚔️",
    color: "bg-gradient-to-br from-blue-400 to-indigo-500",
    description: "엔씨소프트 | MMORPG",
    category: "mobile",
    manager: "데바",
    memberCount: 67890,
  },
  lordnine: {
    id: "lordnine",
    name: "로드나인",
    icon: "🗡️",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    description: "넥슨 | MMORPG",
    category: "mobile",
    manager: "영주",
    memberCount: 54320,
  },
  odin: {
    id: "odin",
    name: "오딘",
    icon: "🛡️",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    description: "카카오게임즈 | 발할라 라이징",
    category: "mobile",
    manager: "바이킹",
    memberCount: 76540,
  },
  archefact: {
    id: "archefact",
    name: "아키펙트",
    icon: "🏹",
    color: "bg-gradient-to-br from-green-400 to-emerald-500",
    description: "카카오게임즈 | 3D 오픈월드 MMORPG",
    category: "mobile",
    manager: "모험가",
    memberCount: 43210,
  },
  rfonlinenext: {
    id: "rfonlinenext",
    name: "RF온라인넥스트",
    icon: "🤖",
    color: "bg-gradient-to-br from-red-400 to-orange-500",
    description: "SF 세계관 3종족 대규모 전쟁 MMORPG",
    category: "mobile",
    manager: "사령관",
    memberCount: 32100,
  },
  nightcrows: {
    id: "nightcrows",
    name: "나이트 크로우",
    icon: "🦇",
    color: "bg-gradient-to-br from-gray-600 to-slate-800",
    description: "위메이드 | 중세 다크 판타지 MMORPG",
    category: "mobile",
    manager: "까마귀",
    memberCount: 65430,
  },
  moonlight: {
    id: "moonlight",
    name: "달빛조각사",
    icon: "🌙",
    color: "bg-gradient-to-br from-blue-400 to-indigo-500",
    description: "소설 원작 모바일 MMORPG",
    category: "mobile",
    manager: "위드",
    memberCount: 43210,
  },
  arthdal: {
    id: "arthdal",
    name: "아스달 연대기",
    icon: "🏔️",
    color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    description: "드라마 기반 MMORPG",
    category: "mobile",
    manager: "은섬",
    memberCount: 34560,
  },
  mabinogimobile: {
    id: "mabinogimobile",
    name: "마비노기 모바일",
    icon: "🎵",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    description: "넥슨 | 힐링 MMORPG",
    category: "mobile",
    manager: "밀레시안",
    memberCount: 45670,
  },
  dkmobile: {
    id: "dkmobile",
    name: "DK모바일리본",
    icon: "👑",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    description: "다크 세계관 하드코어 액션 MMORPG",
    category: "mobile",
    manager: "군주",
    memberCount: 23450,
  },
  rohan2: {
    id: "rohan2",
    name: "로한2",
    icon: "🗡️",
    color: "bg-gradient-to-br from-purple-400 to-violet-500",
    description: "로한 온라인 후속작 모바일 MMORPG",
    category: "mobile",
    manager: "용사",
    memberCount: 32100,
  },
  funtime: {
    id: "funtime",
    name: "펀타임",
    icon: "🎮",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    description: "다양한 캐주얼 미니게임 플랫폼",
    category: "mobile",
    manager: "플레이어",
    memberCount: 56780,
  },
  dragonraja: {
    id: "dragonraja",
    name: "드래곤라자오리진",
    icon: "🐉",
    color: "bg-gradient-to-br from-orange-400 to-red-500",
    description: "드래곤라자 세계관 판타지 MMORPG",
    category: "mobile",
    manager: "후치",
    memberCount: 34560,
  },
  othermobile: {
    id: "othermobile",
    name: "그 외(모바일)",
    icon: "📱",
    color: "bg-gray-100 text-gray-600",
    description: "기타 모바일 게임들에 대해 이야기하는 공간",
    category: "mobile",
    manager: "게이머",
    memberCount: 23450,
  },

  // ========== PC 게임 ==========
  lineageclassic: {
    id: "lineageclassic",
    name: "리니지 클래식",
    icon: "⚔️",
    color: "bg-gradient-to-br from-gray-500 to-slate-700",
    description: "엔씨소프트 | 클래식 감성 리니지",
    category: "pc",
    manager: "군주",
    memberCount: 67890,
  },
  maplepc: {
    id: "maplepc",
    name: "메이플스토리(PC)",
    icon: "🍁",
    color: "bg-gradient-to-br from-orange-400 to-amber-500",
    description: "넥슨 | 대표 사이드뷰 MMORPG",
    category: "pc",
    manager: "메덕",
    memberCount: 156780,
  },
  lostark: {
    id: "lostark",
    name: "로스트아크",
    icon: "🏰",
    color: "bg-gradient-to-br from-amber-400 to-yellow-500",
    description: "스마일게이트 | 쿼터뷰 액션 MMORPG",
    category: "pc",
    manager: "모험가",
    memberCount: 234560,
  },
  mabinogi: {
    id: "mabinogi",
    name: "마비노기",
    icon: "🎵",
    color: "bg-gradient-to-br from-green-400 to-teal-500",
    description: "넥슨 | 힐링 감성 생활형 MMORPG",
    category: "pc",
    manager: "밀레시안",
    memberCount: 78900,
  },
  dnf: {
    id: "dnf",
    name: "던전앤파이터",
    icon: "👊",
    color: "bg-gradient-to-br from-blue-400 to-indigo-500",
    description: "넥슨 | 벨트스크롤 액션 RPG",
    category: "pc",
    manager: "모험가",
    memberCount: 189450,
  },
  poe2: {
    id: "poe2",
    name: "패스오브엑자일2",
    icon: "💀",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    description: "GGG | 하드코어 핵앤슬래시 ARPG",
    category: "pc",
    manager: "유배자",
    memberCount: 87650,
  },
  lol: {
    id: "lol",
    name: "리그 오브 레전드",
    icon: "🎮",
    color: "bg-gradient-to-br from-blue-500 to-cyan-600",
    description: "라이엇게임즈 | AOS",
    category: "pc",
    manager: "소환사",
    memberCount: 345670,
  },
  valorant: {
    id: "valorant",
    name: "발로란트",
    icon: "🔫",
    color: "bg-gradient-to-br from-red-500 to-pink-600",
    description: "라이엇게임즈 | 택티컬 슈터",
    category: "pc",
    manager: "요원",
    memberCount: 234560,
  },
  otherpc: {
    id: "otherpc",
    name: "그 외(PC)",
    icon: "🖥️",
    color: "bg-gray-100 text-gray-600",
    description: "기타 PC 게임들에 대해 이야기하는 공간",
    category: "pc",
    manager: "게이머",
    memberCount: 34560,
  },

  // ========== P2E 게임 ==========
  decentraland: {
    id: "decentraland",
    name: "디센트럴랜드",
    icon: "🌐",
    color: "bg-gradient-to-br from-red-400 to-rose-500",
    description: "이더리움 기반 메타버스 플랫폼",
    category: "p2e",
    manager: "지주",
    memberCount: 23450,
  },
  roblox: {
    id: "roblox",
    name: "로블록스",
    icon: "🟦",
    color: "bg-gray-100 text-gray-600",
    description: "유저 제작 게임 메타버스 플랫폼",
    category: "p2e",
    manager: "개발자",
    memberCount: 156780,
  },
  sandbox: {
    id: "sandbox",
    name: "샌드박스",
    icon: "📦",
    color: "bg-gradient-to-br from-blue-400 to-cyan-500",
    description: "복셀 기반 메타버스 게임",
    category: "p2e",
    manager: "크리에이터",
    memberCount: 34560,
  },
  maplen: {
    id: "maplen",
    name: "메이플스토리N",
    icon: "🍄",
    color: "bg-gradient-to-br from-orange-400 to-amber-500",
    description: "넥슨 | 블록체인 메이플",
    category: "p2e",
    manager: "모험가",
    memberCount: 45670,
  },
  axie: {
    id: "axie",
    name: "액시인피니티",
    icon: "🐾",
    color: "bg-gradient-to-br from-cyan-400 to-teal-500",
    description: "액시 수집 배틀 P2E 게임",
    category: "p2e",
    manager: "트레이너",
    memberCount: 23450,
  },
  nightcrowsglobal: {
    id: "nightcrowsglobal",
    name: "나이트크로우글로벌",
    icon: "🦅",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    description: "나이트크로우 글로벌 P2E 버전",
    category: "p2e",
    manager: "까마귀",
    memberCount: 34560,
  },
  bigtime: {
    id: "bigtime",
    name: "빅타임",
    icon: "⏰",
    color: "bg-gradient-to-br from-yellow-400 to-amber-500",
    description: "시간여행 테마 액션 RPG P2E",
    category: "p2e",
    manager: "시간여행자",
    memberCount: 23450,
  },
  mir4: {
    id: "mir4",
    name: "MIR4",
    icon: "🐉",
    color: "bg-gradient-to-br from-gray-500 to-slate-700",
    description: "위메이드 | 동양 판타지 P2E MMORPG",
    category: "p2e",
    manager: "무사",
    memberCount: 67890,
  },
  akaland: {
    id: "akaland",
    name: "아카랜드",
    icon: "🅰️",
    color: "bg-gray-100 text-gray-600",
    description: "블록체인 기반 전략 P2E 게임",
    category: "p2e",
    manager: "영주",
    memberCount: 12340,
  },
  eclipse: {
    id: "eclipse",
    name: "이클립스",
    icon: "🌙",
    color: "bg-gradient-to-br from-pink-400 to-rose-500",
    description: "다크 판타지 세계관 P2E 게임",
    category: "p2e",
    manager: "헌터",
    memberCount: 15670,
  },
  pocketpals: {
    id: "pocketpals",
    name: "포켓팔즈",
    icon: "🐹",
    color: "bg-gradient-to-br from-orange-300 to-amber-400",
    description: "귀여운 캐릭터 수집형 P2E 게임",
    category: "p2e",
    manager: "트레이너",
    memberCount: 18900,
  },
  otherp2e: {
    id: "otherp2e",
    name: "그 외(P2E)",
    icon: "🎮",
    color: "bg-gray-100 text-gray-600",
    description: "기타 P2E 게임들에 대해 이야기하는 공간",
    category: "p2e",
    manager: "게이머",
    memberCount: 12340,
  },
};

// ===== 카테고리별 타이틀 매핑 =====
const categoryTitles: Record<GalleryData["category"], string> = {
  info: "쌀먹 정보",
  mobile: "모바일 게임",
  pc: "PC 게임",
  p2e: "P2E 게임",
};

// ===== UI용 카테고리 목록 (galleries에서 자동 생성) =====
export const galleryCategories: GalleryCategory[] = (["info", "mobile", "pc", "p2e"] as const).map(
  (cat, catIndex) => ({
    title: categoryTitles[cat],
    items: Object.values(galleries)
      .filter((g) => g.category === cat)
      .map((g, idx) => ({
        id: catIndex * 100 + idx + 1,
        icon: g.icon,
        name: g.name,
        desc: g.description.split("|")[0].trim(),
        description: g.description,
        color: g.color.includes("gradient") ? "bg-gray-100 text-gray-600" : g.color,
      })),
  })
);

// ===== 헬퍼 함수 =====

// ID로 갤러리 조회
export function getGalleryById(id: string): GalleryData | null {
  return galleries[id] || null;
}

// 카테고리별 갤러리 목록
export function getGalleriesByCategory(category: GalleryData["category"]): GalleryData[] {
  return Object.values(galleries).filter((g) => g.category === category);
}

// 전체 갤러리 목록
export function getAllGalleries(): GalleryData[] {
  return Object.values(galleries);
}

// InterestChannel 형식으로 변환
export function toInterestChannel(gallery: GalleryData) {
  return {
    id: gallery.id,
    name: gallery.name,
    icon: gallery.icon,
    color: gallery.color,
    description: gallery.description,
  };
}

// 검색
export function searchGalleries(query: string): GalleryData[] {
  const q = query.toLowerCase();
  return Object.values(galleries).filter(
    (g) =>
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q)
  );
}

// 이름으로 갤러리 ID 찾기
export function getGalleryIdByName(name: string): string | null {
  // 정확한 매칭
  const exact = Object.values(galleries).find((g) => g.name === name);
  if (exact) return exact.id;
  
  // 부분 매칭 (첫 번째)
  const partial = Object.values(galleries).find((g) => 
    g.name.includes(name) || name.includes(g.name)
  );
  if (partial) return partial.id;
  
  return null;
}