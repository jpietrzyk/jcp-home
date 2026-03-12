import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { cn } from "../lib/utils";

type CmsRichTextProps = {
  body?: TypedObject[];
  bodyPlainText: string;
  className?: string;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export function CmsRichText({
  body,
  bodyPlainText,
  className,
}: CmsRichTextProps) {
  return (
    <div className={cn("prose max-w-none", className)}>
      {Array.isArray(body) && body.length > 0 ? (
        <PortableText value={body} components={portableTextComponents} />
      ) : (
        <p className="whitespace-pre-line">{bodyPlainText}</p>
      )}
    </div>
  );
}
