import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const bookingInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().min(1),
  message: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});
