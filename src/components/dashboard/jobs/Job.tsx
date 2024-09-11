import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Job as JobType } from "~/intf/entities";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type JobProps = JobType;

export const Job = ({
  // id,
  // createdAt,
  // updatedAt,
  // projectCycleId,
  status,
  label,
  // description,
  details,
}: JobProps) => {
  const processJobType = (jobType: string) => {
    switch (jobType) {
      case "airtable_import_base":
        return "AirtableImportBase";
      case "airtable_export_users":
        return "AirtablExportUsers";
      default:
        return jobType;
    }
  };

  const truncateLabel = (label: string) => {
    return label.length > 22 ? `${label.slice(0, 22)}...` : label;
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-md border w-[30rem] dark:border-mediumgray">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3 className="overflow-scroll text-sm font-bold cursor-pointer">
                  {truncateLabel(label)}
                </h3>
              </TooltipTrigger>
              <TooltipContent>
                <p className="p-1 rounded-sm shadow-md bg-offwhite text-space">
                  {label}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DotsHorizontalIcon className="self-start cursor-pointer" />
      </div>
      <div className="flex gap-2">
        <Badge
          className={
            status === "complete"
              ? "bg-success"
              : status === "pending"
                ? "bg-pending"
                : status === "error"
                  ? "bg-error"
                  : "bg-cancelled"
          }
        >
          {status}
        </Badge>
        <Badge className="bg-pink-300">{processJobType(details.jobType)}</Badge>
      </div>
      <div></div>
    </div>
  );
};
