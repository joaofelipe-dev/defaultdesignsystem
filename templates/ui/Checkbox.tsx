'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size = 'md', indeterminate = false, checked, disabled, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <label
        className={cn(
          'inline-flex items-center cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <input
          type="checkbox"
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          checked={checked}
          disabled={disabled}
          className={cn(
            'peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground',
            {
              'h-3 w-3': size === 'sm',
              'h-4 w-4': size === 'md',
              'h-5 w-5': size === 'lg',
            },
          )}
          {...props}
        />
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
