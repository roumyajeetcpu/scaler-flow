'use client';

import React, { useRef, useEffect } from 'react';
import styles from './Showcase.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectCard } from './ProjectCard';
import { Plus } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const projects = [
    {
        id: 1,
        title: "Neon Realty",
        tag: "Real Estate",
        description: "Immersive 3D property tours with VR integration.",
        gradient: "from-purple-600 to-blue-600",
        tech: ["Next.js", "Three.js", "WebGL"]
    },
    {
        id: 2,
        title: "Cyber Finance",
        tag: "Fintech",
        description: "Next-gen banking dashboard with AI insights.",
        gradient: "from-emerald-500 to-cyan-500",
        tech: ["React", "D3.js", "Tailwind"]
    },
    {
        id: 3,
        title: "Zen Health",
        tag: "Wellness",
        description: "Mindfulness app with biometric tracking.",
        gradient: "from-rose-500 to-orange-500",
        tech: ["React Native", "HealthKit", "Node.js"]
    },
    {
        id: 4,
        title: "Future Fashion",
        tag: "E-commerce",
        description: "AR try-on experience for luxury streetwear.",
        gradient: "from-violet-600 to-fuchsia-600",
        tech: ["8th Wall", "Shopify", "React"]
    }
];

export const Showcase = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!section || !container) return;

        const ctx = gsap.context(() => {
            gsap.to(container, {
                x: () => -(container.scrollWidth - window.innerWidth + 100), // 100px buffer
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${(container.scrollWidth - window.innerWidth + 100) * 2}`, // Multiply by 2 for slower/more robust scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1, // Helps with pinning on mobile
                    invalidateOnRefresh: true,
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section id="showcase" ref={sectionRef} className={styles.showcaseSection}>
            <h2 className={styles.title}>Selected Work</h2>

            <div ref={containerRef} className={styles.cardsContainer}>
                {projects.map((project) => (
                    <div key={project.id} className="group h-full flex-shrink-0">
                        {/* Added 'group' class for hover effects in ProjectCard */}
                        <ProjectCard project={project} />
                    </div>
                ))}

                {/* Final "Your Project Here" Card */}
                <div className={styles.ctaCard}>
                    <Plus size={48} className="text-white/30 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Your Project</h3>
                    <p className="text-white/50 text-center px-4">Let&apos;s build something amazing together.</p>
                </div>
            </div>
        </section>
    );
};
