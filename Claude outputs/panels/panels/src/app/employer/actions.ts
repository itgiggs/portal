'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { ApiError } from '@/lib/api';
import {
  EMPLOYMENT_TYPES,
  WORK_MODES,
  type EmploymentType,
  type JobDraft,
  type JobStatus,
  type WorkMode,
} from '@/lib/jobs';
import { createJob, moveApplicant, setJobStatus } from '@/lib/jobs-api';

export type PublishJobState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function list(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())
    .filter(Boolean);
}

function int(formData: FormData, key: string, fallback: number): number {
  const parsed = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function optionalNumber(formData: FormData, key: string): number | null {
  const raw = text(formData, key);
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Validates the wizard payload, then hands it to the API.
 *
 * The checks here are a fast first pass so obvious mistakes never cost a round
 * trip; the API runs the same rules and is the authority. A 422 from Laravel is
 * mapped straight onto fieldErrors — its error keys are the camelCase field
 * names the wizard already uses, so they line up without translation.
 */
export async function publishJob(
  _prevState: PublishJobState,
  formData: FormData
): Promise<PublishJobState> {
  const intent = text(formData, 'intent') === 'draft' ? 'draft' : 'publish';
  const fieldErrors: Record<string, string> = {};

  const title = text(formData, 'title');
  const company = text(formData, 'company');
  const location = text(formData, 'location');
  const workModeRaw = text(formData, 'workMode');
  const employmentTypeRaw = text(formData, 'employmentType');

  if (!title) fieldErrors.title = 'Job title is required.';
  if (!company) fieldErrors.company = 'Company name is required.';
  if (!location) fieldErrors.location = 'Location is required.';

  const workMode = WORK_MODES.includes(workModeRaw as WorkMode)
    ? (workModeRaw as WorkMode)
    : null;
  if (!workMode) fieldErrors.workMode = 'Pick a work mode.';

  const employmentType = EMPLOYMENT_TYPES.includes(employmentTypeRaw as EmploymentType)
    ? (employmentTypeRaw as EmploymentType)
    : null;
  if (!employmentType) fieldErrors.employmentType = 'Pick an employment type.';

  const openings = int(formData, 'openings', 1);
  if (openings < 1) fieldErrors.openings = 'There must be at least one opening.';

  const experienceMin = int(formData, 'experienceMin', 0);
  const experienceMax = int(formData, 'experienceMax', 0);
  if (experienceMin < 0) fieldErrors.experienceMin = 'Experience cannot be negative.';
  if (experienceMax < experienceMin) {
    fieldErrors.experienceMax = 'Maximum must be at least the minimum.';
  }

  const hideSalary = text(formData, 'hideSalary') === 'on';
  const salaryMin = optionalNumber(formData, 'salaryMin');
  const salaryMax = optionalNumber(formData, 'salaryMax');
  if (!hideSalary && salaryMin != null && salaryMax != null && salaryMax < salaryMin) {
    fieldErrors.salaryMax = 'Maximum must be at least the minimum.';
  }

  const description = text(formData, 'description');
  const skills = list(formData, 'skills');

  if (intent === 'publish') {
    if (description.length < 40) {
      fieldErrors.description = 'Add at least a couple of sentences describing the role.';
    }
    if (skills.length === 0) fieldErrors.skills = 'Add at least one skill.';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error:
        intent === 'publish'
          ? 'This posting is not ready to publish yet.'
          : 'Fix the highlighted fields before saving.',
      fieldErrors,
    };
  }

  const draft: JobDraft = {
    title,
    company,
    department: text(formData, 'department'),
    location,
    workMode: workMode as WorkMode,
    employmentType: employmentType as EmploymentType,
    openings,
    experienceMin,
    experienceMax,
    salaryMin: hideSalary ? null : salaryMin,
    salaryMax: hideSalary ? null : salaryMax,
    hideSalary,
    description,
    responsibilities: list(formData, 'responsibilities'),
    skills,
    education: text(formData, 'education'),
    applyBy: text(formData, 'applyBy'),
  };

  let jobId: string;

  try {
    const job = await createJob(draft, intent === 'publish' ? 'live' : 'draft');
    jobId = job.id;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return { error: 'Your session has expired. Please sign in again.' };
      }
      if (error.status === 422) {
        return {
          error: 'This posting is not ready to publish yet.',
          fieldErrors: error.fieldErrors(),
        };
      }
      return { error: error.message };
    }
    throw error;
  }

  revalidatePath('/employer');
  // redirect() throws, so it stays outside the try/catch above.
  redirect(
    intent === 'publish' ? `/employer/jobs/${jobId}/published` : '/employer'
  );
}

/** Close, reopen or publish an existing job from the list or detail screen. */
export async function changeJobStatus(formData: FormData): Promise<void> {
  const id = text(formData, 'id');
  const statusRaw = text(formData, 'status');
  const allowed: JobStatus[] = ['draft', 'live', 'closed'];

  if (!id || !allowed.includes(statusRaw as JobStatus)) return;

  await setJobStatus(id, statusRaw as JobStatus);

  revalidatePath('/employer');
  // The public board and the posting itself both change when a job opens or
  // closes, so they are invalidated too.
  revalidatePath('/jobs');
  revalidatePath(`/jobs/${id}`);
}

/** Move a candidate along the funnel from the panel's inline applicant list. */
export async function moveApplicantStage(formData: FormData): Promise<void> {
  const jobId = text(formData, 'jobId');
  const applicantId = text(formData, 'applicantId');
  const stage = text(formData, 'stage');

  const allowed = ['new', 'screening', 'interview', 'offer', 'rejected'] as const;
  type Stage = (typeof allowed)[number];

  if (!jobId || !applicantId || !allowed.includes(stage as Stage)) return;

  await moveApplicant(jobId, applicantId, stage as Stage);

  revalidatePath('/employer');
}
