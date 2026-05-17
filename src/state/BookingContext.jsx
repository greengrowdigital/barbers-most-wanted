import { createContext, useContext, useState, useCallback } from 'react'

const BookingContext = createContext(null)

const EMPTY = {
  serviceId: null,
  barberId: null,
  date: null,        // ISO date string YYYY-MM-DD
  time: null,        // 'HH:MM'
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  notes: '',
  payMethod: 'shop', // 'shop' | 'now'
  card: { number: '', expiry: '', cvc: '', zip: '', name: '' },
  confirmation: null,
}

export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(EMPTY)

  const update = useCallback((patch) => {
    setBooking(prev => ({ ...prev, ...patch }))
  }, [])

  const updateCard = useCallback((patch) => {
    setBooking(prev => ({ ...prev, card: { ...prev.card, ...patch } }))
  }, [])

  const reset = useCallback(() => setBooking(EMPTY), [])

  const finalize = useCallback(() => {
    const ref = 'BMW-' + Math.random().toString(36).slice(2, 7).toUpperCase()
    setBooking(prev => ({ ...prev, confirmation: ref }))
    return ref
  }, [])

  return (
    <BookingContext.Provider value={{ booking, update, updateCard, reset, finalize }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
