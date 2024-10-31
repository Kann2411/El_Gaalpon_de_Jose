"use client";
import { UserContext } from "@/context/user";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, LogOut, Key, CreditCard } from "lucide-react";
import Link from "next/link";
import EditProfileModal from "@/components/editProfile/EditProfileModal";
import Swal from "sweetalert2";
import IUser from "@/interfaces/interfaces";

export default function DashboardView() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, logOut, setUser, imgUrl, setImgUrl } = useContext(UserContext);

  const handleLogout = () => {
    logOut();
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
  };

  const handleSaveProfile = async (userData: Partial<IUser>) => {
    try {
      //Implementar la llamada al  para actualizar los datos
      // onst response = await updateUserProfile(userData);
      
      setUser(prevUser => ({
        ...prevUser,
        ...userData
      }));

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        background: '#222222',
        color: '#ffffff'
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating profile",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        background: '#222222',
        color: '#ffffff'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 px-6"> 
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            My <span className="text-red-600">Dashboard</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <div className="bg-zinc-900 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <img
                    src={imgUrl ?? "https://i.postimg.cc/Ssxqc09d/Dise-o-sin-t-tulo-17-removebg-preview.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-red-600"
                  />
                  <button
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                  <span className="text-gray-400">Phone</span>
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                  <span className="text-gray-400">DNI</span>
                  <span>{user?.dni || 'Not provided'}</span>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="space-y-6">
              {/* Account Settings */}
              <div className="bg-zinc-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors relative group"
                  >
                    <span className="relative">
                      Edit Profile
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                    </span>
                    <Pencil size={18} />
                  </button>
                  <Link
                    href="/auth/forgot-password"
                    className="w-full flex items-center justify-between p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors relative group"
                  >
                    <span className="relative">
                      Change Password
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                    </span>
                    <Key size={18} />
                  </Link>
                </div>
              </div>

              {/* Membership Section */}
              <div className="bg-zinc-900 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">My Memberships</h3>
                <div className="flex items-center justify-center p-8 bg-zinc-800 rounded-lg">
                  <div className="text-center">
                    <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">No active memberships</p>
                    <Link
                      href="/plans"
                      className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-8 flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveProfile}
        currentUser={user}
      />
    </div>
  );
}