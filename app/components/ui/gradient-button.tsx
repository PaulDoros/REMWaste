'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const gradientButtonVariants = cva(
  [
    'gradient-button',
    'inline-flex items-center justify-center',
    'rounded-[11px] min-w-[132px] px-9 py-4',
    'text-base leading-[19px] font-[500] text-white',
    'font-sans font-bold',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'relative overflow-hidden transition-all duration-300',
    'bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-indigo-500',
    'text-primary-foreground',
  ],
  {
    variants: {
      variant: {
        default: '',
        variant: [
          'gradient-button-variant',
          'bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500',
        ],
        outline: [
          'border-2 border-primary bg-transparent hover:bg-primary/10',
          'text-primary hover:text-primary',
        ],
        proceed: [
          'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500',
          'shadow-lg shadow-green-500/20 hover:shadow-green-500/30',
        ],
      },
      size: {
        default: 'px-9 py-4',
        sm: 'px-6 py-2 text-sm rounded-md',
        lg: 'px-12 py-6 text-lg rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof gradientButtonVariants> {
  asChild?: boolean;
}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(gradientButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GradientButton.displayName = 'GradientButton';

export { GradientButton, gradientButtonVariants };
