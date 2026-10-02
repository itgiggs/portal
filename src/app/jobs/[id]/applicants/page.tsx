import { notFound } from 'next/navigation';
import {
  STAGE_LABELS,
  formatDate,
  type Applicant,
} from '@/lib/jobs';
import { getJob } from '@/lib/jobs-api';
import {
  EmptyInboxIcon,
  LocationIcon,
  ScreenHeader,
  StageChip,
} from '../../_components/ui';

/** Stage order for grouping — rejected sinks to the bottom. */
const STAGE_ORDER: Applicant['stage'][] = [
  'new',
  'screening',
  'interview',
  'offer',
  'rejected',
];

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

function matchTone(score: number): string {
  if (score >= 85) return 'text-emerald-700 dark:text-emerald-400';
  if (score >= 70) return 'text-amber-700 dark:text-amber-400';
  return 'text-zinc-500 dark:text-zinc-400';
}

function ApplicantRow({ applicant }: { applicant: Applicant }) {
  return (
    <li className="flex gap-3 rounded-xl border border-black/[.07] bg-white p-3.5 dark:border-white/[.12] dark:bg-white/[.03]">
      <div
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
      >
        {initials(applicant.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-black dark:text-zinc-50">
              {applicant.name}
            </p>
            <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              {applicant.headline} · {applicant.experience}
            </p>
          </div>
          <StageChip
            stage={applicant.stage}
            label={STAGE_LABELS[applicant.stage]}
          />
        </div>

        <p className="mt-1.5 flex items-center gap-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
          <LocationIcon className="h-3.5 w-3.5 shrink-0" />
          {applicant.location} · {applicant.currentCompany}
        </p>

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className={`text-xs font-medium ${matchTone(applicant.matchScore)}`}>
            {applicant.matchScore}% match
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Applied {formatDate(applicant.appliedAt)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  const applicants = [...job.applicants].sort(
    (a, b) =>
      STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage) ||
      b.matchScore - a.matchScore
  );

  const tally = STAGE_ORDER.map((stage) => ({
    stage,
    count: applicants.filter((a) => a.stage === stage).length,
  })).filter((entry) => entry.count > 0);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <ScreenHeader
        title="Applicants"
        subtitle={`${job.title} · ${applicants.length} total`}
        backHref={`/jobs/${job.id}`}
      />

      {applicants.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <EmptyInboxIcon className="h-14 w-14 text-zinc-300 dark:text-zinc-700" />
          <div>
            <p className="text-sm font-medium text-black dark:text-zinc-100">
              No applicants yet
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {job.status === 'live'
                ? 'This posting is live — applications will land here.'
                : 'Publish this posting to start receiving applications.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5 px-5 pt-4">
            {tally.map(({ stage, count }) => (
              <StageChip
                key={stage}
                stage={stage}
                label={`${STAGE_LABELS[stage]} ${count}`}
              />
            ))}
          </div>

          <ul className="flex flex-col gap-3 px-5 py-4">
            {applicants.map((applicant) => (
              <ApplicantRow key={applicant.id} applicant={applicant} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
