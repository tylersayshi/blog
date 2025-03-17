"use client";

import { useRouter_UNSTABLE as useRouter } from "waku";
import { PostFrontmatter } from "../types";

export function PostLink({ post }: { post: PostFrontmatter }) {
  const router = useRouter();
  return (
    <a
      href={`/${post.slug}`}
      className="block p-4 w-full rounded-md border-2 border-black dark:border-white text-left hover:bg-slate-200 dark:hover:bg-gray-900"
      onMouseEnter={() => router.prefetch(`/${post.slug}`)}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-sm ml-2 mt-1 whitespace-nowrap">{post.date}</p>
      </div>
      <p className="text-sm">{post.description}</p>
    </a>
  );
}
