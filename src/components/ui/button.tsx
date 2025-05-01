import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex relative items-center justify-center gap-space6 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50  active:translate-y-1 transition-transform duration-300',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white',
        white: 'bg-white text-gray-500 border',
        danger: 'bg-error-500 text-white',
        transparent: 'bg-transparent text-gray-500',
        link: 'text-blue-500 underline-offset-4 hover:underline !h-auto',
        'danger-outline':
          'bg-error-50 text-error-500 border border-error-500 hover:bg-error-500 hover:text-white',
        select:
          'text-wrap text-start justify-start text-gray-500 hover:bg-blue-950/5 rounded-sm transition-colors duration-300',
        pagination: 'bg-gray-100 rounded-lg',
        outline:
          'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
        success:
          'bg-green-50 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white',
      },
      size: {
        default: 'h-[40px] px-space12 py-space8',
        sm: 'h-[36px] px-space12 py-space8',
        icon: 'h-[36px] w-[36px]',
        xsm: 'h-[24px] w-[24px]',
        xxl: 'h-[44px] w-[250px] px-space24 py-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loader?: boolean;
  text?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loader = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loader && (
          <div className="absolute bg-black/40 w-full h-full flex items-center justify-center rounded-md text-xl">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
