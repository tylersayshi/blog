type MetaProps = {
  title: string;
  description: string;
  path: string;
};

export const Meta = ({ title, description, path }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tylur.blog/tylur.svg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="tylur.blog" />
      <meta name="twitter:image" content="https://tylur.blog/tylur.svg" />
      <meta
        property="og:url"
        content={"https://tylur.blog" + (path === "/" ? "" : path)}
      />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
};
