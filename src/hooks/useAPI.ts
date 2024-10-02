import axios, { AxiosInstance } from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Base, Cycle, Job, ApiDetails } from "~/intf/entities";
import { BasicStatsResponse, ImportBaseResponse } from "~/intf/responses";

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DEV_BASE_URL,
});

const useAPI = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchApiStatus = async () => {
    const res = await http.get("/services");
    return res.status;
  };

  const fetchApiDetails = async () => {
    const res = await http.get("/services");
    return res.data as ApiDetails;
  };

  const fetchCycles = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.get("/v1/cycles");
    return res.data.cycles as Cycle[];
  };

  const fetchBasicStats = async (projectCycleId: string) => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.get(`/v1/stats/${projectCycleId}/basic`);
    return res.data as BasicStatsResponse;
  };

  const fetchJobs = async () => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.get("/v1/jobs");
    return res.data.jobs as Job[];
  };

  const fetchAvailableBases = async () => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.get("/v1/data-imports/airtable/available-bases");
    return res.data.bases as Base[];
  };

  const getPermissions = async () => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.post("/v1/authz/permissions");
    return res.data as string[];
  };

  const importAirtableBase = async (
    baseId: string,
    name: string,
    description: string,
  ) => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    return (await http.post("/v1/data-imports/airtable/base/" + baseId, {
      name,
      description,
    })) as ImportBaseResponse;
  };

  return {
    fetchCycles,
    fetchAvailableBases,
    getPermissions,
    importAirtableBase,
    fetchJobs,
    fetchBasicStats,
    fetchApiDetails,
    fetchApiStatus,
  };
};

export default useAPI;
