import React from "react";

type IconProps = {
  reactIcon: React.ReactElement;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Icon = ({ reactIcon, className = "", onClick }: IconProps) => {
  return (
    <div
      className={`flex items-center justify-center text-2xl bg-transparent transition-colors duration-200 hover:bg-neutral-950 hover:text-neutral-100 rounded-full p-2 cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      aria-label="Icon Button"
    >
      {reactIcon}
    </div>
  );
};

export default Icon;
