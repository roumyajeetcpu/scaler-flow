import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

interface Ripple {
    x: number;
    y: number;
    size: number;
    id: number;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, leftIcon, rightIcon, enableMagnetic = true, enableRipple = true, ...props }, ref) => {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [ripples, setRipples] = useState<Ripple[]>([]);
        const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

        const variants = {
            primary: 'bg-gradient-to-br from-neon-purple to-electric-blue text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5',
            secondary: 'bg-transparent border-2 border-neon-purple/50 text-white hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]',
            ghost: 'bg-transparent text-white hover:bg-white/10',
            outline: 'border border-white/20 hover:bg-white/5',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-8 py-4 text-base',
            lg: 'px-10 py-5 text-lg',
        };

        // Magnetic effect
        useEffect(() => {
            if (!enableMagnetic || !buttonRef.current) return;

            const button = buttonRef.current;
            const strength = 0.3;
            const radius = 80;

            const handleMouseMove = (e: MouseEvent) => {
                const rect = button.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
                );

                if (distance < radius) {
                    const offsetX = (e.clientX - centerX) * strength;
                    const offsetY = (e.clientY - centerY) * strength;
                    setMagneticOffset({ x: offsetX, y: offsetY });
                } else {
                    setMagneticOffset({ x: 0, y: 0 });
                }
            };

            const handleMouseLeave = () => {
                setMagneticOffset({ x: 0, y: 0 });
            };

            window.addEventListener('mousemove', handleMouseMove);
            button.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, [enableMagnetic]);

        // Ripple effect
        const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!enableRipple || !buttonRef.current) return;

            const button = buttonRef.current;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const newRipple: Ripple = {
                x,
                y,
                size,
                id: Date.now(),
            };

            setRipples((prev) => [...prev, newRipple]);

            setTimeout(() => {
                setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            }, 600);
        };

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            createRipple(e);
            props.onClick?.(e);
        };

        return (
            <button
                ref={(node) => {
                    buttonRef.current = node;
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        ref.current = node;
                    }
                }}
                className={cn(
                    'relative rounded-xl font-semibold transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden',
                    variants[variant],
                    sizes[size],
                    isLoading && 'cursor-wait opacity-80',
                    className
                )}
                disabled={isLoading || props.disabled}
                style={{
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                }}
                {...props}
                onClick={handleClick}
            >
                {/* Ripple animations */}
                {ripples.map((ripple) => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                        }}
                    />
                ))}

                {isLoading ? (
                    <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="mr-1">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="ml-1">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
