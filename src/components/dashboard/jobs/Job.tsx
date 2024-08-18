import { z } from "zod";

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
  return <div></div>;
};
