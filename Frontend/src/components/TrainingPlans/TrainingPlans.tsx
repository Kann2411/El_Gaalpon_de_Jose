'use client';
import { deleteTrainingPlan, getTrainingPlans } from '@/lib/server/fetchCoaches';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2'
import { UserContext } from '@/context/user';
import NoDataMessage from '../NoDataMessage/NoDataMessage';

interface TrainingPlan {
  id: string;
  description: string;
  file: string;
}

const TrainingPlans: React.FC = () => {
  const { user } = useContext(UserContext);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      try {
        const plans = await getTrainingPlans();
        setTrainingPlans(plans);
      } catch (err) {
        setError('Error fetching training plans');
      }
    };
    fetchTrainingPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
        title: 'Confirm Deletion',
        text: 'Are you sure you want to delete this plan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            popup: 'bg-black text-white',
            title: 'text-red-500',
            confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-full transition-colors duration-200',
            cancelButton: 'bg-gray-600 text-white hover:bg-gray-700 py-2 px-4 rounded-full transition-colors duration-200',
        },
        buttonsStyling: false,
    });

    if (result.isConfirmed) {
        const success = await deleteTrainingPlan(id);
        if (success) {
            setTrainingPlans(trainingPlans.filter(plan => plan.id !== id));
            Swal.fire({
                title: 'Success!',
                text: 'The plan has been deleted successfully!',
                icon: 'success',
                customClass: {
                    popup: 'bg-black text-white',
                    title: 'text-red-500',
                    confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-full transition-colors duration-200',
                },
                buttonsStyling: false,
            });
        }
    }
  };

  const openModal = (imageUrl: string) => {
    setSelectedPlan(imageUrl);
  };

  const closeModal = () => {
    setSelectedPlan(null);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl mt-6">
      <h2 className="text-2xl font-bold text-red-500 mb-4">My Training Plans</h2>

      {trainingPlans.length === 0 ? (
        <NoDataMessage message='No training plans available yet'/>
      ) : (
        <ul className="space-y-3">
          {trainingPlans.map(plan => (
            <li key={plan.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm">{plan.description}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal(plan.file)}
                  className="bg-gray-700 text-white py-1 px-3 rounded-full text-xs hover:bg-gray-600 transition-colors duration-200"
                >
                  View
                </button>
                {user?.role === 'coach' && (
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-full text-xs hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={!!selectedPlan}
        onRequestClose={closeModal}
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <div className="bg-gray-900 p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
          {selectedPlan && <img src={selectedPlan} alt="Training Plan" className="max-w-full h-auto" />}
          <button
            onClick={closeModal}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TrainingPlans;