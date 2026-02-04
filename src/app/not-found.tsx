'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Particles } from '@/components/ui/Particles';
import gsap from 'gsap';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
            });

            gsap.from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                delay: 0.3,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-deep-navy via-dark-black to-black opacity-80" />
            <Particles />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-2xl">
                <h1
                    ref={titleRef}
                    className="text-[clamp(8rem,20vw,16rem)] font-black leading-none mb-4 bg-gradient-to-br from-neon-purple via-electric-blue to-hot-pink bg-clip-text text-transparent"
                >
                    404
                </h1>

                <p
                    ref={textRef}
                    className="text-2xl md:text-3xl font-light text-white/70 mb-12"
                >
                    Oops! This page seems to have drifted into the void.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/">
                        <Button variant="primary" size="lg" leftIcon={<Home size={20} />}>
                            Back to Home
                        </Button>
                    </Link>

                    <Button
                        variant="secondary"
                        size="lg"
                        leftIcon={<ArrowLeft size={20} />}
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-electric-blue/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
        </div>
    );
}
