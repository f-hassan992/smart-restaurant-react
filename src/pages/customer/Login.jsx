// Demo role selection for customer and administrator access.
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const signInAs = (role) => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <section className="page-title login-page">
      <h1>Login</h1>

      <div className="login-actions">
        <button
          type="button"
          onClick={() => signInAs('customer')}
        >
          Login as Customer
        </button>

        <button
          type="button"
          onClick={() => signInAs('admin')}
        >
          Login as Admin
        </button>
      </div>
    </section>
  );
}

export default Login;