"use client"
import React from 'react'
import CarouselComponent from "@/components/Carousel/Carousel";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import Map from '@/components/Map/Map';

export default function LandingView() {
  return (
    <div>
      <CarouselComponent />
      <TestimonialCard />
      <Map />
    </div>  )
}
