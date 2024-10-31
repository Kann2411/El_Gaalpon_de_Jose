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
    specialty: "Crossfit & HIIT",
    image: "https://img.freepik.com/free-photo/portrait-man-close-up-hard-light_1321-497.jpg?t=st=1730335953~exp=1730339553~hmac=dd8a0b59e0021f4fa4222f02b78cd1dd4529465af63b4c75131edf7291a6cb47&w=1380",
    bio: "Alex is a certified Crossfit trainer with 10 years of experience in high-intensity workouts.",
    instagram: "https://instagram.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson"
  },
  {
    id: 2,
    name: "Sarah Lee",
    specialty: "Yoga & Pilates",
    image: "https://img.freepik.com/free-photo/beautiful-woman-gym_23-2147789567.jpg?t=st=1730336221~exp=1730339821~hmac=f4f1762e2e928c4ea86c6a1e3810ddeb26389b5f2a0084b0383d44e5a94beb63&w=1380",
    bio: "Sarah specializes in mindfulness and body awareness through Yoga and Pilates practices.",
    instagram: "https://instagram.com/sarahlee",
    twitter: "https://twitter.com/sarahlee",
    linkedin: "https://linkedin.com/in/sarahlee"
  },
  {
    id: 3,
    name: "Mike Torres",
    specialty: "Strength & Conditioning",
    image: "https://img.freepik.com/free-photo/front-view-male-boxer-practicing_23-2148615116.jpg?t=st=1730336188~exp=1730339788~hmac=08e0456955624782a06fd97a98616a8e1e604a0f5bccdf851261594607f9cb62&w=1380",
    bio: "Mike is passionate about helping clients build strength and improve overall conditioning.",
    instagram: "https://instagram.com/miketorres",
    twitter: "https://twitter.com/miketorres",
    linkedin: "https://linkedin.com/in/miketorres"
  }
];

const CoachCards: React.FC = () => {
  return (
    <div className="py-16">
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