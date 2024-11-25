import { readdirSync, readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "../types";
import { Meta } from "../components/meta";
import { components } from "../components/mdx";

type BlogArticlePageProps = {
  slug: string;
};

export async function PostPage({ slug }: BlogArticlePageProps) {
  const fileName = await getFileName(slug);

  if (!fileName) {
    return null;
  }

  const path = `./posts/${fileName}`;
  const source = readFileSync(path, "utf8");
  const mdx = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: true },
  });
  const { content } = mdx;
  const frontmatter = mdx.frontmatter as PostFrontmatter;

  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Meta
        title={`${frontmatter.title} — Waku`}
        description={frontmatter.description}
      />
      <article className="container prose dark:prose-invert lg:prose-xl">
        <h1>{frontmatter.title}</h1>
        <span className="block text-gray-500 -mt-6 -mb-2">{date}</span>
        {content}
      </article>
    </>
  );
}

const getFileName = async (slug: string) => {
  const blogFileNames: Array<string> = [];
  const blogSlugToFileName: Record<string, string> = {};

  readdirSync("./posts").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogFileNames.push(fileName);
    }
  });

  for await (const fileName of blogFileNames) {
    const path = `./posts/${fileName}`;
    const source = readFileSync(path, "utf8");
    const mdx = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });
    const frontmatter = mdx.frontmatter as PostFrontmatter;
    blogSlugToFileName[frontmatter.slug] = fileName;
  }

  const fileName = blogSlugToFileName[slug];

  return fileName;
};
