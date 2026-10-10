import { Workspace } from '../domains/workspace.entity';

export interface WorkspaceProviderPort {
  getAllWorkspaces: () => Promise<Workspace[]>;
}
