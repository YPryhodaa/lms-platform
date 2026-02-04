import { NextResponse } from 'next/server';
import { payloadFetch } from '@/lib/auth/payloadFetch';
import { signupSchema, validateBody } from '@/lib/validation';

type PayloadError = {
  errors?: Array<{
    name?: string;
    message?: string;
    data?: {
      errors?: Array<{
        path?: string;
        message?: string;
      }>;
    };
  }>;
};

export function isDuplicateEmailError(err: unknown): boolean {
  const e = err as PayloadError;
  const pe = e?.errors?.[0];
  const fieldErr = pe?.data?.errors?.find((x) => x.path === 'email');

  if (!fieldErr?.message) return false;

  return fieldErr.message.toLowerCase().includes('already registered');
}

export async function POST(req: Request) {
  const validated = await validateBody(req, signupSchema);
  if (!validated.ok) return validated.response;

  const { confirmPassword: _ignore, ...values } = validated.data;

  const createRes = await payloadFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (!createRes.ok) {
    const err = await createRes.json().catch(() => null);

    if (isDuplicateEmailError(err)) {
      return NextResponse.json(
        {
          message: 'Перевірте дані',
          fieldErrors: {
            email: 'Цей email вже зареєстрований. Увійдіть або відновіть пароль.',
          },
        },
        { status: 409 },
      );
    }

    return NextResponse.json({ message: 'Не вдалося зареєструватися' }, { status: 400 });
  }

  const loginRes = await payloadFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: values.email, password: values.password }),
  });

  const data = await loginRes.json().catch(() => null);
  const response = NextResponse.json({ user: data?.user ?? null }, { status: loginRes.status });

  const setCookie = loginRes.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);

  return response;
}
