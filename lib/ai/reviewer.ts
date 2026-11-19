import { AIServiceError } from "../utils/ai_service_error";
import { generateAIResponse, } from "./client";
import { createResumeReviewPrompt } from "./prompts";
import { reviewSchema } from "./schema";

export async function reviewResume(resumeText: string, jobDescription: string) {
  const response = await generateAIResponse(
    createResumeReviewPrompt(resumeText, jobDescription),
  );

  let result: unknown;
  try {
    result = JSON.parse(response);
  } catch {
    throw new AIServiceError(
      "The AI service returned an invalid review. Please try again.",
      502,
    );
  }

  const validation = reviewSchema.safeParse(result);
  if (!validation.success) {
    throw new AIServiceError(
      "The AI service returned a review in an unexpected format. Please try again.",
      502,
    );
  }

  return validation.data;
}
