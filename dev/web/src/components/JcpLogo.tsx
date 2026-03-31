export function JcpLogo({ className }: { className?: string }) {
  return (
  <svg
    className={className}
    viewBox="0 0 240 48"
    fill="none"
    aria-label="jcp.home"
    role="img"
  >
    <text
      x="0"
      y="24"
      className="fill-[#3d3833] dark:fill-[#dde4ee]"
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
      className="fill-[#a67c52] dark:fill-[#c4956a]"
      fontSize="20"
      fontWeight="300"
      fontFamily="'JetBrains Mono', monospace"
    >
      -
    </text>
    <text
      x="52"
      y="24"
      className="fill-[#3d3833] dark:fill-[#dde4ee]"
      fontSize="20"
      fontWeight="300"
      fontFamily="'JetBrains Mono', monospace"
      letterSpacing="0.5"
    >
      haven
    </text>
    <path
      d="M 0 34 C 15 30, 25 38, 40 34 C 55 30, 65 38, 80 34 C 95 30, 105 38, 120 34 C 135 30, 145 38, 160 34"
      className="stroke-[#a67c52] dark:stroke-[#c4956a]"
      strokeOpacity="0.3"
      strokeWidth="1"
      fill="none"
    />
    <circle
      cx="170"
      cy="34"
      r="1.5"
      className="fill-[#d4a574] dark:fill-[#6a9bc4]"
      opacity="0.8"
    />
  </svg>
  );
}
