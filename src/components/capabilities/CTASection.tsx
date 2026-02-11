
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
    data: {
        title: string;
        subtitle: string;
        primaryButton: { text: string; link: string };
        secondaryButton: { text: string; link: string };
        guarantee: string;
    };
}

export const CTASection: React.FC<CTASectionProps> = ({ data }) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                        {data.title}
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        {data.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link href={data.primaryButton.link}>
                            <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-gray-200">
                                {data.primaryButton.text}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href={data.secondaryButton.link}>
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-white/20 hover:bg-white/10">
                                {data.secondaryButton.text}
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center text-sm text-gray-500 gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{data.guarantee}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
