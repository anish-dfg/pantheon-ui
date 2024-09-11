import { useAuth0 } from "@auth0/auth0-react";
import { ExportUsersToWorkspaceOptions } from "~/intf/requests";
import { http } from "~/services/http";

export const useDataExportsAPI = () => {
  const { getAccessTokenSilently } = useAuth0();

  const exportUsersToWorkspace = async (
    projectCycleId: string,
    data: ExportUsersToWorkspaceOptions,
  ) => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.post(
      `/v1/data-exports/${projectCycleId}/workspace`,
      data,
    );
    return res.data.jobId as string;
  };

  return { exportUsersToWorkspace };
};
