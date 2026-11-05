// Table booking form with validation. Bookings are saved in ReservationsContext.
import { useState } from 'react';
import { useReservations } from '../../context/ReservationsContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import ReservationCard from '../../components/reservations/ReservationCard.jsx';

const OPENING_TIME = '11:00';
const LAST_BOOKING_TIME = '21:00';
const MAX_GUESTS = 12;

const eventTypes = [
  'None',
  'Birthday',
  'Anniversary',
  'Corporate gathering',
  'Other',
];

const emptyForm = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  eventType: 'None',
  requests: '',
};

// Today's date as "YYYY-MM-DD", the same format a date input uses.
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// The current time as "HH:MM", the same format a time input uses.
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

// Returns an object with one message for each invalid field.
function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (form.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a phone number with at least 10 digits.';
  }

  // "YYYY-MM-DD" strings can be compared directly with < and >.
  if (form.date === '') {
    errors.date = 'Please choose a date.';
  } else if (form.date < getToday()) {
    errors.date = 'The date cannot be in the past.';
  }

  if (form.time === '') {
    errors.time = 'Please choose a time.';
  } else if (form.time < OPENING_TIME || form.time > LAST_BOOKING_TIME) {
    errors.time = 'We take bookings from 11:00 AM to 9:00 PM.';
  } else if (form.date === getToday() && form.time <= getCurrentTime()) {
    errors.time = 'That time has already passed today.';
  }

  const guests = Number(form.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    errors.guests = `Guests must be a whole number from 1 to ${MAX_GUESTS}.`;
  }

  return errors;
}

function Reservations() {
  const { user } = useAuth();
  const { reservations, addReservation } = useReservations();

  // Logged-in customers start with their saved name and phone.
  const startingForm = {
    ...emptyForm,
    name: user ? user.name : '',
    phone: user ? user.phone : '',
  };

  // Only this customer's reservations (guests see the ones made without logging in).
  const myReservations = reservations.filter(
    (reservation) => reservation.userId === (user ? user.id : null)
  );

  const [form, setForm] = useState(startingForm);
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(null);

  // One handler for every input: the input's name matches a key in the form object.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    // Stop here if any field has an error.
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const reservation = addReservation({
      userId: user ? user.id : null,
      customerName: form.name.trim(),
      phone: form.phone.trim(),
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      eventType: form.eventType,
      requests: form.requests.trim(),
    });

    setConfirmed(reservation);
    setForm(startingForm);
    setErrors({});
  };

  // After a successful booking: show the confirmation.
  if (confirmed) {
    return (
      <section className="reservations-page">
        <header className="reservations-heading">
          <h1>Reservation received</h1>
        </header>

        <p className="confirmation-message">
          Thank you, {confirmed.customerName}! Your table request has been
          received. We will confirm it shortly.
        </p>

        <ReservationCard reservation={confirmed} />

        <div className="confirmation-actions">
          <button
            className="checkout-submit"
            type="button"
            onClick={() => setConfirmed(null)}
          >
            Book another table
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="reservations-page">
      <header className="reservations-heading">
        <h1>Reservations</h1>
      </header>

      <form
        className="checkout-form reservation-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p className="form-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p className="form-error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              min={getToday()}
              value={form.date}
              onChange={handleChange}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? 'date-error' : undefined}
            />
            {errors.date && (
              <p className="form-error" id="date-error">
                {errors.date}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="time">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              min={OPENING_TIME}
              max={LAST_BOOKING_TIME}
              value={form.time}
              onChange={handleChange}
              aria-invalid={Boolean(errors.time)}
              aria-describedby={errors.time ? 'time-error' : undefined}
            />
            {errors.time && (
              <p className="form-error" id="time-error">
                {errors.time}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="guests">Guests</label>
            <input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max={MAX_GUESTS}
              value={form.guests}
              onChange={handleChange}
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? 'guests-error' : undefined}
            />
            {errors.guests && (
              <p className="form-error" id="guests-error">
                {errors.guests}
              </p>
            )}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="eventType">Special event (optional)</label>
          <select
            id="eventType"
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="requests">Special requests (optional)</label>
          <textarea
            id="requests"
            name="requests"
            value={form.requests}
            onChange={handleChange}
          />
        </div>

        <button className="checkout-submit" type="submit">
          Request reservation
        </button>
      </form>

      {myReservations.length > 0 && (
        <div className="reservations-history">
          <h2>Your reservations</h2>

          <div className="orders-list">
            {myReservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Reservations;