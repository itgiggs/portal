'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ApiError, API_URL, SESSION_COOKIE } from '@/lib/api';

export type AuthFormState = {
  error?: string;
};

interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

/**
 * Stores the Sanctum token in an httpOnly cookie.
 *
 * httpOnly keeps it out of reach of browser JavaScript, so an XSS bug cannot
 * read it; sameSite=lax keeps it off cross-site requests. It is only ever read
 * server-side, by src/lib/api.ts.
 */
async function startSession(token: string): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

/** Posts to the auth API without the session helper — there's no token yet. */
async function postAuth(path: string, body: unknown): Promise<AuthResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(
      0,
      `Could not reach the API at ${API_URL}. Is the Laravel server running?`
    );
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new ApiError(
      response.status,
      typeof payload.message === 'string' ? payload.message : 'Something went wrong.',
      payload.errors ?? {}
    );
  }

  return payload as AuthResponse;
}

/** Turns an ApiError into the single message the auth screens render. */
function messageFor(error: unknown): string {
  if (error instanceof ApiError) {
    const first = Object.values(error.errors)[0]?.[0];
    return first ?? error.message;
  }
  return 'Something went wrong. Please try again.';
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || !email || typeof password !== 'string' || !password) {
    return { error: 'Email and password are required.' };
  }

  let session: AuthResponse;

  try {
    session = await postAuth('/api/auth/login', { email, password });
  } catch (error) {
    return { error: messageFor(error) };
  }

  await startSession(session.token);

  // redirect() throws, so it stays outside the try/catch above.
  redirect('/employer');
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (
    typeof name !== 'string' || !name ||
    typeof email !== 'string' || !email ||
    typeof password !== 'string' || !password
  ) {
    return { error: 'All fields are required.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  let session: AuthResponse;

  try {
    session = await postAuth('/api/auth/register', {
      name,
      email,
      password,
      // Laravel's `confirmed` rule looks for this exact field name.
      password_confirmation: confirmPassword,
    });
  } catch (error) {
    return { error: messageFor(error) };
  }

  await startSession(session.token);

  redirect('/employer');
}

export async function logout(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (token) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        cache: 'no-store',
      });
    } catch {
      // The API being unreachable must not trap someone in a signed-in state;
      // clearing the cookie below is what actually signs them out here.
    }
  }

  store.delete(SESSION_COOKIE);
  redirect('/login');
}
