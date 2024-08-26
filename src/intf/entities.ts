import { z } from "zod";

export const nonprofitClientSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  project_cycle_id: z.string().uuid(),
  representative_first_name: z.string(),
  representative_last_name: z.string(),
  representative_job_title: z.string(),
  email: z.string(),
  email_cc: z.string().nullable(),
  phone: z.string(),
  org_name: z.string(),
  project_name: z.string(),
  org_website: z.string().nullable(),
  country_hq: z.string().nullable(),
  state_hq: z.string().nullable(),
  address: z.string(),
  size: z.string(),
});

export type NonprofitClient = z.infer<typeof nonprofitClientSchema>;

export const volunteerSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  project_cycle_id: z.string().uuid(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  offer_letter_signature: z.boolean(),
  volunteer_gender: z.string(),
  volunteer_ethnicity: z.string(),
  volunteer_age_range: z.string(),
});

export type Volunteer = z.infer<typeof volunteerSchema>;

export const JobDetailsSchema = z.object({
  jobType: z.enum(["airtable_import_base", "airtable_export_users"]),
  error: z.string().optional(),
  exportDestination: z.string().optional(),
  baseID: z.string().optional(),
});

export type JobDetails = z.infer<typeof JobDetailsSchema>;

export const jobSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  projectCycleID: z.string().uuid().nullable(),
  status: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  details: JobDetailsSchema,
});

export type Job = z.infer<typeof jobSchema>;

export const cycleSchema = z.object({
  id: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  archived: z.boolean(),
});

export type Cycle = z.infer<typeof cycleSchema>;

export const baseSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissionLevel: z.string(),
});

export type Base = z.infer<typeof baseSchema>;
