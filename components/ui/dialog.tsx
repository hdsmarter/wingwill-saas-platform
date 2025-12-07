import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Dialog: React.FC<DialogProps> = ({ open, onClose, children, size = 'md' }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // ESC 鍵關閉
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4",
      "transition-opacity duration-200",
      isAnimating ? "opacity-100" : "opacity-0"
    )}>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-sm",
          "transition-opacity duration-200",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={cn(
        'relative bg-white rounded-xl shadow-2xl w-full',
        'transform transition-all duration-200',
        isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4',
        sizeClasses[size]
      )}>
        {children}
      </div>
    </div>
  );
};

const DialogHeader: React.FC<{ children: React.ReactNode; onClose?: () => void }> = ({ children, onClose }) => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]/50">
    <div className="flex-1">{children}</div>
    {onClose && (
      <button
        onClick={onClose}
        className="ml-4 p-1.5 rounded-lg text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F9FAFB] transition-all"
        aria-label="關閉"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h2 className={cn('text-xl font-bold text-[#1F2937]', className)}>
    {children}
  </h2>
);

const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto', className)}>
    {children}
  </div>
);

const DialogFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3', className)}>
    {children}
  </div>
);

export { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter };
