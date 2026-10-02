import Link from 'next/link';
import {
  formatDate,
  formatExperience,
  formatSalary,
  type Job,
} from '@/lib/jobs';
import { listPublicJobs } from '@/lib/jobs-api';
import {
  BriefcaseIcon,
  EmptyInboxIcon,
  LocationIcon,
  MetaChip,
  RupeeIcon,
  SearchIcon,
} from '@/app/_components/ui';

export const metadata = {
  title: 'Open roles',
  description: 'Browse and apply to open positions.',
};

// The board reflects what is live right now, so it must not be baked at build time.
export const dynamic = 'force-dynamic';

function JobCard({ job }: { job: Job }) {
  return (
    <li>
      <Link
        href={`/jobs/${job.id}`}
        className="block rounded-xl border border-black/[.07] bg-white p-4 transition-colors hover:border-black/[.18] dark:border-white/[.12] dark:bg-white/[.03] dark:hover:border-white/[.26]"
      >
        <p className="text-[15px] font-semibold text-black dark:text-zinc-50">
          {job.title}
        </p>
        <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
          {job.company}
          {job.department && ` · ${job.department}`}
        </p>

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

        <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
          {job.description}
        </p>

        <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500">
          {job.publishedAt ? `Posted ${formatDate(job.publishedAt)}` : ''}
          {job.openings > 1 && ` · ${job.openings} openings`}
        </p>
      </Link>
    </li>
  );
}

export default async function JobBoardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const jobs = await listPublicJobs(q);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-black/[.06] bg-white/95 px-5 py-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
        {/* <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-black dark:text-zinc-50">
              Open roles
            </h1>
            <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
              {jobs.length} {jobs.length === 1 ? 'position' : 'positions'} hiring now
            </p>
          </div>
          <Link
            href="/employer"
            className="shrink-0 text-xs font-medium text-zinc-600 underline transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Post a job
          </Link>
        </div> */}

        {/* A GET form keeps the query in the URL, so a search is shareable and
            the back button behaves. No client state needed. */}
        {/* <form method="GET" className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Search role, company or location"
              aria-label="Search open roles"
              className="w-full rounded-full border border-black/[.08] bg-white py-2 pl-9 pr-3 text-sm text-black outline-none transition-colors focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>
          <button
            type="submit"
            className="h-9 shrink-0 rounded-full bg-foreground px-4 text-xs font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Search
          </button>
        </form> */}
      </header>

      {jobs.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
          <EmptyInboxIcon className="h-14 w-14 text-zinc-300 dark:text-zinc-700" />
          <div>
            <p className="text-sm font-medium text-black dark:text-zinc-100">
              {q ? `Nothing matches “${q}”` : 'No open roles right now'}
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {q
                ? 'Try a different role, company or city.'
                : 'Check back soon — new positions are posted regularly.'}
            </p>
          </div>
          {q && (
            <Link
              href="/jobs"
              className="text-xs font-medium text-zinc-700 underline dark:text-zinc-300"
            >
              Clear search
            </Link>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-3 px-5 py-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ul>
      )}
    </div>
  );
}
