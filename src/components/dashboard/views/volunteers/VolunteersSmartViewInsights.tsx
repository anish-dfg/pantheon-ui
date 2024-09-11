import { InfoTooltip } from "~/components/ui/info-tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { VolunteerDetails } from "~/intf/entities";

type VolunteersSmartViewInsightsProps = {
  data: VolunteerDetails[];
};

export const VolunteersSmartViewInsights = ({
  data,
}: VolunteersSmartViewInsightsProps) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl font-bold">Tools</h3>
        <InfoTooltip tooltipMessage="Tools and visualization utilities for this SmartView" />
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid grid-cols-2 gap-2 p-1 w-full rounded-md dark:bg-mediumgray">
          <TabsTrigger
            value="insights"
            className="data-[state=active]:text-space"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:text-space"
          >
            Advanced
          </TabsTrigger>
        </TabsList>
        <TabsContent value="insights">{data.length}</TabsContent>
        <TabsContent value="advanced">
          <div className="flex flex-col p-2">
            <Textarea />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
