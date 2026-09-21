"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register, type AuthFormState } from "@/app/actions";

const initialState: AuthFormState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
          Register
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-950 underline dark:text-zinc-50"
            style={{ backgroundColor: '#2964af' }}
          >
            Log in
          </Link>
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-black dark:text-zinc-50"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              className="rounded-md border border-black/[.08] bg-white px-3 py-2 text-sm text-black outline-none focus:border-black/40 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
            />
          </div>

          {state?.error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-60 dark:hover:bg-[#ccc]"
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
