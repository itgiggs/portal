import 'server-only';

import { ApiError, apiFetch } from './api';
import type { Applicant, Job, JobDraft, JobStatus } from './jobs';

/* =====================================================================
   Server-side data access for jobs.

   Kept apart from jobs.ts because that module is imported by client
   components (the wizard needs WORK_MODES and the types). Anything that
   reaches for cookies or the API base URL has to stay out of the browser
   bundle, and the `server-only` import above turns a mistake here into a
   build error rather than a leaked token.
   ===================================================================== */

/**
 * The API omits `applicants` on list responses and `applicantCount` when a
 * relation was not counted. Filling the gaps here means no screen has to
 * write `job.applicants ?? []`.
 */
function normalise(raw: Partial<Job>): Job {
  const applicants = raw.applicants ?? [];

  return {
    ...(raw as Job),
    responsibilities: raw.responsibilities ?? [],
    skills: raw.skills ?? [],
    applicants,
    applicantCount: raw.applicantCount ?? applicants.length,
    newApplicantCount:
      raw.newApplicantCount ??
      applicants.filter((applicant) => applicant.stage === 'new').length,
  };
}

/* ---------------- Reads ---------------- */

/**
 * With a session token the API returns the caller's own postings in every
 * status; without one it returns live postings only.
 */
export async function listJobs(filters: {
  status?: JobStatus;
  search?: string;
} = {}): Promise<Job[]> {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.search) params.set('search', filters.search);

  const query = params.toString();
  const jobs = await apiFetch<Partial<Job>[]>(`/api/jobs${query ? `?${query}` : ''}`);
  return jobs.map(normalise);
}

/** Returns undefined for 404 so screens can call notFound() themselves. */
export async function getJob(id: string): Promise<Job | undefined> {
  try {
    return normalise(await apiFetch<Partial<Job>>(`/api/jobs/${id}`));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export async function listApplicants(jobId: string): Promise<Applicant[]> {
  return apiFetch<Applicant[]>(`/api/jobs/${jobId}/applications`);
}

/**
 * The PUBLIC job board.
 *
 * Deliberately sends no token. apiFetch attaches one whenever a session cookie
 * exists, and the API switches to "your own postings, any status" the moment it
 * sees one — so a signed-in employer browsing /jobs would get their own drafts
 * instead of the board every candidate sees.
 */
export async function listPublicJobs(search?: string): Promise<Job[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const jobs = await apiFetch<Partial<Job>[]>(`/api/jobs${query}`, { auth: false });
  return jobs.map(normalise);
}

/** Submits a candidate application. Public — no session required. */
export async function applyToJob(
  jobId: string,
  application: {
    name: string;
    email: string;
    headline?: string;
    location?: string;
    experience?: string;
    currentCompany?: string;
    resumeUrl?: string;
    coverNote?: string;
  }
): Promise<Applicant> {
  return apiFetch<Applicant>(`/api/jobs/${jobId}/applications`, {
    method: 'POST',
    body: application,
    auth: false,
  });
}

/** Employer-only: move a candidate along the funnel. */
export async function moveApplicant(
  jobId: string,
  applicantId: string,
  stage: Applicant['stage']
): Promise<Applicant> {
  return apiFetch<Applicant>(`/api/jobs/${jobId}/applications/${applicantId}`, {
    method: 'PATCH',
    body: { stage },
  });
}

/* ---------------- Writes ---------------- */

/** Creates a posting. `status` picks the wizard's publish/draft intent. */
export async function createJob(
  draft: JobDraft,
  status: Extract<JobStatus, 'draft' | 'live'>
): Promise<Job> {
  const job = await apiFetch<Partial<Job>>('/api/jobs', {
    method: 'POST',
    body: { ...draft, intent: status === 'live' ? 'publish' : 'draft' },
  });

  return normalise(job);
}

export async function setJobStatus(id: string, status: JobStatus): Promise<Job> {
  const job = await apiFetch<Partial<Job>>(`/api/jobs/${id}/status`, {
    method: 'POST',
    body: { status },
  });

  return normalise(job);
}
