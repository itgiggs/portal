import { logout } from '@/app/actions';
import type { SessionUser } from '@/lib/auth';
import { initialsFor } from '@/lib/auth';

/**
 * The signed-in account strip.
 *
 * Log out lives here now that the top-right menu is gone — the profile tab is
 * the only place it can reasonably be reached from the bottom bar.
 */
export function AccountBar({ user }: { user: SessionUser }) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[.06] bg-white px-5 py-3.5 dark:border-white/[.1] dark:bg-white/[.03]">
      <div
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        {initialsFor(user)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-black dark:text-zinc-50">
          {user.name}
        </p>
        <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
          {user.email}
        </p>
      </div>

      {/* A form, not a link: logging out revokes the token server-side, so it
          must be a POST that no prefetch can trigger. */}
      <form action={logout}>
        <button
          type="submit"
          className="shrink-0 rounded-full border border-black/[.1] px-3.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-white/[.16] dark:text-red-400 dark:hover:bg-red-500/10"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
