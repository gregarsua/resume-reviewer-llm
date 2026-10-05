import z from "zod";

const reviewSchema = {
    overAllScore: z.number().min(0).max(100),
    overallNote: z.string(),
    strengths: z.array(z.string()),
    improvementAreas: z.array(z.string()),
    skills: z.array(z.object({
        name: z.string(),
        score: z.number().min(0).max(100),
        note: z.string(),
        evidence: z.string(),
        recommendation: z.string()
    }))
}