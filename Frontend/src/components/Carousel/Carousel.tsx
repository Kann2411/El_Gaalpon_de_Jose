"use client"

import { Carousel } from "flowbite-react"

export default function CarouselComponent() {
    return (
    <div className="w-full h-[550px]">
      <Carousel slideInterval={3000}>
        <img src="https://i.imgur.com/sCPPGoJ.png" alt="..." className="object-cover h-full" />
        <img src="https://i.imgur.com/sCPPGoJ.png" alt="..." className="object-cover h-full" />
        <img src="https://i.imgur.com/sCPPGoJ.png" alt="..." className="object-cover h-full" />
      </Carousel>
    </div>
    )

}