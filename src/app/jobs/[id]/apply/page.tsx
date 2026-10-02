import { notFound, redirect } from 'next/navigation';
import { formatExperience, formatSalary, isPastDeadline } from '@/lib/jobs';
import { getJob } from '@/lib/jobs-api';
import { ScreenHeader } from '@/app/_components/ui';
import { ApplyForm } from './apply-form';

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  // Don't show a form the API would reject. Sending people back to the posting
  // is clearer than letting them fill it in and fail on submit.
  const deadlinePassed = isPastDeadline(job);

  if (job.status !== 'live' || deadlinePassed) {
    redirect(`/jobs/${job.id}`);
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <ScreenHeader
        title="Apply"
        subtitle={`${job.title} · ${job.company}`}
        backHref={`/jobs/${job.id}`}
      />

      <div className="border-b border-black/[.06] bg-white px-5 py-3 text-xs text-zinc-600 dark:border-white/[.1] dark:bg-white/[.03] dark:text-zinc-400">
        {job.location} · {job.workMode} · {formatExperience(job)} ·{' '}
        {formatSalary(job)}
      </div>

      <ApplyForm jobId={job.id} />
    </div>
  );
}
