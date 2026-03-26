// @ts-nocheck
import type { Post } from "../types";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
          {post.category}
        </span>
        {post.hot && <span className="text-xs text-red-500">🔥</span>}
      </div>
      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>❤️ {post.likes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </div>
  );
}
