// Lists every order placed in this session, newest first.
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrdersContext.jsx';
import OrderCard from '../../components/orders/OrderCard.jsx';

function OrderHistory() {
  const { orders } = useOrders();

  return (
    <section className="orders-page">
      <header className="orders-heading">
        <h1>Order History</h1>
      </header>

      {orders.length === 0 ? (
        <div className="cart-empty">
          <p>You have not placed any orders yet.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderHistory;