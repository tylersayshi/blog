"use client";

import { Link, useRouter } from "waku";
import { PostFrontmatter } from "../types";

export function PostLink({ post }: { post: PostFrontmatter }) {
  return (
    <Link
      to={`/${post.slug}`}
      className="block p-4 w-full rounded-md border-2 border-black dark:border-white text-left hover:bg-slate-200 dark:hover:bg-gray-900"
      unstable_prefetchOnEnter
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-sm ml-2 mt-1 whitespace-nowrap">{post.date}</p>
      </div>
      <p className="text-sm">{post.description}</p>
    </Link>
  );
}
