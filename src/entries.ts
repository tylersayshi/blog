import { new_createPages } from "waku";
import type { PathsForPages } from "waku/router";
import { RootLayout } from "./page-components/layout";
import { HomePage } from "./page-components/home";
import { PostPage } from "./page-components/post";
import { readdirSync, readFileSync } from "node:fs";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostFrontmatter } from "./types";
import { Root } from "./page-components/root";

const getBlogPaths = async () => {
  const blogPaths: string[] = [];
  const blogFileNames: string[] = [];

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
    blogPaths.push(frontmatter.slug);
  }

  return blogPaths;
};

const pages = new_createPages(
  async ({ createPage, createLayout, createRoot }) => {
    const blogPaths = await getBlogPaths();
    return [
      createRoot({
        render: "static",
        component: Root,
      }),

      createLayout({
        render: "static",
        path: "/",
        component: RootLayout,
      }),

      createPage({
        render: "static",
        path: "/",
        component: HomePage,
      }),

      createPage({
        render: "static",
        component: PostPage,
        path: "/[slug]",
        staticPaths: blogPaths,
      }),
    ];
  }
);

declare module "waku/router" {
  interface RouteConfig {
    paths: PathsForPages<typeof pages> | (string & {});
  }
  interface CreatePagesConfig {
    pages: typeof pages;
  }
}

export default pages;
