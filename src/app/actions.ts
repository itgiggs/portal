"use server";

import { redirect } from "next/navigation";

export type AuthFormState = {
  error?: string;
};

export async function login(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !email || typeof password !== "string" || !password) {
    return { error: "Email and password are required." };
  }

  // Placeholder until a real auth backend is wired up.
  redirect("/");
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof name !== "string" || !name ||
    typeof email !== "string" || !email ||
    typeof password !== "string" || !password
  ) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  // Placeholder until a real auth backend is wired up.
  redirect("/");
}
