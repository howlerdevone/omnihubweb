interface GlobalSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const GlobalSpinner = ({ size = 'md' }: GlobalSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const strokeWidth = {
    sm: '2',
    md: '2.5',
    lg: '3',
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg
        className="h-full w-full animate-spin text-current opacity-40"
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth={strokeWidth[size]} />
      </svg>
      <svg
        className="absolute left-0 top-0 h-full w-full animate-spin text-current"
        style={{ animationDuration: '1.5s' }}
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeDasharray="90, 150"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
