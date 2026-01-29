"use client"

import { useState } from "react";
import { LoginForm } from "./_components/login-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    async function handleLogin(data: {
        username: string,
        password: string,
    }) {

        setIsLoading(true);
        setError('');

        const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        });

        if (!res?.ok) {
            setError("Invalid username or password");
            setIsLoading(false);
            return;
        }

        router.push('/');
        // setIsLoading(false);
    }


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
      </div>
    </div>
  )
}
