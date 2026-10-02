import 'server-only';

import { ApiError, apiFetch, getToken } from './api';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

/**
 * The signed-in user, or null.
 *
 * Returns null rather than throwing on 401 so the layout can render for
 * visitors — a stale or revoked cookie should show the signed-out header, not
 * crash every page in the app.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  if (!(await getToken())) return null;

  try {
    const payload = await apiFetch<{ user: SessionUser }>('/api/auth/me');
    return payload.user ?? null;
  } catch (error) {
    if (error instanceof ApiError && (error.status === 401 || error.status === 419)) {
      return null;
    }
    // An unreachable API shouldn't blank the header on every page either.
    if (error instanceof ApiError && error.status === 0) return null;
    throw error;
  }
}

/** "Reet Walia" → "RW". Falls back to the email when there's no name. */
export function initialsFor(user: SessionUser): string {
  const source = user.name?.trim() || user.email;
  return source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}
