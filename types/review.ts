import type { z } from "zod";
import type { reviewSchema } from "@/lib/ai/schema";

export type ResumeReview = z.infer<typeof reviewSchema>;
export type SkillReview = ResumeReview["skills"][number];
