"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { SuspendedPostHogPageView as PostHogPageView } from "./posthog-pageview";

const POSTHOG_KEY = "phc_Freu7CLoutNnJBefDxniHNOm9lMChMpMU7Az17Kvfhe";
const POSTHOG_HOST = "https://us.i.posthog.com";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
      <img
        style={{ display: "none" }}
        src="https://app.piratepx.com/ship?p=67d07cf8-d340-46cf-8560-6e9b462d1d7e&i=tylur.blog"
        suppressHydrationWarning
      />
    </PHProvider>
  );
}
