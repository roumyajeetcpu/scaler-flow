
import React from 'react';
import { notFound } from 'next/navigation';
import { capabilitiesData } from '@/data/capabilities';
import { CapabilityHero } from '@/components/capabilities/CapabilityHero';
import { StatsBar } from '@/components/capabilities/StatsBar';
import { ServiceGrid } from '@/components/capabilities/ServiceGrid';
import { TechStack } from '@/components/capabilities/TechStack';
import { ProcessTimeline } from '@/components/capabilities/ProcessTimeline';
import { FAQSection } from '@/components/capabilities/FAQSection';
import { CTASection } from '@/components/capabilities/CTASection';
import { Metadata } from 'next';

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate static params for all capability pages
export async function generateStaticParams() {
    return Object.keys(capabilitiesData).map((slug) => ({
        slug,
    }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params;
    const data = capabilitiesData[slug];
    if (!data) return {};

    return {
        title: data.seo.title,
        description: data.seo.description,
        keywords: data.seo.keywords,
        openGraph: {
            title: data.seo.title,
            description: data.seo.description,
            // images: data.seo.ogImage ? [data.seo.ogImage] : [],
        },
    };
}

export default async function CapabilityPage({ params }: PageProps) {
    const { slug } = params;
    const data = capabilitiesData[slug];

    if (!data) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <CapabilityHero data={data.hero} />
            <StatsBar stats={data.stats} />
            <ServiceGrid services={data.services} />
            <TechStack data={data.techStack} />
            <ProcessTimeline data={data.process} />
            <FAQSection faqs={data.faqs} />
            <CTASection data={data.cta} />
        </main>
    );
}
