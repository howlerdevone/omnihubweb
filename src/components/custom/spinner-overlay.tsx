import { GlobalSpinner } from './global-spinner';

interface SpinnerOverlayProps {
  isVisible: boolean;
  message?: string;
}

export const SpinnerOverlay = ({ isVisible, message }: SpinnerOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-surface flex flex-col items-center gap-6 rounded-xl p-12 shadow-xl">
        <GlobalSpinner size="lg" />
        {message && <p className="text-on-surface text-center font-medium">{message}</p>}
      </div>
    </div>
  );
};
