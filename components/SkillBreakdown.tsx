type SkillMatch = {
  name: string;
  score: number;
  note: string;
  evidence: string;
  recommendation: string;
};

type SkillBreakdownProps = {
  skills: SkillMatch[];
};

export default function SkillBreakdown({ skills }: SkillBreakdownProps) {
  return (
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
        {skills.map((skill) => (
          <div
            aria-label={`${skill.name}: ${skill.score}% match`}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 sm:grid-cols-[minmax(8rem,0.8fr)_2fr_auto] sm:items-center"
            key={skill.name}
            role="group"
          >
            <div className="col-span-2 flex min-w-0 items-baseline justify-between gap-3 sm:col-span-1 sm:block">
              <p className="min-w-28 wrap-break-word text-sm font-semibold text-[#25362c]">
                {skill.name}
              </p>
              <span className="text-xs text-[#718077] sm:hidden">
                {skill.note}
              </span>
            </div>
            <div
              aria-label={`${skill.score}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={skill.score}
              className="h-2.5 overflow-hidden rounded-full bg-[#e8eee9]"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-[#52745c] transition-[width]"
                style={{ width: `${skill.score}%` }}
              />
            </div>
            <div className="hidden min-w-28 items-center justify-end gap-3 sm:flex">
              <span className="w-9 text-right text-sm font-semibold tabular-nums text-[#203c2d]">
                {skill.score}%
              </span>
            </div>
            <span className="text-right text-sm font-semibold tabular-nums text-[#203c2d] sm:hidden">
              {skill.score}%
            </span>
            <p className="col-span-2 wrap-break-word text-xs leading-5 text-[#718077] sm:col-span-3 sm:col-start-2">
              <span className="font-semibold text-[#5f6d64]">Evidence:</span>{" "}
              {skill.evidence}
            </p>
            <p className="col-span-2 wrap-break-word text-xs leading-5 text-[#718077] sm:col-span-3 sm:col-start-2">
              <span className="font-semibold text-[#5f6d64]">Recommendation:</span>{" "}
              {skill.recommendation}
            </p>
            <p className="col-span-2 wrap-break-word text-xs leading-5 text-[#718077] sm:col-span-3 sm:col-start-2">
              <span className="font-semibold text-[#5f6d64]">Note:</span>{" "}
              {skill.note}
            </p>
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
  );
}
