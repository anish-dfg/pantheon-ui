import { z } from "zod";
import { VolunteerDetails } from "~/intf/entities";

export const emailPolicySchema = z.object({
  useFirstAndLastName: z.boolean(),
  addUniqueNumericSuffix: z.boolean(),
  separator: z.string().optional(),
});

export type EmailPolicy = z.infer<typeof emailPolicySchema>;

export const passwordPolicySchema = z.object({
  generatedPasswordLength: z.number(),
  changePasswordAtNextLogin: z.boolean(),
  skipUsersOnConflict: z.boolean(),
});

export type PasswordPolicy = z.infer<typeof passwordPolicySchema>;

export const exportUsersToWorkspaceOptionsSchema = z.intersection(
  emailPolicySchema,
  passwordPolicySchema,
);

export type ExportUsersToWorkspaceOptions = z.infer<
  typeof exportUsersToWorkspaceOptionsSchema
> & { volunteers: VolunteerDetails[] };
