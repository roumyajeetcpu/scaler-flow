'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading() {
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loaderRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to('.loader-dot', {
                y: -20,
                duration: 0.6,
                stagger: 0.1,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });
        }, loaderRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black">
            <div ref={loaderRef} className="flex gap-3">
                <div className="loader-dot w-4 h-4 rounded-full bg-neon-purple" />
                <div className="loader-dot w-4 h-4 rounded-full bg-electric-blue" />
                <div className="loader-dot w-4 h-4 rounded-full bg-hot-pink" />
            </div>
        </div>
    );
}
