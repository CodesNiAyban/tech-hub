import React from "react";
import { Star } from "lucide-react";

interface StarProps {
  filled: boolean;
  fillPercentage?: number;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const StarIcon = ({ filled, fillPercentage = 100, className, onClick, onMouseEnter, onMouseLeave }: StarProps) => {
  const maskId = `mask-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-5 h-5 cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <defs>
        <clipPath id={maskId}>
          <rect x="0" y="0" width={fillPercentage / 100 * 24} height="24" />
        </clipPath>
      </defs>
      <Star fill="#FFD700" stroke="#FFD700" style={{ clipPath: `url(#${maskId})` }} />
      <Star fill="none" stroke="#FFD700" />
    </svg>
  );
};
