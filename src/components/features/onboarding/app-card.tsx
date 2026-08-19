import Image from 'next/image';
import { App } from '@/modules/catalog';
import { CheckCircle2 } from 'lucide-react';

interface AppCardProps {
  app: App;
  isSelected: boolean;
  onToggle: () => void;
}

export function AppCard({ app, isSelected, onToggle }: AppCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-6 text-left transition-all ${
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-outline-variant/40 hover:border-primary bg-surface-container-low'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-outline-variant bg-surface-container-highest">
          <Image
            src={app.iconUrl}
            alt={app.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
          <CheckCircle2 className="text-primary h-6 w-6" />
        </div>
      </div>

      <div>
        <h4 className="text-on-surface text-lg font-semibold">{app.name}</h4>
        <p className="mt-1 text-xs font-normal text-on-surface-variant">{app.description}</p>
      </div>
    </button>
  );
}
