'use client';
import { useOnboarding } from '@/context/onboarding-context';
import { Input } from '@/components/ui/input';
import { PublicAccessPoint } from '../public-access-point';
import { IllustrationPanel } from '../illustration-panel';
import { Zap } from 'lucide-react';
import { useMemo } from 'react';

export function StepOne() {
  const { workspaceName, setWorkspaceName } = useOnboarding();

  const urlSlug = useMemo(() => {
    return workspaceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }, [workspaceName]);

  return (
    <section className="transition-all duration-500">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-10 lg:col-span-7">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-on-surface-variant">
              Workspace Identity
            </label>
            <p className="text-base font-normal text-on-surface-variant">
              Define the core namespace for your multi-tenant environment. This will be the root for
              all AI orchestration.
            </p>
          </div>

          <div className="space-y-6">
            <div className="group relative">
              <Input
                id="workspace-name"
                type="text"
                placeholder="Acme Global Research"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="bg-surface-container-lowest text-on-surface placeholder:text-surface-variant focus:border-primary h-16 rounded-lg border border-outline-variant px-4 py-6 text-2xl font-semibold transition-all focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-focus-within:opacity-100">
                <Zap className="text-primary h-5 w-5" />
              </div>
            </div>

            <PublicAccessPoint slug={urlSlug} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <IllustrationPanel />
        </div>
      </div>
    </section>
  );
}
