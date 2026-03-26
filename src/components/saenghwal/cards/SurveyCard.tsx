// @ts-nocheck
import type { Survey } from "../types";

interface Props {
  survey: Survey;
  onSurveyClick: (survey: Survey) => void;
}

export default function SurveyCard({ survey, onSurveyClick }: Props) {
  return (
    <div
      onClick={() => onSurveyClick(survey)}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {survey.isHot && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600">
              🔥 HOT
            </span>
          )}
          {survey.isPremium && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-600">
              프리미엄
            </span>
          )}
        </div>
        <span className="text-amber-600 font-bold text-sm">+{survey.reward}P</span>
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{survey.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{survey.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {survey.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>⏱️ {survey.duration}</span>
        <span>👥 {survey.participants}/{survey.maxParticipants}명</span>
        <span>⏰ {survey.deadline}</span>
      </div>
      <div className="mt-2">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full"
            style={{ width: `${(survey.participants / survey.maxParticipants) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
