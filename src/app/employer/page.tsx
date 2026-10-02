import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getToken } from '@/lib/api';
import {
  STAGE_LABELS,
  formatDate,
  formatExperience,
  formatSalary,
  type Applicant,
  type Job,
  type JobStatus,
} from '@/lib/jobs';
import { listApplicants, listJobs } from '@/lib/jobs-api';
import { changeJobStatus, moveApplicantStage } from './actions';
import {
  BriefcaseIcon,
  EmptyInboxIcon,
  EyeIcon,
  LocationIcon,
  MetaChip,
  PlusIcon,
  RupeeIcon,
  SearchIcon,
  StageChip,
  StatusChip,
  UsersIcon,
} from '@/app/_components/ui';

export const metadata = {
  title: 'Employer panel',
  description: 'Manage your postings and their applicants.',
};

export const dynamic = 'force-dynamic';

const TABS: { label: string; status?: JobStatus }[] = [
  { label: 'All' },
  { label: 'Live', status: 'live' },
  { label: 'Drafts', status: 'draft' },
  { label: 'Closed', status: 'closed' },
];

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

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex-1 rounded-xl border border-black/[.07] bg-white px-3 py-2.5 dark:border-white/[.12] dark:bg-white/[.03]">
      <p className="text-lg font-semibold leading-6 text-black dark:text-zinc-50">
        {value}
      </p>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

function StatusButton({
  id,
  status,
  label,
}: {
  id: string;
  status: JobStatus;
  label: string;
}) {
  return (
    <form action={changeJobStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-600 transition-colors hover:bg-black/[.05] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-100"
      >
        {label}
      </button>
    </form>
  );
}

/** One applicant row with its stage controls. */
function ApplicantRow({
  jobId,
  applicant,
}: {
  jobId: string;
  applicant: Applicant;
}) {
  // Offer the next sensible steps, not every stage — a long row of buttons at
  // 540px is unusable.
  const index = STAGE_ORDER.indexOf(applicant.stage);
  const next = STAGE_ORDER.slice(index + 1, index + 2).filter((s) => s !== 'rejected');
  const canReject = applicant.stage !== 'rejected';

  return (
    <li className="flex gap-3 border-t border-black/[.05] py-3 first:border-t-0 dark:border-white/[.08]">
      <div
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-700 dark:bg-white/[.08] dark:text-zinc-200"
      >
        {initials(applicant.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-black dark:text-zinc-50">
              {applicant.name}
            </p>
            <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              {applicant.headline || '—'}
              {applicant.experience && ` · ${applicant.experience}`}
            </p>
          </div>
          <StageChip stage={applicant.stage} label={STAGE_LABELS[applicant.stage]} />
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1">
          {next.map((stage) => (
            <form key={stage} action={moveApplicantStage}>
              <input type="hidden" name="jobId" value={jobId} />
              <input type="hidden" name="applicantId" value={applicant.id} />
              <input type="hidden" name="stage" value={stage} />
              <button
                type="submit"
                className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-white/[.08] dark:text-zinc-200 dark:hover:bg-white/[.16]"
              >
                Move to {STAGE_LABELS[stage]}
              </button>
            </form>
          ))}
          {canReject && (
            <form action={moveApplicantStage}>
              <input type="hidden" name="jobId" value={jobId} />
              <input type="hidden" name="applicantId" value={applicant.id} />
              <input type="hidden" name="stage" value="rejected" />
              <button
                type="submit"
                className="rounded-full px-2.5 py-1 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-700 dark:text-zinc-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
              >
                Reject
              </button>
            </form>
          )}
        </div>
      </div>
    </li>
  );
}

async function JobCard({ job }: { job: Job }) {
  // Applicants are fetched per card so the panel shows them inline. Only
  // postings that actually have any cost a request.
  const applicants =
    job.applicantCount > 0 ? await listApplicants(job.id) : [];

  return (
    <li className="rounded-xl border border-black/[.07] bg-white p-4 dark:border-white/[.12] dark:bg-white/[.03]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/jobs/${job.id}`}
            className="block truncate text-[15px] font-semibold text-black hover:underline dark:text-zinc-50"
          >
            {job.title}
          </Link>
          <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-400">
            {job.department ? `${job.department} · ` : ''}
            {job.openings} {job.openings === 1 ? 'opening' : 'openings'}
          </p>
        </div>
        <StatusChip status={job.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <MetaChip icon={<LocationIcon className="h-3.5 w-3.5" />}>
          {job.location}
        </MetaChip>
        <MetaChip icon={<BriefcaseIcon className="h-3.5 w-3.5" />}>
          {job.workMode} · {formatExperience(job)}
        </MetaChip>
        <MetaChip icon={<RupeeIcon className="h-3.5 w-3.5" />}>
          {formatSalary(job)}
        </MetaChip>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-black/[.05] pt-3 dark:border-white/[.08]">
        <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <UsersIcon className="h-4 w-4" />
            {job.applicantCount}
            {job.newApplicantCount > 0 && (
              <span className="ml-0.5 rounded-full bg-blue-600 px-1.5 text-[10px] font-semibold text-white">
                {job.newApplicantCount} new
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <EyeIcon className="h-4 w-4" />
            {job.views.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {job.status === 'draft' && (
            <StatusButton id={job.id} status="live" label="Publish" />
          )}
          {job.status === 'live' && (
            <StatusButton id={job.id} status="closed" label="Close" />
          )}
          {job.status === 'closed' && (
            <StatusButton id={job.id} status="live" label="Reopen" />
          )}
        </div>
      </div>

      {/* Open by default when someone new has applied — the whole point of the
          panel is that unreviewed candidates are visible without a click.
          Fully reviewed lists stay collapsed so the page stays scannable. */}
      {applicants.length > 0 && (
        <details
          open={job.newApplicantCount > 0}
          className="mt-3 border-t border-black/[.05] pt-2 dark:border-white/[.08]"
        >
          <summary className="cursor-pointer list-none text-xs font-medium text-zinc-700 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-zinc-100">
            Applicants ({applicants.length})
          </summary>
          <ul className="mt-1">
            {applicants.map((applicant) => (
              <ApplicantRow key={applicant.id} jobId={job.id} applicant={applicant} />
            ))}
          </ul>
        </details>
      )}

      <p className="mt-2 text-[11px] text-zinc-400 dark:text-zinc-500">
        {job.status === 'live' && job.publishedAt
          ? `Published ${formatDate(job.publishedAt)}`
          : `Created ${formatDate(job.createdAt)}`}
      </p>
    </li>
  );
}

export default async function EmployerPanelPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  if (!(await getToken())) redirect('/login');

  const { status, q } = await searchParams;
  const active = TABS.find((tab) => tab.status === status) ?? TABS[0];

  // Tabs filter server-side, but the stat row should describe the whole
  // account — so it is computed from an unfiltered list, not the visible one.
  const [visible, all] = await Promise.all([
    listJobs({ status: active.status, search: q }),
    listJobs(),
  ]);

  const stats = {
    live: all.filter((job) => job.status === 'live').length,
    draft: all.filter((job) => job.status === 'draft').length,
    applicants: all.reduce((total, job) => total + job.applicantCount, 0),
    views: all.reduce((total, job) => total + job.views, 0),
  };

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-[52px] z-10 border-b border-black/[.06] bg-white/95 px-5 pb-3 pt-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
              Your postings
            </h1>
            <Link
              href="/jobs"
              className="text-xs text-zinc-600 underline transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              View the public board
            </Link>
          </div>
          <Link
            href="/employer/jobs/new"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <PlusIcon className="h-4 w-4" />
            Post a job
          </Link>
        </div>

        <div className="mt-3 flex gap-2">
          <StatTile label="Live" value={stats.live} />
          <StatTile label="Drafts" value={stats.draft} />
          <StatTile label="Applicants" value={stats.applicants} />
          <StatTile label="Views" value={stats.views.toLocaleString('en-IN')} />
        </div>

        <nav className="mt-3 flex gap-1.5" aria-label="Filter by status">
          {TABS.map((tab) => {
            const isActive = tab.label === active.label;
            const href = tab.status
              ? `/employer?status=${tab.status}${q ? `&q=${encodeURIComponent(q)}` : ''}`
              : `/employer${q ? `?q=${encodeURIComponent(q)}` : ''}`;
            return (
              <Link
                key={tab.label}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/[.06] dark:text-zinc-300 dark:hover:bg-white/[.12]'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <form method="GET" className="mt-2.5 flex items-center gap-2">
          {active.status && <input type="hidden" name="status" value={active.status} />}
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search your postings"
              aria-label="Search your postings"
              className="w-full rounded-full border border-black/[.08] bg-white py-1.5 pl-9 pr-3 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>
        </form>
      </header>

      {visible.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <EmptyInboxIcon className="h-14 w-14 text-zinc-300 dark:text-zinc-700" />
          <div>
            <p className="text-sm font-medium text-black dark:text-zinc-100">
              {q || active.status ? 'Nothing here' : 'No jobs posted yet'}
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {q || active.status
                ? 'Try another filter or search.'
                : 'Publish your first role and it will show up here with its applicants.'}
            </p>
          </div>
          <Link
            href="/employer/jobs/new"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <PlusIcon className="h-4 w-4" />
            Post a job
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 px-5 py-5">
          {visible.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
}
