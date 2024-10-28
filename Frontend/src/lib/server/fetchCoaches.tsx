export async function createPlan(description: string) {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error("Token no disponible");
        }

        const bodyData = {
            description: description
        };
      
        const response = await fetch("http://localhost:3000/training-plans", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
            const errorData = await response.json();
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
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error("Token no disponible");
        }

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type) || file.size > 200 * 1024) {
            throw new Error("El archivo debe ser una imagen en formato jpg, jpeg, png o webp y menor a 200KB");
        }

        const formData = new FormData();
        formData.append('file', file); 

        const response = await fetch(`http://localhost:3000/files/uploadImage/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
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
        const response = await fetch(`http://localhost:3000/training-plans/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Error: ${response.status} ${response.statusText}, Details: ${errorText}`);
        }

        return true; 
    } catch (error) {
        console.error('Error al eliminar el plan de entrenamiento:', error);
        alert('Error al eliminar el plan de entrenamiento');
    }
};


export const getTrainingPlans = async () => {
    try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:3000/training-plans', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Training plans data:', data);
        return data;
    } catch (error) {
        console.error('Error obtaining training plans:', error);
        alert('Error obtaining training plans');
    }
};
