/* =====================================================================
   Shared presentation bits for the /jobs screens.

   The earlier screens each re-declare their own inline icons; five job
   screens would have meant five copies, so these live in one `_components`
   folder instead (the leading underscore keeps it out of the router).
   ===================================================================== */

import type { JobStatus, ApplicantStage } from '@/lib/jobs';

/* ---------------- Icons (inline SVG, no external deps) ---------------- */

export function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LocationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="8" width="19" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 13h19" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 4h10M7 8.5h10M15.5 4c0 3-2.3 4.5-5.5 4.5H7l7.5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UsersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 20c0-3.2 2.5-5.3 5.5-5.3s5.5 2.1 5.5 5.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M17.5 14.9c1.9.6 3 2.5 3 5.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 9.5h18M8 3v3.5M16 3v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 12.4l2.6 2.6L16 9.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.2 1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.2-1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10.8l8-4.6M8 13.2l8 4.6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M21 3L10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function EmptyInboxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M6 28l5-16h26l5 16v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V28Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 28h10l2 4h12l2-4h10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------------- Chips ---------------- */

const STATUS_STYLES: Record<JobStatus, string> = {
  draft:
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/30',
  live: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  closed:
    'bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-white/[.06] dark:text-zinc-400 dark:ring-white/20',
};

const STATUS_LABELS: Record<JobStatus, string> = {
  draft: 'Draft',
  live: 'Live',
  closed: 'Closed',
};

export function StatusChip({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

const STAGE_STYLES: Record<ApplicantStage, string> = {
  new: 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/30',
  screening:
    'bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/30',
  interview:
    'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/30',
  offer:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/30',
  rejected:
    'bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-white/[.06] dark:text-zinc-400 dark:ring-white/20',
};

export function StageChip({
  stage,
  label,
}: {
  stage: ApplicantStage;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STAGE_STYLES[stage]}`}
    >
      {label}
    </span>
  );
}

/** Small neutral pill used for location / type / salary metadata. */
export function MetaChip({
  icon,
  children,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-white/[.06] dark:text-zinc-300">
      {icon}
      {children}
    </span>
  );
}

/* ---------------- Screen chrome ---------------- */

export function ScreenHeader({
  title,
  subtitle,
  backHref,
  action,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex items-start gap-3 border-b border-black/[.06] bg-white/95 px-5 py-4 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
      {backHref && (
        <a
          href={backHref}
          aria-label="Go back"
          className="mt-0.5 -ml-1 rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-black/[.05] dark:text-zinc-300 dark:hover:bg-white/[.08]"
        >
          <BackArrowIcon className="h-5 w-5" />
        </a>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-black dark:text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
