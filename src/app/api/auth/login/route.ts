import { NextResponse } from 'next/server';
import { payloadFetch } from '@/lib/auth/payloadFetch';
import { loginSchema } from '@/lib/validation';
import { validateBody } from '@/lib/validation';

export async function POST(req: Request) {
  const validated = await validateBody(req, loginSchema);
  if (!validated.ok) return validated.response;

  const { email, password } = validated.data;

  const loginRes = await payloadFetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    return NextResponse.json({ message: 'Невірний email або пароль' }, { status: 401 });
  }

  const data = await loginRes.json().catch(() => null);

  const response = NextResponse.json({ user: data?.user ?? null }, { status: 200 });

  const setCookie = loginRes.headers.get('set-cookie');
  if (setCookie) response.headers.set('set-cookie', setCookie);

  return response;
}
