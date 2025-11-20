'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import type { Restaurant } from '@/data/dining';
import styles from './BookingModal.module.css';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: Restaurant;
}

export default function BookingModal({ isOpen, onClose, restaurant }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', formData);
    // In production, this would send to an API
    alert('Booking request submitted! We will contact you shortly.');
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 12; hour <= 22; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 22) timeSlots.push(`${hour}:30`);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Reserve at {restaurant.title}</h2>
              <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close booking form"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={styles.input}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="date" className={styles.label}>
                    Date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    className={styles.input}
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="time" className={styles.label}>
                    Time *
                  </label>
                  <select
                    id="time"
                    className={styles.select}
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="guests" className={styles.label}>
                    Guests *
                  </label>
                  <select
                    id="guests"
                    className={styles.select}
                    value={formData.guests}
                    onChange={(e) => handleChange('guests', e.target.value)}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="requests" className={styles.label}>
                  Special Requests
                </label>
                <textarea
                  id="requests"
                  className={styles.textarea}
                  value={formData.specialRequests}
                  onChange={(e) => handleChange('specialRequests', e.target.value)}
                  rows={3}
                  placeholder="Dietary requirements, celebrations, seating preferences..."
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Confirm Reservation
              </button>

              <p className={styles.note}>
                * Required fields. You will receive a confirmation email within 24 hours.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
