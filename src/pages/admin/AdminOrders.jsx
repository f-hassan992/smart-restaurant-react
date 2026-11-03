// Admin orders: monitor incoming orders and update their status.
import { useState } from 'react';
import { useOrders } from '../../context/OrdersContext.jsx';
import OrderCard from '../../components/orders/OrderCard.jsx';

const statuses = ['Received', 'Preparing', 'Ready', 'Delivered'];

function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const [statusFilter, setStatusFilter] = useState('All');

  const visibleOrders =
    statusFilter === 'All'
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <section className="admin-page">
      <header className="admin-heading">
        <h1>Orders</h1>

        <div className="admin-filter">
          <label htmlFor="order-filter">Show</label>
          <select
            id="order-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All orders</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </header>

      <p className="menu-count" role="status">
        Showing {visibleOrders.length} of {orders.length} orders
      </p>

      {visibleOrders.length === 0 ? (
        <p className="menu-empty">
          {orders.length === 0
            ? 'No orders have been placed yet.'
            : 'No orders have this status.'}
        </p>
      ) : (
        <div className="orders-list">
          {visibleOrders.map((order) => (
            <div className="admin-order" key={order.id}>
              <OrderCard order={order} />

              <div className="admin-status-control">
                <span className="order-meta">Phone: {order.phone}</span>

                <div className="admin-filter">
                  <label htmlFor={`status-${order.id}`}>Update status</label>
                  <select
                    id={`status-${order.id}`}
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(order.id, event.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;