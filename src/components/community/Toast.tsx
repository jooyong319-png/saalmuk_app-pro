import { useState, createContext, useContext, useCallback, type ReactNode } from "react";
import type { ToastType, ToastItem } from "./types";

// ===== Context =====
interface ToastContextType {
  showToast: (message: string, options?: { type?: ToastType; onUndo?: () => void }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) return { showToast: () => {} };
  return context;
}

// ===== Toast Icon =====
function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case "link":
      return (
        <svg className="w-5 h-5 text-[#72C2FF]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      );
    case "block":
      return (
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      );
  }
}

// ===== Toast Provider =====
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, options?: { type?: ToastType; onUndo?: () => void }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type: options?.type || "success", onUndo: options?.onUndo }]);
    setTimeout(() => removeToast(id), 3000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col gap-3 z-[9999]">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="px-4 py-3.5 rounded-2xl bg-gray-900/95 backdrop-blur-sm shadow-xl min-w-[280px] max-w-[360px]"
              style={{ animation: "slideUp 0.25s ease-out" }}
            >
              <div className="flex items-center gap-3">
                <ToastIcon type={toast.type} />
                <span className="flex-1 text-[14px] text-white leading-snug">{toast.message}</span>
                {toast.type === "block" && toast.onUndo && (
                  <button
                    onClick={() => {
                      toast.onUndo?.();
                      removeToast(toast.id);
                    }}
                    className="px-3 py-1 text-[13px] font-medium text-gray-400"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

// ===== 토스트 메시지 상수 =====
export const TOAST_MESSAGES = {
  LINK_COPIED: "링크를 복사했어요",
  POST_SAVED: (name: string) => `${name}님의 글을 저장했어요.`,
  USER_BLOCKED: (name: string) => `${name}님을 차단했어요`,
  REPORTED: "신고가 접수되었습니다",
  FOLLOW: (name: string) => `${name}님이 새 글을 올리면 알려드릴게요`,
  UNFOLLOW: (name: string) => `${name}님 팔로우를 취소했어요`,
  GIFT_SENT: "선물을 보냈습니다",
};
