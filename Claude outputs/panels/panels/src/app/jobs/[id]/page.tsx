import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  formatDate,
  formatExperience,
  formatSalary,
  isPastDeadline,
} from '@/lib/jobs';
import { getJob } from '@/lib/jobs-api';
import {
  BackArrowIcon,
  BriefcaseIcon,
  CalendarIcon,
  LocationIcon,
  MetaChip,
  RupeeIcon,
  SendIcon,
  ShareIcon,
  StatusChip,
} from '@/app/_components/ui';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const deadlinePassed = isPastDeadline(job);

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-black">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-black/[.06] bg-white/95 px-5 py-3 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        <Link
          href="/jobs"
          aria-label="Back to jobs"
          className="-ml-1 rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-black/[.05] dark:text-zinc-300 dark:hover:bg-white/[.08]"
        >
          <BackArrowIcon className="h-5 w-5" />
        </Link>
        <span className="flex-1 truncate text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Job posting
        </span>
        <button
          type="button"
          aria-label="Share posting"
          className="rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-black/[.05] dark:text-zinc-300 dark:hover:bg-white/[.08]"
        >
          <ShareIcon className="h-5 w-5" />
        </button>
      </header>

      <div className="flex-1 px-5 py-5">
        {/* Title block */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold leading-7 text-black dark:text-zinc-50">
              {job.title}
            </h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {job.company}
              {job.department && ` · ${job.department}`}
            </p>
          </div>
          <StatusChip status={job.status} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <MetaChip icon={<LocationIcon className="h-3.5 w-3.5" />}>
            {job.location}
          </MetaChip>
          <MetaChip icon={<BriefcaseIcon className="h-3.5 w-3.5" />}>
            {job.workMode} · {job.employmentType}
          </MetaChip>
          <MetaChip icon={<RupeeIcon className="h-3.5 w-3.5" />}>
            {formatSalary(job)}
          </MetaChip>
          <MetaChip>{formatExperience(job)} experience</MetaChip>
          <MetaChip>
            {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
          </MetaChip>
        </div>

        {job.applyBy && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-700 dark:bg-white/[.04] dark:text-zinc-300">
            <CalendarIcon className="h-4 w-4" />
            Apply by {formatDate(job.applyBy)}
          </div>
        )}

        {/* About */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
            About the role
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {job.description}
          </p>
        </section>

        {/* Responsibilities */}
        {job.responsibilities.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
              What you’ll do
            </h2>
            <ul className="mt-2 flex flex-col gap-2">
              {job.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-500"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        {job.skills.length > 0 && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
              Skills
            </h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-800 dark:bg-white/[.08] dark:text-zinc-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {job.education && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-black dark:text-zinc-50">
              Education
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              {job.education}
            </p>
          </section>
        )}

        <p className="mt-6 text-[11px] text-zinc-400 dark:text-zinc-500">
          {job.publishedAt
            ? `Published ${formatDate(job.publishedAt)}`
            : `Draft created ${formatDate(job.createdAt)}`}
        </p>
      </div>

      {/* Sticky footer: candidate call to action.

          A closed or draft posting still renders for its owner (previewing from
          the panel), so the button reflects whether it is actually open rather
          than always inviting an application that the API would reject. */}
      <div className="sticky bottom-0 border-t border-black/[.06] bg-white/95 px-5 py-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        {deadlinePassed ? (
          <p className="flex h-11 items-center justify-center rounded-full bg-zinc-100 px-4 text-sm text-zinc-500 dark:bg-white/[.06] dark:text-zinc-400">
            Applications closed on {formatDate(job.applyBy)}
          </p>
        ) : job.status === 'live' ? (
          <Link
            href={`/jobs/${job.id}/apply`}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <SendIcon className="h-4 w-4" />
            Apply for this role
          </Link>
        ) : (
          <p className="flex h-11 items-center justify-center rounded-full bg-zinc-100 px-4 text-sm text-zinc-500 dark:bg-white/[.06] dark:text-zinc-400">
            {job.status === 'draft'
              ? 'Draft — not visible to candidates yet'
              : 'This role is no longer accepting applications'}
          </p>
        )}
      </div>
    </div>
  );
}
