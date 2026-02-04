'use client';

import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './Philosophy.module.css';
import gsap from 'gsap';
import { Cpu, Zap, Layers, Sparkles, ArrowRight } from 'lucide-react';

interface ValueData {
    icon: React.ElementType;
    text: string;
    description: string;
    color: string;
    angle: number; // Position in circular layout (degrees)
}

const values: ValueData[] = [
    {
        icon: Cpu,
        text: "Intelligence",
        description: "Autonomous systems that learn, adapt, and evolve with your business.",
        color: "#818cf8", // Indigo
        angle: 315 // Top-Left
    },
    {
        icon: Zap,
        text: "Velocity",
        description: "From concept to production in weeks, not months. Speed without compromise.",
        color: "#a78bfa", // Purple
        angle: 45 // Top-Right
    },
    {
        icon: Layers,
        text: "Scalability",
        description: "Production-grade architecture designed to handle exponential growth.",
        color: "#60a5fa", // Blue
        angle: 225 // Bottom-Left
    },
    {
        icon: Sparkles,
        text: "Elegance",
        description: "Sophisticated automation hidden behind a seamless user experience.",
        color: "#e879f9", // Pink
        angle: 135 // Bottom-Right
    }
];

const OrbitalConnections = ({ hoveredIndex }: { hoveredIndex: number | null }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rotationRef = useRef(0);
    const ringRotationsRef = useRef([0, 0, 0]);
    const starsRef = useRef<Array<{
        x: number; y: number; size: number; opacity: number; vx: number; vy: number;
    }>>([]);
    const nebulaRef = useRef<Array<{ x: number; y: number; radius: number; color: string; speed: number; angle: number; }>>([]);
    const signalPulsesRef = useRef<Array<{ valueIndex: number; progress: number; speed: number; }>>([]);

    // Trigger pulse on hover
    useEffect(() => {
        if (hoveredIndex !== null) {
            signalPulsesRef.current.push({
                valueIndex: hoveredIndex,
                progress: 0,
                speed: 0.025
            });
        }
    }, [hoveredIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                const rect = parent.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            starsRef.current = Array.from({ length: 250 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5,
                opacity: Math.random() * 0.5 + 0.2,
                vx: (Math.random() - 0.5) * 0.1, // Subtle horizontal drift
                vy: Math.random() * 0.1 + 0.05 // Subtle vertical rise
            }));

            nebulaRef.current = Array.from({ length: 3 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 350 + Math.random() * 300,
                color: Math.random() > 0.5 ? '#312e81' : '#1e3a8a',
                speed: 0.00015,
                angle: Math.random() * Math.PI * 2
            }));
        };
        resize();
        window.addEventListener('resize', resize);

        // Center calculation needs to match CSS 'top: 62%'
        const centerX = () => canvas.width * 0.5;
        const centerY = () => canvas.height * 0.62;

        // Radius matches CSS: min(32vw, 420px) / 2 = min(16vw, 210px)
        const radius = () => {
            const w = window.innerWidth;
            if (w <= 768) return Math.min(w * 0.34, 150); // Match mobile CSS
            if (w <= 1024) return Math.min(w * 0.25, 180); // Match tablet CSS
            return Math.min(w * 0.16, 210);
        };

        signalPulsesRef.current = [];
        const createPulse = () => {
            if (Math.random() > 0.985) {
                signalPulsesRef.current.push({
                    valueIndex: Math.floor(Math.random() * values.length),
                    progress: 0,
                    speed: 0.005 + Math.random() * 0.008
                });
            }
        };

        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Nebula Background
            nebulaRef.current.forEach(neb => {
                neb.angle += neb.speed;
                const x = neb.x + Math.cos(neb.angle) * 30;
                const y = neb.y + Math.sin(neb.angle) * 30;
                const g = ctx.createRadialGradient(x, y, 0, x, y, neb.radius);
                g.addColorStop(0, neb.color + '15');
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(x, y, neb.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            // Stars removed (handled globally)

            rotationRef.current += 0.0002;

            // Animate rings
            ringRotationsRef.current[0] += 0.002; // Inner ring - medium speed
            ringRotationsRef.current[1] -= 0.0015; // Middle ring - slow counter-rotate
            ringRotationsRef.current[2] += 0.0005; // Outer ring - very slow

            const cx = centerX();
            const cy = centerY();
            const r = radius();

            ctx.setLineDash([]);

            // Draw Rings with Dashes
            // Ring 1 (Inner) - Dashed
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(ringRotationsRef.current[0]);
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Slightly brighter
            ctx.lineWidth = 1;
            ctx.setLineDash([10, 20, 5, 20]); // Visible dashes
            ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Ring 2 (Middle) - Different Dash Pattern
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(ringRotationsRef.current[1]);
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.setLineDash([40, 40]);
            ctx.arc(0, 0, r * 1.0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Ring 3 (Outer) - Solid or Sparse
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(ringRotationsRef.current[2]);
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 45]); // Very sparse dots
            ctx.arc(0, 0, r * 1.35, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // Draw Connections
            values.forEach((value, i) => {
                const angle = (value.angle * Math.PI / 180) - Math.PI / 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;

                // Line connection
                const gradient = ctx.createLinearGradient(cx, cy, x, y);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
                gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.15)'); // More visible middle
                gradient.addColorStop(1, value.color + '50'); // Stronger color at node

                ctx.strokeStyle = gradient;
                ctx.lineWidth = hoveredIndex === i ? 2 : 1;

                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(x, y);
                ctx.stroke();
            });

            // Pulses
            if (hoveredIndex === null) createPulse();

            signalPulsesRef.current = signalPulsesRef.current.filter(pulse => {
                pulse.progress += pulse.speed;
                if (pulse.progress > 1) return false;

                const value = values[pulse.valueIndex];
                const angle = (value.angle * Math.PI / 180) - Math.PI / 2;
                const distance = r * pulse.progress;
                const px = cx + Math.cos(angle) * distance;
                const py = cy + Math.sin(angle) * distance;

                const pulseGradient = ctx.createRadialGradient(px, py, 0, px, py, 5);
                pulseGradient.addColorStop(0, value.color);
                pulseGradient.addColorStop(1, 'transparent');

                ctx.fillStyle = pulseGradient;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
                return true;
            });

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [hoveredIndex]);

    return <canvas ref={canvasRef} className={styles.orbitalCanvas} />;
};

const ValueNode = ({ value, index, delay, isDimmed, onHover }: {
    value: ValueData; index: number; delay: number; isDimmed: boolean; onHover: (idx: number | null) => void;
}) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const isTop = index === 0 || index === 1; // 0=Intel(TL - 315), 1=Vel(TR - 45) -> TOP

    useEffect(() => {
        if (!nodeRef.current || !labelRef.current) return;

        // Float animation
        gsap.to(nodeRef.current, {
            y: -5,
            duration: 2 + Math.random(),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random()
        });

        // Entrance
        gsap.fromTo(nodeRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, delay, ease: "back.out(1.7)" });
        gsap.fromTo(labelRef.current, { opacity: 0, y: isTop ? -10 : 10 }, { opacity: 1, y: 0, duration: 1, delay: delay + 0.2 });
    }, [delay, isTop]);

    // Handle Dimming
    useEffect(() => {
        gsap.to([nodeRef.current, labelRef.current], {
            opacity: isDimmed ? 0.3 : 1,
            duration: 0.4
        });
    }, [isDimmed]);

    const handleMouseEnter = () => {
        onHover(index);
        if (nodeRef.current) gsap.to(nodeRef.current, { scale: 1.1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        onHover(null);
        if (nodeRef.current) gsap.to(nodeRef.current, { scale: 1, duration: 0.3 });
    };

    return (
        <div className={styles.valueNodeWrapper}>
            {/* Icon Node */}
            <div
                ref={nodeRef}
                className={styles.nodeIconContainer}
                style={{ '--node-color': value.color } as React.CSSProperties}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <value.icon className={styles.nodeIcon} />
            </div>

            {/* Label */}
            <div
                ref={labelRef}
                className={styles.nodeLabel}
                style={{
                    top: isTop ? 'auto' : '3.5rem', // Push bottom labels down by fixed amount
                    bottom: isTop ? '3.5rem' : 'auto', // Push top labels up by fixed amount
                }}
            >
                <h3 className={styles.valueTitle}>{value.text}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
            </div>
        </div>
    );
};

export const Philosophy = () => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    return (
        <section id="philosophy" className={cn("min-h-screen w-full relative flex items-center justify-center", styles.philosophyContainer)}>
            <div className={styles.gradientBackground} />
            <OrbitalConnections hoveredIndex={hoveredIndex} />

            {/* Header */}
            <div className={styles.headerSection}>
                <span className={styles.sectionEyebrow}>OUR PHILOSOPHY</span>
                <h2 className={styles.sectionTitle}>
                    Principles behind every <span className={styles.gradientText}>scalable system</span> we build.
                </h2>
            </div>



            {/* Circular Orbit */}
            <div className={styles.valuesOrbit}>
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={styles.valuePosition}
                        style={{ '--angle': `${value.angle}deg` } as React.CSSProperties}
                    >
                        <ValueNode
                            value={value}
                            index={index}
                            delay={index * 0.2}
                            isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                            onHover={setHoveredIndex}
                        />
                    </div>
                ))}
            </div>

            {/* Central Hub */}
            <div className={styles.centralHub}>
                <div className={styles.hubCore}>
                    <div className={styles.hubContent}>
                        <span className={styles.hubTitle}>ScalerFlow</span>
                        <span className={styles.hubTitleLarge}>Core</span>
                        <span className={styles.hubSubtitle}>Your AI Automation Backbone</span>
                    </div>
                </div>
            </div>

            {/* Bottom Elements */}

            <div className={styles.ctaLinkWrapper}>
                <button className={styles.ctaLink}>
                    View real implementations <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </section>
    );
};
