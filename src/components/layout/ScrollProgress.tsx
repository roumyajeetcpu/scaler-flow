'use client';

import React, { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' }
];

export const ScrollProgress = () => {
    const [activeId, setActiveId] = useState('hero');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // If using Lenis, we might need access to the lenis instance, 
            // but native scrollIntoView works reasonably well with Lenis hijacking it optionally.
            // Or easier: use window.scrollTo
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 20%',
                    end: 'bottom center',
                    onEnter: () => setActiveId(id),
                    onEnterBack: () => setActiveId(id),
                });
            }
        });

        // Force refresh after a slight delay to account for pinned sections
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);

        return () => {
            // ScrollTrigger.getAll().forEach(t => t.kill()); // Be careful not to kill other triggers
        };
    }, []);

    return (
        <nav className={styles.navContainer}>
            <div className={styles.track} />
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={cn(styles.dot, activeId === id && styles.active)}
                    aria-label={`Scroll to ${label}`}
                >
                    <span className={styles.label}>{label}</span>
                    <div className={styles.dotInner} />
                </button>
            ))}
        </nav>
    );
};
