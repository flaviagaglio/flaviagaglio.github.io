import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-transform duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-40 min-h-11',
  {
    variants: {
      variant: {
        glass: 'liquid-glass text-foreground hover:scale-[1.03]',
        primary: 'bg-primary text-primary-foreground hover:scale-[1.03]',
        ghost: 'liquid-glass text-foreground hover:scale-[1.03]',
      },
      size: {
        default: 'px-6 py-2.5',
        lg: 'px-10 py-4 text-base',
        sm: 'px-4 py-2 text-xs',
      },
    },
    defaultVariants: { variant: 'glass', size: 'default' },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = 'Button';
