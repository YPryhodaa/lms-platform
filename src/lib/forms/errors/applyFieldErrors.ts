import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import type { ApiErrorResponse } from './types'

function firstMsg(v: unknown): string | null {
  if (!v) return null
  if (typeof v === 'string') return v
  if (Array.isArray(v)) return typeof v[0] === 'string' ? v[0] : null
  return null
}

function mapKey(key: string, keyMap?: Record<string, string>) {
  return keyMap?.[key] ?? key
}

export function applyFieldErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  data: ApiErrorResponse | null,
  options?: {
    keyMap?: Record<string, string>
    clearServerError?: () => void
  },
): { hadFieldErrors: boolean; message?: string } {
  let hadFieldErrors = false
  const fe = data?.fieldErrors

  if (fe && typeof fe === 'object') {
    for (const [rawKey, rawVal] of Object.entries(fe)) {
      const msg = firstMsg(rawVal)
      if (!msg) continue

      const key = mapKey(rawKey, options?.keyMap)
      form.setError(key as Path<T>, { type: 'server', message: msg })
      hadFieldErrors = true
    }
  }

  if (hadFieldErrors) options?.clearServerError?.()

  return { hadFieldErrors, message: data?.message || 'Виникла помилка' }
}
