'use client'

import React from 'react'
import { GlitchImage } from 'react-glitch-image'

const ImageContainer = () => {
    return (
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
    )
}

export default ImageContainer