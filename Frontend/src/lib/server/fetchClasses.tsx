import { GymClass } from "@/interfaces/interfaces";

export const getClassData = async () => {
    try {
      const response = await fetch('https://el-gaalpon-de-jose.onrender.com/class', {
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
  };



export const createGymClass = async (gymClass: GymClass) => {
  try {
    const response = await fetch('https://el-gaalpon-de-jose.onrender.com/class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gymClass),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la clase:', error);
    throw error;
  }
};

export const reserveClass = async (claseId: string, userId: string) => {
  try {
    const response = await fetch(`https://el-gaalpon-de-jose.onrender.com/class/${claseId}/register/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to reserve the class.');
    }

    const data = await response.json();
    console.log('Class reserved successfully:', data);
    return data; 
  } catch (error) {
    console.error('Error reserving the class:', error);
    throw error;
  }
};

export async function getClassRegistration(userId: string) {
  try {
      const response = await fetch(`https://el-gaalpon-de-jose.onrender.com/classRegistration/user/${userId}`);
      
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener el registro de clases:", error);
      return null;
  }
}

