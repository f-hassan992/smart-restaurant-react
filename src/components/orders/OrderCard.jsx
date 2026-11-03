// Shows one order. Used on the confirmation screen and on the Order History page.
function OrderCard({ order }) {
  const placedDate = new Date(order.placedAt).toLocaleString('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <article className="order-card">
      <div className="order-card-header">
        <h2>Order #{order.id}</h2>
        <span className={`order-status status-${order.status.toLowerCase()}`}>{order.status}
        </span>
      </div>

      <p className="order-meta">
        {placedDate} · For {order.customerName}
      </p>

      <p className="order-meta">
        {order.orderType === 'delivery'
          ? `Delivery to ${order.address}`
          : 'Pickup'}
      </p>

      <ul className="order-items">
        {order.items.map((item) => (
          <li key={item.id}>
            <span>
              {item.quantity} × {item.name}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {order.notes && (
        <p className="order-notes">
          <strong>Notes:</strong> {order.notes}
        </p>
      )}

      <p className="order-total">
        <span>Total</span>
        <span>${order.total.toFixed(2)}</span>
      </p>
    </article>
  );
}

export default OrderCard;