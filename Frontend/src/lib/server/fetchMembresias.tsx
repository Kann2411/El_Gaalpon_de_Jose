import { fitZoneApi } from "@/api/rutaApi";
import { Membership } from "@/interfaces/interfaces";

export async function getMembresia() {

    try {
      const response = await fetch(`${fitZoneApi}/membresia`);
      
      if (!response.ok) {
        const errorData = await response.json();     
        alert(errorData.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data); 
      return data;
    } catch (error) {
      console.error('Error fetching membresia:', error);
    }
}

export async function getMembresias(): Promise<Membership[] | null> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${fitZoneApi}/membresia`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const memberships: Membership[] = await response.json();
    console.log("Membresías obtenidas:", memberships);
    return memberships;
  } catch (error) {
    console.error("Error al obtener las membresías:", error);
    alert("Error al obtener las membresías");
    return null;
  }
}

export async function createMembresia(newMembership: Omit<Membership, 'id'>): Promise<Membership | void> {
  try {
    const response = await fetch(`${fitZoneApi}/membresia`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMembership),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear la membresía:", errorData);
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: Membership = await response.json();
    console.log("Membresía creada:", data);
    return data;
  } catch (error) {
    console.error("Error al crear la membresía:", error);
  }
}

export async function deleteMembresia(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${fitZoneApi}/membresia/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText}, Details: ${errorText}`
      );
    }
    console.log("Membresía eliminada exitosamente");
    return true;
  } catch (error) {
    console.error("Error al eliminar la membresía:", error);
    alert("Error al eliminar la membresía");
    return false;
  }
}