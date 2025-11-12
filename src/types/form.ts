export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookingInquiryFormData {
  name: string;
  email: string;
  phone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message?: string;
}

export interface NewsletterFormData {
  email: string;
}
