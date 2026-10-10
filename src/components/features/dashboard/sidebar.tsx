'use client';
import { usePathname } from 'next/navigation';
import { Home, Zap, Files, MessageSquare, CreditCard } from 'lucide-react';
import { MenuItem } from './menu-item';
import { WorkspaceSelector } from './workspace-selector';
import { ProfileSection } from './profile-section';
import { ThemeToggle } from './theme-toggle';

interface SidebarProps {
  user: {
    id: string;
    email: string;
    displayName: string;
    preferredLanguage: string;
    timezone: string;
  };
  currentWorkspace: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  workspaces: Array<{
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
}

const menuItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Zap, label: 'Connected Apps', href: '/dashboard/apps' },
  { icon: Files, label: 'File Manager', href: '/dashboard/files' },
  { icon: MessageSquare, label: 'Chat Engine', href: '/dashboard/chat' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
];

export const Sidebar = ({ user, currentWorkspace, workspaces }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="bg-surface-container-lowest border-outline-variant/30 fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r">
      {/* Workspace Selector */}
      <WorkspaceSelector currentWorkspace={currentWorkspace} workspaces={workspaces} />

      {/* Navigation Menu */}
      <nav className="py-lg px-md space-y-xs flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* Settings & Theme Toggle */}
      <div className="p-md border-outline-variant/20 space-y-md mt-auto border-t">
        <ThemeToggle />
        <ProfileSection user={user} />
      </div>
    </aside>
  );
};
