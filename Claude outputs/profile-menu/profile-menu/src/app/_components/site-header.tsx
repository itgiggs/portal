import Link from 'next/link';
import { getCurrentUser, initialsFor } from '@/lib/auth';
import { UserMenu } from './user-menu';

/**
 * The one bar that appears on every page: brand on the left, account menu on
 * the right. Rendered from the root layout, so it is a server component and the
 * session lookup happens before anything paints — no signed-out flash.
 *
 * Height is fixed at 52px because the page-level sticky headers offset
 * themselves by exactly that (`top-[52px]`) to stack underneath it.
 */
export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-20 flex h-[52px] shrink-0 items-center justify-between gap-3 border-b border-black/[.06] bg-white/95 px-5 backdrop-blur dark:border-white/[.1] dark:bg-black/90">
      <Link
        href="/jobs"
        className="text-sm font-semibold tracking-tight text-black dark:text-zinc-50"
      >
        Job Portal
      </Link>

      {user ? (
        <UserMenu
          user={{
            name: user.name,
            email: user.email,
            initials: initialsFor(user),
          }}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-zinc-700 transition-colors hover:text-black dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="flex h-8 items-center rounded-full bg-foreground px-3.5 text-xs font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}
