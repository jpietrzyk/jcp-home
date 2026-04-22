import * as React from "react";
import logoUrl from "@/assets/jcp-logo.svg";
import logoSquareUrl from "@/assets/jcp-logo-square.svg";

type JcpLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  variant?: "default" | "secondary" | "tertiary" | "square";
};

const variantSrc = {
  default: logoUrl,
  secondary: logoUrl,
  tertiary: logoUrl,
  square: logoSquareUrl,
};

export function JcpLogo({ className, variant = "default", ...rest }: JcpLogoProps) {
  const src = variantSrc[variant];
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
