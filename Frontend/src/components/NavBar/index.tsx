"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/icono-principal.png";
import { usePathname } from "next/navigation"; // Usar usePathname para obtener la ruta actual

const NavBarComponent = () => {
  const pathname = usePathname(); // Obtener la ruta actual

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-black text-white shadow-md">
        <div className="flex items-center">
          {/* Logo del gimnasio */}
          <Image src={logo} alt="logo principal" width={60} height={60} />
          <div className="ml-4 text-2xl font-bold">FitZone</div>
        </div>

        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6 list-none m-0 p-0 items-center">
            {["Inicio", "Planes", "Contáctanos"].map((item, index) => {
              // Convertir item a minúsculas para comparar con las rutas
              const lowerCaseItem = item.toLowerCase();
              return (
                <li key={index} className="relative group">
                  <Link
                    href={
                      lowerCaseItem === "inicio" 
                        ? "/home" 
                        : lowerCaseItem === "planes" 
                        ? "/plans" 
                        : `/${lowerCaseItem === "contáctanos" ? "contact" : lowerCaseItem}` // Rutas para Inicio, Planes y Contáctanos
                    }
                    className={`text-white text-sm sm:text-base font-medium px-3 py-2 transition-colors`}
                  >
                    {item}
                  </Link>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 ${
                      pathname === (lowerCaseItem === "inicio" 
                        ? "/home" 
                        : lowerCaseItem === "planes" 
                        ? "/plans" 
                        : `/${lowerCaseItem === "contáctanos" ? "contact" : lowerCaseItem}`
                      ) ? "scale-x-100" : "scale-x-0"
                    }`} 
                  />
                  {/* Línea roja para hover */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100`} 
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Botón Inscribirme alineado a la derecha */}
        <div>
          <Link
            href="/register"
            className="text-lg font-medium px-7 py-4 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
          >
            Inscribirme
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NavBarComponent;
