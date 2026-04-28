import nodemailer from "nodemailer";

export async function sendEmail({ name, email, phone, company, message, product }: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  product?: string;
}) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error("Missing email credentials in environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // 1. Email to Company
  const adminMailOptions = {
    from: `"Unique Engineering Portal" <${emailUser}>`,
    to: "uniqueengg1976@gmail.com",
    subject: product ? `New Product Inquiry: ${product}` : "New Website Inquiry Received",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">NEW INQUIRY RECEIVED</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        ${product ? `<p><strong>Requested Product:</strong> ${product}</p>` : ""}
        <p><strong>Message:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; border-left: 4px solid #dc2626;">
          ${message}
        </div>
        <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #6b7280; text-align: center;">Unique Engineering - Fire Bond | Internal Notification System</p>
      </div>
    `,
  };

  // 2. Confirmation Email to User
  const userMailOptions = {
    from: `"Unique Engineering - Fire Bond" <${emailUser}>`,
    to: email,
    subject: "We've received your request - Unique Engineering",
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #111827;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin: 0;">Unique Engineering - Fire Bond</h1>
          <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: bold; color: #dc2626;">Engineering Trust Since 1996</p>
        </div>
        <p>Dear ${name},</p>
        <p>Thank you for contacting Unique Engineering - Fire Bond. This is to confirm that our technical team has received your inquiry regarding <strong>${product || "our services"}</strong>.</p>
        <p>A technical lead will review your requirements and get back to you within 24 hours.</p>
        
        <div style="margin: 30px 0; padding: 20px; background: #f3f4f6; border-radius: 10px;">
          <h4 style="margin-top: 0; border-bottom: 1px solid #d1d5db; padding-bottom: 10px; text-transform: uppercase; font-size: 11px;">Your Submission Summary</h4>
          <p style="font-size: 14px; margin-bottom: 5px;"><strong>Product/Service:</strong> ${product || "General Consultation"}</p>
          <p style="font-size: 14px;"><strong>Your Message:</strong><br/>${message}</p>
        </div>

        <p>If you need immediate assistance, please feel free to call our direct line at <strong>+91 70453 72820</strong>.</p>
        
        <p style="margin-top: 40px;">Best Regards,<br/><strong>Team Unique Engineering</strong></p>
      </div>
    `,
  };

  return await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
}
