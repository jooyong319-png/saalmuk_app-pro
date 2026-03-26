// @ts-nocheck
const weeklyPopular = [
  {
    id: 1,
    name: "원신",
    image:
      "https://edge.ssalmuk.com/editorImage/c93c02b72a9b4a5780f4c66127ca262b.jpg",
    hot: true,
  },
  {
    id: 3,
    name: "엘타포스 모바일",
    image:
      "https://edge.ssalmuk.com/editorImage/d2008bde9fe541edabc5762d18b04e7b.png",
    hot: true,
  },
];

const weeklyList = [
  {
    id: 101,
    name: "로드나인 게임 쿠폰",
    image:
      "https://edge.ssalmuk.com/editorImage/145ef9589b8047169888e2f0c232b3d4.jpg",
  },
  {
    id: 102,
    name: "로드나인 게임쿠폰",
    image:
      "https://edge.ssalmuk.com/editorImage/145ef9589b8047169888e2f0c232b3d4.jpg",
  },
  {
    id: 103,
    name: "로스트아크 게임 쿠폰",
    image:
      "https://edge.ssalmuk.com/editorImage/3e9c8d4f13e64add96357bd7b4ebe62a.jpg",
  },
  {
    id: 104,
    name: "로드나인 게임 쿠폰",
    image:
      "https://edge.ssalmuk.com/editorImage/145ef9589b8047169888e2f0c232b3d4.jpg",
  },
  {
    id: 105,
    name: "로드나인 게임 쿠폰",
    image:
      "https://edge.ssalmuk.com/editorImage/145ef9589b8047169888e2f0c232b3d4.jpg",
  },
];

export default function CouponRightSidebar() {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
        <img
          src="https://i.pinimg.com/736x/3f/4b/99/3f4b99818ca444236c549c2ef8cd87de.jpg"
          alt="광고"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
          <span className="text-base">🔥</span>
          <h4 className="text-sm font-bold text-[#1A1A2E]">
            주간 인기 게임 쿠폰
          </h4>
        </div>

        <div className="p-3 grid grid-cols-2 gap-2 border-b border-gray-100">
          {weeklyPopular.map((item) => (
            <div key={item.id} className="relative cursor-pointer group">
              <div className="rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                HOT
              </div>
              <p className="text-[11px] text-gray-600 text-center mt-1 truncate">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          {weeklyList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2.5 px-3 py-2.5 border-b border-gray-50 last:border-none hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-gray-100"
              />
              <span className="text-[12px] text-gray-700 truncate flex-1">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
