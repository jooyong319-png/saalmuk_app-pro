import { useState } from "react";

const REPORT_REASONS = [
  "스팸, 광고",
  "폭언, 비속어, 혐오 발언",
  "음란성, 선정성 글",
  "개인정보 노출",
  "부적절한 닉네임",
  "부적절한 프로필 이미지",
  "주제와 무관",
];

interface ReportPopupProps {
  targetType?: string;
  onReport: (reason: string) => void;
  onCancel: () => void;
}

export default function ReportPopup({
  targetType = "글",
  onReport,
  onCancel,
}: ReportPopupProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[10003] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div
        className="relative bg-white rounded-2xl w-[320px] overflow-hidden shadow-xl"
        style={{ animation: "popIn 0.2s ease-out" }}
      >
        <div className="px-6 pt-6 pb-4">
          <h3 className="text-[16px] font-bold text-gray-900">
            이 {targetType}을 신고하는 이유
          </h3>
        </div>
        <div className="px-2 max-h-[300px] overflow-y-auto">
          {REPORT_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                selectedReason === reason ? "bg-[#E8F4FD]" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-[14px] ${
                  selectedReason === reason
                    ? "text-[#72C2FF] font-medium"
                    : "text-gray-700"
                }`}
              >
                {reason}
              </span>
              {selectedReason === reason && (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-[15px] font-semibold text-gray-700 bg-gray-100 rounded-xl active:bg-gray-200 transition-colors"
          >
            다음에
          </button>
          <button
            onClick={() => selectedReason && onReport(selectedReason)}
            disabled={!selectedReason}
            className={`flex-1 py-3 text-[15px] font-semibold text-white rounded-xl transition-colors ${
              selectedReason
                ? "bg-[#72C2FF] active:bg-[#5AB0F0]"
                : "bg-gray-300"
            }`}
          >
            신고하기
          </button>
        </div>
      </div>
    </div>
  );
}
