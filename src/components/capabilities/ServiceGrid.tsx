
import React from 'react';
import { IconMapper } from './IconMapper';
import { Service } from '@/data/capabilities';

interface ServiceGridProps {
    services: Service[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
    return (
        <section id="services" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Build</h2>
                    <div className="w-20 h-1 bg-purple-500 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${service.color}-500/10 text-${service.color}-400 group-hover:scale-110 transition-transform`}>
                                <IconMapper name={service.icon} className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-400 mb-8 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-300">
                                        <div className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
