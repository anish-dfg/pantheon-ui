import { useAuth0 } from "@auth0/auth0-react";
import { VolunteerDetails } from "~/intf/entities";
import { http } from "~/services/http";

export const useVolunteersAPI = () => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchVolunteersByCycle = async (projectCycleId: string) => {
    const token = await getAccessTokenSilently();
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    const res = await http.get(`/v1/volunteers/${projectCycleId}`);
    return res.data.volunteers as VolunteerDetails[];
  };

  return { fetchVolunteersByCycle };
};
