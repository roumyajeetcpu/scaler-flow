import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Scaler Flow - Digital Experience Agency',
        short_name: 'Scaler Flow',
        description: 'We build digital experiences that flow. A premium agency specializing in 3D web design, high-performance applications, and brand identity.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#8b5cf6',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
