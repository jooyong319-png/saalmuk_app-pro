// @ts-nocheck
import type { QuickPoll } from "../types";

interface Props {
  poll: QuickPoll;
  onVote: (pollId: number, optionIndex: number) => void;
}

export default function QuickPollCard({ poll, onVote }: Props) {
  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);
  const isCompleted = poll.participated;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs px-2 py-1 rounded font-medium ${
            isCompleted ? "bg-gray-100 text-gray-600" : "bg-rose-500 text-white"
          }`}
        >
          {isCompleted ? "참여완료" : "참여가능"}
        </span>
        <div className="flex items-center gap-1 text-rose-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-sm">{poll.likes}</span>
        </div>
      </div>

      <div className="flex gap-1 mb-2">
        {poll.tags.map((tag, idx) => (
          <span key={idx} className="text-xs text-gray-500">{tag}</span>
        ))}
      </div>

      <h4 className="font-bold text-gray-900 mb-4 text-sm leading-relaxed">{poll.question}</h4>

      <div className="space-y-2">
        {poll.options.map((option, idx) => {
          const percent =
            option.percent ||
            (totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0);
          return (
            <div
              key={idx}
              onClick={() => !isCompleted && onVote(poll.id, idx)}
              className={`relative rounded-lg border overflow-hidden ${
                isCompleted
                  ? "bg-white border-gray-200"
                  : "bg-gray-50 border-gray-200 hover:border-rose-300 cursor-pointer"
              }`}
            >
              {isCompleted && percent > 0 && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-rose-100"
                  style={{ width: `${percent}%` }}
                />
              )}
              <div className="relative px-3 py-2.5 flex items-center justify-between">
                <span className="text-sm text-gray-700 flex-1 pr-2">{option.text}</span>
                {isCompleted && percent > 0 && (
                  <span className="text-sm font-medium text-rose-500 whitespace-nowrap">
                    {percent}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 text-gray-400 text-xs">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{poll.participants.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{poll.comments}</span>
        </div>
        {!isCompleted && (
          <span className="ml-auto text-rose-500 font-medium">+{poll.reward}P</span>
        )}
      </div>
    </div>
  );
}
