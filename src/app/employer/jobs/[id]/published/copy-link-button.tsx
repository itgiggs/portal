'use client';

import { useState } from 'react';
import { LinkIcon } from '@/app/_components/ui';

/**
 * Copy-to-clipboard for the live posting URL. Client-only because the absolute
 * URL depends on the browser's origin, and navigator.clipboard is browser API.
 */
export function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url =
      typeof window === 'undefined' ? path : `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, denied permission) — leave
      // the label alone rather than claiming a copy that did not happen.
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-zinc-100 px-4 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 dark:bg-white/[.08] dark:text-zinc-200 dark:hover:bg-white/[.14]"
    >
      <LinkIcon className="h-4 w-4" />
      {copied ? 'Link copied' : 'Copy posting link'}
    </button>
  );
}
