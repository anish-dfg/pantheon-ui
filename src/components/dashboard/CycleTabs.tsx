import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { StatusView } from "./NoCycleOverview";
import { Overview } from "./Overview";
import { Info } from "./info/Info";

type CycleTabsProps = {
  projectCycleId: string;
};

export const CycleTabs = ({ projectCycleId }: CycleTabsProps) => {
  return (
    <>
      <Tabs defaultValue="status" className="">
        <TabsList className="flex gap-2 p-1 rounded-md w-fit bg-mediumgray">
          <TabsTrigger
            value="status"
            className="data-[state=active]:text-space text-offwhite"
          >
            Status
          </TabsTrigger>

          <TabsTrigger
            value="overview"
            className="data-[state=active]:text-space text-offwhite"
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="about"
            className="data-[state=active]:text-space text-offwhite"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:text-space text-offwhite"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:text-space text-offwhite"
          >
            Notifications
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="data-[state=active]:text-space text-offwhite"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="status">
          <StatusView />
        </TabsContent>

        <TabsContent value="overview">
          <Overview projectCycleId={projectCycleId} />
        </TabsContent>

        <TabsContent value="about">
          <Info />
        </TabsContent>

        <TabsContent value="analytics">Nothing here yet.</TabsContent>
        <TabsContent value="notifications">
          Nothing here yet either.
        </TabsContent>
        <TabsContent value="settings">Also nothing here yet.</TabsContent>
      </Tabs>
    </>
  );
};
