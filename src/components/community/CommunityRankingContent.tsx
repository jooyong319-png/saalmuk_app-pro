import { useState, useEffect } from "react";
import { useFollow } from "./FollowContext";
import ProfilePopup from "../ProfilePopup";

// ===== 아바타 이미지 =====
const avatarImages = [
  "https://edge.ssalmuk.com/editorImage/164433adf1f74f30adf6d65de1bcf631.png",
  "https://edge.ssalmuk.com/editorImage/628e9422ca0d4d0a9c4676b282e8f370.png",
  "https://edge.ssalmuk.com/editorImage/d13662afec0a4b36b490a27aa0e44d5f.png",
  "https://edge.ssalmuk.com/editorImage/452483c1a34849f19fdd91b084f6cc6d.png",
  "https://edge.ssalmuk.com/editorImage/a5d026e2b1e74974b7291b9b0720c5c8.png",
  "https://edge.ssalmuk.com/editorImage/93460ed22a3a4a1180c5b1558d3475ae.png",
  "https://edge.ssalmuk.com/editorImage/636ec77257614b1eafd00eb6852984cd.png",
  "https://edge.ssalmuk.com/editorImage/ed19af783aad472ba506c749c1894e4a.png",
  "https://edge.ssalmuk.com/editorImage/1503bab4d1a84925883922dd3c6962e0.png",
  "https://edge.ssalmuk.com/editorImage/0490382f65a84ad584dc1d36b1336b04.png",
  "https://edge.ssalmuk.com/editorImage/c5de86eaadef4674bbe044bfec7dacfc.png",
  "https://edge.ssalmuk.com/editorImage/1c58b4cbb5914bd0bba0ae27e6dd1175.png",
  "https://edge.ssalmuk.com/editorImage/9fd9b23d0f8b47149c3a9e720d81e29c.png",
];

// ===== 랭킹 데이터 =====
const rankingData = {
  추천상위: [
    {
      rank: 1,
      name: "팔고나서야깨달았어",
      avatar: avatarImages[0],
      followers: "1.1만",
      isFollowing: false,
    },
    {
      rank: 2,
      name: "에펜시아",
      avatar: avatarImages[1],
      followers: "6.3천",
      isFollowing: false,
    },
    {
      rank: 3,
      name: "금손e",
      avatar: avatarImages[2],
      followers: "3.8천",
      isFollowing: true,
    },
    {
      rank: 4,
      name: "쿠우우잉",
      avatar: avatarImages[3],
      followers: "2.3천",
      isFollowing: false,
    },
    {
      rank: 5,
      name: "저평가사냥꾼",
      avatar: avatarImages[4],
      followers: "1.8천",
      isFollowing: false,
    },
    {
      rank: 6,
      name: "큰거있게사고장투",
      avatar: avatarImages[5],
      followers: "1.9천",
      isFollowing: false,
    },
    {
      rank: 7,
      name: "배당성장주민",
      avatar: avatarImages[6],
      followers: "5.5천",
      isFollowing: true,
    },
    {
      rank: 8,
      name: "Wafi와피",
      avatar: avatarImages[7],
      followers: "4.4천",
      isFollowing: false,
    },
    {
      rank: 9,
      name: "코뿔소는소일까",
      avatar: avatarImages[8],
      followers: "9.2천",
      isFollowing: false,
    },
    {
      rank: 10,
      name: "대대대대대대대대",
      avatar: avatarImages[9],
      followers: "1.2천",
      isFollowing: false,
    },
  ],
  리워드상위: [
    {
      rank: 1,
      name: "쌀먹마스터",
      avatar: avatarImages[10],
      followers: "8.2만",
      points: "1,523,400",
      isFollowing: false,
    },
    {
      rank: 2,
      name: "리워드헌터",
      avatar: avatarImages[11],
      followers: "5.1만",
      points: "1,287,200",
      isFollowing: false,
    },
    {
      rank: 3,
      name: "사전예약킹",
      avatar: avatarImages[12],
      followers: "3.7만",
      points: "985,600",
      isFollowing: true,
    },
    {
      rank: 4,
      name: "이벤트수집가",
      avatar: avatarImages[0],
      followers: "2.9만",
      points: "872,300",
      isFollowing: false,
    },
    {
      rank: 5,
      name: "무과금의정석",
      avatar: avatarImages[1],
      followers: "2.1만",
      points: "654,800",
      isFollowing: false,
    },
    {
      rank: 6,
      name: "꿀팁대장",
      avatar: avatarImages[2],
      followers: "1.8만",
      points: "543,200",
      isFollowing: false,
    },
    {
      rank: 7,
      name: "알뜰게이머",
      avatar: avatarImages[3],
      followers: "1.5만",
      points: "432,100",
      isFollowing: false,
    },
    {
      rank: 8,
      name: "쌀먹러123",
      avatar: avatarImages[4],
      followers: "1.2만",
      points: "387,500",
      isFollowing: true,
    },
    {
      rank: 9,
      name: "보상왕",
      avatar: avatarImages[5],
      followers: "9.8천",
      points: "298,700",
      isFollowing: false,
    },
    {
      rank: 10,
      name: "게임부자",
      avatar: avatarImages[6],
      followers: "8.5천",
      points: "245,300",
      isFollowing: false,
    },
  ],
  팔로워급상승: [
    {
      rank: 1,
      name: "신규스타",
      avatar: avatarImages[7],
      followers: "2.3만",
      isFollowing: false,
    },
    {
      rank: 2,
      name: "급상승러",
      avatar: avatarImages[8],
      followers: "1.8만",
      isFollowing: false,
    },
    {
      rank: 3,
      name: "떠오르는별",
      avatar: avatarImages[9],
      followers: "1.5만",
      isFollowing: false,
    },
    {
      rank: 4,
      name: "핫루키",
      avatar: avatarImages[10],
      followers: "1.2만",
      isFollowing: true,
    },
    {
      rank: 5,
      name: "뉴페이스",
      avatar: avatarImages[11],
      followers: "9.8천",
      isFollowing: false,
    },
    {
      rank: 6,
      name: "신예게이머",
      avatar: avatarImages[12],
      followers: "8.5천",
      isFollowing: false,
    },
    {
      rank: 7,
      name: "차세대스타",
      avatar: avatarImages[0],
      followers: "7.2천",
      isFollowing: false,
    },
    {
      rank: 8,
      name: "성장중",
      avatar: avatarImages[1],
      followers: "6.1천",
      isFollowing: false,
    },
    {
      rank: 9,
      name: "주목받는자",
      avatar: avatarImages[2],
      followers: "5.3천",
      isFollowing: true,
    },
    {
      rank: 10,
      name: "기대주",
      avatar: avatarImages[3],
      followers: "4.7천",
      isFollowing: false,
    },
  ],
  인플루언서: [
    {
      rank: 1,
      name: "게임킹",
      avatar: avatarImages[4],
      followers: "52.3만",
      isFollowing: true,
    },
    {
      rank: 2,
      name: "프로게이머A",
      avatar: avatarImages[5],
      followers: "48.1만",
      isFollowing: false,
    },
    {
      rank: 3,
      name: "유명스트리머",
      avatar: avatarImages[6],
      followers: "35.7만",
      isFollowing: false,
    },
    {
      rank: 4,
      name: "게임유튜버",
      avatar: avatarImages[7],
      followers: "28.9만",
      isFollowing: false,
    },
    {
      rank: 5,
      name: "인기BJ",
      avatar: avatarImages[8],
      followers: "21.2만",
      isFollowing: true,
    },
    {
      rank: 6,
      name: "공략마스터",
      avatar: avatarImages[9],
      followers: "18.5만",
      isFollowing: false,
    },
    {
      rank: 7,
      name: "리뷰전문가",
      avatar: avatarImages[10],
      followers: "15.2만",
      isFollowing: false,
    },
    {
      rank: 8,
      name: "겜덕후",
      avatar: avatarImages[11],
      followers: "12.8만",
      isFollowing: false,
    },
    {
      rank: 9,
      name: "게임칼럼니스트",
      avatar: avatarImages[12],
      followers: "10.1만",
      isFollowing: false,
    },
    {
      rank: 10,
      name: "e스포츠해설",
      avatar: avatarImages[0],
      followers: "8.7만",
      isFollowing: true,
    },
  ],
  크리에이터: [
    {
      rank: 1,
      name: "공략장인",
      avatar: avatarImages[1],
      followers: "15.8만",
      isFollowing: false,
    },
    {
      rank: 2,
      name: "팁스터",
      avatar: avatarImages[2],
      followers: "12.3만",
      isFollowing: true,
    },
    {
      rank: 3,
      name: "영상제작자",
      avatar: avatarImages[3],
      followers: "9.8만",
      isFollowing: false,
    },
    {
      rank: 4,
      name: "일러스트작가",
      avatar: avatarImages[4],
      followers: "8.5만",
      isFollowing: false,
    },
    {
      rank: 5,
      name: "콘텐츠메이커",
      avatar: avatarImages[5],
      followers: "7.2만",
      isFollowing: false,
    },
    {
      rank: 6,
      name: "게임아티스트",
      avatar: avatarImages[6],
      followers: "6.1만",
      isFollowing: true,
    },
    {
      rank: 7,
      name: "정보요정",
      avatar: avatarImages[7],
      followers: "5.3만",
      isFollowing: false,
    },
    {
      rank: 8,
      name: "뉴스봇",
      avatar: avatarImages[8],
      followers: "4.7만",
      isFollowing: false,
    },
    {
      rank: 9,
      name: "이벤트알리미",
      avatar: avatarImages[9],
      followers: "3.9만",
      isFollowing: false,
    },
    {
      rank: 10,
      name: "꿀정보러",
      avatar: avatarImages[10],
      followers: "3.2만",
      isFollowing: false,
    },
  ],
};

type TabType =
  | "추천상위"
  | "리워드상위"
  | "팔로워급상승"
  | "인플루언서"
  | "크리에이터";

// ===== Props =====
interface CommunityRankingContentProps {
  setCurrentPage: (page: string) => void;
}

export default function CommunityRankingContent({
  setCurrentPage,
}: CommunityRankingContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>("추천상위");
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  // 전역 팔로우 상태 사용
  const { isFollowing, toggleFollow } = useFollow();

  const tabs: TabType[] = [
    "추천상위",
    "리워드상위",
    "팔로워급상승",
    "인플루언서",
    "크리에이터",
  ];

  const currentData = rankingData[activeTab];

  // 헤더의 안내 버튼 클릭 이벤트 리스너
  useEffect(() => {
    const handleOpenInfo = () => setShowInfoPopup(true);
    window.addEventListener("openRankingInfo", handleOpenInfo);
    return () => window.removeEventListener("openRankingInfo", handleOpenInfo);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 헤더 타이틀 */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-[18px] font-bold text-gray-900">
          주간 커뮤니티 프로필 랭킹
        </h1>
      </div>

      {/* 탭 */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-6 px-4 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-[14px] whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab
                  ? "font-bold text-gray-900 border-gray-900"
                  : "font-medium text-gray-400 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 순위 리스트 */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {currentData.map((item) => {
            const following = isFollowing(item.name);

            return (
              <div
                key={`${activeTab}-${item.rank}`}
                className="flex items-center gap-3 px-4 py-3"
              >
                {/* 순위 */}
                <div
                  className={`w-6 text-center text-[15px] font-bold ${
                    item.rank <= 3 ? "text-[#72C2FF]" : "text-gray-400"
                  }`}
                >
                  {item.rank}
                </div>

                {/* 프로필 이미지 */}
                <div
                  className="w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    setSelectedProfile({ name: item.name, avatar: item.avatar })
                  }
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[15px] font-medium text-gray-900 truncate cursor-pointer hover:underline"
                    onClick={() =>
                      setSelectedProfile({
                        name: item.name,
                        avatar: item.avatar,
                      })
                    }
                  >
                    {item.name}
                  </h3>
                  <p className="text-[13px] text-gray-400">
                    {activeTab === "리워드상위" && "points" in item
                      ? `${item.points}P 획득`
                      : `팔로워 ${item.followers}`}
                  </p>
                </div>

                {/* 팔로우 버튼 */}
                <button
                  onClick={() => toggleFollow(item.name)}
                  className={`px-4 py-1.5 text-[13px] font-medium rounded-full transition-all ${
                    following
                      ? "bg-gray-100 text-gray-500"
                      : "bg-[#72C2FF] text-white"
                  }`}
                >
                  {following ? "팔로잉" : "팔로우"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 스타일 */}
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 안내 팝업 */}
      {showInfoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 백드롭 */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowInfoPopup(false)}
          />

          {/* 팝업 */}
          <div className="relative bg-white rounded-2xl mx-6 max-w-[340px] w-full max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="p-5">
              {/* 타이틀 */}
              <h2 className="text-[17px] font-bold text-gray-900 mb-4">
                프로필 랭킹 안내
              </h2>

              {/* 안내 텍스트 */}
              <div className="text-[13px] text-gray-600 space-y-1 mb-6">
                <p>
                  * 모든 랭킹은 매일 오전 6시, 오후 6시 2회, 해당일자 최근 7일
                  기준으로 집계됩니다.
                </p>
                <p>* 랭킹은 사용자 활동 데이터를 기준으로 산출됩니다.</p>
                <p>
                  * 일부 데이터는 집계 시점에 따라 실시간과 차이가 있을 수
                  있습니다.
                </p>
                <p>
                  * 이용규칙에 따라 이용 정지된 프로필은 랭킹에 포함되지
                  않습니다.
                </p>
              </div>

              {/* 랭킹별 기준 */}
              <h3 className="text-[15px] font-bold text-gray-900 mb-3">
                프로필 랭킹별 기준
              </h3>

              <div className="space-y-4 text-[13px]">
                <div>
                  <p className="font-semibold text-gray-800">* 추천 상위</p>
                  <p className="text-gray-500 ml-2">
                    최근 7일동안 추천 점수가 높은 순으로 보여줍니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">* 리워드 상위</p>
                  <p className="text-gray-500 ml-2">
                    최근 7일동안 획득한 리워드가 많은 순으로 보여줍니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">* 팔로워 급상승</p>
                  <p className="text-gray-500 ml-2">
                    최근 7일동안 팔로워가 가장 많이 증가한 순으로 보여줍니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">* 인플루언서</p>
                  <p className="text-gray-500 ml-2">
                    누적 팔로워 수가 많은 순으로 보여줍니다.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">* 크리에이터</p>
                  <p className="text-gray-500 ml-2">
                    유튜버 등최근 7일동안 추천 점수가 높은 순으로 보여줍니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 확인 버튼 */}
            <div className="px-5 pb-5">
              <button
                onClick={() => setShowInfoPopup(false)}
                className="w-full py-3 rounded-xl bg-[#72C2FF] text-white font-semibold text-[15px]"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 프로필 팝업 */}
      {selectedProfile && (
        <ProfilePopup
          profile={{
            name: selectedProfile.name,
            avatar: selectedProfile.avatar,
          }}
          onClose={() => setSelectedProfile(null)}
        />
      )}
    </div>
  );
}
