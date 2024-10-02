import { Job as JobType } from "~/intf/entities";
import { FaCircle } from "react-icons/fa";
import { Badge } from "~/components/ui/badge";

type JobProps = JobType;

export const Job = ({
  // id,
  createdAt,
  // updatedAt,
  projectCycleId,
  status,
  label,
  // description,
  // details,
}: JobProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full rounded-sm text-offwhite bg-space dark:bg-offwhite dark:text-space">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <FaCircle
            className={
              status === "complete"
                ? "text-success"
                : status === "pending"
                  ? "text-pending"
                  : "text-error"
            }
          />
          <h3 className="font-bold">{label}</h3>
        </div>
        <p className="font-mono">{new Date(createdAt).toLocaleTimeString()}</p>
      </div>
      <div className="flex gap-2 items-center">
        <Badge className="bg-pink-300 dark:bg-blue-800 text-offwhite">
          cycle
        </Badge>
        <p className="text-[0.625rem]">{projectCycleId}</p>
      </div>
    </div>
  );
};
