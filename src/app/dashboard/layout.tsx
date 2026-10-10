import { ReactNode } from 'react';
import { Sidebar } from '@/components/features/dashboard/sidebar';
import { Navbar } from '@/components/features/dashboard/navbar';
import { Workspace } from '@/modules/organization';
import { AuthEntity } from '@/modules/auth';
import { CustomHttpHeaders } from '@/lib/http/http.config';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  let user: AuthEntity['user'] | null = null;
  let workspaces: Workspace[] = [];

  try {
    const response = await fetch('/dashboard/api/me', {
      method: 'GET',
      headers: CustomHttpHeaders(),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        user = result.data.user;
        workspaces = result.data.workspaces || [];
      }
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  if (!user || workspaces.length === 0) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface mb-4">Failed to load dashboard</p>
          <button className="bg-primary text-on-primary rounded-lg px-4 py-2 hover:brightness-110">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentWorkspace = workspaces[0];

  return (
    <div className="bg-background">
      <Sidebar user={user} currentWorkspace={currentWorkspace} workspaces={workspaces} />

      <div className="pl-72">
        <Navbar user={user} />

        <main className="bg-background relative min-h-screen pt-16">{children}</main>
      </div>
    </div>
  );
}
