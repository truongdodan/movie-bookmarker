"use client";

import { api } from "~/trpc/react";
import { SignupForm } from "./_components/signup-form";
import type { SignupInput } from "~/lib/validators/auth";

export default function Page() {
  const register = api.auth.register.useMutation();

  async function handleSignup(data: SignupInput) {
    await register.mutateAsync(data);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm
          onSubmit={handleSignup}
          error={register.error?.message}
          isLoading={register.isPending}
        />
      </div>
    </div>
  );
}
