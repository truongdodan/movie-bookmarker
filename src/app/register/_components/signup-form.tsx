import { useState } from "react"
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
import { signupSchema, type SignupInput } from "~/lib/validators/auth"

type Props = {
  onSubmit: (data: {
    email: string,
    username: string,
    password: string,
  }) => Promise<void>,
  error?: string | null,
} & React.ComponentProps<typeof Card>

export function SignupForm({ onSubmit, error, ...props }: Props) {
  const [form, setForm] = useState<SignupInput>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<SignupInput>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const errors: typeof fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof SignupInput;
        errors[key] = issue.message;
      });
      setFieldErrors(errors);

      return;
    }

    setFieldErrors({});
    onSubmit({
      email: form.email,
      username: form.username,
      password: form.password,
    });

  }


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        {/* <CardDescription>
          Enter your information below to create your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
                  }))
                }}
                required
              />
              {/* <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input 
                type="text"
                value={form.username}
                onChange={(e) => (
                  setForm((f) => ({
                    ...f, 
                    username: e.target.value
                  }))
                )}  
                required
              />
              {fieldErrors.username && (
                <FieldDescription className="text-red-500">
                  {fieldErrors.username}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                type="password"
                value={form.password}
                onChange={(e) => (
                  setForm((f) => ({
                    ...f, 
                    password: e.target.value
                  }))
                )}  
                required
              />
              {fieldErrors.password && (
                <FieldDescription className="text-red-500">
                  {fieldErrors.password}
                </FieldDescription>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input 
                type="password"
                value={form.confirmPassword}
                onChange={(e) => (
                  setForm((f) => ({
                    ...f, 
                    confirmPassword: e.target.value
                  }))
                )}  
                required
              />
              {fieldErrors.confirmPassword && (
                <FieldDescription className="text-red-500">
                  {fieldErrors.confirmPassword}
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
