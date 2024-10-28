import React from 'react';
import hombre1 from '../../public/icons/hombre1.png';
import mujer2 from '../../public/icons/mujer2.png';  
import niño3 from '../../public/icons/nino3.png';
import Image from 'next/image';

const TestimonialCard: React.FC = () => {
  return (
    <div className="py-10 bg-black text-white">
      <h2 className="text-center text-3xl font-bold mb-8">We invite you to trust our services</h2>
      <p className="text-center text-gray-400 mb-12">Here’s what some of our clients are saying. Their feedback helps us provide the best quality service.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">
          <Image
            src={hombre1}
            alt="Lorenzo Peralta"
            className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">Lorenzo Peralta</h3>
          <p className="text-sm text-gray-500">Youtuber</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"GymPro is exactly what I needed to stay in shape. The staff is amazing, and the results speak for themselves. Highly recommended!"</blockquote>
        </div>
        
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">
          <Image
            src={mujer2}
            alt="María Pérez"
            className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">María Pérez</h3>
          <p className="text-sm text-gray-500">Nutritionist</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"With GymPro, I found a fast and reliable way to reach my fitness goals. The quality of service and dedication from the trainers really impressed me."</blockquote>
        </div>
        
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">
          <Image
            src={niño3}
            alt="Juan Gómez"
            className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">Juan Gómez</h3>
          <p className="text-sm text-gray-500">Gymnast</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"GymPro helped me maintain my fitness routine. Although I had to wait a bit, the quality of the facilities and the coaching was excellent."</blockquote>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
