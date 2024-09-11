import { Job } from "~/hooks/useAPI";
import { JobContainer } from "./jobs/JobContainer";

export const NoCycleOverview = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="flex flex-col">
      <JobContainer jobs={jobs} />
    </div>
  );
};
