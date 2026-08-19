import { Globe } from 'lucide-react';

interface PublicAccessPointProps {
  slug: string;
}

export function PublicAccessPoint({ slug }: PublicAccessPointProps) {
  return (
    <div className="border-outline-variant/50 flex items-center gap-2 rounded-lg border bg-surface-container-low p-4">
      <Globe className="h-5 w-5 flex-shrink-0 text-on-surface-variant" />
      <span className="text-base font-normal text-on-surface-variant">Public Access Point:</span>
      <code className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
        omnihub.ai/w/
        <span className="text-on-surface">{slug || 'acme-global-research'}</span>
      </code>
    </div>
  );
}
