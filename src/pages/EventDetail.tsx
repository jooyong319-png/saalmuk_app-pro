import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function EventDetail({
  setCurrentPage,
  goBack,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
}) {
  const [activeTab, setActiveTab] = useState("이벤트");
  const [isPressed, setIsPressed] = useState(false);
  const tabs = ["상세정보", "이벤트"];
  const [isLiked, setIsLiked] = useState(false);

  // 게임 상세 이미지
  const gameDetailImages = [
    "https://edge.ssalmuk.com/editorImage/4c4e153753e54d9c8b39c3a1178add61.jpg",
    "https://edge.ssalmuk.com/editorImage/421e015af40a4c4384f84b54d6e572e8.jpg",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-base font-medium">이벤트 상세보기</span>
          </button>
        </div>

        {/* 탭 메뉴 */}
        <div className="sticky top-12 z-40 bg-white px-4 pt-3">
          <div className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-sm ${
                  activeTab === tab
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 상세정보 탭 */}
      {activeTab === "상세정보" && (
        <div className="bg-gray-100">
          {/* 게임 프로필 */}
          <div className="bg-[#72C2FF] p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://edge.ssalmuk.com/editorImage/d440181df5c24521ab7a6b01628c9f90.jpg"
                alt="이벤트 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">드래곤 소드</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                onClick={() => setIsLiked(!isLiked)}
              >
                <svg
                  className={`w-5 h-5 ${
                    isLiked ? "text-red-500" : "text-white"
                  }`}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 이미지 슬라이드 + 게임 상세정보 묶음 */}
          <div className="p-4 bg-white rounded-2xl -mt-2 mx-1 shadow-m">
            {/* 이미지 슬라이드 */}
            <Swiper spaceBetween={8} slidesPerView={1.1} className="w-full">
              {gameDetailImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`배너 이미지`}
                      className="w-full h-44 object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 게임 상세정보 */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-gray-900 mb-3">
                게임 상세정보
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                <p>
                  신비한 힘을 지닌 한 소년이 오르비스 왕국으로 향하던 중, 사고로
                  낯선 땅에 도착합니다.
                </p>
                <p>
                  그곳에서 우연히 만난 개성 넘치는 용병들과 함께 얼떨결에 용병
                  생활을 시작하게 된 소년.
                </p>
                <p>
                  한편, 60년 만에 다시 나타난 드래곤의 위협 속에서 평온했던
                  오르비스 대륙은 서서히 어둠에 잠식되어 갑니다.
                </p>
                <p>
                  오랜 평화에 젖은 인간들은 과연 드래곤의 위협에 맞서 세계를
                  지켜낼 수 있을까요?
                </p>
                <p>
                  드래곤소드를 꿈꾸는 용병단이 펼치는 좌충우돌 모험담. 지금, 그
                  여정을 함께하세요!
                </p>
                <p className="pt-2">
                  드래곤을 처치한 자에게 주어지는 영광의 칭호 '드래곤소드',
                  드래곤소드를 꿈꾸는 영웅들의 이야기
                </p>
                <p className="pt-2">
                  ▶ 오픈월드로 만나는 모험과 낭만이 가득한 세계
                </p>
                <p>
                  오래 전, 여신의 희생으로 지켜낸 오르비스 대륙에서 고대 유적에
                  숨겨진 전설과 다시 깨어난 드래곤의 비밀을 파헤치세요! 가슴
                  뛰는 탐험, 끝없이 펼쳐지는 즐거움을 경험하세요!
                </p>
                <p className="pt-2">
                  ▶ 빠르고, 강렬하게! 스타일리시한 태그 액션 콤보
                </p>
                <p>
                  공중 콤보, 넉백, 다운 등 박력 넘치는 액션과 전략적인 스위칭
                  시스템이 만나 극대화된 역동적인 전투를 느껴볼 기회! 3명의
                  캐릭터를 실시간으로 전환하며, 다양한 스킬과 효과를 조합하세요!
                </p>
                <p className="pt-2">▶ 새로운 인연, 특별한 서사의 시작</p>
                <p>
                  별볼일 없던 밑바닥 용병단이 거대한 사건의 중심에 휘말렸다면?
                  여신과 마룡의 격돌에서 비롯된 갈등 속에서 다채로운 용병들과
                  인연을 맺고 승리의 역사를 기록하세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 이벤트 탭 */}
      {activeTab === "이벤트" && (
        <div>
          {/* 게임 프로필 */}
          <div className="bg-[#72C2FF] p-4 flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src="https://edge.ssalmuk.com/editorImage/d440181df5c24521ab7a6b01628c9f90.jpg"
                alt="이벤트 이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">드래곤 소드</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                onClick={() => setIsLiked(!isLiked)}
              >
                <svg
                  className={`w-5 h-5 ${
                    isLiked ? "text-red-500" : "text-white"
                  }`}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 이벤트 내용 */}
          <div className="p-4 bg-white rounded-2xl -mt-2 mx-1 shadow-m">
            {/* 이벤트 상단 정보 */}
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src="https://edge.ssalmuk.com/editorImage/4c4e153753e54d9c8b39c3a1178add61.jpg"
                  alt="이벤트 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">민팅정보</p>
                <h2 className="text-base font-bold text-gray-900 mt-1">
                  [드래곤 소드] 사전예약
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  2025.11.05 11:00 AM - 2026.01.21 02:00 PM
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-xs text-gray-400">2</span>
                </button>
                <button>
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 이벤트 이미지 및 내용 */}
            <div className="py-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src="https://edge.ssalmuk.com//editorImage/8494b09d534a4af1b59cb54e767e2cd3.jpg"
                  alt="이벤트 배너"
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-700 space-y-2">
                <p>출시 후 사전예약 보상 일괄 지급</p>
                <p className="mt-2">- 마력의 결정 X10</p>
                <p>- 50,000 골드</p>
              </div>
            </div>
          </div>

          {/* 이벤트 남은시간 */}
          <div className="p-4 bg-white rounded-2xl mt-2 mx-1 shadow-m">
            <p className="text-start text-gray-700 mb-10 mt-1 font-bold text-lg">
              이벤트 남은시간
            </p>
            <div className="flex items-center justify-center gap-1">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">06</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">일</span>
              </div>
              <span className="text-lg text-gray-300 mb-4">:</span>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">03</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">시</span>
              </div>
              <span className="text-lg text-gray-300 mb-4">:</span>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300  rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">32</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">분</span>
              </div>
              <span className="text-lg text-gray-300 mb-4">:</span>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-white">56</span>
                </div>
                <span className="text-xs text-gray-400 mt-1 block">초</span>
              </div>
            </div>

            {/* 참여 버튼 */}
            <button
              className={`w-full mt-4 py-3 rounded-full font-medium transition-colors ${
                isPressed
                  ? "bg-gray-200 border border-gray-300"
                  : "bg-white border border-[#72C2FF]"
              }`}
              style={{
                color: "#333",
                boxShadow: isPressed
                  ? "none"
                  : "0 6px 20px rgba(114, 194, 255, 0.5)",
              }}
              onClick={() => setIsPressed(!isPressed)}
            >
              {isPressed ? "이벤트 참여 완료" : "이벤트 참여하고 +200P 받기"}
            </button>

            {/* 주의사항 */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900 mb-2">주의사항</p>
              <div className="text-xs text-gray-500 leading-relaxed space-y-2">
                <p>
                  이벤트 기간에서 1초라도 지날 경우 해당 이벤트는 종료되어
                  이벤트 참여가 어렵습니다.
                </p>
                <p>
                  쌀먹닷컴에서는 이벤트 등록하기 등 서비스 제공 기능을 활용하여
                  이벤트 정보를 공유하고 있습니다. 이벤트별 세부 정보는
                  쌀먹닷컴이 제공하지 않으며 세부 정보는 바뀔 수 있고, 이에 대한
                  책임은 쌀먹닷컴에서 지지 않습니다.
                </p>
                <p>
                  일정에 대한 세부 내용이 달라진 경우, 수정요청하여 주시면
                  빠르게 변경하여 제공하도록 하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
