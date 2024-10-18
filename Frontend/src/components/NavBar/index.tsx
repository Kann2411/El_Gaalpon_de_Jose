"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/icono-principal.png";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/user";

const NavBarComponent = () => {
  const { user, logOut, isLogged } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logOut(); // Usamos la función del contexto para cerrar sesión
    setIsMenuOpen(false);
    router.push("/"); // Redirigir al inicio tras cerrar sesión
  };

  useEffect(() => {
    if (isLogged) {
      router.push("/home"); // Redirigir al usuario logueado a la página de inicio
    }
  }, [isLogged, router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white shadow-md">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={60} height={60} />
        <div className="ml-4 text-2xl font-bold">FitZone</div>
      </Link>

      <nav className="flex-1 flex items-center justify-center">
        <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
          {["Home", "Plans", "Contact Us"].map((item, index) => {
            const lowerCaseItem = item.toLowerCase();
            const route =
              lowerCaseItem === "home"
                ? "/home"
                : lowerCaseItem === "plans"
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

      {isLogged ? (
        <div className="relative" ref={menuRef}>
          <div
            className="w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 me-5"
            onClick={toggleMenu}
          >
            <img
              src={user?.imgUrl ?? "https://i.postimg.cc/Ssxqc09d/Dise-o-sin-t-tulo-17-removebg-preview.png"}
              alt="avatar"
              className="w-full h-full rounded-full"
            />
          </div>

          {/* Menú desplegable */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-600 ease-in-out ${
              isMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {isMenuOpen && (
              <>
                <div className="px-4 py-2 text-black">
                  <p className="font-medium">{user?.name}</p>
                </div>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full px-4 py-2 text-left text-black hover:bg-red-100"
                >
                  Dashboard
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                >
                  Log Out
                </button>
                
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="text-white text-sm sm:text-base font-medium px-3 py-2"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
          >
            Inscribirme
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBarComponent;
