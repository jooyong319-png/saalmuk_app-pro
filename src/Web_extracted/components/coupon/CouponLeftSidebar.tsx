// @ts-nocheck
import { useState, useCallback } from "react";
import { ChevronDown, ChevronRight, Tag, Pin } from "lucide-react";

const menuStructure = [
  {
    id: "할인쿠폰",
    label: "할인쿠폰",
    icon: <Tag size={18} />,
    subMenus: [
      { id: "전체 쿠폰", label: "전체 쿠폰" },
      { id: "구매내역", label: "구매내역" },
      { id: "구매방법", label: "구매방법" },
    ],
  },
  {
    id: "고정쿠폰",
    label: "고정쿠폰",
    icon: <Pin size={18} />,
  },
];

interface Props {
  mainTab: string;
  onMainTabChange: (tab: string) => void;
  subNav: string;
  onSubNavChange: (nav: string) => void;
}

export default function CouponLeftSidebar({
  mainTab,
  onMainTabChange,
  subNav,
  onSubNavChange,
}: Props) {
  const [expandedMenus, setExpandedMenus] = useState(["할인쿠폰"]);

  const toggleExpand = useCallback((menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  }, []);

  const handleMenuClick = useCallback(
    (menu: (typeof menuStructure)[0]) => {
      if (menu.subMenus) {
        toggleExpand(menu.id);
        if (!expandedMenus.includes(menu.id)) {
          onMainTabChange(menu.id);
          onSubNavChange(menu.subMenus[0].id);
        }
      } else {
        onMainTabChange(menu.id);
        onSubNavChange("전체");
      }
    },
    [expandedMenus, onMainTabChange, onSubNavChange, toggleExpand],
  );

  return (
    <nav className="flex flex-col gap-0.5">
      {menuStructure.map((menu) => (
        <div key={menu.id}>
          <button
            onClick={() => handleMenuClick(menu)}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-[15px] font-medium rounded-lg transition-colors ${
              mainTab === menu.id && !menu.subMenus
                ? "text-[#1A1A2E] font-bold bg-gray-100"
                : mainTab === menu.id
                  ? "text-[#1A1A2E] font-bold"
                  : "text-gray-500 hover:bg-gray-100 hover:text-[#1A1A2E]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span
                className={
                  mainTab === menu.id ? "text-[#72C2FF]" : "text-gray-400"
                }
              >
                {menu.icon}
              </span>
              {menu.label}
            </span>
            {menu.subMenus && (
              <span className="text-gray-400">
                {expandedMenus.includes(menu.id) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
          </button>

          {menu.subMenus && expandedMenus.includes(menu.id) && (
            <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
              {menu.subMenus.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    onMainTabChange(menu.id);
                    onSubNavChange(sub.id);
                  }}
                  className={`px-4 py-2 text-left text-[14px] rounded-lg transition-colors ${
                    mainTab === menu.id && subNav === sub.id
                      ? "text-[#72C2FF] font-semibold bg-[#72C2FF]/10"
                      : "text-gray-500 hover:bg-gray-100 hover:text-[#1A1A2E]"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 px-2">
        <a
          href="#"
          className="block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          onClick={(e) => e.preventDefault()}
        >
          <img
            src="https://i.pinimg.com/736x/e6/c7/77/e6c777962e2034c840f560b73a2f3a6b.jpg"
            alt="광고"
            className="w-full h-auto object-cover"
          />
        </a>
        <p className="text-[10px] text-gray-300 text-center mt-1">AD</p>
      </div>
    </nav>
  );
}
