'use client'
import { deleteTrainingPlan, getTrainingPlans } from '@/lib/server/fetchCoaches';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { UserContext } from '@/context/user';

interface TrainingPlan {
  id: string;
  description: string;
  file: string; 
}

const TrainingPlans: React.FC = () => {
  const { user } = useContext(UserContext);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      setLoading(true);
      try {
        const plans = await getTrainingPlans();
        setTrainingPlans(plans);
      } catch (err) {
        setError('Error when fetching training plans');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this plan?');
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
    return <div>Loading training plan...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Planes de Entrenamiento</h2>
      {trainingPlans.length === 0 ? (
        <div>There's no training plans to show</div>
      ) : (
        <ul>
          {trainingPlans.map(plan => (
            <li key={plan.id} className="mb-4">
              <p className="mb-2">{plan.description}</p>

              {user?.role === 'coach' && ( // Mostrar el botón "Eliminar" solo si el rol es "coach"
                <button 
                  onClick={() => handleDelete(plan.id)} 
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}

              <button 
                onClick={() => openModal(plan.file)} 
                className="ml-4 bg-gray-700 text-white py-1 px-3 rounded hover:bg-gray-800"
              >
                Show plan
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
          {selectedPlan && <img src={selectedPlan} alt="Training Plan" className="max-w-full h-auto" />}
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
