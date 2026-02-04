import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    wrapperClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, wrapperClassName, ...props }, ref) => {
        return (
            <div className={cn("w-full space-y-2", wrapperClassName)}>
                {label && (
                    <label className="text-sm font-medium text-gray-300 ml-1 block">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <textarea
                        ref={ref}
                        className={cn(
                            "w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-white/50 transition-all duration-300 outline-none resize-none min-h-[120px]",
                            "focus:border-neon-purple focus:bg-neon-purple/10 focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            error ? "border-red-500/50 bg-red-500/10 focus:border-red-500" : "",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-sm text-red-400 ml-1 animate-fadeIn">{error}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
