"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  X,
  Search,
  Filter,
} from "lucide-react";
import { getClassData } from "@/lib/server/fetchClasses";
import { UserContext } from "@/context/user";
import Button from "@/components/Button/Button";
import Swal from "sweetalert2";
import { useSearch } from "@/context/SearchContext";
import { motion, AnimatePresence } from "framer-motion";
import { fitZoneApi } from "@/api/rutaApi";
import CoachCard from "@/components/CoachCard/CoachCard";
import ClassFilters from "@/components/class-filters/class-filters";
import { useRouter } from "next/navigation";

interface ClassInfo {
  id: string;
  name: string;
  intensity: string;
  capacity: number;
  status: string;
  image: string;
  description: string;
  duration: string;
  day: string;
  starttime: string;
  endtime: string;
}
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

const HomeView: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [classesData, setClassesData] = useState<ClassInfo[]>([]);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { searchQuery } = useSearch();
  const [filters, setFilters] = useState({
    intensity: [] as string[],
    duration: [] as string[],
    day: [] as string[],
  });
  const closeModal = () => {
    setSelectedClass(null);
  };

  const isReserved = async (userId: string, selectedClassId : string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${fitZoneApi}/classRegistration/user/${userId}`, {
        method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      })
      
      const arrOfClasses = await response.json();
      const classIsReserved = arrOfClasses.some((classObj: any) => classObj.id === selectedClassId);
      
    if (classIsReserved) {
      return true
    } else {
      return false
    }
  } catch(error: any){
    console.error(error)
  }
}

  const onClick = async () => {
    if (!selectedClass || !user) {
      console.error("No class selected or user not logged in");
      Swal.fire({
        title: "Hey!",
        text: "To schedule a class you need to be logged in",
        icon: "warning",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
      router.push("/login");
      return;
    }

    if (user.membership === null) {
      Swal.fire({
        title: "Hey!",
        text: "To schedule a class you need a membership",
        icon: "warning",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
      router.push("/plans");
      return;
    }

if(user.id) {
  const isClassReserved = await isReserved(user.id, selectedClass.id);
  if (isClassReserved) {
    Swal.fire({
      title: "Oops!",
      text: "This class has already been reserved.",
      icon: "error",
      customClass: {
        popup: "bg-[#222222] text-white",
        title: "text-[#B0E9FF]",
        confirmButton:
          "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
      },
      buttonsStyling: false,
    });
    return; // Detener la ejecución si la clase ya está reservada
  }
}
   

    try {
      const claseId = selectedClass.id;
      const userId = user.id;
      const response = await fetch(
        `${fitZoneApi}/classRegistration/${claseId}/register/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to reserve the class. Please try again."
        );
      }

      const data = await response.json();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Class reserved Successfully",
        showConfirmButton: false,
        timer: 3500,
        toast: true,
        background: '#222222',
        color: '#ffffff',
        customClass: {
          popup: 'animated slideInRight'
        }
      });
      closeModal()
      console.log("Class reserved successfully:", data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const detailedMessage = `Error reserving the class: ${error.message}\nStack trace: ${error.stack}`;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${detailedMessage}`,
          showConfirmButton: false,
          timer: 3500,
          toast: true,
          background: '#222222',
          color: '#ffffff',
          customClass: {
            popup: 'animated slideInRight'
          }
        });
  
        console.error("Error reserving the class:", detailedMessage);
      } else if (typeof error === "string") {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error reserving the class",
          showConfirmButton: false,
          timer: 3500,
          toast: true,
          background: '#222222',
          color: '#ffffff',
          customClass: {
            popup: 'animated slideInRight'
          }
        });
  
        console.error("Error reserving the class:", error);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An unknown error ocurred",
          showConfirmButton: false,
          timer: 3500,
          toast: true,
          background: '#222222',
          color: '#ffffff',
          customClass: {
            popup: 'animated slideInRight'
          }
        });
  
        console.error("Unknown error:", error);
      }
    }
  };

  const fetchClassData = async () => {
    try {
      const data = await getClassData();
      setClassesData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching class data:", error);
      setClassesData([]);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  const openModal = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
  };

  

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % carouselImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleImages = () => {
    const images = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentImageIndex + i + carouselImages.length) % carouselImages.length;
      images.push(carouselImages[index]);
    }
    return images;
  };

  // Filtra las clases basándose en la consulta de búsqueda y los filtros
  const filteredClasses = classesData.filter((classInfo) => {
    const matchesSearch = classInfo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesIntensity =
      filters.intensity.length === 0 ||
      filters.intensity.includes(classInfo.intensity);
    const matchesDuration =
      filters.duration.length === 0 ||
      filters.duration.includes(classInfo.duration);
    const matchesDay =
      filters.day.length === 0 || filters.day.includes(classInfo.day);
    return matchesSearch && matchesIntensity && matchesDuration && matchesDay;
  });

  // Función para manejar cambios en los filtros
  const handleFilterChange = (newFilters: {
    intensity: string[];
    duration: string[];
    day: string[];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Título de la sección de clases */}

      {/* Contenedor para filtros y subtítulo */}
      <div className="w-full max-w-9xl px-5 mb-8">
        <div className="flex flex-col items-center relative">
          <div className="absolute left-0 mt-8">
            <ClassFilters onFilterChange={setFilters} />
          </div>
          <h2 className="text-3xl font-bold">
            Experience <span className="text-red-600">FitZone</span>
          </h2>
          <h1 className="text-xl font-extrabold mt-4">
            Discover our <span className="text-red-600">exclusive classes</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classInfo) => (
              <motion.div
                key={classInfo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
                  <div className="flex justify-center pt-5">
                    <Button
                      content="Select"
                      onClick={() => openModal(classInfo)}
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-400"
            >
              <p>There are no available classes that match your search</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Class Modal */}
      {selectedClass && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-zinc-900 rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedClass.name}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            <img
              src={selectedClass.image}
              alt={selectedClass.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">{selectedClass.description}</p>
            <p className="text-gray-300 mb-4">Day: {selectedClass.day}</p>
            <p className="text-gray-300 mb-4">
              Start time: {selectedClass.starttime} <br /> End time:{" "}
              {selectedClass.endtime}
            </p>
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
            <div className="flex justify-center mt-4">
              {/*  {user?.role === "user" && (
                <Button content="Schedule" onClick={onClick} />
              )} */}
              <Button content="Schedule" onClick={onClick} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Image Carousel */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl text-center py-6 font-extrabold">
          Quality <span className="text-red-600">equipment</span>
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Top-notch technology and facilities
        </p>
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center">
            {getVisibleImages().map((image, index) => (
              <div
                key={image.id}
                className={`w-1/3 flex-shrink-0 px-2 transition-all duration-300 ease-in-out ${
                  index === 1
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-50 blur-sm"
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
        </div>
      </div>

      <CoachCard />
    </div>
  );
};

export default HomeView;
