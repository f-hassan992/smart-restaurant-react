// Lists the current customer's orders, newest first.
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useOrders } from '../../context/OrdersContext.jsx';
import OrderCard from '../../components/orders/OrderCard.jsx';

function OrderHistory() {
  const { user } = useAuth();
  const { orders } = useOrders();

  // Logged-in customers see their own orders. Guests (userId null) see
  // only the orders placed without logging in.
  const myOrders = orders.filter(
    (order) => order.userId === (user ? user.id : null)
  );

  return (
    <section className="orders-page">
      <header className="orders-heading">
        <h1>Order History</h1>
      </header>

      {!user && (
        <p className="auth-hint">
          You are browsing as a guest. <Link to="/login">Login</Link> to see
          the orders linked to your account.
        </p>
      )}

      {myOrders.length === 0 ? (
        <div className="cart-empty">
          <p>You have not placed any orders yet.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      ) : (
        <div className="orders-list">
          {myOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderHistory;