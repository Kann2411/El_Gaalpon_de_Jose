'use client';
import { useState, useEffect } from 'react';
import { Membership } from "@/interfaces/interfaces";
import { getMembresias, deleteMembresia } from '../../lib/server/fetchMembresias';
import Swal from 'sweetalert2';

export default function PlansList() {
  const [memberships, setMemberships] = useState<Membership[] | null>(null);

  // Cargar membresías desde la API
  useEffect(() => {
    const fetchMemberships = async () => {
      const data = await getMembresias();
      setMemberships(data);
    };

    fetchMemberships();
  }, []);

  // Manejar la eliminación de membresías
  const handleDelete = async (id: string) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this membership!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      customClass: {
        popup: 'bg-[#222222] text-white',
        title: 'text-[#B0E9FF]',
        confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
        cancelButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
      },
      buttonsStyling: false,
    });

    if (confirmed.isConfirmed) {
      const success = await deleteMembresia(id);
      if (success) {
        Swal.fire({
          title: 'Deleted!',
          text: 'The membership has been deleted.',
          icon: 'success',
          customClass: {
            popup: 'bg-[#222222] text-white',
            title: 'text-[#B0E9FF]',
            confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
          },
          buttonsStyling: false,
        });
        setMemberships((prev) => prev?.filter((membership) => membership.id !== id) || null);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue deleting the membership.',
          icon: 'error',
          customClass: {
            popup: 'bg-[#222222] text-white',
            title: 'text-[#B0E9FF]',
            confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
          },
          buttonsStyling: false,
        });
      }
    }
  };

  if (!memberships) {
    return <div>Loading...</div>; // Puede ser un loading spinner o cualquier otro indicador de carga
  }

  return (
    <div className="bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Membership Plans</h2>
      <div className="space-y-4">
        {memberships.map((membership) => (
          <div
            key={membership.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-semibold">{membership.plan}</h3>
            <p className="text-lg">{membership.description}</p>
            <p className="text-sm">Price: {membership.price} {membership.currency}</p>
            <p className="text-sm">Ideal for: {membership.idealFor}</p>
            <div className="mt-2">
              <h4 className="text-lg">Benefits:</h4>
              <ul className="list-disc pl-5">
                {membership.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm">{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDelete(membership.id)}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
