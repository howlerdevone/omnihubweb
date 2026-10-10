import { Settings } from 'lucide-react';

interface ProfileSectionProps {
  user: {
    id: string;
    email: string;
    displayName: string;
    preferredLanguage: string;
    timezone: string;
  };
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <button className="p-md gap-md group flex w-full items-center rounded-xl transition-colors hover:bg-surface-container">
      <div className="bg-primary border-background shadow-primary/10 text-on-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold shadow-lg">
        <span>{initials}</span>
      </div>
      <div className="flex flex-1 flex-col text-left">
        <span className="text-body-md text-on-surface font-bold leading-none">
          {user.displayName}
        </span>
        <span className="text-caption text-on-surface-variant">Settings</span>
      </div>
      <Settings className="group-hover:text-primary h-5 w-5 text-on-surface-variant transition-colors" />
    </button>
  );
};
