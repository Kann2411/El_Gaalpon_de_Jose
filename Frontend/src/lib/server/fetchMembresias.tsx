export async function getMembresia() {
  try {
    const response = await fetch("http://localhost:3000/membresia");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching membresia:", error);
  }
}
