'use client';

import React, { useRef, useEffect } from 'react';
import styles from './Process.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

import { Search, PenTool, Code2, Rocket, Heart } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Discovery",
        description: "We dive deep into your business goals, user needs, and market landscape to build a solid foundation.",
        icon: <Search className="w-6 h-6 text-white" />,
        duration: "1-2 Weeks"
    },
    {
        id: 2,
        title: "Strategy",
        description: "Crafting a comprehensive roadmap that aligns technology with your vision for maximum impact.",
        icon: <PenTool className="w-6 h-6 text-white" />,
        duration: "1 Week"
    },
    {
        id: 3,
        title: "Design",
        description: "Creating stunning, intuitive interfaces that captivate users and embody your brand identity.",
        icon: <Code2 className="w-6 h-6 text-white" />, // Using generic layout icon or similar
        duration: "2-4 Weeks"
    },
    {
        id: 4,
        title: "Development",
        description: "Writing clean, efficient code to bring designs to life with performance and scalability in mind.",
        icon: <Code2 className="w-6 h-6 text-white" />,
        duration: "3-6 Weeks"
    },
    {
        id: 5,
        title: "Launch",
        description: "Deploying your solution with rigorous testing and providing ongoing support for growth.",
        icon: <Rocket className="w-6 h-6 text-white" />,
        duration: "1 Week"
    },
    {
        id: 6,
        title: "Growth",
        description: "Continuous optimization and feature additions to keep you ahead of the curve.",
        icon: <Heart className="w-6 h-6 text-white" />,
        duration: "Ongoing"
    }
];

export const Process = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const line = lineRef.current;

        if (!section || !container || !line) return;

        const ctx = gsap.context(() => {
            // Desktop Animation
            if (window.innerWidth > 768) {
                const totalScroll = container.scrollWidth - window.innerWidth + 200;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        pin: true,
                        start: "top top",
                        end: `+=${totalScroll}`,
                        scrub: 1,
                    }
                });

                tl.to(container, {
                    x: -totalScroll,
                    ease: "none",
                });

                // Animate line progress
                gsap.to(line, {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `+=${totalScroll}`,
                        scrub: 1,
                    }
                });

                // Animate active states based on scroll position
                steps.forEach((_, i) => {
                    gsap.to(stepRefs.current[i], {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: () => `top top+=${i * (totalScroll / steps.length)}`, // Approximate trigger points
                            end: `+=${totalScroll / steps.length}`,
                            toggleClass: { targets: stepRefs.current[i], className: styles.active },
                            scrub: 1,
                        }
                    });
                });
            } else {
                // Mobile Animation (Vertical)
                // Simple scroll reveal
                steps.forEach((_, i) => {
                    gsap.from(stepRefs.current[i], {
                        opacity: 0.3,
                        y: 50,
                        scrollTrigger: {
                            trigger: stepRefs.current[i],
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                            toggleClass: { targets: stepRefs.current[i], className: styles.active }
                        }
                    });

                    // Vertical line could fill based on overall section progress
                    gsap.to(line, {
                        height: "100%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top center",
                            end: "bottom center",
                            scrub: 1,
                        }
                    });
                });
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section id="process" ref={sectionRef} className={styles.processSection}>
            <h2 className={styles.title}>Our Process</h2>

            <div ref={containerRef} className={styles.timelineContainer}>
                {/* Connection Line */}
                <div className={styles.progressLineContainer}>
                    <div ref={lineRef} className={styles.progressLine} />
                </div>

                {steps.map((step, i) => (
                    <div
                        key={step.id}
                        ref={(el) => { stepRefs.current[i] = el; }}
                        className={styles.stepNode}
                    >
                        <div className={styles.nodeCircle}>
                            {/* <span className={styles.stepNumber}>{i + 1}</span> */}
                            {/* Replace numbering with Icon if available, or keep both? Using Icon as primary visual now */}
                            {step.icon}
                        </div>
                        <div className={styles.stepContent}>
                            <div className="flex justify-between items-center mb-2">
                                <span className={styles.stepNumber}>Step {i + 1}</span>
                                <span className="text-xs font-mono text-neon-blue px-2 py-1 rounded bg-neon-blue/10 border border-neon-blue/20">
                                    {step.duration}
                                </span>
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
