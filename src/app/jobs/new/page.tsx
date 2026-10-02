'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import {
  EMPLOYMENT_TYPES,
  WORK_MODES,
  type EmploymentType,
  type WorkMode,
} from '@/lib/jobs';
import { publishJob, type PublishJobState } from '../actions';
import {
  BackArrowIcon,
  CheckCircleIcon,
  PlusIcon,
} from '../_components/ui';

/* ---------------- Form state ---------------- */

interface FormValues {
  title: string;
  company: string;
  department: string;
  location: string;
  workMode: WorkMode;
  employmentType: EmploymentType;
  openings: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  experienceMin: string;
  experienceMax: string;
  salaryMin: string;
  salaryMax: string;
  hideSalary: boolean;
  education: string;
  applyBy: string;
}

const INITIAL: FormValues = {
  title: '',
  company: 'Gweka Consulting Ltd.',
  department: '',
  location: '',
  workMode: 'On-site',
  employmentType: 'Full-time',
  openings: '1',
  description: '',
  responsibilities: [],
  skills: [],
  experienceMin: '0',
  experienceMax: '2',
  salaryMin: '',
  salaryMax: '',
  hideSalary: false,
  education: '',
  applyBy: '',
};

const STEPS = [
  { number: 1, label: 'Basics' },
  { number: 2, label: 'Details' },
  { number: 3, label: 'Review' },
] as const;

const initialState: PublishJobState = {};

/* ---------------- Field primitives ---------------- */

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
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-black dark:text-zinc-50"
      >
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

/** Segmented single-select, easier to hit than a <select> at phone width. */
function OptionRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? 'bg-foreground text-background'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/[.06] dark:text-zinc-300 dark:hover:bg-white/[.12]'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/** Chip list with an add-on-Enter input. Values submit as repeated fields. */
function ChipInput({
  name,
  items,
  onChange,
  placeholder,
  error,
}: {
  name: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
  error?: string;
}) {
  const [entry, setEntry] = useState('');

  function add() {
    const value = entry.trim();
    if (!value || items.includes(value)) {
      setEntry('');
      return;
    }
    onChange([...items, value]);
    setEntry('');
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={entry}
          placeholder={placeholder}
          onChange={(event) => setEntry(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Adding a chip must not submit the wizard.
              event.preventDefault();
              add();
            }
          }}
          className={inputClass}
        />
        <button
          type="button"
          onClick={add}
          aria-label={`Add ${name}`}
          className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-white/[.08] dark:text-zinc-200 dark:hover:bg-white/[.14]"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      {items.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 py-1 pl-3 pr-1.5 text-xs text-zinc-800 dark:bg-white/[.08] dark:text-zinc-200">
                {item}
                <button
                  type="button"
                  aria-label={`Remove ${item}`}
                  onClick={() => onChange(items.filter((v) => v !== item))}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-black/10 hover:text-black dark:hover:bg-white/20 dark:hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Each chip submits as its own field so the action reads them with getAll(). */}
      {items.map((item) => (
        <input key={item} type="hidden" name={name} value={item} />
      ))}

      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-3 py-2">
      <dt className="w-32 shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="min-w-0 flex-1 text-sm text-black dark:text-zinc-100">
        {value || <span className="text-zinc-400">Not set</span>}
      </dd>
    </div>
  );
}

/* ---------------- Screen ---------------- */

export default function NewJobPage() {
  const [state, formAction, pending] = useActionState(publishJob, initialState);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  // Server-side errors win, since they are the ones that blocked the publish.
  const errors = { ...stepErrors, ...(state.fieldErrors ?? {}) };

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};

    if (current === 1) {
      if (!values.title.trim()) next.title = 'Job title is required.';
      if (!values.company.trim()) next.company = 'Company name is required.';
      if (!values.location.trim()) next.location = 'Location is required.';
      if (Number(values.openings) < 1) {
        next.openings = 'There must be at least one opening.';
      }
    }

    if (current === 2) {
      if (values.description.trim().length < 40) {
        next.description = 'Add at least a couple of sentences (40+ characters).';
      }
      if (values.skills.length === 0) next.skills = 'Add at least one skill.';
      if (Number(values.experienceMax) < Number(values.experienceMin)) {
        next.experienceMax = 'Maximum must be at least the minimum.';
      }
      if (
        !values.hideSalary &&
        values.salaryMin &&
        values.salaryMax &&
        Number(values.salaryMax) < Number(values.salaryMin)
      ) {
        next.salaryMax = 'Maximum must be at least the minimum.';
      }
    }

    setStepErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  }

  function goBack() {
    setStepErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      {/* Header + step rail */}
      <header className="sticky top-0 z-10 border-b border-black/[.06] bg-white/95 px-5 pb-3 pt-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        <div className="flex items-center gap-3">
          {step === 1 ? (
            <Link
              href="/jobs"
              aria-label="Back to jobs"
              className="-ml-1 rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-black/[.05] dark:text-zinc-300 dark:hover:bg-white/[.08]"
            >
              <BackArrowIcon className="h-5 w-5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={goBack}
              aria-label="Previous step"
              className="-ml-1 rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-black/[.05] dark:text-zinc-300 dark:hover:bg-white/[.08]"
            >
              <BackArrowIcon className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
              Post a job
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Step {step} of 3 · {STEPS[step - 1].label}
            </p>
          </div>
        </div>

        <ol className="mt-3 flex items-center gap-2">
          {STEPS.map((s) => {
            const done = s.number < step;
            const active = s.number === step;
            return (
              <li key={s.number} className="flex flex-1 items-center gap-2">
                <div
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    done || active
                      ? 'bg-foreground'
                      : 'bg-zinc-200 dark:bg-white/[.14]'
                  }`}
                />
              </li>
            );
          })}
        </ol>
      </header>

      <form action={formAction} className="flex flex-1 flex-col">
        {/* Every step stays mounted so its inputs are part of the submission;
            only the current one is visible. */}
        <div className="flex-1 px-5 py-5">
          {/* ---------- Step 1: Basics ---------- */}
          <section
            aria-label="Basics"
            className={step === 1 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <Field label="Job title" htmlFor="title" required error={errors.title}>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="e.g. Senior UI/UX Designer"
                className={inputClass}
              />
            </Field>

            <Field label="Company" htmlFor="company" required error={errors.company}>
              <input
                id="company"
                name="company"
                type="text"
                value={values.company}
                onChange={(e) => set('company', e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field
              label="Department"
              htmlFor="department"
              hint="Optional — shown on the posting."
            >
              <input
                id="department"
                name="department"
                type="text"
                value={values.department}
                onChange={(e) => set('department', e.target.value)}
                placeholder="e.g. Design"
                className={inputClass}
              />
            </Field>

            <Field label="Location" htmlFor="location" required error={errors.location}>
              <input
                id="location"
                name="location"
                type="text"
                value={values.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="e.g. Gurgaon, India"
                className={inputClass}
              />
            </Field>

            <Field label="Work mode" error={errors.workMode}>
              <OptionRow
                options={WORK_MODES}
                value={values.workMode}
                onChange={(v) => set('workMode', v)}
              />
              <input type="hidden" name="workMode" value={values.workMode} />
            </Field>

            <Field label="Employment type" error={errors.employmentType}>
              <OptionRow
                options={EMPLOYMENT_TYPES}
                value={values.employmentType}
                onChange={(v) => set('employmentType', v)}
              />
              <input
                type="hidden"
                name="employmentType"
                value={values.employmentType}
              />
            </Field>

            <Field label="Openings" htmlFor="openings" error={errors.openings}>
              <input
                id="openings"
                name="openings"
                type="number"
                min={1}
                value={values.openings}
                onChange={(e) => set('openings', e.target.value)}
                className={inputClass}
              />
            </Field>
          </section>

          {/* ---------- Step 2: Details ---------- */}
          <section
            aria-label="Details"
            className={step === 2 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <Field
              label="About the role"
              htmlFor="description"
              required
              error={errors.description}
              hint={`${values.description.trim().length} characters`}
            >
              <textarea
                id="description"
                name="description"
                rows={6}
                value={values.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="What the person will own, who they work with, and what success looks like."
                className={`${inputClass} resize-y`}
              />
            </Field>

            <Field
              label="Responsibilities"
              hint="Add them one at a time — press Enter after each."
            >
              <ChipInput
                name="responsibilities"
                items={values.responsibilities}
                onChange={(v) => set('responsibilities', v)}
                placeholder="e.g. Own end-to-end product flows"
              />
            </Field>

            <Field label="Skills" required error={errors.skills}>
              <ChipInput
                name="skills"
                items={values.skills}
                onChange={(v) => set('skills', v)}
                placeholder="e.g. Figma"
                error={errors.skills}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Min experience"
                htmlFor="experienceMin"
                error={errors.experienceMin}
              >
                <input
                  id="experienceMin"
                  name="experienceMin"
                  type="number"
                  min={0}
                  value={values.experienceMin}
                  onChange={(e) => set('experienceMin', e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field
                label="Max experience"
                htmlFor="experienceMax"
                error={errors.experienceMax}
              >
                <input
                  id="experienceMax"
                  name="experienceMax"
                  type="number"
                  min={0}
                  value={values.experienceMax}
                  onChange={(e) => set('experienceMax', e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Min salary (LPA)" htmlFor="salaryMin">
                <input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  min={0}
                  step="0.5"
                  disabled={values.hideSalary}
                  value={values.salaryMin}
                  onChange={(e) => set('salaryMin', e.target.value)}
                  className={`${inputClass} disabled:opacity-50`}
                />
              </Field>
              <Field
                label="Max salary (LPA)"
                htmlFor="salaryMax"
                error={errors.salaryMax}
              >
                <input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  min={0}
                  step="0.5"
                  disabled={values.hideSalary}
                  value={values.salaryMax}
                  onChange={(e) => set('salaryMax', e.target.value)}
                  className={`${inputClass} disabled:opacity-50`}
                />
              </Field>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-black dark:text-zinc-100">
              <input
                type="checkbox"
                name="hideSalary"
                checked={values.hideSalary}
                onChange={(e) => set('hideSalary', e.target.checked)}
                className="h-4 w-4 rounded border-black/20 dark:border-white/30"
              />
              Don’t show salary on the posting
            </label>

            <Field label="Education" htmlFor="education">
              <input
                id="education"
                name="education"
                type="text"
                value={values.education}
                onChange={(e) => set('education', e.target.value)}
                placeholder="e.g. Any graduate"
                className={inputClass}
              />
            </Field>

            <Field label="Apply by" htmlFor="applyBy" hint="Optional.">
              <input
                id="applyBy"
                name="applyBy"
                type="date"
                value={values.applyBy}
                onChange={(e) => set('applyBy', e.target.value)}
                className={inputClass}
              />
            </Field>
          </section>

          {/* ---------- Step 3: Review ---------- */}
          <section
            aria-label="Review"
            className={step === 3 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <div className="rounded-xl border border-black/[.07] bg-white p-4 dark:border-white/[.12] dark:bg-white/[.03]">
              <h2 className="text-base font-semibold text-black dark:text-zinc-50">
                {values.title || 'Untitled role'}
              </h2>
              <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                {values.company}
                {values.department && ` · ${values.department}`}
              </p>

              <dl className="mt-3 divide-y divide-black/[.05] dark:divide-white/[.08]">
                <ReviewRow label="Location" value={values.location} />
                <ReviewRow
                  label="Work mode"
                  value={`${values.workMode} · ${values.employmentType}`}
                />
                <ReviewRow label="Openings" value={values.openings} />
                <ReviewRow
                  label="Experience"
                  value={`${values.experienceMin}–${values.experienceMax} yrs`}
                />
                <ReviewRow
                  label="Salary"
                  value={
                    values.hideSalary
                      ? 'Not disclosed'
                      : values.salaryMin || values.salaryMax
                        ? `₹${values.salaryMin || '—'}–${values.salaryMax || '—'} LPA`
                        : ''
                  }
                />
                <ReviewRow
                  label="Skills"
                  value={values.skills.join(', ')}
                />
                <ReviewRow
                  label="Responsibilities"
                  value={
                    values.responsibilities.length > 0
                      ? `${values.responsibilities.length} listed`
                      : ''
                  }
                />
                <ReviewRow label="Education" value={values.education} />
                <ReviewRow label="Apply by" value={values.applyBy} />
              </dl>

              {values.description && (
                <div className="mt-3 border-t border-black/[.05] pt-3 dark:border-white/[.08]">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    About the role
                  </p>
                  <p className="mt-1 whitespace-pre-line text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                    {values.description}
                  </p>
                </div>
              )}
            </div>

            <p className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
              <CheckCircleIcon className="mt-px h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              Publishing makes this posting visible to candidates right away. You
              can close it at any time from the jobs list.
            </p>

            {state.error && (
              <p
                role="alert"
                className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300"
              >
                {state.error}
              </p>
            )}
          </section>
        </div>

        {/* Sticky action bar.

            The primary button carries an explicit `key` per variant. Without
            it React reconciles "Continue" and "Publish job" into the SAME DOM
            node: the state update from Continue's onClick flushes before the
            browser runs the click's default action, by which point the node is
            already type="submit" name="intent" value="publish" — so a click on
            Continue published the job and skipped review entirely. Distinct
            keys force a fresh node, so the default action has nothing to
            submit. */}
        <div className="sticky bottom-0 flex gap-3 border-t border-black/[.06] bg-white/95 px-5 py-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
          <button
            key="save-draft"
            type="submit"
            name="intent"
            value="draft"
            disabled={pending}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-black/[.1] px-4 text-sm font-medium text-black transition-colors hover:bg-black/[.04] disabled:opacity-60 dark:border-white/[.16] dark:text-zinc-100 dark:hover:bg-white/[.06]"
          >
            Save draft
          </button>

          {step < 3 ? (
            <button
              key="continue"
              type="button"
              onClick={goNext}
              className="flex h-11 flex-1 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Continue
            </button>
          ) : (
            <button
              key="publish"
              type="submit"
              name="intent"
              value="publish"
              disabled={pending}
              className="flex h-11 flex-1 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
            >
              {pending ? 'Publishing…' : 'Publish job'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
