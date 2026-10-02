/* =====================================================================
   Job domain types + the API client the screens call.

   These types mirror JobPostingResource / JobApplicationResource on the
   Laravel side. The two are one contract — change them together.

   This module is imported by client components (the wizard needs WORK_MODES
   and the types), so it must stay free of server-only imports. The functions
   that actually call the API live in jobs-api.ts.
   ===================================================================== */

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Internship'
  | 'Temporary';

export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';

export type JobStatus = 'draft' | 'live' | 'closed';

export type ApplicantStage =
  | 'new'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected';

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Temporary',
];

export const WORK_MODES: WorkMode[] = ['On-site', 'Hybrid', 'Remote'];

export interface Applicant {
  id: string;
  name: string;
  headline: string;
  location: string;
  experience: string;
  currentCompany: string;
  matchScore: number;
  stage: ApplicantStage;
  appliedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  openings: number;
  experienceMin: number;
  experienceMax: number;
  salaryMin: number | null;
  salaryMax: number | null;
  hideSalary: boolean;
  description: string;
  responsibilities: string[];
  skills: string[];
  education: string;
  applyBy: string;
  status: JobStatus;
  createdAt: string;
  publishedAt: string | null;
  views: number;

  /**
   * Only the detail endpoint loads the full list; the index returns counts
   * alone so it stays cheap. `applicants` is [] on list responses — use
   * applicantCount there, not applicants.length.
   */
  applicants: Applicant[];
  applicantCount: number;
  newApplicantCount: number;
}

/** Everything the publish form collects. */
export type JobDraft = Omit<
  Job,
  | 'id'
  | 'status'
  | 'createdAt'
  | 'publishedAt'
  | 'views'
  | 'applicants'
  | 'applicantCount'
  | 'newApplicantCount'
>;

/* ---------------- Formatting helpers ---------------- */

export function formatSalary(job: Job): string {
  if (job.hideSalary) return 'Not disclosed';
  if (job.salaryMin == null && job.salaryMax == null) return 'Not disclosed';
  if (job.salaryMin != null && job.salaryMax != null) {
    return `₹${job.salaryMin}–${job.salaryMax} LPA`;
  }
  return `₹${job.salaryMin ?? job.salaryMax} LPA`;
}

export function formatExperience(job: Job): string {
  if (job.experienceMin === job.experienceMax) {
    return job.experienceMin === 0 ? 'Fresher' : `${job.experienceMin} yrs`;
  }
  return `${job.experienceMin}–${job.experienceMax} yrs`;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * True when the posting's apply-by date has passed.
 *
 * Lives here rather than inline in a page so the clock is read in one place —
 * and so React's purity rule isn't tripped by a Date.now() in render.
 */
export function isPastDeadline(job: Job, now: number = Date.now()): boolean {
  if (!job.applyBy) return false;
  const deadline = new Date(job.applyBy).getTime();
  return Number.isFinite(deadline) && deadline < now;
}

export const STAGE_LABELS: Record<ApplicantStage, string> = {
  new: 'New',
  screening: 'Screening',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};
