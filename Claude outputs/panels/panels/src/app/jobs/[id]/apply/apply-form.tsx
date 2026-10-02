'use client';

import { useActionState, useState } from 'react';
import { submitApplication, type ApplyFormState } from '@/app/jobs/actions';
import { SendIcon } from '@/app/_components/ui';

const initialState: ApplyFormState = {};

const inputClass =
  'w-full rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50';

function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-black dark:text-zinc-50">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const EMPTY = {
  name: '',
  email: '',
  headline: '',
  location: '',
  experience: '',
  currentCompany: '',
  resumeUrl: '',
  coverNote: '',
};

export function ApplyForm({ jobId }: { jobId: string }) {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);
  const errors = state.fieldErrors ?? {};

  /*
   * Controlled inputs, deliberately.
   *
   * React 19 resets a <form action={...}> once the action resolves. With
   * uncontrolled inputs, any validation error would hand the candidate back an
   * empty form and make them retype a cover note they just wrote. Holding the
   * values in state keeps them through a failed submit.
   */
  const [values, setValues] = useState(EMPTY);

  function set<K extends keyof typeof EMPTY>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form action={formAction} className="flex flex-1 flex-col">
      <input type="hidden" name="jobId" value={jobId} />

      <div className="flex flex-1 flex-col gap-4 px-5 py-5">
        <Field label="Full name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            type="text"
            autoComplete="name"
            className={inputClass}
          />
        </Field>

        <Field
          label="Email"
          htmlFor="email"
          required
          error={errors.email}
          hint="We’ll use this to get back to you about your application."
        >
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </Field>

        <Field label="Current title" htmlFor="headline" error={errors.headline}>
          <input
            id="headline"
            name="headline"
            value={values.headline}
            onChange={(e) => set('headline', e.target.value)}
            type="text"
            placeholder="e.g. UI/UX Designer"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Location" htmlFor="location" error={errors.location}>
            <input
              id="location"
              name="location"
              value={values.location}
              onChange={(e) => set('location', e.target.value)}
              type="text"
              placeholder="e.g. Gurgaon"
              className={inputClass}
            />
          </Field>
          <Field label="Experience" htmlFor="experience" error={errors.experience}>
            <input
              id="experience"
              name="experience"
              value={values.experience}
              onChange={(e) => set('experience', e.target.value)}
              type="text"
              placeholder="e.g. 5 yrs"
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Current company" htmlFor="currentCompany" error={errors.currentCompany}>
          <input
            id="currentCompany"
            name="currentCompany"
            value={values.currentCompany}
            onChange={(e) => set('currentCompany', e.target.value)}
            type="text"
            className={inputClass}
          />
        </Field>

        <Field
          label="Resume link"
          htmlFor="resumeUrl"
          error={errors.resumeUrl}
          hint="A link to your CV — Drive, Dropbox or a personal site."
        >
          <input
            id="resumeUrl"
            name="resumeUrl"
            value={values.resumeUrl}
            onChange={(e) => set('resumeUrl', e.target.value)}
            type="url"
            placeholder="https://"
            className={inputClass}
          />
        </Field>

        <Field
          label="Why you’re a fit"
          htmlFor="coverNote"
          error={errors.coverNote}
          hint="Optional, but it helps."
        >
          <textarea
            id="coverNote"
            name="coverNote"
            rows={5}
            value={values.coverNote}
            onChange={(e) => set('coverNote', e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </Field>

        {state.error && (
          <p
            role="alert"
            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
          >
            {state.error}
          </p>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-black/[.06] bg-white/95 px-5 py-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
        >
          <SendIcon className="h-4 w-4" />
          {pending ? 'Sending…' : 'Submit application'}
        </button>
      </div>
    </form>
  );
}
