import type { TypedObject } from "@portabletext/types";
import { CmsRichText } from "./CmsRichText";

type CmsPageContentProps = {
  error: unknown;
  isLoading: boolean;
  body?: TypedObject[];
  bodyPlainText: string;
  richTextClassName?: string;
  errorClassName?: string;
  loadingClassName?: string;
  errorMessage?: string;
  loadingMessage?: string;
};

const defaultErrorMessage =
  "Could not load CMS content. Showing fallback text.";
const defaultLoadingMessage = "Loading content...";

export function CmsPageContent({
  error,
  isLoading,
  body,
  bodyPlainText,
  richTextClassName,
  errorClassName = "text-amber-600",
  loadingClassName = "text-zinc-500",
  errorMessage = defaultErrorMessage,
  loadingMessage = defaultLoadingMessage,
}: CmsPageContentProps) {
  return (
    <>
      {error ? <p className={errorClassName}>{errorMessage}</p> : null}
      {isLoading ? (
        <p className={loadingClassName}>{loadingMessage}</p>
      ) : (
        <CmsRichText
          body={body}
          bodyPlainText={bodyPlainText}
          className={richTextClassName}
        />
      )}
    </>
  );
}
