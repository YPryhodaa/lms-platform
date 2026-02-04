import { cookies } from 'next/headers';

const BASE = process.env.PAYLOAD_PUBLIC_URL || 'http://localhost:3000';

export async function payloadFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      'Content-Type': 'application/json',
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    cache: 'no-store',
  });
}
