import nodemailer from "nodemailer";

export async function sendPasswordSetupEmail({ email, setupUrl }) {
  if (!process.env.SMTP_HOST) {
    if (process.env.NODE_ENV !== "production") console.log(`Development password reset for ${email}: ${setupUrl}`);
    return false;
  }
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
  await transporter.sendMail({ from: process.env.EMAIL_FROM || "ICSF <no-reply@icsf.co.ke>", to: email, subject: "Reset your ICSF password", text: `Use this secure link to reset your ICSF portal password. It expires in one hour: ${setupUrl}`, html: `<p>Use the secure link below to reset your ICSF portal password. It expires in one hour.</p><p><a href="${setupUrl}">Reset password</a></p>` });
  return true;
}
