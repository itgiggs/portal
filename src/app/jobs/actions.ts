'use server';

import { redirect } from 'next/navigation';
import { ApiError } from '@/lib/api';
import { applyToJob } from '@/lib/jobs-api';

export type ApplyFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Submits a candidate application.
 *
 * Public — no session involved. The API de-duplicates by (job, email) and
 * refuses applications to postings that are not live or past their deadline;
 * those come back as 422 and are shown on the form rather than swallowed.
 */
export async function submitApplication(
  _prevState: ApplyFormState,
  formData: FormData
): Promise<ApplyFormState> {
  const jobId = text(formData, 'jobId');
  if (!jobId) return { error: 'Something went wrong. Please reload and try again.' };

  const name = text(formData, 'name');
  const email = text(formData, 'email');
  const resumeUrl = text(formData, 'resumeUrl');

  const fieldErrors: Record<string, string> = {};

  if (!name) fieldErrors.name = 'Your name is required.';
  if (!email) {
    fieldErrors.email = 'Your email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'Enter a valid email address.';
  }
  if (resumeUrl && !/^https?:\/\//i.test(resumeUrl)) {
    fieldErrors.resumeUrl = 'Enter a full link starting with http:// or https://';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: 'Check the highlighted fields.', fieldErrors };
  }

  try {
    await applyToJob(jobId, {
      name,
      email,
      headline: text(formData, 'headline') || undefined,
      location: text(formData, 'location') || undefined,
      experience: text(formData, 'experience') || undefined,
      currentCompany: text(formData, 'currentCompany') || undefined,
      resumeUrl: resumeUrl || undefined,
      coverNote: text(formData, 'coverNote') || undefined,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 422) {
        const fields = error.fieldErrors();
        return {
          // A 422 with no field bag is one of the API's abort() messages —
          // already applied, posting closed, deadline passed. Those are the
          // most useful thing to show, so surface the message itself.
          error: Object.keys(fields).length ? 'Check the highlighted fields.' : error.message,
          fieldErrors: fields,
        };
      }
      return { error: error.message };
    }
    throw error;
  }

  // redirect() throws, so it stays outside the try/catch above.
  redirect(`/jobs/${jobId}/applied`);
}
