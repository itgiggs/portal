import 'server-only';

import { cookies } from 'next/headers';

/* =====================================================================
   Thin client for the Laravel API.

   Server-only on purpose: the Sanctum token lives in an httpOnly cookie,
   which browser JavaScript cannot read. Every call goes out from a server
   component or a server action, so the token never reaches the client and
   the API base URL can stay a server-side secret.
   ===================================================================== */

export const SESSION_COOKIE = 'jp_token';

/** Trailing slash stripped so `${API_URL}/api/jobs` can't become a double slash. */
export const API_URL = (
  process.env.API_URL ?? 'http://127.0.0.1:8000'
).replace(/\/$/, '');

/** A non-2xx response. `errors` carries Laravel's 422 field bag when present. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly errors: Record<string, string[]> = {}
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /** First message per field, in the shape the wizard's fieldErrors expects. */
  fieldErrors(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(this.errors).map(([field, messages]) => [
        field,
        messages[0] ?? 'Invalid value.',
      ])
    );
  }
}

export async function getToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  /** Send the session token. Default true; public reads can pass false. */
  auth?: boolean;
  /** Next.js cache hint. Job data is request-time state, so no-store by default. */
  cache?: RequestCache;
}

/**
 * Calls the API and unwraps Laravel's `{ data: ... }` envelope.
 *
 * Throws ApiError for non-2xx so callers can branch on status instead of
 * inspecting response objects everywhere.
 */
export async function apiFetch<T>(
  path: string,
  { method = 'GET', body, auth = true, cache = 'no-store' }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };

  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (auth) {
    const token = await getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache,
    });
  } catch {
    // A refused connection is the common case in development, and the raw
    // "fetch failed" tells nobody anything useful.
    throw new ApiError(
      0,
      `Could not reach the API at ${API_URL}. Is the Laravel server running?`,
      {}
    );
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  let payload: unknown = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    // Laravel returns an HTML error page when APP_DEBUG is on; don't let a
    // JSON parse error mask the real status code.
    if (!response.ok) {
      throw new ApiError(response.status, `API returned ${response.status}.`);
    }
  }

  const record = (payload ?? {}) as Record<string, unknown>;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      typeof record.message === 'string' ? record.message : `API returned ${response.status}.`,
      (record.errors as Record<string, string[]>) ?? {}
    );
  }

  return ('data' in record ? record.data : record) as T;
}
