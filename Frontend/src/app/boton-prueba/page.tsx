/* import React from 'react'

export default function BotonPrueba() {

    const createPreference = async () => {
        try {
            console.log("Creating preference");
    
            const response = await fetch("http://localhost:3000/mercadopago/create_subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(suscripcionData)
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            return data.redirectUrl;
        } catch (error) {
            console.error("Error creating preference:", error);
            return null; 
    };
    
  return (
    <div>BotonPrueba</div>
  )
}
 */