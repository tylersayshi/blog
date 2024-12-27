"use client";
import { useRouter_UNSTABLE } from "waku";

export const Analytics = () => {
  const router = useRouter_UNSTABLE();
  return (
    <img
      src={`https://app.piratepx.com/ship?p=67d07cf8-d340-46cf-8560-6e9b462d1d7e&i=tylur.blog${router.path}`}
      aria-hidden="true"
      style={{ display: "none" }}
      suppressHydrationWarning
    />
  );
};
