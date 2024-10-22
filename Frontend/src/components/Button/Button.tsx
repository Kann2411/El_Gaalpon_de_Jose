"use client";
import React from "react";
import { IButtonProps } from "@/interfaces/interfaces";
import { useRouter } from "next/navigation";

const Button: React.FC<IButtonProps> = ({ content, onClick, redirectTo }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectTo) {
      router.push(redirectTo);
    } else if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
