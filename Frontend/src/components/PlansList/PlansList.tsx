'use client';
import { useState, useEffect } from 'react';
import { Membership } from "@/interfaces/interfaces";
import { getMembresias, deleteMembresia } from '../../lib/server/fetchMembresias';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Trash2, Edit2 } from 'lucide-react';

export default function PlansList() {
  const [memberships, setMemberships] = useState<Membership[] | null>(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const data = await getMembresias();
        setMemberships(data);
      } catch (error) {
        console.error("Error fetching memberships:", error);
        setMemberships(null);
      }
    };
    fetchMemberships();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, delete it!',
      background: '#000000',
      color: '#ffffff',
    });

    if (result.isConfirmed) {
      try {
        await deleteMembresia(id);
        setMemberships((prev) => prev ? prev.filter((membership) => membership.id !== id) : null);
        Swal.fire({
          title: 'Deleted!',
          text: 'The membership has been deleted.',
          icon: 'success',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#dc2626',
        });
      } catch (error) {
        console.error("Error deleting membership:", error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue deleting the membership.',
          icon: 'error',
          background: '#000000',
          color: '#ffffff',
          confirmButtonColor: '#dc2626',
        });
      }
    }
  };

  if (!memberships) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white p-8 rounded-lg shadow-2xl max-w-7xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Membership plans created</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memberships.map((membership) => (
          <motion.div
            key={membership.id}
            className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-red-500">{membership.plan}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(membership.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{membership.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="font-semibold text-red-400">Price</p>
                <p className="text-gray-300">{membership.price} {membership.currency}</p>
              </div>
              <div>
                <p className="font-semibold text-red-400">Ideal For</p>
                <p className="text-gray-300">{membership.idealFor}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-red-400 mb-2">Benefits:</p>
              <ul className="list-disc pl-5 text-sm text-gray-300">
                {membership.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}