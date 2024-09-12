import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { DataTable } from "~/components/ui/data-table";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { useVolunteersAPI } from "~/hooks/useVolunteersAPI";
import { VolunteerDetails } from "~/intf/entities";
import { VolunteerSmartViewActions } from "./volunteers/VolunteerSmartViewActions";
import { VolunteersSmartViewInsights } from "./volunteers/VolunteersSmartViewInsights";
import HelpDialog from "~/components/ui/help-dialog";
import { Separator } from "~/components/ui/separator";

const volunteerColumns: ColumnDef<VolunteerDetails>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "offerLetterSignature",
    header: "Offer Letter Signature",
  },
  {
    accessorKey: "volunteerGender",
    header: "Volunteer Gender",
  },
  {
    accessorKey: "volunteerEthnicity",
    header: "Volunteer Ethnicity",
  },
  {
    accessorKey: "volunteerAgeRange",
    header: "Volunteer Age Range",
  },
  {
    accessorKey: "projectCycleId",
    header: "Project Cycle ID",
  },
  {
    accessorKey: "projectCycleName",
    header: "Project Cycle Name",
  },
  {
    accessorKey: "workspaceEmail",
    header: "Workspace Email",
  },
];

const fieldNames = [
  "id",
  "firstName",
  "lastName",
  "email",
  "phone",
  "offerLetterSignature",
  "volunteerGender",
  "volunteerEthnicity",
  "volunteerAgeRange",
  "projectCycleId",
  "projectCycleName",
  "workspaceEmail",
  "clients",
];

export type VolunteersSmartViewProps = {
  projectCycleId: string;
};

export const VolunteersSmartView = ({
  projectCycleId,
}: VolunteersSmartViewProps) => {
  const volunteersAPI = useVolunteersAPI();
  const [selection, setSelection] = useState([] as VolunteerDetails[]);

  const { data, isLoading, isPending, isError, error } = useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      return await volunteersAPI.fetchVolunteersByCycle(projectCycleId);
    },
  });

  if (isLoading || isPending || isError) {
    console.log(error);
    return <p>Loading</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center mx-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl">Volunteer Data for </h1>
          <Badge className="bg-blue-450 text-offwhite">
            {projectCycleId}
          </Badge>{" "}
        </div>
        <div>
          <HelpDialog title={"How to use this view"}>
            <div className="flex flex-col gap-2">
              <p>
                This view consists of three panels. All of them may be resized
                by dragging the panes. The left panel displays the volunteer
                data in a table. The middle panel allows you to perform bulk
                actions on the selected volunteers. The right panel displays
                insights and tools for the selected volunteers.
              </p>
              <Separator
                orientation="horizontal"
                className="dark:bg-offwhite"
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-md">Using the table</h3>
                <ul className="self-end w-[95%] list-disc">
                  <li>
                    You can select multiple rows by clicking on the checkboxes.
                    The actions panel lets you perform bulk actions on the
                    selected volunteers.
                  </li>

                  <li>
                    For the sake of readability, the table truncates long
                    values. If you need to access an entire, long, untruncated
                    value such as an ID, you can double click on the table cell
                    to copy, or hover over the cell and a tooltip will display
                    the value.
                  </li>

                  <li>
                    You can change the columns displayed by clicking on the
                    columns button on the top right and selecting/deselecting
                    columns.
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-md">Bulk Actions</h3>
                <ul className="self-end w-[95%] list-disc">
                  <li>
                    You can download the selected volunteers in TSV or JSON
                    formats. Click the download button, and you will be prompted
                    to select the fields you want to include in your download.
                    When you're done, click "Download JSON" or "Download CSV" to
                    download the file.
                  </li>

                  <li>
                    To export the selected volunteers to Google Workspace, click
                    the export button. You will be prompted to configure an
                    email policy and a password policy. When you're ready, click
                    export and a job will start to export the volunteers. This
                    may take some time (the last benchmark took approximately 6
                    minutes to export 300 volunteers). You can check the status
                    of the job in the jobs view on the dashboard.
                  </li>
                </ul>
              </div>
            </div>
          </HelpDialog>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={70}
          className="rounded-md rounded-r-none border-2 hover:duration-300 border-lightgray dark:border-mediumgray dark:hover:border-offwhite hover:border-mediumgray"
        >
          <div className="p-4 pr-8 pl-8">
            <DataTable
              columns={volunteerColumns}
              data={data}
              onSelectionHook={setSelection}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel
              defaultSize={25}
              className="rounded-b-none rounded-r-md border-2 hover:duration-300 border-lightgray dark:border-mediumgray dark:hover:border-offwhite hover:border-mediumgray"
            >
              <VolunteerSmartViewActions
                projectCycleId={projectCycleId}
                volunteers={selection}
                fieldNames={fieldNames}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel
              defaultSize={75}
              className="rounded-t-none rounded-r-md border-2 hover:duration-300 border-lightgray dark:border-mediumgray dark:hover:border-offwhite hover:border-mediumgray"
            >
              <VolunteersSmartViewInsights data={data} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
