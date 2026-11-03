// Admin reservations: review bookings and approve or cancel them.
import { useState } from 'react';
import { useReservations } from '../../context/ReservationsContext.jsx';
import ReservationCard from '../../components/reservations/ReservationCard.jsx';

const statuses = ['Pending', 'Approved', 'Cancelled'];

function AdminReservations() {
  const { reservations, updateReservationStatus } = useReservations();
  const [statusFilter, setStatusFilter] = useState('All');

  const visibleReservations =
    statusFilter === 'All'
      ? reservations
      : reservations.filter(
          (reservation) => reservation.status === statusFilter
        );

  const handleCancel = (reservation) => {
    if (
      window.confirm(
        `Cancel reservation #${reservation.id} for ${reservation.customerName}?`
      )
    ) {
      updateReservationStatus(reservation.id, 'Cancelled');
    }
  };

  return (
    <section className="admin-page">
      <header className="admin-heading">
        <h1>Reservations</h1>

        <div className="admin-filter">
          <label htmlFor="reservation-filter">Show</label>
          <select
            id="reservation-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All reservations</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </header>

      <p className="menu-count" role="status">
        Showing {visibleReservations.length} of {reservations.length}{' '}
        reservations
      </p>

      {visibleReservations.length === 0 ? (
        <p className="menu-empty">
          {reservations.length === 0
            ? 'No reservations have been made yet.'
            : 'No reservations have this status.'}
        </p>
      ) : (
        <div className="orders-list">
          {visibleReservations.map((reservation) => (
            <div className="admin-order" key={reservation.id}>
              <ReservationCard reservation={reservation} />

              <div className="admin-status-control">
                <span className="order-meta">
                  Phone: {reservation.phone}
                </span>

                <div className="admin-actions">
                  <button
                    className="admin-primary-button"
                    type="button"
                    disabled={reservation.status === 'Approved'}
                    onClick={() =>
                      updateReservationStatus(reservation.id, 'Approved')
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="menu-clear"
                    type="button"
                    disabled={reservation.status === 'Cancelled'}
                    onClick={() => handleCancel(reservation)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminReservations;