import { Job as JobType } from "~/intf/entities";
import { Job } from "~/components/dashboard/jobs/Job";
import { FcParallelTasks } from "react-icons/fc";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

type JobContainerProps = {
  jobs: JobType[];
};

export const JobContainer = ({ jobs }: JobContainerProps) => {
  return (
    <Card className="w-full rounded-md border shadow-md border-space bg-offwhite dark:border-offwhite dark:bg-space dark:text-offwhite">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-xl text-center">Async Jobs</h2>
          </div>
          <FcParallelTasks size={30} />
        </CardTitle>

        <Separator className="bg-lightgray" />
        <CardDescription className="text-md">
          Long-running API tasks
        </CardDescription>
      </CardHeader>

      <CardContent className="flex overflow-scroll flex-col gap-2 max-h-48">
        {jobs.map((job) => (
          <Job key={job.id} {...job} />
        ))}
      </CardContent>
    </Card>
  );
};
