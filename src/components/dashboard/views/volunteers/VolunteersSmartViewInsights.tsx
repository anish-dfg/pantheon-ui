import { InfoTooltip } from "~/components/ui/info-tooltip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { VolunteerDetails } from "~/intf/entities";
import { InsightAsPie } from "./insights/InsightAsPie";
import { useState } from "react";
import { cols } from "~/intf/table-defs";

type VolunteersSmartViewInsightsProps = {
  data: VolunteerDetails[];
  fieldNames: string[];
};

export const VolunteersSmartViewInsights = ({
  data,
}: VolunteersSmartViewInsightsProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  console.log({ cols });
  console.log(data[0]);

  return (
    <div className="flex flex-col gap-2 p-2 h-full">
      <div className="flex gap-2 items-center">
        <h3 className="text-xl font-bold">Tools</h3>
        <InfoTooltip tooltipMessage="Tools and visualization utilities for this SmartView" />
      </div>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid grid-cols-2 gap-2 p-1 w-full rounded-md bg-mediumgray">
          <TabsTrigger
            value="insights"
            // className="data-[state=active]:text-space"
            className="data-[state=active]:text-space text-offwhite"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            // className="data-[state=active]:text-space"
            className="data-[state=active]:text-space text-offwhite"
          >
            Advanced
          </TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="flex-grow">
          <div className="flex flex-col flex-grow gap-4">
            <Select onValueChange={setSelectedField}>
              <SelectTrigger className="border focus:ring-0 w-[14rem] border-lightgray dark:border-mediumgray">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>

              <SelectContent className="border border-lightgray w-[14rem] dark:border-mediumgray dark:bg-space dark:text-offwhite">
                {cols
                  .filter((field) =>
                    [
                      "volunteerGender",
                      "volunteerEthnicity",
                      "volunteerAgeRange",
                      "country",
                      "usState",
                      "fli",
                      "hearAbout",
                      "lgbt",
                      "usState",
                      "majors",
                      "minors",
                      "studentStage",
                      "university",
                    ].includes(field.accessorKey),
                  )
                  .map((field) => (
                    <SelectItem
                      key={field.accessorKey}
                      value={field.accessorKey}
                      className="cursor-pointer"
                    >
                      {field.header}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {selectedField ? (
              <InsightAsPie
                title={selectedField}
                volunteers={data}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                field={selectedField as any}
              />
            ) : (
              <div className="flex flex-col justify-center items-center min-h-full">
                <h3 className="italic text-lightgray">
                  Select a field to view insights
                </h3>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="advanced">Nothing here yet either.</TabsContent>
      </Tabs>
    </div>
  );
};
