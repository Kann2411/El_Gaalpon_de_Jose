"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

const carouselImages: CarouselImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Top-notch equipment",
  },
  {
    id: 2,
    src: "https://es.habcdn.com/photos/project/medium/sala-cardio-2519598.jpg",
    alt: "Cardio room",
  },
  {
    id: 3,
    src: "https://www.palco23.com/files/0002017/000redaccion/fitness/technogym/technogym-remo-728-min.jpg",
    alt: "Weight training area",
  },
  {
    id: 4,
    src: "https://antonovich-design.com/uploads/files/2023/8/2023VjFa4R9MRAc1.png",
    alt: "Yoga area",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/736x/fe/2b/d8/fe2bd8ef822cd67fc9414b3f787aabda.jpg",
    alt: "Locker rooms",
  },
];

const ImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }
  };

  const prevImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length
      );
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getVisibleImages = () => {
    const images = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentImageIndex + i + carouselImages.length) % carouselImages.length;
      images.push(carouselImages[index]);
    }
    return images;
  };

  return (
    <div className="w-full max-w-4xl mb-12">
      <h2 className="text-3xl font-bold text-center mb-4">
        Experience <span className="text-red-600">FitZone</span>
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Top-notch technology and facilities
      </p>
      <div className="relative overflow-hidden">
        <div className="flex justify-center items-center">
          {getVisibleImages().map((image, index) => (
            <div
              key={image.id}
              className={`w-1/3 flex-shrink-0 px-2 transition-all duration-300 ease-in-out ${
                index === 1 ? "scale-100 opacity-100" : "scale-75 opacity-50 blur-sm"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
              {index === 1 && (
                <p className="text-center mt-2 font-semibold">{image.alt}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 p-2 rounded-full text-white transition-transform duration-500 hover:scale-110"
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 p-2 rounded-full text-white transition-transform duration-500 hover:scale-110"
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;
