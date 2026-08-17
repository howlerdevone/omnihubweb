import * as React from 'react';

export interface BannerProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Banner = ({ icon, title, description }: BannerProps) => {
  return (
    <div className="bg-card border-border mb-6 flex w-full items-start gap-4 rounded-lg border p-4">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="flex flex-col gap-1">
        <h4 className="text-primary font-mono text-xs font-semibold uppercase tracking-wider">
          {title}
        </h4>
        <p className="text-muted-foreground font-sans text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
