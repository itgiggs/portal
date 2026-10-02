'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { logout } from '@/app/actions';

export interface MenuUser {
  name: string;
  email: string;
  initials: string;
}

const ITEMS = [
  { href: '/employer', label: 'Posted jobs' },
  { href: '/profile', label: 'My profile' },
  { href: '/jobs', label: 'Browse roles' },
];

export function UserMenu({ user }: { user: MenuUser }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        // Send focus back to the trigger, or it lands on <body>.
        buttonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Account menu for ${user.name}`}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white transition-opacity hover:opacity-85 dark:bg-zinc-100 dark:text-zinc-900"
      >
        {user.initials}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Account"
          className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-black/[.08] bg-white shadow-lg shadow-black/[.08] dark:border-white/[.14] dark:bg-zinc-900 dark:shadow-black/40"
        >
          <div className="border-b border-black/[.06] px-3.5 py-3 dark:border-white/[.1]">
            <p className="truncate text-sm font-medium text-black dark:text-zinc-50">
              {user.name}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block px-3.5 py-2 text-sm text-zinc-800 transition-colors hover:bg-black/[.04] dark:text-zinc-200 dark:hover:bg-white/[.07]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-black/[.06] py-1 dark:border-white/[.1]">
            {/* A form, not a link: signing out revokes the token server-side,
                so it must be a POST rather than something a prefetch could
                trigger on hover. */}
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
    </div>
  );
}
