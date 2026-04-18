import * as React from "react";
import logoUrl from "@/assets/logo-1.svg";

type JcpLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function JcpLogo({ className, ...rest }: JcpLogoProps) {
  const hasLabel = !!(rest["aria-label"] || rest["aria-labelledby"]);
  return (
    <img
      src={logoUrl}
      alt=""
      className={className}
      aria-hidden={hasLabel ? undefined : (rest["aria-hidden"] as boolean | undefined) ?? true}
      {...rest}
    />
  );
}
