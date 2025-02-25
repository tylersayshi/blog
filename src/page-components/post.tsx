import { readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "../types";
import { Meta } from "../components/meta";
import { components } from "../components/mdx";

type BlogArticlePageProps = {
  slug: string;
};

export async function PostPage({ slug }: BlogArticlePageProps) {
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
      <article className="container prose dark:prose-invert">
        <h1>{frontmatter.title}</h1>
        <span className="block text-gray-500 -mt-6 -mb-2">{date}</span>
        {content}
      </article>
    </>
  );
}
