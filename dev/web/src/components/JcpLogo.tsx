import * as React from "react";
import logo1Url from "@/assets/logo-1.svg";
import logo2Url from "@/assets/jcp-logo-2.svg";
import logo3Url from "@/assets/jcp-logo3.svg";

type JcpLogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  variant?: "default" | "secondary" | "tertiary";
};

const variantSrc = {
  default: logo1Url,
  secondary: logo2Url,
  tertiary: logo3Url,
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
