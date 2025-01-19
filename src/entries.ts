import { createPages } from "waku";
import type { PathsForPages } from "waku/router";
import { RootLayout } from "./page-components/layout";
import { PostPage } from "./page-components/post";
import { HomePage } from "./page-components/home";
import { readdirSync } from "node:fs";
import { GET } from "./api/rss.xml";

const getBlogPaths = async () => {
  const blogPaths: string[] = [];
  const blogFileNames: string[] = [];

  readdirSync("./posts").forEach((fileName) => {
    if (fileName.endsWith(".mdx")) {
      blogFileNames.push(fileName);
    }
  });

  for await (const fileName of blogFileNames) {
    const slug = fileName.slice(0, -4);
    blogPaths.push(slug);
  }

  return blogPaths;
};

const pages = createPages(async ({ createPage, createLayout, createApi }) => {
  const blogPaths = await getBlogPaths();
  return [
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

    createApi({
      path: "/api/rss.xml",
      method: "GET",
      render: "static",
      handler: GET,
    }),
  ];
});

declare module "waku/router" {
  interface RouteConfig {
    paths: PathsForPages<typeof pages> | (string & {});
  }
  interface CreatePagesConfig {
    pages: typeof pages;
  }
}

export default pages;
