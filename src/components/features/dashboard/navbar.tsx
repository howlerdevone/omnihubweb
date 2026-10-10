'use client';
import { Bell, Settings, Cpu } from 'lucide-react';
import { SearchInput } from './search-input';

interface NavbarProps {
  user: {
    id: string;
    email: string;
    displayName: string;
    preferredLanguage: string;
    timezone: string;
  };
}

export const Navbar = ({ user }: NavbarProps) => {
  const now = new Date();
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="bg-background/60 px-xl border-outline-variant/10 fixed left-72 right-0 top-0 z-40 flex h-16 items-center justify-between border-b backdrop-blur-md">
      {/* Left Section: Logo & Status */}
      <div className="gap-md flex items-center">
        <Cpu className="text-primary h-6 w-6" />
        <span className="font-label-mono text-label-mono text-primary bg-primary/10 px-sm py-xs border-primary/20 gap-xs flex items-center rounded border">
          <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></span>
          LIVE SYSTEM
        </span>
      </div>

      {/* Middle Section: Search */}
      <SearchInput />

      {/* Right Section: Notifications & Profile */}
      <div className="gap-lg flex items-center">
        {/* Notification Icon */}
        <button className="hover:text-on-surface text-on-surface-variant transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        {/* User Info Divider */}
        <div className="bg-outline-variant/20 h-6 w-px"></div>

        {/* User Name & Date */}
        <div className="flex flex-col text-right">
          <span className="text-body-md text-on-surface font-semibold leading-none">
            {user.displayName}
          </span>
          <span className="text-caption text-on-surface-variant">{dateString}</span>
        </div>

        {/* Settings Icon */}
        <button className="hover:text-on-surface text-on-surface-variant transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};
