"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Zap, X } from 'lucide-react';
import { getClassData } from '@/lib/server/fetchClasses';

interface ClassInfo {
  id: number;
  name: string;
  intensity: string;
  capacity: number;
  status: string;
  image: string;
  description: string;
  duration: string;
  schedule: ISchedule
}

interface ISchedule {
  id: string;
  day: string;
  starttime: string;
  endtime: string

}

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}


const carouselImages: CarouselImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Top-notch equipment' },
  { id: 2, src: 'https://es.habcdn.com/photos/project/medium/sala-cardio-2519598.jpg', alt: 'Cardio room' },
  { id: 3, src: 'https://www.palco23.com/files/0002017/000redaccion/fitness/technogym/technogym-remo-728-min.jpg', alt: 'Weight training area' },
  { id: 4, src: 'https://antonovich-design.com/uploads/files/2023/8/2023VjFa4R9MRAc1.png', alt: 'Yoga area' },
  { id: 5, src: 'https://i.pinimg.com/736x/fe/2b/d8/fe2bd8ef822cd67fc9414b3f787aabda.jpg', alt: 'Locker rooms' },
];

const HomeView: React.FC = () => {
  const [classesData, setClassesData] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  const fetchClassData = async () => {
    try {
      const data = await getClassData(); 
      setClassesData(data); 
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  useEffect(() => {
    fetchClassData(); 
  }, []);

  const openModal = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  const nextImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }
  };

  const prevImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
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
      const index = (currentImageIndex + i + carouselImages.length) % carouselImages.length;
      images.push(carouselImages[index]);
    }
    return images;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Image Carousel */}
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
                  index === 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-50 blur-sm'
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

      {/* Class Title */}
      <div className="text-center mb-12"> {/* Increased margin for separation */}
        <h1 className="text-3xl font-extrabold">
          Discover our <span className="text-red-600">exclusive classes</span>
        </h1>
      </div>

      {/* Class Grid */}
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {classesData.map((classInfo) => (
          <div
            key={classInfo.id}
            className="bg-zinc-900 max-w-md w-full mx-auto pt-1 pb-6 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => openModal(classInfo)}
          >
            <img
              src={classInfo.image}
              alt={classInfo.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-center bg-red-600 py-2 text-white rounded-md">
                {classInfo.name}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  <span className="text-sm">DURATION</span>
                </div>
                <span className="text-sm">{classInfo.duration}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-red-600" />
                  <span className="text-sm">INTENSITY</span>
                </div>
                <span className="text-sm">{classInfo.intensity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Class Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedClass.name}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <img src={selectedClass.image} alt={selectedClass.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-gray-300 mb-4">{selectedClass.description}</p>
            <p className="text-gray-300 mb-4">Day: {selectedClass.schedule.day}</p>
            <p className="text-gray-300 mb-4">Start time: {selectedClass.schedule.starttime} <br/> End time: {selectedClass.schedule.endtime}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span>{selectedClass.duration}</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-red-600" />
                <span>{selectedClass.intensity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;
