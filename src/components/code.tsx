import { bundledLanguages, createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: Object.keys(bundledLanguages),
});

type CodeProps = {
  code: string;
  lang: string;
};

export const Code = ({ code, lang, ...rest }: CodeProps) => {
  const html = highlighter.codeToHtml(code.trim(), {
    lang,
    themes: { dark: "github-dark", light: "github-light" },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
};
