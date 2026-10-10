import 'server-only';
import { SystemApiConnector } from '@/lib/http/http-client';
import { Workspace } from '../../domains/workspace.entity';
import { WorkspaceProviderPort } from '../../ports/workspace.port';

export const WorkspaceApiRepository: WorkspaceProviderPort = {
  /**
   * Retrieves all workspaces accessible by the current user.
   * The first workspace in the list should be treated as the selected/current workspace.
   *
   * @returns {Promise<Workspace[]>} Array of workspace data
   * @throws {AxiosError} If the request fails
   */
  getAllWorkspaces: async (): Promise<Workspace[]> => {
    const response = await SystemApiConnector.get<Workspace[]>('/v1/organizations/workspaces/me');
    return response.data;
  },
};
