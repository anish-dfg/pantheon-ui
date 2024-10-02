import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { DashboardPageSkeleton } from "~/pages/DashboardPageSkeleton";
import useAPI from "~/hooks/useAPI";
import { useAtom } from "jotai";
import { projectCycleAtom } from "~/pages/state/project-cycle";
import { Badge } from "~/components/ui/badge";
import { NoCycleDashboard } from "~/components/dashboard/NoCycleDashboard";
import { CycleDashboard } from "~/components/dashboard/CycleDashboard";

export const DashboardPage = () => {
  const api = useAPI();

  const [selectedCycle, setSelectedCycle] = useAtom(projectCycleAtom);

  const { isPending, data, isLoading, isError } = useQuery({
    queryKey: ["project-cycles"],
    queryFn: async () => {
      const cycles = await api.fetchCycles();
      const jobs = await api.fetchJobs();
      return { cycles, jobs };
    },
  });

  if (isPending || isLoading || isError) {
    return <DashboardPageSkeleton />;
  }

  return (
    <div className="flex flex-col flex-1 gap-4 p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h1 className="mb-2 font-bold text-[2.5rem]">Dashboard</h1>

          {selectedCycle && (
            <Badge className="bg-pink-300 text-offwhite">{selectedCycle}</Badge>
          )}
        </div>

        <div className="flex items-center">
          <Select
            disabled={data ? data.cycles.length === 0 : false}
            onValueChange={(v) => {
              setSelectedCycle(v);
            }}
          >
            <SelectTrigger className="border focus:ring-0 w-[14rem] border-lightgray dark:border-mediumgray">
              <SelectValue
                placeholder={
                  data.cycles?.find((c) => c.id === selectedCycle)?.name ||
                  "Select a cycle"
                }
              />
            </SelectTrigger>

            <SelectContent className="border border-lightgray w-[14rem] dark:border-mediumgray dark:bg-space dark:text-offwhite">
              <SelectGroup className="border-none">
                {data.cycles?.map((cycle) => (
                  <SelectItem
                    key={cycle.id}
                    value={cycle.id}
                    className="py-1 border-none cursor-pointer"
                  >
                    {cycle.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-4">
        {selectedCycle ? (
          <CycleDashboard projectCycleId={selectedCycle} />
        ) : (
          <NoCycleDashboard />
        )}
      </div>
    </div>
  );
};
