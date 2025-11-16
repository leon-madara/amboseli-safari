'use client';

import { useState } from 'react';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';

const MAX_MESSAGE_LENGTH = 500;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingChars = MAX_MESSAGE_LENGTH - formData.message.length;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-success-light)',
            color: 'var(--color-success-dark)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: '4px solid var(--color-success)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <strong>Thank you!</strong> Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--color-error-light)',
            color: 'var(--color-error-dark)',
            borderRadius: 'var(--radius-lg)',
            borderLeft: '4px solid var(--color-error)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <strong>Oops!</strong> {errorMessage}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
        <FormField
          label="Full Name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Doe"
        />
        <FormField
          label="Email Address"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-6)' }}>
        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+254 123 456 789"
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <label
            htmlFor="subject"
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-primary)',
            }}
          >
            Subject <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            style={{
              padding: 'var(--space-input-padding-y) var(--space-input-padding-x)',
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--font-size-base)',
              color: formData.subject ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--input-border)',
              borderRadius: 'var(--radius-input)',
              height: 'var(--input-height)',
              transition: 'var(--transition-all)',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--input-border-focus)';
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204, 139, 63, 0.1)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--input-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <option value="">Select a subject...</option>
            <option value="reservation">Reservation Inquiry</option>
            <option value="general">General Question</option>
            <option value="safari">Safari Packages</option>
            <option value="accommodation">Accommodation</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <label
          htmlFor="message"
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
          }}
        >
          Message <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
              setFormData({ ...formData, message: e.target.value });
            }
          }}
          placeholder="Tell us how we can help you..."
          rows={6}
          style={{
            padding: 'var(--space-4)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            borderRadius: 'var(--radius-input)',
            resize: 'vertical',
            transition: 'var(--transition-all)',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--input-border-focus)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204, 139, 63, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--input-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--font-size-sm)',
            color: remainingChars < 50 ? 'var(--color-warning)' : 'var(--color-text-tertiary)',
          }}
        >
          {remainingChars} characters remaining
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} style={{ width: '100%', marginTop: 'var(--space-4)' }}>
        {isSubmitting ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}>
            <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
            Sending...
          </span>
        ) : submitStatus === 'success' ? (
          '✓ Message Sent'
        ) : (
          'Send Message'
        )}
      </Button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  );
}
