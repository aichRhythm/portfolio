import React from "react";
import { ScrollProgressBarProps } from "@/types/types";

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  scrollWidth,
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-2 bg-blue-500"
      style={{ width: `${scrollWidth}%` }}
    ></div>
  );
};

export default ScrollProgressBar;
