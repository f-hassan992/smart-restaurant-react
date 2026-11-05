// Account page: shows the logged-in user and lets them save their details and preference.
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const dietaryChoices = [
  { value: '', label: 'No preference' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-free' },
  { value: 'dairy-free', label: 'Dairy-free' },
];

function validate(form) {
  const errors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (form.phone.trim() !== '' && form.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a phone number with at least 10 digits.';
  }

  return errors;
}

function Account() {
  const { user, updateProfile } = useAuth();

  // Hooks must run before the early return below.
  const [form, setForm] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    dietary: user ? user.dietary : '',
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  // Visitors who are not logged in are sent to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSaved(false);
      return;
    }

    updateProfile({
      name: form.name.trim(),
      phone: form.phone.trim(),
      dietary: form.dietary,
    });
    setSaved(true);
  };

  return (
    <section className="auth-page">
      <header className="auth-heading">
        <h1>My account</h1>
      </header>

      <form
        className="checkout-form auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <p className="account-email">
          Signed in as <strong>{user.email}</strong>
        </p>

        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
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
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
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
          <label htmlFor="dietary">Dietary preference</label>
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

        {saved && (
          <p className="admin-message" role="status">
            Your details were saved.
          </p>
        )}

        <button className="checkout-submit" type="submit">
          Save changes
        </button>
      </form>

      <div className="account-links">
        <Link to="/orders">View my orders</Link>
        <Link to="/reservations">My reservations</Link>
      </div>
    </section>
  );
}

export default Account;