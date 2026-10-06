"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import SkillBreakdown from "@/components/SkillBreakdown";
import { reviewSchema } from "@/lib/ai/schema";
import type { ResumeReview } from "@/types/review";

function subscribeToReview(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredReview() {
  return sessionStorage.getItem("resume-review");
}

export default function Results() {
  const storedReview = useSyncExternalStore(
    subscribeToReview,
    getStoredReview,
    () => undefined,
  );

  let review: ResumeReview | null = null;
  let error = "";
  if (storedReview === null) {
    error = "No review is available yet. Submit a resume to get started.";
  } else if (storedReview !== undefined) {
    try {
      const parsed = reviewSchema.safeParse(JSON.parse(storedReview));
      if (!parsed.success) {
        error = "The saved review is invalid. Please submit your resume again.";
      } else {
        review = parsed.data;
      }
    } catch {
      error =
        "The saved review could not be read. Please submit your resume again.";
    }
  }

  if (storedReview === undefined) {
    return (
      <main className="upload-page grid min-h-screen place-items-center px-5 font-sans text-sm text-[#5f6d64]">
        Loading your review...
      </main>
    );
  }

  if (!review) {
    return (
      <main className="upload-page grid min-h-screen place-items-center px-5 font-sans">
        <section className="max-w-md rounded-2xl border border-[#dce6dd] bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-[#17251e]">
            Review unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#5f6d64]" role="alert">
            {error}
          </p>
          <Link
            className="mt-6 inline-flex rounded-lg bg-[#203c2d] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#315741]"
            href="/"
          >
            Back to upload
          </Link>
        </section>
      </main>
    );
  }

  return (
    <div className="upload-page min-h-screen px-5 py-8 font-sans text-[#25362c] sm:px-8 sm:py-12">
      <main className="mx-auto w-full max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#203c2d] transition-colors hover:text-[#52745c]"
            href="/"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="m12.5 4.5-5.5 5.5 5.5 5.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
            Back to upload
          </Link>
          <span className="rounded-full border border-[#dce6dd] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#5f6d64]">
            Resume review
          </span>
        </header>

        <section className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Your results
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#17251e] sm:text-4xl">
                Skills match
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5f6d64] sm:text-base">
                See how your resume lines up with the skills called for in the
                job description.
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#e5eee6] px-3 py-1.5 text-xs font-semibold text-[#315741]">
              AI-generated review
            </span>
          </div>
        </section>

        <section
          aria-label="Overall skills match"
          className="mb-6 grid gap-6 rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:grid-cols-[1fr_2fr] sm:items-center sm:p-8"
        >
          <div className="flex items-center gap-5">
            <div
              aria-label={`${review.overallScore}% overall match`}
              className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
              role="img"
              style={{
                background: `conic-gradient(#315741 ${review.overallScore}%, #e5eee6 ${review.overallScore}% 100%)`,
              }}
            >
              <div className="grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full bg-white">
                <span className="text-xl font-semibold tracking-tight text-[#203c2d]">
                  {review.overallScore}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#25362c]">
                Overall match
              </p>
              <p className="mt-1 text-sm leading-5 text-[#718077]">
                Across {review.skills.length} job-relevant skills
              </p>
            </div>
          </div>

          <div className="border-t border-[#e8eee9] pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
            <p className="text-sm font-semibold text-[#25362c]">
              Overall assessment
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5f6d64]">
              {review.overallNote}
            </p>
          </div>
        </section>

        <section className="mb-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#dce6dd] bg-white p-6">
            <h2 className="text-base font-semibold text-[#17251e]">Strengths</h2>
            {review.strengths.length > 0 ? (
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#5f6d64]">
                {review.strengths.map((strength, index) => (
                  <li key={`${index}-${strength}`}>{strength}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#718077]">
                No specific strengths were identified.
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-[#dce6dd] bg-white p-6">
            <h2 className="text-base font-semibold text-[#17251e]">
              Areas to improve
            </h2>
            {review.improvementAreas.length > 0 ? (
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-[#5f6d64]">
                {review.improvementAreas.map((area, index) => (
                  <li key={`${index}-${area}`}>{area}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#718077]">
                No improvement areas were identified.
              </p>
            )}
          </div>
        </section>

        <SkillBreakdown skills={review.skills} />
      </main>
    </div>
  );
}
