// Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    children: React.ReactNode; // Agregamos esta línea
}

const ModalProfilePhoto: React.FC<ModalProps> = ({ isOpen, onClose, onAccept, children }) => {
    if (!isOpen) return null; // No renderizar el modal si no está abierto

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="bg-neutral-900 rounded-lg p-6 max-w-md w-full">
                <h2 className="text-white text-lg font-mediummb-4 text-center mb-7">{children}</h2>
                <div className="flex justify-center">
                    <button
                        onClick={onAccept}
                        className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded me-5"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 ms-5"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProfilePhoto;
