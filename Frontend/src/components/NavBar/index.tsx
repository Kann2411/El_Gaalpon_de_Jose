"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/icono-principal.png";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/user";
import ModalProfilePhoto from "../ModalProfilePhoto/ModalProfilePhoto";
import Swal from "sweetalert2";

const NavBarComponent = () => {
  const { user, logOut, isLogged, setUser, imgUrl, setImgUrl } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null); 
  const [showModal, setShowModal] = useState<boolean>(false); 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
        setShowModal(true); // Mostrar el modal cuando se seleccione un archivo
    }
};
  
const handleCancel = () => {
    setShowModal(false); // Cerrar el modal sin subir
    setFile(null); // Limpiar el archivo si se cancela
}

  const handleUpload = async () => {
    if (!file || !user) return;
console.log(user.id)
console.log('user:' + user.imgUrl)

    const formData = new FormData();
    formData.append("file", file); 

    setShowModal(false); // Cerrar el modal después de subir la foto
    setFile(null)

    
  
    try {
      const response = await fetch(
        `http://localhost:3000/files/profileImages/${user.id}`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setImgUrl(() => (data.imgUrl ));
        localStorage.setItem('imgUrl', data.imgUrl);
        Swal.fire({
            title: 'Super!',
            text: 'Profile photo updated successfully!',
            icon: 'success',
            confirmButtonText: 'Great',
            customClass: {
              popup: 'bg-black text-white', 
              title: 'text-red-600',
              confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md',
            },
            buttonsStyling: false, 
          })
       
        setIsMenuOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        Swal.fire({
            title: 'Mmm...',
            text: `Failed to upload profile photo: ${errorData.message || "Unknown error"}`,
            icon: 'error',
            confirmButtonText: 'Ok',
            customClass: {
              popup: 'bg-black text-white', 
              title: 'text-red-600',
              confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none',
            },
            buttonsStyling: false, 
          })
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        title: 'Mmm...',
        text: "Error when uploading the file.",
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: 'bg-black text-white', 
          title: 'text-red-600',
          confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none',
        },
        buttonsStyling: false, 
      })
    }
  };
  
  

  useEffect(() => {
    if (isLogged) {
      router.push("/home");
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

      {/* Menús basados en el rol del usuario */}
      {user?.role === "user" ? (
  <nav className="flex-1 flex items-center justify-center">
    <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
      {["Home", "Plans", "Contact Us", "Appointments"].map((item, index) => {
        const lowerCaseItem = item.toLowerCase();
        const route =
          lowerCaseItem === "home"
            ? "/home"
            : lowerCaseItem === "plans"
            ? "/plans"
            : lowerCaseItem === "contact us"
            ? "/contact"
            : "/appointments";

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
                pathname === route ? "scale-x-100" : "scale-x-0"}`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          </li>
        );
      })}
    </ul>
  </nav>
) : user?.role === "admin" ? (
  <nav className="flex-1 flex items-center justify-center">
    <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
      {["Users", "Coaches", "Admins"].map((item, index) => {
        const lowerCaseItem = item.toLowerCase();
        const route =
          lowerCaseItem === "users"
            ? "/users"
            : lowerCaseItem === "coaches"
            ? "/coaches"
            : "/admins";

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
                pathname === route ? "scale-x-100" : "scale-x-0"}`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          </li>
        );
      })}
    </ul>
  </nav>
) : user?.role === "coach" ? (
  <nav className="flex-1 flex items-center justify-center">
    <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
      {["Training Management"].map((item, index) => {
        const lowerCaseItem = item.toLowerCase();
        const route = lowerCaseItem === "training management" ? "/training-management" : "#"; 
        
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
                pathname === route ? "scale-x-100" : "scale-x-0"}`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          </li>
        );
      })}
    </ul>
  </nav>
) : !isLogged ? (
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
                pathname === route ? "scale-x-100" : "scale-x-0"}`}
            />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
          </li>
        );
      })}
    </ul>
  </nav>
) : null}
      
      {isLogged ? (
        <div className="relative" ref={menuRef}>
          <div
            className="w-10 h-10 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 me-5"
            onClick={toggleMenu}
          >
            <img
              src={
                imgUrl ??
                "https://i.postimg.cc/Ssxqc09d/Dise-o-sin-t-tulo-17-removebg-preview.png"
              }
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

                {/* Botón para cambiar la foto de perfil */}
                <button
                onClick={() => document.getElementById("fileInput")?.click()}
                className="w-full px-4 py-2 text-left text-black hover:bg-red-100"
            >
                Change profile photo
            </button>

            {/* Input oculto para subir archivos */}
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Modal de confirmación */}
           
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
            Login
          </Link>
          <Link
            href="/register"
            className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}

<ModalProfilePhoto isOpen={showModal} onClose={handleCancel} onAccept={handleUpload}>
                Are you sure you want to change your photo?
            </ModalProfilePhoto>
    </header>
  );
};

export default NavBarComponent;
