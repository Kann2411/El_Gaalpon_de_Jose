"use client";

import { IUser } from "@/interfaces/interfaces";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<IUser>, file?: File) => void;
  currentUser: Partial<IUser> | null;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  currentUser,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    dni: currentUser?.dni || "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentUser?.imgUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentUser?.imgUrl) {
      setPreviewUrl(currentUser.imgUrl);
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, file || undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(selectedFile.type)) {
        Swal.fire({
          icon: "error",
          title: "Format not supported",
          text: "Please upload an image in JPEG, JPG or PNG format.",
          background: "#222222",
          color: "#ffffff",
        });
        return;
      }

      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-900 rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">Edit profile</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={
                      previewUrl ||
                      currentUser?.imgUrl ||
                      "/placeholder.svg?height=128&width=128"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-red-600"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="text-white" size={24} />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="mt-2 text-sm text-gray-400">
                  Click to change the photo
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  DNI
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Save Changes{" "}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
