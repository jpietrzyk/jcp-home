import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { cn } from "../lib/utils";

type CmsRichTextProps = {
  body?: TypedObject[];
  bodyPlainText: string;
  className?: string;
  hideFirstHeadingMatching?: string;
};

function normalizeText(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getBlockText(block: TypedObject) {
  if (!("children" in block) || !Array.isArray(block.children)) return "";

  return block.children
    .map((child) => {
      if (typeof child !== "object" || child === null || !("text" in child)) {
        return "";
      }

      return typeof child.text === "string" ? child.text : "";
    })
    .join("")
    .trim();
}

function getVisibleBody(
  body: TypedObject[] | undefined,
  hideFirstHeadingMatching?: string,
) {
  if (!Array.isArray(body) || body.length === 0 || !hideFirstHeadingMatching) {
    return body;
  }

  const [firstBlock, ...rest] = body;
  if (
    typeof firstBlock !== "object" ||
    firstBlock === null ||
    !("style" in firstBlock) ||
    typeof firstBlock.style !== "string" ||
    !["h1", "h2", "h3", "h4"].includes(firstBlock.style)
  ) {
    return body;
  }

  return normalizeText(getBlockText(firstBlock)) ===
    normalizeText(hideFirstHeadingMatching)
    ? rest
    : body;
}

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
  hideFirstHeadingMatching,
}: CmsRichTextProps) {
  const visibleBody = getVisibleBody(body, hideFirstHeadingMatching);

  return (
    <div className={cn("prose max-w-none", className)}>
      {Array.isArray(visibleBody) && visibleBody.length > 0 ? (
        <PortableText value={visibleBody} components={portableTextComponents} />
      ) : (
        <p className="whitespace-pre-line">{bodyPlainText}</p>
      )}
    </div>
  );
}
