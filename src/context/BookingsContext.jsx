import { createContext, useContext, useState, useCallback } from 'react';
import { mockBookings } from '../data/mockBookings';

const BookingsContext = createContext(null);

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([...mockBookings]);

  const generateNextId = useCallback(() => {
    const maxNum = bookings.reduce((max, b) => {
      const num = parseInt(b.id.replace('BK', ''), 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    return `BK${String(maxNum + 1).padStart(3, '0')}`;
  }, [bookings]);

  const addBooking = useCallback((booking) => {
    const id = generateNextId();
    const newBooking = {
      ...booking,
      id,
      totalAmount: booking.totalAmount ?? 0,
      currency: booking.currency ?? 'USD',
      propertyAddress: booking.propertyAddress ?? '',
      nights: booking.nights ?? 1,
      bookingDate: booking.bookingDate ?? new Date().toISOString().slice(0, 10),
    };
    setBookings((prev) => [...prev, newBooking]);
    return id;
  }, [generateNextId]);

  const updateBooking = useCallback((id, updates) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  }, []);

  const value = {
    bookings,
    addBooking,
    updateBooking,
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingsContext);
  if (!ctx) {
    throw new Error('useBookings must be used within BookingsProvider');
  }
  return ctx;
}
