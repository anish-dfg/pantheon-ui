import { InfoTooltip } from "~/components/ui/info-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const VolunteerSmartViewActions = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl font-bold">Actions</h3>
        <InfoTooltip tooltipMessage="Export or import actions for this SmartView" />
      </div>

      <Tabs defaultValue="exportActions" className="w-full">
        <TabsList className="grid grid-cols-2 gap-2 p-1 w-full rounded-md dark:bg-mediumgray">
          <TabsTrigger
            value="exportActions"
            className="data-[state=active]:text-space"
          >
            Export
          </TabsTrigger>
          <TabsTrigger
            value="importActions"
            className="data-[state=active]:text-space"
          >
            Import
          </TabsTrigger>
        </TabsList>
        <TabsContent value="exportActions">
          <div className="flex flex-col p-2">
            <ul>
              <li className="cursor-pointer">
                <h4>Download CSV</h4>
              </li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="importActions">HERE</TabsContent>
      </Tabs>
    </div>
  );
};
