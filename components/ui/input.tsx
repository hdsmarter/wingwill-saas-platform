import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#212121] mb-1.5">
            {label}
            {props.required && <span className="text-[#EF4444] ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-sm',
            'placeholder:text-[#B0B0B0]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81C11]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'read-only:bg-gray-50 read-only:cursor-default',
            error && 'border-[#EF4444] focus-visible:ring-[#EF4444]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-[#EF4444]">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
