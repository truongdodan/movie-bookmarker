"use client";

import { api } from "~/trpc/react";
import { SignupForm } from "./_components/signup-form";
import { useState } from "react";

export default function Page() {
      const register = api.auth.register.useMutation();
    const [error, setError] = useState('');

      async function handleSignup(data: {
        email: string,
        username: string, 
        password: string
      }) {
        try {
            await register.mutateAsync(data);
            setError('');

            
        } catch (err: any) {
            setError(err.message ?? "Something went wrong");
        }
        
      }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSubmit={handleSignup} error={error}/>
      </div>
    </div>
  )
}