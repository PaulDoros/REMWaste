import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Checkbox Group and Checkbox Item for convenience
interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col space-y-2', className)} {...props}>
        {children}
      </div>
    );
  }
);
CheckboxGroup.displayName = 'CheckboxGroup';

interface CheckboxItemProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  id?: string;
  value: string;
  label?: string;
  className?: string;
}

const CheckboxItem = React.forwardRef<React.ElementRef<typeof Checkbox>, CheckboxItemProps>(
  ({ id, value, label, className, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <Checkbox id={id || value} value={value} ref={ref} {...props} />
        {label && (
          <label
            htmlFor={id || value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
CheckboxItem.displayName = 'CheckboxItem';

export { Checkbox, CheckboxGroup, CheckboxItem };
