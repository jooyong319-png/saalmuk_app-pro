import { useRef, useImperativeHandle, forwardRef } from "react";

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  replyingTo?: { id: number; author: string } | null;
  onCancelReply?: () => void;
  position?: "fixed" | "sticky"; // 위치 타입
}

export interface CommentInputRef {
  focus: () => void;
}

const CommentInput = forwardRef<CommentInputRef, CommentInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      replyingTo,
      onCancelReply,
      position = "fixed",
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    const positionClass =
      position === "fixed"
        ? "fixed bottom-0 left-0 right-0 max-w-md mx-auto"
        : "sticky bottom-0";

    return (
      <div
        className={`${positionClass} bg-white border-t border-gray-100 px-4 py-3 z-50`}
      >
        {replyingTo && (
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[13px] text-[#72C2FF]">
              @{replyingTo.author}에게 답글 작성 중
            </span>
            <button
              className="text-[13px] text-gray-400"
              onClick={onCancelReply}
            >
              취소
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            placeholder={
              replyingTo ? "답글을 입력하세요" : "댓글을 입력하세요"
            }
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#72C2FF]/30"
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          />
          <button
            className={`text-[14px] font-semibold px-3 py-2 rounded-full transition-colors ${
              value.trim()
                ? "text-white bg-[#72C2FF]"
                : "text-gray-400 bg-gray-100"
            }`}
            onClick={onSubmit}
            disabled={!value.trim()}
          >
            등록
          </button>
        </div>
      </div>
    );
  }
);

CommentInput.displayName = "CommentInput";

export default CommentInput;
