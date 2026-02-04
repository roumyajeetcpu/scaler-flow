'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse-glow" />
                        <AlertTriangle className="relative w-24 h-24 text-red-500" />
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-black text-white mb-4">
                    Something went wrong!
                </h1>

                <p className="text-lg text-white/60 mb-8">
                    We encountered an unexpected error. Don't worry, we're on it!
                </p>

                {/* Error Details (Development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                        <p className="text-sm font-mono text-red-400 break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-white/40 mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        size="lg"
                        leftIcon={<RefreshCw size={20} />}
                        onClick={reset}
                    >
                        Try Again
                    </Button>

                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => window.location.href = '/'}
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
