// @ts-nocheck
import { useState } from "react";

interface Props {
  onClose: () => void;
  onSubmit?: (data: PointFormData) => void;
}

interface PointFormData {
  appName: string;
  category: string;
  title: string;
  description: string;
  link: string;
  images: string[];
}

export default function PointWriteModal({ onClose, onSubmit }: Props) {
  const [pointForm, setPointForm] = useState<PointFormData>({
    appName: "",
    category: "포인트",
    title: "",
    description: "",
    link: "",
    images: [],
  });

  const handleSubmit = () => {
    // 필수 필드 검증
    if (!pointForm.appName || !pointForm.title || !pointForm.description) {
      alert("필수 항목을 입력해주세요");
      return;
    }
    onSubmit?.(pointForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-md mx-auto">
      {/* 헤더 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-base font-medium text-gray-900">
          포인트 정보 공유
        </h3>
        <div className="w-6" />
      </div>

      {/* 본문 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 상단 배너 */}
        <div className="flex items-center justify-between bg-amber-50 rounded-xl p-3 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-lg">🪙</span>
            </div>
            <span className="font-medium text-gray-800">포인트 정보 공유</span>
          </div>
          <span className="text-xs text-amber-600 font-medium">
            포인트 등록시 +10포인트
          </span>
        </div>

        <div className="space-y-5">
          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 *
            </label>
            <div className="flex gap-2">
              {["포인트", "쿠폰", "기타"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPointForm({ ...pointForm, category: cat })}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all border ${
                    pointForm.category === cat
                      ? "bg-[#72C2FF] text-white border-[#72C2FF]"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 앱/서비스명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              앱/서비스명 *
            </label>
            <input
              type="text"
              value={pointForm.appName}
              onChange={(e) =>
                setPointForm({ ...pointForm, appName: e.target.value })
              }
              placeholder="예: 토스, 캐시워크, 리브메이트"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none text-sm"
            />
          </div>

          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              value={pointForm.title}
              onChange={(e) =>
                setPointForm({ ...pointForm, title: e.target.value })
              }
              placeholder="예: 스타벅스 아메리카노 100명 추첨"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none text-sm"
            />
          </div>

          {/* 다운로드/참여 링크 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              다운로드/참여 링크
            </label>
            <input
              type="url"
              value={pointForm.link}
              onChange={(e) =>
                setPointForm({ ...pointForm, link: e.target.value })
              }
              placeholder="https://"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-gray-500 focus:outline-none text-sm"
            />
          </div>

          {/* 상세 설명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              상세 설명 *
            </label>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <textarea
                value={pointForm.description}
                onChange={(e) =>
                  setPointForm({
                    ...pointForm,
                    description: e.target.value.slice(0, 2000),
                  })
                }
                placeholder="내용을 입력하세요"
                rows={5}
                className="w-full px-4 py-3 focus:outline-none resize-none text-sm"
              />
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <label className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []).slice(
                          0,
                          5 - pointForm.images.length,
                        );
                        const newImages = files.map((file) =>
                          URL.createObjectURL(file),
                        );
                        setPointForm({
                          ...pointForm,
                          images: [...pointForm.images, ...newImages].slice(
                            0,
                            5,
                          ),
                        });
                      }}
                    />
                  </label>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                  </button>
                </div>
                <span className="text-xs text-gray-400">
                  {pointForm.description?.length ?? 0}/2,000
                </span>
              </div>
            </div>

            {/* 첨부된 이미지 미리보기 */}
            {pointForm.images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {pointForm.images.map((img, idx) => (
                  <div key={idx} className="relative flex-shrink-0 w-16 h-16">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setPointForm({
                          ...pointForm,
                          images: pointForm.images.filter((_, i) => i !== idx),
                        })
                      }
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gray-800 text-white rounded-full flex items-center justify-center text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={
            !pointForm.appName || !pointForm.title || !pointForm.description
          }
          className={`w-full py-4 font-medium rounded-xl transition-colors ${
            pointForm.appName && pointForm.title && pointForm.description
              ? "bg-[#72C2FF] hover:bg-[#5BB0F0] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
