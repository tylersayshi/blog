export function BlueskyEmbed({ postUrl }: { postUrl: string }) {
  const match = postUrl.match(/profile\/([^/]+)\/post\/([^/]+)/);
  if (!match) return null;

  const [handle, postId] = [match[1], match[2]];

  return (
    <iframe
      src={`https://embed.bsky.app/embed/${handle}/post/${postId}`}
      width="100%"
      style={{ border: "none", maxWidth: 600, minHeight: 200 }}
      allowFullScreen
    />
  );
}
