import { Link } from "waku";

import { Code } from "./code";
import { Note } from "./note";
import { getAnchor } from "../utils";

export const components = {
  h2: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h2 id={id} {...rest}>
        <a href={`#${id}`}>{children}</a>
      </h2>
    );
  },
  h3: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h3 id={id} {...rest}>
        <a href={`#${id}`}>{children}</a>
      </h3>
    );
  },
  h4: ({ children, ...rest }: any) => {
    const id = getAnchor(children);

    return (
      <h4 id={id} {...rest}>
        <a href={`#${id}`}>{children}</a>
      </h4>
    );
  },
  a: ({ href, children, ...rest }: any) => {
    if (href.startsWith("/")) {
      <Link to={href} {...rest}>
        {children}
      </Link>;
    }

    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  },

  pre: ({ children, ...rest }: any) => {
    const lang = children?.props?.className?.replace(/language-/, "") || "";
    return (
      <Code
        code={children.props.children}
        className="code overflow-x-auto text-xs md:text-base rounded-xl"
        lang={lang}
        {...rest}
      />
    );
  },

  Note,
};
