// Email sending utilities
// Configure with your email service (e.g., Resend, SendGrid, Nodemailer)

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // TODO: Implement email sending logic
  console.log('Sending email to:', to);
  console.log('Subject:', subject);
  console.log('HTML:', html);

  // Example with fetch to email service:
  // const response = await fetch('https://api.emailservice.com/send', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ to, subject, html }),
  // });

  return { success: true };
}

export function createContactEmailTemplate(data: {
  name: string;
  email: string;
  message: string;
}): string {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
  `;
}

export function createBookingInquiryTemplate(data: {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): string {
  return `
    <h2>New Booking Inquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Check-in:</strong> ${data.checkIn}</p>
    <p><strong>Check-out:</strong> ${data.checkOut}</p>
    <p><strong>Guests:</strong> ${data.guests}</p>
  `;
}
