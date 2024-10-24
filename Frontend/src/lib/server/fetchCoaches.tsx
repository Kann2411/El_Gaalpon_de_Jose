
export async function createPlan(description: string) {
    try {
        const token = localStorage.getItem('token');
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
  

  export const uploadImage = async (id: string, file: File) => {
    const token = localStorage.getItem('token'); 
    const formData = new FormData();
    formData.append('file', file); 

    try {
        const response = await fetch(`http://localhost:3000/files/uploadImage/${id}`, {
            method: 'PATCH',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        alert('Image uploaded successfully');
        
        return data;
    } catch (error) {
        console.error('Error when uploading image', error);
        alert('Error when uploading image');
    }
};


export const deleteTrainingPlan = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/training-plans/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); 
        console.log('Response data:', data);

        alert('Training plan deleted successfully');

        return data;
    } catch (error) {
        console.error('Error when deleting training plan:', error);
        alert('Error when deleting training plan');
    }
};

export const getTrainingPlans = async () => {

    try {
        const response = await fetch('http://localhost:3000/training-plans', {
            method: 'GET',
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