import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

export const MenuItem = ({ icon: Icon, label, href, isActive }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={`gap-md px-md py-sm flex items-center rounded-lg transition-all ${
        isActive
          ? 'bg-secondary-container text-on-surface font-semibold'
          : 'hover:text-on-surface text-on-surface-variant hover:bg-surface-container-high'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};
