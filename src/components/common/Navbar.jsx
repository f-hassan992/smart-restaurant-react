// Primary navigation: NavLink highlights the page the user is on.
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

// NavLink passes isActive, so we can add an "active" class for the current page.
function navClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function Navbar() {
  const { user, role, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        Restaurant
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        {/* "end" makes Home active only on exactly "/" */}
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>
        <NavLink to="/menu" className={navClass}>
          Menu
        </NavLink>
        <NavLink to="/reservations" className={navClass}>
          Reservations
        </NavLink>
        <NavLink to="/chat" className={navClass}>
          Chat
        </NavLink>
        <NavLink to="/cart" className={navClass}>
          Cart{totalItems > 0 && ` (${totalItems})`}
        </NavLink>
        <NavLink to="/orders" className={navClass}>
          Orders
        </NavLink>

        {role === 'admin' && (
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
        )}

        {user ? (
          <>
            <NavLink to="/account" className={navClass}>
              Account
            </NavLink>
            <button
              className="nav-action"
              type="button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={navClass}>
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;