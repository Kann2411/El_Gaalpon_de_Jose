'use client';
import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { UserContext } from '@/context/user';
import NoDataMessage from '../NoDataMessage/NoDataMessage';
import { deleteTrainingPlan, getTrainingPlans } from '@/lib/server/fetchCoaches';

interface TrainingPlan {
  id: string;
  description: string;
  file: string;
}

const PlansList: React.FC = () => {
  const { user } = useContext(UserContext);
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Fetch training plans when the component mounts
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

  // Handle the deletion of a training plan
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this training plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      customClass: {
        popup: 'bg-[#222222] text-white',
        title: 'text-[#B0E9FF]',
        confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
        cancelButton: 'bg-gray-500 text-white hover:bg-gray-600 py-2 px-4 border-none',
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      const success = await deleteTrainingPlan(id);
      if (success) {
        setTrainingPlans(trainingPlans.filter(plan => plan.id !== id));
        Swal.fire({
          title: 'Deleted!',
          text: 'The plan has been successfully deleted.',
          icon: 'success',
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

  // Open the modal to view the plan
  const openModal = (imageUrl: string) => {
    setSelectedPlan(imageUrl);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedPlan(null);
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          My <span className="text-red-600">Plans</span>
        </h1>
      </div>

      {trainingPlans.length === 0 ? (
        <NoDataMessage message="There are no training plans available yet" />
      ) : (
        <div className="text-center container mx-auto p-8 bg-zinc-950 shadow-lg">
          <ul>
            {trainingPlans.map((plan) => (
              <li key={plan.id} className="bg-zinc-900 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">{plan.description}</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => openModal(plan.file)}
                    className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
                  >
                    View Plan
                  </button>
                  {user?.role === 'coach' && (
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    >
                      Delete Plan
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
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
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PlansList;
