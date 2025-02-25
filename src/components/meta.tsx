type MetaProps = {
  title: string;
  description: string;
  path: string;
};

export const Meta = ({ title, description, path }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
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
