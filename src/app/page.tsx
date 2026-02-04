import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Capabilities } from '@/components/sections/Capabilities';
import { Showcase } from '@/components/sections/Showcase';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <Philosophy />
            <Capabilities />
            <Showcase />
            <Process />
            <Contact />
        </main>
    );
}
