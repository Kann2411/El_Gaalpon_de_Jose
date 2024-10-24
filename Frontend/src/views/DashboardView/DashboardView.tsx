"use client";
import { UserContext } from "@/context/user";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardView() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user, logOut, isLogged, setUser, imgUrl, setImgUrl } =
    useContext(UserContext);

  const handleLogout = () => {
    logOut();
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
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    console.log(user.id);
    console.log("user:" + user.imgUrl);

    const formData = new FormData();
    formData.append("file", file);

    setShowModal(false); // Cerrar el modal después de subir la foto
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Título de perfil */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Mi <span className="text-red-600">Perfil</span>
        </h1>
      </div>

      {/* Contenedor del perfil */}
      <div className="w-full max-w-lg h-auto max-h-lg p-8 bg-zinc-950 shadow-lg overflow-y-auto">
        <div className="bg-zinc-900 p-4 rounded-lg shadow-md mb-4 flex flex-col items-center">
          <img
            src={
              imgUrl ??
              "https://i.postimg.cc/Ssxqc09d/Dise-o-sin-t-tulo-17-removebg-preview.png"
            }
            alt="avatar"
            className="w-32 h-32 rounded-full mb-4"
          />
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Cambiar foto de perfil
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
          <h1 className="text-2xl font-bold mb-4 text-center">
            Bienvenido, {user?.name}
          </h1>
          <p className="text-gray-400 text-center mb-2">Email: {user?.email}</p>
          <p className="text-gray-400 text-center mb-2">
            Teléfono: {user?.phone}
          </p>
          <p className="text-gray-400 text-center mb-4">Dirección:</p>
          <button
            onClick={handleLogout}
            className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
