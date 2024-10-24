import { GymClass } from "@/interfaces/interfaces";

export const getClassData = async () => {
    try {
      const response = await fetch('http://localhost:3000/class', {
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


  // Función para enviar datos
// Cambia la firma de la función
// classService.ts



export const createGymClass = async (gymClass: GymClass) => {
  try {
    const response = await fetch('http://localhost:3000/class', {
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

