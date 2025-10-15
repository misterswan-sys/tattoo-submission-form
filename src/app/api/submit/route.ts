import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const form = await req.formData();
  const name = form.get('name');
  const email = form.get('email');
  const description = form.get('description');
  console.log('Submission:', { name, email, description });
  return NextResponse.json({ ok: true });
}