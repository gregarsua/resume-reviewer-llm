import { z } from "zod";

export const reviewInputSchema = z.object({
  resumeText: z
    .string()
    .trim()
    .min(1, "No readable text was found in the resume.")
    .max(50_000, "The extracted resume text is too long to review."),
  jobDescription: z
    .string()
    .trim()
    .min(20, "Enter a job description with at least 20 characters.")
    .max(20_000, "The job description must be 20,000 characters or fewer."),
});
