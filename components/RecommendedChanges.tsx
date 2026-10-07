import type { SkillReview } from "@/types/review";

type RecommendedChangesProps = {
  skills: SkillReview[];
};

export default function RecommendedChanges({
  skills,
}: RecommendedChangesProps) {
  const prioritizedSkills = [...skills].sort(
    (first, second) => first.score - second.score,
  );

  return (
    <section
      aria-labelledby="recommended-changes-heading"
      className="mb-6 rounded-2xl border border-[#dce6dd] bg-white p-6 shadow-[0_18px_55px_-35px_rgba(23,37,30,0.35)] sm:p-8"
    >
      <div className="mb-6">
        <h2
          className="text-lg font-semibold tracking-tight text-[#17251e]"
          id="recommended-changes-heading"
        >
          Recommended resume changes
        </h2>
        <p className="mt-1 text-sm leading-5 text-[#718077]">
          Start with the lowest-matching requirements. Only add details you can
          support with your actual experience.
        </p>
      </div>

      <ol className="space-y-4">
        {prioritizedSkills.map((skill, index) => (
          <li
            className="flex gap-4 rounded-xl border border-[#e8eee9] bg-[#fbfcfb] p-4"
            key={`${skill.name}-${index}`}
          >
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e5eee6] text-sm font-semibold text-[#315741]"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-[#25362c]">
                  {skill.name}
                </h3>
                <span className="text-xs font-medium tabular-nums text-[#718077]">
                  {skill.score}% match
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5f6d64]">
                {skill.recommendation}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
