type SkillMatch = {
  name: string;
  score: number;
  note: string;
  evidence: string;
  recommendation: string;
};

export type SkillBreakdownProps = {
  skills: SkillMatch[];
};