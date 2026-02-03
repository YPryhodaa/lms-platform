'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupValues } from '@/lib/validation'

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
export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { register, handleSubmit, formState: { errors, isSubmitting } } = form

  const onSubmit = async (values: SignupValues) => {
    try {
      const res = await fetch('/api/auth/signup', {
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
      setServerError('Не вдалося зареєструватися')
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Створення аккаунту</CardTitle>
        <CardDescription>
          Введіть вашу інформацію нижче для створення вашого аккаунту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Ім'я та прізвище</FieldLabel>
              <Input id="name" type="text"  {...register('name')} error={errors.name?.message}/>
            </Field>
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
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" type="password"  {...register('password')} error={errors.password?.message} />
              <FieldDescription>
                Має бути принаймні 8 символів.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Підтвердіть пароль
              </FieldLabel>
              <Input id="confirm-password" type="password"  {...register('confirmPassword')} error={errors.confirmPassword?.message} />
              <FieldDescription>Будь ласка, підтвердіть ваш пароль.</FieldDescription>
            </Field>
            {serverError && (
              <p className="text-sm text-red-600">{serverError}</p>
            )}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}</Button>
                <Button variant="outline" type="button">
                  Зареєструватися з Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Вже маєте аккаунт? <a href="/login">Вхід</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
