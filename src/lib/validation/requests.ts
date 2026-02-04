import { NextResponse } from 'next/server';
import { z, type ZodType } from 'zod';

export async function validateBody<T>(req: Request, schema: ZodType<T>) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    const errors = z.treeifyError(parsed.error);

    return {
      ok: false as const,
      response: NextResponse.json(
        {
          message: 'Некоректні дані',
          errors,
        },
        { status: 400 },
      ),
    };
  }

  return {
    ok: true as const,
    data: parsed.data,
  };
}
