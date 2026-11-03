// Restricts nested administration routes to the in-memory admin role.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function ProtectedRoute() {
  const { role } = useAuth();

  return role === 'admin'
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

export default ProtectedRoute;