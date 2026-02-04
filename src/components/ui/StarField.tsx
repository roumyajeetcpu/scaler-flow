'use client';

import React, { useRef, useEffect } from 'react';

export const StarField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Array<{
        x: number; y: number; size: number; opacity: number; vx: number; vy: number;
    }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            // Fixed positioning covers whole screen, so window dimensions work
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Re-init stars on resize
            starsRef.current = Array.from({ length: 250 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.2,
                vx: (Math.random() - 0.5) * 0.1, // Subtle horizontal drift
                vy: Math.random() * 0.1 + 0.05 // Subtle vertical rise
            }));
        };
        resize();
        window.addEventListener('resize', resize);

        let animationId: number;
        const animate = () => {
            // Use clearRect for transparent background
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Stars
            ctx.fillStyle = 'white';
            starsRef.current.forEach(star => {
                star.x += star.vx;
                star.y -= star.vy;

                // Wrap around
                if (star.y < 0) star.y = canvas.height;
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;

                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: -1, /* Behind everything */
                pointerEvents: 'none',
                background: 'transparent'
            }}
        />
    );
};
