import { UpdateIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { Badge } from "~/components/ui/badge";

export const AirtableImportBaseJobDataSchema = z.object({
  baseId: z.string(),
});

export type AirtableImportBaseJobDataProps = z.infer<
  typeof AirtableImportBaseJobDataSchema
>;

export const AirtableExportUsersJobDataSchema = z.object({
  exportDestination: z.string(),
});

export type AirtableExportUsersJobData = z.infer<
  typeof AirtableExportUsersJobDataSchema
>;

export const JobDetailsSchema = z.object({
  job_type: z.enum(["airtable_import_base", "airtable_export_users"]),
  error: z.string().optional(),
  data: z.union([
    AirtableImportBaseJobDataSchema,
    AirtableExportUsersJobDataSchema,
  ]),
});

export type JobDetails = z.infer<typeof JobDetailsSchema>;

export const JobSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  projectCycleId: z.string().uuid().optional(),
  status: z.enum(["pending", "cancelled", "complete", "error"]),
  label: z.string(),
  description: z.string().optional(),
  details: JobDetailsSchema,
});

export type JobProps = z.infer<typeof JobSchema>;

export const Job = ({
  id,
  createdAt,
  updatedAt,
  projectCycleId,
  status,
  label,
  description,
  details,
}: JobProps) => {
  const borderColor =
    status === "complete"
      ? "border-green-500"
      : status === "pending"
      ? "border-purple-500"
      : "border-red-500";

  return (
    <div
      className={`max-w-sm mx-auto bg-white shadow-md rounded-lg p-4 mt-6 border-2 ${borderColor}`}
    >
      <div className="mb-4">
        {/* status */}
        <span
          className={`text-xs font-semibold inline-block py-1 px-2 rounded ${
            status === "complete"
              ? "bg-green-100 text-green-800"
              : status === "pending"
              ? "bg-purple-100 text-purple-800"
              : status === "error"
              ? "bg-red-100 text-red-800"
              : "bg-red-100 text-red-800"
          } `}
        >
          Status: {status}
        </span>
      </div>

      {/* job id */}

      <div className="text-lg font-semibold text-gray-800 mb-2">
        Job ID: {id}
      </div>

      {/* project cycle id */}
      {projectCycleId && (
        <div className="text-md font-semibold text-gray-800 mb-2">
          Project Cycle ID: {projectCycleId}
        </div>
      )}

      {/* label */}
      <div className="text-md font-medium text-gray-600 mb-2">{label}</div>

      {/* created at and updated at */}
      <div className="text-sm text-gray-500 mb-2">
        <div>Created At: {new Date(createdAt).toLocaleDateString()}</div>
        {updatedAt && (
          <div>Updated At: {new Date(updatedAt).toLocaleDateString()}</div>
        )}
      </div>

      {/* description */}
      {description && (
        <div className="text-gray-700 text-sm mb-2">
          <p>{description}</p>
        </div>
      )}

      {/* details */}

      <div className="text-gray-700 text-sm">
        <p>{details}</p>
      </div>
    </div>
  );
};
