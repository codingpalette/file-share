import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '../lib';

// Tooltip variant styles
const TooltipVariants = cva(
  `
    absolute z-50 px-2 py-1
    bg-zinc-800 text-neutral-50
    rounded-md text-xs
    hidden group-hover:block
    text-center
  `,
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
      },
    },
    defaultVariants: {
      position: 'top'
    }
  }
);

interface TooltipProps extends VariantProps<typeof TooltipVariants> {
  children: React.ReactNode;
  tooltip: string;
  additionalClass?: string;
}

export function Tooltip({
  children,
  tooltip,
  position,
  additionalClass
}: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}
      <div
        role="tooltip"
        className={cn(
          TooltipVariants({ position }),
          additionalClass
        )}
      >
        {tooltip}
      </div>
    </div>
  );
}
