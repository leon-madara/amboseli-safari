'use client';

import { useState } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

export default function BookingInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Booking inquiry sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          message: '',
        });
      }
    } catch (error) {
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Name"
        name="name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <FormField
        label="Phone"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <FormField
        label="Check-in Date"
        name="checkIn"
        type="date"
        required
        value={formData.checkIn}
        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
      />
      <FormField
        label="Check-out Date"
        name="checkOut"
        type="date"
        required
        value={formData.checkOut}
        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
      />
      <FormField
        label="Number of Guests"
        name="guests"
        type="number"
        min="1"
        required
        value={formData.guests}
        onChange={(e) =>
          setFormData({ ...formData, guests: parseInt(e.target.value) })
        }
      />
      <FormField
        label="Special Requests"
        name="message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
      </Button>
    </form>
  );
}
