import { fitZoneApi } from "@/api/rutaApi";
import { UserContext } from "@/context/user";
import {
  ILogin,
  IRegister,
  IUser,
  IUserResponse,
} from "@/interfaces/interfaces";
import { useContext } from "react";

// Asegúrate de que el tipo devuelto sea IUserResponse en lugar de IUser
export async function postSignIn(
  credential: ILogin
): Promise<IUserResponse | null> {
  try {
    if (!credential.email || !credential.password) {
      console.error("Email y contraseña son obligatorios");
      return null;
    }
      const response = await fetch(`${fitZoneApi}/auth/signin`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(credential)
      });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result: IUserResponse = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error durante la solicitud de inicio de sesión:",
        error.message
      );
    } else {
      console.error("Error inesperado:", error);
    }
    return null;
  }
}




export async function postSignUp(user: Omit<IUser, "id">) {
  try {
   
    const response = await fetch(`${fitZoneApi}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del servidor:", errorData); // Para obtener más detalles
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor:", result);
    return result;
  } catch (error) {
    console.error("Error durante el registro:", error);
    return null;
  }
}

export const updateUserProfile = async (userId: string, userData: Partial<IUser>, token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};

// src/lib/server/fetchUsers.ts

export const getUsers = async (): Promise<IUser[]> => {
  // Suponiendo que guardas el token en localStorage después del inicio de sesión
  const token = localStorage.getItem("token");

  const response = await fetch(`${fitZoneApi}/users`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluyendo el token en el encabezado
      }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
    );
  }

  return await response.json();
};

// src/lib/server/fetchUsers.ts


export const changeUserRole = async (
  userId: string,
  newRole: "user" | "admin" | "coach"
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token no encontrado");
  }


  const response = await fetch(`${fitZoneApi}/users/changeRole/${userId}?role=${newRole}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error desconocido al cambiar el rol");
  }

  return await response.json();
};

// fetchUserData.ts
export interface UserDataResponse {
  imgUrl: string;
  id: string;
  name: string;
  dni: string;
  email: string;
  phone: string;
  registrationMethod: string;
}

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


export const fetchUserData = async (
  userId: string,
  token: string
): Promise<IUserInfo | null> => {
  try {

    const response = await fetch(`${fitZoneApi}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: IUserInfo = await response.json();
      return data;
    } else {
      console.error("Error fetching user data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export async function banUser(userId: string, isBanned: boolean): Promise<void> {
  const token = localStorage.getItem("token"); 

  if (!token) {
    console.error("Error: Usuario no autenticado.");
    return;
  }

  try {
    const response = await fetch(`${fitZoneApi}/users/ban-user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isBanned }),
    });

    if (!response.ok) {
      throw new Error(`Error al cambiar estado de baneo: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Estado de baneo actualizado exitosamente:", data);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
}

export const uploadProfilePhoto = async (userId: string, file: File): Promise<{ imgUrl: string } | null> => {
  const formData = new FormData();
  formData.append("file", file);
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No authentication token found");
    return null;
  }

  try {
    const response = await fetch(`${fitZoneApi}/files/profileImages/${userId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al subir la foto de perfil");
    }

    const data = await response.json();
    
    if (!data.imgUrl) {
      throw new Error("La respuesta del servidor no incluye la URL de la imagen");
    }

    return { imgUrl: data.imgUrl };
  } catch (error) {
    console.error("Error en uploadProfilePhoto:", error);
    throw error;
  }
};

export const updateProfilePhoto = async (userId: string, file: File): Promise<{ imgUrl: string } | null> => {
  try {
    const result = await uploadProfilePhoto(userId, file);
    
    if (result) {
      // Actualizar el perfil del usuario con la nueva URL de la imagen
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const updateResult = await updateUserProfile(userId, { imgUrl: result.imgUrl }, token);
      
      if (updateResult) {
        return { imgUrl: result.imgUrl };
      } else {
        throw new Error("Failed to update user profile with new image URL");
      }
    } else {
      throw new Error("Failed to upload profile photo");
    }
  } catch (error) {
    console.error("Error in updateProfilePhoto:", error);
    return null;
  }
};


