'use client'
import { deleteTrainingPlan, getTrainingPlans } from '@/lib/server/fetchCoaches';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface TrainingPlan {
  id: string;
  description: string;
  file: string; // Para la URL de la imagen
}

const TrainingPlans: React.FC = () => {
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null); // Guardar la URL de la imagen para el modal

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      setLoading(true);
      try {
        const plans = await getTrainingPlans();
        setTrainingPlans(plans);
      } catch (err) {
        setError('Error al obtener los planes de entrenamiento');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este plan?');
    if (confirmed) {
      const success = await deleteTrainingPlan(id);
      if (success) {
        setTrainingPlans(trainingPlans.filter(plan => plan.id !== id));
      }
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedPlan(imageUrl);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  if (loading) {
    return <div>Cargando planes de entrenamiento...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Planes de Entrenamiento</h2>
      {trainingPlans.length === 0 ? (
        <div>No hay planes de entrenamiento disponibles.</div>
      ) : (
        <ul>
          {trainingPlans.map(plan => (
            <li key={plan.id} className="mb-4">
              <p className="mb-2">{plan.description}</p>
              <button 
                onClick={() => handleDelete(plan.id)} 
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
              <button 
                onClick={() => openModal(plan.file)} 
                className="ml-4 bg-gray-700 text-white py-1 px-3 rounded hover:bg-gray-800"
              >
                Mostrar plan
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal 
        isOpen={!!selectedPlan} 
        onRequestClose={closeModal} 
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-4 rounded">
          {selectedPlan && <img src={selectedPlan} alt="Plan de Entrenamiento" className="max-w-full h-auto" />}
          <button 
            onClick={closeModal} 
            className="mt-4 bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TrainingPlans;
