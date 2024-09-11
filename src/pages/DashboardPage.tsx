import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { DashboardPageSkeleton } from "~/pages/DashboardPageSkeleton";
import { Overview } from "~/components/dashboard/Overview";
import useAPI from "~/hooks/useAPI";
import { useNavigate } from "react-router-dom";
import { NoCycleOverview } from "~/components/dashboard/NoCycleOverview";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const api = useAPI();
  const [selectedCycle, setSelectedCycle] = useState<string>("");

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
  } else {
    if (data.cycles.length === 0 && data.jobs.length === 0) {
      navigate("/get-started");
    }
  }

  return (
    <div className="flex flex-col flex-1 gap-4 p-6">
      <div className="flex justify-between items-center">
        {data.cycles.length > 0 && (
          <>
            <div className="flex gap-4 items-center">
              <h1 className="mb-2 font-bold text-[2.5rem]">Dashboard</h1>

              {selectedCycle !== "" && (
                <Badge className="bg-pink-300">{selectedCycle}</Badge>
              )}
            </div>
            <div className="flex items-center">
              <Select
                disabled={data ? data.cycles.length === 0 : false}
                onValueChange={setSelectedCycle}
              >
                <SelectTrigger className="w-[10rem]">
                  <SelectValue placeholder="Select a cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {data.cycles?.map((cycle) => (
                      <SelectItem
                        key={cycle.id}
                        value={cycle.id}
                        className="cursor-pointer"
                      >
                        {cycle.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-4">
        <Tabs defaultValue="overview" className="">
          <TabsList className="flex gap-2 p-1 rounded-md w-fit dark:bg-mediumgray">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:text-space"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:text-space"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:text-space"
            >
              Notifications
            </TabsTrigger>

            <TabsTrigger
              value="settings"
              className="data-[state=active]:text-space"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {data.cycles.length > 0 && selectedCycle !== "" ? (
              <Overview projectCycleId={selectedCycle} />
            ) : (
              <NoCycleOverview jobs={data.jobs} />
            )}
          </TabsContent>
          <TabsContent value="analytics">Tab 2 content</TabsContent>
          <TabsContent value="notifications">Tab 3 content</TabsContent>
          <TabsContent value="settings">Tab 4 content</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
