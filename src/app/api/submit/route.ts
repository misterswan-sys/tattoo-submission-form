import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const description = formData.get("description");
    const placement = formData.get("placement");

    // Send email through Resend
    const data = await resend.emails.send({
      from: "Broken Art Tattoo <forms@brokenarttattoo.com>",
      to: "swan@brokenarttattoo.com",
      subject: "New Tattoo Submission Form",
      html: `
        <h2>New Tattoo Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Placement:</strong> ${placement}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
