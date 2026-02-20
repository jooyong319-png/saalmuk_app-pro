// @ts-nocheck
import { useState, useEffect } from "react";

export default function Settings({
  setCurrentPage,
  goBack,
  onLogout,
}: {
  setCurrentPage: (page: string) => void;
  goBack?: () => void;
  onLogout?: () => void;
}) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  
  // 설정 상태
  const [pushEnabled, setPushEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [nightPushEnabled, setNightPushEnabled] = useState(false);

  // 모달 뒤로가기
  useEffect(() => {
    if (showLogoutConfirm || showWithdrawConfirm) {
      window.history.pushState({ modal: true }, "");
      const handlePopState = () => {
        setShowLogoutConfirm(false);
        setShowWithdrawConfirm(false);
      };
      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [showLogoutConfirm, showWithdrawConfirm]);

  const settingsGroups = [
    {
      title: "알림 설정",
      items: [
        { 
          label: "푸시 알림", 
          type: "toggle", 
          value: pushEnabled, 
          onChange: () => setPushEnabled(!pushEnabled),
          description: "이벤트, 쿠폰 등 주요 알림"
        },
        { 
          label: "마케팅 알림", 
          type: "toggle", 
          value: marketingEnabled, 
          onChange: () => setMarketingEnabled(!marketingEnabled),
          description: "혜택 및 프로모션 정보"
        },
        { 
          label: "야간 알림 (21~08시)", 
          type: "toggle", 
          value: nightPushEnabled, 
          onChange: () => setNightPushEnabled(!nightPushEnabled),
          description: "야간 시간대 알림 허용"
        },
      ]
    },
    {
      title: "계정",
      items: [
        { label: "계좌 관리", type: "link", page: "accountManage" },
        { label: "로그인 정보", type: "link", page: "loginInfo" },
      ]
    },
    {
      title: "서비스",
      items: [
        { label: "공지사항", type: "link", page: "notice" },
        { label: "자주 묻는 질문", type: "link", page: "faq" },
        { label: "1:1 문의", type: "link", page: "inquiry" },
      ]
    },
    {
      title: "약관 및 정책",
      items: [
        { label: "이용약관", type: "link", page: "terms" },
        { label: "개인정보 처리방침", type: "link", page: "privacy" },
        { label: "마케팅 정보 수신 동의", type: "link", page: "marketing" },
      ]
    },
    {
      title: "앱 정보",
      items: [
        { label: "앱 버전", type: "info", value: "1.0.0" },
        { label: "오픈소스 라이선스", type: "link", page: "license" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={goBack} className="w-8 h-8 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-bold text-gray-900">설정</span>
        </div>
      </header>

      {/* 설정 그룹들 */}
      <div className="p-4 space-y-4">
        {settingsGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="bg-white rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">{group.title}</h3>
            </div>
            <div>
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  {item.type === "toggle" ? (
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <button
                        onClick={item.onChange}
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          item.value ? "bg-[#72C2FF]" : "bg-gray-200"
                        }`}
                      >
                        <div 
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            item.value ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ) : item.type === "link" ? (
                    <button
                      onClick={() => setCurrentPage(item.page || "")}
                      className="w-full px-4 py-3 flex items-center justify-between active:bg-gray-50"
                    >
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : item.type === "info" ? (
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className="text-sm text-gray-400">{item.value}</span>
                    </div>
                  ) : null}
                  {itemIdx < group.items.length - 1 && (
                    <div className="mx-4 border-b border-gray-50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 로그아웃 / 회원탈퇴 */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 active:bg-gray-50"
          >
            로그아웃
          </button>
          <div className="mx-4 border-b border-gray-50" />
          <button
            onClick={() => setShowWithdrawConfirm(true)}
            className="w-full px-4 py-3 text-left text-sm text-red-500 active:bg-gray-50"
          >
            회원탈퇴
          </button>
        </div>
      </div>

      {/* 로그아웃 확인 모달 */}
      {showLogoutConfirm && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => window.history.back()}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl overflow-hidden"
            style={{ animation: "scaleIn 0.2s ease-out" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">로그아웃</h3>
              <p className="text-sm text-gray-500">정말 로그아웃 하시겠습니까?</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => window.history.back()}
                className="flex-1 py-3 text-sm font-medium text-gray-500"
              >
                취소
              </button>
              <div className="w-px bg-gray-100" />
              <button
                onClick={() => {
                  onLogout?.();
                  setCurrentPage("home");
                }}
                className="flex-1 py-3 text-sm font-medium text-red-500"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 확인 모달 */}
      {showWithdrawConfirm && (
        <div 
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={() => window.history.back()}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl overflow-hidden"
            style={{ animation: "scaleIn 0.2s ease-out" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">회원 탈퇴</h3>
              <p className="text-sm text-gray-500 mb-2">정말 탈퇴하시겠습니까?</p>
              <p className="text-xs text-red-500">탈퇴 시 모든 포인트와 쿠폰이 소멸됩니다.</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button
                onClick={() => window.history.back()}
                className="flex-1 py-3 text-sm font-medium text-gray-500"
              >
                취소
              </button>
              <div className="w-px bg-gray-100" />
              <button
                onClick={() => {
                  onLogout?.();
                  setCurrentPage("home");
                }}
                className="flex-1 py-3 text-sm font-medium text-red-500"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
