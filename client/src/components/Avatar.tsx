// src/components/ui/avatar.tsx
import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const AvatarImage: React.FC<AvatarImageProps> = ({ className = "", ...props }) => {
  return <img className={`w-full h-full object-cover ${className}`} {...props} />;
};

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
