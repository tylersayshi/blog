import type { ReactNode } from "react";

export function Root({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>tyler&apos;s blog</title>
      </head>
      <body>
        {children}
        <img
          src="https://app.piratepx.com/ship?p=67d07cf8-d340-46cf-8560-6e9b462d1d7e&i=tylur.blog"
          aria-hidden="true"
          style={{ display: "none" }}
          suppressHydrationWarning
        />
      </body>
    </html>
  );
}
