// Shows one reservation. It reuses the order card styles from Step 4.

// Turns "18:30" into "6:30 PM".
function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

function ReservationCard({ reservation }) {
  const formattedDate = new Date(
    `${reservation.date}T00:00:00`
  ).toLocaleDateString('en-CA', { dateStyle: 'full' });

  return (
    <article className="order-card">
      <div className="order-card-header">
        <h2>Reservation #{reservation.id}</h2>
      <span
        className={`order-status status-${reservation.status.toLowerCase()}`}>{reservation.status}
     </span>
      </div>

      <p className="order-meta">
        {formattedDate} at {formatTime(reservation.time)}
      </p>

      <p className="order-meta">
        {reservation.guests}{' '}
        {reservation.guests === 1 ? 'guest' : 'guests'} · Booked by{' '}
        {reservation.customerName}
      </p>

      {reservation.eventType !== 'None' && (
        <p className="order-meta">
          Special event: {reservation.eventType}
        </p>
      )}

      {reservation.requests && (
        <p className="order-notes">
          <strong>Special requests:</strong> {reservation.requests}
        </p>
      )}
    </article>
  );
}

export default ReservationCard;