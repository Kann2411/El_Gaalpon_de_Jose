import React from 'react';

const TestimonialCard: React.FC = () => {
  return (
    <div className="py-10 bg-black text-white">
      <h2 className="text-center text-3xl font-bold mb-8">We invite you to trust our services</h2>
      <p className="text-center text-gray-400 mb-12">Here’s what some of our clients are saying. Their feedback helps us provide the best quality service.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">
          <img
            src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
           className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">Lorenzo Peralta</h3>
          <p className="text-sm text-gray-500">Youtuber</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"FitZone is exactly what I needed to stay in shape. The staff is amazing, and the results speak for themselves. Highly recommended!"</blockquote>
        </div>
        
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">

          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg"
          className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">María Pérez</h3>
          <p className="text-sm text-gray-500">Nutritionist</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"With FitZone, I found a fast and reliable way to reach my fitness goals. The quality of service and dedication from the trainers really impressed me."</blockquote>
        </div>
        
        <div className="rounded-lg shadow-md p-6 text-center bg-zinc-900">
          <img
            src="https://t4.ftcdn.net/jpg/07/02/97/19/360_F_702971991_55fM74EQd6Q1xv3tDOEO90XNiyY3ypTq.jpg"
            alt="Carlos Gómez"
             className="mx-auto rounded-full w-24 h-24 mb-4"
          />
          <h3 className="text-lg font-semibold">Juan Gómez</h3>
          <p className="text-sm text-gray-500">Gymnast</p>
          <p className="text-xl mt-4 mb-2">⭐⭐⭐⭐⭐</p>
          <blockquote className="text-gray-300 italic">"FitZone helped me maintain my fitness routine. Although I had to wait a bit, the quality of the facilities and the coaching was excellent."</blockquote>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
