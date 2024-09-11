import { useAuth0 } from "@auth0/auth0-react";
import { http } from "~/services/http";

export const useJobsAPI = () => {
  const { getAccessTokenSilently } = useAuth0();

  const sendCancellationSignal = async (jobId: string) => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    await http.post(`/v1/jobs/cancel/${jobId}`);
  };

  return { sendCancellationSignal };
};
