import { ILogin, IRegister, IUser } from "@/interfaces/interfaces";

export async function postSignIn(credential: ILogin): Promise<IUser | null> {
  try {
      if (!credential.email || !credential.password) {
          console.error("Email y contraseña son obligatorios");
          return null;
      }

      const response = await fetch("http://localhost:3000/auth/signin", {
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

      const result = await response.json();
      return result;

  } catch (error) {
      if (error instanceof Error) {
          console.error("Error durante la solicitud de inicio de sesión:", error.message);
      } else {
          console.error("Error inesperado:", error);
      }
      return null;        
  }
}

export async function postSignUp(user: Omit<IUser, "id">) {
  try {
    console.log("Iniciando la solicitud de registro al backend");
    const response = await fetch("http://localhost:3000/auth/signup", {
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


// src/lib/server/fetchUsers.ts

export const getUsers = async (): Promise<IUser[]> => {
  // Suponiendo que guardas el token en localStorage después del inicio de sesión
  const token = localStorage.getItem('token'); 

  const response = await fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluyendo el token en el encabezado
      }
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
  }

  return await response.json();
};

// src/lib/server/fetchUsers.ts

export const changeUserRole = async (userId: string, newRole: 'user' | 'admin' | 'coach') => {
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error('Token no encontrado');
  }

  const response = await fetch(`http://localhost:3000/users/changeRole/${userId}?role=${newRole}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido al cambiar el rol');
  }

  return await response.json();
};

