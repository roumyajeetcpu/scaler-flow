
import React from 'react';
import { TechCategory } from '@/data/capabilities';

interface TechStackProps {
    data: {
        title: string;
        categories: TechCategory[];
    };
}

export const TechStack: React.FC<TechStackProps> = ({ data }) => {
    return (
        <section className="py-24 bg-white/[0.02] border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{data.title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We use the latest tools and frameworks to build robust, scalable solutions.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.categories.map((category, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="text-lg font-semibold text-purple-400 uppercase tracking-wider border-b border-white/10 pb-2">
                                {category.name}
                            </h3>
                            <div className="space-y-4">
                                {category.technologies.map((tech, idx) => (
                                    <div key={idx} className="flex items-start p-3 rounded-xl hover:bg-white/5 transition-colors">
                                        <div>
                                            <div className="font-medium text-white">{tech.name}</div>
                                            <div className="text-sm text-gray-500">{tech.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
