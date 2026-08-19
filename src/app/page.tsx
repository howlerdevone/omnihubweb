import { Orbit } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <header className="bg-surface/40 fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-xl">
        <div className="flex h-16 w-full items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Orbit aria-label="Omnihub logo" className="text-primary h-8 w-8" />
            <span className="text-on-surface font-sans text-2xl font-semibold tracking-tight">
              Omnihub Nebula
            </span>
          </div>

          <nav className="hidden items-center gap-10 md:flex">
            <a
              aria-current="page"
              className="text-primary text-sm font-bold transition-colors"
              href="#"
            >
              Features
            </a>
            <a
              className="text-muted-foreground hover:text-on-surface font-mono text-xs transition-colors"
              href="#"
            >
              Solutions
            </a>
            <a
              className="text-muted-foreground hover:text-on-surface font-mono text-xs transition-colors"
              href="#"
            >
              Security
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              className="text-on-surface hover:bg-surface-bright rounded-lg px-4 py-2 font-mono text-xs transition-all"
              href="/login"
            >
              Sign In
            </a>
            <a
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-mono text-xs shadow-[0_0_20px_rgba(180,197,255,0.3)] transition-all hover:brightness-110"
              href="#"
            >
              Get Started
            </a>
            <div className="bg-primary ml-2 flex h-8 w-8 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-primary-foreground text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-16">
        <div className="relative flex w-full flex-col overflow-hidden">
          {/* Dot Background Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          ></div>

          <div className="bg-surface relative flex min-h-[80vh] w-full items-center justify-center px-8 pt-24 pb-16">
            {/* Blurry glow effects */}
            <div className="bg-primary/10 absolute top-1/4 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full opacity-50 mix-blend-screen blur-[100px] filter"></div>
            <div className="bg-secondary/10 absolute right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full opacity-40 mix-blend-screen blur-[120px] filter"></div>

            <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
              <div className="bg-card border-border mb-4 flex items-center gap-2 rounded-full border px-4 py-1">
                <span className="bg-tertiary h-2 w-2 animate-pulse rounded-full shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
                <span className="text-tertiary font-mono text-xs tracking-widest uppercase">
                  Nebula Engine Core Online
                </span>
              </div>

              <h1 className="text-on-surface from-foreground via-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text font-sans text-5xl leading-tight font-bold text-transparent md:text-6xl">
                Synchronize
                <br />
                Your Nexus.
              </h1>

              <p className="text-muted-foreground mb-10 max-w-2xl font-sans text-base">
                The intelligent command center for your high-productivity ecosystem. Secure,
                encrypted, and instantaneous deployment across all orbital nodes.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <button className="from-primary to-secondary text-primary-foreground group relative transform overflow-hidden rounded-lg bg-gradient-to-r px-10 py-4 font-mono text-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                  <span className="relative z-10">Get Started with Nebula</span>
                  <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0"></div>
                </button>
                <button className="border-border text-primary hover:bg-accent rounded-lg border bg-transparent px-10 py-4 font-mono text-xs transition-colors">
                  View Technical Specs
                </button>
              </div>
            </div>
          </div>

          <section className="bg-surface relative z-10 w-full px-8 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 flex flex-col items-center text-center">
                <h2 className="text-on-surface mb-2 font-sans text-3xl font-semibold">
                  Core Architecture
                </h2>
                <div className="from-primary to-secondary h-1 w-16 rounded-full bg-gradient-to-r"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="bg-card border-border group relative overflow-hidden rounded-xl border p-6 transition-transform duration-300 hover:-translate-y-2">
                  <span className="material-symbols-outlined text-primary mb-4 text-3xl">
                    token
                  </span>
                  <h3 className="mb-2 font-sans text-xl font-semibold">Quantum Nodes</h3>
                  <p className="text-muted-foreground font-sans text-sm">
                    Distributed ledger infrastructure protecting data velocity over orbital links.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
