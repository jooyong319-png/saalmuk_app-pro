import { ToastProvider } from "../components/community/Toast";
import AllChannelsContent from "../components/community/AllChannelsContent";
import RecentChannelsContent from "../components/community/RecentChannelsContent";
import FollowingContent from "../components/community/FollowingContent";
import HotContent from "../components/community/HotContent";

// ===== 애니메이션 스타일 =====
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-fadeUp { animation: fadeUp 0.4s ease-out both; }
  .animate-slideUp { animation: slideUp 0.25s ease-out both; }
  .animate-popIn { animation: popIn 0.2s ease-out both; }
  .animate-spin { animation: spin 1s linear infinite; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
`;

// ===== Props =====
interface CommunityProps {
  setCurrentPage: (page: string) => void;
  communityNav: string;
}

// ===== 메인 Content 라우터 =====
function CommunityContent({ setCurrentPage, communityNav }: CommunityProps) {
  switch (communityNav) {
    case "all":
      return <AllChannelsContent setCurrentPage={setCurrentPage} />;
    case "recent":
      return <RecentChannelsContent setCurrentPage={setCurrentPage} />;
    case "hot":
      return <HotContent setCurrentPage={setCurrentPage} />;
    case "following":
    case "interest":
    default:
      return <FollowingContent setCurrentPage={setCurrentPage} />;
  }
}

// ===== Export =====
export default function Community({
  setCurrentPage,
  communityNav,
}: CommunityProps) {
  return (
    <ToastProvider>
      <style>{animationStyles}</style>
      <CommunityContent
        setCurrentPage={setCurrentPage}
        communityNav={communityNav}
      />
    </ToastProvider>
  );
}
