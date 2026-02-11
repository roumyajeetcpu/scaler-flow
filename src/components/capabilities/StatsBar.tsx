
import React from 'react';
import { IconMapper } from './IconMapper';

interface Stat {
    label: string;
    value: string;
    icon: string;
}

interface StatsBarProps {
    stats: Stat[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
    return (
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center">
                            <div className="mb-3 text-purple-400 opacity-80">
                                <IconMapper name={stat.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
