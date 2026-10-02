import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatExperience, formatSalary } from '@/lib/jobs';
import { getJob } from '@/lib/jobs-api';
import { CheckCircleIcon, PlusIcon } from '../../_components/ui';
import { CopyLinkButton } from './copy-link-button';

export default async function JobPublishedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-black">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircleIcon className="h-8 w-8" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-black dark:text-zinc-50">
          Your job is live
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Candidates can see this posting and start applying right away.
        </p>

        {/* Posting summary */}
        <div className="mt-6 rounded-xl border border-black/[.07] bg-white p-4 text-left dark:border-white/[.12] dark:bg-white/[.03]">
          <p className="text-[15px] font-semibold text-black dark:text-zinc-50">
            {job.title}
          </p>
          <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
            {job.company} · {job.location}
          </p>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            {job.workMode} · {job.employmentType} · {formatExperience(job)} ·{' '}
            {formatSalary(job)}
          </p>
        </div>

        <div className="mt-4">
          <CopyLinkButton path={`/jobs/${job.id}`} />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={`/jobs/${job.id}`}
            className="flex h-11 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            View posting
          </Link>
          <Link
            href={`/jobs/${job.id}/applicants`}
            className="flex h-11 items-center justify-center rounded-full border border-black/[.1] px-4 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.16] dark:text-zinc-100 dark:hover:bg-white/[.06]"
          >
            View applicants
          </Link>
          <Link
            href="/jobs/new"
            className="flex h-11 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-black/[.04] dark:text-zinc-300 dark:hover:bg-white/[.06]"
          >
            <PlusIcon className="h-4 w-4" />
            Post another job
          </Link>
        </div>

        <Link
          href="/jobs"
          className="mt-5 inline-block text-xs text-zinc-500 underline transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Back to all jobs
        </Link>
      </div>
    </div>
  );
}
