import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

// ─── 아이콘 정의 ───
export const MenuIcons = {
  share: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  ),
  bookmark: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  ),
  block: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  ),
  report: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  follow: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    />
  ),
  edit: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  ),
  delete: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  ),
  copy: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  ),
  hide: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  ),
};

// ─── 타입 정의 ───
export type IconType = keyof typeof MenuIcons;

export interface MenuItem {
  icon: IconType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  items: MenuItem[];
  size?: "sm" | "md" | "lg";
  position?: "left" | "right";
  zIndex?: number;
  stopPropagation?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

// ─── 사이즈 설정 ───
const sizeConfig = {
  sm: {
    button: "p-0.5",
    icon: "w-3.5 h-3.5",
    menuIcon: "w-3 h-3",
    menuItem: "px-3 py-1.5 text-[12px] gap-2",
    menuWidth: 120,
  },
  md: {
    button: "p-1",
    icon: "w-4 h-4",
    menuIcon: "w-3.5 h-3.5",
    menuItem: "px-4 py-2 text-[13px] gap-2.5",
    menuWidth: 130,
  },
  lg: {
    button: "p-1.5",
    icon: "w-5 h-5",
    menuIcon: "w-4 h-4",
    menuItem: "px-4 py-2.5 text-sm gap-3",
    menuWidth: 140,
  },
};

// ─── 컴포넌트 ───
export default function DropdownMenu({
  items,
  size = "md",
  position = "right",
  zIndex = 9999,
  stopPropagation = false,
  onOpenChange,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const config = sizeConfig[size];

  const updateOpen = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  // 메뉴 위치 계산
  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = config.menuWidth;
    const menuHeight = items.length * 44 + 16;

    // 버튼 바로 아래, 오른쪽 정렬
    let top = rect.bottom + 4;
    let left = rect.right - menuWidth;

    if (position === "left") {
      left = rect.left;
    }

    // 화면 아래 공간 부족 시 위로
    if (top + menuHeight > window.innerHeight - 20) {
      top = rect.top - menuHeight - 4;
    }

    // 왼쪽 벗어남 방지
    if (left < 10) {
      left = 10;
    }

    // 오른쪽 벗어남 방지
    if (left + menuWidth > window.innerWidth - 10) {
      left = window.innerWidth - menuWidth - 10;
    }

    setMenuStyle({
      position: "fixed",
      top,
      left,
      zIndex,
    });
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        updateOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // 스크롤/리사이즈 시 메뉴 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      updateOpen(false);
    };

    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();
    if (!isOpen) {
      calculatePosition();
    }
    updateOpen(!isOpen);
  };

  const handleItemClick = (e: React.MouseEvent, onClick: () => void) => {
    if (stopPropagation) e.stopPropagation();
    onClick();
    updateOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();
    updateOpen(false);
  };

  // 메뉴 포탈 렌더링
  const menuPortal = isOpen
    ? createPortal(
        <>
          {/* 백드롭 */}
          <div
            className="fixed inset-0"
            style={{ zIndex: zIndex - 1 }}
            onClick={handleBackdropClick}
          />

          {/* 메뉴 */}
          <div
            ref={menuRef}
            className="bg-white rounded-xl shadow-lg border border-gray-100 py-2"
            style={{ ...menuStyle, minWidth: config.menuWidth }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center ${config.menuItem} text-gray-700 hover:bg-gray-50 ${
                  item.disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={(e) =>
                  !item.disabled && handleItemClick(e, item.onClick)
                }
                disabled={item.disabled}
              >
                <svg
                  className={config.menuIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {MenuIcons[item.icon]}
                </svg>
                {item.label}
              </button>
            ))}
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <div className="relative shrink-0">
      {/* 트리거 버튼 */}
      <button
        ref={buttonRef}
        className={`${config.button} text-gray-300 hover:text-gray-500 transition-colors`}
        onClick={handleToggle}
      >
        <svg className={config.icon} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>

      {menuPortal}
    </div>
  );
}

// ─── 프리셋 메뉴 ───
export function getPostMenuItems(handlers: {
  onShare?: () => void;
  onSave?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
}): MenuItem[] {
  const items: MenuItem[] = [];
  if (handlers.onShare)
    items.push({ icon: "share", label: "공유", onClick: handlers.onShare });
  if (handlers.onSave)
    items.push({ icon: "bookmark", label: "저장", onClick: handlers.onSave });
  if (handlers.onBlock)
    items.push({ icon: "block", label: "차단", onClick: handlers.onBlock });
  if (handlers.onReport)
    items.push({ icon: "report", label: "신고", onClick: handlers.onReport });
  return items;
}

export function getCommentMenuItems(handlers: {
  onFollow?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
  isFollowed?: boolean;
}): MenuItem[] {
  const items: MenuItem[] = [];
  if (handlers.onFollow) {
    items.push({
      icon: "follow",
      label: handlers.isFollowed ? "팔로우 취소" : "팔로우",
      onClick: handlers.onFollow,
    });
  }
  if (handlers.onBlock)
    items.push({ icon: "block", label: "차단", onClick: handlers.onBlock });
  if (handlers.onReport)
    items.push({ icon: "report", label: "신고", onClick: handlers.onReport });
  return items;
}

export function getMyContentMenuItems(handlers: {
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
}): MenuItem[] {
  const items: MenuItem[] = [];
  if (handlers.onShare)
    items.push({ icon: "share", label: "공유", onClick: handlers.onShare });
  if (handlers.onEdit)
    items.push({ icon: "edit", label: "수정", onClick: handlers.onEdit });
  if (handlers.onDelete)
    items.push({ icon: "delete", label: "삭제", onClick: handlers.onDelete });
  return items;
}
