import { readdirSync, readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "../types";
import { Meta } from "../components/meta";
import { PostLink } from "../components/post-link";

export async function HomePage() {
  const posts = await getData();

  const allPosts = posts.map((post) => (
    <PostCard key={post.slug} post={post} />
  ));

  return (
    <article className="container justify-center text-center flex gap-2 flex-col max-w-[500px]">
      <Meta title="tyler's blog" description="some thoughts" path="/" />
      <h1 className="text-4xl font-bold tracking-tight mb-4">posts</h1>
      <ul className="flex flex-col gap-2">
        {allPosts.length ? allPosts : <li>No posts yet :)</li>}
      </ul>
    </article>
  );
}

const PostCard = ({ post }: { post: PostFrontmatter }) => {
  return (
    <li key={post.slug} className="w-full post-card">
      <PostLink post={post} />
    </li>
  );
};

const getData = async () => {
  const blogFileNames: Array<string> = [];
  const blogArticles: Array<any> = [];

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

    const date = new Date(frontmatter.date).toISOString().slice(0, 10);

    const article = {
      slug: fileName.slice(0, -4),
      title: frontmatter.title,
      description: frontmatter.description,
      date,
      rawDate: frontmatter.date,
    };

    if (!frontmatter.draft) {
      blogArticles.push(article);
    }
  }

  return blogArticles.sort((a, b) => (a.rawDate > b.rawDate ? -1 : 1));
};

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
