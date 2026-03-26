import { useState, useEffect } from "react";
import { useInterest, InterestChannel } from "./InterestContext";
import { useToast } from "./Toast";

// 카테고리 옵션
const groupCategories = [
  "RPG",
  "액션",
  "전략",
  "슈팅",
  "스포츠",
  "퍼즐",
  "시뮬레이션",
  "수집형",
];

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingChannel?: InterestChannel | null; // 그룹 생성 후 자동 추가할 채널
  onGroupCreated?: (groupId: string) => void; // 그룹 생성 완료 콜백
}

export default function AddGroupModal({
  isOpen,
  onClose,
  pendingChannel,
  onGroupCreated,
}: AddGroupModalProps) {
  const { createGroup, addToInterest } = useInterest();
  const { showToast } = useToast();

  const [groupName, setGroupName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setGroupName("");
      setSelectedCategory("");
    }
  }, [isOpen]);

  const handleCreate = () => {
    if (!groupName.trim()) return;

    // 그룹 생성
    const newGroupId = createGroup(groupName.trim());

    // pendingChannel이 있으면 새 그룹에 자동 추가
    if (pendingChannel) {
      addToInterest(pendingChannel, newGroupId);
      showToast(
        `'${groupName}' 그룹에 ${pendingChannel.name}이(가) 추가되었어요`,
      );
    } else {
      showToast(`'${groupName}' 그룹이 추가되었어요`);
    }

    // 콜백 호출
    onGroupCreated?.(newGroupId);

    // 모달 닫기
    onClose();
  };

  const handleClose = () => {
    setGroupName("");
    setSelectedCategory("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-center bg-black/50">
      <div className="w-full max-w-md h-full bg-white flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center px-4 h-14 border-b border-gray-100">
          <button
            onClick={handleClose}
            className="w-10 h-10 -ml-2 flex items-center justify-center"
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
          </button>
          <h2 className="flex-1 text-center text-[16px] font-semibold text-gray-900 pr-10">
            새 그룹 추가
          </h2>
        </div>

        {/* 내용 */}
        <div className="flex-1 px-6 pt-8">
          {/* pendingChannel 안내 */}
          {pendingChannel && (
            <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-xl">
              <div
                className={`w-10 h-10 rounded-lg ${pendingChannel.color} flex items-center justify-center text-lg`}
              >
                {pendingChannel.icon}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-gray-900">
                  {pendingChannel.name}
                </p>
                <p className="text-[12px] text-gray-500">
                  새 그룹에 자동으로 추가됩니다
                </p>
              </div>
            </div>
          )}

          <p className="text-[13px] text-[#72C2FF] mb-2">
            어떤 주제로 그룹을 만들까요?
          </p>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹 이름을 지어보세요"
            className="w-full text-[18px] font-medium text-gray-900 placeholder-gray-300 border-b-2 border-gray-200 focus:border-[#72C2FF] outline-none pb-2 transition-colors"
            autoFocus
          />

          {/* 카테고리 태그 */}
          <div className="flex flex-wrap gap-2 mt-8">
            {groupCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (!groupName) setGroupName(cat);
                }}
                className={`px-4 py-2 text-[13px] font-medium rounded-full border transition-all ${
                  selectedCategory === cat
                    ? "border-[#72C2FF] text-[#72C2FF] bg-blue-50"
                    : "border-gray-200 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className="p-4 pb-8">
          <button
            onClick={handleCreate}
            disabled={!groupName.trim()}
            className={`w-full py-4 font-semibold rounded-xl transition-colors ${
              groupName.trim()
                ? "bg-[#72C2FF] text-white active:bg-[#5ab0f0]"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
