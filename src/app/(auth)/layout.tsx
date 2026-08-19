import * as React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Left Decorative/Informational Column */}
      <div className="border-border relative hidden flex-col justify-between overflow-hidden border-r bg-surface-dim p-12 lg:flex">
        {/* Radial grid subtle pattern for the technical look */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">
          {/* Visual placement indicator or placeholder */}
          <div className="bg-card border-border mb-4 flex w-fit items-center gap-2 rounded-full border px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-tertiary">
              System Online
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-on-surface mb-4 font-sans text-4xl font-bold leading-tight">
            Synchronize
            <br />
            Your Nexus.
          </h2>
          <p className="text-muted-foreground mb-8 font-sans text-sm">
            Access the Omnihub central command. Secure, encrypted, and instantaneous deployment
            across all orbital nodes.
          </p>
          <div className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
            <span className="bg-muted-foreground/50 h-1.5 w-1.5 rounded-full" />
            <span>Connecting 14,291 nodes globally</span>
          </div>
        </div>
      </div>

      {/* Right Content Column */}
      <div className="relative flex w-full items-center justify-center p-6 sm:p-12 md:p-24">
        <div className="flex w-full max-w-md flex-col justify-center">{children}</div>
      </div>
    </div>
  );
}
