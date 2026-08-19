import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { GlobalSpinner } from './global-spinner';

interface ButtonWithSpinnerProps {
  isLoading?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'ghost' | 'outline';
}

export const ButtonWithSpinner = ({
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}: ButtonWithSpinnerProps) => {
  return (
    <Button disabled={disabled || isLoading} className={className} {...props}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <GlobalSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
