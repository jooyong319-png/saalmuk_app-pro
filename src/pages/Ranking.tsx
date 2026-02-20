import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type RankItem = {
  id: number;

  rank: string;

  rankChange: string;

  changeType: "up" | "down" | "same";

  name: string;

  image: string;

  rating: number;

  score: string;

  scoreChange: string;

  scoreChangeType: "up" | "down" | "same";
};

export default function Ranking({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("모바일게임");

  const [activeFilter, setActiveFilter] = useState("소셜점수");

  const [showGenrePopup, setShowGenrePopup] = useState(false);

  const [selectedGenre, setSelectedGenre] = useState("전체");

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
    "대전",
    "캐쥬얼",
    "카드/보드",
    "전략",
    "메타버스/소셜",
    "방치형",
    "수집형",
    "육성",
    "스포츠/레이싱",
    "기타",
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

  // ====== 모바일게임 데이터 ======

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
    },
  ];

  const mobile구글: RankItem[] = [
    {
      id: 11,
      rank: "01",
      rankChange: "-",
      changeType: "same",
      name: "원신",
      image: img(1),
      rating: 4.8,
      score: "22,845",
      scoreChange: "+5.3%",
      scoreChangeType: "up",
    },

    {
      id: 12,
      rank: "02",
      rankChange: "1",
      changeType: "up",
      name: "블루 아카이브",
      image: img(4),
      rating: 4.5,
      score: "21,673",
      scoreChange: "+12.1%",
      scoreChangeType: "up",
    },

    {
      id: 13,
      rank: "03",
      rankChange: "1",
      changeType: "down",
      name: "붕괴 스타레일",
      image: img(6),
      rating: 4.6,
      score: "20,982",
      scoreChange: "-4.7%",
      scoreChangeType: "down",
    },

    {
      id: 14,
      rank: "04",
      rankChange: "3",
      changeType: "up",
      name: "마비노기 모바일",
      image: img(3),
      rating: 4.5,
      score: "19,541",
      scoreChange: "+18.9%",
      scoreChangeType: "up",
    },

    {
      id: 15,
      rank: "05",
      rankChange: "-",
      changeType: "same",
      name: "쿠키런: 킹덤",
      image: img(7),
      rating: 3.8,
      score: "18,327",
      scoreChange: "+0.8%",
      scoreChangeType: "up",
    },

    {
      id: 16,
      rank: "06",
      rankChange: "2",
      changeType: "up",
      name: "아이온2",
      image: img(0),
      rating: 5.0,
      score: "17,856",
      scoreChange: "+9.4%",
      scoreChangeType: "up",
    },

    {
      id: 17,
      rank: "07",
      rankChange: "1",
      changeType: "down",
      name: "명조",
      image: img(5),
      rating: 4.3,
      score: "16,743",
      scoreChange: "-6.2%",
      scoreChangeType: "down",
    },

    {
      id: 18,
      rank: "08",
      rankChange: "-",
      changeType: "same",
      name: "승리의 여신: 니케",
      image: img(4),
      rating: 4.8,
      score: "15,921",
      scoreChange: "+1.5%",
      scoreChangeType: "up",
    },

    {
      id: 19,
      rank: "09",
      rankChange: "1",
      changeType: "up",
      name: "리니지M",
      image: img(0),
      rating: 4.1,
      score: "15,234",
      scoreChange: "+7.6%",
      scoreChangeType: "up",
    },

    {
      id: 20,
      rank: "10",
      rankChange: "2",
      changeType: "down",
      name: "오딘: 발할라 라이징",
      image: img(2),
      rating: 4.2,
      score: "14,567",
      scoreChange: "-11.3%",
      scoreChangeType: "down",
    },
  ];

  const mobile핫한: RankItem[] = [
    {
      id: 21,
      rank: "01",
      rankChange: "5",
      changeType: "up",
      name: "마비노기 모바일",
      image: img(3),
      rating: 4.5,
      score: "24,312",
      scoreChange: "+42.1%",
      scoreChangeType: "up",
    },

    {
      id: 22,
      rank: "02",
      rankChange: "3",
      changeType: "up",
      name: "아이온2",
      image: img(0),
      rating: 5.0,
      score: "23,891",
      scoreChange: "+38.5%",
      scoreChangeType: "up",
    },

    {
      id: 23,
      rank: "03",
      rankChange: "-",
      changeType: "same",
      name: "원신",
      image: img(1),
      rating: 4.8,
      score: "22,456",
      scoreChange: "+5.2%",
      scoreChangeType: "up",
    },

    {
      id: 24,
      rank: "04",
      rankChange: "2",
      changeType: "up",
      name: "블루 아카이브",
      image: img(4),
      rating: 4.5,
      score: "21,087",
      scoreChange: "+22.3%",
      scoreChangeType: "up",
    },

    {
      id: 25,
      rank: "05",
      rankChange: "1",
      changeType: "down",
      name: "붕괴 스타레일",
      image: img(6),
      rating: 4.6,
      score: "20,543",
      scoreChange: "-3.1%",
      scoreChangeType: "down",
    },

    {
      id: 26,
      rank: "06",
      rankChange: "4",
      changeType: "up",
      name: "명조",
      image: img(5),
      rating: 4.3,
      score: "19,234",
      scoreChange: "+31.0%",
      scoreChangeType: "up",
    },

    {
      id: 27,
      rank: "07",
      rankChange: "2",
      changeType: "down",
      name: "쿠키런: 킹덤",
      image: img(7),
      rating: 3.8,
      score: "17,891",
      scoreChange: "-8.5%",
      scoreChangeType: "down",
    },

    {
      id: 28,
      rank: "08",
      rankChange: "-",
      changeType: "same",
      name: "승리의 여신: 니케",
      image: img(4),
      rating: 4.8,
      score: "16,745",
      scoreChange: "+1.2%",
      scoreChangeType: "up",
    },

    {
      id: 29,
      rank: "09",
      rankChange: "3",
      changeType: "down",
      name: "리니지M",
      image: img(0),
      rating: 4.1,
      score: "15,432",
      scoreChange: "-15.3%",
      scoreChangeType: "down",
    },

    {
      id: 30,
      rank: "10",
      rankChange: "1",
      changeType: "up",
      name: "세븐나이츠 ReBirth",
      image: img(2),
      rating: 4.0,
      score: "14,876",
      scoreChange: "+9.8%",
      scoreChangeType: "up",
    },
  ];

  const mobile신규: RankItem[] = [
    {
      id: 31,
      rank: "01",
      rankChange: "NEW",
      changeType: "up",
      name: "아이온2",
      image: img(0),
      rating: 5.0,
      score: "23,447",
      scoreChange: "+24.7%",
      scoreChangeType: "up",
    },

    {
      id: 32,
      rank: "02",
      rankChange: "NEW",
      changeType: "up",
      name: "마비노기 모바일",
      image: img(3),
      rating: 4.5,
      score: "19,832",
      scoreChange: "+15.3%",
      scoreChangeType: "up",
    },

    {
      id: 33,
      rank: "03",
      rankChange: "NEW",
      changeType: "up",
      name: "세븐나이츠 ReBirth",
      image: img(2),
      rating: 4.0,
      score: "16,245",
      scoreChange: "+8.7%",
      scoreChangeType: "up",
    },

    {
      id: 34,
      rank: "04",
      rankChange: "NEW",
      changeType: "up",
      name: "가디언 테일즈 2",
      image: img(6),
      rating: 4.3,
      score: "14,567",
      scoreChange: "+11.2%",
      scoreChangeType: "up",
    },

    {
      id: 35,
      rank: "05",
      rankChange: "NEW",
      changeType: "up",
      name: "에픽세븐 리버스",
      image: img(5),
      rating: 4.1,
      score: "12,890",
      scoreChange: "+6.4%",
      scoreChangeType: "up",
    },

    {
      id: 36,
      rank: "06",
      rankChange: "NEW",
      changeType: "up",
      name: "카운터사이드2",
      image: img(7),
      rating: 3.9,
      score: "11,234",
      scoreChange: "+3.8%",
      scoreChangeType: "up",
    },

    {
      id: 37,
      rank: "07",
      rankChange: "NEW",
      changeType: "up",
      name: "프린세스 커넥트R",
      image: img(1),
      rating: 4.2,
      score: "9,876",
      scoreChange: "+5.1%",
      scoreChangeType: "up",
    },

    {
      id: 38,
      rank: "08",
      rankChange: "NEW",
      changeType: "up",
      name: "데스티니 차일드2",
      image: img(4),
      rating: 3.7,
      score: "8,543",
      scoreChange: "+2.9%",
      scoreChangeType: "up",
    },
  ];

  // ====== PC게임 데이터 ======

  const pc쌀먹: RankItem[] = [
    {
      id: 41,
      rank: "01",
      rankChange: "-",
      changeType: "same",
      name: "리그 오브 레전드",
      image: img(3),
      rating: 4.7,
      score: "45,892",
      scoreChange: "+2.1%",
      scoreChangeType: "up",
    },

    {
      id: 42,
      rank: "02",
      rankChange: "1",
      changeType: "up",
      name: "발로란트",
      image: img(5),
      rating: 4.6,
      score: "42,103",
      scoreChange: "+8.3%",
      scoreChangeType: "up",
    },

    {
      id: 43,
      rank: "03",
      rankChange: "1",
      changeType: "down",
      name: "메이플스토리",
      image: img(6),
      rating: 4.3,
      score: "38,756",
      scoreChange: "-3.5%",
      scoreChangeType: "down",
    },

    {
      id: 44,
      rank: "04",
      rankChange: "2",
      changeType: "up",
      name: "던전앤파이터",
      image: img(5),
      rating: 4.4,
      score: "35,421",
      scoreChange: "+12.7%",
      scoreChangeType: "up",
    },

    {
      id: 45,
      rank: "05",
      rankChange: "1",
      changeType: "down",
      name: "로스트아크",
      image: img(0),
      rating: 4.2,
      score: "33,890",
      scoreChange: "-5.2%",
      scoreChangeType: "down",
    },

    {
      id: 46,
      rank: "06",
      rankChange: "-",
      changeType: "same",
      name: "오버워치2",
      image: img(4),
      rating: 4.0,
      score: "31,245",
      scoreChange: "+1.8%",
      scoreChangeType: "up",
    },

    {
      id: 47,
      rank: "07",
      rankChange: "3",
      changeType: "up",
      name: "배틀그라운드",
      image: img(2),
      rating: 4.1,
      score: "29,876",
      scoreChange: "+15.6%",
      scoreChangeType: "up",
    },

    {
      id: 48,
      rank: "08",
      rankChange: "2",
      changeType: "down",
      name: "피파온라인4",
      image: img(1),
      rating: 3.9,
      score: "27,543",
      scoreChange: "-7.4%",
      scoreChangeType: "down",
    },

    {
      id: 49,
      rank: "09",
      rankChange: "1",
      changeType: "up",
      name: "서든어택",
      image: img(7),
      rating: 3.8,
      score: "25,198",
      scoreChange: "+4.2%",
      scoreChangeType: "up",
    },

    {
      id: 50,
      rank: "10",
      rankChange: "1",
      changeType: "down",
      name: "디아블로4",
      image: img(3),
      rating: 4.5,
      score: "23,654",
      scoreChange: "-9.1%",
      scoreChangeType: "down",
    },
  ];

  const pc구글: RankItem[] = [
    {
      id: 51,
      rank: "01",
      rankChange: "-",
      changeType: "same",
      name: "리그 오브 레전드",
      image: img(3),
      rating: 4.7,
      score: "44,231",
      scoreChange: "+1.8%",
      scoreChangeType: "up",
    },

    {
      id: 52,
      rank: "02",
      rankChange: "2",
      changeType: "up",
      name: "배틀그라운드",
      image: img(2),
      rating: 4.1,
      score: "41,567",
      scoreChange: "+14.2%",
      scoreChangeType: "up",
    },

    {
      id: 53,
      rank: "03",
      rankChange: "1",
      changeType: "down",
      name: "발로란트",
      image: img(5),
      rating: 4.6,
      score: "39,823",
      scoreChange: "-5.3%",
      scoreChangeType: "down",
    },

    {
      id: 54,
      rank: "04",
      rankChange: "1",
      changeType: "up",
      name: "오버워치2",
      image: img(4),
      rating: 4.0,
      score: "37,456",
      scoreChange: "+8.7%",
      scoreChangeType: "up",
    },

    {
      id: 55,
      rank: "05",
      rankChange: "2",
      changeType: "down",
      name: "메이플스토리",
      image: img(6),
      rating: 4.3,
      score: "35,198",
      scoreChange: "-9.1%",
      scoreChangeType: "down",
    },

    {
      id: 56,
      rank: "06",
      rankChange: "-",
      changeType: "same",
      name: "던전앤파이터",
      image: img(5),
      rating: 4.4,
      score: "33,567",
      scoreChange: "+0.5%",
      scoreChangeType: "up",
    },

    {
      id: 57,
      rank: "07",
      rankChange: "1",
      changeType: "up",
      name: "로스트아크",
      image: img(0),
      rating: 4.2,
      score: "31,234",
      scoreChange: "+6.3%",
      scoreChangeType: "up",
    },

    {
      id: 58,
      rank: "08",
      rankChange: "1",
      changeType: "down",
      name: "피파온라인4",
      image: img(1),
      rating: 3.9,
      score: "28,901",
      scoreChange: "-4.8%",
      scoreChangeType: "down",
    },

    {
      id: 59,
      rank: "09",
      rankChange: "3",
      changeType: "up",
      name: "디아블로4",
      image: img(3),
      rating: 4.5,
      score: "26,543",
      scoreChange: "+19.5%",
      scoreChangeType: "up",
    },

    {
      id: 60,
      rank: "10",
      rankChange: "-",
      changeType: "same",
      name: "서든어택",
      image: img(7),
      rating: 3.8,
      score: "24,876",
      scoreChange: "+0.2%",
      scoreChangeType: "up",
    },
  ];

  const pc핫한: RankItem[] = [
    {
      id: 61,
      rank: "01",
      rankChange: "4",
      changeType: "up",
      name: "발로란트",
      image: img(5),
      rating: 4.6,
      score: "43,567",
      scoreChange: "+35.2%",
      scoreChangeType: "up",
    },

    {
      id: 62,
      rank: "02",
      rankChange: "-",
      changeType: "same",
      name: "리그 오브 레전드",
      image: img(3),
      rating: 4.7,
      score: "42,198",
      scoreChange: "+3.1%",
      scoreChangeType: "up",
    },

    {
      id: 63,
      rank: "03",
      rankChange: "5",
      changeType: "up",
      name: "던전앤파이터",
      image: img(5),
      rating: 4.4,
      score: "40,876",
      scoreChange: "+45.0%",
      scoreChangeType: "up",
    },

    {
      id: 64,
      rank: "04",
      rankChange: "2",
      changeType: "down",
      name: "메이플스토리",
      image: img(6),
      rating: 4.3,
      score: "38,234",
      scoreChange: "-8.7%",
      scoreChangeType: "down",
    },

    {
      id: 65,
      rank: "05",
      rankChange: "1",
      changeType: "up",
      name: "배틀그라운드",
      image: img(2),
      rating: 4.1,
      score: "36,543",
      scoreChange: "+12.4%",
      scoreChangeType: "up",
    },

    {
      id: 66,
      rank: "06",
      rankChange: "3",
      changeType: "down",
      name: "로스트아크",
      image: img(0),
      rating: 4.2,
      score: "34,198",
      scoreChange: "-15.3%",
      scoreChangeType: "down",
    },

    {
      id: 67,
      rank: "07",
      rankChange: "2",
      changeType: "up",
      name: "디아블로4",
      image: img(3),
      rating: 4.5,
      score: "32,876",
      scoreChange: "+22.1%",
      scoreChangeType: "up",
    },

    {
      id: 68,
      rank: "08",
      rankChange: "1",
      changeType: "down",
      name: "오버워치2",
      image: img(4),
      rating: 4.0,
      score: "30,543",
      scoreChange: "-4.6%",
      scoreChangeType: "down",
    },

    {
      id: 69,
      rank: "09",
      rankChange: "-",
      changeType: "same",
      name: "피파온라인4",
      image: img(1),
      rating: 3.9,
      score: "28,765",
      scoreChange: "+0.8%",
      scoreChangeType: "up",
    },

    {
      id: 70,
      rank: "10",
      rankChange: "2",
      changeType: "up",
      name: "검은사막",
      image: img(7),
      rating: 4.1,
      score: "26,432",
      scoreChange: "+18.7%",
      scoreChangeType: "up",
    },
  ];

  const pc신규: RankItem[] = [
    {
      id: 71,
      rank: "01",
      rankChange: "NEW",
      changeType: "up",
      name: "디아블로4: 확장팩",
      image: img(3),
      rating: 4.5,
      score: "32,456",
      scoreChange: "+28.3%",
      scoreChangeType: "up",
    },

    {
      id: 72,
      rank: "02",
      rankChange: "NEW",
      changeType: "up",
      name: "블레이드&소울2",
      image: img(5),
      rating: 4.0,
      score: "27,891",
      scoreChange: "+16.7%",
      scoreChangeType: "up",
    },

    {
      id: 73,
      rank: "03",
      rankChange: "NEW",
      changeType: "up",
      name: "검은사막 리부트",
      image: img(7),
      rating: 4.1,
      score: "23,456",
      scoreChange: "+9.4%",
      scoreChangeType: "up",
    },

    {
      id: 74,
      rank: "04",
      rankChange: "NEW",
      changeType: "up",
      name: "마인크래프트 DLC",
      image: img(2),
      rating: 4.3,
      score: "19,876",
      scoreChange: "+12.1%",
      scoreChangeType: "up",
    },

    {
      id: 75,
      rank: "05",
      rankChange: "NEW",
      changeType: "up",
      name: "스타크래프트 리마스터2",
      image: img(1),
      rating: 4.6,
      score: "16,543",
      scoreChange: "+7.5%",
      scoreChangeType: "up",
    },

    {
      id: 76,
      rank: "06",
      rankChange: "NEW",
      changeType: "up",
      name: "테라 클래식",
      image: img(4),
      rating: 3.8,
      score: "13,210",
      scoreChange: "+4.2%",
      scoreChangeType: "up",
    },
  ];

  // ====== P2E게임 데이터 ======

  const p2e쌀먹: RankItem[] = [
    {
      id: 81,
      rank: "01",
      rankChange: "2",
      changeType: "up",
      name: "Axie Infinity",
      image: img(4),
      rating: 4.3,
      score: "15,892",
      scoreChange: "+18.5%",
      scoreChangeType: "up",
    },

    {
      id: 82,
      rank: "02",
      rankChange: "1",
      changeType: "down",
      name: "STEPN",
      image: img(1),
      rating: 4.1,
      score: "14,567",
      scoreChange: "-3.2%",
      scoreChangeType: "down",
    },

    {
      id: 83,
      rank: "03",
      rankChange: "1",
      changeType: "up",
      name: "The Sandbox",
      image: img(2),
      rating: 4.0,
      score: "13,245",
      scoreChange: "+7.8%",
      scoreChangeType: "up",
    },

    {
      id: 84,
      rank: "04",
      rankChange: "2",
      changeType: "down",
      name: "Illuvium",
      image: img(3),
      rating: 4.4,
      score: "12,890",
      scoreChange: "-12.1%",
      scoreChangeType: "down",
    },

    {
      id: 85,
      rank: "05",
      rankChange: "-",
      changeType: "same",
      name: "Gods Unchained",
      image: img(5),
      rating: 4.2,
      score: "11,456",
      scoreChange: "+2.3%",
      scoreChangeType: "up",
    },

    {
      id: 86,
      rank: "06",
      rankChange: "3",
      changeType: "up",
      name: "Star Atlas",
      image: img(6),
      rating: 3.9,
      score: "10,234",
      scoreChange: "+25.7%",
      scoreChangeType: "up",
    },

    {
      id: 87,
      rank: "07",
      rankChange: "1",
      changeType: "down",
      name: "Splinterlands",
      image: img(0),
      rating: 3.8,
      score: "9,876",
      scoreChange: "-5.6%",
      scoreChangeType: "down",
    },

    {
      id: 88,
      rank: "08",
      rankChange: "-",
      changeType: "same",
      name: "Decentraland",
      image: img(7),
      rating: 3.7,
      score: "9,123",
      scoreChange: "+1.1%",
      scoreChangeType: "up",
    },

    {
      id: 89,
      rank: "09",
      rankChange: "2",
      changeType: "up",
      name: "Gala Games",
      image: img(4),
      rating: 4.0,
      score: "8,567",
      scoreChange: "+14.3%",
      scoreChangeType: "up",
    },

    {
      id: 90,
      rank: "10",
      rankChange: "1",
      changeType: "down",
      name: "My Neighbor Alice",
      image: img(1),
      rating: 3.6,
      score: "7,890",
      scoreChange: "-8.9%",
      scoreChangeType: "down",
    },
  ];

  const p2e구글: RankItem[] = [
    {
      id: 91,
      rank: "01",
      rankChange: "1",
      changeType: "up",
      name: "Axie Infinity",
      image: img(4),
      rating: 4.3,
      score: "14,892",
      scoreChange: "+9.4%",
      scoreChangeType: "up",
    },

    {
      id: 92,
      rank: "02",
      rankChange: "1",
      changeType: "down",
      name: "The Sandbox",
      image: img(2),
      rating: 4.0,
      score: "13,567",
      scoreChange: "-5.8%",
      scoreChangeType: "down",
    },

    {
      id: 93,
      rank: "03",
      rankChange: "-",
      changeType: "same",
      name: "STEPN",
      image: img(1),
      rating: 4.1,
      score: "12,345",
      scoreChange: "+1.2%",
      scoreChangeType: "up",
    },

    {
      id: 94,
      rank: "04",
      rankChange: "2",
      changeType: "up",
      name: "Gods Unchained",
      image: img(5),
      rating: 4.2,
      score: "11,234",
      scoreChange: "+14.6%",
      scoreChangeType: "up",
    },

    {
      id: 95,
      rank: "05",
      rankChange: "1",
      changeType: "down",
      name: "Illuvium",
      image: img(3),
      rating: 4.4,
      score: "10,567",
      scoreChange: "-7.3%",
      scoreChangeType: "down",
    },

    {
      id: 96,
      rank: "06",
      rankChange: "3",
      changeType: "up",
      name: "Star Atlas",
      image: img(6),
      rating: 3.9,
      score: "9,876",
      scoreChange: "+21.5%",
      scoreChangeType: "up",
    },

    {
      id: 97,
      rank: "07",
      rankChange: "-",
      changeType: "same",
      name: "Decentraland",
      image: img(7),
      rating: 3.7,
      score: "8,654",
      scoreChange: "+0.3%",
      scoreChangeType: "up",
    },

    {
      id: 98,
      rank: "08",
      rankChange: "2",
      changeType: "down",
      name: "Splinterlands",
      image: img(0),
      rating: 3.8,
      score: "7,890",
      scoreChange: "-12.4%",
      scoreChangeType: "down",
    },

    {
      id: 99,
      rank: "09",
      rankChange: "1",
      changeType: "up",
      name: "Gala Games",
      image: img(4),
      rating: 4.0,
      score: "7,234",
      scoreChange: "+8.1%",
      scoreChangeType: "up",
    },

    {
      id: 100,
      rank: "10",
      rankChange: "-",
      changeType: "same",
      name: "My Neighbor Alice",
      image: img(1),
      rating: 3.6,
      score: "6,543",
      scoreChange: "+0.7%",
      scoreChangeType: "up",
    },
  ];

  const p2e핫한: RankItem[] = [
    {
      id: 101,
      rank: "01",
      rankChange: "6",
      changeType: "up",
      name: "Star Atlas",
      image: img(6),
      rating: 3.9,
      score: "15,432",
      scoreChange: "+58.2%",
      scoreChangeType: "up",
    },

    {
      id: 102,
      rank: "02",
      rankChange: "3",
      changeType: "up",
      name: "Axie Infinity",
      image: img(4),
      rating: 4.3,
      score: "14,876",
      scoreChange: "+32.4%",
      scoreChangeType: "up",
    },

    {
      id: 103,
      rank: "03",
      rankChange: "1",
      changeType: "down",
      name: "STEPN",
      image: img(1),
      rating: 4.1,
      score: "13,543",
      scoreChange: "-5.1%",
      scoreChangeType: "down",
    },

    {
      id: 104,
      rank: "04",
      rankChange: "-",
      changeType: "same",
      name: "The Sandbox",
      image: img(2),
      rating: 4.0,
      score: "12,198",
      scoreChange: "+3.7%",
      scoreChangeType: "up",
    },

    {
      id: 105,
      rank: "05",
      rankChange: "4",
      changeType: "up",
      name: "Gala Games",
      image: img(4),
      rating: 4.0,
      score: "11,567",
      scoreChange: "+41.8%",
      scoreChangeType: "up",
    },

    {
      id: 106,
      rank: "06",
      rankChange: "2",
      changeType: "down",
      name: "Gods Unchained",
      image: img(5),
      rating: 4.2,
      score: "10,234",
      scoreChange: "-11.3%",
      scoreChangeType: "down",
    },

    {
      id: 107,
      rank: "07",
      rankChange: "1",
      changeType: "up",
      name: "Illuvium",
      image: img(3),
      rating: 4.4,
      score: "9,456",
      scoreChange: "+8.9%",
      scoreChangeType: "up",
    },

    {
      id: 108,
      rank: "08",
      rankChange: "3",
      changeType: "down",
      name: "Decentraland",
      image: img(7),
      rating: 3.7,
      score: "8,321",
      scoreChange: "-18.5%",
      scoreChangeType: "down",
    },

    {
      id: 109,
      rank: "09",
      rankChange: "-",
      changeType: "same",
      name: "Splinterlands",
      image: img(0),
      rating: 3.8,
      score: "7,654",
      scoreChange: "+0.4%",
      scoreChangeType: "up",
    },

    {
      id: 110,
      rank: "10",
      rankChange: "2",
      changeType: "up",
      name: "My Neighbor Alice",
      image: img(1),
      rating: 3.6,
      score: "6,987",
      scoreChange: "+15.6%",
      scoreChangeType: "up",
    },
  ];

  const p2e신규: RankItem[] = [
    {
      id: 111,
      rank: "01",
      rankChange: "NEW",
      changeType: "up",
      name: "Star Atlas Beta",
      image: img(6),
      rating: 3.9,
      score: "12,345",
      scoreChange: "+34.5%",
      scoreChangeType: "up",
    },

    {
      id: 112,
      rank: "02",
      rankChange: "NEW",
      changeType: "up",
      name: "Pixels v2",
      image: img(2),
      rating: 4.1,
      score: "10,876",
      scoreChange: "+21.3%",
      scoreChangeType: "up",
    },

    {
      id: 113,
      rank: "03",
      rankChange: "NEW",
      changeType: "up",
      name: "Big Time Season2",
      image: img(5),
      rating: 4.0,
      score: "9,234",
      scoreChange: "+12.8%",
      scoreChangeType: "up",
    },

    {
      id: 114,
      rank: "04",
      rankChange: "NEW",
      changeType: "up",
      name: "Ember Sword",
      image: img(0),
      rating: 3.8,
      score: "7,654",
      scoreChange: "+8.1%",
      scoreChangeType: "up",
    },

    {
      id: 115,
      rank: "05",
      rankChange: "NEW",
      changeType: "up",
      name: "DeFi Kingdoms 2",
      image: img(7),
      rating: 4.2,
      score: "6,432",
      scoreChange: "+5.7%",
      scoreChangeType: "up",
    },

    {
      id: 116,
      rank: "06",
      rankChange: "NEW",
      changeType: "up",
      name: "Thetan Arena 2",
      image: img(4),
      rating: 3.7,
      score: "5,198",
      scoreChange: "+3.2%",
      scoreChangeType: "up",
    },
  ];

  // ====== 데이터 매핑 ======

  const dataMap: Record<string, Record<string, RankItem[]>> = {
    모바일게임: {
      소셜점수: mobile쌀먹,
      구글순위: mobile구글,
      지금핫한: mobile핫한,
      신규게임: mobile신규,
    },

    PC게임: {
      소셜점수: pc쌀먹,
      PC방순위: pc구글,
      지금핫한: pc핫한,
      신규게임: pc신규,
    },

    P2E게임: {
      소셜점수: p2e쌀먹,
      코인순위: p2e구글,
      지금핫한: p2e핫한,
      신규게임: p2e신규,
    },
  };

  const rankings = dataMap[activeTab]?.[activeFilter] ?? [];

  return (
    <>
      {/* 상단 탭 */}

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
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 필터 버튼 */}

      <div className="bg-white px-4 py-3">
        <Swiper
          modules={[]}
          spaceBetween={8}
          slidesPerView="auto"
          className="w-full"
        >
          {filters.map((filter) => (
            <SwiperSlide key={filter} className="!w-auto">
              <button
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeFilter === filter
                    ? "text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
                style={
                  activeFilter === filter ? { backgroundColor: "#72C2FF" } : {}
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 장르 & 날짜 */}

      <div className="bg-white px-4 py-2 flex items-center justify-between">
        <div className="relative">
          <button
            className="text-sm text-gray-600 flex items-center gap-1"
            onClick={() => setShowGenrePopup(!showGenrePopup)}
          >
            장르{selectedGenre !== "전체" ? `: ${selectedGenre}` : ""}{" "}
            <span>∨</span>
          </button>

          {showGenrePopup && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[150px] max-h-64 overflow-y-auto">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                    selectedGenre === genre ? "font-medium" : "text-gray-700"
                  }`}
                  style={selectedGenre === genre ? { color: "#72C2FF" } : {}}
                  onClick={() => {
                    setSelectedGenre(genre);
                    setShowGenrePopup(false);
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>2025.01.18 10:40 기준</span>

          <span className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center text-[10px]">
            ?
          </span>
        </div>
      </div>

      {/* 순위 리스트 */}

      <div className="px-1 py-1 space-y-1">
        {rankings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-2 shadow-sm"
            onClick={() => setCurrentPage("samurai-review")}
          >
            <div className="flex items-center">
              {/* 순위 */}

              <div className="w-10 text-center">
                <p className="text-lg font-bold text-gray-900">{item.rank}</p>

                <p
                  className={`text-xs ${
                    item.changeType === "up"
                      ? "text-red-500"
                      : item.changeType === "down"
                        ? "text-blue-500"
                        : "text-gray-400"
                  }`}
                >
                  {item.changeType === "up" && "▲"}

                  {item.changeType === "down" && "▼"}

                  {item.rankChange}
                </p>
              </div>

              {/* 게임 이미지 */}

              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-xl object-cover mx-3"
              />

              {/* 게임 정보 */}

              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{item.name}</p>

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-400 text-sm">★</span>

                  <span className="text-sm text-gray-700">{item.rating}</span>
                </div>
              </div>

              {/* 점수 */}

              <div className="text-left relative">
                <svg
                  className="absolute right-0 top-1 w-16 h-10 opacity-30"
                  viewBox="0 0 60 30"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,15 L10,14 L20,16 L30,12 L40,10 L50,13 L60,15"
                    fill="none"
                    stroke="#72C2FF"
                    strokeWidth="1.5"
                  />
                </svg>

                <p className="text-xs text-gray-400">소셜점수</p>

                <p className="font-bold text-gray-900">{item.score}</p>

                <p
                  className={`text-xs ${
                    item.scoreChangeType === "down"
                      ? "text-blue-500"
                      : item.scoreChangeType === "up"
                        ? "text-red-500"
                        : "text-gray-400"
                  }`}
                >
                  {item.scoreChange}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
