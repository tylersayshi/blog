import "../styles.css";

import type { ReactNode } from "react";

import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { PostHogProvider } from "../components/analytics";

type RootLayoutProps = { children: ReactNode };

export async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="font-sans">
      <link rel="icon" href="/favicon.ico" />
      <Header />
      <main className="m-6 flex lg:py-12 *:min-h-64 *:min-w-64 lg:m-0 min-h-[calc(100vh-214px)] lg:min-h-svh justify-center">
        <PostHogProvider>{children}</PostHogProvider>
      </main>
      <Footer />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
