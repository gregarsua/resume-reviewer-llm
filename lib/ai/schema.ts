import { z } from "zod";

export const reviewSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  overallNote: z.string().min(1),
  strengths: z.array(z.string()),
  improvementAreas: z.array(z.string()),
  skills: z
    .array(
      z.object({
        name: z.string().min(1),
        score: z.number().int().min(0).max(100),
        note: z.string().min(1),
        evidence: z.string().min(1),
        recommendation: z.string().min(1),
      }),
    )
    .min(1),
});
