import { getCurrentUser, AuthApiRepository } from '@/modules/auth';
import { getAllWorkspaces, WorkspaceApiRepository } from '@/modules/organization';
import { createBaseResponse } from '@/lib/models/base-response.model';
import { HTTP_STATUS } from '@/lib/http/http-status';

export const GET = async () => {
  try {
    const [user, workspaces] = await Promise.all([
      getCurrentUser(AuthApiRepository),
      getAllWorkspaces(WorkspaceApiRepository),
    ]);

    const currentWorkspace = workspaces[0] || null;

    return Response.json(
      createBaseResponse('Data fetched successfully', true, {
        user,
        currentWorkspace,
        workspaces,
      }),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('Error fetching user or workspace:', error);
    return Response.json(createBaseResponse('Failed to fetch user or workspace', false, null), {
      status: HTTP_STATUS.INTERNAL_ERROR,
    });
  }
};
