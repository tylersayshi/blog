import { readdirSync, readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "../types";

export async function HomePage() {
  const posts = await getData();

  const allPosts = posts.map((post) => (
    <PostCard key={post.slug} post={post} />
  ));

  return (
    <article className="container justify-center text-center flex gap-2 flex-col max-w-[500px]">
      <title>tyler&apos;s blog</title>
      <h1 className="text-4xl font-bold tracking-tight mb-4">posts</h1>
      <ul>{allPosts.length ? allPosts : <li>No posts yet :)</li>}</ul>
    </article>
  );
}

const PostCard = ({ post }: { post: PostFrontmatter }) => {
  return (
    <li key={post.slug} className="w-full post-card">
      <a
        href={`/${post.slug}`}
        className="block p-4 w-full rounded-md border-2 border-black dark:border-white text-left hover:bg-slate-200 dark:hover:bg-gray-900"
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-sm ml-2 mt-1 whitespace-nowrap">{post.date}</p>
        </div>
        <p className="text-sm">{post.description}</p>
      </a>
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
