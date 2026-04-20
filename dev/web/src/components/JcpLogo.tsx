import * as React from "react";
import logoUrl from "@/assets/jcp-logo.svg";
import logo2Url from "@/assets/jcp-logo-2.svg";
import logo3Url from "@/assets/jcp-logo3.svg";

type JcpLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  variant?: "default" | "secondary" | "tertiary";
};

export function JcpLogo({ className, variant = "default", ...rest }: JcpLogoProps) {
  const src = variant === "tertiary" ? logo3Url : variant === "secondary" ? logo2Url : logoUrl;
  const hasLabel = !!(rest["aria-label"] || rest["aria-labelledby"]);
  return (
    <img
      src={src}
      alt=""
      className={className}
      aria-hidden={hasLabel ? undefined : (rest["aria-hidden"] as boolean | undefined) ?? true}
      {...rest}
    />
  );
}
