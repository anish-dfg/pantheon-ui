import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Info } from "./info/Info";
import { StatusView } from "./NoCycleOverview";

export const NoCycleTabs = () => {
  return (
    <>
      <Tabs defaultValue="status">
        <TabsList className="flex gap-2 p-1 rounded-md w-fit bg-mediumgray">
          <TabsTrigger
            value="status"
            className="data-[state=active]:text-space text-offwhite"
          >
            Status
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:text-space text-offwhite"
          >
            About
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
        <TabsContent value="about">
          <Info />
        </TabsContent>
        <TabsContent value="settings">Also nothing here yet.</TabsContent>
      </Tabs>
    </>
  );
};
