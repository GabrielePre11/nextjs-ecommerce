import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

// A reusable Container component that wraps its children in a styled <div>.
// - It applies some default utility classes for layout and spacing.
export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`container max-w-7xl px-4 mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
