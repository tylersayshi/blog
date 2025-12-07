import { readdirSync, readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import type { PageProps } from "waku/router";
import { PostFrontmatter } from "../types";
import { Meta } from "../components/meta";
import { components } from "../components/mdx";

export default async function PostPage({ slug }: PageProps<"/[slug]">) {
  const path = `./posts/${slug}.mdx`;
  const source = readFileSync(path, "utf8");
  const mdx = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: true },
  });
  const { content } = mdx;
  const frontmatter = mdx.frontmatter as PostFrontmatter;

  const date = new Date(frontmatter.date).toISOString().slice(0, 10);

  return (
    <>
      <Meta
        title={frontmatter.title}
        description={frontmatter.description}
        path={`/${slug}`}
      />
      <article className="mx-4 container prose dark:prose-invert">
        <h1>{frontmatter.title}</h1>
        <span className="block text-gray-500 text-xl -mt-6 mb-2">
          {frontmatter.description}
        </span>
        <span className="block text-gray-500 -mb-2">{date}</span>
        {content}
      </article>
    </>
  );
}

const getBlogPaths = () => {
  const blogPaths: string[] = [];
  readdirSync("./posts").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogPaths.push(fileName.slice(0, -4));
    }
  });
  return blogPaths;
};

export const getConfig = async () => {
  return {
    render: "static",
    staticPaths: getBlogPaths(),
  } as const;
};
