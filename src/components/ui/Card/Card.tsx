import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, onClick, ...props }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className={cn(
                    "bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 transition-all duration-300",
                    onClick && "cursor-pointer hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';
