'use client'

// components/GlitchEffect.tsx
import React, { useEffect, useRef } from 'react';
// import styles from './GlitchEffect.module.css';
import Image from 'next/image';

const GlitchEffect: React.FC = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const _canvas = canvasRef.current;
        const _image = imageRef.current;
        if (!_canvas || !_image) return;

        const _context = _canvas.getContext('2d');
        if (!_context) return;

        let _imageData: HTMLImageElement;

        const effectList = [
            function glitch(context: CanvasRenderingContext2D, width: number, height: number) {
                const imageData = context.getImageData(0, 0, width, height);
                const data = imageData.data;
                const length = width * height;
                const factor = Math.random() * 10;

                let randR = Math.floor(Math.random() * factor);
                let randG = Math.floor(Math.random() * factor) * 3;
                let randB = Math.floor(Math.random() * factor);

                for (let i = 0; i < length; i++) {
                    let r = data[(i + randR) * 4];
                    let g = data[(i + randG) * 4 + 1];
                    let b = data[(i + randB) * 4 + 2];
                    if (r + g + b === 0) r = g = b = 255;

                    data[i * 4] = r;
                    data[i * 4 + 1] = g;
                    data[i * 4 + 2] = b;
                    data[i * 4 + 3] = 255;
                }

                context.putImageData(imageData, 0, 0);
            },
            function glitchWave(context: CanvasRenderingContext2D, width: number, height: number) {
                const renderLineHeight = Math.random() * height;
                const cuttingHeight = 5;
                const imageData = context.getImageData(0, renderLineHeight, width, cuttingHeight);
                context.putImageData(imageData, 0, renderLineHeight - 10);
            },
            function glitchSlip(context: CanvasRenderingContext2D, width: number, height: number) {
                const waveDistance = 100;
                const startHeight = height * Math.random();
                const endHeight = startHeight + 30 + Math.random() * 40;
                for (let h = startHeight; h < endHeight; h++) {
                    if (Math.random() < 0.1) h++;
                    let imageData = context.getImageData(0, h, width, 1);
                    context.putImageData(imageData, Math.random() * waveDistance - waveDistance * 0.5, h);
                }
            },
            function glitchColor(context: CanvasRenderingContext2D, width: number, height: number) {
                const waveDistance = 30;
                const startHeight = height * Math.random();
                const endHeight = startHeight + 30 + Math.random() * 40;
                const imageData = context.getImageData(0, startHeight, width, endHeight);
                const length = width * height;
                let data = imageData.data;

                let r = 0;
                let g = 0;
                let b = 0;

                for (let i = 0; i < length; i++) {
                    if (i % width === 0) {
                        r = i + Math.floor((Math.random() - 0.5) * waveDistance);
                        g = i + Math.floor((Math.random() - 0.5) * waveDistance);
                        b = i + Math.floor((Math.random() - 0.5) * waveDistance);
                    }

                    data[i * 4] = data[r * 4];
                    data[i * 4 + 1] = data[g * 4 + 1];
                    data[i * 4 + 2] = data[b * 4 + 2];
                }

                context.putImageData(imageData, 0, startHeight);
            }
        ];

        function onResize() {
            if (_image) {
                _canvas!.width = _image.width;
                _canvas!.height = _image.height;
            }
        }

        function render() {
            const width = _canvas!.width;
            const height = _canvas!.height;

            _context!.clearRect(0, 0, width, height);
            _context!.drawImage(_imageData, 0, 0, _image!.width, _image!.height);

            if (0.5 < Math.random()) {
                getRandomValue(effectList)(_context!, width, height);
            }

            window.requestAnimationFrame(render);
        }

        function getRandomValue<T>(array: T[]): T {
            return array[Math.floor(Math.random() * array.length)];
        }

        _imageData = new Image();
        _imageData.crossOrigin = "Anonymous";
        _imageData.onload = function () {
            window.addEventListener('resize', onResize, false);
            window.dispatchEvent(new Event('resize'));
            window.requestAnimationFrame(render);
        }
        _imageData.src = _image.src;
    }, []);

    return (
        <div data-js="glitch-image" className='glitchImage'>
            <Image
                src='/image.jpg'
                width={1000}
                height={1000}
                alt="Glitch" />
            <canvas ref={canvasRef} />
        </div>
    );
};

export default GlitchEffect;
