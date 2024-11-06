import { fitZoneApi } from "@/api/rutaApi";

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
