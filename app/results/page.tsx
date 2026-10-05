const skillMatches = [
  { name: "React", match: 94, note: "Strong match" },
  { name: "TypeScript", match: 88, note: "Strong match" },
  { name: "Next.js", match: 82, note: "Good match" },
  { name: "API integration", match: 76, note: "Good match" },
  { name: "Testing", match: 68, note: "Room to grow" },
  { name: "Accessibility", match: 60, note: "Room to grow" },
];

const overallMatch = Math.round(
  skillMatches.reduce((total, skill) => total + skill.match, 0) /
    skillMatches.length,
);

export default function Results() {
  return (
    <div className="upload-page min-h-screen px-5 py-8 font-sans text-[#25362c] sm:px-8 sm:py-12">
      <main className="mx-auto w-full max-w-5xl">
        <header className="mb-10 flex items-center justify-between">
          <a
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
          </a>
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
              Sample review
            </span>
          </div>
        </section>

        <section
          aria-label="Overall skills match"
          className="mb-6 grid gap-6 rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:grid-cols-[1fr_2fr] sm:items-center sm:p-8"
        >
          <div className="flex items-center gap-5">
            <div
              aria-label={`${overallMatch}% overall match`}
              className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
              role="img"
              style={{
                background: `conic-gradient(#315741 ${overallMatch}%, #e5eee6 ${overallMatch}% 100%)`,
              }}
            >
              <div className="grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full bg-white">
                <span className="text-xl font-semibold tracking-tight text-[#203c2d]">
                  {overallMatch}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#25362c]">
                Overall match
              </p>
              <p className="mt-1 text-sm leading-5 text-[#718077]">
                Across {skillMatches.length} key skills
              </p>
            </div>
          </div>

          <div className="border-t border-[#e8eee9] pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
            <p className="text-sm font-semibold text-[#25362c]">
              A solid foundation
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5f6d64]">
              Your resume shows strong alignment in React, TypeScript, and
              Next.js. Highlighting more testing and accessibility experience
              could make your application even stronger.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="skill-breakdown-heading"
          className="rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:p-8"
        >
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                className="text-lg font-semibold tracking-tight text-[#17251e]"
                id="skill-breakdown-heading"
              >
                Skill-by-skill breakdown
              </h2>
              <p className="mt-1 text-sm leading-5 text-[#718077]">
                Percentage indicates how closely your resume matches each
                requirement.
              </p>
            </div>
            <span className="text-xs font-medium text-[#718077]">
              Match strength
            </span>
          </div>

          <div className="space-y-6">
            {skillMatches.map((skill) => (
              <div
                aria-label={`${skill.name}: ${skill.match}% match`}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 sm:grid-cols-[minmax(8rem,0.8fr)_2fr_auto] sm:items-center sm:gap-5"
                key={skill.name}
                role="group"
              >
                <div className="col-span-2 flex items-baseline justify-between gap-3 sm:col-span-1 sm:block">
                  <p className="text-sm font-semibold text-[#25362c]">
                    {skill.name}
                  </p>
                  <span className="text-xs text-[#718077] sm:hidden">
                    {skill.note}
                  </span>
                </div>
                <div
                  aria-label={`${skill.match}%`}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={skill.match}
                  className="h-2.5 overflow-hidden rounded-full bg-[#e8eee9]"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-[#52745c] transition-[width]"
                    style={{ width: `${skill.match}%` }}
                  />
                </div>
                <div className="hidden min-w-28 items-center justify-end gap-3 sm:flex">
                  <span className="w-9 text-right text-sm font-semibold tabular-nums text-[#203c2d]">
                    {skill.match}%
                  </span>
                  <span className="w-24 text-xs text-[#718077]">
                    {skill.note}
                  </span>
                </div>
                <span className="text-right text-sm font-semibold tabular-nums text-[#203c2d] sm:hidden">
                  {skill.match}%
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#e8eee9] pt-5 text-xs text-[#718077]">
            <span>
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#315741]" />
              Strong match: 80%+
            </span>
            <span>
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#8fa895]" />
              Good match: 70–79%
            </span>
            <span>
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#dce6dd]" />
              Room to grow: under 70%
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
