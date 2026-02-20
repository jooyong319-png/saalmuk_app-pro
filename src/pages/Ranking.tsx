import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 1. 데이터 타입에 장르(genre) 추가
type RankItem = {
  id: number;
  rank: string;
  rankChange: string;
  changeType: "up" | "down" | "same" | "new";
  name: string;
  image: string;
  rating: number;
  score: string;
  scoreChange: string;
  scoreChangeType: "up" | "down" | "same";
  genre: string; // 필터링용 데이터
};

export default function Ranking({
  setCurrentPage,
}: {
  setCurrentPage: (page: string, id?: number) => void;
}) {
  const [activeTab, setActiveTab] = useState("모바일게임");
  const [activeFilter, setActiveFilter] = useState("소셜점수");

  // 2. 팝업, 툴팁, 좋아요 상태 관리
  const [showGenrePopup, setShowGenrePopup] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("전체");
  const [showTooltip, setShowTooltip] = useState(false);
  const [likedGames, setLikedGames] = useState<number[]>([]); // 좋아요 누른 게임 ID 저장

  const tabs = ["모바일게임", "PC게임", "P2E게임"];
  const filtersMap: Record<string, string[]> = {
    모바일게임: ["소셜점수", "구글순위", "지금핫한", "신규게임"],
    PC게임: ["소셜점수", "PC방순위", "지금핫한", "신규게임"],
    P2E게임: ["소셜점수", "코인순위", "지금핫한", "신규게임"],
  };
  const filters = filtersMap[activeTab];
  const genres = [
    "전체",
    "RPG/슈팅",
    "어드벤쳐",
    "시뮬레이션",
    "수집형",
    "전략",
  ];

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

  // 장르 데이터가 포함된 목록
  const mobile쌀먹: RankItem[] = [
    {
      id: 1,
      rank: "01",
      rankChange: "1",
      changeType: "up",
      name: "아이온2",
      image: img(0),
      rating: 5.0,
      score: "23,447",
      scoreChange: "+24.7%",
      scoreChangeType: "up",
      genre: "RPG/슈팅",
    },
    {
      id: 2,
      rank: "02",
      rankChange: "2",
      changeType: "down",
      name: "마비노기 모바일",
      image: img(3),
      rating: 4.5,
      score: "21,186",
      scoreChange: "-25.0%",
      scoreChangeType: "down",
      genre: "RPG/슈팅",
    },
    {
      id: 3,
      rank: "03",
      rankChange: "2",
      changeType: "down",
      name: "블루 아카이브",
      image: img(4),
      rating: 4.2,
      score: "21,003",
      scoreChange: "-67.0%",
      scoreChangeType: "down",
      genre: "수집형",
    },
    {
      id: 4,
      rank: "04",
      rankChange: "-",
      changeType: "same",
      name: "오딘: 발할라 라이징",
      image: img(2),
      rating: 4.2,
      score: "19,276",
      scoreChange: "-12.5%",
      scoreChangeType: "down",
      genre: "RPG/슈팅",
    },
    {
      id: 5,
      rank: "05",
      rankChange: "1",
      changeType: "up",
      name: "원신",
      image: img(1),
      rating: 4.8,
      score: "18,233",
      scoreChange: "-8.4%",
      scoreChangeType: "down",
      genre: "어드벤쳐",
    },
    {
      id: 6,
      rank: "06",
      rankChange: "1",
      changeType: "up",
      name: "명조",
      image: img(5),
      rating: 4.3,
      score: "17,793",
      scoreChange: "-6.9%",
      scoreChangeType: "down",
      genre: "RPG/슈팅",
    },
    {
      id: 7,
      rank: "07",
      rankChange: "2",
      changeType: "down",
      name: "붕괴 스타레일",
      image: img(6),
      rating: 4.6,
      score: "17,288",
      scoreChange: "+14.4%",
      scoreChangeType: "up",
      genre: "전략",
    },
    {
      id: 8,
      rank: "08",
      rankChange: "3",
      changeType: "down",
      name: "쿠키런: 킹덤",
      image: img(7),
      rating: 3.8,
      score: "16,480",
      scoreChange: "-0.3%",
      scoreChangeType: "down",
      genre: "수집형",
    },
    {
      id: 9,
      rank: "09",
      rankChange: "-",
      changeType: "same",
      name: "리니지M",
      image: img(0),
      rating: 4.1,
      score: "16,231",
      scoreChange: "-8.9%",
      scoreChangeType: "down",
      genre: "RPG/슈팅",
    },
    {
      id: 10,
      rank: "10",
      rankChange: "2",
      changeType: "up",
      name: "승리의 여신: 니케",
      image: img(4),
      rating: 4.8,
      score: "16,035",
      scoreChange: "0.0%",
      scoreChangeType: "same",
      genre: "RPG/슈팅",
    },
  ];

  const pc쌀먹: RankItem[] = [];
  const p2e쌀먹: RankItem[] = [];

  const dataMap: Record<string, Record<string, RankItem[]>> = {
    모바일게임: {
      소셜점수: mobile쌀먹,
      구글순위: mobile쌀먹,
      지금핫한: mobile쌀먹,
      신규게임: mobile쌀먹,
    },
    PC게임: {
      소셜점수: pc쌀먹,
      PC방순위: pc쌀먹,
      지금핫한: pc쌀먹,
      신규게임: pc쌀먹,
    },
    P2E게임: {
      소셜점수: p2e쌀먹,
      코인순위: p2e쌀먹,
      지금핫한: p2e쌀먹,
      신규게임: p2e쌀먹,
    },
  };

  // 3. 실제 필터링 로직 (장르가 다르면 목록에서 사라짐)
  const rawRankings = dataMap[activeTab]?.[activeFilter] ?? [];
  const filteredRankings = useMemo(() => {
    if (selectedGenre === "전체") return rawRankings;
    return rawRankings.filter((item) => item.genre === selectedGenre);
  }, [rawRankings, selectedGenre]);

  // 4. 하트 토글 (누르면 빨간색/회색 변경)
  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedGames((prev) =>
      prev.includes(id)
        ? prev.filter((gameId) => gameId !== id)
        : [...prev, id],
    );
  };

  // 5. 상세 페이지 이동 핸들러
  const handleItemClick = (id: number, name: string) => {
    // 실제로는 여기서 페이지 이동 (setCurrentPage)
    // alert(`[테스트] ${name} (ID: ${id}) 상세페이지로 이동합니다.`);
    setCurrentPage("samurai-review", id);
  };

  return (
    <>
      {/* 탭 */}
      <div className="bg-white px-4 pt-2">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-3 text-sm font-medium ${
                activeTab === tab
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-400"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setActiveFilter("소셜점수");
                setSelectedGenre("전체");
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <Swiper
          modules={[]}
          spaceBetween={8}
          slidesPerView="auto"
          className="w-full"
        >
          {filters.map((filter) => (
            <SwiperSlide key={filter} className="!w-auto">
              <button
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "text-white shadow-md"
                    : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
                style={
                  activeFilter === filter
                    ? { backgroundColor: "#72C2FF", border: "none" }
                    : {}
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 장르 선택 & 툴팁 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between relative z-20">
        <div className="relative">
          {/* 장르 버튼 */}
          <button
            className="text-sm font-semibold text-gray-700 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 active:bg-gray-100"
            onClick={() => setShowGenrePopup(!showGenrePopup)}
          >
            <span className="text-[#72C2FF]">●</span> {selectedGenre}{" "}
            <span className="text-xs text-gray-400">▼</span>
          </button>

          {/* 장르 팝업 (열리면 보임) */}
          {showGenrePopup && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowGenrePopup(false)}
              ></div>
              <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-40 min-w-[160px] max-h-64 overflow-y-auto">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`w-full px-4 py-3 text-left text-sm border-b border-gray-50 last:border-0 hover:bg-blue-50 transition-colors ${
                      selectedGenre === genre
                        ? "text-blue-500 font-bold bg-blue-50"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setSelectedGenre(genre);
                      setShowGenrePopup(false);
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 툴팁 물음표 버튼 */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 relative">
          <span>2025.01.18 기준</span>
          <button
            className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center text-[11px] font-bold text-gray-500 hover:bg-gray-100 active:scale-95"
            onClick={() => setShowTooltip(!showTooltip)}
          >
            ?
          </button>

          {/* 툴팁 내용 (열리면 보임) */}
          {showTooltip && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setShowTooltip(false)}
              ></div>
              <div className="absolute top-8 right-0 w-64 bg-gray-800 text-white p-4 rounded-xl shadow-2xl z-40 text-xs leading-relaxed animate-fadeUp">
                <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
                  <span className="font-bold text-yellow-400">
                    🏆 랭킹 집계 기준
                  </span>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="text-lg leading-none"
                  >
                    &times;
                  </button>
                </div>
                <p>
                  소셜 점수, 구글 매출 순위, 커뮤니티 활성도를 종합하여
                  실시간으로 집계됩니다.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 랭킹 리스트 */}
      <div className="px-3 pb-24 space-y-3 bg-gray-50 min-h-screen">
        {filteredRankings.length === 0 ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center">
            <span className="text-4xl mb-2">😢</span>
            <p>선택하신 장르의 게임이 없습니다.</p>
            <button
              onClick={() => setSelectedGenre("전체")}
              className="mt-4 text-blue-500 underline text-sm"
            >
              전체 보기
            </button>
          </div>
        ) : (
          filteredRankings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 active:scale-[0.99] transition-transform relative"
              onClick={() => handleItemClick(item.id, item.name)}
            >
              <div className="flex items-center">
                {/* 1. 순위 */}
                <div className="w-10 text-center flex flex-col items-center justify-center">
                  <p
                    className={`text-lg font-bold ${Number(item.rank) <= 3 ? "text-[#72C2FF] italic" : "text-gray-500"}`}
                  >
                    {item.rank}
                  </p>
                  <div className="flex items-center justify-center text-[10px] font-medium mt-0.5">
                    {item.changeType === "up" && (
                      <span className="text-red-500">▲{item.rankChange}</span>
                    )}
                    {item.changeType === "down" && (
                      <span className="text-blue-500">▼{item.rankChange}</span>
                    )}
                    {item.changeType === "same" && (
                      <span className="text-gray-300">-</span>
                    )}
                  </div>
                </div>

                {/* 2. 이미지 */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover mx-3 border border-gray-100"
                  />
                  {Number(item.rank) === 1 && (
                    <div className="absolute -top-1 left-2 w-5 h-5 bg-[#72C2FF] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                      1
                    </div>
                  )}
                </div>

                {/* 3. 정보 */}
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-gray-900 text-sm truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-[#4AABF5] bg-[#E8F4FD] px-1.5 py-0.5 rounded">
                      {item.genre}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs text-gray-500 font-medium">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. 점수 & 하트 버튼 */}
                <div className="flex flex-col items-end gap-2">
                  {/* 점수 */}
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">소셜점수</p>
                    <p className="font-bold text-gray-900 text-sm">
                      {item.score}
                    </p>
                  </div>

                  {/* ❤️ 하트 버튼 (여기가 새로 추가된 기능!) */}
                  <button
                    onClick={(e) => toggleLike(e, item.id)}
                    className={`p-1.5 rounded-full transition-all ${
                      likedGames.includes(item.id)
                        ? "bg-red-50 text-[#FF4757] scale-110"
                        : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
