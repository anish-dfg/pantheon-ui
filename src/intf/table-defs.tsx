import { ColumnDef } from "@tanstack/react-table";
import { NonprofitClient, VolunteerDetails } from "./entities";

import { LuArrowUpDown } from "react-icons/lu";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

const stateAbbreviations: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const abbreviateState = (stateName: string): string | undefined => {
  return stateAbbreviations[stateName] || undefined;
};

// export const fields = [];
//
export const cols = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "firstName",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <LuArrowUpDown className="ml-2 w-4 h-4" size={10} />
        </Button>
      );
    },
  },

  {
    accessorKey: "lastName",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <LuArrowUpDown className="ml-2 w-4 h-4" size={10} />
        </Button>
      );
    },
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
    accessorKey: "volunteerGender",
    header: "Volunteer Gender",
    cell: ({ getValue }: { getValue: () => unknown }) => {
      return (
        <div className="flex relative group text-nowrap">
          <Badge
            className={
              getValue() === "Woman"
                ? "bg-pink-300 text-offwhite"
                : getValue() === "Man"
                  ? "bg-blue-700 text-offwhite"
                  : getValue() == "Prefer not to say"
                    ? "bg-offwhite text-space"
                    : "bg-purple-400 text-offwhite"
            }
          >
            {getValue() as string}
          </Badge>
        </div>
      );
    },
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
    cell: ({ getValue }: { getValue: () => unknown }) => {
      const val = getValue() as string;
      return (
        <div className="flex relative group text-nowrap">
          {val ? (
            <p>{val}</p>
          ) : (
            <p className="text-lightgray dark:text-mediumgray">&lt;null&gt;</p>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "country",
    header: "Country",
  },

  {
    accessorKey: "usState",
    header: "State",

    cell: ({ getValue }: { getValue: () => unknown }) => {
      const val = getValue() as string;
      return (
        <div className="flex relative group text-nowrap">
          {val ? (
            <p>{abbreviateState(val)}</p>
          ) : (
            <p className="text-lightgray dark:text-mediumgray">&lt;null&gt;</p>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "fli",
    header: "FLI",
  },
  {
    accessorKey: "hearAbout",
    header: "Hear About",
  },
  {
    accessorKey: "lgbt",
    header: "LGBT",
  },
  {
    accessorKey: "majors",
    header: "Majors",
  },
  {
    accessorKey: "minors",
    header: "Minors",
    cell: ({ getValue }: { getValue: () => unknown }) => {
      console.log(getValue());
      const minors = (getValue() as string[])
        .filter((minor) => minor.length)
        .map((minor) => <p key={minor}>{minor}</p>);

      return (
        <div className="flex relative group text-nowrap">
          {minors.length ? (
            minors
          ) : (
            <p className="text-lightgray dark:text-mediumgray">&lt;null&gt;</p>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "studentStage",
    header: "Student Stage",
  },

  {
    accessorKey: "university",
    header: "Universities",
    // cell: ({ table, row, column, cell, getValue, renderValue }) => {
    //   return (
    //     <div className="flex relative group">
    //       <p> {getValue() as string}</p>
    //     </div>
    //   );
    // },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterFn: (row: any, _: any, filterValue: any) => {
      const universities = row.original.university as string[];
      return universities.some((university) =>
        university.toLowerCase().includes(filterValue.toLowerCase()),
      );
    },
  },

  {
    accessorKey: "clients",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterFn: (row: any, _: any, filterValue: any) => {
      const clients = row.original.clients as NonprofitClient[];
      return clients.some(
        (client) =>
          client.projectName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          client.orgName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clients
          <LuArrowUpDown className="ml-2 w-4 h-4" size={10} />
        </Button>
      );
    },

    cell: ({ getValue }: { getValue: () => unknown }) => {
      return (
        <div className="flex relative group text-nowrap">
          {(
            getValue() as {
              clientId: string;
              orgName: string;
              projectName: string;
            }[]
          ).map((client) => {
            return <p key={client.clientId}>{client.projectName}</p>;
          })}
        </div>
      );
    },
  },

  // {
  //   accessorKey: "clients",
  //   header: "OrgName",
  //   cell: ({ getValue }: { getValue: () => unknown }) => {
  //     return (
  //       <div className="flex relative group text-nowrap">
  //         {(getValue() as { orgName: string }[]).map((client) => {
  //           return <p>{client.orgName}</p>;
  //         })}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "clients",
  //   header: "ProjectName",
  //   cell: ({ getValue }: { getValue: () => unknown }) => {
  //     return (
  //       <div className="flex relative group text-nowrap">
  //         {(getValue() as { projectName: string }[]).map((client) => {
  //           return <p>{client.projectName}</p>;
  //         })}
  //       </div>
  //     );
  //   },
  // },
];

export const volunteerColumns: ColumnDef<VolunteerDetails>[] = [...cols];

export const fieldNames = cols.map((col) => col.header.toString());

export const volunteerFields = cols.map((col) => col.accessorKey);
