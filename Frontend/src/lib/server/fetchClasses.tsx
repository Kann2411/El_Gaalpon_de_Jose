import { fitZoneApi } from "@/api/rutaApi";
import { GymClass, IClassData } from "@/interfaces/interfaces";
import { Result } from "postcss";

export const getClassData = async () => {
    try {
      const response = await fetch(`${fitZoneApi}/class`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Class data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  }

  export const createClass = async (classData: IClassData): Promise<any> => {
    try {
      const response = await fetch("http://localhost:3000/class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al crear la clase:", errorData);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Clase creada:", result); // Log para verificar el resultado
      return result;
    } catch (error) {
      console.error("Error al crear la clase:", error);
    }
  };

  
/*   export const uploadClassImage = async (classId: string, file: File): Promise<any> => {
    try {

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type) || file.size > 200 * 1024) {
          throw new Error("El archivo debe ser una imagen en formato jpg, jpeg, png o webp y menor a 200KB");
      }

      const formData = new FormData();
      formData.append("file", file);
  
      const response = await fetch(`${fitZoneApi}/files/uploadClassImage/${classId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData); 
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

      const result = await response.json();
      console.log("Server response", result);
      return Result
    } catch (error) {
      console.error("Error when uploading image", error);
      return null;
    }
  };
   */

export const reserveClass = async (claseId: string, userId: string) => {
  try {
    const response = await fetch(`${fitZoneApi}/class/${claseId}/register/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to reserve the class.");
    }

    const data = await response.json();
    console.log("Class reserved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error reserving the class:", error);
    throw error;
  }
};

export async function getClassRegistration(classId: string) {
  try {
    const token = localStorage.getItem('token');
    const url = `${fitZoneApi}/classRegistration/class/${classId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText} - ${url}`
      );
    }

    const data = await response.json();
    return data;

  } catch (error: any) {
    // Detalles adicionales del error
    console.error('Error al obtener el registro de clases:', {
      message: error.message,
      stack: error.stack,
      classId: classId,
      url: `${fitZoneApi}/classRegistration/class/${classId}`,
    });
    return null;
  }
}


export const cancelClassRegistration = async (classId: string, userId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${fitZoneApi}/classRegistration/${classId}/delete/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to cancel class registration');
    }
    return true;
  } catch (error) {
    console.error('Error cancelling class registration:', error);
    return false;
  }
};


export async function getUserClassRegistration(userId: string) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${fitZoneApi}/classRegistration/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;

  } catch (error: any) {
    console.error('Error al obtener el registro de clases:',error.message);
    return null;
  }
}