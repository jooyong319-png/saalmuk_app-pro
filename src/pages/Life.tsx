import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Life({
  setCurrentPage,
}: {
  setCurrentPage: (page: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("전체");
  const [currentMonth, setCurrentMonth] = useState("2025년12월");
  const [currentBanner, setCurrentBanner] = useState(0);

  const tabs = ["전체", "사전예약", "신규서버", "출시/이벤트"];

  const weekDays = [
    { day: "화", date: 16, count: 6 },
    { day: "수", date: 17, count: 6 },
    { day: "목", date: 18, count: 3, active: true },
    { day: "금", date: 19, count: 3 },
    { day: "토", date: 20, count: 3 },
  ];

  const banners = [
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
    "https://edge.ssalmuk.com/editorImage/b5e3785c3bd54e729d09eb41e5758fc3.jpg",
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
    "https://edge.ssalmuk.com/editorImage/b5e3785c3bd54e729d09eb41e5758fc3.jpg",
    "https://edge.ssalmuk.com/editorImage/405612ee2de64d6dbe7ef3f04d952fd9.png",
    "https://edge.ssalmuk.com/editorImage/8cb75d54e8ff4f1991c652ef2991e6b4.png",
  ];

  const events = [
    {
      id: 1,
      title: "사무라이 쇼다운R",
      image:
        "https://edge.ssalmuk.com/editorImage/935049a546e744a98c0c77e1d498ae18.png",
      tags: ["진행중", "추천"],
      reward: "동료 상인 마차 x1, 크리스탈 x9,999",
      cash: 200,
      endDate: "7월 8일",
      disabled: false,
      isPreOrder: false,
      pageId: "eventDetail", // 이동할 페이지 ID
    },
    {
      id: 2,
      title: "메이플스토리 월드",
      image:
        "https://edge.ssalmuk.com/editorImage/7fd53849b50948a2be3006fafd194306.jpg",
      tags: ["진행중"],
      reward: "메소 100,000, 경험치 2배 쿠폰",
      cash: 300,
      endDate: "7월 15일",
      disabled: false,
      isPreOrder: true,
      pageId: "eventDetail", // 이동할 페이지 ID
    },
    {
      id: 3,
      title: "아이온2",
      image:
        "https://edge.ssalmuk.com/editorImage/40e87f86357e487eb75dc24d3055b21f.png",
      tags: ["마감"],
      reward: "날개 장식, 펫 소환권 x1",
      cash: 150,
      endDate: "7월 20일",
      disabled: true,
      isPreOrder: false,
      pageId: "eventDetail", // 이동할 페이지 ID
    },
  ];

  return (
    <>
      {/* 상단 배너 슬라이더 */}
      <div className="py-1">
        <Swiper
          modules={[Pagination]}
          spaceBetween={8}
          slidesPerView={2}
          centeredSlides={false}
          pagination={{ clickable: true }}
          className="w-full px-4 pb-6"
        >
          {banners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={banner}
                alt="배너"
                className="w-full h-32 rounded-xl object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 탭 + 캘린더 */}
      <div className="bg-white rounded-2xl mt-2">
        {/* 탭 메뉴 */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-sm ${
                activeTab === tab
                  ? "text-gray-900 font-bold border-b-2 border-gray-900"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 월 선택 */}
        <div className="flex items-center justify-center gap-4 py-4">
          <button className="text-gray-400 text-xl">‹</button>
          <span className="font-bold text-gray-900">{currentMonth}</span>
          <button className="text-gray-400 text-xl">›</button>
        </div>

        {/* 주간 캘린더 */}
        <div className="flex justify-around px-4 pb-4">
          {weekDays.map((item) => (
            <div key={item.date} className="flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{item.day}</span>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  item.active ? "bg-blue-400 text-white" : "text-gray-700"
                }`}
              >
                {item.date}
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  item.active
                    ? "bg-blue-400 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 이벤트 카드 */}
      <div className="bg-white rounded-2xl mt-2 overflow-hidden">
        {events.map((event) => (
          <div key={event.id}>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded ${
                      tag === "진행중"
                        ? "bg-blue-400 text-white"
                        : tag === "마감"
                        ? "bg-gray-200 text-gray-500"
                        : "bg-yellow-400 text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-pink-500 text-sm ml-auto">
                  {event.endDate}
                </span>
              </div>
              <p className="text-xs text-gray-500">{event.reward}</p>
              <button
                className={`w-full mt-3 py-3 rounded-xl text-sm ${
                  event.disabled
                    ? "bg-gray-100 text-gray-400 border border-gray-200"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
                disabled={event.disabled}
                onClick={() => {
                  if (!event.disabled) {
                    setCurrentPage(event.pageId); // 페이지 이동
                  }
                }}
              >
                {event.disabled ? (
                  <span>마감되었습니다</span>
                ) : event.isPreOrder ? (
                  <span>사전예약 확인하기</span>
                ) : (
                  <>
                    게임 접속하면{" "}
                    <span className="text-blue-500 font-bold">
                      + {event.cash}포인트
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
