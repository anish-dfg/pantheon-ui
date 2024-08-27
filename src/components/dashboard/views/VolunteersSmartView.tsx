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
      <div className="flex gap-2 items-center ml-4">
        <h1 className="text-2xl">Volunteer Data for </h1>
        <Badge className="bg-blue-450">{projectCycleId}</Badge>{" "}
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <div className="p-4 pr-8 pl-8 ml-4 rounded-md rounded-r-none border-2 border-offwhite">
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
              defaultSize={50}
              className="rounded-b-none rounded-r-md border-2 border-offwhite"
            >
              <VolunteerSmartViewActions />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={50}
              className="rounded-t-none rounded-r-md border-2 border-offwhite"
            >
              <h1>HERE</h1>
              <button onClick={() => console.log(selection)}>Selection</button>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
