import * as React from "react";

type JcpLogoProps = React.SVGProps<SVGSVGElement>;

export function JcpLogo({ className, ...rest }: JcpLogoProps) {
  const hasLabel = !!(rest["aria-label"] || rest["aria-labelledby"]);
  return (
  <svg
    className={className}
    viewBox="0 0 200 48"
    fill="none"
    role="img"
    aria-hidden={hasLabel ? undefined : (rest["aria-hidden"] as boolean | undefined) ?? true}
    {...rest}
  >
    <text
      x="0"
      y="24"
      className="fill-logo-ink dark:fill-logo-ink-dark"
      fontSize="20"
      fontWeight="700"
      fontFamily="'JetBrains Mono', monospace"
      letterSpacing="-0.5"
    >
      jcp
    </text>
    <text
      x="40"
      y="24"
      className="fill-logo-accent dark:fill-logo-accent-dark"
      fontSize="20"
      fontWeight="300"
      fontFamily="'JetBrains Mono', monospace"
    >
      -
    </text>
    <text
      x="52"
      y="24"
      className="fill-logo-ink dark:fill-logo-ink-dark"
      fontSize="20"
      fontWeight="300"
      fontFamily="'JetBrains Mono', monospace"
      letterSpacing="0.5"
    >
      haven
    </text>
    <path
      d="M 0 34 C 15 30, 25 38, 40 34 C 55 30, 65 38, 80 34 C 95 30, 105 38, 120 34 C 135 30, 145 38, 160 34"
      className="stroke-logo-accent dark:stroke-logo-accent-dark"
      strokeOpacity="0.3"
      strokeWidth="1"
      fill="none"
    />
    <circle
      cx="170"
      cy="34"
      r="1.5"
      className="fill-logo-warm dark:fill-logo-warm-dark"
      opacity="0.8"
    />
  </svg>
  );
}
