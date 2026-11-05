// Login form. Checks the email and password against the accounts in AuthContext.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// Returns an object with one message for each invalid field.
function validate(form) {
  const errors = {};

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (form.password === '') {
    errors.password = 'Please enter your password.';
  }

  return errors;
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const result = login(form.email, form.password);

    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }

    // Admins go to the dashboard, customers go to the home page.
    navigate(result.role === 'admin' ? '/admin' : '/');
  };

  return (
    <section className="auth-page">
      <header className="auth-heading">
        <h1>Login</h1>
      </header>

      <form
        className="checkout-form auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.form && (
          <p className="auth-form-error" role="alert">
            {errors.form}
          </p>
        )}

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p className="form-error" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p className="form-error" id="password-error">
              {errors.password}
            </p>
          )}
        </div>

        <button className="checkout-submit" type="submit">
          Login
        </button>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>

        <p className="auth-hint">
          Demo admin account: admin@restaurant.com / admin123
        </p>
      </form>
    </section>
  );
}

export default Login;