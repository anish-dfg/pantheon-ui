import { z } from "zod";

export const JobDetailsSchema = z.object({
  jobType: z.enum(["airtable_import_base", "airtable_export_users"]),
  error: z.string().optional(),
  exportDestination: z.string().optional(),
  baseId: z.string().optional(),
});

export type JobDetails = z.infer<typeof JobDetailsSchema>;

export const jobSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  projectCycleId: z.string().uuid().nullable(),
  status: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  details: JobDetailsSchema,
});

export type Job = z.infer<typeof jobSchema>;

export const cycleSchema = z.object({
  id: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
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

export const nonprofitClientSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  projectCycleId: z.string().uuid(),
  representativeFirstName: z.string(),
  representativeLastName: z.string(),
  representativeJobTitle: z.string(),
  email: z.string(),
  emailCc: z.string().nullable(),
  phone: z.string(),
  orgName: z.string(),
  projectName: z.string(),
  orgWebsite: z.string().nullable(),
  countryHq: z.string().nullable(),
  stateHq: z.string().nullable(),
  address: z.string(),
  size: z.string(),
});

export type NonprofitClient = z.infer<typeof nonprofitClientSchema>;

export const volunteerSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  projectCycleId: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  offerLetterSignature: z.boolean(),
  volunteerGender: z.string(),
  volunteerEthnicity: z.string(),
  volunteerAgeRange: z.string(),
});

export type Volunteer = z.infer<typeof volunteerSchema>;

export const volunteerAdditionalInformationSchema = z.object({
  projectCycleName: z.string(),
  workspaceEmail: z.string().nullable(),
  clients: z.array(
    z.object({
      clientId: z.string().uuid(),
      orgName: z.string(),
      projectName: z.string(),
      currentlyActive: z.boolean(),
    }),
  ),
  mentors: z.array(
    z.object({
      mentorId: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string().nullable(),
      company: z.string(),
      jobTitle: z.string(),
    }),
  ),
  roles: z.array(
    z.object({
      roleId: z.string().uuid(),
      name: z.string(),
      description: z.string(),
    }),
  ),
});

export const volunteerDetailsSchema = z.intersection(
  volunteerSchema,
  volunteerAdditionalInformationSchema,
);

export type VolunteerDetails = z.infer<typeof volunteerDetailsSchema>;

export const mentorSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
  projectCycleId: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  offerLetterSignature: z.boolean(),
  company: z.string(),
  jobTitle: z.string(),
});

export type Mentor = z.infer<typeof mentorSchema>;

export const nonprofitAdditionalInformationSchema = z.object({
  projectCycleName: z.string(),
  volunteers: z.array(
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string().nullable(),
      offerLetterSignature: z.boolean(),
      volunteerGender: z.string(),
      volunteerEthnicity: z.string(),
      volunteerAgeRange: z.string(),
    }),
  ),
  mentors: z.array(
    z.object({
      id: z.string().uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string().nullable(),
      company: z.string(),
      jobTitle: z.string(),
    }),
  ),
});

export const nonprofitClientDetailsSchema = z.intersection(
  nonprofitClientSchema,
  nonprofitAdditionalInformationSchema,
);

export type NonprofitClientDetails = z.infer<
  typeof nonprofitClientDetailsSchema
>;

export const mentorAdditionalInformationSchema = z.object({
  projectCycleName: z.string(),
  volunteers: z.array(
    z.object({
      volunteerId: z.string().uuid(),
      email: z.string(),
      name: z.string(),
    }),
  ),
  clients: z.array(
    z.object({
      clientId: z.string().uuid(),
      orgName: z.string(),
      projectName: z.string(),
    }),
  ),
});

export const mentorDetailsSchema = z.intersection(
  mentorSchema,
  mentorAdditionalInformationSchema,
);

export type MentorDetails = z.infer<typeof mentorDetailsSchema>;
