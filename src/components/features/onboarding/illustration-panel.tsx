import { Zap } from 'lucide-react';

export function IllustrationPanel() {
  return (
    <div className="hidden lg:block">
      <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low p-10 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>
        <div className="bg-primary/20 relative mb-4 flex h-24 w-24 items-center justify-center rounded-full">
          <div className="bg-primary/10 absolute inset-0 animate-ping rounded-full" />
          <Zap className="text-primary h-12 w-12" />
        </div>
        <h3 className="text-on-surface text-2xl font-semibold">Awaiting Signature</h3>
        <p className="mt-2 text-base font-normal text-on-surface-variant">
          Establish your identity to begin the synchronization protocol.
        </p>
      </div>
    </div>
  );
}
