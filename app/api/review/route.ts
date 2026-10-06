import { AIServiceError } from "@/lib/ai/client";
import { reviewResume } from "@/lib/ai/reviewer";
import {
  extractResumeText,
  MAX_RESUME_FILE_SIZE_BYTES,
  ResumeFileError,
} from "@/lib/utils/file";
import { reviewInputSchema } from "@/lib/utils/validation";
import { ZodError } from "zod";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_RESUME_FILE_SIZE_BYTES + 100_000) {
    return Response.json(
      { error: "The upload is too large. Use a resume file smaller than 10 MB." },
      { status: 413 },
    );
  }
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return Response.json(
      { error: "Submit the resume and job description as a form." },
      { status: 415 },
    );
  }

  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return Response.json(
        { error: "The submitted form could not be read. Please try again." },
        { status: 400 },
      );
    }
    const resume = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    if (!(resume instanceof File)) {
      return Response.json(
        { error: "Choose a PDF or .docx resume to continue." },
        { status: 400 },
      );
    }
    if (typeof jobDescription !== "string") {
      return Response.json(
        { error: "Enter the job description to continue." },
        { status: 400 },
      );
    }

    const resumeText = await extractResumeText(resume);
    const input = reviewInputSchema.safeParse({ resumeText, jobDescription });
    if (!input.success) {
      return Response.json(
        { error: input.error.issues[0]?.message ?? "Check the submitted details." },
        { status: 400 },
      );
    }

    const review = await reviewResume(
      input.data.resumeText,
      input.data.jobDescription,
    );
    return Response.json({ review });
  } catch (error) {
    if (error instanceof ResumeFileError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof AIServiceError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof ZodError) {
      return Response.json(
        { error: error.issues[0]?.message ?? "Check the submitted details." },
        { status: 400 },
      );
    }

    console.error("Resume review request failed.", error);
    return Response.json(
      { error: "The review could not be completed. Please try again." },
      { status: 500 },
    );
  }
}
