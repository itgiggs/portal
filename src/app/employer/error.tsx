'use client';

/**
 * Error boundary for the /jobs screens. Without this, an unreachable API shows
 * Next's generic error page and nobody can tell a backend that is down from a
 * bug in the frontend.
 */
export default function JobsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Next replaces server-side messages with a generic string in production, so
  // match on the shape we control rather than trusting the text alone.
  const unreachable = error.message.includes('Could not reach the API');

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 7.5v5.5M12 16.2v.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div>
        <p className="text-sm font-medium text-black dark:text-zinc-100">
          {unreachable ? 'Can’t reach the API' : 'Something went wrong'}
        </p>
        <p className="mt-1 max-w-xs text-xs text-zinc-600 dark:text-zinc-400">
          {unreachable
            ? 'The Laravel backend did not respond. Check that it is running on the address in API_URL.'
            : error.message}
        </p>
      </div>

      <button
        type="button"
        onClick={reset}
        className="flex h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Try again
      </button>
    </div>
  );
}
