import React from "react";
import { Star } from "lucide-react";

interface StarProps {
  filled: boolean;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const StarIcon = ({ filled, className, onClick, onMouseEnter, onMouseLeave }: StarProps) => {
  return (
    <Star
      className={`w-5 h-5 cursor-pointer ${className}`}
      style={{ fill: filled ? "#FFD700" : "none", stroke: "#FFD700" }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
