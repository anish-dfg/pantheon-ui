import { Job as JobType } from "~/intf/entities";
import { Job } from "~/components/dashboard/jobs/Job";

type JobContainerProps = {
  jobs: JobType[];
};

export const JobContainer = ({ jobs }: JobContainerProps) => {
  return (
    <div className="flex overflow-scroll flex-col gap-2 p-4 rounded-md border shadow-md w-fit max-h-[20rem] border-lightgray">
      <div className="self-center">
        <h3 className="text-lg">Jobs</h3>
      </div>
      <div className="flex flex-col gap-2 h-full">
        {jobs.map((job) => (
          <Job key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
};
