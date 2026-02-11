import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import React from 'react';

const inter = Inter({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://scalerflow.com'),
    title: {
        default: 'Scaler Flow | Digital Experience Agency',
        template: '%s | Scaler Flow',
    },
    description: 'We build digital experiences that flow. A premium agency specializing in 3D web design, high-performance applications, and brand identity.',
    keywords: ['web design', '3D website', 'performance', 'digital agency', 'Next.js', 'React', 'web development', 'UI/UX design', 'branding'],
    authors: [{ name: 'Scaler Flow Team' }],
    creator: 'Scaler Flow',
    publisher: 'Scaler Flow',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://scalerflow.com',
        title: 'Scaler Flow | Digital Experience Agency',
        description: 'We build digital experiences that flow.',
        siteName: 'Scaler Flow',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Scaler Flow - Digital Experience Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Scaler Flow',
        description: 'We build digital experiences that flow.',
        creator: '@scalerflow',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/manifest.json',
    verification: {
        google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
};

import { Cursor } from '@/components/ui/Cursor';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

import { StarField } from '@/components/ui/StarField';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.variable}>
            <body suppressHydrationWarning>
                <SmoothScroll />
                <ScrollProgress />
                <Cursor />
                <StarField />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
