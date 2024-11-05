"use client";
import React, { useState, useRef, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/icono-principal.png";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/context/user";
import ModalProfilePhoto from "../ModalProfilePhoto/ModalProfilePhoto";
import Swal from "sweetalert2";
import { Search, LogOut, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/context/SearchContext";
import { fitZoneApi } from "@/api/rutaApi";
import { MessageCircle } from "lucide-react";
import ChatModal from "@/components/ChatModal/ChatModal";

const NavBarComponent = () => {
  const { user, logOut, isLogged } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleCloseChat = () => setIsChatOpen(false);

  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } =
  useSearch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target as Node)
    ) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDashboardClick = () => {
    closeMenu();
    router.push("/dashboard");
  };

  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
    router.push("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("file", file);

    setShowModal(false);
    setFile(null);

    try {
      const response = await fetch(
        `${fitZoneApi}/files/profileImages/${user.id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Actualiza el localStorage con la nueva imagen
        const userId = user.id;
        localStorage.setItem(`imgUrl_${userId}`, data.imgUrl);

        Swal.fire({
          title: "Super!",
          text: "Profile photo updated successfully!",
          icon: "success",
          customClass: {
            popup: "bg-black text-white",
            title: "text-red-600",
            confirmButton:
              "bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md",
          },
          buttonsStyling: false,
        });
        setIsMenuOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        Swal.fire({
          title: "Mmm...",
          text: `Failed to upload profile photo: ${
            errorData.message || "Unknown error"
          }`,
          icon: "error",
          customClass: {
            popup: "bg-black text-white",
            title: "text-red-600",
            confirmButton:
              "bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        title: "Mmm...",
        text: "Error when uploading the file.",
        icon: "error",
        customClass: {
          popup: "bg-black text-white",
          title: "text-red-600",
          confirmButton:
            "bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    }
  };

  useEffect(() => {
    if (isLogged) {
      if (user?.role === "admin") {
        router.push("/users-controller");
      } else if (user?.role === "coach") {
        router.push("/training-management");
      } else if (user?.role === "user") {
        router.push("/home");
      }
    }
  }, [isLogged, router, user?.role]);

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
    <header className="fixed top-0 left-0  right-0 flex items-center justify-between p-4 bg-black text-white shadow-md z-50">
      <Link href="/" className="flex items-center">
        <Image src={logo} alt="logo" width={60} height={60} />
        <div className="ml-4 text-2xl font-bold">FitZone</div>
      </Link>

      {/* Menús basados en el rol del usuario */}
      {user?.role === "user" ? (
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
            {["Classes", "Plans", "Appointments", "Training Plans"].map(
              (item, index) => {
                const lowerCaseItem = item.toLowerCase();
                const route =
                  lowerCaseItem === "classes"
                    ? "/home"
                    : lowerCaseItem === "plans"
                    ? "/plans"
                    : lowerCaseItem === "appointments"
                    ? "/appointments"
                    : "/training-plans";

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
              }
            )}
          </ul>
        </nav>
      ) : user?.role === "admin" ? (
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
            {["Users Controller", "Classes"].map((item, index) => {
              const lowerCaseItem = item.toLowerCase().replace(" ", "-");
              const route =
                lowerCaseItem === "users-controller"
                  ? "/users-controller"
                  : "/classes";
              const isActive = pathname === route;

              return (
                <li key={index} className="relative group">
                  <Link
                    href={route}
                    className={`text-white text-sm sm:text-base font-medium px-3 py-2 ${
                      isActive ? "text-red-600" : ""
                    }`}
                  >
                    {item}
                  </Link>
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      ) : user?.role === "coach" ? (
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
            {["Training Management", "Registrated Classes"].map(
              (item, index) => {
                const lowerCaseItem = item.toLowerCase().replace(" ", "-");
                const route =
                  lowerCaseItem === "training-management"
                    ? "/training-management"
                    : "/registrated-classes";
                const isActive = pathname === route;

                return (
                  <li key={index} className="relative group">
                    <Link
                      href={route}
                      className={`text-white text-sm sm:text-base font-medium px-3 py-2 ${
                        isActive ? "text-red-600" : ""
                      }`}
                    >
                      {item}
                    </Link>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </li>
                );
              }
            )}
          </ul>
        </nav>
      ) : !isLogged ? (
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-6 list-none m-0 p-0 items-center justify-center flex-grow">
            {["Classes", "Plans"].map((item, index) => {
              const lowerCaseItem = item.toLowerCase();
              const route = lowerCaseItem === "classes" ? "/home" : "/plans";

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
      ) : null}

      {user?.role === "user" && (
        <button
          onClick={handleCloseChat}
          className="p-2 text-white hover:text-red-600 transition-colors duration-200 ml-4"
        >
          {user?.role === "user" && <ChatModal onClose={handleCloseChat} />}
          {isChatOpen && <ChatModal onClose={handleCloseChat} />}
          
        </button>
      )}

      {/* Icono de búsqueda solo en /home */}
      {pathname === "/home" && (
        <div className="relative ml-auto mr-5" ref={searchContainerRef}>
          <button
            onClick={toggleSearch}
            className="p-2 text-white hover:text-red-600 transition-colors duration-200"
          >
            <Search />
          </button>
          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute right-0 top-full mt-2"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 bg-gray-800 text-white rounded-md"
                  placeholder="Search..."
                />
                <button type="submit" className="hidden">
                  Search
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      )}

      {isLogged ? (
        <div className="relative" ref={menuRef}>
          <div
            className="w-14 h-14 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 me-5"
            onClick={toggleMenu}
          >
            <img
              src={
                user?.imgUrl ||
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
                  {/* Información del usuario */}
                  <div className="mb-4 border-solid ">
                    <p className="font-medium text-center">{user?.name}</p>
                    <p className="font-light ml-1 text-center">{user?.email}</p>
                  </div>

                  {/* Botón del Dashboard */}
                  <button
                    onClick={() => {
                      closeMenu(); // Cerrar el menú
                      router.push("/dashboard"); // Redirigir al dashboard
                    }}
                    className="w-full px-4 py-2 flex items-center text-left text-black hover:bg-red-100 mb-4"
                  >
                    <UserRound className="w-4 h-4 mr-2" />
                    Dashboard
                  </button>

                  {/* Línea gris separadora */}
                  <hr className="border-gray-400 my-4 w-full" />

                  {/* Botón de Cerrar Sesión */}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center text-left text-red-600 hover:bg-red-100 mb-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </button>
                </div>

                {/* Botón para cambiar la foto de perfil
                <button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="w-full px-4 py-2 text-left text-black hover:bg-red-100"
                >
                  Change profile photo
                </button> */}

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
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-lg font-medium px-4 py-2 rounded-md bg-red-600 text-white shadow-md hover:bg-red-800 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* <ModalProfilePhoto
        isOpen={showModal}
        onClose={handleCancel}
        onAccept={handleUpload}
      >
        Are you sure you want to change your photo?
      </ModalProfilePhoto> */}
    </header>
  );
};

export default NavBarComponent;
