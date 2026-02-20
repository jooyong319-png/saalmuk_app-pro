import { useState } from "react";
import ProfilePopup from "../components/ProfilePopup";

export default function Community({
  setCurrentPage,
  communityNav,
}: {
  setCurrentPage: (page: string) => void;
  communityNav: string;
}) {
  // ===== 전체채널 state =====
  const [activeTab, setActiveTab] = useState("최근방문");
  const [activeFilter, setActiveFilter] = useState("모바일게임");

  // ===== 피드 공통 state =====
  const [feedTab, setFeedTab] = useState("전체");
  const [sortType, setSortType] = useState("최신순");
  const [viewType, setViewType] = useState("카드형");
  const [showSortPopup, setShowSortPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [followedUsers, setFollowedUsers] = useState<string[]>(["전사의심장7", "메이플고인물"]);
  const [showMoreMenu, setShowMoreMenu] = useState<number | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showGiftPopup, setShowGiftPopup] = useState(false);

  const feedTabs = ["전체", "공략/팁", "질문", "스샷/자랑"];
  const filters = ["모바일게임", "PC게임", "P2E게임"];
  const tabs = ["최근방문", "주요채널", "일반채널"];

  const img = (n: number) => {
    const imgs = [
      "https://edge.ssalmuk.com/editorImage/31c1f862e4b14adb8498f40bdbb5c52b.jfif",
      "https://edge.ssalmuk.com/editorImage/935049a546e744a98c0c77e1d498ae18.png",
      "https://edge.ssalmuk.com/editorImage/8daa1b53fba545ffb56d1cac5517407b.png",
      "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg",
      "https://edge.ssalmuk.com/editorImage/daa326b1f7d141dbb6f42473312e562c.jfif",
      "https://edge.ssalmuk.com/editorImage/7fd53849b50948a2be3006fafd194306.jpg",
      "https://edge.ssalmuk.com/editorImage/40e87f86357e487eb75dc24d3055b21f.png",
      "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
    ];
    return imgs[n % imgs.length];
  };

  // ====== 채널 데이터 (30개씩) ======
  const mainChannels = [
    { id: 1, name: "마비노기 모바일 채널", category: "모바일게임", image: img(0) },
    { id: 2, name: "핫딜 채널", category: "모바일게임", image: img(1) },
    { id: 3, name: "KBO 채널", category: "모바일게임", image: img(2) },
    { id: 4, name: "명조 채널", category: "모바일게임", image: img(3) },
    { id: 5, name: "붕괴 스타레일 채널", category: "모바일게임", image: img(4) },
    { id: 6, name: "블루 아카이브 채널", category: "모바일게임", image: img(0) },
    { id: 7, name: "원신 채널", category: "모바일게임", image: img(6) },
    { id: 8, name: "리니지M 채널", category: "모바일게임", image: img(1) },
    { id: 9, name: "쿠키런: 킹덤 채널", category: "모바일게임", image: img(2) },
    { id: 10, name: "승리의 여신: 니케 채널", category: "모바일게임", image: img(6) },
    { id: 11, name: "던전앤파이터 채널", category: "PC게임", image: img(5) },
    { id: 12, name: "메이플스토리 채널", category: "PC게임", image: img(6) },
    { id: 13, name: "로스트아크 채널", category: "PC게임", image: img(0) },
    { id: 14, name: "발로란트 채널", category: "PC게임", image: img(5) },
    { id: 15, name: "리그 오브 레전드 채널", category: "PC게임", image: img(3) },
    { id: 16, name: "오버워치2 채널", category: "PC게임", image: img(4) },
    { id: 17, name: "배틀그라운드 채널", category: "PC게임", image: img(2) },
    { id: 18, name: "피파온라인4 채널", category: "PC게임", image: img(1) },
    { id: 19, name: "서든어택 채널", category: "PC게임", image: img(7) },
    { id: 20, name: "로보토미 코퍼레이션 채널", category: "PC게임", image: img(3) },
    { id: 21, name: "Axie Infinity 채널", category: "P2E게임", image: img(4) },
    { id: 22, name: "STEPN 채널", category: "P2E게임", image: img(1) },
    { id: 23, name: "The Sandbox 채널", category: "P2E게임", image: img(2) },
    { id: 24, name: "Illuvium 채널", category: "P2E게임", image: img(3) },
    { id: 25, name: "Gods Unchained 채널", category: "P2E게임", image: img(5) },
    { id: 26, name: "Star Atlas 채널", category: "P2E게임", image: img(6) },
    { id: 27, name: "Splinterlands 채널", category: "P2E게임", image: img(0) },
    { id: 28, name: "Decentraland 채널", category: "P2E게임", image: img(7) },
    { id: 29, name: "Gala Games 채널", category: "P2E게임", image: img(4) },
    { id: 30, name: "My Neighbor Alice 채널", category: "P2E게임", image: img(1) },
  ];
  const generalChannels = [
    { id: 101, name: "세븐나이츠 ReBirth 채널", category: "모바일게임", image: img(4) },
    { id: 102, name: "홀로라이브 채널", category: "모바일게임", image: img(3) },
    { id: 103, name: "라이즈 오브 킹덤즈 채널", category: "모바일게임", image: img(6) },
    { id: 104, name: "서머너즈 워 채널", category: "모바일게임", image: img(1) },
    { id: 105, name: "붕괴3rd 채널", category: "모바일게임", image: img(0) },
    { id: 106, name: "랑그릿사 채널", category: "모바일게임", image: img(2) },
    { id: 107, name: "에픽세븐 채널", category: "모바일게임", image: img(5) },
    { id: 108, name: "데스티니 차일드 채널", category: "모바일게임", image: img(7) },
    { id: 109, name: "가디언 테일즈 채널", category: "모바일게임", image: img(3) },
    { id: 110, name: "프린세스 커넥트 채널", category: "모바일게임", image: img(4) },
    { id: 111, name: "메이플스토리M 채널", category: "모바일게임", image: img(6) },
    { id: 112, name: "카운터사이드 채널", category: "모바일게임", image: img(0) },
    { id: 113, name: "마인크래프트 채널", category: "PC게임", image: img(2) },
    { id: 114, name: "디아블로4 채널", category: "PC게임", image: img(5) },
    { id: 115, name: "스타크래프트 채널", category: "PC게임", image: img(1) },
    { id: 116, name: "던전앤파이터 모바일 채널", category: "PC게임", image: img(5) },
    { id: 117, name: "블레이드&소울 채널", category: "PC게임", image: img(3) },
    { id: 118, name: "테라 채널", category: "PC게임", image: img(7) },
    { id: 119, name: "검은사막 채널", category: "PC게임", image: img(0) },
    { id: 120, name: "메이플스토리2 채널", category: "PC게임", image: img(4) },
    { id: 121, name: "Pixels 채널", category: "P2E게임", image: img(6) },
    { id: 122, name: "Big Time 채널", category: "P2E게임", image: img(2) },
    { id: 123, name: "Nakamoto Games 채널", category: "P2E게임", image: img(1) },
    { id: 124, name: "Alien Worlds 채널", category: "P2E게임", image: img(3) },
    { id: 125, name: "Sweat Economy 채널", category: "P2E게임", image: img(5) },
    { id: 126, name: "DeFi Kingdoms 채널", category: "P2E게임", image: img(7) },
    { id: 127, name: "Ember Sword 채널", category: "P2E게임", image: img(0) },
    { id: 128, name: "Thetan Arena 채널", category: "P2E게임", image: img(4) },
    { id: 129, name: "CryptoBlades 채널", category: "P2E게임", image: img(2) },
    { id: 130, name: "Town Star 채널", category: "P2E게임", image: img(6) },
  ];
  const filteredMain = mainChannels.filter(ch => ch.category === activeFilter);
  const filteredGeneral = generalChannels.filter(ch => ch.category === activeFilter);

  const [recentChannels, setRecentChannels] = useState([
    { id: 1, name: "세븐나이츠 ReBirth 채널", image: img(0) },
    { id: 2, name: "핫딜 채널", image: img(1) },
    { id: 3, name: "홀로라이브 채널", image: img(3) },
    { id: 4, name: "던전앤파이터 채널", image: img(4) },
    { id: 5, name: "KBO 채널", image: img(2) },
    { id: 6, name: "승리의 여신 니케 채널", image: img(5) },
    { id: 7, name: "붕괴 스타레일 채널", image: img(6) },
    { id: 8, name: "블루 아카이브 채널", image: img(0) },
    { id: 9, name: "붕괴3rd 채널", image: img(3) },
    { id: 10, name: "로보토미 코퍼레이션 채널", image: img(4) },
  ]);
  const removeChannel = (id: number) => setRecentChannels(prev => prev.filter(ch => ch.id !== id));

  // ====== 게시글 데이터 ======
  type Post = { id: number; author: string; avatar: string; channel: string; time: string; content: string; image: string | null; likes: number; comments: number; badges: string[]; category: string };

  const followingPosts: Post[] = [
    { id: 1, author: "전사의심장7", avatar: img(0), channel: "마비노기 모바일", time: "방금 전", content: "상한가자 🚀🚀🚀 오늘 드디어 보스 클리어함 ㅋㅋㅋ", image: null, likes: 24, comments: 8, badges: ["🏆 공략왕"], category: "공략/팁" },
    { id: 2, author: "나무늘보56894", avatar: img(2), channel: "명조", time: "1시간 전", content: "이걸 살아 돌아온다고.....? 진짜 개빡세게 했는데 겨우 클리어함 ㅠㅠ", image: "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_10.png", likes: 156, comments: 42, badges: ["🌾 쌀먹러"], category: "스샷/자랑" },
    { id: 3, author: "메이플고인물", avatar: img(4), channel: "메이플스토리", time: "2시간 전", content: "신규 유저분들 팁 드릴게요! 초반에 레벨업 빠르게 하려면 퀘스트 절대 스킵하지 마세요.", image: null, likes: 89, comments: 23, badges: ["👑 VIP"], category: "공략/팁" },
    { id: 4, author: "불꽃냥이", avatar: img(7), channel: "원신", time: "3시간 전", content: "오늘 뽑기 개이득 봄 ㅋㅋㅋㅋ 10연차에서 전설 2개 떴다 ㄷㄷ", image: null, likes: 234, comments: 67, badges: ["💎 럭키가이"], category: "스샷/자랑" },
    { id: 5, author: "게임하는직장인", avatar: img(2), channel: "던전앤파이터", time: "4시간 전", content: "퇴근하고 겜하는 재미로 산다... 오늘도 화이팅 💪", image: null, likes: 78, comments: 15, badges: [], category: "전체" },
    { id: 6, author: "핫딜마스터", avatar: img(1), channel: "핫딜", time: "5시간 전", content: "PS5 슬림 역대 최저가!! 쿠팡 특가 링크 공유합니다", image: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg", likes: 412, comments: 89, badges: ["🔥 핫딜러"], category: "전체" },
    { id: 7, author: "초보탈출중", avatar: img(0), channel: "블루 아카이브", time: "6시간 전", content: "직업 추천 좀 해주세요 ㅠㅠ 전사 vs 마법사 뭐가 더 좋음?", image: null, likes: 56, comments: 34, badges: [], category: "질문" },
    { id: 8, author: "리니지킹", avatar: img(1), channel: "리니지M", time: "8시간 전", content: "신규 클래스 육성 가이드 1~85레벨 정리해봤습니다", image: null, likes: 167, comments: 45, badges: ["👑 VIP", "🏆 공략왕"], category: "공략/팁" },
  ];
  const interestPosts: Post[] = [
    { id: 101, author: "스타레일러", avatar: img(4), channel: "붕괴 스타레일", time: "30분 전", content: "2.0 업데이트 프리뷰 요약! 새 캐릭터 성능이 미쳤다", image: "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_10.png", likes: 324, comments: 56, badges: ["📌 정보통"], category: "공략/팁" },
    { id: 102, author: "명조매니아", avatar: img(3), channel: "명조", time: "1시간 전", content: "1.5 신캐 지존빌드 추천합니다 무과금도 가능!", image: null, likes: 189, comments: 34, badges: ["🌾 쌀먹러"], category: "공략/팁" },
    { id: 103, author: "아카이브선생", avatar: img(0), channel: "블루 아카이브", time: "2시간 전", content: "총력전 하드 공략 세팅 정리 (무과금 가능)", image: null, likes: 213, comments: 67, badges: ["🏆 공략왕"], category: "공략/팁" },
    { id: 104, author: "마비유저", avatar: img(6), channel: "마비노기 모바일", time: "3시간 전", content: "신규 던전 공략법 총정리 🔥 보스 패턴 분석까지", image: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg", likes: 145, comments: 28, badges: [], category: "공략/팁" },
    { id: 105, author: "니케지휘관", avatar: img(6), channel: "승리의 여신: 니케", time: "4시간 전", content: "신규 니케 성능 리뷰 - 뽑을 가치 있을까?", image: null, likes: 98, comments: 41, badges: ["💎 럭키가이"], category: "질문" },
    { id: 106, author: "원신여행자", avatar: img(7), channel: "원신", time: "5시간 전", content: "5.0 나타 지역 탐색 루트 최적화 공유", image: null, likes: 267, comments: 53, badges: ["📌 정보통"], category: "공략/팁" },
    { id: 107, author: "쿠키러너", avatar: img(2), channel: "쿠키런: 킹덤", time: "6시간 전", content: "이번 시즌 쿠키 티어 정리해봄 ㅋㅋ", image: null, likes: 134, comments: 29, badges: [], category: "공략/팁" },
    { id: 108, author: "리니지전사", avatar: img(1), channel: "리니지M", time: "7시간 전", content: "혈맹원 모집합니다!! 활성화된 혈맹 찾으시는 분!", image: null, likes: 45, comments: 22, badges: [], category: "전체" },
  ];
  const hotPosts: Post[] = [
    { id: 201, author: "핫딜마스터", avatar: img(1), channel: "핫딜", time: "2시간 전", content: "PS5 슬림 역대 최저가! 쿠팡 특가 지금 바로 확인", image: "https://edge.ssalmuk.com/editorImage/8340a446068d4799a60acbf85f415e28.jpg", likes: 891, comments: 234, badges: ["🔥 핫딜러"], category: "전체" },
    { id: 202, author: "리니지킹", avatar: img(1), channel: "리니지M", time: "4시간 전", content: "신규 클래스 육성 가이드 (1~85레벨) 완벽 정리", image: null, likes: 678, comments: 156, badges: ["👑 VIP"], category: "공략/팁" },
    { id: 203, author: "스타레일러", avatar: img(4), channel: "붕괴 스타레일", time: "5시간 전", content: "2.0 업데이트 신규 콘텐츠 총정리 - 이거 꼭 보세요", image: "https://ssalmuk.com/crosseditor/binary/images/000180/aW1hZ2U=_10.png", likes: 524, comments: 89, badges: ["📌 정보통"], category: "공략/팁" },
    { id: 204, author: "메이플고인물", avatar: img(4), channel: "메이플스토리", time: "6시간 전", content: "유니온 6000 최단루트 정리해봄 (스샷 포함)", image: null, likes: 512, comments: 167, badges: ["🏆 공략왕"], category: "스샷/자랑" },
    { id: 205, author: "아카이브선생", avatar: img(0), channel: "블루 아카이브", time: "8시간 전", content: "총력전 하드 3턴컷 세팅 공유 🔥", image: null, likes: 413, comments: 78, badges: ["🏆 공략왕"], category: "공략/팁" },
    { id: 206, author: "불꽃냥이", avatar: img(7), channel: "원신", time: "10시간 전", content: "10연차에서 전설 2개!! 뽑기 운 미쳤다 ㄷㄷ 인증합니다", image: null, likes: 389, comments: 92, badges: ["💎 럭키가이"], category: "스샷/자랑" },
    { id: 207, author: "던파장인", avatar: img(5), channel: "던전앤파이터", time: "12시간 전", content: "신규 레이드 세팅 가이드 - 딜러/서폿 전직업 정리", image: null, likes: 342, comments: 88, badges: ["👑 VIP", "🏆 공략왕"], category: "공략/팁" },
    { id: 208, author: "질문왕", avatar: img(3), channel: "로스트아크", time: "14시간 전", content: "복귀 유저인데 지금 어떤 직업이 좋나요? 진심 모르겠음", image: null, likes: 298, comments: 145, badges: [], category: "질문" },
  ];

  // 현재 nav에 맞는 게시글
  const currentPosts = communityNav === "following" ? followingPosts : communityNav === "interest" ? interestPosts : hotPosts;
  // 탭 필터
  const filteredPosts = feedTab === "전체" ? currentPosts : currentPosts.filter(p => p.category === feedTab);
  // 검색 필터
  const searchedPosts = searchQuery ? filteredPosts.filter(p => p.content.includes(searchQuery) || p.author.includes(searchQuery)) : filteredPosts;
  // 정렬
  const sortedPosts = [...searchedPosts].sort((a, b) => sortType === "인기순" ? b.likes - a.likes : 0);

  const toggleLike = (id: number) => setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // ====== 전체채널 ======
  if (communityNav === "all") {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-white px-4 pt-2">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button key={tab} className={`pb-3 text-sm font-medium ${activeTab === tab ? "text-gray-900" : "text-gray-400"}`}
                onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-white px-4 py-2">
          {activeTab === "최근방문" && (recentChannels.length === 0 ? (
            <div className="py-16 text-center"><p className="text-gray-400 text-sm">최근 방문한 채널이 없습니다</p></div>
          ) : recentChannels.map((ch) => (
            <div key={ch.id} className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer" onClick={() => setCurrentPage("channelDetail")}>
              <div className="flex items-center gap-3">
                <img src={ch.image} alt={ch.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="text-sm text-gray-900">{ch.name}</span>
              </div>
              <button className="text-gray-300 text-xl" onClick={(e) => { e.stopPropagation(); removeChannel(ch.id); }}>✕</button>
            </div>
          )))}
          {activeTab === "주요채널" && (<>
            <div className="flex gap-2 py-3">
              {filters.map((f) => (<button key={f} className={`px-4 py-2 rounded-full text-sm ${activeFilter === f ? "text-white" : "bg-white text-gray-600 border border-gray-200"}`} style={activeFilter === f ? { backgroundColor: "#72C2FF" } : {}} onClick={() => setActiveFilter(f)}>{f}</button>))}
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>{filteredMain.filter((_, i) => i % 2 === 0).map((ch) => (<div key={ch.id} className="flex items-center gap-2 py-3 cursor-pointer" onClick={() => setCurrentPage("channelDetail")}><img src={ch.image} alt={ch.name} className="w-8 h-8 rounded-full object-cover" /><span className="text-sm text-gray-900 truncate">{ch.name}</span></div>))}</div>
              <div>{filteredMain.filter((_, i) => i % 2 === 1).map((ch) => (<div key={ch.id} className="flex items-center gap-2 py-3 cursor-pointer" onClick={() => setCurrentPage("channelDetail")}><img src={ch.image} alt={ch.name} className="w-8 h-8 rounded-full object-cover" /><span className="text-sm text-gray-900 truncate">{ch.name}</span></div>))}</div>
            </div>
          </>)}
          {activeTab === "일반채널" && (<>
            <div className="flex gap-2 py-3">
              {filters.map((f) => (<button key={f} className={`px-4 py-2 rounded-full text-sm ${activeFilter === f ? "text-white" : "bg-white text-gray-600 border border-gray-200"}`} style={activeFilter === f ? { backgroundColor: "#72C2FF" } : {}} onClick={() => setActiveFilter(f)}>{f}</button>))}
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div>{filteredGeneral.filter((_, i) => i % 2 === 0).map((ch) => (<div key={ch.id} className="flex items-center gap-2 py-3 cursor-pointer" onClick={() => setCurrentPage("channelDetail")}><img src={ch.image} alt={ch.name} className="w-8 h-8 rounded-full object-cover" /><span className="text-sm text-gray-900 truncate">{ch.name}</span></div>))}</div>
              <div>{filteredGeneral.filter((_, i) => i % 2 === 1).map((ch) => (<div key={ch.id} className="flex items-center gap-2 py-3 cursor-pointer" onClick={() => setCurrentPage("channelDetail")}><img src={ch.image} alt={ch.name} className="w-8 h-8 rounded-full object-cover" /><span className="text-sm text-gray-900 truncate">{ch.name}</span></div>))}</div>
            </div>
          </>)}
        </div>
      </div>
    );
  }

  // ====== 팔로잉 / 관심 / 지금핫한 (공통 피드 UI) ======
  return (
    <div className="flex flex-col h-full bg-white">
      {/* 탭 메뉴 */}
      <div className="sticky top-12 z-40 bg-white px-4 pt-3">
        <div className="flex gap-4">
          {feedTabs.map((tab) => (
            <button key={tab} className={`pb-2 text-sm ${feedTab === tab ? "text-gray-900 font-medium" : "text-gray-400"}`}
              onClick={() => setFeedTab(tab)}>{tab}</button>
          ))}
        </div>
      </div>

      {/* 정렬 & 보기 */}
      <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <button className="text-sm text-gray-700 flex items-center gap-1" onClick={() => setShowSortPopup(true)}>
          {sortType} <span>↕</span>
        </button>
        <button className="text-gray-400" onClick={() => setShowViewPopup(true)}>
          {viewType === "목록형" ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v1.43H3.8V5.3c0-.83.67-1.5 1.5-1.5zm10.9 4.73v2.93H3.8V8.53h12.4zm-1.5 7.67H5.3c-.83 0-1.5-.67-1.5-1.5v-1.43h12.4v1.43c0 .83-.67 1.5-1.5 1.5z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M14.7 2H5.3C3.48 2 2 3.48 2 5.3v9.4C2 16.52 3.48 18 5.3 18h9.4c1.82 0 3.3-1.48 3.3-3.3V5.3C18 3.48 16.52 2 14.7 2zM5.3 3.8h9.4c.83 0 1.5.67 1.5 1.5v3.8H3.8V5.3c0-.83.67-1.5 1.5-1.5zm9.4 12.4H5.3c-.83 0-1.5-.67-1.5-1.5v-3.8h12.4v3.8c0 .83-.67 1.5-1.5 1.5z" /></svg>
          )}
        </button>
      </div>

      {/* 게시글 리스트 */}
      <div className="flex-1 bg-white overflow-y-auto">
        {sortedPosts.length === 0 ? (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">게시글이 없습니다</p></div>
        ) : sortedPosts.map((post) => (
          <div key={post.id} className="px-1.5 py-1.5 border-b border-gray-100 cursor-pointer" onClick={() => setSelectedPost(post)}>
            {viewType === "카드형" ? (
              <>
                {/* 작성자 */}
                <div className="flex items-center justify-between mb-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover cursor-pointer" onClick={() => setSelectedProfile(post)} />
                    <div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <p className="text-sm font-medium text-gray-900 cursor-pointer" onClick={() => setSelectedProfile(post)}>{post.author}</p>
                        {post.badges.map((b, i) => (<span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600">{b}</span>))}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-400">{post.channel}</span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm" style={{ color: followedUsers.includes(post.author) ? "#9CA3AF" : "#72C2FF" }}
                    onClick={() => setFollowedUsers(prev => prev.includes(post.author) ? prev.filter(u => u !== post.author) : [...prev, post.author])}>
                    {followedUsers.includes(post.author) ? "팔로잉" : "팔로우"}
                  </button>
                </div>
                {post.image && <img src={post.image} alt="" className="w-64 h-64 rounded-xl mb-3 object-cover" />}
                {post.content && <p className="text-sm text-gray-900 mb-3">{post.content}</p>}
                {/* 액션 */}
                <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-4 text-gray-400">
                    <button className="flex items-center gap-1" onClick={() => toggleLike(post.id)}>
                      <svg className={`w-5 h-5 ${likedPosts.includes(post.id) ? "text-red-500 fill-red-500" : ""}`} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className={`text-xs ${likedPosts.includes(post.id) ? "text-red-500" : ""}`}>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1" onClick={() => setSelectedPost(post)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      <span className="text-xs">{post.comments}</span>
                    </button>
                    <button><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-gray-300" onClick={() => setShowGiftPopup(true)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                    </button>
                    <div className="relative">
                      <button className="text-gray-300" onClick={() => setShowMoreMenu(showMoreMenu === post.id ? null : post.id)}>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                      </button>
                      {showMoreMenu === post.id && (
                        <div className="absolute right-0 bottom-8 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[120px] z-10">
                          {["저장", "차단", "신고"].map((m) => (
                            <button key={m} className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowMoreMenu(null)}>{m}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* 목록형 */
              <div className="bg-white rounded-lg border border-gray-100 p-2">
                <div className="flex items-start gap-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-800 font-medium truncate max-w-[200px]">{post.content}</span>
                      {post.image && <span className="text-xs text-gray-300 ml-1">📷</span>}
                      {post.comments > 0 && <span className="text-xs text-blue-400 flex-shrink-0">[{post.comments}]</span>}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-400 mt-1">
                      <span className="max-w-[50px] truncate">{post.author}</span>
                      <span className="mx-1.5 text-gray-200">|</span>
                      <span>{post.channel}</span>
                      <span className="mx-1.5 text-gray-200">|</span>
                      <span>{post.time}</span>
                      <span className="mx-1.5 text-gray-200">|</span>
                      <span>❤️ {post.likes}</span>
                    </div>
                  </div>
                  {post.image && <img src={post.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>



      {/* ===== 정렬 팝업 ===== */}
      {showSortPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowSortPopup(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md bg-white rounded-t-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <p className="text-base font-bold mb-4">정렬</p>
            {["최신순", "인기순", "댓글많은순"].map((s) => (
              <button key={s} className={`w-full text-left py-3 px-2 rounded-lg text-sm ${sortType === s ? "font-bold" : "text-gray-500"}`}
                style={sortType === s ? { color: "#72C2FF" } : {}}
                onClick={() => { setSortType(s); setShowSortPopup(false); }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {/* ===== 보기타입 팝업 ===== */}
      {showViewPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowViewPopup(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md bg-white rounded-t-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <p className="text-base font-bold mb-4">보기 설정</p>
            {["카드형", "목록형"].map((v) => (
              <button key={v} className={`w-full text-left py-3 px-2 rounded-lg text-sm ${viewType === v ? "font-bold" : "text-gray-500"}`}
                style={viewType === v ? { color: "#72C2FF" } : {}}
                onClick={() => { setViewType(v); setShowViewPopup(false); }}>{v}</button>
            ))}
          </div>
        </div>
      )}



      {/* ===== 검색 ===== */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <button onClick={() => { setShowSearch(false); setSearchQuery(""); }}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <input type="text" placeholder="게시글 검색" className="flex-1 text-sm outline-none" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex-1 p-4">
            {searchQuery && searchedPosts.map((post) => (
              <div key={post.id} className="py-3 border-b border-gray-100 cursor-pointer" onClick={() => { setSelectedPost(post); setShowSearch(false); }}>
                <p className="text-sm text-gray-800 truncate">{post.content}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                  <span>{post.author}</span><span>·</span><span>{post.channel}</span><span>·</span><span>❤️ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== 게시글 상세 ===== */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col max-w-md mx-auto overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
            <button onClick={() => setSelectedPost(null)}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-sm font-bold">{selectedPost.channel}</span>
            <div className="w-6" />
          </div>
          <div className="p-4">
            {/* 작성자 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img src={selectedPost.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <p className="text-sm font-medium">{selectedPost.author}</p>
                    {selectedPost.badges?.map((b: string, i: number) => (<span key={i} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600">{b}</span>))}
                  </div>
                  <p className="text-xs text-gray-400">{selectedPost.time}</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: followedUsers.includes(selectedPost.author) ? "#9CA3AF" : "#72C2FF" }}
                onClick={() => setFollowedUsers(prev => prev.includes(selectedPost.author) ? prev.filter(u => u !== selectedPost.author) : [...prev, selectedPost.author])}>
                {followedUsers.includes(selectedPost.author) ? "팔로잉" : "팔로우"}
              </button>
            </div>
            {/* 내용 */}
            <p className="text-sm text-gray-900 mb-4 leading-relaxed">{selectedPost.content}</p>
            {selectedPost.image && <img src={selectedPost.image} alt="" className="w-full rounded-xl mb-4 object-cover" />}
            {/* 액션 */}
            <div className="flex items-center gap-4 text-gray-400 py-3 border-t border-gray-100">
              <button className="flex items-center gap-1" onClick={() => toggleLike(selectedPost.id)}>
                <svg className={`w-5 h-5 ${likedPosts.includes(selectedPost.id) ? "text-red-500 fill-red-500" : ""}`} fill={likedPosts.includes(selectedPost.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className={`text-xs ${likedPosts.includes(selectedPost.id) ? "text-red-500" : ""}`}>{likedPosts.includes(selectedPost.id) ? selectedPost.likes + 1 : selectedPost.likes}</span>
              </button>
              <span className="flex items-center gap-1 text-xs">💬 {selectedPost.comments}</span>
            </div>
            {/* 댓글 영역 */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-medium mb-3">댓글 {selectedPost.comments}</p>
              {[{ author: "유저A", content: "ㄹㅇ 인정 ㅋㅋㅋ", time: "1시간 전", likes: 5 }, { author: "유저B", content: "좋은 정보 감사합니다!", time: "2시간 전", likes: 12 }, { author: "유저C", content: "대박 ㄷㄷ", time: "3시간 전", likes: 3 }].map((c, i) => (
                <div key={i} className="flex gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">{c.author[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2"><span className="text-xs font-medium">{c.author}</span><span className="text-[10px] text-gray-400">{c.time}</span></div>
                    <p className="text-sm text-gray-700 mt-0.5">{c.content}</p>
                    <button className="text-[10px] text-gray-400 mt-1">❤️ {c.likes} · 답글</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 댓글 입력 */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-2">
            <input type="text" placeholder="댓글을 입력하세요" className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none" />
            <button className="text-sm font-medium" style={{ color: "#72C2FF" }}>등록</button>
          </div>
        </div>
      )}

      {/* ===== 프로필 팝업 ===== */}
      {selectedProfile && (
        <ProfilePopup
          profile={selectedProfile}
          isFollowing={followedUsers.includes(selectedProfile.author)}
          onFollow={() => {
            if (followedUsers.includes(selectedProfile.author)) {
              setFollowedUsers(followedUsers.filter((user) => user !== selectedProfile.author));
            } else {
              setFollowedUsers([...followedUsers, selectedProfile.author]);
            }
          }}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {/* ===== 선물 팝업 ===== */}
      {showGiftPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowGiftPopup(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md bg-white rounded-t-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <p className="text-base font-bold mb-4">🎁 어워드 선물하기</p>
            <div className="grid grid-cols-4 gap-3">
              {[{ emoji: "🍚", name: "쌀 한톨", cost: 10 }, { emoji: "🍙", name: "주먹밥", cost: 50 }, { emoji: "🍱", name: "도시락", cost: 100 }, { emoji: "🏆", name: "트로피", cost: 500 },
                { emoji: "💎", name: "다이아", cost: 1000 }, { emoji: "🎮", name: "게임패드", cost: 200 }, { emoji: "⭐", name: "골드스타", cost: 300 }, { emoji: "🔥", name: "불꽃", cost: 150 }].map((g) => (
                <button key={g.name} className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-50 border border-gray-100">
                  <span className="text-2xl">{g.emoji}</span>
                  <span className="text-[10px] text-gray-600">{g.name}</span>
                  <span className="text-[10px] text-gray-400">{g.cost}P</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
