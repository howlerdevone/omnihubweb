'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Copy, Grid3x3 } from 'lucide-react';

interface WorkspaceSelectorType {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceSelectorProps {
  currentWorkspace: WorkspaceSelectorType;
  workspaces: WorkspaceSelectorType[];
  onSelect?: (workspace: WorkspaceSelectorType) => void;
}

export const WorkspaceSelector = ({
  currentWorkspace,
  workspaces,
  onSelect,
}: WorkspaceSelectorProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCopyUrl = (slug: string) => {
    const url = `${window.location.origin}/w/${slug}`;
    navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-lg border-outline-variant/20 group flex w-full cursor-pointer items-center justify-between border-b transition-colors hover:bg-surface-container-low"
      >
        <div className="gap-md flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary-container">
            <Grid3x3 className="h-5 w-5 text-on-primary-container" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-body-md text-on-surface font-bold">{currentWorkspace.name}</span>
            <span className="text-caption text-on-surface-variant">
              Workspace {currentWorkspace.slug}
            </span>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="bg-surface-container-lowest border-outline-variant/30 absolute left-0 right-0 top-full z-50 mt-0 max-h-80 overflow-y-auto border">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => {
                onSelect?.(workspace);
                setOpen(false);
              }}
              className={`px-lg py-md border-outline-variant/10 flex w-full items-center justify-between border-b transition-colors ${
                workspace.id === currentWorkspace.id
                  ? 'bg-primary/10'
                  : 'hover:bg-surface-container'
              }`}
            >
              <div className="gap-md flex items-center text-left">
                <div className="bg-primary-container/50 flex h-8 w-8 items-center justify-center rounded">
                  <Grid3x3 className="text-primary h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-body-md text-on-surface font-semibold">
                    {workspace.name}
                  </span>
                  <span className="text-caption text-on-surface-variant">{workspace.slug}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyUrl(workspace.slug);
                }}
                className="hover:text-on-surface rounded p-1 text-on-surface-variant transition-colors hover:bg-surface-container-high"
              >
                <Copy className="h-4 w-4" />
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
