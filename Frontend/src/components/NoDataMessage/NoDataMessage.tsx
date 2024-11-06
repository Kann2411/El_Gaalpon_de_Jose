import React from 'react';
import Lottie from 'react-lottie';
import sadAnimationData from '../../../public/animationdos.json'; // Ruta al archivo JSON

interface NoDataMessageProps {
  message: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sadAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex items-center justify-center h-full bg-black p-6">
      {/* Tarjeta con un límite de ancho */}
      <div className="bg-stone-950 rounded-lg p-6 max-w-sm w-full shadow-lg">
        <p className="text-white text-xl font-semibold mb-4 text-center">{message}</p>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
};

export default NoDataMessage;
