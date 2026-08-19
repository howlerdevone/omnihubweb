'use client';
import { useState, useEffect, useMemo } from 'react';
import { useOnboarding } from '@/context/onboarding-context';
import { AppCard } from '../app-card';
import { AppCardSkeleton } from '../app-card-skeleton';
import { App } from '@/modules/catalog';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function StepTwo() {
  const { selectedAppIds, toggleAppId } = useOnboarding();
  const [allApps, setAllApps] = useState<App[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const response = await fetch('/onboarding/apps');
        const result = await response.json();

        if (result.success && result.data) {
          setAllApps(result.data);
        } else {
          setError('Failed to load apps');
        }
      } catch {
        setError('Error loading apps');
      } finally {
        setLoading(false);
      }
    };

    loadApps();
  }, []);

  const filteredApps = useMemo(
    () => allApps.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [allApps, searchQuery]
  );

  if (loading) {
    return (
      <section className="transition-all duration-500">
        <div className="space-y-10">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase text-on-surface-variant">
              Applications
            </label>
            <h2 className="text-on-surface text-4xl font-semibold">Connect your applications</h2>
            <p className="text-base font-normal text-on-surface-variant">
              Select the applications you want to integrate with Omnihub.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <AppCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="transition-all duration-500">
      <div className="space-y-10">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase text-on-surface-variant">
            Applications
          </label>
          <h2 className="text-on-surface text-4xl font-semibold">Connect your applications</h2>
          <p className="text-base font-normal text-on-surface-variant">
            Select the applications you want to integrate with Omnihub.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
          <Input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface-container-lowest focus:border-primary h-11 rounded-lg border border-outline-variant pl-12 focus:outline-none"
          />
        </div>

        {error && <p className="text-destructive text-base font-normal">{error}</p>}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              isSelected={selectedAppIds.includes(app.id)}
              onToggle={() => toggleAppId(app.id)}
            />
          ))}
        </div>

        {filteredApps.length === 0 && allApps.length > 0 && (
          <div className="py-12 text-center">
            <p className="text-base font-normal text-on-surface-variant">
              No apps found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {allApps.length === 0 && !loading && (
          <div className="py-12 text-center">
            <p className="text-base font-normal text-on-surface-variant">No apps available</p>
          </div>
        )}
      </div>
    </section>
  );
}
