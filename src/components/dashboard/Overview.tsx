import { IoPersonOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { FaPersonMilitaryPointing } from "react-icons/fa6";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { StatCard } from "~/components/dashboard/StatCard";
import useAPI from "~/hooks/useAPI";
import { useQuery } from "@tanstack/react-query";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { useNavigate } from "react-router-dom";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export type OverviewProps = {
  projectCycleId: string;
};

export const Overview = ({ projectCycleId }: OverviewProps) => {
  const api = useAPI();
  const navigate = useNavigate();

  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ["basic-stats", projectCycleId],
    queryFn: async () => {
      return await api.fetchBasicStats(projectCycleId);
    },
  });

  if (isPending || isLoading || isError) {
    if (isError) {
      navigate(`error?error=${error}`);
    }
    return <OverviewSkeleton />;
  }

  console.log(projectCycleId);
  return (
    <div className="flex flex-col gap-4 p-4 pl-0">
      <div className="flex gap-4">
        <StatCard
          title="Total Volunteers"
          description="Imported from Airtable"
          content={data.numVolunteers}
          icon={IoPersonOutline}
        />

        <StatCard
          title="Total Nonprofits"
          description="Imported from Airtable"
          content={data.numNonprofits}
          icon={FaRegBuilding}
        />

        <StatCard
          title="Total Mentors"
          description="Imported from Airtable"
          content={data.numMentors}
          icon={FaPersonMilitaryPointing}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">Available SmartViews</h1>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircledIcon className="mr-1 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="rounded-md text-space max-w-[15rem] dark:bg-offwhite">
                <p>
                  A SmartView lets you take context-specific actions on your
                  data, for example, exporting volunteers.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col col-end-2 gap-2 p-6 rounded-lg border dark:border-mediumgray">
          <h1 className="underline decoration-dotted underline-offset-2">
            Volunteers
          </h1>
          <h1 className="underline decoration-dotted underline-offset-2">
            Nonprofits
          </h1>
          <h1 className="underline decoration-dotted underline-offset-2">
            Mentors
          </h1>
        </div>
      </div>
    </div>
  );
};
