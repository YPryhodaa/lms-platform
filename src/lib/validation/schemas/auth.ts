import { z } from 'zod'
import { V } from '../messages'

const emailSchema = z
  .email(V.email)
  .transform((v) => v.trim())
  .refine((v) => v.length > 0, { message: V.required })

const passwordSignupSchema = z
  .string()
  .min(8, V.passwordMin)
  .max(72, V.passwordMax)

const passwordLoginSchema = z
  .string()
  .min(1, V.passwordMin)
  .max(72, V.passwordMax)

const nameSchema = z
  .string()
  .trim()
  .min(2, V.nameMin)
  .max(80, V.nameMax)

export const signupSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSignupSchema,
    confirmPassword: passwordSignupSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: V.passwordMismatch,
  })

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordLoginSchema,
})

export type SignupValues = z.infer<typeof signupSchema>
export type LoginValues = z.infer<typeof loginSchema>
