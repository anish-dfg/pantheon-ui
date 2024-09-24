import { Job } from "~/intf/entities";
import { JobContainer } from "~/components/dashboard/jobs/JobContainer";

export const NoCycleOverview = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="flex flex-col">
      <JobContainer jobs={jobs} />
    </div>
  );
};
