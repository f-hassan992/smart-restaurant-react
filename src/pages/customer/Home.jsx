// Landing page: welcome text, quick links, and today's special from the shared menu.
import { Link } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext.jsx';

const features = [
  {
    title: 'Order online',
    text: 'Browse the menu, filter by diet or price, and order for pickup or delivery.',
    to: '/menu',
    linkText: 'See the menu',
  },
  {
    title: 'Reserve a table',
    text: 'Book a table for a date and time, including birthdays and corporate events.',
    to: '/reservations',
    linkText: 'Book a table',
  },
  {
    title: 'Ask our assistant',
    text: 'Get answers about specials, vegetarian options, desserts, and your last order.',
    to: '/chat',
    linkText: 'Start chatting',
  },
];

function Home() {
  const { menuItems } = useMenu();

  // Today's special is Chicken Alfredo, the same dish the chat assistant mentions.
  const special = menuItems.find((item) => item.name === 'Chicken Alfredo');

  return (
    <section className="home-page">
      <div className="home-hero">
        <h1>Welcome to our restaurant</h1>

        <p>
          Fresh food, easy ordering, and a table waiting for you. Order
          online, book a reservation, or ask our assistant for a
          recommendation.
        </p>

        <div className="home-actions">
          <Link to="/menu">Browse the menu</Link>
          <Link to="/reservations">Book a table</Link>
        </div>
      </div>

      <div className="home-features">
        {features.map((feature) => (
          <article className="home-feature" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
            <Link to={feature.to}>{feature.linkText}</Link>
          </article>
        ))}
      </div>

      {/* Shown only while the dish exists and is available. */}
      {special && special.available && (
        <div className="home-special">
          <span className="stat-label">Today's special</span>
          <h2>{special.name}</h2>
          <p>{special.description}</p>
          <p className="menu-price">${special.price.toFixed(2)}</p>
          <Link to="/menu">See it on the menu</Link>
        </div>
      )}
    </section>
  );
}

export default Home;