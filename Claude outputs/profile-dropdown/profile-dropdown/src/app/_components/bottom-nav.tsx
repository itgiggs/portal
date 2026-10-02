'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { logout } from '@/app/actions';

/* =====================================================================
   Floating bottom navigation.

   Five destinations, profile last. The bar is hidden on focused flows —
   the posting wizard and the apply form — where a stray tap would throw
   away whatever the person had typed, and where their own sticky action
   bar already owns the bottom of the screen.
   ===================================================================== */

const HIDDEN_ON = [/^\/employer\/jobs\/new$/, /^\/jobs\/[^/]+\/apply$/];

function HomeIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        d="M3.5 10.2 12 3.5l8.5 6.7V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1v-9.8Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <circle
        cx="11"
        cy="11"
        r="6.5"
        stroke="currentColor"
        strokeWidth={filled ? 2.4 : 1.7}
      />
      <path
        d="M16 16l4.5 4.5"
        stroke="currentColor"
        strokeWidth={filled ? 2.4 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PostIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8.5v7M8.5 12h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PostingsIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <rect
        x="2.5"
        y="7.5"
        width="19"
        height="12.5"
        rx="2.4"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.5 7.5V6A2.5 2.5 0 0 1 11 3.5h2A2.5 2.5 0 0 1 15.5 6v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export interface NavUser {
  initials: string;
}

const MENU_ITEMS = [
  { href: '/profile', label: 'Profile' },
  { href: '/employer', label: 'Postings' },
  { href: '/jobs', label: 'Browse roles' },
];

export function BottomNav({ user }: { user: NavUser | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        // Otherwise focus lands on <body> and keyboard users lose their place.
        avatarRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  if (HIDDEN_ON.some((pattern) => pattern.test(pathname))) return null;

  const tabs = [
    { href: '/jobs', label: 'Jobs', active: pathname === '/jobs', icon: HomeIcon },
    {
      href: '/jobs?focus=search',
      label: 'Search',
      active: false,
      icon: SearchIcon,
    },
    { href: '/employer/jobs/new', label: 'Post', active: false, icon: null },
    {
      href: '/employer',
      label: 'Postings',
      active: pathname.startsWith('/employer'),
      icon: PostingsIcon,
    },
  ];

  const profileActive = pathname.startsWith('/profile');

  return (
    <>
      {/* Keeps the last of the page's content clear of the floating bar.
          A fixed element is out of flow, so without this the final card sits
          underneath it. */}
      <div aria-hidden="true" className="h-[88px] shrink-0" />

      <nav
        aria-label="Main"
        className="fixed bottom-4 left-1/2 z-30 w-[min(460px,calc(100%-32px))] -translate-x-1/2"
      >
        <ul className="flex items-center justify-around rounded-full border border-black/[.07] bg-white/90 px-2 py-2 shadow-lg shadow-black/[.1] backdrop-blur-xl dark:border-white/[.12] dark:bg-zinc-900/90 dark:shadow-black/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <li key={tab.label}>
                <Link
                  href={tab.href}
                  aria-label={tab.label}
                  aria-current={tab.active ? 'page' : undefined}
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                    tab.active
                      ? 'text-black dark:text-zinc-50'
                      : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
                  }`}
                >
                  {Icon ? <Icon filled={tab.active} /> : <PostIcon />}
                </Link>
              </li>
            );
          })}

          <li ref={menuRef} className="relative">
            {user ? (
              <>
                <button
                  ref={avatarRef}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-controls={menuOpen ? menuId : undefined}
                  aria-label="Profile"
                  aria-current={profileActive ? 'page' : undefined}
                  className="flex h-11 w-11 items-center justify-center"
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900 ${
                      profileActive || menuOpen
                        ? 'ring-2 ring-zinc-900 ring-offset-2 ring-offset-white dark:ring-zinc-100 dark:ring-offset-zinc-900'
                        : ''
                    }`}
                  >
                    {user.initials}
                  </span>
                </button>

                {menuOpen && (
                  <div
                    id={menuId}
                    role="menu"
                    aria-label="Account"
                    /* Opens upward: the bar is pinned to the bottom of the
                       screen, so a downward menu would be off-canvas. */
                    className="absolute bottom-full right-0 z-40 mb-3 w-48 overflow-hidden rounded-xl border border-black/[.08] bg-white shadow-lg shadow-black/[.12] dark:border-white/[.14] dark:bg-zinc-900 dark:shadow-black/50"
                  >
                    <div className="py-1">
                      {MENU_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setMenuOpen(false)}
                          className="block px-3.5 py-2 text-sm text-zinc-800 transition-colors hover:bg-black/[.04] dark:text-zinc-200 dark:hover:bg-white/[.07]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-black/[.06] py-1 dark:border-white/[.1]">
                      {/* A form, not a link: logging out revokes the token
                          server-side, so no prefetch may trigger it. */}
                      <form action={logout}>
                        <button
                          type="submit"
                          role="menuitem"
                          className="w-full px-3.5 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          Log out
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/login"
                aria-label="Profile"
                className="flex h-11 w-11 items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-zinc-400" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.7" />
                  <path
                    d="M4.5 20.5c0-3.6 3.3-6 7.5-6s7.5 2.4 7.5 6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>
            )}
          </li>

        </ul>
      </nav>
    </>
  );
}
