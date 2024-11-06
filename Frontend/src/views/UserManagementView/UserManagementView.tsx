"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { getUsers, changeUserRole, banUser } from "@/lib/server/fetchUsers";
import { IUser } from "@/interfaces/interfaces";
import Swal from "sweetalert2";
import Image from "next/image";

export default function UserManagementView() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedRole, setSelectedRole] = useState<"user" | "coach" | "admin">("user");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      const filteredUsers = data.filter((u) => u.role === selectedRole);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } 
  };

  const handleChangeRole = async (id: string, newRole: "user" | "admin" | "coach") => {
    try {
      await changeUserRole(id, newRole);
      fetchUsers();
      Swal.fire({
        title: "Success!",
        text: "Role changed successfully",
        icon: "success",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    } catch (error) {
      console.error("Error changing role:", error);
      Swal.fire({
        title: "Oops",
        text: "Error when changing role",
        icon: "error",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    }
  };

  const handleBanUser = async (id: string, isBanned: boolean) => {
    try {
      await banUser(id, isBanned);
      setUsers((prevUsers) =>
        prevUsers.map((user) => 
          user.id === id ? { ...user, isBanned: !user.isBanned } : user
        )
      );
      Swal.fire({
        title: isBanned ? "Super!" : "Yey!",
        text: isBanned ? "User banned successfully" : "User unbanned successfully",
        icon: "success",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    } catch (error) {
      console.error("Error changing ban status:", error);
      Swal.fire({
        title: "Oops...",
        text: "Error when changing ban status",
        icon: "error",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
    }
  };

  const renderRoleButtons = (userRole: "user" | "admin" | "coach", id: string) => {
    const roles = ["user", "admin", "coach"] as const;
    return roles
      .filter((role) => role !== userRole)
      .map((role) => (
        <button
          key={role}
          onClick={() => handleChangeRole(id, role)}
          className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
        >
          Change to {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      ));
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
    } else {
      router.push("/");
    }
  }, [user, router, selectedRole]);


  return (
    <div className="bg-black text-white p-6 min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-center">Users <span className="text-red-600 ">Controller</span></h1>
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setSelectedRole("user")}
          className={`bg-red-600 text-white py-2 px-4 rounded transition duration-200 ${selectedRole === "user" ? "bg-red-700" : "hover:bg-red-700"}`}
        >
          Users
        </button>
        <button
          onClick={() => setSelectedRole("coach")}
          className={`bg-red-600 text-white py-2 px-4 rounded transition duration-200 ${selectedRole === "coach" ? "bg-red-700" : "hover:bg-red-700"}`}
        >
          Coaches
        </button>
        <button
          onClick={() => setSelectedRole("admin")}
          className={`bg-red-600 text-white py-2 px-4 rounded transition duration-200 ${selectedRole === "admin" ? "bg-red-700" : "hover:bg-red-700"}`}
        >
          Admins
        </button>
      </div>
      <ul className="space-y-4">
        {users.map((u) => (
          <li key={u.id} className="flex justify-between items-center p-4 bg-zinc-900 rounded-lg shadow-md">
            <div className="flex flex-row">
            <Image
          src={u.imgUrl || "/default-avatar.png"} 
          alt={u.name}
          width={40}
          height={40} 
          className="rounded-full me-4"
        />
            <span className="text-lg pt-1">
              {u.name} - {u.email} - Role: {u.role || "Role not defined"}
            </span>
            </div>
            <div className="flex space-x-2">
              {u.role ? renderRoleButtons(u.role as "user" | "admin" | "coach", u.id) : null}
              <button
                onClick={() => handleBanUser(u.id, !u.isBanned)}
                className={`py-1 px-3 rounded text-white ${u.isBanned ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {u.isBanned ? "Unban" : "Ban"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
