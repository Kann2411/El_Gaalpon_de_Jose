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

  interface Class {
    name: string;
    intensity: string;
    capacity: number;
    status: string;
    image: string;
    description: string;
    duration: string;
    scheludeId:string
  }
  

  export const createClass = async (classData: Class) => {
    try {
      const response = await fetch('http://localhost:3000/class', {
        method: 'POST',
        body: JSON.stringify(classData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Class created:', data);
      return data;
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };