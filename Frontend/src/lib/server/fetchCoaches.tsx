import { fitZoneApi } from "@/api/rutaApi";
import Swal from "sweetalert2";

export async function createPlan(description: string) {
  try {
    const token = localStorage.getItem("token");

        const bodyData = {
            description: description
        };
      
        const response = await fetch(`${fitZoneApi}/training-plans`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          const errorData = await response.json();     
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${errorData.message}`,
            showConfirmButton: false,
            timer: 3500,
            toast: true,
            background: '#222222',
            color: '#ffffff',
            customClass: {
              popup: 'animated slideInRight'
            }
          });
            console.error("Server error:", errorData); 
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Server response", result);
        return result;
    } catch (error) {
        console.error("Error when creating plan", error);
        return null;
    }

}

export async function uploadImage(id: string, file: File) {
  try {
    const token = localStorage.getItem("token");


        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type) || file.size > 200 * 1024) {
            throw new Error("El archivo debe ser una imagen en formato jpg, jpeg, png o webp y menor a 200KB");
        }

        const formData = new FormData();
        formData.append('file', file); 

        const response = await fetch(`${fitZoneApi}/files/uploadImage/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();     
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${errorData.message}`,
            showConfirmButton: false,
            timer: 3500,
            toast: true,
            background: '#222222',
            color: '#ffffff',
            customClass: {
              popup: 'animated slideInRight'
            }
          });
            console.error("Server error:", errorData); 
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Server response", result);
        return result;
    } catch (error) {
        console.error("Error when uploading image", error);
        return null;
    }

  
}

// api/trainingApi.ts
export const deleteTrainingPlan = async (id: string) => {
  
    try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`${fitZoneApi}/training-plans/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

    if (!response.ok) {
      const errorData = await response.json();     
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText}, Details: ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar el plan de entrenamiento:", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error when deleting training plan",
      showConfirmButton: false,
      timer: 3500,
      toast: true,
      background: '#222222',
      color: '#ffffff',
      customClass: {
        popup: 'animated slideInRight'
      }
    });

  }
};

export const getTrainingPlans = async () => {

    try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`${fitZoneApi}/training-plans`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

    if (!response.ok) {
      const errorData = await response.json();     
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Training plans data:", data);
    return data;
  } catch (error) {
    console.error("Error obtaining training plans:", error);
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Error when obtaining training plans",
      showConfirmButton: false,
      timer: 3500,
      toast: true,
      background: '#222222',
      color: '#ffffff',
      customClass: {
        popup: 'animated slideInRight'
      }
    });

  }
};

export const getReservedClasses = async (classId: string) => {
  try {
    const response = await fetch(
      `${fitZoneApi}/classRegistration/class/${classId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      const errorData = await response.json();     
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obtaining reservated classes:", error);
  }
};


export const getCoaches = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${fitZoneApi}/users/coaches`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });
    if (!response.ok) {
      const errorData = await response.json();     
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obtaining coaches:", error);
  }
};

export const uploadClassImage = async (classId: string, file: File): Promise<any> => {
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
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${errorData.message}`,
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      console.error("Server error:", errorData); 
      throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

    const result = await response.json();
    console.log("Server response", result);
    return result
  } catch (error) {
    console.error("Error when uploading image", error);
    return null;
  }
};
