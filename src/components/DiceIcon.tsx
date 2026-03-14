"use client";

interface DiceIconProps {
  type: string;
  color: string;
  size?: number;
}

export default function DiceIcon({ type, color, size = 40 }: DiceIconProps) {
  const s = size;
  const c = color;

  switch (type) {
    case "d4":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 95,90 5,90" fill="none" stroke={c} strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="90" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="5" y1="90" x2="72" y2="47" stroke={c} strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "d6":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke={c} strokeWidth="4" />
          <line x1="10" y1="10" x2="30" y2="5" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="90" y1="10" x2="95" y2="5" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="95" y1="5" x2="30" y2="5" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="95" y1="5" x2="95" y2="90" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="90" y1="90" x2="95" y2="90" stroke={c} strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "d8":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke={c} strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="95" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={c} strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "d10":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 90,35 80,80 20,80 10,35" fill="none" stroke={c} strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="80" stroke={c} strokeWidth="2" opacity="0.5" />
          <line x1="10" y1="35" x2="90" y2="35" stroke={c} strokeWidth="2" opacity="0.5" />
        </svg>
      );
    case "d12":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 78,15 95,40 90,70 68,90 32,90 10,70 5,40 22,15" fill="none" stroke={c} strokeWidth="4" />
          <line x1="50" y1="5" x2="50" y2="95" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="5" y1="40" x2="95" y2="40" stroke={c} strokeWidth="2" opacity="0.4" />
        </svg>
      );
    case "d20":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke={c} strokeWidth="4" />
          <line x1="50" y1="5" x2="5" y2="70" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="50" y1="5" x2="95" y2="70" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="5" y1="30" x2="95" y2="30" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="5" y1="70" x2="95" y2="70" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="50" y1="95" x2="5" y2="30" stroke={c} strokeWidth="2" opacity="0.4" />
          <line x1="50" y1="95" x2="95" y2="30" stroke={c} strokeWidth="2" opacity="0.4" />
        </svg>
      );
    case "d100":
      return (
        <svg width={s} height={s} viewBox="0 0 100 100">
          <circle cx="35" cy="50" r="28" fill="none" stroke={c} strokeWidth="4" />
          <circle cx="65" cy="50" r="28" fill="none" stroke={c} strokeWidth="4" />
          <text x="50" y="56" textAnchor="middle" fontSize="18" fill={c} fontWeight="bold">%</text>
        </svg>
      );
    default:
      return null;
  }
}
