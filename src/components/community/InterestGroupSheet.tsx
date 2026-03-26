import { useState } from "react";
import { useInterest, InterestChannel } from "./InterestContext";
import { useToast, TOAST_MESSAGES } from "./Toast";
import AddGroupModal from "./AddGroupModal";

interface InterestGroupSheetProps {
  channel: InterestChannel;
  onClose: () => void;
}

export default function InterestGroupSheet({
  channel,
  onClose,
}: InterestGroupSheetProps) {
  const { groups, getChannelGroup, changeGroup } = useInterest();
  const { showToast } = useToast();
  const currentGroup = getChannelGroup(channel.id);
  const [selectedGroupId, setSelectedGroupId] = useState(
    currentGroup?.id || "default",
  );

  // AddGroupModal 상태
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const handleConfirm = () => {
    if (selectedGroupId !== currentGroup?.id) {
      changeGroup(channel.id, selectedGroupId);
      const newGroup = groups.find((g) => g.id === selectedGroupId);
      if (newGroup) {
        showToast(`${newGroup.name}으로 이동했어요`);
      }
    }
    onClose();
  };

  // 새 그룹 생성 완료 시
  const handleGroupCreated = (groupId: string) => {
    setSelectedGroupId(groupId);
    setShowAddGroupModal(false);
    // 바로 확인 처리 (새 그룹으로 이동 완료)
    onClose();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-[80]" onClick={onClose} />

      {/* 바텀시트 */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] bg-white rounded-t-3xl max-w-md mx-auto animate-slide-up">
        {/* 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* 콘텐츠 */}
        <div className="px-5 pb-8">
          {/* 현재 채널 정보 */}
          <div className="flex items-center gap-3 py-3 mb-2">
            <div
              className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center text-xl`}
            >
              {channel.icon}
            </div>
            <div>
              <p className="text-[16px] font-semibold text-gray-900">
                {channel.name}
              </p>
              <p className="text-[13px] text-gray-500">그룹을 선택해주세요</p>
            </div>
          </div>

          {/* 새 그룹 추가 버튼 */}
          <button
            onClick={() => setShowAddGroupModal(true)}
            className="flex items-center gap-3 py-3 w-full border-b border-gray-100"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#72C2FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-[15px] text-[#72C2FF] font-medium">
              새 그룹 추가
            </span>
          </button>

          {/* 그룹 목록 */}
          <div className="py-2 max-h-[300px] overflow-y-auto">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className="flex items-center gap-3 py-3 w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-[15px] text-gray-900 font-medium">
                    {group.name}
                  </span>
                  <span className="text-[13px] text-gray-400 ml-1">
                    {group.channels.length}/100
                  </span>
                </div>
                {/* 체크 아이콘 */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedGroupId === group.id
                      ? "bg-[#72C2FF] border-[#72C2FF]"
                      : "border-gray-300"
                  }`}
                >
                  {selectedGroupId === group.id && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* 확인 버튼 */}
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-[#72C2FF] text-white text-[16px] font-semibold rounded-2xl mt-4"
          >
            확인
          </button>
        </div>
      </div>

      {/* AddGroupModal */}
      <AddGroupModal
        isOpen={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
        pendingChannel={channel}
        onGroupCreated={handleGroupCreated}
      />

      {/* 애니메이션 */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
