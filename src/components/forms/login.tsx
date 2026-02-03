'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginValues } from '@/lib/validation'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { applyFieldErrors } from '@/lib/forms/errors/applyFieldErrors'
import { ApiErrorResponse } from '@/lib/forms/errors/types'
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  const onSubmit = async (values: LoginValues) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json().catch(() => null)

      if (res.ok) {
        router.push('/')
        return
      }

      const { hadFieldErrors, message } = applyFieldErrors(form, data as ApiErrorResponse | null)
      if (!hadFieldErrors) setServerError(message || null)
      
    } catch (error) {
      setServerError('Не вдалося ввійти')
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Вхід</CardTitle>
          <CardDescription>
            Введіть вашу електронну пошту нижче для входу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Електронна пошта</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Пароль</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Забули ваш пароль?
                  </a> */}
                </div>
                <Input id="password" type="password" {...register('password')} error={errors.password?.message} />
              </Field>
              {serverError && (
                <p className="text-sm text-red-600">{serverError}</p>
              )}
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Вхід...' : 'Вхід'}
                </Button>
                <Button variant="outline" type="button">
                  Вхід з Google
                </Button>
                <FieldDescription className="text-center">
                  Не маєте аккаунту? <a href="/signup">Зареєструватися</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
