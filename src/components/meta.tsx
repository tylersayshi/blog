type MetaProps = {
  title: string;
  description: string;
};

export const Meta = ({ title, description }: MetaProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="description" content="An internet website!" />

      <meta property="og:url" content="https://tylur.blog" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="tyler's blog" />
      <meta property="og:description" content="An internet website!" />
      <meta property="og:image" content="/tylur.svg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="tylur.blog" />
      <meta property="twitter:url" content="https://tylur.blog" />
      <meta name="twitter:title" content="tyler's blog" />
      <meta name="twitter:description" content="An internet website!" />
      <meta name="twitter:image" content="/tylur.svg" />
    </>
  );
};
