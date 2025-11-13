'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import styles from './QuickBookingModal.module.css';

export interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomTitle: string;
  roomPrice: string;
  roomId?: string;
  onSubmit?: (data: BookingData) => void;
}

export interface BookingData {
  roomId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  email: string;
  name: string;
  phone?: string;
}

export default function QuickBookingModal({
  isOpen,
  onClose,
  roomTitle,
  roomPrice,
  roomId,
  onSubmit,
}: QuickBookingModalProps) {
  const [formData, setFormData] = useState<BookingData>({
    roomId,
    checkIn: '',
    checkOut: '',
    guests: 2,
    email: '',
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `Quick booking inquiry for ${roomTitle}`,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        if (onSubmit) {
          onSubmit(formData);
        }
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({
            roomId,
            checkIn: '',
            checkOut: '',
            guests: 2,
            email: '',
            name: '',
            phone: '',
          });
        }, 2000);
      }
    } catch (error) {
      alert('Failed to send inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close booking form"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {submitSuccess ? (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3>Booking Inquiry Sent!</h3>
                <p>We&apos;ll get back to you within 24 hours with availability and details.</p>
              </motion.div>
            ) : (
              <>
                <div className={styles.header}>
                  <h3 className={styles.title}>Check Availability</h3>
                  <div className={styles.roomInfo}>
                    <span className={styles.roomTitle}>{roomTitle}</span>
                    <span className={styles.roomPrice}>{roomPrice}/night</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <FormField
                      label="Check-in Date"
                      name="checkIn"
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) =>
                        setFormData({ ...formData, checkIn: e.target.value })
                      }
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <FormField
                      label="Check-out Date"
                      name="checkOut"
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) =>
                        setFormData({ ...formData, checkOut: e.target.value })
                      }
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <FormField
                    label="Number of Guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: parseInt(e.target.value) })
                    }
                  />

                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />

                  <FormField
                    label="Phone Number (Optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 234 567 8900"
                  />

                  <div className={styles.trustSignals}>
                    <span>✓ Free cancellation up to 48h</span>
                    <span>✓ Instant confirmation</span>
                    <span>✓ Best price guarantee</span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%' }}
                  >
                    {isSubmitting ? 'Sending Inquiry...' : 'Send Booking Inquiry'}
                  </Button>

                  <p className={styles.disclaimer}>
                    By submitting, you agree to receive communication about your booking.
                    We respect your privacy.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
