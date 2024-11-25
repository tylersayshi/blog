import { bundledLanguages, createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-dark", "github-light"],
  langs: Object.keys(bundledLanguages),
});

type CodeProps = {
  code: string;
};

export const Code = async ({ code, ...rest }: CodeProps) => {
  const html = await highlighter.codeToHtml(code.trim(), {
    lang: "typescript",
    themes: { dark: "github-dark", light: "github-light" },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
};
