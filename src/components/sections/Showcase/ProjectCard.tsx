import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Showcase.module.css';
import { ArrowUpRight } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    tag: string;
    description: string;
    gradient: string;
    tech?: string[];
}

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className={styles.card}>
            {/* Background Layer */}
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-80", project.gradient)} />

            {/* Glass Overlay/Pattern (Placeholder for visual texture) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-12 z-10">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <span className={styles.projectTag}>{project.tag}</span>
                    <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors group">
                        <ArrowUpRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="mt-auto">
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>

                    {/* Tech Stack Pills (Optional) */}
                    {project.tech && (
                        <div className="flex flex-wrap gap-2 mt-6">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="px-3 py-1 text-xs font-medium text-white/70 bg-black/20 rounded-full border border-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Parallax/Device Placeholder Layer (Simulated) */}
            <div className="absolute right-[-10%] bottom-[-10%] w-[60%] h-[70%] bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl transform rotate-[-5deg] translate-y-20 opacity-0 md:opacity-100 md:group-hover:translate-y-10 md:group-hover:rotate-[-2deg] transition-all duration-700 ease-out">
                <div className="w-full h-full flex items-center justify-center text-white/20">
                    <span className="text-4xl font-black rotate-[5deg]">Preview</span>
                </div>
            </div>
        </div>
    );
};
