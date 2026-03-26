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
  return (
    <div className="fixed inset-0 z-[10003] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div
        className="relative bg-white rounded-2xl w-[320px] overflow-hidden shadow-xl"
        style={{ animation: "popIn 0.2s ease-out" }}
      >
        <div className="px-6 pt-8 pb-6 text-center">
          <h3 className="text-[18px] font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            className="flex-1 py-3 text-[15px] font-semibold text-gray-700 bg-gray-100 rounded-xl active:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 text-[15px] font-semibold text-white rounded-xl transition-colors ${
              isDestructive
                ? "bg-red-500 active:bg-red-600"
                : "bg-[#72C2FF] active:bg-[#5AB0F0]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
