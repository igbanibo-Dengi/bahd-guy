'use client'

import Countdown from "@/components/Countdown";
import { VelocityScroll } from "@/components/VelocityScroll";
import Link from "next/link";
import { GlitchImage } from "react-glitch-image";
import { BiLinkExternal } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-end justify-center overflow-hidden relative">
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
      <div className="absolute bottom-2 md:w-1/2 flex gap-4 items-center justify-center left-5 z-50 text-white xl:text-black text-[24px] md:text-[48px] xl:text-[24px]">
        <Link href="https://falzthebahdguy.com/" target="blank">
          <BiLinkExternal />
        </Link>
        <Link href="https://www.instagram.com/falzthebahdguy/" target="blank">
          <FaInstagram />
        </Link>
        <Link href="https://x.com/falzthebahdguy" target="blank">
          <FaXTwitter />
        </Link>
      </div>
    </main>
  );
}
