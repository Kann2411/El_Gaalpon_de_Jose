import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface Coach {
  id: number;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  instagram: string;
  twitter: string;
  linkedin: string;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: "Alex Johnson",
    specialty: "High Intensity and Functional Training Area",
    image: "https://img.freepik.com/foto-gratis/joven-hombre-deportes-expresion-feliz_1194-1589.jpg?t=st=1730760038~exp=1730763638~hmac=2d8c24cebbb91fb191bf8c80693782fd66312a05e72b164e2690a4e88a5e4f78&w=1380",
    bio: "Alex is a certified Crossfit trainer with 10 years of experience in high-intensity workouts.",
    instagram: "https://instagram.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson"
  },
  {
    id: 2,
    name: "Sarah Lee",
    specialty: "Wellness and Flexibility area",
    image: "https://img.freepik.com/foto-gratis/hermosa-mujer-gimnasio_23-2147789567.jpg?t=st=1730760165~exp=1730763765~hmac=e56210e535baa640c48ee386823747d8ab98b16bcbf424d07050677b62b0f9bb&w=1380",
    bio: "Sarah specializes in mindfulness and body awareness through Yoga and Pilates practices.",
    instagram: "https://instagram.com/sarahlee",
    twitter: "https://twitter.com/sarahlee",
    linkedin: "https://linkedin.com/in/sarahlee"
  },
  {
    id: 3,
    name: "Mike Torres",
    specialty: "Strength and Endurance Training Area",
    image: "https://img.freepik.com/foto-gratis/ajuste-hombre-trabajando-pesas-rusas_23-2149358164.jpg?t=st=1730760215~exp=1730763815~hmac=f34dbe3d9b7021063d9e002cb009a9e979e22bfc37113615d76390f0c2f1bb9c&w=1380",
    bio: "Mike is passionate about helping clients build strength and improve overall conditioning.",
    instagram: "https://instagram.com/miketorres",
    twitter: "https://twitter.com/miketorres",
    linkedin: "https://linkedin.com/in/miketorres"
  }
];

const CoachCards: React.FC = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6"> Meet Our <span className="text-red-600"> Expert Coaches </span> </h2>
        <p className="text-center text-gray-400 mb-6">
        Find the right coach for your fitness goals and start your journey to a healthier lifestyle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coaches.map((coach) => (
            <motion.div
              key={coach.id}
              className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={coach.image} alt={coach.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{coach.name}</h3>
                <p className="text-red-500 font-medium mb-4">{coach.specialty}</p>
                <p className="text-gray-400 mb-6">{coach.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={coach.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram size={24} />
                  </a>
                  <a href={coach.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaTwitter size={24} />
                  </a>
                  <a href={coach.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachCards;