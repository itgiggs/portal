import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJob } from '@/lib/jobs-api';
import { CheckCircleIcon } from '@/app/_components/ui';

export default async function AppliedPage({
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
          Application sent
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Your application for <strong className="font-medium">{job.title}</strong> at{' '}
          {job.company} is with the hiring team. They’ll reach out by email if
          it’s a match.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/jobs"
            className="flex h-11 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Browse more roles
          </Link>
          <Link
            href={`/jobs/${job.id}`}
            className="flex h-11 items-center justify-center rounded-full border border-black/[.1] px-4 text-sm font-medium text-black transition-colors hover:bg-black/[.04] dark:border-white/[.16] dark:text-zinc-100 dark:hover:bg-white/[.06]"
          >
            Back to the posting
          </Link>
        </div>
      </div>
    </div>
  );
}
