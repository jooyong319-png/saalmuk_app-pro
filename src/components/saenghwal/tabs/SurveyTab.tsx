// @ts-nocheck
import SurveyCard from "../cards/SurveyCard";
import QuickPollCard from "../cards/QuickPollCard";
import type { SaenghwalCtx } from "../types";

interface Props {
  ctx: SaenghwalCtx;
}

export default function SurveyTab({ ctx }: Props) {
  const {
    surveys, quickPolls,
    surveyMainTab, setSurveyMainTab,
    quickPollFilter, setQuickPollFilter,
    setSelectedSurvey, handleVote,
  } = ctx;

  return (
    <>
      {/* 상위 탭: 퀵설문 / 일반설문 */}
      <div className="bg-white px-4 pb-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSurveyMainTab("quick")}
              className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                surveyMainTab === "quick"
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={surveyMainTab === "quick" ? { background: "#72C2FF" } : {}}
            >
              퀵설문
            </button>
            <button
              onClick={() => setSurveyMainTab("general")}
              className={`px-4 py-2 text-[13px] font-bold whitespace-nowrap rounded-full transition-all ${
                surveyMainTab === "general"
                  ? "text-white border-none"
                  : "bg-white text-gray-500 border-[1.5px] border-gray-200"
              }`}
              style={surveyMainTab === "general" ? { background: "#72C2FF" } : {}}
            >
              일반설문
            </button>
          </div>
          <span className="text-xs text-gray-400">간단 참여로 포인트 적립</span>
        </div>
      </div>

      {/* 배너 */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-[#5AB0F0] to-[#72C2FF] rounded-2xl p-4 text-white mb-4">
          <p className="text-xs opacity-80 mb-1">📝 설문 참여하고 포인트 받기</p>
          <p className="font-bold text-lg">최대 2,000P 적립</p>
          <p className="text-sm opacity-90">간단한 설문으로 포인트 모으세요!</p>
        </div>
      </div>

      {/* 퀵설문 */}
      {surveyMainTab === "quick" && (
        <>
          <div className="bg-white px-4 py-3">
            <div className="flex gap-2">
              {[{ key: "all", label: "전체" }, { key: "available", label: "참여가능" }, { key: "completed", label: "참여완료" }].map(
                (tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setQuickPollFilter(tab.key)}
                    className="px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-all"
                    style={
                      quickPollFilter === tab.key
                        ? { background: "#E8F4FD", border: "1.5px solid #72C2FF", color: "#4A9FD9" }
                        : { background: "#fff", border: "1.5px solid #e5e5e5", color: "#888" }
                    }
                  >
                    {tab.label}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="px-4 pt-4 pb-24 space-y-4 bg-gray-50">
            {quickPolls
              .filter((poll) => {
                if (quickPollFilter === "available") return !poll.participated;
                if (quickPollFilter === "completed") return poll.participated;
                return true;
              })
              .map((poll) => (
                <QuickPollCard key={poll.id} poll={poll} onVote={handleVote} />
              ))}
          </div>
        </>
      )}

      {/* 일반설문 */}
      {surveyMainTab === "general" && (
        <div className="px-4 pb-24 pt-4 space-y-3">
          {surveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} onSurveyClick={setSelectedSurvey} />
          ))}
        </div>
      )}
    </>
  );
}
