'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button/Button'

const images = [
  {
    src: "https://covermedia.mx/wp-content/uploads/2023/03/young-adult-doing-indoor-sport-gym-696x464.jpg",
    title: "GET FIT WITH OUR DEDICATED CLASSES",
    description: "At FitZone, we offer rigorous classes designed to challenge and inspire you every step of the way. Our experienced instructors push you to break through barriers and reach your peak performance."
  },
  {
    src: "https://i.postimg.cc/QdNgPYjK/pexels-andrej-klintsy-3607566-6392835.jpg",
    title: "UNLOCK YOUR POTENTIAL WITH PERSONALIZED TRAINING",
    description: "At FitZone, we believe that fitness is not one-size-fits-all. Our certified personal trainers work closely with you to create tailored workout plans that fit your unique goals and lifestyle."
  },
  {
    src: "https://i.postimg.cc/T3PmQycr/photo-1517836357463-d25dfeac3438.jpg",
    title: "UNMATCHED VARIETY OF WORKOUT MACHINES",
    description: "FitZone is fully equipped with an extensive range of state-of-the-art machines to help you target every muscle group. From cardio and strength training to functional fitness."
  }
]

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="relative w-full h-[calc(100vh-80px)]">
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white text-center max-w-4xl px-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {images[currentIndex].title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={index % 3 === 0 ? "text-red-600" : ""}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </h2>
              <p className="text-lg mb-8">{images[currentIndex].description}</p>
              <Button content="See more" redirectTo="/home" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}