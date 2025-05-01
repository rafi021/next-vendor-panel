import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gray-100 text-black',
        secondary: 'border-transparent bg-slate-100 text-slate-900',
        outline: 'text-slate-950 border-gray-200',
        'success-outline': ' border-success-500 bg-success-50 text-success-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
