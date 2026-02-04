'use client';
import { useEffect } from 'react';
import gsap from 'gsap';

export function useMagneticEffect(ref: React.RefObject<HTMLElement | null>, strength = 0.5, radius = 100) {
    useEffect(() => {
        if (!ref.current) return;
        const element = ref.current;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distance = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

            if (distance < radius) {
                xTo((clientX - centerX) * strength);
                yTo((clientY - centerY) * strength);
            } else {
                xTo(0);
                yTo(0);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [ref, strength, radius]);
}
