import useAPI from "~/hooks/useAPI";
import { ApiStatus } from "./ApiStatus";
import { useQuery } from "@tanstack/react-query";
import { JobContainer } from "./jobs/JobContainer";
import { GetStarted } from "./GetStarted";

export const StatusView = () => {
  const api = useAPI();

  const { isPending, data, isLoading, isError } = useQuery({
    queryKey: ["api-status"],
    queryFn: async () => {
      const status = await api.fetchApiStatus();
      const details = await api.fetchApiDetails();
      const jobs = await api.fetchJobs();
      return { status, details, jobs };
    },
  });

  if (isPending || isLoading || isError) {
    return <div>LOADING</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <ApiStatus status={data.status} details={data.details} />
      <JobContainer jobs={data.jobs} />
      <GetStarted />
    </div>
  );
};
