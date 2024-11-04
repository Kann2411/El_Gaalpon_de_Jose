"use client";
import { UserContext } from "@/context/user";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, LogOut, Key, CreditCard } from "lucide-react";
import Link from "next/link";
import EditProfileModal from "@/components/editProfile/EditProfileModal";
import Swal from "sweetalert2";
import IUser from "@/interfaces/interfaces";
import ModalProfilePhoto from "@/components/ModalProfilePhoto/ModalProfilePhoto";
import { fetchUserData, getUsers, uploadProfilePhoto, updateUserProfile, updateProfilePhoto } from "@/lib/server/fetchUsers";


export default function DashboardView() {

  interface IUserInfo {
    imgUrl: string;
    id: string;
    name: string;
    dni: string;
    email: string;
    phone: string;
    registrationMethod: string;
    estadoMembresia: string;
    membership: null | string
  }

  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user, logOut, setUser } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({} as IUserInfo);

  const handleLogout = () => {
    logOut();
    router.push("/");
  };


  useEffect(() => {
    const getUsersInfo = async () => {
      try {
        const userId = user?.id; // Aquí puede ser undefined
        const token = localStorage.getItem('token');
  
        if (userId && token) { // Verificamos que ambos valores estén definidos
          const usersData = await fetchUserData(userId, token);
          if (usersData) {
            console.log(`user data: ${usersData.membership}`);
            setUserInfo(usersData);
          }
        } else {
          console.error("User ID or token is undefined");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };
  
    getUsersInfo();
  }, [user]); // Agregar user como dependencia
  
  

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
    if (!file || !user || !user.id) return;
  
    try {
      const result = await updateProfilePhoto(user.id, file);
      if (result) {
        setUser(prevUser => ({
          ...prevUser,
          imgUrl: result.imgUrl
        }));
        setUserInfo(prevInfo => ({
          ...prevInfo,
          imgUrl: result.imgUrl
        }));
        Swal.fire({
          icon: "success",
          title: "Updated profile photo!",
          timer: 2000,
          showConfirmButton: false,
          background: '#222222',
          color: '#ffffff'
        });
      } else {
        throw new Error("Failed to update profile photo");
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      Swal.fire({
        icon: "error",
        title: "Error when updating profile photo",
        text: "Please try again later.",
        timer: 2000,
        showConfirmButton: false,
        background: '#222222',
        color: '#ffffff'
      });
    }
  
    setShowModal(false);
    setFile(null);
  };


  
const handleSaveProfile = async (userData: Partial<IUser>) => {
  try {
    if (!user || !user.id) {
      throw new Error("User ID is missing");
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const updatedUser = await updateUserProfile(user.id, userData, token);

    if (updatedUser) {
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));

      setUserInfo(prevInfo => ({
        ...prevInfo,
        ...updatedUser
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
    } else {
      throw new Error("Error updating user profile");
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
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
                    src={user?.imgUrl}
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
                  {userInfo.membership === null ? (
                    <div className="text-center">
                    <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">No active memberships</p>
                    <Link
                      href="/plans"
                      className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      View Plans
                    </Link>
                  </div>):(
                    <div className="text-center">
                      <p className="text-gray-400">Plan: <span className="text-red-500">{userInfo.membership}</span></p>
                      <p className="text-gray-400">Status:  <span className="text-red-500">{userInfo.estadoMembresia}</span></p>
                    </div>
                  ) }
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

      <ModalProfilePhoto
  isOpen={showModal}
  onClose={handleCancel} // Cambia aquí
  onAccept={handleUpload} // Cambia aquí
>
  Change photo
</ModalProfilePhoto>


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