import gsap from 'gsap';

/**
 * Fade in and move up animation
 */
export const fadeInUp = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Scale in animation
 */
export const scaleIn = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        ...options,
    });
};

/**
 * Slide in from direction
 */
export const slideIn = (
    element: HTMLElement | string,
    direction: 'left' | 'right' | 'top' | 'bottom' = 'left',
    options = {}
) => {
    const directions = {
        left: { x: -100 },
        right: { x: 100 },
        top: { y: -100 },
        bottom: { y: 100 },
    };

    return gsap.from(element, {
        ...directions[direction],
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        ...options,
    });
};

/**
 * Stagger animation for multiple elements
 */
export const staggerFadeIn = (elements: HTMLElement[] | string, options = {}) => {
    return gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        ...options,
    });
};

/**
 * Rotate in animation
 */
export const rotateIn = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
        rotation: 180,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        ...options,
    });
};

/**
 * Bounce in animation
 */
export const bounceIn = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'bounce.out',
        ...options,
    });
};

/**
 * Reveal animation (clip-path)
 */
export const reveal = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        ...options,
    });
};

/**
 * Parallax scroll effect
 */
export const parallax = (element: HTMLElement | string, speed = 0.5) => {
    return gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    });
};
