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
<<<<<<< HEAD
<<<<<<< HEAD
      className="px-5 py-2 font-bold tracking-wide rounded-md bg-red-600 transition duration-300 ease-in-out hover:bg-red-700 text-sm text-white"
=======
      className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
>>>>>>> aa4ec1bd71aa547b054839e7fa95a41a792862f4
=======
      className="px-5 py-2 font-bold tracking-wide rounded-md bg-red-600 transition duration-300 ease-in-out hover:bg-red-700 text-sm text-white"

>>>>>>> 3641f2a783135d5c4d32fe6bce7dca55739ee961
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
