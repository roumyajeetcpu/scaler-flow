
import React from 'react';
import { ProcessStep } from '@/data/capabilities';

interface ProcessTimelineProps {
    data: {
        title: string;
        subtitle: string;
        steps: ProcessStep[];
    };
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ data }) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{data.title}</h2>
                    <p className="text-xl text-gray-400">{data.subtitle}</p>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {data.steps.map((step, index) => (
                            <div key={index} className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2">
                                    <div className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-5xl font-black text-white/5 select-none">{step.number}</span>
                                            <span className="text-xs font-mono py-1 px-2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                                                {step.duration}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-gray-400 mb-6">{step.description}</p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-white/60 uppercase tracking-wider">Deliverables:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.deliverables.map((item, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/5 text-gray-300">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] hidden md:block" />

                                {/* Empty Side */}
                                <div className="flex-1 w-full md:w-1/2 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
