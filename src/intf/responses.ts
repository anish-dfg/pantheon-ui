import { z } from "zod";

export const importBaseResponse = z.object({
  jobId: z.string().uuid(),
});

export type ImportBaseResponse = z.infer<typeof importBaseResponse>;

export type BasicStatsResponse = {
  numVolunteers: number;
  numNonprofits: number;
  numMentors: number;
};
