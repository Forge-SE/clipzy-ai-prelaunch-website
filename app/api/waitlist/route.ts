import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, experience, struggle, features } =
      await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ") || "";

    const contact = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed: false,
    });

    await new Promise((r) => setTimeout(r, 600));
    await resend.emails.send({
      from: "Clipzy <hello@mailing.clipzy.ai>",
      to: email,
      subject: "Welcome to the Clipzy AI Waitlist! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <!-- Logo/Branding -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: #ff8800;">Clipzy</div>
              </div>

              <!-- Heading -->
              <h1 style="font-size: 28px; font-weight: 700; color: #18181b; text-align: center; margin: 0 0 16px 0;">
                You're on the list, ${firstName}! 🎉
              </h1>

              <!-- Subheading -->
              <p style="font-size: 16px; color: #71717a; text-align: center; margin: 0 0 32px 0; line-height: 1.6;">
                Thanks for joining the Clipzy AI waitlist. You're now part of an exclusive group of creators who will get early access to the future of video editing.
              </p>

              <!-- Divider -->
              <div style="border-top: 1px solid #e4e4e7; margin: 32px 0;"></div>

              <!-- Your Information -->
              <h2 style="font-size: 18px; font-weight: 600; color: #18181b; margin: 0 0 16px 0;">
                Your Profile
              </h2>
              <table style="width: 100%; margin-bottom: 32px; font-size: 14px; color: #52525b;">
                <tr>
                  <td style="padding: 8px 0; font-weight: 500;">Category:</td>
                  <td style="padding: 8px 0; text-align: right;">${category || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 500;">Experience:</td>
                  <td style="padding: 8px 0; text-align: right;">${experience || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: 500;">Editing Speed:</td>
                  <td style="padding: 8px 0; text-align: right;">${struggle || "Not specified"}</td>
                </tr>
              </table>

              <!-- What's next -->
              <h2 style="font-size: 18px; font-weight: 600; color: #18181b; margin: 0 0 16px 0;">
                What happens next?
              </h2>
              <ul style="padding-left: 20px; margin: 0 0 32px 0; color: #52525b; line-height: 1.8;">
                <li style="margin-bottom: 8px;">We'll keep you updated on our launch date</li>
                <li style="margin-bottom: 8px;">You'll get early access before anyone else</li>
                <li style="margin-bottom: 8px;">Special perks and bonuses for early adopters</li>
              </ul>

              <!-- CTA -->
              <div style="text-align: center;">
                <a href="https://clipzy.ai" style="display: inline-block; background-color: #ff8800; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 4px; font-weight: 500; font-size: 16px;">
                  Visit Clipzy →
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 32px;">
              <p style="font-size: 14px; color: #a1a1aa; margin: 0;">
                © ${new Date().getFullYear()} Clipzy. All rights reserved.
              </p>
              <p style="font-size: 12px; color: #d4d4d8; margin: 8px 0 0 0;">
                You received this email because you signed up for the Clipzy AI waitlist.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully joined the waitlist",
      contact,
    });
  } catch (error) {
    console.error("Waitlist signup error:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 },
    );
  }
}
