import { fitZoneApi } from "@/api/rutaApi";
import { GymClass } from "@/interfaces/interfaces";

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

  export const createGymClass = async (gymClass: GymClass) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${fitZoneApi}/class`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(gymClass),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error while creating gym class:", errorData);
        throw new Error(`Failed to create gym class: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      console.log("Server response for created gym class:", data);
      return data;
    } catch (error) {
      console.error("Error while creating gym class:", error);
      return null;
    }
  };
  
  export async function uploadClassImage(classId: string, file: File) {
    try {
      const token = localStorage.getItem("token");
  
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type) || file.size > 200 * 1024) {
        throw new Error("The file must be an image in jpg, jpeg, png, or webp format and less than 200KB.");
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch(`${fitZoneApi}/files/uploadClassImage/${classId}`, {
        method: "PATCH",
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error while uploading class image:", errorData);
        throw new Error(`Failed to upload image for class ID ${classId}: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
      }
  
      const result = await response.json();
      console.log("Server response for uploaded class image:", result);
      return result;
    } catch (error) {
      console.error("Error while uploading class image:", error);
      return null;
    }
  }
  

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
      const response = await fetch(`${fitZoneApi}/classRegistration/user/${classId}`);
      
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
      }

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error al obtener el registro de clases:", error.message);
    return null;
  }
}
