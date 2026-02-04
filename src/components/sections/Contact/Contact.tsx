'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations/contact';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils';
import styles from './Contact.module.css';
import confetti from 'canvas-confetti';
import { Mail, MapPin, Linkedin, Loader2, CheckCircle2 } from 'lucide-react';
import { Particles } from '@/components/ui/Particles';

export const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const triggerConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 100
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to send message');

            setSubmitStatus('success');
            triggerConfetti();
            reset();
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.contactSection} id="contact">
            {/* Background Effects */}
            <div className={styles.gradientBg} />
            <Particles />

            <div className={styles.container}>
                <div>
                    <h2 className={styles.heading}>Let's Build Something<br />Extraordinary.</h2>
                    <p className={styles.subheading}>
                        Ready to transform your digital presence? Get in touch and let's discuss how we can help you scale.
                    </p>

                    <div className={styles.contactInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>
                                <Mail size={24} />
                            </span>
                            <a href="mailto:hello@scalerflow.com" className="hover:text-white transition-colors">
                                hello@scalerflow.com
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>
                                <MapPin size={24} />
                            </span>
                            <span>San Francisco, CA</span>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-sm text-white/50 mb-4 uppercase tracking-widest">Connect with us</p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white/80 hover:text-white"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Linkedin size={20} />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.formCard}>
                    {submitStatus === 'success' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
                            <CheckCircle2 size={64} className="text-green-400 mb-6" />
                            <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                            <p className="text-white/70 max-w-xs mx-auto mb-8">
                                Thank you for reaching out. We'll verify your request and get back to you within 24 hours.
                            </p>
                            <Button onClick={() => setSubmitStatus('idle')} variant="secondary">
                                Send Another Message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Name"
                                    placeholder="John Doe"
                                    error={errors.name?.message}
                                    {...register('name')}
                                />
                                <Input
                                    label="Company (Optional)"
                                    placeholder="Acme Inc."
                                    error={errors.company?.message}
                                    {...register('company')}
                                />
                            </div>

                            <Input
                                label="Email"
                                type="email"
                                placeholder="john@example.com"
                                error={errors.email?.message}
                                {...register('email')}
                            />

                            <Textarea
                                label="Message"
                                placeholder="Tell us about your project..."
                                rows={5}
                                error={errors.message?.message}
                                {...register('message')}
                            />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </Button>

                            {submitStatus === 'error' && (
                                <p className="text-red-400 text-center text-sm mt-4 bg-red-500/10 p-2 rounded">
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};
