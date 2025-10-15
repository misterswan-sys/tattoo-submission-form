import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const placement = formData.get("placement");
    const description = formData.get("description");
    const sessions = formData.get("sessions");
    const questions = formData.get("questions");

    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    // Send email through Resend
    const data = await resend.emails.send({
      from: "Broken Art Tattoo <forms@brokenarttattoo.com>",
      to: ["swan@brokenarttattoo.com"],
      subject: "New Tattoo Submission Form",
      html: `
        <h2>New Tattoo Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Placement:</strong> ${placement}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Sessions:</strong> ${sessions}</p>
        <p><strong>Additional Questions:</strong> ${questions}</p>
      `,
    });

    console.log("✅ Email sent via Resend:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}
