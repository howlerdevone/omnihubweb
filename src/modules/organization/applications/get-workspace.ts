import { Workspace } from '../domains/workspace.entity';
import { WorkspaceProviderPort } from '../ports/workspace.port';

/**
 * Retrieves all workspaces accessible by the current user.
 * The first workspace in the list should be treated as the selected/current workspace.
 *
 * @param {WorkspaceProviderPort} adapter - The workspace provider to use
 * @returns {Promise<Workspace[]>} Array of workspace data
 */
export const getAllWorkspaces = async (adapter: WorkspaceProviderPort): Promise<Workspace[]> => {
  return await adapter.getAllWorkspaces();
};
