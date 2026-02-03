import { NextResponse } from 'next/server'
import { payloadFetch } from '@/lib/auth/payloadFetch'

export async function POST() {
  const res = await payloadFetch('/api/users/logout', {
    method: 'POST',
  })

  const response = NextResponse.json({ ok: true }, { status: res.status })

  const setCookie = res.headers.get('set-cookie')
  if (setCookie) response.headers.set('set-cookie', setCookie)

  return response
}
