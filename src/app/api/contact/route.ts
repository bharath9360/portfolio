import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";

// ============================================================================
// DIRECT EMAIL SENDER API ROUTE (/api/contact)
// ============================================================================
// Supports multiple mail sending backends:
// 1. Resend (if RESEND_API_KEY is defined)
// 2. Nodemailer / Gmail SMTP (if GMAIL_USER / SMTP_USER is defined)
// 3. Web3Forms / Formspree Fallback via frontend
// ============================================================================

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const recipientEmail = "bharathkkbharath3@gmail.com";
    const mailSubject = `[Portfolio Inquiry] ${subject || "New Contact Message"} from ${name}`;
    const mailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #0b0f19; color: #f8fafc;">
        <h2 style="color: #00f2fe; border-bottom: 2px solid #334155; padding-bottom: 10px;">New Portfolio Contact Message</h2>
        <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color: #38bdf8;">${email}</a>)</p>
        <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
        <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7f52ff;">
          <p style="white-space: pre-wrap; margin: 0; color: #e2e8f0;">${message}</p>
        </div>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 30px;">Sent via Bharath K's Portfolio Direct Contact API</p>
      </div>
    `;

    // 1. Try Resend if API key exists
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const data = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: email,
        subject: mailSubject,
        html: mailHtml,
      });

      if (data.error) {
        console.error("Resend Error:", data.error);
        throw new Error(data.error.message);
      }

      return NextResponse.json({ success: true, method: "resend", data });
    }

    // 2. Try Nodemailer / SMTP if Gmail / SMTP user exists
    const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || "gmail",
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: mailSubject,
        html: mailHtml,
      });

      return NextResponse.json({ success: true, method: "nodemailer" });
    }

    // If neither is configured in environment, notify frontend to use fallback mailer (Web3Forms / Formspree)
    return NextResponse.json(
      {
        success: false,
        error: "No SMTP or Resend API keys configured on server. Please use client fallback.",
        fallbackRequired: true,
      },
      { status: 501 }
    );
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transmit message." },
      { status: 500 }
    );
  }
}
