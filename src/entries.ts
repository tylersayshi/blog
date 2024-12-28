import { new_createPages } from "waku";
import type { PathsForPages } from "waku/router";
import { RootLayout } from "./page-components/layout";
import { HomePage } from "./page-components/home";
import { PostPage } from "./page-components/post";
import { readdirSync } from "node:fs";
import { Root } from "./page-components/root";

const getBlogPaths = async () => {
  const blogPaths: string[] = [];

  const blogFileNames = readdirSync("./posts").flatMap((fileName) => {
    if (fileName.endsWith(".mdx")) {
      return [fileName];
    }
    return [];
  });

  for await (const fileName of blogFileNames) {
    const slug = fileName.slice(0, -4);
    blogPaths.push(slug);
  }

  console.log({ blogFileNames, blogPaths });
  return blogPaths;
};

const pages = new_createPages(
  async ({ createPage, createLayout, createRoot }) => {
    const blogPaths = await getBlogPaths();
    console.log({ blogPaths });
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
