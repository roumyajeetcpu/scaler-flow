'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // Tagline animation ref
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial entrance animations
        const ctx = gsap.context(() => {
            // Animate letters staggering in
            // Animate letters staggering in
            gsap.from(letterRefs.current, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                stagger: 0.05,
                duration: 1.2,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.5,
            });

            // Animate tagline
            gsap.from(taglineRef.current, {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 1.5,
            });

            // Animate scroll indicator
            gsap.from(scrollRef.current, {
                y: -10,
                opacity: 0,
                duration: 1,
                delay: 2,
            });
        }, containerRef);


        return () => ctx.revert();
    }, []);

    // Mouse interaction for 3D text effect
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!textRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1
            const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1

            gsap.to(textRef.current, {
                rotationY: xPos * 10, // Rotate horizontally based on mouse X
                rotationX: -yPos * 10, // Rotate vertically based on mouse Y
                duration: 1,
                ease: 'power2.out',
            });

            // Individual letter wave effect based on proximity could go here
            // But keeping it performant with just container rotation for now
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const titleText = "SCALER FLOW";

    return (
        <section
            id="hero"
            ref={containerRef}
            className={cn("relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden", styles.heroContainer)}
        >
            {/* Background Elements (Global StarField is visible) */}

            {/* Main Typography */}
            <div className="z-10 perspective-1000 px-4">
                <h1
                    ref={textRef}
                    className={cn(
                        "text-[clamp(2.5rem,15vw,10rem)] leading-[0.9] font-black text-center tracking-tighter cursor-default transform-style-3d",
                        styles.gradientText
                    )}
                    aria-label={titleText}
                >
                    {titleText.split('').map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => { letterRefs.current[i] = el; }}
                            className={cn("inline-block", styles.letter)}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Tagline */}
            <p
                ref={taglineRef}
                className="z-10 mt-8 text-base sm:text-xl md:text-2xl font-light text-white/70 tracking-wider md:tracking-widest uppercase text-center max-w-2xl px-4"
            >
                We build digital experiences that flow
            </p>

            {/* Scroll Indicator */}
            <div
                ref={scrollRef}
                className={cn("absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer text-white/50 hover:text-white transition-colors", styles.scrollIndicator)}
                onClick={() => {
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
};
