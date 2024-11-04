import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg"; 
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses = "px-4 py-2 rounded-md font-semibold transition-all focus:outline-none";
    const variantClasses = {
      primary: "bg-primary text-white hover:bg-primary-dark",
      secondary: "bg-secondary text-white hover:bg-secondary-dark",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    };
    const sizeClasses = {
      sm: "text-sm px-2 py-1",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    };

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
