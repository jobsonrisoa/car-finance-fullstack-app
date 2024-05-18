import { NextResponse } from 'next/server';
import { z } from 'zod';

const FinanceSchema = z.object({
  car_id: z.number(),
  down_payment: z.number(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = FinanceSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error.errors }, { status: 400 });
  }

  const response = await fetch('http://localhost:8000/api/v1/jobson/finances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result.data),
  });

  const data = await response.json();

  return NextResponse.json(data);
}
