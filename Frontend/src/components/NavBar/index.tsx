"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/icono-principal.png";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const NavBarComponent = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (session) router.push("/home");
  }, [session, router]);

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white shadow-md">
      <div className="flex items-center">
        <Image src={logo} alt="logo principal" width={60} height={60} />
        <div className="ml-4 text-2xl font-bold">FitZone</div>
      </div>

      <nav className="flex-1 flex items-center justify-center">
        <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
          {["Inicio", "Planes", "Contáctanos"].map((item, index) => {
            const lowerCaseItem = item.toLowerCase();
            const route =
              lowerCaseItem === "inicio"
                ? "/home"
                : lowerCaseItem === "planes"
                ? "/plans"
                : "/contact";

            return (
              <li key={index} className="relative group">
                <Link
                  href={route}
                  className="text-white text-sm sm:text-base font-medium px-3 py-2"
                >
                  {item}
                </Link>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 ${
                    pathname === route ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              </li>
            );
          })}
        </ul>
      </nav>

      {session?.user ? (
        <div className="relative" ref={menuRef}>
          <div
            className="w-14 h-14 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={toggleMenu}
          >
            <img
              src={session.user.image ?? "/default-avatar.png"}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>

          {/* menú desplegable */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-600 ease-in-out ${
              isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {isMenuOpen && (
              <>
                <div className="px-4 py-2 text-black">
                  <p className="font-medium">{session.user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
<<<<<<< HEAD
            href="/register"
            className="text-lg font-medium px-7 py-4 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
=======
            href="/login"
            className="text-white text-sm sm:text-base font-medium px-3 py-2"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800"
>>>>>>> 46f9eb0d05488a3c6c10d7d6eb7b7f98317b2c4e
          >
            Inscribirme
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBarComponent;
