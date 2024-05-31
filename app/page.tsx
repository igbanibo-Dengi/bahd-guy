'use client'

import Countdown from "@/components/Countdown";
import { VelocityScroll } from "@/components/VelocityScroll";
import { GlitchImage } from "react-glitch-image";


export default function Home() {
  return (
    <main className="flex flex-col h-screen items-end justify-center overflow-hidden">
      <div className="bg-[url('/image.png')] bg-cover absolute xl:hidden h-screen w-full"></div>

      <div className="w-full  absolute left-0 text-white md:text-black">
        <VelocityScroll />
        <div className="flex items-center justify-center xl:w-1/2">
          <Countdown timeTillDate="06 07 2024, 6:00 am" timeFormat="MM DD YYYY, h:mm a" />
        </div>
        <VelocityScroll />
      </div>
      <div className="w-1/2 h-[100%] flex items-center justify-center bg-center bg-contain z-50 relative">
        <div className="absolute top-0 left-0 size-full items-center justify-center hidden xl:flex">
          <GlitchImage
            image="/image.png"
            width="100%"
          // customFilter="invert($100%) saturate(100%) hue-rotate($200deg) brightness(2)"
          // layerColors={["rgba(0,0,180,0.05)", "rgba(200,0,0,0.05)"]}
          />
        </div>
      </div>
    </main>
  );
}
