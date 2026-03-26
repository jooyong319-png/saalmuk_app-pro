import { ToastProvider } from "../components/community/Toast";
import { FollowProvider } from "../components/community/FollowContext";
import AllChannelsContent from "../components/community/AllChannelsContent";
import FeedContent from "../components/community/FeedContent";
import RecentChannelsContent from "../components/community/RecentChannelsContent";
import CommunityRankingContent from "../components/community/CommunityRankingContent";

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
    case "feed":
      return <FeedContent setCurrentPage={setCurrentPage} />;
    case "interest":
      return <RecentChannelsContent setCurrentPage={setCurrentPage} />;
    case "ranking":
      return <CommunityRankingContent setCurrentPage={setCurrentPage} />;
    default:
      return <FeedContent setCurrentPage={setCurrentPage} />;
  }
}

// ===== Export =====
export default function Community({
  setCurrentPage,
  communityNav,
}: CommunityProps) {
  return (
    <ToastProvider>
      <FollowProvider>
        <style>{animationStyles}</style>
        <CommunityContent
          setCurrentPage={setCurrentPage}
          communityNav={communityNav}
        />
      </FollowProvider>
    </ToastProvider>
  );
}
