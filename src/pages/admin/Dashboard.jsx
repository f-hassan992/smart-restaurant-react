// Admin dashboard: summary numbers calculated from the shared Contexts.
import { useMenu } from '../../context/MenuContext.jsx';
import { useOrders } from '../../context/OrdersContext.jsx';
import { useReservations } from '../../context/ReservationsContext.jsx';
import StatCard from '../../components/admin/StatCard.jsx';

function Dashboard() {
  const { menuItems } = useMenu();
  const { orders } = useOrders();
  const { reservations } = useReservations();

  // Derived values: calculated from the lists, never stored in state.
  const activeOrders = orders.filter(
    (order) => order.status !== 'Delivered'
  ).length;

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const pendingReservations = reservations.filter(
    (reservation) => reservation.status === 'Pending'
  ).length;

  const soldOutItems = menuItems.filter((item) => !item.available).length;

  // Add up how many of each dish were ordered, then keep the top five.
  const dishCounts = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      dishCounts[item.name] = (dishCounts[item.name] || 0) + item.quantity;
    });
  });

  const popularDishes = Object.entries(dishCounts)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <section className="admin-page">
      <header className="admin-heading">
        <h1>Dashboard</h1>
      </header>

      <div className="stat-grid">
        <StatCard label="Total orders" value={orders.length} />

        <StatCard
          label="Active orders"
          value={activeOrders}
          note="Not delivered yet"
        />

        <StatCard
          label="Total sales"
          value={`$${totalSales.toFixed(2)}`}
        />

        <StatCard
          label="Pending reservations"
          value={pendingReservations}
          note="Waiting for approval"
        />

        <StatCard
          label="Menu items"
          value={menuItems.length}
          note={`${soldOutItems} sold out`}
        />
      </div>

      <div className="dashboard-panel">
        <h2>Most ordered dishes</h2>

        {popularDishes.length === 0 ? (
          <p className="menu-empty">No orders yet.</p>
        ) : (
          <ol className="popular-list">
            {popularDishes.map((dish) => (
              <li key={dish.name}>
                <span>{dish.name}</span>
                <span>{dish.quantity} ordered</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Dashboard;