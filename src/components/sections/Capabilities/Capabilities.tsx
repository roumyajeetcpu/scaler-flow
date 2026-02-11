'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './Capabilities.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Smartphone, ArrowRight, Bot } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        id: "01",
        title: "Web Development",
        description: "High-performance, scalable web solutions that power the future.",
        icon: <Code2 size={40} strokeWidth={1.5} />,
        tags: ["Next.js", "React", "Node.js"],
        color: "#60A5FA", // blue-400
        link: "/capabilities/web-development"
    },
    {
        id: "02",
        title: "Mobile Apps",
        description: "Native and cross-platform mobile experiences for iOS & Android.",
        icon: <Smartphone size={40} strokeWidth={1.5} />,
        tags: ["React Native", "Flutter", "iOS"],
        color: "#22D3EE", // cyan-400
        link: "/capabilities/mobile-apps"
    },
    {
        id: "03",
        title: "AI Automation",
        description: "Intelligent workflows that eliminate repetitive tasks and scale your operations.",
        icon: <Bot size={40} strokeWidth={1.5} />,
        tags: ["OpenAI", "Claude", "Make.com"],
        color: "#A855F7", // purple-500
        link: "/capabilities/ai-automation"
    }
];

export const Capabilities = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const title = titleRef.current;

        if (!section || !container) return;

        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "top 50%",
                    scrub: 1,
                },
                y: 100,
                opacity: 0,
                scale: 0.9
            });

            // Horizontal Scroll
            const scrollWidth = container.scrollWidth;
            const clientWidth = window.innerWidth;
            const totalScroll = scrollWidth - clientWidth + 100; // Buffer

            gsap.to(container, {
                x: -totalScroll,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: "top top",
                    end: `+=${totalScroll * 2}`, // Multiply by 2 for slower scroll
                    scrub: 1,
                    anticipatePin: 1
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="capabilities"
            ref={sectionRef}
            className={cn(styles.capabilitiesContainer, "relative")}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-center">
                <div className="container mx-auto px-6 mb-12 md:mb-0 md:absolute md:top-12 md:left-12">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Capabilities</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-md text-lg">
                        We combine strategy, design, and technology to build digital products that scale.
                    </p>
                </div>

                <div
                    ref={containerRef}
                    className="flex flex-row gap-4 md:gap-12 px-6 md:px-[50vw] pt-4 md:pt-0 items-center w-full md:overflow-visible md:w-max md:h-screen hide-scrollbar"
                >
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.link}
                            className="group relative flex-shrink-0 w-[85vw] md:w-[450px] h-[60vh] md:h-auto md:aspect-[4/5] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 block"
                        >
                            {/* Large Background Number */}
                            <span className="absolute -bottom-10 -right-4 text-[12rem] font-black text-white/5 group-hover:text-white/10 transition-colors select-none leading-none">
                                {service.id}
                            </span>

                            {/* Content */}
                            <div className="relative h-full flex flex-col z-10">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-12"
                                    style={{ background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`, border: `1px solid ${service.color}40` }}
                                >
                                    <div style={{ color: service.color }}>
                                        {service.icon}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-lg leading-relaxed mb-auto">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-8">
                                    {service.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/60 bg-white/5 rounded-full border border-white/10"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-white transition-colors cursor-pointer">
                                    <span className="text-sm font-semibold uppercase tracking-widest">Explore</span>
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(circle at top right, ${service.color}20, transparent 60%)` }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
