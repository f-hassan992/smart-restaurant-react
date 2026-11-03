// Shared navigation shell for protected administration pages.
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function navClass({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Log out, then go to the customer home page.
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <Link className="brand" to="/admin">
          Restaurant <span>· Admin</span>
        </Link>

        <nav
          className="admin-nav"
          aria-label="Administration navigation"
        >
          <NavLink to="/admin" end className={navClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/menu" className={navClass}>
            Menu
          </NavLink>
          <NavLink to="/admin/orders" className={navClass}>
            Orders
          </NavLink>
          <NavLink to="/admin/reservations" className={navClass}>
            Reservations
          </NavLink>
          <Link to="/">Customer site</Link>

          <button
            className="nav-action"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>

      <main className="page-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;