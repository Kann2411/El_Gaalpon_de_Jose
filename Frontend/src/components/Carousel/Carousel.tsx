"use client"

import {  Carousel } from "flowbite-react"
import Button from "../Button/Button"

export default function CarouselComponent() {
    return (
        <div className="w-full h-[550px]">
            <Carousel slideInterval={3000}>
                <div className="relative">
                    <img src="https://i.postimg.cc/bYQQvfJ2/pexels-823sl-2294363.jpg" alt="..." className="object-cover h-full w-full" />
                    <div className="absolute inset-0 flex flex-col justify-center items-start  ps-20 text-white bg-black bg-opacity-50">
                        <h2 className="text-4xl font-bold mb-2 w-1/3">GET FIT WITH OUR <span className="text-red-600">DEDICATED CLASSES</span> </h2>
                        <p className="text-lg mb-4 w-2/3" >At FitZone, we offer rigorous classes designed to challenge and inspire you every step of the way. Our experienced instructors push you to break through barriers and reach your peak performance. </p>
                        <Button content="Ver más" redirectTo="/home"/>
                    </div>
                </div>
                <div className="relative">
                    <img src="https://i.postimg.cc/QdNgPYjK/pexels-andrej-klintsy-3607566-6392835.jpg" alt="..." className="object-cover h-full w-full" />
                    <div className="absolute inset-0 flex flex-col justify-center items-start  ps-20 text-white bg-black bg-opacity-50">
                        <h2 className="text-4xl font-bold mb-2 w-2/3">UNLOCK YOUR POTENTIAL WITH <span className="text-red-600">PERSONALIZED TRAINING</span> </h2>
                        <p className="text-lg mb-4 w-2/3" >At FitZone, we believe that fitness is not one-size-fits-all. Our certified personal trainers work closely with you to create tailored workout plans that fit your unique goals and lifestyle. </p>
                        <Button content="Ver más" redirectTo="/home"/>
                    </div>
                </div>
                <div className="relative">
                    <img src="https://i.postimg.cc/T3PmQycr/photo-1517836357463-d25dfeac3438.jpg" alt="..." className="object-cover h-full w-full" />
                    <div className="absolute inset-0 flex flex-col justify-center items-start  ps-20 text-white bg-black bg-opacity-50">
                        <h2 className="text-4xl font-bold mb-2  w-[500px]">UNMATCH VARIETY OF <span className="text-red-600">WORKOUT MACHINES</span> </h2>
                        <p className="text-lg mb-4 w-2/3" >At FitZone is fully equipped with an extensive range of state-of-the-art machines to help you target every muscle group. From cardio and strength training to functional fitness.</p>
                        <Button content="Ver más" redirectTo="/home"/>
                    </div>
                </div>
                
            </Carousel>
        </div>
    )
}
