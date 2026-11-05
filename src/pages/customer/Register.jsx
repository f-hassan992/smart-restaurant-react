// Registration form: creates a customer account and logs in.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const dietaryChoices = [
  { value: '', label: 'No preference' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'dairy-free', label: 'Dairy-free' },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  dietary: '',
  password: '',
  confirmPassword: '',
};

// Returns an object with one message for each invalid field.
function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // The phone number is optional, but must be complete if it is typed.
  if (form.phone.trim() !== '' && form.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a phone number with at least 10 digits.';
  }

  if (form.password.length < 6) {
    errors.password = 'Your password must have at least 6 characters.';
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'The passwords do not match.';
  }

  return errors;
}

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
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

    const result = register(form);

    // The email may already belong to another account.
    if (!result.ok) {
      setErrors({ email: result.error });
      return;
    }

    navigate('/');
  };

  return (
    <section className="auth-page">
      <header className="auth-heading">
        <h1>Create account</h1>
      </header>

      <form
        className="checkout-form auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p className="form-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

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
          <label htmlFor="phone">Phone number (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p className="form-error" id="phone-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="dietary">Dietary preference (optional)</label>
          <select
            id="dietary"
            name="dietary"
            value={form.dietary}
            onChange={handleChange}
          >
            {dietaryChoices.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
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

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? 'confirm-error' : undefined
            }
          />
          {errors.confirmPassword && (
            <p className="form-error" id="confirm-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button className="checkout-submit" type="submit">
          Create account
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;