"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { reviewSchema } from "@/lib/ai/schema";
import type { ResumeReview } from "@/types/review";

function getErrorMessage(payload: unknown) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof payload.error === "string"
  ) {
    return payload.error;
  }
  return "The review could not be completed. Please try again.";
}

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitDetails(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const payload: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(payload));
      }

      if (
        typeof payload !== "object" ||
        payload === null ||
        !("review" in payload)
      ) {
        throw new Error("The server returned an invalid review. Please try again.");
      }

      const parsedReview = reviewSchema.safeParse(payload.review);
      if (!parsedReview.success) {
        throw new Error("The server returned an invalid review. Please try again.");
      }

      sessionStorage.setItem(
        "resume-review",
        JSON.stringify(parsedReview.data satisfies ResumeReview),
      );
      router.push("/results");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The review could not be completed. Please try again.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="upload-page flex min-h-screen flex-1 items-center justify-center px-5 py-12 font-sans">
      <main className="w-full max-w-xl">
        <header className="mb-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Resume review
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[#17251e] sm:text-5xl">
            Upload your resume
          </h1>
          <p className="mt-3 max-w-md text-base leading-7 text-[#5f6d64]">
            Add your resume and a job description for a clear, evidence-based
            review with AI.
          </p>
        </header>

        <form
          className="rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:p-8"
          onSubmit={submitDetails}
        >
          <label
            className="mb-3 block text-sm font-semibold text-[#25362c]"
            htmlFor="resume"
          >
            Resume file
          </label>
          <input
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            aria-describedby="resume-help"
            className="block w-full cursor-pointer rounded-lg border border-[#d6e1d8] bg-[#f8faf8] text-sm text-[#435248] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#203c2d] file:px-5 file:py-2 file:font-semibold file:text-white hover:file:bg-[#315741] focus:outline-none focus:ring-2 focus:ring-[#73947b] focus:ring-offset-2"
            id="resume"
            name="resume"
            required
            type="file"
          />
          <span className="mt-1 block text-xs leading-6 text-[#718077]" id="resume-help">
            PDF or DOCX, up to 10 MB. Scanned image-only PDFs are not supported.
          </span>

          <label
            className="mb-3 mt-5 block text-sm font-semibold text-[#25362c]"
            htmlFor="jobDescription"
          >
            Job description
          </label>
          <textarea
            className="w-full rounded-lg border border-[#d6e1d8] px-3 py-2 text-sm text-[#435248] focus:outline-none focus:ring-2 focus:ring-[#73947b]"
            id="jobDescription"
            maxLength={20_000}
            minLength={20}
            name="jobDescription"
            required
            rows={9}
          />

          {error && (
            <p className="mt-4 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}

          <button
            className="mt-5 w-full cursor-pointer rounded-lg border border-[#203c2d] bg-[#203c2d] px-2 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#203c2d] disabled:cursor-wait disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Reviewing resume..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
