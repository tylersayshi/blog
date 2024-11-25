import type { ReactNode } from "react";

export function Root({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <title>tyler&apos;s blog</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
