import { createPortal } from "react-dom";

interface ConfirmPopupProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmPopup({
  title,
  description,
  confirmText,
  cancelText = "닫기",
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmPopupProps) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      
      {/* 팝업 */}
      <div className="relative bg-white rounded-2xl w-[320px] overflow-hidden shadow-xl animate-popIn">
        {/* 내용 */}
        <div className="px-6 pt-8 pb-6 text-center">
          <h3 className="text-[18px] font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* 버튼 */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-[15px] font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 text-[15px] font-semibold text-white rounded-xl transition-colors ${
              isDestructive 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-[#72C2FF] hover:bg-[#5AB0F0]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-popIn {
          animation: popIn 0.2s ease-out both;
        }
      `}</style>
    </div>,
    document.body
  );
}
