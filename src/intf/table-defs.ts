import { ColumnDef } from "@tanstack/react-table";
import { VolunteerDetails } from "./entities";

export const volunteerColumns: ColumnDef<VolunteerDetails>[] = [
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

//
