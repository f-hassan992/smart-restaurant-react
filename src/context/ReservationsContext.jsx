// Shared list of table reservations. Customers add them; the admin approves or cancels.
import { createContext, useContext, useState } from 'react';

const ReservationsContext = createContext(null);

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState([]);

  // Saves a new reservation and returns it, so the page can show a confirmation.
  const addReservation = (details) => {
    const newReservation = {
      id: 501 + reservations.length, // reservation numbers start at 501
      ...details,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    // Newest reservation goes first in the list.
    setReservations((currentReservations) => [
      newReservation,
      ...currentReservations,
    ]);

    return newReservation;
  };

  // Changes the status of one reservation (Pending, Approved, or Cancelled).
  const updateReservationStatus = (id, status) => {
    setReservations((currentReservations) =>
      currentReservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  return (
    <ReservationsContext.Provider
      value={{ reservations, addReservation, updateReservationStatus }}
    >
      {children}
    </ReservationsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReservations() {
  return useContext(ReservationsContext);
}