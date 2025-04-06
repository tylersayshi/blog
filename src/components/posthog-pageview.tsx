"use client";

import { useRouter } from "waku";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";

function PostHogPageView(): null {
  const router = useRouter();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    const searchParams = router.query;
    if (router.path && posthog) {
      let url = window.origin + router.path;
      if (searchParams) {
        url = url + `?${searchParams}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [router.path, router.query, posthog]);

  return null;
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
