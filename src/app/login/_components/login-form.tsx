"use client"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import Link from "next/link"
import { useState } from "react"

type Props = {
    onSubmit: (data: {
        username: string,
        password: string,
    }) => Promise<void>,
    error?: string | null,
    isLoading?: boolean,
} & React.ComponentProps<"div">

export function LoginForm({
  className,
  onSubmit,
  error,
  isLoading,
  ...props
}: Props) {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onSubmit({
            username: form.username,
            password: form.password,
        });
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  placeholder="dantRuongdo"
                  required
                  disabled={isLoading}
                    value={form.username}
                  onChange={(e) => {
                    setForm((f) => ({...f, username: e.target.value}))
                  }}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    disabled={isLoading}
                    value={form.password}
                    onChange={(e) => {
                        setForm((f) => ({...f, password: e.target.value}))
                    }}
                />
              </Field>
              {error && (
                <FieldDescription className="text-red-500">{error}</FieldDescription>
              )}
              <Field>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/register" className="underline">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
