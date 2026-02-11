
import React from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    data: {
        badge: string;
        headline: string;
        subheadline: string;
        cta: {
            primary: { text: string; link: string };
            secondary: { text: string; link: string };
        };
        backgroundGradient: string;
    };
}

export const CapabilityHero: React.FC<HeroProps> = ({ data }) => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
            {/* Dynamic Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${data.backgroundGradient} opacity-30`} />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wider text-purple-300 mb-8 backdrop-blur-sm">
                    {data.badge}
                </span>

                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-8 tracking-tight max-w-4xl mx-auto leading-[1.1]">
                    {data.headline}
                </h1>

                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    {data.subheadline}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={data.cta.primary.link}>
                        <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-gray-200 rounded-full">
                            {data.cta.primary.text}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href={data.cta.secondary.link}>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent">
                            {data.cta.secondary.text}
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-1 h-12 rounded-full bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
        </section>
    );
};
